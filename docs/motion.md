# Website motion

Implementation timings live in `src/motion/timelines.ts`, derived from Figma `121:152`, `250:717`, the component state frames and the owner briefs. Since the polish brief of 5 October 2026 the tenet diagrams loop while visible and the hero keeps a measured ambient loop; other scenes still play once. Figma Section details carries the same keyframes (tenet loops on a 12 s timeline in `250:717`, hero ambient loop, REP stake flows in section 07). Browser frame captures and any differences belong in `decisions.md`.

## Shared policy

`play-once.ts` starts a scene when it enters the viewport and cleans up after completion/pagehide. Interaction settles the region; reduced motion cancels it to the static end state. Content and art are fully visible before enhancement and remain settled with JavaScript disabled or in print. Only transform, opacity and SVG stroke draws animate. The picker may change layout only as an intentional interaction with an instant fallback. No scroll hijacking or information gated by animation.

Entrance scenes use the shared play-once controller. Looping scenes use `loop-scene.ts`: a scene starts once 40% of it is visible, repeats while any part is on screen, pauses off-screen or in a hidden tab and resumes where it was; every cycle starts and ends on the static artwork, and the cycle runs linearly with easing on the keyframes. Development-only `?motion=slow` multiplies timings by five; `?motion=replay` assists comparison. Production ignores those flags.

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
| Underline draw | 750 → 1320 | scaleX from left |
| Underline fade | 1800 → 2250 | Opacity to zero |
| Heritage field | 500 → 2100 | Opacity |
| Rings 7, 6, 5, 4, 3, 2, 1 | 0, 100, 200, 300, 400, 500, 600 | Each square moves 1200 ms; fades from .2 over 800 ms |
| Orbit | 1100 → 1700 | Opacity |
| Empty centre | 1750 → 2300 | Appears last |

After arrival the hero keeps an 8 s ambient loop (`hero-ambient.ts`): each ring scales to 0.975 about the empty centre and back (160–1280 ms, peak 640, crossfade easing), outer ring first, 180 ms apart; the dashed centre dims to 55% and steps its dash by two periods (1360–2400 ms). These effects exist only for the active 2.4 s of each cycle, because a continuous CSS animation forced style work on every frame (measured 313 → 117 ms of main-thread work per 5 s; `artifacts/qa/polish/motion-cost.jsonl`). The whole background field drifts ±6/±3 px on a 24 s CSS loop (one composited layer). On fine pointers the ring under the pointer turns Paper while the others recede to 50% (180 ms).

Pointer glow is limited to fine pointers and a 200 px radius, rAF-throttled; 120 ms in / 450 ms out. It resets on leave, scroll and resize, and is disabled for reduced motion, hidden document or off-screen hero. Only a subset of twelve heritage squares twinkles on varied 2.6–5.4 s opacity cycles. This is the sole ongoing ambient treatment and must be measured; off-screen/hidden pauses and reduced-motion cancellation apply.

## Who decides

The answer band is live text. When 60% of it is visible it sweeps in once (900 ms, cubic-bezier(.45,0,.2,1)): a Green ribbon grows from the left under the statement, led by three 10 px squares that fade over the last 180 ms; text ahead of the edge stays Paper on Navy and behind it Navy on Green. No JavaScript, reduced motion, print or an already-visible band show the settled Green band.

The diagrams loop (cycles in ms; Figma `250:717` plays the same tracks on a 12 s timeline):

| Diagram | Cycle | Sequence |
| --- | --- | --- |
| Permissionless | 6000 | Rest to 600; crossers and trails fade 600–900; crossers slide in across the edge from top/right/bottom at 1000/1200/1400 (500 ms, fade-in 150, reveal easing), the Green newcomer last at 1600 with the overshoot curve; trails return 120 (far) and 200 (near) after each arrival; rest to 6000. |
| Decentralized | 12000 | Highlight hops 8→4→5→10→6→3→7 from 500 and back from 6500, 550 apart; each square fades in 350, holds 200 (last 300), fades out 400; the link between two squares glows at the handoff (+350: in 250, hold 100, out 450). Nothing lit at rest. |
| Trustless | 6000 | Rest to 500; the Green result steps back to Mist 500–800; a 6 px Mist square crosses each lane (268 px in 900 ms from 900/1100/1300, fade in 120, out over the last 150); the result relights Green 2200–2500; rest to 6000. |

Peer-mesh glow: square Green 60%, 18 px with 2 px spread; lit link 2 px, 6 px glow at 90%; base links rest at .45 opacity. The three loops together measured 12–13 ms of main-thread work per 5 s.

## Stateful illustrations

| Region | Timing and behaviour |
| --- | --- |
| Applications | Cards/connectors use a 320 ms FLIP transform after one grid layout change; labels counter-scale and outgoing text retains its width. Panel out 160, in 320 with 8 px rise; active connector turns Green. Signal fades 100, travels 60 px over 800; backstop brightens over 250 on arrival. One selected tab, default Prediction markets. |
| Walkthrough | Active step colour 180. The query card swaps in place (`data-panel-swap`), with no card fade: status fades in 180; newly completed progress segments draw left to right 320, 60 apart; the selected outcome settles from 96% over 320; the newest ledger row rises 8 px over 320 after 80. Going back skips the draw and rise. The container reserves the tallest state (575 px). |
| Bond entrance | Bars at 300–900, 500–1100, 700–1300, 900–1500; displacements 16,32,64,128. Baseline clips the rising bars; first 150 of each fades. |
| Bond selection | Later bars fade 160, new latest rises 320 and becomes Green. Four is the initial resting selection. |
| REP stake flows | Once per row, 160 apart: condition line draws 0–400 (draw easing), label fades 150–400; the returned bond slides from the stake to the outcome 300–820 and its caption fades in at the end; the Green gain pops from 30% scale with its caption 780–1100. Risk: a copy of the bond travels 300–820 and fades as the dashed outline appears 700–1000. |
| Roadmap | Track draws to Now over 1000, future dashes fade, stops pop sequentially 110 apart over 320. Panel out160/in320; evidence scaleX 850. Manual tab activation. |
| FAQ | Native details; 320 via details-content/interpolate-size where supported, instant fallback. Answer line stagger50; vertical plus stroke rotates out. Closed rows lift to Dark 2 with a Mist edge and Pewter toggle border on hover (180); keyboard focus adds a 2 px Pewter inset ring; open rows keep the Green edge and only brighten the toggle on hover. |
| Header | Disclosure in180 with 4 px rise, out160, chevron rotation; Escape restores focus. No ARIA menu role. Fine pointers: hover opens after 90 ms; with a panel open, moving to another item swaps panels in the same frame with transitions suppressed; a 24 px bridge joins item and panel; leaving closes a hover-opened panel after 260; clicking a hover-opened item pins it; focus leaving the bar closes it. |
| Blog art/footer field | Static SVG; blog covers fade once over 850 ms, footer field uses its one reveal. |

Controls transition for 180 ms without moving their geometry. Loading spinner exists only while actually loading. Print and forced-colors treatments retain readable relationships; reduced motion uses instant state changes.

Canonical Cross anywhere geometry has twelve base participants, while the brief text says eleven. The implementation preserves the extracted canonical geometry; this is a documented source discrepancy.

FAQ child staggering applies to the answer paragraph and optional link, rather than splitting responsive wrapped lines into artificial spans. Peer-mesh CSS drop-shadows approximate the source's 2 px spread. Development replay restarts visible entrance scenes, pauses off-screen or while hidden, and stops on interaction. Development slow multiplies entrance, tab/picker/walkthrough/bond/roadmap and FAQ timings by five; production ignores both flags. The brief's canonical FAQ 3 has only “Follow the build”, so an extra “Talk to us” link in an older state variant is omitted.

Measured evidence is in `artifacts/qa/motion/hero-results.json` and `artifacts/qa/motion/home/`. Hero arrival is settled at 2300 ms. Twelve twinkle marks cost 4.045 ms of main-thread work over a settled five-second sample, with no measured script, style or layout work. This idle result does not erase startup long tasks: final Lighthouse reports retain the separate failed 50 ms limit. Hidden-page pause/resume of diagrams was exercised using a synthetic visibility event; print and mid-transition reduced-motion changes settle the selected state synchronously.

Controls and debug verification: `scripts/inspect-controls-debug.mjs` checks the rendered contact action plus all four pinned button styles in six states, loading rotation, reduced motion, visible replay, interaction cancellation, ×5 transitions and production flag exclusion. Reports and state screenshots are in `artifacts/qa/controls-debug/`. Website overrides fix state specificity locally; pinned component source remains unchanged.

Final picker verification is in `artifacts/qa/application-flip/`: FLIP keyframes at 0/80/160/320ms; outgoing-panel width preservation; both selection directions at 1440/1280/1024/768/390/360px checked during the fade; rapid retargeting; reduced-motion, print, pagehide and resize settlement; instant no-WAAPI fallback. Card descendants are clipped locally during counter-scaling, preserving the tab’s external focus outline and avoiding transient page overflow. The updated debug report checks 1600ms FLIP under slow mode and confirms that grid columns have no CSS transition.
