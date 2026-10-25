// The use cases' Folder on /2/ (owner, 24 Oct 2026; decisions.md, "Use cases as a Folder, on /2/"). The shared tabs
// controller (tabs.ts) switches the cases and fades their words; the tabs move in CSS (home-v2-only.css). This plays
// each case's picture the first time it opens in a tab session, Prediction markets' once the panel is 60% in view,
// as the section's play-once rule does on "/" (play-once.ts and seen.ts, under seen.ts's storage key): never on a
// reload or a history visit, read from the navigation type, and a case already seen shows its picture settled. On a
// switch the picture starts 360 ms in, as the words finish rising, and counts as seen only once it starts, so a case
// the reader arrows past keeps its first play. It pauses off-screen and in a hidden tab; a switch, interaction in the
// panel, resize, print, page hide or reduced motion settle it on the picture's final, server-rendered frame.
// Rendered inline after the section (review-inline.ts), and it imports nothing: a shared module would split a chunk
// "/" also loads (how-it-works-v2.js). So the three gestures below are a copy of case-graphics.ts's, and the build
// writes in their timings and easings from timelines.ts (__CASE_GRAPHICS__). Change both together until the Folder
// reaches "/".
(()=>{
const root=document.querySelector('[data-folder]'),stack=root&&root.querySelector('.folder-panels');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
if(!stack||reduced.matches||!('IntersectionObserver' in window)||typeof stack.animate!=='function')return;
const {t,easing,threshold}=__CASE_GRAPHICS__,start=360;
const tabs=[...root.querySelectorAll('[role=tab]')],panels=tabs.map(tab=>document.getElementById(tab.getAttribute('aria-controls')));
const STORE='augur:motion-seen',navigation=performance.getEntriesByType?performance.getEntriesByType('navigation')[0]:undefined;
const revisit=!!navigation&&(navigation.type==='reload'||navigation.type==='back_forward');
const read=()=>{try{return JSON.parse(sessionStorage.getItem(STORE)||'[]');}catch{return [];}};
const key=i=>`${location.pathname}:folder:${tabs[i].id}`,played=new Set();
const seen=i=>revisit||played.has(i)||read().includes(key(i));
const markSeen=i=>{played.add(i);try{const keys=read();if(!keys.includes(key(i)))sessionStorage.setItem(STORE,JSON.stringify([...keys,key(i)]));}catch{/* Storage unavailable: a later visit may play it again. */}};
let open=Math.max(0,tabs.findIndex(tab=>tab.getAttribute('aria-selected')==='true')),visible=false,motion=[],timer=0;
const animate=(element,keyframes,options={})=>{if(!element)return;const animation=element.animate(keyframes,{easing:easing.reveal,fill:'both',...options});motion.push(animation);return animation;};
const sync=()=>{const run=visible&&!document.hidden;motion.forEach(a=>{if(a.playState!=='finished')run?a.play():a.pause();});};
const settle=()=>{clearTimeout(timer);motion.forEach(a=>a.cancel());motion=[];};
const timeAt=(curve,progress)=>{const [x1=0,y1=0,x2=1,y2=1]=(curve.match(/-?[\d.]+/g)||[]).map(Number);const at=(a,b,s)=>3*(1-s)**2*s*a+3*(1-s)*s**2*b+s**3;let low=0,high=1;for(let step=0;step<24;step++){const mid=(low+high)/2;if(at(y1,y2,mid)<progress)low=mid;else high=mid;}return at(x1,x2,(low+high)/2);};
const pulse=(graphic,delay)=>animate(graphic.querySelector('[data-graphic-pulse]'),[{opacity:.9,transform:'scale(.25)'},{opacity:0,transform:'none'}],{delay,duration:t.pulse,easing:easing.settle,fill:'none'});
const rise=(node,delay,from='translateY(6px)',to='none')=>animate(node,[{opacity:0,transform:from},{opacity:1,transform:to}],{delay,duration:t.fade,easing:easing.settle,fill:'backwards'});
const draw=(node,delay,duration)=>animate(node,[{strokeDashoffset:1.05},{strokeDashoffset:0}],{delay,duration,easing:easing.settle,fill:'backwards'});
// Market: the prices trade, wait for the answer, jump to settled and run out to the edge, on the price line's own
// corners (a 600 x 120 space; a price of 1 at y 8, 0 at y 112), so each head stays on its line.
const market=(graphic,at)=>{
const m=t.market;
graphic.querySelectorAll('[data-market-grid]').forEach((line,i)=>animate(line,[{transform:'scaleX(0)'},{transform:'none'}],{delay:at+i*m.gridStagger,duration:m.grid,easing:easing.settle,fill:'backwards'}));
const yes=(graphic.querySelector('[data-market-yes]')?.getAttribute('points')||'').trim().split(/\s+/).map(pair=>pair.split(',').map(Number));
if(yes.length<4)return;
const width=yes[yes.length-1][0],height=120,answer=yes[yes.length-3][0],settled=yes[yes.length-2][0];
const priceAt=x=>{const next=yes.findIndex(([px])=>px>=x);if(next<=0)return yes[Math.max(next,0)][1];const [x0,y0]=yes[next-1],[x1,y1]=yes[next];return y0+(y1-y0)*(x-x0)/(x1-x0);};
const frames=[];
for(const {from,to,begin,end,curve} of [{from:0,to:answer,begin:0,end:m.arrive,curve:easing.travel},{from:answer,to:settled,begin:m.hold,end:m.settle,curve:'linear'},{from:settled,to:width,begin:m.settle,end:1,curve:easing.settle}]){
const xs=new Set(yes.map(([x])=>x).filter(x=>x>from&&x<=to));
for(let x=from+12;x<to;x+=12)xs.add(x);
frames.push({offset:frames.length?begin:0,x:from});
[...xs].sort((a,b)=>a-b).forEach(x=>frames.push({offset:begin+(end-begin)*timeAt(curve,(x-from)/(to-from)),x}));
}
const timing={delay:at+m.lead,duration:m.draw,easing:'linear',fill:'backwards'};
const track=(node,look)=>animate(node,frames.map(({offset,x})=>({offset,transform:look(x)})),timing);
track(graphic.querySelector('[data-market-window]'),x=>`translateX(${(x/width-1)*100}%)`);
track(graphic.querySelector('[data-market-art]'),x=>`translateX(${(1-x/width)*100}%)`);
track(graphic.querySelector('[data-market-head="yes"]'),x=>`translateY(${priceAt(x)/height*100}%)`);
track(graphic.querySelector('[data-market-head="no"]'),x=>`translateY(${(height-priceAt(x))/height*100}%)`);
graphic.querySelectorAll('[data-market-head] i').forEach(head=>animate(head,[{opacity:0},{opacity:1}],{delay:at+m.lead,duration:160,easing:'linear',fill:'backwards'}));
const hold=at+m.lead+m.draw*m.arrive,landed=at+m.lead+m.draw*m.settle;
animate(graphic.querySelector('[data-market-answer]'),[{opacity:0,transform:'scaleY(0)'},{opacity:1,transform:'none'}],{delay:hold-60,duration:520,easing:easing.settle,fill:'backwards'});
animate(graphic.querySelector('[data-market-head="yes"] i'),[{transform:'none'},{offset:.3,transform:'scale(1.6)'},{transform:'none'}],{delay:landed-40,duration:520,easing:easing.settle,fill:'none'});
pulse(graphic,landed-40);
graphic.querySelectorAll('[data-graphic-end]').forEach((end,i)=>rise(end,at+m.lead+m.draw-m.ends+i*90,'translateX(-6px)'));
};
// Flight: the arrival runs late past +2 hours; a ring marks the limit and the insured seats fill from the front.
const flight=(graphic,at)=>{
const f=t.flight,travel={delay:at+f.lead,duration:f.travel,easing:easing.travel,fill:'backwards'};
animate(graphic.querySelector('[data-flight-window]'),[{transform:'translateX(-100%)'},{transform:'none'}],travel);
animate(graphic.querySelector('[data-flight-progress]'),[{transform:'translateX(100%)'},{transform:'none'}],travel);
animate(graphic.querySelector('[data-flight-run]'),[{transform:'translateX(-100%)'},{transform:'none'}],travel);
const limit=Number(graphic.querySelector('[data-limit]')?.dataset.limit??.74),passes=at+f.lead+f.travel*timeAt(easing.travel,limit);
pulse(graphic,passes);
graphic.querySelectorAll('[data-seat-paid]').forEach(seat=>animate(seat,[{opacity:0,transform:'scale(.2)'},{opacity:1,transform:'none'}],{delay:passes+60+Number(seat.dataset.seatPaid)*f.wave+Number(seat.dataset.seatAcross)*f.rowWave,duration:f.seat,easing:easing.settle,fill:'backwards'}));
rise(graphic.querySelector('[data-flight-landed]'),at+f.lead+f.travel-140,'translate(-50%, 4px)','translateX(-50%)');
};
// Gate: the upgrade brakes into the check as the wall rises and bumps it; then another change passes, its check
// draws and it runs on to Live.
const gate=(graphic,at)=>{
const g=t.gate,arrives=at+g.lead+g.travel;
animate(graphic.querySelector('[data-gate-run]'),[{transform:'translateX(-100%)'},{transform:'none'}],{delay:at+g.lead,duration:g.travel,easing:easing.approach,fill:'backwards'});
graphic.querySelectorAll('[data-gate-bar]').forEach((bar,i)=>animate(bar,[{transform:'scaleY(0)'},{transform:'none'}],{delay:arrives-g.close+i*g.barStagger,duration:560,easing:easing.settle,fill:'backwards'}));
animate(graphic.querySelector('[data-gate-item]'),[{transform:'none'},{offset:.22,transform:'translateX(2px) scaleX(.86)'},{transform:'none'}],{delay:arrives-40,duration:g.bump,easing:easing.settle,fill:'none'});
rise(graphic.querySelector('[data-gate-later-lane]'),at+g.later);
draw(graphic.querySelector('[data-gate-check]'),at+g.later+160,g.check);
animate(graphic.querySelector('[data-gate-later]'),[{transform:'translateX(-100%)'},{transform:'none'}],{delay:at+g.laterRun,duration:g.laterTravel,easing:easing.travel,fill:'backwards'});
pulse(graphic,at+g.laterRun+g.laterTravel-60);
};
const play=(i,at)=>{
const graphic=panels[i]&&panels[i].querySelector('[data-case-graphic]');
if(!graphic)return;
try{animate(graphic,[{opacity:0},{opacity:1}],{delay:at,duration:t.fade,easing:'linear',fill:'backwards'});const kind=graphic.dataset.caseGraphic;if(kind==='market')market(graphic,at);else if(kind==='flight')flight(graphic,at);else gate(graphic,at);}catch{settle();return;}
sync();
};
root.addEventListener('tabsbeforechange',settle);
root.addEventListener('tabschange',({detail})=>{
open=detail.index;
if(reduced.matches||seen(open))return;
const i=open;
play(i,start);
timer=setTimeout(()=>{if(open===i)markSeen(i);},start);
});
const observer=new IntersectionObserver(entries=>{
const entry=entries[entries.length-1];
visible=entry.isIntersecting;
if(entry.intersectionRatio>=threshold&&!motion.length&&!seen(open)){markSeen(open);play(open,0);}
sync();
},{threshold:[0,threshold]});
observer.observe(stack);
['pointerdown','focusin','keydown'].forEach(type=>stack.addEventListener(type,settle));
root.addEventListener('tabssettled',settle);
reduced.addEventListener('change',()=>{if(reduced.matches){settle();observer.disconnect();}});
addEventListener('pagehide',settle);
addEventListener('beforeprint',settle);
document.addEventListener('visibilitychange',sync);
})();
