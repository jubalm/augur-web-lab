import {playOnce,type Animate} from './play-once';
import {loopScene} from './loop-scene';
import {hasSeen,markSeen,sceneKey} from './seen';
import {motionTime} from './debug';
import {tenetChoreography,tenetCycle} from './tenet-choreography';
import {keyframes} from './choreography';
import {easing,ribbonTimeline,repTimeline} from './timelines';
/** The three tenet diagrams loop while any part is on screen (loop-scene.ts),
 * every element on its own 12 s track from tenet-choreography.ts. SVG elements
 * animate `transform`, not the individual `translate`/`scale` properties: in
 * Chromium the latter re-layerized the diagrams every frame (measured 6 Oct
 * 2026: about 2 s of main thread per 5 s, against 0.05 s with `transform`). */
export function initTenets(){
 const scenes=[['[data-cross]',tenetChoreography.cross],['[data-mesh]',tenetChoreography.mesh],['[data-authority]',tenetChoreography.authority]] as const;
 for(const [selector,tracks] of scenes)document.querySelectorAll<SVGSVGElement>(selector).forEach(svg=>loopScene(svg,animate=>{
  for(const track of tracks)animate(svg.querySelector(`[data-motion="${track.id}"]`),keyframes(track,tenetCycle,undefined,{individual:false}),{duration:tenetCycle,delay:track.delay??0});
 }));
}

/** The answer band: a Green ribbon sweeps in under the statement once, led by
 * three squares. The statement stays real, readable text throughout: Paper on
 * Navy ahead of the sweep, Navy on Green behind it. */
export function initAnswerRibbon(){
 const band=document.querySelector<HTMLElement>('[data-answer-band]');
 const text=band?.querySelector<HTMLElement>('[data-answer]');
 const key=sceneKey('answer-ribbon');
 if(!band||!text||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)||typeof band.animate!=='function'||hasSeen(key))return;
 // Already on screen when the script runs: keep the settled band, no flash.
 const box=band.getBoundingClientRect();if(box.bottom>0&&box.top<innerHeight)return;
 const fill=document.createElement('div');fill.className='ribbon-fill';
 const overlay=document.createElement('div');overlay.className='ribbon-overlay';overlay.setAttribute('aria-hidden','true');overlay.append(text.cloneNode(true));
 overlay.querySelector('[data-answer]')?.removeAttribute('data-answer');
 const edge=document.createElement('div');edge.className='ribbon-edge';edge.append(...Array.from({length:3},()=>document.createElement('i')));
 band.append(fill,overlay,edge);band.dataset.ribbon='armed';
 const events=new AbortController();let animations:Animation[]=[];
 const settle=()=>{animations.forEach(a=>a.cancel());fill.remove();overlay.remove();edge.remove();band.dataset.ribbon='settled';observer.disconnect();events.abort();};
 const play=()=>{
  observer.disconnect();markSeen(key);
  const timing={duration:motionTime(ribbonTimeline.duration),easing:easing.draw,fill:'both'} as const;
  animations=[
   fill.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],timing),
   overlay.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],timing),
   edge.animate([{transform:'translateX(0)'},{transform:`translateX(${band.clientWidth}px)`}],timing),
   edge.animate([{opacity:1},{opacity:1,offset:1-ribbonTimeline.edgeFade/ribbonTimeline.duration},{opacity:0}],{...timing,easing:'linear'}),
  ];
  void Promise.all(animations.map(a=>a.finished)).then(settle,()=>undefined);
 };
 const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.intersectionRatio>=ribbonTimeline.threshold)&&!document.hidden)play();},{threshold:[0,ribbonTimeline.threshold]});
 observer.observe(band);
 matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',settle,{signal:events.signal});
 window.addEventListener('beforeprint',settle,{signal:events.signal});
 window.addEventListener('pagehide',settle,{signal:events.signal});
}
/** REP stake flows, once per tile as it scrolls into view: the condition line
 * draws, the bond travels along it to the outcome (or is lost), then any
 * winnings appear. Tiles settle on interaction; reduced motion shows the end.
 * Hovering a tile with a mouse plays its flow again (owner feedback, 6 Oct 2026). */
function stakeFlow(row:HTMLElement,delay:number,animate:Animate){
 const t=repTimeline;
 const line=row.querySelector('[data-line]'),stake=row.querySelector('[data-stake] .blocks'),moving=row.querySelector('[data-outcome="bond"] .blocks')??row.querySelector('[data-outcome="lost"] .blocks');
 animate(line,[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{delay:delay+t.line.start,duration:t.line.duration,easing:easing.draw});
 animate(row.querySelector('[data-condition]'),[{opacity:0},{opacity:1}],{delay:delay+t.condition.start,duration:t.condition.duration});
 const distance=moving&&stake?moving.getBoundingClientRect().left-stake.getBoundingClientRect().left:120;
 const bonds=row.querySelector('[data-outcome="bond"]');
 if(bonds){
  animate(bonds.querySelector('.blocks'),[{transform:`translateX(${-distance}px)`},{transform:'translateX(0)'}],{delay:delay+t.travel.start,duration:t.travel.duration});
  animate(bonds.querySelector('.flow-caption'),[{opacity:0},{opacity:1}],{delay:delay+t.travel.start+t.travel.duration-200,duration:200});
 }
 row.querySelectorAll('[data-outcome="gain"] i,[data-outcome="fee"] i').forEach(node=>animate(node,[{opacity:0,transform:'scale(.3)'},{opacity:1,transform:'scale(1)'}],{delay:delay+t.gain.start,duration:t.gain.duration}));
 row.querySelectorAll('[data-gain],[data-outcome="gain"] .flow-caption,[data-outcome="fee"] .flow-caption').forEach(node=>animate(node,[{opacity:0},{opacity:1}],{delay:delay+t.gain.start,duration:t.gain.duration}));
 const lost=row.querySelector('[data-outcome="lost"]');
 if(lost){
  // A copy of the bond travels to the outcome and fades out as the dashed outline appears.
  const ghost=document.createElement('i');ghost.className='bond';ghost.setAttribute('aria-hidden','true');ghost.style.cssText='position:absolute;inset:0';
  const blocks=lost.querySelector<HTMLElement>('.blocks');if(blocks){blocks.style.position='relative';blocks.append(ghost);}
  const tidy=()=>{ghost.remove();if(blocks)blocks.style.position='';};
  const travel=animate(ghost,[{opacity:1,transform:`translateX(${-distance}px)`,offset:0},{opacity:1,transform:'translateX(0)',offset:.75},{opacity:0,transform:'translateX(0)',offset:1}],{delay:delay+t.travel.start,duration:t.travel.duration+t.lost.fade});
  if(travel)travel.finished.then(tidy,tidy);else tidy();
  animate(lost.querySelector('.lost'),[{opacity:0},{opacity:1}],{delay:delay+t.lost.start,duration:t.lost.duration});
  animate(lost.querySelector('.flow-caption'),[{opacity:0},{opacity:1}],{delay:delay+t.lost.start,duration:t.lost.duration});
 }
}
export function initStakeFlow(){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll<HTMLElement>('[data-stake-row]').forEach((row,i)=>{
  playOnce(row,animate=>stakeFlow(row,i*repTimeline.rowStagger,animate));
  let replay:Animation[]=[];
  row.addEventListener('pointerenter',event=>{
   if(event.pointerType!=='mouse'||reduced.matches||typeof row.animate!=='function'||replay.some(a=>a.playState==='running'))return;
   if(row.getAnimations({subtree:true}).some(a=>a.playState==='running'))return;
   replay=[];
   stakeFlow(row,0,(element,frames,options={})=>{
    if(!element)return;
    const animation=element.animate(frames,{easing:easing.reveal,fill:'backwards',...options,duration:motionTime(Number(options.duration??320)),delay:motionTime(Number(options.delay??0))});
    replay.push(animation);return animation;
   });
  });
 });
}
