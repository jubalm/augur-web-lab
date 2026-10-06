import {playOnce,type Animate} from './play-once';
import {loopScene} from './loop-scene';
import {motionTime} from './debug';
import {tenetChoreography,tenetCycle} from './tenet-choreography';
import {keyframes,type Track} from './choreography';
import {easing,ribbonTimeline,repTimeline} from './timelines';
/** The three tenet diagrams loop while any part is on screen (loop-scene.ts),
 * every element on its own 12 s track from tenet-choreography.ts, a delayed
 * track after a one-off lead-in. SVG elements
 * animate `transform`, not the individual `translate`/`scale` properties: in
 * Chromium the latter re-layerized the diagrams every frame (measured 6 Oct
 * 2026: about 2 s of main thread per 5 s, against 0.05 s with `transform`). */
/** A delayed track's lead-in plays once over the delay, on the element's
 * `data-lead` wrapper: in Chromium a loop that starts beside a second animation
 * of the same property on its element stays on the main thread after that
 * animation ends (measured 6 Oct 2026: about 830 ms per 5 s for Permissionless,
 * against 10 ms). The element shows its static frame meanwhile, so the wrapper
 * plays the lead-in relative to it. */
const leadIn=(track:Track):Track=>{
 const rest=track.keys[0]!.v;
 return{...track,keys:track.lead!.map(key=>({...key,v:typeof rest==='number'?(key.v as number)/rest:[(key.v as readonly number[])[0]!-rest[0],(key.v as readonly number[])[1]!-rest[1]] as const}))};
};
export function initTenets(){
 const scenes=[['[data-cross]',tenetChoreography.cross],['[data-mesh]',tenetChoreography.mesh],['[data-authority]',tenetChoreography.authority]] as const;
 for(const [selector,tracks] of scenes)document.querySelectorAll<SVGSVGElement>(selector).forEach(svg=>loopScene(svg,animate=>{
  for(const track of tracks){
   if(track.lead&&track.delay)animate(svg.querySelector(`[data-lead="${track.id}"]`),keyframes(leadIn(track),track.delay,undefined,{individual:false}),{duration:track.delay,iterations:1});
   animate(svg.querySelector(`[data-motion="${track.id}"]`),keyframes(track,tenetCycle,undefined,{individual:false}),{duration:tenetCycle,delay:track.delay??0});
  }
 }));
}

/** The moment, as a fraction of the duration, at which a cubic-bezier easing
 * whose output rises steadily reaches `progress`. */
function timeAt(curve:string,progress:number){
 const [x1=0,y1=0,x2=1,y2=1]=(curve.match(/-?[\d.]+/g)??[]).map(Number);
 const at=(a:number,b:number,s:number)=>3*(1-s)**2*s*a+3*(1-s)*s**2*b+s**3;
 let low=0,high=1;
 for(let step=0;step<24;step++){const mid=(low+high)/2;if(at(y1,y2,mid)<progress)low=mid;else high=mid;}
 return at(x1,x2,(low+high)/2);
}

/** The answer band: a Green ribbon sweeps in under the statement once per
 * load, led by three squares. The statement stays real, readable text
 * throughout: Paper on Navy ahead of the sweep, Navy on Green behind it, where
 * each word rises into place as the ribbon's front reaches it. Unlike the other
 * entrance scenes it also plays after a reload or a return visit (owner,
 * 6 Oct 2026), so it does not go through seen.ts. */
export function initAnswerRibbon(){
 const band=document.querySelector<HTMLElement>('[data-answer-band]');
 const text=band?.querySelector<HTMLElement>('[data-answer]');
 if(!band||!text||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)||typeof band.animate!=='function')return;
 // Already on screen when the script runs: keep the settled band, no flash.
 const box=band.getBoundingClientRect();if(box.bottom>0&&box.top<innerHeight)return;
 const fill=document.createElement('div');fill.className='ribbon-fill';
 const overlay=document.createElement('div');overlay.className='ribbon-overlay';overlay.setAttribute('aria-hidden','true');overlay.append(text.cloneNode(true));
 const copy=overlay.querySelector<HTMLElement>('[data-answer]');copy?.removeAttribute('data-answer');
 // Only the Navy copy moves, word by word; the live statement underneath stays whole.
 const words=(copy?.textContent??'').split(' ').map(word=>{const span=document.createElement('span');span.className='ribbon-word';span.textContent=word;return span;});
 copy?.replaceChildren(...words.flatMap((word,index)=>index?[' ',word]:[word]));
 const edge=document.createElement('div');edge.className='ribbon-edge';edge.append(...Array.from({length:3},()=>document.createElement('i')));
 band.append(fill,overlay,edge);band.dataset.ribbon='armed';
 const events=new AbortController();let animations:Animation[]=[];
 const settle=()=>{animations.forEach(a=>a.cancel());fill.remove();overlay.remove();edge.remove();band.dataset.ribbon='settled';observer.disconnect();events.abort();};
 const play=()=>{
  observer.disconnect();
  const timing={duration:motionTime(ribbonTimeline.duration),easing:easing.draw,fill:'both'} as const;
  animations=[
   fill.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],timing),
   overlay.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],timing),
   edge.animate([{transform:'translateX(0)'},{transform:`translateX(${band.clientWidth}px)`}],timing),
   edge.animate([{opacity:1},{opacity:1,offset:1-ribbonTimeline.edgeFade/ribbonTimeline.duration},{opacity:0}],{...timing,easing:'linear'}),
  ];
  // The front reaches a word at its left edge; the word rises from there.
  const left=band.getBoundingClientRect().left,width=band.clientWidth,{word}=ribbonTimeline;
  for(const span of words)animations.push(span.animate([{opacity:0,transform:`translateY(${word.rise}em)`},{opacity:1,transform:'none'}],{duration:motionTime(word.duration),delay:timing.duration*timeAt(easing.draw,Math.min(1,Math.max(0,(span.getBoundingClientRect().left-left)/width))),easing:easing.hero,fill:'both'}));
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
