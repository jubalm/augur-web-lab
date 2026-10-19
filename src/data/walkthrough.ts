/** How it works: one walkthrough of taking part, from a question opening to getting
 * paid (owner + Augus, 19 Oct 2026). Resolution / Walkthrough 146:470 was read on
 * 5 October 2026; the REP rows that were section 07 now live in each step's “Your REP”
 * zone. Mechanism facts: January 2026 Augur Lituus whitepaper §2, §4.0.1–4.0.2,
 * §4.1, §4.3.1, §4.4.2–4.4.3 and §4.5 (docs/decisions.md). Draft copy: every string
 * below awaits the owner's approval (docs/launch-checklist.md). */
export const walkthroughReview = { needsReview: true, source: 'Draft copy, 19 October 2026; January 2026 Augur Lituus whitepaper.' } as const;

export const query = {
  question: 'Has room-temperature superconductivity been independently demonstrated at ambient pressure?',
  cutoff: 'Evidence cutoff · 8 Sep 2027, 00:00 UTC',
  cutoffDate: '8 Sep 2027, 00:00 UTC',
  // Expanded criteria restate the card's own facts plus the FAQ's sourced
  // definition of Invalid; no scientific resolution requirements are invented.
  outcomes: 'YES, NO or Invalid. Invalid covers malformed or unresolvable questions.',
};

/** Illustrative amounts, one source for the card. The first report's bond equals
 * the fee (§2, §4.1); a challenge doubles it; winners receive 80% of the losing
 * bond (§4.3.1, “most” in visible copy) and the other 20% is burned. */
const fee = 15, bond = fee, challenge = bond * 2, share = bond * 4 / 5, burned = bond - share;
export const rep = { fee, bond, challenge, share, burned } as const;
const amount = (value: number) => `${value} REP`;

/** A square in the zone: a bond (Pewter, one 32 px square per bond), what you gain
 * (Green: “most of theirs” is 80% of a bond's area, the reward a smaller square), or
 * a lost bond (outlined). */
export type Square = 'bond' | 'share' | 'reward' | 'lost';
/** `amount` is a REP tag; `detail` is a plain line in its place. */
export interface Group { squares: Square[]; caption: string; amount?: string; detail?: string }
export type Zone =
  | { kind: 'meter'; label: string; cap: string; scale: readonly [string, string]; caption: string; note: string }
  | { kind: 'flow'; label: string; summary: string; stake: Group; condition: string; outcome: Group[]; note?: string }
  | { kind: 'receipt'; label: string; summary: string; outcome: Group[]; note?: string };

const reward: Group = { squares: ['reward'], caption: 'Reward' };
export const walkthrough: readonly {
  title: string; description: string; status: string; state: 'pending' | 'active' | 'final';
  answerLabel: string; outcome: 'YES' | 'NO' | null; replaced?: 'YES'; zone: Zone;
}[] = [
  { title: 'A question opens', description: 'Any app can ask a multiple-choice question and pay a fee in REP. Part of that fee rewards whoever reports the right answer, and the reward grows the longer the question waits.',
    status: 'Awaiting report', state: 'pending', answerLabel: 'Possible outcomes', outcome: null,
    zone: { kind: 'meter', label: 'Reward offered', cap: `Up to ${amount(fee)}`, scale: ['0 REP', amount(fee)], caption: 'Starts at 0 REP and rises until someone reports.',
      note: 'It goes to whoever first reports the answer that becomes final.' } },
  { title: 'Report what happened', description: 'Stake REP equal to the fee on the outcome you saw. If no one challenges it, your bond comes back with the reward.',
    status: 'Open to challenge', state: 'active', answerLabel: 'Current answer · open to challenge', outcome: 'YES',
    zone: { kind: 'flow', label: 'If you report', summary: `If you report: stake ${amount(bond)}; if no one challenges, you get ${amount(bond)} back plus the reward.`,
      stake: { squares: ['bond'], caption: 'Your bond', amount: amount(bond) }, condition: 'No challenge',
      outcome: [{ squares: ['bond'], caption: 'Bond back', amount: amount(bond) }, reward] } },
  { title: 'Challenge a wrong answer', description: 'Think a report is wrong? Stake double its bond on the right outcome. Each challenge doubles the bond again and restarts the appeal period.',
    status: 'Challenge received', state: 'active', answerLabel: 'Current answer · new appeal period', outcome: 'NO', replaced: 'YES',
    zone: { kind: 'flow', label: 'You challenge', summary: `You challenge: stake ${amount(challenge)}; if your answer holds, you get ${amount(challenge)} back plus ${amount(share)}, most of the bond you challenged.`,
      stake: { squares: ['bond', 'bond'], caption: 'Double bond', amount: amount(challenge) }, condition: 'Your answer holds',
      outcome: [{ squares: ['bond', 'bond'], caption: 'Bond back', amount: amount(challenge) }, { squares: ['share'], caption: 'Most of theirs', amount: amount(share) }],
      note: "If you're overturned, you lose the bond. Most of it goes to whoever was right." } },
  { title: "Get paid when it's final", description: 'When an appeal period ends without a new challenge, the latest answer is final. Winners are paid, and apps act on the answer.',
    status: 'Final answer', state: 'final', answerLabel: 'Final answer · appeal period ended', outcome: 'NO', replaced: 'YES',
    zone: { kind: 'receipt', label: 'You receive', summary: `You receive: your ${amount(challenge)} bond back, ${amount(share)} from the losing bond, and the reward, because you were first to back No.`,
      outcome: [{ squares: ['bond', 'bond'], caption: 'Bond back', amount: amount(challenge) }, { squares: ['share'], caption: 'From the Yes bond', amount: amount(share) }, { ...reward, detail: 'First to back No' }],
      note: `The other ${amount(burned)} is burned.` } },
];

/** Activity rows. Each icon names what happened to the REP: a fee paid, a bond
 * locked, the answer made final (Phosphor Bold, see docs/icon-provenance.json).
 * The zone is the payoff; Activity is the history. */
export const ledger = [
  { event: 'Query opened · fee paid', amount: amount(fee), icon: 'coins' },
  // The challenge replaces this report: from step 2 the card strikes it through.
  { event: 'Reported Yes · bond locked', amount: amount(bond), icon: 'lock-simple', replacedAt: 2 },
  { event: 'You challenged with No · bond locked', amount: amount(challenge), icon: 'lock-simple' },
  { event: 'Appeal period ended · No is final', amount: '', icon: 'seal-check' },
] as const;

/** For anyone holding REP, under the walkthrough. */
export const holder = {
  title: 'Holding REP?',
  text: 'You never have to report or challenge. If a dispute ever climbs to a fork, holders choose the universe they believe reflects reality.',
};
