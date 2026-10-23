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

## Owner feedback pass — 5 October 2026 (evening, Claude)

The owner found the polish pass above missed requests: the tenet loops still started, stopped and waited; the navbar and its motion looked weird; the query walkthrough did not set earlier stages back; the FAQ had no visible opening motion; socials lacked icons; and F5 replayed every animation. This pass carries the uncommitted polish work forward from the `claude/claude-polish-prompt-f85841` worktree (including its removal of `SquareMath.astro`) and addresses each point. It supersedes the play-once rule for the tenet diagrams and the 40% start threshold.

- **Tenets, always moving:** overlapping staggered tracks, no shared rest (`tenetLoop`, `loop-scene.ts`): Permissionless crossers arrive one per second, each moving for 1.2 s; Decentralized relays a packet peer to peer and back without resting (7.8 s); Trustless streams a signal along each lane, lanes 1.2 s apart. Scenes run whenever any part is visible. A crawling dashed edge was dropped: `stroke-dashoffset` alone cost about 290 ms of main thread per 5 s. Measured after the fix: about 49 ms per 5 s for all three (headless Chromium, software rendering); 59 consecutive 150 ms samples all differed for every diagram.
- **F5:** entrance scenes play once per tab session (`seen.ts`, `sessionStorage`); hero arrival skips on reload, history visits and return visits; scenes not yet reached still play. The FAQ question open on load no longer animates.
- **FAQ:** same-document view transition: clipped, eased height change (380 ms), questions below slide, toggle turns from plus to minus, Green edge draws down, answer rises in; instant fallback without view transitions.
- **Header:** centred three-column grid; a gliding highlight tile replaces the hover underline; panels hang from the header edge and switching glides the panel from the old item (transform only); product taglines (from `products.ts`), Phosphor icons for Resources (newspaper, question, book-open, coins; provenance recorded), logos for Community.
- **Walkthrough:** completed steps are crossed off with a Green check; the challenged YES chip and “Reported Yes” row are struck through (`<s>`, with screen-reader text); older activity and progress dim.
- **Socials:** logos in the footer Community column, mobile menu, REP page Discord action, article share and the About page GitHub link.
- **Icons:** `.web-icon` inner glyphs are now block-level, so icons centre exactly in flex rows (chevrons and checks previously sat 2–3 px low).

**Checks run (this pass):** `bun run check` (0 errors/warnings, 98 files), `bun run build` (26 pages), `check:copy` (176/176), `bun test tests/copy-check.test.ts` (5/5), `check:budgets` (exit 0; home JS 14,644 B / CSS 15,561 B gzip), `check:links` (26 pages, 1,874 destinations), full Playwright suite against this build 54/54 (7 new: continuous tenet motion, F5, FAQ transition, panel glide, walkthrough states, social logos). Header checked at 1440, 1280, 1100, 1024, 768, 390 and 360 px with no horizontal overflow.

**Not done:** Figma was not updated in this pass; `250:717` still shows the earlier rest-based loops and the old header and walkthrough states. Lighthouse and `check:launch` were not re-run. Chromium only.

## Owner iteration — 6 October 2026 (Claude, website and Figma together)

The owner asked that every change land in both the website and Figma. Requests: F5 still replayed every animation; the “decentralized” highlight was invisible; livelier tenet diagrams (Decentralized always going further, more than one Permissionless square lit with arrivals and departures, Trustless firing like neurons); choosing Yes or No in Prediction markets; a better Activity log; icons and visuals in “What can you do with REP?”; past roadmap milestones that read as no longer alive; a more dynamic, cursor-responsive hero; and a general polish. Follow-up the same day: no glow on the “decentralized” highlight, the underline sat too low, and REP should not repeat the tenets’ three boxes.

- **Reload:** the replay came from a browser that denies `sessionStorage` (the desktop app's preview pane throws `SecurityError`), so `seen.ts` could never remember a scene. A reload or back/forward visit now settles every entrance scene from the navigation type, with or without storage.
- **Underline:** draws in on arrival and stays; it sits 0.1 em below the baseline (it was 23 px, about a third of an em, below it). No glow. Figma: `399:568` on Homepage and the arrival frame's `121:331`.
- **One choreography for site and Figma:** `choreography.ts` defines tracks (keys on a 12 s cycle that open and close on the static artwork, easing on the arriving segment as in Figma). `tenet-choreography.ts` and `hero-choreography.ts` generate them; the same keys were written to Figma `250:717` (tenets, 24 s timeline) and `382:848` (hero, 12 s), using a compact export for the tenets and a ported generator with a matching checksum (285 tracks, 1,938 keys, 9550992.160) for the hero. Both frames were rendered with `export_video` and sampled.
- **Tenets:** Permissionless newcomers cross in every 3 s, light Green, stay on as Paper members, settle and later leave while seated members brighten in turn. Decentralized follows a searched closed route that never turns straight back and covers all 16 links (no Hamiltonian cycle exists in the mesh), trailing light. Trustless lanes fire like neurons on irregular rhythms; the middle never lights. Only the Peer mesh glows, as `AGENTS.md` requires; the glows first added to crossers and Trustless were removed after the owner's follow-up. The Figma Peer mesh component now rests with its home square lit, as the website does.
- **Hero:** the same canonical geometry as HTML boxes, so the 12 s story (a question popping outward, scattered Green reports, an inward agreement with the inner ring holding Green around the empty centre, small orbits throughout) runs on the compositor. Fine pointers get a lens that parts, grows and lights nearby squares; a click or tap sends a Green ripple. Figma has the loop and two state frames (`382:1029` pointer lens, `412:1108` tap ripple).
- **Picker:** Prediction markets' result is a native radio group; the Green fill slides to the chosen answer and the signal replays to the backstop. Figma: `Applications / Market result` (`403:1001`) with click prototypes, placed in the picker variant.
- **Walkthrough:** Activity is a timeline (icon nodes on a rail, amounts in tags, only the latest event Green, the replaced report hollow and struck). Figma's four variants were rebuilt and also brought in step with the 5 October crossed-off steps, struck YES chip and dimmed progress.
- **REP:** briefly three tiles, then rows at the owner's request: a 48 px icon tile and the action, the flow drawn large (40 px bonds), the text, between hairlines; hovering a row replays its flow. Figma homepage and Section details 07 match.
- **Roadmap:** completed legs are Graphite with checked stops and Pewter labels; only the current leg and Now are Green, and Now pulses slowly. All six Figma variants match.
- **Icons:** lock-simple, seal-check, flag, scales and warning (Phosphor Bold, byte-identical to the pinned revision) on the website and as Figma C1 components; provenance in `icon-provenance.json`.
- **Figma notes:** Homepage notes 03–08 and Section details notes 03–08 describe the new behaviour; markers and notes were realigned to their sections (markers and note 07 had sat 200 px off). The hero note's open item now says the 6 October motion awaits review.

**Measured (headless Chromium, production build, main-thread task time per 5 s while each scene is on screen):** hero 8–12 ms (previous build 121–175 ms); tenet loops 39–40 ms for all three after the follow-up removed the extra glows (82–106 ms with them; previous build 67–69 ms with less than half the animated elements). A first version animated the SVG diagrams with the individual `translate`/`scale` properties and cost 2.1–2.5 s per 5 s: Chromium re-layerized the diagrams every frame (Layerize alone 0.5–0.7 s per 3 s). Animating `transform` removed it; the rule is now in `AGENTS.md`.

**Checks run (this pass):** `bun run check` (101 files, 0 errors, warnings or hints), `bun run build` (26 pages, no warnings), `check:copy` (176/176), `check:links` (26 pages, 1,874 destinations), `check:budgets` (homepage JS 17,955 B / CSS 16,404 B gzip), `bun test tests/copy-check.test.ts` (5/5), `check:launch` (intentional failure, 80 items: the 79 before plus the hero-review note), the full Playwright suite against the production build 62/62 (8 new tests), and full-page captures of all 11 routes at 1440 and 390 px with no horizontal overflow. Lighthouse was not re-run. Chromium only.

## Products menu — 6 October 2026 (Claude, website and Figma together)

The owner asked for the Products panel to follow a reference with a featured item and its button on the left and two stacked entries on the right, putting the attention on Augur Lituus first, then Zoltar and Augur Stratoblast.

- **Website:** the panel is 624 px with 12 px padding and two columns. Augur Lituus leads as a card: Green mark, its name in Heading 4 (Sora 600 20/26), its tagline in Small (14/20) and a full-width Primary action, “Explore Augur Lituus →”, pinned to the card's foot. The action is the card's only link; its `::after` stretches over the card, so the whole card is the hit area with one tab stop and an accessible name equal to the visible label. Zoltar and Augur Stratoblast stack in the right column as rows (Mist mark, Sora 16/24 name, Small tagline). Hovering the card raises it to Dark 3, turns its mark into a diamond, nudges the arrow 3 px and gives the action its hover fill. Item order and destinations come from `navigation.ts` (a `cta` field marks the lead item); taglines still come from `products.ts`. Resources, Community, the glide between panels and the mobile menu are unchanged.
- **Copy:** “Explore Augur Lituus” is new. “Try” was avoided because Augur Lituus is in development. The label and its → stay flagged in `launch-checklist.md` until the owner approves them.
- **Figma:** Section details `43:123` was rebuilt from Augur variables, text styles and the Button component (default state), with a hover-state panel `421:993` beneath it. The Button set (`261:434`) gained a **Next icon** boolean, off by default, that shows `Icon / arrow-right` in the six Primary variants; existing instances are unchanged. Note `216:340` describes the new panel and lists the label as open before launch; `figma-notes.json` was re-extracted for that note.
- **Known Figma gaps:** `Navigation / Hover and switching` (`375:848`) still shows the earlier names-only Products panel and older timings; its three 416 px columns cannot hold a 624 px panel without a redesign. The Resources example still lacks the website's icons. Only the three Default Button variants bind their label to the Label property, an existing issue, so the hover panel's label is a text override on its instance.
- **Later:** the owner wants a dedicated Augur Lituus page; it is recorded in `backlog.md`, and the header action should point to it once it exists.
- **Branches:** every local branch was checked against `main`. Ten branches pointed at `47ff014`, an earlier draft of `d4e69b8` (same parent, author time and message) holding older versions of experiment files that the rebuild deleted, so nothing was pending to merge. All other branches were already in `main`.

**Checks run (this pass):** `bun run check` (0 errors or warnings; its 50 hints all come from the untracked `dist-lab/` build output, not from tracked source), `bun run build` (26 pages), `check:copy` (176/176), `check:links` (26 pages, 1,874 destinations), `check:budgets` (exit 0; homepage JS 17,955 B / CSS 16,678 B gzip), `bun test tests/copy-check.test.ts` (5/5), `check:launch` (intentional failure, 81 items: the previous 80 plus the action label), and the full Playwright suite against the production build, 63/63 (1 new: the lead card's single link, hit area and keyboard order). A run that overlapped other browser work failed only the tenet no-rest sampling test; it passed 3 of 3 alone and in the clean full run. Axe found no violations with the Products panel open, and forced colours keep the action outlined. The open panel was checked at 1440, 1280 and 1024 px (it ends at 1180, 1100 and 985 px); 768, 390 and 360 px use the mobile menu. None of these widths overflow horizontally. Lighthouse was not re-run. Chromium only.

## Header highlight — 6 October 2026 (Claude, website first)

The owner did not want the square highlight in the navbar and asked for a small Green line under the item instead, drawing in from left to right and disappearing from right to left. They asked to finish the website work first and update Figma afterwards.

- **Website:** hovering an item, or opening its panel, shows a 2 px Green line directly under its label (the word only, not the chevron). Items have no fill. The controller's one highlight is now this line: it draws in from the label's left edge (scaleX from 0, 240, reveal easing), glides between items with translate and scaleX (240), and retracts right to left to its left edge when the pointer leaves or the panel closes. A line still retracting glides back rather than restarting. Without the controller, each label's own line draws in and retracts the same way; reduced motion shows and hides it instantly. In forced colours the line, and the current-section rule, draw in CanvasText instead of disappearing. The current-section rule on the header's bottom edge is unchanged.
- **Figma (pending, to sync after the website work):** the header hover and open states in the navigation component and `Navigation / Hover and switching` (`375:848`), the Section details note `375:1470` (“open item underlined…”), and the header motion note, which still describes the Dark 3 tile; the line's draw-in, glide and retract need keys there.

**Checks run (this pass):** `bun run check` (0 errors or warnings; its 50 hints come from the untracked `dist-lab/` build output), `bun run build` (26 pages), `check:budgets` (exit 0), and the full Playwright suite against the production build with system Chromium, 64/64 (1 new: the line draws in from the label's left edge and retracts to it, sits 2 px tall directly under the label, is Green, and the item has no fill). Forced colours (emulated): the line draws in CanvasText at the label's width. A first run failed every test before launch because Playwright's bundled Chromium is not installed. The runs rewrote `artifacts/qa/results.json` and two homepage screenshots, which were restored to their committed versions. `check:copy`, `check:links`, `check:launch` and Lighthouse were not re-run; no copy or links changed. Chromium only.

## Temporary underlines — 6 October 2026 (Claude, website first)

Right after the header line, the owner asked for the “decentralized” underline to be temporary with the same logic as the header (in and out, on hover and when refreshing), and for the “Read the whitepaper” text action to draw its underline in and out instead of it appearing at once.

- **Hero underline:** it no longer stays. On every load it draws in from the left (750–1320, hero easing), holds, and retracts right to left to its left edge (2200–2700, reveal easing); fine-pointer hover draws a second line in the same place (320) and retracts it on leave. Timings live in `heroTimeline` (`underline`, `underlineOut`, `underlineHover`). The sweep is the owner's explicit exception to settled reloads: it plays on a reload too, while the rest of the arrival stays settled. It is plain CSS, so it also plays without JavaScript; reduced motion and print show no line. This reverses the earlier “draws in and stays”.
- **Text actions:** every `.button.text` (hero, roadmap, products, REP, About) wraps its label in `.button-label`; a 2 px line in the text colour (Paper; was the underline's colour) draws in from the left under the label only, not its icons (240, reveal easing), and retracts to the left on leave, at the old underline's place. The instant `text-decoration` underline is removed from text actions, including the dark-mode registry override; `aug-button--link` keeps its own.
- **Scroll cue:** the owner then asked for a small, short, subtle sign to scroll down. The hero fills the first screen with nothing below peeking, so its bottom centre now carries a 1 px × 40 px Graphite line with a 5 px Green square sliding down it every 2.4 s (brand squares rather than a chevron; no “Scroll” label, as the site has no small kicker text). It fades in at 2.4 s on a first visit, after the underline has gone, and fades out and stops once the page scrolls. It is decorative only (`aria-hidden`, no pointer events; “See how it works” remains the way down). It is hidden below 768 px and in print, and does not touch the copy or the art at 1440×900/800, 1280×800/720, 1024×768 or 768×1024.
- **Answer ribbon on every load:** the owner could not see the ribbon under “With Augur, no party controls the answer.” It worked, but only on a fresh visit, and reviewing by refreshing (or after the dev server's reload on each edit) always showed it settled. At the owner's choice it now sweeps once per load when 60% of the band is visible, a reload or return visit included; it no longer goes through `seen.ts`. Every other scroll-in scene keeps the once-per-visit rule, and a band already on screen when the script runs (a restored scroll position) still stays settled.
- **Statement words:** the owner asked for the statement's text to move too. As the ribbon's front reaches each word, the word rises .45 em into place in Navy and fades in (420, hero easing), so the statement is set word by word behind the ribbon. Words ahead of the front stay readable Paper, so nothing is hidden while the band waits to be scrolled to. Only the decorative Navy copy is split into words; the live statement stays one text node for assistive technology and selection. Start times come from inverting the ribbon's draw easing at each word's left edge (`timeAt` in `home-art.ts`), so they follow the front at any width.
- **Figma (pending, to sync with the header):** the ribbon note on Section details (once per load, reload included) and the word rise keys in the ribbon frame; the scroll cue on Homepage `28:7` and its keys in the hero arrival and story frames; Homepage underline `399:568` (no longer a resting part of the hero), the arrival frame `121:331` and its keys (sweep in, hold, retract), the Section details arrival note `216:386` (still says the underline “fades by 2.25 s”: it now retracts right to left by 2.7 s), a hover state for the underline, and the text-action hover state in the button component.

**Checks run (this pass):** `bun run check` (0 errors or warnings; 50 hints from `dist-lab/`), `bun run build` (26 pages), `check:budgets` (exit 0), and the full Playwright suite against the production build with system Chromium, 67/67 (the reload test now leaves the underline sweep out of its check and expects the ribbon to sweep after a reload; the old “stays visible” test is replaced by one for the sweep and hover; new tests cover text actions, the scroll cue and the statement's word rise). These tests show the underline sweeps in then out after a reload and ends hidden, sits under the letters, and answers hover; text actions draw and retract under the label with no text decoration; reload still settles every other hero animation; reduced motion runs nothing; no-JavaScript and the header line are unchanged. Frames were captured at 600, 1000, 1400, 2300, 2500 and 2900 ms after a reload and for the text action's hover. The run rewrote `artifacts/qa/results.json` and the homepage screenshots, which were restored. `check:copy`, `check:links`, `check:launch` and Lighthouse were not re-run. The in-app preview pane was hidden, so its animation clock was frozen and could not show motion. Chromium only.

## Tenet loop fixes — 6 October 2026 (Claude, website first)

Before the team review the owner flagged two details: Permissionless squares that were going in sometimes stood still (“the squares going in should always be in motion; only the ones not moving in or out may stay still”), and Trustless's third row had a square that was always on.

- **Permissionless, waiting crossers:** the four crossers start 3 s apart, and before its first cycle a delayed track showed the static frame, so the right, bottom and Green left crossers stood on the edge for 3, 6 and 9 s whenever the scene started. They now play a one-off lead-in over that delay: each leaves across the edge (600, crossfade) as its trail fades, and slides back in on its beat. `Track.lead` in `choreography.ts` holds those keys, opening on the static frame and ending where the cycle begins.
- **Permissionless, returning crossers:** each crosser slowed to a stop on the edge at the end of every cycle (its return eased out), then set off again. It now slides in at a steady speed equal to the one its curve into the seat starts with (`crossApproach`), so it passes the edge without a stop. The Green newcomer's overshoot moved to its seat, where the docs already described it.
- **Measured:** stepping every animation through 36 s in 20 ms steps, the time each crosser spent on its edge, visible and still, went from 120 / 3,040 / 6,080 / 9,000 ms to 0 for all four. A new Playwright test checks this over 24 s.
- **Performance:** the first lead-in version sat on the same elements as the loops, and Chromium then ran those loops on the main thread for good: about 830 ms of main-thread work per 5 s for Permissionless alone, against 10 ms before. Pausing and replaying the loops cured it, which showed that compositing is decided when an animation starts. Moving the lead-ins to `data-lead` wrappers fixed it: Permissionless alone is 7 ms per 5 s once its lead-ins end (the previous commit measured 10 the same way); the first 5 s on screen, page start-up included, measure 302–475 ms against 352–462 ms for the previous commit. `loop-scene.ts` no longer restarts a finished one-off animation when the scene resumes.
- **Trustless:** the third receiver rested Green (a leftover of the static “result” in Figma `261:2183`), so it never went dark during the loop. All three receivers now rest Mist and fire Green only when a signal lands. With JavaScript off, reduced motion or print, the diagram has no Green.
- **Figma:** synced with the Pulse squares below.

**Checks run (this pass):** `bun run check` (0 errors or warnings; 50 hints from the untracked `dist-lab/`), `bun run build` (26 pages), `check:copy` (176/176), `check:links` (26 pages, 1,874 destinations), `check:budgets` (exit 0; homepage JS 18,584 B / CSS 17,055 B gzip), `bun test tests/copy-check.test.ts` (5/5), and the full Playwright suite against the production build with system Chromium, 68/68 (1 new: crossers never stop on the edge and every receiver rests Mist; the loop test now allows one-off lead-ins). Frames were captured at the scene start, around the first turns and around the cycle boundary. The first full run failed every test because a stale `astro preview` daemon held the port; the clean run is the one reported. The runs rewrote `artifacts/qa/results.json` and the homepage screenshots, which were restored. `check:launch` and Lighthouse were not re-run. Chromium only.

## Pulse squares — 6 October 2026 (Claude, website and Figma together)

The owner found the tenet squares “too poor” and asked to improve them without making them fancy. Four treatments were sketched on all three diagrams with the real geometry and timings: Seat (a dark tile whose core fills), Mosaic (nine cells per square), Pulse (today's flat squares that pop and send out an outline) and a raised block, dropped before showing because its edge read as a drop shadow. A framed variant was dropped as too close to Seat. I recommended Seat; the owner chose Pulse.

- **Website:** `pulseTiming` in `tenet-choreography.ts`. A square that lights up pops (scale 1.16, 140 up, back by 420) and its 1 px outline grows to 175% while fading from 85% over 700. Seats pulse Paper when they brighten, crossers Green as they cross the edge, mesh squares Green where the relay lands, Trustless senders Paper and receivers Green (their existing pops are kept). Each square's base and overlays sit in a pop group (`cross-seat-pop`, `cross-pop`, `mesh-pop`); outlines are separate rects (`*-ring`) drawn above them, so no element carries two animations of one property. Rest, no-JavaScript, reduced motion and print are unchanged: outlines are invisible at rest.
- **Measured:** main-thread task time per 5 s with each diagram alone on screen after its lead-ins: Permissionless 10 ms, Decentralized 12, Trustless 6; all three together 6 ms in a steady window, and the first 5 s on screen 381–458 ms with page start-up (previous commit 352–462).
- **Figma:** in `250:717` the three diagrams gained the same pop frames and outline layers, named by track id, and every tenet track was rewritten from the website choreography onto the 24 s timeline (the Permissionless lead-ins over the delays, then cycles): 150 layers, 2,885 keys, matching the export count for each diagram, with no missing or leftover tracks. The third receiver is Mist there and in the `Diagram / No authority` component (`311:630`, renamed `Participant / 3 / right`), so the homepage instance `261:2190` follows. Note `251:709` describes the fixes and the pulse and gained a build item about the lead-in wrappers; `figma-notes.json` was re-extracted for it (the stored copy predated the loops). The frame was rendered with `export_video` (10 fps) and sampled at 0, 0.4, 1.4, 2.8, 3.0, 3.5, 3.6, 9.0, 9.4, 11.8 and 12.1 s: crossers pass the edge without stopping, the later three slide out at the start and return on their beat, and every pulse lands where the website's does.

**Checks run (this pass):** `bun run check` (0 errors or warnings; 50 hints from the untracked `dist-lab/`), `bun run build` (26 pages), `check:copy` (176/176), `check:links` (26 pages, 1,874 destinations), `check:budgets` (exit 0; homepage JS 18,860 B gzip), `bun test tests/copy-check.test.ts` (5/5), and the full Playwright suite against the production build with system Chromium, 69/69 (1 new: outlines exist on every square, are invisible at rest, and a seat pops and sends out its outline as it brightens). Frames were captured for all three diagrams. The run rewrote `artifacts/qa/results.json` and the homepage screenshots, which were restored. `check:launch` and Lighthouse were not re-run. Chromium only.

## Market query in What could you build? — 6 October 2026 (Claude, website and Figma together)

The owner found the Prediction markets “Market result” Yes/No too simple: it “doesn't really indicate much”. They asked for a simple query with a question, options, status and previous stages. Two layouts were sketched with the same wording (a stepper and a timeline); the owner chose the stepper. During the build they asked for the current stage to be Green rather than grey, as on the roadmap and in the walkthrough.

- **Card:** “Market result” label and status chip, the question (moved out of the story so it is not said twice), four stages on a progress line (Asked, Reported Yes, Not challenged, Final) and the outcomes Yes, No and Invalid. At rest it is final: Final Green, earlier stages Pewter, Yes Green with a check, status “Final answer”. It is set in Augur text styles: Meta (label, stages), UI (status, outcomes) and Label (question). It may rise into the panel's top padding (where only the tab's name sits, on the left); it is 247 px tall at 1440 against the old box's 194.
- **Wording:** the statuses come from `walkthrough.ts`; the stage labels and Invalid are new and stay flagged in `launch-checklist.md` until approved. No amounts, dates or durations.
- **Motion:** see `motion.md`. It plays once when the card scrolls into view and whenever its tab is chosen, then sends the signal to the backstop; resize, print, page hide or reduced motion settle it.
- **Visitors no longer pick the answer.** The 6 October Yes/No choice was removed: the card now shows the answer coming from the stages, and a visitor choosing it would contradict “no party controls the answer”. Easy to restore if the owner wants it back.
- **Responsive:** beside the story the card had too little width below 1024 (at 768 it was 187 px wide, 372 px tall and ran 68 px past the panel). The picker now uses its stacked layout below 1024 instead of below 768. At 1440, 1280, 1100 and 1024 the card fits the panel; below 1024 it spans the stacked panel, and when narrow its stages wrap into two rows. No width from 1440 to 360 overflows horizontally.
- **Figma:** `Applications / Market query` (`435:1096`) replaces `Applications / Market result` (removed) on Section details 05, with variants Stage = Asked, Reported, Not challenged and Final, bound to Augur Website variables. Each stage changes to the next after 0.6, 0.7 and 0.7 s (Smart animate); the frame `Applications / Market query · play (prototype)` starts at Asked for Play. The picker's Prediction markets variant uses Stage = Final and no longer shows the quoted question, so Homepage `28:7` follows with no overrides. Note `216:405` describes the card and flags the wording. `homepage-copy-source.json` was re-extracted for section 05 (182 passages).

**Checks run (this pass):** `bun run check` (0 errors or warnings; 50 hints from the untracked `dist-lab/`), `bun run build` (26 pages), `check:copy` (182/182 after re-extracting section 05), `check:links` (26 pages, 1,874 destinations), `check:budgets` (exit 0; homepage JS 19,678 B / CSS 17,205 B gzip), `bun test tests/copy-check.test.ts` (5/5), `check:launch` (intentional failure, 82 items: the previous 81 plus the market query wording), and the full Playwright suite against the production build with system Chromium, 69/69 (the Yes/No test is replaced by one for the card's content, its play, its `aria-hidden` overlays and their removal). Frames were captured at rest and at 480–2700 ms of a play, and the card was measured at 1440, 1280, 1100, 1024, 1023, 900, 768, 390 and 360 px; the previous commit was built to compare 768. The run rewrote `artifacts/qa/results.json` and the homepage screenshots, which were restored. Lighthouse was not re-run. Chromium only.

## Figma catch-up and repository tidy — 6 October 2026 (Claude)

The owner asked to keep Figma like the website, remove old worktrees and branches (merging anything not yet in `main`, never downgrading) and amend the commit.

- **Navigation / Hover and switching (`375:848`):** rebuilt from the website at 1440 in three states: hover Products (the 2 px Green line under the label and the 624 px Products card), move to Resources (the line and panel glide; the Resources panel with its Phosphor icons) and leave (panel fades, line retracts). Two Phosphor Bold icons were added as components, `Icon / newspaper` and `Icon / question`, from the website's SVGs.
- **Notes:** the header states note (`375:1470`), hero arrival (`414:1082`, underline sweep and scroll cue), reduced motion and no-JavaScript (`414:1120`), answer ribbon (`414:1016`, once per load with the word rise) and the Who decides motion caption (`250:716`) now describe the website.
- **Homepage `28:7`:** the hero underline `399:568` is hidden (it is not part of the resting hero) and the scroll cue is drawn where the website puts it: a 1 × 40 px Outline line with a 5 px Green square, 700 px down the hero, centred. The hero arrival frame's underline (`121:331`) now retracts right to left at 2.2–2.7 s after drawing in.
- **Still to key in Figma (documented in notes, not yet keyframed):** the header line's draw-in, glide and retract; the scroll cue's loop; the ribbon's word rise; the text-action hover underline in the Button component.
- **Repository:** worktrees `.claude/worktrees/products-navbar-redesign-3a1211` and `website-availability-check-1c612a` (both already in `main`, no local changes) and `~/.codex/worktrees/69d6` (detached at `47ff014`, an earlier draft of `d4e69b8` holding only older versions of files the rebuild replaced, so merging it would downgrade `main`) were removed, with the merged branch `claude/website-availability-check-1c612a`. Only `main` remains.


## Augur Lituus band, fallback example and 2027 roadmap — 6 October 2026 (Claude, website first)

The owner felt the band under the application picker gave the backstop too much room and implied that a backstop is Augur Lituus's only use. The January 2026 whitepaper agrees: it presents Augur Lituus as an oracle that answers any multiple-choice question as “an infrastructure layer for prediction markets, DeFi systems and other protocols” (§2), and uses “backstop” only for the algorithmic fork (§2.1). The owner still wanted the fallback use mentioned, as one possibility among others.

- **Band:** one slim line, “Augur Lituus | One oracle for every app.”, in Label, 64 px tall at 1440 to 1024 (was 112 with a 24 px headline “One backstop for every app.”), so the section is 48 px shorter. Below 1024 the name sits above the line as before. Connectors and the signal into the band are unchanged; the class is now `application-oracle` and the timing key `applicationTimeline.oracle`. An intermediate version kept “Apps on other chains or L2s could ask it too.” in the band; the owner moved the idea into one example instead.
- **Fallback as one example's choice:** the Insurance & payments panel carries a small muted note with a 1 px rule on its left: “The app could also use a faster oracle on its own chain or L2, and turn to Augur Lituus only when a claim is disputed.” (`applications.ts`, `fallback`). Insurance was chosen over Prediction markets, whose query card tells the direct story. At 1024 and wider the note sits under the flight card and the card rises by its height, so the story keeps its place below the tab name (a version spanning the panel pushed the heading into the name at 1440 and 1280); below 1024 it follows the card. It is conditional (“could”) and flagged for the maintainers in `launch-checklist.md`; the chain and L2 part rests only on the Website Strategy p.10.
- **Callout (follow-up):** the owner wanted the fallback note in a box, not loose text. It is now a callout under the flight card: a 1 px Outline box, 12/16 padding, the Phosphor Bold `scales` icon (already bundled) in Paper beside Small muted text; the left rule is gone. At 1024 and wider the Insurance panel's top padding is 40 instead of 102, so the card rises beside the tab name (as the Prediction markets card does) and the callout stays inside the panel; measured at 1440, 1280, 1100, 1024, 768, 390 and 360 px. After this the full Playwright suite passed 70/70; `check`, `build`, `check:copy` (181/181) and `check:budgets` passed.
- **Roadmap:** at the owner's request Testing & audits and Launch read “2027” (statuses “Up next · 2027” and “Then · 2027”), with no quarter. They were “No date announced”. The owner supplied the year; it is not from a published report.
- **Copy record:** `homepage-copy-source.json` was edited by hand (band line, removed second band line, both roadmap dates) until Figma follows; see Pending Figma sync in `figma-workflow.md`.
- **Not changed:** the Launch milestone's body still says Augur Lituus “is designed for the prediction markets, protocols and apps that call on it when a real-world outcome is disputed”, which carries the same only-on-dispute reading; raised with the owner.

**Checks run (this pass):** `bun run check` (0 errors or warnings; 50 hints from the untracked `dist-lab/`), `bun run build` (26 pages), `check:copy` (181/181), `bun test tests/copy-check.test.ts` (5/5), `check:links` (26 pages, 1,874 destinations), `check:budgets` (exit 0; homepage JS 19,685 B / CSS 17,234 B gzip), `check:launch` (intentional failure, 82 items, two reworded), and the full Playwright suite against the production build with system Chromium: 69/70, the failure being the new test's own assertion (it expected a space between the band's heading and line in raw text); after fixing it the band, market query and roadmap tests pass, 3/3. The Insurance panel was measured at 1440, 1280, 1100, 1024, 768, 390 and 360 px with reduced motion: the story stays below the tab name, and no width overflows horizontally. The runs rewrote `artifacts/qa`, which was restored. Lighthouse was not re-run. Chromium only.

## DAOs & grants becomes a prize challenge — 6 October 2026 (Claude, website first)

The owner found the DAOs & grants example weak (“Published.”). Its question, “Was the promised work published on time?”, repeated the Prediction markets example's done-by-the-deadline yes/no shape, and its card's display word answered nothing. Three directions were offered (pay per goal, prize challenge, a real-world project); the owner chose the prize challenge.

- **Copy (owner's choice):** tab question “Which team shipped a working prototype first?”, action “Award a grant.”, explanation “Pay the prize to the team that got there first.”, card label “Prize challenge”, caption “Prize sent to Team B”. The teams are illustrative. The answer is one of several teams, so the picker now shows a yes/no question, a threshold and a multiple-choice answer (Augur Lituus resolves any multiple-choice question, whitepaper §2).
- **Card:** three 72 px team tiles in Website tile (Meta-sized Sora 600 14/20, 8 px square mark top left); the winner is Green with Navy text and a check top right, and carries “, final answer” for screen readers, as the market's Yes does. A caption with a Green check confirms the payout; the old Green caption bar, the “Published.” display word and the document lines are gone. Forced colours draw the tiles outlined and the winner in Highlight. Data: `prizeChallenge` in `applications.ts`. Static, like the Insurance card; no new motion.
- **Fit:** measured at 1440, 1280, 1100, 1024, 768, 390 and 360 px: the card is 176–182 px tall, names stay on one line (tiles 72–95 px wide), the story stays below the tab name and nothing overflows.

**Checks run (this pass):** `bun run check` (0 errors or warnings), `bun run build` (26 pages), `check:copy` (181/181), `bun test tests/copy-check.test.ts` (5/5), `check:budgets` (exit 0; homepage JS 19,685 B / CSS 17,305 B gzip), `check:launch` (intentional failure, 82 items, unchanged), and the full Playwright suite against the production build with system Chromium, 71/71 (1 new: the prize card's question, tiles, single winner and caption, with no “Published”). The run rewrote `artifacts/qa`, which was restored. Lighthouse was not re-run. Chromium only.

## Open application card marker — 6 October 2026 (Claude, website first)

The design hook flagged the open card's one-sided bar (3 px Green top edge on desktop, left edge below 1024), and the owner disliked it. Four replacements were offered (Green icon square, a square in the + slot, a 1 px outline all round, tone only); the owner chose the Green icon square, for the application picker only. The open FAQ question, menus and article contents keep their 2 px Green edge for now.

- **Website:** no border on the open card at any width; its 40 px icon tile fills Green with a Navy icon (was outlined Green), the name stays Green and the tile stays one tone lighter. Padding absorbs the removed 3 px, so content does not move (the name sits 96 px from the card top at 1440, 88 at 1100, as before). In forced colours the tile fills Highlight with HighlightText; that rule has to follow the Green fill in the stylesheet, or the Green wins. The `side-tab` hook ignore added earlier the same evening was removed with the bar.

**Checks run (this pass):** `bun run check` (0 errors or warnings), `bun run build` (26 pages), `check:copy` (181/181), `check:budgets` (exit 0; homepage JS 19,685 B / CSS 17,291 B gzip), and the full Playwright suite against the production build with system Chromium, 72/72 (1 new: no border on the open card at 1440 and 390 px, its icon tile Green and the closed ones not). Screenshots at 1440, 1100 and 390 px, with and without emulated forced colours. The run rewrote `artifacts/qa`, which was restored. `check:launch`, `check:links` and Lighthouse were not re-run; no copy, links or flags changed. Chromium only.


## Insurance and DAOs & grants play in — 6 October 2026 (Claude, website first)

The owner asked for subtle animations on the Insurance and DAOs & grants elements. Both now play whenever their tab is chosen, like the Prediction markets query, then send the signal down to the Augur Lituus band; timings in `motion.md`, code in `application-plays.ts`.

- **Insurance:** the arrival square leaves the scheduled-arrival tick and slides to the actual arrival as the delay line grows behind it; “More than two hours late” brightens from 40% as the square passes +2 hours. A first version measured the layout when the tab was clicked, but the incoming panel is still hidden then, so every distance was zero and the square did not move; distances are now percentages of the track (`--arrival`, `--limit`), and the square rides the end of `.flight-run`, which slides its own width.
- **Flight scale rebuilt in HTML:** the stretched SVG (`preserveAspectRatio="none"`) drew the 14 px arrival square as 29.5 × 14 at 768 and 10.8 × 14 at 1024, and stretched the 1 px ticks. The track, delay line, ticks and square are now positioned elements at the old artwork's positions (arrival 258 and +2 hours 189 of 296), so the square is 14 × 14 and the ticks 1 px at every width; at 1440 it renders as before. Forced colours draw it in CanvasText with a Highlight square.
- **DAOs & grants:** Team B shows as a plain tile (a temporary `aria-hidden` veil, removed when it ends) for a beat after the panel lands, then turns Green as its check pops in, and the caption rises into place.
- **Rules kept:** transform and opacity only; reduced motion, no JavaScript and print show both cards final; resize, print or page hide settle them; nothing plays on load, as both panels are hidden until chosen. `timeAt` moved from `home-art.ts` to `timelines.ts` so both scenes share it.

**Checks run (this pass):** `bun run check` (0 errors or warnings), `bun run build` (26 pages), `check:copy` (181/181), `bun test tests/copy-check.test.ts` (5/5), `check:budgets` (exit 0; homepage JS 20,220 B / CSS 17,467 B gzip, up 535 B and 176 B), and the full Playwright suite against the production build with system Chromium, 74/74 (2 new: both plays run when chosen and settle on the final state with the veil removed; with reduced motion nothing plays and the square is 14 × 14 at 1440, 768 and 360 px). Frames were sampled at 250–2600 ms for both plays at 1440, and the rest state measured at 1440, 1024, 768 and 360 px. The run rewrote `artifacts/qa`, which was restored. Main-thread cost was not measured (one-shot, compositor-only effects); Lighthouse was not re-run. Chromium only.

## REP rows aligned and looping — 6 October 2026 (Claude, website first)

The owner found “What can you do with REP?” misaligned (“the arrow, the text”) and asked for animation to make it more alive.

- **What was off:** measured centres agreed, but nothing shared a line on screen. Each condition (“No challenge”…) sat at the arrow's far left; the paragraphs were centred on the row, so their first line floated above the squares and Risk's two-line text started lower than the other rows'; the fee and gain squares rested on the bonds' bottom edge, so the “+” beside them looked high; on phones each row sized its outcome column to its own content, so arrows were 126, 89 and 212 px long and outcomes started at different points, with captions running to the edge.
- **Fix:** one axis per row through the icon, title, squares, arrow, “+” and the paragraph's first line (`--axis`: at 1440 the squares' centre is 44 px below the condition's top; the head and text are offset to it, with `align-items:start`). Conditions are centred over their arrows; small squares and “+” are centred on the bonds; phones use fixed 76 / 168 px outer flow columns, as desktop already used 92 / 236. Measured at 1440 and 1280: icon, title, squares, arrow, “+” and first line all at 81 px in every row, text tops equal; at 1024 and 768 the text sits below at one height; at 390 and 360 arrows are 78 and 48 px in every row with outcomes aligned and inside the flow. No width overflows.
- **Loop:** see `motion.md` (REP stake flows). It reuses the tenets' pulse language (outlines, a travelling square), animates only elements it adds, starts after a 1.8 s lead so it follows the entrance, and its animations carry the id `rep-loop` so the hover replay can still tell whether a replay is running. About 5 ms of main-thread work per 5 s with the rows on screen, the same as with the loop paused.
- **Budget:** the loop took the homepage over its 20,480 B JavaScript budget (20,713 B). Five homepage-only components (Tenets, Applications, How it works, StakeFlow, Roadmap) each loaded their own start-up script, three of them byte-identical; the page now starts them once from one script in `index.astro`. Homepage JS is 19,692 B gzip (from 15 files to 9); the budget was not changed.

**Checks run (this pass):** `bun run check` (0 errors or warnings), `bun run build` (26 pages), `check:copy` (181/181), `bun test tests/copy-check.test.ts` (5/5), `check:links` (26 pages, 1,874 destinations), `check:budgets` (exit 0; homepage JS 19,692 B / CSS 17,574 B gzip; a first run after adding the loop failed at 20,713 B), and the full Playwright suite against the production build with system Chromium, 76/76 (2 new: one axis per row and aligned arrows at 1440 and 390 px; 24 infinite loop animations while on screen and invisible loop elements at rest; the hover-replay test now ignores the loop). Loop frames were captured at set cycle times for all three rows. The run rewrote `artifacts/qa`, which was restored. Lighthouse was not re-run. Chromium only.

## REP arrow and loop, second attempt — 6 October 2026 (Claude, website first)

The owner rejected both the arrow (“AWFUL”) and the first loop. The arrow was a 1 px Mist hairline ending in a heavier Phosphor arrow icon, so line and head did not match; the loop (outlines growing off the squares, an 8 px square running the line) was decoration that said nothing about the bond. Three options were sketched, animated in the site's palette and type: A, a trail of small squares with a light running along it; B, a fine arrow of one weight with a copy of the bond gliding along it; C, a compact equation with a short arrow. I recommended B; the owner chose B.

- **Arrow:** an inline SVG, line and head at one 1.5 px Mist stroke (square caps, mitred head 7 px deep and 12 px tall). The head is drawn from the right edge in a nested SVG, so it keeps its shape at any line length (180 px at 1440 down to 48 px at 360). The entrance draws the line (scaleX on the SVG line) and then fades the head in, instead of scaling the whole arrow.
- **Loop:** described in `motion.md`. The copy rides `.flow-glide`, which spans from the stake to the outcome column (`calc(100% - var(--outcome))`, the same variable that sizes the column) and slides its own width, so it needs no measurement. Measured at 1440 and 390 px: at landing the copy is at the outcome bond's exact position in every row, and at sending at the stake's. Rows fire every 6 s, 2 s apart, so every track still closes inside the shared 12 s cycle (the sketch's 4.8 s period does not divide it). Nine animations; about 6 ms of main-thread work per 5 s (2 ms paused).
- **Removed:** the hairline, the arrow icon, the outlines and the travelling square, with their styles and tracks.

**Checks run (this pass):** `bun run check` (0 errors or warnings), `bun run build` (26 pages), `check:copy` (181/181), `bun test tests/copy-check.test.ts` (5/5), `check:budgets` (exit 0; homepage JS 19,719 B / CSS 17,623 B gzip), and the full Playwright suite against the production build with system Chromium, 76/76. The loop test now checks nine infinite animations, the copy landing on the outcome bond at 1440 and 390 px (after settling the once-per-visit entrance, which otherwise still slides the bond in), invisible loop elements at rest and three SVG arrows; its first version failed for that reason, then because it tried to finish the page's infinite loops. The Insurance play test now polls for the marker's motion: its panel is hidden for the 160 ms outgoing fade, where Chromium reports no animated style, so a fast run failed once. Frames were captured at set loop times. The runs rewrote `artifacts/qa`, which was restored. Lighthouse was not re-run. Chromium only.

## Figma sync — 7 October 2026 (Claude, on “update figma”)

The owner asked for Figma to be brought fully in line with the website, then for everything to be committed. The whole Pending Figma sync list in `figma-workflow.md` was synced in one pass and cleared.

- **Picker (`139:258`, all three variants; Homepage `28:7` follows with no overrides):** the Augur Lituus band is one 64 px line, “Augur Lituus” and “One oracle for every app.” in Label with a 1 × 24 px Outline divider; the second line (`137:255` and its copies) and the Ethereum chips in two variants were deleted, and the band layers are renamed `Oracle` / `Oracle line`. The 3 px Green top bar is gone from every open card, whose 40 px icon tile now fills Green with a Navy icon. Insurance & payments has the fallback callout (1 px Outline box, 12/16 padding, `Icon / scales` 16 px in Paper, Small in Pewter) under the flight card in a new `Result column`, with the panel's top padding at 40. DAOs & grants reads “Award a grant.”, the new question (also on the two collapsed cards) and “Pay the prize to the team that got there first.”; its grant card was replaced by an instance of the new `Applications / Prize challenge` set (`447:1641`, Stage = Plain and Final, Plain → Final after 0.6 s by Smart animate), bound to Augur Website variables. The picker is 48 px shorter, as on the website.
- **Plays (Section details 05):** `Applications / Motion · insurance play` (`450:1148`) and `· prize play` (`450:1176`), 2 s each, keyed from `flightTimeline` and `prizeTimeline` (the label moment from `timeAt`). The flight scale was already drawn from rectangles in Figma (14 px square, 1 px ticks), so nothing was stretched there.
- **Roadmap / Track (`162:454`):** Testing & audits and Launch read “2027” in all six variants; statuses “Up next · 2027” and “Then · 2027”.
- **REP:** on Homepage section 07 and Section details `417:962` each row is top-aligned with the head padded 20 and the text 30, so icon, title, squares, arrow, “+” and the first line share the axis 44 px below the flow's top; conditions are centred over their arrows, small squares and “+” centred on the bonds, and each arrow is two 1.5 px Mist vectors (line, and a 7 × 12 px mitred head) replacing the hairline and icon. Rows measure 187 / 187 / 165 px and section 07 is 894 px tall, both as on the website. The entrance frame draws the line with a path trim and fades the head in. A new `REP / Motion · ambient loop` frame (`449:1074`, 13.8 s: the 1.8 s lead, then one 12 s cycle) carries the loop exported from `repRowTracks`: 9 tracks, 72 keys, the website's count. Phone column widths are recorded in the note; Figma has no phone REP frame.
- **Keys for earlier website changes:** the header line draws in, glides and retracts in `375:848` (a line was added to State 3); the scroll cue fades in at 2.4–2.8 s and its dot loops twice in the hero arrival frame (`121:152`, timeline now 4.8 s). The ambient story frame `382:848` holds only the hero art, so the cue has no keys there. The answer ribbon's Navy statement is now one text layer per word, each rising 0.45 em and fading in from the moment the front reaches it (420 ms, hero easing). The Button's Text / Hover underline draws in over 240 ms and sits 1 px above the label's bottom, as on the website.
- **Notes:** `215:551` and `216:405` no longer describe a backstop and describe the band, callout, prize card, open-card tile and plays; note 07 (`388:1551`) describes the axis, arrow and loop. `figma-notes.json` was re-extracted for `215:551` and `216:405` (`388:1551` is not in it). Homepage markers and notes 06–11 moved with the section heights (−48 px for 06–07, −4 px after). Section details sections 05 and 07 grew for the new frames and captions, and the sections below them moved down.
- **Copy record:** `homepage-copy-source.json` was re-extracted from `28:7`. The text matches the hand edits exactly; only section 07's node order changed.
- **Verified:** the REP loop, insurance play and prize play were rendered with `export_video` and sampled (the copy glides and lands, winnings pop, Risk's outline flashes; the arrival square slides past +2 hours; Team B turns Green, then the caption rises). Screenshots of the picker variants were compared with the website at 1440. The header, scroll cue, ribbon and button keys were not rendered.

**Checks run (this pass):** `bun run check` (0 errors or warnings; 50 hints), `bun run build` (26 pages), `check:copy` (181/181), `bun test tests/copy-check.test.ts` (5/5), `check:links` (26 pages, 1,874 destinations), `check:budgets` (exit 0), and the full Playwright suite against the dev server with system Chromium, 76/76. The run rewrote `artifacts/qa`, which was restored. Lighthouse and `check:launch` were not re-run. Chromium only.

## Brand assets page — 13 October 2026 (Claude, website and Figma)

The owner asked for a “brand asset” entry in the footer, built on the website and in Figma, using the logos and colours already on hand.

- **Footer and route:** “Brand assets” follows About and Contact in the Augur group (`navigation.augur`), so it shows in the footer and the mobile menu; it leads to `/brand/`. The page shares `public/brand/` with the four runtime SVGs; downloads live under `public/brand/kit/`.
- **Files:** the supplied logo family from the reference library (Horizontal, Vertical and Glyph × Color, Reversed, Black and White, SVG and PNG) and the REP token icon, copied byte-for-byte and recorded in `asset-provenance.json`. Brand Foundation 02.1 says the files named Black are Augur Navy, so downloads and labels say “navy”. `augur-brand-assets.zip` (280 KB) holds the 26 files and a README of the rules. The REP icon is included because the Brand Foundation lists it in the logo system (02.10) as the canonical token asset; it is still not used as a decorative mark on the site.
- **Page:** hero with Download all assets; Logo (each variant on its approved surface from 02.2 and 02.8, per-file SVG/PNG chips, minimums from 02.6); Space and size (a clearspace diagram drawn from the supplied paths, with the lowercase a measured from the 360 × 121 master at 41.39 × 49.91, and minimum sizes at actual size); Color (the five core values from 03.1 as one strip, Navy at double width, with copy buttons, and the contrast ratios printed in 03.2–03.3, including Deep on Paper); Typography (Sora and Schibsted Grotesk with the weights the site ships, 400/600 and 400; Google Fonts links in `links.ts`, HTTP 200 today); Using the logo (three dos, four visual don'ts from 02.9 and four more in text); a closing tile to Contact. Usage terms are not invented: the page points to the team for co-branding and other questions.
- **Behaviour:** copy buttons render hidden and appear only with JavaScript; a press writes the hex, shows Copied (check icon, 160 ms opacity) for 1.8 s and announces it in a polite status; if the clipboard is denied (as in the app's browser pane) the hex is selected and the status says so. No other motion; hovers change fills in 180 ms. Print hides the download controls.
- **Type:** page sizes map to Augur text styles (Display specimen, Heading 1/3/4, Lead, Body large, Body, Label, UI, UI regular, Small) so Figma uses styles throughout. The “don't recolor” example puts brand values in the wrong places (Pewter arrow, Deep wordmark) instead of a hue filter, so both sides stay inside the brand variables.
- **Review:** `brandReview.needsReview` in `src/data/brand.ts` and a new launch-checklist item keep the page copy and public redistribution terms open until the owner approves them.
- **Figma:** Homepage `28:7` footer gained “Brand assets” (`490:1616`) and so did all eight site-page footers; `homepage-copy-source.json` records the new node. Components: new section `C7 · Logo` (`495:646`) with the `Logo` component set (`495:709`, Composition × Variant, 12 variants, fills bound to Augur / Brand navy, green and white, vectors set to scale) and `Logo / REP token icon` (`495:714`), built with `createNodeFromSvg` from the supplied Color master paths (Vertical is the same paths at the master's exact offsets; one-tint and Reversed variants rebind the same geometry, matching the supplied files to within 0.0003 units); `Icon / download-simple` and `Icon / copy` in C1; Button gained a `Download icon` boolean (off by default, coloured like each variant's label); a `Utility chip` component (`496:790`, Label text and Icon swap). Site pages: `P8 · Brand assets` (`500:1203`) with the desktop frame (`500:1210`), built from instances of those components, the About page's header, hero and footer, and a note (`500:1737`) recording the copy states and review flag. Screenshots of each section were compared with the website at 1440.

**Checks run (this pass):** `bun run check` (0 errors or warnings; 50 hints, from untracked build output), `bun run build` (27 pages), `check:copy` (182/182, with the new footer node), `bun test tests/copy-check.test.ts` (5/5), `check:links` (27 pages, 2,048 destinations), `check:budgets` (exit 0; `/brand/` CSS 10,155 B and JS 4,301 B gzip), `check:launch` (blocked by 84 items, as expected; the two new ones are the brand review flag and checklist item), and the full Playwright suite against the production build with system Chromium, 78/78 (1 new: the footer link reaches `/brand/`, all 27 downloads return 200, the Green copy button writes `#2AE7A8` and announces it, and there is no horizontal overflow at 1024, 768, 390 and 360 px; `/brand/` also passes the route and axe test). The page was captured at 1440, 1280, 1024, 768, 390 and 360 px with no page overflow and no console errors; the copy button's denied-clipboard path was checked in the app's browser pane. The run rewrote `artifacts/qa`, which was restored. Not checked: no-JavaScript and forced-colours rendering by eye, keyboard pass beyond the automated axe run, Lighthouse, other browsers. Figma motion: none to record.

## Why Augur heading and answer band — 18 October 2026 (Claude, website first)

From Augus's notes, the owner renamed section 04 and set its band. The heading “Who decides what happened?” becomes “Why Augur”, and the band “With Augur, no party controls the answer.” becomes “With Augur, users don't rely on parties to control answers.” The lead, the three tenet tiles and the ribbon sweep are unchanged. `AGENTS.md`, the three band assertions in `tests/site.spec.mjs` and the two band probes in `tests/copy-check.test.ts` now quote the new line. `homepage-copy-source.json` still holds the Figma text, so `check:copy` reports the two nodes (`239:478`, `240:432`) until Figma is synced; both are on the Pending Figma sync list. Not changed: the Learn article `what-is-an-oracle.md` still opens with the old band line.

## Announcement dismiss — 18 October 2026 (Claude, website first)

The owner asked for a small, subtle way to close the announcement bar. A 12 px Phosphor `x` in muted text at 70% opacity sits in a 32 px target; its ink lines up with the header's right edge and with the cap-height centre of the bar's text line (measured at 1440). Dismissal is stored in `localStorage` under the announcement's `id` (`site.ts`), so a new announcement shows again. An inline script (CSP-hashed in `BaseLayout.astro`) removes a dismissed bar before first paint and reveals the button only when JavaScript runs. Closing slides the header and page up over the fading bar (transform and opacity, 320 ms), or the bar simply goes with reduced motion. Focus moves to the header's first link. `--announcement-height` (`tokens.css`) keeps the hero and contact layouts filling the first screen with or without the bar. Below 900 px the bar takes its stacked layout so the message never runs under the ×. Not yet run: build, tests, keyboard and no-JavaScript checks.

## Why Augur cards — 18 October 2026 (Claude, website first, draft copy)

From the owner's references (folder-tab cards) and Augus's notes. Each tenet is a folder card. Its tab's edge steps down in three 12 px squares (tread = riser), echoing the ribbon edge's staircase, and is never a diagonal. The fill is an aria-hidden layer behind the content, so the clip never cuts text or glows. The tab is a fixed 184 px (168 px on phones), just past the longest label, so the three notches share one rhythm. The tab carries the tenet name (the card's `h3`) with the 6 px Green square, with no numbers. The live diagram fills the top. A hairline separates the copy: a two-line claim in Paper, the body in muted text, and a foot row of chips naming what the tenet removes, each crossed out by a 1 px Green border centred on the x-height (measured: 14 px into the chip). Without JavaScript, with reduced motion, in print, or once seen, the chips are simply struck. On the first visit in a session, a line draws through each chip in turn as its row comes fully on screen, and the label dims (`strikeTimeline`: 150 ms after the row is fully visible, 300 ms pen-like draw, 80 ms between chips and 100 ms between cards, label to 60% from the halfway point; transform and opacity only). Screen readers hear "Not needed:" before the list. The cards have no hover state, because they are not links. A closer panel under the cards holds Augus's two readers, so no text floats. It is one tile on a subgrid of the card columns with no gap of its own: cell edges fall in the middle of the card gutters, and each cell's text starts on its card's text edge. Cell one is a shade darker and states it for both (“The answer is nobody’s call.”), centred top to bottom and kept on the card text edge. Cells two and three each give one reader one line: “For traders” (“No operator can rule on your market.”) and “For integrators” (“Disputes go to Augur Lituus, not to your team.”; this replaced “…or to answer for”, which read as a liability guarantee). The owner removed the links, so the panel has no hover and stays compact (136 px at 1440). The copy avoids “trust” (Augus) and “the app” (too broad). The tenet name “Trustless” still contains “trust” and needs a decision (the whitepaper's term is “bribery-resistant”). At tablet width each card puts the diagram beside the copy under the shared tab; on phones they stack.

**Draft copy awaiting approval:** the claims ("Any app can ask. / Anyone can answer."; "No one in charge. / No one to lean on."; "Money behind every answer. / Lying is built to lose."), the chips (Whitelist, Sign-up, Approval; Committee, Multisig, Veto; Promises, Good faith, Say-so), the reworded bodies (same facts, no longer repeating the claim or chips) and the closer. `check:copy` will report these until Figma is synced.

## Why Augur heading row — 18 October 2026 (Claude, website first)

The owner found "Why Augur" too light for the heading row and its "Augur" repetitive with the band. Measured at 1440: the 40 px heading filled 221 px of its 494 px column beside a two-line lead, and the band's 36 px line read as a second headline whose "Augur" sat 4 px from the heading's, directly below it. The problem sentence is now the heading ("Smart contracts / can't see the world.", two lines like the other two-line headings). The lead keeps the second sentence, reworded by the owner to end "…controls who gets paid." The band, unchanged, answers it, so "Augur" appears once above the cards. "Why Augur" stays as the section's accessible name (`aria-label`) and anchor (`#why-augur`). The blog post and the Learn article keep "controls the money".

Review fixes (owner-approved, 18 October 2026): the Decentralized claim now ends "No one to pressure.". The Permissionless body is "Reporting or challenging an answer takes a bond, not permission. Fees apply." (it no longer says "open to all" three ways). The integrator line names Augur Lituus without implying legal cover; the owner then chose “Focus on building. Leave resolution to Augur Lituus.” (outsourcing and focus, with “not the judge” implied). The band balances its lines, so 768 px no longer leaves "answers." alone (two lines of 358 and 388 px). (The first attempt looked as if it failed only because the dev server was serving stale component CSS; touching the file refreshes it.) "Trustless" stays for now.
The owner then chose the trader line "No central authority and no dominant holder decides payouts. The outcome does.", then swapped "dominant holder" for "whale" ("No central authority and no whale decides payouts. The outcome does."). It is formal and alludes to recent disputes where token-weighted votes flipped results, without naming anyone. "Dominant holder" is the formal word for a whale. It is true to the design: disputes escalate through bonds to a fork, where each holder chooses only for themselves. The singular "decides" follows the "no … and no …" construction.

Card copy pass (owner-approved, 18 October 2026). The third tenet is now **Bribery-resistant**, the whitepaper's term. That settles the launch-checklist question and removes "trust" from the section (Augus). Bodies: Permissionless "Answering takes a bond, not permission." (the "asking takes a fee" version waits on a whitepaper check). Decentralized "Answers come from open reporting and challenges. A dispute that never settles ends in a fork." (no longer repeats the chips, and says when a fork happens). Bribery-resistant "Forcing a false answer is designed to cost more than it could gain." (no longer repeats the claim). The tab widens to 200 px (184 px on phones), and the longest label ends 29 px (21 px) before the notch. The integrator line becomes "Focus on building and growing your platform. Leave resolution to Augur Lituus.", so both closer lines run to three balanced lines at 1440.

Emphasis (owner, 18 October 2026): every claim and closer line is a setup and a payoff. The setup is muted and the payoff is in Paper, so the eye lands on what changes. Cards: "Any app can ask." / **"Anyone can answer."**, and so on. Closer: the payoff gets its own line, so at 1440 both reader cells read as two muted lines and one bright line ("The outcome does."; "Leave resolution to Augur Lituus."). This uses no Green and no underline: Green stays rare, and an underline would read as a link.
Reader labels ("For traders", "For integrators") now match the card tab labels: Sora 600 14/20, letter-spacing .01em, Paper, with the 6 px Green square. They are 10 px above the line. In muted text they had matched the setup lines below them and read as their first words; in Paper they read as labels again.

Plain-language pass (owner, 18 October 2026). The card bodies and chips avoid technical terms and lead with the benefit. Permissionless: "Ask, answer or push back. No one has to let you in." (chips: Approval, Gatekeepers, Sign-ups). Decentralized: "Answers come from people with something to lose, not from a back room." (chips: Committees, Insiders, Vetoes). Bribery-resistant: "Paying for a false answer is designed to cost more than it brings in." The titles keep the category's own words. The facts are unchanged: "people with something to lose" means bonded reporters, and "push back" means challenging. The owner ruled out trading language in Augur's own voice ("losing trade"), so it doesn't suggest Augur runs markets. On phones the chips tighten (8 px padding, 6 px gap) so each row stays on one line at 360 px.

Chips removed (owner asked, Claude decided, 19 October 2026). Each card was saying the same thing three times: the claim, the body and then the chips ("No one has to let you in." followed by Approval, Gatekeepers, Sign-ups). The Bribery-resistant chips didn't match the tenet: striking out "Good faith" can read as being against good faith, and none of the three is about bribery. Struck-through labels at 60% were the hardest text on the card to read, and to a beginner they look like disabled filters. They were also still unapproved draft copy. Each card now ends on its body: 12 px under the claim, with the card's 32 px foot padding below. The strike wave (`strikeTimeline`) and its once-per-session play are gone with them. The Figma pending item no longer asks for chips.

## What could you build? builder's case — 18 October 2026 (Claude, website first, draft copy)

Augus's notes ask this section to make the business case: why a team would hand resolution to Augur Lituus. The examples already showed the range, but nothing gave a builder a reason. The owner had this row slimmed on 6 Oct, when a 112 px "backstop" band read as Augur Lituus's only use. Its "Augur Lituus | One oracle for every app." line now opens a compact panel (147 px at 1440): a darker identity cell, then three reasons, each a Paper title over one muted line, split by hairlines. "Nothing to staff." No one to hire to settle outcomes; Augur Lituus does it in the open. "Never the judge." When an outcome is disputed, it isn't your call to make or defend. "Easy to verify." Users can check how each outcome was settled, and that it wasn't up to you. The copy avoids "trust", "backstop", legal promises and cost claims, and it doesn't repeat the Why Augur integrator line word for word. The connectors still land on the panel, and the whole panel brightens when a signal arrives. Below 1024 px it stacks. `tests/site.spec.mjs` now checks the identity line, the three titles and a height of 160 px or less, not the old 64 px slim line.

## What could you build? explorer — 18 October 2026 (Claude, website first)

Augus asked to make it clear the examples open. The audit at 1440 found three problems. The only cue was a 32 px outlined "+" about 200 px below each title: a weak signifier (NN/g), ambiguous between "add" and "expand", and away from its label. Feedback showed only on hover. The two closed cards were 217 × 384 px of mostly empty surface. Rebuilt as an explorer on the page's 500 / 80 / 668 heading grid:
- **The list** (left): three rows, each a surface with the icon tile, name, quoted question and a chevron pointing at the stage. Hover (fine pointers) lightens the row and nudges the chevron 3 px. The selected row takes the tile fill and its Green icon tile (the owner's 6 Oct marker, never a side edge), and its chevron gives way to a 2 px Green line that draws across the gutter into the stage (CSS `scaleX`, 240 ms). The three rows fill exactly the stage's 384 px height.
- **The stage** (right): fixed. The chosen example's story (action and explanation) sits bottom-left, its result in a 340 px column. The question is no longer repeated in the stage, because the row shows it. The examples' plays are unchanged.
- **The connector**: one, from the stage down to the Augur Lituus panel. The signal runs down it after each play, and the panel brightens.
- **Below 1024 px** the list stacks above the stage and the chevrons turn to point down at it. The gutter line and the connector go. Below 600 px the rows drop their question.
Nothing changes width on selection, so the FLIP layout script (`application-layout.ts`) is deleted, and `sendSignal` targets the single connector. The tabs controller is unchanged (vertical `aria-orientation`; arrow keys, Home/End, manual activation). The insurance layout test now checks that the story sits clear of its row and that only the selected row's line is drawn.

## What could you build? use-case picker — 18 October 2026 (Claude, website first)

This supersedes the explorer above and a short-lived "Prediction markets feature" version. The owner asked for one case at a time, picked by the reader, alive, with colour and big text, and Prediction markets first. Research: tabs beside one stage (Chainlink's use cases) read clearly but look boxy. Oversized-type lists that swap one preview (a common portfolio and agency pattern, with tap and keyboard fallbacks) are the expressive form. Long scroll sequences (Linear) cost length. Auto-rotating carousels are out (NN/g; WCAG 2.2.2).

Build, on the 500 / 80 / 668 heading grid:
- **Picker:** the three cases are a vertical tablist set in large Sora (clamp 28–40 px), split by hairlines, with no boxes. Unpicked names are Mist; hover lightens them. The picked name turns Paper, its icon tile fills Green (owner, 6 Oct) and a 2 px Green line draws across the gutter into the stage.
- **Stage:** the brand's deep Green (`accent-deep` #095E42, new website tokens `--web-stage` and `--web-stage-muted` using `accent-wash`), the first use of brand colour beyond Green fills. Every case has the same Navy query card (label, question at 20–24 px, the four stages with its own "Reported …", outcomes; grants has Team A/B/C). Under it, the action: a Green line and "Settle a market. / Pay insurance claims. / Award a grant." with the approved explanation. Insurance keeps the fallback footnote. Unpicked cases stay laid out but invisible, so the stage keeps the tallest case's height (498 px at 1440) and nothing moves when the reader picks another.
- **Motion:** Prediction markets plays once in view (playOnce). Every case plays when picked: the query runs from asked to final (`market-query.ts`), then the action line draws and its words rise (`applicationTimeline`).
- **Below 1024 px** the list sits above the stage (names 24–28 px), and the line goes.
- **Builder's case:** the panel follows, 48 px below.

Data: `applications.ts` gives each case its outcomes and answer, and `queryStages(answer)` replaces `marketQuery`. The flight and prize widgets and their plays are gone. The tests cover the query play for two cases, the picker (one panel visible, steady stage height, Green icon tile, deep Green stage, link line) and the panel. They were not run: Playwright can't drive a browser under Windows Bun here.

Use-case stage, second pass (owner, 18 Oct 2026). The owner noted that the query looks the same for every case, and asked to remove the deep Green stage. Asking and answering is the same for every case, because it is one oracle, so it stays one compact Navy card labelled "Augur Lituus" (Green square). A short Green line then carries the answer down into the case's own app box, and that box is where the cases differ:
- **Prediction markets** ("Market result"): Yes positions turn from open to Paid out (Green, with a check), and No positions close.
- **Insurance** ("Flight-delay insurance"): the owner's 6 Oct flight scale returns. The arrival slides past +2 hours, and the fallback note now sits inside this box.
- **DAOs & grants** ("Prize challenge"): a payout line draws from "Prize pool" to the winning team, which turns Green. The team tiles moved out because the answer card already shows the teams.
The action ("Settle a market." …) follows last. The stage is the site's tile again; the `accent-deep` and `accent-wash` stage tokens are removed. The stage keeps one height for every case: 595 px at 1440, 723 px at 390. Plays: `playPositions` (new), `playFlight` (restored), `playPayout` (replaces `playPrize`) with `positionsTimeline` and `payoutTimeline`; `applicationTimeline.flow` times the answer line.

Polish pass (owner asked for Impeccable's /polish, which isn't installed here; its published checklist was followed by hand, 18 Oct 2026). Measured at 1440: the big names' capitals centred 5 px above their icon and link line, so each name now sits .12em lower (now within 1 px). "Insurance & payments" wrapped at 1024, so names now size `clamp(26px, 3.6vw − 12px, 40px)` and stay on one line from 1024 up. The two box titles are one style: Sora 600 13, Paper, with a Green square for Augur Lituus and a Mist square for the app. Spacing is snapped to the 4 px scale (16 under the query head, 12 under the app title and above the fallback, 16 px side padding in the position and payout tiles). Unpicked rows get a pressed state: the icon tile scales to .94 over 120 ms. Checked and unchanged: list and stage share one vertical centre; the link spans exactly from the row edge to the stage edge; the answer line and both boxes' content share one left edge; unpicked names are 4.06:1 (large text); no dead CSS; no console output or TODOs.

## What could you build? question → action — 18 October 2026 (Claude, website first)

This supersedes the use-case picker above, its second pass and its polish pass. The owner found the picker noisy, its signal weak and its space empty. Its query card (status chip, Asked → Reported → Not challenged → Final, outcome chips) repeated How it works, the next section, which explains asking, reporting, challenging and the final answer with its own query card. The picker was also How it works' layout: a vertical list on the left, a card on the right, a Green line between. The owner chose this direction from two sketches (the other showed each case as the builder's own product card).

Research: UMA's builder section puts horizontal tabs over one panel and makes a real question, quoted, the proof. Chainlink's tabs open case studies, which we can't use because we have no partners to name. Stripe pairs a bold line with a muted continuation and shows one product fragment per solution, not a diagram. NN/g's tab guidance asks that the selected tab visibly join its panel. No auto-rotation (NN/g on carousels; WCAG 2.2.2).

Build:
- **Tabs** run across the top, three equal cells with the icon tile and the name (Sora 400, 18–24 px, one line from 1024 up). The picked tab takes the stage's surface, so tab and stage read as one object, and its icon tile fills Green (owner, 6 Oct). Unpicked tabs are Pewter on Navy and lift to Dark 1 on hover. Keyboard focus is an inset ring. Below 768 the tabs stack into rows. The shared tabs controller is unchanged: arrows, Home/End, manual activation.
- **Stage**: each case is one sentence. The question is in large Sora, with hung Mist quotation marks. It is 44 px at 1440 and scales with the viewport, so the longest question (1,112 px at 44) stays on one line from 1024 up; it is 32 px below 1024 and 26 on phones. An earlier pass at 48 px in two lines left the stage’s top-right quadrant empty, and one line makes each case a two-line sentence. Under it: "Augur Lituus answers" and a Green answer chip with a check, then a 2 px Green line across the gutter to the action ("Settle a market.", Sora 600 36/44, Statement size, Green: it answers the section's own question), then the approved explanation. The stage uses the heading row's 500 / 80 / 668 columns, so the action starts exactly under the lead "Your app decides what happens next." (measured at 1440). Insurance keeps the fallback note, now under the answer and up to 480 px wide (two lines), because it qualifies when Augur Lituus is asked. Every case stays laid out in one cell. From 1024 up the stage keeps the tallest case's height (305 px at 1440, 295 at 1280, 299 at 1024), and the content is top-aligned, so the question and the line stay put when the reader switches cases. Below 1024 the stacked cases differ by up to 150 px, so the stage fits the case shown (owner's copy pass, 19 Oct: Prediction markets at 390 is 348 px; a reserved height had left a 150 px empty band). Below 1024 the sentence stacks, and the line becomes a 24 px drop from the chip to the action.
- **Builder's case** stays below and outside the tabs, because inside the stage it would read as one case's reasons. It is open rather than tiled, since the Why Augur closer above is already a tiled panel. It sits on the same grid: "Augur Lituus" over the muted "One oracle for every app." (24/32), then the three reasons as rows of a title and a line, split by hairlines. Copy is unchanged.
- **Motion** (`applicationTimeline`): when a case shows, the chip pops in at 200 ms (320, overshoot) and its check follows 120 ms later. The line draws from 420 ms over 480 (draw easing; vertical on narrow screens). The action, its explanation and any note rise 6 px from 780 ms, 80 apart, over 320. Prediction markets plays once at 60% in view (playOnce: never on a reload or a seen return), and every case plays when picked. Reduced motion, no JavaScript and print show the final sentence.
- **Removed**: `market-query.ts`, `application-plays.ts`, `queryStages`, the outcome lists, the app boxes (positions, flight scale, payout), the gutter link line, the answer-flow line and their timelines. The old Prediction markets view had nine Green elements (icon tile, link line, status chip, Final stage bar, Yes chip, oracle label square, answer line, Paid out row, action line). The new one has four, for three jobs: the picked tab, the answer, and the line and action it leads to.
- **Section height** at 1440 is 889 px (was 1,046).
- **Finish review** (Impeccable finish reviewer, fresh context, screenshots at 1440, 1024, 768 and 390; disposition fix). Applied: the action went from 32 px to the Statement size; content went from centred to top-aligned (it had moved about 14 px between cases). Kept: the `scales` icon on the fallback note (owner's 6 Oct choice; the reviewer read it as clashing with "Never the judge.", but it marks the dispute the note names), and equal tabs (a wider Prediction markets tab would read as a layout fault; its emphasis is going first, opening by default and being the only case that plays on arrival). Raised with the owner, not changed (approved copy): the Prediction markets question reads like a grant milestone; two explanations repeat their actions ("Settle a market." / "Settle positions on the final answer.", "Pay insurance claims." / "Pay claims according to the policy."); and the fallback opens with "The app", the broad wording Augus asked to avoid.

New copy awaiting approval: the label "Augur Lituus answers" (it follows the approved lead). Checked with `bun --bun astro check` (0 errors) and the Impeccable detector (no findings). Reviewed in the browser at 1440, 1280, 1024, 768, 390 and 360 with no horizontal overflow, keyboard tabs (arrows, Enter, End) and no console errors. Not run: Playwright (it can't drive a browser under Windows Bun here; `tests/site.spec.mjs` is updated for the new markup), reduced-motion emulation, forced colours, `check:copy` (its Figma source still predates this section) and the build.

## What could you build? copy — 19 October 2026 (owner approved, website first)

The finish review found four weak lines in the approved copy. They went to Augus as proposals in the handoff doc ("05 copy proposals for Augus"), and the owner approved them ("lgtm… do the best"):
- **Prediction markets question:** "Did the rocket reach orbit on its first try?" (was "Was the milestone demonstrated by the deadline?", which read as a grant milestone). The doc's alternative was taken over "Did the home team win the final?", so "team" appears only in DAOs & grants, and a launch reads as a question about the world without a sports-betting feel. It is 901 px at 44 px, on one line from 1024 up.
- **Prediction markets explanation:** "Pay out the Yes side and close the No side." (was "Settle positions on the final answer.", which repeated the action).
- **Insurance explanation:** "Pay every policyholder on that flight automatically." (was "Pay claims according to the policy.").
- **Fallback note:** opens "An insurance app could also use…" (was "The app…", the broad wording Augus asked to avoid). The maintainers still need to confirm chain and L2 support.
- **Label:** "Augur Lituus answers" approved with them.

`applications.ts`, `tests/site.spec.mjs` and `launch-checklist.md` follow. The longer Insurance explanation made every stacked case reserve Insurance's height, so below 1024 the stage now fits the case shown, and the line's draw direction reads the 1024 media query instead of measuring a hidden case. `homepage-copy-source.json` still holds Figma's old lines until Figma is synced and re-extracted.

## Reader-neutral copy — 19 October 2026 (owner)

The owner noted that most readers are traders and beginners, so "your app" misreads across the whole site: a trader has no app. The rule (now in `AGENTS.md`): never assume the reader owns an app or project. Name it, or scope the line to builders with an explicit cue. "You" for any reader stays ("No one has to let you in", "If you hold REP").

Changed:
- **Homepage, What could you build? lead:** "Your app decides what happens next." → "The app that asked decides what happens next." The stage's sentence follows the same order: an app asks, Augur Lituus answers, that app acts.
- **Builder's case:** "it isn't your call to make or defend" → "it isn't the project's call…"; "and that it wasn't up to you" → "and that the project didn't decide it" (house rule: projects, not teams). The list's accessible name is now "Why projects choose it".
- **Footer contact line** (every page): "Tell us what your application needs, ask about the protocol, or share feedback." → "Ask about the protocol or share feedback. Building on it? Tell us what your project needs." This also removes a rule of three.
- **Products diagram:** the "Your app" role and its text equivalent → "Any app".
- **Contact page:** the description, lead, message intro and message placeholder now invite any question first and scope the project ask ("If you're building on it, tell us what your project needs to resolve.").
- **FAQ "How do I talk to the team about a project?":** "your application" → "your project". The question already scopes it.

Kept, because they are already scoped: the Why Augur closer's "For integrators" line ("…growing your platform."), the "For builders" guides, and the Contact form's optional "Company / project" field. Also kept: the H2 "What could you build?" (the owner asked to keep the heading). It was the one remaining builder-first line on the homepage, and it changed later the same day (next entry).

Checked: `astro check` (0 errors); screenshots of the section, footer, Products diagram and Contact at 1440 and 390. No test asserts these strings. `check:copy` still compares against Figma's old text.

## "What can Augur Lituus power?" — 19 October 2026 (owner)

The section heading "What could you build?" addressed the reader as a builder, against the new traders-first rule. The owner liked "What could run on Augur Lituus?" and asked for the best wording:
- **"can"**: it says what Augur Lituus supports and matches approved copy ("Any app can ask."). "Could" read as a hedge, "runs" would claim live apps (Augur Lituus is in development), and "will run" would promise something unshipped (house rule 4).
- **"power"**: apps run on a chain and get their answers from Augur Lituus. "Run on" would make the oracle sound like a chain, a claim the Products page already guards against ("It doesn't imply that Augur Lituus runs on Zoltar").
- **The tabs answer it:** Prediction markets, Insurance & payments, DAOs & grants.

The name carries a no-break space and the heading is balanced. It reads "What can" / "Augur Lituus power?" at 1440, 1280, 1024, 390 and 360, and on one line at 768 (measured). The dev server had served a stale style module for this component until the file was touched; the production build always carried the rule.

## One mention of Augur Lituus per section — 19 October 2026 (owner)

With the name in the new heading, the default view of the section said "Augur Lituus" five times: the heading, the lead, the stage label, the builder's case title and a builder line. The owner flagged it. The heading now carries the name, and the rest leans on it:
- Lead: "It answers real-world questions." / "The app that asked decides what happens next."
- Stage label: "Answer" [Yes ✓] (was "Augur Lituus answers").
- Builder's case: the identity cell is only "One oracle for every app." The first reason reads "No one to hire to settle outcomes. They're settled in the open."
- Kept: the Insurance note ("…turn to Augur Lituus only when a claim is disputed."), where the name must be explicit because the note compares two oracles, and the reasons list's screen-reader name ("Why projects choose Augur Lituus"), which needs its own antecedent.

Measured: one visible mention on the default view at 1440. A test now counts it. Also fixed: the phone size for the builder's case title (20/28) had been set on the container, so it never applied.

## What can Augur Lituus power? lead — 19 October 2026 (owner)

The owner asked for a rewrite of "It answers real-world questions. / The app that asked decides what happens next." The "It" had no clear subject, and "the app that asked" was clunky. The lead now answers the heading:
- "Apps that pay out on real-world outcomes." It fits every tab: a market pays the Yes side, insurance pays claims, a grant pays the prize.
- "Each one asks a question and acts on the answer." It sets up the stage (question, answer, action) without repeating the name or assuming the reader runs an app.

House rules checked: no "you", no rule of three, no negative parallelism, no em dash. The AGENTS.md example for naming the app now reads "apps that pay out".

Second pass the same day (owner: "u can improve it"). The first rewrite described the mechanics but gave a trader no reason to care. The lead is now "Any app that pays out on what happens in the real world." / "It asks a question, and the answer decides who gets paid." "What happens in the real world" is plainer than "real-world outcomes", and "Any app" matches the tenet "Any app can ask." The second line answers the Why Augur lead ("Whoever tells them what happened controls who gets paid."): here the answer decides, not a party. It is two lines at 1440 and 1280 and four at 1024 and 390 (measured), with no overflow.

Third pass (owner: too much "pays out" and "who gets paid"; Augur Lituus is more than payouts). It is an oracle: it tells apps what happened, and paying is only one thing an app can do next. The lead is now "Any app that needs to know what happened in the world." / "It asks a question, and the answer decides what comes next." The first line echoes the Why Augur heading ("Smart contracts can't see the world."), and "decides what comes next" brings back the idea of the original approved lead. Both lines hold one line each at 1440 and 1280 (580 and 618 px in a 623 px column at 1280, measured).

Fourth pass (owner disliked "the answer decides"). The answer doesn't decide anything; the app does, using the answer. The second line is now "It asks a question and acts on the answer.", which mirrors the stage step for step (the quoted question, the answer chip, the action) and leaves what the app does open. It is shorter than the line it replaced, so it fits at every width.

## Builder's case next step — 19 October 2026 (Claude, owner asked for improvements)

A fresh look at the section found that the builder's case made the pitch to projects, then left them with nothing to do. It also had about 170 px of empty column under its title at 1440, and no cue that it was meant for projects, which the traders-first rule asks for. The empty column now holds the next step: "Building on it? Tell us which questions your project needs answered." and the header's Outline "Talk to us" button (/contact/). The question scopes the block to projects, and the button gives builders a way in. The wording differs from the footer's "Building on it? Tell us what your project needs." On phones the reasons come first and the next step follows them, so the case is made before the ask. The first reason no longer repeats itself: "No one to hire to decide outcomes. They're reported and challenged in the open." (was "…settle outcomes. They're settled in the open."). Section height at 1440 is now 967 px.

Raised, not changed: all three examples end in money ("Pay out…", "Pay every…", "Award a grant"), while the lead now says Augur Lituus serves any app that needs to know what happened. Proposed: "DAOs & grants" becomes "DAOs & governance", with "What did the upgrade's safety review conclude?" (1,058 px at 44, one line), the answer "Needs changes", the action "Hold the upgrade." and "The proposal goes live once a later review comes back Safe." It keeps a multiple-choice answer, and it shows an answer stopping an action rather than paying one.

Owner approved the governance swap. "DAOs & grants" is now "DAOs & governance": "What did the upgrade's safety review conclude?", answer "Needs changes", "Hold the upgrade.", "The proposal goes live once a later review comes back Safe." The panel id is `application-panel-governance` and the tests follow. The owner then asked to open the builder's next step to everyone while keeping builders first: "Building on it, or just curious? Ask the team anything."

Builder's case title (owner: "One oracle for every app." didn't fit with "Talk to us"). The slogan repeated the lead's "Any app…" and said nothing about the block below it, which is about projects. The title is now "Why projects build on it": it marks the block as being for projects (traders-first rule), the three reasons answer its "why", and "build on it" leads into the next step's "Building on it, or just curious?". The reasons list now takes its accessible name from the title (`aria-labelledby`), replacing the separate "Why projects choose Augur Lituus".

## Builder's case ledger and stage hierarchy — 19 October 2026 (owner: "full rewrite", "the size is weird, the focus is weird")

**Builder's case.** The block read like terms and conditions: a 24 px title and a button stranded in an empty column, three 16 px grey rows in a small table, and orphaned wraps. It is now a ledger at display scale on the section's own grid, so the section ends on one system (heading | lead, question | action, claim | reason). Under the title "Why projects build on it" (32/40), each reason is a ruled row: the claim in the 500 column (Sora 600 24/32 Paper) and a plain line in the 668 column (18/28 Pewter), first baselines aligned. The ask is the last row in the same shape: "Building on it, or just curious?" | "Ask the team anything." with the Outline "Talk to us" at the column's right end. Below 1024 each row stacks. The rules draw left to right once in view (`builderTimeline`). The text never hides, and forced colours draw the rules in CanvasText. Copy is tightened to one line each at 1440: "No resolution desk to hire. Outcomes are reported and challenged in the open."; "A disputed outcome isn't the project's call to make or defend."; "Users can check how every outcome was settled."
Bug fixed: `--case-gap` was defined on the stage's container only, so above 1200 px the builder's case had no column gap, and its reasons started at x 630 instead of under the lead at 676. The variable now lives on the section, and a test checks the reasons' x against the lead's.

**Stage hierarchy.** The answer, the one thing Augur Lituus provides, was the smallest element in the sentence: a 40 px chip with 18 px text between a 44 px question and a 36 px action. Green was also split between the chip and the action title. The chip is now 56 px tall with 28 px text, and "Answer" captions it from above (14/20), so the chip, the Green line and the action share one centre line. The action title is Paper, so Green marks only the answer and its path. Checked: "Needs changes" fits at 1024 with the line clear of the action; no overflow at 1280, 1024, 768 or 360; no console errors; detector clean; `astro check` clean. Section height at 1440 is 1,153 px.

## What can Augur Lituus power? background and cursor trail — 19 October 2026 (owner: "the navy is weird", "add a thing that follows the cursor … green and navy squares")

Pushed back on a literal cursor follower (an object chasing the pointer). It reads as a gimmick, can hide what is under it, and costs frames. The brand's own pointer language is the hero's heritage field.
- **Field:** a static `HeritageField` (seed 2027, 1440 × 1152) behind the section. Its 3 px squares sit on a 40 px grid and are densest at the top, the bottom and the side margins, so they frame the content rather than sit behind the text. About a quarter are Green. Sized 1:1 at 1440 and `slice`-scaled elsewhere.
- **Trail (`square-trail.ts`):** on fine pointers, the pointer snaps to the field's own grid through the SVG's screen matrix, so lit squares land on the marks at any width. Each new cell takes the next of 28 pooled 8 px HTML squares (the status-mark size), every third Green. A square grows from 0.4 to full scale and fades over 900 ms. It is compositor-only (transform and opacity, at most one rAF per frame). It sits under the content, so squares show on Navy and vanish under tiles. It is off for touch, reduced motion and print, and idle while off-screen or hidden. Checked in headless Edge with real mouse moves: 20 of the 28 squares were animating mid-sweep, with no errors. Not measured: main-thread cost over a long sweep.
- **SEDA research (seda.xyz):** each use-case card carries one small live graphic of what the product does (an area chart with a scanning band, filling bars, signals resolving into YES/NO/PENDING, a curve to IPO). Four sketches were shown to the owner in chat, not built: a market settling (Yes to 1.00), a flight passing +2 hours with policies lighting up, an upgrade held at a gate, and, for How it works, many reports gathering into one answer.

## Case graphics and a sitewide cursor trail — 19 October 2026 (owner)

**Case graphics.** The owner asked to build the three SEDA-style sketches into the stage, then rejected the first placement (under the action's explanation): "figure out the right space … do not put them anywhere". Each graphic is now a band at the stage's foot on the stage's own columns (`grid-template-columns: subgrid`), read left to right like the sentence above it. Left of the gutter is the world: prices moving, a flight running late, a proposal walking up. In the middle of the gutter, right under the gap between the answer chip and the action, the answer lands: the price jump, +2 hours, the review gate. Right of the gutter is what the app does: "Yes side paid" and "No side closed", "Policies paid", the dashed way on to "Live". Green marks only where the answer acts. The note row takes the stage's slack, so the band sits at the same foot in every case. Below 1024 the band is one column, and what the app does follows underneath. `CaseGraphic.astro` renders the final state (no JavaScript, reduced motion and print), and `case-graphics.ts` plays it 900 ms after a case shows, transform and opacity only: a tile-coloured cover slides off the market lines, a run slides its own width under the flight and the proposal, and squares pop. Decorative (`aria-hidden`), because the sentence says it. Labels are new copy, flagged in the launch checklist. Checked: renders at 1440, 1024 and 390; the gutter split falls between the chip and the action at 1440 and 1024. The dev server served stale component CSS twice and needed the file touched; the production build was rebuilt.

**Sitewide trail.** The owner asked for the cursor squares across the site, "or at least where it makes sense". One layer (`[data-page-trail]`, BaseLayout) sits under all content. The body's Navy now lives on the root alone, so the layer shows through open Navy, and bands (How it works, FAQ), tiles and text cover it. Inside a `[data-trail-root]` with a heritage field (this section, the footer's contact band, page heroes), squares snap to that field's grid; elsewhere they snap to a page-wide 40 px grid. The hero keeps its own lens and is skipped. The script is one small module in BaseLayout. `check:budgets` passed after adding it.

## One sitewide field, drawn in empty space — 19 October 2026 (owner: "homogenous across all website, even the different backgrounds, except areas where there is text or stuff … subtle")

This supersedes the section-only field and the under-content trail logged above. A single layer (`[data-page-field]`, BaseLayout, `page-field.ts`) sits above the page and draws 3 px squares on a page-wide 40 px grid, only in cells that touch nothing. Each redraw measures every text run (Range client rects) and every object: images, SVG art, canvas, controls, and any box with its own background or visible border. Each gets a 12 px margin. Full-width bands darker than luminance 0.06 count as background, so the field shows on Navy and on the darker bands (How it works, FAQ) alike, while light or Green bands and the hero, header and announcement stay clear. The pattern is a hash of each cell, so a redraw after a size change (debounced 200 ms, ResizeObserver on the body, and after fonts load) only moves squares where content moved. The squares are drawn as eight paths (two colours, four opacity steps), and the layer is static between redraws. Subtle by request: about 22% of empty cells filled, 5–12% Paper and 12–26% Green opacity.
The cursor trail now uses the same grid and the same empty cells, so it never lands on text: 5 px squares, every third Green, peaking at 0.22 Paper / 0.5 Green over 800 ms, transform and opacity only, fine pointers only, off under reduced motion and in print. Forced colours hide the layer. The separate fields in this section, the footer's contact band and the page heroes are removed so the density matches everywhere. The hero keeps its own field and lens.
Checked in headless Edge with real mouse moves: 10 of 24 trail squares lit mid-sweep, with no errors. The field showed in empty space on Navy, on the How it works band and in the footer, and not on text. `astro check`, the build and `check:budgets` all pass. Not measured: how long a redraw takes on a slow machine, since it walks every element once.

**Why Augur folder line.** The owner asked for "a tiny green line or border" on the tenet cards to "make stuff more fancy", then "subtle". A 1 px Green line traces each card's top silhouette (the tab, its three 12 px steps and the card's top edge), drawn 1 px inside the fill as a second clip-path layer, at 35% opacity. It is static, and forced colours hide it (the card keeps its CanvasText border). Held back: the same line on the use-case tabs, because the owner rejected a one-sided Green edge on the open case on 6 Oct.

The owner then asked for the same line on the Why Augur closer panel. It runs along the panel's top edge, 1 px inside, at 35% (`.tenet-closer::before`), so the three cards and their closer read as one set. Forced colours hide it.

## Why Augur closer, For traders — 19 October 2026 (owner: "the outcome does" is weird)

"No central authority and no whale decides payouts. / The outcome does." was circular, because the outcome is the thing being settled, so it can't decide it. It was also a negative setup flipped by a short punchline, an AI-writing tell under the house rules. The line is now "Payouts follow what actually happened, / with no authority or whale in between.", the same claim stated positively. The setup stays muted and the payoff stays in Paper, so the emphasis lands on the trader's benefit: no one in the middle.

The owner then dropped the whale angle ("no authority in charge of deciding alone"). The payoff is now "with no authority deciding alone." "Alone" keeps the point that outcomes are decided, just never by one party.

## Answer options in the stage — 19 October 2026 (owner: "some animation like picking between yes or no … showing the process")

Pushed back on showing the full process: reporting, challenges and bonds are How it works, directly below, and re-explaining them was this section's original fault. Also declined: a spinning or flipping answer, which reads as a slot machine (chance, betting), the opposite of what an oracle should signal. Built instead: the moment of picking. The small "Answer" caption above each chip becomes the answers the question allows ("Yes / No / Invalid"; "Safe / Needs changes / Unsafe"). When a case shows, they rise in one by one, the picked one's Green mark pops, then the chip lands and the line runs to the action. This also shows that Augur Lituus answers multiple-choice questions, not only yes or no. Screen readers hear "Possible answers: Yes, No, Invalid. Answer: Yes". Transform and opacity only (the mark pops on its pseudo-element), and the final state is static for no-JS, reduced motion and print. The rest of the play is retimed (`applicationTimeline`, `caseGraphicTimeline.start` 1380). Checked: mid-play frames at about 0.6, 1.0 and 1.4 s in headless Edge, and final states at 1440, 1024 and 390. The 390 capture also confirmed the market graph's cover fix. Note for later captures: a "beyond the viewport" screenshot resizes the page, which settles every play (tabs.ts settles on resize), so mid-play frames must be taken inside the viewport. "Safe" and "Unsafe" are new copy, flagged in the launch checklist.

## Use cases as a list beside one example — 19 October 2026 (owner: Yes or No only, better graphs, "clear and organized")

This supersedes the answer options, the case-graphic band, the builder's case ledger and the stage hierarchy above, and the tabs across the top.

**Answers.** Every question is Yes or No, and Invalid is no longer shown (owner). Governance follows: "Did the upgrade pass its safety review?", answer No, "Hold the upgrade.", "The proposal goes live once a later review passes." Both answers show as chips (96 × 48, Sora 600 20). The picked one fills Green with a check, and the other drops to Pewter at 50% (owner: "the option picked … then fade the other one"). The Green fill is a layer over the chip, so the pick plays on opacity and transform. Screen readers hear "Possible answers: Yes or No. Answer: Yes." Safe, Unsafe and Needs changes are gone.

**Summaries.** Each case has a summary of the kind of app it stands for, in the spirit of SEDA's and UMA's use-case lines, not copied: markets on any checkable question; cover and payments that trigger on something measurable; proposals and grants that wait on outside facts. New copy, flagged in the launch checklist.

**Structure.** The owner still found the two-column stage unclear. The left column held the summary, question and answers, and the right column the action, explanation and picture. The eye read down the left and then jumped back up to the top right, and the question and the action competed as two headlines. It is now a list beside one worked example, a familiar pattern (Jakob's law):
- **The list** sits in the heading row's 500 column, on Dark 1. Each row has the icon tile (44 px), the name (Sora 400, 20–24) and its summary (16/24 Pewter), so a reader sees every case without clicking. The rows share the example's height. The picked row is `web-tile` with a Green icon tile, and it runs through the 80 px gutter to meet the example, so the row and its example form one surface (NN/g; owner, 6 Oct: never a side edge). Hairlines separate unpicked rows. The tablist is `aria-orientation="vertical"`. The shared controller already took the up and down arrows, so it is unchanged.
- **The example** sits in the 668 column, under the lead (measured at 1440: same x), and reads one way, top to bottom: the question (Sora 400, 26–32, hung Mist quotes), the two answer chips, a 1 px rule, then the action (Sora 600, 20–24 Paper), the explanation (18/28 Pewter) and the picture. Insurance's fallback note closes it. The rule splits asking from acting, so the question stays the one headline.
- **Below 1024** the rows are names only, stacked above the example, and the example shows the summary itself. From 1024 up, the summary in the example is visually hidden and kept for screen readers; the row's copy is `aria-hidden`.

**Pictures.** Each picture follows the explanation at the example's full width. The market chart grows to fill the rest of the example. Flight and gate keep their size and leave the spare room at the foot, because centering them left a gap in the middle. All three share one scale (2 px tracks, 16 px marks). The flight is now a cabin seen from above: 24 rows of four seats around an aisle (16 rows on phones). Only some seats hold a policy (a fixed pattern), and those fill Green row by row once the arrival passes +2 hours (`caseGraphicTimeline.flight.wave`, 18 ms a row). The gate is two tall Green bars, a pause sign for "held", with the path dashed on to an empty square, Live. Labels that repeated the explanation are gone: the market ends say Yes and No, the cabin's legend says Paid and No policy, and the gate's "Held until a review passes" row is removed.

**Builder's case, distilled.** The ledger's rules, table and draw-in are gone (`builderTimeline` removed). The title, the ask ("Building on it, or just curious? Ask the team anything.") and "Talk to us" sit in the 500 column. Three two-tone lines sit in the 668 column (claim in Paper, point in Pewter, Sora 400 20–22), in the voice of the Why Augur closer: "Nothing to staff. No resolution desk to hire." / "Never the judge. No dispute lands on the project." / "Easy to verify. Users can check every outcome." The lines are shortened from the ledger's and flagged.

Measured in headless Edge: the stage is 686 px at 1440, 674 at 1280 and 669 at 1024, and the section is 1,234 px at 1440. No horizontal overflow at 1440, 1280, 1024, 768, 390 or 360, and no console errors. `astro check` and the detector are clean. `tests/site.spec.mjs` follows but was not run (Playwright can't drive a browser here). `tests/copy-check.test.ts` fails: it compares the build with Figma's copy, which still predates the owner's approved changes in Why Augur, this section and the footer. That clears with the pending Figma sync and a re-extract.

## Hover edge instead of permanent Green lines — 19 October 2026 (owner)

The owner found the permanent 35% Green folder line on the Why Augur tenet cards "weird", and asked for a subtle Green border on hover where it makes sense. Both permanent lines are gone: the cards' folder line, and the closer's top line, which only echoed it. Neither the cards nor the closer is a control, so they take no hover edge: a hover border on something that can't be clicked would promise an action (NN/g, affordance).

One token carries the hover edge: `--web-hover-edge`, the brand Green at half strength (`tokens.css`). It replaces the Mist hover border, or adds a 1 px inset outline where a control had none, on:
- Outline buttons, sitewide, such as "Talk to us"
- Unpicked use-case rows and walkthrough steps (outline only when not keyboard-focused, so the focus ring wins)
- Bond round tabs
- The roadmap's + boxes
- Home and archive blog covers
- Learn guide cards
- Brand-page download buttons
- The FAQ items' left edge

Fine-pointer hover is unchanged elsewhere, and touch devices see no change. Forced colours keep their system borders. Checked in the browser at 1024: the folder and closer lines no longer render, and a hovered use-case row shows the edge.

## Builder's case after Augus's notes, and hover edges on cards — 19 October 2026 (owner)

**Builder's case.** The owner pointed out that nobody builds on Augur Lituus yet, so "Building on it, or just curious?" and "Why projects build on it" both implied adoption that doesn't exist (AGENTS: no invented readiness).
- **Title:** now "Why build on it". It asks why a project would, without saying any does.
- **Ask:** now "Exploring how it could fit a platform, or just curious? Ask the team anything." This follows the owner's angle without "your platform" (traders-first rule).
- **Layout:** the title was also stacked above the ask and "Talk to us", so it read as a label for the button. The title now sits alone in the 500 column and heads the three reasons in the 668 column. The ask and "Talk to us" follow the reasons under a 1 px rule (text left, button right; stacked on phones).
- **Reasons:** each is now its claim over its point (Sora 600 20–22 Paper over Sora 400 18–20 Pewter), so the three read as an even list at every width.

The owner then asked that the copy reflect Augus's notes better. For this section, the notes ask for the project's case: resolution handled outside the team with no one to hire, disputes not landing on the project with only a very light hint of liability, and a win for users too. The distilled lines had lost the last two. Now:
- "Nothing to staff. Resolution runs outside the project, with no desk to hire."
- "Never the judge. A disputed call isn't the project's to make or defend."
- "Good for users too. Anyone can check how each outcome was settled."

"Defend" is the light liability hint, and nothing promises protection. The section's lead and cases already carry the user's reading ("can be used for many products"). All of this is new copy, flagged in the launch checklist.

**Hover edges, extended.** The owner wants the hover highlight across the site where it makes sense, the tenet cards named. On the cards it is a highlight, not a click, so the cursor stays an arrow:
- **Tenet cards:** a 1 px ring traces each card's folder silhouette (clip-path, evenodd), in `--web-hover-edge`, fading in over 180 ms (opacity only).
- **Why Augur closer:** a plain 1 px ring.
- **About:** the organization cards.
- **Brand page:** the logo, contrast-pairing, typeface and misuse cards turn their own border Green.
- **Left out:** large single panels such as the About and Brand closing panels, the REP holder note, the FAQ box and the Products role diagram (an image).

Checked in the browser at 1440:
- The ring follows the folder shape on hover.
- The builder's reasons start under the lead (same x), and the ask sits below them.

Headless Edge showed no overflow at 1024, 390 or 360, and there were no console errors.

## No dead space: builder's case across, governance in two lanes — 19 October 2026 (owner)

The owner flagged the empty block under "Why build on it". The title sat alone in the 500 column beside about 300 px of reasons and the ask. They asked that this kind of gap never ship again. The same check found a second gap: the governance example's picture was one lane, so the example's foot stood about 170 px empty at 1440, because the stage keeps Insurance's height.
- **Builder's case.** The title now sits above the reasons, and the reasons run across the full width as three open columns. The owner kept "not boxes" and rejected the rules over the columns, so each reason is now a 44 px Dark 3 icon tile with a Green glyph (as in the use-case list), then its claim (Sora 600 20–22 Paper) and its point (18/28 Pewter). The icons are coins (no one to hire, cheaper), scales (not the project's call) and seal-check (outcomes users can check), all from the vendored Phosphor Bold set. The ask and "Talk to us" follow in one row, with the button right after the text, not pushed to the far edge. Below 1024 each reason is a row: tile beside text.
- **Governance picture.** It now tells the whole explanation in two lanes. "This review": the proposal stops at the Green pause bars, and the path is dashed on to an empty Live square. "A later review": the same path runs past Mist bars all the way to Live. One shared label row sits below (Proposal / Review / Live). The later lane plays after the bump (`caseGraphicTimeline.gate.later`, 1,100 ms). The example's foot gap is now under 60 px at 1440. The new labels are flagged.

Checked in headless Edge with all three tabs at 1440 and the builder's case at 1440, 1024 and 390: no dead blocks, no horizontal overflow, and the reasons share one row at 1440. A standing rule to check renders for dead space is now in Claude's memory.

## Icon audit: stay on Phosphor Bold, seven swaps — 19 October 2026 (owner approved)

The owner found the icon set "too limited and weird" and asked for research into a good, well-known library.
- **Phosphor** (MIT) has 1,512 icons in each of six weights at the pinned revision (9,072 SVGs). The site had vendored only 28, so the set felt small because of what was copied in, not because of the library.
- **Lucide** (about 1,600 icons, ISC; the shadcn default) and **Tabler** (about 6,200, MIT) are 2 px outline sets on a 24 grid. They would read thinner beside Sora 600, and switching would mean redrawing every Figma icon component.
- **Heroicons** (about 300) is too small. **Material Symbols** carries Google's look.

Decision: stay on Phosphor Bold, keep vendoring per icon from the pinned revision with sha256 provenance (no new dependency), and fix the icons whose meaning was off or doubled:
- **Insurance & payments:** shield-check → umbrella-simple. A shield reads as security or verified; an umbrella reads as insurance.
- **Insurance fallback note:** scales → info. The note is an aside, and scales already means Challenge in the REP rows.
- **Builder's case:** coins → user-minus (no one to hire), scales → gavel ("Never the judge"), seal-check → magnifying-glass (anyone can check; seal-check means "final" in How it works).
- **How it works, Resolution criteria:** file-text → list-checks. The criteria are a checklist, and file-text is the Whitepaper link in the menu.
- **Roadmap stops:** the text "+" → Phosphor plus (12 px), so the stroke matches the other icons.

Removed: airplane-tilt and shield-check, which nothing references any more. warning-circle stays, because the form error mask in `base.css` inlines its path. Kept as they are: chart-line-up, users-three, check, caret-down, clock, coins (fee paid, REP menu item), lock-simple, seal-check, flag, scales (Challenge), warning, newspaper, question, book-open, file-text (Whitepaper), list, x, the arrows, copy, download-simple and the four social logos. The REP menu item keeps coins: the official REP token icon can't be recolored to match the menu's monochrome glyphs (brand rule), and its Navy circle would vanish on Navy. `docs/icon-provenance.json` now lists 33 icons, each verified against its hash.

Second pass, same day (owner didn't like the first picks). user-minus and gavel drew the very thing their lines deny ("remove user", "you are the judge"), and magnifying-glass reads as search. Rule from now on: an icon shows the benefit, never the negated thing or a UI action. Picked from a sheet of five to seven Phosphor Bold candidates per spot, compared at 44 px in the site's tiles:
- **Nothing to staff:** puzzle-piece. It slots in, with nothing to run yourself. plugs-connected was rejected: at 22 px it reads as unplugged.
- **Never the judge:** scales. On this page it now means a dispute in both places, here and the REP rows' Challenge.
- **Good for users too:** eye. Anyone can see how each outcome was settled.
- **Insurance & payments:** umbrella, the full one with its handle, which reads more clearly than umbrella-simple.
- **Kept:** chart-line-up, users-three and the info note. No alternative was clearly better.

user-minus, gavel, magnifying-glass and umbrella-simple are removed. `docs/icon-provenance.json` lists 32 icons, each verified against its hash, and every vendored file is listed.

## Use-case copy pass — 19 October 2026 (owner ran /ux-copy, "take in mind the Augus suggestions")

Every string in the section was checked against the house rules, the traders-first rule and Augus's notes for the section: the user's reading is "can be used for many products", and the project's reading is that outsourcing resolution is cheaper and less risky, and a win for users.
- **Insurance summary:** "Cover and payments that trigger when something measurable happens, like a delayed flight, a missed delivery, a storm or a cancelled event." → "Coverage and payments that trigger when something measurable happens: a delayed flight, a missed delivery, a storm or a canceled event." American spelling ("coverage", "canceled"), and the same colon shape as the markets summary.
- **Governance summary:** "Proposals and grants that wait on facts from outside the chain, such as an audit result or a milestone being met." → "Proposals and grants that wait on real-world facts: an audit result or a milestone met." "Outside the chain" is jargon to a beginner, and "real-world facts" echoes the lead.
- **Nothing to staff:** "Resolution runs outside the project, with no desk to hire." → "Resolution runs outside the project, with no one to hire or manage." "Desk" was jargon, and "or manage" adds Augus's cost point (less overhead).
- **Never the judge:** "A disputed call isn't the project's to make or defend." → "A disputed outcome isn't the project's to decide or defend." "Call" is an idiom; "decide" reads plainly, translates cleanly, and keeps the light liability hint ("defend").
- **Kept:** the approved heading, lead, questions, actions, explanations and fallback note; the governance question; "Good for users too. Anyone can check how each outcome was settled." (Augus's win for users); the ask; "Talk to us" (verb-first, matches the header); and the picture labels.

Every builder point stays within two lines at 1440. The new strings are flagged in the launch checklist.

## Project's case as the section's second half — 19 October 2026 (owner: "lean more heavily on Augus suggestions")

Augus's notes for this section ask for the project's reading: once users want a project to use Augur, why does the project want it too? Outsourced resolution with no one to hire, disputes that don't land on the project, a very light hint of liability, and a win for users. The user's reading ("it works for many products") was already carried by the lead and the three cases. The project's half read like a footnote: its title asked a question it never answered, "cheaper" and "less risky" were only implied, and the win-win was the last bullet. The examples also never said who answered. Proposed in chat and approved by the owner ("Build all five suggestions as proposed"):
- **Title:** "Why build on it" → "Good for users. Easier on the project." The win-win frames the block and names the project (traders-first rule).
- **Lead (cut the same day):** "Settling outcomes in-house takes a team, and every dispute lands on it." sat beside the title on the heading row. In narrow columns, its forced break and balanced wrapping stacked it into four ragged lines (owner: "find a good way of displaying this or remove it"). It only restated the first two reasons, so it was cut. The title stays above the reasons, as before.
- **Reasons**, in Augus's order: cheaper, less risky, value to users. "No team to hire. The project pays a fee per question instead of staffing resolution." (the query fee is in the walkthrough). "Never the judge. Anyone who disagrees challenges the answer, not the project." (anyone can challenge with a larger bond). "A selling point. Users can check every outcome instead of taking the project's word for it." The icons are unchanged.
- **Who answered, in every example:** a muted line under the answer chips. "Decided in the open, not by the market's own team / the insurer paying out / the team behind the upgrade." It fades in with the check (`decide` + `check`, opacity only).
- **Ask:** unchanged. A "Read the whitepaper ↗" link after "Talk to us" was added and then removed the same day (owner). The ask keeps its one action, and the hero already links the whitepaper.

Pushed back on, from the notes: no "blame" (it invites "so Augur gets it wrong?"), so the second reason says where a dispute goes. No "liable", "legal" or "protect": the title "Never the judge" is the only liability hint. No "cheaper" claim, because we have no cost comparison to cite; the first reason states the fee-for-a-team trade and leaves the conclusion to the reader. No extra use cases: the three summaries already name about a dozen kinds of app. A test now fails on "backstop", "trust", "blame", "liab" or "protect" in the section. Still one visible "Augur Lituus" on the default view.

Open: the Why Augur closer's "For integrators" line ("Focus on building and growing your platform. Leave resolution to Augur Lituus.") now previews this half. Revisit it in the Why Augur pass so the two don't say the same thing. All the new strings are draft copy, flagged in the launch checklist; Figma waits on the pending list.

## Builder's ask as the title's lead — 19 October 2026 (owner: "better place, better structured, better UX, better UI"; Impeccable)

The ask closed the project's half as a muted 18 px line with an outline "Talk to us" after the three reasons. The review found:
- It read as a footnote. Nothing gave it weight or tied it to the grid, and the button's only cue was the outline.
- It was the third "Talk to us" on the homepage. The header has one, and the footer has a fuller ask ("Talk to the Augur team. … Building on it? Tell us what your project needs.").
- Once the lead was cut, the 668 column beside the two-line title stood empty.

Now, from 1024, the ask is the title's lead. The project's half takes the heading row every section has (title in 500, lead in 668), the same shape as How it works right below it. The invitation stays in view while the three reasons are read, and the half ends on its evidence instead of on a footnote. The words are unchanged but split into the house setup and payoff: the question in Pewter ("Exploring how it could fit a platform, or just curious?"), the offer in Paper ("Ask the team anything."), with the outline "Talk to us" 32 after the text. The ask is centred on the title, starts on the section lead's x (670 at 1440) and keeps body 18/28, a step below the section lead's 22/33, because it is an h3 row. The reasons follow 48 below.

In the DOM, and stacked below 1024, the ask still follows the reasons (grid areas place it beside the title only from 1024). Reading and focus order end on it, and phones read title, reasons, then the ask. The question is balanced, so at 1024 and on phones it breaks as two even lines.

Checked in the browser after a build at 1440, 1024, 768, 390 and 360: no horizontal overflow and no console errors. The Impeccable detector reports nothing. At 1024 the ask (84 px) is 19 px taller than the title; that's acceptable.

## How it works × REP: one “take part” section — 19 October 2026 (owner + Augus; brief in `docs/how-it-works-prompt.md`)

How it works is now the consumer pitch: “How do I take part, and how do I get paid?” What can you do with REP? repeated its steps 2–3 (Report, Challenge, Risk), so it is folded in and deleted.

- **Merged:** each walkthrough card gains a “Your REP” zone (`src/components/art/RepFlow.astro`) in the old REP rows' square vocabulary, one flow per step: the reward meter (A question opens), If you report, You challenge (with Risk folded in as the overturned line and a dashed square) and You receive. The REP section's intro and button become the holder note.
- **Removed:** `Rep.astro`, `StakeFlow.astro` with its entrance and hover replay (`initStakeFlow`, `repTimeline`), the bond-rounds chart and its 1–4 tabs (`bond-rounds.ts`, `bondTimeline`, the `[data-bonds]` code), and section 07 from the copy source and `check-copy.ts`. The F5 tests now watch the roadmap, the remaining play-once scene.
- **Sources (January 2026 Augur Lituus whitepaper):** a fee paid entirely in REP to ask a multiple-choice question, with Invalid always added (§2, §4.4.2, §4.0.1); Reporter Pay is a clock auction from 0 up to the whole fee, paid to the first reporter of the outcome that becomes final (§4.4.3); the first bond equals the fee and each challenge doubles it on a different outcome; an appeal period with no new stake makes the latest outcome final (§2, §4.1); winners receive 80% of the losing bonds, “most” in visible copy, and 20% is burned (§4.3.1); an unchallenged reporter gets the bond back plus Reporter Pay (§4.0.2, §4.5); a fork is the last resort when a bond would pass the fork threshold (§4.2). The numbers are illustrative and consistent, from one source in `walkthrough.ts`: fee and bond 15, challenge 30, 12 = 80% of 15, 3 burned.
- **Why “Example” on the card:** there is no source for a shipped Augur Lituus app or UI, so the product-style card is labelled as illustrative. Still unclaimed: an own UI, burn as value or dividend, yields, prices, dates, partners, and any reward for holding alone (the holder note says holders never have to take part).
- **Departures from the brief, on UX grounds:**
  - *Holder note placement.* The brief put it on its own row 72 px below. The card (790 px at 1440) is about twice as tall as the steps (400 px), so the steps column stood empty beside the card's lower half. The holder note now sits in that column under a hairline, bottom-aligned with the card. It is still on the 500 / 80 / 668 grid and still follows the panels in the DOM (tabs → panel → criteria → holder links), and it stacks under the card below 768. The section is about 220 px shorter.
  - *Zone position.* It sits between the answer and Activity, not at the card's foot. Activity grows from one row to four, so a foot-docked zone left a hole in the middle of early steps. Mid-card, the zone keeps one position across steps and the spare room falls under Activity at the card's edge. The order reads current answer → what you get → history.
  - *Steady height without magic numbers.* The four cards share one grid cell as subgrids of five rows. Hidden cards stay laid out but invisible (a scoped override of the global `[hidden]` rule), so every row is as tall as its tallest step at any width, opening the criteria included. This replaces the brief's measured `min-height` per breakpoint.
  - *Bond colour.* “Pewter” in this project's copy and CSS is `--muted-foreground` (#A1A1B8), the colour of crossed-off steps and older Activity. `--mark-past` (#4A4B61) is about 2:1 on the zone's Dark 1 and read as disabled, so bonds use the Pewter of the rest of the section.
  - *Step 1 zone.* The meter gained a 0 REP / 15 REP scale and the line “It goes to whoever first reports the answer that becomes final.” (§4.4.3), which explains the Reward the later steps show and fills the zone with content instead of space.
- **Copy:** the brief's draft strings plus “Example”, “First to back No”, the scale and the reward line. All flagged in `launch-checklist.md` and `walkthroughReview`. The FAQ `rep-actions` answer doesn't contradict the section and isn't on the homepage, so it is unchanged.

**Checks run:** `astro check` (0 errors, 105 files) and `bun run build` pass. `check:copy` passes for How it works; sections 04, 05 and 11 still fail, as they did before this change (website copy ahead of the Figma extraction). `bun test tests/copy-check.test.ts`: the new How it works test passes; the two that check the whole page fail on the same three sections. In headless Edge over CDP against the static preview: steady card and zone heights across all four steps at 1440, 1280, 1024, 768, 390 and 360; no horizontal overflow at any of those widths in any step (after letting flows wrap at 1024 and below); no console errors; with no JavaScript the first step shows with the meter at rest. Loop: nothing runs off-screen at load; only the shown step's zone loops; a step change restarts it from rest; at 1800 ms the copy covers the bond back exactly (0, 0 px); it pauses off-screen and recovers after a resize; reduced motion runs nothing and the meter rests at a sixth. Main thread: about 2 ms of task time per 5 s with the zone on screen.

**Not done:** Playwright still can't launch a browser on this machine, so the updated and new tests in `tests/site.spec.mjs` were written but not run (their assertions were checked by hand over CDP, above). Phone widths were measured for overflow and steady height only; the owner asked to skip the mobile visual review for now. `check:budgets` passes and `check:links` passes (27 pages, 2,050 destinations). `check:launch` stays blocked, as before, and now also lists the new `walkthroughReview` flag. Lighthouse, forced colours and keyboard runs were not redone. Figma waits on “update figma” (pending list).

## Your REP moves out of the query card — 19 October 2026 (owner: “mixing the section with the query UI … might be a little confusing”)

The “Your REP” zone sat between the answer and Activity, inside the card that is meant to look like product UI. “If you report” and “You challenge” read as part of the app, and the card mixed the section's explanation with the example. Considered: a separate box under the card (still in the product column, still reads as attached), a flow inside the open step tab (Pewter and Green squares on a Green fill, and a tab button makes its content presentational to screen readers), and a full-width strip under both columns (far from the step it explains, and the steps column stands empty again).

Built: the panel sits under the steps. The left column is now yours (what you do, then what you get) and the right column is only the example query, so each step's payoff sits next to the text that explains it.
- **Markup:** each step has a `.rep-panel` (`role="group"`, labelled “Your REP: …”). The tab's `aria-controls` lists its card and its panel. `tabs.ts` now treats the first id as the tab's panel and shows or hides the others with it. The loop finds the shown panel, not the shown card.
- **Holder note:** back on its own row under the walkthrough (the brief's original place), on the heading grid with a full-width hairline. The steps column is no longer empty, so the earlier reason for moving it is gone.
- **Layout:** the panel is a Navy tile like the steps, marked as yours by the 2 px Green rule. It is a size container: in a flow each group is squares, caption, then its REP tag, which fits one line from about 420 px of content (1440 and 1280). Narrower (1024 and phones), it stacks with one line per group.
- **Steady height:** the four panels share one grid cell like the cards. The left column now sets the section height, and the open step's description runs 2–3 lines, so the walkthrough controller measures the tallest open step (each step opened in turn with transitions off, read in one frame) and reserves it, on load, after fonts load and when the tabs settle. Measured in headless Edge: section, card and panel positions identical across all four steps at 1440, 1280 and 1024.

**Checks run:** `astro check` and the build pass. In headless Edge over CDP: no horizontal overflow at 1440, 1280, 1024, 768, 390 or 360 in any step; no console errors; no JavaScript shows step 1 with the meter at rest. The loop runs only for the shown panel, restarts from rest on a step change, lands exactly on the bond back, pauses off-screen and runs nothing with reduced motion (about 4 ms of task time per 5 s). Playwright still can't launch here, so the updated spec was not run. The phone layout was checked for overflow only, not reviewed visually.

## How it works polish — 19 October 2026 (owner's list, then “more selly … use %”, then details in a dropdown)

- **Card:** the “Example” tag is gone (owner). Flagged: the card now relies on its numbers and missing addresses to read as illustrative. The criteria's Invalid sentence is removed. Evidence cutoff, its Unix time (1820361600, `Date.UTC(2027, 8, 8) / 1000`) and a three-paragraph description sit in one “Question details” disclosure under the question; it replaces “Resolution criteria”. The description is illustrative resolution terms written for the example (who must replicate, what counts, the 20 °C / 293 K threshold, when it resolves NO or Invalid), not a claim about the science. The status chip is larger, with a slow live dot while open and Green with a check when final. Once an outcome is picked, the others look alike (outlined); a final answer strikes them both.
- **Stakes and Activity (after the owner's reference screenshot):** kept the total staked, a split bar by outcome and the legend. Left out the wallet addresses and the “23h ago” times, which would be invented. Activity is rewritten: newest first, 8 px Green squares instead of icons, each entry a title over a plain line with its REP tag, a “You” tag on your challenge, and a hollow “now” entry while the query is open (“Waiting for a report”, “Appeal period running”). The old colour hand-off animation is gone (it animated colours, which the motion rules don't allow).
- **REP panels, “selly”:** each leads with its role and a large Green payoff, then one line on what you lock, what has to happen and what comes back, then the flow, then the risk. The figures follow from the whitepaper rules and the example amounts. An unchallenged report gets up to +100% on its bond, because the bond equals the fee and Reporter Pay can reach the whole fee (§2, §4.1, §4.4.3). A challenge that holds gets +40%: 80% of the 15 REP bond it overturned, on 30 REP (§4.3.1). The payout is 42 REP back on 30, plus the reward. Visible copy now says “80%”, where it used to say “most”, because the owner asked for percentages. Pushed back on: no yield, rate or annualised figure, no price, and the loss sits in the same panel. Every bond and share square shows its amount; the reward's tag says “Up to 15 REP”, because it rises until someone reports.
- **Motion:** the flow now tells a story instead of a copy sliding over a static row. What comes back waits dimmed, the bond lifts off the stake and glides along the arrow, and as it lands the outcome lights up, the returned bond and the payoff figure bump and the winnings pop. The receipt lights its three groups one by one. Keys are in `motion.md`.
- **Heading and holder:** “paid” keeps a Green underline that draws in once per visit. The holder is one slim line with a single text link; the whitepaper link was dropped, since the hero already has one.

**Checks run:** `astro check` (0 errors) and the build pass; `check:copy` passes for How it works (04, 05 and 11 still fail, as before). In headless Edge over CDP: steady section, card and panel heights across the four steps at 1440, 1280 and 1024; no horizontal overflow at 1440, 1280, 1024, 768, 390 or 360; no console errors; no JavaScript shows step 1. The flow loop, sampled: rest at 0, outcome dimmed by 450, bond mid-glide at 1200, landed and lit by 2100, stake restored by 5000, rest at 12 s; the copy lands exactly on the returned bond; the loop pauses off-screen and runs nothing with reduced motion; about 9 ms of task time per 5 s. The updated spec assertions were checked by hand in Edge (payoff figures, square amounts, stakes legend and total, chips, Activity order, “now” entry, aria-controls, details sync, Unix time). Playwright still can't launch here. Phones were checked for overflow only.

**Tightened the same day (owner: “still weird, polish”):** the panels' pitch paragraph repeated the step text and made the left column about 60 px taller than the card, which left empty room under Activity. Each pitch is now folded into the payoff line, as “if you lock X, you get Y back”: “Up to +100% · Lock 15 REP, get up to 30 REP back if no one challenges”; “+40% · Lock 30 REP, get 42 REP back if your answer holds”. REP tags now appear only where they add something, a two-square total or the reward, since every square shows its own amount. The Stakes header is one line (“45 REP staked”). Measured at 1440: panel 314 px (was 375), card 738 px (was 799), still identical across the four steps.

## How it works: copy pass and Activity order — 19 October 2026 (owner ran /ux-copy, “improve, then maybe the UI”)

Compared against Augus's notes first: participation, “how do I get rewarded”, and the merged REP section were met. Buying REP wasn't, and can't be until maintainers confirm where REP can be obtained (`links.ts` has no exchange or migration link; the REP page is flagged). The project's “own UI” point has no source, and the card now runs without its “Example” label (flagged). Credibility had lost its only source cue.

- **Copy:** one verb (“stake”) for putting REP on an outcome and one noun (“bond”) for it, in place of a mix of lock, stake and back. YES and NO are in caps everywhere, as on the chips. The lead and summaries say 80% instead of “most”. Step 1 says the fee funds the reward (it said “Part of that fee”, contradicting “up to 100% of the fee”). The answer labels no longer repeat the status chip (“Reported answer”, “Current answer”, “Final answer”). “If your answer is overturned” replaces “If you're overturned”, and “reaches a fork” replaces the idiom “climbs to”.
- **UI:** each REP panel ends with “Payouts follow the Augur Lituus whitepaper ↗” (the verified registry link), so the figures read as rules, not promises. The step tabs are 6 px slimmer, which gives back the height, and the connector line moves with them (40 + 70 per step).
- **Activity (owner: oldest first, fade what isn't relevant, highlight the current state, show REP better):** oldest at the top, ending on the current state: the “now” entry, with a Green “Now” tag, while open, or the final answer. Past entries step back to Pewter with dimmed squares. That's colour, not opacity, so their small text keeps AA contrast. Each amount is a bold figure over what it is (“15 REP / Fee”, “30 REP / Bond on NO”), after the owner's reference, in place of grey tags. Details now say what the amount can't (“An app asked and paid the fee”, “First report, staked equal to the fee”).

**Checks run:** build passes; section, card and panel heights are identical across the four steps at 1440 (1235 / 746 / 348 px); no horizontal overflow at 1440. Playwright still can't launch here; the spec was updated to match.

**Second pass the same day (owner):** the whitepaper line under each panel is removed. Faded or struck, never both: ruled-out chips on the final step are struck through on a plain tile without the outline, and the report a challenge replaced is struck through in Paper rather than dimmed. The REP panels no longer stretch with the card (`align-self: start`), so opening Question details grows only the card. Activity is newest first again, with the current state on top as a highlighted row (Dark 2 tint, 2 px Green rule, 15/22 title, 16/22 amount, full square). The panel's diagram (meter, or flow and risk) now sits in an inset under the headline, so the headline sells and the inset shows how; the inset is the size container. The reward square is now a full bond-size dashed Green outline marked “≤15”, in place of a small filled square with a tag. The Challenging condition is shortened to “Answer holds”, since the payoff line above already says “if your answer holds”, so the flow fits on one row at 1280 as well as 1440. Measured: section 1213 px at 1440; panel height unchanged with details open; no overflow at 1440, 1024 or 390.

**Never both, enforced (owner, 19 Oct 2026: “either strike or faded, never both”):** completed step tabs no longer turn Pewter; they keep Paper text with their strike and Green check. Ruled-out outcome chips keep Paper text with their strike. The report a challenge replaced was already in Paper. Faded alone (Pewter, no strike) is still used for older Activity rows, unpicked chips while the answer can change, and earlier progress segments. The current Activity row is now much stronger: a 9% Green-tinted fill inside a 40% Green outline with a 3 px Green edge, a 16/24 title, an 18/24 amount, its detail in Paper, and a 10 px square that pulses with the status chip while the query is open (CSS opacity, shown card only, off with reduced motion and in print).

## Section dividers removed — 19 October 2026 (owner: “i hate this divisor … remove them from this website”)

Removed every full-width hairline that separated blocks on the open page, 22 rules, keeping the spacing each one sat in (where a rule's padding and margin stacked, the two became one gap): the header's bottom edge; the tenets section's top and bottom; the builder's-case top (36 + 32 → 72); the blog grid top; the roadmap top; the How it works holder line (48 + 20 → 56); the footer directory top; the `.ruled` section tops on About, Brand, Learn, Products and REP; About's principles top; the Brand logo-rules row; the FAQ page, guide body and blog archive tops; the archive's category underline; the article end; the contact page's narrow-screen split; and the REP roles top. Kept: rules that structure something rather than divide the page. That means table rows (REP versions, prose tables), list rows (FAQ accordion items, roadmap evidence, Learn guides, glossary, brand minimums and do/don't), card interiors (query card, tenet tiles, logo captions, typefaces), form field underlines and vertical column rules. Checked: build passes; full-page captures at 1440 of the homepage, REP, About, FAQ, Learn, Products, Brand and Contact show no overflow and no blocks running together.

## REP and earning claims checked against the whitepapers — 19 October 2026 (owner: “make sure our statements and assumptions are correct”)

Read the January 2026 Augur Lituus whitepaper in full text (pdftotext; the file matches the one linked from the site) and the Augur v2 whitepaper for context. Searched the web for anything newer (none on the Lituus mechanics) and for the Moon Fork migration.

Correct as written, with sources: the fee is paid entirely in REP (§4.4.2), and Invalid is always added as an outcome (§4.0.1). The first report's bond equals the fee (§2, §4.1; strictly “a minimum size equal to the Query Fee”). Each challenge backs a different outcome with twice the previous stake, and an appeal period with no new stake makes the latest outcome final (§4.1). Winners receive 80% of the stakes on other outcomes, pro rata, and the 20% remainder is destroyed (§4.3.1). The first party to stake on the winning outcome also gets the Reporter Pay (§4.3.1), so the challenger collecting it in step 4 is right. Reporter Pay is a clock auction from 0 up to the whole fee, and anyone may add a tip (§4.4.3). Any unpaid part of the fee is burned (§4.4.4). An unchallenged reporter gets the bond back plus their pay (§4.0.2). The +40% (12 REP on 30) and 42 REP figures follow for one challenge with one staker per side. With no report within 3 days the question resolves Invalid (§4.3). In v2, REP earned reporting fees only by taking part (participation tokens, stakes), consistent with “holding REP alone does not earn reporting rewards”. The site's example numbers are the paper's own §4.5 example: a 15 REP fee, the reward taken at a sixth of the fee (2.5 REP) after 12 hours, a 15 REP bond and a 30 REP appeal.

Fixed:
- **“Up to +100%” for reporting** was the ceiling, not what the design pays. The clock auction exists so that reporters compete to “accept the lowest possible REP payment” (§4.4.3), and the paper's example pays 2.5 REP on a 15 REP bond. The headline is now “+17% · Stake 15 REP, get 17.5 REP back if no one challenges”, and the flow's reward square shows 2.5. The Reward offered panel keeps “Up to 15 REP”, now “plus any tips”, and its caption cites the example.
- **Forks:** “holders choose / can move their REP” implied migration is optional. §4.2.2 says REP whose holder chooses inaction is “effectively destroyed”, and the v2 Moon Fork coverage said the same of unmigrated REP. The holder line, the FAQ and the REP page now say holders need to move their REP to the universe they believe reflects reality, and that REP left behind loses its value. “You never have to report or challenge” stays.
- **“A larger bond”** is now “double the bond” on the REP page and in the FAQ (§4.1).
- **“Any app can ask”** is now “Anyone can ask” in step 1 (§2: “Anyone may pay a fee”).

Unchanged on purpose: no line says burning raises REP's value, even though §4.4.4 argues it, because the site makes no price or “value goes up” claims; and §4.5's “dividend” wording stays off the site. The Learn guides and blog posts using “a larger bond” are placeholders already flagged for review.

**Holder note reworked (owner, 19 Oct 2026: “this section sucks”):** the one-line note had become a two-line wall of text once the fork caveat joined it. It is now a compact note bar under the walkthrough: a Navy tile like the steps, holding “Holding REP?”, two short points and the link. The points are “Optional. You never have to report or challenge.” and “In a fork, act. Move your REP to the universe you believe reflects reality, or it loses its value.” Each has the Activity squares as its marker (solid: nothing to do; hollow: act). It stacks on phones.

## Section settle in place of one-tick section paging — 19 October 2026 (owner: “make scrolling easier like maybe a tiny scroll just moves to next section”)

Not built as asked: paging a whole section per wheel tick is scrolljacking (NN/g: users lose control, heuristic 3, and it breaks the scrolling every other site has, Jakob's Law). At 1440 × 900 five of the seven homepage sections are taller than the screen (Tenets 1183 px, Use cases 1382, How it works 1254, Roadmap 926, Blog 922), so a one-tick jump would skip content, and trackpads fire dozens of small wheel events per swipe. CSS `scroll-snap` was also rejected: `mandatory` has the same problems, and `proximity` pulls the page back against the scroll when a nudge stops near a section edge.

Built instead (`src/motion/section-settle.ts`, homepage only): scrolling stays native, and when a wheel, trackpad or touch scroll comes to rest with the next section's top within a third of the screen of the top edge, the page glides the rest of the way so the section starts framed. It only continues the way the page was moving, so a nudge away from a section top stays put. The page top stands in for the hero, which sits under the header. Keyboard (arrows, Page Down, Space), link, focus and find-in-page scrolls are left alone; reduced motion turns it off; Safari, which lacks `scrollend`, uses a 160 ms rest.

**Checked:** in Chromium at 1440 × 900 with real wheel ticks: one tick from the top stays at 100; scrolling on to 600 glides to the Tenets top (900); one tick on from there stays at 1000; three up stay at 700; five more up glide to 0; Page Down lands natively at 766. No console errors. `astro check` and the build pass; homepage JS is 19,495 of 20,480 gzip bytes. Not checked: touch momentum on a real phone, Safari's fallback, Firefox.

## Learn more: the blog and the FAQ in one section — 19 October 2026 (owner, after Augus found the page too long)

From the blog (922 px at 1440) and Frequently asked questions (861 px) are now one band section, “Learn more about Augur.”, which is 1,000 px tall. That makes the homepage 783 px shorter at 1440, with the same five questions and four posts (`src/components/home/LearnMore.astro`; `Blog.astro` and `FAQ.astro` are gone).

- **Considered:** tabs (Questions | Blog) would have been shortest. They hide one of the two, though, and a hidden tab gets far fewer looks (heuristic 6, recognition rather than recall). A plain index of links (Guides, Blog, FAQ) would lose the inline answers beginners come for. Side by side keeps both visible.
- **Order:** the answers lead, in the wide column, and come first in the DOM and on phones, because they serve traders and beginners. At 1440 the answers column is 704 px, enough for every homepage question to fit on one line with answers at their 572 px measure. The posts column is 464 px (420 below 1440). The heading row keeps the H2 on the left, so the shared 500 / 80 / 668 row still holds.
- **Both columns end on one line:** the posts column stretches to the answers. The featured post holds the top edge, and the list with “View all posts” holds the bottom edge, where its bottom hairline continues the FAQ frame's. Any slack falls between those two groups (16 px at 1440, about 30 at 1280, about 50 at 1200), which reads as a gap between groups rather than a hole before the last row. The posts are stand-ins; if real titles run longer, check this again.
- **Closing rows:** “View all questions” is the accordion's last row, and “View all posts” mirrors it. Each has a 32 px arrow tile shaped like the FAQ toggle. On hover the row lifts a tone, the tile takes the half-Green hover edge and the arrow nudges 2 px. These rows replace the old Outline “View all posts” above the posts. A right-aligned link in the heading row would have sat next to the other column's title (law of proximity).
- **Beginner path:** the heading row ends with “New to oracles?” and the Outline “Start here” to `/learn/`, the same words the Learn page opens with. A section called Learn more should lead to the guides.
- **Stacks below 1200:** with two columns at 1024, the questions wrapped to two or three lines beside a short posts column, which left a 100 px hole. Stacked, the featured post sits beside its cover from 768 to 1199 with three posts in a row below. Phones get one column, answers first.
- **States:** with the default (first answer open), both columns end on one line. With a short answer open, the frame ends about 66 px above the posts; with all questions closed, about 200 px above. Accepted, because the reader chose those states and the default is level.
- **FAQ motion:** during the FAQ view transition both closing rows are named, so they slide with the frame instead of stretching inside it or jumping.
- **Fixed in passing:** the second question had no top hairline, here and on the old homepage FAQ. Astro puts FaqItem's script after the first question, so `.faq-item+.faq-item` skipped the second one; the rule now uses `~`.
- **Copy:** new copy is “Learn more about Augur.”, “New to oracles?”, “Start here” (as on `/learn/`) and “View all questions”. “Frequently asked questions”, “From the blog” and “View all posts” are kept, now as column headings and a row. The internal rows use the Phosphor arrow, like the header's “Explore Augur Lituus”, and are flagged with the new copy in `launch-checklist.md`. `check-copy.ts` reads sections 09 and 10 as one website-draft section until Figma is updated.

**Checks run:** the build passes. It was built into a scratch folder because `dist` was locked by another process. `check:copy` passes for Learn more; 04, 05 and 11 fail as they did before. `check:budgets` passes (homepage JS 19,495 and CSS 19,824 gzip bytes), and the Impeccable detector reports nothing. In headless Edge over CDP at 1440, 1366, 1280, 1200, 1024, 768, 390 and 360: no horizontal overflow and no console errors, with the default, short-answer and all-closed states captured at 1440. In the browser pane: the hover states, tab order (Start here, questions, View all questions, posts, View all posts) and focus rings. `astro check` reports one error, in `src/components/rep/Participation.astro`, and `check:links` fails on `/rep/#taking-part` and `/rep/#contract`. Both come from the REP work going on in parallel, not from this change. Not run: Playwright (it can't launch here; its two selectors now point at `.home-learn`), forced colours, reduced motion, no-JavaScript. Figma waits on “update figma”.

## Learn more trimmed and aligned; one hover line for every underlined action — 19 October 2026 (owner)

The owner asked to drop “New to oracles?” and “Start here”, cut the section to three questions and fewer posts, make the posts leaner (no type or date), give the FAQ and the blog real buttons, and give every underlined button the white line that draws in. They then flagged that buttons, titles and text didn't line up.

- **Questions:** three stay on the homepage (`homepage: true` in `faq.ts`): how today's Augur relates to the earlier markets, what REP does, and what happens when a question can't be answered. These are what a trader or beginner asks first. “Can I build with Augur today?” and “Why would REP holders choose the honest fork?” stay on `/faq/`.
- **Posts:** the two latest. The featured one keeps its cover (the section's one image) and description; the second is a title row. Type and date are gone here; the blog index keeps them.
- **Beginner path:** this section no longer links to `/learn/`; the header's Learn entry and the footer still do, and `/learn/` keeps its own “New to oracles? Start here.” intro.
- **Buttons:** Outline “View all questions” and “View all posts” under each list replace the arrow closing rows, which read as one more question.
- **Alignment, one system:** both lists are framed (1 px Outline on Dark 1) with text 24 px in, 18 / 26 titles and 81 px rows. The buttons hug their labels, so each label sits on that same inset (121 and 905 px at 1440). Subgrid rows give the columns one heading line, one list height and one button line. The post list stretches to the answers and keeps the second post on its bottom edge, so the last question and the last post share a line. At 1440 and 1280 the frames, last rows and buttons match to the pixel. The featured text has 16 / 20 padding so the posts stay shorter than the answers from 1200 to 1439.
- **States:** with another answer open, or none, the questions column leaves the subgrid (`:has()` on the first question's open state). “View all questions” then stays 32 px under the list instead of stranding up to 235 px below it, and the FAQ morph slides it there.
- **Underlined actions:** every link that showed an underline now draws the text actions' 2 px line on hover (`.line-link` in `base.css`; details in `motion.md`). Wrapping card titles keep a plain underline. Scoped `span` colour rules in the announcement and REP options were narrowed so the new label spans keep their colour; the contact email now brightens to Paper on hover.
- **Copy:** section 09 of `homepage-copy-source.json` drops “New to oracles?”, “Start here”, two questions, the post meta lines and two post titles.

**Checks run:** `bun run check` (0 errors), the build (into a scratch folder), `check:copy` (Learn more and every section except 04, 05 and 11 pass; those three fail on earlier copy drift, as before), `check:links` and `check:budgets`. In headless Edge over CDP: Learn more at 1440, 1280, 1024 and 390, plus the third-answer-open and all-closed states at 1440; no horizontal overflow. The hover line was read back on each converted link (scaleX 0 at rest, none on hover). Not run: Playwright, forced colours, reduced motion, no-JavaScript, console errors, 1366, 768 and 360. Figma waits on “update figma”.

## About page rebuilt (19 October 2026)

The owner said the About page "was entirely vibe coded" and asked for its UI, copy and UX to be worked out from research. The old page (and Figma About `218:45`) was a generic template:
- three unsourced principles;
- organization cards;
- a date list;
- a closing "Three products, one goal" panel that repeated the header's Products menu.

Its copy broke house rules ("the next generation", "not from a company, a committee or a multisig", rules of three). One line was out of date: "Testing and audits come next", while the Q2 2026 report shows testing already underway.

**Research.** Primary sources only, read on 19 October 2026:
- the augur.net mission page;
- the reboot roadmap (1 April 2025);
- Generalized Augur (13 May 2025);
- whitepaper §1 and §2;
- the testing post (21 July 2026);
- the Moon Fork report (5 August 2026);
- the Q2 2026 report (1 October 2026);
- lituus.foundation.

The facts used are registered in `sources.md`.

**Reader and job.** People arrive from the header's About link and the roadmap's "Read the mission". They want to know:
- what Augur is;
- whether it is the project they remember;
- who is behind it now;
- whether any of it can be checked.

A decentralized project also faces a question a company About page doesn't: if a foundation funds it, who decides the answers? The page is built to answer that.

**Structure.** Each section has its own format, following the homepage rhythm map.
- *Hero:* what Augur is in plain words (an oracle that tells apps on the blockchain what happened in the real world), then where it came from.
- *Mission (`#mission`):* the founding position is the heading, in the shared 500 column: "No company or committee should hold the final word on what happened." It comes from the testing post. The 668 column gives the whitepaper's reasoning (§1, dispersed knowledge) with its citation.
- *The story so far:* seven dated entries, from the 2015 crowdsale to now. Each has a title, one or two sentences and its primary source.
  - Date and title sit on the left. Text and source sit on the right. Both start from the row's top, so neither column stands empty.
  - One Mist line runs through square stops. It is dashed across the quiet 2018 to 2025 stretch, and the current stop is Green.
  - The Moon Fork carries the page's one figure: 99.97% of migrated REP moved to Yes. On desktop it sits under its title. On phones it comes after the text (grid areas), so phones read the story before the number.
  - The section ends on "See what comes next" (→ `/#roadmap`) instead of repeating the roadmap.
- *Who does what:* three builder cards (role, name, what they do, link). Then a Green-outlined panel for the one role no organization holds: "Decides the answers · Anyone with REP at stake". It rests on whitepaper §2: questions resolve "without any centralized backstops or vetoes".
- *How the work is done:* three practices in divided columns. Each carries its public evidence: the code repositories, the whitepaper and the Q2 report.
- *Removed:* the closing products panel. Products is in the header, and the footer's contact band follows directly.

**Layout passes.** The first build had two problems:
- Role labels and timeline titles stood alone in the 500 column beside 170 px blocks. This is the dead-space pattern flagged on 19 October.
- Source links and the figure stacked up on the right.

Fixes:
- The builders became cards.
- The timeline text became top-aligned, with its source directly under it.
- The Decides heading was set on two lines, so the panel's columns balance.
- The principles moved from tiles to divided columns, so they don't repeat the cards above.

**Copy rules applied.**
- No em dashes, no "trust", no "designed to", and no rules of three or "X, not Y".
- "Augur Lituus" in full, described as "one of the next versions" of Augur's oracle.
- Holding REP never implies taking part ("Anyone can report…").
- Off-site links alone carry ↗.

**Figure.** 99.97% holds under both published totals:
- 6,545,760.43 of 6,547,546.66 REP (Moon Fork report);
- 6,398,081.41 of 6,399,867.64 REP (Q2 report).

`history.ts` computes it from the first total and rounds down.

**Flagged, not resolved.**
- *Dark Florist and Augur Stratoblast.* The page says Dark Florist builds Augur Stratoblast on Zoltar, following `products.ts` (owner brief, `needsReview`). No primary source read today says so.
  - The testing post calls Dark Florist an independent, Foundation-funded team building a censorship-resistant prediction market with its own oracle research.
  - Dark Florist's GitHub never mentions Zoltar or Statoblast.
  - To confirm with maintainers (launch checklist).
- *"Next generation" on the homepage.* The homepage hero and the FAQ's Augur Lituus answer still say "the next generation of Augur's oracle", against house rule 5. That copy is approved, so it is unchanged here.
- *Launch year.* augur.net posts disagree on it; the 29 January 2026 whitepaper post says 2016.
  - The page follows the newest, the 21 July 2026 post: crowdsale in 2015, mainnet in 2018.
  - It avoids "founded in 2015", because that post dates the crowdsale, not the founding.
- *People.* NN/g's About-page research favors showing the people behind an organization. No names were added. Listing Foundation leadership is the owner's call.

**Checks run.**
- `astro check`: 0 errors.
- Design-system integrity passes.
- Build passes. It was built into a scratch folder, leaving `dist` alone.
- Link check on that build passes: 27 pages, every anchor resolves, including `/#roadmap` and `/#how-it-works`.
- Headless Edge over CDP at 1440, 1280, 1024, 768, 390 and 360: no horizontal overflow, and no console errors on the page.
- Sections were reviewed for dead space at 1440, 1024, 768 and 390.
- Browser pane:
  - headings run h1 → h2 → h3 with no skips;
  - every link is at least 24 px tall;
  - the text has none of the banned words.
- The dev server once served a stale style module, until the file was touched, as noted for the applications heading.

**Not run.**
- Playwright and axe: they can't launch here.
- Forced colours: styles were added but not viewed.
- Budgets: the page adds no script.
- Figma comparison: the frame is still the old design. Figma waits on "update figma".

## REP page rebuilt — 19 October 2026 (owner: “the /rep was entirely vibe coded … research, figure out the UI, copy, UX, everything”)

**Research.**
- *Whitepaper:* the January 2026 Augur Lituus whitepaper was read again for the fork rules (§2.2, §§4.2.1–4.2.4, 4.3.3).
- *Official pages:* the Lituus Foundation's REP contract reference (augur.net/rep) and FAQ (augur.net/faq), the Moon Fork and Q2 reports, and the Etherscan token page.
- *Other token pages:* ethereum.org (ETH, the Merge, staking), UMA, Chainlink staking and token contracts, Kleros PNK, Reality.eth, Polygon MATIC→POL, Sky, Aave, Synthetix, Lido and ENS.
- *Patterns kept:*
  - a role sentence before any reward;
  - holding and taking part as parallel choices ordered by commitment;
  - the downside beside the upside, as a worked example rather than a rate;
  - “check the address, not the name”;
  - a calm, dated account of the fork;
  - an explicit closed door for migration scams.
- *Anti-patterns avoided:* APR headlines, risk buried in docs, an address hidden inside a URL, jokes or fear in notices about funds, and contradictory facts across pages.

**What was wrong.**
- *Hero:* the title was the bare word “REP” beside a large empty column.
- *Roles:* “What REP does” repeated the homepage's report and challenge steps in three columns.
- *Holder note:* a wall of text.
- *Version table:* every Contract cell said “Not yet verified”, although the Foundation publishes the current contract.
- *Fork section:* Augur v2 history and the proposed Augur Lituus rules were mixed in numbered tiles.
- *Missing:* nothing answered what holders ask since the Moon Fork: is AUGUR the same token, why is it missing from my wallet, can I still migrate, and is this offer real.
- *Lost role:* the page dropped the job that augur.net/rep does today. Exchanges, wallets and price trackers were pointed there to confirm the current contract, and this site is to replace it.

**Built** (copy in `src/data/rep.ts`, components in `src/components/rep/`). The story runs from what REP is for to what it asks of the reader.
1. **Hero:** “REP makes lying expensive.”, a lead saying holding never requires taking part, and two in-page anchors for the two holder worries. The token card is the contract reference, where reviewers look first:
   - symbol, on-chain name, listing name, chain, chain ID and decimals;
   - the full address, its first six and last four characters in Paper (the parts people compare with a wallet);
   - Copy (polite status, steady width) and the Etherscan link.
2. **Lying gets more expensive every round:** the escalation as squares that double in area, in three panels (Report, Challenges, Fork) on one baseline, ending at the dashed fork threshold. Then the payout line (80% to winners, 20% burned). It replaces the three role columns and explains why the design is meant to keep answers honest.
3. **Taking part is optional:** Hold, Report and Challenge side by side, each with what you stake, get and risk, from the whitepaper's §4.5 example via `walkthrough.ts`.
   - Gains are the only Green figures.
   - Holding comes first and is marked as where most readers stand.
   - The button leads to the homepage walkthrough rather than repeating it.
4. **If a fork happens:** the four proposed Augur Lituus steps on a rail; the step that asks something of holders has the hollow Green “act” mark from the homepage holder note. Beside them:
   - the split as a picture, labelled as an illustration;
   - the Moon Fork as dated Augur v2 history (Artemis II, 8 April to 3 August 2026, 60-day window), with its rules kept apart from the proposal.
5. **Which REP do you hold?:** a lineage rail like a commit graph. REPv1 and REPv2 sit on the main lane, the Moon Fork splits it, REPv2_Yes_1 carries the main lane on (Green, current) and REPv2_No_1 takes a side lane. Each row says what the token is and what holding it means. The “Migration is closed” notice follows, with the Foundation's own scam guidance.
6. **Questions about REP:** six questions. Four are new, shared with `/faq/`: holding rewards, AUGUR vs REPv2_Yes_1, a token missing from the wallet, and a missed migration. `FaqItem` now leaves out an answer's link when it points at the page the reader is on.

**Decisions and departures.**
- *Contract address:* the earlier rule was “no contract address published by this build”. The REPv2_Yes_1 address is now shown, because:
  - it is the Foundation's published reference, checked on Etherscan, not an invented value;
  - the explorer link must match it (a build-time guard in `rep.ts`);
  - REPv1, REPv2 and REPv2_No_1 show none, because no official source lists one.

  Maintainers still confirm before launch (checklist).
- *No value claims:* the augur.net FAQ's “expected to be worthless” stays off the site. Rows say where development continues instead. No prices, yields or exchange links.
- *Terminology:* the site keeps “challenge” and “appeal period” (the approved homepage words), although the whitepaper says “appeal”.
- *No dead space:* checked at 1440, 1280, 1024, 768, 390 and 360.
  - The first ladder put the stage captions on the round grid, which left a hole after “Challenges” and squeezed “Report” into four lines; it became three panels.
  - The fork steps ended about 140 px above the right column; they now spread along their rail to its height.
  - The FAQ is stacked full width.

**Checks run.**
- `bun run check` (pinned integrity and `astro check`: 0 errors) and `bun run build` (27 pages) pass.
- `check:links` passes: 2,078 destinations; the new Etherscan link is in the registry.
- `check:budgets` passes: /rep is 12.3 KB CSS and 7.8 KB JS gzipped.
- `check:copy` still fails only on the homepage sections that failed before; /rep isn't in its scope.
- `check:launch` stays blocked, and now also lists `repPageReview`, `currentRep` and the four new FAQ flags.
- In headless Edge over CDP:
  - no horizontal overflow at the six widths, including with every FAQ answer open at 360;
  - no console errors;
  - the anchors resolve, and every external link carries ↗;
  - Copy puts the exact address on the clipboard, announces it, keeps its width and resets after 2 s; where the clipboard is refused, the fallback message shows;
  - both entrance scenes stay idle until in view, run 14 and 9 animations, then leave none;
  - a reload, reduced motion and no JavaScript all show the final state;
  - the keyboard order runs hero anchors → Copy → Etherscan → the matrix links.
- Forced colours were viewed, and the missing tile, chip and rail borders were added.

**Not run.** Playwright and axe (they can't launch here; a REP test was added to `tests/site.spec.mjs` but not run), Lighthouse, Safari and Firefox, and real phones. Figma waits on “update figma” (pending list, “REP page rebuilt”).

## What can Augur Lituus power? motion polish — 19 October 2026 (owner: the animations were "awful, simple and weird"; "free to make any changes")

The audit found five faults. The whole panel faded and slid 8 px, then each part faded and slid 6 px on top of that, so every pick moved twice. The answer was a scaled pop with nothing before it. The market picture was a flat cover wiped off at a constant speed over a zigzag that alternated every 40 units. The flight and governance squares slid on a generic curve. The picked row's surface jumped from row to row. Rebuilt as one sentence played top to bottom (ask, answer, act), with one easing family: `settle` (expo out) for things that land, `travel` for marks that move from rest to rest, and `approach` for a mark that brakes into a stop (`timelines.ts`).

- **List:** the picked row's surface is now one marker (`.case-marker`) that glides to the row picked (560 ms, transform only). The name and the Green tile catch up as it lands (120 and 140 ms later). A hairline gives way at once to the arriving marker and shows again only after it has passed. Below 1024 each row keeps its own surface. Forced colours hide the marker, and the picked row keeps its outline.
- **Pick:** the tabs controller now swaps these panels in place (`data-panel-swap`). The shown case fades out over 160 ms while it is still in the shared cell, and then the picked one plays. From 1024 up the panels overlap, so the fade animates `visibility` with `fill: none`, and the hidden case is invisible again afterwards. Below 1024 it simply swaps.
- **Sentence** (`applicationTimeline`): the question rises 14 px over 640 ms. Both chips rise in as equals, in Paper, so neither gives the answer away. At 760 ms the Green fill sweeps across the picked chip (scaleX, 520 ms). The chip gives under it (to 0.96 and back), its label shows, and its check draws as a stroke on Phosphor Bold's own centreline (same geometry, so the end state matches the icon). The other chip steps back to 40% (was 50% in Pewter, so it now starts in Paper). Then the line saying who did not decide rises. The action, its explanation and the picture follow, and Insurance's note comes last.
- **Market:** a price chart. Three grid lines (1, ½, 0) draw in. The Yes price is a smoother, believable walk with a faint Green area under it, and No is its mirror (the two prices add up to 1). The prices draw through a window that slides open while the art inside slides back, with each price's head (8 px square) riding the window's edge. The draw shares one keyframe list, placed on the line's own corners, across the window, the art and both heads, so the heads never leave their lines. The prices slow into the answer, wait while the dashed answer line rises, jump to settled (the Yes head pops, and a Green ring marks the moment), and run out to the edge. The end labels sit on the grid lines.
- **Flight:** the delay is now Paper up to +2 hours and Green past it, drawn with the arrival through the same sliding window. When the arrival passes the limit, a ring marks it and the insured seats fill column by column (14 ms a column, 28 a seat across, scale from 0.2). Until then they show as outlines, so the payout reads as those seats being paid. A new "Landed" label rises as the arrival stops.
- **Governance:** the proposal brakes into the review (`approach`) as the two pause bars rise from their centres. It squashes against them on contact (scaleX 0.86 from its leading edge) and settles: held. The later lane then rises in, a Paper check draws where its review passes (it replaced the Mist pause bars, which read as "held" in both lanes), and the proposal runs all the way to Live, where a Paper ring marks its arrival.
- **Kept:** transform, opacity and two stroke draws only, with no library. Every picture renders final, so no JavaScript, reduced motion and print show the end state. Prediction markets still plays once in view (playOnce), and every case plays when picked. A pick, a resize, print or reduced motion settles it. Green still marks only where the answer acts.

Checked in headless Edge over CDP against the dev server: keyframes for each case at 1440 (pick fade, chip sweep, the market draw with its hold, jump and ring, the flight crossing and seat wave, the gate bump, the later lane and the marker mid-glide). Final states at 1440, 1024, 768 and 390: no dead blocks, and the stage keeps one height from 1024 up (717 px at 1440). No horizontal overflow on fresh loads at 390 and 1024, and no console errors or exceptions. The first in-view play starts at 60% in view and settles. Switching to reduced motion mid-play settles everything, and a pick under reduced motion runs nothing (marker in place, other chip at 0.4). `astro check` is clean. `tests/site.spec.mjs` follows the marker and the 0.4 chip but was not run (Playwright can't launch a browser here). Not checked: forced colours, Safari and Firefox, and the main-thread cost of the seat wave on a slow machine.

## Footer on the site grid — 19 October 2026 (owner: “the footer definitely can be improved, figure out too”)

An audit of the footer at 1440, 1280, 1024, 768, 390 and 360 found these problems:
- The newsletter started at x 736 and the link columns at 496 / 720 / 944 / 1168. Neither matched the other, nor the 500 / 80 / 668 heading row every section above uses (676).
- The contact band's 424 px minimum height left about 116 px of empty Navy under its content.
- The email address sat under the funding line, where it read as the Foundation's, away from the “Talk to us” button.
- The funding line named the Lituus Foundation without linking its verified site (`links.foundation`).
- There were four separate footer nav landmarks (“Footer Augur”, “Footer Products”…), and their h3 headings sat under the contact h2.
- Below 1024 the identity row left the right half empty.

What changed (`SiteFooter.astro`):
- **Grid.** At 1280 and up both rows use the 500 / 80 / 668 columns. The newsletter, the first link column and the sections' heading column now share one edge (measured: 676 at 1440, 601 at 1280). The four link columns split the 668 column with 32 px gaps; “Augur Stratoblast” fits on one line down to 1280. Below 1280 the contact row is 1fr / 1fr and the links are four equal columns, both with 48 px gaps, so the newsletter's edge lands on the third column. The identity row splits on that same edge, so the logo sits left and the funding line on the newsletter's edge. Phones stack, with the links in two columns.
- **Contact band.** The minimum height is gone; the band has 96 px padding (64 on phones). The title wraps balanced, so “team.” no longer sits alone on phones. The email moved beside “Talk to us”, so both ways to reach the team sit together. Its text comes from `links.contact`.
- **Identity.** The logo heads the first column, level with the link headings. At 1280 and up the funding line closes the column as a colophon, its last baseline on the last link row (measured: same bottom as “Whitepaper”). “Lituus Foundation ↗” links to `links.foundation`.
- **Newsletter.** On phones the field and Subscribe stay on one row; they stack only under 375 px, where the placeholder would clip. Validation, status text and the local-only behaviour are unchanged.
- **Semantics.** There is one `nav` labelled “Footer”, and every footer heading is an h2. The contact wrapper is a plain `div` rather than a region labelled with only the contact title. `tests/site.spec.mjs` follows the new landmark name.
- **Considered, not kept.** A “Back to top” link. It sat alone below the columns at every width, and the full directory already ends the page. It also added copy that isn't in Figma.

No copy changed. The phrases are the same, with the email and the Foundation link in new places.

**Checks run:** `bun run check` (0 errors, warnings or hints; 105 files), `bun run build` (27 pages), `check:links` (27 pages, 2,076 destinations), `check:budgets` (exit 0). `check:copy` reports for the footer only the owner-approved contact line still waiting on the Figma sync, as before. Headless Edge over CDP: footer captures at 1440, 1280, 1024, 768, 390 and 360, checked for dead space and alignment. Edges and baselines were measured as above, with no link wrapping and no horizontal overflow at 1440, 1280, 1200, 1024, 768, 390, 375 and 360. In the app's browser pane: an empty submit shows “Enter your email address.”, and a valid one shows the not-connected status. One “Footer” nav landmark. The only console errors were the dev server's HMR socket.

**Not done:** Playwright can't launch here, so the updated test wasn't run. Forced colours, a keyboard pass by hand and Lighthouse were not run. Figma waits on “update figma” (pending list).

## Parallel chats merged into one change — 19 October 2026 (owner: “aggregate everything in a single commit”)

Two chats ran in worktrees (use-case motion polish, footer) while the others edited this folder directly. Their work is combined here. Where they met, the owner's sitewide “Section dividers removed” decision wins, because neither worktree had seen it:
- **Use cases:** the motion polish had turned the hairline above “what the app does” into its own `.case-rule` that drew in. That rule is gone again, and so are its timeline keys and its test check. The gap stays the 72 px left by the divider removal, and the rest of the motion polish is unchanged.
- **Footer:** the footer redesign kept the directory's top border. It is dropped; the 48 / 64 px padding stays.
- **Docs:** each chat's entries are kept in order here and in `figma-workflow.md`.

## How it works: one home per fact — 19 October 2026 (owner: “too noisy … too much cognitive overload … extremely high on signal-to-noise”)

The section said most things two to four times, in three vocabularies (step prose, the REP panel, the query card). “The reward rises” appeared four times, the current state twice (status chip and the “now” row), progress three times (step tabs, the card's segments, Activity), and the stakes twice (Stakes block and Activity amounts). The card's progress segments under “Augur Lituus” also read as a tab bar. Each fact now has one home, and nothing was dropped that isn't said elsewhere:
- **Steps** say what you do. Step 2 now says what follows a report (“Until its appeal period ends, anyone can challenge it.”) instead of restating its payoff, which the panel shows.
- **REP panel** says what you get: a label (“Reward offered”, “If you report”, “If you challenge”, “Your payout”), the figure and a few words (“plus any tips”, “on your bond”, “plus the reward”), the diagram, and the risk line. Gone: the “Your REP” kicker (the Green rule already marks the panel as yours), the sentence after the figure that restated the diagram, and the inset box around the diagram. The meter's caption keeps only the whitepaper example; the scale ends “15 REP fee”, which carries “up to 100% of the fee”.
- **Query card** shows the state of the example: the status chip is the only “now”; the outcome board carries the stakes (below); Activity is history only, one line per event (“15 REP fee”, “30 REP bond”), because each event's explanation is its step's description. The card is a subgrid of three rows (header, question with outcomes, Activity).
- **Lead** drops “Taking part is optional,”: the holder note says it, and the lead keeps the risk (“A wrong call costs your bond.”).

**The outcome board (owner: “not sure this is the best way of displaying this info … rethink”).** A first pass put the outcomes and stakes in one list, each outcome a row with a share-of-total bar. That read as a poll, and answers are not votes: each challenge doubles the bond, and the answer that stands is the one the latest bond backs. The check, name, bar and amount also sat far apart, and Invalid's empty track was noise. The board replaces the list:
- One tile per outcome (`outcome-tile`): the name, its bonds as REP squares, and the amount. A square is one bond-sized unit (15 REP), the same square the REP panel uses for a bond, so the challenge's doubling is visible as two squares against one. Squares are Pewter, Green on the answer that stands, and an empty outline where nothing is staked (“0 REP”, so the empty state is explicit). The label row keeps the step's wording (“Possible outcomes”, “Reported answer”, “Current answer”, “Final answer”) and the total staked.
- One Green frame (`standing-frame`, 1.5 px outline over an 8% Green tint) marks the answer that stands. It is a single element over the tiles, placed by a transform on its column, so it can move.
- Motion on a step forward (`outcomeTimeline`, transform and opacity only): cause, then effect. The bonds the step staked drop into their outcome (each square from 12 px above at 60%, 320 ms newcomer easing, 90 apart); 200 ms after the last square the frame appears on the answer they back (320, reveal) or glides there from the answer they overturned (520, draw), and the check pops as it lands. The glide uses the measured pitch between tiles, so it lands on the resting transform at any width. Going back shows the earlier state without motion.
- **Final (owner: “take them out of focus … making them super small”):** the answer takes the board. Its tile spans the board but a 9.5 rem side column (7.25 rem on phones), its name grows to 24 px (22 on phones), and YES and Invalid become two small struck chips stacked in that column (name and amount, no squares). They are struck, not faded (owner's “never both” rule), and the board keeps its height, so the card never moves. The change plays as a FLIP from the challenge step's layout, which stays laid out under the final card: the ruled-out tiles switch off where they stood (out by 180 ms, shrinking to 92%), the frame widens and the answer slides from its old column with its name growing (from 120 ms over 560, draw), the chips come back small (from 480 over 300) and their strikes draw (from 760, 60 apart).

**The five question fields (owner's field list):** every question has a title, a description (how each outcome connects to the question), resolution criteria (the exact process for verifying the outcome), an outcome list of N outcomes, and an information cutoff (after which new information is disregarded). The card gives each one place. The title is the heading. The information cutoff sits under it at a glance (“Information cutoff 8 Sep 2027, 00:00 UTC”, a `<time>`), because it decides which evidence counts. The description and the resolution criteria are long, so they share the “Question details” disclosure, under small labels. The description is one sentence per outcome, each starting with the outcome in bold, so it scans. The criteria are a numbered list (outlined number squares), because they are a process. The cutoff's Unix time closes the disclosure. The outcome list is the board, one tile per outcome. The example's terms were regrouped from the earlier three paragraphs into these fields with nothing added; the Meissner effect's gloss became “a magnetic field pushed out”. `query` in `src/data/walkthrough.ts` now has `title`, `description[]`, `criteria[]`, `outcomes`, `cutoffDate`, `cutoffIso` and `cutoffUnix`; the guide walkthrough (`GuideWalkthrough.astro`) uses the same title, outcomes and “Information cutoff” label.

Considered, not kept: pinning the risk line to the panel's foot. It filled the stretched panel on desktop, but on phones it opened a 110 px gap between the meter and its note, splitting the loss line from its diagram (proximity). The line follows its diagram, and the spare room stays at the panel's foot.

Remaining, by design: the card keeps one height across steps, so switching steps never moves the page, and the Activity row is as tall as step 4's four entries. Measured empty room under the last Activity row: 125 px on step 1 at 1440 (130 at 390), 83 on step 2, 47 on step 3, 11 on step 4. Filling step 1 would need the “now” row back, which repeated the status chip. The step 1 REP panel also has 100 px spare at its foot on a 390 phone (the panels share the tallest step's height so the card under them never jumps). Opening Question details grows the card past the left column; that is the owner's rule (details grow the card, never the REP panel).

**Checks run:** `bun run check` (0 errors, 0 warnings, 2 hints: unused imports in `RepFlow.astro`, as before; 111 files). `astro build` to a scratch folder (27 pages). `check:copy` passes for How it works; 04, 05 and the footer still fail, as before. `check:links` on that build: 27 pages, 2,099 destinations. Headless Edge over CDP on the scratch build with reduced motion: all four steps and step 4 with Question details open at 1440, 390 and 360. No horizontal overflow on a clean load at any of them. The final chips need exactly their width (152 px at 1440, 116 at 390 and 360), and no tile clips its content. In the browser pane at 1440, frozen frames of the challenge glide and the final FLIP land on their resting positions (the frame matched the NO tile: 900 px left, 198 × 122).

**Performance budget, release blocker:** the homepage ships more JS than the 20 KB gzip budget. At HEAD (`b43c550`) it was already 20,652 bytes; with all uncommitted work in this folder (this rework and the use-case motion polish) it is 21,945. This rework's motion code alone adds about 756 bytes (measured by bundling the committed `home-interactions.ts` with only the walkthrough block spliced in, minified and gzipped). `check:budgets` didn't flag any of this, because it compares the page path with `'dist/index.html'` and on Windows the path is `dist\index.html`, so the homepage JS gate never runs here.

**Found, not fixed:**
- `page-field.ts` sizes the background field from `document.documentElement.scrollWidth`, which includes the field itself. After a window narrows, the page keeps its first width and scrolls sideways (1024 px window, 1425 px page in the browser pane).
- Step tabs: a completed step's strike is one line at 52% of the title box, so when the title wraps (“Challenge a wrong answer” at 360) the line sits between the two lines instead of through them.

**Not done:** Playwright can't launch here, so the updated walkthrough tests weren't run. Widths 1280, 1024 and 768 weren't captured on the final build. Forced colours, keyboard and no-JavaScript weren't checked by hand, and the new motion wasn't measured for main-thread time (it runs only on a step change, with no ongoing loop). Figma waits on “update figma” (pending list).

## What can Augur Lituus power? Hover and direction — 19 October 2026 (owner: “polish the animations … a little interactive when hovering … more professional”)

- **List hover.** A faint copy of the picked row's marker (Dark 3 at 45%) follows the mouse, or keyboard focus with manual activation, across the unpicked rows. Moving between rows it glides (420, the marker's settle curve); coming from outside the list it fades in on its row instead of sliding from the top (`home-interactions.ts` sets `--hover` with the transition off for that first frame). It never sits on the picked row. It replaces the 1 px hover outline, which boxed a row inside a list that is meant to read as one surface with the example; forced colours keep an outline. The hovered row's glyph lifts to 110%.
- **Chart hover.** On fine pointers the market chart reads its prices under the pointer, as a trading chart does: a crosshair, a square on each line and a readout above the plot, “Yes 60%  No 40%”, or “Settled: Yes” past the answer. It reuses the chart's own price line (`marketPrices` in `case-graphics.ts`, now shared with the draw), updates once per frame on transform only, stays hidden while the chart plays in, and flips left near the right edge. The readout's words are made by the script, so no-JavaScript, touch and the copy check never see them. The percentages are the illustrative chart's own values, not data.
- **Direction.** Picking a case lower in the list brings its content up from below; picking one higher brings it down from above, and the case leaving drifts 6 px the same way, so the panel moves with the marker.
- **Considered, not kept.** Hover effects on the builder's reasons (they aren't interactive, so a hover would promise a click), and hover readouts on the flight and gate pictures (no reading there worth a tooltip; their plays already tell them).

**Checks run:** `astro check` (0 errors). Built-in browser at 1440: hover surface on rows 2 and 3 (glide measured mid-transition), keyboard ArrowDown shows it on the focused row, it hides once a row is picked; chart readout before the answer (“Yes 50%  No 50%”) and after (“Settled: Yes”, flipped left); panel entrance offsets +14 going down and −14 going up, the leaving case +6 going up. **Not done:** reduced motion and forced colours by hand, widths below 1024 (the hover surface and readout are off there by design: no marker below 1024, fine pointers only), Playwright (can't launch here). Figma waits on “update figma”.

## Section settle removed — 19 October 2026 (owner: “the scroll on this page is a hell … remove it, leave it normal page”)

`src/motion/section-settle.ts` is deleted and the homepage no longer starts it. Scrolling is plain native scrolling again: nothing glides to a section top after a wheel, trackpad or touch scroll stops. `scroll-behavior: smooth` on `html` stays, so in-page anchor links still glide (instantly under reduced motion). Section paging stays off the table for the reasons in the entry above.

## Homepage v1 and v2 for review — 21 October 2026 (owner: put Ryan's notes, as Augus marked them, into a v2 beside the current homepage)

`/` stays the live homepage, byte for byte. `/1/` is the same homepage for side-by-side review; `/2/` is the v2 variant, built from the same components rather than a copy of the site. This entry is the setup; the v2 sections follow in their own entries.

**The feedback (source of truth for v2).** Ryan's notes, as Augus marked them (dash = do, X = don't, 1–3 = Augus rewrote it): 1 hero headline and art fine (no mark); 2 the hero's cost-of-lying line is too weak, stress the attack cost (do); 3 “Whoever controls the oracle decides who gets paid.” (do); 4 a better word than “parties” in the answer band (do); 5 “Anyone can ask. Anyone can answer.” (do); 6 “?” tooltips on the tenets (X); 7 tell traders plainly that markets do misresolve (do); 8 for integrators, less liability first and less work second (do, Augus note 1); 9 the use-case lead in one sentence, “Any protocol or app that needs to know what happened in the world.” (do); 10 the DAO example checks an upgrade against the DAO's mission or constitution (do); 11 remove “Good for users. Easier on the project.” (X, Augus note 1: keep it, rewritten); 12 How it works has too much detail for the main scroll, put it behind a click (do); 13 “Holding REP?” should say what REP can do and that it is not passive (do, Augus note 2); 14 roadmap fine (no mark); 15 drop “From the blog” for a plain blog link, keep the FAQ (do); 16 split the phone page into about three intents (X); 17 make the differentiators explicit: highest attack cost, no multisigs, no governance (do, Augus note 3). Augus's worry: v2 may become too technical. Augus's notes, verbatim:

1. Good for users. Easier for projects. / "Want Augur in a platform you use? Or one you're building? Talk to us ->" / "Win user trust. Give users independent outcomes they can verify and challenge themselves." / "No team to hire. Pay per question instead of running resolution in-house." / "Stay out of the middle. When outcomes get contentious, Augur's dispute process makes the call - not you."
2. "Holding REP? Utility: Use REP to earn from participating in the oracle. Non-Passivity: Check actively for forks or risk losing the token."
3. Use the first section (the three cards): Permissionless: "Any app can ask. Anyone can answer." / "Report, challenge, or build on Augur. No approvals, no gatekeepers." Trustless: "No governance. No multisigs. No admin keys." / "No company, committee, or even Augur's creators can override an outcome." Robust: "Harder to game. Costlier to manipulate." / "Designed with one of the highest economic barriers to attack among decentralized oracles."

All v2 copy lives in `src/data/homepage-v2.ts`, each entry citing its note. It starts from the reviewed proposal and is draft copy, not approved. It is not flagged `needsReview`: `/2/` is a review route, and the flag would add launch blockers.

**Routes.** `src/pages/index.astro` stays the `/` page and becomes the shared composition: it takes `variant` (`'v1'` by default) and `noindex`, forwards a `version` slot, puts `home-v2` on `<main>` for v2 and passes `variant` to Hero, Tenets, Applications, How it works and Learn more (the roadmap doesn't change). Its init `<script>` is untouched, so the bundle keeps its name and hash. `/1/` and `/2/` come from one dynamic route, `src/pages/[version].astro`, whose `getStaticPaths` gives `1 → v1` and `2 → v2`; it imports `./index.astro` and renders it. Why not `src/pages/1/` and `src/pages/2/`: Astro 7 writes one CSP hash list for the whole build into every page's `<meta http-equiv="content-security-policy">` (every inlined CSS chunk and processed script of every page), in route order. Static routes “1” and “2” sort before “404”, so they would reorder the style hashes on `/` too. A dynamic route sorts after every static route and just before `/`, so the list keeps its order.

**What only `/1/` and `/2/` load.** For the same reason, no v2 or switch code may be a component `<style>`, a stylesheet import or a small processed `<script>`: each would add its hash to `/`. They are imported as strings in `src/components/home/review-inline.ts` (`?inline` gives processed, minified CSS; `?raw` gives the script, from which comment lines are dropped) and rendered `is:inline`; `[version].astro` hashes each string into its own page's CSP. v2 rules go in `src/styles/home-v2.css`, every rule under `.home-v2`. The sheet renders on `/2/` only, before the announcement bar, so it follows the page's own styles and wins ties (its header explains how Astro's scoped selectors count). A small v2 script goes in `v2Inline.scripts` and renders right after its markup. v2 components may import only components `/` already uses (another page's component would split that page's CSS chunk), and must not import modules already bundled into `/`'s scripts (`heritage-glow`, `home-art`, `home-interactions`), which would re-split them. Shared components branch on `variant` in markup only, and v1 output must stay byte-identical.

**Search and safety.** `noindex` is a new `PageLayout` → `BaseLayout` prop: the robots meta reads `indexable && !noindex`, so `/1/` and `/2/` stay `noindex, nofollow` even once the site is indexable; every other page is unchanged. Each gets its own canonical and `og:url` (from its path, as before). The sitemap's fixed list never had them. `robots.txt` doesn't change: a `Disallow` would stop crawlers from reading the noindex. The hero's arrival script hash, inserted only on `/` until now, is now inserted on `/`, `/1/` and `/2/`; without it the CSP would block the script there and the hero would never settle. `vercel.json` gains temporary (307) redirects `/1 → /1/` and `/2 → /2/`; the global `trailingSlash` option would change every route.

**Version switch** (`VersionSwitch.astro`, `version-switch.css`, `version-switch.js`, on `/1/` and `/2/` only). A small fixed pill, “v1 · v2”, in a `nav` labelled “Homepage version”, 24 px in from the bottom-right corner (on phones, on the page gutter) and clear of the safe area. Two 44 × 44 cells; the current version is `aria-current="page"`, in Paper over a 2 px Green rule; the other is muted and brightens on hover. Plain links, so it works without JavaScript and opens the other version at the top. With JavaScript, on pointerdown, focus and click, both links take the section in view: the last of `why-augur`, `applications-heading`, `how-it-works`, `roadmap`, `learn-more` and `contact-title` whose top is in the top third of the screen. v1's use-case section has no id of its own, so both versions use its heading's; v2 must keep all six ids. It renders before the announcement bar, because dismissing the bar slides every element after it and its state script reads the element before it. That makes it second in the tab order, after the skip link. On phones it slides out while the page scrolls down and comes back on any scroll up, near the top and at the end (a passive listener, read once per frame; anchor jumps never hide it; it stays while focused; instant under reduced motion). On wider screens it stays in the corner. The mobile menu is a modal in the top layer and covers it; a `:has()` rule hides it then as well. It is left out of print, gets a border in forced colours, and holds still through the `/1/ ↔ /2/` crossfade (its own view-transition name). At the end of the page it clears the footer's links at 1440, 390 and 360 (measured).

**Considered, not kept.** Static `src/pages/1/` and `src/pages/2/` (reorder `/`'s CSP, above). A switch in the page flow above the announcement bar: it never covers anything, but it scrolls away, and the point of carrying the section is to switch where you are reading. Hiding it on scroll at every width: on desktop the corner is out of the reading line, and a control that is always there is quicker to hit (Fitts's law).

**Checks run:** `astro check` (0 errors, 0 warnings, 2 hints, the two unused imports in `RepFlow.astro` as before; 116 files). Build: 29 pages. All 85 files of the baseline build (`/` at `4884a66`) are byte-identical in the new build, `dist/index.html` and every `_astro` file included; only `1/index.html` and `2/index.html` are new. `/` against `/1/` differs only in the canonical, `og:url`, one extra script hash and one extra style hash in the CSP (the switch), and the switch block (style, nav, script). `/1/` against `/2/` differs only in the canonical, `og:url`, which link has `aria-current`, `class="home-v2"` on `<main>`, and the v2 sheet with its hash once it has rules. A build with `PUBLIC_SITE_INDEXABLE=true`: `/` and `/about/` `index, follow`, `/1/` and `/2/` `noindex, nofollow`, 25 sitemap URLs, none of them `/1/` or `/2/`. `check:links`: 29 pages, 2,277 destinations. `check:copy` gives the same output on `/` and `/1/` as on the baseline (sections 04, 05, 06 and 11 fail, as before). `check:budgets`: `/` unchanged (CSS 20,875 B, JS 22,232 B gzip); `/1/` and `/2/` each CSS 21,506 B and JS 22,595 B, so the switch costs about 360 B of JS and 630 B of CSS, and `/2/` ships nothing more than `/1/`. Headless Edge over CDP with reduced motion: on `/1/` and `/2/` the hero script ran (`data-hero-arrival="settled"`, copy visible), the CSP allowed the switch's style and script, the links carry each of the six anchors (and none at the top), and a probe rule in the v2 sheet applied on `/2/` only (removed again). Scrolling down at 390 hides the pill and scrolling up brings it back; at 1440 it stays; while a link holds focus it stays at 360. Real Tab presses at 390 and 1440: skip link, v1, v2, then the announcement, each with the 2 px focus ring. With the mobile menu open at 360 the pill is `display: none`. At the end of the page no footer link overlaps it at 1440, 390 or 360 (at 360 GitHub ends 22 px above it), and its edge sits on the 24 px gutter, level with the menu button. No horizontal overflow at 1440, 390 or 360; page heights unchanged (8,596 at 1440, 11,996 at 390).

**Not done:** Playwright can't launch here, so `tests/site.spec.mjs` (which picks up `/1/` and `/2/` from `dist`) wasn't run; the CSP was checked by its effects, because the CDP probe doesn't report CSP violations. Forced colours weren't checked by hand. The `check:budgets` homepage JS gate still never fires on Windows (it compares `dist/index.html` with `dist\index.html`), and `/` is over its 20 KB budget as before.

## Homepage v2: hero body and Why Augur — 21 October 2026 (Claude, `/2/` only, draft copy)

From Ryan's notes 2–8 and 17 and Augus's note 3 (quoted in the entry above). `/` and `/1/` are unchanged byte for byte. The v2 strings live in `src/data/homepage-v2.ts`, each with its note and whitepaper section; `Hero.astro` and `Tenets.astro` branch on `variant` in markup only, and every v2 rule is in `src/styles/home-v2.css`.

**Copy, v1 → v2.**
- Hero body ending (Ryan 2): “…and lying is designed to cost more than it pays.” → “…and every challenge doubles the cost of a lie.” The mechanism makes the attack cost concrete: each challenge doubles the bond (whitepaper §2.1 p2, §4.1 p5). The proposal's “doubles what a lie costs” reads less naturally. As a mechanism it needs no “designed to” hedge; the handoff doc had flagged that hedge in the v1 hero. The ranking below keeps “designed to”, because it is an estimate (house rules for this review: “designed to”, never guarantees). The rest of the hero is unchanged (Ryan 1), including “the next generation” (see open questions). Line counts and hero height match v1 at every width.
- Lead (Ryan 3, verbatim): “Whoever tells them what happened controls who gets paid.” → “Whoever controls the oracle decides who gets paid.”
- Band (Ryan 4): “With Augur, users don't rely on parties to control answers.” → “With Augur, no one controls the oracle.” This answers the lead in its own words. It is one line from 768 up and two on phones (v1 takes three on phones). The ribbon splits it into seven words and plays as before.
- Cards (Augus 3: his titles and the facts in each; Ryan 5 and 17):
  - Permissionless: “Any app can ask. / Anyone can answer.” + “Ask, answer or push back. No one has to let you in.” → “Anyone can ask. / Anyone can answer.” + “Projects plug in without asking. No approvals, no gatekeepers.”
  - Decentralized → **Trustless**: “No one in charge. / No one to pressure.” + “Answers come from people with something to lose, not from a back room.” → “No governance. / No one has a veto.” + “No multisigs. Not even Augur’s creators can override an answer.”
  - Bribery-resistant → **Robust**: “Money behind every answer. / Lying is built to lose.” + “Paying for a false answer is designed to cost more than it brings in.” → “Hard to corrupt. / Lies get expensive fast.” + “Designed to cost attackers more than almost any other oracle.”
- Closer: the statement stays (“The answer is nobody’s call.”).
  - For traders (Ryan 7): “Payouts follow what actually happened, / with no authority deciding alone.” → “Seen a market settle the wrong way? / Here, no one decides alone.”
  - For integrators (Ryan 8, Augus 1): “Focus on building and growing your platform. / Leave resolution to Augur Lituus.” → “One bad call can cost a platform its users. / Leave it to Augur Lituus.”

**Where it departs from the reviewed proposal, and why.**
- Permissionless body. The proposal had “Report, challenge or build on Augur Lituus.” That is a rule of three (house rule), and it repeats “Augur Lituus” in the section. The claim already covers asking and answering, so the body adds projects: permissionless use by third parties (§2 p2).
- Trustless claim. The proposal had “No one can override an answer.” At 24 px that line is 375 px and doesn't fit the 336 px column. Even at v1's 22 px it wraps at 1440 (343 px). “No one has a veto.” is the whitepaper's own word (§2 p2: “without any centralized backstops or vetoes”). Augus's “override” moves to the body.
- Trustless body. The proposal had “No multisigs, no admin keys. Not a company, a committee or even Augur’s creators.” “No admin keys” is out: the whitepaper never mentions admin keys or upgradeability, and Lituus-CS isn't shipped. The house rules also allow no promises about unshipped features. “A company, a committee” is out as a rule of three. What remains is two plain sentences that are sourced: no multisigs (Abstract p1), and “or anyone else”, which includes Augur's creators.
- Robust claim and body. The proposal had “Money behind every answer.” and “Every challenge doubles the bond, so…”.
  - Ryan 17 asks for the highest attack cost, and Augus wrote it as a ranking (“one of the highest economic barriers to attack among decentralized oracles”). The whitepaper does make that claim, as the authors' modelled estimate: Abstract p1, “significantly more resistant to attack than all current offerings”; §3 p3, the most expensive to attack of the designs surveyed, about 134% of FDV, “contingent upon the underlying assumptions”; §8 p20. So the body states it once, hedged twice: “Designed to cost attackers more than almost any other oracle.”
  - The claim follows Augus's “Harder to game. Costlier to manipulate.” in plain words, without comparatives that lack a referent.
  - “Money” and “bond” leave the section (house rule: nothing may suggest money buys the answer). The doubling fact stays in the hero.
  - “Money behind every answer.” (341 px at 24 px) wouldn't fit the column either.
- Traders. The proposal had “Here any answer can be challenged, and no one decides alone.” That is two clauses, and “any answer can be challenged” stops being true once an appeal period runs out (§4.1 p5). The question form says plainly that markets misresolve, without the unsourced “many”.
- Integrators.
  - The proposal had “A bad call can turn users against a platform. / Let Augur Lituus make the call, not your team.” “Not your team” is both “X, not Y” and “teams” for projects (house rules). “Make the call” also contradicts “nobody’s call” in the cell beside it.
  - “One bad call can cost a platform its users.” puts the backlash first (Ryan 8). The less-work point stays in the payoff.
  - v1's payoff “Leave resolution to Augur Lituus.” is 323 px, and the last closer cell is 12 px narrower than the middle one (subgrid half-gutters). So it wrapped at 1280, leaving a 30 px empty foot under the traders' line; v1 has the same gap.
  - “Leave it to Augur Lituus.” (it: the call) fits, and both payoffs now wrap at the same widths.
- No tooltips (Ryan 6, X).

**Diagrams.** Permissionless keeps Cross anywhere. Trustless takes No authority, and Robust takes the Peer mesh: one data line each, with no JavaScript or art change, since the loops find their scenes by selector. No authority's lanes fire straight across an empty middle, and the scene was first drawn and named for “Trustless” (`tenet-choreography.ts`). Beside “No governance. / No one has a veto.” it shows that no one stands between question and answer. The mesh, with no centre and a relay running every link, shows why the system is hard to corrupt: there's no single point to buy. Kept in v1's order, the lanes would sit under “Hard to corrupt. / Lies get expensive fast.” and illustrate neither line. The research brief recommended keeping v1's order because Figma 28:7 pairs No authority with the cost copy. That pairing came with “Money behind every answer”, which v2 drops. No existing diagram shows escalating cost, and BondLadder is an HTML panel on `/rep/`, not a tenet scene.

**UI pass (v2 only; type and weight, nothing new).**
- Claims move from v1's off-scale 22/30 to DESIGN.md's H3 24/32 wherever every claim line still fits one line (≥1200 and 768–1023), and to H4 20/26 elsewhere.
- Both claim lines are Paper. In v2 the first line is a differentiator itself (“No governance.”), so the 18 Oct setup/payoff two-tone would mute the point Ryan asked to stress. The closer keeps its two tones, because there the setup is a question and the payoff its answer.
- The tab is back to 184 / 168 px: “Permissionless” is the longest label again (the 200 px tab was for “Bribery-resistant”).
- Bodies and the lead balance, so no line ends on a stray “No” (it did at 1440) and “paid.” is never left alone (it was at 1024).
- 1024–1199: the three-column row has a 229–300 px column. The card insets tighten to 24, the closer text stays on the card text edge (24 + 12) and the reader lines step down to 18/27, as on phones.
- Tablet (≤1023): the shorter copy would leave the copy column's foot empty beside the diagram (17–46 px), so it centres against the diagram, which already centres.
- Phones: the closer statement in H4 fits one line from 375 px; the card gap is 16 and the diagram padding 12/24/16.
- Measured with a width sweep (1024–1440 every 20–40 px, 1023, 900, 768, 700, 600, 480, 414, 390, 375, 360). The three cards and the two reader cells have equal line counts everywhere, so no card or cell has an empty foot. The one exception is 601–655 px, where the side-by-side reader cells are equal width and the traders' payoff wraps a step before the integrators'. That range is not a review width. Measured the same way, v1 leaves empty feet under its cards at 1024–1180 (up to 54 px) and under a reader cell at 1023 and 1280 (30 px).
- Why Augur height, v1 → v2: 1,185 → 1,189 at 1440 (24 px claims), 1,194 → 1,168 at 1280, 1,192 → 1,079 at 1024, 1,613 → 1,533 at 768, 2,231 → 2,080 at 390 and 2,322 → 2,061 at 360. Page: 8,596 → 8,600 at 1440, 11,996 → 11,845 at 390.

**Open questions for Augus.**
1. The ranking line. Is the whitepaper's own estimate fine on the homepage as “Designed to cost attackers more than almost any other oracle.”? `docs/source-material.md` bars new security claims inferred from the papers. This one is stated by the paper, not inferred, but it is modelled and for an undeployed design. The hero could carry it instead: “…and an attack is designed to cost more than on any oracle before it” (§7.5 p20: 46% more than Augur v2's design).
2. “No admin keys”: true for Lituus-CS? If yes, the best-fitting body measured is “No multisigs or admin keys. Not even Augur’s creators can step in.” It keeps two lines at every width measured except 1024, where it takes three and leaves a 24 px foot under the other two cards. “…can override an answer.” takes three lines from 1200 down.
3. “No governance” is sourced for deciding answers (Abstract p1). The paper names tunable parameters (fork threshold, auction timing) without saying who sets them. Is it true for the protocol as a whole?
4. “Trustless” reverses the 18 Oct choice of “Bribery-resistant” (made to keep “trust” out of section 04). The paper uses both words. Keep Augus's?
5. The hero's “the next generation” breaks the handoff rule “one of the next versions”. v2 keeps it, since Ryan likes the hero (note 1).

**Checks run.**
- `astro check`: 0 errors, 0 warnings, 2 hints, as before.
- Build: 29 pages. All 85 baseline files are byte-identical, `dist/index.html` included. `/1/` is byte-identical to the step 1 build. Its `<main>` matches `/` once the `<main>` attributes and inline styles are set aside.
- `check:copy` gives the same output on `/` and `/1/` as on the baseline. `check:links`: 29 pages, 2,277 destinations.
- `check:budgets`: `/` CSS 20,875 B and JS 22,232 B (unchanged). `/1/` CSS 21,515 B (the step 1 build's own figure) and JS 22,595 B. `/2/` CSS 21,859 B (+344 B for these rules) and JS 22,595 B, so there is no new JavaScript.
- Headless Edge over CDP:
  - Section and hero captures at 1440, 1280, 1024 and 768 (plus the heading row at 1024), and at 390 and 360, all looked at.
  - With motion on, the hero arrival runs on `/2/` (CSP allows it), and the band arms with seven `.ribbon-word` spans and settles after its sweep. All three diagram loops run in their new cards. There were no console errors.
  - No horizontal overflow at 1440, 1024, 390 or 360.

**Not done.** Playwright can't launch here. Forced colours and print weren't checked by hand; no rule in this pass touches them. Figma is unchanged: `/2/` is a review copy.

## Homepage v2: What can Augur Lituus power? — 21 October 2026 (Claude, `/2/` only, draft copy)

From Ryan's notes 8–11 and Augus's note 1 (quoted in the setup entry above). `/` and `/1/` are unchanged byte for byte. The strings live in `src/data/homepage-v2.ts` (`homeV2.applications`). `Applications.astro` branches on `variant` in its frontmatter and markup only, and v1's lead stays a literal element. The DAO case is spread over v1's object, so it keeps the same id, icon, title, outcomes and picture. `CaseGraphic.astro` takes optional gate `labels` that default to v1's. Every v2 rule is in `src/styles/home-v2.css`. No JavaScript changed: the gate's play drives data attributes only.

**Copy, v1 → v2.**
- Lead (Ryan 9): “Any app that needs to know what happened in the world. / It asks a question and acts on the answer.” → “Any protocol or app that needs to know what happened in the world.”
- DAOs & governance (Ryan 10):
  - Summary: “Proposals and grants that wait on real-world facts: an audit result or a milestone met.” → “Upgrades and proposals checked against a DAO’s written rules: its constitution and mission.”
  - Question and answer: “Did the upgrade pass its safety review?” No → “Does this upgrade break a rule in the DAO’s constitution?” **Yes**. The picked Green chip now comes first, as in the other two cases. The screen-reader line reads “Answer: Yes.”
  - Who: “Decided in the open, not by the team behind the upgrade.” → “Decided in the open, not by the upgrade’s own developers.”
  - Action: “Hold the upgrade.” → “Block the upgrade.”
  - Explanation: “The proposal goes live once a later review passes.” → “Changes within the constitution can still go live.”
  - Picture labels: “This review” / “A later review” / “Review” → “This upgrade” / “Another change” / “Constitution check”. “Proposal” and “Live” stay.
- Builder's case (Ryan 8 and 11, Augus 1):
  - Title: “Good for users. / Easier on the project.” → “Good for users. / Easier for projects.” (Augus).
  - Ask: “Exploring how it could fit a platform, or just curious? / Ask the team anything.” → “Want Augur Lituus in a platform you use? / Or one you’re building?” It sits beside the same outline “Talk to us” (`/contact/`, no arrow because it is an internal link).
  - Reasons, v1: “No team to hire. The project pays a fee per question instead of staffing resolution.” / “Never the judge. Anyone who disagrees challenges the answer, not the project.” / “Proof, not promises. Every outcome is public, so users can verify it themselves.”
  - Reasons, v2, liability first (Ryan 8):
    1. scales: “Stay out of the middle. Disputes settle in the open. The project never picks a side.”
    2. puzzle-piece: “No team to hire. Pay per question instead of running resolution in-house.”
    3. eye: “Win user trust. Users can check and challenge independent outcomes.”
  - The icons keep their approved meanings (an impartial dispute; it slots in; anyone can see) and move with their reasons.

**Where it departs from the reviewed proposal, and why.**
- Question. The proposal had “Does this upgrade break the DAO’s constitution?”. The whitepaper frames queries as checkable facts (§5 p12, “objective ground truth”), and a question that can't be resolved resolves Invalid (§4.0.1 p3). “A rule in” points at a written clause someone can check, not at a reading of the whole document. It takes two lines at 1024–1440 and three on phones, the same as the proposal's line.
- Explanation. The proposal had “The DAO can still change anything, just not against its own mission.” “Anything… just not” contradicts itself, and the mission is the part open to interpretation. The new line says exactly what the picture's second lane shows: another change passes the check and goes live. v1's explanation described its later lane the same way. It keeps Ryan's “DAOs stay open-ended”, on one line from 1024 up. The alternative “Changes that follow the constitution can still go live.” left “go live.” alone at 1024.
- Who. The proposal had “the developers behind it”. Once the line wraps on phones, “it” sits far from the upgrade. “The upgrade’s own developers” mirrors “the market’s own team” and keeps Ryan's “developers can't rug”.
- Summary. The proposal only said to update it. The new summary keeps Ryan's “mission or constitution”, and “written rules” keeps it checkable. It takes three lines at 1440, like the other two tabs.
- Stay out of the middle. The proposal had “When an outcome is contested, the dispute process makes the call, not you.” Four problems:
  - “Not you” is the “your call” wording AGENTS.md rules out for traders-first copy; this block already moved from “you” to “the project” on 19 Oct.
  - “Makes the call” is the idiom the owner replaced here the same day.
  - “X, not Y” is the negative parallelism the house rules avoid.
  - It measured 3 lines at 1280 and 1100 and 4 at 1024, beside neighbours of two lines.

  The new line works because the project never picking a side keeps a bad resolution from landing on it (Ryan's liability point). Disputes escalate in public (§2.1–2.2 p2), and “in the open” echoes each case's “Decided in the open”. It takes two lines at every width from 1024 to 1440 and on phones. The research draft, “Contested outcomes go to the dispute process, not to the project.”, took three lines at 1100 and 1024.
- Win user trust. The proposal had “Outcomes users can check and challenge themselves.” That is a fragment, and it drops Augus's key word, “independent”. His own sentence trimmed, “Give users independent outcomes they can check and challenge.”, took three lines at 1024–1100. “Users can check and challenge independent outcomes.” keeps his word and stays on two lines from 1024 up.
- The title, the ask, “No team to hire.” and the order are the proposal's: Augus's words, with liability first, then work, then trust.

**Picture.**
- Yes now blocks, so every string and mark agrees with “Block the upgrade.”:
  - This upgrade brakes at the constitution check, and its path to Live stays dashed and empty.
  - Another change passes the check (its tick draws) and runs on to Live, where the ring marks the moment.
  - Green marks only the answer acting.
- v1's pause sign (two 8 px bars, “Hold”) becomes one 16 px Green wall centred on the check: a stop, not a pause.
- Two bars butted together rose 70 ms apart, and in frames captured with motion on they showed a stepped top for a moment as the wall closed. So v2 hides the second bar and widens the first; the script animates whichever bars it finds.
- The proposal brakes 2 px short of the wall, as it did before the bars, so its bump still meets it.
- “Constitution check” stays 22 px clear of “Live” at 360.

**UI pass (v2 only; no new colours, type or effects).**
- The lead balances (`text-wrap: balance`). Unbalanced, “world.” sat alone at 1440. It now runs 341 + 351 px at 1024–1440, one line at 768–1023, two lines at 390 and three even lines at 360.
- From 1024 the stage keeps the tallest case's height (Insurance), so the gate picture had a 48 px empty foot. It now centres in the space under its explanation. At 1440 that is 56 px above it and 72 px under its labels (the panel's own 48 included), instead of 32 and 96.
- Phones (≤767) take the page's phone rhythm from `layout.css`: 64 px section padding and 32 px under the heading row, instead of v1's 72 / 48 at every width.
- The builder lines were chosen by measurement so the three reason columns end level from 1024 to 1440, at two lines each. v1 itself runs 3 / 3 / 2 at 1024.
- The ask stays the title's lead from 1024: two short lines with the button 32 px to the right, so the ask and its action read as one unit. Below 1024 it follows the reasons, with the button right under its text.
- Tap targets: tabs are 56 px on phones and 64 px on tablets; the button is 127 × 48.
- Section height with the default tab, v1 → v2:

  | Width | v1 | v2 |
  | --- | --- | --- |
  | 1440 | 1,378 | 1,378 |
  | 1280 | 1,343 | 1,343 |
  | 1024 | 1,393 | 1,319 |
  | 768 | 1,580 | 1,547 |
  | 390 | 1,876 | 1,734 |
  | 360 | 1,926 | 1,814 |

  The DAO tab on phones grows from 909 to 942 px, because its question takes three lines.
- Page `/2/` height:

  | Width | `/2/` | v1 |
  | --- | --- | --- |
  | 1440 | 8,600 | 8,596 |
  | 1024 | 9,240 | 9,427 |
  | 390 | 11,703 | 11,996 |
  | 360 | 11,991 | 12,364 |

  At 390, `/2/` was 11,845 after the Why Augur step.

**Exceptions to earlier rules, kept on purpose.**
- “Augur Lituus” shows twice in the section's default view: in the heading and in the ask. That breaks the 19 Oct one-mention rule (`tests/site.spec.mjs`, which tests `/` only). The name is the ask's object, and on phones the ask follows the reasons, where “it” would have nothing to point to. This is the same exception as the Insurance note.
- “Trust” was kept out of this section (Augus, 18 Oct; `Applications.astro`; the regex in the `/` test). Augus's own rewrite now says “Win user trust.”, and the v2 Why Augur card says “Trustless”, so v2 follows his newer note. `/` and its test are untouched. “Blame”, “liable”, “protect” and “backstop” stay out.

**Open questions for Augus.**
1. The DAO example. Is a constitution check a fair use case for an oracle that answers checkable facts? It works when the rule is written and checkable; an unclear one would resolve Invalid (§4.0.1). The summary keeps Ryan's “mission”; it can be dropped if only written rules should show.
2. “Win user trust.” reverses his own 18 Oct “no trust” for this section. Can he confirm it?
3. The ask adds a second “Augur Lituus” to the section. Is that fine?
4. “Disputes settle in the open. The project never picks a side.” replaces “…makes the call - not you.” Does it carry Ryan's liability point strongly enough?
5. “Users can check and challenge independent outcomes.” Challenging takes a REP bond within an appeal period (§4.1). Is the line plain enough as a claim, or should it say “check, and challenge if wrong”?

**Checks run.**
- `astro check`: 0 errors, 0 warnings, 2 hints (the two unused imports in `RepFlow.astro`, as before).
- Build: 29 pages. All 85 baseline files are byte-identical, `dist/index.html` and every `_astro` file included. `/1/` is byte-identical to the step 1 build.
- `check:copy` gives the same output on `/` and `/1/` as before. `check:links`: 29 pages, 2,277 destinations.
- `check:budgets`:
  - `/`: CSS 20,875 B and JS 22,232 B (unchanged).
  - `/1/`: CSS 21,515 B and JS 22,595 B.
  - `/2/`: CSS 21,988 B (+129 B for these rules) and JS 22,595 B, so there is no new JavaScript.
- Headless Edge over CDP, with reduced motion:
  - Captures of the section with each of the three tabs selected, the builder block and the heading row, at 1440, 1280, 1024, 1023, 768, 390 and 360. All looked at.
  - A sweep over the same widths and each tab measured line counts, panel feet, the gate's spacing and label clearance, the reason columns and the ask.
  - No horizontal overflow at any of these widths (`scrollWidth` equals the width), and no console errors.
- With motion on, at 1440, the DAO story was frozen at 1.5, 2.25, 2.44, 2.6, 3.3, 3.9 and 4.6 s after its start. In order: the proposal brakes into the check as the wall rises and bumps it; the second lane rises; its tick draws; its proposal runs on to Live.

**Not done.**
- Playwright can't launch here, so no `/2/` test was added to `tests/site.spec.mjs`; it couldn't have been run.
- Forced colours and print weren't checked by hand. The wall keeps v1's forced-colours rule (Highlight), and print shows the same final state as before.
- The launch checklist is unchanged, as in the earlier v2 entries: `/2/` is a review route, and an unchecked item there would become a launch blocker.
- Figma is unchanged.

## Homepage v2: How it works and Holding REP — 21 October 2026 (Claude, `/2/` only, draft copy)

From Ryan's notes 12 and 13 and Augus's note 2 (quoted in the setup entry above). `/` and `/1/` are unchanged byte for byte. The strings live in `src/data/homepage-v2.ts` (`homeV2.howItWorks`, `homeV2.holder`). `HowItWorks.astro` branches on `variant` in its frontmatter and markup only; its scoped `<style>` is untouched. Every v2 rule is in `src/styles/home-v2.css`. The open and close script is `src/components/home/how-it-works-v2.js`, imported as a string in `review-inline.ts` (`v2Inline.scripts.how`), rendered inline right after the section on `/2/` only and hashed into `/2/`'s CSP by `[version].astro`. It imports nothing, so no chunk is shared with `/`.

**Copy, v1 → v2.**
- Heading, kept: “Know what happened? / Get paid to report it.” with its Green “paid” mark. Ryan 12 asks to move the detail behind a click, not to change the promise, and the lead under it now carries the risk.
- Lead (Ryan 12): “Every Augur Lituus answer comes from someone with REP at stake. Report the right outcome first to earn the reward, or challenge a wrong one to win 80% of its bond. A wrong call costs your bond.” → “Stake REP on what you saw. A wrong call costs your bond.” A no-break space keeps “A” with “wrong”.
- New controls: the toggle “Walk through an example” / “Hide the example”, and the step strip (list name “Steps in the example”) with the four step names from `walkthrough.ts`, one source: “A question opens”, “Report what happened”, “Challenge a wrong answer”, “Get paid when it's final”.
- Holding REP? (Ryan 13, Augus 2):
  - v1: “Optional. You never have to report or challenge.” / “But never passive. Holding REP is a duty to the truth. In a fork, move it to the universe that reflects reality, or it loses its value.”
  - v2: “Put it to work, if you want. Stake it to report or challenge answers, and earn when your answer holds.” / “Don’t leave it unattended. In a fork, Augur Lituus is designed to give you two weeks to move your REP to the universe that reflects reality. REP left behind loses its value.”
  - “Learn about REP” stays, the only link in the bar.

**Where it departs from the reviewed proposal, and why.**
- Holding REP, first point. The proposal had “Report or challenge answers to earn rewards. Nothing requires it.” “To earn rewards” reads as a promise (house rule: no guarantees); rewards go only to an answer that holds (§4.3.1 p6; `rep.ts`). “Stake” is Ryan's word and the mechanism: staking a bond is how you report or challenge (§4.1 p5), and the paper has no other staking. “If you want” already says it's optional, so “Nothing requires it” goes (one home per fact); next to the fork point it also read as a contradiction.
- Holding REP, second point. The proposal had “If a fork happens, there’s a two-week window to move your REP to the universe that matches reality, or it loses its value.” That states a proposed design as fact: the two weeks are the whitepaper's summary (§2.2 p2; its specification, §4.2.2 p5, says “a time-frame of weeks”), Lituus-CS forking isn't built, and the Moon Fork's real window was longer (to 3 August 2026). “Augur Lituus is designed to give you” hedges it and says whose design it is. “Reflects reality” is v1's approved wording for the same fact. The loss gets its own sentence about the REP (“REP left behind”), which also keeps clear that a fork never takes the token (Augus's note said “risk losing the token”; the guardrail is value, not token).
- Lead. The proposal left it to this step. v1's three sentences become how you take part and what it risks, ending on v1's own approved sentence. The payout figures (the first reporter's reward, 80% of a wrong bond, exact only for a single challenger, §4.3.1) stay in the example, where the numbers have context. “Stake REP on what you saw” echoes the heading's “Know what happened?” and step 2's “the outcome you saw”.
- A collapse control. The proposal only expanded. The toggle closes it again (APG disclosure pattern; NN/g user control and freedom): the hero's “See how it works” opens the example for anyone who only wanted the gist, and they can fold it away. Closing costs nothing for anyone else.
- No scroll pin in v2. On `/` the example pins and the step follows the scroll (owner, 19 Oct 2026). In v2 it doesn't, and steps are picked by hand. Keeping the pin would need visibility guards in `walkthrough-scroll.ts`, shared code that would change `/`'s script chunk. Bound to a closed example, the pin picks step 2 and can scroll the page when the example is revealed (measured in the research pass). The reader has also already opted in with a click, and the pin's 1,418 px run (at 1440) would give back most of the length this note saves. v2 drops `data-walkthrough-track` and the run, so `bindWalkthroughScroll` returns early; no shared motion code changed. To be confirmed by the owner.
- How it closes. The research plan rendered the example `hidden="until-found"` in the HTML and showed it again under `@media (scripting: none)`. Instead the script closes it while the page parses, right after the section, before it is painted. Without JavaScript, with the script blocked by the CSP, or if it fails, the example simply stays open and the controls stay hidden, so content is never hidden behind script.
- The transition. The plan had a crossfade in which the new snapshot stretched to the box (`block-size: 100%`). Frames showed two problems, so the shipped version differs. The incoming view keeps its natural height and is clipped by the growing box. The strip and the example fade through rather than cross: a crossfade laid the strip's titles over the example's step titles at 40–60 ms at 1440 and 390, and the strip's 8 px gutters flashed the Green step at t0. The band and the sections below are named too, so closing doesn't drop the roadmap onto the shrinking example.
- `docs/launch-checklist.md` is unchanged, as in the earlier v2 entries: `/2/` is a review route, and an unchecked item would become a launch blocker.

**Behaviour.**
- Closed by default: heading, lead, toggle, strip, holder bar.
- The toggle is a native `button` with `aria-expanded` and `aria-controls="how-demo"`. Focus stays on it when it opens or closes the example (a disclosure), and the next Tab goes into the example's step tabs. Its words say what a press does next; `aria-expanded` carries the state; the chevron turns.
- The strip is an `ol` named “Steps in the example”. Each step is a button with `aria-controls` and `aria-expanded="false"`; it only shows while the example is closed. A step opens the example at that step and moves focus to that step's tab (`preventScroll`), because the pressed button disappears with the strip.
- The example is v1's markup with `id="how-demo"`: the tabs, the REP panels and their choreography, the step-height reservation and the Question details sync all run unchanged. Opening dispatches `tabssettled` on it, which re-measures the reserved step height and restarts the REP loop on the laid-out example. While closed, nothing reads or drives it: scrolling past it at 1440 and 390 never changes the step (always step 1), and no REP loop runs.
- Closed, the example is `hidden="until-found"`, so find in page and text fragments can open it (Chromium, Firefox 148+). `beforematch` syncs the toggle and the strip. `base.css`'s `[hidden]{display:none!important}` would defeat that, so `home-v2.css` gives that one element its box back; the browser keeps its content unrendered. In Safari the same assignment makes it plainly hidden.
- Arrivals open it at once, with no transition, because the page is scrolling there: the hero's “See how it works” (a delegated click, since the hero's markup is shared with `/`), any other link to `#how-it-works`, a load with that hash and a hash change to it.
- Print shows the example without the toggle or the strip. Forced colours give every strip tile and its index square a border. Presses during the 380 ms transition are ignored, so a double click opens once.

**Motion** (see `docs/motion.md`). A same-document view transition like the FAQ's, 380 ms on the reveal ease. The strip's box eases to the example's height (or back) and clips the live example, so it unrolls where the strip was. The band grows or shrinks with it and paints its own colour, so a shrinking band never shows the page behind it. The holder bar, the roadmap and Learn more slide with it. The outgoing view fades out over 120 ms and the incoming one fades in over 240 ms from 100 ms. Instant with reduced motion, without view transitions, and on arrivals. Frames were captured with motion on at 0, 40, 60, 120, 140, 190, 250, 280 and 380 ms: opening and closing at 1440, opening at step 3 at 390. No text doubles up, nothing jumps, and `data-how-transition` is gone afterwards.

**UI pass (v2 only; brand tokens and type, nothing new).**
- Heading row from 1024: the toggle sits under the lead in the right column, so the action stays with its text (law of proximity). At 1440 the right column is 33 + 24 + 48 = 105 px against the heading's 96, so neither column ends early. Below 1024 the row stacks: heading, lead, toggle.
- The lead is one line from 1200 up. Where it wraps (1024–1199, phones) it balances into its two sentences; before that it left “your bond.” alone at 1024 and “A” at the end of a line at 390.
- The toggle is an outline button, like the builder's “Talk to us”: one action per section, and a Green fill mid-page would compete with the hero's “See how it works”, which opens the same example.
- The step strip is the example's four steps in order. Each tile is a Navy tile like the example's own step tabs, with the same fill, hover and edge, so they read as the same steps (consistency and standards, NN/g #4; Jakob's law). Each is numbered in the outlined square of the question's criteria list, so the order reads at a glance (recognition rather than recall). Label type (16/24) keeps every step on one line: the longest, “Challenge a wrong answer”, measures 216 px. Four across from 1280 (16 px insets at 1280–1359 keep it on one line), two by two from 768 to 1279, one column on phones, where the open example's steps also stack. Tiles are 60 px tall, 56 on phones (44 px minimum).
- Phones take the page's phone rhythm under the heading row: 32 px, as in the v2 use cases, instead of v1's 48. The section keeps v1's 64 px padding there and 96 from 768.
- The holder bar keeps v1's layout. With the v2 copy it is 115 px tall at 1440 and 1280 (v1: 115 at 1440), 161 at 1024, 207 at 768 and 324 at 390 and 360 (v1: 278 at 390): the fork point is one sentence longer.
- Section and page heights, closed (the default) and open:

  | Width | v1 section | v2 closed | v2 open | `/2/` page, closed | `/` page |
  | --- | --- | --- | --- | --- | --- |
  | 1440 | 2,639 | 576 | 1,194 | 6,537 | 8,596 |
  | 1280 | 2,663 | 576 | 1,218 | 6,460 | 8,573 |
  | 1024 | 2,806 | 723 | 1,407 | 7,157 | 9,427 |
  | 768 | 2,911 | 832 | 1,545 | 8,219 | 10,411 |
  | 390 | 2,370 | 1,036 | 2,352 | 10,369 | 11,996 |
  | 360 | 2,450 | 1,036 | 2,402 | 10,577 | 12,364 |

  Open, v2 is shorter than v1 from 768 up because the pin's run is gone; on phones v1 never pinned.

**Known limit, kept on purpose** (superseded by the review fixes entry below, A11Y-3: it reached steps 2 to 4, not only step 4, and the tab now comes into view once the example lands). Opening at step 4 when the strip sits at the very bottom of a desktop screen leaves step 4's tab below the fold, since focus moves with `preventScroll`. A scripted scroll would break the native-scroll rule (19 Oct 2026). On phones the strip and the open example's tabs line up, so the tab lands where it was pressed.

**Open questions for Augus.**
1. “Two weeks”: print the number? It is the whitepaper's summary (§2.2 p2); its specification says “a time-frame of weeks” (§4.2.2 p5), and the Moon Fork's window was different. Fallback without it: “In a fork, move your REP to the universe that reflects reality before migration closes. REP left behind loses its value.”
2. “Stake it to report or challenge answers”: is “stake” plain enough for beginners? His own note said “Use REP to earn from participating in the oracle.”
3. The main scroll no longer shows the payout figures (the first reporter's reward, 80% of a wrong bond); they are in the example. Fine?
4. For the owner: in v2 the example doesn't pin to the scroll (the 19 Oct v1 decision), and steps are picked by hand.

**Checks run.**
- `astro check`: 0 errors, 0 warnings, 2 hints (the two unused imports in `RepFlow.astro`, as before).
- Build: 29 pages. All 85 baseline files are byte-identical, `dist/index.html` and every `_astro` file included. `/1/` is byte-identical to the build before this step. Every inline script and style on `/2/` has its hash in the page's CSP.
- `check:budgets`:
  - `/`: CSS 20,875 B and JS 22,232 B (unchanged).
  - `/1/`: CSS 21,515 B and JS 22,595 B.
  - `/2/`: CSS 23,050 B (+1,062 B for these rules) and JS 23,070 B, so the collapse costs 475 B over `/1/`. The script alone is 1,451 B, 663 B gzip.
- `check:links`: 29 pages, 2,277 destinations. `check:copy` gives the same output as on the baseline.
- Headless Edge over CDP:
  - Captures of the section at 1440, 1280, 1024, 768, 390 and 360: closed, opened by the toggle, closed again, opened at each of the four steps (`data-active` k, focus on `#walkthrough-tab-k`), and after the hero's “See how it works” (the section lands 24 px from the top, open). All looked at.
  - Motion frames as above.
  - Keyboard: Tab reaches the toggle with a focus ring, Enter opens and keeps focus, Tab goes into the step tabs, Shift+Tab returns, and Enter closes. Tab to step 4 and Space opens there with focus on its tab. Arrow keys still move the tabs.
  - Arrivals from fresh loads: `/2/#how-it-works` opens; a text fragment inside the closed example (`#:~:text=independently%20demonstrated`) opens it through `beforematch` and scrolls to the text; a hash change opens it.
  - No JavaScript (script execution disabled): the example is open and the toggle and the strip are hidden. Print media: the example is shown and the controls are hidden. Forced colours: tiles and index squares are bordered.
  - axe-core 4.13 (the suite's WCAG 2.0/2.1/2.2 A and AA tags), injected over CDP: no violations on `/2/` closed, open and at step 3, at 1440 and 390, and none on `/1/` or the baseline `/`.
  - No horizontal overflow at any of the six widths, and no console errors, including after rapid presses.

**Not done.**
- Playwright can't launch here, so `tests/site.spec.mjs` wasn't run. Its per-route test covers `/2/` (axe, console errors), which the CDP run above approximates.
- Safari and Firefox aren't installed here. Find in page was not pressed by hand; the text fragment exercises the same `beforematch` path.
- No screen reader was used.
- Figma is unchanged.

## Homepage v2: Learn more, page rhythm and phones — 21 October 2026 (Claude, `/2/` only, draft copy)

From Ryan's notes 14–16 (quoted in the setup entry above). `/` and `/1/` are unchanged byte for byte. `LearnMore.astro` branches on `variant` in its frontmatter and markup only: v1's markup stays literal in the else branch, and its scoped `<style>` is untouched, so its frame and answer rules style both variants. The one new string is in `src/data/homepage-v2.ts` (`homeV2.learnMore.lead`). Every v2 rule is in `src/styles/home-v2.css`. No JavaScript was added.

**Copy, v1 → v2.**
- Learn more (Ryan 15):
  - The “From the blog” column is gone: the column heading, the featured post with its cover and description, the second post, and “View all posts”.
  - The “Frequently asked questions” column heading is gone too. The new lead and “View all questions” already say what the list is.
  - New lead beside the heading: “Short answers, each with a link to go deeper.” This is the published `/faq/` lead (`faq.astro`), so it is not new copy for the site.
  - New link beside “View all questions”: “Read the blog” (`/blog/`), a text link with no arrow because it is internal.
  - Unchanged: the heading “Learn more about Augur.” (now on two lines, like “The road to / Augur Lituus.”), the three questions and their answers.
- No other copy changes in this step. The roadmap is untouched (Ryan 14). The page is not split into intents (Ryan 16, X).

**Learn more layout.** One column on the page's shared heading row: heading, lead, the three questions at full width, then the foot. This replaces v1's two columns, which are no longer needed.
- Why not the 500 / 668 split. Measured in the research pass, it would put the heading, lead and actions (about 266 px) beside the questions: 244 px with all closed, 378–456 px with one open. That leaves 112–190 px empty under the heading whenever an answer is open (owner: no short column beside a tall one).
- Full-width rows are what `/rep/` and `/faq/` already do. The whole row is the control, and answers keep v1's 628 px measure.
- All questions now start closed. v1 opened the first one only so its two columns ended level (19 Oct entry); with one column there is nothing to level. Closing it saves 212 px at 1440 and 342 at 390, and the three questions read as a list you can scan (the questions are the information scent).
- The foot copies `/rep/`. The outline “View all questions” sits on the list's left edge, so its label lines up with the questions' 25 px text inset (DESIGN.md). “Read the blog” sits 32 px after it. Side by side the two need 345 px, so on phones they stack 16 apart, the same gap as the hero's two actions. The text link is padded 25 px so its label sits on the same inset. Both are 48 px tall.
- The FAQ morph names the foot (`faq-more`), so it slides under the list instead of jumping. Frames were captured with motion on at 0, 120, 240 and 380 ms at 1440 and at 0, 190 and 380 ms at 390; the 120 ms and 190 ms frames show the foot sliding under the growing list, with no overlap.
- Print shows every answer (`::details-content`) and hides the toggles, as print already shows the How it works example. Browsers without `::details-content` print the questions only.
- Measured with all closed / one open:

  | Width | v1 | v2 closed | v2 with an answer open |
  | --- | --- | --- | --- |
  | 1440 | 846 | 660 | 794–872 |
  | 1280 | 841 | 649 | 783–861 |
  | 1024 | 1,350 | 636 | 770–848 |
  | 768 | 1,291 | 645 | 779–857 |
  | 390 | 1,634 | 760 | 972–1,102 |
  | 360 | 1,670 | 760 | 998–1,154 |

**Page rhythm** (`home-v2.css`, top block). In v1 each section sets its own space, much of it left over from the removed hairlines (19 Oct): 136 above the Tenets and roadmap headings, 72 around the use cases, 96 around How it works, 72 / 96 around Learn more, and 48 under every heading row even on phones. v2 uses three tokens on `main.home-v2`:
- `--section-space`: 96 from 1024, 72 from 768, 64 on phones (DESIGN.md's section scale), at both edges of every section after the hero. Every gap between two sections is therefore 192 / 144 / 128, at a band edge or between two Navy sections alike. No dividers were added (owner, 19 Oct).
- `--heading-gap`: 48, or 32 on phones (layout.css's phone value, which v1's scoped rules overrode). It runs from a heading row to what it introduces. In Why Augur it also sits between the answer band and the cards (v1: 56 and 48).
- `--block-gap`: 64, or 48 on phones, above a section's second block: the builder's case (v1: 80 / 56) and the REP holder bar (v1: 56 / 40).
- The hero keeps its own fit to the first screen. Print sets the section space to layout.css's 32, which v1's scoped paddings override.
- Specificity: ids beat v1's longer scoped selectors (`.tenets[…]>.container[…]:first-child` is 0,5,0); class rules tie and win because the sheet comes later. Step 3's and 4's phone-only spacing rules were folded into the tokens.

**Roadmap (consistency only).**
- The page rhythm above, and the lead balanced like every other v2 lead.
- Below 1024 each panel fits its own milestone instead of reserving 630 / 720 px, as the use-case stage already does from the same width. This removes empty feet of up to 61 px at 768 and 91 at 390. Only what follows the panel moves when the tab changes. The default Now tab is unchanged on phones (725 px, already above 720) and 45 px shorter at 768.
- Where a milestone's two links wrap (phones), they stack 16 apart instead of 24, like the hero's actions and the Learn more foot (law of proximity).
- 768–919 px (iPad portrait): “Implementation” (116 px at 14 px) ran 23 px past its tab at 768, butting into “Testing & audits” and the Now box's edge. This also happens on `/` and `/1/`. In v2 the stop labels step down to 12/18 with 10 px insets in that range, so the longest one ends 8 px inside its box (measured at 768, 820, 900, 919 and 920). Weight and colour still set the labels apart from the 12 px dates. Hyphenation was tried, but headless Edge doesn't hyphenate.
- “From the blog” stays as the reboot milestone's evidence label. Ryan's note 15 is about Learn more, and note 14 says the roadmap is fine.

**How it works holder (whole-page pass).**
- Below 1024 the holder bar stacks, as it does on phones: question, points, link. With the longer v2 points, v1's three-part bar squeezed them into a 300 px column at 768 (seven lines), with the title and the link each floating alone at mid-height. Stacked, it is 236 px tall at 768 (was 207) and has no empty columns.
- From 1280 the fork point is balanced. It ran about 115 characters on its first line at 1440 (844 px at 15 px); balanced, both lines stay under 90. It is not balanced below 1280, because the lines are already under 75 and balancing only widened the gap before “Learn about REP”.

**UI principles.** One shared heading row in every section (consistency and standards, NN/g #4; Jakob's law). Heading, then a one-line lead, then the proof (aesthetic and minimalist design, NN/g #8). One outline action per section, with the blog as a lighter text link. Actions sit next to the list they continue (law of proximity). Spacing comes from one scale, so equal gaps mean equal relationships (law of common region and law of proximity). Nothing is left half empty in any state, and the page is shorter (less scrolling on phones; the owner's no-dead-space rule).

**Heights** (default states, How it works closed, Now tab):

| Section | v1 1440 | `/2/` 1440 | v1 390 | `/2/` 390 |
| --- | --- | --- | --- | --- |
| Hero | 764 | 764 | 797 | 797 |
| Why Augur | 1,185 | 1,141 | 2,231 | 2,016 |
| What can Augur Lituus power? | 1,378 | 1,410 | 1,876 | 1,726 |
| How it works | 2,639 | 584 | 2,370 | 1,044 |
| Roadmap | 926 | 886 | 1,615 | 1,567 |
| Learn more | 846 | 660 | 1,634 | 760 |
| Page | 8,596 | 6,303 | 11,996 | 9,383 |

- The homepage sections alone, without the shared announcement, header and footer:
  - 1440: 7,738 → 5,445 (−30%).
  - 390: 10,523 → 7,910 (−25%, 2,613 px).
- Whole page:
  - 1280: 8,573 → 6,220
  - 1024: 9,427 → 6,387
  - 768: 10,411 → 7,365
  - 360: 12,364 → 9,555
- After step 4 (`/2/` before this step) the page was 6,537 at 1440 and 10,369 at 390.
- Applications grows 32 px at 1440, because 72 + 72 becomes 96 + 96 while the builder gap goes from 80 to 64.
- On phones the footer (1,293 px at 390) is now the tallest block after Why Augur. It is shared by every page, so it is left for its own pass.

**Open questions for Augus.**
1. Is the `/faq/` lead (“Short answers, each with a link to go deeper.”) right for the homepage too? It makes Learn more read like every other section.
2. All three questions now start closed (v1 opens the first). Is that fine?
3. “Read the blog” is a text link beside the outline “View all questions”. Is that the “normal blog link” Ryan meant?

**For the owner.**
- The roadmap label collision at 768–919 px is on `/` too. The same two declarations would fix it there.
- The announcement bar's dismiss button (32 × 32) and “Catch up →” (20 px tall), and the footer's contact email (24 px) and directory links (38 px at 768), are under 44 px on every page. They are shared chrome, so they are out of this step.
- In forced colours the FAQ toggle's plus and minus bars disappear (FaqItem, every page).

**Checks run.**
- `astro check`: 0 errors, 0 warnings, 2 hints, as before.
- Build: 29 pages. All 85 baseline files are byte-identical, `dist/index.html` and every `_astro` file and CSP meta included. `/1/` is byte-identical to the build before this step. Every inline script and style on `/2/` has its hash in the page's CSP (the JSON-LD block is not script and is unhashed on `/` too).
- `check:budgets`:
  - `/`: CSS 20,875 B and JS 22,232 B (unchanged).
  - `/1/`: CSS 21,515 B and JS 22,595 B.
  - `/2/`: CSS 23,453 B (+403 B over step 4) and JS 22,892 B. That is 297 B over `/1/`, the How it works script. `/2/` no longer loads BlogCover's script.
- `check:links`: 29 pages, 2,275 destinations (two fewer: the post links left `/2/`). `check:copy` gives the same output on `/` and `/1/` as on the baseline.
- Headless Edge over CDP, with reduced motion:
  - Every `/2/` section at 1440 and 390, and Learn more and the roadmap at 1024, 768 and 360. Learn more was captured with each question open. The full page was captured at 1440, 390 and 360. All looked at.
  - Width sweeps:
    - Learn more in four states at 1440, 1280, 1200, 1024, 1023, 768, 390 and 360.
    - Roadmap panels for all six tabs at 1440, 1280, 1024, 1023, 768, 390 and 360.
    - Stop labels at 768–920.
    - The holder at 768, 1023, 1024 and 1280.
    - Section paddings and heading gaps at 1440, 1280, 1024, 768, 390 and 360.
  - No horizontal overflow at any width (`scrollWidth` equals the width at 360), and no console errors.
  - Every homepage control is at least 44 × 44 px at 390, 360 and 768. The only smaller ones are in the shared announcement and footer, as listed above.
  - Print, no JavaScript and forced colours for Learn more and the roadmap.
  - FAQ morph frames with motion on.
  - axe-core: no violations on `/2/` at 1440, 768 and 390, as loaded, with the example open and at step 3.

**Not done.**
- Playwright can't launch here.
- No screen reader was used.
- Figma is unchanged.

## Homepage v2: verification pass — 21 October 2026 (Claude, `/2/` only)

A full check of `/`, `/1/` and `/2/` after the five v2 steps above, with fixes to `/2/` where something was wrong. `/` and `/1/` are unchanged byte for byte. No copy changed.

**Fixed (v2 only).**
- Empty page under the footer after closing the example. `page-field.ts` sizes the sitewide field layer from `document.documentElement.scrollHeight`, and that height counts the absolutely positioned layer itself. So the layer can grow but never shrink. On `/2/`, opening the example and closing it again (or opening it at a step, then closing it) left the page at its open height: 1,316 px of empty field under the footer at 390 (10,699 instead of 9,383) and 618 px at 1440 (6,921 instead of 6,303). An FAQ answer or a shorter use case left less. `how-it-works-v2.js` now watches `<body>`. When the content's height changes, it drops the layer to the content's height (it sets the height to 0, reads `scrollHeight` and sets it back in the same task, so nothing paints in between) before `page-field.ts`'s debounced re-measure runs. Measured: closing returns the page to 9,383 / 6,303, after an FAQ answer or a tab change too, with motion on and off; the field still redraws to the full page when the example opens (6,921 at 1440). This adds 62 B gzip. `/` has the same bug (a use-case tab change leaves about 100 px at 390). The fix belongs in `page-field.ts`, which can't change while `/` must stay byte-identical: see “For the owner”.
- Stray last words, found by a scan of every multi-line text in every tab and state at 360, 390, 768, 1024, 1280 and 1440, and fixed with `text-wrap: balance` (line counts never grow):
  - The use cases' “Decided in the open…” line and the action's explanation on phones (“…and close the / No side.”, “…can still / go live.”, “…market’s / own team.”).
  - The builder's third reason at 360 (“…challenge independent / outcomes.”), which v1's `pretty` didn't catch. From 1024 each reason now breaks at its sentence (“Disputes settle in the open. / The project never picks a side.”).
  - The roadmap's Now status at 390 and 1024 (“…completed in July / 2026”), and the Now title at 360 (“Building Augur / Lituus.” is now “Building / Augur Lituus.”).
  - The hero lead at 1200–1300 (“…controlled by no / one.”). Every other v2 lead already balanced; the hero keeps its copy and layout (Ryan 1).

**Looked at and kept.**
- Roadmap evidence boxes end 20–90 px above their story column (every tab, 1024–1440). Story columns end 112 px lower on the Now tab at 1024, where the two links wrap. This is v1's layout, unchanged by Ryan 14.
- “The design, published.” and “Ready for applications.” break before their last word at 360 only. That's v1 copy at the narrowest width; fixing it would mean a smaller roadmap title.
- The open example on phones keeps v1's reserved step height, so a short step description has room under it in the Green step. This is v1's example unchanged (no jump between steps).
- Roadmap stop labels “Testing & / audits” wrap at 768–1023, as in v1.
- The use-case section changes height between tabs on phones (1,726 / 1,940 / 1,861 at 390), as in v1 (1,876 / 2,090 / 1,978).

**Open questions, all v2 entries in one place** (details in each entry above).
- For Augus:
  1. The ranking line, “Designed to cost attackers more than almost any other oracle.”: is the whitepaper's own modelled estimate fine on the homepage (Robust card)?
  2. “No admin keys”: is it true for Lituus-CS? It's left out until it is sourced.
  3. Does “No governance” hold for the protocol as a whole, or only for deciding answers?
  4. Keep “Trustless” (his) over the 18 Oct “Bribery-resistant”? And “Win user trust.” reverses his own 18 Oct “no trust”.
  5. The hero keeps “the next generation” (handoff rule: “one of the next versions”).
  6. Is the DAO constitution check a fair oracle use case, and should “mission” stay in its summary?
  7. A second “Augur Lituus” in the use-case section (the builder's ask): is that fine?
  8. Does “Disputes settle in the open. The project never picks a side.” carry Ryan's liability point strongly enough?
  9. “Users can check and challenge independent outcomes.”: plain enough, given that a challenge takes a bond within an appeal period?
  10. Print the fork's “two weeks” (the whitepaper's summary; its specification says “weeks”)?
  11. Is “Stake it to report or challenge answers” plain enough for beginners?
  12. The payout figures now live only in the example: fine?
  13. The `/faq/` lead in Learn more, all questions starting closed, and “Read the blog” as a text link: is that what Ryan meant?
- For the owner:
  1. In v2 the example doesn't pin to the scroll (a departure from the 19 Oct v1 decision).
  2. The page-field bug on `/`: change `measure()` in `page-field.ts` to zero the layer's height before reading `scrollHeight` (or read the height of `<body>`), then drop the v2 workaround. This changes `/`'s BaseLayout chunk, so it waits until `/` may change.
  3. Also on `/`: the roadmap label collision at 768–919, the 32 px announcement dismiss button, and the FAQ toggle bars in forced colours (step 5 entry).

**Checks run.**
- `astro check`: 0 errors, 0 warnings, 2 hints (the unused imports in `RepFlow.astro`, as before). Build: 29 pages, no warnings.
- `/` against the baseline (`4884a66`): `cmp` identical. All 85 baseline files are byte-identical, every `_astro` asset and every page's CSP meta included; `1/index.html` and `2/index.html` are the only new files. `/1/` is byte-identical to the build before step 4.
- `/` against `/1/`: the canonical and `og:url` (`/1/`), two more hashes in the CSP (the switch's style and script), and the switch block (style, nav, script) before the announcement bar. The robots meta is `noindex, nofollow` on all three in a normal build. With `PUBLIC_SITE_INDEXABLE=true`, `/` is `index, follow` and `/1/` and `/2/` are `noindex, nofollow`; the sitemap has 25 URLs, none of them `/1/` or `/2/`. `/1` and `/2` redirect to `/1/` and `/2/` on the local server. `vercel.json` parses and has both redirects (`permanent: false`, 307).
- `check:budgets` (gzip): `/` JS 22,232 B and CSS 20,875 B (the baseline's own figures). `/1/` JS 22,595 B and CSS 21,515 B. `/2/` JS 22,954 B (359 B over `/1/`: the How it works script and the field fix) and CSS 23,497 B. `/2/` doesn't load BlogCover's script.
- `check:links`: 29 pages, 2,275 destinations (baseline: 27 pages, 2,099). `check:copy`: output identical to the baseline's on `/` and `/1/` (the same known failures).
- Headless Edge over CDP, with reduced motion: captures of every section of `/1/` and `/2/` at 1440 and 390, every use-case tab, How it works closed, opened and at each step on `/2/`, each step on `/1/`, the roadmap, Learn more closed and with an answer open, and the footer. Also `/2/` at 1280 and 1024, the whole page at 360 in readable slices, and the version switch's focus ring after real Tab presses on both pages at 1440 and 390. All looked at.
- Heights: `/1/` 8,596 at 1440 and 11,996 at 390 (equal to `/`). `/2/` 6,303 and 9,383 closed, 6,921 and 10,699 with the example open. No horizontal overflow at 1440, 1280, 1024, 390 or 360. No console errors.
- Keyboard and arrivals at 390 and 1440 (toggle, step 4, arrow keys, `#how-it-works` load, text fragment, hash change) as in step 4. axe-core: no violations on `/2/` at 1440 and 390, as loaded, open, and at step 3. Every inline script and style on `/2/` has its hash in the CSP.

**Not done.** Playwright can't launch here. No screen reader. Figma is unchanged. Nothing committed.

## Homepage v3 and v4 for review — 21 October 2026 (owner: add a Ryan-only version and an Augus-marks version beside v1 and v2)

Two more review copies of the homepage, built from the same components as `/1/` and `/2/`. `/` is unchanged byte for byte, and so is every other baseline file. This entry covers the wiring only: `/3/` and `/4/` render exactly like `/2/` for now. Their sections follow in their own entries.

**The four versions.**
- `/1/` (v1): the homepage as it is, frozen.
- `/2/` (v2, recommended): Ryan's notes as Augus marked them, with fact checks and wording fixes (the entries above).
- `/3/` (v3): Ryan's 17 notes only, all applied, with Augus's marks and notes set aside. Ryan's exact words are used verbatim. Where he gave only a direction, the line says it the most direct way, in his spirit.
- `/4/` (v4): Augus's marks, literal. A dash means do it (in Ryan's words where he gave them), an X means don't, and notes 1–3 are used verbatim. Where neither gave exact words, v4 reuses v2's line.
- v3 and v4 keep the reviewers' own words even where the facts or house rules change them in v2: Ryan's “check in at least once a month”, Augus's “No admin keys” and “risk losing the token”, “Augur” for “Augur Lituus”, “you”. Each such line gets a `FLAG:` comment in its data file and goes into the flag list of its section's entry. Neither version adds a money claim beyond the reviewers' words.
- v3 and v4 share v2's UI system: its rhythm tokens, the collapsed How it works with its step strip, Learn more with the FAQ and the blog link, and the version switch. So the comparison is about content and structure.

**Data.** `src/data/homepage-review.ts` is the one place that lists the versions and hands out their copy:
- `HomeVariant` is now `'v1' | 'v2' | 'v3' | 'v4'`. It moved here from `homepage-v2.ts`.
- `reviewVersions` (`1 → v1` … `4 → v4`) feeds both the route's `getStaticPaths` and the switch's links.
- `homeCopy(variant)` returns `homeV2`, `homeV3` or `homeV4`, or `undefined` for v1.
- `pageClass(variant)` gives `<main>` its class.

`src/data/homepage-v3.ts` and `homepage-v4.ts` spread `homeV2` and override one section at a time, so a section a version doesn't override yet reads v2's copy. A field that only some versions have (v3's intent links; the builder block in v2 and v4) is tested where it is read, with `'field' in copy.section`.

**Components.** Hero, Tenets, Applications, How it works and Learn more now branch on the family instead of on `variant === 'v2'`: `const copy = homeCopy(variant)`, then the review markup when `copy` exists and v1's literal markup otherwise. How it works keeps a `review` flag for its attributes and script. v1 output is byte-identical (`/` and `/1/`, below), and `/2/` renders as before.

**Styles and scripts.** `<main>` is `home-v2` on `/2/`, `home-v2 home-v3` on `/3/` and `home-v2 home-v4` on `/4/`, so v2's rules apply to all three.
- v3-only rules go in `src/styles/home-v3.css` and v4-only rules in `home-v4.css`, every rule prefixed `.home-v3` or `.home-v4`.
- `review-inline.ts` now exports `reviewInline`, with each review version's sheets in order and every script its page renders. v2 gets `[home-v2]`, v3 gets `[home-v2, home-v3]` and v4 gets `[home-v2, home-v4]`. It also exports `reviewScripts`, the shared v2-system scripts (`how`).
- `[version].astro` hashes only its own version's sheets and scripts into the page's CSP and renders the sheets in the `version` slot, after the switch, as before. An empty sheet renders nothing and adds no hash.
- A probe build with a marker rule in each new sheet showed v3's marker only on `/3/` and v4's only on `/4/`, and neither on `/2/`. The markers were then removed.
- The `/2/`-only `v2Inline` export is gone.

**Route, search, redirects.**
- `getStaticPaths` maps `reviewVersions`, so `/3/` and `/4/` come from the same dynamic route, and `/`'s CSP list keeps its order (setup entry above). `Astro.props` is now typed from `getStaticPaths`, so the route has no `Props` interface; `astro check` flagged one as unused.
- All four review copies are `noindex, nofollow`, each with its own canonical and `og:url`.
- The hero's arrival-script hash in `BaseLayout.astro` now covers `/`, `/1/`, `/2/`, `/3/` and `/4/` (`/^\/(?:[1-4]\/)?$/`).
- `vercel.json` adds temporary (307) redirects `/3 → /3/` and `/4 → /4/`, in the same form as `/1` and `/2`.
- The sitemap's fixed list never had the review copies: an indexable build lists 25 URLs, none of them `/1/` to `/4/`.

**Version switch: “v1 · v2 · v3 · v4”.**
- Four links in one `nav` labelled “Homepage version”, built from `reviewVersions`, with `aria-current="page"` on the current one. Plain links, same behaviour as before: it carries the section in view, hides on scroll down below 768, comes back on scroll up and at the ends of the page, and stays while focused.
- It stays small (Fitts's law): every cell is the 44 × 44 minimum, and the dots between cells take no width. Each dot sits centred on the seam between two cells and lets taps through. Four versions fit in 178 × 46 px, about 11 px narrower than with the dots in the flow. It keeps its corner, 24 px from the bottom and right, on the page gutter at phone widths (consistency, NN/g #4). Showing all four versions beats a previous/next control: the reader sees every option and where they are (recognition rather than recall, NN/g #6; visibility of system status, NN/g #1).
- Carried anchors: the list holds only ids that every version renders (`why-augur`, `applications-heading`, `how-it-works`, `roadmap`, `learn-more`, `contact-title`), so a carried anchor always resolves. A block only some versions have carries the nearest shared anchor above it: the builder block in v2 and v4 carries `#applications-heading`, and v3's planned intent links under the hero carry nothing, which opens the other version at the top. Checked on all four pages: every id exists once on each, and from the builder block the links carry `#applications-heading`. Section ids that only one version has must not be added to the list.

**Checks run.**
- `astro check`: 0 errors, 0 warnings, 2 hints (the unused imports in `RepFlow.astro`, as before; 120 files).
- Build: 31 pages.
- All 85 baseline files are byte-identical (`cmp` loop), `dist/index.html` and every `_astro` file included. The four new files are `1/`, `2/`, `3/` and `4/index.html`.
- Against the build before this entry (wf1), `/1/` and `/2/` differ only in the switch: its style, that style's CSP hash, and the two new links. The switch script's hash is unchanged.
- `/3/` and `/4/` against `/2/`: only the canonical, `og:url`, which link has `aria-current`, and the `<main>` class.
- Every inline script and style on `/1/` to `/4/` has its hash in the page's CSP (the JSON-LD block is unhashed, as on `/`).
- Indexable build: `/` and `/about/` are `index, follow`; `/1/` to `/4/` are `noindex, nofollow`; the sitemap has 25 URLs and none of the review copies.
- `check:budgets` (gzip):
  - `/`: CSS 20,875 B and JS 22,232 B (unchanged).
  - `/1/`: CSS 21,537 B (+22 B for the switch) and JS 22,595 B.
  - `/2/`, `/3/` and `/4/`: CSS 23,519 B and JS 22,954 B each.
- `check:links`: 31 pages, 2,457 destinations. `check:copy`: output identical to the baseline's (the same known failures).
- Local server: `/3` and `/4` redirect to `/3/` and `/4/`.
- Headless Edge over CDP:
  - `/3/` first screen at 1440, 390 and 360, the hero at 390, and the end of the page at 1440, 390 and 360. All looked at.
  - Switch geometry at 1440, 390 and 360: four 44 × 44 cells, the pill 178 × 46 px and 24 px from both edges. A tap on each dot lands on the next link.
  - With motion on, `/3/` and `/4/` at 1440 and 390: the hero settles (the CSP allows its script) and the How it works script runs (toggle shown, example closed). Real Tab presses go: skip link, v1, v2, v3, v4, then the announcement, each with the focus ring. No console or log errors.
  - Phone hiding at 390: hidden on scroll down, back on scroll up.
  - No horizontal overflow at 1440, 390 or 360. Page heights equal `/2/`'s (6,303 at 1440, 9,383 at 390).
  - axe-core: no violations on `/3/` and `/4/` at 1440 and 390 (as loaded, with the example open, and at step 3), or on `/1/`.

**For the owner.** At the end of the page, below 380 px wide (360 and 375), the wider pill covers the blank right end of the footer's last left-column row (“Whitepaper ↗”): 10 × 22 px of tap area at 360 and 2.5 px at 375. The label stays 32 px clear, and from 380 up the pill clears it (5 px at 390; GitHub ends 22 px above it). Kept as is. Padding the footer on the review copies would add dead space and change `/1/`'s layout; moving the pill off the 24 px gutter, or hiding it at the end of the page, would undo the 21 Oct choices above.

**Not done.** Playwright can't launch here, so `tests/site.spec.mjs` (which picks up `/1/` to `/4/` from `dist`) wasn't run. Forced colours and print weren't checked by hand; the switch's rules for both are unchanged. Figma is unchanged. Nothing committed.

## Homepage v4: Augus's marks, literal — 21 October 2026 (Claude, `/4/` only, draft copy)

Augus's marks on Ryan's notes, with his notes 1–3 word for word (all quoted in “Homepage v1 and v2 for review” above). `/`, `/1/`, `/2/` and `/3/` are unchanged byte for byte. The strings are in `src/data/homepage-v4.ts`. It spreads `homeV2` and overrides four things: the hero ending, the three cards, the builder block and the holder bar. The v4 rules are in `src/styles/home-v4.css`, which is 507 B inline and hashed into `/4/`'s CSP only. No component, script or shared stylesheet changed.

**What each mark does on `/4/`.**
- No mark on 1 and 14: the hero headline and art and the roadmap stay as in v1.
- Dash, in Ryan's words: 2 (the hero ending), 3 (the lead) and 9 (the use-case lead). v2 already uses 3 and 9 verbatim.
- Dash where neither reviewer gave exact words: 4 (the band), 7 (traders), 8 (the integrators' closer line), 10 (the DAO case), 12 (the How it works collapse) and 15 (Learn more). These are v2's implementations, unchanged.
- Dash plus Augus's note, verbatim: 13 with note 2 (the holder bar) and 17 with note 3 (the cards).
- X on 6: no tooltips. X on 16: no intent split. X on 11: the builder block stays, in note 1's words.

**Copy, `/2/` → `/4/`.**
- Hero ending (Ryan 2, his own example): “…and every challenge doubles the cost of a lie.” → “…and lying is designed to cost more than ever before.”
- Permissionless (Augus 3). The claim stays “Anyone can ask. / Anyone can answer.” The body changes from “Projects plug in without asking. No approvals, no gatekeepers.” to “Report, challenge, or build on Augur. No approvals, no gatekeepers.”
- Trustless (Augus 3):
  - Claim: “No governance. / No one has a veto.” → “No governance. No multisigs. / No admin keys.”
  - Body: “No multisigs. Not even Augur’s creators can override an answer.” → “No company, committee, or even Augur’s creators can override an outcome.”
- Robust (Augus 3):
  - Claim: “Hard to corrupt. / Lies get expensive fast.” → “Harder to game. / Costlier to manipulate.”
  - Body: “Designed to cost attackers more than almost any other oracle.” → “Designed with one of the highest economic barriers to attack among decentralized oracles.”
- Builder block (note 1, in his order):
  - The title stays “Good for users. / Easier for projects.”
  - Ask: “Want Augur Lituus in a platform you use? / Or one you’re building?” → “Want Augur in a platform you use? / Or one you’re building?” It sits beside the same “Talk to us” button. His “->” is that button, which has no arrow because it is an internal link.
  - The reasons move from v2's order (liability, work, trust) to his order (trust, work, liability):
    1. Eye: “Win user trust. Give users independent outcomes they can verify and challenge themselves.”
    2. Puzzle piece: “No team to hire. Pay per question instead of running resolution in-house.” (unchanged)
    3. Scales: “Stay out of the middle. When outcomes get contentious, Augur’s dispute process makes the call—not you.”
  - The icons keep their approved meanings (anyone can see, it slots in, an impartial dispute) and move with their reasons.
- Holder bar (note 2):
  - “Put it to work, if you want. …” → “Utility: Use REP to earn from participating in the oracle.”
  - “Don’t leave it unattended. …” → “Non-Passivity: Check actively for forks or risk losing the token.”
  - The title, the two marks (solid, then hollow for acting in a fork) and “Learn about REP” stay.

**Where the words differ from his note (typography and one carried-over line).**
- “Anyone can ask.” replaces note 3's “Any app can ask.”. He dashed Ryan 5 (“Anyone can ask. Anyone can answer.”), and his note carried the old v1 line over. Flagged below.
- Apostrophes are curly, as on the rest of the site (“Augur’s”, “you’re”). His spaced hyphen (“the call - not you”) is set as a closed em dash.
- No-break spaces only control line breaks. They sit inside each Trustless claim sentence, in “No approvals” (at 1024 the body broke “…Augur. No / approvals”) and in “ever before” (at 1440 the hero left “before.” alone).

**Flags (kept on purpose).** Each has a `FLAG:` comment in `homepage-v4.ts`.
1. “No admin keys.” is unsourced. The whitepaper never mentions admin keys or upgradeability, and Lituus-CS isn't shipped (v2 open question 2).
2. “No governance.” is sourced only for deciding answers (Abstract p1), not for the protocol as a whole (v2 open question 3).
3. “Risk losing the token” is inaccurate. In a fork, REP left in the universe that doesn't reflect reality loses its value (§4.2.2 p5); nothing takes the token. The line also leaves out the window to act, which is two weeks in the proposed design (§2.2 p2); Lituus-CS forking isn't built.
4. “Use REP to earn” states no condition (house rule: no guarantees). Rewards go only to a report or challenge whose answer holds (§4.3.1 p6), and holding REP earns nothing by itself.
5. “Augur” for “Augur Lituus” (AGENTS.md) in three places: “build on Augur”, “Want Augur in…” and “Augur’s dispute process”. “Augur’s creators” is the project, as in v2.
6. “You” (AGENTS.md: traders first, no “your call”) in two places. The ask is scoped to builders by “Or one you’re building?”, as in v2. “Not you” in the third reason is not scoped.
7. “Makes the call—not you” breaks three house rules: it is an “X, not Y” construction, it uses an em dash, and it uses “makes the call”, the idiom the owner replaced on 19 Oct. It also follows the closer's “The answer is nobody’s call.”
8. Rules of three: “Report, challenge, or build”, “No company, committee, or even Augur’s creators” and the three-sentence Trustless claim.
9. “Harder to game. Costlier to manipulate.” are comparatives with nothing to compare against, which is why v2 rewrote them.
10. “Economic barriers” brings money into Why Augur (v2 house rule for this section).
11. “Win user trust.” reverses Augus's own 18 Oct “no trust” for this section, as in v2.
12. “Augur’s creators” is implied only by the paper's “or anyone else” (Abstract p1), as in v2.
13. The ranking appears twice: in the hero (“more than ever before”) and in the Robust body (“one of the highest economic barriers to attack”); v2 says it once.
    - Both are the whitepaper's modelled estimates: Abstract p1 (“unprecedented security”); §3 p3 (134% of FDV against 26–92% for the designs surveyed); §7.5 p20 (46% more than Augur's previous design); §8 p20.
    - Both are hedged by “designed”, and the paper hedges them too: §3 (“contingent upon the underlying assumptions”) and §7.0.2 (“no protocol is strictly more secure than another”).

**Layout (v4 only, `home-v4.css`; no word changed).**
- **Why Augur cards from 1024.** Augus's copy can't end level in three equal columns:
  - Trustless's claim takes three lines.
  - Robust's body is 672 px at 16 px, so it takes three lines in a 245–336 px column.
  - Permissionless is the shortest at every width.

  With v2's order (picture, rule, copy), the shorter cards got empty feet under their copy: 32 px (Permissionless) and 8 px (Robust) at 1280–1440, 26 px under two cards at 1024, and up to 56 px at 1200. Now the copy comes first under the tab, and the picture fills the rest of the card, sitting on its foot.
  - Every claim starts on one line across the row.
  - Each body stays 12 px under its claim (law of proximity).
  - The three pictures share one bottom edge (alignment).
  - The difference falls above the picture, inside its own area. Measured from 1024 to 1440 every 20–40 px, the copy has no foot, and the space above the picture runs 16–72 px.
  - The rule between picture and copy goes, because with copy of different heights it couldn't stay level.
  - This follows the v2 gate picture's precedent: the picture takes the room, not an empty foot.
  - The pictures are `aria-hidden`, so the reading order is unchanged. The diagram loops still run (checked with motion on).
  - Tablet and phones keep v2's layout, one card per row.

  Tried and dropped:
  - Pinning each body to the card foot: claims stayed level, but a 38–68 px gap opened between a claim and its body (measured).
  - Centring the copy: claims would sit up to 28 px apart across the row (half the 56 px difference at 1200).
- **Trustless split.** The setup is “No governance. No multisigs.”, the two points the whitepaper sources (Abstract p1). The payoff is “No admin keys.”, the unsourced one, so it is easy to drop. With no-break spaces inside each sentence, the setup breaks only between them, so every review width shows one sentence per line. The setup fits on one line only just under 1200 px and at 414–600 px. Both lines are Paper, as in v2.
- **Builder reasons.**
  - From 1280 they sit on the page's three-up grid (DESIGN.md: three tiles 400 wide with 24 px gaps, the cards' grid) instead of v1's 80 px gutters. Each reason takes two lines, so the columns end level. With 80 px gutters at 1440, the third reason took three lines beside two (“When outcomes get contentious, Augur’s” is 370 px; the column is now 379–400 px). Principles: consistency and standards (NN/g #4) and similarity.
  - From 1024 to 1279 no column width keeps them level (3 / 2 / 3 lines, or 3 / 2 / 4 at 1024). So each reason is a row, as below 1024: the icon tile beside the claim and point, every point on one line. The title and the ask keep their heading row.
  - Phones and tablet keep v2's rows.
- **Looked at and kept: the holder bar.** It keeps v2's layout (title, points, link). Augus's points are shorter, so at 1280–1440 about 450 px separate them from “Learn about REP”, more than in v2, whose longer fork point fills more of the bar. I tried the two points side by side: at 1440 one took a line and the other two, and at 1280 the balanced lines left gaps in three places. The link stays at the bar's end, as in v1 and v2 (consistency, Jakob's law for notice bars). The bar is 92 px tall from 1024, 190 at 768 and 236 on phones (v2: 115–161 and 236–328).
- **Hero.** At 1440 the body runs to three lines (v2: two), and the hero's height is unchanged at every width (764, 764, 764, 740, 805 and 786 at the six review widths).

**Heights, `/2/` → `/4/`** (fresh loads, reduced motion, default states):

| Width | Why Augur | Builder block | Holder bar | Page |
| --- | --- | --- | --- | --- |
| 1440 | 1,141 → 1,132 | 289 → 289 | 115 → 92 | 6,303 → 6,271 |
| 1280 | 1,120 → 1,111 | 277 → 277 | 115 → 92 | 6,220 → 6,188 |
| 1024 | 1,031 → 1,048 | 271 → 355 | 161 → 92 | 6,387 → 6,419 |
| 768 | 1,461 → 1,501 | 427 → 483 | 236 → 190 | 7,365 → 7,415 |
| 390 | 2,016 → 2,090 | 559 → 611 | 328 → 236 | 9,403 → 9,437 |
| 360 | 1,997 → 2,095 | 585 → 637 | 328 → 236 | 9,579 → 9,637 |

**Open questions for Augus.**
1. Note 3 says “Any app can ask.”, but he dashed Ryan 5's “Anyone can ask.”. `/4/` shows “Anyone”. Is that right?
2. “No admin keys.”: is there a source? Without one, the line can be dropped and the claim ends on “No multisigs.”
3. “Risk losing the token”: the token stays and its value goes. Would he take “…or risk losing its value”?
4. Should “Use REP to earn” carry its condition (only when the answer holds)?
5. “Makes the call—not you”, the em dash and “Augur” for “Augur Lituus” break house rules. Keep them as his voice?

**For the owner.** From 1024, `/4/`'s cards put the copy above the picture, where `/2/` puts the picture first. This is a response to Augus's longer verbatim copy, not part of his notes. If the review should compare identical card layouts, the alternative is v2's order with the empty feet measured above.

**Checks run.**
- Build: 31 pages, `astro check` 0 errors, 0 warnings, 2 hints (as before).
- All 85 baseline files are byte-identical (`cmp` loop), and the only new files are `1/` to `4/index.html`. `/1/`, `/2/` and `/3/` are byte-identical to the build before this step.
- Every inline script and style on `/4/` has its hash in the CSP; the JSON-LD block is unhashed, as on `/`.
- `check:budgets` (gzip):
  - `/`: CSS 20,875 B and JS 22,232 B (unchanged).
  - `/2/` and `/3/`: CSS 23,519 B and JS 22,954 B.
  - `/4/`: CSS 23,787 B (+268 B) and JS 22,954 B, so no new JavaScript.
- `check:links`: 31 pages, 2,457 destinations. `check:copy`: output identical to the baseline's (the same known failures).
- Headless Edge over CDP, reduced motion. Captures of the hero, Why Augur, the use cases (all three tabs), the builder block, How it works (closed and open) and the holder bar at 1440, 1280, 1024, 768, 390 and 360, all looked at.
- Width sweeps:
  - Card line counts, claim tops, picture bottoms and copy feet: every 20–40 px from 1024 to 1440, then 1023, 900, 768, 600, 480, 414, 390, 375 and 360.
  - Builder reason lines: at the same widths.
  - Stray single last words: at 1440, 1280, 1200, 1100, 1024, 768, 600, 414, 390, 375 and 360. Nothing in the v4 copy; the only hits are in sections shared with `/2/`, which shows the same ones.
- No horizontal overflow on fresh loads at the six review widths, and no console errors.
- With motion on at 1440: the hero settles, the band's ribbon settles, all three diagram loops move, and the How it works toggle shows with the example closed.
- axe-core: no violations on `/4/` at 1440, 1024 and 390, as loaded, with the example open, and at step 3.

**Not done.** Playwright can't launch here. Forced colours and print weren't checked by hand: the new rules apply from 1024 px and change no colours. Safari and Firefox aren't installed here. The 1280 builder fit has an 8 px margin (the 370 px line in a 379 px column). No screen reader. Figma is unchanged. Nothing committed.

## Homepage v3: Ryan's notes, literal — 21 October 2026 (Claude, `/3/` only, draft copy)

Ryan's 17 notes, all applied, with Augus's marks and notes set aside (quoted in “Homepage v1 and v2 for review” above). Part 1 covers the hero (notes 1, 2 and 16) and Why Augur (notes 3–8 and 17). Part 2, at the end of this entry, covers notes 9–15 and a pass over the whole page. `/`, `/1/`, `/2/` and `/4/` are unchanged byte for byte.

Where the work lives:
- The strings are in `src/data/homepage-v3.ts`, each with its note, its whitepaper section and any `FLAG:`.
- `Hero.astro` and `Tenets.astro` branch on the copy: a `hero.paths` field renders the fork, and a card `tip` renders the “?”.
- The rules are in `src/styles/home-v3.css`.
- The toggletip's hover and focus script is `src/components/home/tenet-tips-v3.js`. It is hashed into `/3/`'s CSP only (`reviewInline.v3.scripts.tips`).

v3 starts from v1, not from v2. Where Ryan said nothing about a line, it keeps v1's approved words.

**What each note does on `/3/` so far.**
- 1, no change: the hero headline and art.
- 2: the hero ending, in his words.
- 3: the lead, in his words (v2 already uses them).
- 4: one word in the band.
- 5: the Permissionless claim, in his words.
- 6: a “?” definition on each card title.
- 7 and 8: the two reader lines in the closer.
- 16: the three-way fork in the hero.
- 17: the Decentralized and Bribery-resistant cards. v1's titles stay, so each title has a tooltip.

**Copy, v1 → `/3/`.**
- Hero ending (Ryan 2, his own example): “…and lying is designed to cost more than it pays.” → “…and lying is designed to cost more than ever before.”
- Hero actions (Ryan 16): “See how it works” → three links: “For traders” (`#why-augur`), “For REP holders” (`#how-it-works`) and “For builders” (`#applications-heading`). “Read the whitepaper ↗” stays. Part 2 points the three links at their sections' headings (`#tenets-heading`, `#how-heading`, `#applications-heading`); see “Part 2: where the fork lands”.
- Lead (Ryan 3, verbatim): “Whoever tells them what happened controls who gets paid.” → “Whoever controls the oracle decides who gets paid.”
- Band (Ryan 4): “With Augur, users don't rely on parties to control answers.” → “With Augur, users don’t rely on middlemen to control answers.”
- Cards: v1's titles, order and pictures (Cross anywhere, Peer mesh, No authority).
  - Permissionless (Ryan 5): claim “Any app can ask. / Anyone can answer.” → “Anyone can ask. / Anyone can answer.” The body stays v1's: “Ask, answer or push back. No one has to let you in.”
  - Decentralized (Ryan 17):
    - Claim: “No one in charge. / No one to pressure.” → “No governance. / No multisigs.”
    - Body: “Answers come from people with something to lose, not from a back room.” → “Fully trustless: no one holds a veto over any answer.”
  - Bribery-resistant (Ryan 17):
    - Claim: “Money behind every answer. / Lying is built to lose.” → “Built to cost attackers / more than ever before.”
    - Body: “Paying for a false answer is designed to cost more than it brings in.” → “Every challenge doubles the cost of defending a lie.”
- “?” definitions (Ryan 6, new). Each box starts with its term in Paper:
  - Permissionless: “Open to anyone. No one approves who asks a question or who answers it.”
  - Decentralized: “No one is in charge, so there is no one to pressure. Answers come from many independent people.”
  - Bribery-resistant: “Paying for a false answer is designed to cost more than it brings in.” This is v1's approved body, moved here so the fact keeps one home.
- Closer. The statement stays: “The answer is nobody’s call.”
  - For traders (Ryan 7): “Payouts follow what actually happened, / with no authority deciding alone.” → “Many traders have already seen markets misresolve. / Here, no authority decides.”
  - For integrators (Ryan 8): “Focus on building and growing your platform. / Leave resolution to Augur Lituus.” → “A bad resolution can mean PR disasters and backlash. / Let Augur Lituus answer.”

**Why these words.**
- “Middlemen” (Ryan 4 gave no word). It is what a reader already calls whoever stands between a market and its answer. “Parties” reads as legal jargon, and “intermediaries” and “third parties” are no plainer. Nothing else in v1's sentence changes. The ribbon splits it into ten words and plays as before (checked with motion on).
- Decentralized claim. Ryan's own words for his differentiators. Abstract p1: truth “is not decided by token holders, governance, multisigs, or anyone else”.
- Decentralized body. Ryan asked for “no-holds-barred decentralization and trustlessness”, so the body uses the paper's words: “trustless” (Abstract; §2) and no “centralized backstops or vetoes” (§2 p2). “Fully” carries his “no-holds-barred”. Augus's “Augur's creators” is left out: the line is his, and the paper implies it only through “or anyone else”.
- Bribery-resistant claim. Ryan's “attack cost higher than ever before”, in his hero words. It is hedged as v1 hedged this card (“built to lose”): “built to” means “designed to”. It is the whitepaper's modelled estimate:
  - Abstract p1: “unprecedented security”.
  - §3 p3: the most expensive to attack of the designs surveyed (134% of FDV).
  - §7.5 p20: 46% more than Augur's previous design.
  - §8 p20.
- Bribery-resistant body. The why, stated as a mechanism, so it needs no hedge: each challenge doubles the bond (§2.1 p2, §4.1 p5). “Money”, “bond” and “stake” stay out of Why Augur, as in v2.
- Definitions. One or two sentences each, in plain words from the paper:
  - Permissionless: anyone may ask (Abstract, §2, §4.0.1, §4.4.1) and anyone can report (§2).
  - Decentralized: v1's own claim words, plus dispersed knowledge (§1).
  - Bribery-resistant: v1's approved body.
- Traders. Ryan's framing (“a good number of traders… have already seen misresolved markets”) and his word “misresolve”. The payoff is v1's “with no authority deciding alone”, said outright as he asks.
- Integrators. Liability first, in his words (PR disasters, backlash from bad resolutions), with “can” so it reads as a risk. Labour second: the payoff hands the answering to the oracle.
  - v1's payoff, “Leave resolution to Augur Lituus.” (323 px), can't end level with any trader line. The last closer cell is 12 px narrower than the middle one (subgrid half-gutters), so the two payoffs wrap at different widths. A trader line would need to wrap at 1280 (327 px cell) but not at 1023 (324 px cell).
  - “Let Augur Lituus answer.” (240 px) fits every two-column width. Unlike “Leave it to Augur Lituus.” (v2's), it has no “it” to misread after “backlash” as handling the PR.
  - Also tried: “Augur Lituus does the work.”, which is 248 px at 18 px in a 245 px cell at 1024.
  - “A bad resolution can mean a PR disaster and user backlash.” took 3 lines beside 2 at 1200, 1024 and 768. Dropping “user” fixed that, and “backlash” stays his word.
  - Measured: both reader cells take 2 + 1 lines at every width from 655 to 1440 (every 20–60 px) and on phones. At 601–654, which is not a review width, they take 3 + 2 beside 3 + 1, as in v2's 601–655 exception.

**Flags (kept on purpose).** Each has a `FLAG:` comment in `homepage-v3.ts` where it is a reviewer's word.
1. “Many traders” is Ryan's framing and has no source. It is kept unquantified.
2. “No governance.” is sourced for deciding answers (Abstract p1), not for the protocol as a whole (v2 open question 3).
3. The ranking appears twice: in the hero (“more than ever before”) and in the Bribery-resistant claim. Ryan's notes 2 and 17 each ask for it; v2 says it once. Both are modelled estimates for an undeployed design, and the paper hedges them itself: §3 (“contingent upon the underlying assumptions”) and §7.0.2 (“no protocol is strictly more secure than another”).
4. “Fully trustless”: the paper says “trustless”; “fully” is the intensifier for Ryan's “no-holds-barred”.

**The “?” toggletips (Ryan 6).**
- Markup (v3 only; v1, v2 and v4 render the same `<h3>` as before):
  - The title and a `<button>` share a head row. A button inside the `<h3>` would join the heading's accessible name.
  - The button's visible “?” is a 20 px outlined square, like the How it works step numbers. It sits in a 44 × 44 target, 12 px after the word, overhanging the 36 px tab by 4 px at each edge instead of growing it.
  - Its accessible name is “What does permissionless mean?”. `aria-describedby` points at the definition, so a screen reader reads the definition when the button takes focus, open or not.
  - The definition is a native popover (`popovertarget`), so a click, a tap, Enter and Space open and close it, and Esc and a click outside close it, all with no script. The browser exposes `aria-expanded`.
- Script (`tenet-tips-v3.js`, 1,062 B raw):
  - On a mouse, resting on the “?” for 150 ms shows the definition.
  - Moving off both the “?” and the box hides it after 300 ms, so the pointer can cross the 4 px gap onto the box.
  - Keyboard focus shows it, and leaving hides it.
  - A press while it shows that way keeps it open; without this the native toggle would close it. A second press closes it.
  - It meets WCAG 1.4.13: dismissible (Esc), hoverable and persistent.
  - `interestfor` would give hover and focus with no script, but only Chromium supports it. Polyfills would mean CDN imports, which the CSP blocks, or bundled code over the JS budget.
- Position: CSS anchor positioning, with each anchor name set on the element (`style-src-attr` allows it).
  - The box hangs 8 px under the tab, on the card's text edge, no wider than the text column or 336 px. Without the 336 px cap, tablets got 617–696 px boxes holding one 90-character line.
  - It flips above the tab when there is no room below (`position-try-fallbacks: flip-block`).
  - It is in the top layer, so the folder card's clip never cuts it.
  - Browsers without anchor positioning get the browser's centred popover.
  - The open “?” fills Green (Highlight in forced colours), so the state shows (visibility of system status, NN/g #1). The “?” is hidden in print.
- Tab: the title is “Bribery-resistant” again, so the tab is 232 px (216 on phones). That is the room v1's 200 / 184 px tab left after the word, measured past the mark: the mark ends 203 px in (195 at a 24 px inset). It is one width for all three cards, as in v1.
- Principles:
  - Help and documentation where it's needed, and recognition rather than recall: the definition sits beside the term (NN/g #10, #6).
  - Law of proximity: the box sits under its own term and never covers it.
  - Fitts's law: 44 px targets.
  - Consistency (NN/g #4): the step-number square.

**The fork (Ryan 16).**
- Placement: in the hero's action area, not as a band under the hero.
  - The hero fills the first screen at every width (DESIGN.md), so a band under it would always start below the fold. Phones, where Ryan finds the page too long, are included.
  - In the action area it is on the first screen everywhere. At 390 × 844 and 360 × 740 all three links end by 658 px, and at 1024 × 768 by 627 px.
- It replaces “See how it works” instead of adding to it:
  - Hick's law: three choices plus the whitepaper link, instead of five.
  - Jakob's law: it sits where a hero's actions are expected.
  - “See how it works” targeted `#how-it-works`, which the REP link now takes. Any link there opens the example (`how-it-works-v2.js`), so REP holders land on the walkthrough of reporting and getting paid. (Changed in part 2: the REP link now lands on the closed section.)
- Hierarchy:
  - Traders' link is the view's one Green action (DESIGN.md: one Primary per view; AGENTS.md: traders first). The other two are outline links.
  - All three are 48 px tall and 12 px apart, so they read as one group. The whitepaper link takes the next row, 16 px below, as it already did on phones in v1.
  - The labels match the closer's “For traders” (consistency, NN/g #4).
  - The nav is labelled “Jump to”. The links are plain anchors with no script, each to an id every version renders.
- Layout: a container query on the copy column puts the three on one row wherever they fit (402 px needed at 14 px labels, 410 allowed for font differences). Narrower (768, and 414 down to 360), traders' link takes the full row and the other two split the next. No link is left alone on a row (no dead space), and every link is a wide thumb target (Fitts's law).

**Heights, `/2/` → `/3/`** (fresh loads, reduced motion, default states):

| Width | Hero | Why Augur | Page |
| --- | --- | --- | --- |
| 1440 | 764 → 764 | 1,141 → 1,141 | 6,303 → 6,303 |
| 1280 | 764 → 764 | 1,120 → 1,120 | 6,220 → 6,220 |
| 1024 | 764 → 764 | 1,031 → 1,031 | 6,387 → 6,387 |
| 768 | 740 → 740 | 1,461 → 1,505 | 7,365 → 7,409 |
| 390 | 805 → 865 | 2,016 → 2,049 | 9,403 → 9,497 |
| 360 | 786 → 846 | 1,997 → 2,030 | 9,579 → 9,673 |

The fork's second row adds 60 px to the hero on phones. v1's longer band takes two lines at 768 (v2's takes one) and three on phones.

**Measured for dead space.**
- Width sweep at 1440, 1360, 1280, 1200, 1199, 1100, 1024, 1023, 900, 768, 767, 600, 480, 414, 390, 375 and 360.
- The three cards keep 1 + 1 claim lines and 2 body lines with no copy foot from 1024 up. Tablet copy centres against the picture, as in v2. Phones stack the cards.
- Both reader cells end level (above).
- The definitions take 2–4 lines open at 360–1440, none ending on one word.
- Stray last words: none in any string this step changed, at 1440, 1280, 1200, 1100, 1024, 768, 600, 414, 390, 375 and 360. The hits are in sections shared with `/2/`.

**Open questions.**
1. “Middlemen” for “parties”: Ryan named no word. Is it the one he meant?
2. “Many traders have already seen markets misresolve.” has no source. Keep it as his framing, or say “Seen a market settle the wrong way?” as v2 does?
3. “No governance.” and “Fully trustless”: true for the protocol as a whole, or only for deciding answers?
4. The ranking twice (hero and card): fine for Ryan's “explicit, even radical”?
5. The integrators' payoff “Let Augur Lituus answer.” replaces v1's approved “Leave resolution to Augur Lituus.” because the closer cells must end level. “User” left “user backlash” for the same reason.
6. The fork replaces “See how it works”. Is a reader fork in the hero what Ryan meant? (Part 2 changed where “For REP holders” lands; see its open questions.)
7. A definition opened by a press stays open when focus moves on, until Esc or a click elsewhere. Is that fine, or should leaving the card close it?

**Checks run.**
- `astro check`: 0 errors, 0 warnings, 2 hints (as before; 121 files). Build: 31 pages.
- All 85 baseline files are byte-identical (`cmp` loop), `dist/index.html` included; the only new files are `1/` to `4/index.html`. `/1/`, `/2/` and `/4/` are byte-identical to a rebuild of the step-B sources, whose `/1/`, `/2/` and `/3/` match step A's final build.
- Every inline script and style on `/3/` has its hash in the CSP; the JSON-LD block is unhashed, as on `/`.
- `check:budgets` (gzip):
  - `/`: CSS 20,875 B and JS 22,232 B (unchanged).
  - `/2/`: CSS 23,519 B and JS 22,954 B.
  - `/3/`: CSS 24,468 B and JS 23,264 B. That is +310 B of JS over `/2/`, all of it the toggletip script; a hand-minified version gzips no smaller.
- `check:links`: 31 pages, 2,459 destinations. `check:copy`: output identical to the baseline's (the same known failures).
- Headless Edge over CDP, reduced motion: captures of the hero, Why Augur, the cards with each definition open, and the closer at 1440, 1024, 768, 390 and 360, and first screens at 390 × 844, 360 × 740, 768 × 1024 and 1024 × 768. All looked at. No horizontal overflow and no console errors.
- Real input over CDP at 1440 and 390:
  - Keyboard: Tab opens a definition and Enter keeps it. Tab to the next closes the first and opens the second. Esc closes, and Enter opens and closes again. Space keeps it open. Shift+Tab works.
  - Mouse at 1440: closed after 80 ms of hover, open after 480 ms. It stays open with the pointer on the box and closes 300 ms after leaving. Hover then click keeps it open after leaving; a click outside closes it. A quick click opens it and a second click closes it.
  - Touch at 390: a tap opens it, a second tap closes it, and a tap outside closes it.
  - Near the foot of the screen the box flips above the tab.
  - In every state the box stays clear of its term and its button, and inside its card's edges (32 px in, 24 on phones).
  - Accessibility tree: role button, the name above, the definition as its description, and `expanded` following the state.
- With JavaScript off, a real click opens the definition, and the fork's three links are plain anchors.
- With motion on: the hero settles, and the band's ribbon arms with ten word spans and settles.
- Forced colours (the cards with a definition open, and the hero) and print (the “?” hidden) were captured and looked at.
- Tap targets: every `/3/` homepage control is at least 44 × 44 px at 360, 390, 768 and 1440: the “?” buttons are 44 × 44 and the fork links 48 px tall. The only smaller ones are shared chrome: the announcement and footer items listed in the v2 entries, and the header's 40 px nav items at 1440.
- axe-core: no violations on `/3/` at 1440 and 390: as loaded, with the example open, at step 3, and with each definition open.

**Not done.**
- Playwright can't launch here. No screen reader.
- Safari and Firefox aren't installed here, so the centred-popover fallback (no anchor positioning) wasn't seen.
- Figma is unchanged. Nothing committed.

**Part 2: notes 9–15 and the whole page.** `/`, `/1/`, `/2/` and `/4/` are unchanged byte for byte. The strings are in `src/data/homepage-v3.ts` (`applications`, `holder`, and the fork's `href`s). `Applications.astro` renders the builder block only when the copy has one (`'builder' in copy.applications`); v1's `builderCase` stays literal and renders the same bytes. No CSS or JavaScript was added, so `/3/`'s budgets and CSP hashes are unchanged.

**What each note does on `/3/`.**
- 9: the use-case lead, in his words. v2 already uses the line, so v3 reads it from `homeV2`.
- 10: the DAO case in his framing (a change against the DAO's mission statement or constitution; DAOs stay open-ended; developers can't rug), with the picture relabelled to agree.
- 11: the builder block is gone: title, reasons, ask and its “Talk to us”.
- 12: v2's collapse, strip, toggle and lead, unchanged.
- 13: “Holding REP?” says what REP can do and that it isn't passive, with his cadence verbatim.
- 14: the roadmap is unchanged (v2's rhythm only, as on `/2/`).
- 15: v2's Learn more, unchanged.

**Copy, v1 → `/3/`.**
- Lead (Ryan 9, verbatim): “Any app that needs to know what happened in the world. / It asks a question and acts on the answer.” → “Any protocol or app that needs to know what happened in the world.”
- DAOs & governance (Ryan 10):
  - Summary (the tab's blurb; the panel's first line below 1024): “Proposals and grants that wait on real-world facts: an audit result or a milestone met.” → “Proposed improvements and protocol changes checked against a DAO’s mission statement or constitution.”
  - Question and answer: “Did the upgrade pass its safety review?” **No** → “Does this change conflict with the DAO’s mission statement?” **Yes**. The picked Green chip comes first, as in the other two cases.
  - Who: “Decided in the open, not by the team behind the upgrade.” → “Decided in the open, not by the DAO’s own developers.”
  - Action: “Hold the upgrade.” → “Block the change.”
  - Explanation: “The proposal goes live once a later review passes.” → “Developers can’t rug the DAO. Changes that fit its mission still go live.”
  - Picture labels: “This review” / “A later review” / “Review” → “This change” / “Another change” / “Mission check”. “Proposal” and “Live” stay. The check holds v2's one Green wall (a stop, not v1's pause).
- Builder block (Ryan 11), removed: “Good for users. / Easier on the project.”, the three reasons (“No team to hire.”, “Never the judge.”, “Proof, not promises.”), the ask “Exploring how it could fit a platform, or just curious? / Ask the team anything.” and its outline “Talk to us”.
- How it works (Ryan 12): v2's. The heading stays; v1's three-sentence lead → “Stake REP on what you saw. A wrong call costs your bond.”, then “Walk through an example” and the four-step strip.
- Holding REP? (Ryan 13). The title and “Learn about REP” stay.
  - v1: “Optional. You never have to report or challenge.” / “But never passive. Holding REP is a duty to the truth. In a fork, move it to the universe that reflects reality, or it loses its value.”
  - `/3/`: “Put it to work. Stake it to report what happened and earn extra.” / “Never passive. In the event of a fork, you have to check in at least once a month. Move your REP to the universe that reflects reality, or it loses its value.”
- Learn more (Ryan 15): v2's. No “From the blog” column; the three questions under the `/faq/` lead “Short answers, each with a link to go deeper.”, then “View all questions” and “Read the blog”.
- Hero fork (Ryan 16, part 1's links): `#why-augur` → `#tenets-heading` and `#how-it-works` → `#how-heading` (below). No visible word changes.

**Why these words.**
- Question. “Conflict” and “mission statement” are his; “this change” is the picture's first lane word for word, so the question, the lane and “Block the change.” name one thing. His two kinds of change (“proposed improvement or protocol change”) and his two documents sit in the summary. “Does this protocol change conflict with the DAO’s mission statement?” took three lines at 1024 and four at 390; this one takes two from 1024 up, one at 1023, three at 390 and four at 360–375.
- Who. “The DAO’s own developers” are the people his “developers can't rug” is about, and it reads like the other cases' “the market’s own team”.
- Explanation. His two points, one sentence each, so it breaks between them wherever it wraps from 375 up: “developers can't rug” as he said it (jargon is fine for him), then “DAOs stay open-ended” said the way the picture's second lane shows it: a change that fits the mission passes the check and goes live.
- “Mission check”. The question asks about the mission statement; “Constitution check” would point at the other document.
- Holder, first point. His “report to earn extra” and “stake” in one clause: staking a bond is how you report (§4.1 p5), and the paper has no other staking, so it can't read as staking for a yield. Challenging isn't in his note; the example and “Learn about REP” cover it.
- Holder, second point. His reminder verbatim, with a comma after “fork”, then v1's approved sentence for what checking in is for: without it “check in” has no object. “Never passive.” is v1's “But never passive.” without “But”, since “Optional.” went with his rewrite.

**Flags (kept on purpose)**, continuing part 1's list. Each has a `FLAG:` comment in `homepage-v3.ts`.
5. The question asks about a mission statement, which is open to interpretation. The whitepaper wants questions with an objective ground truth (§5 p12), and one that can't be resolved resolves Invalid (§4.0.1 p3). v2 asks about “a rule in the DAO’s constitution” for that reason.
6. “Developers can’t rug the DAO.” is a guarantee (house rule: “designed to”, never guarantees). It holds only where the DAO's upgrade path waits on the answer, as the case sets up. “Rug” is crypto slang.
7. “At least once a month” is Ryan's cadence and doesn't match the paper: a fork opens a two-week, one-way migration window (§2.2 p2; “a time-frame of weeks”, §4.2.2 p5), a proposed design (Lituus-CS forking isn't built). A monthly check could miss the window, and REP left behind loses its value. The paper sets no check-in cadence. v2 says “designed to give you two weeks”.
8. “Earn extra” states no condition (house rule: no guarantees). Rewards go only to a report or challenge whose answer holds (§4.3.1 p6), and holding REP earns nothing by itself (§4.4.4; `rep.ts`).
9. “You have to” states a duty, and “you” addresses the reader (AGENTS.md: traders first). The bar is scoped to REP holders by its title. With v1's “Optional.” gone, nothing on the page says reporting and challenging are optional any more (house rule: never imply holders must report or challenge); nothing says they're required either.

**Without the builder block.** The use cases now end the section: the stage, then the section's own space (96 / 72 / 64, measured equal to `/2/`'s at 1440, 1024, 768, 390 and 360). From 1024 the tab list and the stage share one height, so the section ends on one edge; below 1024 it ends on the picked case's panel. The block's points are where Ryan says they started: the liability point in the closer's integrators line (part 1: “A bad resolution can mean PR disasters and backlash. / Let Augur Lituus answer.”), and the contact ask in the header's “Talk to us” and the footer's “Building on it? Tell us what your project needs.” The version switch needs nothing: in v2 and v4 the block carries `#applications-heading`, which `/3/` still renders. `check:links` counts one destination fewer (the block's `/contact/`).

**Part 2: where the fork lands (Ryan 16, revisited).** Measured with part 1's links at 1440 × 900 and 390 × 844:
- “For traders” (`#why-augur`, the section) put its heading 120 / 88 px down, while “For builders” (`#applications-heading`, a heading) put its heading at 24 px.
- “For REP holders” (`#how-it-works`) opened the example, because `how-it-works-v2.js` opens it for any link to that anchor. On phones “Holding REP?”, Ryan 13's bar for exactly these readers, then ended 2,297 px down.

Each link now targets its section's heading: `#tenets-heading`, `#how-heading` and `#applications-heading`, ids every version renders.
- All three land the same way, with the heading 24 px from the top (base.css scroll padding). Consistency (NN/g #4): one link, one kind of landing.
- REP holders land on the closed section. At 390 × 844 the heading, the lead, the toggle, the four steps and “Holding REP?” with both points are in view (the bar ends at 917 px, so “Learn about REP” sits just under the fold). At 1440 the whole section ends at 416 px. Progressive disclosure, as Ryan 12 asks, and information scent: the reader sees the overview and their own bar first, and one press opens the example at any step (user control and freedom, NN/g #3).
- No script changed. `how-it-works-v2.js` is shared with `/2/` and `/4/`, and editing it would change their CSP hash.
- A real Enter on each link lands the same, and the next Tab goes to the section's first control: the first “?”, the toggle, the first use-case tab. Without JavaScript the anchors land the same, with the example open, as on `/2/`.
- The version switch still carries the section: `#why-augur`, `#how-it-works` and `#applications-heading` after the three landings (checked at 1440 and 390).

**Whole-page pass.**
- Rhythm: section paddings, the 96 / 72 / 64 section space and the 48 / 32 heading gaps match `/2/` at 1440, 1024, 768, 390 and 360.
- DAO tab: from 1024 the stage keeps the Insurance case's height, as on `/2/` (721, 709, 687, 685 and 704 px at 1440, 1280, 1200, 1100 and 1024), and the gate centres under the explanation. The tab's blurb takes three lines at 1280–1440 and four at 1024, like Prediction's; the three rows keep one height.
- Typography: no-break spaces only, no word changed:
  - “or constitution.” The summary left “constitution.” alone on the tab's fourth line at 1024 and on the panel's at 360.
  - “once a month.” The fork point broke “once a / month.” at 1024–1440 and at 390. From 1280 its balanced lines now break between the two sentences; at 390 it takes five lines (four before).
- Stray last words: scanned at 1440, 1280, 1200, 1100, 1024, 768, 600, 414, 390, 375 and 360, every tab and state. None in a `/3/` string; the remaining hits are in sections shared with `/2/` (the same list as `/2/`'s).
- No horizontal overflow at 1440, 1024, 768, 390 or 360. Page height returns to its closed value after opening and closing the example and switching tabs (5,950 at 1440, 8,847 at 390).
- Tap targets: every homepage control is at least 44 × 44 px at 1440, 768, 390 and 360. The smaller ones are the shared chrome listed in the v2 entries.

**Considered, not kept.**
- “Does this protocol change conflict with the DAO’s mission statement?”: three lines at 1024, four at 390.
- Keeping part 1's open landing for REP holders: above.
- “Constitution check” on the gate: the question names the mission statement.
- Balancing the holder's points below 1280 too: at 768 and 1200 it would break at the sentence, but at 1024, 600 and on phones it gave worse breaks (“In the event of / a fork”). v2's balance from 1280 stays.

**Heights, `/2/` → `/3/`** (shoot.ts fresh loads, reduced motion; use cases with each tab, How it works closed):

| Width | Use cases (tabs 1 / 2 / 3) | How it works | Holder bar | Page |
| --- | --- | --- | --- | --- |
| 1440 | 1,410 → 1,057 | 584 → 584 | 115 → 115 | 6,303 → 5,950 |
| 1280 | 1,375 → 1,034 | 584 → 584 | 115 → 115 | 6,220 → 5,879 |
| 1024 | 1,351 → 1,016 | 731 → 708 | 161 → 138 | 6,387 → 6,029 |
| 768 | 1,555 / 1,705 / 1,689 → 1,064 / 1,214 / 1,198 | 821 → 798 | 236 → 213 | 7,365 → 6,895 |
| 390 | 1,726 / 1,940 / 1,861 → 1,123 / 1,337 / 1,258 | 1,044 → 1,021 | 324 → 301 | 9,383 → 8,847 |
| 360 | 1,806 / 2,050 / 1,917 → 1,177 / 1,421 / 1,368 | 1,044 → 1,021 | 324 → 301 | 9,555 → 8,993 |

From 1024 the three tabs share one height. Against `/` (v1), the page is 8,596 → 5,950 at 1440 and 11,996 → 8,847 at 390 (−26%), the fork's extra row in the hero included.

**Open questions (part 2).**
8. The DAO question asks about a mission statement, Ryan's framing, which isn't an objective fact in the whitepaper's sense (v2 asks about a written rule). Keep his?
9. “Developers can’t rug the DAO.”: fine as a claim, and is “rug” plain enough for a general reader?
10. “At least once a month” can miss a two-week migration window. Keep his cadence, or say the window as v2 does?
11. “Earn extra” carries no condition, and with “Optional.” gone nothing says reporting is optional. Fine for Ryan's version?
12. Without the builder block, builders who follow “For builders” reach the use cases and then only the header's “Talk to us” and the footer's “Building on it?”. Enough?
13. For the owner: the fork links now land on headings, so the address bar shows `#tenets-heading` and `#how-heading` rather than `#why-augur` and `#how-it-works`. Fine?

**Checks run (part 2).**
- `astro check`: 0 errors, 0 warnings, 2 hints (as before; 121 files). Build: 31 pages.
- All 85 baseline files are byte-identical (`cmp` loop), `dist/index.html` included; the only new files are `1/` to `4/index.html`. `/1/`, `/2/` and `/4/` are byte-identical to part 1's build, so `/1/` still equals wf1 apart from the switch, and `/2/` and `/4/` are unchanged.
- Every inline script and style on `/3/` has its hash in the CSP; the JSON-LD block is unhashed, as on `/`.
- `check:budgets` (gzip), unchanged by part 2: `/` CSS 20,875 B and JS 22,232 B; `/2/` 23,519 and 22,954; `/3/` 24,468 and 23,264; `/4/` 23,787 and 22,954.
- `check:links`: 31 pages, 2,458 destinations. `check:copy`: output identical to part 1's (the baseline's known failures).
- Headless Edge over CDP, reduced motion:
  - Captures of the hero, Why Augur, the use cases with each tab, How it works closed and open, the holder bar, the roadmap, Learn more and the full page at 1440, 1024, 768, 390 and 360. All at 1440 and 390 looked at, plus the DAO tab and the holder bar at 1024, 768 and 360.
  - Line measurements of every new DAO string and the holder points at 12 widths, and of the candidates above.
  - The three landings by click and by real Enter at 1440 and 390, with the next Tab and the switch's carried anchor.
  - No JavaScript (landing, example open, no builder block), forced colours (the DAO tab's wall in Highlight, the holder bar) and print (example shown, controls hidden) at 1440 and 390.
- axe-core: no violations on `/3/` at 1440 and 390: as loaded, with the example open, at step 3, and with each definition open.

**Not done (part 2).** Motion wasn't re-captured: no animated element changed, only the gate's label text. Playwright can't launch here. No screen reader. Safari and Firefox aren't installed. Figma is unchanged. Nothing committed.

## Homepage v1 to v4: verification before review — 21 October 2026 (Claude, checks only)

All four review copies were checked together before the review. Every check passed, so no code or copy changed; this entry is the record. The build is the sources as the `/3/` part 2 entry left them.

**Invariants.**
- `/` is byte-identical to the baseline (`4884a66`), and so are all 85 baseline files (`cmp` loop). The only new files are `1/`, `2/`, `3/` and `4/index.html`.
- `/1/` and `/2/` against wf1 (the build before v3 and v4) differ in the switch only, in three places each:
  1. One `style-src-elem` hash in the CSP: the switch style's (`sha256-LsuJ7…` → `sha256-DePqa…`).
  2. The switch style: `.version-switch span{color:var(--muted-foreground)}` gains `width:0; min-width:0; pointer-events:none; justify-content:center; display:flex` (the dots sit on the seams between cells).
  3. Two new links after v2: `· v3` and `· v4`.
- The switch script and its hash are unchanged. v1's markup is unchanged: `/1/`'s main content equals wf1's.
- `/1/` to `/4/` are byte-identical to the `/3/` part 2 build.

**CSP.**
- Hashes: every inline script and style on `/` and on `/1/` to `/4/` has its hash in its page's CSP. The JSON-LD block is unhashed, as on `/` (it is data, not a script). `/`'s list is the baseline's.
- In the browser, a `securitypolicyviolation` listener ran before any page script, and Log entries were read too. That found zero violations on all five pages:
  - at 390 and 1440 with motion on and with reduced motion, and at 360;
  - with How it works opened and closed;
  - on `/3/`, with each definition opened.
- The listener was proven by injecting an inline script and style on purpose: both were reported.

**Routes and search.**
- Local server: `/1`, `/2`, `/3` and `/4` answer 308 to their slash form. `vercel.json` makes all four temporary redirects (307, `permanent: false`).
- All four are `noindex, nofollow`, each with its own canonical and `og:url`.
- The sitemap is empty in this non-indexable build, byte-identical to the baseline's. Its route list is fixed in `sitemap.xml.ts`, and an indexable build lists 25 URLs, none of them `/1/` to `/4/`.

**Budgets** (`check:budgets`, gzip):

| Page | CSS | JS |
| --- | --- | --- |
| `/` | 20,875 (baseline 20,875) | 22,232 (baseline 22,232) |
| `/1/` | 21,537 | 22,595 (`/` + the switch script) |
| `/2/` | 23,519 | 22,954 |
| `/3/` | 24,468 | 23,264 (`/2/` + 310, the definitions script) |
| `/4/` | 23,787 | 22,954 (`/2/` + 0) |

The homepage JS gate still doesn't run on Windows (the path comparison in the 19 October entry above). `/` is over the 20 KB budget as before.

**Links and copy.** `check:links`: 31 pages, 2,458 destinations, all resolve. `check:copy`: output identical to the baseline's (its known failures, none new).

**Page heights** (fresh loads in headless Edge, touch emulated below 768, reduced motion; the same with motion on):

| Page | 1440 closed | 1440 open | 390 closed | 390 open | 360 closed | 360 open |
| --- | --- | --- | --- | --- | --- | --- |
| `/`, `/1/` | 8,596 | always open | 11,996 | always open | 12,364 | always open |
| `/2/` | 6,303 | 6,921 | 9,383 | 10,699 | 9,555 | 10,921 |
| `/3/` | 5,950 | 6,568 | 8,847 | 10,163 | 8,993 | 10,359 |
| `/4/` | 6,271 | 6,889 | 9,417 | 10,733 | 9,613 | 10,979 |

Closing the example again returns every page to its closed height, so there is no empty field under the footer. Against `/`, the page is 31% shorter at 1440 and 26% shorter at 390 on `/3/`, and 27% and 21% on `/4/`. Phone heights in the `/4/` table and the first `/3/` table above came from `fit.ts`, which emulates no touch and reads 20 px more on phones (9,403 for `/2/` at 390). The pages are the same.

**Overflow, errors, accessibility.**
- No horizontal overflow on any of the five pages at 1440, 390 or 360, with the example closed or open, nor with any of `/3/`'s definitions open (each box stays inside the viewport). The only elements past the edge are the hero art's squares, which are clipped inside it, as on `/`.
- No console errors, exceptions or log errors on any load.
- axe-core: no violations on `/2/`, `/3/` and `/4/` at 1440 and 390: as loaded, with the example open, at step 3, and on `/3/` with each definition open.
- Tap targets under 44 px on `/2/`, `/3/` and `/4/` at 390 and 360: the same four sitewide ones, which `/` has too. They are the announcement's “Catch up” link and 32 × 32 dismiss button, the footer's email, and its inline “Lituus Foundation” link. Nothing new.
- Single-word last lines: `/3/` and `/4/` have exactly `/2/`'s list at 1440, 1280, 1024, 768, 390 and 360, all in the shared How it works, roadmap and FAQ copy. Their own lines leave none.
- `/3/`'s definitions, by real keyboard, mouse and touch at 1440 and 390, all pass:
  - Tab shows a definition and Esc closes it; Enter and Space open and close it.
  - A mouse rest shows it, and the box holds it open while the pointer is on it.
  - A click or tap pins it, and a click or tap outside closes it.
  - The box flips above the term near the bottom of the screen.
- One `h1`, no duplicate ids, and every in-page link resolves on all four. The switch marks the current page with `aria-current`. `/3/`'s fork links point at `#tenets-heading`, `#how-heading` and `#applications-heading`. The builder block shows on `/1/`, `/2/` and `/4/` and not on `/3/`.
- No JavaScript: on `/2/` to `/4/` the example is open and its toggle and step strip are hidden. `/` and `/1/` are 7,178 px tall at 1440 without JavaScript, the baseline's own figure.

**Copy against the specs** (the rendered text of each page, read in full):
- `/3/`: every one of Ryan's 17 notes is in place, with his exact words where he gave them.
- `/4/`: every one of Augus's marks is in place, with his notes 1 to 3 verbatim.
- Against `/2/`, only the lines each spec names differ. The flags stay as listed in each version's entry: 8 `FLAG:` comments in `homepage-v3.ts` and 11 in `homepage-v4.ts`.

**Not done.** Playwright can't launch here; its per-route test (status 200, one visible `h1`, axe, no console errors) was reproduced over CDP instead. The other homepage tests go to `/`, which is unchanged. Forced colours and print weren't re-run: nothing changed since part 2. Safari and Firefox aren't installed. No screen reader. Nothing committed.

## Icons: signals only, on /2/ — 22 October 2026 (owner: the icons are “ugly, weird, generic”; “make these changes only on v2”)

The owner asked for an alternative to the icons. The only icons they accept are the community logos.

- A sitewide pass was built first. The owner then asked for it on v2 alone, with every other version kept as it is.
- It is now a trial on `/2/`. `/`, `/1/`, `/3/`, `/4/` and every other page keep the shipped Phosphor icons, and the backlog item “Icons, site-wide” stays open until the trial is approved.

**Decision: no icon library.** Phosphor, Lucide, Tabler and Heroicons are what make a site read as a template, and switching libraries would only change which generic look the site has.
- Icons are kept only where they are a signal: they say where a link goes or what a control does.
- The few signals that stay are drawn for Augur.
- Anything that only decorated a row either goes or takes Augur's square, the mark the site already uses for heritage marks, list and status marks and roadmap stops.

**What `/2/` shows.**
- *Signals:* Augur's square-cut glyphs replace Phosphor's arrows, chevron, close, check and plus.
  - The glyphs are arrow-up-right, arrow-right, chevron-down, x, check and plus, in `src/assets/icons/augur/`.
  - They sit on a 20 px grid with one 1.75 stroke in currentColor, square caps and mitred joins, so their ends match the site's square corners. Phosphor Bold had round terminals.
  - The answer chip's animated check draws the same path.
- *Use cases:* the 44 px icon tiles became the 8 px square mark, centred on the name's first line (measured: 0 px off).
  - Mist idle, Green picked. The selected state keeps its Green marker (DESIGN.md).
  - On hover it turns Paper and rotates onto its corner, the gesture of the header's product rows.
- *Builder reasons:* no icon tiles. Each is its claim over its point. The three columns start level at 1440; stacked, each takes one full-width column.
- *Insurance note:* no info icon.
- *Question details:* no list-checks icon. The caret stays.
- *Header Resources menu:* the square mark in place of the five pictograms, as Products already had. Community keeps its logos.
- *Phone header:* the words “Menu” and “Close” in the same outline box, in place of the hamburger and the ×. A labelled “Menu” is easier to find than the bare glyph (NN/g). The accessible names are “Menu” and “Close navigation”.

**How it is scoped.**
- `iconTrial(variant)` and `variantAt(pathname)` in `homepage-review.ts` say where the trial applies.
- Applications and How it works branch on their `variant` prop. Icon and SiteHeader read the page path.
- The styles are `src/styles/home-v2-only.css`, which review-inline.ts loads after `home-v2.css` on `/2/` only. Component `<style>` blocks are unchanged.
- v2's own builder reasons lost their icon fields (`homepage-v2.ts`). v1's and v4's keep theirs.

**Checked.**
- `bun --bun astro check`: 0 errors. The 2 hints were already there.
- Build: a build of HEAD and a build of the trial differ in exactly one file, `dist/2/index.html`. Every other page is byte-identical.
- `/2/` renders 54 Augur glyphs. Its only Phosphor glyphs are the 12 community logos (header panel, phone menu and footer). It has three square marks and no icon tiles.
- `/1/`, `/3/` and `/4/` render no Augur glyphs.
- No horizontal overflow on `/2/` at 360, 390, 768 and 1024.
- “Menu” is 80 px and “Close” 81 px wide. Both are 44 px high.
- With the frame focused, the dialog takes focus and returns it to “Menu” on close, the same as `/1/`.

**Not done.** Playwright can't launch here, and no test was added for `/2/`. Forced colours, Lighthouse and the 1280 width were not checked. Figma is unchanged: `/2/` is a review copy, so the trial reaches Figma only if it is adopted.

**If adopted sitewide.** `docs/` keeps no copy of the sitewide pass, but it is easy to redo:
- Drop the `iconTrial` gates.
- Move `home-v2-only.css` into the components.
- Apply the same pattern to the REP page (an alert-colour square for the scam notice's warning icon, a text-only “Copy address”), the Brand page (text-only swatch copy and a download glyph) and the article share arrow.
- Then rewrite DESIGN.md's icon rule and `icon-provenance.json`, and add the Figma items.

## Header logo at 128 px, on /2/ — 22 October 2026 (owner: “Make a brand exception: shrink the /2/ header logo to about 128 px and record the exception”)

The owner felt the header logo was too big.

**Before.**
- The header used the horizontal reversed lockup at 150 × 50 px, which is exactly the Brand Foundation minimum for that lockup (02.6). The Brand page explains the reason: “below its minimum the gap in the glyph starts to close”.
- The artwork fills its box, with no padding to trim.
- Measured at 1440: the logo is 50 px tall in the 96 px bar, and its lowercase a (20.8 px) is 2.3× the menu text's x-height (9 px at Sora 16).
- I advised against shrinking it, because a small cut isn't visible and a visible one breaks the minimum. The owner chose the exception.

**The exception.**
- It applies on `/2/` only, the owner's presentation version.
- The header logo and the phone menu's logo are 128 × 43 px, 15% under the minimum. The phone menu's logo matches so it keeps its size when the menu opens.
- The artwork, its colours and its proportions are unchanged.
- The rule is `.site-header .brand` in `src/styles/home-v2-only.css`. That is the sheet only `/2/` loads, renamed from `home-v2-icons.css` now that it holds all of the owner's v2 suggestions.
- The footer logo stays at 150 px, as do `/`, `/1/`, `/3/`, `/4/` and every other page.
- The clearspace rule (the wordmark's lowercase a, 14.7 px at this size) is met with room to spare: 26.5 px above and below the logo in the bar, and the 96 px page margin to its left.
- DESIGN.md records the exception next to the minimum. The backlog's header item points here.

**Checked.**
- `bun --bun astro check`: 0 errors and 0 warnings.
- Build against a build of HEAD: only `dist/2/index.html` differs.
- On `/2/` at 1440, 1024, 768, 390 and 360: the header logo is 128 × 43 and centred in the bar (0 px off), the phone menu's logo is 128, the footer's is 150, and there is no horizontal overflow.
- `/1/` keeps 150 × 50.

**If adopted sitewide.** This becomes a source difference from the Brand Foundation. The Brand assets page (`src/data/brand.ts`, the “Minimum sizes” block) would still publish 150 px as the minimum while our own header uses 128. Either the foundation's minimum is revised with its owners, or the exception is listed on that page. Until then it is a release blocker.

## Products lead card as one link, on /2/ — 22 October 2026 (owner: “the hitbox of Augur Lituus isn't only the button! It is the whole section. Can we remove the button?”, then “the augur lituus should have more space like it was before! figure out”)

**The problem.**
- Since 6 October Augur Lituus has led the 624 px Products panel as a card with a full-width Primary button, “Explore Augur Lituus →”. The button was the card's only link, and its `::after` stretched over the card.
- So the whole card was the hit area, while the filled button said “only this part is the action”. The target didn't match what it looked like.

**First pass, the same day.** The panel became a plain 320 px list, like Resources, with Augur Lituus first, its mark Green and its name semibold. The owner wanted the card's room back, so this was replaced.

**What `/2/` does now.**
- The card keeps its 6 October place and size: the left column over both rows, 294 × 172 px, beside Zoltar and Augur Stratoblast.
- The card itself is the one link, with no button inside it.
  - It sits on a Dark 1 surface at rest (the panel is Dark 2), so it reads as one object. Under the pointer it lifts to Dark 3 like every menu row, and its Green mark turns onto its corner.
  - Its name is in Heading 4 (Sora 600 20/26) and its tagline in Small, at the top.
  - Its action, “Explore Augur Lituus →”, is a text label at its foot, lined up with the name past the mark. On hover or keyboard focus, a 2 px line draws under it and the arrow nudges 3 px, as on the site's text actions (DESIGN.md).
- There are three tab stops, one per product. The card's accessible name is its name, tagline and label. The focus ring is the card's own.
- Markup: `SiteHeader.astro` renders `li.nav-lead` with the `<a>` around the card's content on `/2/` only. Every other page keeps the 6 October card with its button. The styles are in `home-v2-only.css`.
- The `/2/` switch in `homepage-review.ts` is now named `ownerVersion` (it was `iconTrial`) and lists every owner suggestion.

**Checked.**
- `bun --bun astro check`: 0 errors and 0 warnings.
- Build against a build of HEAD: only `dist/2/index.html` differs.
- On `/2/` at 1440:
  - The panel is 624 × 196 and the card 294 × 172, as before. The two rows are 294 × 86.
  - The card is a flex column with its head at the top and its label at the foot; the label's left edge is the name's (48 px into the panel).
  - The panel has no button and three links.

**If adopted sitewide.** Fold the `nav-lead` markup into the card, and update Figma Section details `43:123`, its hover panel `421:993` and note `216:340`. The launch-checklist item for the label stays, since the label is still shown.

## Header hides on the way down, on /2/ — 22 October 2026 (owner: “scrolling down removes the header scrolling up make it appears i like this ux”)

A partially persistent header, as NN/g recommends for long pages:
- The header leaves when you read on.
- It comes back the moment you scroll up, which is when people look for navigation.
- It keeps the 96 px of screen for reading. On phones that is an eighth of the screen.

**How it works.**
- `src/components/home/header-v2.js`, about 25 lines, is rendered inline after the header on `/2/` only and hashed into that page's CSP (`review-inline.ts`).
- It reads `scrollY` once per frame and sets attributes. Scrolling stays native: no smoothing, no snapping and no scroll-jacking (memory: native scroll only).
- In `home-v2-only.css`:
  - The header is `position: sticky` at the top.
  - When hidden it slides up by its own height (`transform`, 280 ms, `--ease-reveal`).
  - Once it has left its place under the announcement, a 1 px Outline line marks its foot, so the page doesn't run under it unseen (no shadows).
  - Reduced motion turns the slide into a cut. Print keeps it in the flow.
- Inside its own place, the first 136 px, it never hides.
- Moves under 6 px add up before they count, so trackpad jitter doesn't flicker it.
- It stays while a menu is open, while the phone menu is open or while keyboard focus is inside it. Focus moving into it shows it at once (WCAG 2.4.11, focus not obscured).
- A mouse click inside it doesn't pin it, because the check is `:focus-visible`.
- Without JavaScript the header stays in the flow, as it ships.

**Checked.**
- Build against a build of HEAD: only `dist/2/index.html` differs. `/` has no `data-headroom`.
- In the browser at 1440, run in a frame with timer-driven frames and synthetic scroll events, because the pane was hidden:

| Step | Header |
| --- | --- |
| Load at 0 | In place |
| 30 | In place |
| 120 | Stuck, shown |
| 700 | Hidden |
| 1500 | Hidden |
| Up 3 px | Still hidden (jitter) |
| Up to 1380 | Shown |
| 2200 | Hidden |
| Up to 1900 | Shown |
| 2600 with Products open | Shown |
| 3200 with the menu closed | Hidden |
| Focus moving in | Shown |
| Back to 0 | In place |

- With the transition off, the hidden transform is exactly −96 px, and the 1 px foot line is drawn while it is stuck.

**Not done.**
- No real scrolling on a real phone or trackpad, and no frame-time measurement (the motion runs on the compositor and only on a direction change).
- A focus event from a real keyboard was not run: the test frame never had focus, so the handler was tested with a dispatched `focusin`.
- Anchor jumps upward land under the header when it reappears. `/2/` has none today. If one is added, give its target a `scroll-margin-top` of 96 px.

## Why Augur cards drawn in isometric, on /2/ — 22 October 2026 (owner: “the current animations … aren't really optimized for what we're saying”, “too simple”; then “Let's go with isometric for all three. Implement on v2.”)

**Why.** v2 took Augus's three titles but kept v1's three drawings, so the pictures stopped matching the claims.
- Permissionless showed squares joining a fenced group.
- Trustless drew "nobody in the middle" as a broken line.
- Robust showed a light touring a network, which is v1's "Decentralized".

Three directions were sketched as 12 s loops on a private comparison page, card by card against today's loops: flat and retold, one shared network, and isometric. The owner chose isometric for all three.

**What `/2/` shows.** Each card draws a scene that acts out its claim. Every loop opens and closes on a still frame, which is also what no JavaScript, reduced motion and print show.
- *Permissionless* (replaced the same day by Two roads in cubes; see “Permissionless card: Two roads in cubes, on /2/” below):
  - Three app slabs send question tiles along lanes to rows of answerer blocks, and Green answers come back. Each app's top lights Green when answered.
  - Midway a fourth app drops in, and a newcomer takes the empty place in the row facing it. Both are served at once, and both leave again before the loop closes.
  - Labels: Ask, Answer.
- *Trustless:*
  - An answer runs along a track to settle.
  - Governance, Multisig and Creators hover over the track. As the answer passes, each slab drops onto it and goes straight through it as a ghost, then rises back dimmed. Its label dims with it.
  - The answer settles Green. At rest it is Green, and the three slabs are dimmed.
- *Robust:*
  - Each challenge doubles what the other side must put up: False 1, True 2, False 4, True 8. Holding the lie would take 16.
  - That tower runs off the top of the drawing, sways, and its top twelve topple away as one piece. The true tower of 8 stands, with counts beside both.
  - The doubling is the whitepaper's challenge rule (§4.1). No amounts and no money words are shown.

**How it is built.**
- `src/data/tenets-iso.ts` holds the geometry: a 30° projection in the v1 diagrams' 336 × 168 view, with blocks, floor plates, lanes and labels in back-to-front order.
- Colours are Mist, Paper and Green and the Navy surfaces. A block's darker faces are the same colour mixed toward the card's Dark 2, so every face is opaque. Green marks outcomes only, and there is no glow.
- `IsoScene.astro` draws it, with no style and no script.
- `src/components/home/tenets-iso-v2.js` is about 2 KB gzipped, inline on `/2/` only and hashed into its CSP. It plays every track on one 12 s clock with transform and opacity only, and animates only the properties that actually change. It follows `loop-scene.ts`'s rules:
  - it runs while any part is on screen and pauses off-screen or in a hidden tab;
  - it resets for print;
  - it never starts under reduced motion.
- The styles are in `home-v2-only.css`:
  - The scene is clipped to its box, so the tower can run off the top.
  - Moving parts turn about their own box; the falling top turns about its foot.
  - Labels are Sora 600 in Pewter, and a container query raises them on narrow cards so they stay about 10 px or more on screen.
- `Tenets.astro` renders the scenes and the driver only when `ownerVersion` is true. `/`, `/1/`, `/3/` and `/4/` keep the v1 diagrams and their loops.

**A fix found on the way (performance).**
- On the v2 pages, the How it works example starts closed as `hidden="until-found"`, which skips its contents. The query card's status dot kept pulsing inside it.
- Each pulse made the browser update that skipped subtree. That cost about 1 s of main-thread work per 4 s at the Why Augur cards: 1,229 ms with the pulse running, 251 ms with it paused.
- `/2/` now rests the dot while the example is closed (`home-v2-only.css`). `/3/` and `/4/` still have the issue, since their copies are left as they are; the same one-line rule would fix them. `/` is unaffected because its example is always open.

**Checked.**
- `bun run check`: 0 errors and 0 warnings. `astro build` passes.
- A build of HEAD and a build of this change differ in exactly one file, `dist/2/index.html`.
- `check:links` passes. `check:budgets` passes, but it does not cover the review copies.
- Weight on `/2/`: the driver is 6.3 KB, 2.2 KB gzipped; the three SVGs add 4.2 KB gzipped. The page is 67.2 KB gzipped, up from 64.5 KB.
- Main-thread time over a 5 s sample at the cards, in headless Edge at 1440:

| Page | Task time |
| --- | --- |
| `/2/`, all 61 scene tracks running | 13.6 ms and 13.2 ms |
| `/1/`, the v1 loops | 45.4 ms |
| `/3/`, unfixed | 1,496 ms |

- Frames were checked at 0, 1.5, 2.2, 3, 4.5, 6, 6.8, 7.3, 8, 8.1, 8.2 and 9.6 s at 1440, and the resting frames at 1280, 1024, 768 and 390.
- Labels clear every block and the view's edge at every width.
- Reduced motion runs 0 scene animations and shows the still frames. With JavaScript off, the server-rendered frames are complete. No console errors.

**Not done.**
- Playwright and axe can't run here; the SVGs are `aria-hidden`, as v1's are.
- Forced colours was not viewed, though labels switch to CanvasText.
- No real phone, and Safari and Firefox were not opened.
- Figma is unchanged. `/2/` is a review copy, so the scenes reach Figma only if adopted.

**If adopted sitewide.** Move the tracks into the shared choreography (`tenet-choreography.ts`, run by `loop-scene.ts`), key them in Figma Section details `250:717`, document them in `docs/motion.md`, and add the dot fix to the shared rules.

## Hero lituus flock, on /2/ — 22 October 2026 (owner: the hero “looks awful and weird”, “something more fancy? Maybe a higgsfield? Image with a few animations?”, then “build the lituus flock hero on /2/ only, inside the motion rules, and tell me if it needs a canvas exception”)

**Why not an AI image or video.** I advised against a Higgsfield image or video as the hero:
- Cinematic AI heroes are now the common look of crypto and AI sites, which is the sameness designers are moving away from.
- A photo-real scene fights the Brand Foundation's geometric squares on Navy.
- A video costs megabytes on the first screen and cannot be keyed into the shared 12 s Figma choreography.
- An oracle about truth would open on a synthetic picture.

A generated image can still serve as a reference to redraw in squares. The owner chose the concept sketch instead.

**The idea.**
- A Roman augur read the flight of birds and carried a curved staff, the lituus. The spiral named after it (r²θ = a², Roger Cotes, 1722) has the staff's crook.
- Small clusters of Augur squares stream in from the top of the hero along that spiral, like a flock with no leader, and curl into the dashed answer square of the old artwork: many independent reports, one answer that no one controls.
- Beginners see a living, beautiful field. Readers who know the name get the reference. The copy, grid and buttons are unchanged.
- It replaces the old square field (canonical `283:3403`) and the hero's heritage field on `/2/` only. The old field read as a QR code or a loading placeholder and gave the screen no focal point (aesthetic-usability effect; NN/g, match between system and real world).

**How it works.**
- `src/data/hero-flock.ts` is the one source for the geometry.
  - The spiral, in units of the old 572 × 457 artwork box: pole (290, 236), a = 270, turned −1.6 rad, θ from 0.16 to 3.4π.
  - Six classes of keys, 72 per 12 s cycle:
    - Three speed profiles: each class runs at 1 ± 0.3·cos 2πτ of the mean speed, so clusters pass each other and gather again.
    - Times two phases of a three-wave lateral sway that fades towards the pole.
  - Every class slows towards the answer (share = 1 − (1 − τ)^1.35), so the curl holds more clusters than the mostly off-screen tail does.
  - The last 14% draws each cluster into the pole and shrinks it.
  - 320 clusters in loose phase groups, each carrying one of 16 glyphs: 2 to 5 squares, 3 to 6 units wide on a 3-unit grid. Mist, Pewter and Paper; every fourth glyph has one Green square.
  - Each cluster's resting pose is its key at its own phase, so the cycle opens and closes on the server-rendered frame.
- `FlockArt.astro` renders the resting frame. Each cluster is a zero-size `span` placed by `transform` in container units, holding an `svg` that `<use>`s its glyph. The component has no `<style>` or `<script>`.
- `hero-flock-v2.js` plays the loop.
  - It is inlined after the hero on `/2/` only. The build writes the keys into it, and the page's CSP hashes it (`review-inline.ts`).
  - Each cluster has one Web Animation of `transform` and `opacity` on the 12 s cycle, started at its phase.
  - The answer square breathes three times a cycle.
  - It runs while the hero is on screen and the tab is visible, pauses otherwise and resumes where it was.
  - Print cancels it to the resting frame. Reduced motion never starts it. Without JavaScript the resting frame stays.
- Arrival (once per tab session) fades the flock in from 106% about the pole over the field's slot (500 → 2100 ms) while it already flows.
- Pointer lens, fine pointers only:
  - Clusters within 120 units of the pointer part by up to 26 and grow by up to 50%, with (1 − d/120)² falloff.
  - The script computes each cluster's current pose from the same keys and writes the glyph's `transform` (280 ms transition).
  - It runs every frame while the pointer is over the hero, because the clusters keep flowing through the lens.
- A click or tap that is not on a control sends the Green square ring and pops the clusters it passes (`composite: 'add'`).
- On phones the art is clipped to its box and fades in from the top, so the stream never crosses the copy.
- Forced colours redefine the colour tokens on the flock, because page rules don't reach `<use>` copies but inherited properties do.
- Styles: `home-v2-only.css`.

**Canvas exception: not needed.** The flock runs inside the motion rules, on transform and opacity only, with no canvas, no per-frame paint and no library.

**Checked** (headless Edge, 1440 × 900 unless noted):
- **Scope:** built against a build of the working copy before this change. Only `dist/2/index.html` differs.
- **Loop cost:** with the flock running, the main thread spent about 1 ms per second, with no style recalculations and no layouts. The old hero on the same page cost 290 ms and 60 style recalculations per second (3 s windows after arrival). The rAF rate was 60 fps. 321 Web Animations run (320 clusters and the answer square).
- **While the pointer rests over the hero:** about 31 ms of script and 70 style recalculations per second; 88 glyphs were moved at the sampled point. A click left one ring.
- **Off-screen and back:** off-screen, 0 animations run (`data-flock="paused"`); back on screen they run again.
- **Other states:** reduced motion starts none. No JavaScript and print show the resting frame. Forced colours draw the squares in CanvasText. There were no console errors.
- **Widths:** 1440, 1280, 1024, 768, 390 and 360 have no horizontal overflow.
- **Weight:** `/2/` HTML 67.0 → 78.2 KB gzipped. Budget script, `/2/`: CSS 24.8 → 25.3 KB, JS 25.5 → 28.4 KB (the keys). `/` keeps its 20 KB JS budget, unchanged.
- **`bun run check`:** 0 errors.
- **`check:links` and `check:budgets`:** pass.
- **`check:copy`:** fails exactly as on the build before this change (REP and footer copy-source drift, untouched here).
- **Launch guard:** the same 93 standing blockers.

**Not checked.**
- The Playwright route, interaction and axe tests (Playwright doesn't connect under Windows Bun here; they also target `/`).
- Lighthouse, a real phone, Safari and Firefox.
- Compositor frame times: headless gives no GPU numbers; 320 small composited layers should be measured on a low-end phone before adoption.
- Figma is unchanged. `/2/` is a review copy.

**If adopted sitewide.**
- Replace HeroArt and the hero heritage field on `/`.
- Fold the keys into the shared choreography (`choreography.ts`) or keep `hero-flock.ts` as its source.
- Key the hero frame in Figma `382:848` from these keys, and replace the canonical artwork `283:3403` with the flock's resting frame.
- Update the AGENTS.md hero sentence (story on HTML squares, lens, ripple) and `docs/motion.md`.
- Retire the 6 October hero-motion review note.

## Pause control for every loop, on /2/ — 22 October 2026 (accessibility gap found while planning a full-screen hero video; `/2/` only)

**The gap.** WCAG 2.2.2 Pause, Stop, Hide is Level A. Anything that moves, starts by itself, lasts more than 5 seconds and sits beside other content needs a way to pause, stop or hide it. The homepage loops on purpose (AGENTS.md: the tenet diagrams are always moving, owner 5–6 Oct 2026), yet no page had such a control: a search of `src` and `docs` found none. Reduced motion doesn't count, because it is an operating-system setting, not a control on the page. Pausing off-screen doesn't count either. A full-screen hero video (`artifacts/video-test/README.md`) would need the same control.

**Loops on `/2/`.**

| Motion | How long | Needs the control |
| --- | --- | --- |
| Hero lituus flock, with the answer square's breath (`hero-flock-v2.js`) | 12 s cycle, while the hero is on screen | Yes |
| Scroll cue (`Hero.astro`) | 2.4 s cycle, until the page scrolls | Yes |
| Why Augur isometric scenes (`tenets-iso-v2.js`) | 12 s cycle, while any part is on screen | Yes |
| REP rows in the How it works example (`rep-choreography.ts` through `loop-scene.ts`) | 12 s cycle, while the example is open and on screen | Yes: opening the example asks to see it, not to animate it |
| Query card's status dot (`HowItWorks.astro`) | 1.6 s blink, while the example is open | Yes |
| Roadmap Now pulse, on the stop and the status (`Roadmap.astro`) | 2.4 s cycle, always | Yes |
| Hero arrival and the “decentralized” underline | Once, done by 2.7 s | No: under 5 s |
| Answer-band ribbon, use-case pictures | Once | No |
| Header slide, pointer lens, tap ripple, page-field trail | Only in answer to the reader | No |

`/` also runs the square-field hero ambience (`hero-ambient.ts`) and the v1 tenet diagrams (`loop-scene.ts`). Neither is on `/2/`.

**The control.**
- One button for the whole page, in the header before “Talk to us”, so it comes early in the tab order. On `/2/` the header comes back on any scroll up, so the control is a small scroll away from anywhere on the page.
- A native `<button>`. Its label says what a press does: “Pause animations”, then “Play animations”. A Green glyph matches it: two bars, then a triangle.
- No `aria-pressed`, although the brief asked for it. The APG says a toggle's label must not change with its state, and the changing label is the clearer of the two for traders and beginners. So it is a plain button whose name says the next action, like the APG carousel's rotation control. Chrome's accessibility tree reads “Pause animations” or “Play animations”, role button, no pressed state.
- At 1280 and wider it is a text action like the site's others: a Paper label whose 2 px line draws in on hover. It is 168 px wide in both states: a hidden copy of the longer label holds the width, so it doesn't jump when pressed.
- Below 1280 the label would push “Talk to us” 42 px into the margin (at 1024), so the control becomes an outline box: 48 px beside “Talk to us”, 44 px beside the phone's Menu. The label stays for screen readers. Square corners, no shadow.
- A press sets `data-motion-paused` on `<html>`, sends an `augur:motion` event and keeps the choice in `sessionStorage` (`augur:motion-paused`). Reloads and later visits in the same tab start paused. Where storage is blocked the page starts playing.
- The button ships with `hidden`, and its script shows it. Without JavaScript nothing loops, so there is no control. With reduced motion nothing loops either, so CSS hides it. Print drops it.

**How each loop holds.**
- **Flock and Why Augur scenes.** Their drivers add the attribute to their own `running()` check and re-sync on the event. That is the path off-screen and hidden tabs already use, so they hold where they are and resume from there. While paused, the flock's lens and tap ripple are off too. Paused from load, the Why Augur scenes never start and show the resting frame.
- **Scroll cue, status dot and Now pulse.** `home-v2-only.css` stops them on their reduced-motion frame: the cue's square waits at the top of its line, the dot stays lit, and the ring is gone.
- **REP rows.** These loop through `loop-scene.ts`, which `/` shares. Changing it would change `/`'s script chunk, and `/2/` keeps `/` byte-identical.
  - So the control holds their tracks (Web Animation id `rep-loop`) itself. While paused, a `play()` on one pauses it instead.
  - On resume, the rows on screen play again. The rest wait for `loop-scene` to play them when they come into view.
  - This is a stand-in. Sitewide adoption replaces it with a check in `loop-scene.ts`.
- **Files.**
  - `motion-pause-v2.js` (new). It is inline on `/2/` after the header and hashed into that page's CSP through `review-inline.ts`.
  - `SiteHeader.astro` (the button, `/2/` only), `hero-flock-v2.js`, `tenets-iso-v2.js` and `home-v2-only.css`.

**Checked** (headless Edge 155 over CDP, this build served locally, 1440 × 900 unless noted):
- **Scope:** built against HEAD and against the working copy before this change. In both, only `dist/2/index.html` differs. `/` and `/1/` are byte-identical to HEAD, and `/` has no control.
- **Keyboard:** Tab from the top reaches the control as the 13th stop, after the skip link, the version switch, the announcement, the logo and the four nav items. It shows the 2 px focus ring. Enter paused everything, and Space resumed it with focus still on the button.
- **Paused:** the running loops went from 322 Web Animations (the flock) and 3 CSS animations to none. A cluster's transform was unchanged a second later. Scrolling to Why Augur and the roadmap started nothing. Resuming at Why Augur ran its 61 tracks.
- **REP rows:** 2 tracks ran with the example open. Paused, they stayed held after scrolling away and back, and after a step change rebuilt the loop (7 tracks held). On resume all 7 ran.
- **Tab session:** a reload and a fresh navigation both started paused, labelled “Play animations”.
- **Reduced motion:** the control is `display: none`, and no loop runs at the hero or at Why Augur.
- **No JavaScript:** the control keeps `hidden` and isn't drawn.
- **Widths:** 1440, 1280, 1024, 768, 390 and 360 have no horizontal overflow, and the header's boxes don't overlap. At 1024 “Talk to us” ends on the 48 px margin.
- **Forced colours:** the glyph is drawn in ButtonText.
- **Console:** no errors.
- **Weight:** `/2/` HTML +1.0 KB gzipped. The script is 688 bytes gzipped.
- **`bun run check`:** passes with 0 errors once `artifacts/video-test/tools/kf-preview.ts` is set aside in the build mirror. That untracked video-test script adds 12 errors (top-level `await` in a file that isn't a module); nothing else does.
- **`bun run build`, `check:links` and `check:budgets`:** pass.
- **`check:copy`:** fails on the footer contact line, which is unchanged since commit 2884f39.
- **Launch guard:** fails on the standing release gates, as before, plus the new item below.

**Not checked.**
- The Playwright route, interaction and axe tests (Playwright doesn't connect under Windows Bun here).
- A real screen reader, Safari, Firefox and a real phone.
- The hover line at 1280 and wider (headless has no pointer).
- Figma is unchanged. `/2/` is a review copy.

**If adopted sitewide** (launch checklist):
- Move the control into the shared header on every page that loops, including `/`'s hero ambience and v1 tenet diagrams.
- Read the paused state in `loop-scene.ts` and `hero-ambient.ts`, the existing pause paths, and drop the `rep-loop` stand-in.
- Hold the CSS loops in the shared styles.
- Add the rule to AGENTS.md (Motion and access) and `docs/motion.md`, and record the control on the Figma header's Section details.
- A hero video, if one comes, joins the same control.

## Hero video, on /2/ — 22 October 2026 (owner: a full-screen hero video “like most websites”; “put the MiniMax loop on /2/ only as the hero background: poster first, pause with the Pause animations control, coded flock below 1024 px, and record the motion-rule exception”; “This hero sucks BAD … Can we generate something without feeding the image?”; “More high-res, this one looks 420p. It looks extremely generic”; then “aggregating scattered information into truth? like several points or scattered squares becoming a single square … gray becoming green … no cuts. super high res. smooth. clean. matching theme”)

**The exception.** AGENTS.md allows transform, opacity and SVG stroke draws only, and keeps every loop in the choreography shared with Figma. A video is neither. The owner approved it for `/2/`'s hero, and AGENTS.md (Motion and access) now names it. The 22 October advice against an AI hero still stands as the default for `/`. Against its four points:
- **Sameness:** the scene shows what Augur does rather than a mood: separate reports come together into one answer. It is drawn in the brand's own squares: Green tiles, the answer, and slate-grey tiles, the reports, on Navy.
- **Photo-real:** it is a 3D render, not footage, and it depicts nothing real. It departs from the flat, no-glow brand style: the tiles have light and depth, and the whole square carries a soft Green glow. That departure is the owner's call, limited to this hero.
- **Weight:** the poster paints first and the video loads after the page, on screens 1024 px and wider only.
- **Truth:** it is abstract motion design, not a picture of anything that happened.

**What it is: aggregation.**
- From 1024 px a 9.5 s loop fills the hero's right side and replaces the flock.
- One Green square of 8 × 8 tiles, the answer, holds for a beat. Its tiles loosen, tilt and fade to slate grey as they spread into a wide scattered field, the separate reports. They drift, then glide back into a grey square and turn Green tile by tile as they lock in, until the square is whole again.
- The idea is the owner's: scattered squares become one square, grey becomes Green.
- The loop starts and ends on the same frame, so there is no cut and no visible seam. The poster, what no-JavaScript and reduced-motion visitors keep, is the whole Green square.
- Placement and finish:
  - the layer starts 30% in and runs to the right edge, `object-fit: cover`, anchored right (`object-position: 90% 50%`), at 90% opacity;
  - on heroes taller than 56vw (1024 × 768, portrait tablets) the layer stops at that height and centres, so the cover crop never zooms the square towards the copy;
  - a Navy gradient holds over the layer's left 27% and clears by 45%. That covers the copy's right edge (26–28% of the layer at every width) and stops before the square (44–53%), so the scattered tiles never cross the copy;
  - the top 48 px and bottom 96 px fade into Navy, so no edge shows against the header or the answer band.
- Sharp screens get sharp files: when the layer is more than about 1150 device pixels tall (2× laptops, 1440p monitors) it plays a 2560 × 1440 loop; otherwise 1920 × 1080.
- Below 1024 px phones and portrait tablets keep the coded flock.
- What is lost from 1024 px: the flock's pointer lens and tap ripple.

**Earlier versions, replaced the same day.**
- A MiniMax H3 loop generated from a keyframe of the site's own flock. The owner rejected it: feeding a flat vector frame made the model copy pixel art.
- A Seedance 2.5 “voxel tide”, a dark sea of cubes with mint clusters, at 1080p. The owner found it soft (“looks 420p”) and generic. It scored 49 for sharpness at 1920 wide.
- A Gemini Omni Flash 1.1 “resolution” loop at 4K: a cloud of cubes swept by a mint scan locks into one square. It was sharp (206) but mostly grey and white; the owner asked for the grey-to-Green aggregation instead.

**How it was made** (full record in `artifacts/video-test/README.md`, round 4; prompts and assets in `docs/hero-video-provenance.json`).
- **A key frame first.** Nano Banana Pro drew a 4K still of one 8 × 8 square of mint tiles on Navy (4 credits each, two drawn). In the Higgsfield sandbox the still was mapped to the brand colours, Navy (14, 14, 33) and Green (42, 231, 168), and the square scaled to 44% of the frame height, centred at 70% of the width. Two Seedream 4.5 stills were rejected: one too blue, one with prompt text rendered into it.
- **Three takes at 4K, 10 s:**
  - **Gemini Omni Flash 1.1, image to video** with the key frame as both first and last frame (90 credits): picked. The story reads at a glance, the tiles stay crisp (209 for sharpness at 1920 wide) and the last frame matches the first (1.3 on a 0–255 mean difference before any processing);
  - **Kling 3.0** with the same frames (60): rejected. The tiles only loosen in place into a sparse grid; there is no scattered field;
  - **Gemini, text to video**, a steady stream of grey tiles drifting into a Green square (90): rejected. The square came out 4 × 4, the grey field was busy, and the loop would have needed a crossfade over moving tiles.
- Round 4 spent 250 credits, about 97 remain.
- In the sandbox (`master.py`, one pass from the 4K take):
  - the darkest tone to Navy with white kept, and green pixels moved to the brand Green, weighted by how green they are, so the grey tiles stay neutral;
  - pixels within a few levels of Navy flattened to exact Navy. The take's Navy carried faint mottling that 8-bit AV1 turned into visible blocks around the square's glow;
  - the first 0.5 s crossfaded into the last 0.5 s, both on the resting square: 228 frames, 9.5 s, seam 0.7.
  - Encodes, all without audio (10-bit AV1 keeps the dark Navy free of blocks):

| Loop | AV1, 10-bit | H.264 |
| --- | --- | --- |
| 2560 × 1440 | 1.91 MB | 3.56 MB |
| 1920 × 1080 | 1.30 MB | 2.34 MB |

  - WebP posters of the first frame: 13 KB at 1920 wide and 21 KB at 2560.
  - Sharpness at 1920 wide after encoding: 200 (1440p AV1), 193 (1080p AV1).

**How it works.**
- Markup (`Hero.astro`, `/2/` only): a `<picture>` whose source offers the 1920 and 2560 posters for `(min-width:1024px)`, over a blank 1 × 1 GIF. Narrower screens fetch nothing. A `<video>` in the markup would show the browser's own controls without JavaScript, so it is not there.
- `hero-video-v2.js` (inline on `/2/` through `review-inline.ts`, so its CSP hash lands on that page only):
  - once the page's `load` event has fired, it lays a muted, looping, inline `<video>` over the poster, with the poster the page chose, 10-bit AV1 first and H.264 second;
  - it picks the 1440p loop when the video layer is more than about 1150 device pixels tall, else 1080p;
  - it plays while the hero is on screen, the tab is visible and the pause control is off, pauses otherwise, and resumes where it was;
  - with reduced motion, Save-Data or below 1024 px it never loads.
- `hero-flock-v2.js` rests and never builds its animations while its art is hidden (from 1024 px), and re-syncs when the width crosses 1024 px.
- `home-v2-only.css`: the layer's styles, placement and fades. Arrival fades it in like the flock. Print and forced colours hide it and show the flock.
- The pause control (`motion-pause-v2.js`) needed no change: the video listens for its `augur:motion` event.

**Checked** (headless Edge 155 over CDP, against the dev server and a production build):
- **Scope:** this build and round 3's differ only in `dist/2/index.html` and the six files in `dist/images/hero/`. `/` is byte-identical; `/2/` is 17 bytes smaller gzipped.
- **Which file:**

| Screen | Loop | Poster |
| --- | --- | --- |
| 1440 × 900 at 1× | 1080p | 1920 |
| 1920 × 1080 at 1× | 1080p | 1920 |
| 1440 × 900 at 2× | 1440p | 2560 |
| 2560 × 1440 at 1× | 1440p | 2560 |
| 1024 × 1366 at 2× | 1080p | 2560 |

  All five play 10-bit AV1.
- **1440 × 900:** the poster, then the AV1 file requested 21 ms after the `load` event. It plays, the flock is `display: none` with no running animations, opacity 0.9.
- **Composition** (`artifacts/video-test/review/round4-page-*.jpg`, frames at 0.3, 2, 4, 7.4 and 8.6 s): at 1024, 1280, 1440 and 1920 wide the copy stays on plain Navy through the widest scatter; at 1024 × 1366 the layer stops at 573 px and centres.
- **Colour:** the video's background decodes to RGB (13.3, 14.0, 32.0) in every file, against Navy (14, 14, 33). Boosted seven times in contrast, it shows no blocks.
- **Pause control:** it paused the video, which stayed at the same frame a second later; resuming played from there.
- **Off-screen:** scrolled away it paused; back at the top it played.
- **1920 × 1080, 1280 × 720, 1024 × 768:** AV1 plays.
- **768 × 1024 and 390 × 844:** no `/images/hero/` request at all, the layer is `display: none`, and the flock runs its 321 animations.
- **Reduced motion:** only the poster is requested and no video is created.
- **No JavaScript:** only the poster, the whole square, with no player controls.
- **Console:** no errors in any of these.
- **Project checks:** `bun run check` 0 errors and 0 warnings; the budget and link checks pass. `check:copy` fails on the footer's contact line and `check:launch` lists the standing release gates; neither involves this change.
- **Weight:** desktop adds a 13 or 21 KB poster to the first paint, then 1.30 or 1.91 MB of AV1 after load (H.264 2.34 or 3.56 MB for browsers without AV1).

**Not checked.**
- Safari and Firefox: the AV1 or H.264 choice and the colour against the CSS Navy. Safari plays AV1 only with hardware support (M3 Macs, recent iPhones); other Macs get the 3.56 MB H.264 file.
- A real phone rotated past 1024 px. It would load the video at that moment, which is intended.
- Print and forced colours were checked in CSS only, not rendered.
- Lighthouse LCP and the Playwright and axe tests (Playwright doesn't connect under Windows Bun here).
- Figma is unchanged; `/2/` is a review copy.

**If adopted sitewide.**
- Add a media budget to `scripts/check-budgets.ts`, which covers CSS, JS and fonts only.
- Put the Green-square poster on the Figma hero frame and record the video on its Section details.
- Check the colour in Safari and Firefox.
- Decide whether phones get a 9:16 render composed with the flock below the copy.


## Live floor hero, on /2/ — 22 October 2026 (owner: “Do not ask it to generate another video. Let's iterate me and you. Use artifact”; “something with squares and that remembers of the old augur with blinking stuff and squares organized … maybe something in a loop? maybe something that isn't exploding?”; “We'll go with Tilted floor, Consensus fill, Royal Navy”; “Let's try live first, implement in the website”; then “Do you think you can make it interactive?”)

**What changed.** `/2/`'s hero layer now draws a live scene in code instead of playing the generated video. The video and its files stay in place: `layer` in `Hero.astro` switches back to it. Everything in “Hero video, on /2/” about the layer's placement, fades, the 56vw cap, the left gradient and the phone flock still holds.

**The scene** (designed with the owner in the Augur Hero Loops artifact, https://claude.ai/artifact/FAZhdHLnpVdd3HLSbLA8mk, private):
- a tilted floor of 31 × 31 royal navy squares, lit from the middle and dissolving into Navy at the back and sides. About a fifth of the squares twinkle, by 45% either way; the rest hold still (in the artifact every square twinkled faintly, which meant redrawing the whole floor every frame);
- **Consensus fill**, on a 12 s loop:
  - 0–3 s: the floor rests; a few squares blink Green, as in the old Augur field;
  - 3–8.5 s: reports, Green lights, run straight along a row or a column into one 8 × 8 block, at one shared speed. Each fills the square it reaches, which rises slightly, so the block fills square by square into a low Green platform with a soft glow;
  - 9 s: the block is complete and one royal ring goes out across the floor;
  - 10–12 s: the block settles and fades.
- Every motion repeats a whole number of times per loop, so the loop closes exactly.
- **Interaction**, while it plays (the flock's lens and ripple, made literal):
  - a fine pointer carries a soft royal light across the floor, the square under it glinting Green;
  - a click or tap on a square sends a report: a ripple where it starts, a Green light along the row and then the column into the nearest block square, and a flash there.
  - The layer never takes the pointer; the hero listens, and links, buttons and the copy are left alone.

**Colour, flagged.** The floor's royal navy, `#1B2766` at rest and `#2E48B2` lit, is the owner's request (“green and royal navy blue”) and is not an Augur Brand or Website/Navy token. Green and Navy are the brand's. It needs approving and adding as a token, or swapping for a brand navy (the artifact shows both), before anything leaves `/2/`.

**The exception.** A canvas redrawn every frame is outside “transform/opacity and SVG stroke draws only”, as the video was. AGENTS.md (Motion and access) now names the live floor as the exception, with the video one switch away. Neither is in the Figma choreography.

**How it works** (`hero-floor-v2.js`, inline on `/2/` through `review-inline.ts`, so its CSP hash lands on that page only):
- It draws a 1600 × 900 scene on a canvas in the layer, cropped the way `object-fit: cover` at 90% 50% crops the still and the video, at device pixels up to 2×, 30 frames a second.
- The camera holds still, so each square is projected once. The artifact's 2° camera sway was dropped: it would mean projecting every square every frame.
- The floor at rest is drawn once per size into a cached bitmap. Each frame copies it and redraws only the squares that change: the twinkling and blinking ones, the block, and any that a report, the ring or the visitor lights, each wiped back to Navy first. Those flat squares are batched by colour and opacity; the block's squares draw after, far to near, with their front and outer sides; one pre-blurred sprite is the block's glow. Opacity comes in 32 steps both in the cache and in the frames, so a square looks the same either way.
- The markup is a still of the loop at 0.76, the complete block, rendered from this script in headless Edge (a 1280 × 720 layer at 2× and 1.5×): `augur-hero-floor-2560.webp`, 70 KB, and `augur-hero-floor.webp`, 51 KB. No-JavaScript visitors keep it; the loop starts on that frame, so the swap is invisible; reduced motion draws that frame and stops.
- It plays while the hero is on screen, the tab is visible and the pause control is off, and holds its frame otherwise. Below 1024 px, in print and in forced colours the layer is hidden and the flock shows.

**Cost** (headless Edge 155, which draws canvas in software; a browser with GPU canvas pays far less):
- Over a whole 12 s loop at 1440 × 900: 133 ms of main-thread work per second at 1×, 126 at 2×. The script's drawing is 1.2–1.45 ms a frame (about 40 ms/s); the rest is the browser putting the canvas on screen 30 times a second, which a GPU browser does mostly off the main thread.
- Before the cached floor (5 s windows): 97–180 ms/s, with 2.4 ms of drawing a frame. Caching halved the drawing; the total fell less, because putting the canvas on screen costs the same.
- Held by the pause control or scrolled away: about 1 ms/s.
- For scale, measured the same way: the flock 1 ms/s, the old `/` hero 290 ms/s before it was cut down; the video costs the main thread almost nothing.
- Further cuts, if real hardware shows the need: 24 frames a second (a fifth less), or the canvas at 1.5× on 2× screens.
- Weight: `/2/` HTML +4.4 KB gzipped (the script); the 51 or 70 KB still replaces the video's poster and 1.3–1.9 MB of AV1.

**Checked** (headless Edge 155 against the dev server and a production build):
- **Scope:** this build and the previous one differ only in `dist/2/index.html` and the two new stills. `/` is byte-identical.
- **1440 × 900:** the canvas mounts at 1008 × 764, runs, and its pixels change between frames; the only hero request is the 1920 still. The flock is `display: none` with no running animations.
- **1440 × 900 at 2×:** the canvas is 2016 × 1528 and the still is the 2560 one.
- **Pause control:** the frame holds; resuming plays from there. **Scrolled away:** paused and held; back at the top it runs.
- **1920 × 1080, 1280 × 720, 1024 × 768:** running, with the canvas at the layer's size.
- **768 × 1024 and 390 × 844:** the layer is hidden, no canvas, no hero request, the flock runs its 321 animations.
- **Reduced motion:** the still frame, drawn once and held. **No JavaScript:** the still image only.
- **Interaction:** hovering the floor lights a pool of squares under the pointer; a click sent a report from that square into the block (screenshots at 0.25 and 0.75 s).
- **Console:** no errors.
- **Project checks:** `bun run check` 0 errors and 0 warnings; budgets and links pass.

**Not checked.**
- Cost and smoothness on real hardware with GPU canvas: Chrome, Edge, Safari and Firefox on laptops and on a 1024 px tablet.
- Touch on a real tablet; Safari at all.
- Print and forced colours in CSS only, not rendered.
- Lighthouse and the Playwright and axe tests (Playwright doesn't connect under Windows Bun here).
- Figma is unchanged; `/2/` is a review copy.

## Hero text breaks, on /2/ — 22 October 2026 (owner asked for a UI/UX read of the hero text)

**Found** (headless Edge at 1920, 1440, 1280, 1024, 768 and 390 wide):
- The lead split its noun phrase wherever it took two lines (1280 and below): “Real-world answers for onchain / apps, controlled by no one.” v2's `text-wrap: balance` chose that split because it makes the two lines nearly equal.
- At 1280 the body ended on a three-word widow, “of a lie.”, on its own line.

**Changed** (`/2/` only: `Hero.astro` renders the spans when `own`; `home-v2-only.css` styles them):
- The lead keeps “controlled by no one.” on one line and wraps greedily, so at 1280 and 1024 it reads “Real-world answers for onchain apps, / controlled by no one.”, breaking at the comma. At 1440 and wider it stays one line; on phones and tablets it keeps “…for onchain / apps, controlled by no one.”, the only two-line fit at that width.
- The body keeps its last five words together (“the cost of a lie.”), so no width ends on a widow. `text-wrap: pretty` was tried first; Chromium only guards one-word orphans, so it left “of a lie.” alone.

**Checked:** line counts unchanged at every width (lead 1 or 2 lines, body 2 to 4); `/` byte-identical; `/1/`, `/3/` and `/4/` have no new markup; `bun run check` 0 errors and 0 warnings; budgets and links pass.

## Hero review, on /2/ — 22 October 2026 (owner asked for a careful UI/UX review of the `/2/` hero from 1024 px, then fixes)

**Measured** (headless Edge over CDP, production builds before and after, 1920 × 1080, 1440 × 900, 1280 × 800, 1280 × 720 and 1024 × 768, plus laptop viewports with the browser's bars taken off):
- **Type:** Display 72/78 Sora 600 at −2% from 1440 (64 at 1280, 51.2 at 1024); lead 22/33 Paper; body 18/28 grey, stepping to 20/30 and 16/24 at 1200 and below. Headline to lead 3.3:1 (2.6:1 at 1024), lead to body 1.22:1 plus the colour step. Lead 58 characters on one line from 1366; body 73 and 68 a line at 1440, inside 45–75.
- **Alignment:** headline ink, lead, body and button all start on the container's left edge (96 at 1440); Sora's T sits 1 px in.
- **Centring:** the copy sits 8 px above the hero's centre on heroes over 800 px tall (56 / 72 padding) and on it below; its ink is 4 px above. The 72 px headline puts the block's visual weight well above centre, as a hero should. No change.
- **Gaps:** 28 / 12 / 28 set. Optically, baseline to cap top, they read about 50 / 28 / 36, so the groups step down in order. 28 is off DESIGN.md's small-space scale (24, 32), but 32 would add 8 px exactly where short screens have none. Kept.
- **Contrast:** headline and lead 17.5:1, body 7.5:1, Navy on Green 11.9:1, focus ring 7.5:1 against Navy; the cue's line 1.66:1 (decorative).
- **Floor clearance:** the left Navy fade (solid to 27% of the layer, clear by 45%) keeps every text line at least 57 px from any visible square at 1024, 66 at 1100 to 1200, 82 at 1366 and 90 at 1440. It clears 1 to 78 px before the block's left edge at every width. No change.
- **Scroll cue:** 50% across, 24 px up: in the gutter between the copy column and the floor (720 at 1440, 4 px past the column's edge).
- **Arrival:** readable by 950 ms; the last finite motion (the cue) ends at 2.8 s; settles at about 3.1 s.
- **States:** hover, pressed and keyboard focus (2 px Pewter ring, 3 px off) work on both actions. Reload settles everything but the underline; reduced motion and no JavaScript show final states; a tab hidden mid-arrival settles and the floor resumes on return; the pause control holds the floor and rests the cue's square.

**Changed** (`/2/` only):
- **Underline order.** It drew at 750–1320 ms, after the actions started at 650: the headline's last motion pulled the eye back up just as “See how it works” landed. Motion onsets capture attention, so they should follow reading order (headline → lead → action). It now draws at 450–1020, as “decentralized” settles (the word is 92% risen by then, and the line rides with it), so it reads as part of the headline. It retracts at 1900–2400, keeping the same hold, so the scroll cue (2400–2800) now really fades in once the line has gone, as `motion.md` describes. The timeline (`heroTimeline.v2`) applies to `/2/` at every width, phones included, and on reloads, where the line simply starts 300 ms sooner. Same transform, same duration: with every loop held, the arrival's main-thread time over 400–2900 ms was 307–391 ms before and 244–352 ms after (six runs each), within noise.
- **Action size, 1024–1200.** v1 stepped both actions down to 14 px with 16 px insets below 1200. That is a tablet fit, and it left the primary action set smaller than the body copy above it. From 1024 they keep the standard control, Sora 600 16/24, 24 px insets and a 24 px gap (DESIGN.md: one button spec, consistency). The pair takes 412 px of the 466 px column at 1024, still on one row; the primary grows from 155 to 189 px wide (Fitts).
- **Short laptop screens.** A 1366 × 768 laptop leaves a viewport of about 615–650 px. There the copy ran past the fold: “See how it works” ended 1 px under it at 630 and 16 px at 615, and sat on the fold at 1280 × 650. Under 700 px tall the hero's padding now steps from 40 to 24 and the headline also scales with the viewport's height (`min(5vw, 10svh)`, never under 40). The action now ends 28 px above the fold at 1366 × 630, 22 at 615 and 16 at 1280 × 650. At 1440 × 700 the headline is 70 px; taller screens are unchanged.
- **The floor starts calm on a first visit** (owner, the same day: “on a first-visit arrival, start the /2/ floor at its rest point so the block builds after the copy is read; keep the 0.76 still for reloads, reduced motion and no JavaScript”).
  - The problem: the canvas started at the loop's 0.76 point, the complete block. On a first visit the block faded in with the layer (500–2100 ms) while it was already breaking up (from about 1 s), and it was gone by 2.1 s. The brightest motion on the screen played while the visitor read the headline, and the story ran backwards: the answer, then its undoing, then about 3 s of rest before the block built again.
  - The fix: when the hero is arriving (`data-hero-arrival="entering"`), `hero-floor-v2.js` starts the loop at 0, its rest point. The floor fades in calm, and the reports fill the block from about 3 s, once the copy has been read.
  - The still never shows, because the layer is still at opacity 0 when the canvas mounts. Reloads, history visits, reduced motion and no JavaScript keep the 0.76 frame, as before.
- **The floor's Green at 65%, no glow** (owner, the same day: “light the /2/ floor's block at about 60–70% Green with no glow, re-render the still to match”).
  - The problem (Von Restorff; DESIGN.md: Primary Green is the one main action in a view): while the block was lit, about 3–11.5 s of every 12 s, and always with reduced motion, without JavaScript or when paused on it, it outweighed the button. It showed 3.3 times the button's area in saturated Green at 1440 (1.9 at 1024), with a glow, so Green meant both “the answer” and “act here”.
  - The fix (`hero-floor-v2.js`): every Green on the floor is now brand Green at 65% over Navy, rgb(32, 155, 121): the block, the reports, the blinking squares and the pointer's light. The glow sprite is gone. Mixing toward Navy rather than the royal navy keeps Green's hue; toward the royal navy it turned cyan.
  - On screen, through the layer's 0.9 opacity and the squares' own, the block's brightest pixel went from rgb(38, 201, 149) to rgb(28, 129, 102): from 9.0:1 to 4.0:1 against Navy, where the button has 11.9:1. The block is now about 62% as bright as before. No floor pixel comes within 30 levels of the button's colour, against 21,144 px before (2.3 times the button's area).
  - It also brings the floor in line with DESIGN.md's “no glow except the Peer mesh highlight”.
  - The stills were re-rendered from the new script with the method of 22 Oct (a 1280 × 720 layer at 2× and 1.5×, reduced motion, WebP at 0.9). Run on the old script, that method reproduces the shipped files byte for byte. `augur-hero-floor-2560.webp` is now 67.6 KB (was 69.5) and `augur-hero-floor.webp` 50.3 KB (was 51.4).

**Kept, with reasons:**
- **Scroll cue position.** It is the only centred element, but on the copy's edge it would hit “See how it works” wherever there is less than about 88 px under the copy: 1280 × 720 (55 px), 1366 × 650 (40) and 1536 × 730 (78). Centred, it sits on the page's axis, in the gutter, clear of everything at every size, and users know the pattern (Jakob's law).
- **Floor placement and fades.** See clearance above.
- **Lead and body step-down below 1200.** The step keeps the block inside 768 px screens.

**Recommended, not applied:**
- **Hover underline on “decentralized”** (Jakob's law; NN/g heuristic 4). A line that draws under a word on hover is the web's link signifier, and this word goes nowhere. The site's own rule (Why Augur emphasis, 18 Oct) avoids underlines because they read as links. The hover is part of the owner's exception (6 Oct), so it stays. If it goes, the load sweep can stay alone.

**Checked:**
- **Scope:** built before and after this change. Only `dist/2/index.html` differs (+81 bytes gzipped); `/` and every other page are byte-identical.
- **Geometry:** at 1920, 1440, 1280 × 800 and 1280 × 720 the hero's geometry is unchanged, measure for measure; at 1024 only the actions changed.
- **Arrival keyframes** at 0, 150, 400, 700, 950, 1400, 2200, 2800 and 3500 ms, with the timeline frozen and seeked: at 700 ms the line is 90% drawn while the actions are still fading in; before, it had not started.
- **States:** hover, pressed and focus on both actions and the underline hover are unchanged.
- **Motion states:** reload (underline 88% drawn at 900 ms, retracted by about 2.5 s, nothing else replays), reduced motion, no JavaScript, a tab hidden 600 ms into the arrival (synthetic: `document.hidden` overridden, since headless Edge can't hide its own tab) and the pause control all behave as before.
- **Overflow:** none at 1920, 1440, 1280, 1200, 1100, 1024, 768, 390 and 360. Nothing below 1024 moved apart from the underline's timing.
- **Floor start**, a separate build pair, at 1440:
  - Only `dist/2/index.html` differs.
  - On a first visit the canvas mounted at 151 ms with the layer at opacity 0.
  - Strongly Green pixels in the canvas (every fourth pixel sampled) show the block's fill:

| Time after load | 0.3–1.2 s | 2.1 s | 3.0 s | 4.5 s | 6 s | 8 s | 10 s |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Before (green pixels) | about 7,600, the whole block | 0 | 137 | 0 | 0 | 2,584 | 5,225 |
| After (green pixels) | 0 | 0 | 0 | 1,662 | 3,655 | 6,610 | 7,580 |

  - A reload started on the whole block at 309 ms, reduced motion held it, and without JavaScript only the still loaded.
  - The arrival's main-thread time with the floor running, 400–2900 ms after load, was 721–819 ms before and 630–816 ms after, over six runs each.
- **Floor Green**, a third build pair:
  - Only `dist/2/index.html` (314 bytes smaller gzipped, without the glow code) and the two stills differ.
  - Frames at 1440 and 1024 with reduced motion, without JavaScript (the new still) and on a first visit 9.5 s in, when the block is whole.
  - Over one whole loop at 1440 the main-thread time was 216–228 ms/s before and 184–229 after, and the script's own drawing 1.36–1.38 ms a frame before and 1.15–1.42 after: no added cost.
- **Console:** no errors.
- **Project checks:** `bun run check` 0 errors and 0 warnings (2 hints); budgets and links pass. `check:copy` gives the same output for both builds (the How it works holder and footer lines, not the hero), and the launch guard lists the standing release gates.

**Not checked:** a real pointer, trackpad or screen reader; Safari and Firefox (`svh` inside `min()` is supported in both); forced colours; Lighthouse; the Playwright and axe tests (Playwright doesn't connect under Windows Bun here). Figma is unchanged; `/2/` is a review copy.

## Permissionless card: Two roads in cubes, on /2/ — 22 October 2026 (owner: “The two roads is genius!”; “add a line in the green line like it is the finish where the cube becomes green … make sure there are no glitches”; “lgtm” for v2; then “make sure people know the one without the queue is augur and the other isn't … maybe the augur glyph or something?” and, after a word label, “no text! can't we get the glyph?”, then “the glyph gotta be extremely small make an exception like add in the street”)

This supersedes the Permissionless scene in “Why Augur cards drawn in isometric, on /2/” above. Trustless and Robust keep their scenes while the owner works on them.

**Why.** The owner asked for a clearer Permissionless picture. Over several rounds on a private comparison board (“Tenet Motion Options”) they chose Two roads: a road with a queue for approval beside an Augur Lituus road nobody blocks. They then asked for it without words, built from the brand's squares as cubes, with a finish line where each cube turns Green.

**What `/2/` shows.**
- At the back, a gated road: four cubes wait in line at a booth, with a gatekeeper in its window, and a striped barrier. Once a loop the barrier lifts, the front cube drives through and away, the others step up and a new cube joins the back.
- In front, the Augur Lituus road, paved in the brand's deep accent green (`--augur-color-accent-deep`) with Green marks. Cubes glide past at a steady pace without stopping. Each turns Green as it crosses a finish line of Paper and Navy squares, with a Green outline pulse on the ground.
- The Augur glyph is painted small where the Augur Lituus road begins, in place of its first Green mark, to say the road without the queue is Augur's. Cubes drive over it. There are no words.
- The resting frame (no JavaScript, reduced motion, print) shows the line waiting at the closed barrier, one cube on its way along the Augur Lituus road and one Green past the finish line.

**The glyph: an owner's brand exception.** The brand keeps the glyph to where the name Augur is already on the surface, at 50 px tall or more, and never redrawn (`src/data/brand.ts`, Brand Foundation).
- Tried first: a Green “Augur Lituus” label, then the glyph standing beside the road's mouth at the 50 px minimum, with its clearspace. The owner wanted no text, and the glyph extremely small, in the street, as an exception.
- It is the supplied reversed master (`public/brand/kit/glyph/augur-glyph-reversed.svg`), its two paths nested unchanged, in its own White and Green.
- It lies flat on the road like a painted marking, turned to face the viewer the way a decal on an isometric floor shows: upright, its width times √1.5 and its height times √0.5. Laid along the road's own axes, it read as an abstract outline (compared side by side).
- It is 14 units tall on the road, 9.4 to 13 px tall on screen. Being under the 50 px minimum is the exception, recorded here like the `/2/` header logo's.
- The name Augur is on the section, in the answer band right above the cards (“With Augur, no one controls the oracle.”).
- In forced colours it keeps its colours, like the rest of the drawing, so it stays readable on the dark road.

**How it is built.**
- `src/data/two-roads.ts` ports the approved sketch: the 30° projection, palette and block faces of `tenets-iso.ts`, fitted to the 336 × 168 view. It also builds the loop's 22 keyframe tracks at build time, and writes each moving part's starting position and opacity into the markup, so the resting frame and the loop's first frame are the same drawing.
- `TwoRoads.astro` draws it and nests the glyph's paths, with no style or script. `Tenets.astro` renders it for the Permissionless card only when `ownerVersion` is true.
- `tenets-iso-v2.js` plays the precomputed tracks (`review-inline.ts` writes them in for `__ROADS__`) on the shared 12 s clock, under the same visibility, pause, print and reduced-motion rules as the other two scenes. The old ask scene and its tracks are removed.
- `home-v2-only.css` turns the barrier arm about its post. In forced colours, Green labels now take CanvasText like the rest; that fixes Robust's “True” and “8”, which stayed Green and were unreadable on a light high-contrast theme.
- The loop:
  - Speeds are steady, and each cube is always drawn at its true depth.
  - The front cube hands over to a twin drawn in front of the barrier, in the same instant and place.
  - At 11.5 s, with the line standing still, the queue returns to its starting places in one instant.
  - The arm turns in its own upright plane.
  - The resting frame catches nothing mid-fade.

**Checked.**
- `bun run check`: 0 errors and 0 warnings (2 hints, in `RepFlow.astro`, untouched). `astro build` passes.
- Builds before and after the scene differed in exactly one file, `dist/2/index.html`. Within it, the Trustless and Robust SVGs are byte-identical; what changed is the Permissionless SVG, the scene driver, the page's CSP hashes and two CSS rules (the arm's pivot and the forced-colours labels). Every inline script that runs, and every inline style, has its hash in the CSP.
- `check:links` and `check:budgets` pass. `check:copy` fails on the footer contact line (`167:840`), which this change doesn't touch; `check:launch` lists the open release gates, as before.
- Weight on `/2/`: +10.7 KB raw, +0.9 KB gzipped for the scene, and the glyph's markup is 1.3 KB more (0.6 KB gzipped on its own). The scene driver is now 14.6 KB, 2.9 KB gzipped, with the tracks written in.
- Glitch check on the built page (headless Edge, 1440): all 22 tracks sampled every 20 ms across the loop.
  - The only jumps and opacity pops are the two designed instant swaps. The frames just before and after each differ by at most 0.0011 px (the queue reset at 11.5 s, 91 shapes) and 0.0009 px (the hand-off at 5.26 s).
  - The loop's end matches its start within 0.0003 px.
  - Its first frame matches the server-rendered resting frame shape for shape.
- Main-thread task time per 5 s at the cards (headless Edge, 1440): 6.3 to 7.3 ms with all three scenes running, and 4.0 to 5.2 ms with Two roads paused. The ask scene it replaces measured 5.9 to 7.3 ms running. A few windows of 100 to 190 ms, in both builds, were V8's memory-reducing garbage collection after load (traced), not the scene.
- Widths 1440, 1280, 1024, 768, 390 and 360: no horizontal overflow, and all 22 tracks running. The scene draws 331, 310, 240, 289, 294 and 264 px wide.
- The glyph on the road, on screen: 20.3 × 13 px at 1440, 19 × 12.2 at 1280, 14.7 × 9.4 at 1024, 17.7 × 11.3 at 768, 18 × 11.6 at 390 and 16.2 × 10.4 at 360.
- Reduced motion runs no tracks and shows the resting frame. With JavaScript off, the resting frame renders in full.
- No console errors while scrolling the page at 1440 and 390.
- Emulated forced colours: the drawing keeps its colours like the other two scenes, the glyph included.

**Not done.**
- Playwright and axe can't run here; the SVG is `aria-hidden`, as the others are.
- No real phone, and Safari and Firefox were not opened.
- Figma is unchanged. `/2/` is a review copy, so the scene reaches Figma only if adopted; it would then be keyed in Section details `250:717` with the other tenet scenes.

## Pause control removed, on /2/ — 22 October 2026 (owner: “remove the "pause animations" stuff”)

**Decision.** The header's “Pause animations” button is gone from `/2/`, with everything that served it.
- Deleted: `motion-pause-v2.js`, the button in `SiteHeader.astro`, its inline script and CSP entry (`review-inline.ts`), and its rules in `home-v2-only.css`, including the paused resting frames of the scroll cue, status dot and Now pulse.
- The hero floor, video and flock and the Why Augur scenes no longer read `data-motion-paused` or listen for `augur:motion`. They still pause off-screen, in a hidden tab and in print, and reduced motion still never starts them.
- The REP rows run through the shared `loop-scene.ts` again, with nothing holding them.

**What it costs.** Every page now fails WCAG 2.2.2 Pause, Stop, Hide (Level A) again, as `/` always has. The launch checklist keeps that as a blocker. The earlier entries, “Pause control for every loop”, “Hero video” and “Live floor hero”, describe the control as it was that day.

## Trustless and Robust cards: Middleman crumbles and the Catapult, on /2/ — 23 October 2026 (owner, 22 Oct: of the first six Trustless options, “they all suck … maybe in trustless we can have like a bunch of blocks communicating to each other without a central intermediary or something that breaks the central intermediary”, then “we using the middleman crushes btw”; for Robust, “I love the catapult … like always doubling and idk destroying the losing side when the winning wins”, then “it gotta start empty . then it fills”; then “lgtm commit add push :) all changes thx”)

This supersedes the Trustless and Robust scenes in “Why Augur cards drawn in isometric, on /2/” above. All three `/2/` cards now draw scenes the owner chose on the private comparison board (“Tenet Motion Options”, version 15), in the same blocks as Two roads, with no words.

**What `/2/` shows.**
- *Trustless, Middleman crumbles:*
  - Six blocks on a ring, joined by dashed links on the floor, talk directly. A Green message slides along a link, under both blocks, so it shows only on its way. It lights its link, then the top of the block it reaches, with a Green outline pulse at that block's foot.
  - At 3.2 s a tower of cubes drops into the middle and links to every block, and the direct links dim. Messages now go through the tower: in Green, a wait, and out grey, lighting nothing.
  - At 7.6 s the tower cracks and crumbles, its cubes falling, shrinking and fading. The links come back, and the blocks talk directly again.
  - Resting frame: the ring, with no one in the middle.
- *Robust, the Catapult:*
  - A seesaw on a small platform: the lie's tray on the left, its blocks dark grey; the truth's on the right, its blocks Green.
  - They keep doubling each other, a batch at a time: one, two, four, eight, sixteen, thirty-two. Each stack fills out in doubling shapes, and the beam tips each way with a spring as a batch lands, a little further every time.
  - The truth's thirty-two slam its side down, with a Green pulse on the ground. The lie's tray flicks up and throws its sixteen off to the left, where each bursts into three pieces that fly apart and fade.
  - The truth's stack clears block by block and the beam comes back level.
  - Resting frame: the empty, level seesaw. The loop starts and ends there, as the owner asked.
  - The doubling is the whitepaper's challenge rule (§4.1). The throw is a picture of the lie losing, not a mechanism: the rule only makes a lie too costly to keep defending. The board noted this trade-off when the owner chose it.

**What differs from the board.**
- Middleman crumbles: the board's last message (block 5 to block 1, leaving at 10.3 s) lit block 1 until 12.5 s, past the loop's end, so that light snapped off at the loop's seam. On `/2/` the message goes to the neighbouring block 0 instead, so every light fades out before the loop closes. All other timings are the board's.
- The Catapult: the board sampled the beam, trays and shadows every 50 ms. On `/2/` they are keyed instead.
  - The beam's springs use CSS timing curves: exact quadratic ease-in and ease-out, and a sine ease-in-out drawn as `cubic-bezier(.37,0,.63,1)`, within 0.2% of the board's curve.
  - The trays follow the beam's ends exactly. Each tray turns with the beam about the pin, then turns back about the beam's end, in the beam's own plane; a turn undone about another point is a pure move, so the tray stays level.
  - The shadows have 82 keys each: the beam's key times, with any stretch halved until straight lines stay within 0.02 units and 0.003 opacity of the true path.
- Burst pieces wait out of sight until the burst instead of drifting while invisible, and the slam's pulse resets its size after it fades. Neither shows.

**How it is built.**
- `src/data/iso-kit.ts` is the shared kit: the 30° projection, palette, blocks, the keyframe builder and the fit to the 336 × 168 view. It moved out of `two-roads.ts`, and Two roads' drawing and keyframes come out byte-identical (compared as JSON).
- `src/data/middleman.ts` (63 tracks) and `src/data/catapult.ts` (101 tracks) build each drawing at its resting frame and its loop's tracks at build time. The Catapult is drawn larger, at up to 2.3 times its own size against 1.75 for the others, so its blocks match the other cards' blocks.
- `src/data/tenets-iso.ts` now lists the three scenes; the old `veto` and `double` geometry is removed.
- `IsoScene.astro` draws any of the three and nests the glyph for Two roads. `TwoRoads.astro` is deleted.
- `tenets-iso-v2.js` plays each scene's precomputed tracks (`review-inline.ts` writes them in for `__SCENES__`). A track plays on every element of its scene that carries its name, so the beam and both trays share one track. The old scenes' track code is removed. The visibility, print and reduced-motion rules are unchanged.
- `home-v2-only.css` drops the label rules, since no scene has words. The tower's cubes shrink about their feet, and the Catapult's beam and trays turn about their own origin, which the drawing puts on the pin and on the beam's ends.

**Checked.**
- `bun run check`: 0 errors and 0 warnings (2 hints, in `RepFlow.astro`, untouched). `astro build` passes, 31 pages.
- A build of HEAD (`132cb88`) and a build of this change differ in exactly one file, `dist/2/index.html`.
- `check:links` and `check:budgets` pass. `check:copy` fails on the footer contact line (`167:840`), which this change doesn't touch; `check:launch` lists the open release gates, as before.
- Weight on `/2/`:
  - The page goes from 485.7 KB to 698.5 KB raw, and from 85.3 KB to 99.6 KB gzipped.
  - The scene driver, with all three scenes' tracks, is 134 KB raw and 8.7 KB gzipped (it was 14.5 KB and 2.9 KB).
  - The Middleman SVG is 41.2 KB raw and 4.9 KB gzipped; the Catapult SVG is 69.6 KB and 5.2 KB. The two scenes they replace were 1.2 KB and 1.4 KB gzipped. Two roads is unchanged.
- Glitch check on the built page (headless Edge, 1440): every animated element sampled every 20 ms across the loop, in all three scenes.
  - For each scene, the loop's end matches its start, and its first frame matches the server-rendered resting frame, shape for shape.
  - The only jumps and opacity pops are designed moves: the tower's drop and collapse, a message going back under its block after arriving, the blocks dropping onto the stacks, the slam and the burst.
- The trays against the beam, every 10 ms across the loop: the beam's end and the tray's attachment point never differ (0.0000 px), the trays never turn (under 1.3 × 10⁻⁶), and the shadows follow the trays across within 0.05 px.
- Frames compared with the board at the same moments: 10 for Middleman crumbles and 14 for the Catapult. They match, except Middleman crumbles at 11 s, which shows the changed last message. Tower cubes were also probed numerically: their positions match the board's to 0.01 px.
- Widths 1440, 1280, 1024, 768, 390 and 360: no horizontal overflow, and all tracks running (22, 63 and 104 animations). The scenes draw 331, 310, 240, 289, 294 and 264 px wide, as before.
- Reduced motion runs no animations and shows the resting frames at every width. With JavaScript off, the server-rendered frames are complete. In emulated forced colours the drawings keep their colours, like Two roads. No console errors.
- Main-thread time at the cards (headless Edge):

| Condition | Before (Two roads + old scenes, 64 animations) | Now (189 animations) |
| --- | --- | --- |
| Idle, 1440, per 5 s | 14–18 ms | 15–29 ms |
| Redrawing every frame, 1440, per frame | 2.3–3.5 ms | 3.0–6.4 ms |
| Redrawing every frame, 390 with the CPU slowed 4×, frames over 25 ms per 5 s | 0 to 2 | 27 to 46 (worst 35 ms) |

  - Frames are counted out of about 300 per 5 s. An earlier run, on a busier machine, counted 20 to 51 late frames before and 126 to 129 now (worst 50 ms).

  - Idle, the browser runs the scenes off the main thread, so they cost next to nothing.
  - When the page redraws every frame, as while scrolling, each frame updates every animated part on the main thread.
  - On a slow phone that work fills the main thread near the cards. The scenes themselves stay smooth; what can lag is other main-thread work while scrolling, such as the header's hide and show.
  - If these scenes ship beyond review, the cost can come down with fewer moving parts, for example fewer burst pieces, or by drawing the scenes on a canvas.

**Not done.**
- Playwright and axe can't run here; the SVGs are `aria-hidden`, as before.
- No real phone, and Safari and Firefox were not opened.
- Figma is unchanged. `/2/` is a review copy, so the scenes reach Figma only if adopted; they would then be keyed in Section details `250:717` with the other tenet scenes.
