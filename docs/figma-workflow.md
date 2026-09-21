# Figma → Web Lab

**Strategy → Figma wireframe → Figma MCP → coded `/lab` experiment → browser review → iteration → explicit approval → site component/page.**

1. Record the requested file/frame URL, node ID, revision/date if available, and the question being tested. Inspect the node through Figma MCP, including screenshot/context, layout constraints, text, assets, and intended interactions.
2. Inspect the relevant existing Augur tokens, components, and patterns first. The Brand Foundation PDF controls brand decisions; Figma controls the requested composition; discrepancies with canonical shared foundations must be identified rather than silently becoming a second system.
3. Add an isolated route (for example `src/pages/homepages/03.astro`). Use `Website.astro` for standalone homepage previews and `Base.astro` for lab specimens. Ctrl/Cmd+K supplies preview navigation without visible lab chrome. Keep experimental composition code and scoped CSS beside the study.
4. Implement semantic intent: meaningful headings, real links/buttons, normal document flow, responsive constraints, and accessible text alternatives. Do not generate an absolute-positioned pixel dump.
5. Reuse existing UI where it fits. Website content and storytelling stay local. Add React hydration or a motion dependency only for an actual interaction requirement.
6. Review the browser against the frame at its original viewport, then at a reasonable mobile size. Check both themes, keyboard focus, text wrapping, font loading, reduced motion, and console errors.
7. Record meaningful differences: unavailable assets/fonts, token conflicts, content changes, mobile reflow, unimplemented interaction, or a deliberate accessibility adjustment. Do not claim pixel parity if only an export or written brief was available.
8. Iterate alongside prior variants. Promote to `src/components/site/` or normal site routes only when explicitly approved. Shared Augur-wide primitives remain upstream.

## Current working file

[Augur Website — Two Directions](https://www.figma.com/design/AjR6tba4Nuj0FFwaSYTOrE/Augur-Website----Two-Directions?node-id=2-2) (file key `AjR6tba4Nuj0FFwaSYTOrE`).

- Page `2:2`, “01 — Direction A: Editorial Explanation”: 1440 homepage frame `3:49`, application section `13:44`.
- Page `2:3`, “02 — Direction B: Interactive Product Story”: 1440 homepage frame `3:43`, application section `13:167`.

Each homepage has nine numbered sections (header, hero, principles, mechanism, applications, roadmap, blog, FAQ, contact/footer). Both were last edited September 21, 2026 (see `docs/website-strategy.md`). Recorded September 30, 2026 as the file to use for new Figma-driven work.

## Earlier reference

The local `figma-revision-03.json` (September 10, 2026) identifies [homepage frame 4:35](https://www.figma.com/design/4RZThfojvu7ikRF5H9gJ4A?node-id=4-35) and mobile node `4:36`. It also records motion alternatives at nodes `63:3`, `64:2`, `65:2`, `66:2`, `67:2`, with notes at `71:40`.

These are pointers from a local revision record; current live Figma content was not retrieved for the first implementation. The homepage alternatives interpret the written strategy; they are not replicas of those frames. Figma is a development workflow documented here, with no dedicated public-facing section.

## When MCP is unavailable

The site, install, check, and production build work normally. Use supplied screenshots/exports only when sufficient for the task, name that limitation, and retain missing decisions in a short note. No Figma API call, secret, remote fetch, or machine-specific reference path belongs in production code.
