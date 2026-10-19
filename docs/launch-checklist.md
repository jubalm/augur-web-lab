# Launch checklist

The website is a pre-launch build. `bun run check:launch` fails for every unchecked item here, every unverified destination, and every content review flag. Normal build/check remain independent. Last reviewed: 5 October 2026.

## Canvas requirements

- [x] Link “Catch up” to the Q2 2026 report. — Figma `215:435`, Note / 01 / Announcement bar.
- [ ] Decide when to retire or rotate the message. — Figma `215:435`, Note / 01 / Announcement bar.
- [ ] Confirm the spelling: the menu says “Stratoblast”; the code and strategy say “Statoblast”. — Figma `215:463`, Note / 02 / Header.
- [ ] The hero animation is a placeholder for now. Still needs more thought before launch. — Figma `215:491`, Note / 03 / Hero.
- [ ] 6 October 2026: the new hero motion (story loop, pointer lens, tap ripple) awaits the owner’s review. — Figma `215:491`, Note / 03 / Hero.
- [x] “Trustless” is the strategy’s word; the whitepaper says “bribery-resistant”. Pick one. Resolved 18 October 2026: “Bribery-resistant” (owner; see decisions.md). — Figma `215:523`, Note / 04 / Who decides what happened?.
- [ ] Confirm the fallback note in the Insurance & payments example (“An insurance app could also use a faster oracle on its own chain or L2, and turn to Augur Lituus only when a claim is disputed.”) with the maintainers. — Figma `215:551`, Note / 05 / What could you build?.
- [ ] Refresh after each quarterly report and confirm with the maintainers. — Figma `215:601`, Note / 08 / Roadmap.
- [ ] The posts are stand-ins; choose real posts before launch. — Figma `215:625`, Note / 09 / From the blog.
- [ ] Answers 4 and 5 are whitepaper-based drafts that need review. — Figma `215:649`, Note / 10 / FAQ.
- [ ] The newsletter needs a provider, consent and privacy text before it can collect emails. — Figma `215:673`, Note / 11 / Footer.
- [ ] contact@augur.net needs the domain owner’s confirmation. — Figma `215:673`, Note / 11 / Footer.
- [ ] Approve the merged How it works copy (19 October 2026, draft, `walkthroughReview` in `src/data/walkthrough.ts`): title “Know what happened? / Get paid to report it.”, the lead, the four step titles and descriptions, the “Example” tag, each “Your REP” zone (labels, captions, “It goes to whoever first reports the answer that becomes final.”, the overturned line, “The other 3 REP is burned.”), the “You challenged with No” ledger row and the holder note. Confirm the payout wording (Reporter Pay to the first reporter of the final outcome; the challenger receiving it in step 4) with the maintainers. — Figma `305:1618`, Note / 07, and the How it works note.
- [x] First pass, added 2 October 2026. Spacing and motion still to polish. Superseded 19 October 2026: the REP section is folded into How it works. — Figma `305:1618`, Note / 07 / What can you do with REP?.
- [x] Every destination is a placeholder until its page exists. All new page destinations now resolve; public destinations are registered and HTTP-verified. — Figma `216:340`, Note / 02 / Header dropdowns.
- [ ] Approve the Products menu action label, “Explore Augur Lituus →” (added 6 October 2026). — Figma `216:340`, Note / 02 / Header dropdowns.
- [x] These frames show the hero without the announcement bar. Canonical homepage adds the bar as required. — Figma `216:371`, Note / 03 / Hero motion.
- [ ] The fallback note is a proposed design; confirm chain and L2 support, and the fallback use, with the maintainers. — Figma `216:405`, Note / 05 / Picker states.
- [x] Approve the use-case label, now “Answer” (added 18 October 2026 as “Augur Lituus answers”, approved by the owner on 19 October 2026, and shortened that day so the heading carries the name). The market query labels added 6 October 2026 (“Asked”, “Reported Yes”, “Not challenged”, “Final”) left the homepage with the query card on 18 October 2026. — Figma `216:405`, Note / 05 / Picker states.
- [ ] Approve the case-picture labels (added 19 October 2026, cut back the same day): “Yes”, “No”, “Due”, “+2 hours”, “Paid”, “No policy”, “This review”, “A later review”, “Proposal”, “Review” and “Live”. The pictures are illustrative: no prices, seats, counts or dates are real. — Figma: pending list, “Use cases as a list beside one example”.
- [ ] Approve the use-case copy added 19 October 2026: every answer Yes or No (Invalid not shown); the governance question “Did the upgrade pass its safety review?” with answer No and “The proposal goes live once a later review passes.”; the three case summaries (“Markets on any question with a result people can check: …”, “Coverage and payments that trigger when something measurable happens: …”, “Proposals and grants that wait on real-world facts: …”); the builder's case title “Good for users. Easier on the project.”; its reasons after Augus's notes, “No team to hire. The project pays a fee per question instead of staffing resolution.”, “Never the judge. Anyone who disagrees challenges the answer, not the project.” and “A selling point. Users can check every outcome instead of taking the project’s word for it.”; the per-case lines “Decided in the open, not by the market’s own team / the insurer paying out / the team behind the upgrade.”; and its ask, “Exploring how it could fit a platform, or just curious? Ask the team anything.” — Figma: pending list, “Use cases as a list beside one example” and “Project's case as the section's second half”.
- [ ] Refresh the figures with each quarterly report. — Figma `216:472`, Note / 08 / Roadmap states.
- [ ] Swap in real article art once posts are chosen. — Figma `216:506`, Note / 09 / Cover placeholders.
- [ ] Confirm descriptions and status with the maintainers. — Figma `225:449`, Note / P2 / Products.
- [ ] Spelling: “Stratoblast” in the menu, “Statoblast” in the code. — Figma `225:449`, Note / P2 / Products.
- [ ] Needs full rewrite. — Figma `225:490`, Note / P3 / Learn.
- [ ] The guides still need writing. Old Learn articles should be rewritten, not copied. — Figma `225:490`, Note / P3 / Learn.
- [x] Needs full rewrite. Rewritten with optional participation, versions and watch points; maintainer review remains below. — Figma `225:519`, Note / P4 / REP.
- [ ] Add verified contract addresses and explorer links. — Figma `225:519`, Note / P4 / REP.
- [ ] No buying, selling or migration instructions here. Review the wording with the maintainers. — Figma `225:519`, Note / P4 / REP.
- [ ] Posts shown are stand-ins. The real archive (16 posts since April 2025) moves over with original dates. — Figma `225:556`, Note / P5 / Blog.
- [ ] Placeholder article. Real posts move over with their original dates. — Figma `257:1299`, Note / P5.1 / Blog article.
- [ ] Decide the byline (team or named authors) and whether to show reading time. — Figma `257:1299`, Note / P5.1 / Blog article.
- [ ] Placeholder guide copy. The four guides still need writing. — Figma `261:1583`, Note / P3.1 / Learn guide.
- [x] Decide whether More guides (For builders, Research) use this template without the series progress. They share the template without progress. — Figma `261:1583`, Note / P3.1 / Learn guide.

## Additional release gates

- [x] Complete the owner-authorized 170-file cleanup and verify it: isolated frozen installation of 417 packages, 95-file check with zero diagnostics, 26-page build with zero warnings, and 1,949 resolved anchor destinations. Evidence: `docs/evidence/cleanup-completed.json` and `artifacts/qa/*-cleanup.*` / `*-clean-install.log`. Figma was not changed.
- [ ] Resolve or explicitly revise the strict “no long tasks over 50 ms” performance requirement. Final Lighthouse scores, LCP and CLS pass; measured long tasks still reach 209 ms on simulated mobile and 74 ms on the desktop homepage.
- [ ] Verify an actual back/forward-cache restoration in a browser environment that permits it. This Chromium session reported `BackForwardCacheDisabledForDelegate` and `BrowsingInstanceNotSwapped`; synthetic persisted events and normal back navigation passed, but real cached restoration remains unverified.
- [ ] Review every content entry marked `placeholder: true` or `needsReview: true`, including additional FAQ answers.
- [ ] Replace all four homepage stand-in posts and article bodies; migrate the 16 original archive posts with their original dates. Preserve source provenance.
- [ ] Confirm the roadmap attribution: the Q2 report distinguishes 6,399,867.64 migrated REPv2 (58.2%) from REPv2_Yes_1 total supply. The August report uses total supply as migration. Approved Figma wording is retained pending editorial review.
- [ ] Confirm the intended Zoltar paper destination. The reachable successor is the current system overview; do not label it a PDF or historical whitepaper.
- [ ] Confirm REP contract addresses and explorer links with maintainers. No contract address is published by this build.
- [ ] Confirm the byline “By the Augur team”; review the provisional reading times (Figma article five minutes, guide 2 six minutes, other stand-in articles one–two minutes).
- [ ] Set an announcement retirement date or explicitly retain the bar after reviewing the latest report.
- [ ] Choose and configure the newsletter provider, consent wording and privacy text; until then use Blog, X and Discord follow links.
- [ ] Confirm contact@augur.net with the domain owner. Composing an email is not delivery.
- [ ] Review the complete responsive, keyboard, no-JavaScript, reduced-motion, forced-colors, visual and performance evidence in `docs/decisions.md`.
- [ ] Resolve every unverified destination in `src/data/links.ts`.
- [ ] Approve the Brand assets page copy and confirm the logo files and REP token icon may be redistributed publicly, with any usage terms (`src/data/brand.ts` review flag).
- [ ] Set `PUBLIC_SITE_INDEXABLE=true` only after all release gates pass; verify robots, sitemap, canonical URLs and SEO again.

- [ ] Preserve legacy source-report URLs when migrating the original archive. Absolute www.augur.net report links are reachable on the existing public site but must resolve on the replacement before deployment.

## Resolved implementation choices

- [x] Use “Augur Stratoblast” to match the canonical design; retain the spelling discrepancy above for owner confirmation.
- [x] Keep “Trustless” in canonical homepage copy, with the terminology decision still requiring maintainer review.
- [x] The homepage FAQ starts with its first answer open; this supersedes the older Section-details note.
- [x] Treat More guides as the reading template without Start-here progress; review flags remain until their content is approved.
- [x] Verify required public URLs with HTTP GET on 5 October 2026; evidence is in `docs/link-verification.json`.
