/** Homepage v5 copy, the /augus/ review copy (owner, 26 Oct 2026: "augus just augus"): Augus's notes only,
 * applied literally, ignoring Ryan's. Two sources:
 * - His notes 1–3 on Ryan's notes, verbatim: the builder block, Holding REP and the Why Augur cards. They
 *   are read from homepage-v4.ts, which has them word for word, so each keeps one home; where v4 took
 *   Ryan's words over his (the Permissionless claim), this file restores his.
 * - His 18 Oct section notes, which give each section a user reading and a project reading:
 *   - Who decides what happened (Why Augur): why a trader wants the project they trade on to use this
 *     oracle, and the band in his words. His readers become the closer's two lines.
 *   - What could you build: the business case (resolution outsourced, no hiring; a dispute isn't the
 *     project's to defend; liability very lightly). His note 1's builder block says it, and the use-case
 *     cards' "For builders" paragraphs already lean that way.
 *   - How it works: the consumer case for taking part and getting paid, with REP folded in. The review
 *     UI's How it works already is that (four steps, "Get paid to report it", Holding REP inside it).
 *   - The road to Augur Lituus: "Coming soon?".
 * Where he gave no words, the line says his direction the most direct way in his spirit. Lines that keep
 * his words against a house rule carry a `FLAG:` comment, as in v3 and v4.
 * Where v2's copy came from Ryan's notes (the hero's ending, the Why Augur lead, the use-case lead and the
 * DAO case), this version keeps v1's approved words instead, so the page shows Augus's notes alone.
 * Everything else, and the whole UI, is v2's (homepage-review.ts). */
import {homeV2} from './homepage-v2';
import {homeV4} from './homepage-v4';

export const homeV5 = {
  ...homeV2,
  hero: {
    // v1's ending, not Ryan 2's.
    bodyEnd: 'lying is designed to cost more than it pays.',
  },
  why: {
    ...homeV2.why,
    // v1's lead, not Ryan 3's.
    lead: 'Whoever tells them what happened controls who gets paid.',
    // His 18 Oct line, verbatim (it is also the band on "/"); the apostrophe is curly, as in every review
    // string.
    answer: 'With Augur, users don’t rely on parties to control answers.',
    // Note 3, verbatim, with his own "Any app can ask." (v4 took Ryan's "Anyone" there, since Augus dashed
    // Ryan 5). The FLAGs on the other two cards are in homepage-v4.ts.
    // FLAG: "Any app can ask." leaves out people: anyone may pay a fee to ask (whitepaper §2 p2, §4.4.1 p7).
    tenets: [
      { ...homeV4.why.tenets[0], claim: ['Any app can ask.', 'Anyone can answer.'] },
      homeV4.why.tenets[1],
      homeV4.why.tenets[2],
    ],
    // His two readers (18 Oct), one line each. The trader wants the products they use backed by this design
    // ("I want to use products that are backstopped by this design"), and his "protect funds with economics
    // rather than" trust; the project doesn't want to be trusted to resolve ("we dont even want that
    // responsibility").
    // FLAG: "protect funds" is a promise (house rule: no guarantees; "designed to"), and the paper models
    // attack cost, it doesn't guarantee it (§3 p3 "contingent upon the underlying assumptions").
    // FLAG: "your users" and "you" address the reader as a builder; the line is scoped by "For builders".
    paths: [
      { who: 'For traders', line: ['Augur Lituus protects funds with economics, not trust.', 'Use products backed by it.'] },
      { who: 'For builders', line: ['Your users trust you to resolve their markets.', 'Hand that responsibility to Augur Lituus.'] },
    ],
  },
  applications: {
    ...homeV2.applications,
    // v1's lead, not Ryan 9's.
    lead: 'Any app that needs to know what happened in the world. It asks a question and acts on the answer.',
    // v1's DAO case, not Ryan 10's (Applications.astro spreads this over v1's case, so an empty object keeps
    // v1's: "Did the upgrade pass its safety review?", No, "Hold the upgrade.").
    governance: {},
    // Note 1, verbatim (homepage-v4.ts).
    builder: homeV4.applications.builder,
    cards: {
      ...homeV2.applications.cards,
      // The DAO card on v1's case. The paragraph leans on his business case: the core team never rules on its
      // own upgrade, so a contested review isn't theirs to defend.
      governance: {
        label: 'Example proposal', pending: 'Queued', resolved: 'On hold',
        title: 'Upgrade the treasury contract',
        details: [{ name: 'Proposed by', value: 'Core team' }, { name: 'Vote', value: 'Passed' }, { name: 'Safety review', pending: 'Checking…', value: 'Not passed' }],
        result: 'Upgrade on hold',
        builders: 'The core team never rules on its own upgrade, so a contested review isn’t theirs to defend. The upgrade goes live once a later review passes.',
      },
    },
  },
  // Note 2, verbatim (homepage-v4.ts, with its FLAGs).
  holder: homeV4.holder,
  // "Coming soon?" (18 Oct), as the roadmap's heading (Roadmap.astro reads `roadmap` from a review copy).
  // FLAG: no invented readiness (AGENTS.md): the roadmap's own stops put testing and audits, and launch, in
  // 2027, and "soon" sets no date. He asked it as a question.
  roadmap: { heading: ['Augur Lituus.', 'Coming soon.'] },
} as const;
