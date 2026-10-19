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
  // Each use case plays as one sentence, top to bottom (owner, 19 Oct 2026: "polished, professional"):
  // the question rises, both answers rise in, the Green fill sweeps across the answer and its check
  // draws, the other answer steps back, and what the app does rises in before its picture plays.
  // Prediction markets plays once in view (once per session, playOnce); every case plays again
  // whenever it is picked, after the case it replaces fades out.
  const panels=[...root.querySelectorAll<HTMLElement>('[role="tabpanel"]')];
  const story=(panel:HTMLElement|undefined,add:Animate,start:number)=>{
   if(!panel)return;const t=applicationTimeline;
   const rise=(node:Element|null,at:number,distance:number=t.rise)=>add(node,[{opacity:0,transform:`translateY(${distance}px)`},{opacity:1,transform:'none'}],{delay:start+at,duration:t.enter,easing:easing.settle,fill:'backwards'});
   // One animation from timed looks (ms from the story's start), each eased into the next, for an
   // element whose entrance and answer beat move the same property.
   const steps=(node:Element|null,looks:(Keyframe&{at:number})[])=>{const from=looks[0]!.at,span=looks[looks.length-1]!.at-from;add(node,looks.map(({at,...look})=>({...look,offset:(at-from)/span})),{delay:start+from,duration:span,easing:'linear',fill:'backwards'});};
   rise(panel.querySelector('.case-summary'),t.summary);
   rise(panel.querySelector('.case-question'),t.question);
   // Both answers rise in as equals. At the answer the picked chip gives a little under the fill, and
   // the other steps back.
   const enter=(i:number)=>({at:t.options+i*t.optionStagger,opacity:0,transform:'translateY(10px)',easing:easing.settle});
   const landed=(i:number)=>({at:t.options+i*t.optionStagger+t.optionEnter,opacity:1,transform:'none'});
   panel.querySelectorAll('.case-option').forEach((chip,i)=>steps(chip,chip.classList.contains('is-answer')
    ?[enter(i),landed(i),{at:t.decide,opacity:1,transform:'none',easing:'cubic-bezier(.3,0,.5,1)'},{at:t.decide+t.press[0],opacity:1,transform:'scale(.96)',easing:easing.settle},{at:t.decide+t.press[1],opacity:1,transform:'none'}]
    :[enter(i),landed(i),{at:t.decide,opacity:1,transform:'none',easing:easing.crossfade},{at:t.decide+t.dimFade,opacity:t.dim,transform:'none'}]));
   add(panel.querySelector('.case-fill'),[{transform:'scaleX(0)'},{transform:'none'}],{delay:start+t.decide,duration:t.fill,easing:easing.settle,fill:'backwards'});
   add(panel.querySelector('.case-pick'),[{opacity:0},{opacity:1}],{delay:start+t.decide+t.label,duration:200,easing:'linear',fill:'backwards'});
   add(panel.querySelector('.case-check polyline'),[{strokeDashoffset:1.05},{strokeDashoffset:0}],{delay:start+t.decide+t.check,duration:t.checkDraw,easing:easing.settle,fill:'backwards'});
   rise(panel.querySelector('.case-by'),t.by,6);
   // Then the app acts: the action and its explanation rise, and the picture plays.
   rise(panel.querySelector('.case-action'),t.action);
   rise(panel.querySelector('.case-explanation'),t.explanation);
   rise(panel.querySelector('.case-fallback'),t.fallback,6);
   playCaseGraphic(panel,add,start+t.graphic);
  };
  const settleIntro=panels[0]?playOnce(panels[0],add=>story(panels[0],add,0),{threshold:applicationTimeline.threshold}):undefined;
  let motion:Animation[]=[];
  const stop=()=>{motion.forEach(a=>a.cancel());motion=[];};
  const animate:Animate=(element,keyframes,options={})=>{if(!element)return;const animation=element.animate(keyframes,{easing:easing.reveal,fill:'both',...options,duration:motionTime(Number(options.duration??320)),delay:motionTime(Number(options.delay??0))});motion.push(animation);return animation;};
  root.addEventListener('tabsbeforechange',()=>{settleIntro?.();stop();});
  root.addEventListener('tabschange',event=>{
   if(reduced.matches||!animationsAvailable)return;
   const {index,previous}=(event as CustomEvent<{index:number;previous:number}>).detail;
   // The shown case fades out while it is still in the shared cell (from 1024 up the panels overlap,
   // and hidden ones are only invisible), then the picked one plays. `fill: none`, so once the fade
   // ends the hidden case is invisible again.
   animate(panels[previous]??null,[{visibility:'visible',opacity:1},{visibility:'visible',opacity:0}],{duration:applicationTimeline.out,easing:'linear',fill:'none'});
   story(panels[index],animate,applicationTimeline.start);
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
  // The open step's description runs to different lengths, so the steps column reserves
  // the tallest open state, measured with each step open in turn (transitions off, read in
  // one frame, nothing painted), and the REP panel and the page never move between steps.
  const steps=root.querySelector<HTMLElement>('[role="tablist"]');
  const reserve=()=>{
   if(!steps)return;const tabs=[...steps.querySelectorAll<HTMLElement>('[role="tab"]')],chosen=tabs.map(tab=>tab.getAttribute('aria-selected'));
   steps.style.minHeight='';steps.classList.add('is-measuring');
   const tallest=Math.max(...tabs.map(open=>{tabs.forEach(tab=>tab.setAttribute('aria-selected',String(tab===open)));return steps.offsetHeight;}));
   tabs.forEach((tab,i)=>tab.setAttribute('aria-selected',chosen[i]!));void steps.offsetHeight;steps.classList.remove('is-measuring');
   steps.style.minHeight=`${tallest}px`;
  };
  reserve();document.fonts?.ready.then(reserve,()=>undefined);root.addEventListener('tabssettled',reserve);
  // Every card's Question details open and close together: the cards share their rows, so
  // open details on a hidden card would leave a gap under the shown one.
  const descriptions=[...root.querySelectorAll<HTMLDetailsElement>('.query-details')];
  descriptions.forEach(details=>details.addEventListener('toggle',()=>descriptions.forEach(other=>{if(other.open!==details.open)other.open=details.open;})));
  // “paid” in the heading: its Green underline draws in once per visit (playOnce).
  const heading=root.closest('section')?.querySelector('[data-paid-heading]');
  if(heading)playOnce(heading,animate=>animate(heading.querySelector('.paid-mark'),[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{delay:200,duration:700,easing:easing.draw}),{threshold:.6});
  // The query card stays put between steps; only what changed moves: the
  // status, the newly completed progress segment, the selected outcome, the stakes
  // bar and the newest Activity entry (transform and opacity only).
  root.addEventListener('tabschange',event=>{
   if(reduced.matches||!animationsAvailable)return;const {index,previous}=(event as CustomEvent<{index:number;previous:number}>).detail;
   const panel=root.querySelector(`#walkthrough-panel-${index}`);if(!panel)return;
   const quick={duration:motionTime(timing.hover),easing:easing.reveal,fill:'backwards'} as const;
   panel.querySelector('.query-status')?.animate([{opacity:0},{opacity:1}],quick);
   if(index>previous)panel.querySelectorAll('.query-progress>span').forEach((segment,i)=>{if(i>previous&&i<=index)segment.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:motionTime(timing.panel),delay:motionTime((i-previous-1)*60),easing:easing.draw,fill:'backwards'});});
   panel.querySelector('.outcome-chip.is-selected')?.animate([{opacity:.3,transform:'scale(.96)'},{opacity:1,transform:'scale(1)'}],{...quick,duration:motionTime(timing.panel)});
   if(index>previous)panel.querySelector('[data-ledger-latest]')?.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:motionTime(timing.panel),delay:motionTime(80),easing:easing.reveal,fill:'backwards'});
   if(index>previous){
    // A challenge that lands strikes through the report it replaced; a final answer
    // strikes through the outcomes it ruled out.
    const strike=(node:Element|null,delay:number)=>node?.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{pseudoElement:'::after',duration:motionTime(timing.panel),delay:motionTime(delay),easing:easing.draw,fill:'backwards'});
    panel.querySelectorAll<HTMLElement>('[data-replaced-at]').forEach(node=>{const at=Number(node.dataset.replacedAt);if(previous<at&&at<=index)strike(node.querySelector('s'),160);});
    panel.querySelectorAll('[data-out] s').forEach((node,i)=>strike(node,200+i*60));
    // The stakes bar recounts: each part grows from the left, the larger first.
    panel.querySelectorAll('.stakes-part').forEach((part,i)=>part.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:motionTime(timing.panel*1.5),delay:motionTime(60+i*90),easing:easing.draw,fill:'backwards'}));
    panel.querySelector('[data-ledger-latest] .ledger-node')?.animate([{transform:'scale(.4)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:motionTime(timing.panel),delay:motionTime(120),easing:easing.newcomer,fill:'backwards'});
   }
  });
 });
}
