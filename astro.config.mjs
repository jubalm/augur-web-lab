import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
export default defineConfig({
  site: 'https://www.augur.net', output: 'static', trailingSlash: 'always',
  build: { inlineStylesheets: 'always' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [react()],
  markdown: { syntaxHighlight: false },
  security: { csp: {
    directives: ["default-src 'self'", "img-src 'self' data:", "font-src 'self'", "connect-src 'self'", "object-src 'none'", "base-uri 'self'"],
    styleDirective: { resources: [
      { resource: "'self'", kind: 'element' },
      { resource: "'unsafe-inline'", kind: 'attribute' },
    ] },
  } },
  vite: { css: { postcss: { plugins: [{
    postcssPlugin: 'augur-latin-woff2',
    AtRule: { 'font-face': rule => {
      const range = rule.nodes?.find(node => node.prop === 'unicode-range');
      if (range && !range.value.includes('U+0000-00FF')) { rule.remove(); return; }
      rule.walkDecls('src', decl => { decl.value = decl.value.split(',').filter(source => source.includes('woff2')).join(','); });
    } },
  }] } } },
  devToolbar: { enabled: false },
});
