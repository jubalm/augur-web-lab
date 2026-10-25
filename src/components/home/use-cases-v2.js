// /2/ only (owner, 25 Oct 2026): the use cases' product cards (Applications.astro renders this right after
// the section). Each card is rendered answered, so no JavaScript, reduced motion and print show the final
// state; this plays each case's story once per tab session: its rows come in, the card waits, Augur Lituus
// answers and the product acts. The first case plays once 60% of the stage is in view, any other on its first pick; a pick
// also draws the 2 px Green line from the tab and fades the words. Seen cases follow seen.ts: a reload or a
// history visit shows every case settled, and a fresh visit records a case once its play has started.
// A press, focus or key in the stage, a resize, print, a hidden page or the stage leaving the screen
// settles everything on the final frame. Transform and opacity only, plus the check's stroke. Timings and
// easings come from timelines.ts (useCaseTimeline, easing), written in at build time (review-inline.ts).
(() => {
const T = __USE_CASES__, E = T.easing, U = T.timeline;
const root = document.querySelector('[data-use-cases]');
if (!root || typeof Element.prototype.animate !== 'function' || !('IntersectionObserver' in window)) return;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const tabs = [...root.querySelectorAll('[role="tab"]')], panels = [...root.querySelectorAll('[role="tabpanel"]')], stage = root.querySelector('.case-stage');
const STORE = 'augur:motion-seen', nav = performance.getEntriesByType?.('navigation')[0];
const revisit = nav?.type === 'reload' || nav?.type === 'back_forward';
const key = i => `${location.pathname}:use-case:${panels[i]?.id}`;
const read = () => { try { return JSON.parse(sessionStorage.getItem(STORE) ?? '[]'); } catch { return []; } };
const seen = i => revisit || read().includes(key(i));
const mark = i => { try { const keys = read(); if (!keys.includes(key(i))) sessionStorage.setItem(STORE, JSON.stringify([...keys, key(i)])); } catch { /* Storage blocked: the case may play again. */ } };
let motion = [], timer = 0, open = Math.max(0, tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true'));
const animate = (el, keyframes, o = {}) => { if (!el) return; const a = el.animate(keyframes, { easing: E.reveal, fill: 'both', ...o }); motion.push(a); return a; };
const settle = () => { clearTimeout(timer); motion.forEach(a => a.cancel()); motion = []; };
// One animation for an element that moves more than once, timed from now: it holds its first look until its
// first moment and ends on the look the page already has, so two moves on one property never fight.
const look = (el, frames, end) => { if (!el) return; motion.push(el.animate(frames.map(({ at, ...f }) => ({ ...f, offset: Math.min(1, at / end) })), { duration: end, easing: 'linear', fill: 'backwards' })); };
const link = i => animate(tabs[i]?.querySelector('.case-link'), [{ transform: 'scaleX(0)' }, { transform: 'none' }], { duration: U.link, easing: E.settle, fill: 'backwards' });
// One case's story: the rows come in, the card waits, the answer lands, the product acts.
const play = (i, at) => {
const card = panels[i]?.querySelector('.case-card'); if (!card) return;
const q = name => card.querySelector(`[data-card="${name}"]`), qa = name => card.querySelectorAll(`[data-card="${name}"]`);
const kind = card.dataset.cardKind, answer = at + U.answer[kind];
// The rows come in first, a beat apart: the market's Yes and No, the flight's arrival, the proposal's history.
card.querySelectorAll('.card-outcome, .card-detail').forEach((row, n) => animate(row, [{ opacity: 0, transform: `translateY(${U.rise}px)` }, { opacity: 1, transform: 'none' }], { delay: at + n * U.rowStagger, duration: U.row, easing: E.settle, fill: 'backwards' }));
if (kind === 'flight') {
// The dot flies from the due time at a steady pace, crosses the +2 hours tick and eases onto the landing.
// Each stretch of line scales from its own left edge on the dot's timing, so the line ends under the dot.
// The dot rides a track-wide plane, so every move is a share of the track read from the CSS (--limit,
// --landed) and nothing is measured: below 1024 the picked panel is still display:none at this point.
const css = getComputedStyle(card.querySelector('.card-flight')), limit = parseFloat(css.getPropertyValue('--limit')) / 100, landed = parseFloat(css.getPropertyValue('--landed')) / 100, travel = U.answer.flight, first = Math.round(travel * limit / landed);
animate(q('plane'), [{ transform: `translateX(${-landed * 100}%)`, easing: 'linear' }, { transform: `translateX(${(limit - landed) * 100}%)`, offset: first / travel, easing: U.land }, { transform: 'none' }], { delay: at, duration: travel, easing: 'linear', fill: 'backwards' });
animate(q('line-done'), [{ transform: 'scaleX(0)' }, { transform: 'none' }], { delay: at, duration: first, easing: 'linear', fill: 'backwards' });
animate(q('line-late'), [{ transform: 'scaleX(0)' }, { transform: 'none' }], { delay: at + first, duration: travel - first, easing: U.land, fill: 'backwards' });
// The +2 hours tick stretches as the dot crosses it: the moment the delay passes the cover's limit.
animate(q('tick'), [{ transform: 'none', easing: E.settle }, { transform: `scaleY(${U.tickScale})`, offset: .3, easing: E.reveal }, { transform: 'none' }], { delay: at + first, duration: U.tick, easing: 'linear' });
animate(q('landed'), [{ opacity: 0, transform: `translate(-50%, ${U.rise}px)` }, { opacity: 1, transform: 'translateX(-50%)' }], { delay: answer - U.landedLead, duration: U.landed, easing: E.settle, fill: 'backwards' });
}
// The answer: each pending word goes, then its answer comes in.
animate(q('status-wait'), [{ opacity: 1 }, { opacity: 0 }], { delay: answer, duration: U.swapOut, easing: 'linear', fill: 'backwards' });
animate(q('status-done'), [{ opacity: 0, transform: `scale(${U.statusFrom})` }, { opacity: 1, transform: 'none' }], { delay: answer + U.swapIn, duration: U.swap, easing: E.settle, fill: 'backwards' });
qa('was').forEach(el => animate(el, [{ opacity: 1 }, { opacity: 0 }], { delay: answer, duration: U.swapOut, easing: 'linear', fill: 'backwards' }));
qa('now').forEach(el => animate(el, [{ opacity: 0, transform: `translateY(${U.rise}px)` }, { opacity: 1, transform: 'none' }], { delay: answer + U.swapIn, duration: U.swap, easing: E.settle, fill: 'backwards' }));
// The market: as its rows come in, both prices fill their Mist bars to the live odds; at the answer Yes turns
// Green and runs to 100, and No runs out. Each Mist bar moves twice, so it is one animation.
card.querySelectorAll('.card-outcome').forEach((row, n) => {
const was = row.querySelector('[data-card="bar-was"]'), now = row.querySelector('[data-card="bar-now"]'), from = Number(was?.dataset.from ?? 0), lit = at + n * U.rowStagger;
const live = [{ opacity: 1, transform: 'scaleX(0)', at: 0 }, { opacity: 1, transform: 'scaleX(0)', at: lit, easing: E.settle }, { opacity: 1, transform: `scaleX(${from})`, at: lit + U.odds }];
if (now) {
look(was, [...live, { opacity: 1, transform: `scaleX(${from})`, at: answer }, { opacity: 0, transform: `scaleX(${from})`, at: answer + U.barFade }], answer + U.barFade);
animate(now, [{ transform: `scaleX(${from})` }, { transform: 'none' }], { delay: answer, duration: U.bar, easing: E.settle, fill: 'backwards' });
animate(now, [{ opacity: 0 }, { opacity: 1 }], { delay: answer, duration: U.barFade, easing: 'linear', fill: 'backwards' });
} else look(was, [...live, { opacity: 1, transform: `scaleX(${from})`, at: answer, easing: E.settle }, { opacity: 1, transform: 'scaleX(0)', at: answer + U.bar }], answer + U.bar);
});
// The proposal: a Mist line runs under the pending check while it's checked, and goes as the answer comes in.
look(q('scan'), [{ opacity: 1, transform: 'scaleX(0)', at: 0 }, { opacity: 1, transform: 'scaleX(0)', at: at + U.scanAt, easing: E.travel }, { opacity: 1, transform: 'none', at: at + U.scanAt + U.scan }, { opacity: 1, transform: 'none', at: answer }, { opacity: 0, transform: 'none', at: answer + U.swapOut }], answer + U.swapOut);
card.querySelectorAll('.card-check polyline').forEach(line => animate(line, [{ strokeDashoffset: 1.05 }, { strokeDashoffset: 0 }], { delay: answer + U.checkAt, duration: U.checkDraw, easing: E.settle, fill: 'backwards' }));
// Then the footer: who answered, and what the product did.
animate(q('foot'), [{ opacity: 0, transform: `translateY(${U.footRise}px)` }, { opacity: 1, transform: 'none' }], { delay: answer + U.footAt, duration: U.foot, easing: E.settle, fill: 'backwards' });
animate(q('result'), [{ opacity: 0 }, { opacity: 1 }], { delay: answer + U.resultAt, duration: U.result, easing: 'linear', fill: 'backwards' });
};
const observer = new IntersectionObserver(entries => {
const entry = entries[entries.length - 1];
if (!entry.isIntersecting) { settle(); return; }
if (entry.intersectionRatio >= U.threshold && !motion.length && !reduced.matches && !seen(open)) { mark(open); link(open); play(open, U.entrance); }
}, { threshold: [0, U.threshold] });
observer.observe(stage);
root.addEventListener('tabsbeforechange', settle);
root.addEventListener('tabschange', ({ detail: { index, previous } }) => {
open = index;
if (reduced.matches) return;
link(index);
animate(panels[previous], [{ visibility: 'visible', opacity: 1 }, { visibility: 'visible', opacity: 0 }], { duration: U.out, easing: 'linear', fill: 'none' });
animate(panels[index], [{ opacity: 0 }, { opacity: 1 }], { delay: U.at, duration: U.in, easing: E.reveal, fill: 'backwards' });
// A case counts as seen once its play has started, so one arrowed past still plays when it's picked.
if (!seen(index)) { play(index, U.pick); timer = setTimeout(() => { if (open === index) mark(index); }, U.pick); }
});
['pointerdown', 'focusin', 'keydown'].forEach(type => stage.addEventListener(type, settle));
root.addEventListener('tabssettled', settle);
reduced.addEventListener('change', settle);
document.addEventListener('visibilitychange', () => { if (document.hidden) settle(); });
})();
