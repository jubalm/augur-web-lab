import { readdir, readFile } from 'node:fs/promises';
import { join, dirname, normalize } from 'node:path';
import { gzipSync } from 'node:zlib';

const files: string[] = [];
async function walk(path: string): Promise<void> { for (const entry of await readdir(path, { withFileTypes: true })) { const full = join(path, entry.name); if (entry.isDirectory()) await walk(full); else files.push(full); } }
await walk('dist');
const assets = new Map(await Promise.all(files.map(async path => [path, await readFile(path)] as const)));
const failures: string[] = [];
const reports: object[] = [];
function moduleGraph(urls: string[]): string[] {
  const visited = new Set<string>();
  const visit = (url: string) => {
    const file = normalize(url.startsWith('dist/') ? url : join('dist', url));
    if (visited.has(file) || !assets.has(file)) return;
    visited.add(file);
    const code = assets.get(file)!.toString();
    for (const match of code.matchAll(/(?:from\s*|import\s*\(?)["']([^"']+\.js)["']/g)) {
      visit(match[1]!.startsWith('/') ? join('dist', match[1]!) : join(dirname(file), match[1]!));
    }
  };
  urls.forEach(visit);
  return [...visited];
}
for (const path of files.filter(file => file.endsWith('.html'))) {
  const html = assets.get(path)!.toString();
  const css = [...html.matchAll(/<link[^>]*href=["']([^"']+\.css)["'][^>]*>/g)].map(match => match[1]!);
  const js = [...html.matchAll(/<script[^>]*src=["']([^"']+\.js)["'][^>]*>/g)].map(match => match[1]!);
  const inlineJS = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type=["']application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]!).join('\n');
  const size = (paths: string[]) => [...new Set(paths)].reduce((total, url) => total + gzipSync(assets.get(join('dist', url)) ?? Buffer.alloc(0)).length, 0);
  const cssBytes = size(css) + [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].reduce((n, match) => n + gzipSync(match[1]!).length, 0);
  const graph = moduleGraph(js);
  const jsBytes = graph.reduce((sum, file) => sum + gzipSync(assets.get(file)!).length, 0) + (inlineJS ? gzipSync(inlineJS).length : 0);
  reports.push({ page: path, cssGzipBytes: cssBytes, jsGzipBytes: jsBytes, jsFiles: graph });
  if (cssBytes > 40 * 1024) failures.push(`${path}: CSS ${cssBytes} bytes > 40960`);
  if (path === 'dist/index.html' && jsBytes > 20 * 1024) failures.push(`Homepage JS ${jsBytes} bytes > 20480`);
}
const fonts = files.filter(file => /\.woff2?$/.test(file));
if (fonts.length !== 3 || fonts.some(file => !file.endsWith('.woff2'))) failures.push(`Expected exactly three woff2 font files; found ${fonts.length}.`);
console.log(JSON.stringify({ fonts, pages: reports, note: 'Gzip bytes sum unique external assets and inline script/style blocks per page, following static JS imports.' }, null, 2));
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
