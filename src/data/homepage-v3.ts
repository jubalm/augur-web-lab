/** Homepage v3 copy, the /ryan/ review copy (was /3/; owner, 21 Oct 2026): Ryan's 17 notes only, all applied
 * literally, ignoring Augus's marks and notes. Where Ryan gave exact words they are used verbatim;
 * where he gave only a direction, the line says it the most direct way in his spirit (explicit, even
 * radical; jargon is fine for him: "a general audience will follow along").
 * v3 keeps Ryan's own words even where the facts or house rules change them in v2 (his "check in at
 * least once a month", "Augur" for "Augur Lituus", "you"). Each such line carries a `FLAG:` comment
 * naming the rule or source it departs from.
 * It never adds a money claim beyond his words, and never invents past them.
 * Structure from v2 (homepage-review.ts): the same UI system, so this object spreads homeV2 and
 * overrides one section at a time. A section it doesn't override reads v2's copy: How it works (Ryan 12)
 * and Learn more (Ryan 15), whose v2 versions are his notes applied.
 * Where Ryan said nothing about a line, v3 keeps v1's approved words (the Permissionless body), not v2's
 * rewrite, so the comparison shows his notes alone. */
import {homeV2} from './homepage-v2';

export const homeV3 = {
  ...homeV2,
  hero: {
    // Ryan 2, his own example, verbatim. Sourced as the whitepaper's modelled estimate: Abstract p1
    // "unprecedented security"; §7.5 p20, 46% more costly to attack than Augur's previous design; §3 p3
    // ("contingent upon the underlying assumptions"). "Designed to" keeps it a design aim. The no-break
    // space keeps "ever before." together (at 1440 the line otherwise left "before." alone, as on /4/).
    // The review UI keeps the ending's last words on one line; two here, since five broke the line early.
    keep: 2,
    bodyEnd: 'lying is designed to cost more than ever before.',
    // Ryan 16: the page's main fork, in the hero's action area (Hero.astro), so it is on the first screen
    // at every width, phones included, where the page is longest. Three plain in-page links, one per
    // reader, named like the closer's "For traders" (consistency). Each points at an id every version
    // renders. Traders first (AGENTS.md), so theirs is the view's one Green action. It replaces "See how
    // it works". `label` names the nav for screen readers.
    // Each link lands on its section's heading, so all three arrive the same way: the heading 24 px from
    // the top (base.css scroll-padding), the section's own content right under it (consistency, NN/g #4).
    // The REP link targets the heading, not #how-it-works: how-it-works-v2.js opens the example for any
    // link to #how-it-works, and the closed section (the lead, the four steps and "Holding REP?") fits a
    // phone screen, where the open one puts "Holding REP?" 2,300 px down (progressive disclosure, Ryan 12).
    paths: {
      label: 'Jump to',
      links: [
        // Why Augur: why no one decides the answer, ending on the closer's "For traders" line.
        { label: 'For traders', href: '#tenets-heading' },
        // How it works: report what happened with REP and get paid, then "Holding REP?".
        { label: 'For REP holders', href: '#how-heading' },
        // The use cases: what Augur Lituus can power.
        { label: 'For builders', href: '#applications-heading' },
      ],
    },
  },
  why: {
    // The lead is Ryan 3 verbatim ("Whoever controls the oracle decides who gets paid."), which v2
    // already uses; it is read from homeV2.why.
    ...homeV2.why,
    // Ryan 4: v1's sentence with "parties" swapped for the plainest word: "middlemen" is what a reader
    // already calls whoever stands between a market and its answer, where "parties" reads as legal
    // jargon and "intermediaries" or "third parties" are no plainer. Nothing else changes; the apostrophe
    // is curly, as in every review string. The ribbon (initAnswerRibbon) splits it into ten words.
    answer: 'With Augur, users don’t rely on middlemen to control answers.',
    // Ryan 5, 6 and 17. v1's titles and order, each title with a "?" that opens a one- or two-sentence
    // definition (`tip`, Tenets.astro). `diagram` picks each card's isometric scene (the review UI, 26 Oct
    // 2026) by what the card says: the two roads for Permissionless, the middleman who falls away for
    // Decentralized (no one in charge), the catapult for Bribery-resistant (the cost of an attack). The claims
    // carry the differentiators in his words; a body Ryan didn't touch stays v1's. Both claim lines are
    // Paper, as in v2 (every line is a differentiator). `tip.id` names the popover and its anchor,
    // `tip.label` is the button's accessible name, and `tip.text` follows the title in the box.
    tenets: [
      // Claim: Ryan 5, verbatim. Body: v1's, unchanged. Tip: open to anyone (§2 "permissionless"; anyone
      // may ask, Abstract, §2, §4.0.1, §4.4.1; anyone can report or challenge, §2). "Approves" is the
      // plain word for "permission".
      { title: 'Permissionless', diagram: 'cross', claim: ['Anyone can ask.', 'Anyone can answer.'], body: 'Ask, answer or push back. No one has to let you in.',
        tip: { id: 'tip-permissionless', label: 'What does permissionless mean?', text: 'Open to anyone. No one approves who asks a question or who answers it.' } },
      // Claim: Ryan 17's two words, verbatim ("no multisigs, no governance"), governance first as the
      // wider one. Abstract p1: truth "is not decided by token holders, governance, multisigs, or anyone
      // else".
      // FLAG: "No governance." is sourced for deciding answers (Abstract p1), not for the protocol as a
      // whole: the paper names tunable parameters without saying who sets them (v2 open question 3).
      // Body: Ryan 17's "no-holds-barred decentralization and trustlessness", in the paper's words:
      // "trustless" (Abstract; §2) and no "centralized backstops or vetoes" (§2 p2). "Fully" is his
      // "no-holds-barred". No "Augur's creators": that is Augus's line, only implied by "or anyone else".
      // Tip: v1's own claim ("No one in charge. No one to pressure."), then where answers come from
      // (dispersed knowledge, §1; anyone can report, §2).
      { title: 'Decentralized', diagram: 'authority', claim: ['No governance.', 'No multisigs.'], body: 'Fully trustless: no one holds a veto over any answer.',
        tip: { id: 'tip-decentralized', label: 'What does decentralized mean?', text: 'No one is in charge, so there is no one to pressure. Answers come from many independent people.' } },
      // Claim: Ryan 17's "attack cost higher than ever before", in his hero words ("more than ever before",
      // Ryan 2), hedged as v1 hedged this card ("Lying is built to lose."): "built to" is "designed to".
      // The whitepaper's modelled estimate: Abstract p1 "unprecedented security", "significantly more
      // resistant to attack than all current offerings"; §3 p3, the most expensive to attack of the
      // designs surveyed (134% of FDV); §7.5 p20, 46% more than Augur's previous design; §8 p20.
      // FLAG: the ranking appears twice, in the hero and here (Ryan 2 and 17 each ask for it); v2 says it
      // once. Both are modelled estimates for an undeployed design, which the paper hedges itself: §3
      // "contingent upon the underlying assumptions", §7.0.2 "no protocol is strictly more secure than
      // another".
      // Body: why, as a mechanism (no hedge needed): each challenge doubles the bond (§2.1 p2, §4.1 p5), so
      // keeping a false answer standing costs twice as much every round. No "money", "bond" or "stake" in
      // this section (house rule, as in v2: nothing may suggest money buys the answer).
      // Tip: v1's approved body for this card, verbatim (it moves here, so the fact keeps one home).
      // The no-break space keeps "ever before." on one line.
      { title: 'Bribery-resistant', diagram: 'mesh', claim: ['Built to cost attackers', 'more than ever before.'], body: 'Every challenge doubles the cost of defending a lie.',
        tip: { id: 'tip-bribery-resistant', label: 'What does bribery-resistant mean?', text: 'Paying for a false answer is designed to cost more than it brings in.' } },
    ],
    // The closer statement stays v1's: "The answer is nobody’s call."
    paths: [
      // Ryan 7: say outright that traders have seen markets misresolve ("a good number of traders… have
      // already seen misresolved markets"), then the payoff: v1's "with no authority deciding alone", said
      // outright, as he asks (no authority decides at all; Abstract p1: not "token holders, governance,
      // multisigs, or anyone else"). "Misresolve" is his word; jargon is fine for him.
      // FLAG: "Many traders" is Ryan's framing and has no source; it stays unquantified.
      { who: 'For traders', line: ['Many traders have already seen markets misresolve.', 'Here, no authority decides.'] },
      // Ryan 8: liability first, in his words (PR disasters, backlash from bad resolutions; "can" keeps it a
      // risk), labour second: hand the answering to the oracle. Not v1's "Leave resolution to Augur
      // Lituus." (323 px): the last cell is 12 px narrower than the middle one (subgrid half-gutters), so
      // no trader line wraps level with it at both 1280 and 1023. "Let Augur Lituus answer." (240 px) has
      // no "it" to misread after "backlash" (as handling the PR rather than the question). Measured: both
      // cells take 2 + 1 lines at every width from 655 to 1440 and on phones (601–654: 3 + 2 beside 3 + 1).
      { who: 'For integrators', line: ['A bad resolution can mean PR disasters and backlash.', 'Let Augur Lituus answer.'] },
    ],
  },
  applications: {
    // Ryan 9, verbatim ("Any protocol or app that needs to know what happened in the world."), the line v2
    // already uses; read from homeV2 so it keeps one home.
    lead: homeV2.applications.lead,
    // Ryan 10, in his framing: the DAO asks whether a proposed improvement or protocol change conflicts
    // with its mission statement or constitution, so the DAO stays open-ended and its developers can't
    // rug it. Spread over v1's case in Applications.astro (id, icon, title, outcomes), as in v2. Yes blocks,
    // so the picked Green chip comes first, as in the other two cases, and v2's one Green wall (home-v2.css)
    // stands at the check. Every string agrees with the picture: "This change" stops at the "Mission
    // check" and "Another change" passes it and goes live ("Proposal" and "Live" are the picture's own).
    governance: {
      // The tab's blurb (and the phone panel's first line): his two kinds of change and his two documents.
      // The no-break space keeps "or constitution." together: it left "constitution." alone on the tab's
      // fourth line at 1024 and on the panel's at 360.
      summary: 'Proposed improvements and protocol changes checked against a DAO’s mission statement or constitution.',
      // "This change" is the picture's first lane, word for word; the summary above names his kinds of change.
      // Two lines from 1024 up ("…protocol change…" took three at 1024), three at 390, four at 360–375.
      // FLAG: a mission statement is open to interpretation. The whitepaper asks for questions with an
      // objective ground truth (§5 p12), and one that can't be resolved resolves Invalid (§4.0.1 p3); v2
      // asks about "a rule in the DAO’s constitution" for that reason.
      question: 'Does this change conflict with the DAO’s mission statement?', answer: 'Yes',
      // Reads "Decided in the open, not by the DAO’s own developers." (as "the market’s own team"): the
      // people his "developers can't rug" is about.
      notBy: 'the DAO’s own developers',
      action: 'Block the change.',
      // Ryan's two points, one sentence each: "developers can't rug" (jargon is fine for him), then "DAOs
      // stay open-ended", said as the picture's second lane shows it.
      // FLAG: "can’t" is a guarantee (house rule: "designed to", never guarantees). It holds only where
      // the DAO's upgrade path waits on the answer, as this case sets up.
      explanation: 'Developers can’t rug the DAO. Changes that fit its mission still go live.',
      labels: { lanes: ['This change', 'Another change'], at: 'Mission check' },
    },
    // The review UI's product cards (owner, 26 Oct 2026: every version shares v2's structure). The market
    // and insurance cards are v2's; the DAO card carries Ryan 10: a change checked against the mission
    // statement, his "developers can't rug" in the paragraph.
    // FLAG: "can’t" is a guarantee (house rule: "designed to"), as in `explanation` above.
    cards: {
      ...homeV2.applications.cards,
      governance: {
        label: 'Example proposal', pending: 'Queued', resolved: 'Blocked',
        title: 'Upgrade the treasury contract',
        details: [{ name: 'Proposed by', value: 'Core developers' }, { name: 'Vote', value: 'Passed' }, { name: 'Mission check', pending: 'Checking…', value: 'Conflicts' }],
        result: 'Change blocked',
        builders: 'Developers can’t rug the DAO: every change is checked against its mission statement. Changes that fit its mission still go live.',
      },
    },
    // Ryan 11: the builder block ("Good for users. Easier on the project.", its reasons, its ask and its
    // "Talk to us") is removed, with no `builder` field (Applications.astro renders it only when the copy
    // has one). Its details live where they started: the integrators' liability point in the Why Augur
    // closer (Ryan 8, above), the contact ask in the header's "Talk to us" and the footer's "Building on
    // it?". The section ends on the use-case example.
  },
  // How it works (Ryan 12): v2's collapse, strip, toggle and lead, read from homeV2.howItWorks.
  holder: {
    // Ryan 13: what you can do with REP, then the reminder that holding it isn't passive. The title and
    // "Learn about REP" stay. The marks stay as in v1 and v2 (solid: nothing to do; hollow: act in a fork).
    title: 'Holding REP?',
    points: [
      // His "report to earn extra" and "stake", in one clause: staking is how you report (the report bond,
      // §4.1 p5; the only staking in the paper), so it never reads as staking for a yield.
      // FLAG: "earn extra" states no condition (house rule: no guarantees). Rewards go only to a report
      // or challenge whose answer holds (§4.3.1 p6; rep.ts), and holding REP earns nothing by itself.
      { lead: 'Put it to work.', text: 'Stake it to report what happened and earn extra.' },
      // His reminder, verbatim (a comma added after "fork"), then v1's approved sentence for what checking
      // in is for. "Never passive." is v1's "But never passive." without the "But" (its "Optional." is gone).
      // FLAG: "at least once a month" is Ryan's cadence and doesn't match the paper: a fork opens a two-week,
      // one-way migration window (§2.2 p2; "a time-frame of weeks", §4.2.2 p5; proposed design, Lituus-CS
      // forking isn't built), so a monthly check could miss it, and the REP left behind loses its value.
      // The paper sets no check-in cadence. v2 says "designed to give you two weeks" instead.
      // FLAG: "you have to" is a duty and "you" is a reader-facing address (AGENTS.md: traders first);
      // the bar is scoped to REP holders by its title. Nothing requires reporting or challenging, but with
      // v1's "Optional." gone the bar no longer says so (house rule: never imply holders must report).
      // The no-break spaces keep "once a month." together: from 1280 the balanced point then breaks
      // between its sentences (it broke "once a / month." at 1280–1440, 390 and 1024).
      { lead: 'Never passive.', text: 'In the event of a fork, you have to check in at least once a month. Move your REP to the universe that reflects reality, or it loses its value.', act: true },
    ],
  },
  // Learn more (Ryan 15: no "From the blog" column) reads v2's whole section, its Keep going included, as
  // every version does (owner, 26 Oct 2026). The roadmap is unchanged (Ryan 14).
} as const;
