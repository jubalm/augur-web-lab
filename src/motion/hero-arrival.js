// Inlined before the hero content so its first painted frame starts the sequence.
// CSS owns the finite motion; without this script the entire hero is visible.
(() => {
  const root = document.currentScript?.parentElement;
  if (!root || root.dataset.heroArrival) return;
  root.dataset.heroArrival = 'settled';

  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || document.hidden || root.contains(document.activeElement)) return;

  const lifecycle = new AbortController();
  let settled = false;
  function settle() {
    if (settled) return;
    settled = true;
    clearTimeout(cleanup);
    root.dataset.heroArrival = 'settled';
    lifecycle.abort();
  }

  // Backwards fill returns to visible base styles independently of this timer.
  const cleanup = setTimeout(settle, 3000);
  const inputOptions = { capture: true, passive: true, signal: lifecycle.signal };
  root.addEventListener('focusin', settle, inputOptions);
  root.addEventListener('pointerdown', settle, inputOptions);
  root.addEventListener('keydown', settle, inputOptions);
  root.addEventListener('animationend', event => {
    if (event.target instanceof HTMLElement && event.target.hasAttribute('data-hero-emphasis')) settle();
  }, { signal: lifecycle.signal });
  preference.addEventListener('change', settle, { signal: lifecycle.signal });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) settle();
  }, { signal: lifecycle.signal });
  // Returning from the history cache leaves the finished composition on screen.
  window.addEventListener('pagehide', settle, { signal: lifecycle.signal });

  root.dataset.heroArrival = 'entering';
})();
