/** The homepage's review versions (owner, 21 Oct 2026): which versions exist, and the copy each reads.
 * "/" is the live homepage and renders v1 with no props. src/pages/[version].astro renders the four
 * review copies from `reviewVersions`, and the version switch lists the same four:
 * - /1/ v1: the homepage as it is, frozen (its copy stays in the components, literal).
 * - /2/ v2: Ryan's notes as Augus marked them, with fact checks and wording fixes (homepage-v2.ts).
 * - /3/ v3: Ryan's 17 notes only, literal (homepage-v3.ts).
 * - /4/ v4: Augus's marks literal (homepage-v4.ts).
 * v2, v3 and v4 share one UI system (the v2 markup, home-v2.css and its rhythm tokens), so the
 * comparison is about content and structure, not polish. A component branches on the family: it asks
 * `homeCopy(variant)` and renders the review markup when that returns a copy (every version but v1),
 * v1's literal markup otherwise, so "/" and /1/ stay byte-identical. A field only some versions have
 * (v3's intent split, v2's and v4's builder block) is tested where it is read: `'field' in copy.section`.
 * `pageClass` gives <main> its classes: v3 and v4 keep "home-v2" and add their own, which their own
 * sheets (home-v3.css, home-v4.css) prefix every rule with. */
import {homeV2} from './homepage-v2';
import {homeV3} from './homepage-v3';
import {homeV4} from './homepage-v4';

export type HomeVariant = 'v1' | 'v2' | 'v3' | 'v4';
export type ReviewVariant = Exclude<HomeVariant, 'v1'>;

// One list for the route's getStaticPaths and the switch's links, in the switch's order.
export const reviewVersions = [
  { version: '1', variant: 'v1' },
  { version: '2', variant: 'v2' },
  { version: '3', variant: 'v3' },
  { version: '4', variant: 'v4' },
] as const;
export type ReviewVersion = (typeof reviewVersions)[number]['version'];
/** Every path that renders the homepage: "/" and each review copy, from the list above, so a version
 * added or removed there needs no second edit. BaseLayout hashes the hero's arrival script into these
 * pages' CSP; scripts/check-links.ts checks that vercel.json redirects each copy's slashless path. */
export const homePaths: readonly string[] = ['/', ...reviewVersions.map(({ version }) => `/${version}/`)];

const copies = { v1: undefined, v2: homeV2, v3: homeV3, v4: homeV4 } as const;
/** The version's copy, or undefined for v1 (which keeps its copy in the components). */
export const homeCopy = (variant: HomeVariant) => copies[variant];

const classes = { v1: undefined, v2: 'home-v2', v3: 'home-v2 home-v3', v4: 'home-v2 home-v4' } as const;
/** <main>'s class: none on "/" and /1/, so v1's markup is unchanged. */
export const pageClass = (variant: HomeVariant) => classes[variant];
