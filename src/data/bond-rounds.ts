/** Resolution / Bond rounds 147:435. Heights match the 1440 reference. */
export const bondRounds = [
  { title: 'First report', description: 'A reporter proposes YES and locks 15 REP, equal to the query fee.', multiplier: '1×', amount: 15, outcome: 'YES', label: 'Report', height: 23 },
  { title: 'First challenge', description: 'A challenger proposes NO and locks 30 REP. A new appeal period begins.', multiplier: '2×', amount: 30, outcome: 'NO', label: 'Challenge', height: 45 },
  { title: 'Second challenge', description: 'Another challenger proposes YES with 60 REP, doubling the bond again.', multiplier: '4×', amount: 60, outcome: 'YES', label: 'Challenge 2', height: 90 },
  { title: 'Third challenge', description: 'A third challenge doubles the bond again, from 60 to 120 REP.', multiplier: '8×', amount: 120, outcome: 'NO', label: 'Challenge 3', height: 180 },
] as const;
