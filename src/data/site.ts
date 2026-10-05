export const site = {
  name: 'Augur',
  description: 'Real-world answers for onchain apps, controlled by no one.',
  announcement: { enabled: true, until: null as string | null },
  newsletter: { provider: null as string | null },
} as const;
export const indexable = import.meta.env.PUBLIC_SITE_INDEXABLE === 'true';
