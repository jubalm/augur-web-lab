/** Finite, section-specific entrances. The static page never depends on a reveal. */
export function initProductPage() {
  if (!('IntersectionObserver' in window) || !('animate' in Element.prototype)) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const lifecycle = new AbortController();
  const options = { signal: lifecycle.signal };
  const pending = new Set(document.querySelectorAll<HTMLElement>(
    '.rm-page [data-reveal-group], .rm-page [data-reveal]',
  ));
  // A group owns its children so nested markers never animate a second time.
  pending.forEach(element => {
    if (element.parentElement?.closest('[data-reveal-group]')) pending.delete(element);
  });
  const active = new Map<HTMLElement, Set<Animation>>();
  const ease = 'cubic-bezier(.22,1,.36,1)';

  const settle = (region: HTMLElement) => {
    active.get(region)?.forEach(animation => animation.cancel());
    active.delete(region);
    if (!pending.has(region)) observer.unobserve(region);
  };
  const stop = () => Array.from(active.keys()).forEach(settle);
  const framesFor = (effect: string): Keyframe[] => {
    if (effect === 'draw') return [
      { transform: 'scaleX(0)', opacity: .3 }, { transform: 'scaleX(1)', opacity: 1 },
    ];
    if (effect === 'image') return [
      { transform: 'translateY(36px) scale(.94)', opacity: .12 },
      { transform: 'translateY(0) scale(1)', opacity: 1 },
    ];
    if (effect === 'panel') return [
      { transform: 'translateX(28px) scale(.985)', opacity: .12 },
      { transform: 'translateX(0) scale(1)', opacity: 1 },
    ];
    if (effect === 'fade') return [{ opacity: .08 }, { opacity: 1 }];
    if (effect === 'heading') return [
      { transform: 'translateY(38px)', opacity: .08 },
      { transform: 'translateY(0)', opacity: 1 },
    ];
    return [
      { transform: 'translateY(24px)', opacity: .08 },
      { transform: 'translateY(0)', opacity: 1 },
    ];
  };
  const reveal = (region: HTMLElement) => {
    pending.delete(region);
    region.dataset.revealed = '';
    if (reduced.matches || document.hidden || region.contains(document.activeElement)) {
      observer.unobserve(region);
      return;
    }

    const children = region.hasAttribute('data-reveal-group')
      ? Array.from(region.children).filter((child): child is HTMLElement => child instanceof HTMLElement)
      : [region];
    const running = new Set<Animation>();
    active.set(region, running);
    children.forEach((element, index) => {
      const effect = element.dataset.reveal || region.dataset.revealGroup || '';
      const order = Number(element.style.getPropertyValue('--reveal-order')) || index;
      const animation = element.animate(framesFor(effect), {
        duration: effect === 'image' ? 1050 : effect === 'heading' ? 950 : 850,
        delay: Math.min(order * 110, 330), easing: ease, fill: 'backwards',
      });
      running.add(animation);
      animation.onfinish = () => {
        running.delete(animation);
        if (!running.size) {
          active.delete(region);
          observer.unobserve(region);
        }
      };
    });
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const region = entry.target as HTMLElement;
      if (entry.isIntersecting && pending.has(region)) reveal(region);
      // The entrance itself can move a target just below the entry boundary.
      // Only settle an exit above the viewport, not that initial translation.
      else if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0) settle(region);
    });
  }, { threshold: .08, rootMargin: '0px 0px -16px 0px' });

  const observe = () => pending.forEach(region => observer.observe(region));
  const settleInteraction = (event: Event) => {
    if (!(event.target instanceof Node)) return;
    const target = event.target;
    // A focused control must never wait for its section's entrance to finish.
    new Set([...pending, ...active.keys()]).forEach(region => {
      if (!region.contains(target)) return;
      pending.delete(region);
      observer.unobserve(region);
      settle(region);
    });
  };
  document.addEventListener('focusin', settleInteraction, options);
  document.addEventListener('pointerdown', settleInteraction, options);
  reduced.addEventListener('change', () => { if (reduced.matches) stop(); }, options);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); }, options);
  window.addEventListener('beforeprint', stop, options);
  window.addEventListener('pagehide', event => {
    stop(); observer.disconnect();
    if (!event.persisted) lifecycle.abort();
  }, options);
  window.addEventListener('pageshow', event => { if (event.persisted) observe(); }, options);
  observe();
}
