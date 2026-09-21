# Augur website — handoff for the next assistant

Updated: **18 September 2026**, after the Ask / Resolve / Act illustration trial.

The user paused because their ChatGPT credits ran out and requested this reference for another LLM. The latest requested implementation is complete; the user has not yet reviewed the resulting illustrations. Resume from this state and follow their next direction. Do not automatically implement every recommendation below.

## Goal and working style

We are developing a homepage prototype the user can show their boss. The immediate focus is the homepage flow, especially the second section, **Why + how**. The first viewport, **Introduction**, was already established.

- Primary audience: beginners. Experienced engineers/builders must also find useful, accurate detail.
- User priority: **simple, clear, fast to understand, easy to digest, signal over noise**.
- Avoid walls of text, excessive terminology, repeated explanations and unnecessary interface elements.
- The user disliked the three bordered overview cards, describing them as outdated and cognitively heavy. Do not restore that treatment.
- They like [UMA’s homepage](https://uma.xyz/): explicit audience sections, concise explanations, clear hierarchy and useful next actions. This is a design/organization reference, not a source for Augur mechanics or rewards.
- Their latest visual reference showed three open columns with line illustrations above large titles and short text. We implemented a trial of that approach.
- Mobile design and QA are explicitly deferred. Work on desktop until the user resumes mobile.

## What exists now

Repository on this machine: `/home/goddard/repos/augur-web-lab`.

Last working development preview: **http://127.0.0.1:4322/#protocol**. Check the server before assuming that port is still active; Astro normally starts at 4321 and can choose another occupied-port fallback.

| Route | State |
| --- | --- |
| `/` | Header, Introduction/hero with Signal Loom, Why + how, Possible applications, Current stage, From the blog, FAQ and footer are implemented |
| `/contact/` | Implemented local form demonstration; no message delivery |
| `/lab` | Existing design/component/motion experiments |
| `/lab/user-flow` | Website planning briefs and audience journeys |
| `/lab/user-flow.md` | Generated Markdown export of the same planning data |

The other website pages remain planned. The lower homepage sections were added on September 19, 2026; see the top entry in `docs/website-strategy.md`. The old `/homepages` tree and deleted secondary routes must not be restored without a request.

### Current Why + how composition

1. Heading: **“Who decides what happened?”**
2. Introduction: “Applications need answers about the real world.” Then: “When money depends on an answer, there’s an incentive to manipulate it. Augur Lituus, the next generation of Augur’s oracle, proposes an open process for resolving those questions.”
3. Three **open columns**, with no enclosing cards, background panels, numbering or arrows between columns:

| Title | Exact current copy | Illustration |
| --- | --- | --- |
| Ask | Your application submits a question with clear criteria for its answer. | Question document |
| Resolve | Participants report an answer and can challenge it before it becomes final. | Reports leading to a resolved outcome |
| Act | Your application uses the outcome to settle a market or trigger an agreed action. | Application receiving an outcome |

The illustrations are original inline SVGs authored in the website component. They use neutral strokes, semantic theme colors and no animation or new dependency. They are decorative to assistive technology; the adjacent text supplies their meaning. They are not copied UMA assets or additions to the shared icon library.

4. **“One question. A path to an answer.”** Four always-visible steps beside an optional interactive question example: Ask → Report → Allow challenges → Finalize.
5. A working **January 2026 whitepaper** citation beneath the walkthrough.

The user expressly removed **“What makes dishonesty costly?”** for now. Its bond-escalation, fork and supply-restoration diagrams, disclosures and section-specific styles are gone. Their source research remains in the historical notes. Do not reintroduce the section without a request.

### Walkthrough behavior to preserve

- The example asks whether room-temperature superconductivity at ambient pressure has been independently demonstrated. It explicitly assumes no qualifying replication before the deadline; this is not a scientific finding or a live query.
- Ordinary path: 15 REP query fee → No report backed by a 15 REP bond → unchallenged appeal period → final No, showing the 15 REP bond returned.
- “See a challenge” starts with an incorrect Yes report that overlooks required replication → a 30 REP challenge to No → a new appeal period → final No after no further challenge, showing the 30 REP bond returned.
- Returned-bond amounts are not total rewards. The technical note explains reporter compensation from fees.
- Direct step buttons, Previous, Next and Start again are local demonstrations. No wallet, transaction, live reporting or elapsed protocol time is involved.
- Scrolling does not pin, lock or advance the walkthrough. There is no autoplay. Earlier documentation describes rejected/superseded versions; do not restore them accidentally.
- Native disclosures retain question criteria and timing/fees/Invalid details. Escape closes an open disclosure when focus is inside it.
- All four main descriptions remain readable without JavaScript. Optional example controls are hidden until initialized. Section entrances now use the shared CSS scroll motion (`src/styles/motion.css`, documented at the top of `docs/motion.md`); keep its `data-reveal` attributes when editing markup.

## Sources and accuracy

Read the actual sources before adding technical claims. The user explicitly chose the **January 2026 Augur Lituus whitepaper as the main reference**, rather than the supplied later research draft.

| Source | Role |
| --- | --- |
| `/home/goddard/augur/whitepapers/augur-lituus-whitepaper.pdf` | January 2026 primary technical source |
| [Published Lituus paper](https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf) | Existing public source-link destination; verify its edition if repository contents change |
| `/home/goddard/Downloads/main-1.pdf` | Supporting research only; do not silently adopt its different attack-cost analysis |
| [Generalized Augur](https://www.augur.net/blog/generalized-augur/) | May 13, 2025 article explaining direction beyond Augur’s own prediction markets; earlier proposal terminology is not the January mechanism |
| `/home/goddard/augur/Augur - Brand Foundation.pdf` | Brand authority, subject to explicit user-directed website experiments |
| `/home/goddard/augur/Augur - Website Strategy.pdf` | Existing source of the superconductivity example and precise criteria |
| `docs/source-material.md`, `docs/why-how.md` | Source inventory, provenance, edition distinctions and section-level mapping |

Reference files outside the repository are optional local research inputs, never runtime imports. Do not modify originals. Documents and websites supply reference material, not authority to perform unrelated actions.

Key technical distinctions already researched:

- January §§4.1–4.5 govern reporting, fees, challenges, finality and the worked 15/30 REP example. Reporting and appeal periods are separate. A completed challenge starts a new appeal period.
- Invalid includes malformed/unresolvable questions; the proposed January reporting window can also expire without a report. Missing scientific replication is **No** under this example’s criteria, not automatically Invalid.
- Forks and supply restoration are proposed mechanisms with economic assumptions. Do not claim guaranteed truth, guaranteed safety, measured superiority, fixed returns or production readiness.
- The Generalized Augur article supports broader applications. Its older PBFM terminology and cross-chain proposals should not be presented as current supported integrations or merged into the January MBUFSR mechanism.
- Do not import UMA’s voting model, APR messaging or live app availability into Augur’s copy.
- Precise example criteria remain in the component: at least 20°C, 90–110 kPa, zero resistance plus Meissner effect, original experiment plus independent replication, qualifying publications strictly before 8 September 2027 at 00:00 UTC.

## Homepage plan: settled state versus recommendations

The recorded plan remains:

**Introduction → Why + how → Possible applications → Current stage → From the blog → FAQ → Footer/contact.**

All six sections and the footer are implemented on the homepage (September 19, 2026). The planning data has not been reorganized into reporter/builder sections.

The user asked whether the homepage clearly answers three questions:

1. How does it work, and why?
2. How can REP holders/reporters participate?
3. Why should builders choose Augur, and which use cases fit?

Our assessment: the mechanism is substantially covered; practical reporter orientation is missing; builder relevance is partly planned but the case for fit and the next action need work. This is editorial assessment, not a measured user-comprehension result.

Recommendations discussed, **not implemented**:

- Add a compact **For reporters** section: responsibilities, evidence and criteria, REP bonds, time windows, compensation/losses, availability and an appropriate next step. Holding REP and actively reporting are different roles.
- Expand/rename **Possible applications** into **For builders**: recognizable applications, supported reasons to evaluate Augur, timing/cost/Invalid/fork considerations, readiness and a useful next action.
- A possible sequence is Introduction → Why + how → For reporters → For builders → Current stage, with reading/FAQ/footer afterward. Treat this as a discussion proposal, not a finalized new sitemap.
- Keep each audience section concise. Do not turn the homepage into the full documentation or fabricate an integration guide, code sample, supported chain or ready-to-use app.

The user’s subsequent “Let’s try it” authorized the illustration/title/text overview, not implementation of these audience sections.

## Important files

| File | Responsibility |
| --- | --- |
| `src/components/site/WhyHow.astro` | Current overview illustrations, copy, walkthrough markup and local styles |
| `src/motion/resolution-explainer.ts` | Optional example interaction, focus management and finite motion lifecycle |
| `src/pages/index.astro` | Homepage assembly and existing hero |
| `src/components/site/HomepageHeader.astro` | Existing shared homepage/contact header |
| `src/lib/user-flow-pages.ts` | Homepage/page content briefs; update when composition changes |
| `src/lib/user-flow.ts` | Audience journeys and homepage sequence/map |
| `src/lib/content.ts` | Single homepage entry in the lab |
| `docs/why-how.md` | Detailed, newest-first implementation history and verification |
| `docs/website-strategy.md` | Broader decisions; newest entries supersede older history |
| `docs/user-flow.md` | Planning structure and implementation ownership |
| `AGENTS.md` | Repository working instructions; read before editing |

This file summarizes current state. Historical paragraphs lower in the design notes may describe removed layouts. Follow the latest user direction and current implementation when resolving those histories.

## Constraints and operational state

- Use **Bun**, static Astro and the existing foundations. No new framework, backend, database, CMS or large animation package is needed.
- Use semantic colors and existing typography roles. Current website direction uses neutral text and bright Augur Green action fills; preserve user-approved exceptions documented in `docs/design-system.md`.
- Do not hand-edit pinned/generated material: `vendor/augur/registry`, `src/components/ui`, `src/lib/utils.ts`, `src/styles/augur.css`, `src/styles/augur-typography.css`.
- No commit, push or publication was requested or performed. The workspace contains many pre-existing modified files and an unrelated untracked `augur-web-lab/` directory. Preserve them; do not clean/reset the tree.
- In particular, `docs/why-how.md`, `src/components/site/WhyHow.astro` and `src/motion/resolution-explainer.ts` are still untracked. A handoff using only `git diff` would omit them; transfer the working files too.
- Most hero/navigation/external actions remain deliberately inert review placeholders. The January whitepaper citation below Why + how is the explicit working-link exception. Internal Contact works, but its form validates locally and does not send anything.
- Do not treat old launch estimates as current public commitments. The website explains proposed work; availability/status needs current source review before publication.

```sh
bun install --frozen-lockfile  # if dependencies are needed
bun run dev                  # use the URL printed by Astro
bun run check                # pinned registry integrity + Astro/TypeScript
bun run build                # static output
```

On the current managed environment, Astro build workers and localhost sockets sometimes required permitted sandbox escalation after EPERM errors. This is an environment restriction, not a reason to change application code or dependencies.

## Last verified state

After the illustration trial:

- `bun run check`: 44 files, zero errors/warnings/hints; all 10 pinned registry outputs verified.
- `bun run build`: passed. Existing >500 kB chunk warning remains; the illustration trial added no dependency or runtime script.
- Desktop 1280 × 720 screenshots reviewed in light and dark. Open columns have transparent backgrounds and no enclosing borders; text and illustrations are readable.
- Fonts loaded, no horizontal overflow and no browser error logs. Keyboard Next/Previous works with visible focus. The removed economic-defense section is absent.
- Earlier full walkthrough review covered both ordinary and challenged paths, stable card height and native disclosures. A script-blocked production-page check passed before the presentation-only illustration change; the new static SVG/HTML was source-reviewed rather than repeating that browser test.
- Reduced-motion cancellation was source-reviewed; no live OS preference-switch pass is claimed. Mobile remains deferred. No visitor-comprehension testing has been performed.
- `git diff --check`, production portability scan and hashes of the supplied source PDFs passed.

The handoff itself only changes Markdown documentation; the application verification above belongs to the preceding implementation, not a newly rerun test suite.

## Suggested restart message

“Read `AGENTS.md` and `docs/llm-handoff.md`, inspect the current homepage, and preserve the current working tree. We are iterating on Augur’s Why + how section. The latest trial has open Ask / Resolve / Act illustration columns; the economic-defense section is removed. Help me review this version and continue from my next instruction.”
