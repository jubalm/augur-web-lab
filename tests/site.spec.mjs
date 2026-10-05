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
