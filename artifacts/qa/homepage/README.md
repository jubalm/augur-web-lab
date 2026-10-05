# Homepage sections 04–10: visual evidence

Captured 5 October 2026 from the local static production preview at 1440 × 900. Final application, walkthrough, bond and roadmap screenshots were refreshed after the final artwork corrections, with reduced motion enabled and the pointer outside the component. No Figma document was modified.

## Files

- `figma-*.png`: live Figma MCP exports. Section frames: 239:474, 135:255, 207:1590, 304:645, 162:485, 35:75 and 36:86.
- `*-1440.png`: rendered sections and all 17 tab states. FAQ captures include the section heading; their Figma references contain only the accordion.
- `final-geometry.json`: final state visibility, component heights, browser errors and responsive overflow checks.
- `roadmap-geometry.json`: exact read-only extraction for the alternate evidence panels and paper-cover marks.
- `../motion/home/`: 20 entry-timeline frames, selected-state frames at 80/320 ms, cover and FAQ frames, static fallbacks and JSON reports.

## Final checks

All 17 tab states had exactly one visible labelled panel. The three application pickers are 544 px high. Walkthrough lists remain 549 px high; query cards are 423, 465, 507 and 549 px, matching the source states. Bond charts are 395 px versus the source 394; roadmap controls are 550 px versus the source 549. The section-level default geometry is within 2 px of the source export heights. This does not assert that every internal coordinate is within 4 px.

Page widths 1440, 1280, 1024, 768, 390 and 360 matched document scroll width. No page errors occurred. Keyboard arrows, Home/End and Enter were checked for all four tab groups; picker and roadmap require manual activation.

Entry timelines were paused and sought: tenets at 0/450/1050/1750/2550/5400/6100 ms, bonds at 0/300/900/1500, REP at 0/350/850/1200/1390, roadmap at 0/500/1000/1150. Tenets stop after the final highlight at 6100 ms; each REP row settles in 1170 ms with 110 ms between rows. Selected-state timings include 160 ms outgoing and 320 ms incoming panels, 850 ms roadmap evidence and 100/800/250 ms application signal/fill phases. Cover fade is 850 ms. FAQ paragraph/link entrance is 320 ms with a 50 ms stagger.

No-JavaScript and reduced-motion documents exposed settled art, one default panel per group and the first FAQ open. Offscreen motion paused; interaction settled it without replay. Reduced motion during a panel transition immediately exposed the selected panel with no active animations. Dispatching `beforeprint` likewise settled motion and the current panel. The hidden-page callback was tested using a synthetic `document.hidden` value and `visibilitychange` event, rather than an operating-system background-tab test.

## Deliberate differences and remaining limits

- The source drawing has 12 inner permissionless participants, despite the brief saying 11; the actual drawing is preserved.
- Navy role colors replace older hard-coded surface/border colors in some state variants. Source text and geometry are preserved.
- Round controls are 44 px instead of 40, and selected outcome/round labels are underlined, to satisfy target size and non-color selection requirements.
- The criteria target is 44 px. No expanded criteria prose exists in the inspected source, so the disclosure repeats the supplied question and cutoff.
- The old FAQ3 variant's extra “Talk to us” action is omitted because the canonical brief specifies only “Follow the build.”
- The roadmap mission action uses `/about/`; the old `/mission/` destination is not part of this build.
- Future bond fills disappear as the brief specifies; the old variant's dashed ghost rectangles are not retained.
- The peer highlight uses CSS drop shadows; the source's 2 px glow spread is approximate.
- FAQ content staggers by paragraph and link, rather than splitting responsive wrapped lines into fixed spans.
- Development slow/replay flags apply to authored entry timelines. Interaction panels retain their normal timings.
- REP square-math motion is designed from the brief because its Figma note marks motion “to do.” Mobile layouts are adaptations of the desktop-only source.

Motion reports predate the final CSS/art corrections to alternate application and roadmap panels and the walkthrough progress/connector marks. Those changes did not alter the verified controllers or timeline durations; the refreshed static captures show their final appearance.
