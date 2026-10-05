/** External destinations. Reachability was checked with HTTP GET on 2026-10-05.
 * verified means reachable, not a claim of protocol readiness or inbox ownership.
 * Keep all external hrefs here; callers may add encoded query parameters.
 */
export interface ExternalLink { url: string; verified: boolean; source: string }
export const links = {
  whitepaper: { url: "https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf", verified: true, source: "Owner brief \u00a71; January 2026 Augur Lituus whitepaper." },
  lituusCode: { url: "https://github.com/AugurProject/Lituus-CS", verified: true, source: "Q2 2026 report, implementation source." },
  zoltarCode: { url: "https://github.com/AugurProject/zoltar", verified: true, source: "Owner brief \u00a711; public Zoltar and Augur Statoblast repository." },
  github: { url: "https://github.com/AugurProject/", verified: true, source: "Official Augur archive footer." },
  mission: { url: "https://www.augur.net/mission/", verified: true, source: "Owner brief \u00a711; current Augur mission." },
  archive: { url: "https://www.augur.net/blog/", verified: true, source: "Official Augur blog; 16 posts observed on 5 October 2026." },
  testingPastFuture: { url: "https://www.augur.net/blog/augur-testing-past-building-future/", verified: true, source: "Augur blog, 21 July 2026." },
  discord: { url: "https://discord.gg/Y3tCZsSmz3", verified: true, source: "Owner brief \u00a711 and official Augur footer; HTTP redirects to discord.com/invite/Y3tCZsSmz3. Reachability does not prove invitation membership." },
  telegram: { url: "https://t.me/augurlituus", verified: true, source: "Owner brief \u00a711 and official Augur footer." },
  x: { url: "https://x.com/AugurProject", verified: true, source: "Owner brief \u00a711 and official Augur footer." },
  foundation: { url: "https://lituus.foundation/", verified: true, source: "Official Augur footer." },
  moonFork: { url: "https://www.augur.net/blog/post-fork-announcements/", verified: true, source: "Official Augur blog, The Augur Moon Fork Is Complete, 5 August 2026." },
  q2Report: { url: "https://www.augur.net/blog/q2-2026-progress-report/", verified: true, source: "Official Augur blog, Q2 2026: The Fork and What Comes Next, 1 October 2026." },
  reboot: { url: "https://www.augur.net/blog/augur-reboot-2025/", verified: true, source: "Official Augur blog, Augur Reboot 2025 Roadmap, 1 April 2025." },
  generalized: { url: "https://www.augur.net/blog/generalized-augur/", verified: true, source: "Official Augur blog, Generalized Augur, 13 May 2025." },
  darkFlorist: { url: "https://github.com/darkflorist", verified: true, source: "Official Augur archive footer links GitHub organization darkflorist." },
  chainSafe: { url: "https://chainsafe.io/", verified: true, source: "Official ChainSafe homepage; involvement sourced from Q2 report." },
  zoltarPaper: { url: "https://github.com/AugurProject/zoltar/blob/main/docs/explanation/zoltar.html", verified: true, source: "Current Zoltar system overview; successor to older local whitepaper. Exact paper destination requires maintainer confirmation." },
  xShare: { url: "https://x.com/intent/tweet", verified: true, source: "X share intent endpoint; HTTP 200." },
  contact: { url: "mailto:contact@augur.net", verified: false, source: "Owner brief and Figma footer. Domain owner must confirm this inbox." },
} as const satisfies Record<string, ExternalLink>;

export type LinkKey = keyof typeof links;
