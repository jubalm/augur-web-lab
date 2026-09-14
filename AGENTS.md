# Working in Augur Web Lab

## Intent

This is an Augur website and design experimentation workspace, potentially but not necessarily the future production website. Favor fast, reversible iterations, clear content, and a small portable codebase. It is not another design system or a documentation dashboard.

## Sources of truth

1. The current task/request.
2. The current **Brand Foundation PDF** for brand decisions, including color, typography, and identity. It takes precedence over implementation tokens. The matching document source may clarify unprinted values; record that distinction. See `docs/source-material.md`.
3. The relevant Figma frame/node, when provided, for the requested composition.
4. This repository’s website-specific decisions in `docs/` and the current experiments.
5. `augur-design-system` for shared primitives, tokens, fonts, and component behavior. Read `docs/design-system.md` before changing an integration. Report conflicts with the Brand Foundation PDF or requested Figma composition; never silently fork the shared foundations.
6. `/home/goddard/augur/` reference material when source research is needed. This is an optional local reference location, never a runtime requirement. `docs/source-material.md` identifies the important documents.

## Boundaries

- Never mutate originals under `/home/goddard/augur/`, including generated files or dependency installations within its old projects.
- Do not create a competing design system or casually reimplement Augur components. `vendor/augur/registry`, `src/components/ui`, `src/lib/utils.ts`, `src/styles/augur.css`, and `src/styles/augur-typography.css` are pinned upstream material/generated outputs; do not hand-edit them.
- Keep website-specific layouts, copy, diagrams, and animation out of the upstream design system. Do not promote global abstractions before multiple uses justify them.
- Preserve other work and avoid unrelated changes. Do not commit, publish, or push without a request.
- Use actual sourced content. Do not replace it with new marketing claims without a request. The user removed the hero status badge; keep development-stage context accurate in prose and the roadmap. Distinguish proposed designs, implementations, and measured results.
- Preserve logo geometry, fills, clearspace, and minimum dimensions. The logo animation is an isolated proposal, not a new global identity rule.
- Keep Astro static by default. React is for existing design-system components or interactions that need it; client directives require a reason.
- Use Bun. Do not add Next.js, orchestration frameworks, a backend, database, auth, CMS, or large animation dependencies for trivial effects.

## Experiment workflow

Current approved addition, September 13: the user requested a top-right contact action (now “Talk to us”) and a dedicated `/contact/` page with welcoming copy, a form and socials. This is an authorized new website route using `Website.astro`. `/` already contains the approved header and hero described at the top of `docs/website-strategy.md`; the earlier empty-canvas rules in the next paragraph are historical. Contact has required Name, Email and Message, optional Company / project and Website, social icons and a Discord invitation. The latest refinement removes the topic selector and multiple inquiry addresses, uses only `contact@augur.net`, and fits the default desktop page into one viewport. The “Send message” action composes email; the user removed the explanatory note beneath it. Never claim delivery. The inbox requires provisioning or confirmation by the domain owner before release. See `docs/website-strategy.md`. This exception does not restore any other deleted page.

The only website route is `/`: a white section canvas using `Website.astro` in scaffold mode, never the lab's `Base.astro`. The user explicitly deleted the entire `/homepages` route tree and all secondary website pages (Blog, Learn, FAQ, REP, Whitepapers), their page components and runtime content/assets. Do not restore those routes without a new request. The canvas has black section labels, numbering, generous whitespace, and thin black dividing lines only. Build sections individually as requested. No buttons, navigation, imagery, theme control, or preview chooser on the canvas. Keep the single canvas entry in `src/lib/content.ts` current.

The lab lives at `/lab`, with planning briefs at `/lab/user-flow`. These briefs describe proposed website content, not live secondary pages. Ctrl/Cmd+K opens the hidden native-dialog chooser on lab pages; Escape closes it. Controls in Actions are local demonstrations and must not navigate. The icon specimen section has been removed; icons remain available for normal interface use. See `docs/website-strategy.md`.

“Implement this Figma frame” → inspect the frame through Figma MCP, including visual context, then inspect existing Augur components and tokens. Implement under `/lab` until explicitly approved. Preserve semantic intent; do not produce a pixel-positioned dump. Keep layout styles local, reuse sensible primitives, and record the source node/revision and meaningful discrepancies. If MCP is unavailable, state that limitation and use only the supplied exports; do not claim a live frame match.

“Move this into the site” → refactor the approved composition into site components/routes. Keep discarded experiments easy to delete. Record the promotion decision.

The reusable workflow is in `docs/figma-workflow.md`. Build and development must work without MCP or the source library.

## Verification

Run `bun run check` and `bun run build`. Install with `bun install` when needed; preserve `bun.lock`. For visual changes, run the dev server and review relevant routes on desktop in light and dark themes. The user explicitly deferred mobile design and QA; do not spend time on mobile until they resume it. Check focus, labels, navigation, font loading, browser errors, and reduced motion where applicable. Keep decoration static with JS disabled. Report actual evidence, not checks that were not run.

Use semantic `var(--background)`, `var(--foreground)`, `var(--primary)`, and related roles. Use existing typography classes. Experiment composition rules may be local; do not introduce competing foundation scales. Prefer transforms/opacity, finite animation, cancellation on reduced-motion changes, and cleanup. Avoid idle animation loops.

Before handoff, confirm production code has no machine-specific absolute filesystem imports and source originals are unchanged. Keep provenance and decisions concise. Do not add empty folders or speculative infrastructure.
