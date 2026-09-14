# Consuming the existing Augur design system

## Decision

The **Brand Foundation PDF controls brand decisions except for explicit user-directed experiments**. The latest review requests neutral typography, no Deep green, and Augur Green action fills with Navy labels in both themes. `src/styles/website-options.css` scopes that website direction and the selected square 48 px button geometry and the user-selected Crimson error color. Generated values are not edited or claimed to be new upstream standards.

Input was added from the same pinned registry revision for the requested field specimens. Its snapshot and source remain byte-identical; the bridge adds only its stylesheet import.

The inspected [repository](https://github.com/melodrd/augur-design-system/tree/fb354701afe182613f58c61b1c7dca21818cff86) contains private workspace package `@augur/design-system`, version `0.0.0`. There is no published package or bundled artifact to depend on. Its documented external distribution is a **GitHub-hosted shadcn-compatible source registry**. Do not add a guessed npm package, a machine-specific source link, or a copy of the workspace.

Read upstream `README.md`, `ARCHITECTURE.md`, `DESIGN.md`, `AGENTS.md`, package exports, generated tokens, fonts, theme source, Button/Card components, PageHeader/EmptyState patterns, brand provenance, and the consumer/registry contracts before choosing this integration. Components and patterns are React source; the theme is plain CSS. Patterns need not be installed when the website-specific composition has a different purpose.

The upstream consumer test covers **React 19 + Vite + Tailwind 4**, not plain-CSS Astro. The shadcn installer merges theme payloads into Tailwind CSS. To preserve the requested lighter stack, this repository carries the smallest bridge needed for **five committed registry items**: `augur-theme`, `utils`, `button`, `card`, `input`.

## What the bridge does

`vendor/augur/registry/*.json` are byte-identical snapshots from `public/r/` at commit `fb354701afe182613f58c61b1c7dca21818cff86`. `vendor/augur/provenance.json` records source and SHA-256. They are build references, not client imports.

`scripts/design-system.ts`:

1. Checks the pinned snapshots’ integrity.
2. Writes the registry’s Button/Card/Input files and `utils` to their standard aliases, **without changing content**.
3. Writes its typography file to the declared target.
4. Serializes the existing theme payload into plain CSS, merging `cssVars.light/dark` into the same root/class scopes as the installer. All native selectors, nested themes, system fallback, fonts, focus, and reduced-motion rules survive.
5. Omits only Tailwind-specific utility mappings and `@custom-variant`; this site uses no Tailwind utilities. Adjusts the typography import path for the host stylesheet location and imports the installed component CSS.

Pinned foundation values remain unchanged. The user-requested website exception and local control display choices are documented separately. `tailwind-merge` remains a small exact dependency of the unchanged upstream `utils` item; Tailwind itself is not installed. No Radix/Dialog dependency is needed by this subset.

```sh
bun run design-system:generate
bun run design-system:check
```

Generated outputs are checked in so normal startup/build requires no upstream network or generation step. `bun run check` also checks drift. Do not hand-edit installed outputs or snapshots. `src/styles/site.css` contains only website composition.

## Usage

```astro
---
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
---
<!-- Existing React component, rendered at build time. -->
<Button type="submit">Try primary</Button>
<!-- Upstream class-only API on a semantic navigation link. -->
<a class={buttonVariants({ size: 'lg' })} href="/lab">Explore the lab</a>
```

`Base.astro` imports the generated theme. Prefer semantic `--background`, `--foreground`, `--card`, `--primary`, `--muted-foreground`, `--border-quiet`, etc. `--primary` is the action role, not raw Augur Navy. Typography uses `augur-type-*` roles. Sora 400/600 and Schibsted Grotesk 400 are delivered by the exact upstream Fontsource pins with `font-display: swap`; licenses accompany the public output.

`data-theme="light|dark"` selects a theme. No attribute means system preference. The UI stores only the user’s theme preference locally; this is not a separate palette system. Nested identity specimens keep their surfaces. The website direction selects bright action fills with neutral labels. The website header places the theme icon before Talk to us; the lab has its own theme button. Blank canvases stay white. No comparison iframes are used.

## Deliberate updates

The snapshot is a development revision, **not a claim of a stable upstream release**. Choose and review a new full 40-character commit in the requested repository. Inspect its consumer contract and changes. Retrieve the five corresponding `public/r/*.json` artifacts, update the commit and integrity hashes, run generation, install any changed exact item dependencies, and run checks/build plus browser review in both themes. Review generated changes as an upstream update, never as independently owned design work.

For a future Tailwind consumer, the upstream documented command is `bunx shadcn@4.20.1 add "jubalm/augur-design-system/button#<full-sha>"` (and the other required items). The docs name Jubal’s repository; the supplied reference is the melodrd repository. Confirm the chosen commit exists in the intended origin before using that command. Do not silently switch origins.

This bridge is tested here in Astro; it does not establish upstream framework support. Once upstream provides a verified plain-CSS Astro install or a real package distribution, replace this bridge and retain the existing ownership boundary. Code/brand publication terms remain upstream decisions; no new license is asserted here.

The latest lab review fixes square 48 px controls, semibold labels, bold outlined icons and filled fields. A local 1 px neutral focus outline replaces the heavier field ring. No appearance settings are persisted or read; defaults also apply without JavaScript. The unchanged registry Button/Input components still provide the underlying markup and styles.

Current field refinement: website-local filled inputs use a soft focus surface and bottom indicator instead of a perimeter ring. Keyboard focus strengthens the bottom indicator; forced-colors mode retains an outline. Invalid fields keep explicit feedback and a Crimson bottom indicator. Registry output remains unchanged.

Current button refinement: website-local outline buttons use a 6% foreground tint and a slightly stronger border on hover, deepening to 10% when pressed; text and icons retain their default color, and keyboard focus keeps its separate outline. Ghost buttons reveal a 2 px underline; primary, destructive and secondary buttons gain an inset bottom edge. Transitions last 180 ms, keep geometry stationary and are removed under reduced motion. Busy/disabled controls suppress these treatments. This is a requested website experiment, not an upstream foundation change.

## Website action arrows

Internal navigation uses no arrow, including links to sections, the homepage, and the lab. Reserve ↗ (`arrow-up-right`) for destinations outside the website. The destination determines the arrow, regardless of button variant or whether a new tab opens. Direct actions such as Save, Copy, Remove, toggles, and local previews have no navigation arrow; an action-specific icon may still be used. Keep decorative arrows hidden from assistive technology and retain accessible labels on icon-only links. The homepage hero actions are an approved exception: retain the verb labels and omit both arrows. This is a website convention, not a change to the pinned upstream components.
