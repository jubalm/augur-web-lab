# Editing content

Repeated content has one source in `src/data`: navigation, links, FAQ, roadmap, glossary, applications and walkthrough. Homepage prose follows the canonical Figma `28:7` copy; update the approved deck and its rendering together. Do not casually edit copy embedded in extracted source snapshots.

Blog entries live in `src/content/blog/*.md`; Learn entries live in `src/content/learn/*.md`. Their schemas are in `src/content.config.ts`. Use original publication dates, source references, stable slugs, a title/description, the supported category and cover motif, and honest `placeholder` / `needsReview` flags. A replacement post needs real approved content and art before clearing its placeholder flag. Blog category filters are static URLs and pages hold six entries.

Guides in the Start here series carry an order and previous/next navigation. Glossary definitions come from `src/data/glossary.ts`; do not duplicate them in Markdown. Other guides use the same reading treatment without series progress. Guide 2 is assembled from approved homepage mechanism copy; every other guide stays flagged until written and reviewed.

FAQ homepage entries and the grouped full FAQ share `src/data/faq.ts`. Preserve `needsReview` for questions 4–5 and any answer assembled from other approved text. Update roadmap numbers only from dated primary sources, maintaining the distinction between REP migration and token supply. Confirm the roadmap with maintainers each quarter.

Add external URLs only to `src/data/links.ts` as `{url, verified, source}`. Verify reachability and cite its origin; inbox verification requires the domain owner. `docs/link-verification.json` records the rebuild's request evidence. Verify new internal links with the built-site link checker, including fragment IDs. No `href="#"` placeholders.

After edits, run check/build, copy/link checks and relevant browser tests. Run `check:launch` to list remaining editorial and operational gates; it is expected to fail while any blocker remains.

The independent canonical homepage reference is `src/data/homepage-copy-source.json`, extracted read-only from Figma 28:7 with text-node IDs. Its typed export is `homepage-copy.ts`. `bun run check:copy` compares all 165 visible text passages in the eleven default desktop sections, checks occurrence counts and rejects extra text. It normalizes whitespace, curly quotes and decorative external arrows; the only prose substitution is the explicitly approved newsletter fallback. Hidden interactive states have separate browser/source comparisons. `bun test tests/copy-check.test.ts` verifies that changed claims, missing labels and extra prose are rejected.

Blog archive and category routes share `blogPageSize`; sitemap generation derives every archive page from the same categories and post counts, so adding a seventh or thirteenth post includes the additional static pages automatically.
