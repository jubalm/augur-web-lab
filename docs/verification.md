# 2026-09-21 — Richer redesign opening and scroll motion

- Scope: `/lab/homepage-redesign/`. Added the prepaint, finite hero sequence and
  grouped section entrances; preserved the copy, layout foundations, source art,
  native selectors and existing sticky mechanism. No dependency added.
- Desktop browser review at 1440 × 900 covered the Navy hero/mechanism/footer and
  Paper applications/roadmap/blog/FAQ surfaces of this fixed-light composition.
  Captured intermediate hero, section, article and footer arrival states and
  checked their fully visible settled states. The headline retains its three-line
  wrap. Fonts loaded, no horizontal overflow, and the final browser error/warning
  log was empty.
- Selected and backed Yes in the illustrative hero, verified its receipt, reset
  it, and checked Tab focus with a visible outline. Interaction settled the hero
  entrance. Mechanism selection remained usable and scrolling advanced to stage 4.
  Applications switched to Insurance & payments; the FAQ opened; the footer's
  Applications anchor navigated correctly. Footer columns and bottom row settled
  to opacity 1 at the end of the page.
- A separate localhost server served the built page with `script-src 'none'`.
  Hero and reveal targets were fully visible with animation `none`, fonts loaded,
  and native application selection and FAQ disclosure still worked.
- A temporary Bun harness ran the actual page, roadmap and inline-arrival
  controllers against deterministic DOM/observer/animation doubles: **27 cases,
  117 assertions passed**. Coverage includes live reduced-motion and visibility
  cancellation, focus/pointer settlement, nested group ownership, cleanup,
  pending-only history-cache restoration and no cached hero replay. This is
  lifecycle verification; OS-level reduced-motion emulation and an actual browser
  BFCache capture were not performed. Mobile QA remains deferred for this task.
- `bun run check` passed across 75 files with zero errors, warnings or hints;
  all 10 pinned outputs verified. Production build passed after esbuild required
  execution outside the sandbox; the existing >500 kB bundle warning remains.
  Production source/config has no machine-specific absolute paths. Source
  originals and pinned foundations were not edited; nothing was committed or
  published.

# Query creators and reporters — September 21, 2026

- Replaced the reporter-only mechanism with a complete query lifecycle:
  Builders define a query → REP holders report → REP holders challenge if needed
  → the application uses the final answer. Role labels remain on every stage.
  The query specifies a date, measure, outcomes and simplified criteria; query
  fees and reporter bonds are distinct activities, both involving REP.
- Yes/No/Invalid remains selectable. The default path has no challenge; an
  optional native checkbox introduces a new tentative answer and appeal period.
  Finality is a separate stage; the application applies its own payout rules.
- `bun run check`: 74 files, no errors/warnings/hints; ten pinned registry files
  verified. Final production build: six pages pass, with the existing unrelated
  large-chunk warning. `git diff --check` passes. No new dependency or runtime
  filesystem import; original sources, hero, roadmap and pinned foundations
  are unchanged by this iteration.
- Inspected desktop 1440 × 1000, laptop 1280 × 800 and mobile 390 × 844. Laptop
  sticky content measures 711.67px, fits and enables scroll progression. Ordinary
  scrolling after input advanced 01 → 02. Native stage selection and answer/
  challenge controls were exercised. No laptop/mobile horizontal overflow.
- Browser focus scrolling initially could override a selected scene. A short
  focus guard now ignores incidental scrolling and releases on wheel, touch or
  page navigation input; scene content also opts out of scroll anchoring.
  Confirmed stable challenge selection and checkbox use after the correction.
- Confirmed Yes → challenged No → final No, and mobile Invalid → unchallenged
  final Invalid. A temporary CSP script-blocked preview confirmed No → challenge
  Yes → final Yes without JavaScript. Reduced-motion and cleanup behavior were
  source-reviewed; no browser preference emulation claimed.
- Targeted detector: no primary findings; 13 local type-size advisories.
  Independent source and screenshot review: **ship**, no material findings.
  Evidence: `.impeccable/review/query-roles/`.

# Roadmap status redesign — September 20, 2026

- Replaced the equal-emphasis year columns with Completed / Building now / Up
  next. Four completed records use checked, muted, struck-through titles and
  native disclosures for their details and primary sources. Q3 2026 work has
  the strongest Navy/Green emphasis; future validation and launch remain undated.
- Calendar-quarter/source audit preserves the distinction between completed
  Augur v2 Moon Fork history and the ongoing Augur Lituus implementation.
- `bun run check`: 74 files, zero errors/warnings/hints; ten pinned registry
  files verified. Final build passes, six pages, with the existing unrelated
  large-chunk warning. `git diff --check` passes.
- Desktop 1440 × 1000 and mobile 390 × 844 reviewed, with no horizontal overflow.
  Fonts loaded and browser error/warning logs were empty. Keyboard Enter opens
  and closes completed records. A temporary CSP script-blocked preview also
  confirmed that the history disclosure and source link work without JavaScript.
- Finite check/line/marker entrances preserve visible default content. Reduced
  motion cancellation, visibility and page cleanup were source-reviewed, not
  browser-emulated. Detector: no primary findings, eight local type-size advisories.
- Independent source/screenshot review passed the hierarchy and mobile layout,
  finding one keyboard-outline overlap. Added 8px disclosure padding and rebuilt;
  a substitute independent reviewer confirmed that finding resolved after the
  original review continuation hit the agent thread limit. Captures and detector
  evidence: `.impeccable/review/roadmap-status/`.
- Runtime changes are confined to the roadmap component and its motion module.
  No dependencies, pinned foundations, original source assets or other homepage
  sections changed in this iteration. No machine-specific runtime imports.

# Heritage hero squares — September 20, 2026

- Restored the original homepage's incomplete-grid motif on the lab proposal:
  146 seeded 3-unit Paper/Green squares, sparse at the Navy hero's edges. Replaces
  the larger connected question-card nodes. The user's exact hero definition and
  “Open to anyone. Controlled by no one.” remain unchanged.
- `bun run check`: 74 files, zero errors/warnings/hints; ten pinned registry
  files verified. Build passes, six pages, with the existing unrelated chunk
  warning. Targeted detector: zero findings.
- Desktop 1440 × 1000 and mobile 390 × 844 checked. Pointer input activated the
  mask (observed SVG coordinates 1319.81 / 66.29); resize cleared it. No mobile
  horizontal overflow. SVG is aria-hidden and pointer-events:none.
- Static squares render without scripts. Finite group entrance and event-driven
  proximity use no idle loop. Reduced motion, forced colors and lifecycle cleanup
  are source-reviewed. Independent narrow source/screenshot review: **ship**,
  no material findings. Captures: `.impeccable/review/heritage-squares/`.
- No dependency, original source, brand vector or pinned foundation changes.

# Interactive homepage refinement — September 20, 2026

Latest evidence for `/lab/homepage-redesign/`; supersedes the behavior descriptions
in earlier entries below. The current `/` has not been promoted or replaced.

- `bun run check`: 72 files, zero errors/warnings/hints. Ten pinned registry
  files verified. `bun run build`: six pages pass; the existing large animation
  bundle warning remains elsewhere in the site. `git diff --check` passes.
- Shortened Navy hero removes the redundant statement, reporter paragraph and
  repeated guidance. The word emphasis uses a finite underline, preserving
  readable text throughout. The reporting example retains its bond risk and
  no-wallet qualification; verbose feedback remains available to assistive tech.
- Desktop mechanism: selecting No followed by ordinary scrolling advanced
  stage 1 → 2 → 3, carrying No into the 15 REP bond and a Yes/30 REP example
  challenge. Direct final-stage selection also works. At 1280 × 800, the
  sticky scene is 580.5 px tall and scroll progression is active. It activates
  only when the whole scene fits; narrow and reduced-motion layouts use controls.
- At 390 × 844, Invalid carries into the bond stage, native navigation opens
  with Enter and closes with Escape, and horizontal overflow is absent.
  An inactive shared dropdown caused overflow after desktop-to-mobile resize in
  the first inspection; the fix hides inactive surfaces/panels and clears geometry.
- Navbar pointer entry opened Products. Shared-surface movement, hover switching,
  the brief exit grace period and reduced-motion cancellation were source-reviewed;
  keyboard opening, Escape and mobile layout were exercised in the browser.
- A temporary script-blocked static preview confirmed that No still propagates
  through native answer/stage controls and native Products disclosure opens. The
  enhanced hero action stays hidden, the scroll sequence stays unpinned and all
  roadmap milestones remain readable. Expected CSP blocks are test-only.
- Desktop 1440 × 1000 and mobile 390 × 844 captures are recorded under
  `.impeccable/review/interaction-refinement/`, with hero, roadmap, navbar and
  mechanism detail captures. The full-page desktop image includes sticky-scroll
  travel space; it is occupied by the pinned scene during actual scrolling.
- Independent fresh source/screenshot reviewer: **ship the lab refinement**,
  no material findings in its inspected scope. Normal production preview reports
  zero console warnings/errors. Reduced-motion behavior is source-reviewed,
  not browser-emulated. The detector reports only local type-size advisories.
- Open yearly/quarterly chronology replaces the roadmap tabs. Dates and source
  distinctions are retained; the launch path has no invented launch quarter.
  No dependencies, source originals, shared foundations or brand assets changed.

# Navy product homepage refinement — September 20, 2026

This is the latest verification for `/lab/homepage-redesign/`. The existing `/`
composition remains unchanged by this refinement.

- `bun run check`: 69 files, zero errors/warnings/hints; ten pinned registry
  files verified at `fb35470`. `bun run build`: six pages pass. The existing
  warning about the site's other large animation bundle remains.
- Navy first viewport, page entrance and emphasized “decentralized” reviewed at
  1440 × 1000 and 1280 × 800. Tablet 768 × 1024 and mobile 390 × 844 also
  captured; no page-level horizontal overflow. Independent desktop and mobile
  review found no material layout defects; the FAQ product name was corrected.
- Hero Yes and Invalid reporting examples produce the selected answer with its
  15 REP receipt and risk explanation; reset clears the answer and re-enables
  controls. The local illustration never uses a wallet or actual tokens.
- Products opens with Enter, its underline reaches the active state, and Escape
  closes it and returns focus. Mechanism, application and quarterly roadmap
  selectors respond to native keyboard arrows. FAQ has exactly five native
  disclosures, only one open at a time; closed desktop section is 463 px tall.
- All three published blog thumbnails load from local responsive WebP assets.
  Six asset hashes match `docs/redesign-blog-provenance.json`. Calendar-quarter
  roadmap dates were checked against Augur's mission and dated blog updates;
  launch remains explicitly undated. Roadmap precedes the blog.
- Temporary local static server with `script-src 'none'` confirmed readable
  content, native application/roadmap selection and FAQ disclosure. The hero's
  script-dependent submit control stays hidden. Expected CSP errors belong
  only to that temporary check; normal production preview logs no errors/warnings.
- Reduced motion is source-reviewed, not browser-emulated. Entrance and scroll
  animations are finite; reduced-motion changes and page hiding cancel active
  effects. Cursor motion is event-driven and stops during control focus. Static
  content remains visible when scripts are unavailable.
- One h1, loaded fonts, no missing local anchor targets. Production proposal:
  106,019 HTML bytes / 22,760 gzip; 6,764 inline-script bytes, zero React islands.
  Evidence: `.impeccable/review/product-refinement/` desktop, laptop, tablet,
  mobile, interaction and no-JavaScript JPG captures.
- No pinned foundation files, source originals or dependencies were edited.
  Thumbnail derivation is documented; brand vectors remain unchanged. No
  machine-specific filesystem imports under `src`; `git diff --check` passes.
  No commit, push or publication. Mobile checks apply to this authorized proposal.

# Product homepage revision — September 20, 2026

This supersedes the earlier Resolution Machine verification below for the active
`/lab/homepage-redesign/` route. The homepage `/` is still the existing composition.

- `bun run check`: 68 files, zero errors/warnings/hints. All ten pinned registry
  outputs verified at `fb35470`. `bun run build`: passes, six pages; the existing
  large animation-chunk warning remains elsewhere in the site.
- The production proposal contains no React islands or external script bundles:
  5,603 bytes of inline scripts, 89,859 bytes HTML (21,177 gzip). No theme toggle.
  Fixed Paper composition with intentional Navy mechanism/footer sections.
- Browser captures reviewed at 1440 × 1000, 1280 × 800, 768 × 1024 and 390 × 844.
  Native controls, readable reflow and no page-level horizontal overflow at the
  narrow viewport; one h1, fonts loaded and no missing local anchor targets.
- Hero Yes/No/Invalid updates the illustrative response; Try another question
  changes the question and clears selection. Cursor input changed the parallax
  variables (`0.661`, `-0.079` observed). New questions are polite, atomic live
  announcements. No actual assistive-technology session is claimed.
- Products opens with Enter; Escape closes it. Native arrow keys change the
  mechanism stage and application. Only the selected application is exposed;
  FAQ opens with Enter. Production normal page logged no warnings or errors.
- A temporary static review server applied `script-src 'none'` using `?nojs`.
  Native navigation, FAQ, application selection and all content still work;
  the scripted next-question button is hidden. Expected CSP blocks are confined
  to that test. This does not change the shipped site or its policy.
- Reduced motion was source-reviewed, not emulated in the browser. CSS removes
  decorative motion, and controllers cancel active work on preference changes
  and page hiding; cursor work is event-driven, with no idle animation loop.
- Independent reviewer found the footer logo variant and new-question
  announcement defects. Both were fixed; the reviewer scored both resolved in
  a follow-up verdict using fresh desktop/mobile evidence and source markup.
- Evidence: `.impeccable/review/product/` desktop, laptop, tablet and mobile JPGs.
  The final desktop/mobile full captures and footer captures include the fixes.
- Four shipped logo SVGs match recorded source hashes. No source originals,
  pinned foundation files or dependencies were edited. No machine-specific
  filesystem imports under `src`; diff whitespace check passes. No commit,
  push or publication. Mobile QA here is the newly authorized proposal scope.

# Resolution Machine redesign — September 20, 2026

- Built `/lab/homepage-redesign/` as an alternative; added links from `/lab` and
  the hidden native chooser. Existing homepage/contact compositions remain.
- `bun run check`: 58 files; zero errors, warnings or hints. Ten pinned registry
  outputs verified at `fb35470`.
- `bun run build`: passes, six pages. The existing >500 kB warning remains for
  the site's other animation bundle. The redesign does not import Three.js.
- Production browser review at 1440 × 900, light and dark; 1280 × 720 reviewed
  during implementation and with scripts blocked. Fonts loaded, one h1, no
  horizontal overflow and no production console errors on the normal preview.
- Ordinary walkthrough: final No and 15 REP returned. Challenged walkthrough:
  incorrect Yes → 30 REP challenge to No → new appeal period → final No,
  30 REP returned. Previous/Next, direct step buttons and restart work.
- Bond explorer: native radio arrow-key selection changes the explanation and
  selected bar; keyboard focus visible. Hero Replay/Stop restores Final/No.
- A temporary local production server applied `Content-Security-Policy:
  script-src 'none'`: all four static steps remained visible, replay and optional
  scripted controls stayed hidden, diagram showed its final state, and native
  disclosure/radio exploration still worked. No source files were changed by
  this test. Intentional CSP console blocks are expected on that test origin.
- Reduced-motion behavior was source-reviewed: no hero run when reduced motion
  is active, active animations cancelled on preference changes, all section
  reveals disabled on this proposal. OS preference changes were not browser-tested.
- Impeccable detector: 24 advisory type-size findings only; local composition
  sizes are documented in DESIGN.md. No mechanical blocking findings.
- Independent finish review: `ship` after removing repeated application labels;
  refreshed light/dark captures show the fix with no visible regression.
- Ctrl/Cmd+K chooser includes the redesign and Escape closes it. Direct step
  selection, Previous and Start again were rechecked on the final build.
- Screenshots: `.impeccable/review/desktop-{light,dark}-*.png`. These are viewport
  section captures; the browser's full-page method changed `svh` during capture,
  so that invalid image was discarded. No full-page screenshot is claimed.
- Original PDFs read only; no pinned files/dependencies changed, no absolute
  filesystem imports added, no commit/push/publication. Mobile remains deferred.

# 2026-09-19 — Design review changes (hero and Why + how)

- `bun run check`: 53 files, 0 errors / warnings / hints; 10 pinned registry files verified. `bun run build`: 5 pages built. In the built homepage the headline's lines are separated by spaces, the whitepaper PDF is linked twice (hero action and citation), `#protocol` has no animation placeholders (Possible applications keeps its three), no accessible name mentions “Signal Loom”, and card 3 ends “…tries to buy the answer.”
- Reviewed on this session's dev server (4322) in the in-app browser. The hero fills the first screen again after the user rejected the shorter version: the hero's bottom and Why + how's top sit exactly at the fold at 1280 × 720, 1366 × 768, 1440 × 900, 1536 × 864, 1920 × 1080 and 1100 × 700; at 900 × 700 (two-row header) and 1280 × 620 the hero runs slightly past the fold, so nothing of the next section shows. The strip is 229 px tall. Light: the card-mark accent resolves to Deep, rgb(9, 94, 66); the strip, example card and “Talk to us” share the outline rgb(203, 203, 209).
- At 800 × 520 the page no longer scrolls sideways (the header had overflowed by 83 px); the header wraps to two rows, 125 px tall. The rest of the homepage has 18 px asides and no overflow; the footer button is 16 px. On `/lab` and `/contact/` every configured button has a 16 px label and none is clipped; Contact still fits one 1440 × 900 screen.
- The walkthrough still works on its new wrapper: Next advanced to 03 / 04 with “Appeal period”; its button label is 16 px (130 × 48). Keyboard: with focus on the hero animation, a real Escape key press set it to paused; the hero's Tab order is Explore Augur Lituus, Read the whitepaper (new tab), then the animation.
- The dev server logged errors at 17:34 while `WhyHow.astro` was mid-edit (an import removed before its use, then an unmatched closing tag). Every load after the edit completed returned 200 with no console errors.
- Not run: emulated reduced motion, Firefox, mobile below 700 px (unchanged and still deferred).

# 2026-09-19 — Built for high-stakes questions

- `bun run check`: 52 files, 0 errors / warnings / hints; 10 pinned registry files verified. `bun run build`: 5 pages built. The built homepage has the new heading and three card titles once each, and none of “Open to anyone”, “No one does”, the fact lines or the rejected folder-tab markup.
- Another chat’s dev server held port 4321, so this session ran its own with `astro dev --ignore-lock` on 4322 (the `augur-web-lab-auto` launch entry) and reviewed it in the in-app browser pane after fonts loaded. Captures: 1440 × 900 in dark and light, and 800 × 520 dark at 1:1 for the frame.
- At 1440 × 900 the strip measures 1313 × 362px, with three 436px cells. The mark, stage (132px), title and description start at the same heights in every cell (21 / 61 / 213 / 252px from the strip’s top). At 1:1 all eight 5px squares sit centered on the line crossings. No horizontal overflow at 1440; at 800 nothing in the section overflows (the header’s actions overflow the page at that width, as before). No console errors.
- Not run: emulated reduced motion (the strip keeps the shared `data-reveal` rules), Firefox, keyboard (the change adds no interactive element), mobile.

# 2026-09-19 — Animation placeholders and application picker

- `bun run check`: 52 files, 0 errors / warnings / hints; 10 pinned registry files verified. `bun run build`: 5 pages built. The built homepage has six placeholders and three application radios as static HTML, no “Before you build”, and no Zoltar in the applications section.
- The in-app browser pane was hidden, so screenshots and key presses went through the Playwright headless shell over the DevTools protocol, after fonts loaded. Captures: Why + how columns at 1440 × 900 and 1280 × 800 in light and dark; the picker at 1440 × 900 (first tab light, third tab dark) and 1280 × 800 (second tab light). Possible applications measured 700px tall at 1440 wide, down from about 1,600px as rows. Without the link and field labels, and with a 5:2 frame (520 × 208), it measures 608px, with a 240px panel area and no horizontal overflow; rechecked in light (first tab) and dark (second tab).
- Picker: exactly one panel is visible per tab, and the anchored underline matches the chosen tab’s position and width (0 / 180px, then 490 / 157px). Real key events: Tab enters on the selected tab with a visible outline; ArrowRight moves the selection and panel; Tab continues into the visible panel’s link and skips hidden ones; Shift+Tab returns to the selected tab. With emulated reduced motion, panel and underline transitions resolve to 0.01ms.
- Principles (replacing Ask / Resolve / Act): captured at 1440 × 900 in light and dark and at 1280 × 800. After Attack-resistant replaced Open source, rechecked at 1440 × 900 light and 1280 × 800 dark. All three titles fit on one line (50px tall at 1440, 46px at 1280), and the sentences start at the same height in every column. No horizontal overflow.
- Why + how copy rewrite: captured at 1440 × 900 light and 1280 × 800 dark. The lead is one line; “Open to anyone”, “Challenges pay” and “Attacks don’t pay” each fit on one line, and the sentences start at the same height. The steps render as Ask / Report / Challenge / Finalize with the new text. Next still advanced the example card to 03 / 04 with the “Appeal period” status. No horizontal overflow.
- Compact reason cards: captured at 1440 × 900 and 1280 × 800 in light and dark. The heading is two lines (110px at 1440, 99px at 1280) and each card is 313px tall. The stage border and brief are hidden in the inset variant, and the tag, title, sentence and fact share one left edge (measured x=77). The intro and cards take about 565px at 1440, against about 680px for the columns. No horizontal overflow.
- During the session the shared dev server kept serving the previous stylesheet for the component until the file was touched; the source and build were correct.
- Not run: Firefox (the underline falls back to a static border without anchor positioning), a scripts-disabled browser (the picker uses no script), mobile.

# 2026-09-19 — Scroll motion system

- `bun run check`: 0 errors / warnings / hints. `bun run build`: 5 pages built.
- In-app Chromium (scroll-driven animations, `::details-content` and `interpolate-size` supported), 1280 × 800: measured computed styles while scrolling. Application columns stagger (progress .38 / .18 / 0 at the same scroll position). Current stage lines draw in sequence: 76% / 0 / 0 at 150px into view, 100% / 87% / 0 at 260px, all complete by 480px. Markers and text follow. At the end of the page, every FAQ and footer element reports opacity 1. An FAQ answer transitions from 0 to 160px. Why + how Next still advances to 02 / 04; no console errors.
- Not run: Firefox (expected static by design), OS reduced-motion emulation (source-reviewed: every rule sits inside `prefers-reduced-motion: no-preference`), print, mobile. The browser pane was hidden for part of the session, so evidence is measured values plus small screenshots.

# 2026-09-19 — Remaining homepage sections

- Built Possible applications, Current stage, From the blog, FAQ and the footer on `/`. Status and blog facts were rechecked against the live augur.net blog (latest post August 5, 2026) and the public AugurProject/Lituus-CS repository on September 19; FAQ answers cite the July 2, July 21 and August 5, 2026 posts.
- `bun run check`: 51 files, 0 errors / warnings / hints. `bun run build`: 5 pages built.
- In-app browser at 1280 × 800, dark and light: all sections render, the use-case rows stay aligned when a title wraps, FAQ disclosures open and close, placeholder links take keyboard focus with a visible outline and do not navigate, fonts load, no horizontal overflow and no console errors. Mobile, reduced-motion (no new motion) and JavaScript-disabled browser passes were not run; the new sections use no JavaScript.

# 2026-09-19 — Augur / Augur Lituus naming

- Applied the user-chosen “next generation of Augur’s oracle” phrase to the Why + how introduction and handoff quote, renamed the primary hero action to “Explore Augur Lituus” (lab brief synced), and made the default document description lead with Augur. Recorded the naming rule in `website-strategy.md`.

# 2026-09-15 — Stable resolution card and automatic REP sequence

- `bun run check` passes: 44 files, zero diagnostics, all 10 pinned registry outputs verified. `bun run build` passes after the authorized esbuild sandbox retry; the existing hero chunk-size warning remains.
- The actual production initializer passes 13 deterministic fixture tests (`bun /tmp/resolution-motion-fixture.ts`): native forward/reverse buckets, direct/pre-pin selection, restored scroll, fixed scroll distances, query/dispute/outcome state, same-outcome exclusion, focus, criteria inertness and dismissal, finite chart completion, pause/resume/replay, reduced-motion changes, one-time reveals, short-window fallback and page lifecycle cleanup.
- In-app browser visual review at 1280 × 720 covers the introduction and query card in light/dark. The complete walkthrough pin measures 591.72px high at top 24px; the query card measures 475.72px high at top 124px. Opening/closing criteria, a 220px native scroll from Open to Reporting, reverse scrolling from Closed to Appeal open, and direct final-step selection preserve those positions and dimensions. The Disputed receipt also preserves geometry and shows the challenged answer. Escape closes criteria and returns focus to its summary; all four underlying scenes are inert while criteria is open. Fonts report loaded and there is no horizontal overflow. No application errors were observed; the browser host emits its existing Electron CSP warning.
- Browser capture/input became intermittent during REP playback review. A persistent preview was subsequently started at `http://127.0.0.1:4323/` and confirmed HTTP 200, but reconnecting the in-app browser timed out while attaching its webview. The chart's complete automatic sequence, native reduced-motion preference and JavaScript-disabled rendering were not visually verified in the browser. The initializer tests verify automatic timing and reduced motion; built HTML verifies static four-step/four-bar content, unique IDs and removal of the FAQ-like disclosures, source footer and Next round. This distinction replaces older blanket statements that all browser QA was blocked.
- Production source contains no machine-specific absolute paths. Brand Foundation and Lituus PDF SHA-256 values still match the recorded source hashes. No source originals, pinned foundations, dependencies, logos or other routes were changed by this iteration. Mobile QA remains deferred. No commit, push or publication.

# 2026-09-15 — Discrete gestures and bond-round exploration

- Separated resolution arrival, pinned step changes and departure. Added deliberate-gesture accumulation, one-step momentum gating, endpoint release and longer native scrolling intervals. Converted the REP chart to native round buttons and Next round, with one finite bar animation and a contextual explanation. The fork explanation is expandable.
- Isolated actual-initializer tests pass: stationary panel geometry, no step change during arrival, large bursts limited to one step, small-input threshold, reverse gestures, endpoint release, line/page wheel units, zoom/horizontal pass-through, native navigation, report/challenge choices, focus, chart selection, one active bar animation, reduced motion, fallback, batching and lifecycle cleanup. Check passes with 44 files and no diagnostics; 10 pinned files verified. Build passes with the existing large-chunk warning. Built output and the running preview confirm unique IDs, four native round controls, the static chart fallback and retained local report controls. Source hashes, pinned files, diff whitespace and runtime portability checks pass.
- Visual/browser QA remains pending because the current in-app tab is still on the previously blocked browser error URL. No screenshot, desktop theme, hardware wheel/trackpad or browser keyboard pass is claimed. No mobile QA, source-original/pinned changes, dependency additions, commit or publication.

# 2026-09-15 — Reading-center motion and refined report card

- Removed the visible chapter label/divider and requested warning/caption. Added a refined card with expandable criteria, outcome controls and compact upstream-styled actions next to REP requirements. Moved progression to the reading center, retaining a central pin and shared distance. Heading/principle reveals and relative REP bars track forward/reverse scroll position.
- Check passes (44 files, no diagnostics; 10 pinned outputs verified). Build passes with the existing chunk warning. An isolated test runs the actual initializer and verifies that step 02 starts while the first heading is near the viewport center, before pinning, plus progression, local actions, choices, focus, scroll motion, reduced motion, fallback, batching and lifecycle cleanup. Static output checks cover the removed copy, no-JavaScript content, native controls and unique IDs.
- Browser QA remains pending: the in-app tab is still on the previously blocked error page. Requested a user reopen; no alternate browser surface was used. No screenshot, desktop theme, native keyboard or native reduced-motion pass is claimed. Mobile remains deferred. No source originals, pinned foundations or dependencies were changed; no commit or publication.

# 2026-09-15 — Compact reporting preview

- Replaced tall per-step scroll spacing with a single pinned composition and 420px of shared progression. Completed headings receive strikethrough/checkmarks; the current explanation expands. Added native outcome choices, REP bond requirements, local report/challenge actions and focus management. Removed prominent hypothetical copy and timed autoplay.
- Check/build pass, with the existing large-chunk warning. Isolated actual-initializer tests cover progression, reverse/jump scrolling, completion states, answer selection, same-outcome exclusion, actions, focus, reduced motion, fallback and cleanup. Static output confirms unique IDs, six radio inputs, four local-only buttons and no-JavaScript explanation markup.
- Visual/browser interaction QA remains pending: the current in-app tab reports the same browser error URL blocked previously. Requested a user reopen while continuing independent work. No screenshot, desktop-theme, browser keyboard or native reduced-motion pass is claimed. Source originals/pinned files unchanged; no dependencies or external writes.

# 2026-09-15 — Scroll-driven resolution walkthrough

- Added sticky desktop illustration with 01–04 selection following the nearest explanation during forward/reverse scrolling. Scene sizing, short-window fallback, resize/font updates, reduced motion, manual step alignment and lifecycle cleanup are covered by an isolated test of the actual initializer. Existing manual playback and bond-animation checks also pass.
- `bun run check` passes across 44 files with no diagnostics; `bun run build` passes with the existing chunk warning. Source hashes, pinned foundation verification and the production portability scan pass.
- Desktop visual and browser interaction QA remains incomplete. The current in-app tab still reports the error-page URL blocked by browser policy during the previous iteration. No screenshots, dark-theme inspection or browser scrolling tests are claimed. No mobile QA, source-original changes, new dependencies, publication or commits.

# 2026-09-14 — Compact FAQ in the homepage plan

- Added `06 · FAQ` after Blog and renumbered Footer / contact to 07. The brief proposes three questions covering earlier prediction markets, REP and building with Augur today; answers remain subject to source review. It specifies three or four short native expandable answers and “View all FAQs”. Updated the lab entry, homepage overview, map, newcomer journey and decision notes; the Markdown export uses the same data.
- `bun run check` passed across 42 files with zero diagnostics and all 10 pinned outputs verified. `bun run build` passed after the permitted retry for the sandbox esbuild `EPERM`; the existing large-chunk warning remains. Built HTML and Markdown agree on seven homepage briefs, with 44 unique IDs and 43 valid fragment links. Removed the earlier five-section count and no-homepage-FAQ statement from rendered content/export.
- In-app desktop DOM review at 1280 × 720 covered the FAQ brief in light and dark, loaded fonts, no horizontal overflow and empty page-error logs. The map link opened the FAQ and transferred focus to it. Selecting Newcomer exposed its updated homepage FAQ link and optional full-FAQ destination. Restored light theme after review. Screenshot capture timed out, so a completed visual screenshot review is not claimed. No CSS or interaction code changed; native disclosures and existing reduced-motion/static-content behavior remain. Full keyboard traversal, JavaScript-disabled, reduced-motion and mobile browser runs were not repeated.
- `git diff --check` and the production portability scan passed. Home, Contact, their shared header and runtime logos match pre-task hashes; all four source-original/runtime logo pairs match provenance. No source originals or pinned foundations were written. Preview: `http://127.0.0.1:4323/lab/user-flow#home-faq`.

# 2026-09-14 — Concise homepage plan in the lab

- Replaced ten homepage briefs with five main sections and a combined Footer / contact brief. Why + how carries the problem, proposed mechanism, source reference and Learn invitation together. Current stage keeps supporting evidence nearby; From the blog proposes two selected reads. Updated the lab entry, audience targets, general map, shared sequence description and Markdown export.
- `bun run check` passed across 42 files with zero errors, warnings or hints, including all 10 pinned foundation outputs. `bun run build` passed after the permitted retry for the sandbox esbuild worker-signaling `EPERM`; the existing large-chunk warning remains. Built HTML and Markdown have the same six briefs, no retired brief IDs, 43 unique HTML IDs and 42 valid fragment links. The lab entry includes the shorter-plan description.
- At 1280 × 720, in-app browser DOM review in light mode confirmed the new map, brief titles, journey destinations, loaded fonts and no horizontal overflow. The current preview was also reached at `http://127.0.0.1:4323/lab/user-flow`. Screenshot capture and the subsequent fragment-click check timed out; completed visual, dark-theme, keyboard and focus-transfer checks are not claimed. No CSS, motion or interaction code changed. Existing native disclosures, static content and reduced-motion guards remain; JavaScript-disabled and reduced-motion browser runs were not repeated. Mobile QA remains deferred.
- `git diff --check` and the production source portability scan passed. Home, Contact, their shared header and all runtime logos match pre-task hashes. All four runtime/source-original logo pairs match recorded provenance. Edits remained in the lab content/templates and decision notes; source originals and pinned foundations were not written.

# 2026-09-14 — Moving navbar dropdown

- Added one shared background/outline to the Home/Contact header. Menu changes move it horizontally and resize its height over 300 ms; labels move with it and growing panels reveal their extra rows. Interrupted motion uses the current rendered position. A shared hover timer preserves the trigger-to-panel gap and closes on departure. Native details, click activation, Escape, outside dismissal and static no-JavaScript panels remain.
- Final `bun run check` passed for 42 files with zero diagnostics and 10 pinned outputs verified. Final `bun run build` passed with approved worker access and the existing large-chunk advisory; the initial sandboxed build hit the known esbuild `EPERM` worker restriction. `git diff --check` and the production portability scan passed. No source originals or pinned foundations were written.
- Reviewed Home and Contact at 1280 × 720 in light and dark. Click switching works across all three menus; sampled panel and surface rectangles coincide both in motion and at rest. Resources settles at 240 × 258 px. Fonts loaded, no horizontal overflow or final page error logs appeared, internal navigation worked, and Escape closed the panel and restored trigger focus. Temporary viewport and visibility overrides were restored.
- A temporary Bun harness ran the actual controller against DOM/event doubles: passed hover intent, touch activation, gap crossing, menu handoff, rapid reversal, delayed close, click switching, Escape/focus, reduced-motion cancellation and page lifecycle cleanup. Browser automation did not register mouse movement or native Enter/Tab activation, so a complete native hover/keyboard pass is not claimed. Reduced-motion preference changes were tested in the harness; no browser preference emulation, scripts-disabled browser run or mobile QA was performed. The no-JavaScript fallback was reviewed in source.

# 2026-09-14 — Simple navbar dropdowns

- Removed all Product and Resources descriptions and their unused data/styles. All dropdowns now use 240 px square panels, 8 px panel padding and 48 px rows with 12 px item padding. Removed internal dividing lines and retained the outer border and existing hover/focus treatments. One centered row layout handles plain labels, service icons and trailing arrows. Synced the current strategy, lab briefs and export source.
- `bun run check` passed across 42 files with zero diagnostics and 10 pinned outputs verified. `bun run build` passed with approved worker access and the existing large-chunk advisory. Built Home and Contact headers contain the exact expected labels in order, no description metadata and no external anchors. Lab HTML/export describe names-only menus. `git diff --check` and the production portability scan passed.
- Reviewed Home and Contact at 1280 × 720 in light and dark, covering Products, Resources and Community. Every product label fits one line; measured rows are 48 px and panels 240 px. Whitepaper and both Community icons have 0 px center difference from their labels. Whitepaper retains a 12 px right inset and no href. Fonts loaded, no horizontal overflow or page errors appeared, and clicking Whitepaper stayed local. Escape closed Resources and restored focus to its trigger. Hover/focus CSS is retained; a complete keyboard and hover pass is not claimed.
- Native disclosure, static labels and existing reduced-motion guards remain. No new JavaScript, scripts-disabled browser run, reduced-motion emulation or mobile QA was added. Source originals and pinned foundations were not edited.

# 2026-09-14 — Remove Brand assets and align Whitepaper arrow

- Removed Brand assets from Resources, current lab briefs/export and current scope notes. Whitepaper uses a fixed 20 px arrow column spanning both text rows, vertically centered, with the existing 16 px item inset. Its SVG renders as a block to remove inline baseline spacing; icon geometry remains unchanged. The menu remains a placeholder with no outgoing href.
- `bun run check` passed across 42 files with zero diagnostics and 10 pinned outputs verified. `bun run build` passed with approved worker access and the existing large-chunk advisory. All built HTML and the Markdown export omit Brand assets; all rendered anchors remain local. `git diff --check` and the production portability scan passed.
- Reviewed Home and Contact at 1280 × 720 in light and dark after recovering a browser connection timeout. DOM measurements confirmed a 0 px difference between the arrow center and the combined text-block center, with a 16 px right inset. Fonts loaded, no horizontal overflow or page errors appeared, and Resources retained visible focus and Escape dismissal. Static markup and existing reduced-motion rules remain; no scripts-disabled or reduced-motion emulation run was added. Source originals and pinned foundations were not edited. Mobile remains deferred.

# 2026-09-14 — Resources and structure-only external actions

- Added Whitepaper and Brand assets after Blog / FAQ / Learn / REP. Applied the user's structure-review correction to all external destinations: header resources/community, hero actions, Contact socials/Discord and direct email have no hrefs. Kept the proposed button appearance and external-arrow designs. Send message performs local validation only; removed email composition and handoff. Updated current notes and the shared lab/export briefs.
- `bun run check` passed for 42 files with zero diagnostics and 10 pinned outputs verified. `bun run build` passed with approved worker access and the existing large-chunk advisory. All five generated HTML pages have zero external anchors; all 16 Home and 19 Contact placeholders have no href. Built Contact retains the disabled-fieldset fallback, and source confirms submission prevention with no mailto or location assignment. Lab HTML and Markdown include Whitepaper / Brand assets and structure-review behavior. `git diff --check` and production source/config portability checks passed.
- Reviewed Home and Contact at 1280 × 720 in both themes, including the expanded Resources menu in light and dark. Fonts loaded, no horizontal overflow or page errors appeared, and the menu fits the viewport. Whitepaper, both hero actions, Ask on Discord and direct-email clicks kept the local URL. Talk to us still reaches Contact. Resources opened with Enter; Escape closed it and restored focus to its summary, although a complete keyboard/focus-visibility pass is not claimed.
- Empty Contact submission identified three required fields and focused Name. Corrected input cleared all errors; valid submission retained the entered text on `/contact/` without a sending claim or app handoff. Test input was cleared by reload. Static HTML contains all placeholder labels without JavaScript; form fields remain disabled until submission prevention is installed. No animation changed, no reduced-motion emulation or scripts-disabled browser run was performed, and mobile remains deferred. Source originals and pinned foundations were not edited.

# 2026-09-14 — About in the navigation

- Replaced Developers with a standalone About item before Products in the shared Home/Contact header. About retains the existing disabled-placeholder semantics until its page is built. Synced the first-viewport, Homepage and About lab briefs, their generated export and current decision notes.
- `bun run check` passed for 42 files with zero diagnostics and all 10 pinned outputs verified. `bun run build` passed with approved worker access after the sandbox blocked esbuild communication; the existing large-chunk advisory remains. Built Home/Contact navigation and lab HTML/Markdown checks passed, with no About route added. `git diff --check` and the production source/config portability scan passed.
- Reviewed Home and Contact at 1280 × 720 in light and dark. The new order fits the header, fonts loaded, neither route overflowed horizontally, theme switching and Talk to us navigation worked, and no page errors were logged. Screenshot capture recovered after an initial timeout.
- About retains `tabindex="0"`, `aria-disabled="true"` and the existing focus styles; keyboard automation did not reliably transfer focus to the disabled placeholder, so a complete keyboard pass is not claimed. No styles, scripts or animation were changed; reduced-motion and no-JavaScript guards remain in source. No new preference emulation, scripts-disabled browser run or mobile QA was performed. Source originals and pinned foundations were not edited.

# 2026-09-14 — Green pulses on light backgrounds

- Replaced all light-mode square fills with the existing Augur Green role. Added staggered 1.82–3.78-second scale/opacity pulses with a fully invisible interval. Dark mode retains its original fills, opacity and 2.6–5.4-second twinkle.
- Reviewed both themes at 1280 × 720. Browser samples confirmed green fills throughout light mode, changing scale/opacity, invisible pulse intervals and the original dark animation. Fonts loaded, no horizontal overflow or page error logs were found, and cursor illumination still activates.
- `bun run check` passed across 42 files with zero diagnostics and 10 pinned outputs verified. `bun run build` passed with approved worker access and the existing large-chunk advisory. `git diff --check` and production source/config portability checks passed.
- Source review confirms the new pulse remains inside the no-reduced-motion and JavaScript-enabled guards, with existing visibility pausing and static fallback preserved. No reduced-motion emulation, scripts-disabled browser run or mobile QA was performed. Source originals and pinned foundations were not edited.

# 2026-09-14 — Light-mode square visibility

- Increased light-mode base square opacity by 1.6 and darkened its green squares using the existing foreground role. Dark-mode values and animation/controller behavior are unchanged.
- Reviewed the homepage at 1280 × 720 in both themes. Confirmed light-mode cursor illumination, dark-mode contrast multiplier of 1 and original green fill, theme-control focus outline, loaded fonts, no horizontal overflow, working Contact navigation and no page error logs.
- `bun run check` passed across 42 files with zero diagnostics and all 10 pinned outputs verified. `bun run build` passed with approved esbuild worker access after the sandbox blocked worker communication; the existing large-chunk advisory remains. `git diff --check` and the production source/config portability scan passed.
- Reduced-motion and JavaScript-disabled static fallback were reviewed in source; no preference emulation or scripts-disabled browser run was performed. Source originals and pinned foundations were not edited. Mobile remains deferred.

# 2026-09-14 — Permissionless resolution lead

- Replaced the lead with the exact requested “Permissionless resolution. No central authority.” and synced the current strategy, lab/export source and creative brief. The Augur infrastructure paragraph remains as approved.
- `bun run check` passed for 42 files with zero diagnostics and 10 pinned outputs verified. `bun run build` passed with approved worker access and the existing large-chunk advisory. Built homepage HTML, lab HTML and Markdown export contain the new lead and omit the previous one. The portability scan and `git diff --check` passed.
- Reviewed the homepage at 1280 × 720 in light and dark: the lead fits on one line and the copy and actions fit the viewport. Theme switching works, with no page error logs. No layout, interaction or animation changes were needed; mobile remains deferred. Source originals and pinned foundations were not edited.

# 2026-09-14 — Augur infrastructure introduction

- Applied the exact user refinement: “Augur is decentralized oracle infrastructure for establishing truth onchain. Anyone can submit a question, propose an answer, or challenge an outcome.” Kept “Permissionless answers. No central authority.” Updated the matching lab briefs, export source, strategy and creative brief to introduce Augur rather than only Lituus.
- `bun run check` passed for 42 files with zero diagnostics and all 10 pinned outputs verified. `bun run build` passed with approved esbuild worker access and the existing large-chunk advisory. Exact copy verified in built homepage HTML, lab HTML and Markdown export; `git diff --check` and production source/config portability scan passed.
- Screenshot capture recovered. Reviewed the final homepage at 1280 × 720 in light and dark: the paragraph wraps into three lines, copy and actions fit, fonts load, and page dimensions match the viewport without overflow. Theme switching works and no page errors were logged. No layout or behavior changes were needed; mobile remains deferred. Source originals and pinned foundations were not edited.

# 2026-09-14 — Final hero wording

- Kept “Permissionless answers. No central authority.” and applied the exact approved paragraph: “Augur Lituus is a decentralized oracle that establishes answers and records them on the blockchain. Anyone can submit a question, propose an answer, or challenge an outcome.” Synced the first-viewport and Home lab briefs, generated export source, strategy and animation creative brief. No layout, interaction or motion changes were needed.
- `bun run check` passed for 42 files with zero diagnostics and 10 pinned outputs verified. `bun run build` passed with approved esbuild worker access and the existing large-chunk advisory. The exact copy was verified in built homepage HTML, lab HTML and the Markdown export. `git diff --check` and the production source/config portability scan passed; source originals and pinned foundations were not edited.
- The live browser DOM confirms the exact copy. At 1280 × 720, the page dimensions remain 1280 × 720 and fonts report loaded. Screenshot capture timed out despite reconnecting, so a fresh visual review of the final longer paragraph remains unverified. Prior visual evidence below refers to the shorter version. Mobile remains deferred.

# 2026-09-14 — Clearer hero copy

- Applied the user-selected “Permissionless answers. No central authority.” and the sentence explaining how anyone can submit a question, propose an answer or challenge an outcome. Updated the first-viewport and Home lab briefs, generated export source, animation creative brief and strategy decision. The user leaves development status to the planned roadmap and keeps the hero general across applications.
- Added `text-wrap: pretty` to the existing supporting paragraph so its final word is not isolated. Reviewed the final homepage at 1280 × 720 in light and dark on the existing development server at `http://127.0.0.1:4323/`: both copy blocks and actions fit within the viewport, fonts loaded, no horizontal overflow, the primary link has a visible keyboard-focus outline and theme switching works. No page error logs were recorded; the browser host emitted its existing Electron CSP warning. Reviewed the updated lab brief and confirmed both sentences in built homepage HTML, lab HTML and the Markdown export.
- Final `bun run check` passed for 42 files with zero diagnostics and all 10 pinned outputs verified. Final `bun run build` passed with approved esbuild worker access and the existing large-chunk advisory; the sandboxed attempt had failed with `EPERM: operation not permitted, send`. `git diff --check` and the production source/config portability scan passed. This is static text/CSS with no interaction or animation changes; no new reduced-motion or JavaScript-disabled browser run was performed. Mobile remains deferred. Source originals and pinned foundations were not edited.

# 2026-09-14 — Hover underline on “decentralized”

- Reused the existing underline after the entrance settles: 250 ms left-to-right draw, hold while hovered, and 180 ms fade before resetting its scale. The word stays stationary with `cursor: default`; no script, focus stop or link was added. Reduced motion removes transitions, and the JavaScript-only entrance marker keeps decoration static without scripts. The hover effect is restricted to fine pointers with hover support.
- `bun run check` passed for 42 files with zero diagnostics and all 10 pinned outputs verified. `bun run build` passed with existing approved esbuild access and the existing large-chunk advisory. Compiled draw/fade/reset timing and the updated generated flow brief were verified; `git diff --check` passed.
- The browser tool still reports its earlier connection-error page, so live hover/re-hover and light/dark visual verification remain unperformed. Input semantics, original logo assets and pinned foundations are unchanged; no source-original edits or mobile QA were performed.

# 2026-09-14 — Keep the arrow over animations

- The shared Signal Loom stage uses `cursor: default` in every state. Removed the hover grab and dragging-hand rules for both homepage and lab. Interaction handlers, hit testing, focus styles and square illumination are unchanged.
- `bun run check` passed for 42 files with zero diagnostics and all 10 pinned outputs verified. `bun run build` passed with existing approved esbuild access and the existing large-chunk advisory. Source review and built CSS confirm the arrow rule and absence of grab/grabbing cursors; `git diff --check` passed.
- The browser tool still reports the prior connection-error page, so no fresh light/dark browser cursor review is claimed. This change affects only the cursor declaration; mobile remains deferred. Source originals and pinned foundations were not edited.

# 2026-09-14 — Stronger scintillation and cursor illumination

- Increased scintillation brightness and shortened independent cycles to 2.6–5.4 seconds. Added a soft 200 CSS-pixel cursor radius that reveals brighter copies of the existing 172 squares through one SVG mask. Pointer movement changes only that mask, coalesces into one requested frame, and creates no pointer idle loop. The layer remains decorative and does not intercept input.
- `bun run check` passed for 42 files with no diagnostics and all 10 pinned outputs verified. `bun run build` passed with the existing approved esbuild access and large-chunk advisory. Built HTML contains 172 base squares, 172 matching highlight squares, the mask/controller and updated lab/export copy. `git diff --check` and the production source/config portability scan passed.
- A temporary harness executed the actual TypeScript controller with mocked browser events, visibility and SVG transforms. It passed coordinate mapping with a centered crop, constant 200 px radius at different scales, pointer-event coalescing, absence of an idle pointer loop, pointer departure, ignored touch input, reduced-motion cancellation, hidden/offscreen pause, history restoration and departure cleanup. These are controller checks, not visual browser or native SVG rendering tests.
- The built preview started at `http://127.0.0.1:4331/` and was opened in the Codex panel. The browser tool still reports its prior connection-error data page; a fresh desktop light/dark visual review and real cursor screenshot comparison remain unverified. Requested user confirmation that the preview is visible. Mobile remains deferred. Source originals and pinned foundations were not edited; no dependency, route, commit or publication was added.

# 2026-09-14 — Animate the heritage squares

- Replaced the static resting treatment with user-requested, staggered opacity cycles of 5–10.2 seconds. Grid positions, colors and peak opacity are preserved. A small controller gates the CSS animation by viewport visibility, tab visibility and reduced motion, with history restoration and departure cleanup.
- `bun run check` passed for 42 files with no diagnostics and all 10 pinned outputs verified. `bun run build` passed with the existing approved esbuild worker access and large-chunk advisory. Built output retains 172 static SVG squares with individual timing values, motion CSS, the visibility controller and updated lab/export copy.
- The earlier development preview served stale animation CSS and its screenshot request timed out. The production preview successfully started at `http://127.0.0.1:4330/` after the sandboxed preview startup failed. Browser automation then remained stuck on its prior connection-error data URL, with navigation and tab recovery rejected by the browser URL policy. Fresh light/dark visual verification and temporal opacity sampling could not be completed; the prior static-layout review below is not verification of this animation.
- Reduced motion, hidden/offscreen pause, history restoration and cleanup were reviewed in source; no OS preference emulation, scripts-disabled run or complete keyboard traversal is claimed. The new decoration remains inaccessible and noninteractive. Mobile remains deferred. No source originals, pinned foundations, dependencies or routes were changed.

# 2026-09-14 — Heritage square background

- Added 172 decorative squares to the homepage hero, generated in static SVG with an edge-weighted fade and a finite CSS entrance. The Home and first-viewport briefs and their generated Markdown export include the trial.
- `bun run check` passed for 42 files with zero diagnostics and all 10 pinned outputs verified. `bun run build` passed with approved esbuild process access after the sandbox blocked worker communication; the existing large-chunk advisory remains. Static output contains all 172 squares, and the generated flow export includes the new notes.
- Reviewed the completed hero at 1280 × 720 in light and dark using the refreshed development server on port 4323. An older preview served stale CSS; the refreshed server correctly positions the SVG absolutely and preserves the existing copy/artwork layout. Theme switching, Contact navigation and returning home work. Fonts loaded, no horizontal overflow or page error logs were found, and the squares have `pointer-events: none`, no accessible or focusable content, and no running animation after arrival.
- Reduced-motion, forced-colors and JavaScript-disabled behavior were reviewed in source; the static SVG was verified in built HTML. No OS preference emulation or scripts-disabled browser run was performed. Automated Tab did not move focus, so full keyboard traversal is not claimed; existing controls and their focus styles are unchanged. Mobile remains deferred.
- Runtime and original logo hashes match the provenance record. Production source/config scanning found no machine-specific filesystem imports. Source originals and pinned foundations were not edited; no dependencies, routes, commits or publication were added.

# 2026-09-13 — Remove the Forking Labyrinth

- Deleted the rejected maze component, lab wrapper, controller and geometry. Animation 02 is again an empty placeholder. Added the user-requested standalone creative brief in `docs/hero-animation-creative-brief.md` for further external concept exploration.
- `bun run check` passed across 42 files with no diagnostics and all 10 pinned outputs verified. `bun run build` passed with the existing esbuild process permission and existing large-chunk advisory. Homepage page, HeroLoom component and controller hashes remain identical to the baseline.
- Browser inspection of the refreshed lab confirmed the selected Animation 02 placeholder and no maze root. Fonts loaded and application error logs were empty. This restores the previously reviewed selector/placeholder styling and adds no animation. Source scan found no removed-module references or machine-specific production paths. Source originals and pinned material were untouched; no commit or publication. Mobile remains deferred.

# 2026-09-13 — Clear Animation 02

- Removed the rejected Overlapping Layers component, lab wrapper and controller. The earlier Independent Paths files were already removed. Restored Animation 02 to its original empty placeholder; no maze was implemented.
- `bun run check` passed across 42 files with no diagnostics and all 10 pinned outputs verified. `bun run build` passed using the existing esbuild process permission, with the existing large-chunk advisory. Homepage page, HeroLoom component and controller hashes match the baseline exactly.
- Desktop browser inspection confirmed the selected empty slot and zero removed artwork roots. Fonts loaded and browser error logs were empty. The deletion adds no motion or interaction; the native selector and existing focus styles remain. Source scan found no deleted-module references or machine-specific production paths. No source originals, pinned material, commits or publication were changed. Mobile remains deferred.

# 2026-09-13 — Use the homepage animation in the lab

- Replaced the independent lab Signal Loom with the existing homepage `HeroLoom` component and controller. Removed the obsolete lab component, controller and toolbar. Retained the rationale, selector and both placeholders; the local preview uses the homepage's tonal background and edge fade.
- `bun run check` passed across 42 files with zero diagnostics and 10 pinned outputs verified. `bun run build` passed with the authorized esbuild process access and existing >500 kB chunk advisory. Both built pages contain one shared hero loom and no old lab study. Homepage page/component/controller SHA-256 values match the pre-change baseline exactly.
- Desktop visual review covered the lab animation in light and dark. Both placeholder selections work, hidden rendering stops, and returning restores the shared animation. Escape sets paused state and stops rendering; an arrow key resumes it. Application error logs were empty. Existing reduced-motion/static fallback behavior was reviewed in the unchanged shared component/controller; no OS reduced-motion emulation or JavaScript-disabled browser run was performed. Mobile remains deferred. Source originals and pinned foundations were not edited; no commit or publication.

# 2026-09-13 — Lab animation selector

- Added Signal Loom as the default study and two selectable, explicitly empty animation placeholders. Native radio controls and CSS switch panels without a new script or dependency. Hidden Signal Loom now requires nonzero dimensions before its render loop can run.
- `bun run check` passed across 43 files with zero diagnostics and all 10 pinned outputs verified. `bun run build` passed outside the sandbox after esbuild process communication hit EPERM; the existing >500 kB chunk advisory remains.
- Desktop browser review covered the selector and placeholder layouts in light/dark, both placeholder selections, return to Signal Loom, hidden rendering stopping, and pause state surviving selection changes. Labels and panel visibility matched selection; application error logs were empty (the host emitted its Electron CSP warning). The browser reported loaded fonts. Native keypress automation did not change radio selection, so successful keyboard activation is not claimed. Focus styling, native radio behavior and existing reduced-motion rules were reviewed in source; no JavaScript-disabled browser run or OS reduced-motion emulation was performed. Mobile remains deferred.
- Production source/config scans found no machine-specific filesystem paths. Source originals and pinned foundations were not edited. No commit, push or publication.

# 2026-09-13 — Remove scope noise and consolidate Products

- Removed the added scope chapter, its data and styles, and its Markdown-export section. Restored the four original chapters. Removed the requested Developers, Educational articles, Blog article / quarterly report, Updates & quarterly reports, and Papers & sources briefs. The three product briefs now belong to one Products page brief; Learn, FAQ and REP are explicitly planned pages. Updated the six journeys, map, lab entry and current decision notes.
- `bun run check` passed across 42 files with no diagnostics and 10 pinned files verified. `bun run build` passed with the existing esbuild worker permission outside the sandbox; the existing >500 kB chunk advisory remains. The original five HTML routes remain, with no new website route or header change.
- Static checks confirm four chapters, 20 native briefs including 10 page/destination entries, unique IDs and 61 links whose same-page fragments all resolve. All eight removed/merged brief IDs are absent from HTML and Markdown. The export marks Products, Learn, FAQ and REP as Planned and contains no added scope chapter.
- Desktop browser review at 1280 × 720 covered the restored journey map in light, the Products brief in light/dark, and the revised lab entry through its DOM snapshot. The Products link opens and focuses its single brief; its three product descriptions are separate content rows. New reader selection shows Home → Learn → FAQ → Products. Back navigation works, fonts loaded, no horizontal overflow was observed, and application error logs were empty. An additional lab screenshot and subsequent theme interaction hit browser-control timeouts; no final lab screenshot or theme restoration is claimed. Full keyboard traversal was not rerun. Existing native disclosure, reduced-motion and static content behavior remain; no new animation or dependency was added. Mobile remains deferred.
- Production portability scan passed. All four runtime logos and source originals match recorded hashes; source originals and pinned foundations were not edited. No commit, push or publication.

# 2026-09-13 — R&D and prelaunch page scope (superseded above)

- Updated `/lab`, the flow document, its shared content and Markdown export around the user’s current R&D context. A leading scope chapter recommends Home / About / Blog / Contact; History belongs in About, papers beside relevant explanations, and updates / quarterly reports in Blog. Developers and Learn are deferred, with criteria for reconsideration. Dedicated product / REP / FAQ pages remain conditional. Existing website routes and header are unchanged.
- `bun run check` passed across 42 files with zero errors, warnings or hints; all 10 pinned generated files verified. `bun run build` passed after the sandbox blocked esbuild worker signaling with EPERM and the permitted build outside it succeeded. The existing >500 kB chunk advisory remains. Output contains exactly the existing five HTML pages plus the Markdown export.
- Static checks covered 12 lab links and 74 flow-document links: all same-page fragments resolve, with unique IDs. All 28 native briefs and six journeys are present in static HTML. The approximately 55 kB Markdown export includes the same scope, content placement and deferred-page decisions. No About, Blog, Developers, Whitepapers or Updates website route was created.
- Reviewed `/lab` and `/lab/user-flow` at the default 1280 × 720 desktop viewport in light and dark using the existing dev server on port 4323. The new scope and expanded About brief have readable spacing, loaded fonts and no horizontal overflow. History → About opens its brief, sets the hash and moves focus; the content sidebar tracks the destination. CTO / builder selection shows only its revised four-step journey. Back to the lab and Explore return to the expected destinations. Browser error logs were empty.
- Keyboard focus reached the About summary with a visible indicator. Automated Enter activation did not reliably toggle the disclosure; a complete keyboard traversal / activation pass is not claimed. Existing native details and reduced-motion / script-gated animation rules were reviewed in source; no OS reduced-motion emulation or JavaScript-disabled browser run was performed. New scope content is static, with no new animation or dependency. Mobile remains deferred.
- Production source/config scans found no machine-specific filesystem paths. All four runtime logos and their source originals match the recorded SHA-256 values. No source originals or pinned foundation files were edited. No commit, push or publication.

# 2026-09-13 — Lab and contact synchronization

- Synced the lab entry, six journeys, homepage notes and Markdown export with Products, Talk to us, the current contact fields/channels and email-app handoff. Added a built Products-menu brief plus proposed Zoltar and Augur Stratoblast briefs; renamed the existing Protocol brief to Augur Lituus while retaining its fragment ID. No product URL or unsupported capability was invented. Updated current documentation and removed obsolete routes from the README.
- Homepage notes now describe the tonal background, 1.5-second arrival and current pause/input behavior. Contact copy and metadata welcome questions about Augur products. The form implementation, recipient and fields are unchanged.
- `bun run check` passed for 41 files with zero diagnostics and 10 pinned outputs verified. The production build passed outside the sandbox, producing five pages with the existing >500 kB scene-chunk advisory. Static output contains 26 briefs and 56 resolving internal fragment links with unique IDs. Checked the export and rendered brief text for current product/contact content and absence of stale message-preview, Contact us, old timing/background and deleted source-file references.
- Desktop browser review covered `/lab`, Products and Contact briefs on `/lab/user-flow`, and `/contact/` in light and dark. Contact still fits 1280 × 720; its required/optional fields and single recipient match the brief. The Contact map link opens its brief, updates the hash and focuses that brief. Fonts loaded, reviewed routes had no horizontal overflow, and error logs were empty. No message was sent and no new end-to-end email handoff is claimed. Full native keyboard traversal was not rerun.
- This is content synchronization using existing styles and native disclosures; no new animation or runtime dependency. Reduced-motion/no-script behavior was retained in source, with no new OS emulation or JavaScript-disabled browser check. Mobile remains deferred. All 21 protected foundation, logo and reference PDF hashes match the baseline; source originals were not edited. Runtime/config portability scan passed. No commit, push or publication.

# 2026-09-13 — Products navigation

- Replaced the shared Protocol placeholder with a Products disclosure listing the user-supplied Augur Lituus, Zoltar and Augur Stratoblast names. Reused the Resources layout, typography, hover/click handlers and reduced-motion rules; native named details make the two menus exclusive. Product entries remain disabled placeholders without URLs. Updated the current strategy and header references in the planning brief/export.
- Browser-reviewed `/` and `/contact/` at 1280 × 720 in light and dark, including the open Products panel. All three names fit; fonts loaded and there was no horizontal overflow. Verified click opening, Escape closure with focus returned to Products, outside-click dismissal, Resources replacing the open Products panel, theme switching and the home link. Application error logs were empty. The first preview tab timed out during interaction/capture; a fresh tab restored verification.
- `bun run check` passed: 41 files, zero diagnostics, 10 pinned registry outputs verified. `bun run build` generated five pages after running outside the sandbox to resolve esbuild's EPERM subprocess restriction. The existing >500 kB scene-chunk advisory remains.
- Reviewed the native details markup and reduced-motion CSS in source; no JavaScript-disabled browser or OS reduced-motion emulation was run. Mobile QA remains deferred. All 21 saved protected foundation, logo and reference PDF hashes match the baseline. Runtime source/config scan found no machine-specific paths; no source-original edits, dependencies, new routes, commits or publication were introduced.

# Centered website navigation trial — September 13, 2026

- `bun run check` passed: 10 pinned outputs verified, 41 files checked, zero errors, warnings or hints. `bun run build` passed outside the sandbox after the sandboxed esbuild worker hit EPERM. The existing large Three.js chunk advisory remains.
- Reviewed the homepage visually in light theme at 1280 × 720 using the local dev server on port 4323. DOM measurements place the navigation center at 639.992 px against the viewport's 640 px center on both `/` and `/contact/`. Logo width remains 168 px; contact and theme controls occupy the right group. Both pages report loaded fonts, no horizontal overflow and no browser error logs.
- The theme control switched to dark, and Resources opened on click and closed with Escape, returning focus to its summary. Contact retains its native `/contact/` href and `aria-current="page"` on that route. Subsequent browser screenshot captures repeatedly timed out, including on the contact page; dark-theme/contact visual review and reliable keyboard traversal remain unverified. Mobile QA remains deferred.
- This is a static markup/CSS layout change. Existing dropdown/theme scripts, focus styles and reduced-motion rules remain intact; no new JavaScript or animation was introduced. A separate scripts-disabled browser session and OS reduced-motion emulation were not run.
- All four runtime and original logo assets match their recorded provenance hashes. Production source/config scanning found no machine-specific filesystem paths. Only the website header and decision/verification notes were edited; source originals and pinned foundations were not written. Nothing was committed, pushed or published.

# Contact page and header action — September 13, 2026

- Final `bun run check` passed: 10 pinned outputs verified, 41 files checked, zero errors, warnings or hints. `bun run build` passed outside the sandbox after the sandboxed esbuild worker hit EPERM. The existing Three.js chunk advisory remains. The build includes `/contact/index.html` and no restored legacy pages.
- The local built preview at `http://127.0.0.1:4330/contact/` returned HTTP 200. Homepage browser DOM inspection confirmed a native Contact us link targeting `/contact/`. The browser's click and screenshot calls failed; a subsequent connection-error page caused the browser URL policy to block further navigation. No workaround was attempted after that block. Desktop screenshots, both-theme visual review, actual keyboard traversal, font loading and console-error checks remain unverified for this change. Mobile remains deferred.
- A temporary harness ran the actual built contact-form script with simulated DOM controls/events: 7 tests and 47 assertions passed. It covers empty fields, native email mismatch feedback, whitespace-only messages, optional names, first-error focus, draft preservation, preview focus, hiding stale previews, text-only rendering of HTML-like input and prevention of submission. This is programmatic behavior coverage, not a browser validation or accessibility audit. The built form retains associated labels and descriptions, and Contact us has `aria-current="page"` on the contact route.
- Static output contains a disabled fieldset and an explicit no-script explanation; controls become available only after the preview handler is installed. No-script baseline was inspected in generated markup, not a browser with scripts disabled. The new page has no decorative motion; it reuses the existing reduced-motion-aware field/button styles, and preview focus scrolling is instantaneous. No new OS motion emulation is claimed.
- Social hrefs match the four destinations linked by augur.net on this date. Telegram and GitHub identity content was readable; Discord requires JavaScript and X returned 403, so successful joining/following is not claimed. Form delivery awaits the user's destination; no message was sent and no endpoint was configured.
- All 19 saved protected foundation/runtime-logo hashes and the three read-only reference-source hashes match the pre-edit baseline. Production `src`/`public` scanning found no machine-specific filesystem paths. No dependencies, source originals, pinned foundations, commits or published deployments were changed.

# Fast staged hero introduction — September 13, 2026

Timing refinement: the user found 800ms too fast. The current introduction completes in 1500ms with less front-loaded easing: headline lines stagger by 100ms, support ends at 900ms, buttons at 950ms, and artwork at 1500ms. Cleanup now waits 1800ms so it cannot truncate the longer reveal. Reviewed initial frames in both themes and confirmed the final settled state; browser-computed timing matches these values. Check and build passed, and all 14 lifecycle tests / 81 assertions passed with the updated cleanup margin. Earlier timing-specific measurements below describe the first version.

- `bun run check` passed: 10 pinned outputs verified and 40 files checked with zero errors, warnings or hints. Production build passed; its existing Three.js chunk-size advisory remains. Preview stays at `http://127.0.0.1:4325/`.
- Reviewed actual first frames and the resting hero on desktop in light and dark. Initial line opacity/translation differed by the intended stagger; support, buttons and loom appeared afterward. The final composition remains unchanged. Fonts loaded, no horizontal overflow was found, and no application errors were captured.
- Browser measurements confirmed buttons remain at y=554.78px throughout the reveal. During their transparent delay they report opacity 0 / pointer-events none; during the visible fade they report opacity .199 / pointer-events auto; at rest opacity is 1. Focusing Explore the protocol while `entering` immediately produced `settled`, full action/artwork opacity and the original href. No external navigation was triggered by this focus check.
- The actual inline JS passed 14 temporary lifecycle tests / 81 assertions: reduced/hidden/focused guards, early input, pointer movement continuing, final animation completion, missing-end timer cleanup, preference changes, hiding, navigation and history-cache behavior. Native events and control attributes remain unchanged. These tests supersede the earlier Web Animations harness. OS-level reduced-motion emulation was not performed.
- Built HTML places the bootstrap before hero content and has no animation flag by default, preserving the fully visible no-script baseline. It retains 168 fallback SVG paths and native action links. No new script-blocked browser session is claimed. Protected foundation/runtime logo hashes still match the saved baseline; production-source scans contain no machine-specific paths. Source originals, the scene geometry and shared foundations were untouched. Mobile remains deferred; nothing was committed or published.

# Hero depth and arrival — September 13, 2026

- Final `bun run check` passed: 10 pinned outputs verified, 40 Astro files, zero errors, warnings or hints. `bun run build` passed outside the sandbox after esbuild hit its known EPERM limitation; the existing Three.js chunk-size advisory remains. Built preview: `http://127.0.0.1:4325/`.
- Reviewed the updated `/` visually in dark at 1280×720 and light at 1440×900. The static tonal field, larger loom, clear text area and inset focal end render together; the latest concurrent CTA placeholders and green period remain intact. Fonts loaded and both sizes had no overflow. At 1280×640, DOM measurements also showed no horizontal or vertical overflow; screenshot capture at that size timed out, so no compact-height visual review is claimed.
- Observed the actual arrival in `entering` state with a partial heading translation/artwork fade, then `settled` with the heading transform removed. The live Three renderer initialized. Escape paused the loom and stopped rendering. No application error logs were captured. Full native Tab traversal could not be established through the browser tool; the enlarged artwork's focus cue was corrected during code review so it is independent of the clipped/masked scene edges.
- The temporary arrival lifecycle harness passed 11 tests / 55 assertions, including initial reduced motion, preference changes, focus/pointer cancellation, completion cleanup, hidden/offscreen guards, partial startup failure, navigation and history-cache restoration. Reduced motion is programmatically verified; no OS motion emulation is claimed.
- Built markup retains visible copy, 168 fallback SVG paths and an initially hidden canvas; background CSS is static. The JavaScript-disabled baseline was inspected in source/output, not in a new script-blocked browser session. The shared scene's existing lifecycle and fallback behavior were not changed.
- Protected foundation and runtime logo hashes match the pre-edit snapshot; all four original/runtime logo hashes match provenance. Production source/public scans found no machine-specific filesystem paths. No originals, dependencies, shared foundations or extra routes were changed by this pass. Mobile remains deferred. The user asked to retain the work; nothing was committed or published.

# Selective uncertainty and balanced interaction — September 13, 2026

- Final `bun run check` passed: pinned registry integrity and 40 Astro files, zero errors, warnings or hints. `bun run build` passed with the existing Three.js chunk-size advisory. Full rotation was canceled; the final camera retains limited tilt and has no Home/reset or 360° behavior.
- The actual-camera, home/lab input, indexed-scene, static-geometry and memory harnesses passed 36 tests / 323 assertions in separate Bun runs where module mocks require isolation. They cover angle bounds and damping, small-click versus drag input, pointer capture, all four arrows, continuous motion, pause/reduced/offscreen/hidden/history behavior, cleanup, finite geometry and bounded input memory. Reduced motion was tested programmatically; no new OS-level preference emulation is claimed.
- Actual scene construction retains two draw objects, 40,320 segments and 504 observations. All 806,400 expanded endpoint attribute values match the previous nonindexed construction using the current strand identities. The largest index is 40,487, fitting Uint16. Combined geometry buffers fell from 3,245,760 to 1,800,960 bytes (44.51%); buffers remain stable across rendering and input. Old pulse weights retire after 60 active seconds and fresh input starts immediately. These checks use real Three geometry/math with a mocked renderer; no GPU timing or frame-rate gain is claimed.
- The built scene chunk decreased from 564,058 to 542,743 bytes (gzip 141,152 to 136,359) after replacing OrbitControls with the small local damped camera helper and refining the shader. No new dependency, postprocessing pass, draw object or animation loop was introduced.
- Reviewed `/` and `/lab` on desktop, approximately 1280×720, in light and dark themes. Incoming strands retain distinct paths, the green focal bundle stays visible, and some strands now take detours or remain tentative. Mouse movement adds a small local response; clicking visibly loosens the result. Four direct lab clicks registered four disturbances with a present trace and a live renderer. Both routes loaded fonts and the Three renderer, had no horizontal overflow, and emitted no application console errors.
- A homepage drag remained within the composition; Escape paused rendering and released capture, and changing theme preserved that pause. The final build was reloaded and its live state checked. Camera/input details also have the programmatic coverage above; no comprehensive assistive-technology audit is claimed.
- Both generated SVG fallbacks retain 168 finite paths and 21 green accents. The 147 normally converging strands retain a 15.48px final spread, with at most 19.01px spread across the sampled downstream region; fourteen resistant and seven tentative strands preserve uncertainty. This is an illustrative geometry measurement, not a UX-comprehension result.
- Source and runtime logo hashes match provenance. Production source/public assets contain no machine-specific paths, and original assets and pinned foundations were not edited. Mobile QA and background art direction remain deferred.

# Travelling uncertainty and a responsive focal result — September 13, 2026

- `bun run check` passed: pinned registry integrity and 39 Astro files, zero errors, warnings or hints. `bun run build` passed with the existing Three.js chunk-size advisory. The continuous-motion, memory and focal-geometry harnesses passed 15 tests / 125 assertions.
- Final check and build also passed after smoothing repeated clicks. A focused harness using the actual scene lifecycle with a mocked WebGL renderer verified immediate first input, all seven clicks contributing to memory, pending-location coalescing without delaying the fade, and cancellation by static mode or clear. Across all 168 real strand seeds, the calculated fourth-click instantaneous result jump fell from .1804 model units to zero; the largest sampled step was .00456 at 60 Hz. These are programmatic continuity checks, not GPU performance measurements.
- Reviewed the built preview on `/` and `/lab` in light and dark at the browser's approximately 1280×720 desktop size. The green focal bundle remains distinct, with separated incoming strands and smaller residual differences at the result. Successive captures show the paths adjusting while retaining convergence. A homepage click visibly shifts and loosens the result. This visual review does not establish user comprehension or simulate real consensus uncertainty.
- Homepage Escape paused rendering; theme changes preserved that pause, and fresh pointer input resumed the live scene. The theme control had a visible focus outline. Both routes loaded the Three.js renderer and fonts, had no horizontal overflow, and emitted no application console errors. The browser itself logged its existing Electron CSP warning.
- Reloaded the final build and sent five rapid lab signals: the scene remained live with rendering enabled and a present trace, and no application errors were captured. The final homepage click also retained a healthy live renderer. The original dark theme was restored after review.
- Reduced motion, hidden/offscreen suspension, disposal and bounded spatial memory remain covered by the temporary programmatic harnesses. No new OS-level motion emulation or JavaScript-disabled browser review is claimed; the unchanged SVG fallback was retained. Source and runtime logo hashes match provenance, production source contains no machine-specific paths, and pinned foundations and original assets were not edited. Mobile QA and background art direction remain deferred.

# Steady focal convergence and small result disturbances — September 13, 2026

- `bun run check` passed: registry integrity and 39 Astro files, zero errors, warnings or hints. `bun run build` passed with the existing Three.js chunk-size advisory; the local built preview remains at port 4323.
- The temporary continuous-motion, memory and focal-geometry harnesses passed 15 tests / 125 assertions. Lifecycle checks include forty seconds of continuous rendering, pause/input behavior, reduced motion and disposal. Memory remains bounded under repeated input. Actual generated SVG coordinates are finite; the 154 majority strands narrow from 231.93 px at the input sample to 15.48 px at the focal end, while fourteen unresolved strands retain separation. This is a geometry measurement, not a comprehension or UX result.
- Both SVG fallbacks now contain twenty-one accent strands at .70 opacity, drawn last. Original and runtime logo hashes match provenance; no machine-specific production paths or pinned-foundation changes were introduced.
- Fresh desktop visual and interaction QA could not be completed for this pass: the preview tab disappeared, a recovery timed out, and the reconnected browser failed to attach its webview. The previous pass's light/dark screenshots do not verify the new focal taper or result disturbance. Reduced motion was covered programmatically; mobile QA remains deferred.

# Continuous flow and gentler new information — September 13, 2026

- `bun run check` passed: registry integrity and 39 Astro files, zero errors, warnings or hints. The final production build passed with the existing Three.js chunk-size advisory. Both generated fallbacks retain fourteen stronger green accent strands.
- Reviewed the built preview on `/` and `/lab` at 1280×720 in light and dark themes. Green strands remain distinguishable in dark mode and restrained in light mode. Neither inspected route had horizontal overflow; fonts loaded and no application console errors were captured. The development preview stalled on the scene's dynamic import and screenshot capture; verification completed successfully using the built preview at port 4323.
- Homepage renderer reported `three`, `state=live`, `rendering=true`. Clicking produced a gentle path adjustment. Escape paused rendering, changing theme preserved that pause, and fresh pointer input resumed continuous motion. Inspected controls and the scene had visible focus outlines.
- Lab renderer stayed live; an actual canvas click registered one disturbance and `trace=present`. Its visible copy describes continual information and evolving decisions without a timed phase sequence.
- `bun test /tmp/hero-loom-continuous.test.ts`: 7 tests / 94 assertions passed, including forty seconds of continuous rendering, elapsed-time correctness, input, persistent Escape pause, reduced motion, hidden/offscreen suspension, history restoration and disposal.
- `bun test /tmp/hero-loom-memory.test.ts`: 5 tests / 23 assertions passed against the actual memory module. Input has no instantaneous geometry jump; peak displacement reached .03566 model units at two seconds and .05040 at ten seconds. Six hundred repeated clicks stayed finite and below the .2 bound. Distinct input locations, decay and clearing passed.
- Reduced motion was exercised programmatically; no visual preference emulation or new script-blocked browser run is claimed. Original and runtime logo hashes match provenance. No machine-specific production paths, source-original edits or pinned-foundation edits were introduced. Mobile QA and background art direction remain deferred.

# Green accents and faster gathering — September 13, 2026

- `bun run check` passed: pinned registry integrity and 39 Astro files, with zero errors, warnings or hints. `bun run build` passed; the existing large Three.js chunk advisory remains.
- Reviewed `/` and `/lab` at 1280×720 in light and dark themes. The gathered phase has restrained green accents; the homepage focal end is visible beside the copy. Fonts loaded, neither route had horizontal overflow, and no application console errors were captured.
- The homepage settled with `state=idle` and `rendering=false`. Pointer movement woke it, clicking produced a visible ripple, and Escape stopped rendering. All nine placeholder header links compute to `cursor:pointer` and retain no href.
- In the lab, verified the transition from “Gathering observations” to “A focal pattern emerges”, and pause/resume behavior. Keyboard focus remains visibly outlined on the inspected controls.
- The temporary hero lifecycle harness passed 7 tests / 86 assertions, including reduced-motion input/focus gating, finite motion, visibility, history restoration and disposal. Reduced motion was tested programmatically, not visually emulated.
- Generated HTML for each route contains 168 fallback SVG strands, including 14 green gradients, with its canvas initially hidden. The additional script-blocked browser preview could not be completed: its server connection failed, and browser security policy blocked recovery from the error page. No browser bypass was attempted after that explicit rejection; fallback verification for this pass is markup-only.
- Source and runtime logo hashes match provenance. Production source/public assets contain no machine-specific paths. No original assets or pinned foundations were edited. Mobile QA remains deferred.
- “More life in the first viewport”, including later background art direction, is recorded in `docs/website-strategy.md` as the next design pass.

# Interactive hero and documented header — September 13, 2026

- `bun run check` passed: registry integrity verified and 39 Astro files checked with zero errors, warnings or hints. Final `bun run build` passed; existing large Three.js chunk advisory remains.
- Desktop browser at 1280×720: reviewed light and dark themes, full header and Resources panel. No page overflow; fonts loaded and no application console errors captured. Main header destinations have no href and remain explicitly unavailable as requested; hero source actions remain links.
- Resources was opened by click and closed with Escape, returning focus to its summary. Native opening also worked in a built-page preview with scripts blocked by CSP. Hover handling is implemented; synthetic browser hover did not establish its behavior, so it is not claimed as a completed visual check.
- Real browser pointer movement woke the idle scene; clicking produced a visible ripple, dragging changed the weave, ArrowLeft woke keyboard motion, and Escape returned it to idle with rendering=false. No playback control remains.
- Updated temporary tests: `bun test /tmp/hero-loom-interactive.test.ts` passed 7 tests / 86 assertions, covering the 4.5-second intro, actual input versus passive focus/entry, finite tails, click/drag separation, keyboard/Escape, reduced-motion input and focus gating, offscreen/hidden/bfcache handling, context fallback and disposal. Reduced-motion preference was simulated in the lifecycle tests, not emulated in the visual browser. The previous playback-only temporary harness is superseded.
- Script-blocked preview retained 168 SVG paths, excluded the inactive scene from tab order, hid its instructions, and contained zero playback controls. Original source/runtime logo hashes still match provenance; no original assets or pinned foundation files were edited. No machine-specific paths occur in production source/public assets.
- Background art direction remains deferred by the user. Mobile QA remains deferred. No routes were restored and no publish, commit or push was performed.

# First viewport — September 13, 2026

- `bun run check`: pinned registry integrity passed; Astro reported 0 errors, warnings or hints across 39 files.
- `bun run build`: passed; only the existing large Three.js chunk advisory remains. The sandboxed esbuild worker failed with EPERM; the authorized build outside the sandbox completed normally.
- Browser: reviewed `/` at 1280×720 in light and dark, 1440×900 in light, and a short 1280×640 desktop in light. The short viewport has no page overflow; both actions and playback fit. Final headline/body are separate from the masked artwork. Fonts loaded, controls have accessible labels, primary-action focus is visible, and DOM focus order places both actions before playback. Full keyboard traversal was not established by the browser tool.
- Theme switching, replay and pause were exercised in-browser. The settled hero reports rendering=false. No application console errors were captured. The retained lab scene still initializes through the shared renderer.
- A temporary localhost preview with CSP `script-src 'none'` verified the built page without scripts: readable copy, real links, original logo and all 168 SVG strands remain; canvas/playback/theme controls stay hidden.
- Six temporary Bun lifecycle tests (55 assertions) passed for reduced-motion preference changes, finite playback/replay, pause/resume, visibility/offscreen suspension, bfcache, context loss and cleanup. Reduced-motion behavior was exercised programmatically, not through an emulated browser preference.
- Production source/output contain no machine-specific absolute imports. All four source and runtime SVG hashes match the recorded provenance. Source originals and pinned foundations were not edited. No mobile QA, publication, commit or push was performed.

Earlier entries describe earlier iterations.

# Verification — website content revision, September 12, 2026

- `bun run check`: 46 files, zero errors, warnings or hints. Ten generated Augur files pass the pinned registry integrity check.
- `bun run build`: 29 static pages, successful. No new dependencies or React hydration were added.
- Generated internal routes and fragments resolve. Each Homepage 1 content route has one H1. No visible source-domain labels or machine-specific filesystem paths appear in production HTML, CSS or JS.
- Desktop review used the in-app browser at approximately 1265 × 713. Homepage header and Resources disclosure were reviewed in dark; Solidity and roadmap in light; Blog in light and dark; REP introduction/responsibilities in dark and version table in light; categorized FAQ in both themes; Whitepapers and the corrected footer in dark. No horizontal overflow or broken images was found in the inspected views. Font loading completed.
- The navigation computes to `position: relative`; after scrolling 3600px its top is -3600px, while the independent theme icon stays at 40px. The icon was moved into the outer gutter to avoid overlapping content and article counts.
- Resources' native click disclosure opens the 780px panel. Escape closes it and restores focus when focus is inside. Pointer-enter opening, delayed pointer-leave dismissal and document-level Escape are implemented. The browser tool's pointer movement did not produce a verifiable hover state; hover entry/exit was source-reviewed, not claimed as a passed pointer interaction test.
- A cached development stylesheet initially showed the former footer layout. Re-invalidating the component and reloading corrected it; the final browser computed four equal footer columns and the screenshot matched the new markup.
- The homepage renders exactly three articles, with both supporting thumbnails measured at 200px, and exactly five FAQ disclosures.
- Blog search for “whitepaper” returns one article. Combining it with Development returns zero and shows the empty state. Clear filters restores all 15 articles and returns focus to Search. Research then returns exactly two articles.
- REP and FAQ anchors scroll smoothly and settle about 96px from the top. FAQ has three categories with nine placeholder questions. The REP category link and its first disclosure were exercised.
- Clipboard writes were denied in this embedded browser. The explicit fallback selected the exact REP contract address and displayed the keyboard copy instruction. No clipboard success is claimed for this environment. The same component is used by the Solidity panel.
- Ctrl+K still opens the hidden website chooser; Escape dismisses it. Homepage 2 and 3 retain the unchanged blank layout.
- Reduced-motion guards and finite reveal/dropdown behavior were reviewed in source. OS-level motion emulation and a complete keyboard/screen-reader audit were not performed. Static content and native disclosures remain available without JavaScript; Blog filters and copy/theme buttons only appear when initialized.
- No application errors appeared in the inspected browser log. Browser automation occasionally required fresh DOM identifiers or a scroll action; these were tooling limitations, not silently reported as passing interactions.
- All 15,415 reference originals matched the initial size, modification time and SHA-256 baseline. No source originals were written. Asset provenance now covers all 27 copied article images; the Solidity excerpt records its pinned source and whitespace-only formatting.

Earlier checks of unchanged contact validation, Crimson borders, appearance persistence, ring loading, and blank canvases remain recorded in prior task work. Contact continues to preview locally without sending. Mobile design and QA are deferred by the user's explicit request.

## Controls and flow polish — September 12, 2026

`bun run check` passed across 45 files with zero errors, warnings or hints; the pinned registry verified all 10 outputs. `bun run build` produced 28 pages. Build required the established escalation because sandboxed esbuild worker signaling failed with EPERM.

Desktop browser review at 1265×712 covered the boxed 3×2 icons, filled fields, finite skeleton sweep, OG Member / AI assistant selector, header Save order, and expanded briefs in light and dark themes. Loading reported busy during the two-pass animation and returned to ready; valid email input cleared aria-invalid. Save triggered a browser download. Flow fragments all resolved, fonts reported loaded, and no horizontal overflow or browser error logs were found. Native nested disclosures opened by click; the automated Enter attempt did not establish keyboard toggling, so a full keyboard pass is not claimed.

The homepage was inspected after selecting dark mode: it remained white with 11 labelled sections and no button, navigation, form or image elements. Its production HTML contains no scripts. The retired homepage components and animation module are absent; the Markdown includes both revised journeys and none of the removed preview links. Reduced-motion suppression and static no-JavaScript behavior were reviewed in source/output; the OS preference was not changed. Mobile QA remains deferred.

The stale port-4321 Astro process was replaced and the temporary port-4327 process closed. Final preview remains on 4321. All edits and deletions were confined to this repository; original source material under /home/goddard/augur was not modified. The production-source scan found no machine-specific absolute paths. No commit or publication was made.

## Follow-up: feedback alignment and control states

Check passed with zero errors/warnings/hints across 45 files; build produced 28 pages. Desktop browser review covered both themes, loading, remove/undo, and the user-flow header and briefs. The loading row measured 326px in both busy and ready states; the two result cards shared the same top and 210px height. Actions contained zero icons. The expanded 404 brief had 24px between summary and Purpose. The back arrow measured 44px wide, remained at the top during deep-page scrolling, and returned to /lab#user-flow. Internal fragments resolved, fonts loaded, and no horizontal overflow or app console errors were observed.

Shared hover/active/disabled/focus selectors were inspected in source; pointer automation did not establish the hovered state, so visual hover/press coverage is not claimed. Reduced motion and no-JavaScript fallbacks remain source-verified. Mobile review is still deferred. Homepage production output has no scripts. Registry verification and the filesystem-import scan passed; original source material was not edited. The stale preview process was refreshed on port 4321.

## Compact header verification

Check passed with zero errors/warnings/hints; build produced 28 pages. After refreshing stale Astro styles on port 4321, desktop measurements confirmed a 72px header, original 45px glyph, four 44×44px controls and no horizontal overflow. Light/dark header screenshots were reviewed; the Save link has no visible text and retains its download URL, filename and accessible label. A fresh download-event check timed out, so a new download is not claimed for this refinement. App console errors were empty. Only Header.astro and decision/verification notes changed; generated foundations and original source material were untouched. No new motion or mobile work was introduced.

## Canvas-only website and local Actions

Check passed across 30 files with zero errors/warnings/hints; build produced four HTML pages: /, /lab, /lab/user-flow and 404, plus the Markdown export. No dist/homepages or runtime images directory remains. The entire old route tree, secondary page components/helpers, editorial CSS, article data and website images were deleted. Current AGENTS.md, README, strategy notes and planning briefs now describe the canvas-only scope.

Desktop browser checks covered light/dark Actions: Primary, Outline and Ghost clicks stayed on /lab#core-ui, with zero links in the example group. Try loading entered aria-busy/aria-disabled, animated its ring, and reset to its original label after two seconds. Ghost has a transparent resting border. The Icons specimen section is absent; interface icons remain. Fonts loaded, no horizontal overflow was observed, and lab console errors were empty.

The exact user-reported http://localhost:4321/homepages/01/whitepapers URL rendered the missing-page screen. Its View canvas link opened / directly, with a white background, 11 sections, and zero buttons, navigation, images or forms. Production canvas HTML contains no scripts. Static flow fragments all resolve. A shell HTTP-status probe could not connect to the browser's localhost environment, so no raw status-code sweep is claimed; route removal was verified through generated output and the browser. The dev server was refreshed on port 4321.

All changes were confined to this workspace. Original source material and pinned registry outputs were unchanged; no machine-specific runtime imports were introduced. Source provenance notes remain for research. Mobile review remains deferred; loading animation remains finite and suppressed under reduced motion, with no JavaScript-dependent decoration on the canvas.

## Logo navigation reload fix

Reproduced an unnecessary document reload by entering a Search value and clicking the logo while already on /lab: the value was cleared. Header now uses the native #main anchor on /lab (including its trailing-slash form), while retaining /lab navigation from other routes. After the change, desktop light/dark checks preserved the field value and theme, returned scroll position to zero, and kept the 72px header and 45px glyph stable. Fonts loaded and console errors were empty. No new script, motion, dependency, or source asset change was needed. Check passed across 30 files; build produced four pages. Mobile remains deferred.

## Distinct button hovers

Check passed across 30 files with zero errors/warnings/hints; build produced four pages after retrying an esbuild sandbox EPERM failure with elevated execution. Desktop light/dark screenshots verified resting controls; computed styles confirmed the new outline hover values and ghost pseudo-element. Busy state reported aria-disabled/aria-busy and no shadow. Fonts loaded, no horizontal overflow was present, and browser error logs were empty. Local button clicks preserved the route. Pointer automation did not establish :hover, and Tab did not reliably transfer focus, so animated hover/press visuals and a full keyboard pass are not claimed. Reduced-motion suppression and CSS-only operation were checked in source; no OS preference or JavaScript toggle was used. Mobile remains deferred. Changes were confined to website-options.css and these notes; pinned outputs passed integrity verification, original sources were not touched, and the production source scan found no machine-specific paths.

## Non-clickable lab journey overview

Arrive, Understand, Evaluate and Continue are plain list items with the existing CSS hover highlight and reduced-motion override. They have no link, button, click handler or tab stop. Check passed with zero diagnostics and build produced four pages after retrying the sandbox esbuild EPERM error. Desktop dark/light screenshots on the fresh preview at port 4327 confirmed the card layout; DOM inspection confirmed all four cards have grid layout and no interactive descendants. Port 4321 served stale CSS even after reload. Hover animation remains source-verified because pointer automation was unreliable. Only the lab page and documentation changed; pinned files and original sources were untouched, and the source portability scan passed. Mobile QA remains deferred.

## Journey caption removal and original preview repair

Removed the visitor-path caption and its unused import/margin. The user's collapsed-card screenshot came from the original port 4321 server retaining old anchor selectors. Restarted that exact server and stopped the temporary port 4327 preview. Desktop screenshots at 4321 now show the four padded cards in both themes, with the caption absent. DOM styles confirm grid layout, 12 px gaps, 20×16 px padding and no interactive descendants. Fonts loaded, no horizontal overflow appeared, and browser error logs were empty. Check passed with zero diagnostics; build produced four pages. Existing CSS hover and reduced-motion rules remain. Only the lab page and this note changed; registry integrity and source portability checks passed, and source originals were untouched.

## 2026-09-13 — Coming into focus

- Replaced only the `/lab#motion` placeholder with the requested abstract field study; the `/` canvas remains unchanged.
- `bun run check`: zero errors, warnings, or hints; all 10 pinned registry outputs verified. Production build passed outside the sandbox after esbuild encountered an EPERM subprocess restriction inside it.
- Browser-reviewed at desktop 1440 × 1100 in light and dark themes. Inspected dispersed and resolved compositions; tested replay, pause, keyboard Home/PageUp/End seeking (0%, 10%, 100%), focus indication, and reduced-motion preview (settled geometry with playback disabled).
- Browser console returned no errors; `document.fonts.status` returned `loaded`. OS-level reduced-motion emulation was not run; its media-query gate and change listener share the tested static preview path.
- Parsed the production HTML: 377 static SVG fragments remain available, while Canvas and playback controls start hidden. This verifies the no-JavaScript markup; a separate browser session with JavaScript disabled was not run.
- No machine-specific paths found in production source/config. Original and runtime logo assets still match all four recorded provenance hashes. No source originals were written. Mobile QA remains deferred.

## 2026-09-13 — Three.js rebuild of Coming into focus

- User rejected the Canvas sketch and requested a more polished library-based implementation. Replaced its rendering/geometry with Three.js 0.186.0, custom shaders, 32,000 particles, and 92 continuous filaments forming an open aperture. Added finite pointer parallax and a twelve-second convergence sequence. Existing playback controls remain.
- `bun run check`: 34 files, zero errors/warnings/hints. Production build passes with Vite's >500 kB chunk warning for the separately loaded Three.js scene (about 532 kB minified / 130 kB gzip). The module is imported near the viewport; the homepage canvas does not import it.
- Geometry verification: 10,000 sampled coordinates are finite, periodic filament endpoints match, and 688 static SVG fallback paths are valid. This is mathematical verification, not visual approval or runtime shader verification.
- Browser visual QA for this revision is **blocked**: the Browser tool explicitly rejected the preview under its URL security policy. No alternate browser or indirect access was used. Earlier screenshots/control checks above apply to the superseded Canvas version and do not validate this rebuild. Shader appearance, live pointer response, both themes, and WebGL context-loss behavior still need browser review.
- Dev server restarted at `http://127.0.0.1:4321`; the previous 4322 address is no longer the handoff target. Source review confirms media-query cancellation, static fallback for missing WebGL/shader failure/context loss, offscreen and hidden-page suspension, finite pointer settling, and disposal of GPU resources/listeners/observers. OS motion emulation and JS-disabled browser QA were not run.
- All four original/runtime logo asset hashes still match provenance; no source originals were written. Production source contains no machine-specific paths. Mobile QA remains deferred.

## 2026-09-13 — Interactive field revision

- Replaced the finite aperture sequence and timeline with the user's explicitly requested continuously evolving, interactive first concept. Three.js renders 46,000 surface particles and 2,400 incoming observations; OrbitControls handles drag rotation. Cursor movement locally displaces the surface, and clicking or activating Disturb field scatters particles before they regroup. The homepage remains unchanged.
- `bun run check`: 34 files, zero errors, warnings, or hints; 10 pinned registry outputs verified. `bun run build`: four pages produced. The separate scene bundle is 554,344 bytes / 136,240 bytes gzip, with Vite's >500 kB chunk warning; it loads near the Animation section.
- Live browser review covered dark and light themes. Visually confirmed the living particle surface, a cursor-induced opening, and click scattering. A drag did not increment the click/disturbance count. Enter and the equivalent button did increment it. Left/right keyboard rotation was exercised; visible focus, pause disabling Disturb field, resume restoring rendering, and scrolling away stopping rendering were checked. Fonts loaded; no horizontal overflow or app console errors were observed after the refresh.
- The initial browser tab was a connection-refused error page because its port-4322 server had stopped. After restoring that actual local address, dependency requests returned `504 Outdated Optimize Dep`. Restarting with a refreshed Vite cache restored the Three.js scene. Final preview is again `http://127.0.0.1:4322/lab#motion`; the previous finite-rebuild QA limitation above does not describe this final revision.
- Production output includes 4,200 SVG fallback circles with canvas and controls initially hidden; the homepage still has zero scripts. OS reduced-motion changes, hidden-document lifecycle, context loss, and GPU cleanup were reviewed in source; OS preference emulation, a JS-disabled browser, and forced WebGL failure were not run. Mobile design/QA remains deferred.
- No machine-specific paths were found in production source/config. No pinned upstream files or source originals were edited, and nothing was committed or published.

## 2026-09-13 — Signal Loom

- User requested a distinct successor to the globe and a short rationale. Replaced the sphere with seven open ribbon families (168 individual strands), an 18-second alignment/hold/release cycle, travelling observations, local pointer bending, limited drag tilt, and overlapping click impulses. The two-sentence explanation is beside the title in Animation.
- Desktop browser review covered dark and light themes: loose crossings, convergence toward the shared contour, and the return to separate paths. The phase caption was observed in Finding a pattern, Shared pattern, and New observations. Pointer input visibly bent the weave; a click produced a propagating deformation. Dragging did not trigger an extra signal. Enter and the Send a signal button increased the signal count; pause disabled that control and stopped rendering, resume restarted it, and navigating to the lab's top stopped offscreen rendering.
- Fonts reported loaded, no horizontal overflow was present, and browser error logs were empty. A peer source review found an immediate click-onset displacement; adding a 180 ms attack and three independently aging impulses addressed it. The cycle envelope returns to zero with zero derivative at its wrap boundary. Animation timing now advances by elapsed visible time, with only camera damping capped on slow frames.
- `bun run check` passes across 34 files with zero diagnostics and 10 pinned registry outputs verified. Production build produces four pages; the separately imported Three.js scene retains Vite's >500 kB chunk warning. The existing dependency is reused; nothing new was installed.
- No-JavaScript artwork is 168 build-time SVG paths. Reduced-motion mode displays the shared pattern statically; OS preference emulation, a separate JavaScript-disabled browser, and forced context loss were not run. Source review covered these gates and cleanup. Mobile QA remains deferred.
- No homepage, pinned foundation, or source-original edits were made; no machine-specific runtime paths were introduced. Final local preview remains on port 4322. Nothing was committed, pushed, or published.

## 2026-09-13 — Uncertainty, memory, and color meaning

- Implemented the approved conceptual refinement: lines carry perspectives, points are observations, horizontal maturity increases toward the right, and vertical separation indicates differences around a curved contour. Seeded delays and continuous bounded variation soften repetition; 14/168 strands retain substantial unresolved separation. The on-page explanation is three sentences.
- Added a bounded 16×7 interaction-memory field. Pointer movement and clicks alter targets locally; current offsets follow over roughly two seconds, with a 65-second active-time decay constant. Clear trace removes accumulated offsets without canceling a transient ripple. Green derives only from established alignment and recedes under input; disturbances use neutral geometry and brightness.
- Independent Bun assertions passed for gradual onset, 10,000 repeated additions staying finite/bounded, long-time decay, clearing, invalid inputs, and frame-rate partitioning (10 seconds vs 600 steps differed by about 1.12e-8). Shader memory indices were enumerated for all line vertices and remain within 0–111. Static artwork retains the same unresolved identities.
- Browser review covered desktop dark and light themes. Observed the imperfect held pattern and neutral pointer/click deformation. Enter created a trace; it remained after the immediate ripple and while paused. Clear trace changed present → clear and disabled itself, while leaving playback paused. Offscreen navigation stopped rendering while retaining the trace. Both themes and the revised text/controls were visually inspected. The original tab became unresponsive to capture and click commands; a fresh tab in the same supported browser restored review, and the stale task-created tab was closed.
- `bun run check`: 35 files, zero errors/warnings/hints; 10 pinned registry outputs verified. `bun run build`: four pages, with the existing >500 kB scene-chunk warning. The separately imported scene is 561,709 bytes / 138,289 bytes gzip. No new dependency was installed.
- Production HTML contains 168 SVG paths, with canvas and controls initially hidden. The homepage has zero scripts. Reduced-motion suppression, suspended memory decay, context-loss fallback, and cleanup were source-reviewed; OS emulation, a JS-disabled browser, and forced context loss were not run. Mobile QA remains deferred.
- Source portability scan found no machine-specific runtime paths. Original source material, pinned foundations, and the homepage were not edited. Final preview remains `http://127.0.0.1:4322/lab#motion`; no commit, push, or publication was made.

Final handoff note: after successful light/dark review, the browser tab/session was lost during tab cleanup, and attempts to reopen it timed out waiting for the webview to attach. Browser validation above was completed before that tool/session failure. The local preview server was separately checked and returned HTTP 200 for /lab; the link remains the handoff target, but an open browser panel is not claimed.
# 2026-09-13 — Contact in one desktop viewport

- Removed the topic selector and the three-address section. The visible email link, form recipient and no-script fallback now use the user-selected `contact@augur.net`. The action reads “Send message” with “Finish sending in your email app.” The mailbox still needs provisioning or confirmation; the existing external email-app handoff was not retried after the earlier browser policy block.
- Paired Name / Email and Company / project / Website, kept Message full width at 128 px, condensed the social links into a labeled icon row, shortened supporting copy and centered the composition below the existing 96 px header. Inputs and buttons remain 48 px tall. Content flows naturally with no clipping or hidden overflow.
- Browser-reviewed light and dark at 1280 × 720; both document dimensions equaled the viewport, with the entire form and all contact options visible. Also measured 1366 × 768 and 1440 × 900: neither horizontal nor vertical overflow. Temporary viewport overrides were reset. Empty required-field validation also fits at 1280 × 720, with Send message ending at y=690. First-invalid focus lands on Name; all three required errors are associated with their inputs. Correcting the fields clears errors, optional fields remain optional, and no topic control remains. Longer feedback or manual textarea resizing may grow the page; it remains accessible.
- Fonts loaded and application error logs were empty. Social icons remain static SVGs; unchanged shared styles retain reduced-motion handling. No OS reduced-motion emulation, JavaScript-disabled browser or mobile review was performed. Sample input was cleared after verification.
- Final `bun run check` passed across 41 files with zero diagnostics and all 10 pinned registry outputs verified. `bun run build` passed with five pages and the existing >500 kB scene-chunk warning. Runtime path scan found no machine-specific filesystem references. Original source material and pinned foundation files were not edited; no dependency, commit, push or publication was added.

# 2026-09-13 — Contact form and community refinement

- Removed contact preview copy and its generated preview panel. Added required Name validation, optional Company / project and HTTP(S) Website fields, and an inquiry selector. Continue in email composes an encoded subject and body for the selected address and retains the entered text; it does not claim delivery. The three user-requested address choices require provisioning outside this repository.
- Added a prominent Discord invitation and four decorative 28 px Phosphor Bold social logos. Downloaded the SVGs from the existing pinned revision and verified their recorded SHA-256 hashes. Pinned Augur registry output remains unchanged.
- Reviewed `/contact/` at 1280 × 720 in light and dark, including full-page captures. Fonts loaded, all four SVGs rendered, and no horizontal overflow was present. Empty and whitespace-only required values were rejected; invalid email and non-HTTP(S) website values showed associated errors. Correcting those values cleared all errors; the Partnerships selection used its matching address. First-invalid focus and visible field focus were inspected. Tab-key advancement was inconclusive in this browser session, and a later home-link check timed out; neither is claimed as passed.
- Browser security policy blocked the external email-app handoff with example data. End-to-end email-app behavior and inbox delivery were not verified. No messages were sent. Browser logs showed only the host Electron CSP warnings, with no application errors observed during the completed checks.
- `bun run check` passed for 41 files with zero errors, warnings or hints, and verified all 10 pinned registry outputs. `bun run build` passed after rerunning outside the sandbox following esbuild's EPERM process error; five pages were generated. The existing >500 kB scene-chunk warning remains.
- Built HTML contains no retired contact-preview UI, includes the guarded fieldset and no-JavaScript direct-contact fallback. Static SVGs require no client script or animation. Reduced-motion behavior reuses existing shared control rules; OS emulation and a JavaScript-disabled browser were not run. Mobile QA remains deferred. Runtime path scan found no machine-specific filesystem references; source originals were not modified. No commit, push or publication was performed.

# 2026-09-13 — Compact website header

- Reduced the shared desktop header from 112 to 96 px and the original horizontal logo from 168 to 150 px. Brand Foundation pp.11–12 were checked for minimum width and scaled clearspace. Navigation, Resources titles and Talk to us use 16 px text; the existing 44 px theme control sits before the action without a divider. Updated the homepage's viewport-height calculation.
- Browser-reviewed `/` and `/contact/` at the default desktop viewport (1280 × 720) in light and dark. Measured the 96 px header, 150 px logo and 16 px navigation; fonts loaded, no horizontal overflow or browser errors were observed. Talk to us navigates to `/contact/`, marks the current page and retains the chosen theme. Inspected the open Resources panel and confirmed Escape closes it and focuses its summary. Focus outlines were visible on the summary, theme button and contact action.
- Theme switching was verified by clicking. Automated key presses focused native controls but did not establish native Space/Enter activation or Tab order, so those results are not claimed. The controls retain native button/link markup. Reduced-motion CSS and hidden-without-JavaScript theme markup were checked in source/build output; OS motion emulation and a JavaScript-disabled browser were not run. No new animation was introduced. Mobile remains deferred.
- `bun run check`: 41 files, zero errors/warnings/hints; all 10 pinned registry outputs verified. `bun run build`: five pages produced, retaining the existing >500 kB animation-chunk warning. The successful build ran outside the sandbox after esbuild hit an EPERM subprocess restriction.
- All four runtime/source logo hashes match recorded provenance. No machine-specific paths were found in production source/config; pinned foundations and source originals were not edited. No dependency, commit, push or publication was added. Preview: `http://127.0.0.1:4323/`.


## Community navigation — September 13, 2026

- `bun run check`: 42 files, zero errors, warnings or hints; all 10 pinned registry files verified. `bun run build` passed, with the existing large-chunk warning.
- Reviewed `/` and `/contact/` at 1280×720 in light and dark themes. Community shows Discord, Telegram, X and GitHub with service icons and trailing external arrows. Resources shows Learn, REP, Research, History, Blog and FAQ; opening Resources closes Community.
- Confirmed visible focus styling and Escape dismissal returning focus to Community. All four native external anchors have `tabIndex` 0; icons are decorative. Full Tab traversal was not established by the browser automation. Homepage fonts reported loaded and no horizontal overflow. Browser logs contained only host Electron CSP warnings, with no application errors observed.
- Verified all four community URLs in the generated header HTML on both routes and the Community brief in the lab page and Markdown export. Destinations reuse the already sourced Contact URLs; external navigation was not triggered. Native named details and static icons remain in server-rendered HTML; the existing reduced-motion rule is unchanged. No browser emulation of disabled JavaScript or reduced motion was performed for this change.
- No machine-specific absolute paths found in production source/config. Only workspace files were edited; source originals and pinned foundations were not changed. Mobile QA remains deferred.


## Resources and Products copy — September 13, 2026

`bun run check` passed across 42 files with zero diagnostics; pinned registry verification passed. `bun run build` passed with the existing large-chunk warning. Generated homepage and Contact headers contain Blog / FAQ / Learn / REP in order, no Research or History menu item, and all three product descriptions. Reviewed homepage product descriptions in both desktop themes and Contact’s Products in light and Resources in dark at 1280×720; no clipped copy observed. Escape dismissed Resources and returned focus to its summary. Browser fonts reported loaded, with no horizontal overflow or application errors recorded. Existing menu interaction/reduced-motion CSS remains unchanged; no new motion was introduced. Mobile QA remains deferred. Source originals and pinned foundations were not edited.

## Simple navbar transitions — September 13, 2026

`bun run check` passed across 42 files with zero diagnostics and verified all 10 pinned registry outputs. `bun run build` passed after retrying outside the sandbox for esbuild's EPERM subprocess restriction; the existing large-chunk warning remains. Built CSS retains the scoped native-details entry/exit transitions, feature fallback and reduced-motion overrides. Source/config scan found no machine-specific filesystem references. Only the local header and decision/verification notes were edited; source originals and pinned foundations were untouched.

The existing dev server was available on port 4323. The browser loaded the homepage at 1280×720 and exposed the native controls, but interaction and screenshot requests stalled; reconnecting eventually failed to attach a new browser view. Consequently visual timing, light/dark appearance, full keyboard behavior, font loading, console errors, disabled-JavaScript behavior and live reduced-motion switching were not verified for this change. Mobile QA remains deferred.

## Common Aperture deletion — September 13, 2026

- Deleted the rejected Common Aperture component, lab study, geometry, scene and controller. Removed its homepage mount, styling and arrival hook; lab slot 02 is a placeholder again. Updated the current flow notes and homepage entry.
- `bun run check`: 0 errors, 0 warnings, 0 hints. `bun run build`: passed; the existing large-chunk warning remains for the retained lab renderer.
- Browser DOM review confirmed the homepage header, headline, support and actions remain, with no artwork or pause control. Screenshot capture timed out, so a fresh visual review in both themes was not completed.
- No Common Aperture runtime references or machine-specific absolute paths remain in `src`. No source originals were modified.

## Header reload stability — September 14, 2026

- Shared Brand embeds the existing color/reversed SVG files unchanged at build time. Both homepage and lab marks are present in the initial HTML, with explicit responsive SVG sizing, removing their separate image-fetch delay. Original geometry, fills, dimensions and theme selectors are preserved.
- ThemeToggle now initialises synchronously inside its own markup. The moon/sun display uses the root theme and system preference directly, matching Brand; it no longer waits for a deferred module or a later `data-dark` attribute. A disabled, invisible control reserves its footprint without JavaScript. The existing head script still restores a saved preference before body parsing.
- `bun run check` passed across 42 files with zero diagnostics and verified all 10 pinned outputs. `bun run build` passed with the existing large-chunk warning. A temporary isolated-script check passed 10 combinations of system preference, saved light/dark/invalid preferences, and blocked storage, including system changes, click persistence and pageshow labels. Built homepage, lab and Contact HTML contains synchronous initialization and byte-identical original SVG markup.
- Desktop in-app review covered reloads in light/dark on `/` and `/lab`. Correct logo variant, icon and accessible action label persisted after reload; the control stayed enabled. Homepage logo measured 150 × 50.40625px, lab glyph 45 × 50.40625px, and the homepage theme control remained at the same horizontal position in both themes. Fonts loaded and no lab overflow or browser errors were observed. This is source/startup and reload verification, not a captured frame-by-frame paint trace. No animation was added; mobile review remains deferred.
- Restarted the local dev server to clear stale component styles. Source originals and pinned foundations were not edited; no machine-specific production imports, dependencies or publication were added.

## Navbar dropdown glow removal — September 14, 2026

Removed the shared dropdown box-shadow from HomepageHeader. Products, Resources and Community now use the existing solid surface and thin border without an outer halo, including on Contact. Desktop homepage review in light/dark confirmed all three computed shadows are `none` and visually reviewed the open Products menu. Check passed with zero diagnostics; build passed with the existing large-chunk warning. No interaction, motion, source asset or pinned foundation changes.
## Homepage Signal Loom restoration — September 14, 2026

- Restored the existing shared artwork on `/` and added the finite underline reveal beneath “decentralized.” The Home lab brief and generated Markdown export reflect the change. No renderer, dependency, logo or pinned foundation changes.
- `bun run check` passed across 42 files with zero diagnostics and all 10 registry outputs verified. `bun run build` passed after retrying outside the sandbox for esbuild's EPERM subprocess restriction. Five pages were built; the existing >500 kB scene-chunk warning remains.
- Reviewed the homepage at 1280 × 720 in light and dark. Captured the light-theme underline at full width during arrival and verified it returns to opacity zero after settling. Fresh navigation and reload both start the entrance. The restored Three.js canvas reports live rendering; Escape stops it and ArrowRight resumes it. Artwork keyboard focus has a visible outline. Early focus on a hero action settles the entrance and hides the underline immediately. Contact/home navigation works. Full Tab traversal was not established.
- Fonts loaded, no horizontal overflow was present, and final browser error logs were empty. Restarted the existing preview on port 4321 to clear stale component styles; final preview is in the original dark theme.
- Build output includes the static SVG fallback and updated flow export. Reduced-motion CSS, preference cancellation, no-JavaScript markup and lifecycle cleanup were source-reviewed; OS motion emulation and a JavaScript-disabled browser were not run. Mobile QA remains deferred.
- Production source/config scan found no machine-specific filesystem references. All edits stayed in this workspace; source originals were untouched. Nothing was committed, pushed or published.
# Why + how first iteration — September 14, 2026

Added `/#protocol` with a four-step resolution illustration, REP explanation, bond-escalation animation and native detail disclosures. Check passes across 44 files with no diagnostics; build passes with the existing large hero chunk warning. Isolated motion tests cover manual selections, finite replay, interruption, reduced-motion changes, offscreen/hidden-document stopping and teardown. Initial development DOM inspection confirmed accessible control names, loaded fonts and no horizontal overflow at 1280×720.

**Post-change desktop visual and browser interaction QA remains incomplete.** Screenshot/click calls timed out; a subsequent preview connection error left the in-app browser on an error URL blocked by Browser security policy. No dark-theme, keyboard-focus, native reduced-motion or JavaScript-disabled browser pass is claimed. See [full verification and provenance](why-how.md). Mobile remains deferred. Sources and pinned foundations are unchanged; no publication or commit.

## Why + how simplification — September 18, 2026

Check and build passed after the rewrite; all 10 pinned outputs verified, 44 files produced zero diagnostics, and the existing large-chunk warning remains. Desktop light/dark review covered ordinary and challenged resolution, direct/manual controls, stable card geometry, keyboard focus and native disclosures. No overflow or application errors were recorded. A temporary static server blocking every page script confirmed the reading path and native details remain usable without enhancement. Reduced-motion behavior was source-reviewed, not browser-emulated; mobile remains deferred. Source PDF hashes are unchanged and the production portability scan is clear. See [the current iteration’s detailed verification](why-how.md#verification--september-18).

## Application sections — September 21, 2026

- Redesigned `/#applications` and `/lab/homepage-redesign/#applications` using the
  shared website-only `ApplicationExamples.astro`. The three sourced examples
  now pair compact native selectors with a question/action and connected answer/output illustration.
- `bun run check`: 0 errors, 0 warnings (50 hints in existing generated/lab output).
  `bun run build`: passed after retrying outside the sandbox's esbuild process
  restriction; the existing large-chunk advisory remains. Pinned registry check passed.
- In-app browser visual review at 1440 × 1000, plus the lab component at
  1100 × 900. Reviewed market, insurance and grant selections, main homepage
  light/dark and lab light. A temporary script-free built-page preview also
  exercised lab dark without changing its intentionally fixed-light route.
- Arrow keys changed selection with a visible focus outline; only the selected
  panel appeared in the accessibility tree. All three panels measured 434 px
  high and their illustrations 360 px at the wide desktop size. Font loading
  completed, no horizontal overflow was observed, and inspected console errors were empty.
- In the temporary preview, HTML scripts were removed and `script-src 'none'`
  enforced. Native click and keyboard selection still worked. Illustrations have
  no animation or transition in either motion preference; OS reduced-motion
  emulation and mobile QA were not performed.
- No machine-specific runtime imports found. No pinned foundation files or
  source originals were edited; the Brand Foundation PDF retained SHA-256
  `5b6eeacad3d8b81a276c57602573a02d30877c40969453e945ba83b79eecf016`.

### Plain-copy follow-up — September 21, 2026

- `bun run check`: passed, 0 errors and 0 warnings; 50 existing hints.
  `bun run build`: passed after the known sandbox process-permission retry;
  existing chunk-size advisory remains. `git diff --check` passed.
- Reviewed the revised website market, insurance and grant copy in the browser;
  removed repeated output captions and reduced illustration minimum height to
  310 px. Earlier 360 px / 434 px measurements describe the preceding iteration.
- Updated and visually inspected Figma sections `13:44` and `13:167` in file
  `AjR6tba4Nuj0FFwaSYTOrE`. Read-back confirmed Sora and Schibsted Grotesk.
  Fixed the new Direction B intro's inherited light fill, then inspected again.
  Annotation frame heights match their sections (807 px and 690 px), and the
  downstream leader lines track the revised section positions.
