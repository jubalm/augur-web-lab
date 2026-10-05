/** Motion source: Figma 121:152 and 250:717; owner brief §8.
 * Timings are milliseconds. Figma preview loops; production is finite. */
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
export const tenetTimeline = {
  duration:6200, answer:{start:50,fade:500,rise:550}, edge:{start:400,duration:350},
  participant:{starts:[650,850,450,770,610,530,690,890,490,810,730,570],duration:320,fade:200}, crosser:{starts:[950,1150,1350,1550],duration:500,fade:150}, trails:[1070,1150,1270,1350,1470,1550,1670,1750],
  mesh:{squares:[750,600,950,850,500,700,450,1000,900,550,800,650],links:[950,950,1150,900,1150,1050,1200,900,1100,750,1000,1000,1200,1100,1000,1000],linkDuration:400,
    highlightStart:1750,hop:550,fadeIn:350,hold:200,fadeOut:400},
  authority:{participants:[450,600,500,650,550],lines:[800,860,860,920,920,980],lineDuration:350,dots:[1050,1110,1170],dotDuration:300,
    signalStart:1400,signalStagger:150,signalDuration:900,resultStart:2550,resultDuration:300},
} as const;
export const bondTimeline = [{start:300,end:900,offset:16},{start:500,end:1100,offset:32},{start:700,end:1300,offset:64},{start:900,end:1500,offset:128}] as const;
export const repTimeline = { rowStagger:110, stake:{start:0,duration:320},arrow:{start:240,duration:320},returned:{start:460,duration:520},plus:{start:700,duration:180},win:{start:850,duration:320} } as const;
export const roadmapTimeline = {track:1000,stopStagger:110,stopDuration:320,evidence:850} as const;
export const applicationTimeline = { signalFade:100, signalTravel:800, signalDistance:60, backstop:250 } as const;
export const faqTimeline = { panel:timing.panel, stagger:50 } as const;
