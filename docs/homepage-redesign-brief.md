# Homepage redesign — product homepage proposal

Updated September 21, 2026 at `/lab/homepage-redesign/`. This code-led proposal
extends the established Augur brand and remains available through `/lab` and the
hidden chooser. It has not replaced `/` or been published. Visitor mode: **Persuade**.

The active direction is a confident product homepage with a hands-on reporting
example, a short mechanism, possible applications, a quarterly roadmap, current
blog articles and compact FAQ. Development context belongs principally in the
roadmap. This supersedes the research-led Resolution Machine composition.

## Composition and behavior

- **Navigation:** a Navy masthead offers Products / Blog / Resources / Community
  and Talk to us. With a fine pointer, hovering opens a dropdown; one shared
  surface moves and resizes between menus, with a short grace period across gaps.
  Keyboard and touch retain explicit controls, plus Escape, outside-click and
  focus dismissal. Native details remain usable without JavaScript. Hover/focus
  underlines and brief content transitions reinforce interaction. Zoltar and
  Stratoblast lead to the relevant development article until dedicated destinations
  exist. There is no theme toggle.
- **Hero:** “The frontier of decentralized truth.” is followed by one concise
  definition: “Augur is decentralized oracle infrastructure for establishing truth
  onchain.” followed by “Open to anyone. Controlled by no one.” The user explicitly
  restored this wording after the audience review; retain it in future revisions.
  The Navy field joins the header;
  a finite underline draws beneath “decentralized.” The flight-delay
  scene lets a visitor choose Yes / No / Invalid and back a local illustrated
  report with 15 REP. The receipt stays open to challenge and can be reset; it
  never declares the answer final. Its caption says “Try it. No wallet or tokens
  needed.” Bounded mouse response refreshes geometry after scroll
  or resize and resets on leave or keyboard focus. Explore leads to the mechanism;
  the whitepaper is available alongside it.
  A sparse field of 146 seeded 3px Paper/Green squares recalls the original Augur
  homepage's incomplete grid, replacing the larger connected question nodes.
  Squares sit around the Navy field's edges, leaving the content area quiet. A
  1.2-second entrance and event-driven 180px cursor proximity response enhance the
  static no-script field; reduced motion disables the response, forced colors
  hides the decoration, and focus, resize, scrolling or leaving view clears it.
- **Principles:** a concise three-column band states permissionless participation,
  decentralization and reliance on protocol rules rather than a privileged operator.
- **Mechanism:** “Builders ask. REP holders resolve.” follows a flight-delay query
  through four native stages with visible role labels: Builders define a query →
  REP holders report an answer → REP holders challenge if needed → Builders use
  the result. Navy explanation copy sits beside a Paper query view. The builder
  sets the question, outcomes and resolution criteria and pays a REP fee. In the
  reporting stage, the visitor chooses Yes / No / Invalid with an illustrative
  15 REP bond. The challenge stage defaults to no challenge; a native checkbox
  reveals a different tentative answer, a 30 REP bond and a new appeal period.
  A larger bond does not establish correctness. Without a challenge, the selected
  report becomes final after the appeal period closes. With the example challenge,
  the new answer becomes final only after its appeal period closes without a
  completed challenge. The application then applies its own payout rules, including
  handling Invalid. These are open activities, not exclusive user groups.
  Answer and challenge dependencies work in CSS without JavaScript. On desktops at least
  900px wide, scrolling advances the four stages while the illustration stays
  sticky, provided the complete panel fits the viewport. Stage controls remain
  available; smaller or shorter viewports and reduced motion use manual selection.
  Example values are qualified and linked to the paper.
- **Applications:** compact native radio selectors open one shared-height preview.
  The sourced question and application action sit beside an illustrated final Yes
  answer connected to market settlement, a flight-delay policy, or a grant
  deliverable. This replaces the oversized selectors; the same website component
  replaces the animation placeholder on `/`. Applications apply their own action
  rules. The examples remain illustrative, with no established integrations or live
  account state. Selection is immediate and the illustrations remain static;
  both work without JavaScript.
- **Roadmap:** before the blog, Completed / Building now / Up next distinguish
  past work from the current focus. On desktop, muted, checked and struck-through
  completed milestones occupy the left column; native disclosures retain their
  explanations and source links. They cover the Q1 2025 foundation reset, Q2 2025
  oracle proposal publication, Q1 2026 whitepaper and Q2–Q3 2026 Augur v2 Moon Fork.
  A prominent Navy Q3 2026 panel on the right emphasizes ChainSafe implementation
  and Foundation review against the whitepaper. Testing/audits and the Augur Lituus
  launch follow below on dashed tracks, with dates to be announced. Launch includes
  documentation and application use. Checkmarks, the current line/marker and
  upcoming tracks animate once on entry. Mobile stacks the groups and turns the
  future track vertical. The fork remains distinct from Augur Lituus development;
  no future quarter is invented.
- **Blog:** three editorial columns show actual published Augur thumbnails with
  their titles, dates and links: August 5, July 21 and July 2, 2026. The July
  migration article is explicitly a look back. Artwork is shown in full, with
  intrinsic dimensions, lazy loading and proportional responsive variants.
- **FAQ:** a compact left heading and source link accompany five native disclosures
  on the right. A shared `name` permits one open answer at a time. Topics cover
  questions, participation, REP, finality and earlier Augur.
- **Footer:** a Navy contact invitation and Explore / Resources / Community
  directory use the original reversed logo through a local variant rule. The
  existing contact route and its email-composition behavior are unchanged.

Paper, Navy, Sora, Schibsted, square geometry and hairlines remain the vocabulary.
The fixed-light document uses Navy for the masthead, hero, mechanism and footer.
Green on the Navy hero is a scoped emphasis treatment; light-ground meaningful
marks still use Deep. Local display sizes, grids and spacing are composition
choices, not new shared tokens. Original logos and pinned registry material remain
unchanged.

## Sources and distinctions

- **Brand:** Brand Foundation v1.0, September 7, 2026 controls identity, typography
  and color. Website exceptions and source-document distinctions remain in
  [source-material.md](source-material.md).
- **Mechanism:** [January 2026 paper](https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf),
  §§2 and 4. Queries need defined outcomes and criteria. A completed challenge
  begins another appeal period. The 15/30 REP values are illustrative, not live
  fees or rewards. Finality follows protocol rules; code does not independently
  recognize ground truth.
- **Economics:** §4.3.1 specifies 80% of losing bonds redistributed and 20% burned.
  Forks involve one-way migration and supply restoration; the original oracle
  follows most total migration. These are modeled defenses with assumptions, not
  measured guarantees or unconditional attack-cost claims.
- **Applications:** Website Strategy Figure F5 supplies the categories and
  question-to-action relationships. No established integration is implied.
- **Roadmap provenance:** the [mission archive](https://www.augur.net/mission/)
  records the March 31, 2025 reset, May generalized-oracle direction, deeper 2025
  research and January 29, 2026 whitepaper. The roadmap uses **calendar quarters**;
  mission article titles also use fiscal-quarter labels. Dates on research updates
  identify the published report, not an inferred exact date for every activity.
  The completed Q2 2025 milestone is proposal publication, not completion of
  oracle research.
- **Development and fork:** the [July 21 update](https://www.augur.net/blog/augur-testing-past-building-future/),
  [Lituus-CS](https://github.com/AugurProject/Lituus-CS) and
  [August 5 completion report](https://www.augur.net/blog/post-fork-announcements/)
  support the implementation and fork milestones. Escalation began April 8;
  migration ran from June to August 3, 2026. The completed event belongs to
  Augur v2, not a deployed Lituus release. Public code does not establish audited
  production readiness.
- **Blog assets:** [redesign-blog-provenance.json](redesign-blog-provenance.json)
  records article/image URLs, dates, hashes, original dimensions and responsive
  derivatives. Original 1200×630 WebP bytes are preserved; 600×315 variants are
  resized proportionally. No crop, recoloring, overlay or logo edit is applied.
  The July 2 article's fiscal-quarter title is retained as published, and its
  migration summary is historical rather than current instructions.

[Reference research](redesign-reference-research.md) preserves the inspected design
references. [The active narrative plan](redesign-narrative-plan.md) records sequencing.

## Implementation boundaries

Astro renders the content; native HTML/CSS powers radio selectors and disclosures.
Local scripts enhance the hero, menus, mechanism and timeline entrances. The hero uses a prepaint, two-second sequence of headline, support, question
controls and REP-stack arrivals. IntersectionObserver triggers one finite entrance
per marked region, with 110ms stagger, distinct heading/panel treatments and
uncropped image arrivals. Focus and pointer interaction settle the relevant region;
pending page and roadmap regions resume on cached history restoration. The baseline is fully visible: no script must run to reveal content.
Reduced motion removes travel; active animation is cancelled on reduced-motion
changes or page hiding. The mechanism is the only sticky scroll sequence; it is
enabled only when the full panel fits and reduced motion is off. A manual stage
choice aligns the page with that stage while this enhancement is active. Wheel
and touch scrolling are not intercepted, and there is no scroll lock or idle loop.
An 800ms focus guard prevents browser focus scrolling from changing the active
scene; wheel, touch movement and page-navigation keys release it. The mechanism
opts out of scroll anchoring. Scene movement is finite and cancels on reduced
motion, page hiding or leaving view.

Without JavaScript, the unreported hero illustration and answer radios remain;
the simulated back/reset action is an enhancement. Mechanism stage and answer
selections, its optional challenge, applications, menus, links and FAQ remain native.
The mechanism begins at Define a query; the later report defaults to Yes and the
challenge is off. Roadmap history uses native disclosures
and remains readable without scripts. Mobile design and QA are resumed
for this proposal: controls reflow deliberately, while diagrams and source content
remain available. No package, React hydration or generated artwork is added.
Source PDFs remain read-only; runtime paths are portable.

The earlier long walkthrough, separate bond explorer and consolidated research
section are superseded on this route. Their remaining files and old verification
entries are not the active composition contract. Actual checks, screenshots and
limitations belong in [verification.md](verification.md); this brief asserts no
new QA pass.
