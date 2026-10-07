import {setupAllTabs} from './tabs';
import {motionTime} from './debug';
import {setupApplicationLayout} from './application-layout';
import {playOnce,type Animate} from './play-once';
import {playMarketQuery} from './market-query';
import {playFlight,playPrize} from './application-plays';
import {easing,bondTimeline,applicationTimeline,marketQueryTimeline,roadmapTimeline,timing} from './timelines';
const enhanced=new WeakSet<HTMLElement>();
export function initHomeInteractions(){
 setupAllTabs();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const animationsAvailable=typeof Element.prototype.animate==='function';
 document.querySelectorAll<HTMLElement>('[data-applications]').forEach(root=>{
  if(enhanced.has(root))return;enhanced.add(root);
  setupApplicationLayout(root,reduced);
  let motion:Animation[]=[];
  const animate:Animate=(element,keyframes,options={})=>{if(!element)return;const animation=element.animate(keyframes,{easing:easing.reveal,fill:'both',...options,duration:motionTime(Number(options.duration??320)),delay:motionTime(Number(options.delay??0))});motion.push(animation);return animation;};
  const stop=()=>{motion.forEach(a=>a.cancel());motion=[];};
  // The chosen application's signal runs down its connector and the Augur Lituus band brightens.
  const sendSignal=(index:number,add:Animate,delay=0)=>{
   const signal=root.querySelector(`[data-connector="${index}"] .app-signal`);
   add(signal,[{opacity:0},{opacity:1}],{delay,duration:applicationTimeline.signalFade,easing:'linear'});
   add(signal,[{transform:'translateY(-14px)'},{transform:`translateY(${applicationTimeline.signalDistance-14}px)`}],{delay,duration:applicationTimeline.signalTravel});
   add(root.querySelector('.application-oracle'),[{opacity:.55},{opacity:1}],{delay:delay+applicationTimeline.signalTravel,duration:applicationTimeline.oracle,easing:'linear',fill:'none'});
  };
  // Prediction markets plays its query from asked to final, then sends the answer down:
  // once when the card scrolls into view, and whenever its tab is chosen.
  const query=root.querySelector<HTMLElement>('[data-market-query]');
  const playQuery=(add:Animate,start:number)=>{if(query)sendSignal(0,add,playMarketQuery(query,add,start));};
  const settleIntro=query?playOnce(query,add=>playQuery(add,0),{threshold:marketQueryTimeline.threshold}):undefined;
  // Insurance and DAOs & grants are hidden until chosen, so they play whenever their tab is.
  const flight=root.querySelector<HTMLElement>('[data-play="insurance"]'),prize=root.querySelector<HTMLElement>('[data-play="grants"]');
  root.addEventListener('tabsbeforechange',()=>settleIntro?.());
  root.addEventListener('tabschange',event=>{
   stop();if(reduced.matches||!animationsAvailable)return;
   const {index}=(event as CustomEvent<{index:number}>).detail;
   if(index===0&&query)playQuery(animate,timing.fadeOut);
   else if(index===1&&flight)sendSignal(index,animate,playFlight(flight,animate,timing.fadeOut));
   else if(index===2&&prize)sendSignal(index,animate,playPrize(prize,animate,timing.fadeOut));
   else sendSignal(index,animate);
  });
  reduced.addEventListener('change',stop);
  root.addEventListener('tabssettled',stop);
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
   animate(root.querySelector('[data-track-live]'),[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{delay:roadmapTimeline.track*2/3,duration:roadmapTimeline.track/3,easing:easing.draw});
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
    // The event that was latest hands its Green node to the new one and steps back.
    const handed=panel.querySelectorAll<HTMLElement>('.query-ledger li')[previous];
    if(handed&&!handed.hasAttribute('data-ledger-latest')){
     const styles=getComputedStyle(root);
     handed.animate([{color:styles.getPropertyValue('--foreground')},{color:getComputedStyle(handed).color}],{duration:motionTime(timing.panel),easing:easing.reveal});
     const node=handed.querySelector('.ledger-node');if(node)node.animate([{backgroundColor:styles.getPropertyValue('--primary'),borderColor:styles.getPropertyValue('--primary'),color:styles.getPropertyValue('--background')},{backgroundColor:getComputedStyle(node).backgroundColor,borderColor:getComputedStyle(node).borderTopColor,color:getComputedStyle(node).color}],{duration:motionTime(timing.panel),easing:easing.reveal});
    }
    panel.querySelector('[data-ledger-latest] .ledger-node')?.animate([{transform:'scale(.4)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:motionTime(timing.panel),delay:motionTime(120),easing:easing.newcomer,fill:'backwards'});
   }
  });
 });
}
