/** Header disclosures: native details/summary, enhanced for fine pointers.
 * Hover opens a panel after a short intent delay; moving to another item swaps
 * panels instantly (no close/reopen fade); leaving the navigation closes a
 * hover-opened panel after a grace period. Click, tap, keyboard and Escape keep
 * their native disclosure behaviour. No ARIA menu roles are used. */
const OPEN_DELAY = 90;
const CLOSE_DELAY = 260;

export function initNavigation() {
  const root=document.querySelector<HTMLElement>('[data-site-header]');
  if(!root)return;
  const lifecycle=new AbortController(),options={signal:lifecycle.signal};
  const nav=root.querySelector<HTMLElement>('.desktop-nav');
  const disclosures=[...root.querySelectorAll<HTMLDetailsElement>('[data-nav-disclosure]')];
  const hoverCapable=matchMedia('(hover:hover) and (pointer:fine)');
  const openedBy=new WeakMap<HTMLDetailsElement,'hover'|'click'>();
  let openTimer=0,closeTimer=0;
  const clearTimers=()=>{clearTimeout(openTimer);clearTimeout(closeTimer);};
  const sync=(item:HTMLDetailsElement)=>item.querySelector('summary')?.setAttribute('aria-expanded',String(item.open));
  const close=(except?:HTMLDetailsElement)=>disclosures.forEach(item=>{if(item!==except&&item.open){item.open=false;sync(item);}});
  // Swap panels within one frame with transitions suppressed, so the outgoing
  // panel never fades over the incoming one and no empty gap appears.
  const show=(item:HTMLDetailsElement,source:'hover'|'click')=>{
    const switching=disclosures.some(other=>other!==item&&other.open);
    if(switching){root.dataset.navSwitching='';requestAnimationFrame(()=>requestAnimationFrame(()=>delete root.dataset.navSwitching));}
    openedBy.set(item,source);
    if(!item.open){item.open=true;sync(item);}
    close(item);
  };
  disclosures.forEach(item=>{
    item.addEventListener('toggle',()=>{sync(item);if(item.open)close(item);else openedBy.delete(item);},options);
    const summary=item.querySelector('summary');
    item.addEventListener('pointerenter',event=>{
      if(event.pointerType!=='mouse'||!hoverCapable.matches)return;
      clearTimers();
      if(item.open)return;
      if(disclosures.some(other=>other.open))show(item,'hover');
      else openTimer=window.setTimeout(()=>show(item,'hover'),OPEN_DELAY);
    },options);
    item.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse')clearTimeout(openTimer);},options);
    // A click on a panel the pointer has already opened keeps it open and
    // pins it; a second click closes it natively.
    summary?.addEventListener('click',event=>{
      clearTimeout(openTimer);
      if(item.open&&openedBy.get(item)==='hover'&&event.detail>0){event.preventDefault();openedBy.set(item,'click');return;}
      if(!item.open)openedBy.set(item,'click');
    },options);
  });
  nav?.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')clearTimeout(closeTimer);},options);
  // A plain link in the bar (About) dismisses a panel the pointer opened.
  nav?.querySelectorAll<HTMLElement>(':scope > a').forEach(link=>link.addEventListener('pointerenter',event=>{
    if(event.pointerType!=='mouse')return;clearTimers();
    const current=disclosures.find(item=>item.open);if(current&&openedBy.get(current)==='hover')close();
  },options));
  nav?.addEventListener('pointerleave',event=>{
    if(event.pointerType!=='mouse')return;
    clearTimeout(openTimer);
    const current=disclosures.find(item=>item.open);
    if(current&&openedBy.get(current)==='hover')closeTimer=window.setTimeout(()=>close(),CLOSE_DELAY);
  },options);
  document.addEventListener('pointerdown',event=>{if(event.target instanceof Node&&!root.contains(event.target)){clearTimers();close();}},options);
  root.addEventListener('focusout',event=>{
    const next=event.relatedTarget;
    if(next instanceof Node&&nav&&!nav.contains(next)&&disclosures.some(item=>item.open)){clearTimers();close();}
  },options);
  root.addEventListener('keydown',event=>{if(event.key==='Escape'){const current=disclosures.find(item=>item.open);if(current){event.preventDefault();clearTimers();close();current.querySelector('summary')?.focus();}}},options);
  hoverCapable.addEventListener('change',()=>{clearTimers();},options);
  const dialog=root.querySelector<HTMLDialogElement>('dialog');
  const trigger=root.querySelector<HTMLButtonElement>('[data-mobile-open]');
  trigger?.addEventListener('click',()=>{dialog?.showModal();trigger.setAttribute('aria-expanded','true');document.documentElement.style.overflow='hidden';},options);
  const reset=()=>{trigger?.setAttribute('aria-expanded','false');document.documentElement.style.overflow='';trigger?.focus();};
  dialog?.addEventListener('close',reset,options);
  root.querySelector('[data-mobile-close]')?.addEventListener('click',()=>dialog?.close(),options);
  dialog?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>dialog.close(),options));
  window.addEventListener('pagehide',event=>{clearTimers();close();dialog?.close();document.documentElement.style.overflow='';if(!event.persisted)lifecycle.abort();},options);
}
