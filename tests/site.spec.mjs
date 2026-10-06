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
  const loops = () => page.evaluate(() => [...document.querySelectorAll('[data-cross],[data-mesh],[data-authority]')].flatMap(svg => svg.getAnimations({ subtree: true })).map(a => ({ state: a.playState, iterations: a.effect.getTiming().iterations })));
  const running = await loops();
  expect(running.length).toBeGreaterThan(20);
  expect(running.every(a => a.iterations === Infinity && a.state === 'running')).toBe(true);
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

test('entrance scenes play once per session and F5 keeps them settled', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-home-hero]')).toHaveAttribute('data-hero-arrival', 'entering');
  const bonds = page.locator('[data-bonds]');
  await bonds.scrollIntoViewIfNeeded();
  await expect.poll(() => bonds.evaluate(element => element.getAnimations({ subtree: true }).length)).toBeGreaterThan(0);
  await page.reload();
  await expect(page.locator('[data-home-hero]')).toHaveAttribute('data-hero-arrival', 'settled');
  expect(await page.locator('[data-home-hero]').evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.effect?.getTiming().iterations !== Infinity && animation.playState === 'running').length)).toBe(0);
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
