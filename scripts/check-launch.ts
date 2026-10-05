import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { links } from '../src/data/links';

const blockers: string[] = [];
for (const [key, link] of Object.entries(links)) if (!link.verified) blockers.push(`Unverified destination ${key}: ${link.url} — ${link.source}`);
async function scan(directory: string): Promise<void> {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) await scan(path);
    else if (/\.(md|mdx|ts)$/.test(item.name)) {
      const source = await readFile(path, 'utf8');
      for (const [index, line] of source.split('\n').entries()) {
        if (/\b(placeholder|needsReview)\s*:\s*true\b/.test(line)) blockers.push(`${path}:${index + 1}: ${line.trim()}`);
      }
    }
  }
}
await scan('src/content');
await scan('src/data');
const checklist = await readFile('docs/launch-checklist.md', 'utf8');
for (const line of checklist.split('\n')) if (/^\s*- \[ \]/.test(line)) blockers.push(line.replace(/^\s*- \[ \]\s*/, ''));
if (blockers.length) {
  console.error(`Launch blocked by ${blockers.length} items:\n${blockers.map(item => `- ${item}`).join('\n')}`);
  process.exitCode = 1;
} else console.log('Launch content, destinations and checklist are clear. Indexing remains an explicit release choice.');
