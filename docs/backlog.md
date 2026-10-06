# Backlog

Ideas the owner wants kept in mind but has not scheduled. Each needs its copy settled with the owner before layout, and its facts sourced as `AGENTS.md` requires. Move an item into `decisions.md` when work starts.

## A dedicated Augur Lituus page

Raised by the owner on 6 October 2026: “a single page just for Augur Lituus”, explaining it in depth.

- **Scope to cover:** what Augur Lituus is; how it works (any app asks a multiple-choice question, anyone reports, anyone challenges with a larger bond, a fork as the last resort); security (forcing a false answer is designed to cost more than the oracle's entire market cap); decentralization (no party controls the answer); REP's role, without implying holders must report or challenge.
- **Sources:** the January 2026 Augur Lituus whitepaper for every mechanism fact; `src/data/products.ts` and the homepage copy for wording that already exists (one source per repeated fact).
- **Wiring once it exists:** point the header Products action (“Explore Augur Lituus →”, `src/data/navigation.ts`) and the `/products/` Augur Lituus section at the new page, add it to the footer and mobile menu, and give it a Site pages frame in Figma.
- **Open questions:** its route (for example `/augur-lituus/`), whether it absorbs or links the Learn guides on disputes and forks, and which tenet diagrams or walkthrough states it reuses.

## A new hero animation

Parked by the owner on 6 October 2026 (“I'll think about this hero later”). The hero that ships meanwhile is the 12 s squares story from the same day (`hero-choreography.ts`, `hero-ambient.ts`, Figma `382:848`), which the owner reviewed and called “extremely weird”. The review flag on the Figma hero note stays until a direction is chosen.

- **What the owner wants:** professional, elegant, clean and above all beautiful; alive but organized; not brutalist; not slow and not static; no drastic changes (crossfades, nothing all at once); no glow anywhere ([`docs/decisions.md`](decisions.md), 6 October). The heritage squares, the headline rise, the “decentralized” underline sweep and the scroll cue stay whatever is chosen.
- **What is wrong with the current one (review, 6 October):** 121 squares of 3 to 8 px form a cloud with no figure, and its story (ask, report, agree) happens in 1 to 2 px scale changes nobody can see; the pointer lens scatters the composition; the tap ripple turns the whole field Green; three ambient layers compete.
- **Directions explored, animated in the real copy and palette:** https://claude.ai/artifact/DF1Ei21RohGUnaMGEivDRC (private; the owner's account). 1. *Glyph*: the official glyph vector sampled into cubes in perspective, turning slowly, a Green tide climbing from the feet to the apex, tilting toward the pointer (180 or 346 cubes). 2. *Quorum*: rings of graded squares round an empty centre, a breath, a drift and a Green tide that gathers on the inner ring (60 or 88 squares); the owner called the first lattice version “genius” after it was revised from twelve heavy seats. 3. *Converge*: twenty squares gather into a frame round the empty centre. 4. *Tide*: no right-hand art; the heritage field is the stage and a band of light sweeps it. All loop on the shared 12 s cycle with transform and opacity only.
- **Brand check for Glyph:** the Brand Foundation says “Do not recreate a logo”, “Do not add effects”, “Do not build your own” and “Do not use a busy field”. A halftone or cube rendition of the glyph in the hero needs an explicit owner exception recorded in the foundation and in `DESIGN.md` before it is built.
- **When work starts:** precompute the chosen geometry into `src/data/` at build time (no runtime canvas), generate the loop from `choreography.ts` tracks, write the same keys and state frames into Figma Section details `382:848`, measure main-thread cost against the motion budget (`docs/motion.md`), and move this item into `decisions.md`.
