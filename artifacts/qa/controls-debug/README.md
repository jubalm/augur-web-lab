# Controls and motion debug verification

5 October 2026. Run with:

```sh
AUGUR_TEST_URL=http://127.0.0.1:4322 AUGUR_DEV_URL=http://127.0.0.1:4323 AUGUR_CHROME_PATH=/usr/bin/chromium bun scripts/inspect-controls-debug.mjs
```

The real contact submit button was hovered and pressed. It rendered Green hover #27D19B and pressed #24BC8D with Navy labels, preserving its 48px height and width.

`controls-matrix.png` and `report.json` cover four pinned server-rendered button variants in six states, plus single-line and multiline fields in seven states. The QA fixture is inserted into the existing production page with its real website CSS; it is not a new route. State labels are fixture annotations. The actual contact form also has composition-specific label/surface rules. Pseudo states are forced through Chrome DevTools for a simultaneous comparison. Source references are `docs/evidence/figma/buttons-261-434.png` (C2 261:434) and `fields-261-1851.png` (C3 261:1851), read without mutating Figma.

The loading overlay now shows a rotating circle and “Loading…” while preserving the pinned hidden-label width and accessible Loading status. Rotation is disabled under reduced motion. All six states retain the same dimensions within each tested button variant. Existing website wrappers supply their text-button spacing independently of the raw registry fixtures.

Browser assertions passed for a continuously visible scene replaying in development, replay stopping on interaction, 5× panel/FLIP/signal timings in slow mode, immediate settlement when reduced motion is enabled, and production ignoring the replay query. Zero page/console errors were recorded. The first attempted DEV URL on 4321 refused connection; `astro dev` identified the actual existing 4323 server, used for the successful run.

This evidence verifies actual control values and debug behavior. It does not claim an automatic pixel-diff result or erase other documented source differences.
