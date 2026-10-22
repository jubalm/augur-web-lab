// The "?" beside each Why Augur card title on /3/ (Ryan 6, 21 Oct 2026): a toggletip. Its button opens
// a native popover (popovertarget), so a click, a tap, Enter and Space open and close it, and Esc and a
// click outside close it, with or without this script. The script adds what the popover can't do alone:
// on a mouse, resting on the "?" shows the definition and leaving the "?" and the box hides it; keyboard
// focus on the "?" shows it and leaving hides it. A press while it shows that way keeps it open (the
// native toggle would close it); a second press closes it. WCAG 1.4.13: dismissible (Esc), hoverable
// (the box holds it open) and persistent (it stays until the pointer or focus leaves, or Esc).
// Rendered inline after the section on /3/ only (review-inline.ts). compact() drops comment lines and
// indentation, so every statement ends with ';' and no code line carries a trailing comment.
(()=>{
document.querySelectorAll('[data-tenet-tip]').forEach(button=>{
const tip=button.popoverTargetElement;
if(!tip)return;
let timer,soft=false;
const shown=()=>tip.matches(':popover-open');
const show=delay=>{clearTimeout(timer);timer=setTimeout(()=>{if(!shown()){tip.showPopover({source:button});soft=true;}},delay);};
const hide=()=>{clearTimeout(timer);if(soft)timer=setTimeout(()=>{if(soft)tip.hidePopover();},300);};
const mouse=action=>event=>{if(event.pointerType==='mouse')action();};
button.addEventListener('pointerenter',mouse(()=>show(150)));
button.addEventListener('pointerleave',mouse(hide));
tip.addEventListener('pointerenter',mouse(()=>clearTimeout(timer)));
tip.addEventListener('pointerleave',mouse(hide));
button.addEventListener('focus',()=>{if(button.matches(':focus-visible'))show(0);});
button.addEventListener('blur',hide);
button.addEventListener('click',event=>{clearTimeout(timer);if(soft&&shown()){event.preventDefault();soft=false;}});
tip.addEventListener('toggle',event=>{if(event.newState==='closed')soft=false;});
});
})();
