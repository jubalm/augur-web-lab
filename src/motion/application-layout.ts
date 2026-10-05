import { easing, timing } from './timelines';
import { motionTime } from './debug';

/** FLIP only the interactive picker; its grid changes layout once per selection. */
export function setupApplicationLayout(root: HTMLElement, reduced: MediaQueryList) {
  const cards = [...root.querySelectorAll<HTMLElement>('.application-tab,.app-connector')];
  let first = new Map<HTMLElement, DOMRect>();
  let childrenFirst = new Map<HTMLElement, DOMRect>();
  let animations: Animation[] = [];
  const frozenPanels = new Map<HTMLElement, {width: string; transform: string}>();
  const cancelTransforms = () => { animations.forEach(animation=>animation.cancel()); animations=[]; };
  const restorePanels = () => {
    frozenPanels.forEach((style,panel)=>{panel.style.width=style.width;panel.style.transform=style.transform;});
    frozenPanels.clear();
  };
  const settle = () => { cancelTransforms(); restorePanels(); first.clear(); childrenFirst.clear(); };

  root.addEventListener('tabsbeforechange',()=>{
    // Read visual bounds before canceling an in-flight FLIP, so a rapid
    // selection continues from its current position rather than jumping.
    const visiblePanels=[...root.querySelectorAll<HTMLElement>('.application-panel:not([hidden])')];
    const snapshot=new Map([...cards,...visiblePanels].map(element=>[element,element.getBoundingClientRect()]));
    childrenFirst=new Map([...root.querySelectorAll<HTMLElement>('.application-tab>span')].map(element=>[element,element.getBoundingClientRect()]));
    cancelTransforms();restorePanels();first=snapshot;
  });
  root.addEventListener('tabschange',()=>{
    if(reduced.matches || typeof root.animate!=='function'){settle();return;}
    for(const [element,from] of first){
      if(element.classList.contains('application-panel')){
        // Preserve outgoing text width during its 160ms fade; changing grid
        // columns must not rewrap it before the incoming panel appears.
        frozenPanels.set(element,{width:element.style.width,transform:element.style.transform});
        element.style.width=`${from.width}px`;
        const to=element.getBoundingClientRect();
        element.style.transform=`translate(${from.left-to.left}px,${from.top-to.top}px)`;
        continue;
      }
      const to=element.getBoundingClientRect();
      if(!to.width || !to.height)continue;
      const dx=from.left-to.left,dy=from.top-to.top;
      const scale=element.classList.contains('application-tab')?from.width/to.width:1;
      if(Math.abs(dx)<.01&&Math.abs(dy)<.01&&Math.abs(scale-1)<.001)continue;
      const children=[...element.children].filter((child):child is HTMLElement=>child instanceof HTMLElement&&childrenFirst.has(child)).map(child=>({child,from:childrenFirst.get(child)!,to:child.getBoundingClientRect()}));
      try {
        animations.push(element.animate([
          {transformOrigin:'0 0',transform:`translate(${dx}px,${dy}px) scaleX(${scale})`},
          {transformOrigin:'0 0',transform:'translate(0,0) scaleX(1)'},
        ],{duration:motionTime(timing.panel),easing:easing.reveal}));
        // Counter-scale label/mark children so widening the surface never
        // stretches their text. Sample the reciprocal of the parent's scale;
        // both effects use the same easing and preserve the child's position.
        for(const item of children){
          const keyframes=Array.from({length:33},(_,index)=>{
            const progress=index/32,currentScale=scale+(1-scale)*progress;
            const left=(item.from.left-from.left)*(1-progress)+(item.to.left-to.left)*progress;
            const x=left/currentScale-(item.to.left-to.left);
            const y=((item.from.top-from.top)-(item.to.top-to.top))*(1-progress);
            return {offset:progress,transformOrigin:'0 0',transform:`translate(${x}px,${y}px) scaleX(${1/currentScale})`};
          });
          animations.push(item.child.animate(keyframes,{duration:motionTime(timing.panel),easing:easing.reveal}));
        }
      } catch { settle();break; }
    }
    first.clear();
    childrenFirst.clear();
  });
  root.addEventListener('tabspanelshown',restorePanels);
  root.addEventListener('tabssettled',settle);
}
