/** Scroll advances an illustration; native controls and reading order remain the fallback. */
export function initResolutionJourney(section: HTMLElement) {
  const sticky = section.querySelector<HTMLElement>('[data-journey-sticky]');
  const inputs = Array.from(section.querySelectorAll<HTMLInputElement>('[name="product-resolution-stage"]'));
  const scenes = Array.from(section.querySelectorAll<HTMLElement>('.mechanism-scene'));
  if (!sticky || inputs.length !== 4) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const wide = matchMedia('(min-width: 900px)');
  const lifecycle = new AbortController();
  const options = { signal:lifecycle.signal };
  let travel = 0, enabled = false, inView = true, frame = 0, current = 0;
  // Focusing a control can scroll it into view. Keep that browser adjustment
  // from selecting a different scene before the visitor can use the control.
  let focusGuardUntil = 0;
  let animation: Animation | undefined;
  const select = (index: number) => {
    if (index === current) return;
    current = index;
    inputs[index].checked = true;
    animation?.cancel();
    const diagram = scenes[index]?.querySelector('.mechanism-diagram > *');
    if (diagram && !reduced.matches && !document.hidden) {
      animation = diagram.animate([{transform:'translateY(12px)'},{transform:'translateY(0)'}],{duration:500,easing:'cubic-bezier(.16,1,.3,1)'});
    }
  };
  const sync = () => {
    frame = 0;
    if (!enabled || !inView || document.hidden || performance.now() < focusGuardUntil) return;
    const progress = Math.max(0,Math.min(1,(24-section.getBoundingClientRect().top)/travel));
    select(Math.min(3,Math.floor(progress*4)));
  };
  const schedule = () => { if (!frame && enabled && inView) frame=requestAnimationFrame(sync); };
  const measure = () => {
    cancelAnimationFrame(frame); frame=0;
    animation?.cancel();
    delete section.dataset.scrollDriven;
    section.style.removeProperty('--journey-height');
    enabled = wide.matches && !reduced.matches && sticky.offsetHeight < innerHeight-48;
    if (!enabled) return;
    travel = Math.max(900,Math.min(1440,innerHeight*1.4));
    section.style.setProperty('--journey-height',`${sticky.offsetHeight+travel+48}px`);
    section.dataset.scrollDriven='';
    schedule();
  };
  inputs.forEach((input,index)=>input.addEventListener('change',()=>{
    select(index);
    if (!enabled) return;
    const start=window.scrollY+section.getBoundingClientRect().top-24;
    window.scrollTo({top:start+travel*(index===0?0:(index+.1)/4),behavior:'instant'});
  },options));
  section.addEventListener('focusin', () => { focusGuardUntil=performance.now()+800; }, options);
  const resumeFromInput = () => { focusGuardUntil=0; schedule(); };
  window.addEventListener('wheel',resumeFromInput,{...options,passive:true});
  window.addEventListener('touchmove',resumeFromInput,{...options,passive:true});
  window.addEventListener('keydown',event=>{
    if(['PageDown','PageUp','Home','End'].includes(event.key))resumeFromInput();
  },options);
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>{
    inView=entries.some(entry=>entry.isIntersecting);
    if(inView) schedule(); else {cancelAnimationFrame(frame); frame=0; animation?.cancel();}
  },{rootMargin:'100px'}) : undefined;
  observer?.observe(section);
  window.addEventListener('scroll',schedule,{...options,passive:true});
  window.addEventListener('resize',measure,options);
  reduced.addEventListener('change',measure,options);
  wide.addEventListener('change',measure,options);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;animation?.cancel();}else schedule();},options);
  window.addEventListener('pagehide',event=>{cancelAnimationFrame(frame);animation?.cancel();observer?.disconnect();if(!event.persisted)lifecycle.abort();},options);
  window.addEventListener('pageshow',event=>{if(event.persisted){observer?.observe(section);measure();}},options);
  document.fonts.ready.then(()=>{if(!lifecycle.signal.aborted)measure();});
  measure();
}
