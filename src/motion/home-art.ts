import {playOnce} from './play-once';
import {crossAnywhere} from '../data/diagrams';
import {easing,tenetTimeline as t,repTimeline as rep} from './timelines';
export function initTenets(){
 document.querySelectorAll<HTMLElement>('[data-tenets]').forEach(root=>playOnce(root,animate=>{
  animate(root.querySelector('[data-answer]'),[{opacity:0},{opacity:1}],{delay:t.answer.start,duration:t.answer.fade});
  animate(root.querySelector('[data-answer]'),[{transform:'translateY(18px)'},{transform:'translateY(0)'}],{delay:t.answer.start,duration:t.answer.rise});
  const pop=(node:Element,delay:number)=>{animate(node,[{opacity:0},{opacity:1}],{delay,duration:t.participant.fade});animate(node,[{transform:'scale(.3)'},{transform:'scale(1)'}],{delay,duration:t.participant.duration});};
  animate(root.querySelector('[data-edge]'),[{opacity:0},{opacity:1}],{delay:t.edge.start,duration:t.edge.duration});
  root.querySelectorAll('[data-cross] [data-participant]').forEach((node,i)=>pop(node,t.participant.starts[i]!));
  root.querySelectorAll('[data-crosser]').forEach((node,i)=>{const square=crossAnywhere.crossers[i]!;animate(node,[{transform:`translate(${square.dx}px,${square.dy}px)`},{transform:'translate(0,0)'}],{delay:t.crosser.starts[i],duration:t.crosser.duration,easing:i===3?easing.newcomer:easing.reveal});animate(node,[{opacity:0},{opacity:1}],{delay:t.crosser.starts[i],duration:t.crosser.fade});});
  root.querySelectorAll('[data-trail]').forEach((node,i)=>animate(node,[{opacity:0},{opacity:crossAnywhere.trails[i]!.opacity}],{delay:t.trails[i],duration:150}));
  root.querySelectorAll('[data-mesh] [data-participant]').forEach((node,i)=>pop(node,t.mesh.squares[i]!));
  root.querySelectorAll('[data-link]').forEach((node,i)=>animate(node,[{strokeDasharray:'1',strokeDashoffset:1},{strokeDasharray:'1',strokeDashoffset:0}],{delay:t.mesh.links[i],duration:t.mesh.linkDuration,easing:easing.draw}));
  root.querySelectorAll('[data-mesh-glow]').forEach((node,i)=>{const duration=i===6?1050:950;animate(node,[{opacity:0,offset:0},{opacity:1,offset:350/duration},{opacity:1,offset:(duration-400)/duration},{opacity:0,offset:1}],{delay:t.mesh.highlightStart+i*t.mesh.hop,duration,easing:easing.crossfade});});
  root.querySelectorAll('[data-mesh-glow-link]').forEach((node,i)=>animate(node,[{opacity:0,offset:0},{opacity:1,offset:250/800},{opacity:1,offset:350/800},{opacity:0,offset:1}],{delay:2100+i*t.mesh.hop,duration:800,easing:easing.crossfade}));
  root.querySelectorAll('[data-authority] [data-participant]').forEach((node,i)=>pop(node,t.authority.participants[i]!));
  root.querySelectorAll('[data-line]').forEach((node,i)=>animate(node,[{strokeDasharray:'1',strokeDashoffset:1},{strokeDasharray:'1',strokeDashoffset:0}],{delay:t.authority.lines[i],duration:t.authority.lineDuration,easing:easing.draw}));
  root.querySelectorAll('[data-empty]').forEach((node,i)=>animate(node,[{opacity:0},{opacity:.5}],{delay:t.authority.dots[i],duration:t.authority.dotDuration}));
  root.querySelectorAll('[data-authority] [data-signal]').forEach((node,i)=>{const delay=t.authority.signalStart+i*t.authority.signalStagger;animate(node,[{transform:'translateX(0)'},{transform:'translateX(268px)'}],{delay,duration:t.authority.signalDuration,easing:easing.crossfade});animate(node,[{opacity:0,offset:0},{opacity:.9,offset:120/900},{opacity:.9,offset:750/900},{opacity:0,offset:1}],{delay,duration:t.authority.signalDuration,easing:easing.crossfade});});
  animate(root.querySelector('[data-result-pending]'),[{opacity:0,offset:0},{opacity:1,offset:200/2150},{opacity:1,offset:1850/2150},{opacity:0,offset:1}],{delay:700,duration:2150});
  animate(root.querySelector('[data-result-pending]'),[{transform:'scale(.3)'},{transform:'scale(1)'}],{delay:700,duration:320});
  animate(root.querySelector('[data-result]'),[{opacity:0},{opacity:1}],{delay:t.authority.resultStart,duration:t.authority.resultDuration,easing:easing.crossfade});
 }));
}
export function initSquareMath(){document.querySelectorAll<HTMLElement>('[data-square-row]').forEach((root,i)=>playOnce(root,animate=>{
 const delay=i*rep.rowStagger;
 animate(root.querySelector('[data-stake]'),[{opacity:0,transform:'scale(.3)'},{opacity:1,transform:'scale(1)'}],{delay,duration:rep.stake.duration});
 animate(root.querySelector('[data-arrow]'),[{opacity:0,transform:'scaleX(0)'},{opacity:1,transform:'scaleX(1)'}],{delay:delay+rep.arrow.start,duration:rep.arrow.duration});
 const returned=root.querySelector('[data-returned]');const stake=root.querySelector('[data-stake]');const offset=returned&&stake?returned.getBoundingClientRect().left-stake.getBoundingClientRect().left:100;
 animate(returned,[{opacity:0,transform:`translateX(-${offset}px)`},{opacity:1,transform:'translateX(0)'}],{delay:delay+rep.returned.start,duration:rep.returned.duration});
 animate(root.querySelector('[data-plus]'),[{opacity:0},{opacity:1}],{delay:delay+rep.plus.start,duration:rep.plus.duration});
 animate(root.querySelector('[data-win]'),[{opacity:0,transform:'scale(.3)'},{opacity:1,transform:'scale(1)'}],{delay:delay+rep.win.start,duration:rep.win.duration});
 animate(root.querySelector('[data-risk-moving]'),[{opacity:0,transform:'translateX(-100px)',offset:0},{opacity:1,transform:'translateX(-100px)',offset:.1},{opacity:1,transform:'translateX(0)',offset:.8},{opacity:0,transform:'translateX(0)',offset:1}],{delay:delay+rep.returned.start,duration:rep.returned.duration});
 animate(root.querySelector('[data-lost]'),[{opacity:0},{opacity:1}],{delay:delay+rep.win.start,duration:rep.win.duration});
}));}
