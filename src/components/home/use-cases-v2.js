// /2/ only (owner, 25 Oct 2026): the use cases' product cards (Applications.astro renders this right after
// the section). Each card is rendered answered, so no JavaScript, reduced motion and print show the final
// state; this plays each case's story once per tab session: its rows come in, the card waits, Augur Lituus
// answers and the product acts. The first case plays once 60% of the stage is in view, after a fresh visit only
// (seen.ts: a reload or a history visit shows it settled). Every pick plays the picked case again, and pressing
// the case already shown restarts it (owner, 26 Oct 2026): a press is the reader asking for it. A pick also draws
// the 2 px Green line from the tab and fades the words.
// The market card is a query split in two (owner, 26 Oct 2026, "Split it is") and tells its own story, one
// change at a time: Asked while the market's price climbs to 99¢, then the report, open to challenge while a
// line fills, then Final, then the market pays.
// A press, focus or key in the stage, a resize, print, a hidden page or the stage leaving the screen
// settles everything on the final frame. Transform and opacity only. Timings and
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
let motion = [], open = Math.max(0, tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true'));
const animate = (el, keyframes, o = {}) => { if (!el) return; const a = el.animate(keyframes, { easing: E.reveal, fill: 'both', ...o }); motion.push(a); return a; };
const settle = () => { motion.forEach(a => a.cancel()); motion = []; };
// One animation for an element that moves more than once, timed from now: it holds its first look until its
// first moment and ends on the look the page already has, so two moves on one property never fight.
const look = (el, frames, end) => { if (!el) return; motion.push(el.animate(frames.map(({ at, ...f }) => ({ ...f, offset: Math.min(1, at / end) })), { duration: end, easing: 'linear', fill: 'backwards' })); };
const link = i => animate(tabs[i]?.querySelector('.case-link'), [{ transform: 'scaleX(0)' }, { transform: 'none' }], { duration: U.link, easing: E.settle, fill: 'backwards' });
// A stack of states in one cell (the market card), times from now: the first shows from the start, and each
// next one comes in at its moment as the one before goes. A rising price slides up, a falling one down;
// `fade(k)` swaps the kth state in place instead, the old one gone before the new one comes in.
const states = (cell, times, fade = () => false) => {
if (!cell) return;
const Y = U.query, spans = [...cell.children], v = spans.map(s => parseFloat(s.dataset.v ?? s.textContent.replace(/[^\d.]/g, '')));
const shift = k => fade(k) ? 0 : v[k] < v[k - 1] ? -Y.slide : Y.slide;
spans.forEach((el, k) => {
const f = k ? [{ opacity: 0, transform: `translateY(${shift(k)}%)`, at: 0 }, { opacity: 0, transform: `translateY(${shift(k)}%)`, at: times[k] + (fade(k) ? Y.out : 0), easing: E.settle }, { opacity: 1, transform: 'none', at: times[k] + Y.in }] : [{ opacity: 1, transform: 'none', at: 0 }];
if (k < spans.length - 1) f.push({ opacity: 1, transform: 'none', at: times[k + 1], easing: E.settle }, { opacity: 0, transform: `translateY(${-shift(k + 1)}%)`, at: times[k + 1] + Y.out });
look(el, f, f[f.length - 1].at);
});
};
// The market card, in the whitepaper's order (§4.5): the query is asked as the market opens, so Asked is lit for
// a moment while both cells wait; then the focus goes to the market, whose price climbs to 99¢ (consensus, not
// settlement); the report lands, Yes open to challenge, and the focus moves to Augur Lituus while a line fills
// under it; the answer is Final and the Yes turns Green; then the market pays. Only the price's
// digits change until it pays.
const query = (card, at) => {
const Y = U.query, q = name => card.querySelector(`[data-card="${name}"]`), t = ms => at + ms;
const status = q('status'), ask = status?.firstElementChild;
states(status, [0, t(Y.reported), t(Y.final)], () => true);
// Asked is lit for a moment (made after the chip's own states, so its scale wins while it runs).
animate(ask, [{ transform: `scale(${U.statusFrom})` }, { transform: 'none' }], { delay: at, duration: U.swap, easing: E.settle, fill: 'backwards' });
animate(ask?.querySelector('.st-glow'), [{ opacity: 0 }, { opacity: 1, offset: .25 }, { opacity: 0 }], { delay: at + U.swapIn, duration: Y.glow, easing: 'linear', fill: 'none' });
look(q('market'), [{ opacity: Y.dim, at: 0 }, { opacity: Y.dim, at: t(Y.focus), easing: E.reveal }, { opacity: 1, at: t(Y.focus + Y.out * 2) }, { opacity: 1, at: t(Y.reported), easing: E.reveal }, { opacity: Y.past, at: t(Y.reported + Y.out * 2) }, { opacity: Y.past, at: t(Y.paid - Y.out), easing: E.reveal }, { opacity: 1, at: t(Y.paid + Y.out) }], t(Y.paid + Y.out));
look(q('oracle'), [{ opacity: Y.dim, at: 0 }, { opacity: Y.dim, at: t(Y.reported - Y.out), easing: E.reveal }, { opacity: 1, at: t(Y.reported + Y.out) }], t(Y.reported + Y.out));
states(q('price'), [0, ...Y.ticks.map(t)]);
states(q('price-value'), [0, t(Y.paid)], () => true);
states(q('price-note'), [0, t(Y.paid)], () => true);
states(q('answer'), [0, t(Y.reported), t(Y.final)], k => k === 2);
states(q('answer-note'), [0, t(Y.reported), t(Y.final)], () => true);
const wait = q('wait');
look(wait, [{ opacity: 0, at: 0 }, { opacity: 0, at: t(Y.reported) + Y.waitIn, easing: E.settle }, { opacity: 1, at: t(Y.reported) + 2 * Y.waitIn }, { opacity: 1, at: t(Y.final) }, { opacity: 0, at: t(Y.final) + Y.out }], t(Y.final) + Y.out);
animate(wait?.firstElementChild, [{ transform: 'scaleX(0)' }, { transform: 'none' }], { delay: t(Y.reported) + Y.waitIn, duration: Y.final - Y.reported - Y.waitIn, easing: 'linear', fill: 'backwards' });
};
// One case's story: the rows come in, the card waits, the answer lands, the product acts.
const play = (i, at) => {
const card = panels[i]?.querySelector('.case-card'); if (!card) return;
const kind = card.dataset.cardKind;
if (kind === 'query') { query(card, at); return; }
const q = name => card.querySelector(`[data-card="${name}"]`), qa = name => card.querySelectorAll(`[data-card="${name}"]`);
const answer = at + U.answer[kind];
// The rows come in first, a beat apart: the flight's arrival, the proposal's history.
card.querySelectorAll('.card-detail').forEach((row, n) => animate(row, [{ opacity: 0, transform: `translateY(${U.rise}px)` }, { opacity: 1, transform: 'none' }], { delay: at + n * U.rowStagger, duration: U.row, easing: E.settle, fill: 'backwards' }));
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
// The proposal: a Mist line runs under the pending check while it's checked, and goes as the answer comes in.
look(q('scan'), [{ opacity: 1, transform: 'scaleX(0)', at: 0 }, { opacity: 1, transform: 'scaleX(0)', at: at + U.scanAt, easing: E.travel }, { opacity: 1, transform: 'none', at: at + U.scanAt + U.scan }, { opacity: 1, transform: 'none', at: answer }, { opacity: 0, transform: 'none', at: answer + U.swapOut }], answer + U.swapOut);
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
mark(index);
if (reduced.matches) return;
link(index);
animate(panels[previous], [{ visibility: 'visible', opacity: 1 }, { visibility: 'visible', opacity: 0 }], { duration: U.out, easing: 'linear', fill: 'none' });
animate(panels[index], [{ opacity: 0 }, { opacity: 1 }], { delay: U.at, duration: U.in, easing: E.reveal, fill: 'backwards' });
play(index, U.pick);
});
// Pressing the case already shown changes nothing in the controller, so it fires no tabschange: the shown case
// plays again from the start. Read in the capture phase, before the controller's own press handler runs.
root.addEventListener('click', event => {
const i = tabs.indexOf(event.target.closest?.('[role="tab"]'));
if (i < 0 || i !== open || reduced.matches) return;
settle(); link(i); play(i, U.entrance);
}, true);
['pointerdown', 'focusin', 'keydown'].forEach(type => stage.addEventListener(type, settle));
root.addEventListener('tabssettled', settle);
reduced.addEventListener('change', settle);
document.addEventListener('visibilitychange', () => { if (document.hidden) settle(); });
})();
