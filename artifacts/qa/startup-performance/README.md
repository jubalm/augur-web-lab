# Startup measurements — 5 October 2026

These bounded investigations supplement the six original indexing-enabled Lighthouse audits; they do not replace their SEO results.

- `learn-baseline` → `learn-attributes`: removing unused per-square motion custom properties reduced the largest traced task from 64.381ms to 53.213ms (thread CPU 26.189→20.361ms); simulated long task 129→106ms; Performance 100 both and LCP 1207→1204ms. The full-page PNG was byte-identical. This optimization is retained.
- `home-before-paths` → `home-after-paths`: trial consolidation of 137 glow rectangles into 2 compound paths kept geometry but altered 113 antialiased pixels in an actively lit frame (largest channel difference 19). Performance 99→100, LCP 1603→1698ms and simulated tasks 160→212/90ms do not establish a long-task improvement. The trial was rejected; production uses the original rectangles.
- `heritage-comparison.json` records the lit comparison; the earlier before/after-paths screenshots did not activate the glow, so they prove only the unlit appearance. `scripts/inspect-heritage.mjs` reproduces the rejected trial inside a disposable browser document and intentionally returns failure when its pixels differ.
- `attribution-summary.json` distinguishes wall-clock task duration from thread CPU. The longest measured Learn task contains initial style/layout work, not a dominant JavaScript handler. Wide wall/CPU differences suggest scheduling or blocking contributes; this is an inference, not a waiver of the 50ms requirement.

No run met the strict absence-of-long-tasks requirement. Manual route-interception traces are retained for diagnosis but are not the matching Lighthouse comparison.
