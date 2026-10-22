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
- [ ] Approve the Learn more section (draft, 19 October 2026; blog and FAQ in one section, trimmed the same day): the heading “Learn more about Augur.”, three questions (today's Augur, REP's role, unanswerable questions), the two latest posts without type or date, and the Outline “View all questions” and “View all posts” buttons. — Figma `215:625` and `215:649`, Notes 09 and 10.
- [ ] The newsletter needs a provider, consent and privacy text before it can collect emails. — Figma `215:673`, Note / 11 / Footer.
- [ ] contact@augur.net needs the domain owner’s confirmation. — Figma `215:673`, Note / 11 / Footer.
- [ ] Approve the How it works copy (draft, 19 October 2026, `walkthroughReview` in `src/data/walkthrough.ts`): title “Know what happened? / Get paid to report it.” and lead; the four step titles and descriptions; the REP panels' labels (“Reward offered”, “If you report”, “If you challenge”, “Your payout”), payoff figures (“Up to 15 REP”, “+17%”, “+40%”, “42 REP”) and the words after them (“plus any tips”, “on your bond”, “plus the reward”), the meter's scale and caption, risk lines and “The other 3 REP of the losing bond is burned.”; the example question in its five fields (illustrative terms written for the example, including the 20 °C / 293 K threshold): the title, the “Information cutoff 8 Sep 2027, 00:00 UTC” line, the description (one sentence per outcome: “YES means …”, “NO means …”, “Invalid means …”), the three numbered resolution criteria, and “Cutoff in Unix time 1820361600”; the status chips, the outcome labels, each tile's amount (including “0 REP”) and the “staked” total, Activity entries and their amount words (“fee”, “bond”); the holder note (“Optional. You never have to report or challenge.” / “In a fork, act. Move your REP to the universe you believe reflects reality, or it loses its value.”). Confirm with the maintainers: the payout figures (the whitepaper §4.5 example, 2.5 REP on a 15 REP bond, so +17% for an unchallenged report; 80% of the losing bond, so +40% on a first challenge), the fork wording (“holders need to move their REP … REP that isn’t moved loses its value”, from §4.2.2), Reporter Pay going to the first reporter of the outcome that becomes final, and whether the card may run without an “Example” label (removed at the owner's request). — Figma `305:1618`, Note / 07, and the How it works note.
- [x] First pass, added 2 October 2026. Spacing and motion still to polish. Superseded 19 October 2026: the REP section is folded into How it works. — Figma `305:1618`, Note / 07 / What can you do with REP?.
- [x] Every destination is a placeholder until its page exists. All new page destinations now resolve; public destinations are registered and HTTP-verified. — Figma `216:340`, Note / 02 / Header dropdowns.
- [ ] Approve the Products menu action label, “Explore Augur Lituus →” (added 6 October 2026). — Figma `216:340`, Note / 02 / Header dropdowns.
- [x] These frames show the hero without the announcement bar. Canonical homepage adds the bar as required. — Figma `216:371`, Note / 03 / Hero motion.
- [ ] The fallback note is a proposed design; confirm chain and L2 support, and the fallback use, with the maintainers. — Figma `216:405`, Note / 05 / Picker states.
- [x] Approve the use-case label, now “Answer” (added 18 October 2026 as “Augur Lituus answers”, approved by the owner on 19 October 2026, and shortened that day so the heading carries the name). The market query labels added 6 October 2026 (“Asked”, “Reported Yes”, “Not challenged”, “Final”) left the homepage with the query card on 18 October 2026. — Figma `216:405`, Note / 05 / Picker states.
- [ ] Approve the case-picture labels (added 19 October 2026, cut back the same day): “Yes”, “No”, “Due”, “+2 hours”, “Landed” (added in the motion polish pass), “Paid”, “No policy”, “This review”, “A later review”, “Proposal”, “Review” and “Live”. The pictures are illustrative: no prices, seats, counts or dates are real. — Figma: pending list, “Use cases as a list beside one example”.
- [ ] Approve the use-case copy added 19 October 2026: every answer Yes or No (Invalid not shown); the governance question “Did the upgrade pass its safety review?” with answer No and “The proposal goes live once a later review passes.”; the three case summaries (“Markets on any question with a result people can check: …”, “Coverage and payments that trigger when something measurable happens: …”, “Proposals and grants that wait on real-world facts: …”); the builder's case title “Good for users. Easier on the project.”; its reasons after Augus's notes, “No team to hire. The project pays a fee per question instead of staffing resolution.”, “Never the judge. Anyone who disagrees challenges the answer, not the project.” and “A selling point. Users can check every outcome instead of taking the project’s word for it.”; the per-case lines “Decided in the open, not by the market’s own team / the insurer paying out / the team behind the upgrade.”; and its ask, “Exploring how it could fit a platform, or just curious? Ask the team anything.” — Figma: pending list, “Use cases as a list beside one example” and “Project's case as the section's second half”.
- [ ] Refresh the figures with each quarterly report. — Figma `216:472`, Note / 08 / Roadmap states.
- [ ] Swap in real article art once posts are chosen. — Figma `216:506`, Note / 09 / Cover placeholders.
- [ ] Confirm descriptions and status with the maintainers. — Figma `225:449`, Note / P2 / Products.
- [ ] Spelling: “Stratoblast” in the menu, “Statoblast” in the code. — Figma `225:449`, Note / P2 / Products.
- [ ] Needs full rewrite. — Figma `225:490`, Note / P3 / Learn.
- [ ] The guides still need writing. Old Learn articles should be rewritten, not copied. — Figma `225:490`, Note / P3 / Learn.
- [x] Needs full rewrite. Rewritten with optional participation, versions and watch points; maintainer review remains below. — Figma `225:519`, Note / P4 / REP.
- [ ] Add verified contract addresses and explorer links. Since 19 October 2026 the token card shows the REPv2_Yes_1 contract from the Lituus Foundation's reference on augur.net/rep, with its Etherscan link (`currentRep` in `src/data/rep.ts`); REPv1, REPv2 and REPv2_No_1 show no address because no official source lists one. Maintainers confirm the address before launch. — Figma `225:519`, Note / P4 / REP.
- [ ] No buying, selling or migration instructions here. Review the wording with the maintainers. The rebuilt page has none; it says the Moon Fork window has closed, and one FAQ answer says a wallet can add the token by its address (from the augur.net FAQ). — Figma `225:519`, Note / P4 / REP.
- [ ] Approve the REP page copy rebuilt 19 October 2026 (`repPageReview` in `src/data/rep.ts`): the title “REP makes lying expensive.” and lead; the token card; “Lying gets more expensive every round” with its three stages and payout line; “Taking part is optional” with the Hold / Report / Challenge comparison (the 2.5 and 12 REP gains are the whitepaper's §4.5 example); “If a fork happens” with the four proposed Augur Lituus steps and the Moon Fork card (Artemis II, 8 April to 3 August 2026, 60-day window, from the augur.net FAQ); “Which REP do you hold?” with the four versions, their statuses and holder lines; the “Migration is closed” scam notice, including “Augur and the Lituus Foundation won’t DM you first”; and the four new REP FAQ answers (`rep-holding`, `rep-augur-ticker`, `rep-wallet`, `rep-missed-migration`). Confirm with the maintainers that the page may keep the contract-reference role of augur.net/rep (exchanges and price trackers were pointed there). — Figma: pending list, “REP page rebuilt”.
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
- [ ] Confirm REP contract addresses and explorer links with maintainers. Since 19 October 2026 the REP page and one FAQ answer publish the REPv2_Yes_1 address, copied from the Lituus Foundation's contract reference and checked on Etherscan; no other address is published.
- [ ] Confirm the byline “By the Augur team”; review the provisional reading times (Figma article five minutes, guide 2 six minutes, other stand-in articles one–two minutes).
- [ ] Set an announcement retirement date or explicitly retain the bar after reviewing the latest report.
- [ ] Choose and configure the newsletter provider, consent wording and privacy text; until then use Blog, X and Discord follow links.
- [ ] Confirm contact@augur.net with the domain owner. Composing an email is not delivery.
- [ ] Adopt the pause control sitewide (WCAG 2.2.2 Pause, Stop, Hide, Level A; without it the site fails Level A). Every loop that starts by itself and runs past 5 s needs a control on the page: on `/`, the hero ambience, the three tenet diagrams, the REP rows, the scroll cue, the query card's status dot and the roadmap Now pulse; on `/2/`, the hero flock and Why Augur scenes as well; and a hero video, if one comes. `/2/` had a header control on 22 October 2026 and the owner had it removed the same day (`decisions.md`, “Pause control removed, on /2/”), so no page has one today. A launch needs one, or loops that stop by themselves within 5 s.
- [ ] Review the complete responsive, keyboard, no-JavaScript, reduced-motion, forced-colors, visual and performance evidence in `docs/decisions.md`.
- [ ] Resolve every unverified destination in `src/data/links.ts`.
- [ ] Approve the Brand assets page copy and confirm the logo files and REP token icon may be redistributed publicly, with any usage terms (`src/data/brand.ts` review flag).
- [ ] Approve the About page copy, rebuilt on 19 October 2026 (`src/pages/about.astro`, `src/data/history.ts`). Confirm with maintainers that Dark Florist builds Augur Stratoblast on Zoltar: no primary source read so far says so (see `decisions.md`).
- [ ] Set `PUBLIC_SITE_INDEXABLE=true` only after all release gates pass; verify robots, sitemap, canonical URLs and SEO again.

- [ ] Preserve legacy source-report URLs when migrating the original archive. Absolute www.augur.net report links are reachable on the existing public site but must resolve on the replacement before deployment.

## Resolved implementation choices

- [x] Use “Augur Stratoblast” to match the canonical design; retain the spelling discrepancy above for owner confirmation.
- [x] Keep “Trustless” in canonical homepage copy, with the terminology decision still requiring maintainer review.
- [x] The homepage FAQ starts with its first answer open; this supersedes the older Section-details note.
- [x] Treat More guides as the reading template without Start-here progress; review flags remain until their content is approved.
- [x] Verify required public URLs with HTTP GET on 5 October 2026; evidence is in `docs/link-verification.json`.
