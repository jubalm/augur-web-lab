/** Homepage v4 copy, the /4/ review copy (owner, 21 Oct 2026): Augus's marks on Ryan's notes, literal.
 * A dash means do it (in Ryan's words where Ryan gave them), an X means don't, and Augus's notes 1–3
 * are used verbatim. Where neither gave exact words, v4 reuses v2's line.
 * Marks: no mark on 1 and 14; dash on 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 15 and 17; X on 6, 11 and 16.
 * Notes: 1 on Ryan 8 (and the X'd 11), 2 on Ryan 13, 3 on Ryan 17.
 * v4 keeps the reviewers' own words even where the facts or house rules change them in v2 (Augus's
 * "No admin keys", "risk losing the token", "Augur" for "Augur Lituus", "you"). Each such line
 * carries a `FLAG:` comment naming the rule or source it departs from, and goes into the review's
 * flag list in decisions.md. It never adds a money claim beyond their words.
 * Structure from v2 (homepage-review.ts): the same UI system, so this object spreads homeV2 and
 * overrides one section at a time. A section not overridden reads v2's copy.
 * Read from v2 unchanged (dash, no exact words beyond v2's): the lead (Ryan 3, his words), the answer
 * band (4), the traders' and integrators' closer lines (7, 8), the use-case lead (9, Ryan's words), the
 * DAO case (10), the How it works collapse (12) and Learn more (15). Not changed: the hero headline and
 * art (1), the roadmap (14). Not done (X): "?" tooltips (6) and the intent split (16); the builder
 * block stays (11), in Augus's words (note 1).
 * Typography: Augus typed straight apostrophes and a spaced hyphen; the site sets curly apostrophes, as
 * v2 does, so "Augur's" is "Augur’s", and his " - " is set as a closed em dash: "call—not you".
 * The no-break spaces ( ) only keep each short sentence of a claim on one line; no word changes.
 * The notes are quoted in docs/decisions.md ("Homepage v1 and v2 for review", 21 Oct 2026); the
 * wiring is in "Homepage v3 and v4 for review" and the content in "Homepage v4: Augus's marks,
 * literal" (both 21 Oct 2026). */
import {homeV2} from './homepage-v2';

export const homeV4 = {
  ...homeV2,
  hero: {
    // Ryan 2 (dash), Ryan's own wording. Sourced as the whitepaper's modelled estimate: Abstract p1
    // "unprecedented security"; §7.5 p20, 46% more costly to attack than Augur's previous design; §3 p3
    // ("contingent upon the underlying assumptions"). "Designed to" keeps it a design aim. v2 says the
    // ranking once (Robust card); v4 says it here and again in Augus's Robust body.
    // The no-break space keeps "ever before." together: at 1440 the line otherwise left "before." alone.
    bodyEnd: 'lying is designed to cost more than ever before.',
  },
  why: {
    ...homeV2.why,
    // Augus 3, verbatim: his titles, claims and bodies (Ryan 17, dash). Same diagrams as v2 (No authority
    // under Trustless, the Peer mesh under Robust; decisions.md, v2 Why Augur). Each claim is two lines,
    // setup then payoff, as in v2 (both in Paper there, since every line is a differentiator).
    tenets: [
      // FLAG: Augus's note reads "Any app can ask."; he dashed Ryan 5 ("Anyone can ask. Anyone can
      // answer."), so the claim takes Ryan's "Anyone" (his note carried the old v1 line over).
      // FLAG: "build on Augur": "Augur" for "Augur Lituus" (AGENTS.md: the name in full).
      // FLAG: "Report, challenge, or build" is a rule of three (v2 house rule; v2 rewrote the body).
      // The no-break space keeps "No approvals" together (at 1024 the body broke "…Augur. No / approvals").
      { title: 'Permissionless', diagram: 'cross', claim: ['Anyone can ask.', 'Anyone can answer.'], body: 'Report, challenge, or build on Augur. No approvals, no gatekeepers.' },
      // Augus's three sentences split two and one: the two the whitepaper sources (Abstract p1: truth "is
      // not decided by token holders, governance, multisigs, or anyone else") set up, the third pays off.
      // The third, unsourced sentence stands alone, so it is easy to drop. Where a column can't hold the
      // setup on one line (every review width: 356 px at 24 px, 297 at 20), it breaks between its
      // sentences, never inside one, so the claim reads one sentence per line.
      // FLAG: "No admin keys." is unsourced: the whitepaper never mentions admin keys or upgradeability,
      // and Lituus-CS isn't shipped (v2 open question 2). "No governance" is sourced for deciding answers,
      // not for the protocol as a whole (v2 open question 3).
      // FLAG: "No company, committee, or even Augur’s creators" is a rule of three, and "Augur’s creators"
      // is implied only by the paper's "or anyone else" (Abstract p1; v2 keeps "Not even Augur’s
      // creators" on the same footing). "Augur" here is the project, as in v2's line.
      { title: 'Trustless', diagram: 'authority', claim: ['No governance. No multisigs.', 'No admin keys.'], body: 'No company, committee, or even Augur’s creators can override an outcome.' },
      // The ranking is the whitepaper's own modelled estimate (Abstract p1 "significantly more resistant to
      // attack than all current offerings"; §3 p3, 134% of FDV against 26–92% for the designs surveyed,
      // "contingent upon the underlying assumptions"; §8 p20), and "Designed with" keeps it a design aim.
      // FLAG: "Harder to game. Costlier to manipulate." are comparatives without a referent (v2 rewrote
      // them for that reason), and "economic barriers" brings money into Why Augur (v2 house rule: no
      // money, bond or stake in this section, so nothing suggests money buys the answer).
      { title: 'Robust', diagram: 'mesh', claim: ['Harder to game.', 'Costlier to manipulate.'], body: 'Designed with one of the highest economic barriers to attack among decentralized oracles.' },
    ],
  },
  applications: {
    ...homeV2.applications,
    // Ryan 11 (X: the block stays) + Augus 1, verbatim and in his order: trust, work, then liability (v2
    // puts liability first, after Ryan 8). The ask sits beside the v1 "Talk to us" button (/contact/);
    // Augus's "->" is the button itself, without an arrow, as an internal link (AGENTS.md).
    // Icons keep their approved meanings and move with their reasons (decisions.md, 19 Oct icon audit):
    // eye (anyone can see, so users can verify), puzzle-piece (it slots in), scales (an impartial dispute).
    builder: {
      title: ['Good for users.', 'Easier for projects.'],
      // FLAG: "Augur" for "Augur Lituus" (AGENTS.md), and "you" (AGENTS.md: traders and beginners first;
      // this ask is scoped to builders by "Or one you’re building?", as v2's is).
      ask: ['Want Augur in a platform you use?', 'Or one you’re building?'],
      reasons: [
        // FLAG: "Win user trust." reverses Augus's 18 Oct "no trust" in this section (v2 open question).
        { icon: 'eye', title: 'Win user trust.', line: 'Give users independent outcomes they can verify and challenge themselves.' },
        // A fee per question (whitepaper §4.4.2 p7; fixed-price Query Tokens, §4.4.7 p9). Same as v2.
        { icon: 'puzzle-piece', title: 'No team to hire.', line: 'Pay per question instead of running resolution in-house.' },
        // FLAG: "Augur’s" for "Augur Lituus’s" (AGENTS.md); "not you" puts "you" in a traders-first line
        // (AGENTS.md: no "your call"); "makes the call" is the idiom the owner replaced on 19 Oct and sits
        // beside the closer's "The answer is nobody’s call."; "makes the call—not you" is an "X, not Y"
        // construction; the em dash breaks the house rule "no em dashes" (decisions.md, 19 Oct).
        { icon: 'scales', title: 'Stay out of the middle.', line: 'When outcomes get contentious, Augur’s dispute process makes the call—not you.' },
      ],
    },
  },
  holder: {
    // Ryan 13 (dash) + Augus 2, verbatim: his two labels and lines. The hollow mark stays on the second
    // point (act in a fork), the solid one on the first, as in v1 and v2. "Learn about REP" stays.
    // FLAG: "earn" without its condition (house rule: no guarantees): rewards go only to a report or
    // challenge whose answer holds (§4.3.1 p6; rep.ts), and REP held alone earns nothing.
    // FLAG: "risk losing the token" is inaccurate: in a fork, REP left in the losing universe loses its
    // value (§4.2.2 p5); the token itself is never taken. The window to act is a proposed design (§2.2 p2,
    // "a two week, one-way migration window"; Lituus-CS forking isn't built), which "Check actively"
    // leaves out.
    title: 'Holding REP?',
    points: [
      { lead: 'Utility:', text: 'Use REP to earn from participating in the oracle.' },
      { lead: 'Non-Passivity:', text: 'Check actively for forks or risk losing the token.' },
    ],
  },
} as const;
