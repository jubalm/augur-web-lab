import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { chromium } from '@playwright/test';

const require = createRequire(import.meta.url);
const cli = require.resolve('lighthouse/cli/index.js');
const base = process.env.AUGUR_TEST_URL ?? 'http://127.0.0.1:4321';
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/learn/', '/blog/why-disagreement-makes-an-oracle-stronger/'];
const outputDirectory = process.env.AUGUR_LIGHTHOUSE_OUTPUT ?? 'artifacts/qa/lighthouse';
const devices = process.env.AUGUR_LIGHTHOUSE_DEVICE ? [process.env.AUGUR_LIGHTHOUSE_DEVICE] : ['desktop', 'mobile'];
if (devices.some(device => device !== 'desktop' && device !== 'mobile')) throw new Error('AUGUR_LIGHTHOUSE_DEVICE must be desktop or mobile');
await mkdir(outputDirectory, { recursive: true });
const summary: object[] = [];
for (const route of routes) for (const device of devices) {
  const slug = route.replace(/\W+/g, '-') || 'home';
  const output = `${outputDirectory}/${slug}-${device}.json`;
  const args = ['node', cli, `${base}${route}`, '--quiet', '--output=json', `--output-path=${output}`, '--only-categories=performance,accessibility,best-practices,seo', '--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage'];
  if (device === 'desktop') args.push('--preset=desktop', '--screenEmulation.width=1440', '--screenEmulation.height=900');
  const child = Bun.spawn(args, { env: { ...process.env, CHROME_PATH: process.env.AUGUR_CHROME_PATH ?? chromium.executablePath() }, stdout: 'inherit', stderr: 'inherit' });
  if (await child.exited !== 0) throw new Error(`Lighthouse failed for ${route} (${device})`);
  const report = JSON.parse(await readFile(output, 'utf8'));
  const row = {
    route, device, scores: Object.fromEntries(Object.entries(report.categories).map(([key, value]) => [key, (value as { score: number }).score * 100])),
    lcpMs: report.audits['largest-contentful-paint'].numericValue,
    cls: report.audits['cumulative-layout-shift'].numericValue,
    longTasks: report.audits['long-tasks']?.details?.items?.map((task: { duration: number }) => task.duration) ?? [],
    report: output,
  };
  summary.push(row); console.log(JSON.stringify(row));
  await writeFile(`${outputDirectory}/summary.json`, JSON.stringify(summary, null, 2) + '\n');
}
if (!process.env.AUGUR_LIGHTHOUSE_OUTPUT) await writeFile('artifacts/qa/lighthouse-summary.json', JSON.stringify(summary, null, 2) + '\n');
