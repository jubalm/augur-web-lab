/** Homepage v2 copy, the /2/ review copy (owner, 21 Oct 2026). One home for every v2 string: the
 * home sections read it through homeCopy() (homepage-review.ts) when `variant` is 'v2'; v1 keeps its
 * copy where it is, untouched. v3 and v4 (homepage-v3.ts, homepage-v4.ts) spread this object and
 * override it section by section, so a change here reaches them too wherever they don't override.
 * Source: Ryan's 17 notes as Augus marked them (dash = do, X = don't, 1–3 = Augus rewrote it).
 * Each entry names its source: "Ryan n" or "Augus n".
 * Augus's worry is that v2 turns technical, so jargon stays in the small supporting lines.
 * Not changed in v2: the hero headline and art (Ryan 1), "?" tooltips (Ryan 6, X), the roadmap
 * (Ryan 14) and an intent split of the page (Ryan 16, X).
 * Guardrails: no ranking claim without a source (the whitepaper's own modelled estimate backs one,
 * said once and hedged, in the Robust card; Augus to confirm); a fork has a
 * two-week one-way migration window (whitepaper §4.2, docs/sources.md); unmigrated REP loses its
 * value, the fork never takes it; REP is optional, never a duty to report or challenge.
 * Draft copy for review, not approved. Deliberately not flagged `needsReview`: /2/ is a review route
 * and the flag would add launch blockers (check-launch).
 * The variant type and the version list live in homepage-review.ts. */

export const homeV2 = {
  hero: {
    // Ryan 2: the attack cost, stressed through the mechanism: each challenge doubles the bond
    // (whitepaper §2.1 p2, §4.1 p5), so keeping a lie standing costs twice as much every round.
    // Hero.astro keeps the v1 sentence literal up to "and " (its straight apostrophe would be escaped
    // in an expression) and swaps in this ending. The ranking itself is said once, in the Robust card.
    bodyEnd: 'every challenge doubles the cost of a lie.',
  },
  why: {
    lead: 'Whoever controls the oracle decides who gets paid.', // Ryan 3, verbatim
    // Ryan 4: no "parties". It answers the lead in its own words: whoever controls it / no one does.
    // Design intent (Abstract p1; §2 p2: no backstops or vetoes).
    answer: 'With Augur, no one controls the oracle.',
    // Augus 3: his three cards (titles, order and the facts in each), in plain words, with the jargon
    // kept to the small lines (Augus's worry). Ryan 5: "Anyone can ask" over Augus's "Any app can ask"
    // (§2 p2 "Anyone may pay a fee", §4.4.1 p7). Ryan 17: the differentiators said plainly: no
    // governance, no multisigs, the attack cost. Every claim line fits one line in H3 (24 px) and
    // every body two lines from 1024 up, so the three cards stay level (home-v2.css).
    tenets: [
      // Augus's "Report, challenge, or build" is a rule of three. The claim already covers asking and
      // answering, so the body adds projects (§2 p2 "permissionless use by third parties").
      // "On their own" (review fix, 21 Oct 2026): "without asking" reused the claim's "ask" in the other
      // sense (permission, not a question) and said "No approvals" twice. Not "freely": a question
      // costs a fee (§4.4.2 p7).
      { title: 'Permissionless', diagram: 'cross', claim: ['Anyone can ask.', 'Anyone can answer.'], body: 'Projects plug in on their own. No approvals, no gatekeepers.' },
      // Abstract p1: truth "is not decided by token holders, governance, multisigs, or anyone else";
      // §2 p2: "without any centralized backstops or vetoes". Augus's "no admin keys" is left out: the
      // whitepaper never mentions admin keys, and Lituus-CS isn't shipped (open question for Augus).
      // "Augur's creators" and "override" are his ("or anyone else" in the paper). The No authority
      // lanes (a signal crossing an empty middle, the scene first drawn for "Trustless") show the claim:
      // no one stands between question and answer.
      { title: 'Trustless', diagram: 'authority', claim: ['No governance.', 'No one has a veto.'], body: 'No multisigs. Not even Augur’s creators can override an answer.' },
      // Augus's claim ("Harder to game. Costlier to manipulate.") in plain words, without "money" or
      // "bond" in this section (house rule: nothing may suggest money buys the answer). The ranking is
      // the whitepaper's own estimate: Abstract p1 "significantly more resistant to attack than all
      // current offerings"; §3 p3, the most expensive to attack of the designs surveyed (134% of FDV);
      // §8 p20. "Designed to" and "almost any" hedge a modelled figure for an undeployed design. The
      // peer mesh (no centre, a relay running every link) shows why: there is no one point to corrupt.
      { title: 'Robust', diagram: 'mesh', claim: ['Hard to corrupt.', 'Lies get expensive fast.'], body: 'Designed to cost attackers more than almost any other oracle.' },
    ],
    // The statement stays v1's: "The answer is nobody’s call." On /2/ it heads the closer, over the two
    // readers (owner, 23 Oct 2026; Tenets.astro, home-v2-only.css), so each payoff says what it means for
    // that reader instead of a fifth "no one". Both setups name the same risk, a wrong answer.
    paths: [
      // Ryan 7: say plainly that markets misresolve. A question, since nothing sources "many traders".
      // The payoff answers it with recourse: a report can be challenged while its window runs (whitepaper
      // §2.1 p2, §4.1 p5). "Can", not "any answer", since the window closes. "Anyone" echoes the
      // Permissionless claim; it never says REP holders must challenge. Was "Here, no one decides alone."
      { who: 'For traders', line: ['Seen a market settle the wrong way?', 'Here, anyone can challenge a wrong answer.'] },
      // Ryan 8 + Augus 1: liability first, then hand it off. "For builders" (was "For integrators"): the
      // site's name for them (the For builders guides, the footer's "Building on it?"), and plain for
      // beginners. v1's approved "Leave resolution to Augur Lituus." returns: it was dropped only for the
      // 323 px three-column cell, and it names a process where "Let Augur Lituus answer." cast the oracle
      // as the one who decides, beside "nobody’s call". "Resolution" moves out of the setup so it isn't
      // said twice. Both setups and payoffs fit one line wherever the readers sit side by side (from
      // 1024: 408 px at 18 px in a 416 px column, measured). v4 keeps the 21 Oct lines (homepage-v4.ts).
      { who: 'For builders', line: ['A wrong answer can cost a platform its users.', 'Leave resolution to Augur Lituus.'] },
    ],
  },
  applications: {
    // Ryan 9, verbatim: one sentence; "It asks a question and acts on the answer." goes (the cases show it).
    lead: 'Any protocol or app that needs to know what happened in the world.',
    // Ryan 10: the DAO case checks an upgrade against the DAO's own rules, so the DAO stays open-ended
    // and its developers can't push through a change that breaks them (a rug). Spread over v1's case in
    // Applications.astro (id, icon, title, outcomes and the gate picture keep one source). The paper
    // frames questions as checkable facts (§5 p12 "objective ground truth"; an unresolvable one resolves
    // Invalid, §4.0.1 p3), so the question points at a written rule, not at a reading of the mission.
    // Yes now blocks: the picked Green chip comes first, as in the other two cases. `labels` relabel the
    // gate picture to match (this upgrade stops at the check; another change passes it and goes live).
    governance: {
      summary: 'Upgrades and proposals checked against a DAO’s written rules: its constitution and mission.',
      question: 'Does this upgrade break a rule in the DAO’s constitution?', answer: 'Yes',
      // Reads "Decided in the open, not by the upgrade’s own developers." (as "the market’s own team").
      notBy: 'the upgrade’s own developers',
      action: 'Block the upgrade.',
      // The second lane of the picture, and Ryan's "DAOs stay open-ended", in one plain line (one line from
      // 1024 up; "Changes that follow the constitution…" left "go live." alone at 1024).
      explanation: 'Changes within the constitution can still go live.',
      labels: { lanes: ['This upgrade', 'Another change'], at: 'Constitution check' },
    },
    // Ryan 11 (X) + Augus 1: the builder block stays, rewritten from Augus's note. Reasons in Ryan 8's
    // order: less liability first (the backlash over a bad resolution lands on whoever decided it), less
    // work second, user trust third. "Augur Lituus" in full in the ask, its object (a second mention in
    // the section, like the Insurance note: on phones the ask follows the reasons, so "it" would dangle).
    // "Win user trust." is Augus's own line; it reverses his 18 Oct "no trust" in this section (open question).
    builder: {
      title: ['Good for users.', 'Easier for projects.'],
      // The ask beside its "Talk to us" button (/contact/, the v1 button): Augus's two questions, the
      // first muted, the second in Paper (the house setup and payoff). No arrow: an internal link.
      ask: ['Want Augur Lituus in a platform you use?', 'Or one you’re building?'],
      reasons: [
        // Augus: "When outcomes get contentious, Augur's dispute process makes the call - not you." Not
        // "not you" (AGENTS.md: no "your call" for traders-first copy) or "makes the call" (an idiom the
        // owner replaced on 19 Oct). The project never picking a side is what keeps a bad call from
        // landing on it (disputes escalate in public, §2.1–2.2 p2); "in the open" echoes each case's
        // "Decided in the open". Every point keeps two lines from 1024 to 1440 (measured), so the three
        // columns end level; "Contested outcomes go to the dispute process…" took three from 1100 down.
        { title: 'Stay out of the middle.', line: 'Disputes settle in the open. The project never picks a side.' },
        // Augus, verbatim. A fee per question (whitepaper §4.4.2 p7; fixed-price Query Tokens, §4.4.7 p9).
        { title: 'No team to hire.', line: 'Pay per question instead of running resolution in-house.' },
        // Augus's line, trimmed to fit two lines at 1024: his "independent", "check" for "verify … themselves".
        { title: 'Win user trust.', line: 'Users can check and challenge independent outcomes.' },
      ],
    },
  },
  howItWorks: {
    // Ryan 12: the detail goes behind a click. The heading (v1's, with its "paid" mark), this one-line
    // lead and the four step names (walkthrough.ts, one source) stay in the scroll; the toggle opens
    // the full walkthrough in place, as do a step and the hero's "See how it works".
    // The lead replaces v1's three sentences with how you take part and what it risks: the stake is
    // the report's bond (§2 p2, §4.1 p5) and v1's own last sentence, approved. The payout figures
    // (the reward, 80% of a wrong bond) stay in the example, where the numbers have context.
    // One line from 1200 up; where it wraps it balances, and the no-break space keeps "A" with
    // "wrong", so it breaks between the sentences (it left "your bond." alone at 1024, "A" at 390).
    lead: 'Stake REP on what you saw. A wrong call costs your bond.',
    // The toggle's two labels (aria-expanded carries the state; the words say what a press does).
    open: 'Walk through an example',
    close: 'Hide the example',
    // The strip's list name for screen readers; each step is a button that opens the example there.
    steps: 'Steps in the example',
  },
  holder: {
    // Ryan 13 + Augus 2: what REP can do, and that holding it is never passive. Each point keeps a
    // condition (house rules: no guarantees; REP is optional, never a duty to report or challenge):
    // - Staking is how you report or challenge (the bond, §4.1 p5; the only staking in the paper), and
    //   rewards go only to an answer that holds (§4.3.1 p6; rep.ts). "If you want" carries v1's
    //   "Optional.", so "Nothing requires it" goes (one home per fact).
    // - The fork window is the whitepaper's proposed design (§2.2 p2 "a two week, one-way migration
    //   window"; Lituus-CS forking isn't built, docs/sources.md), hence "is designed to". Unmoved REP
    //   loses its value (§4.2.2 p5); a fork never takes the token. "Reflects reality" is v1's wording.
    title: 'Holding REP?',
    points: [
      { lead: 'Put it to work, if you want.', text: 'Stake it to report or challenge answers, and earn when your answer holds.' },
      { lead: 'Don’t leave it unattended.', text: 'In a fork, Augur Lituus is designed to give you two weeks to move your REP to the universe that reflects reality. REP left behind loses its value.' },
    ],
  },
  learnMore: {
    // Ryan 15: no "From the blog" column; the FAQ stays, with a plain link to the blog. The heading
    // stays v1's ("Learn more about Augur.", on two lines in LearnMore.astro), and the section gets the
    // shared heading row like every other one: this lead is the published /faq/ lead (faq.astro), so it
    // says what the list holds. One line from 1024 up.
    lead: 'Short answers, each with a link to go deeper.',
    // A text link beside the outline "View all questions" (DESIGN.md: the outline button ends a list
    // that continues on its own page; the blog is a second, lighter way on). PRODUCT.md: the homepage
    // points to writing and FAQs.
    blog: { label: 'Read the blog', href: '/blog/' },
  },
} as const;
