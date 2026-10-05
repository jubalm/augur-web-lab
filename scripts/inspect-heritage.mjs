import { chromium } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';

const output = 'artifacts/qa/startup-performance';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.AUGUR_CHROME_PATH, headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${process.env.AUGUR_TEST_URL ?? 'http://127.0.0.1:4322'}/`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2600);
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) animation.cancel();
    const field = document.querySelector('[data-heritage="interactive"]');
    delete field.dataset.active;
    field.querySelector('.heritage-glow').style.transition = 'none';
    field.querySelector('[data-heritage-radius]').setAttribute('cx', '137.1');
    field.querySelector('[data-heritage-radius]').setAttribute('cy', '20.1');
  });
  const screenshot = async name => {
    const data = await page.screenshot({ path: `${output}/${name}.png` });
    return createHash('sha256').update(data).digest('hex');
  };
  const settled = await screenshot('heritage-paths-settled');
  await page.evaluate(() => {
    document.querySelector('[data-heritage="interactive"]').dataset.pointerActive = '';
  });
  const rects = await screenshot('heritage-rects-lit');
  const details = await page.evaluate(() => {
    const field = document.querySelector('[data-heritage="interactive"]');
    const layer = field.querySelector('.heritage-glow');
    const squares = [...field.querySelectorAll('.heritage-base rect')];
    // Try the rejected optimization only in this disposable browser document.
    // Production retains its original rectangles and their rasterization.
    layer.replaceChildren(...['var(--foreground)', 'var(--primary)'].map(fill => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', squares.filter(rect => rect.getAttribute('fill') === fill).map(rect => `M${rect.getAttribute('x')} ${rect.getAttribute('y')}h3v3h-3z`).join(''));
      path.setAttribute('fill', fill);
      path.setAttribute('opacity', fill === 'var(--primary)' ? '.9' : '.7');
      return path;
    }));
    return { pathCount: layer.children.length, comparisonRects: squares.length, glowOpacity: getComputedStyle(layer).opacity };
  });
  const paths = await screenshot('heritage-paths-lit');
  const result = { ...details, settled, paths, rects, glowVisiblyActive: settled !== paths, identicalLitPixels: paths === rects };
  await writeFile(`${output}/heritage-comparison.json`, JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result));
  if (!result.glowVisiblyActive || !result.identicalLitPixels) process.exitCode = 1;
} finally { await browser.close(); }
