// Every inline <style> and <script> that only the homepage review copies (/1/ to /4/) render (owner,
// 21 Oct 2026). Astro writes one CSP hash list for the whole build into every page, so a component
// <style>, a stylesheet import or a small processed <script> on a review copy would add its hash to "/"
// as well. These are imported as strings instead (?inline is processed and minified CSS, ?raw is the
// file as written) and rendered is:inline; [version].astro hashes each one into its own page only.
// Review components may import only components "/" already uses, and add no <style> or processed <script>.
import type {ReviewVariant} from '../../data/homepage-review';
import switchScript from './version-switch.js?raw';
import switchStyle from './version-switch.css?inline';
import v2Style from '../../styles/home-v2.css?inline';
import v3Style from '../../styles/home-v3.css?inline';
import v4Style from '../../styles/home-v4.css?inline';
import howScript from './how-it-works-v2.js?raw';
import tipsScript from './tenet-tips-v3.js?raw';
// Comment lines and indentation are dropped; the line breaks stay, so the script parses as written.
const compact = (js: string) => js.replace(/^\s*\/\/.*\n/gm, '').replace(/^[ \t]+/gm, '').trim();
export const switchInline = { style: switchStyle, script: compact(switchScript) };
// Scripts of the shared v2 UI system, which every review version from v2 on renders, each right after
// its markup with <script is:inline set:html={reviewScripts.name}></script>.
// `how` opens and closes the How it works example (HowItWorks.astro renders it after the section).
export const reviewScripts = { how: compact(howScript) } as Record<string, string>;
// Per version: its stylesheets in order, and every script its page renders (for the page's CSP).
// The sheets render before the announcement bar, so their rules follow the page's own and win ties.
// v3 and v4 add their own sheet after v2's (every rule under .home-v3 or .home-v4, the class
// pageClass() adds), so /2/ never loads a v3 or v4 rule and /3/ and /4/ never load each other's.
// An empty sheet renders nothing. A script only one version renders goes in that version's
// `scripts` as well, so its page hashes it.
// v3's `tips` adds hover and focus to the Why Augur "?" toggletips (Tenets.astro renders it after the
// section).
type Inline = { styles: string[]; scripts: Record<string, string> };
export const reviewInline: Record<ReviewVariant, Inline> = {
  v2: { styles: [v2Style].filter(Boolean), scripts: { ...reviewScripts } },
  v3: { styles: [v2Style, v3Style].filter(Boolean), scripts: { ...reviewScripts, tips: compact(tipsScript) } },
  v4: { styles: [v2Style, v4Style].filter(Boolean), scripts: { ...reviewScripts } },
};
