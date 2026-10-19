/** Motion source: Figma 121:152 and 250:717; owner brief §8; polish brief
 * (5 Oct 2026) for the looping tenet diagrams, answer ribbon and hero ambience.
 * Timings are milliseconds. */
export const easing = {
  reveal: 'cubic-bezier(.22,.61,.36,1)', hero: 'cubic-bezier(.22,.7,.22,1)',
  draw: 'cubic-bezier(.45,0,.2,1)', crossfade: 'cubic-bezier(.45,0,.55,1)',
  newcomer: 'cubic-bezier(.45,1.45,.8,1)',
} as const;
export const timing = { hover:180, fadeOut:160, panel:320, longPanel:850, stagger:110 } as const;
/** The moment, as a fraction of the duration, at which a cubic-bezier easing
 * whose output rises steadily reaches `progress`. */
export function timeAt(curve:string,progress:number){
 const [x1=0,y1=0,x2=1,y2=1]=(curve.match(/-?[\d.]+/g)??[]).map(Number);
 const at=(a:number,b:number,s:number)=>3*(1-s)**2*s*a+3*(1-s)*s**2*b+s**3;
 let low=0,high=1;
 for(let step=0;step<24;step++){const mid=(low+high)/2;if(at(y1,y2,mid)<progress)low=mid;else high=mid;}
 return at(x1,x2,(low+high)/2);
}
export const heroTimeline = {
  lines: [{start:0,end:700},{start:100,end:800},{start:200,end:900}],
  copy: {start:400,end:900}, actions:{start:650,end:950},
  underline:{start:750,end:1320}, underlineOut:{start:2200,end:2700}, underlineHover:320,
  /** Scroll cue: fades in once the underline has gone, then loops until the page scrolls. */
  scrollCue:{start:2400,end:2800,cycle:2400},
  field:{start:500,end:2100}, rings:[600,500,400,300,200,100,0],
  squareMove:1200,squareFade:800,orbit:{start:1100,end:1700},centre:{start:1750,end:2300},
} as const;
/** Hero ambience after arrival lives in hero-choreography.ts (one source for
 * the website and the Figma keyframes). */
/** The tenet diagram loops live in tenet-choreography.ts (one source for the
 * website and the Figma keyframes). */
/** One-time answer ribbon: a Green band sweeps under the statement. */
/** Each word of the statement rises `rise` em into place, in Navy, as the
 * ribbon's front reaches it (owner, 6 Oct 2026: the text should move too). */
export const ribbonTimeline = { threshold: .6, duration: 900, edgeFade: 180, word: { duration: 420, rise: .45 } } as const;
export const roadmapTimeline = {track:1000,stopStagger:110,stopDuration:320,evidence:850} as const;
/** Use cases (owner, 18–19 Oct 2026): from the moment a case shows, its two answers rise in from `options`
 * over `fade`; at `decide` the picked one fills Green over `pop` (its check `check` later) and the other
 * steps back over `fade`; the action, its explanation and any note rise from `act`, `stagger` apart.
 * Prediction markets first plays once `threshold` of it is in view. */
export const applicationTimeline = { options:0, fade:320, decide:520, pop:320, check:120, act:760, stagger:80, threshold:.6 } as const;
/** Sitewide field (owner, 19 Oct 2026): cells within `margin` px of text or an object stay empty; full-width
 * bands darker than `bandLuminance` count as background. A `density` share of the rest hold a 3 px square,
 * `green` of them Green, in `steps` opacity steps across `paperOpacity` / `greenOpacity`; redrawn `debounce`
 * ms after a size change. Trail: `pool` squares of `size` px, every `greenEvery`th Green, growing from `from`
 * to full by `rise` of `fade` and peaking at `greenPeak` / `paperPeak`. */
export const fieldTimeline = { margin:12, bandLuminance:.06, density:.22, green:.18, steps:4, paperOpacity:[.05,.12], greenOpacity:[.12,.26], debounce:200, pool:24, greenEvery:3, size:5, from:.4, rise:.18, fade:800, greenPeak:.5, paperPeak:.22 } as const;
/** Case graphics (owner, 19 Oct 2026): from `start` after a case shows (once its answer is picked).
 * Market: the cover reveals the prices over `reveal`, then the side labels rise, `stagger` × 2 apart.
 * Flight: the arrival travels over `travel`; once it is `passes` of the way the insured seats fill, each
 * cabin row `wave` after the one in front. Gate: the proposal travels over `travel`, then nudges
 * the gate over `bump`; then the later lane runs to Live over `later`. */
export const caseGraphicTimeline = { start:940, pop:320, stagger:45, market:{reveal:900}, flight:{travel:1000, passes:.92, wave:18}, gate:{travel:900, bump:280, later:1100} } as const;
/** FAQ: the question box eases to its new height over `transition`; the toggle,
 * Green edge and answer text follow over `panel`, the answer lines `stagger` apart. */
export const faqTimeline = { transition:380, panel:timing.panel, stagger:50 } as const;
