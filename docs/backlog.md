# Backlog

Ideas the owner wants kept in mind but has not scheduled. Each needs its copy settled with the owner before layout, and its facts sourced as `AGENTS.md` requires. Move an item into `decisions.md` when work starts.

## A dedicated Augur Lituus page

Raised by the owner on 6 October 2026: “a single page just for Augur Lituus”, explaining it in depth.

- **Scope to cover:** what Augur Lituus is; how it works (any app asks a multiple-choice question, anyone reports, anyone challenges with a larger bond, a fork as the last resort); security (forcing a false answer is designed to cost more than the oracle's entire market cap); decentralization (no party controls the answer); REP's role, without implying holders must report or challenge.
- **Sources:** the January 2026 Augur Lituus whitepaper for every mechanism fact; `src/data/products.ts` and the homepage copy for wording that already exists (one source per repeated fact).
- **Wiring once it exists:** point the header Products action (“Explore Augur Lituus →”, `src/data/navigation.ts`) and the `/products/` Augur Lituus section at the new page, add it to the footer and mobile menu, and give it a Site pages frame in Figma.
- **Open questions:** its route (for example `/augur-lituus/`), whether it absorbs or links the Learn guides on disputes and forks, and which tenet diagrams or walkthrough states it reuses.
