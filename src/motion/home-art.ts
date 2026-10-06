import {playOnce} from './play-once';
import {loopScene} from './loop-scene';
import {hasSeen,markSeen,sceneKey} from './seen';
import {motionTime} from './debug';
import {crossAnywhere,peerMesh} from '../data/diagrams';
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
 // Permissionless: newcomers keep arriving across the open edge. Each crosser
 // fades, then slides back in from outside with its trail; the four copies are
 // a second apart and each moves for 1.2 s, so one is always crossing. The
 // Green newcomer arrives last. (A crawling dashed edge was tried and dropped:
 // stroke-dashoffset repaints every frame, ~290 ms of main thread per 5 s.)
 document.querySelectorAll<SVGSVGElement>('[data-cross]').forEach(svg=>loopScene(svg,animate=>{
  const arrive=cross.enter+cross.move;
  svg.querySelectorAll('[data-crosser]').forEach((node,i)=>{
   const square=crossAnywhere.crossers[i]!,away=`translate(${square.dx}px,${square.dy}px)`,options={duration:cross.cycle,delay:i*cross.stagger};
   animate(node,track(cross.cycle,{opacity:1},[[0,{opacity:1,easing:easing.crossfade}],[cross.fadeOut,{opacity:0}],[cross.enter,{opacity:0,easing:easing.crossfade}],[cross.enter+cross.fadeIn,{opacity:1}]]),options);
   // Position runs on its own track so the slide eases over its whole length.
   animate(node,track(cross.cycle,{transform:'translate(0,0)'},[[cross.fadeOut,{transform:'translate(0,0)'}],[cross.fadeOut+1,{transform:away}],[cross.enter,{transform:away,easing:i===3?easing.newcomer:easing.reveal}],[arrive,{transform:'translate(0,0)'}]]),options);
  });
  svg.querySelectorAll('[data-trail]').forEach((node,j)=>{
   const rest=crossAnywhere.trails[j]!.opacity,back=arrive+(j%2?cross.trail.near:cross.trail.far);
   animate(node,track(cross.cycle,{opacity:rest},[[0,{opacity:rest,easing:easing.crossfade}],[cross.fadeOut,{opacity:0}],[back,{opacity:0,easing:easing.crossfade}],[back+cross.trail.fade,{opacity:rest}]]),{duration:cross.cycle,delay:Math.floor(j/2)*cross.stagger});
  });
 }));
 // Decentralized: a relay hops peer to peer along the highlighted path and
 // back without resting. The packet crosses each link while the link glows,
 // the next peer lights as it lands and the last one dims behind it.
 document.querySelectorAll<SVGSVGElement>('[data-mesh]').forEach(svg=>loopScene(svg,animate=>{
  const squares=[...svg.querySelectorAll('[data-mesh-glow]')],links=[...svg.querySelectorAll('[data-mesh-glow-link]')];
  const route=[...squares.keys(),...[...squares.keys()].reverse().slice(1)];
  const hop=mesh.travel+mesh.dwell,cycle=(route.length-1)*hop,{light,link}=mesh;
  // Waypoint k: the packet departs at k·hop and lands travel later.
  const departs=(k:number)=>k*hop,lands=(k:number)=>k*hop-mesh.dwell;
  const squarePoints=squares.map(()=>[] as Point[]),linkPoints=links.map(()=>[] as Point[]),packet:Point[]=[];
  route.forEach((index,k)=>{
   if(k>0&&k<route.length-1)squarePoints[index]!.push(...pulse(lands(k)-light.lead,{rise:light.rise,hold:mesh.dwell+light.lead-light.rise+light.hold,fall:light.fall}));
   if(k<route.length-1){
    const next=route[k+1]!;
    linkPoints[Math.min(index,next)]!.push(...pulse(departs(k),{rise:link.rise,hold:mesh.travel-link.rise,fall:mesh.dwell}));
   }
  });
  // The route opens and closes on the first peer, lit at rest.
  squarePoints[0]!.push([mesh.dwell/2,{opacity:1,easing:easing.crossfade}],[mesh.dwell/2+light.fall,{opacity:0}],[cycle-mesh.dwell-light.lead,{opacity:0,easing:easing.crossfade}],[cycle-mesh.dwell-light.lead+light.rise,{opacity:1}]);
  const centre=(index:number)=>{const [x,y]=peerMesh.participants[peerMesh.highlight[index]!]!;return [x,y] as const;};
  const [x0,y0]=centre(0);
  route.forEach((index,k)=>{
   const [x,y]=centre(index),at=`translate(${x-x0}px,${y-y0}px)`;
   if(k>0)packet.push([lands(k),{transform:at}]);
   if(k<route.length-1)packet.push([departs(k),{transform:at,easing:easing.crossfade}]);
  });
  squares.forEach((node,i)=>animate(node,track(cycle,{opacity:i===0?1:0},squarePoints[i]!),{duration:cycle}));
  links.forEach((node,i)=>animate(node,track(cycle,{opacity:0},linkPoints[i]!),{duration:cycle}));
  animate(svg.querySelector('[data-mesh-packet]'),track(cycle,{transform:'translate(0px,0px)'},packet),{duration:cycle});
 }));
 // Trustless: reports stream along every lane through the empty middle, where
 // no authority sits. Lanes start 1.2 s apart and each signal takes 2.4 s, so
 // two are usually in flight; senders give and receivers take a small pulse.
 document.querySelectorAll<SVGSVGElement>('[data-authority]').forEach(svg=>loopScene(svg,animate=>{
  const {cycle,travel,distance,fadeIn,fadeOut,send,receive}=authority;
  svg.querySelectorAll<SVGElement>('[data-signal]').forEach((node,i)=>{
   const options={duration:cycle,delay:i*authority.stagger};
   animate(node,track(cycle,{opacity:0,transform:'translateX(0px)'},[
    [0,{opacity:0,transform:'translateX(0px)'}],[fadeIn,{opacity:.9,transform:`translateX(${distance*fadeIn/travel}px)`}],
    [travel-fadeOut,{opacity:.9,transform:`translateX(${distance*(travel-fadeOut)/travel}px)`}],[travel,{opacity:0,transform:`translateX(${distance}px)`}],
   ]),options);
   animate(svg.querySelector(`[data-sender="${i}"]`),track(cycle,{transform:'scale(1)'},[[0,{transform:'scale(1)',easing:easing.crossfade}],[send*.4,{transform:'scale(.86)',easing:easing.crossfade}],[send,{transform:'scale(1)'}]]),options);
   animate(svg.querySelector(`[data-receiver="${i}"]`),track(cycle,{transform:'scale(1)'},[[travel-fadeOut,{transform:'scale(1)',easing:easing.reveal}],[travel-fadeOut+receive*.35,{transform:'scale(1.16)',easing:easing.crossfade}],[travel-fadeOut+receive,{transform:'scale(1)'}]]),options);
  });
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
