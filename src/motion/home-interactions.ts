import {setupAllTabs} from './tabs';
import {motionTime} from './debug';
import {setupApplicationLayout} from './application-layout';
import {playOnce} from './play-once';
import {easing,bondTimeline,applicationTimeline,roadmapTimeline,timing} from './timelines';
const enhanced=new WeakSet<HTMLElement>();
export function initHomeInteractions(){
 setupAllTabs();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const animationsAvailable=typeof Element.prototype.animate==='function';
 document.querySelectorAll<HTMLElement>('[data-applications]').forEach(root=>{
  if(enhanced.has(root))return;enhanced.add(root);
  setupApplicationLayout(root,reduced);
  let motion:Animation[]=[];
  root.addEventListener('tabschange',event=>{
   motion.forEach(a=>a.cancel());motion=[];if(reduced.matches||!animationsAvailable)return;
   const {index}=(event as CustomEvent<{index:number}>).detail;
   const signal=root.querySelector(`[data-connector="${index}"] .app-signal`);
   if(signal){motion.push(signal.animate([{opacity:0},{opacity:1}],{duration:motionTime(applicationTimeline.signalFade),fill:'both'}));motion.push(signal.animate([{transform:'translateY(-14px)'},{transform:`translateY(${applicationTimeline.signalDistance-14}px)`}],{duration:motionTime(applicationTimeline.signalTravel),easing:easing.reveal,fill:'both'}));}
   const backstop=root.querySelector('.application-backstop');if(backstop)motion.push(backstop.animate([{opacity:.55},{opacity:1}],{delay:motionTime(applicationTimeline.signalTravel),duration:motionTime(applicationTimeline.backstop)}));
  });
  reduced.addEventListener('change',()=>motion.forEach(a=>a.cancel()));
  root.addEventListener('tabssettled',()=>{motion.forEach(a=>a.cancel());motion=[];});
 });
 document.querySelectorAll<HTMLElement>('[data-bonds]').forEach(root=>{
  if(enhanced.has(root))return;enhanced.add(root);
  playOnce(root,animate=>root.querySelectorAll('[data-bond-bar]').forEach((bar,i)=>{const t=bondTimeline[i]!;animate(bar,[{transform:`translateY(${t.offset}px)`},{transform:'translateY(0)'}],{delay:t.start,duration:t.end-t.start,easing:'ease-out'});animate(bar,[{opacity:0},{opacity:1}],{delay:t.start,duration:150,easing:'ease-out'});}));
  root.addEventListener('tabschange',event=>{
   const {index}=(event as CustomEvent<{index:number}>).detail;
   root.querySelectorAll<HTMLElement>('[data-bond]').forEach((column,i)=>{
    column.classList.toggle('is-future',i>index);
    const bar=column.querySelector<HTMLElement>('[data-bond-bar]');bar?.classList.toggle('is-latest',i===index);
    if(bar&&!reduced.matches&&animationsAvailable){bar.getAnimations().forEach(a=>a.cancel());bar.animate(i===index?[{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}]:[{opacity:i>index?1:0},{opacity:i>index?0:1}],{duration:motionTime(i===index?timing.panel:timing.fadeOut),easing:easing.reveal});}
   });
  });
 });
 document.querySelectorAll<HTMLElement>('[data-roadmap]').forEach(root=>{
  if(enhanced.has(root))return;enhanced.add(root);
  playOnce(root,animate=>{
   animate(root.querySelector('[data-track-done]'),[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:roadmapTimeline.track,easing:easing.draw});
   animate(root.querySelector('[data-track-ahead]'),[{opacity:0},{opacity:1}],{delay:600,duration:400});
   root.querySelectorAll('[data-stop]').forEach((stop,i)=>animate(stop,[{opacity:0,transform:'scale(.3)'},{opacity:1,transform:'scale(1)'}],{delay:i*roadmapTimeline.stopStagger,duration:roadmapTimeline.stopDuration}));
   root.querySelectorAll('[role="tabpanel"]:not([hidden]) [data-evidence-bar]').forEach(bar=>animate(bar,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{delay:300,duration:roadmapTimeline.evidence}));
  });
  root.addEventListener('tabschange',event=>{
   const {index}=(event as CustomEvent<{index:number}>).detail;root.style.setProperty('--selected',String(index));
   if(reduced.matches||!animationsAvailable)return;
   const panel=root.querySelectorAll('[role="tabpanel"]')[index];panel?.querySelectorAll('[data-evidence-bar]').forEach(bar=>{bar.getAnimations().forEach(a=>a.cancel());bar.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{delay:motionTime(timing.fadeOut),duration:motionTime(roadmapTimeline.evidence),easing:easing.reveal,fill:'backwards'});});
  });
 });
 document.querySelectorAll<HTMLElement>('[data-walkthrough]').forEach(root=>{
  if(enhanced.has(root))return;enhanced.add(root);
  // The query card stays put between steps; only what changed moves: the
  // status, the newly completed progress segment, the selected outcome and the
  // newest ledger row.
  root.addEventListener('tabschange',event=>{
   if(reduced.matches||!animationsAvailable)return;const {index,previous}=(event as CustomEvent<{index:number;previous:number}>).detail;
   const panel=root.querySelector(`#walkthrough-panel-${index}`);if(!panel)return;
   const quick={duration:motionTime(timing.hover),easing:easing.reveal,fill:'backwards'} as const;
   panel.querySelector('.query-status')?.animate([{opacity:0},{opacity:1}],quick);
   if(index>previous)panel.querySelectorAll('.query-progress>span').forEach((segment,i)=>{if(i>previous&&i<=index)segment.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:motionTime(timing.panel),delay:motionTime((i-previous-1)*60),easing:easing.draw,fill:'backwards'});});
   panel.querySelector('.outcome-chip.is-selected')?.animate([{opacity:.3,transform:'scale(.96)'},{opacity:1,transform:'scale(1)'}],{...quick,duration:motionTime(timing.panel)});
   if(index>previous)panel.querySelector('[data-ledger-latest]')?.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:motionTime(timing.panel),delay:motionTime(80),easing:easing.reveal,fill:'backwards'});
   if(index>previous){
    // A challenge that lands strikes through the answer it replaced; activity
    // that is no longer the latest dims behind the new row.
    panel.querySelectorAll<HTMLElement>('[data-replaced-at]').forEach(node=>{const at=Number(node.dataset.replacedAt);if(previous<at&&at<=index)node.querySelector('s')?.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{pseudoElement:'::after',duration:motionTime(timing.panel),delay:motionTime(160),easing:easing.draw,fill:'backwards'});});
    panel.querySelectorAll('.query-ledger li:not([data-ledger-latest])').forEach((row,i)=>{if(i>=previous)row.querySelectorAll(':scope>span:not(.ledger-mark)').forEach(span=>span.animate([{opacity:1},{opacity:.55}],{duration:motionTime(timing.panel),easing:easing.reveal,fill:'backwards'}));});
   }
  });
 });
}
