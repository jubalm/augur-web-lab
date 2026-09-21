// Inline before the hero markup: the first painted frame owns the whole entrance.
// Default CSS is fully visible, including if this enhancement cannot run.
(() => {
  const hero = document.currentScript?.parentElement;
  if (!hero || hero.dataset.productArrival) return;
  hero.dataset.productArrival = 'settled';

  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || document.hidden || hero.contains(document.activeElement)) return;

  const lifecycle = new AbortController();
  const options = { signal: lifecycle.signal };
  let settled = false;
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) settle();
  }) : undefined;
  const cleanup = window.setTimeout(settle, 2200);

  function settle() {
    if (settled) return;
    settled = true;
    clearTimeout(cleanup);
    hero.dataset.productArrival = 'settled';
    observer?.disconnect();
    lifecycle.abort();
  }

  const interactionOptions = { ...options, capture: true, passive: true };
  hero.addEventListener('focusin', settle, interactionOptions);
  hero.addEventListener('pointerdown', settle, interactionOptions);
  hero.addEventListener('keydown', settle, interactionOptions);
  hero.addEventListener('animationend', event => {
    if (event.target instanceof Element && event.target.matches('.hero-scroll .web-icon')) settle();
  }, options);
  preference.addEventListener('change', settle, options);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) settle();
  }, options);
  // History-cache restores retain the settled page; nothing starts a new sequence.
  window.addEventListener('pagehide', settle, options);
  observer?.observe(hero);
  hero.dataset.productArrival = 'entering';
})();
