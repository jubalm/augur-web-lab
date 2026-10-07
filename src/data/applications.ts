import { walkthrough } from './walkthrough';

/** Approved copy: Homepage 28:7; state geometry and copy: 139:258.
 * Polish pass (5 Oct 2026): a Phosphor Bold icon per application and a
 * one-line explanation for every state. Examples stay illustrative.
 * Insurance carries the fallback use (owner, 6 Oct 2026): one app's choice, so it
 * never reads as Augur Lituus's only use. Proposed; awaits the maintainers. */
export const applications = [
  { id: 'prediction', icon: 'chart-line-up', title: 'Prediction markets', question: 'Was the milestone demonstrated by the deadline?', action: 'Settle a market.', result: 'Market result', explanation: 'Settle positions on the final answer.' },
  { id: 'insurance', icon: 'shield-check', title: 'Insurance & payments', question: 'Was flight AB123 more than two hours late?', action: 'Pay insurance claims.', result: 'Flight-delay insurance', explanation: 'Pay claims according to the policy.', fallback: 'The app could also use a faster oracle on its own chain or L2, and turn to Augur Lituus only when a claim is disputed.' },
  { id: 'grants', icon: 'users-three', title: 'DAOs & grants', question: 'Which team shipped a working prototype first?', action: 'Award a grant.', result: 'Prize challenge', explanation: 'Pay the prize to the team that got there first.' },
] as const;

/** DAOs & grants is a prize challenge (owner, 6 Oct 2026; was “Was the promised
 * work published on time?”): the answer is one of several teams, not yes or no.
 * Illustrative teams; the card names the winner in its caption. */
export const prizeChallenge = { teams: ['Team A', 'Team B', 'Team C'], winner: 'Team B' } as const;

/** Prediction markets shows a small query (owner, 6 Oct 2026: the Yes/No
 * result "doesn't really indicate much"). Each stage carries the status the
 * card shows once it is reached, in the walkthrough's words; the card renders
 * the last stage, and the earlier ones play in when the panel opens. Stage
 * labels and the Invalid outcome are new copy awaiting owner approval
 * (launch-checklist.md). Illustrative: no amounts, dates or durations. */
export const marketQuery = {
  stages: [
    { label: 'Asked', status: walkthrough[0].status },
    { label: 'Reported Yes', status: walkthrough[1].status },
    { label: 'Not challenged', status: walkthrough[1].status },
    { label: 'Final', status: walkthrough[3].status },
  ],
  outcomes: ['Yes', 'No', 'Invalid'],
  answer: 'Yes',
} as const;
