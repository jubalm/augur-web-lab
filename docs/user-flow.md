# Website user flow blueprint

The lab entry is `/lab#user-flow`; the detailed document is `/lab/user-flow`, with a matching build-time Markdown export at `/lab/user-flow.md`.

## Current scope — September 13, 2026

The planned website includes Home, About, Products, Learn, Blog, FAQ, REP and Contact. Products is one page with sections for Augur Lituus, Zoltar and Augur Stratoblast. Learn, REP and FAQ are included during R&D. Developers is the only possible later page; its current overview would duplicate Products. The user removed the extra scope chapter and redundant content briefs. See the leading decision in `docs/website-strategy.md`.

Six visitor journeys cover CEO / product, CTO / builder, New reader, REP holder, OG Member and AI assistant. The document has four chapters: Journeys, Homepage sequence, Pages & destinations, and For every future change. Each journey includes alternatives, rationale and proposed tests. Native disclosures keep every brief readable without JavaScript; Save exports the same data as Markdown.

The current homepage and Contact page are built; About, Products, Learn, Blog, FAQ and REP remain planned. The existing website header is unchanged. The lab’s single Products brief (`page-products`) describes the planned page and its three sections, using the existing content-row presentation. The individual product briefs and the Developers, Educational articles, Blog article / quarterly report, Updates & quarterly reports and Papers & sources briefs are removed. Journeys link to Products, Learn or Blog as appropriate, with no dangling references to removed IDs.

Talk to us opens `/contact/`: required Name, Email and Message, optional Company / project and Website, Ask on Discord, Telegram / GitHub / X and `contact@augur.net`. Send message composes email for the visitor to finish in an email app. There is no topic selector, local preview panel or delivery confirmation. Inbox provisioning or confirmation remains with the domain owner.

Homepage notes describe the current 96 px header, 150 px logo, 16 px navigation, static tonal background, 1.5-second arrival and interactive Signal Loom. The loom moves while visible and pauses with Escape; reduced motion retains a static composition. Lower homepage sections and other product/content pages remain proposals.

The Arrive / Understand / Evaluate / Continue map opens the relevant briefs. Technical readers follow Products and sources; new readers use Learn and FAQ; holders have a dedicated REP page; returning readers find updates and reports in Blog. Both lab sidebars track the active section. The lab overview links to the full flow document; the flow header contains Save, the homepage arrow and theme control. Status badges, route boxes and the added scope lists remain absent from the visual layout. The export preserves status and route metadata.

## Content ownership

- `src/lib/user-flow.ts`: a concise page-scope description, six visitor hypotheses, page-purpose principle, reading note and review loop.
- `src/lib/user-flow-pages.ts`: homepage and route inventory, purpose, content, handoff, gap, source and proposed test.
- `src/pages/lab/user-flow.md.ts`: static export using those same entries.
- `src/lib/section-navigation.ts`: the two lab sidebars' current-section marker.

Visitor paths and expected outcomes are design hypotheses, with no visitor study or conversion measurements attached. The scope does not restore any deleted website routes. Contact validates fields and composes email without claiming delivery. The lab retains `noindex, nofollow`.

## UX guidance applied

Reviewed September 12, 2026:

- [Nielsen Norman Group — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/): show the main route first; leave rationale and detailed briefs available on request. Remove unused configuration choices rather than adding more panels.
- [W3C WAI — Menu Styling](https://www.w3.org/WAI/tutorials/menus/styling/): consistent navigation, distinct current position, hover and focus states. The current marker combines a filled background, a border and semibold text with semantic state.
- [W3C WAI — Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html): preserve a visible keyboard focus indicator while softening the field treatment. Fields use a local 1 px neutral outline and border instead of the heavier foundation ring.
- [W3C WAI — User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/): pair field errors with a nearby explanation and associate it with the field. Loading and remove/undo examples announce their result; the loading message is outside the busy content region.

These are implementation choices informed by the guidance, not measured usability gains or a claim of full accessibility conformance. Sources and maintenance notes stay in repository documentation, not another on-screen chapter.

## Lab display decisions

The lab is a reference display, with square 48 px buttons, semibold labels, bold outlined Phosphor icons, filled fields and Crimson `#CF294E` negative actions. `ControlsShowcase.astro` uses the pinned Button/Input components; local CSS handles the website-specific treatment. Old saved appearance choices are no longer read. The selected display is present in static HTML/CSS.

Loading, success, validation and reversible removal examples share Controls, icons & feedback. The separate space/grid display is removed. Animation is a static placeholder; the previous isolated logo study is no longer mounted. The redundant lab footer and oversized introduction are removed. Mobile work remains deferred.

## Verification — September 12, 2026 cleanup

`bun run check` passed with zero errors, warnings or hints, including all 10 pinned generated files. `bun run build` produced 30 static routes. The sandbox blocked esbuild worker signaling; the permitted build outside that sandbox succeeded.

Desktop browser review at the default 1280 × 720 viewport covered the journey map in both themes, expanded REP brief, light control/field specimens and dark feedback examples. REP holder selection exposes only that journey; the REP destination opens its native brief, transfers focus and marks Pages & destinations. Scrolling the lab to Animation updates the sidebar and its placeholder has no image or SVG. Invalid email focuses the field; correcting it clears `aria-invalid`. Loading shows its skeleton/busy state then announces completion. Remove/undo restores the example. The existing preview dialog opens with its close control focused.

Computed styles confirmed square 48 px buttons with weight 600, filled fields, and one bold glyph per icon. Fonts reported loaded and the inspected desktop page had no horizontal overflow. Keyboard traversal automation was inconsistent; focus transfer and the field's CSS indicator were inspected, but a complete manual keyboard pass is not claimed. Reduced-motion behavior and no-JavaScript fallback were checked in source/static output; the OS preference was not changed. Browser logs contained host Electron warnings, with no website errors in the inspected entries. Initial screenshot/control timeouts were resolved before the final captures.

Built-output checks resolved all 19 lab and 79 blueprint links (including route/fragment targets), found no duplicate IDs, and confirmed all five journeys are present without JavaScript. The Markdown export is approximately 42,700 characters. Source scans found no machine-specific filesystem paths. All four local logos and their original reference copies match recorded SHA-256 hashes; no source originals or generated foundation files were changed. Mobile QA remains deferred.

## Verification — text and brief cleanup

`bun run check` passed with zero errors, warnings or hints; the 10 generated foundation files match upstream. `bun run build` produced 28 pages after retrying outside the sandbox because esbuild worker signaling was blocked. Static output contains all 23 briefs and 23 native review disclosures, no status badges or legend, unique IDs, and 49 resolving internal fragment links. The Markdown export uses the shortened page names and omits the status legend.

Desktop review covered the expanded problem brief in dark theme, light theme, and the simplified page list. The nested review disclosure opens on click and receives visible focus. Keyboard automation did not reliably toggle it; a full keyboard pass is not claimed. Fonts reported loaded, the reviewed viewport had no horizontal overflow, and browser error logs were empty. Native disclosures preserve the content without JavaScript; no motion was added. Mobile QA remains deferred. A fresh dev server on port 4330 resolved stale styles served by the existing preview. Only the flow component, inventory, page, export and this note were edited; no original source material or pinned foundation files were changed.

## Follow-up — clearer brief structure

Removed the scope line, blueprint eyebrow, draft date and repeated visitor-research footnote from the screen. Back navigation is a single arrow with an accessible name. Briefs use thin borders, a muted Purpose block, separated content items and stronger labels; no tables were introduced. Rationale is a separate shaded native disclosure. Existing Phosphor plus/minus icons switch independently for each parent or nested disclosure without pseudo-element text replacement.

Check and build pass (49 checked files, 28 built pages). Static output confirms the requested removals and both icon states on all 46 brief/disclosure controls. Desktop browser inspection confirms plus when Rationale is closed and minus when open, with the outer brief remaining open. Dark/light theme rendering, loaded fonts and no horizontal overflow were verified. The old dev server served stale component CSS; a fresh preview on port 4331 delivered the new styles. Screenshot and locator calls intermittently timed out before recovery. No motion was added; native HTML retains no-JavaScript disclosure behavior. Mobile review remains deferred. Only the flow page, local brief component and these notes changed; original source material and pinned foundation files were not edited.

## Follow-up — journey cards and disclosure rendering

Removed the map instruction caption and repeated audience/Hypothesis eyebrows. The audience picker and semantic journey labels remain. Replaced the thin timeline strip with four ordered cards: numbered markers, stage labels, destination titles and preserved detail. Hover uses surface and border changes; emphasis uses weight rather than underlines throughout the flow page and briefs.

All 52 disclosures now use one local SVG indicator, with only its vertical stroke hidden by its own open parent. This replaces multiple stacked symbols and text pseudo-elements. Browser checks confirmed a closed nested Rationale still shows plus while its outer brief is open, and clicking Rationale changes its own indicator to minus. The stale development process on port 4321 was restarted; the two extra servers started during earlier reviews were stopped. The reviewed URL is again port 4321.

Check passed with zero errors/warnings/hints across 50 files; build produced 28 pages. Desktop screenshots reviewed the journey cards in dark and light themes. Fonts loaded, no horizontal overflow was observed, all 49 static fragment links resolve, and removed captions are absent. No new motion or tables were added. Native disclosures retain their no-JavaScript operation; mobile review remains deferred. Production sources have no machine-specific paths; original reference material and pinned foundations were not edited.

## Follow-up — motion, alignment and connected steps

Removed the circular number treatments. Each four-step journey now has three decorative arrows between cards; card stage labels, titles and descriptions share consistent row sizing. Alternate-route links and decision columns use the same 24px gap and no mismatched horizontal inset. The expanded brief icons are centered in their summary gutters.

Chapter navigation uses native smooth scrolling with a 320ms heading arrival. Opening brief bodies and Rationale uses a single 240ms fade/translation; supporting journey notes use 220ms. Motion is gated by the script-set data attribute and `prefers-reduced-motion: no-preference`, so disabling JavaScript leaves the page static and changing to reduced motion removes the animation rules. Print suppresses the reveals. No dependency or idle loop was added.

Check passed across 50 files with zero errors/warnings/hints; build produced 28 pages. Desktop light/dark review covered connected cards and expanded supporting notes. Browser measurements confirmed matching column edges (266/749px in the reviewed viewport), identical title/detail baselines, zero number border radius, three arrows per journey, and one-shot 240ms brief animation. Homepage and Pages navigation preserved focus/hash/current-section behavior. Fonts loaded, no horizontal overflow was observed, and browser error logs were empty. Static output retains all 15 connectors and valid fragment links. Reduced-motion and no-JavaScript suppression were checked in source/static output; the OS preference was not changed. Mobile QA remains deferred. Original sources and pinned foundations were not edited; the production source portability scan passed.

## Follow-up — controls and journey polish

Save now downloads the shared Markdown brief from the header, followed by the homepage arrow and theme toggle. Embedded preview links and route boxes are removed. OG Member replaces Returning visitor; AI assistant is adjacent and explains the model/agent distinction as part of a source-reading journey. The lab preview derives its six-path count from the journey data. Homepage briefs now describe proposed content and acknowledge the empty canvas and deleted implementation.

Map stages use 24px gaps. Expanded briefs separate their purpose, content and rationale, and programmatic focus highlights the summary instead of outlining the full expanded region. Current check/build and desktop review evidence is recorded in docs/verification.md.

## Follow-up — simplified briefs, September 14, 2026

Removed Rationale, Next step and Open questions from all homepage and destination briefs and their Markdown export. Purpose and Content now share a desktop row, with one third of the available width for Purpose and two thirds for Content. Removed the journey decision/friction rationale while retaining alternative routes and testing notes. Original planning fields remain in the source inventory for provenance; the introductory copy now describes the simplified briefs.

`bun run check` passed across 42 files with zero errors, warnings or hints, including verification of the 10 pinned foundation files. `bun run build` passed after retrying outside the sandbox for esbuild worker signaling; it retains the existing large-chunk warning. Desktop Chromium review at 1440 × 1000 confirmed the two columns in light and dark themes, loaded fonts, no horizontal overflow or browser errors, keyboard disclosure toggling, and fragment navigation opening and focusing its target. Reduced motion disables the brief animation; native disclosures still work with JavaScript disabled. The in-app browser execution tool was unavailable, so this review used local headless Chromium. Restarting the existing dev server cleared stale component styles; the page remains available on port 4321. Mobile QA remains deferred. Production sources contain no machine-specific paths, and no original reference material or pinned foundation files were edited.

## Follow-up — coherent purpose/content structure, September 14, 2026

Replaced the isolated Purpose card with a unified, unboxed definition list. Both columns share a label baseline, a body-text baseline, the existing 16/24 body typography, and equal label-to-copy spacing. The body aligns with the brief title; a quiet top rule and vertical separator define the reading area. Content uses hanging bullets and whitespace instead of a border under every item. All copy and the earlier section removals are preserved.

Check passed across 42 files with zero diagnostics; build passed with the existing large-chunk warning. In-app desktop browser review at 1280px covered the short problem brief in light/dark themes and the long hero brief. DOM measurements confirmed matching label and body baselines and fonts. Fonts loaded, no horizontal overflow or browser errors were found, and the summary received visible focus. Clicking opened the long brief; keyboard automation did not reliably toggle the native disclosure, so a completed keyboard pass is not claimed. Native details and the existing reduced-motion/no-JavaScript animation gates remain unchanged; mobile QA remains deferred. Only the website-specific brief component and these notes changed; pinned foundations and source originals were not edited.
