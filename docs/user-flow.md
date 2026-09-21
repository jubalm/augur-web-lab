# Website user flow blueprint

The lab entry is `/lab#user-flow`; the detailed document is `/lab/user-flow`, with a matching build-time Markdown export at `/lab/user-flow.md`.

## Current scope — September 14, 2026

The planned website includes Home, About, Products, Learn, Blog, FAQ, REP and Contact. Products is one page with sections for Augur Lituus, Zoltar and Augur Stratoblast. Learn, REP and FAQ are included during R&D. Developers is the only possible later page; its current overview would duplicate Products. The user removed the extra scope chapter and redundant content briefs. See the leading decision in `docs/website-strategy.md`.

Five visitor journeys appear in the requested order: OG Member, CEO / decision-maker, CTO / builder, Newcomer and REP holder. Newcomer describes familiarity with Augur rather than technical ability. The document has four chapters: Journeys, Homepage sequence, Pages & destinations, and For every future change. Each audience has three question / homepage answer / optional destination rows; related questions can point to the same combined explanation. AI readability is an always-visible shared callout. Native disclosures keep every brief readable without JavaScript; Save exports the same data as Markdown.

The current homepage and Contact page are built; About, Products, Learn, Blog, FAQ and REP remain planned. Their shared header now reads About / Products / Resources / Community, with Talk to us on the right. About replaces Developers as the first standalone item and remains a placeholder until its page is built. The lab’s single Products brief (`page-products`) describes the planned page and its three sections, using the existing content-row presentation. The individual product briefs and the Developers, Educational articles, Blog article / quarterly report, Updates & quarterly reports and Papers & sources briefs are removed. Journeys link to Products, Learn or Blog as appropriate, with no dangling references to removed IDs.

Resources contains Blog / FAQ / Learn / REP / Whitepaper. Every resource is a placeholder. Products and Resources show names only. All dropdowns share a compact 240 px panel with 48 px rows, no item dividers and centered icons/arrows. The hero, Community, Contact socials and email actions also stay on the review site. The Introduction, Homepage, Why + how and Contact briefs and their Markdown export describe this behavior.

Talk to us opens `/contact/`: required Name, Email and Message, optional Company / project and Website, Ask on Discord, Telegram / GitHub / X and `contact@augur.net`. Send message demonstrates local validation only; it neither submits data nor launches an email app. There is no topic selector, local preview panel or delivery confirmation. Inbox provisioning or confirmation remains with the domain owner.

Homepage notes describe the current 96 px header, 150 px logo, 16 px navigation, static tonal background, 1.5-second arrival and interactive Signal Loom. The loom moves while visible and pauses with Escape; reduced motion retains a static composition. All six homepage sections and the footer are built for structure review; other product/content pages remain proposals.

The approved homepage plan has six main sections: **Introduction → Why + how → Possible applications → Current stage → From the blog → FAQ**, followed by **Footer / contact**. All six sections and the footer are implemented for review (September 19, 2026). The general map preserves that order under Orient / Understand / Evaluate / Continue. The September 19 Why + how brief opens “Built for high-stakes questions” with the shared section heading and three cards in one outlined strip, Resolve any question / Question every answer / Bribery-resistant by design, each with a mark, a title and a short technical description, then four always-readable steps and an ordinary example with an optional challenge. Question criteria, timing and fee details remain expandable, with a working January 2026 paper citation below. The user removed the economic-defense section for now. Current stage carries evidence beside status claims. Blog offers two useful reviewed reads and “View all posts”; a reviewed Learn guide may later join the selection with a Guide label. Contact becomes an invitation within the footer. The former problem, evidence, combined Learn/FAQ and standalone contact brief IDs remain removed; the compact FAQ has its own `home-faq` brief, and all audience targets resolve.

The short FAQ follows Blog and precedes the footer. Its three questions cover Augur’s relationship to earlier prediction markets, REP’s role and whether someone can build with Augur today. Answers are drafted from public posts and need maintainer review. Plan three or four native expandable answers, closed by default, with short answers and “View all FAQs” leading to the dedicated FAQ page. The newcomer’s remaining-doubt row points to this brief, with the full FAQ as an optional continuation.

Keep sections sized around their content and remove repetition to reduce scrolling. Essential answers belong beside the relevant explanation; FAQ remains available for a specific unresolved question. Learn and FAQ keep their planned pages and navigation/footer entries. Audience rows connect a question to its homepage answer and an optional deeper destination; visitors can stop after finding an answer or navigate directly to more detail.

The AI/LLM callout applies to all five journeys: readable HTML, source/version/date context, proposed maintained `/llms.txt` and Markdown explanations/documentation, and a comparison of human and assistant answers. The format is referenced to the [llms.txt proposal](https://llmstxt.org/), reviewed September 14, 2026. No machine-reading endpoint or documentation service has been built by this planning change.

Every destination still resolves to an existing page or homepage-section brief. Planned briefs remain in scope without implying their website routes exist. Community remains a header dropdown, with Contact used for discussion channels in the audience rows. Both lab sidebars track the active section. The flow header contains Save, the homepage arrow and theme control; the export preserves status and route metadata.

## Content ownership

- `src/lib/user-flow.ts`: page scope, shared homepage-sequence description, complete homepage map, five audience question sets, canonical destination resolution, shared reading callout and review loop.
- `src/lib/user-flow-pages.ts`: homepage and route inventory, purpose, content, handoff, gap, source and proposed test.
- `src/pages/lab/user-flow.md.ts`: static export using those same entries.
- `src/lib/section-navigation.ts`: the two lab sidebars' current-section marker.

Visitor paths and expected outcomes are design hypotheses, with no visitor study or conversion measurements attached. The scope does not restore any deleted website routes. Contact validates fields locally without submitting, storing data or leaving the page. The lab retains `noindex, nofollow`.

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

## Follow-up — shared journey start, September 14, 2026

Added the user’s proposed `00 · Homepage` as the common start above the graph, with a static connector into `01 · Orient`. The first stage’s destinations come from the six audience paths, which all use Orient while retaining their specific destination and need. The homepage paths now name Introduction and The problem to distinguish orientation within a section from arriving on the page. Entry prose describes visitor needs; alternate arrivals are explained beside the shared start. The Markdown export includes the same common start once.

`bun run check` passed across 42 files with zero diagnostics and verified all 10 pinned foundation files. `bun run build` produced five pages plus the Markdown export after the permitted retry outside the sandbox for esbuild worker signaling; the existing large-chunk warning remains. Static output has unique IDs, 60 valid fragment links, all six journeys and one shared start; the export has one `00 · Homepage` and six first-step Orient entries. Desktop browser review at 1280px covered light/dark layouts, loaded fonts, no horizontal overflow, CTO and New reader selection, and the shared Homepage link opening and focusing its brief. Browser error logs were empty. Keyboard automation timed out, so a complete keyboard pass is not claimed. The new content and connector are static HTML/SVG; existing reduced-motion gates remain unchanged, and OS-motion/JS-disabled browser testing was not repeated. Mobile remains deferred. All four source/runtime logo hashes match provenance; production sources have no machine-specific paths, and original material and pinned foundations were not edited. Reviewed preview: `http://127.0.0.1:4323/lab/user-flow`.

## Follow-up — Homepage start within each visitor path, September 14, 2026

The user clarified that the shared start belongs in the tailored CEO, CTO, New reader, REP holder, OG Member and AI assistant paths as well. Each panel now includes a compact `00 · Homepage` link outside its four-step list, with a static downward connector into `01 · Orient`. The overview remains intact. The Markdown export repeats the shared start within each audience section.

Check passed across 42 files with zero diagnostics and all 10 pinned outputs verified; build passed with the existing large-chunk warning. Static output and export include all six tailored starts; all 66 fragment links resolve with unique IDs. Desktop light/dark screenshots covered CEO and CTO panels, and switching to CTO retained its own Homepage start. Clicking that start opened and focused the Home brief. Fonts loaded, no horizontal overflow or browser errors were observed. Keyboard automation did not activate the link, so keyboard activation is not claimed. The addition is static HTML/SVG and introduces no motion or JavaScript; existing reduced-motion and no-JavaScript behavior remains unchanged. Mobile QA is deferred. Production sources remain portable; source originals and pinned foundations were not edited.

## Journey destinations match briefs — September 14, 2026

General and tailored maps, alternatives and the Markdown export now resolve destination names from the existing page and homepage-section briefs. “Introduction” becomes “Arrive and orient”; the builder’s design step opens “Follow the mechanism”; evidence and development context use “Inspect the evidence” and “Establish the current stage.” Homepage is the shared start and matching page-brief title. Repeated general-stage destinations are deduplicated. Community remains a documented header dropdown, with Contact used for discussion in the maps. The assistant’s final stop opens the evidence section; citation guidance stays outside the path. No website routes or sections were added.

`bun run check` passed across 42 files with zero diagnostics and all 10 pinned registry outputs verified. `bun run build` passed after the sandbox’s esbuild EPERM restriction required the usual build retry; the existing large-chunk warning remains. A focused data/render check verified 54 canonical destination references, all six tailored journeys, the general Markdown map and 65 valid fragment links with unique IDs.

Desktop review at 1280 × 720 covered both map layouts in light and dark. Longer titles wrap without clipping; fonts loaded and no horizontal overflow or browser errors were observed. General and tailored mechanism links opened and focused the matching brief. A dropped browser tab was recovered before completing the light review. No new motion or client behavior was added; maps and labels remain in static HTML and existing reduced-motion styles are unchanged. Disabled-JavaScript and reduced-motion browser emulation were not run; mobile QA remains deferred. No machine-specific production paths were found. Edits stayed within this workspace; source originals and pinned foundations were not changed.

## Unique destinations across general stages — September 14, 2026

Each general-map destination now appears only in its earliest stage, including the shared Homepage start. Products, REP, Blog and Make the problem concrete remain in Orient and no longer repeat later. Tailored audience paths keep their existing order. HTML and Markdown contain the same 12 distinct stage destinations plus the shared start.

Check passed across 42 files with zero diagnostics; all 10 pinned registry outputs verified. Build passed with the existing large-chunk warning. Desktop browser review at 1280 × 720 covered light/dark; Products opened and focused its matching brief, fonts loaded, no horizontal overflow or browser errors were observed. The existing preview on port 4321 was used after an additional dev-start attempt timed out. No motion, interaction or style code changed; reduced-motion and disabled-JavaScript emulation were not repeated. Mobile QA remains deferred. Runtime path scan and diff whitespace check passed. Source originals and pinned foundations were not edited.


## Audience questions and homepage containment — September 14, 2026

The user reordered audiences, moved AI assistance into a cross-site requirement and clarified that Homepage includes every section. Replaced fixed four-stop page paths and their arrows with semantic question tables. Each row explains what the homepage should answer and why a visitor might continue to a deeper destination. Direct entry routes remain prominent; FAQ is a conditional answer destination rather than a compulsory step. These are reviewable design hypotheses, not observed behavior. The section briefs retain their existing composition order and source content. The browser view and Save export use the same five audience records and ten-section map. No website routes, shared foundations or source originals changed.

Verification: `bun run check` passed across 42 files with zero diagnostics and verified all 10 pinned foundation files. `bun run build` produced five pages plus the Markdown export after retrying the sandbox esbuild worker-signaling EPERM failure with the permitted escalation; the existing large-chunk warning remains. Built HTML has 47 unique IDs and 51 valid fragment links, all five panels in static HTML, and one shared AI aside. The Markdown audience order matches and contains all 15 conditional question rows. At 1280 × 720, browser review covered light/dark audience tables and the dark AI callout, all audience selections, loaded fonts and no horizontal overflow. REP navigation opens its brief and transfers focus; browser error logs were empty. Screenshot and locator timeouts were recovered using the documented browser controls. A complete keyboard traversal and OS reduced-motion/JS-disabled browser pass are not claimed; static output retains all content and no new animation was introduced. Mobile remains deferred. All four runtime/source-original logo hashes match provenance, and the production source scan found no machine-specific paths. Preview: `http://127.0.0.1:4323/lab/user-flow`.


## Quieter User Flow presentation — September 14, 2026

Removed link underlines, repeated chapter eyebrows, the alternate-arrival and row-reading instructions, the llms.txt proposal link, and the engagement-measurement note. Simplified the homepage description while keeping the distinction between its first viewport and the full page. Audience labels now read CEO / decision-maker and CTO / builder. AI readability, the supporting journey note, the page-purpose principle and the review loop share one local callout style: muted surface, 3 px foreground left border and 24 px padding. Only the four map-stage boxes (Orient, Understand, Evaluate and Continue) receive the new subtle hover background. The user clarified this scope; the added hover backgrounds on the map container, audience cards, table rows, links and callouts have been removed. Existing disclosure and control hover behavior and explicit keyboard focus remain. The content removals and label changes are reflected in Save. No foundation files or website routes changed.

Verification: `bun run check` passed across 42 files with zero diagnostics and all 10 pinned foundation files verified. `bun run build` passed after the permitted retry for the sandbox esbuild EPERM failure; the existing chunk-size warning remains. Built HTML and Markdown contain the requested labels and omit the removed prose/link; all fragment links resolve. Desktop light/dark review at 1280 × 720 confirmed loaded fonts, no horizontal overflow and zero underlined User Flow links. All four callouts share computed 24 px padding, 3 px left borders and the same muted background. Hover rules are source-verified; automated pointer movement did not establish a hovered state, so visual hover activation is not claimed. Existing focus outlines remain explicit. No animation was added; reduced-motion and JavaScript-disabled browser testing were not repeated. Source-original/runtime logo hashes match provenance and the source portability scan passed. Mobile remains deferred.


September 14 refinement: removed the “Useful outcome & how to test” disclosure and its contents from all five audience panels and the matching Markdown export. Internal planning data is retained.


September 14 refinement: removed all “Go directly to…” lines from the audience panels, shared data and Markdown export. Audience selectors use equal-width grid columns. With JavaScript, all audience panels occupy one grid area and the tallest content determines its height; inactive panels remain hidden and inert. This keeps the panel size stable across audience changes without fixed heights or measuring scripts. Without JavaScript and in print, the journeys remain stacked.

Verification: check and build passed; the existing chunk-size warning remains. Desktop browser measurements found five 192 × 48 px selectors and five 992 × 515 px panels, with the shared height unchanged across all five audience selections. Inactive panels are hidden and inert. Light/dark screenshots were reviewed; fonts loaded and no horizontal overflow was found. The built page and Markdown contain no direct-route prompts. Mobile and print browser QA were not repeated.


September 14 refinement: moved the homepage-map hover highlight from whole stage boxes to their individual section links. Each link has 8 px padding and a subtle rectangular hover/keyboard-focus surface; stage backgrounds remain unchanged. Link text stays aligned with the stage content and no underlines return.

Verification: check and build passed. Light desktop layout was visually reviewed; dark DOM review found no horizontal overflow and all ten section links. Dark screenshot capture timed out. Hover/focus selectors are scoped to `.map-stage a`, with the whole-stage highlight removed; live pointer activation was not reverified.
