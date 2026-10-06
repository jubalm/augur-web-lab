/** Motion source: Figma 121:152 and 250:717; owner brief §8; polish brief
 * (5 Oct 2026) for the looping tenet diagrams, answer ribbon and hero ambience.
 * Timings are milliseconds. */
export const easing = {
  reveal: 'cubic-bezier(.22,.61,.36,1)', hero: 'cubic-bezier(.22,.7,.22,1)',
  draw: 'cubic-bezier(.45,0,.2,1)', crossfade: 'cubic-bezier(.45,0,.55,1)',
  newcomer: 'cubic-bezier(.45,1.45,.8,1)',
} as const;
export const timing = { hover:180, fadeOut:160, panel:320, longPanel:850, stagger:110 } as const;
export const heroTimeline = {
  lines: [{start:0,end:700},{start:100,end:800},{start:200,end:900}],
  copy: {start:400,end:900}, actions:{start:650,end:950},
  underline:{start:750,end:1320,fadeStart:1800,fadeEnd:2250},
  field:{start:500,end:2100}, rings:[600,500,400,300,200,100,0],
  squareMove:1200,squareFade:800,orbit:{start:1100,end:1700},centre:{start:1750,end:2300},
} as const;
/** Hero ambience after arrival: a slow ring-by-ring draw towards the empty
 * centre, a dash step on the centre, and a long drift of the background squares. */
export const heroAmbient = { cycle: 8000, resume: 600, ringStagger: 180, ringRadius: 42, fieldDrift: 24000,
  wave: { start: 160, peak: 640, end: 1280, scale: .975 }, centre: { start: 1360, dim: 1760, end: 2400 } } as const;
/** Continuous tenet loops (owner feedback, 5 Oct 2026: "always moving", no
 * start-stop-wait). Every track opens and closes on the static diagram and the
 * tracks overlap, so something is in motion whenever a diagram is on screen.
 * Times are milliseconds on each element's own cycle; `stagger` offsets the
 * copies (delay = index × stagger) without changing the cycle. */
export const tenetLoop = {
  cross: { cycle: 4000, stagger: 1000, fadeOut: 300, enter: 500, move: 700, fadeIn: 160, trail: { far: 120, near: 220, fade: 220 } },
  mesh: { travel: 450, dwell: 200, light: { lead: 100, rise: 200, hold: 100, fall: 400 }, link: { rise: 150, fall: 350 } },
  authority: { cycle: 3600, stagger: 1200, travel: 2400, fadeIn: 120, fadeOut: 160, distance: 274, send: 260, receive: 420 },
} as const;
/** One-time answer ribbon: a Green band sweeps under the statement. */
export const ribbonTimeline = { threshold: .6, duration: 900, edgeFade: 180 } as const;
export const bondTimeline = [{start:300,end:900,offset:16},{start:500,end:1100,offset:32},{start:700,end:1300,offset:64},{start:900,end:1500,offset:128}] as const;
/** REP stake flows: line draws, bond travels to the outcome, winnings appear. */
export const repTimeline = { rowStagger:160, line:{start:0,duration:400}, condition:{start:150,duration:250}, travel:{start:300,duration:520}, gain:{start:780,duration:320}, lost:{start:700,duration:300,fade:200} } as const;
export const roadmapTimeline = {track:1000,stopStagger:110,stopDuration:320,evidence:850} as const;
export const applicationTimeline = { signalFade:100, signalTravel:800, signalDistance:60, backstop:250 } as const;
/** FAQ: the question box eases to its new height over `transition`; the toggle,
 * Green edge and answer text follow over `panel`, the answer lines `stagger` apart. */
export const faqTimeline = { transition:380, panel:timing.panel, stagger:50 } as const;
