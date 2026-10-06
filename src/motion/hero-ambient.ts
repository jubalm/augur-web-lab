import { easing, heroAmbient as ambient } from './timelines';
import { motionTime } from './debug';

/** Hero ambience: runs only after the arrival has settled, while the hero is
 * on screen and the tab is visible, and never under reduced motion.
 *
 * Every 8 s cycle, each ring draws in towards the empty centre (outer ring
 * first) and the dashed centre answers. The effects exist only for the active
 * 2.4 s of a cycle: a continuous CSS animation would force style work on every
 * frame of its long rest. The background drift is CSS on one composited layer,
 * switched by `data-ambient` on the hero. The ring highlight follows a fine
 * pointer; touch needs no hover. */
export function initHeroAmbient(art: SVGSVGElement) {
  const hero = art.closest<HTMLElement>('[data-home-hero]');
  if (!hero || typeof art.animate !== 'function') return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  const lifecycle = new AbortController(), options = { signal: lifecycle.signal };
  const rings = [...art.querySelectorAll<SVGGElement>('.hero-ring')];
  const centre = art.querySelector<SVGRectElement>('.empty-centre');
  let visible = false, timer = 0, wave: Animation[] = [];

  const settled = () => hero.dataset.heroArrival === 'settled';
  const running = () => visible && !document.hidden && !reduced.matches && settled();
  const clearWave = () => { wave.forEach(animation => animation.cancel()); wave = []; };
  const playWave = () => {
    clearWave();
    const { start, end, peak } = ambient.wave;
    for (const ring of rings) {
      const delay = start + (7 - Number(ring.dataset.ring)) * ambient.ringStagger;
      wave.push(ring.animate([
        { transform: 'scale(1)', easing: easing.crossfade },
        { transform: `scale(${ambient.wave.scale})`, offset: (peak - start) / (end - start), easing: easing.crossfade },
        { transform: 'scale(1)' },
      ], { duration: motionTime(end - start), delay: motionTime(delay) }));
    }
    if (centre) {
      const { start: from, end: to, dim } = ambient.centre;
      wave.push(centre.animate([
        { strokeDashoffset: 0, strokeOpacity: 1, easing: easing.crossfade },
        { strokeOpacity: .55, offset: (dim - from) / (to - from), easing: easing.crossfade },
        // Two whole dash periods: the last frame matches the static pattern.
        { strokeDashoffset: -16, strokeOpacity: 1 },
      ], { duration: motionTime(to - from), delay: motionTime(from) }));
    }
    timer = window.setTimeout(playWave, motionTime(ambient.cycle));
  };
  const sync = () => {
    const state = reduced.matches || !settled() ? null : running() ? 'running' : 'paused';
    if (state) hero.dataset.ambient = state; else delete hero.dataset.ambient;
    clearTimeout(timer);
    if (state === 'running') {
      // Resume a wave in progress; otherwise begin the next one shortly.
      const active = wave.filter(animation => animation.playState === 'paused');
      if (active.length) { active.forEach(animation => animation.play()); timer = window.setTimeout(playWave, motionTime(ambient.cycle - ambient.wave.end)); }
      else timer = window.setTimeout(playWave, motionTime(ambient.resume));
    } else if (state === 'paused') wave.forEach(animation => { if (animation.playState === 'running') animation.pause(); });
    else clearWave();
  };
  new MutationObserver(sync).observe(hero, { attributes: true, attributeFilter: ['data-hero-arrival'] });
  const observer = new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); sync(); });
  observer.observe(hero);
  document.addEventListener('visibilitychange', sync, options);
  reduced.addEventListener('change', sync, options);
  window.addEventListener('beforeprint', () => { clearTimeout(timer); clearWave(); delete hero.dataset.ambient; }, options);
  window.addEventListener('afterprint', sync, options);

  // Ring highlight: rings are concentric squares about the empty centre, so the
  // pointer's square (Chebyshev) distance from the centre picks the ring.
  let frame = 0, x = 0, y = 0;
  const clear = () => { cancelAnimationFrame(frame); frame = 0; delete art.dataset.hoverRing; };
  art.parentElement?.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !fine.matches) return;
    x = event.clientX; y = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const matrix = art.getScreenCTM(); if (!matrix) return;
      const point = new DOMPoint(x, y).matrixTransform(matrix.inverse());
      const distance = Math.max(Math.abs(point.x - 286), Math.abs(point.y - 228.5));
      const ring = Math.round(distance / ambient.ringRadius);
      if (ring >= 1 && ring <= 7 && Math.abs(distance - ring * ambient.ringRadius) <= ambient.ringRadius / 2) art.dataset.hoverRing = String(ring);
      else delete art.dataset.hoverRing;
    });
  }, { ...options, passive: true });
  art.parentElement?.addEventListener('pointerleave', clear, options);
  window.addEventListener('pagehide', event => { clear(); clearTimeout(timer); clearWave(); if (!event.persisted) { observer.disconnect(); lifecycle.abort(); } }, options);
  window.addEventListener('pageshow', event => { if (event.persisted) { observer.observe(hero); sync(); } }, options);
  sync();
}
