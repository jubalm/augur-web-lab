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
import v2OnlyStyle from '../../styles/home-v2-only.css?inline';
import v3Style from '../../styles/home-v3.css?inline';
import v4Style from '../../styles/home-v4.css?inline';
import howScript from './how-it-works-v2.js?raw';
import tipsScript from './tenet-tips-v3.js?raw';
import headerScript from './header-v2.js?raw';
import tenetsIsoScript from './tenets-iso-v2.js?raw';
import flockScript from './hero-flock-v2.js?raw';
import videoScript from './hero-video-v2.js?raw';
import floorScript from './hero-floor-v2.js?raw';
import {flockMotion} from '../../data/hero-flock';
import {twoRoads} from '../../data/two-roads';
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
// v2 alone adds its own sheet (home-v2-only.css: the owner's suggestions from 22 Oct 2026, such as the
// icon trial and the header logo exception), so /3/ and /4/ keep the shipped icons and logo. An empty
// sheet renders nothing. A script only one version renders goes in that version's
// `scripts` as well, so its page hashes it. v2's `header` hides the header on the way down and brings it
// back on the way up (SiteHeader.astro renders it after the header on /2/); its `tenets` plays the isometric
// Why Augur scenes, with Two roads' keyframes from two-roads.ts written in (Tenets.astro renders it after the
// section on /2/); its `flock` plays the hero's lituus
// flock, with the keys from hero-flock.ts written in (Hero.astro renders it after the hero on /2/); its
// `floor` draws the hero's live floor and `video` plays its generated loop, from 1024 px (Hero.astro renders
// the one its `layer` picks after the flock's).
// v3's `tips` adds hover and focus to the Why Augur "?" toggletips (Tenets.astro renders it after the
// section).
type Inline = { styles: string[]; scripts: Record<string, string> };
export const reviewInline: Record<ReviewVariant, Inline> = {
  v2: { styles: [v2Style, v2OnlyStyle].filter(Boolean), scripts: { ...reviewScripts, header: compact(headerScript), tenets: compact(tenetsIsoScript).replace('__ROADS__', JSON.stringify(twoRoads.tracks)), flock: compact(flockScript).replace('__FLOCK__', JSON.stringify(flockMotion)), video: compact(videoScript), floor: compact(floorScript) } },
  v3: { styles: [v2Style, v3Style].filter(Boolean), scripts: { ...reviewScripts, tips: compact(tipsScript) } },
  v4: { styles: [v2Style, v4Style].filter(Boolean), scripts: { ...reviewScripts } },
};
