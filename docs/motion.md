# Website motion

Implementation timings live in `src/motion/timelines.ts`, derived from Figma `121:152`, `250:717`, the component state frames and the owner brief. Production scenes play once; prototype loops are not copied. Browser frame captures and any differences belong in `decisions.md`.

## Shared policy

`play-once.ts` starts a scene when it enters the viewport and cleans up after completion/pagehide. Interaction settles the region; reduced motion cancels it to the static end state. Content and art are fully visible before enhancement and remain settled with JavaScript disabled or in print. Only transform, opacity and SVG stroke draws animate. The picker may change layout only as an intentional interaction with an instant fallback. No scroll hijacking or information gated by animation.

Entrance scenes use the shared play-once controller. Development-only `?motion=slow` multiplies timings by five; `?motion=replay` assists comparison. Production ignores those flags.

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

Pointer glow is limited to fine pointers and a 200 px radius, rAF-throttled; 120 ms in / 450 ms out. It resets on leave, scroll and resize, and is disabled for reduced motion, hidden document or off-screen hero. Only a subset of twelve heritage squares twinkles on varied 2.6–5.4 s opacity cycles. This is the sole ongoing ambient treatment and must be measured; off-screen/hidden pauses and reduced-motion cancellation apply.

## Who decides

One scene runs to 6200 ms and rests on the canonical diagrams. Answer text fades at 50–550 and rises 18 px at 50–600.

| Cross anywhere element | Timing, ms |
| --- | --- |
| Dotted edge | 400 → 750 |
| Twelve participants | Start 450, 40 apart, 320 duration |
| Top / right / bottom / newcomer | 950 → 1450 / 1150 → 1650 / 1350 → 1850 / 1550 → 2050 |
| Crossing displacement | -30 y / +48 x / +30 y / -48 x |
| Trail far / near starts | 1070 / 1150; 1270 / 1350; 1470 / 1550; 1670 / 1750 |
| Trail fade | 150; far 4 px rests .30, near 8 px rests .55 |

Peer mesh: twelve squares pop at 450–1320; sixteen links draw at 750–1600 and rest at .45 opacity. Highlight order is 8→4→5→10→6→3→7, beginning 1750 with roughly 550 ms hops. Each square fades in 350, holds 200, fades out 400; final highlight ends about 6100. Square glow is Green 60%, 18 px with 2 px spread; lit link is 2 px, 6 px glow at 90%. The end state has no lit participant. There is no moving particle along the links.

No authority: participants at 450–970, result outline at 700–1020, lines at 800–1330, dotted gaps at 1050–1470. Lane signals cross 268 px at 1400–2300, 1550–2450 and 1700–2600, fading away. The result turns Green at 2550–2850.

## Stateful illustrations

| Region | Timing and behaviour |
| --- | --- |
| Applications | Cards/connectors use a 320 ms FLIP transform after one grid layout change; labels counter-scale and outgoing text retains its width. Panel out 160, in 320 with 8 px rise; active connector turns Green. Signal fades 100, travels 60 px over 800; backstop brightens over 250 on arrival. One selected tab, default Prediction markets. |
| Walkthrough | Active step colour 180; description/status/outcome/ledger update 320. All states reserve equal height. A challenge replaces the tentative answer and restarts appeal. |
| Bond entrance | Bars at 300–900, 500–1100, 700–1300, 900–1500; displacements 16,32,64,128. Baseline clips the rising bars; first 150 of each fades. |
| Bond selection | Later bars fade 160, new latest rises 320 and becomes Green. Four is the initial resting selection. |
| REP equation | Row stagger 110. Stake 0–320; arrow 240–560; return 460–980; plus 700–880; win 850–1170. Risk replaces its stake with the dashed outline. |
| Roadmap | Track draws to Now over 1000, future dashes fade, stops pop sequentially 110 apart over 320. Panel out160/in320; evidence scaleX 850. Manual tab activation. |
| FAQ | Native details; 320 via details-content/interpolate-size where supported, instant fallback. Answer line stagger50; vertical plus stroke rotates out. |
| Header | Disclosure in180 with 4 px rise, out160, chevron rotation; Escape restores focus. No ARIA menu role. |
| Blog art/footer field | Static SVG; blog covers fade once over 850 ms, footer field uses its one reveal. |

Controls transition for 180 ms without moving their geometry. Loading spinner exists only while actually loading. Print and forced-colors treatments retain readable relationships; reduced motion uses instant state changes.

Canonical Cross anywhere geometry has twelve base participants, while the brief text says eleven. The implementation preserves the extracted canonical geometry; this is a documented source discrepancy.

FAQ child staggering applies to the answer paragraph and optional link, rather than splitting responsive wrapped lines into artificial spans. Peer-mesh CSS drop-shadows approximate the source's 2 px spread. Development replay restarts visible entrance scenes, pauses off-screen or while hidden, and stops on interaction. Development slow multiplies entrance, tab/picker/walkthrough/bond/roadmap and FAQ timings by five; production ignores both flags. The brief's canonical FAQ 3 has only “Follow the build”, so an extra “Talk to us” link in an older state variant is omitted.

Measured evidence is in `artifacts/qa/motion/hero-results.json` and `artifacts/qa/motion/home/`. Hero arrival is settled at 2300 ms. Twelve twinkle marks cost 4.045 ms of main-thread work over a settled five-second sample, with no measured script, style or layout work. This idle result does not erase startup long tasks: final Lighthouse reports retain the separate failed 50 ms limit. Hidden-page pause/resume of diagrams was exercised using a synthetic visibility event; print and mid-transition reduced-motion changes settle the selected state synchronously.

Controls and debug verification: `scripts/inspect-controls-debug.mjs` checks the rendered contact action plus all four pinned button styles in six states, loading rotation, reduced motion, visible replay, interaction cancellation, ×5 transitions and production flag exclusion. Reports and state screenshots are in `artifacts/qa/controls-debug/`. Website overrides fix state specificity locally; pinned component source remains unchanged.

Final picker verification is in `artifacts/qa/application-flip/`: FLIP keyframes at 0/80/160/320ms; outgoing-panel width preservation; both selection directions at 1440/1280/1024/768/390/360px checked during the fade; rapid retargeting; reduced-motion, print, pagehide and resize settlement; instant no-WAAPI fallback. Card descendants are clipped locally during counter-scaling, preserving the tab’s external focus outline and avoiding transient page overflow. The updated debug report checks 1600ms FLIP under slow mode and confirms that grid columns have no CSS transition.
