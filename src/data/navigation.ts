import { links, type LinkKey } from './links';

export type NavigationItem = { label: string; href: string; external?: boolean; linkKey?: LinkKey };
const external = (label: string, linkKey: LinkKey): NavigationItem => ({ label, href: links[linkKey].url, external: true, linkKey });

/** Header and footer consume this same directory. */
export const navigation = {
  augur: [{ label: 'About', href: '/about/' }, { label: 'Contact', href: '/contact/' }],
  products: [
    { label: 'Augur Lituus', href: '/products/#augur-lituus' },
    { label: 'Zoltar', href: '/products/#zoltar' },
    { label: 'Augur Stratoblast', href: '/products/#augur-stratoblast' },
  ],
  resources: [
    { label: 'Blog', href: '/blog/' }, { label: 'FAQ', href: '/faq/' },
    { label: 'Learn', href: '/learn/' }, { label: 'REP', href: '/rep/' },
    external('Whitepaper', 'whitepaper'),
  ],
  community: [external('Discord', 'discord'), external('Telegram', 'telegram'), external('X', 'x'), external('GitHub', 'github')],
} satisfies Record<string, NavigationItem[]>;

export const navigationGroups = [
  { label: 'Augur', items: navigation.augur },
  { label: 'Products', items: navigation.products },
  { label: 'Resources', items: navigation.resources },
  { label: 'Community', items: navigation.community },
];
