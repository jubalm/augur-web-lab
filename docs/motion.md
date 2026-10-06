# Website motion

Implementation timings live in `src/motion/timelines.ts`, derived from Figma `121:152`, `250:717`, the component state frames and the owner briefs. Since 6 October 2026 the looping scenes are choreographies shared with Figma: `src/motion/choreography.ts` defines tracks (keys on a 12 s cycle, in ms, opening and closing on the static artwork, each key's easing shaping the segment that arrives at it, as Figma does); `tenet-choreography.ts` and `hero-choreography.ts` generate them, and the same keys were written into Figma Section details `250:717` and `382:848`. Since the polish brief of 5 October 2026 the tenet diagrams loop while visible and the hero keeps a measured ambient loop; other scenes still play once. Owner feedback the same evening made the tenet loops continuous (always moving, no rest), made entrance scenes once per tab session so F5 never replays them, added a FAQ opening transition, rebuilt the header motion and marked superseded walkthrough stages. On 6 October 2026 Figma Section details was brought back in step: `250:717` (tenet loops, 24 s timeline), `382:848` (hero story loop, 12 s), the pointer-lens and tap-ripple states beside it, and the REP stake-flow tiles in section 07 carry the website's keys. Browser frame captures and any differences belong in `decisions.md`.

## Shared policy

`play-once.ts` starts a scene when it enters the viewport and cleans up after completion/pagehide. Interaction settles the region; reduced motion cancels it to the static end state. Content and art are fully visible before enhancement and remain settled with JavaScript disabled or in print. Only transform, opacity and SVG stroke draws animate. The picker may change layout only as an intentional interaction with an instant fallback. No scroll hijacking or information gated by animation.

Entrance scenes use the shared play-once controller and play once per tab session. A reload (F5) or a back/forward visit shows every entrance scene settled, read from the navigation type (`PerformanceNavigationTiming.type`), so it holds where `sessionStorage` is blocked: the 6 October report came from a browser that denies storage, where the earlier storage-only rule replayed everything on F5. On a fresh visit `seen.ts` records each scene (by page and script order) in `sessionStorage` when it starts, so a later visit in the same session shows it settled while scenes not yet reached still play; without storage a fresh visit plays them. The hero arrival records `augur:hero-arrived` and also skips on any non-`navigate` navigation type. Looping scenes use `loop-scene.ts`: a scene runs whenever any part of it is on screen, pauses off-screen or in a hidden tab and resumes where it was; every track starts and ends on the static artwork, runs linearly with easing on the keyframes, and may be offset by a positive delay (before its first iteration it shows the static artwork). Development-only `?motion=slow` multiplies timings by five; `?motion=replay` assists comparison. Production ignores those flags.

| Shared token | Value |
| --- | --- |
| Reveal | cubic-bezier(.22,.61,.36,1) |
| Hero | cubic-bezier(.22,.7,.22,1) |
| Draw | cubic-bezier(.45,0,.2,1) |
| Crossfade | cubic-bezier(.45,0,.55,1) |
| Newcomer overshoot only | cubic-bezier(.45,1.45,.8,1) |
| Hover/press | 180 ms |
| Fade out / tab panel / long panel | 160 / 320 / 850 ms |
| Timed stagger | 110 ms |

## Hero arrival

Inline opt-in precedes paint. Interaction, reduced-motion changes, hidden page and pagehide settle it; bfcache restoration does not replay arrival. The art is exact extracted SVG geometry with per-square source offsets.

| Element | Start → end, ms | Treatment |
| --- | --- | --- |
| Headline line 1 | 0 → 700 | Opacity + 16 px rise |
| Line 2 | 100 → 800 | Same |
| Line 3 | 200 → 900 | Same |
| Support | 400 → 900 | Opacity + 8 px rise |
| Actions | 650 → 950 | Opacity, disabled while fully transparent |
| Underline draw | 750 → 1320 | scaleX from left; the underline then stays (owner, 6 Oct 2026), so it is also there on every reload and without JavaScript. It sits just under the letters: its top is 0.1 em below the baseline (the baseline is .97 em into the text box), `max(2px, .042em)` thick |
| Heritage field | 500 → 2100 | Opacity |
| Rings 7, 6, 5, 4, 3, 2, 1 | 0, 100, 200, 300, 400, 500, 600 | Each square moves 1200 ms; fades from .2 over 800 ms |
| Orbit | 1100 → 1700 | Opacity |
| Empty centre | 1750 → 2300 | Appears last |

After arrival the hero tells a 12 s story with its squares while it is on screen (`hero-choreography.ts`, `hero-ambient.ts`; owner, 6 Oct 2026: the ring wave was "weird, not dynamic"). The artwork is the same canonical geometry drawn as HTML boxes, so every track is transform or opacity on the compositor: about 8 ms of main thread per 5 s, against about 150 ms for the previous SVG wave.

| Phase | Time (ms) | Treatment |
| --- | ---: | --- |
| Ask | 0–760 | The dashed centre pops to 122% (reveal, then crossfade) |
| Question goes out | 240 + 110 per ring (+0–70 jitter), 550 each | Each square pops to 108% (inner ring) up to 190% (outer) and back |
| Reports | 1800–5400 | 41 squares chosen by a seeded random flash Green (rise 90, hold 260, fall 700) and pop to 122% |
| Agreement | 6300 + 110 per ring inward (+0–50) | Each square contracts to 82% and returns (crossfade, then reveal) |
| Answer held | 7200–9400 | The inner ring holds Green around the still-empty centre. Nothing in the hero glows (owner, 6 Oct 2026) |
| Drift | whole cycle | Every square from ring 2 out orbits its resting place, radial or tangential, 1.4–5.4 px, over 4, 6 or 12 s |

Pointer lens (fine pointers only): squares within 130 px of the pointer move away from it by up to 24 px, grow by up to 55% (squares of 18 px and more by 22%) and brighten to Paper at up to 70%, with `(1 − d/130)²` falloff; rAF-throttled, eased by a 280 ms transform transition, reset on leave and scroll. Click or tap in the hero (not on a control, not ending a text selection): a 1 px Green square ripple scales from 20% to 700% while fading (900 ms), and a Green front crosses the field at 0.75 px/ms; each square within 560 px flashes Green (760 ms) and pops to 130% (560 ms, composited on top of the loop). The background field still drifts ±6/±3 px on a 24 s CSS loop.

Pointer glow is limited to fine pointers and a 200 px radius, rAF-throttled; 120 ms in / 450 ms out. It resets on leave, scroll and resize, and is disabled for reduced motion, hidden document or off-screen hero. Only a subset of twelve heritage squares twinkles on varied 2.6–5.4 s opacity cycles. This is the sole ongoing ambient treatment and must be measured; off-screen/hidden pauses and reduced-motion cancellation apply.

## Who decides

The answer band is live text. When 60% of it is visible it sweeps in once (900 ms, cubic-bezier(.45,0,.2,1)): a Green ribbon grows from the left under the statement, led by three 10 px squares that fade over the last 180 ms; text ahead of the edge stays Paper on Navy and behind it Navy on Green. No JavaScript, reduced motion, print or an already-visible band show the settled Green band.

The diagrams are always moving while visible (owner, 5–6 Oct 2026: "more dynamic", "alive"). Every element has its own track on a 12 s cycle from `tenet-choreography.ts`; Figma `250:717` carries the same keys on a 24 s timeline (staggered start and one steady cycle).

| Diagram | Sequence (ms) |
| --- | --- |
| Permissionless | Four crossers wait on the open edge and start 3000 apart. Each finishes crossing (0–700, reveal; the Green newcomer with the overshoot curve), lights Green as it passes the edge (350–600, held to 2400), stays on as a Paper member (2400–4000), settles to Mist by 5600, brightens and leaves back across the edge (6400–7300) and returns to wait (11200–12000) as its trail fades back in. Seated members brighten to Paper 55% in a scattered order, one every 900 (rise 300, hold 300, fall 900), so two or three squares are lit at once. |
| Decentralized | A relay tours 8→9→10→5→1→2→6→10→11→7→3→6→10→9→4→0→1→5→4→8: a closed route found by search that never turns straight back and covers all 16 links (no route visits every square exactly once). Constant speed, 140 handoff at each square, 900 at home. Each link glows from departure (rise 120) to arrival and fades over 900; each square lights 80 before the relay lands (rise 160) and fades 900 after it leaves, so a lit trail follows the relay. Home (square 8) is lit at rest. |
| Trustless | Each lane fires like a neuron on its own rhythm: lane 1 at 0, 2900, 6100, 9000; lane 2 at 1100, 4700, 9700; lane 3 at 2200, 5600, 8400. A firing: the sender flashes Paper (80 up, 280 down) and pops to 118%; a 6 px Paper signal with 4 px and 3 px followers (60 and 120 behind, 50% and 25%) crosses 274 px at constant speed in 1200; the solid segments light Paper 90% as it passes; the middle never lights; the receiver fires Green (rise 80, hold 320, fall 650) and pops to 116%. |

Peer-mesh glow: square Green 60%, 18 px; lit link 2 px, 6 px glow at 90%; base links rest at .45 opacity. Only the Peer mesh glows (AGENTS.md); the crossers and the Trustless flashes and fires are flat (owner, 6 Oct 2026: no glow). The SVG elements animate `transform`, not the individual `translate`/`scale` properties: in Chromium those re-layerized the diagrams every frame (measured about 2 s of main thread per 5 s, against 80–110 ms with `transform` for all three diagrams together).

## Stateful illustrations

| Region | Timing and behaviour |
| --- | --- |
| Applications | Cards/connectors use a 320 ms FLIP transform after one grid layout change; labels counter-scale and outgoing text retains its width. Panel out 160, in 320 with 8 px rise; active connector turns Green. Signal fades 100, travels 60 px over 800; backstop brightens over 250 on arrival. One selected tab, default Prediction markets. In Prediction markets the market result is a native radio group (Yes / No): the Green fill slides to the chosen row (`translate`, 320, reveal easing), the check pops in (overshoot) and the signal runs down to the backstop again. |
| Walkthrough | Active step colour 180. Earlier stages recede: completed steps turn Pewter, their title is struck through (a 1.5 px line scales in from the left over 320, draw easing) and a Green check pops in (overshoot curve). The query card swaps in place (`data-panel-swap`), with no card fade: status fades in 180; newly completed progress segments draw left to right 320, 60 apart, and earlier segments rest at 40%; the selected outcome settles from 96% over 320; the newest Activity row rises 8 px over 320 after 80 and its Green node pops in from 40% (320 after 120, overshoot), while the event that was latest hands back its Green node and steps back to Pewter (colour, 320). Activity is a timeline: 24 px icon nodes on a rail (fee paid, bond locked, answer final), amounts in tags, only the latest event Green. When the challenge lands, the replaced YES chip and the “Reported Yes” row are struck through (`<s>`, line drawn over 320 after 160). Going back skips the draw and rise. The container reserves the tallest state (575 px). |
| Bond entrance | Bars at 300–900, 500–1100, 700–1300, 900–1500; displacements 16,32,64,128. Baseline clips the rising bars; first 150 of each fades. |
| Bond selection | Later bars fade 160, new latest rises 320 and becomes Green. Four is the initial resting selection. |
| REP stake flows | One row per action (icon and action, the flow drawn large with 40 px bonds, then the text; rows rather than a second set of three boxes after the tenets). Once per row, 160 apart, and again whenever a mouse enters the row: condition line draws 0–400 (draw easing), label fades 150–400; the returned bond slides from the stake to the outcome 300–820 and its caption fades in at the end; the Green gain pops from 30% scale with its caption 780–1100. Risk: a copy of the bond travels 300–820 and fades as the dashed outline appears 700–1000. |
| Roadmap | The Graphite track draws to Now over 1000 and the Green current leg (Moon Fork → Now) draws over its last third; future dashes fade; stops pop sequentially 110 apart over 320. Panel out160/in320; evidence scaleX 850. Manual tab activation. Past milestones are done, not alive: checked Graphite stops and Pewter labels. Now keeps a live pulse: a 1 px Green ring scales from 50% to 135% and fades every 2.4 s (CSS, compositor; none under reduced motion). |
| FAQ | Native details in a same-document view transition (380, reveal easing): each question's box eases to its new height and clips the live content, so the answer is revealed and the questions below slide; the outgoing snapshot fades; the page itself does not crossfade. The toggle turns half a revolution while its upright bar lies flat (320); a Green edge draws down from the top (320); the answer paragraph and link rise 8 px and fade in, 100 and 150 after the click. The question open on load never animates. Without view transitions the height change is instant and the small transitions remain. Closed rows lift to Dark 2 with a Mist edge and Pewter toggle border on hover (180); keyboard focus adds a 2 px Pewter inset ring; open rows keep the Green edge and only brighten the toggle on hover. |
| Header | Logo, centred navigation and actions on a three-column grid. A Dark 3 highlight tile glides to the item under the pointer or the open item (translate + scaleX, 240, reveal easing; appears in place with a 160 fade). Panels hang from the header's bottom edge: in 200 dropping 6 px, out 150; chevron turns 180 over 200. Switching with a panel open (hover or click) closes the old panel without its fade and glides the new one from the old position and size: translateX and a frame scale on `::before` over 260, links fade in over 180 after 70, so there is no close/reopen flash or gap. Fine pointers: hover opens after 80 ms; a 28 px bridge joins item and panel; leaving closes a hover-opened panel after 220; clicking a hover-opened item pins it; focus leaving the bar and Escape close it, Escape restoring focus. Panel rows: products show their tagline and a square mark that turns Green and rotates to a diamond on hover; resources and community show a Phosphor icon or logo that turns Green; off-site arrows nudge 2 px. No ARIA menu role. |
| Blog art/footer field | Static SVG; blog covers fade once over 850 ms, footer field uses its one reveal. |

Controls transition for 180 ms without moving their geometry. Loading spinner exists only while actually loading. Print and forced-colors treatments retain readable relationships; reduced motion uses instant state changes.

Canonical Cross anywhere geometry has twelve base participants, while the brief text says eleven. The implementation preserves the extracted canonical geometry; this is a documented source discrepancy.

FAQ child staggering applies to the answer paragraph and optional link, rather than splitting responsive wrapped lines into artificial spans. Peer-mesh CSS drop-shadows approximate the source's 2 px spread. Development replay restarts visible entrance scenes, pauses off-screen or while hidden, and stops on interaction. Development slow multiplies entrance, tab/picker/walkthrough/bond/roadmap and FAQ timings by five; production ignores both flags. The brief's canonical FAQ 3 has only “Follow the build”, so an extra “Talk to us” link in an older state variant is omitted.

Measured evidence is in `artifacts/qa/motion/hero-results.json` and `artifacts/qa/motion/home/`. Hero arrival is settled at 2300 ms. Twelve twinkle marks cost 4.045 ms of main-thread work over a settled five-second sample, with no measured script, style or layout work. This idle result does not erase startup long tasks: final Lighthouse reports retain the separate failed 50 ms limit. Hidden-page pause/resume of diagrams was exercised using a synthetic visibility event; print and mid-transition reduced-motion changes settle the selected state synchronously.

Controls and debug verification: `scripts/inspect-controls-debug.mjs` checks the rendered contact action plus all four pinned button styles in six states, loading rotation, reduced motion, visible replay, interaction cancellation, ×5 transitions and production flag exclusion. Reports and state screenshots are in `artifacts/qa/controls-debug/`. Website overrides fix state specificity locally; pinned component source remains unchanged.

Final picker verification is in `artifacts/qa/application-flip/`: FLIP keyframes at 0/80/160/320ms; outgoing-panel width preservation; both selection directions at 1440/1280/1024/768/390/360px checked during the fade; rapid retargeting; reduced-motion, print, pagehide and resize settlement; instant no-WAAPI fallback. Card descendants are clipped locally during counter-scaling, preserving the tab’s external focus outline and avoiding transient page overflow. The updated debug report checks 1600ms FLIP under slow mode and confirms that grid columns have no CSS transition.
