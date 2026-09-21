/** Finite emphasis moves from completed records to the active build and the work ahead. */
export function initRoadmap() {
  const roadmap=document.getElementById('roadmap');
  if(!roadmap||!('IntersectionObserver' in window))return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const narrow=matchMedia('(max-width:540px)');
  const lifecycle=new AbortController(), options={signal:lifecycle.signal};
  const pending=new Set(roadmap.querySelectorAll<HTMLElement>('[data-roadmap-reveal]'));
  const animations=new Map<Animation,Element>();
  const stop=(region?:HTMLElement)=>{
    animations.forEach((element,animation)=>{
      if(region&&!region.contains(element))return;
      animation.cancel();animations.delete(animation);
    });
  };
  const animate=(element:Element,frames:Keyframe[],duration:number,delay=0)=>{
    const animation=element.animate(frames,{duration,delay,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
    animations.set(animation,element);animation.onfinish=()=>animations.delete(animation);
  };
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    const region=entry.target as HTMLElement;
    if(!entry.isIntersecting||!pending.has(region))return;
    observer.unobserve(entry.target);
    pending.delete(region);
    if(reduced.matches||document.hidden)return;
    if(region.dataset.roadmapReveal==='completed'){
      region.querySelectorAll('.completion-check').forEach((check,index)=>animate(check,[{opacity:.3,transform:'scale(.65)'},{opacity:1,transform:'scale(1)'}],450,index*70));
      return;
    }
    region.querySelectorAll('[data-roadmap-trace]').forEach((line,index)=>{
      const axis=region.dataset.roadmapReveal==='next'&&narrow.matches?'Y':'X';
      animate(line,[{transform:`scale${axis}(.05)`},{transform:`scale${axis}(1)`}],900,index*100);
    });
    if(region.dataset.roadmapReveal==='current'){
      const marker=region.querySelector('.current-status > span');
      if(marker)animate(marker,[{transform:'scale(.6)'},{transform:'scale(1.4)',offset:.5},{transform:'scale(1)'}],650,200);
    }
  }),{threshold:.2});
  pending.forEach(region=>observer.observe(region));
  const settleRegion=(event:Event)=>{
    const region=event.target instanceof Element?event.target.closest<HTMLElement>('[data-roadmap-reveal]'):null;
    if(!region||!roadmap.contains(region))return;
    pending.delete(region);observer.unobserve(region);stop(region);
  };
  roadmap.addEventListener('focusin',settleRegion,options);
  roadmap.addEventListener('pointerdown',settleRegion,options);
  reduced.addEventListener('change',()=>{if(reduced.matches)stop();},options);
  narrow.addEventListener('change',()=>stop(),options);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();},options);
  window.addEventListener('pagehide',event=>{stop();observer.disconnect();if(!event.persisted)lifecycle.abort();},options);
  window.addEventListener('pageshow',event=>{if(event.persisted)pending.forEach(region=>observer.observe(region));},options);
}
