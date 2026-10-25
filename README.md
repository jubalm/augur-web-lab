# Augur website

Static, accessible Augur website built with Astro 7.3.2, TypeScript 6.0.3 and Bun 1.3.14. The canonical design is the Augur.net Figma file; the production composition uses a fixed Navy palette. No Figma connection is required to develop or build.

## Run and verify

```sh
bun install --frozen-lockfile
bun run dev
bun run check
bun run build
bun run check:links
bun run check:copy
bun test tests/copy-check.test.ts
bun run check:budgets
bun run test:e2e
bun run check:launch
```

`check:launch` intentionally fails until editorial and ownership blockers are resolved. Normal checking and building must succeed. Install the Playwright Chromium browser with `bunx playwright install chromium` when needed. The preview command is `bun run preview`.

The owner-authorized legacy cleanup removed 170 tracked files, including the old lab routes, Three.js scenes and unused icon weights. The exact completed manifest is `docs/evidence/cleanup-completed.json`. An isolated `bun install --frozen-lockfile`, Astro check, warning-free build and complete link check pass after cleanup.

## Structure

- `src/layouts`: page shell, head metadata and reading layout.
- `src/components`: layout, site primitives, homepage sections and SVG art.
- `src/data`: copy, navigation, external destinations, state data and extracted geometry.
- `src/content`: typed Markdown blog posts and Learn guides.
- `src/motion`: small vanilla controllers, finite timelines and accessible interaction.
- `src/styles`: pinned foundations plus local website styles.
- `vendor/augur`: immutable pinned design-system snapshots.
- `tests`, `scripts`: route, interaction, accessibility, content and release checks.
- `docs`: sources, decisions, motion and release evidence.

## Content and deployment

Use `docs/content.md` to edit copy. Keep external destinations in `src/data/links.ts` and set review flags honestly. The contact form opens an encoded email draft; it never reports delivery. The newsletter shows its designed email field as a local-only prototype: it validates in the browser, sends nothing (even without JavaScript) and says so, until a provider and consent policy are approved and `site.newsletter.provider` is set.

The build emits static files to `dist`; `vercel.json` configures that output and response headers. No deployment is part of this change. Indexing defaults off: set `PUBLIC_SITE_INDEXABLE=true` only after `docs/launch-checklist.md` is complete.
