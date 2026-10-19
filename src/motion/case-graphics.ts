import { easing, caseGraphicTimeline as t, timeAt } from './timelines';
import type { Animate } from './play-once';

/** Plays a use case's picture once its answer is in (owner, 19 Oct 2026: "polished, professional").
 * Each picture tells its own before, answer and after, and one ring marks the instant the answer acts.
 * The picture is rendered final and every entrance starts from an earlier look with `fill: backwards`,
 * so nothing is hidden before or after the play. Transform and opacity only, plus one stroke draw. */
export function playCaseGraphic(panel: HTMLElement, animate: Animate, at: number) {
  const graphic = panel.querySelector<HTMLElement>('[data-case-graphic]');
  if (!graphic) return;
  animate(graphic, [{ opacity: 0 }, { opacity: 1 }], { delay: at, duration: t.fade, easing: 'linear', fill: 'backwards' });
  const kind = graphic.dataset.caseGraphic;
  if (kind === 'market') market(graphic, animate, at);
  else if (kind === 'flight') flight(graphic, animate, at);
  else gate(graphic, animate, at);
}

const pulse = (graphic: Element, animate: Animate, delay: number) =>
  animate(graphic.querySelector('[data-graphic-pulse]'), [{ opacity: .9, transform: 'scale(.25)' }, { opacity: 0, transform: 'none' }], { delay, duration: t.pulse, easing: easing.settle, fill: 'none' });
const rise = (node: Element | null, animate: Animate, delay: number, from = 'translateY(6px)', to = 'none') =>
  animate(node, [{ opacity: 0, transform: from }, { opacity: 1, transform: to }], { delay, duration: t.fade, easing: easing.settle, fill: 'backwards' });
const draw = (node: Element | null, animate: Animate, delay: number, duration: number) =>
  animate(node, [{ strokeDashoffset: 1.05 }, { strokeDashoffset: 0 }], { delay, duration, easing: easing.settle, fill: 'backwards' });

/** Prices trade, wait for the answer, jump to settled and run out to the edge. The draw is one set of
 * keyframes shared by the window, the art and both heads, placed on the price line's own corners, so
 * each head stays on its line the whole way. */
function market(graphic: HTMLElement, animate: Animate, at: number) {
  const m = t.market;
  graphic.querySelectorAll('[data-market-grid]').forEach((line, i) => animate(line, [{ transform: 'scaleX(0)' }, { transform: 'none' }], { delay: at + i * m.gridStagger, duration: m.grid, easing: easing.settle, fill: 'backwards' }));
  const yes = (graphic.querySelector('[data-market-yes]')?.getAttribute('points') ?? '').trim().split(/\s+/).map(pair => pair.split(',').map(Number) as [number, number]);
  if (yes.length < 4) return;
  const width = yes[yes.length - 1]![0], height = 120;
  // The answer lands where the price leaves its last traded corner; it is settled at the next one.
  const answer = yes[yes.length - 3]![0], settled = yes[yes.length - 2]![0];
  const priceAt = (x: number) => {
    const next = yes.findIndex(([px]) => px >= x);
    if (next <= 0) return yes[Math.max(next, 0)]![1];
    const [x0, y0] = yes[next - 1]!, [x1, y1] = yes[next]!;
    return y0 + (y1 - y0) * (x - x0) / (x1 - x0);
  };
  const stretches = [
    { from: 0, to: answer, start: 0, end: m.arrive, curve: easing.travel },
    { from: answer, to: settled, start: m.hold, end: m.settle, curve: 'linear' },
    { from: settled, to: width, start: m.settle, end: 1, curve: easing.settle },
  ];
  const frames: { offset: number; x: number }[] = [];
  for (const { from, to, start, end, curve } of stretches) {
    // Every corner of the line, plus a sample each 12 units so flat stretches still ease smoothly.
    const xs = new Set(yes.map(([x]) => x).filter(x => x > from && x <= to));
    for (let x = from + 12; x < to; x += 12) xs.add(x);
    if (!frames.length) frames.push({ offset: 0, x: from });
    else frames.push({ offset: start, x: from });
    [...xs].sort((a, b) => a - b).forEach(x => frames.push({ offset: start + (end - start) * timeAt(curve, (x - from) / (to - from)), x }));
  }
  const timing = { delay: at + m.lead, duration: m.draw, easing: 'linear', fill: 'backwards' } as const;
  const track = (node: Element | null, look: (x: number) => string) => animate(node, frames.map(({ offset, x }) => ({ offset, transform: look(x) })), timing);
  track(graphic.querySelector('[data-market-window]'), x => `translateX(${(x / width - 1) * 100}%)`);
  track(graphic.querySelector('[data-market-art]'), x => `translateX(${(1 - x / width) * 100}%)`);
  track(graphic.querySelector('[data-market-head="yes"]'), x => `translateY(${priceAt(x) / height * 100}%)`);
  track(graphic.querySelector('[data-market-head="no"]'), x => `translateY(${(height - priceAt(x)) / height * 100}%)`);
  graphic.querySelectorAll('[data-market-head] i').forEach(head => animate(head, [{ opacity: 0 }, { opacity: 1 }], { delay: at + m.lead, duration: 160, easing: 'linear', fill: 'backwards' }));
  // The answer: its line rises as the prices wait, then the Yes head lands with a ring.
  const hold = at + m.lead + m.draw * m.arrive, landed = at + m.lead + m.draw * m.settle;
  animate(graphic.querySelector('[data-market-answer]'), [{ opacity: 0, transform: 'scaleY(0)' }, { opacity: 1, transform: 'none' }], { delay: hold - 60, duration: 520, easing: easing.settle, fill: 'backwards' });
  animate(graphic.querySelector('[data-market-head="yes"] i'), [{ transform: 'none' }, { offset: .3, transform: 'scale(1.6)' }, { transform: 'none' }], { delay: landed - 40, duration: 520, easing: easing.settle, fill: 'none' });
  pulse(graphic, animate, landed - 40);
  graphic.querySelectorAll('[data-graphic-end]').forEach((end, i) => rise(end, animate, at + m.lead + m.draw - m.ends + i * 90, 'translateX(-6px)'));
}

/** The arrival runs late past +2 hours; the delay turns Green as it passes the limit, a ring marks it and
 * every insured seat fills, column by column from the front. */
function flight(graphic: HTMLElement, animate: Animate, at: number) {
  const f = t.flight;
  const travel = { delay: at + f.lead, duration: f.travel, easing: easing.travel, fill: 'backwards' } as const;
  animate(graphic.querySelector('[data-flight-window]'), [{ transform: 'translateX(-100%)' }, { transform: 'none' }], travel);
  animate(graphic.querySelector('[data-flight-progress]'), [{ transform: 'translateX(100%)' }, { transform: 'none' }], travel);
  animate(graphic.querySelector('[data-flight-run]'), [{ transform: 'translateX(-100%)' }, { transform: 'none' }], travel);
  const limit = Number(graphic.querySelector<HTMLElement>('[data-limit]')?.dataset.limit ?? .74);
  const passes = at + f.lead + f.travel * timeAt(easing.travel, limit);
  pulse(graphic, animate, passes);
  graphic.querySelectorAll<HTMLElement>('[data-seat-paid]').forEach(seat => animate(seat, [{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'none' }], { delay: passes + 60 + Number(seat.dataset.seatPaid) * f.wave + Number(seat.dataset.seatAcross) * f.rowWave, duration: f.seat, easing: easing.settle, fill: 'backwards' }));
  rise(graphic.querySelector('[data-flight-landed]'), animate, at + f.lead + f.travel - 140, 'translate(-50%, 4px)', 'translateX(-50%)');
}

/** The proposal brakes into the review as its pause bars rise, and bumps them: held. Then a later review
 * passes, its check draws, and the proposal runs all the way to Live. */
function gate(graphic: HTMLElement, animate: Animate, at: number) {
  const g = t.gate;
  const arrives = at + g.lead + g.travel;
  animate(graphic.querySelector('[data-gate-run]'), [{ transform: 'translateX(-100%)' }, { transform: 'none' }], { delay: at + g.lead, duration: g.travel, easing: easing.approach, fill: 'backwards' });
  graphic.querySelectorAll('[data-gate-bar]').forEach((bar, i) => animate(bar, [{ transform: 'scaleY(0)' }, { transform: 'none' }], { delay: arrives - g.close + i * g.barStagger, duration: 560, easing: easing.settle, fill: 'backwards' }));
  animate(graphic.querySelector('[data-gate-item]'), [{ transform: 'none' }, { offset: .22, transform: 'translateX(2px) scaleX(.86)' }, { transform: 'none' }], { delay: arrives - 40, duration: g.bump, easing: easing.settle, fill: 'none' });
  rise(graphic.querySelector('[data-gate-later-lane]'), animate, at + g.later);
  draw(graphic.querySelector('[data-gate-check]'), animate, at + g.later + 160, g.check);
  animate(graphic.querySelector('[data-gate-later]'), [{ transform: 'translateX(-100%)' }, { transform: 'none' }], { delay: at + g.laterRun, duration: g.laterTravel, easing: easing.travel, fill: 'backwards' });
  pulse(graphic, animate, at + g.laterRun + g.laterTravel - 60);
}
