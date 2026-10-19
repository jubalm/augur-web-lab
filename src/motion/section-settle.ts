// Section settle (owner, 19 Oct 2026: "make scrolling easier"). Not scrolljacking: the wheel, the
// trackpad and touch scroll natively, and most sections are taller than the screen, so jumping a
// whole section per tick would skip content. Instead, when a wheel or touch scroll comes to rest with
// a section's top within the last third of the way to the top of the screen, the page glides the rest
// of the way, so the section starts framed. It only ever continues the way the page was moving (a
// small nudge away from a section top stays put), and it leaves keyboard, find-in-page, focus and
// link scrolls alone. Off under reduced motion.
const RANGE=1/3;
const GESTURE_WINDOW=2500;
export function initSectionSettle(){
 const sections=[...document.querySelectorAll<HTMLElement>('main > section')];
 if(!sections.length)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const scrollend='onscrollend' in window;
 // gestureAt: when the last wheel or touch input happened. Momentum can keep the page moving after
 // touch ends (no events fire), so a scroll counts as the user's if it rests soon after their input.
 let gestureAt=0,touching=false,gliding=false,lastY=scrollY,direction=0,timer=0;
 const input=()=>{gestureAt=performance.now();gliding=false;};
 addEventListener('wheel',event=>{if(!(event as WheelEvent).ctrlKey)input();},{passive:true});
 addEventListener('touchstart',()=>{touching=true;input();},{passive:true});
 for(const type of ['touchend','touchcancel'])addEventListener(type,()=>{touching=false;input();},{passive:true});
 // Keys and clicks start their own scrolls (arrows, Page Down, links, focus), which settle as asked.
 for(const type of ['keydown','click'])addEventListener(type,()=>{gestureAt=0;},{passive:true});
 const rest=()=>{
  if(gliding){gliding=false;return;}
  if(touching||reduced.matches||!direction||performance.now()-gestureAt>GESTURE_WINDOW)return;
  gestureAt=0;
  const y=scrollY,range=innerHeight*RANGE;
  let target:number|undefined;
  // The first section sits under the header, so the page top stands in for it.
  for(const top of [0,...sections.slice(1).map(section=>Math.round(section.getBoundingClientRect().top+y))]){
   const distance=(top-y)*direction;
   if(distance>1&&distance<=range&&(target===undefined||distance<(target-y)*direction))target=top;
  }
  if(target===undefined)return;
  target=Math.min(target,document.documentElement.scrollHeight-innerHeight);
  if(Math.abs(target-y)<2)return;
  gliding=true;
  scrollTo({top:target,behavior:'smooth'});
 };
 addEventListener('scroll',()=>{
  const y=scrollY;if(y!==lastY){direction=Math.sign(y-lastY);lastY=y;}
  // Safari has no scrollend yet: rest is when scroll events stop.
  if(!scrollend){clearTimeout(timer);timer=window.setTimeout(rest,160);}
 },{passive:true});
 if(scrollend)addEventListener('scrollend',rest);
}
