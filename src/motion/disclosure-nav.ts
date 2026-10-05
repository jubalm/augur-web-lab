export function initNavigation() {
  const root=document.querySelector<HTMLElement>('[data-site-header]');
  if(!root)return;
  const lifecycle=new AbortController(),options={signal:lifecycle.signal};
  const disclosures=[...root.querySelectorAll<HTMLDetailsElement>('[data-nav-disclosure]')];
  const close=(except?:HTMLDetailsElement)=>disclosures.forEach(item=>{if(item!==except){item.open=false;item.querySelector('summary')?.setAttribute('aria-expanded','false');}});
  disclosures.forEach(item=>item.addEventListener('toggle',()=>{item.querySelector('summary')?.setAttribute('aria-expanded',String(item.open));if(item.open)close(item);},options));
  document.addEventListener('pointerdown',event=>{if(event.target instanceof Node&&!root.contains(event.target))close();},options);
  root.addEventListener('keydown',event=>{if(event.key==='Escape'){const current=disclosures.find(item=>item.open);if(current){event.preventDefault();close();current.querySelector('summary')?.focus();}}},options);
  const dialog=root.querySelector<HTMLDialogElement>('dialog');
  const trigger=root.querySelector<HTMLButtonElement>('[data-mobile-open]');
  trigger?.addEventListener('click',()=>{dialog?.showModal();trigger.setAttribute('aria-expanded','true');document.documentElement.style.overflow='hidden';},options);
  const reset=()=>{trigger?.setAttribute('aria-expanded','false');document.documentElement.style.overflow='';trigger?.focus();};
  dialog?.addEventListener('close',reset,options);
  root.querySelector('[data-mobile-close]')?.addEventListener('click',()=>dialog?.close(),options);
  dialog?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>dialog.close(),options));
  window.addEventListener('pagehide',event=>{close();dialog?.close();document.documentElement.style.overflow='';if(!event.persisted)lifecycle.abort();},options);
}
