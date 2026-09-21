import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { cp } from 'node:fs/promises';

const labOnly = process.env.AUGUR_LAB_ONLY === '1';

export default defineConfig({
  output: 'static',
  ...(labOnly ? {
    srcDir: './src/lab-deploy',
    outDir: './dist-lab',
    // No automatic copy of the website's public directory.
    publicDir: './src/lab-deploy/public',
  } : {}),
  vite: { define: { 'import.meta.env.PUBLIC_LAB_ONLY': JSON.stringify(labOnly ? '1' : '0') } },
  integrations: [react(), ...(labOnly ? [{
    name: 'lab-public-assets',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        // Explicit allowlist: homepage imagery and future public files stay private.
        for (const folder of ['brand', 'licenses']) {
          await cp(new URL(`./public/${folder}`, import.meta.url), new URL(`${folder}/`, dir), { recursive: true });
        }
      },
    },
  }] : [])],
  devToolbar: { enabled: false },
});
