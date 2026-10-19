import { easing, caseGraphicTimeline as t, timeAt } from './timelines';
import type { Animate } from './play-once';

/** Plays a use case's picture in once the answer has been picked (owner, 19 Oct 2026). The picture is
 * rendered final and every effect starts from an earlier look with `fill: backwards`, so nothing is
 * hidden before or after the play. Transform and opacity only. */
export function playCaseGraphic(panel: HTMLElement, animate: Animate, start: number) {
  const graphic = panel.querySelector<HTMLElement>('[data-case-graphic]');
  if (!graphic) return;
  const at = start + t.start;
  const pop = (node: Element | null, delay: number) => animate(node, [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }], { delay, duration: t.pop, easing: easing.newcomer, fill: 'backwards' });
  const kind = graphic.dataset.caseGraphic;
  if (kind === 'market') {
    // Prices draw across, jump at the answer, then the two sides are labelled paid and closed.
    animate(graphic.querySelector('[data-market-cover]'), [{ transform: 'translateX(0)' }, { transform: 'translateX(101%)' }], { delay: at, duration: t.market.reveal, easing: 'linear', fill: 'backwards' });
    graphic.querySelectorAll('[data-graphic-pop]').forEach((end, i) => animate(end, [{ opacity: 0, transform: 'translateX(-6px)' }, { opacity: 1, transform: 'none' }], { delay: at + t.market.reveal + i * t.stagger * 2, duration: t.pop, easing: easing.reveal, fill: 'backwards' }));
  } else if (kind === 'flight') {
    // The arrival slides past +2 hours with the delay line behind it; once it passes, every insured seat
    // fills, row by row from the front.
    const travel = { delay: at, duration: t.flight.travel, easing: easing.draw, fill: 'backwards' } as const;
    animate(graphic.querySelector('[data-flight-delay]'), [{ transform: 'scaleX(0)' }, { transform: 'none' }], travel);
    animate(graphic.querySelector('[data-flight-run]'), [{ transform: 'translateX(-100%)' }, { transform: 'none' }], travel);
    const passes = at + t.flight.travel * timeAt(easing.draw, t.flight.passes);
    graphic.querySelectorAll<HTMLElement>('[data-seat-paid]').forEach(seat => pop(seat, passes + Number(seat.dataset.seatPaid) * t.flight.wave));
  } else {
    // The proposal walks up to the review gate, nudges it and stays; then, in the later lane, it walks
    // past the review all the way to Live.
    animate(graphic.querySelector('[data-gate-run]'), [{ transform: 'translateX(-100%)' }, { transform: 'none' }], { delay: at, duration: t.gate.travel, easing: easing.draw, fill: 'backwards' });
    animate(graphic.querySelector('[data-gate-item]'), [{ transform: 'none' }, { offset: .4, transform: 'translateX(4px)' }, { transform: 'none' }], { delay: at + t.gate.travel, duration: t.gate.bump, easing: easing.reveal });
    animate(graphic.querySelector('[data-gate-later]'), [{ transform: 'translateX(-100%)' }, { transform: 'none' }], { delay: at + t.gate.travel + t.gate.bump, duration: t.gate.later, easing: easing.draw, fill: 'backwards' });
  }
}
