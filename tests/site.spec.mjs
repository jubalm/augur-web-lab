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
    // The first controlled id is the tab's panel (the walkthrough also lists its REP panel).
    const panel = page.locator(`[id="${(await tabs.last().getAttribute('aria-controls')).split(' ')[0]}"]`);
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
  await expect(page.getByText("With Augur, users don't rely on parties to control answers.", { exact: true })).toBeVisible();
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
  const roadmap = page.locator('[data-roadmap]');
  await roadmap.scrollIntoViewIfNeeded();
  await expect.poll(() => roadmap.evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.effect.getTiming().iterations !== Infinity).length)).toBeGreaterThan(0);
  await page.reload();
  await expect(page.locator('[data-home-hero]')).toHaveAttribute('data-hero-arrival', 'settled');
  // The “decentralized” underline is the owner's one exception: it sweeps in and out on every load.
  expect(await page.locator('[data-home-hero]').evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.effect?.getTiming().iterations !== Infinity && animation.playState === 'running' && !animation.animationName?.startsWith('hero-underline')).length)).toBe(0);
  await roadmap.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  // The Now stop's slow CSS pulse is the one loop the roadmap keeps.
  expect(await roadmap.evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.effect.getTiming().iterations !== Infinity).length)).toBe(0);
});

test('opening a FAQ question animates; the open question on load does not', async ({ page }) => {
  await page.goto('/');
  const items = page.locator('.home-learn .faq-item');
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
  // Owner (19 Oct 2026): once an outcome is picked, the others step back alike; only a final answer strikes them.
  await expect(panel.locator('.outcome-chip.is-selected')).toContainText('NO');
  await expect(panel.locator('.outcome-chip.is-other')).toHaveCount(2);
  await expect(panel.locator('.outcome-chip s')).toHaveCount(0);
  await expect(page.locator('#walkthrough-panel-3 .outcome-chip.is-out s')).toHaveText(['YES', 'Invalid']);
  await expect(panel.locator('.query-ledger [data-replaced-at] s')).toHaveText('Reported YES');
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
  expect(sweep.words.map(word => word.text).join(' ')).toBe("With Augur, users don't rely on parties to control answers.");
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
  await expect(answer).toHaveText("With Augur, users don't rely on parties to control answers.");
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
  const item = page.locator('.home-learn .faq-item').nth(1);
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

// Owner iteration (6 Oct 2026): reload never replays scenes, even where storage is blocked, except
// the answer ribbon and the hero underline; the hero underline sits under the letters with no glow and is temporary; the market example
// plays a small query; the hero answers the pointer and taps; past roadmap milestones read as done; Activity is a timeline;
// only the Peer mesh glows.
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
  const roadmap = page.locator('[data-roadmap]');
  await roadmap.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  // The Now stop's slow CSS pulse is the one loop the roadmap keeps.
  expect(await roadmap.evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.effect.getTiming().iterations !== Infinity).length)).toBe(0);
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

// Owner (18 Oct 2026): one case at a time, picked by the reader; alive, colour, big text;
// Prediction markets first; the mechanism stays in How it works. Each case is one sentence:
// the question, Augur Lituus's answer, and what the case's app does next. Prediction markets
// plays once in view and every case plays when picked; the play only reveals what is rendered.
test('each use case reads as a question, Augur Lituus\'s answer and the app\'s action', async ({ page }) => {
  await page.goto('/');
  const prediction = page.locator('#application-panel-prediction');
  await expect(prediction.locator('.case-question')).toHaveText('Did the rocket reach orbit on its first try?');
  // Every question is Yes or No; both show as chips, the picked one fills Green and the other steps
  // back (owner, 19 Oct 2026). Screen readers hear both and the answer.
  await expect(prediction.locator('.case-option')).toHaveText(['YesYes', 'No']);
  await expect(prediction.locator('.case-pick')).toHaveText('Yes');
  await expect(prediction.locator('.case-answer .sr-only')).toHaveText('Possible answers: Yes or No. Answer: Yes.');
  // Each case names the party kept out of the decision (owner, 19 Oct 2026, from Augus's notes).
  await expect(prediction.locator('.case-by')).toHaveText('Decided in the open, not by the market’s own team.');
  await expect(prediction.locator('.case-act > p')).toHaveText(['Settle a market.', 'Pay out the Yes side and close the No side.']);
  // No query card, stages or outcomes here: How it works, below, explains the mechanism.
  await expect(page.locator('.applications [data-stage], .applications .market-outcomes, .applications .market-status')).toHaveCount(0);
  await prediction.scrollIntoViewIfNeeded();
  await page.getByRole('tab', { name: 'DAOs & governance' }).click();
  const governance = page.locator('#application-panel-governance');
  // A No that stops an action (owner, 19 Oct 2026: more than payouts, and Yes or No like the rest).
  await expect(governance.locator('.case-pick')).toHaveText('No');
  await expect(governance.locator('.case-act > p')).toHaveText(['Hold the upgrade.', 'The proposal goes live once a later review passes.']);
  await expect(governance.locator('.case-by')).toHaveText('Decided in the open, not by the team behind the upgrade.');
  // The play only reveals what is rendered (owner, 19 Oct 2026 polish pass): once it ends, the action,
  // the chip's check and the picture are all at rest, and the other answer steps back.
  await expect.poll(() => governance.evaluate(panel => panel.getAnimations({ subtree: true }).length), { timeout: 8000 }).toBe(0);
  await expect(governance.locator('.case-action')).toHaveCSS('opacity', '1');
  await expect(governance.locator('.case-check polyline')).toHaveCSS('stroke-dashoffset', '0px');
  await expect(governance.locator('.case-graphic')).toHaveCSS('opacity', '1');
  await expect(governance.locator('.case-option.is-other')).toHaveCSS('opacity', '0.4');
});

// Owner (19 Oct 2026: "clear and organized"): the cases are a list beside one worked example; each row
// names its kind of app and what it covers, and the picked row is the example's own surface, marked by
// its Green icon tile (6 Oct: never a side edge). The stage keeps one height for every case. Insurance
// keeps the fallback use (6 Oct).
test('the use-case tabs show one case at a time on a steady stage', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const tabs = page.locator('.applications [role="tab"]');
  await expect(tabs.locator('.case-name')).toHaveText(['Prediction markets', 'Insurance & payments', 'DAOs & governance']);
  await expect(page.locator('.applications [role="tablist"]')).toHaveAttribute('aria-orientation', 'vertical');
  for (const name of ['Prediction markets', 'Insurance & payments', 'DAOs & governance']) await expect(page.getByRole('tab', { name, exact: true })).toHaveCount(1);
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.first().locator('.case-icon')).toHaveCSS('background-color', 'rgb(42, 231, 168)');
  // The picked row's surface is one marker in the stage's colour that glides to the row picked (owner,
  // 19 Oct 2026 polish pass); reduced motion moves it at once.
  const marker = page.locator('.case-marker');
  await expect(marker).toHaveCSS('background-color', await page.locator('.case-stage').evaluate(stage => getComputedStyle(stage).backgroundColor));
  const stage = page.locator('.case-stage');
  const heights = [];
  for (const name of ['Insurance & payments', 'DAOs & governance', 'Prediction markets']) {
    const tab = page.getByRole('tab', { name });
    await tab.click();
    await expect(page.locator('.case-panel:not([hidden])')).toHaveCount(1);
    heights.push(Math.round((await stage.boundingBox()).height));
    expect(Math.abs((await marker.boundingBox()).y - (await tab.boundingBox()).y)).toBeLessThanOrEqual(1);
  }
  expect(new Set(heights).size).toBe(1);
  await expect(page.locator('.case-fallback')).toHaveCount(1);
  await expect(page.locator('#application-panel-insurance .case-fallback')).toHaveText('An insurance app could also use a faster oracle on its own chain or L2, and turn to Augur Lituus only when a claim is disputed.');
  // At 1440 the example starts on the heading row's 668 column, under the lead, and the picked row runs
  // through the gutter to meet it; the rows show each summary, which the example keeps for screen readers.
  await page.setViewportSize({ width: 1440, height: 900 });
  const lead = await page.locator('.applications .section-heading .lead').boundingBox();
  const example = await stage.boundingBox();
  const picked = await tabs.first().boundingBox();
  expect(Math.abs(example.x - lead.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(picked.x + picked.width - example.x)).toBeLessThanOrEqual(1);
  await expect(tabs.first().locator('.case-blurb')).toBeVisible();
  await expect(page.locator('#application-panel-prediction .case-summary')).toHaveCSS('position', 'absolute');
  // Below 1024 the rows are names only and the example shows its summary.
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(tabs.first().locator('.case-blurb')).toBeHidden();
  await expect(page.locator('#application-panel-prediction .case-summary')).toBeVisible();
});

// Owner (6 Oct 2026): the 112 px “One backstop for every app.” band implied that a
// backstop is Augur Lituus's only use. Owner (18 Oct 2026): it became the builder's case,
// which now closes the section on the heading grid, open rather than tiled.
test('the builder\'s case names the oracle beside three reasons', async ({ page }) => {
  await page.goto('/');
  const builder = page.locator('.builder-case');
  // Nobody builds on it yet (owner, 19 Oct 2026), so nothing claims adoption. Leaning on Augus's notes
  // (owner, later that day): the win-win is the title, with no lead (it only restated the reasons).
  await expect(builder.locator('h3')).toHaveText('Good for users. Easier on the project.', { useInnerText: true });
  await expect(builder.locator('.lead')).toHaveCount(0);
  // The heading names Augur Lituus; the section does not repeat it on the default view (owner, 19 Oct 2026).
  expect((await page.locator('.applications').innerText()).match(/Augur\sLituus/g)?.length).toBe(1);
  // Augus's project reading in his order: cheaper, less risky, value to users.
  await expect(builder.locator('.builder-reasons strong')).toHaveText(['No team to hire.', 'Never the judge.', 'A selling point.']);
  // The way in is for anyone weighing it up or curious (owner, 19 Oct 2026): a muted question, then the offer.
  await expect(builder.locator('.builder-ask p')).toHaveText('Exploring how it could fit a platform, or just curious? Ask the team anything.', { useInnerText: true });
  // From 1024 the ask is the title's lead, on the section lead's x; below 1024 it follows the reasons.
  const askBox = await builder.locator('.builder-ask').boundingBox();
  const titleBox = await builder.locator('h3').boundingBox();
  const sectionLeadBox = await page.locator('.applications .section-heading .lead').boundingBox();
  expect(Math.abs(askBox.x - sectionLeadBox.x)).toBeLessThanOrEqual(1);
  expect(askBox.y).toBeLessThan(titleBox.y + titleBox.height);
  await page.setViewportSize({ width: 390, height: 844 });
  const reasonsBox = await builder.locator('.builder-reasons').boundingBox();
  expect((await builder.locator('.builder-ask').boundingBox()).y).toBeGreaterThan(reasonsBox.y + reasonsBox.height);
  // No dead block (owner, 19 Oct 2026): the title sits above the reasons, which share one row at 1440,
  // each with its icon tile; nothing sits beside a taller neighbor.
  await page.setViewportSize({ width: 1440, height: 900 });
  const title = await builder.locator('h3').boundingBox();
  const reasons = await builder.locator('.builder-reasons > li').evaluateAll(items => items.map(item => item.getBoundingClientRect().top));
  expect(new Set(reasons.map(Math.round)).size).toBe(1);
  expect(title.y + title.height).toBeLessThan(reasons[0]);
  await expect(builder.locator('.builder-icon')).toHaveCount(3);
  await expect(builder.getByRole('link', { name: 'Talk to us' })).toHaveAttribute('href', '/contact/');
  await expect(page.locator('.applications')).not.toContainText(/backstop|trust|blame|liab|protect/i);
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
  // Owner (19 Oct 2026): newest first, the current state on top as a highlighted row; tiny Green squares, no icons.
  await expect(panel.locator('.query-ledger li')).toHaveCount(4);
  await expect(panel.locator('.query-ledger .web-icon')).toHaveCount(0);
  await expect(panel.locator('.query-ledger li').first()).toHaveAttribute('data-ledger-current', '');
  await expect(panel.locator('.query-ledger li').last().locator('.ledger-amount')).toHaveText('15 REPFee');
  // Struck or faded, never both: the overturned report keeps Paper; ruled-out chips are struck on a plain tile.
  expect(await panel.locator('[data-replaced-at] .ledger-title').evaluate(node => getComputedStyle(node).color)).toBe('rgb(245, 245, 248)');
  await expect(panel.locator('.outcome-chip.is-other')).toHaveCount(0);
  await expect(panel.locator('[data-ledger-current]')).toHaveCount(1);
  expect(await panel.locator('[data-ledger-current] .ledger-node').evaluate(node => [getComputedStyle(node).backgroundColor, getComputedStyle(node).width]))
    .toEqual(['rgb(42, 231, 168)', '8px']);
  await expect(panel.locator('.stakes-legend li')).toHaveText(['NO30 REP', 'YES15 REP']);
  await expect(panel.locator('.stakes-total strong')).toHaveText('45 REP');
  // While a query is open, Activity leads with what is happening now.
  await expect(page.locator('#walkthrough-panel-1 .query-ledger li').first()).toHaveClass(/ledger-now/);
  await expect(page.locator('#walkthrough-panel-1 .ledger-now .ledger-title')).toContainText('Appeal period running');
  await expect(panel.locator('.ledger-now')).toHaveCount(0);
});

// Owner + Augus (19 Oct 2026): How it works and the REP section are one section about taking part.
test('How it works keeps Your REP under the steps, out of the example card, with no separate REP section', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const section = page.locator('#how-it-works');
  await expect(section.getByRole('heading', { level: 2 })).toHaveText(/Know what happened\?\s*Get paid to report it\./);
  await expect(page.locator('section.rep, .stake-row, [data-bonds]')).toHaveCount(0);
  // Owner (19 Oct 2026): the explanation stays out of the product-style card.
  await expect(section.locator('.query-card .your-rep')).toHaveCount(0);
  const tabs = section.getByRole('tab');
  await expect(tabs).toHaveCount(4);
  const zones = [
    ['Reward offered', null],
    ['Reporting', "If you report: stake 15 REP; if no one challenges, you get 15 REP back plus the reward, 2.5 REP in the whitepaper's example."],
    ['Challenging', 'You challenge: stake 30 REP; if your answer holds, you get 30 REP back plus 12 REP, 80% of the bond you challenged.'],
    ['Payout', 'You receive: your 30 REP bond back, 12 REP from the losing bond, and the reward, because you were first to stake on NO.'],
  ];
  const heights = new Set();
  for (const [i, [label, summary]] of zones.entries()) {
    await tabs.nth(i).click();
    await expect(section.locator('[role="tabpanel"]:visible')).toHaveCount(1);
    const panel = page.locator(`#walkthrough-panel-${i}`), zone = page.locator(`#walkthrough-rep-${i}`);
    await expect(tabs.nth(i)).toHaveAttribute('aria-controls', `walkthrough-panel-${i} walkthrough-rep-${i}`);
    await expect(panel).toBeVisible();
    await expect(zone).toBeVisible();
    await expect(section.locator('.rep-panel:visible')).toHaveCount(1);
    await expect(panel.locator('.query-example')).toHaveCount(0);
    await expect(zone.locator('.zone-title')).toHaveText(label);
    if (summary) await expect(zone.getByRole('img', { name: summary })).toBeVisible();
    else await expect(zone.locator('.meter-block')).toHaveAttribute('aria-hidden', 'true');
    heights.add(Math.round((await panel.boundingBox()).height));
    heights.add(`zone ${Math.round((await zone.boundingBox()).y)}`);
    heights.add(Math.round((await section.boundingBox()).height));
  }
  expect(heights.size).toBe(3);
  await expect(page.locator('#walkthrough-rep-2 .zone-note')).toHaveText("If your answer is overturned, you lose your bond, and 80% of it goes to whoever was right.");
  // Each panel leads with its payoff (owner, 19 Oct 2026), and every REP square shows its amount.
  await expect(section.locator('.rep-panel .zone-stat strong')).toHaveText(['Up to 15 REP', '+17%', '+40%', '42 REP']);
  expect(await page.locator('#walkthrough-rep-2 .squares i.bond, #walkthrough-rep-2 .squares i.share').allTextContents()).toEqual(['15', '15', '15', '15', '12', '15', '15']);
  // The cutoff, its Unix time and the description sit in one dropdown that opens on every card at once.
  const details = page.locator('#walkthrough-panel-3 .query-details');
  await expect(details).not.toHaveAttribute('open', '');
  await details.locator('summary').click();
  await expect(details).toContainText('1820361600');
  await expect(details.locator('.details-body p')).toHaveCount(3);
  expect(await page.locator('.query-details').evaluateAll(all => all.every(item => item.open))).toBe(true);
  // Opening the details grows the card, never the REP panel beside it.
  const panelHeight = await page.locator('#walkthrough-rep-3 .your-rep').evaluate(node => node.getBoundingClientRect().height);
  await details.locator('summary').click();
  expect(await page.locator('#walkthrough-rep-3 .your-rep').evaluate(node => node.getBoundingClientRect().height)).toBe(panelHeight);
  await expect(section.locator('.holder').getByRole('link', { name: 'Learn about REP' })).toHaveAttribute('href', '/rep/');
  await expect(section.locator('.holder').getByRole('link')).toHaveCount(1);
  await expect(page.locator('.zone-source')).toHaveCount(0);
  // The whitepaper's §4.5 example: the reporter takes 2.5 REP; a challenger's reward stays “up to” the fee.
  await expect(page.locator('#walkthrough-rep-1 .squares i.reward')).toHaveText('2.5');
  await expect(page.locator('#walkthrough-rep-3 .squares i.reward')).toHaveText('≤15');
  await expect(page.locator('#how-heading .paid-mark')).toHaveCount(1);
});

test("only the shown step's Your REP zone loops, while on screen, and its bond lands on the bond back", async ({ page }) => {
  await page.goto('/');
  const running = () => page.evaluate(() => [...new Set(document.getAnimations().filter(a => a.id === 'rep-loop' && a.playState === 'running').map(a => a.effect.target.closest('.rep-panel').id))]);
  expect(await running()).toEqual([]);
  await page.locator('#walkthrough-rep-0 .your-rep').scrollIntoViewIfNeeded();
  await expect.poll(running).toEqual(['walkthrough-rep-0']);
  await page.locator('#walkthrough-tab-2').click();
  await expect.poll(running).toEqual(['walkthrough-rep-2']);
  expect(await page.evaluate(() => document.getAnimations().filter(a => a.id === 'rep-loop').every(a => a.effect.getTiming().iterations === Infinity))).toBe(true);
  // First send 600 + travel 1300 (rep-choreography.ts): the copy covers the bond that comes back.
  const landed = await page.evaluate(() => {
    document.getAnimations().filter(a => a.id === 'rep-loop').forEach(a => { a.pause(); a.currentTime = 1900; });
    const zone = document.querySelector('#walkthrough-rep-2 .your-rep'), ghost = zone.querySelector('.flow-ghost .squares').getBoundingClientRect(), back = zone.querySelector('[data-bond-back] .squares').getBoundingClientRect();
    return [Math.round(ghost.left - back.left), Math.round(ghost.top - back.top)];
  });
  expect(landed).toEqual([0, 0]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(running).toEqual([]);
});

test('the Your REP zone rests on its final artwork with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#how-it-works').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  expect(await page.evaluate(() => document.getAnimations().filter(a => a.id === 'rep-loop').length)).toBe(0);
  expect(await page.locator('[data-motion="zone-meter"]').evaluate(node => getComputedStyle(node).transform)).toMatch(/^matrix\(0\.166/);
  expect(await page.locator('.flow-ghost .squares').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '0'))).toBe(true);
});

test('only the Peer mesh glows', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('[data-cross] [style*="filter"], [data-authority] [style*="filter"]').count()).toBe(0);
  expect(await page.locator('[data-mesh] [style*="filter"]').count()).toBeGreaterThan(0);
});

test('the footer links to brand assets, whose downloads resolve and whose colors copy', async ({ page, context }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Footer' }).getByRole('link', { name: 'Brand assets' }).click();
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

// REP page rebuilt (19 Oct 2026): the contract reference, the comparison, the lineage and holders' questions.
test('/rep/ is the token page and the contract reference', async ({ page, context }) => {
  const address = '0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D';
  await page.goto('/rep/');
  await expect(page.locator('h1')).toHaveText('REP makes lying expensive.');
  const card = page.locator('#contract');
  await expect(card.getByRole('heading', { level: 2 })).toHaveText('REPv2_Yes_1');
  await expect(card.locator('.token-address')).toHaveText(address);
  await expect(card.getByRole('link', { name: /View on Etherscan/ })).toHaveAttribute('href', `https://etherscan.io/token/${address}`);
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const copy = card.getByRole('button', { name: 'Copy address' });
  const width = (await copy.boundingBox()).width;
  await copy.click();
  await expect(page.locator('[data-copy-address-status]')).toHaveText('Contract address copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(address);
  expect((await copy.boundingBox()).width).toBeCloseTo(width, 0);
  // In-page anchors from the hero.
  for (const id of ['versions', 'fork', 'taking-part']) await expect(page.locator(`#${id}`)).toHaveCount(1);
  // Hold, Report, Challenge: the gains are the whitepaper's §4.5 example.
  await expect(page.locator('.option h3')).toHaveText(['Hold', 'Report', 'Challenge']);
  await expect(page.locator('.option-cell strong.gain')).toHaveText(['+2.5 REP', '+12 REP']);
  // Four versions, one current, and only the current one shows an address.
  await expect(page.locator('.version h3')).toHaveText(['REPv1', 'REPv2', 'REPv2_Yes_1', 'REPv2_No_1']);
  await expect(page.locator('.version.is-current h3')).toHaveText('REPv2_Yes_1');
  expect(await page.locator('main').evaluate(node => (node.textContent.match(/0x[0-9a-fA-F]{40}/g) ?? []).every(match => match === '0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D'))).toBe(true);
  await expect(page.getByRole('heading', { name: 'Migration is closed' })).toBeVisible();
  // Holders' questions; the answer that links to /rep/ itself shows no link here.
  await expect(page.locator('#questions summary')).toHaveText(['What role does REP play?', 'Do I earn anything just for holding REP?', 'Is AUGUR the same token as REPv2_Yes_1?', "Why doesn't my wallet show my REP?", "I didn't move my REP in the Moon Fork. Can I still?", 'Why would REP holders choose the honest fork?']);
  await expect(page.locator('#faq-rep-role .faq-answer a')).toHaveCount(0);
  // Settled without motion, and no horizontal overflow at any width.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  expect(await page.evaluate(() => document.getAnimations().filter(a => a.effect?.target?.closest?.('[data-ladder],[data-fork-diagram]')).length)).toBe(0);
  for (const viewport of [1440, 1280, 1024, 768, 390, 360]) {
    await page.setViewportSize({ width: viewport, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${viewport}px`).toBe(true);
  }
});
