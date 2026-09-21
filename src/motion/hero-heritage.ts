/** One finite arrival and one pointer mask. No renderer or idle animation loop. */
export function initHeroHeritage(field: SVGSVGElement) {
  const hero=field.closest<HTMLElement>('[data-product-hero]');
  const radius=field.querySelector<SVGCircleElement>('[data-heritage-radius]');
  const base=field.querySelector<SVGGElement>('[data-heritage-base]');
  if(!hero||!radius||!base)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const lifecycle=new AbortController(), options={signal:lifecycle.signal};
  let visible=true, frame=0, pointer: {x:number;y:number}|undefined;
  const entrance=!reduced.matches&&!document.hidden
    ? base.animate([{opacity:.15},{opacity:getComputedStyle(base).opacity}],{duration:1200,easing:'cubic-bezier(.16,1,.3,1)'}) : undefined;
  const reset=()=>{cancelAnimationFrame(frame);frame=0;pointer=undefined;delete field.dataset.pointerActive;};
  const paint=()=>{
    frame=0;
    if(!pointer||!visible||document.hidden||reduced.matches||!fine.matches)return;
    const matrix=field.getScreenCTM();
    if(!matrix)return;
    const point=new DOMPoint(pointer.x,pointer.y).matrixTransform(matrix.inverse());
    radius.setAttribute('cx',String(point.x));radius.setAttribute('cy',String(point.y));
    radius.setAttribute('r',String(180/Math.hypot(matrix.a,matrix.b)));
    field.dataset.pointerActive='';
  };
  hero.addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse'||reduced.matches||!fine.matches||!visible||document.hidden||hero.contains(document.activeElement))return;
    pointer={x:event.clientX,y:event.clientY};
    if(!frame)frame=requestAnimationFrame(paint);
  },{...options,passive:true});
  ['pointerleave','pointercancel','focusin'].forEach(type=>hero.addEventListener(type,reset,options));
  window.addEventListener('resize',reset,options);
  window.addEventListener('scroll',reset,{...options,passive:true});
  reduced.addEventListener('change',()=>{reset();if(reduced.matches)entrance?.cancel();},options);
  fine.addEventListener('change',reset,options);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){reset();entrance?.cancel();}},options);
  const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
    visible=entries.some(entry=>entry.isIntersecting);
    if(!visible){reset();entrance?.cancel();}
  }):undefined;
  observer?.observe(hero);
  window.addEventListener('pagehide',event=>{reset();entrance?.cancel();observer?.disconnect();if(!event.persisted)lifecycle.abort();},options);
  window.addEventListener('pageshow',event=>{if(event.persisted)observer?.observe(hero);},options);
}
