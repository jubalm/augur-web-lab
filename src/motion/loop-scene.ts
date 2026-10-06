import { motionTime } from './debug';
import type { Animate } from './play-once';

/** Seamless looping scenes (owner polish brief, 5 Oct 2026).
 * Every cycle starts and ends on the static artwork, so the server-rendered
 * diagram is also the no-JavaScript, reduced-motion and print state. A scene
 * starts once `threshold` of it is visible, then repeats while any part is on
 * screen; it pauses off-screen or in a hidden tab and resumes where it was. */
export function loopScene(root: Element, build: (animate: Animate) => void, { threshold = .4 } = {}) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window) || typeof root.animate !== 'function') return;
  let animations: Animation[] = [];
  let started = false;
  let visible = false;
  const animate: Animate = (element, keyframes, options = {}) => {
    if (!element) return;
    // The cycle itself runs linearly; easing lives on the keyframes.
    const animation = element.animate(keyframes, { easing: 'linear', iterations: Infinity, fill: 'none', ...options, duration: motionTime(Number(options.duration ?? 320)), delay: motionTime(Number(options.delay ?? 0)) });
    animation.pause();
    animations.push(animation);
    return animation;
  };
  const running = () => visible && !document.hidden;
  const sync = () => {
    if (!started) {
      if (!running()) return;
      started = true;
      try { build(animate); } catch { stop(); return; }
    }
    // Pausing every effect together keeps the scene's tracks in step.
    animations.forEach(animation => running() ? animation.play() : animation.pause());
  };
  const reset = () => { animations.forEach(animation => animation.cancel()); animations = []; started = false; };
  const events = new AbortController();
  const observer = new IntersectionObserver(entries => {
    const entry = entries[entries.length - 1]!;
    // Start at the threshold; once running, keep going until fully off-screen.
    visible = started ? entry.isIntersecting : entry.intersectionRatio >= threshold;
    sync();
  }, { threshold: [0, threshold] });
  const stop = () => { reset(); observer.disconnect(); events.abort(); };
  observer.observe(root);
  document.addEventListener('visibilitychange', sync, { signal: events.signal });
  reduced.addEventListener('change', () => { if (reduced.matches) stop(); }, { signal: events.signal });
  // Print shows the static artwork; the loop rebuilds afterwards if still visible.
  window.addEventListener('beforeprint', reset, { signal: events.signal });
  window.addEventListener('afterprint', sync, { signal: events.signal });
  window.addEventListener('pagehide', () => animations.forEach(animation => animation.pause()), { signal: events.signal });
  window.addEventListener('pageshow', sync, { signal: events.signal });
  return stop;
}

/** Helpers for keyframes authored on a cycle timeline in milliseconds. */
export const at = (time: number, cycle: number) => Math.min(1, Math.max(0, time / cycle));
