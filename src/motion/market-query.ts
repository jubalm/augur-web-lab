import { easing, marketQueryTimeline as t } from './timelines';
import type { Animate } from './play-once';

/** Plays the Prediction markets query from asked to final (owner, 6 Oct 2026).
 * The card is rendered final, so no-JavaScript, reduced motion and print show
 * it complete. While it plays, the earlier statuses and the answer's earlier
 * looks are temporary aria-hidden overlays over the final ones; every effect
 * is opacity or transform. Returns when the answer is final (ms, unscaled). */
export function playMarketQuery(card: HTMLElement, animate: Animate, start = 0): number {
  const at = (stage: number) => start + t.stages[stage]!;
  const final = t.stages.length - 1, end = at(final) + t.draw;
  /** An overlay shown from one stage to another, removed once its effect ends. */
  const overlay = (parent: Element | null | undefined, className: string, text: string, from: number, to: number, mark = false) => {
    if (!parent) return null;
    const node = document.createElement('span');
    node.className = className; node.setAttribute('aria-hidden', 'true'); node.style.opacity = '0';
    if (mark) node.append(Object.assign(document.createElement('span'), { className: 'market-mark' }));
    node.append(text);
    parent.append(node);
    // One effect over the whole play: shown from `from`, faded out from `to`.
    const total = end - start, fade = t.fade / total, a = (from - start) / total, b = (to - start) / total, show = from === start ? 1 : 0;
    const animation = animate(node, [
      { offset: 0, opacity: show }, { offset: a, opacity: show, easing: easing.crossfade }, { offset: a + fade, opacity: 1 },
      { offset: b, opacity: 1, easing: easing.crossfade }, { offset: Math.min(1, b + fade), opacity: 0 }, { offset: 1, opacity: 0 },
    ], { delay: start, duration: total, easing: 'linear' });
    const remove = () => node.remove();
    animation ? animation.finished.then(remove, remove) : remove();
    return node;
  };
  // Each stage's line draws as it is reached and its label brightens. The
  // current stage is Green with a Paper label (owner, 6 Oct 2026), like Final at
  // rest; when the next stage starts it steps back to the Pewter beneath.
  card.querySelectorAll('[data-stage]').forEach((stage, i) => {
    const draw = [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], drawing = { delay: at(i), duration: t.draw, easing: easing.draw, fill: 'backwards' } as const;
    animate(stage.querySelector('.stage-line>span'), draw, drawing);
    if (i) animate(stage.querySelector('.stage-label'), [{ opacity: t.label }, { opacity: 1 }], { delay: at(i), duration: t.fade, easing: easing.crossfade, fill: 'backwards' });
    if (i === final) return;
    animate(overlay(stage.querySelector('.stage-line'), 'stage-current', '', at(i), at(i + 1)), draw, drawing);
    overlay(stage.querySelector('.stage-label'), 'stage-label-current', stage.querySelector('.stage-label')?.textContent ?? '', at(i), at(i + 1));
  });
  // The status hands over whenever it changes; the final chip arrives last.
  const statuses: string[] = JSON.parse(card.dataset.statuses ?? '[]');
  const status = card.querySelector('.market-status');
  const changes = statuses.flatMap((text, stage) => stage && text === statuses[stage - 1] ? [] : [{ text, stage }]);
  changes.slice(0, -1).forEach(({ text, stage }, k) => overlay(status?.parentElement, 'market-status is-pending', text, at(stage), at(changes[k + 1]!.stage), true));
  animate(status, [{ opacity: 0 }, { opacity: 1 }], { delay: at(final), duration: t.fade, easing: easing.crossfade, fill: 'backwards' });
  // The answer is one outcome among three until a report names it, then tentative, then final.
  const answer = card.querySelector<HTMLElement>('[data-answer]'), reported = statuses.findIndex((text, stage) => stage && text !== statuses[0]);
  overlay(answer, 'outcome-veil', answer?.dataset.answer ?? '', at(0), at(reported));
  overlay(answer, 'outcome-veil is-tentative', answer?.dataset.answer ?? '', at(reported), at(final));
  animate(answer?.querySelector('.web-icon') ?? null, [{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }], { delay: at(final), duration: t.check, easing: easing.newcomer, fill: 'backwards' });
  return at(final) + t.signal;
}
