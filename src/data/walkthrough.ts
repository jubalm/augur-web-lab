/** Resolution / Walkthrough 146:470, read 5 October 2026. */
export const query = {
  question: 'Has room-temperature superconductivity been independently demonstrated at ambient pressure?',
  cutoff: 'Evidence cutoff · 8 Sep 2027, 00:00 UTC',
  cutoffDate: '8 Sep 2027, 00:00 UTC',
  // Expanded criteria restate the card's own facts plus the FAQ's sourced
  // definition of Invalid; no scientific resolution requirements are invented.
  outcomes: 'YES, NO or Invalid. Invalid covers malformed or unresolvable questions.',
};
export const walkthrough = [
  { title: 'Ask a question', description: 'Define what counts, when the question can be answered, and the possible outcomes. Pay a query fee in REP to request resolution.', status: 'Awaiting report', state: 'pending', answerLabel: 'Possible outcomes', outcome: null },
  { title: 'Report an outcome', description: 'A reporter proposes an outcome and locks REP as a bond: a stake they can lose. The first answer is tentative, with time for others to check it.', status: 'Open to challenge', state: 'active', answerLabel: 'Current answer · open to challenge', outcome: 'YES' },
  { title: 'Challenge if needed', description: 'Anyone can back a different outcome with a larger REP bond. A completed challenge opens another appeal period. Disagreement follows the same public rules.', status: 'Challenge received', state: 'active', answerLabel: 'Current answer · new appeal period', outcome: 'NO', replaced: 'YES' },
  { title: 'Use the final answer', description: 'When an appeal period ends without a new challenge, the latest outcome becomes final. Applications can use that answer under their own settlement rules.', status: 'Final answer', state: 'final', answerLabel: 'Final answer · appeal period ended', outcome: 'NO', replaced: 'YES' },
] as const;
export const ledger = [
  { event: 'Query opened · fee paid', amount: '15 REP' },
  // The challenge replaces this report: from step 2 the card strikes it through.
  { event: 'Reported Yes · bond locked', amount: '15 REP', replacedAt: 2 },
  { event: 'Challenged with No · bond locked', amount: '30 REP' },
  { event: 'Appeal period ended · No is final', amount: '' },
] as const;
