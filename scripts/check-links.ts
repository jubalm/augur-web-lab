import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { links } from '../src/data/links';

const root = resolve('dist');
const htmlFiles: string[] = [];
async function scan(path: string): Promise<void> { for (const entry of await readdir(path, { withFileTypes: true })) { const full = join(path, entry.name); if (entry.isDirectory()) await scan(full); else if (full.endsWith('.html')) htmlFiles.push(full); } }
await scan(root);
const failures: string[] = [];
const registered = Object.values(links).map(link => link.url);
const content = new Map(await Promise.all(htmlFiles.map(async path => [path, await readFile(path, 'utf8')] as const)));
let count = 0;
for (const [path, html] of content) {
  const route = '/' + path.slice(root.length + 1).replace(/index\.html$/, '');
  for (const match of html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']*)["']/gi)) {
    const href = match[1]!.replace(/&amp;/g, '&'); count++;
    if (!href || href === '#') { failures.push(`${route}: empty destination`); continue; }
    if (/^(https?:|mailto:)/i.test(href)) {
      if (!registered.some(url => href === url || href.startsWith(url + '?') || href.startsWith(url + '#'))) failures.push(`${route}: external destination missing from registry: ${href}`);
      continue;
    }
    if (/^[a-z][a-z\d+.-]*:/i.test(href)) { failures.push(`${route}: unexpected URL scheme: ${href}`); continue; }
    const target = new URL(href, `https://www.augur.net${route}`);
    let file = join(root, decodeURIComponent(target.pathname));
    try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); }
    catch { if (!target.pathname.endsWith('/')) file = `${file}.html`; }
    try { await stat(file); } catch { failures.push(`${route}: unresolved ${href}`); continue; }
    if (target.hash && file.endsWith('.html')) {
      const targetHtml = content.get(file) ?? await readFile(file, 'utf8');
      const fragment = decodeURIComponent(target.hash.slice(1)).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`\\bid=["']${fragment}["']`).test(targetHtml)) failures.push(`${route}: missing fragment ${href}`);
    }
  }
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`${htmlFiles.length} pages, ${count} anchor destinations resolve and external URLs come from the registry.`);
