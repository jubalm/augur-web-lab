# Build report — 5 October 2026

The canonical Augur website is implemented as a fixed-Navy static Astro site with 25 new content routes, an on-brand 404, responsive navigation, typed content, accessible interactions and finite SVG motion. The build remains a review version: indexing is off, nothing has been published, and full acceptance is blocked by editorial/ownership decisions, browser-cache coverage and the strict 50 ms long-task requirement. The owner-authorized legacy cleanup and its fresh-install checks are complete. Lighthouse score, LCP, CLS and compressed-asset budgets pass.

## Routes and cleanup

| Area | Built routes |
| --- | --- |
| Main | `/`, `/about/`, `/products/`, `/learn/`, `/rep/`, `/blog/`, `/faq/`, `/contact/` |
| Start here | `/learn/what-is-an-oracle/`, `/learn/how-augur-answers-a-question/`, `/learn/disputes-bonds-and-forks/`, `/learn/what-rep-does/` |
| More guides | `/learn/writing-questions/`, `/learn/when-a-question-cannot-be-answered/`, `/learn/how-the-products-fit-together/`, `/learn/reading-the-whitepaper/` |
| Articles | `/blog/why-disagreement-makes-an-oracle-stronger/`, `/blog/writing-questions-an-oracle-can-answer/`, `/blog/what-happens-when-a-fork-begins/`, `/blog/building-in-public-following-the-work/`, `/blog/quarterly-report-what-changed/`, `/blog/notes-from-the-community-call/` |
| Categories | `/blog/category/for-builders/`, `/blog/category/project-updates/`, `/blog/category/research-and-design/` |
| Utility | `/404.html`, `/robots.txt`, `/sitemap.xml` |

Static pagination is implemented; the six current stand-in posts fit on the first page, so no empty second page is generated. Guides and posts remain honestly flagged as provisional.

**Deleted files: 170 tracked files; cleanup is complete.** The owner directly authorized repository deletions on 5 October 2026 and prohibited changes to Figma. Every path in `docs/evidence/cleanup-completed.json` was removed: old lab routes/deployment files, experiment/redesign/old-site components, old layouts/libraries/motion/styles, six old images, 76 unused icons and obsolete lab documentation. Empty target directories were pruned. Both the worktree and an isolated fresh installation build exactly 26 HTML pages: 25 content routes and 404. The old lab routes and Markdown endpoint are gone.

`docs/icon-provenance.json` now inventories the 10 retained Phosphor Bold icons, with every retained hash verified unchanged. Brand and current blog-art registries also verify unchanged. The protected `docs/source-material.md` retains its historical paragraph about the former NASA/archive preview inventory; current shipped assets are documented in `asset-provenance.json`, `blog-art-provenance.json` and `icon-provenance.json`. Its original source history has not been rewritten.

The manifest name is now `augur-website`. `three` and `@types/three` were removed from manifest and lock, as were the lab build/preview scripts. The owner explicitly approved the lock update. Playwright 1.63.0, axe Playwright 4.13.0 and Lighthouse 13.5.0 are exact dev-only pins. React remains for pinned upstream server-rendered components; the new site emits no hydrated framework runtime. Pinned upstream files, official brand assets, licenses and `docs/source-material.md` are unchanged.

The stale Three.js import was removed with the old scene. An isolated source copy started without `node_modules` or `dist`; `bun install --frozen-lockfile` installed 417 packages, then Astro checked 95 files with zero errors, warnings or hints and built 26 pages without warnings. The copied and source lock hashes remain unchanged; neither `three` nor `@types/three` is installed. All 57 emitted build files are byte-for-byte identical between the isolated fresh copy and worktree. The complete link check resolves 1,949 anchor destinations across 26 pages. This supersedes the earlier existing-tree-only installation evidence; see `artifacts/qa/clean-install.json`, `install-cleanup.log`, `check-clean-install.log`, `build-clean-install.log` and `links-cleanup.txt`.

## Architecture and editing map

```text
src/
  components/{layout,primitives,home,art,content,pages}/  # new website
  components/ui/                                       # pinned outputs
  layouts/{BaseLayout,PageLayout,ArticleLayout}.astro
  data/                   # copy, links, navigation, facts, SVG geometry
  content/{blog,learn}/    # typed Markdown and honest review flags
  content.config.ts
  motion/                 # finite scenes and small vanilla controllers
  pages/                  # static routes, pagination, robots, sitemap
  styles/{tokens,base,layout,motion}.css
  styles/augur*.css        # pinned foundation
vendor/augur/              # immutable upstream snapshot
scripts/                  # integrity, copy, links, budgets, launch, Lighthouse
tests/site.spec.mjs       # browser and axe checks
docs/                    # sources, decisions, original notes and release gates
artifacts/qa/            # actual screenshots, frame captures and reports
```

The completed cleanup removes the former experiment, redesign and lab trees; this is the active project structure.

`BaseLayout` owns document metadata, CSP registration and shared shell; `ArticleLayout` owns readable content, table of contents and copy-link behaviour. Shared tabs provide roving focus and manual activation; native details and dialog retain useful no-JavaScript behaviour. `play-once.ts`, `timelines.ts`, the hero controller and small scene controllers own motion. No backend, wallet integration, tracking or external runtime dependency was introduced.

Edit repeated prose/facts in `src/data`, with the independent approved homepage TEXT-node extraction in `homepage-copy-source.json` and typed `homepage-copy.ts` export. Edit posts/guides in `src/content`; their schema enforces source metadata and review flags. All external destinations live in `links.ts` as `{url, verified, source}`. FAQ, roadmap, products, glossary, applications and walkthrough state are centralized. Local composition maps semantic roles onto pinned foundation values; upstream generated files were not hand-edited. See `docs/content.md`, `DESIGN.md`, `docs/design-system.md` and `docs/motion.md`.

## Decisions, improvements and source deviations

- The current owner brief replaces historical route restrictions, mobile deferral and theme behaviour. Canonical homepage `28:7` wins over older state-frame copy. Approved homepage wording, optional REP participation, “Augur Stratoblast” and “Trustless” are preserved; unresolved spelling/terminology stays in the release checklist.
- Figma was read through MCP without writes. Exact geometry includes 121 hero art squares and per-square offsets, 137 hero heritage marks and 106 footer marks. All 28 canvas note cards and their node IDs are preserved in `docs/figma-notes.json`. No comment-thread reader was exposed, so comment threads were not reviewed.
- The owner type table specifies headline tracking −2%, while the canonical frame has 0%. The implementation uses the owner’s 72/78, −2% rule and is approximately 18 px narrower. This is deliberate precedence, not an exact-pixel claim.
- At desktop the header/hero fill the first viewport; tablet navigation collapses at 1023 px because the full controls overflowed at 768 px. For 1280×720 and other short desktop viewports, hero block padding reduces to 40 px to preserve the first-viewport fit; canonical 1440×900 geometry is unchanged. Below desktop, rows stack and margins/type adapt while content order remains. Figma supplies no complete responsive frames, so these layouts are designed adaptations.
- The source About frame shows two contributor tiles, but its note requires ChainSafe too; the implementation includes the sourced third tile. The contact page omits the repeated full contact/footer band to fit the specific 1440×900 contact frame.
- Native FAQ rows and utility targets were enlarged where needed for 44 px access. Bond controls are 44 px rather than the source’s 40 px, and selected labels are underlined so colour is not the only cue. The criteria disclosure has a 44 px target; Figma supplies no expanded content, so it repeats the approved question and cutoff rather than inventing requirements.
- Navy role colours replace older hard-coded variant surface/border colours. The roadmap mission action uses `/about/`, since the old `/mission/` page is outside this build. REP square-math motion is authored from the brief because the Figma note marks it “to do”.
- Canonical Cross anywhere has twelve inner participants despite the brief saying eleven; twelve were preserved. Peer-mesh CSS drop-shadows approximate Figma’s 2 px spread. Future bond fills disappear as the brief requires; source ghost outlines are omitted.
- FAQ staggering is paragraph then link, 50 ms apart, rather than manually splitting responsive wrapped lines. Canonical FAQ 3 has only “Follow the build”, so the extra “Talk to us” in an older state frame is omitted. Development replay reliably restarts visible entrance scenes and stops on interaction. Slow mode multiplies entrance, tab/picker/walkthrough/bond/roadmap and FAQ timings by five; production ignores the flags.
- Only twelve hero heritage marks twinkle, limiting ambient work. Only those twelve marks receive motion style attributes. A trial grouping the glow overlay into two compound paths was rejected: fractional-coordinate antialiasing changed 113 lit pixels and the follow-up did not establish a task improvement. The original rectangle glow is retained. Reduced motion, no JavaScript and print expose settled content. Hero arrival settles on hidden-page events; other scenes pause off-screen/hidden. Print and reduced-motion changes during a tab transition synchronously expose the selected panel. The table-of-contents observer survives back/forward-cache restoration.
- Crimson on Navy measures 3.70:1, insufficient for normal AA text. Error prose uses Paper/Pewter with Crimson marks/borders. Stronger required-control boundaries replace decorative low-contrast hairlines where necessary; exact ratios are in `DESIGN.md`.
- Astro’s native CSP hashes inline scripts/styles. The raw hero script’s exact transformed hash is registered in the layout before the head is rendered. Same-origin defaults, blocked objects and self base URL apply; inline style attributes remain allowed for authored geometry. No unsafe-inline script exception was added. Markdown syntax highlighting is disabled because current articles have no code blocks and the unused transform produced a CSP warning. Vercel adds frame-ancestor/MIME/referrer/permissions headers.
- Application layout uses FLIP transforms instead of per-frame grid-column interpolation. Cards and connectors move from their prior visual boxes to the new static grid; labels counter-scale, and outgoing panel text retains its width during the 160 ms fade. Unsupported animation APIs and reduced motion use the instant layout fallback.
- A final component audit corrected website button hover/pressed specificity, restored loading-only rotation with a reduced-motion fallback, and added the visible “Loading…” status while retaining the pinned hidden-label/constant-width contract. The local styles also normalize readonly/disabled textareas; upstream files remain unchanged.
- The copy checker now covers all 165 visible text passages in eleven canonical sections, checks repetition counts and rejects extra prose. Four mutation tests exercise unchanged copy, a changed claim, an added claim and a deleted control label. The only approved copy adaptation is the newsletter fallback.
- Blog archives, category routes and sitemap share categories and page size; pagination URLs derive from post counts rather than a fixed list.
- Route CSS is inlined once per document to remove two render-blocking requests. This lowered measured homepage mobile LCP from 2063 to 1772 ms and raised Performance from 90 to 99. Source geometry and interaction behaviour were retained.
- Email opens an encoded draft and never reports delivery. Newsletter uses Blog/X/Discord follow links because no provider or consent policy exists. Contract addresses remain unpublished. Default robots are `noindex, nofollow`, robots.txt disallows crawling and the sitemap is empty.
- “By the Augur team” is provisional. The source article retains five-minute metadata and Guide 2 six minutes; other draft articles use provisional one-to-two-minute estimates. More guides share the reading template without Start-here progress. All require editorial review.
- The Zoltar research link honestly targets the reachable current system overview, not a nonexistent historical PDF. Roadmap source review distinguishes migrated REPv2 from total winning-token supply; approved copy remains pending attribution review. All required public destinations returned HTTP 200, but the inbox needs domain-owner confirmation.

No blanket ±4 px match is claimed. Reviewed homepage sections are close to canonical geometry (heights 919, 802, 1299 vs source 1298, 748, 927, 997 and 862 px), with the stated accessible-target, source-precedence and responsive differences. Exact comparison assets are retained below.

## Verification evidence

Commands used against local production preview `http://127.0.0.1:4322`, with system Chromium selected through `AUGUR_CHROME_PATH=/usr/bin/chromium`:

```sh
bun install --frozen-lockfile
bun run check
bun run build
bun run check:copy
bun test tests/copy-check.test.ts
bun run check:links
bun run check:budgets
AUGUR_TEST_URL=http://127.0.0.1:4322 bun run test:e2e
PUBLIC_SITE_INDEXABLE=true bun run build
AUGUR_TEST_URL=http://127.0.0.1:4322 bun scripts/audit-lighthouse.ts /
AUGUR_TEST_URL=http://127.0.0.1:4322 bun scripts/audit-lighthouse.ts /learn/
AUGUR_TEST_URL=http://127.0.0.1:4322 bun scripts/audit-lighthouse.ts /blog/why-disagreement-makes-an-oracle-stronger/
bun run build
bun run check:launch
```

The indexing-enabled audit build was local only. The cleanup worktree build completed at 17:37:39 local time, with noindex, disallow-all robots and an empty sitemap; the isolated fresh build completed at 17:38:09. Both produced 26 pages without warnings. The six Lighthouse reports below were captured after the FLIP/control fixes and before the removal of unused files, Icon API entries and reveal styles. Cleanup changed no visually used styles or client JavaScript. The homepage JavaScript total remains 8,865 B gzip; removal of unused CSS reduced the final total to 12,526 B. Lighthouse was not rerun for that non-behavioural cleanup. The locally indexable audit sitemap contained all 25 content routes.

| Check | Actual result | Evidence |
| --- | --- | --- |
| Pinned integration | 10 files verified at fb35470; protected source checks unchanged except approved lock | `bun run design-system:check`; root checksum audit |
| Fresh frozen installation | 417 packages installed in a copy that had no node_modules/dist; locks unchanged, no Three.js packages, all 57 build outputs byte-identical to worktree | `artifacts/qa/clean-install.json`, `install-cleanup.log` |
| Astro diagnostics | 95 files; 0 errors, 0 warnings, 0 hints in both the worktree and fresh installation | `artifacts/qa/check-cleanup.log`, `check-clean-install.log` |
| Static build | 26 HTML pages; zero build warnings in worktree and fresh installation | `artifacts/qa/build-cleanup.log`, `build-clean-install.log` |
| Copy | 165/165 visible passages across 11 canonical sections; no extra copy; all 4 mutation tests pass | `artifacts/qa/copy-cleanup.txt`, `copy-regression-cleanup.txt` |
| Links | Pass: 26 pages and 1,949 anchor destinations; external URLs are registered | `artifacts/qa/links-cleanup.txt` |
| External destinations | 19 public HTTP 200 results; contact mailto unverified | `docs/link-verification.json` |
| Gzip budgets | Homepage JS 8,865 B / CSS 12,526 B; maximum CSS 12,526 B; three Latin woff2 files | `artifacts/qa/budgets-cleanup.json` |
| Routes/axe | All 25 content routes and 404 exercised; zero axe violations, including invalid contact state | `artifacts/qa/results-cleanup.json` |
| Final full browser suite | 42/42 passed after cleanup in 1.9 minutes, without route exclusions; zero failures, skips or flaky tests | `artifacts/qa/results-cleanup.json`, `tests-cleanup.log` |
| Interaction/responsive | Six widths (1440/1280/1024/768/390/360), all tab selections, keyboard activation, disclosure/dialog Escape, no JS, reduced motion, forced-colors skip link, contact validation and article copy link passed across full and focused runs | `tests/site.spec.mjs`, `artifacts/qa/screenshots/`, motion reports |
| Controls/debug | 24 button states and 14 field states captured; exact contact hover/pressed colours, visible loading status, stationary button geometry, reduced-motion spinner, visible replay, ×5 interactive timing and production flag exclusion passed; zero errors | `artifacts/qa/controls-debug/`, `scripts/inspect-controls-debug.mjs` |
| Picker FLIP | Exact initial visual bounds, transform/opacity-only effects, readable counter-scaled labels, rapid selection, both directions at six widths during the outgoing fade, reduced/print/pagehide settlement and missing-WAAPI fallback passed; zero errors | `artifacts/qa/application-flip/`, `scripts/inspect-application-flip.mjs` |
| Home motion | 17 states each expose one panel; no-JS/reduced have zero running animations; print and mid-transition reduced motion settle correctly; synthetic hidden-page pause/resume passed | `artifacts/qa/motion/home/{report,selection-report,final-report}.json` |
| Hero motion | Nine captured timestamps through 2300 ms; reduced motion zero running animations; settled twinkle sample 4.045 ms work / 5 seconds, zero script/style/layout work | `artifacts/qa/motion/hero-results.json` and `hero-*.png` |
| Final shared lifecycle | Hero bottoms exactly 900/720/1080 px at the three required desktop viewports; zero console errors; print has zero running animations and all headline text visible; normal article Back restores working TOC. Synthetic persisted events keep hero settled | `artifacts/qa/shared/final-lifecycle.json` and final width PNGs |
| Final secondary capture | Nine routes return 200, zero console/page errors, no horizontal overflow at all six widths; desktop contact height exactly 900 px | `artifacts/qa/site-pages/geometry.json`, `final-capture.log`, desktop/mobile PNGs; `scripts/capture-pages.mjs` |
| Launch guard | Intentional failure: 79 reported items across content flags and unchecked editorial/ownership/performance/coverage gates | `artifacts/qa/launch-final.txt` |

Earlier runs exposed and led to fixes for tablet header overflow, FAQ test scoping and raw-script CSP registration. The final post-cleanup suite passed all 42 tests in one run without route exclusions. These results apply to the frozen cleanup source and the 26-page build verified byte-for-byte against the isolated fresh installation.

### Lighthouse

Latest measured set, recorded before cleanup: local indexing-enabled audits, Lighthouse 13.5.0, desktop 1440×900 and simulated mobile. Accessibility / Best Practices / SEO are **100 on all six**.

| Route | Device | Performance | LCP | CLS | Tasks >50 ms |
| --- | --- | ---: | ---: | ---: | --- |
| `/` | Desktop | 100 | 451 ms | 0.008240 | 74 ms |
| `/` | Mobile | 99 | 1859 ms | 0.000946 | 209, 76 ms |
| `/learn/` | Desktop | 100 | 327 ms | 0.000402 | None |
| `/learn/` | Mobile | 100 | 1202 ms | 0.000946 | 94 ms |
| Article | Desktop | 100 | 351 ms | 0.000402 | None |
| Article | Mobile | 100 | 1505 ms | 0.000946 | 102 ms |

All score thresholds, desktop/mobile LCP thresholds and CLS ≤0.02 pass. **The no-task-over-50-ms requirement fails.** The earlier detailed homepage trace attributed 1,369 ms to style/layout versus 73 ms to script evaluation on simulated mobile; follow-up traces also place the longest task in initial style/layout. They do not identify a single proven source function that can safely remove all remaining tasks. Do not mistake low total blocking time or low settled twinkle cost for absence of startup long tasks.

Before CSS inlining, homepage Performance was desktop 100 / mobile 90, with LCP 499 / 2063 ms and largest tasks 80 / 435 ms. A short browser-test overlap affected the first desktop baseline; that uncertainty is retained rather than silently discarded. Four original baseline reports remain in `artifacts/qa/lighthouse/`; the earlier six-run set remains in `artifacts/qa/lighthouse-final/`. The latest measured pre-cleanup six-run set is in `artifacts/qa/lighthouse-release-review/`, with its combined summary in `artifacts/qa/lighthouse-summary.json`. Each set is retained; the table uses the latest complete measured run, not the best score from different runs. These six audits were not rerun after cleanup.

### Bounded startup investigation

The follow-up Learn trace identifies initial style/layout inside the longest task. Removing unused per-square motion variables reduced its actual wall duration from 64.381 to 53.213 ms (thread CPU 26.189 to 20.361 ms); the corresponding simulated task fell from 129 to 106 ms. Both runs scored Performance 100, with LCP 1207 / 1204 ms and byte-identical full-page screenshots. This safe optimization is retained, but still misses 50 ms.

A second trial consolidated the glow overlay into two compound paths. The actively lit raster differed at 113 antialiased pixels, and the paired mobile run changed Performance 99→100, LCP 1603→1698 ms and long tasks 160→212/90 ms. Those results do not establish a task improvement, so the trial was reverted to the source rectangle geometry. The wall/CPU gap suggests scheduling or blocking contributes to the remaining task duration; it does not prove a single removable code defect. All source reports and failed-trial evidence remain in `artifacts/qa/startup-performance/`, with methodology in its README. The no-task-over-50-ms gate remains unresolved; no best-score substitution was made.

### Visual and frame evidence

- `docs/evidence/figma/`: canonical source screenshots, full-resolution secondary frames and `site-pages.json` geometry.
- `artifacts/qa/screenshots/`: new-route desktop screenshots, homepage responsive widths, no-JavaScript and forced-colors views.
- `artifacts/qa/homepage/`: Figma and rendered sections, all 17 application/bond/walkthrough/roadmap states and FAQ states. `final-geometry.json` verifies final picker height 544 px, bond 395 px (source 394), roadmap 550 px (source 549) and query-card heights 423/465/507/549 px; all six viewport widths have no horizontal overflow and no page errors. `README.md` records the exact scope.
- `artifacts/qa/site-pages/`: nine secondary routes at desktop/mobile plus `geometry.json`.
- `artifacts/qa/motion/`: nine hero keyframes; `home/` contains entrance and state-selection captures and machine-readable results.

These are actual captures, not an automated pixel-diff certification. Secondary-source refinements and final alternate-state refinements are identified in their final focused capture reports. Browser QA is Chromium-based; Safari/Firefox and real mobile hardware were not exercised. OS backgrounding was not measured for diagrams; the visibility event was simulated.

Actual back/forward-cache restoration could not be exercised: Chrome's CDP diagnostics returned `BackForwardCacheDisabledForDelegate` and `BrowsingInstanceNotSwapped`. Normal Back therefore reloaded the homepage, which correctly ran its ordinary arrival. Synthetic `pagehide/pageshow` events with `persisted: true` kept the hero settled, and normal article Back retained working TOC behaviour. This is a runtime coverage limitation, not evidence of a cache-restoration replay defect; real cached restoration remains a verification gate.

## Open before launch

The full checklist is `docs/launch-checklist.md`; all original author notes are retained verbatim in `docs/figma-notes.json`. The remaining work is concrete; implementation verification is complete up to these documented blockers:

1. Resolve or explicitly revise the 50 ms long-task requirement. All other measured performance budgets pass.
2. Replace six stand-in blog posts and their art, write/review eight guides, review FAQ drafts, and migrate the 16 original archive posts with original dates. Preserve old public source-report URLs on the replacement site.
3. Confirm product spelling/status, “Trustless” terminology, proposed chain/L2 support, REP payout/status language, contract/explorer addresses, roadmap figures and migration-vs-supply attribution.
4. Confirm announcement retirement, final hero treatment, team byline/reading-time policy and Zoltar paper destination.
5. Confirm **contact@augur.net**, the only unverified link, with the domain owner; configure newsletter provider/consent/privacy before collecting emails.
6. Verify real back/forward-cache restoration in an environment that allows it. Review the evidence and enable indexing only after all release gates pass. Reverify canonical URLs, robots and sitemap in the intended hosting environment.

Figma geometry was available and read directly; unsupported responsive states and the limited motion approximations are disclosed above. No comment threads were available. No push, deployment, form delivery or newsletter subscription has been performed.

## Next visual-polish pass

The owner requested a Git checkpoint and a Claude handoff after cleanup. See `docs/claude-polish-prompt.md` for the new brief, including explicit authorization for Claude to edit Figma, continuous visible animations and restoration of the newsletter field as a visual prototype. Those changes have not been implemented in this baseline. This report and its evidence describe the rebuild before that new pass; older read-only Figma, play-once and newsletter-fallback decisions are superseded for the requested follow-up scope.

## Polish pass — 5 October 2026 (Claude)

Owner brief: `docs/claude-polish-prompt.md`. It authorizes Figma edits, continuous tenet loops and the restored newsletter field; these supersede the earlier read-only Figma, play-once and follow-links rules for this scope. History above is unchanged.

- **Tenets:** `src/motion/loop-scene.ts` loops the three diagrams seamlessly (6 / 12 / 6 s cycles, start at 40% visible, pause off-screen or hidden, static under reduced motion/print/no JS). Figma `250:717` now carries the same tracks on a 12 s timeline (verified by video export). No-authority signals and pending result use Mist, matching Figma (the old Green signals contradicted the owner's “Green only at the far end” brief).
- **Answer band:** already live text on site and in Figma; it now sweeps in once (`initAnswerRibbon`) with the text readable throughout. Figma `250:724` has live Paper/Navy text layers and keyframes.
- **Hero:** ring-by-ring 8 s “draw in” wave, dashed-centre step, ±6 px field drift, ring highlight on fine-pointer hover (`hero-ambient.ts`). Figma frames “Hero / Motion · ambient loop” and “Hero / State · ring hover”.
- **Picker:** icon tiles (Phosphor Bold chart-line-up, shield-check, users-three), one-line explanation for every state (new: “Settle positions on the final answer.”), result icons, hover/focus states; Figma `139:258` variants and “Applications / Card states”.
- **Query card:** status pill, clock on cutoff, structured criteria (Invalid wording from the FAQ), checked outcome, “Activity” label, in-place step swap (`data-panel-swap`); container reserves 575 px. Figma `146:470` variants + “Resolution / Criteria expanded”.
- **REP:** square arithmetic replaced by labelled stake flows (`StakeFlow.astro`); “Proposed rules for Augur Lituus, which is in development.” removed with no replacement; “Learn about REP” is an Outline button under the lead. Figma `304:645` rebuilt; Section details 07 added with keyframes.
- **Navigation:** hover intent 90 ms, instant switching, 24 px hover bridge, 260 ms close, click-to-pin, focus-out close, current-section rule, community logos. Figma “Navigation / Hover and switching”.
- **Also:** FAQ / Row Hover, Focus and Open hover variants; blog column hairlines; Button states aligned (Figma inner-shadow edges removed, outline hover Dark 2 / pressed Dark 3, text pressed Pewter); action icons use Phosphor `arrow-up-right`; newsletter field restored with local validation, `method="dialog"`, honest status, new Section details 11. Seven icons added with provenance (`docs/icon-provenance.json`). `homepage-copy-source.json` re-extracted from the updated `28:7` (176 passages).

**Checks run (this pass):** `bun run check` (10 pinned files verified; 97 files, 0 errors/warnings), `bun run build` (26 pages, 0 warnings), `check:copy` (176/176), `bun test tests/copy-check.test.ts` (5/5), `check:links` (26 pages, 1,874 destinations), `check:budgets` (home JS 12,080 B / CSS 14,667 B gzip, pass), full Playwright suite 48/48 (6 new tests), `check:launch` (intentional failure, 79 items, unchanged). Figma vs site at 1440: identical page height 8,189 px; every section within 1 px (`artifacts/qa/polish/`).

**Motion cost:** the first hero ambient build used continuous CSS animations and cost about 313 ms of main-thread work per 5 s (style recalculation on every frame of the wave's long rest). The wave now exists only for its active 2.4 s per cycle: 117 ms per 5 s while the hero is visible, tenet loops 12–13 ms per 5 s, nothing elsewhere (`artifacts/qa/polish/motion-cost.jsonl`). `AGENTS.md`, `DESIGN.md`, `README.md`, `docs/motion.md` and `docs/figma-workflow.md` were updated to this record.

**Lighthouse (homepage, after the motion fix, default noindex build, Lighthouse 13.5.0):** desktop Performance 100, LCP 476 ms, CLS 0.0082, one long task 71 ms; mobile Performance 99, LCP 1,766 ms, CLS 0.0009, long tasks 155/131/92 ms. Accessibility and Best Practices 100 on both; SEO 66 only because this build is intentionally `noindex` (the earlier 100 used a local indexable build). Pre-polish figures for comparison: desktop LCP 451 ms / task 74 ms, mobile LCP 1,859 ms / tasks 209, 76 ms. The no-task-over-50-ms gate still fails, as before. Reports: `artifacts/qa/polish/lighthouse/`.

**Open limitations:** Chromium only. The dev server's style HMR was unreliable for edited `.astro` styles, so checks used fresh servers and the production build.
