import { links, type LinkKey } from './links';
import { products } from './products';

/** `logo` marks a community destination wherever it is listed; `icon` and
 * `description` only enrich the header panels. */
export type NavigationItem = { label: string; href: string; external?: boolean; linkKey?: LinkKey; icon?: string; logo?: string; description?: string };
const external = (label: string, linkKey: LinkKey, extra: Partial<NavigationItem> = {}): NavigationItem => ({ label, href: links[linkKey].url, external: true, linkKey, ...extra });
const tagline = (id: (typeof products)[number]['id']) => products.find(product => product.id === id)!.tagline;

/** Header and footer consume this same directory. */
export const navigation = {
  augur: [{ label: 'About', href: '/about/' }, { label: 'Contact', href: '/contact/' }],
  // Product taglines come from the products directory (Figma 219:81).
  products: [
    { label: 'Augur Lituus', href: '/products/#augur-lituus', description: tagline('augur-lituus') },
    { label: 'Zoltar', href: '/products/#zoltar', description: tagline('zoltar') },
    { label: 'Augur Stratoblast', href: '/products/#augur-stratoblast', description: tagline('augur-stratoblast') },
  ],
  resources: [
    { label: 'Blog', href: '/blog/', icon: 'newspaper' }, { label: 'FAQ', href: '/faq/', icon: 'question' },
    { label: 'Learn', href: '/learn/', icon: 'book-open' }, { label: 'REP', href: '/rep/', icon: 'coins' },
    external('Whitepaper', 'whitepaper', { icon: 'file-text' }),
  ],
  // Community logos identify each destination wherever it is listed (Figma 43:153).
  community: [external('Discord', 'discord', { logo: 'discord-logo' }), external('Telegram', 'telegram', { logo: 'telegram-logo' }), external('X', 'x', { logo: 'x-logo' }), external('GitHub', 'github', { logo: 'github-logo' })],
} satisfies Record<string, NavigationItem[]>;

export const navigationGroups = [
  { label: 'Augur', items: navigation.augur },
  { label: 'Products', items: navigation.products },
  { label: 'Resources', items: navigation.resources },
  { label: 'Community', items: navigation.community },
];
