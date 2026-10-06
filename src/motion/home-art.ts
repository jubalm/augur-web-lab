import {playOnce} from './play-once';
import {loopScene} from './loop-scene';
import {motionTime} from './debug';
import {crossAnywhere} from '../data/diagrams';
import {easing,tenetLoop,ribbonTimeline,repTimeline} from './timelines';
type Point = [time: number, values: Keyframe];
/** Keyframes on a cycle timeline. Points are [ms, values]; the cycle opens and
 * closes on `rest`, so every iteration joins the next without a seam. */
function track(cycle: number, rest: Keyframe, points: Point[]): Keyframe[] {
 const sorted=[...points].sort((a,b)=>a[0]-b[0]);
 return [{...rest,offset:0},...sorted.map(([time,values])=>({...rest,...values,offset:Math.min(1,Math.max(0,time/cycle))})),{...rest,offset:1}];
}
const pulse=(start:number,{rise,hold,fall,peak=1}:{rise:number;hold:number;fall:number;peak?:number}):Point[]=>[[start,{opacity:0,easing:easing.crossfade}],[start+rise,{opacity:peak,easing:easing.crossfade}],[start+rise+hold,{opacity:peak,easing:easing.crossfade}],[start+rise+hold+fall,{opacity:0}]];

export function initTenets(){
 const {cross,mesh,authority}=tenetLoop;
 // Permissionless: the crossers fade, then arrive again across the open edge
 // from every side, each leaving a short trail; the Green newcomer comes last.
 document.querySelectorAll<SVGSVGElement>('[data-cross]').forEach(svg=>loopScene(svg,animate=>{
  const options={duration:cross.cycle};
  svg.querySelectorAll('[data-crosser]').forEach((node,i)=>{
   const square=crossAnywhere.crossers[i]!,start=cross.enter[i]!,away=`translate(${square.dx}px,${square.dy}px)`;
   animate(node,track(cross.cycle,{opacity:1},[
    [cross.exit.start,{opacity:1,easing:easing.crossfade}],[cross.exit.end,{opacity:0}],[start,{opacity:0,easing:easing.crossfade}],[start+cross.fadeIn,{opacity:1}],
   ]),options);
   // Position runs on its own track so the slide eases over its whole length.
   animate(node,track(cross.cycle,{transform:'translate(0,0)'},[
    [cross.exit.end,{transform:'translate(0,0)'}],[cross.exit.end+1,{transform:away}],[start,{transform:away,easing:i===3?easing.newcomer:easing.reveal}],[start+cross.move,{transform:'translate(0,0)'}],
   ]),options);
  });
  svg.querySelectorAll('[data-trail]').forEach((node,j)=>{
   const rest=crossAnywhere.trails[j]!.opacity,start=cross.enter[Math.floor(j/2)]!+(j%2?cross.trail.near:cross.trail.far);
   animate(node,track(cross.cycle,{opacity:rest},[[cross.exit.start,{opacity:rest,easing:easing.crossfade}],[cross.exit.end,{opacity:0}],[start,{opacity:0,easing:easing.crossfade}],[start+cross.trail.fade,{opacity:rest}]]),options);
  });
 },{threshold:tenetLoop.threshold}));
 // Decentralized: a highlight hops through the mesh and back, one square at a
 // time, with the link between them glowing at each handoff. Nothing is lit at rest.
 document.querySelectorAll<SVGSVGElement>('[data-mesh]').forEach(svg=>loopScene(svg,animate=>{
  const squares=[...svg.querySelectorAll('[data-mesh-glow]')],links=[...svg.querySelectorAll('[data-mesh-glow-link]')],last=squares.length-1;
  const squarePoints=squares.map(()=>[] as Point[]),linkPoints=links.map(()=>[] as Point[]);
  for(const [base,order] of [[mesh.forward,squares.map((_,i)=>i)],[mesh.backward,squares.map((_,i)=>last-i)]] as const){
   order.forEach((index,step)=>{
    const start=base+step*mesh.hop;
    squarePoints[index]!.push(...pulse(start,{rise:mesh.fadeIn,hold:step===last?mesh.lastHold:mesh.hold,fall:mesh.fadeOut}));
    if(step<last){const link=base===mesh.forward?index:index-1;linkPoints[link]!.push(...pulse(start+mesh.link.delay,{rise:mesh.link.rise,hold:mesh.link.hold,fall:mesh.link.fall}));}
   });
  }
  squares.forEach((node,i)=>animate(node,track(mesh.cycle,{opacity:0},squarePoints[i]!),{duration:mesh.cycle}));
  links.forEach((node,i)=>animate(node,track(mesh.cycle,{opacity:0},linkPoints[i]!),{duration:mesh.cycle}));
 },{threshold:tenetLoop.threshold}));
 // Trustless: the result steps back to Mist, a Mist signal crosses each lane
 // through the empty middle, and the last arrival lights the result again.
 document.querySelectorAll<SVGSVGElement>('[data-authority]').forEach(svg=>loopScene(svg,animate=>{
  const options={duration:authority.cycle},{pending,signal,result}=authority;
  animate(svg.querySelector('[data-result]'),track(authority.cycle,{opacity:1},[[pending.start,{opacity:1,easing:easing.crossfade}],[pending.end,{opacity:0}],[result.start,{opacity:0,easing:easing.crossfade}],[result.end,{opacity:1}]]),options);
  animate(svg.querySelector('[data-result-pending]'),track(authority.cycle,{opacity:0},[[pending.start,{opacity:0,easing:easing.crossfade}],[pending.end,{opacity:1}],[result.start,{opacity:1,easing:easing.crossfade}],[result.end,{opacity:0}]]),options);
  svg.querySelectorAll('[data-signal]').forEach((node,i)=>{
   const start=signal.start+i*signal.stagger,end=start+signal.travel;
   animate(node,track(authority.cycle,{opacity:0,transform:'translateX(0)'},[
    [start,{opacity:0,transform:'translateX(0)',easing:easing.crossfade}],[start+120,{opacity:.9,transform:`translateX(${signal.distance*120/signal.travel}px)`,easing:easing.crossfade}],
    [end-150,{opacity:.9,transform:`translateX(${signal.distance*(signal.travel-150)/signal.travel}px)`,easing:easing.crossfade}],[end,{opacity:0,transform:`translateX(${signal.distance}px)`}],
   ]),{...options,easing:'linear'});
  });
 },{threshold:tenetLoop.threshold}));
}

/** The answer band: a Green ribbon sweeps in under the statement once, led by
 * three squares. The statement stays real, readable text throughout: Paper on
 * Navy ahead of the sweep, Navy on Green behind it. */
export function initAnswerRibbon(){
 const band=document.querySelector<HTMLElement>('[data-answer-band]');
 const text=band?.querySelector<HTMLElement>('[data-answer]');
 if(!band||!text||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)||typeof band.animate!=='function')return;
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
  observer.disconnect();
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
/** REP stake flows, once per row as it scrolls into view: the condition line
 * draws, the bond travels along it to the outcome (or is lost), then any
 * winnings appear. Rows settle on interaction; reduced motion shows the end. */
export function initStakeFlow(){document.querySelectorAll<HTMLElement>('[data-stake-row]').forEach((row,i)=>playOnce(row,animate=>{
 const t=repTimeline,delay=i*t.rowStagger;
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
  travel?.finished.then(tidy,tidy);
  animate(lost.querySelector('.lost'),[{opacity:0},{opacity:1}],{delay:delay+t.lost.start,duration:t.lost.duration});
  animate(lost.querySelector('.flow-caption'),[{opacity:0},{opacity:1}],{delay:delay+t.lost.start,duration:t.lost.duration});
 }
}));}
