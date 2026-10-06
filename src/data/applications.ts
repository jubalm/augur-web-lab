/** Approved copy: Homepage 28:7; state geometry and copy: 139:258.
 * Polish pass (5 Oct 2026): a Phosphor Bold icon per application and a
 * one-line explanation for every state. Examples stay illustrative. */
export const applications = [
  { id: 'prediction', icon: 'chart-line-up', title: 'Prediction markets', question: 'Was the milestone demonstrated by the deadline?', action: 'Settle a market.', result: 'Market result', explanation: 'Settle positions on the final answer.' },
  { id: 'insurance', icon: 'shield-check', title: 'Insurance & payments', question: 'Was flight AB123 more than two hours late?', action: 'Pay insurance claims.', result: 'Flight-delay insurance', explanation: 'Pay claims according to the policy.' },
  { id: 'grants', icon: 'users-three', title: 'DAOs & grants', question: 'Was the promised work published on time?', action: 'Release grant funding.', result: 'Grant progress', explanation: 'Release funds when the grant terms are met.' },
] as const;
