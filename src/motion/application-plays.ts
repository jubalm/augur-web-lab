import { easing, flightTimeline as f, prizeTimeline as p, timeAt } from './timelines';
import type { Animate } from './play-once';

/** Insurance plays its flight in (owner, 6 Oct 2026: subtle motion). The card is
 * rendered with the arrival known, so no-JavaScript, reduced motion and print show
 * it complete. The marker leaves the scheduled-arrival tick and slides to the
 * actual arrival with the delay line growing behind it, and the summary brightens
 * as the marker passes +2 hours. Transform and opacity only; distances are
 * percentages of the track (`--arrival`, `--limit`), so the play reads no layout
 * and starts while the panel is still hidden. Returns when the signal may leave (ms, unscaled). */
export function playFlight(card: HTMLElement, animate: Animate, start = 0): number {
  const track = card.querySelector<HTMLElement>('.flight-track');
  if (!track) return start;
  const style = getComputedStyle(track), arrival = parseFloat(style.getPropertyValue('--arrival')), limit = parseFloat(style.getPropertyValue('--limit'));
  const at = start + f.delay, travel = { delay: at, duration: f.travel, easing: easing.draw, fill: 'backwards' } as const;
  // The line scales from the track's left edge and the run slides its own width,
  // so the line's end stays under the marker's centre throughout.
  animate(card.querySelector('.flight-delay'), [{ transform: 'scaleX(0)' }, { transform: 'none' }], travel);
  animate(card.querySelector('.flight-run'), [{ transform: 'translateX(-100%)' }, { transform: 'none' }], travel);
  const passes = arrival > 0 && limit > 0 ? timeAt(easing.draw, limit / arrival) : 1;
  animate(card.querySelector('.flight-summary>span:last-child'), [{ opacity: f.label }, { opacity: 1 }], { delay: at + f.travel * passes, duration: f.fade, easing: easing.crossfade, fill: 'backwards' });
  return at + f.travel + f.signal;
}

/** DAOs & grants plays its prize in (owner, 6 Oct 2026: subtle motion). The card
 * is rendered with Team B as the answer; while it plays, a temporary aria-hidden
 * veil shows Team B as a plain tile like the others, then fades to the Green
 * winner as its check pops in, and the caption rises in. Returns when the signal
 * may leave (ms, unscaled). */
export function playPrize(card: HTMLElement, animate: Animate, start = 0): number {
  const winner = card.querySelector<HTMLElement>('.is-winner');
  if (!winner) return start;
  const win = start + p.win;
  const veil = Object.assign(document.createElement('span'), { className: 'prize-veil' });
  const top = Object.assign(document.createElement('span'), { className: 'prize-top' });
  top.append(Object.assign(document.createElement('span'), { className: 'prize-mark' }));
  veil.setAttribute('aria-hidden', 'true');
  veil.append(top, [...winner.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent).join(''));
  winner.append(veil);
  const reveal = animate(veil, [{ opacity: 1 }, { opacity: 0 }], { delay: win, duration: p.fade, easing: easing.crossfade });
  const remove = () => veil.remove();
  reveal ? reveal.finished.then(remove, remove) : remove();
  animate(winner.querySelector('.web-icon'), [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }], { delay: win + p.fade / 2, duration: p.check, easing: easing.newcomer, fill: 'backwards' });
  animate(card.querySelector('.prize-caption'), [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { delay: win + p.caption, duration: p.fade, easing: easing.reveal, fill: 'backwards' });
  return win + p.caption + p.fade + p.signal;
}
