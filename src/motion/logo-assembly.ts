/** Isolated, finite identity study. Static markup is the default/failure state. */
export function mountLogoAssembly(root: HTMLElement) {
  const replay = root.querySelector<HTMLButtonElement>('[data-replay]')!;
  const preview = root.querySelector<HTMLInputElement>('[data-static]')!;
  const status = root.querySelector<HTMLElement>('[data-motion-status]')!;
  const paths = [...root.querySelectorAll<SVGPathElement>('path')];
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let animations: Animation[] = [];
  let run = 0;
  const reduced = () => preference.matches || preview.checked;

  function cancel() {
    run++;
    animations.forEach(animation => animation.cancel());
    animations = [];
  }
  function settle() {
    cancel();
    status.textContent = reduced() ? 'Static · reduced motion' : 'Assembled';
  }
  async function play() {
    settle();
    if (reduced() || document.hidden || !Element.prototype.animate) return;
    const current = run;
    status.textContent = 'Assembling';
    animations = paths.map((path, index) => path.animate([
      { transform: `translateY(${index % 2 === 0 ? '-18px' : '18px'})`, opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 },
    ], { duration: 700, delay: index % 2 * 100, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' }));
    await Promise.allSettled(animations.map(animation => animation.finished));
    if (current === run) settle();
  }
  const onVisibility = () => { if (document.hidden) settle(); };
  root.querySelector<HTMLElement>('.motion-controls')!.hidden = false;
  replay.addEventListener('click', play);
  preview.addEventListener('change', settle);
  preference.addEventListener('change', settle);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', (event) => {
    settle();
    // A cached page keeps its controls alive when restored with Back/Forward.
    if (event.persisted) return;
    replay.removeEventListener('click', play);
    preview.removeEventListener('change', settle);
    preference.removeEventListener('change', settle);
    document.removeEventListener('visibilitychange', onVisibility);
  });
  void play();
}
