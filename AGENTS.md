# Working on the Augur website

## Authority and boundaries

The current task wins. Use the Augur.net Figma file `3RgHvLRqEZDsAmcBQ7tvVa`; canonical homepage `28:7` wins over older component copy. Since the owner's polish brief of 5 October 2026 (`docs/claude-polish-prompt.md`) the file may be edited: keep website and Figma in step, use real editable layers and components, and record motion and states on Section details. Use only Augur Brand, Website/Navy and Size & motion variables and Augur text styles. The Brand Foundation PDF is the identity authority; see `docs/source-material.md`. Mechanism facts come from the January 2026 Augur Lituus whitepaper.

Do not mutate source originals in the optional external reference directory. Never hand-edit `vendor/augur/**`, `scripts/design-system.ts`, `src/components/ui/*`, `src/lib/utils.ts`, `src/styles/augur.css` or `src/styles/augur-typography.css`. Preserve official brand geometry, colours, clearspace and minimum width. Do not commit, push, publish or deploy without a request.

## Website rules

- Fixed Navy, Paper text, Green action fills with Navy labels; `color-scheme: dark`. No theme toggle, alternate compositions or hidden chooser.
- No section numbers or decorative kickers. Shared left-aligned 500 / 80 / 668 heading row at 1440; 1248 content width, 96 margins, square corners, no shadows. Only Peer mesh has a glow.
- At 1440×900, 40 px announcement + 96 px header + hero fill the first viewport. Answer band is exactly “With Augur, no party controls the answer.”
- Approved homepage copy is fixed. Always use “Augur Lituus” in full. Do not imply REP holding requires reporting or challenging. No invented partners, readiness, metrics, dates, addresses or guarantees.
- Off-site links alone get ↗; internal links use no arrow or their approved →. All external URLs live in `src/data/links.ts`; no fake links.
- One source per repeated fact. Review flags remain until content is actually approved. Keep proposed design, ongoing implementation, illustrative examples and deployed history distinct.
- Use Bun and static Astro. No client framework runtime, client hydration directives, animation library, backend, wallet connection or third-party tracking. Exact dependency pins only.

## Motion and access

Transform/opacity and SVG stroke draws only. For interaction-driven layout changes such as widening picker cards, use FLIP or same-document View Transitions with an instant fallback. Looping scenes are one choreography shared with Figma: keys on a 12 s cycle that open and close on the static artwork (`choreography.ts`; tenets in `tenet-choreography.ts`, Figma `250:717`; hero in `hero-choreography.ts`, Figma `382:848`). The three tenet diagrams are always moving while any part is visible (owner, 5–6 Oct 2026: alive, no start-stop-wait, `loop-scene.ts`); SVG animates `transform`, never the individual `translate`/`scale` properties, which re-layerize every frame in Chromium, and avoids per-frame paint such as `stroke-dashoffset`. After arrival the hero tells its 12 s story on compositor-only HTML squares, answers fine pointers with a lens and clicks or taps with a ripple (`hero-ambient.ts`). The roadmap Now stop keeps a slow CSS pulse. Other authored scenes play once per tab session and settle on interaction, reduced motion, print or navigation; a reload (F5) or history visit never replays any of them, read from the navigation type so it holds where storage is blocked, and a return visit never replays a scene already seen (`seen.ts`). No entrance animation plays on a reload; loops simply run from their resting frame. Hero arrival settles when the page is hidden; ongoing and timed scenes pause when hidden or off-screen and resume only while visible. No-JavaScript, reduced motion and print render final states. Measure any new ongoing motion. Never hide content behind animation.

Use one tabs controller with keyboard arrows, Home/End, activation mode and labelled panels. Native disclosure buttons and exclusive named details must work by keyboard; no ARIA menu navigation. Native mobile dialog must manage focus. Forms have labels, autocomplete, associated errors and a polite summary. Email composition is not delivery. The newsletter keeps its designed field as a local-only prototype until a provider and consent are approved: it validates in the browser, never sends data and never claims a subscription.

## Verification and handoff

Run `bun run check` (including pinned integrity), `bun run build`, link/copy/budget checks, route/interaction/axe tests, and the launch guard. Review desktop and responsive widths 1440, 1280, 1024, 768, 390 and 360; no horizontal overflow. Check keyboard, focus, no JavaScript, reduced motion, forced colours, console errors and fonts. Measure performance budgets and compare screenshots and keyframes with Figma. Report only checks actually run. Record decisions, source differences and release blockers in docs. Runtime/build imports must be portable.
