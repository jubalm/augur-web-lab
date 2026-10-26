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
import useCasesScript from './use-cases-v2.js?raw';
import howPathScript from './how-path-v2.js?raw';
import {flockMotion} from '../../data/hero-flock';
import {isoTracks} from '../../data/tenets-iso';
import {howActs} from '../../data/how-scenes';
import {easing,useCaseTimeline,howPathTimeline} from '../../motion/timelines';
// Comment lines and indentation are dropped; the line breaks stay, so the script parses as written.
const compact = (js: string) => js.replace(/^\s*\/\/.*\n/gm, '').replace(/^[ \t]+/gm, '').trim();
export const switchInline = { style: switchStyle, script: compact(switchScript) };
// Scripts of the shared v2 UI system, which every review version from v2 on renders, each right after
// its markup with <script is:inline set:html={reviewScripts.name}></script>.
// `how` opens and closes the How it works example (HowItWorks.astro renders it after the section).
export const reviewScripts = { how: compact(howScript) } as Record<string, string>;
// Per version: its stylesheets in order, and every script its page renders (for the page's CSP).
// The sheets render before the announcement bar, so their rules follow the page's own and win ties.
// Every version loads the review UI (owner, 26 Oct 2026: every version shares v2's motion and structure):
// home-v2.css, then home-v2-only.css (the owner's design: icons, header logo, scenes, cards, steps), and
// the scripts below. The reviewers' versions add their own sheet last (every rule under .home-v3, or under
// .home-v4 and .home-v5, the classes pageClass() adds): Ryan's (v3) for his hero links and "?" tips, and
// one for Augus's verbatim words, which Ryan + Augus (v4) and Augus (v5) both use. An empty sheet renders
// nothing. A script only one version renders goes in that version's `scripts` as well, so its page
// hashes it. `header` hides the header on the way down and brings it back on the way up (SiteHeader.astro
// renders it after the header); `tenets` plays the isometric Why Augur scenes, with every scene's
// keyframes from tenets-iso.ts written in (Tenets.astro renders it after the section); `flock` plays the
// hero's lituus flock, with the keys from hero-flock.ts written in (Hero.astro renders it after the hero);
// `floor` draws the hero's live floor and `video` plays its generated loop, from 1024 px (Hero.astro
// renders the one its `layer` picks after the flock's); `useCases` plays the use cases' product cards,
// with the timings from timelines.ts written in (Applications.astro renders it after the section);
// `howPath` adds hover to How it works' four steps and plays its stage, with how-scenes.ts's acts written
// in, and opens its example (HowItWorks.astro renders it after the section, in place of `how`).
// Ryan's `tips` adds hover and focus to the Why Augur "?" toggletips (Tenets.astro renders it after the
// section). The components embed the shared scripts as reviewInline.v2's strings, which are the same
// strings every version lists, so each page's hashes match.
type Inline = { styles: string[]; scripts: Record<string, string> };
const ui = { styles: [v2Style, v2OnlyStyle], scripts: { ...reviewScripts, header: compact(headerScript), tenets: compact(tenetsIsoScript).replace('__SCENES__', JSON.stringify(isoTracks)), flock: compact(flockScript).replace('__FLOCK__', JSON.stringify(flockMotion)), video: compact(videoScript), floor: compact(floorScript), useCases: compact(useCasesScript).replace('__USE_CASES__', JSON.stringify({ easing, timeline: useCaseTimeline })), howPath: compact(howPathScript).replace('__HOW_PATH__', JSON.stringify({ easing, timeline: howPathTimeline, acts: howActs })) } };
export const reviewInline: Record<ReviewVariant, Inline> = {
  v2: { styles: ui.styles.filter(Boolean), scripts: ui.scripts },
  v3: { styles: [...ui.styles, v3Style].filter(Boolean), scripts: { ...ui.scripts, tips: compact(tipsScript) } },
  v4: { styles: [...ui.styles, v4Style].filter(Boolean), scripts: ui.scripts },
  v5: { styles: [...ui.styles, v4Style].filter(Boolean), scripts: ui.scripts },
};
