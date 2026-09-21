/** Discrete narrative states: native scroll remains in control, and every state is directly selectable. */
export function initResolutionStory(root: HTMLElement) {
  if (root.dataset.enhanced) return;
  const controls = root.querySelector<HTMLElement>('[data-story-controls]');
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-story-select]'));
  const chapters = Array.from(root.querySelectorAll<HTMLElement>('[data-story-chapter]'));
  const toggle = root.querySelector<HTMLButtonElement>('[data-story-path]');
  if (!controls || buttons.length !== 4 || chapters.length !== 4 || !toggle) return;
  const lifecycle = new AbortController();
  const options = { signal: lifecycle.signal };
  const roomy = matchMedia('(min-width: 901px) and (min-height: 761px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let challenged = true;
  let manual = false;
  let observer: IntersectionObserver | undefined;
  const setText = (selector: string, value: string) => {
    const element = root.querySelector<HTMLElement>(selector);
    if (element) element.textContent = value;
  };
  const update = (index: number, announce = false) => {
    active = index;
    const answers = ['—', challenged ? 'Yes' : 'No', 'No', 'No'];
    const amounts = ['—', '15', challenged ? '30' : '15', challenged ? '30' : '15'];
    const captions = [
      'The criteria define Yes, No and Invalid before anyone reports an answer.',
      challenged ? 'A reporter backs Yes with 15 REP, although independent replication is missing.' : 'A reporter follows the criteria and backs No with 15 REP.',
      challenged ? 'A challenger backs No with 30 REP. A new appeal period begins.' : 'No one challenges the reported answer during its appeal period.',
      challenged ? 'The challenged answer stands after its appeal period. The application can use No.' : 'The unchallenged report becomes final. The application can use No.',
    ];
    root.dataset.stage = String(index);
    root.dataset.answer = answers[index];
    setText('[data-story-status]', ['Question defined', 'Answer reported', challenged ? 'Answer challenged' : 'Appeal period', 'Final outcome'][index]);
    setText('[data-answer-label]', index === 0 ? 'Possible answers' : index === 3 ? 'Final answer' : 'Proposed answer');
    setText('[data-story-answer]', index === 0 ? 'Yes / No / Invalid' : answers[index]);
    setText('[data-story-bond]', amounts[index]);
    setText('[data-bond-label]', index === 0 ? 'No reporting bond yet' : index === 3 ? 'Final reporting bond' : 'Bond at stake');
    setText('[data-story-caption]', captions[index]);
    buttons.forEach((button,i) => button.setAttribute('aria-pressed',String(i === index)));
    chapters.forEach((chapter,i) => chapter.toggleAttribute('data-active-chapter',i === index));
    if (announce) setText('[data-story-announcement]', `Step ${index+1}. ${captions[index]}`);
  };
  buttons.forEach((button,index) => button.addEventListener('click', () => {
    manual = true;
    update(index,true);
  },options));
  toggle.addEventListener('click', () => {
    challenged = !challenged;
    manual = true;
    toggle.setAttribute('aria-pressed',String(challenged));
    setText('[data-report-example]',challenged
      ? 'In this example, the reporter says Yes and posts 15 REP. But independent replication is missing.'
      : 'In this example, the reporter follows the criteria: no independent replication, so No. They post 15 REP.');
    setText('[data-challenge-example]',challenged
      ? 'A challenger follows the criteria: No replication, so No. Their 30 REP bond replaces the proposed outcome.'
      : 'In this path, no one challenges No. The answer stays open for the full appeal period before it can become final.');
    update(active,true);
  },options);
  // Manual exploration remains stable until the visitor resumes scrolling.
  window.addEventListener('wheel', () => { manual = false; },{...options,passive:true});
  window.addEventListener('touchmove', () => { manual = false; },{...options,passive:true});
  window.addEventListener('keydown', event => {
    if (['PageDown','PageUp','ArrowDown','ArrowUp','Home','End',' '].includes(event.key) && !(event.target instanceof HTMLButtonElement)) manual = false;
  },options);
  const observe = () => {
    observer?.disconnect();
    if (!roomy.matches || !('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      if (manual) return;
      const crossing = entries.filter(entry => entry.isIntersecting).sort((a,b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
      if (crossing[0]) update(Number((crossing[0].target as HTMLElement).dataset.storyChapter));
    },{rootMargin:'-25% 0px -50% 0px',threshold:0});
    chapters.forEach(chapter => observer?.observe(chapter));
  };
  // CSS handles reduced motion immediately, including an in-flight path transition.
  reduced.addEventListener('change', () => {
    if (reduced.matches) root.getAnimations({subtree:true}).forEach(animation => animation.finish());
  },options);
  roomy.addEventListener('change',observe,options);
  window.addEventListener('pagehide', event => {
    observer?.disconnect();
    if (!event.persisted) lifecycle.abort();
  },options);
  window.addEventListener('pageshow', event => { if (event.persisted) observe(); },options);
  root.dataset.enhanced = '';
  controls.hidden = false;
  update(0);
  observe();
}
