# Homepage audience and message review

September 20, 2026. Review of `/lab/homepage-redesign/`, not an implementation
change. User direction: explain Augur to all audiences—newcomers, existing Augur
members, CEOs / decision-makers and CTOs / builders. This supersedes the review's
initial hypothesis of choosing one audience to lead at the others' expense.

## Diagnosis

The homepage explains participation more clearly than purpose. Its first concrete
action is choosing an answer and backing it with REP. It has not yet explained why
an application needs the answer, what Augur supplies, or what happens afterward.

“The frontier of decentralized truth” carries the brand but cannot carry the
product definition. “Oracle,” “onchain” and “resolution” still require interpretation.
Permissionless / Decentralized / Trustless repeat attributes before demonstrating
their practical value. Applications finally explain the consumer of the result,
after the visitor has spent considerable attention on reporting mechanics.

The categories are overlapping, not four exclusive personas. A CTO can be new to
Augur; an OG member can lead a company. Use a common orientation and optional depth,
not a mandatory persona selector or four competing homepage pitches.

## What each reader needs

| Reader | Essential questions | Current gap | Recommended continuation |
| --- | --- | --- | --- |
| Newcomer | What is Augur? What problem does it solve? Who uses the answer? | Jargon and REP arrive before the complete story. | One end-to-end example, then a plain-language explanation. |
| CEO / decision-maker | What can my product do with it? Why use an open process? Is it a fit, and usable now? | Application value appears late; practical tradeoffs and the next conversation are vague. | Application examples, fit/status summary, Discuss your use case. |
| CTO / builder | What goes in and comes out? Who defines the criteria? What do disputes/forks change? What are timing, cost, dependencies and security assumptions? | The reporter walkthrough substitutes for application architecture and integration evaluation. | Technical overview, paper, implementation, verified readiness information. |
| OG / returning member | How does this relate to the Augur I know? What happened to prediction markets? What changed for REP? | Continuity sits late in the FAQ; a dated blog card must do too much work. | Compact Augur → Augur Lituus explanation and current official community/REP update. |

## Shared explanation

Keep the frontier line if desired, supported immediately by a functional definition.
Suggested direction for copy, not yet approved:

> Augur provides an open process for resolving questions about real-world events.
> Applications use the answer to settle markets, determine payments, or decide
> whether agreed conditions have been met.

Pair this with one complete illustration:

**An application asks a defined question → Augur resolves the answer → the
application applies its own rules.**

For example, a hypothetical flight-delay application defines the flight, date,
threshold and evidence criteria. Augur supplies a final answer through reporting
and challenges. The application uses that answer to determine whether its payment
conditions are met. Augur is the resolution process; it does not independently
choose the application's payout policy.

The reason for decentralization should be equally concrete: the application
operator does not get unilateral final authority over a disputed answer.

Proposed capability copy must remain consistent with the product status. The brand
can speak confidently about its purpose while an ordinary nearby product/status
sentence or evaluation summary makes implementation availability clear. No launch
badge is required, and no deployed integration may be implied.

## Recommended narrative

1. **What Augur does.** Brand headline, functional definition, a complete
   application → answer → action illustration. “See how it works” describes the
   next step better than “Explore Augur Lituus.”
2. **Where it is useful.** Prediction markets, conditional payments, DAOs/grants;
   each choice states a concrete question and what the application does with the
   result. Existing application selectors can be reused and moved earlier.
3. **Why the answer should not belong to one operator.** Translate open
   participation, challenges and economic stakes into practical consequences.
   State reliance on protocol rules, incentives and participation without a
   blanket truth guarantee.
4. **How resolution works.** The existing interaction belongs here, explicitly
   labeled as the reporter's role inside the larger system. Optional detail
   supplies criteria, appeal periods, bond risk, escalation and forks.
5. **How this relates to Augur's history and what exists today.** A short bridge
   explains earlier prediction markets and the broader Augur Lituus oracle design.
   The roadmap and dated evidence distinguish v2's completed fork from Lituus
   implementation. Link to current official REP information.
6. **Continue at the depth you need.** Understand Augur; evaluate it for a project;
   catch up on Augur and REP. Keep these paths beside relevant sections as well as
   in navigation. Blog and the five-question FAQ support the story.

These are questions and reading paths, not six additional sections. Reorder,
combine and repurpose existing material instead of expanding the page by default.

## Correct the demonstration's implied lesson

Currently an arbitrary Yes / No / Invalid choice is followed by a larger bond on
the opposite answer and a final result. This can imply “the person who pays more
wins.” The missing context is consequential:

- Questions have defined criteria; participants are reporting what happened.
- A larger bond challenges the current answer; it does not establish correctness
  or immediate finality. Further challenges can follow.
- REP can be lost, and protocol finality depends on appeal periods and escalation.
- The reporter and the application developer are different roles. Do not change
  from “your report” to “your application” without identifying the perspective.

Keep the user's answer choice, but frame it as an illustrative report. Show the
application's question first and the application receiving the result afterward.
A challenge should visibly reopen the dispute process rather than read as a
purchase of the final answer.

## Information required for deeper evaluation

Offer an accessible summary with links for query format/criteria, outputs,
resolution timing, fees/bonds, dispute and fork behavior, implementation status,
and security assumptions. Document what is verified; where an integration detail
has not been published or confirmed, say so. Do not invent chain support, SDKs,
service levels, fees, audits or launch dates.

Products navigation should explain the relationships and status of Augur Lituus,
Zoltar and Augur Stratoblast. Three names alone can imply three ready products in
one integrated suite. Deeper technical and community destinations must be useful
and real before being offered as onboarding paths.

## Five FAQ questions worth considering

- What is Augur, in plain language?
- What kinds of applications could use it?
- Who decides an answer, and what if people disagree?
- How does Augur Lituus relate to earlier Augur and REP?
- What is available today, and where can I go next?

Essential answers also belong in the main story; the FAQ should not be the only
place a returning member or builder can understand the product.

## Evidence and limits

This is an expert review, not a usability test or conversion finding. It combines
inspection of the rendered heading/CTA sequence and current component source with
two independent read-only audience reviews. No live-page or runtime code changed.

Internal references: `PRODUCT.md`, `docs/homepage-redesign-brief.md`, existing
website audience/journey records, and the supplied website strategy provenance.
Historical strategy entries do not override the user's current all-audience goal.

Public primary sources checked:

- [July 21 development explanation](https://www.augur.net/blog/augur-testing-past-building-future/):
  Augur Lituus as infrastructure beneath applications, separate Dark Florist work,
  implementation and validation work. Historical migration instructions in this
  article are not current advice.
- [August 5 fork completion report](https://www.augur.net/blog/post-fork-announcements/):
  completed Augur v2 fork, closed migration, current REP context, and continuing
  Augur Lituus development. Link readers to current official information; do not
  turn the homepage into token migration instructions.

A useful next validation is a short comprehension test with actual readers from
these groups: after the first viewport, ask what Augur does, who uses it, what they
can do next, and whether they believe the product is currently available. This
review predicts gaps; that test would measure whether the revision closes them.
