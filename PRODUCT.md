# Product

<!-- impeccable:product-schema 1 -->

Derived from the repository's user-approved documents (AGENTS.md, docs/website-strategy.md,
docs/why-how.md, docs/source-material.md, docs/design-system.md) on 2026-09-20, at the user's
explicit direction to make design decisions independently and ask only when product truth,
brand authority, or scope is materially unclear. No interview round was run; the cited
documents are the user's confirmed answers.

## Platform

web

## Users

- Curious newcomers who have never heard of Augur or oracles: must be able to say what Augur is, why the problem matters, and what to do next.
- CEO / decision-makers and CTO / builders evaluating whether their application could rely on Augur's resolution.
- Existing Augur community: OG members and REP holders following the next generation's progress.

## Product Purpose

Augur is decentralized oracle infrastructure for establishing truth onchain. The website's
job is to make the resolution mechanism legible to people deciding whether to trust it, and
to route each audience to a useful next step (read the whitepaper, follow development,
talk to the team).

## Positioning

Augur Lituus — the next generation of Augur's oracle — resolves any multiple-choice question
with no committee, multisig or veto: anyone may report, anyone may challenge with a larger
bond, and the design (January 2026 whitepaper) aims to make forcing a false answer cost more
than the oracle's entire market cap. Resolution as open, shared infrastructure rather than a
per-application dispute process.

## Operating Context

- Product is in R&D: ChainSafe implements Augur Lituus in the public Lituus-CS repository; the Lituus Foundation funds and coordinates. Testing, audits and documentation are pending; no launch date announced.
- Augur v2 (2018, Ethereum) still runs; its fork mechanism completed its first live run ("Moon Fork", August 3, 2026).
- Augur Stratoblast (prediction markets on Zoltar) is being built by Dark Florist.
- REP secures the oracle through bonds; Augur Lituus is built around REPv2_Yes_1.
- The site is Astro + Bun, static by default; design-system foundations are pinned from `@augur/design-system` at commit fb35470 and must never be hand-edited.

## Capabilities and Constraints

- Truth claims must distinguish: proposed design / implementation in progress / illustrative application / deployed capability / measured result. No invented integrations, usage statistics, customers, testimonials, launch dates, security guarantees, or availability.
- Examples with hypothetical outcomes are labeled illustrative.
- Only `/` and `/contact/` are built website routes; navigation destinations beyond those are honest inert placeholders. `/contact/` composes email locally; no delivery is claimed.
- Mobile design and QA are deferred; desktop light + dark themes are the review surfaces.

## Brand Commitments

- Brand Foundation PDF (v1.0, 7 September 2026) is the brand source of truth: Navy `#0e0e21`, Paper `#f5f5f8`, Augur Green `#2ae7a8` (a fill carrying Navy labels, never an ink on Paper), Deep `#095e42` for meaningful light-mode green accents, Crimson `#cf294e` reserved for errors.
- Square corners everywhere; surfaces separated by hairlines, tonal steps and space; no shadows except inset pressed edges.
- Sora for headings/interface, Schibsted Grotesk for reading text; 400/600 weights only.
- Official logo geometry, clearspace and minimum width (150px) are preserved; website naming is "Augur Lituus" in full, "the next generation of Augur's oracle" on first mention.
- Website direction (user-approved): bright Green action fills in both themes; ↗ reserved for external destinations; one accent job per view.

## Evidence on Hand

- January 2026 Augur Lituus whitepaper (public GitHub PDF) and its January 29, 2026 announcement post.
- Live blog posts: "Augur Is Testing Its Past and Building Its Future" (July 21, 2026), Moon Fork report (August 5, 2026), Q1 2026 report (July 2, 2026).
- Website Strategy PDF (September 2026): audiences, IA, Figure F5 application examples.
- Worked resolution example (room-temperature superconductivity query) with sourced criteria and the whitepaper's 15/30/60/120 REP doubling example.
- Official logo SVGs, Phosphor icon set (pinned revision), Fontsource-pinned fonts.
- Absences future work must not fabricate: customers, usage metrics, security audits, deployment dates, live protocol instances.

## Product Principles

1. Show the mechanism, don't just claim it: resolution, bonds and forks explained concretely.
2. Every claim carries its qualifier: development stage and illustrative status stay beside the claim.
3. One page serves three reading depths: scan, short read, deep dive via disclosures and sources.
4. Seriousness with personality: credible technical content expressed with visual richness and confidence.
5. Static-first, honest interface: no fake functionality; placeholders for deferred work are themselves well designed.
