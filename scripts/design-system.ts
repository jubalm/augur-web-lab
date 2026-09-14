/** Small, offline plain-CSS bridge for the pinned Augur registry items.
 * See docs/design-system.md. Do not add independent foundation values here. */
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

type Rules = { [key: string]: string | Rules };
type Item = {
  name: string;
  files: { target: string; content: string }[];
  css?: Rules;
  cssVars?: { light: Record<string, string>; dark: Record<string, string> };
};
const root = resolve(import.meta.dir, '..');
const check = process.argv.includes('--check');
const provenance = JSON.parse(await readFile(resolve(root, 'vendor/augur/provenance.json'), 'utf8'));
const outputs = new Map<string, string>();
const items: Item[] = [];

for (const [path, expected] of Object.entries(provenance.sha256)) {
  const data = await readFile(resolve(root, path));
  if (createHash('sha256').update(data).digest('hex') !== expected) {
    throw new Error(`Registry integrity mismatch: ${path}. Review the upstream pin and provenance.`);
  }
  const item = JSON.parse(data.toString()) as Item;
  items.push(item);
  for (const file of item.files) {
    const target = file.target.replace('@ui/', 'src/components/ui/').replace('@lib/', 'src/lib/');
    if (!/^src\/(styles|components\/ui|lib)\/[\w.-]+$/.test(target)) {
      throw new Error(`Review unexpected registry target: ${target}`);
    }
    outputs.set(target, file.content);
  }
}

function serialize(rules: Rules): string {
  return Object.entries(rules).map(([key, value]) => typeof value === 'string'
    ? `${key}: ${value};`
    : `${key} {\n${serialize(value)}\n}`).join('\n');
}

const theme = items.find(item => item.name === 'augur-theme')!;
const rules = theme.css!;
const imports: string[] = [];
const blocks: Rules = {};
for (const [key, value] of Object.entries(rules)) {
  if (key.startsWith('@import')) {
    // Registry targets assume global CSS at src/. Ours lives in src/styles/.
    imports.push(`${key.replace('./styles/augur-typography.css', './augur-typography.css')};`);
  } else if (!key.startsWith('@custom-variant')) {
    // Only Tailwind's utility directive is omitted. All native rules survive.
    blocks[key] = value;
  }
}
blocks[':root'] = { ...(blocks[':root'] as Rules), ...theme.cssVars!.light };
blocks['.dark'] = { ...(blocks['.dark'] as Rules), ...theme.cssVars!.dark };
outputs.set('src/styles/augur.css', [
  '/* Generated from the pinned Augur registry. Run bun run design-system:generate. */',
  ...imports,
  '@import "../components/ui/button.css";',
  '@import "../components/ui/card.css";',
  '@import "../components/ui/input.css";',
  serialize(blocks), '',
].join('\n'));

for (const [path, content] of outputs) {
  const destination = resolve(root, path);
  if (check) {
    if (await readFile(destination, 'utf8') !== content) {
      throw new Error(`Installed source drift: ${path}. Re-run bun run design-system:generate.`);
    }
  } else {
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, content);
  }
}
console.log(`Augur registry: ${outputs.size} files ${check ? 'verified' : 'generated'} at ${provenance.commit.slice(0, 7)}.`);
