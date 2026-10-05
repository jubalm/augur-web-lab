/** Approved copy: Homepage 28:7; state geometry and copy: 139:258. */
export const applications = [
  { id: 'prediction', title: 'Prediction markets', question: 'Was the milestone demonstrated by the deadline?', action: 'Settle a market.', result: 'Market result' },
  { id: 'insurance', title: 'Insurance & payments', question: 'Was flight AB123 more than two hours late?', action: 'Pay insurance claims.', result: 'Flight-delay insurance', explanation: 'Pay claims according to the policy.' },
  { id: 'grants', title: 'DAOs & grants', question: 'Was the promised work published on time?', action: 'Release grant funding.', result: 'Grant progress', explanation: 'Release funds when the grant terms are met.' },
] as const;
