# Homepage redesign: a product website for Augur

September 21, 2026. Active direction for `/lab/homepage-redesign/`, following the
user's refinement of the product homepage. Present the product with confidence;
keep readiness explicit in its roadmap. The current `/` and contact route remain
separate. Mobile design and QA are resumed for this proposal.

## Product understanding

Augur is decentralized oracle infrastructure. Augur Lituus applies an open,
economic resolution process to multiple-choice questions: anyone can submit a
question, back an answer with REP, or challenge an outcome. Applications define
the question and act on the final answer. The roadmap distinguishes the published
design, ongoing implementation and work before application use.

Newcomers need a definition and an approachable example. Builders need the
mechanism and source paths. Returning community members need products, recent
articles, REP context and community destinations. These belong in an organized
product homepage without repeating development caveats in every section.

## Active composition

1. **Navigate:** Navy Products / Blog / Resources / Community navigation and Talk
   to us. Native dropdowns lead to real sections, papers, repositories and community
   destinations; products without dedicated pages use the relevant published update.
   Fine-pointer hover opens menus on one moving surface, with a brief grace period
   between triggers and panels. Keyboard, touch and no-script controls remain usable.
2. **Understand Augur:** “The frontier of decentralized truth.” on Navy, followed
   by one short oracle definition, open participation and absence of central
   control. Explore leads to the mechanism; a parallel link opens the whitepaper.
3. **Make a report:** the adjacent flight-delay scene gives the visitor the
   reporter's role. Choose Yes / No / Invalid, then back that answer with an
   illustrative 15 REP. A receipt remains open to challenge and can be reset.
   The caption says “Try it. No wallet or tokens needed.” This is an open
   report, not a resolved outcome or real protocol transaction.
4. **Understand the principles:** a concise three-column band explains open
   participation, decentralized resolution and protocol rules with economic stakes.
5. **Follow the process:** “Builders ask. REP holders resolve.” makes each role
   visible across four native stages. Builders define a query, its criteria and a
   REP fee; REP holders report Yes / No / Invalid with an illustrative 15 REP bond;
   anyone may challenge; the application uses the final answer under its own payout
   rules. Navy copy pairs with a Paper query view. No challenge is the default:
   the reported answer becomes final when the appeal period closes. An optional
   checkbox shows a different tentative answer backed by 30 REP and a new appeal
   period, which must close without another completed challenge before finality.
   The roles are open activities, and a larger bond does not prove correctness.
   Scrolling advances the sticky illustration on desktops where the full panel
   fits; native step controls remain available. The example links to the paper.
6. **See the relevance:** prediction-market, insurance/payment and DAO/grant
   selections pair a question with a distinct illustrated application output.
   Application conditions remain separate from oracle resolution.
7. **Establish readiness:** the quarterly roadmap comes before the blog, grouped
   as Completed / Building now / Up next. Muted, checked and struck-through
   completed milestones retain source details in native disclosures: foundation
   reset, oracle proposal publication, whitepaper and the Augur v2 Moon Fork.
   A prominent Navy Q3 2026 panel emphasizes ChainSafe implementation and Foundation
   review. Testing/audits and the Augur Lituus launch sit below on dashed tracks;
   future dates remain to be announced. Launch includes documentation and
   application use.
8. **Read the work:** three actual Augur article thumbnails, titles and dates
   organize the August 5, July 21 and July 2, 2026 posts. The older migration
   article is framed as a historical record, not current migration guidance.
9. **Resolve doubts and continue:** five compact native FAQ disclosures answer
   the remaining questions, with one open at a time. A Navy contact invitation
   and Explore / Resources / Community directory close the page.

The long research walkthrough, dedicated bond explorer and separate research
section are superseded. Their remaining files do not define this surface.

## Visual and interaction direction

Mode: Persuade. This is an extension of the Brand Foundation and pinned component
system, not a new global design system. Paper/light surfaces alternate with Navy
masthead, hero, mechanism and footer. There is no theme control. Sora carries
headings and controls; Schibsted carries explanations and metadata. Square
geometry, quiet rules and whitespace organize content. Green fills mark actions
and selections; scoped Green-on-Navy emphasis highlights “decentralized.” Deep
remains the meaningful-mark role on light grounds. Supplied logo artwork is unchanged.

A finite two-second opening sequences the headline, supporting copy, question
sheet, answer choices and REP stack. Staggered section headings and controls,
application/roadmap panels, full article images, FAQ rows and footer columns carry
that rhythm through scrolling. The existing heritage-square arrival and roadmap
completion checks/current marker/tracks remain.
The sparse incomplete grid recalls the original Augur homepage, with a quiet
center and a bounded cursor proximity response; it replaces the connected nodes.
Mouse response is bounded and stops for keyboard interaction. Reporting produces
a brief receipt and bond response. Native stage/application selection changes a
focused diagram; nav underlines and the moving dropdown surface acknowledge intent.
The mechanism alone uses a sticky sequence when the viewport is at least 900px
wide and the full panel fits its height. Scrolling advances its stages; selecting
a step aligns the scroll position with that stage. No wheel or touch scrolling
is intercepted. A brief focus guard prevents browser focus scrolling from changing
the scene while a visitor uses its controls; deliberate scrolling resumes progression.
Scene movement is finite. There is no idle loop, scroll lock, animation package or React
hydration.

All content is visible before enhancement. Reduced motion removes travel, and
running motion cancels on reduced-motion changes or page hiding. Reduced motion
also disables the sticky mechanism sequence. Without JavaScript,
the hero remains an unreported static illustration with answer radios; its backing
and reset action require enhancement. Native mechanism stage and answer selections,
including the optional challenge checkbox,
applications, menus, FAQ and links still work; native roadmap disclosures preserve
access to historical details and sources.
Initial states are Define a query and prediction markets. The later report defaults
to Yes with the optional challenge off.

Desktop splits the hero and application story/output, gives the process four
role-labeled controls and a copy/query split, pairs a quieter completed roadmap column with the current/future work,
and presents three blog columns. Tablet
reorganizes the hero and turns blog articles into image/text rows. Mobile uses a
2×2 manual mechanism control grid, stacked roadmap groups with a vertical future
track, vertically paired application
story/output, full-width article artwork and a stacked FAQ. Local sizes and
spacing serve this composition without changing foundation tokens.

## Sources and qualifications

- [January 2026 Augur Lituus paper](https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf),
  especially §§2 and 4: permissionless queries, reporting, appeals, REP and forks.
  The 15/30 REP values are illustrative, not live fees or rewards.
- [Mission archive](https://www.augur.net/mission/): March 31, 2025 reset,
  generalized oracle in May, deeper research during 2025 and January 29, 2026
  publication. Roadmap periods are **calendar quarters**; some source article
  labels are fiscal. Dated research reports remain identified by publication date.
- [July 21 development update](https://www.augur.net/blog/augur-testing-past-building-future/)
  and [Lituus-CS](https://github.com/AugurProject/Lituus-CS): implementation roles
  and the path toward application use, not audited-deployment evidence.
- [August 5 Moon Fork report](https://www.augur.net/blog/post-fork-announcements/):
  April 8 escalation, June migration and August 3 completion belong to Augur v2.
  They are not a completed Lituus release or a launch-date commitment.
- [Blog provenance](redesign-blog-provenance.json) records primary image/article
  URLs, dates, hashes and dimensions. Published 1200×630 WebP originals and
  proportional 600×315 variants preserve complete artwork without alteration.
- Website Strategy Figure F5 supplies possible application categories;
  [source material](source-material.md) records brand/document provenance.
- [Reference research](redesign-reference-research.md) preserves Chronicle, DIA,
  Melee, UMA and RedStone observations and technical research. These inform
  composition and interaction, never Augur factual claims.

Final means selected under protocol rules, not independently verified by code.
Fork economics depend on participation, auction demand and application use.
Do not promote modeled security to unconditional guarantees. Validation evidence
belongs in [verification.md](verification.md), separately from this direction record.
