import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.mjs',
  timeout: 30000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['json', { outputFile: 'artifacts/qa/results.json' }]],
  outputDir: 'artifacts/qa/test-results',
  use: { baseURL: process.env.AUGUR_TEST_URL ?? 'http://127.0.0.1:4321', viewport: { width: 1440, height: 900 }, browserName: 'chromium', launchOptions: { executablePath: process.env.AUGUR_CHROME_PATH }, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  webServer: process.env.AUGUR_TEST_URL ? undefined : { command: 'bun run preview --port 4321', url: 'http://127.0.0.1:4321', reuseExistingServer: !process.env.CI, timeout: 30000 },
});
