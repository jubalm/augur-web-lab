import {setupAllTabs} from './tabs';
import {playCaseGraphic} from './case-graphics';
import {motionTime} from './debug';
import {playOnce,type Animate} from './play-once';
import {easing,applicationTimeline,roadmapTimeline,timing} from './timelines';
const enhanced=new WeakSet<HTMLElement>();
export function initHomeInteractions(){
 setupAllTabs();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const animationsAvailable=typeof Element.prototype.animate==='function';
 document.querySelectorAll<HTMLElement>('[data-applications]').forEach(root=>{
  if(enhanced.has(root))return;enhanced.add(root);
  // Each use case plays top to bottom when it is shown: the Yes and No chips rise, the answer lights
  // up, then what the app does rises in and its picture plays. Prediction markets plays once in
  // view (once per session, playOnce); every case plays again whenever it is picked.
  const panels=[...root.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
  const story=(panel:HTMLElement|undefined,add:Animate,start:number)=>{
   if(!panel)return;const t=applicationTimeline;
   // Both answers rise in; the picked one fills Green with its check and the other steps back.
   add(panel.querySelector('.case-options'),[{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{delay:start+t.options,duration:t.fade,fill:'backwards'});
   add(panel.querySelector('.case-pick'),[{opacity:0,transform:'scale(.92)'},{opacity:1,transform:'none'}],{delay:start+t.decide,duration:t.pop,easing:easing.newcomer,fill:'backwards'});
   add(panel.querySelector('.case-pick .web-icon'),[{opacity:0,transform:'scale(.6)'},{opacity:1,transform:'none'}],{delay:start+t.decide+t.check,duration:t.pop,easing:easing.newcomer,fill:'backwards'});
   add(panel.querySelector('.case-option.is-other'),[{opacity:1},{opacity:.5}],{delay:start+t.decide,duration:t.fade,easing:easing.crossfade,fill:'backwards'});
   // With the check, the line saying who did not decide fades in.
   add(panel.querySelector('.case-by'),[{opacity:0},{opacity:1}],{delay:start+t.decide+t.check,duration:t.fade,fill:'backwards'});
   // Then the app acts: its action and explanation rise, and its picture plays.
   [...panel.querySelectorAll('.case-act>p,.case-fallback')].forEach((node,i)=>add(node,[{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{delay:start+t.act+i*t.stagger,duration:t.fade,fill:'backwards'}));
   playCaseGraphic(panel,add,start);
  };
  const settleIntro=panels[0]?playOnce(panels[0],add=>story(panels[0],add,0),{threshold:applicationTimeline.threshold}):undefined;
  let motion:Animation[]=[];
  const stop=()=>{motion.forEach(a=>a.cancel());motion=[];};
  const animate:Animate=(element,keyframes,options={})=>{if(!element)return;const animation=element.animate(keyframes,{easing:easing.reveal,fill:'both',...options,duration:motionTime(Number(options.duration??320)),delay:motionTime(Number(options.delay??0))});motion.push(animation);return animation;};
  root.addEventListener('tabsbeforechange',()=>{settleIntro?.();stop();});
  root.addEventListener('tabschange',event=>{
   if(reduced.matches||!animationsAvailable)return;
   story(panels[(event as CustomEvent<{index:number}>).detail.index],animate,timing.fadeOut);
  });
  reduced.addEventListener('change',stop);
  root.addEventListener('tabssettled',stop);
  window.addEventListener('pagehide',stop);
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
