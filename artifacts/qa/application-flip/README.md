# Application FLIP verification

Final source build: 5 October 2026, 16:23:31 local time. Run `AUGUR_CHROME_PATH=/usr/bin/chromium bun scripts/inspect-application-flip.mjs` against the production preview on port 4322.

The picker applies its final grid columns once per selection, then animates card/connector transforms from the previous visual bounds. Label children receive reciprocal scale transforms, so surface widening does not stretch the type. Only card descendants are clipped; the tab's own focus outline remains outside its border. The outgoing panel keeps its prior width and visual position during its 160 ms fade, then restores its local styles before the incoming 320 ms fade. No document-wide overflow suppression is used.

`report.json` and `flip-{0,80,160,320}.png` record isolated card-layout frames. The harness deliberately pauses and seeks those effects; it explicitly finishes captured handles afterward because unfilled effects past their duration are omitted from `getAnimations()`. These frames isolate FLIP geometry, rather than claiming a full-scene sequential-time capture of the separate panel phases.

Actual passing checks:

- Original visual bounds at 0 ms, final static columns, and transform/opacity effects only.
- Rapid desktop reselect converges to the latest tab and removes temporary panel width/transform styles.
- Between fully settled selections, both directions and all three cards were checked at 1440, 1280, 1024, 768, 390 and 360 px, sampling 20, 80 and 150 ms through the outgoing fade. No horizontal overflow.
- Reduced-motion change, beforeprint and persisted pagehide settle the selected panel and clean up effects/styles.
- Removing the WAAPI animate function preserves instant, functional tab selection with no browser error.
- Development slow mode uses 1600 ms FLIP, 800 ms outgoing panels and 4000 ms signal travel; grid CSS transition duration is 0 s. The updated `../controls-debug/report.json` verifies this alongside production replay exclusion.

One initial test-harness run failed because it did not finish a captured paused effect omitted by `getAnimations()`. A later navigation overlapped a build and hit transient 404s. Neither is retained as a passing run. The focused responsive test then caught real 768 px overflow from reciprocal child transforms; per-card descendant clipping fixed it. The final stable focused run passed with zero page/console errors.
