import { readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
function routeFiles(root) { return readdirSync(root, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? routeFiles(join(root, entry.name)) : entry.name.endsWith('.html') ? [join(root, entry.name)] : []); }
const routes = routeFiles('dist').map(path => '/' + path.slice(5).replace(/index\.html$/, '')).filter(path => path !== '/404.html');
mkdirSync('artifacts/qa/screenshots', { recursive: true });

for (const route of routes) {
  test(`${route} renders, has no browser errors, and passes axe`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(result.violations).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `artifacts/qa/screenshots/${route.replace(/\W+/g, '-') || 'home'}-1440.png`, fullPage: true });
  });
}

for (const width of [1440, 1280, 1024, 768, 390, 360]) {
  test(`homepage has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 1280 ? 720 : 900 });
    await page.goto('/');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    for (const list of await page.getByRole('tablist').all()) {
      for (const tab of await list.getByRole('tab').all()) {
        await tab.click();
        await expect(tab).toHaveAttribute('aria-selected', 'true');
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      }
    }
    await page.screenshot({ path: `artifacts/qa/screenshots/home-${width}.png`, fullPage: true });
  });
}

test('all tabs support focus movement, manual activation and roving tabindex', async ({ page }) => {
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const list of await page.getByRole('tablist').all()) {
    const tabs = list.getByRole('tab');
    await tabs.first().focus();
    await page.keyboard.press('End');
    await expect(tabs.last()).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(tabs.last()).toHaveAttribute('aria-selected', 'true');
    const panel = page.locator(`[id="${await tabs.last().getAttribute('aria-controls')}"]`);
    await expect(panel).toBeVisible();
    await page.keyboard.press('Home');
    await expect(tabs.first()).toBeFocused();
    await page.keyboard.press('Space');
    await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
    await expect(list.locator('[role="tab"][tabindex="0"]')).toHaveCount(1);
  }
});

test('FAQ uses exclusive native disclosure and first is open', async ({ page }) => {
  await page.goto('/');
  const faq = page.locator('main details[name]').filter({ has: page.locator('summary') });
  expect(await faq.count()).toBeGreaterThanOrEqual(5);
  await expect(faq.first()).toHaveAttribute('open', '');
  await faq.nth(1).locator('summary').click();
  await expect(faq.nth(1)).toHaveAttribute('open', '');
  await expect(faq.first()).not.toHaveAttribute('open', '');
});

test('desktop navigation closes on Escape and restores trigger focus', async ({ page }) => {
  await page.goto('/');
  for (const name of ['Products', 'Resources', 'Community']) {
    // Native summary is a disclosure control; Chromium does not expose it to
    // Playwright's button role matcher even though its keyboard behaviour is native.
    const trigger = page.locator('header nav summary').filter({ hasText: name }).first();
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
  }
});

test('mobile navigation is a modal dialog with Escape restoration', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: /open.*menu|open.*navigation|menu/i }).first();
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('contact validates required fields without claiming delivery', async ({ page }) => {
  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(3);
  await expect(page.locator('[aria-live="polite"]').filter({ hasText: /required|check|correct/i }).first()).toBeVisible();
  await page.getByLabel('Name', { exact: true }).fill('Test Reader');
  await page.getByLabel('Email', { exact: true }).fill('invalid');
  await page.getByLabel('Message', { exact: true }).fill('Testing validation only.');
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
  await expect(page.getByLabel('Email', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByText(/message sent|delivered successfully/i)).toHaveCount(0);
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
});

test('no JavaScript keeps primary content and default states visible', async ({ browser }) => {
  const context = await browser.newContext({ baseURL: process.env.AUGUR_TEST_URL ?? 'http://127.0.0.1:4321', javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByText('With Augur, no party controls the answer.', { exact: true })).toBeVisible();
  for (const panel of await page.locator('[role="tabpanel"]:not([hidden])').all()) await expect(panel).toBeVisible();
  const faq = page.locator('main details[name]').first();
  await faq.locator('summary').click();
  await expect(faq).not.toHaveAttribute('open', '');
  await page.screenshot({ path: 'artifacts/qa/screenshots/home-no-javascript.png', fullPage: true });
  await context.close();
});

test('reduced motion renders settled content without running animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length)).toBe(0);
});

test('hero occupies the first desktop viewport at the required sizes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [width, height] of [[1440, 900], [1280, 720], [1920, 1080]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    const bounds = await page.locator('[data-home-hero]').boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds.y + bounds.height).toBeGreaterThanOrEqual(height - 1);
    if (width === 1440) expect(Math.abs(bounds.y + bounds.height - height)).toBeLessThanOrEqual(1);
  }
});

test('skip link and forced-colors retain keyboard access', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeVisible();
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => document.activeElement?.id)).toBe('main');
  await page.screenshot({ path: 'artifacts/qa/screenshots/home-forced-colors.png', fullPage: true });
});

test('unknown routes show the designed 404 and working recovery links', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main a[href="/"]')).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([]);
});

test('article copy link announces success and copies its canonical address', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/blog/why-disagreement-makes-an-oracle-stronger/');
  await page.getByRole('button', { name: 'Copy link', exact: true }).first().click();
  await expect(page.getByRole('status').filter({ hasText: 'Link copied' })).toHaveText('Link copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('https://www.augur.net/blog/why-disagreement-makes-an-oracle-stronger/');
});

// Polish brief (5 Oct 2026): looping tenet scenes, hover navigation, restored
// newsletter field, row hover states and the REP stake flows.
test('tenet diagrams loop while visible and pause off-screen', async ({ page }) => {
  await page.goto('/');
  const grid = page.locator('.tenet-grid');
  await grid.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  // One-off lead-ins (Permissionless crossers waiting for their first turn) pause and resume with the loops.
  const loops = () => page.evaluate(() => [...document.querySelectorAll('[data-cross],[data-mesh],[data-authority]')].flatMap(svg => svg.getAnimations({ subtree: true })).map(a => ({ state: a.playState, iterations: a.effect.getTiming().iterations })));
  const running = await loops();
  expect(running.filter(a => a.iterations === Infinity).length).toBeGreaterThan(20);
  expect(running.every(a => (a.iterations === Infinity || a.iterations === 1) && a.state === 'running')).toBe(true);
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(300);
  expect((await loops()).every(a => a.state === 'paused')).toBe(true);
  await grid.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  expect((await loops()).every(a => a.state === 'running')).toBe(true);
});

// Owner feedback (5 Oct 2026): the three diagrams are always moving while
// visible, with no start-stop-wait. Every sample differs from the previous one.
test('tenet diagrams never rest between samples while visible', async ({ page }) => {
  await page.goto('/');
  await page.locator('.tenet-grid').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const diagrams = await page.locator('[data-cross],[data-mesh],[data-authority]').all();
  let previous = await Promise.all(diagrams.map(diagram => diagram.screenshot()));
  for (let sample = 0; sample < 16; sample++) {
    await page.waitForTimeout(200);
    const current = await Promise.all(diagrams.map(diagram => diagram.screenshot()));
    current.forEach((shot, index) => expect(shot.equals(previous[index]), `diagram ${index} rested at sample ${sample}`).toBe(false));
    previous = current;
  }
});

// Owner feedback (6 Oct 2026): a Permissionless square crossing the edge never
// stops on it, including while the later crossers wait for their first turn,
// and no Trustless receiver stays lit.
test('Permissionless crossers never stop on the edge', async ({ page }) => {
  await page.goto('/');
  await page.locator('.tenet-grid').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const stops = await page.locator('[data-cross]').evaluate(svg => {
    const animations = svg.getAnimations({ subtree: true });
    animations.forEach(animation => animation.pause());
    const box = svg.getBoundingClientRect(), scale = box.width / 336, edges = [['y', 30], ['x', 294], ['y', 138], ['x', 42]];
    const crossers = [...svg.querySelectorAll('[data-crosser]')], stopped = crossers.map(() => 0);
    let previous = null;
    for (let time = 0; time <= 24000; time += 20) {
      animations.forEach(animation => { animation.currentTime = time; });
      const opacity = element => element === svg ? 1 : Number(getComputedStyle(element).opacity) * opacity(element.parentElement);
      const now = crossers.map(crosser => { const r = crosser.getBoundingClientRect(); return { x: (r.left - box.left) / scale, y: (r.top - box.top) / scale, opacity: opacity(crosser) }; });
      now.forEach((square, i) => {
        const [axis, at] = edges[i], onEdge = square[axis] < at + 1.5 && square[axis] + 20 > at - 1.5;
        if (previous && onEdge && square.opacity > .05 && Math.hypot(square.x - previous[i].x, square.y - previous[i].y) < .02) stopped[i] += 20;
      });
      previous = now;
    }
    return stopped;
  });
  expect(stops).toEqual([0, 0, 0, 0]);
  const receivers = page.locator('[data-authority] [data-motion^="auth-receiver"] > rect:first-child');
  await expect(receivers).toHaveCount(3);
  for (const fill of await receivers.evaluateAll(rects => rects.map(rect => rect.getAttribute('fill')))) expect(fill).toContain('--mark-participant');
});

// Owner pick (6 Oct 2026): "Pulse" squares. A square that lights up pops and
// its outline grows and fades; at rest the outlines are invisible.
test('tenet squares pulse when they light up', async ({ page }) => {
  await page.goto('/');
  await page.locator('.tenet-grid').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await expect(page.locator('[data-cross] [data-motion*="ring:"]')).toHaveCount(16);
  await expect(page.locator('[data-mesh] [data-motion^="mesh-ring:"]')).toHaveCount(12);
  await expect(page.locator('[data-authority] [data-motion*="-ring:"]')).toHaveCount(6);
  // Seat 5 brightens first, at 300 ms; 200 ms later it has popped and its outline is growing.
  const seat = await page.locator('[data-cross]').evaluate(svg => {
    svg.getAnimations({ subtree: true }).forEach(animation => { animation.pause(); animation.currentTime = 500; });
    const scale = element => new DOMMatrix(getComputedStyle(element).transform).a;
    const ring = svg.querySelector('[data-motion="cross-seat-ring:5"]'), pop = svg.querySelector('[data-motion="cross-seat-pop:5"]');
    return { opacity: Number(getComputedStyle(ring).opacity), ring: scale(ring), pop: scale(pop), resting: Number(getComputedStyle(svg.querySelector('[data-motion="cross-seat-ring:8"]')).opacity) };
  });
  expect(seat.opacity).toBeGreaterThan(.3);
  expect(seat.ring).toBeGreaterThan(1.2);
  expect(seat.pop).toBeGreaterThan(1.05);
  expect(seat.resting).toBe(0);
});

test('entrance scenes play once per session and F5 keeps them settled', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-home-hero]')).toHaveAttribute('data-hero-arrival', 'entering');
  const bonds = page.locator('[data-bonds]');
  await bonds.scrollIntoViewIfNeeded();
  await expect.poll(() => bonds.evaluate(element => element.getAnimations({ subtree: true }).length)).toBeGreaterThan(0);
  await page.reload();
  await expect(page.locator('[data-home-hero]')).toHaveAttribute('data-hero-arrival', 'settled');
  // The “decentralized” underline is the owner's one exception: it sweeps in and out on every load.
  expect(await page.locator('[data-home-hero]').evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.effect?.getTiming().iterations !== Infinity && animation.playState === 'running' && !animation.animationName?.startsWith('hero-underline')).length)).toBe(0);
  await bonds.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  expect(await bonds.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
});

test('opening a FAQ question animates; the open question on load does not', async ({ page }) => {
  await page.goto('/');
  const items = page.locator('.home-faq .faq-item');
  await items.first().scrollIntoViewIfNeeded();
  expect(await items.first().locator('.faq-answer p').evaluate(element => element.getAnimations().length)).toBe(0);
  const started = await items.nth(2).evaluate(item => {
    item.querySelector('summary').click();
    return { transition: 'faqTransition' in document.documentElement.dataset, opening: 'faqOpening' in item.dataset };
  });
  expect(started).toEqual({ transition: true, opening: true });
  await expect(items.nth(2)).toHaveAttribute('open', '');
  await expect(items.first()).not.toHaveAttribute('open', '');
  await expect.poll(() => page.evaluate(() => 'faqTransition' in document.documentElement.dataset)).toBe(false);
});

test('switching header panels glides the panel instead of reopening it', async ({ page }) => {
  await page.goto('/');
  const trigger = name => page.locator('header nav summary').filter({ hasText: name }).first();
  await trigger('Products').hover();
  await expect(trigger('Products')).toHaveAttribute('aria-expanded', 'true');
  const glide = await page.evaluate(() => {
    const resources = document.querySelectorAll('[data-nav-disclosure]')[1];
    resources.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'mouse' }));
    return { open: resources.open, animations: resources.querySelector('.nav-panel').getAnimations({ subtree: true }).length };
  });
  expect(glide.open).toBe(true);
  expect(glide.animations).toBeGreaterThan(0);
  await expect(trigger('Products')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('[data-nav-highlight]')).toHaveAttribute('data-visible', '');
});

test('the header highlight is a Green line that draws in under the label and retracts', async ({ page }) => {
  await page.goto('/');
  const line = await page.evaluate(() => {
    const nav = document.querySelector('header .desktop-nav'), item = nav.querySelector('.nav-link'), rule = nav.querySelector('[data-nav-highlight]');
    const frames = () => rule.getAnimations()[0].effect.getKeyframes().map(frame => { const matrix = new DOMMatrix(frame.transform); return { scale: matrix.a, x: matrix.e }; });
    const probe = document.createElement('span');
    probe.style.color = 'var(--primary)';
    document.body.append(probe);
    const green = getComputedStyle(probe).color;
    probe.remove();
    item.dispatchEvent(new PointerEvent('pointerenter', { pointerType: 'mouse' }));
    const draw = frames();
    rule.getAnimations().forEach(animation => animation.finish());
    const box = rule.getBoundingClientRect(), label = item.querySelector('.nav-item-label').getBoundingClientRect();
    nav.dispatchEvent(new PointerEvent('pointerleave', { pointerType: 'mouse' }));
    return { draw, retract: frames(), origin: getComputedStyle(rule).transformOrigin, height: box.height, offsets: [box.left - label.left, box.width - label.width, box.top - label.bottom], green: getComputedStyle(rule).backgroundColor === green, fill: getComputedStyle(item).backgroundColor };
  });
  // Both run from the label's left edge: in left to right, out right to left.
  expect(line.origin.startsWith('0px')).toBe(true);
  expect([line.draw[0].scale, line.retract[1].scale]).toEqual([0, 0]);
  expect(line.draw[1].scale).toBeGreaterThan(0);
  expect(line.retract[0].scale).toBe(line.draw[1].scale);
  for (const frames of [line.draw, line.retract]) expect(frames[0].x).toBe(frames[1].x);
  expect(line.height).toBe(2);
  for (const offset of line.offsets) expect(Math.abs(offset)).toBeLessThan(0.5);
  expect(line.green).toBe(true);
  expect(line.fill).toBe('rgba(0, 0, 0, 0)');
});

test('walkthrough crosses off completed steps and strikes the replaced answer', async ({ page }) => {
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('#walkthrough-tab-2').click();
  const done = page.locator('.walkthrough-steps .step-done');
  expect(await done.evaluateAll(marks => marks.map(mark => getComputedStyle(mark).opacity))).toEqual(['1', '1', '0', '0']);
  const panel = page.locator('#walkthrough-panel-2');
  await expect(panel.locator('.outcome-chip.is-replaced s')).toHaveText('YES');
  await expect(panel.locator('.outcome-chip.is-selected')).toContainText('NO');
  await expect(panel.locator('.query-ledger [data-replaced-at] s')).toHaveText('Reported Yes · bond locked');
  await expect(page.locator('#walkthrough-panel-1 .query-ledger s')).toHaveCount(0);
});

test('social destinations carry their logos', async ({ page }) => {
  await page.goto('/');
  for (const name of ['Discord', 'Telegram', 'X', 'GitHub']) await expect(page.locator('.site-footer nav').getByRole('link', { name, exact: true }).locator('.social-logo svg')).toHaveCount(1);
});

test('the answer statement rises word by word as the ribbon reaches it', async ({ page }) => {
  await page.goto('/');
  const band = page.locator('[data-answer-band]');
  await band.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('.ribbon-word')?.getAnimations().length);
  const sweep = await band.evaluate(element => {
    element.getAnimations({ subtree: true }).forEach(animation => animation.pause());
    const words = [...element.querySelectorAll('.ribbon-word')].map(word => {
      const animation = word.getAnimations()[0], [from, to] = animation.effect.getKeyframes();
      return { text: word.textContent, delay: animation.effect.getTiming().delay, from: [from.opacity, from.transform], to: [to.opacity, to.transform] };
    });
    return { words, hidden: element.querySelector('.ribbon-overlay').getAttribute('aria-hidden'), live: element.querySelector('[data-answer]').childNodes.length };
  });
  // Only the aria-hidden Navy copy moves; the live statement stays one text node.
  expect(sweep.hidden).toBe('true');
  expect(sweep.live).toBe(1);
  expect(sweep.words.map(word => word.text).join(' ')).toBe('With Augur, no party controls the answer.');
  for (const word of sweep.words) {
    expect(word.from[0]).toBe('0');
    expect(word.from[1]).toMatch(/^translateY\(/);
    expect(word.to).toEqual(['1', 'none']);
  }
  // One line at 1440: the front reaches the words left to right.
  const delays = sweep.words.map(word => word.delay);
  expect(delays).toEqual([...delays].sort((a, b) => a - b));
  expect(delays[0]).toBeGreaterThan(0);
  expect(delays.at(-1)).toBeLessThan(900);
});

test('answer statement is live, selectable text on the settled ribbon', async ({ page }) => {
  await page.goto('/');
  const band = page.locator('[data-answer-band]');
  await band.scrollIntoViewIfNeeded();
  await expect(band).toHaveAttribute('data-ribbon', 'settled', { timeout: 4000 });
  const answer = band.locator('[data-answer]');
  await expect(answer).toHaveText('With Augur, no party controls the answer.');
  expect(await answer.evaluate(element => getComputedStyle(element).userSelect)).not.toBe('none');
  await expect(band.locator('.ribbon-overlay')).toHaveCount(0);
});

test('desktop navigation opens on hover and switches panels without closing', async ({ page }) => {
  await page.goto('/');
  const trigger = name => page.locator('header nav summary').filter({ hasText: name }).first();
  await trigger('Products').hover();
  await expect(trigger('Products')).toHaveAttribute('aria-expanded', 'true');
  await trigger('Resources').hover();
  await expect(trigger('Resources')).toHaveAttribute('aria-expanded', 'true');
  await expect(trigger('Products')).toHaveAttribute('aria-expanded', 'false');
  const panel = await page.locator('#nav-1').boundingBox();
  await page.mouse.move(panel.x + 40, panel.y + 30, { steps: 6 });
  await expect(trigger('Resources')).toHaveAttribute('aria-expanded', 'true');
  await page.mouse.move(700, 700);
  await expect(trigger('Resources')).toHaveAttribute('aria-expanded', 'false');
});

test('Augur Lituus leads the products panel with one action across its card', async ({ page }) => {
  await page.goto('/');
  await page.locator('header nav summary').filter({ hasText: 'Products' }).first().click();
  const panel = page.locator('#nav-0');
  await expect(panel.locator('li .nav-label')).toHaveText(['Augur Lituus', 'Zoltar', 'Augur Stratoblast']);
  const feature = panel.locator('.nav-feature');
  await expect(feature.getByRole('link')).toHaveCount(1);
  await expect(feature.getByRole('link', { name: 'Explore Augur Lituus', exact: true })).toHaveAttribute('href', '/products/#augur-lituus');
  // The action's hit area covers the card, so the title follows it too.
  const head = await feature.locator('.nav-feature-head').boundingBox();
  expect(await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest('a')?.getAttribute('href'), { x: head.x + 40, y: head.y + 10 })).toBe('/products/#augur-lituus');
  // Keyboard order follows the emphasis: Augur Lituus, then Zoltar and Augur Stratoblast.
  for (const name of [/^Explore Augur Lituus$/, /^Zoltar/, /^Augur Stratoblast/]) {
    await page.keyboard.press('Tab');
    await expect(panel.getByRole('link', { name })).toBeFocused();
  }
});

test('newsletter field validates locally and never sends or claims a subscription', async ({ page }) => {
  const posts = [];
  page.on('request', request => { if (request.method() !== 'GET' || request.url().includes('email=')) posts.push(request.url()); });
  await page.goto('/');
  const field = page.getByLabel('Email address');
  await expect(field).toHaveAttribute('placeholder', 'you@example.com');
  await page.getByRole('button', { name: 'Subscribe' }).click();
  await expect(field).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#newsletter-email-error')).toHaveText('Enter your email address.');
  await field.fill('reader@example.org');
  await field.press('Enter');
  await expect(page.getByRole('status').filter({ hasText: 'nothing was sent or saved' })).toBeVisible();
  await expect(page.getByText(/subscribed|you're in|thanks for subscribing/i)).toHaveCount(0);
  expect(posts).toEqual([]);
  expect(page.url()).not.toContain('email=');
});

test('closed FAQ questions respond to hover and keyboard focus', async ({ page }) => {
  await page.goto('/');
  const item = page.locator('.home-faq .faq-item').nth(1);
  await item.scrollIntoViewIfNeeded();
  const before = await item.evaluate(element => getComputedStyle(element).backgroundColor);
  await item.locator('summary').hover();
  await expect.poll(() => item.evaluate(element => getComputedStyle(element).backgroundColor)).not.toBe(before);
  await page.mouse.move(5, 5);
  await item.locator('summary').focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  await expect.poll(() => item.evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid');
});

test('REP section explains stakes without the removed status sentence', async ({ page }) => {
  await page.goto('/');
  const rep = page.locator('.rep');
  await expect(rep.getByText('Proposed rules for Augur Lituus, which is in development.')).toHaveCount(0);
  await expect(rep.getByRole('img', { name: /if no one challenges, your bond comes back/i })).toBeVisible();
  await expect(rep.getByRole('link', { name: 'Learn about REP' })).toHaveClass(/outline/);
  await expect(page.locator('.home-blog').getByRole('link', { name: 'View all posts' })).toHaveClass(/outline/);
});

// Owner iteration (6 Oct 2026): reload never replays scenes, even where storage is blocked, except
// the answer ribbon and the hero underline; the hero underline sits under the letters with no glow and is temporary; the market example
// plays a small query; the hero answers the pointer and taps; past roadmap milestones read as done; Activity is a timeline;
// REP actions are rows with icons; only the Peer mesh glows.
test('a reload settles entrance scenes even where storage is blocked, but the answer ribbon still sweeps', async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(window, 'sessionStorage', { get() { throw new DOMException('Access is denied for this document.', 'SecurityError'); } }); });
  await page.goto('/');
  await page.reload();
  await expect(page.locator('[data-home-hero]')).toHaveAttribute('data-hero-arrival', 'settled');
  // The owner's exception: the answer ribbon sweeps once per load, a reload included.
  const band = page.locator('[data-answer-band]');
  await expect(band).toHaveAttribute('data-ribbon', 'armed');
  await band.scrollIntoViewIfNeeded();
  await expect.poll(() => band.evaluate(element => element.getAnimations({ subtree: true }).length)).toBeGreaterThan(0);
  await expect(band).toHaveAttribute('data-ribbon', 'settled', { timeout: 4000 });
  const bonds = page.locator('[data-bonds]');
  await bonds.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  expect(await bonds.evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
});

test('the decentralized underline sweeps in and out on every load and on hover, just under the letters', async ({ page }) => {
  await page.goto('/');
  await page.reload();
  const emphasis = page.locator('.hero-emphasis');
  const sweep = await emphasis.evaluate(element => {
    const scale = transform => transform === 'none' ? 1 : new DOMMatrix(transform).a;
    const animations = element.getAnimations({ subtree: true }).filter(animation => animation.effect.pseudoElement === '::after');
    const timing = animations.map(animation => ({ name: animation.animationName, delay: animation.effect.getTiming().delay, frames: animation.effect.getKeyframes().map(frame => scale(frame.transform)) }));
    animations.forEach(animation => animation.finish());
    const probe = document.createElement('span');
    probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
    element.prepend(probe);
    const baseline = probe.getBoundingClientRect().top - element.getBoundingClientRect().top;
    probe.remove();
    const line = getComputedStyle(element, '::after'), hover = getComputedStyle(element, '::before');
    return { timing, settled: scale(line.transform), origin: line.transformOrigin, gap: parseFloat(line.top) - baseline, size: parseFloat(getComputedStyle(element).fontSize), sameSpot: [hover.top, hover.height, hover.width].join() === [line.top, line.height, line.width].join() };
  });
  // In left to right, then out right to left to the same left edge; nothing stays behind.
  expect(sweep.timing.map(animation => animation.name)).toEqual(['hero-underline-in', 'hero-underline-out']);
  expect(sweep.timing.map(animation => animation.frames)).toEqual([[0, 1], [1, 0]]);
  expect(sweep.timing[1].delay).toBeGreaterThan(sweep.timing[0].delay);
  expect(sweep.settled).toBe(0);
  expect(sweep.origin.startsWith('0px')).toBe(true);
  expect(sweep.gap).toBeGreaterThan(0);
  expect(sweep.gap).toBeLessThan(sweep.size * .15);
  expect(sweep.sameSpot).toBe(true);
  const hoverScale = () => emphasis.evaluate(element => { const transform = getComputedStyle(element, '::before').transform; return transform === 'none' ? 1 : new DOMMatrix(transform).a; });
  await emphasis.hover();
  await expect.poll(hoverScale).toBe(1);
  await page.mouse.move(4, 600);
  await expect.poll(hoverScale).toBe(0);
  expect(await page.locator('.home-hero [style*="filter"], .home-hero [style*="blur"]').count()).toBe(0);
});

test('text actions draw a line under the label on hover and retract it', async ({ page }) => {
  await page.goto('/');
  const action = page.locator('.hero-actions .button.text');
  const line = () => action.evaluate(element => {
    const label = element.querySelector('.button-label'), style = getComputedStyle(label, '::after');
    return { scale: style.transform === 'none' ? 1 : new DOMMatrix(style.transform).a, origin: style.transformOrigin, height: style.height, labelWidth: label.getBoundingClientRect().width, width: parseFloat(style.width), decoration: getComputedStyle(element).textDecorationLine };
  });
  expect((await line()).scale).toBe(0);
  await action.hover();
  await expect.poll(async () => (await line()).scale).toBe(1);
  const drawn = await line();
  expect(drawn.origin.startsWith('0px')).toBe(true);
  expect(drawn.height).toBe('2px');
  expect(Math.abs(drawn.width - drawn.labelWidth)).toBeLessThan(.5);
  expect(drawn.decoration).toBe('none');
  await page.mouse.move(4, 600);
  await expect.poll(async () => (await line()).scale).toBe(0);
});

test('a small scroll cue sits under the hero content, loops at the top and goes once the page scrolls', async ({ page }) => {
  await page.goto('/');
  const cue = page.locator('[data-scroll-cue]');
  await expect(cue).toHaveAttribute('aria-hidden', 'true');
  const state = () => cue.evaluate(element => {
    const box = element.getBoundingClientRect(), hit = other => { const b = document.querySelector(other).getBoundingClientRect(); return !(box.right <= b.left || b.right <= box.left || box.bottom <= b.top || b.bottom <= box.top); };
    const loop = element.querySelector('.hero-scroll-dot').getAnimations()[0];
    return { inView: box.bottom <= innerHeight, overlaps: hit('.hero-copy') || hit('[data-hero-art]'), loop: loop && { iterations: loop.effect.getTiming().iterations, state: loop.playState }, opacity: getComputedStyle(element).opacity };
  });
  const top = await state();
  expect(top.inView).toBe(true);
  expect(top.overlaps).toBe(false);
  expect(top.loop).toEqual({ iterations: Infinity, state: 'running' });
  await page.mouse.wheel(0, 400);
  await expect(cue).toHaveAttribute('data-scrolled', '');
  await expect.poll(async () => (await state()).opacity).toBe('0');
  expect((await state()).loop.state).toBe('paused');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(cue).toBeHidden();
});

// Owner (6 Oct 2026): the Yes/No market result "doesn't really indicate much". It
// is now a small query, rendered final, that plays from asked to final whenever
// its tab is chosen; the earlier looks are temporary overlays hidden from assistive technology.
test('the prediction market example is a small query that plays from asked to final', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('[data-market-query]');
  await expect(card.locator('.market-question')).toHaveText('Was the milestone demonstrated by the deadline?');
  await expect(card.locator('.market-status')).toHaveText('Final answer');
  await expect(card.locator('[data-stage]')).toHaveText(['Asked', 'Reported Yes', 'Not challenged', 'Final']);
  await expect(card.locator('.market-outcomes > li')).toHaveText(['Yes, final answer', 'No', 'Invalid']);
  await expect(page.locator('.applications').getByRole('radio')).toHaveCount(0);
  await page.getByRole('tab', { name: /Insurance/ }).click();
  await page.getByRole('tab', { name: /Prediction markets/ }).click();
  const pending = card.locator('.market-status.is-pending');
  await expect(pending).toHaveText(['Awaiting report', 'Open to challenge']);
  expect(await pending.evaluateAll(nodes => nodes.every(node => node.getAttribute('aria-hidden') === 'true'))).toBe(true);
  await expect(card.locator('.outcome-veil')).toHaveCount(2);
  await expect(pending).toHaveCount(0, { timeout: 6000 });
  await expect(card.locator('.outcome-veil')).toHaveCount(0);
  await expect(card.locator('.market-status')).toHaveCSS('opacity', '1');
});

// Owner (6 Oct 2026): the 112 px “One backstop for every app.” band implied that a
// backstop is Augur Lituus's only use. The band is now one slim line naming the oracle,
// and the fallback use is one app's choice, inside the Insurance panel only.
test('the Augur Lituus band is one slim line and the fallback use sits in one example', async ({ page }) => {
  await page.goto('/');
  const band = page.locator('.application-oracle');
  await expect(band.locator('h3')).toHaveText('Augur Lituus');
  await expect(band.locator('p')).toHaveText('One oracle for every app.');
  expect((await band.boundingBox()).height).toBeLessThanOrEqual(64);
  await expect(page.locator('.applications')).not.toContainText(/backstop/i);
  await expect(page.locator('.app-fallback')).toHaveCount(1);
  await expect(page.locator('#application-panel-insurance .app-fallback')).toHaveText('The app could also use a faster oracle on its own chain or L2, and turn to Augur Lituus only when a claim is disputed.');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('#application-tab-insurance').click();
  const name = await page.locator('#application-tab-insurance .app-name').boundingBox();
  const story = await page.locator('#application-panel-insurance .app-story').boundingBox();
  expect(story.y).toBeGreaterThan(name.y + name.height);
});

// Owner (6 Oct 2026): the grants example (“Published.”) was weak. It is now a prize
// challenge whose answer is one of three teams, not yes or no.
test('the DAOs & grants example is a prize challenge with one winning team', async ({ page }) => {
  await page.goto('/');
  const tab = page.locator('#application-tab-grants');
  await expect(tab).toContainText('Which team shipped a working prototype first?');
  await tab.click();
  const panel = page.locator('#application-panel-grants');
  await expect(panel.locator('h3')).toHaveText('Award a grant.');
  await expect(panel.locator('.prize-teams > li')).toHaveText(['Team A', 'Team B, final answer', 'Team C']);
  await expect(panel.locator('.prize-teams .is-winner')).toHaveCount(1);
  await expect(panel.locator('.prize-caption')).toHaveText('Prize sent to Team B');
  await expect(panel).not.toContainText('Published');
});

// Owner (6 Oct 2026): no one-sided Green bar on the open application card; its icon
// tile fills Green instead, at every width.
test('the open application card is marked by a Green icon tile, not an edge', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const tab = page.locator('.application-tab[aria-selected="true"]');
    expect(await tab.evaluate(element => ['Top', 'Right', 'Bottom', 'Left'].map(side => getComputedStyle(element)[`border${side}Width`]))).toEqual(['0px', '0px', '0px', '0px']);
    await expect(tab.locator('.app-icon')).toHaveCSS('background-color', 'rgb(42, 231, 168)');
    await expect(page.locator('.application-tab[aria-selected="false"] .app-icon').first()).not.toHaveCSS('background-color', 'rgb(42, 231, 168)');
  }
});

// Owner (6 Oct 2026): subtle motion for Insurance and DAOs & grants. Each plays
// when its tab is chosen and ends on the rendered final state: the flight's arrival
// slides out from the scheduled-arrival tick; Team B turns from a plain tile (an
// aria-hidden veil) to the Green winner and the caption rises in.
test('the insurance and prize examples play in when chosen and settle on their final state', async ({ page }) => {
  await page.goto('/');
  await page.locator('#application-tab-insurance').click();
  const run = page.locator('.flight-run');
  // The panel stays hidden for the 160 ms outgoing fade, where Chromium reports no animated style.
  await expect.poll(() => run.evaluate(element => getComputedStyle(element).transform)).not.toBe('none');
  await expect.poll(() => run.evaluate(element => getComputedStyle(element).transform), { timeout: 4000 }).toBe('none');
  await expect(page.locator('.flight-summary > span:last-child')).toHaveCSS('opacity', '1');
  await page.locator('#application-tab-grants').click();
  const veil = page.locator('.prize-veil');
  await expect(veil).toHaveAttribute('aria-hidden', 'true');
  await expect(veil).toHaveCount(0, { timeout: 4000 });
  await expect(page.locator('.prize-caption')).toHaveCSS('opacity', '1');
  await expect(page.locator('.is-winner .web-icon')).toHaveCSS('opacity', '1');
});

test('with reduced motion the examples do not play, and the flight square stays square', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1440, 768, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('#application-tab-insurance').click();
    await expect(page.locator('#application-panel-insurance')).toBeVisible();
    const box = await page.locator('.flight-arrival').boundingBox();
    expect([Math.round(box.width), Math.round(box.height)]).toEqual([14, 14]);
    expect(await page.locator('.flight-run').evaluate(element => element.getAnimations().length)).toBe(0);
  }
  await page.locator('#application-tab-grants').click();
  await expect(page.locator('#application-panel-grants')).toBeVisible();
  await expect(page.locator('.prize-veil')).toHaveCount(0);
});

test('the hero lens parts squares near the pointer and a click sends a ripple', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => document.querySelector('[data-home-hero]')?.dataset.ambient === 'running', null, { timeout: 8000 });
  const art = page.locator('[data-hero-art]');
  const box = await art.boundingBox();
  await page.mouse.move(box.x + box.width * .6, box.y + box.height * .4, { steps: 6 });
  await expect.poll(() => art.evaluate(element => [...element.querySelectorAll('.hero-sq')].filter(square => square.style.transform).length)).toBeGreaterThan(5);
  await page.mouse.click(box.x + box.width * .2, box.y + box.height * .7);
  await expect(art.locator('.hero-ripple')).toHaveCount(1);
});

test('past roadmap milestones read as done and only the current leg is Green', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.roadmap-stop.is-completed .web-icon')).toHaveCount(3);
  await expect(page.locator('[data-track-live]')).toHaveCount(1);
  const colours = await page.locator('.roadmap-tabs .roadmap-label').evaluateAll(labels => labels.map(label => getComputedStyle(label).color));
  expect(colours[0]).toBe(colours[1]);
  expect(colours[0]).not.toBe(colours[3]);
});

test('walkthrough activity is a timeline with the latest event in Green', async ({ page }) => {
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('#walkthrough-tab-3').click();
  const panel = page.locator('#walkthrough-panel-3');
  await expect(panel.locator('.query-ledger li')).toHaveCount(4);
  await expect(panel.locator('.ledger-node .web-icon')).toHaveCount(4);
  expect(await panel.locator('[data-ledger-latest] .ledger-node').evaluate(node => getComputedStyle(node).backgroundColor)).toBe('rgb(42, 231, 168)');
});

test('REP actions are rows with icons that replay their flow on hover', async ({ page }) => {
  await page.goto('/');
  const rows = page.locator('.rep .stake-row');
  await expect(rows).toHaveCount(3);
  await expect(page.locator('.rep .stake-icon .web-icon')).toHaveCount(3);
  expect(new Set(await rows.evaluateAll(items => items.map(item => Math.round(item.getBoundingClientRect().top)))).size).toBe(3);
  await rows.first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  await rows.nth(1).hover();
  // The ambient loop always runs; the replay is everything else.
  await expect.poll(() => rows.nth(1).evaluate(row => row.getAnimations({ subtree: true }).filter(animation => animation.playState === 'running' && animation.id !== 'rep-loop').length)).toBeGreaterThan(0);
});

// Owner (6 Oct 2026): the REP rows were not aligned. Each row now has one axis
// through icon, title, squares, arrow, “+” and the text's first line; the condition
// is centred over its arrow; arrows and outcomes line up across rows, phones included.
test('REP rows share one axis and their arrows line up across rows', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const rows = await page.locator('.stake-row').evaluateAll(items => items.map(row => {
      const box = selector => row.querySelector(selector).getBoundingClientRect(), mid = selector => box(selector).top + box(selector).height / 2;
      const text = row.querySelector(':scope > p'), line = box('.flow-line'), label = box('.flow-condition');
      return { axis: [mid('[data-stake] .blocks'), mid('.flow-arrow'), ...[...row.querySelectorAll('.flow-outcome .blocks, .flow-plus')].map(node => node.getBoundingClientRect()).map(b => b.top + b.height / 2)],
        head: [mid('.stake-icon'), mid('h3')], first: text.getBoundingClientRect().top + parseFloat(getComputedStyle(text).lineHeight) / 2,
        labelOffset: Math.abs(label.left + label.width / 2 - (line.left + line.width / 2)), lineLeft: Math.round(line.left), lineWidth: Math.round(line.width), outcome: Math.round(box('.flow-outcome').left) };
    }));
    for (const row of rows) {
      for (const y of row.axis) expect(Math.abs(y - row.axis[0])).toBeLessThanOrEqual(1);
      expect(row.labelOffset).toBeLessThanOrEqual(1);
      if (width === 1440) for (const y of [...row.head, row.first]) expect(Math.abs(y - row.axis[0])).toBeLessThanOrEqual(1);
    }
    for (const key of ['lineLeft', 'lineWidth', 'outcome']) expect(new Set(rows.map(row => row[key])).size).toBe(1);
  }
});

// Owner (6 Oct 2026): “more alive”, then option B of three sketches: a copy of the
// bond glides along the arrow and lands on the returned bond (winnings pop; Risk's copy
// fades into the lost bond). It runs on elements of its own, invisible at rest, and
// lands exactly on the outcome at any width.
test('the REP rows loop a gliding bond that lands on the outcome and is invisible at rest', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.locator('.stake-flows').scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => document.getAnimations().filter(animation => animation.id === 'rep-loop' && animation.playState === 'running').length)).toBe(9);
    expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.id === 'rep-loop').every(animation => animation.effect.getTiming().iterations === Infinity))).toBe(true);
    // Lead 1800 + first send 60 + travel 1200 (rep-choreography.ts): the first row's copy has landed.
    const landed = await page.evaluate(() => {
      // The once-per-visit entrance may still be sliding the returned bond in; settle it first.
      document.querySelector('.stake-flows').getAnimations({ subtree: true }).filter(animation => animation.id !== 'rep-loop').forEach(animation => animation.finish());
      document.getAnimations().filter(animation => animation.id === 'rep-loop').forEach(animation => { animation.pause(); animation.currentTime = 3060; });
      const row = document.querySelector('.stake-row'), ghost = row.querySelector('.flow-ghost i').getBoundingClientRect(), bond = row.querySelector('.flow-outcome .blocks i').getBoundingClientRect();
      return [Math.round(ghost.left - bond.left), Math.round(ghost.top - bond.top)];
    });
    expect(landed).toEqual([0, 0]);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('.flow-ghost, .flow-flash').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '0'))).toBe(true);
  await expect(page.locator('.flow-arrow')).toHaveCount(3);
});

test('only the Peer mesh glows', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('[data-cross] [style*="filter"], [data-authority] [style*="filter"]').count()).toBe(0);
  expect(await page.locator('[data-mesh] [style*="filter"]').count()).toBeGreaterThan(0);
});

test('the footer links to brand assets, whose downloads resolve and whose colors copy', async ({ page, context }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Footer Augur' }).getByRole('link', { name: 'Brand assets' }).click();
  await expect(page).toHaveURL(/\/brand\/$/);
  const downloads = await page.locator('main a[download]').evaluateAll(links => [...new Set(links.map(link => link.getAttribute('href')))]);
  expect(downloads.length).toBe(27);
  for (const href of downloads) expect((await page.request.get(href)).status(), href).toBe(200);
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const green = page.getByRole('button', { name: 'Copy Augur Green hex #2AE7A8' });
  await green.click();
  await expect(green).toContainText('Copied');
  await expect(page.locator('[data-copy-status]')).toHaveText('Copied #2AE7A8');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('#2AE7A8');
  for (const width of [1024, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${width}px`).toBe(true);
  }
});
