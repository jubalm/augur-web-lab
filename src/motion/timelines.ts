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
export const bondTimeline = [{start:300,end:900,offset:16},{start:500,end:1100,offset:32},{start:700,end:1300,offset:64},{start:900,end:1500,offset:128}] as const;
/** REP stake flows: line draws, bond travels to the outcome, winnings appear. */
export const repTimeline = { rowStagger:160, line:{start:0,duration:400}, condition:{start:150,duration:250}, travel:{start:300,duration:520}, gain:{start:780,duration:320}, lost:{start:700,duration:300,fade:200} } as const;
export const roadmapTimeline = {track:1000,stopStagger:110,stopDuration:320,evidence:850} as const;
export const applicationTimeline = { signalFade:100, signalTravel:800, signalDistance:60, oracle:250 } as const;
/** Prediction markets query (owner, 6 Oct 2026): each stage starts at `stages[i]`;
 * its line draws over `draw`, the status hands over in `fade`, the answer's check
 * pops in over `check`; the signal leaves for the Augur Lituus band `signal` after Final. */
export const marketQueryTimeline = { stages:[0,600,1300,2000], draw:400, fade:200, check:320, label:.4, signal:200, threshold:.6 } as const;
/** Insurance (owner, 6 Oct 2026: subtle motion): `delay` after the tab's fade (as the
 * incoming panel lands), the
 * arrival marker leaves the scheduled-arrival tick and slides to the actual arrival
 * over `travel`, the delay line growing behind it; the summary brightens from `label`
 * as the marker passes +2 hours; the signal leaves `signal` after it lands. */
export const flightTimeline = { delay:320, travel:900, fade:200, label:.4, signal:200 } as const;
/** DAOs & grants (owner, 6 Oct 2026: subtle motion): Team B shows as a plain tile
 * until `win` (a beat after the panel lands), then turns Green over `fade` as its check pops in over `check`; the
 * caption rises in `caption` later; the signal leaves `signal` after it. */
export const prizeTimeline = { win:600, fade:240, check:320, caption:360, signal:200 } as const;
/** FAQ: the question box eases to its new height over `transition`; the toggle,
 * Green edge and answer text follow over `panel`, the answer lines `stagger` apart. */
export const faqTimeline = { transition:380, panel:timing.panel, stagger:50 } as const;
