// /2/ only (owner, 25 Oct 2026): How it works plays the example question's whole life once per tab session
// (HowItWorks.astro renders this right after the section): asked, reported, challenged and final, with the
// reward and the appeal periods running between the stops, then who was paid. The card is rendered final,
// so no JavaScript, reduced motion and print show the settled story. The play starts once 60% of the card
// is in view. A press or key in the card, a hidden page or the card leaving the screen settles it. Seen
// follows seen.ts: a reload or a history visit shows it settled. Transform and opacity only. Timings and
// easings come from timelines.ts (howLifeTimeline, easing), written in at build time (review-inline.ts).
(() => {
const T = __HOW_LIFE__, E = T.easing, L = T.timeline, html = document.documentElement;
// page-field.ts sizes its layer to the page's scrollHeight, which counts the layer itself, so the layer can
// grow but never shrink (how-it-works-v2.js, which /2/ no longer renders, did this for every page change,
// such as an FAQ answer closing). When the content changes height, the layer drops to it first.
new ResizeObserver(() => { const field = document.querySelector('[data-page-field]'); if (!field) return; field.style.height = '0'; field.style.height = html.scrollHeight + 'px'; }).observe(document.body);
const card = document.querySelector('[data-life]');
if (!card || typeof Element.prototype.animate !== 'function' || !('IntersectionObserver' in window)) return;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const STORE = 'augur:motion-seen', nav = performance.getEntriesByType?.('navigation')[0];
const revisit = nav?.type === 'reload' || nav?.type === 'back_forward', key = `${location.pathname}:how-life`;
const read = () => { try { return JSON.parse(sessionStorage.getItem(STORE) ?? '[]'); } catch { return []; } };
const seen = () => revisit || read().includes(key);
const mark = () => { try { const keys = read(); if (!keys.includes(key)) sessionStorage.setItem(STORE, JSON.stringify([...keys, key])); } catch { /* Storage blocked: it may play again. */ } };
let motion = [];
const settle = () => { motion.forEach(a => a.cancel()); motion = []; };
const q = name => card.querySelector(`[data-l="${name}"]`);
// One animation per element from the play's start: it holds its first look until its moment, then eases
// into the look the page already has, so nothing fights over a property and the end is the rest state.
const look = (el, frames, end) => { if (!el) return; motion.push(el.animate(frames.map(f => ({ ...f, offset: Math.min(1, f.at / end) })).map(({ at, ...f }) => f), { duration: end, easing: 'linear', fill: 'backwards' })); };
const change = (el, from, to, at, run, easing) => { const end = at + run; look(el, [{ ...from, at: 0 }, { ...from, at, easing }, { ...to, at: end }], end); };
const play = start => {
const reach = L.reach.map(t => start + t), last = reach.length - 1;
reach.forEach((t, i) => {
change(q(`stop-${i}`), { opacity: L.dim }, { opacity: 1 }, t, L.pop, E.reveal);
change(q(`node-${i}`), { opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'none' }, t, L.pop, E.settle);
});
L.legs.forEach((leg, i) => change(q(`line-${i}`), { transform: 'scaleX(0)' }, { transform: 'none' }, start + leg.at, leg.run, 'linear'));
// The status walks with the stops: each pending word shows from its stop to the next.
reach.forEach((t, i) => {
const el = q(`state-${i}`);
if (i === last) return change(el, { opacity: 0, transform: `scale(${L.statusFrom})` }, { opacity: 1, transform: 'none' }, t + L.swapIn, L.swap, E.settle);
const out = reach[i + 1], end = out + L.swapOut;
look(el, i === 0 ? [{ opacity: 1, at: 0 }, { opacity: 1, at: out }, { opacity: 0, at: end }] : [{ opacity: 0, at: 0 }, { opacity: 0, at: t + L.swapIn, easing: E.settle }, { opacity: 1, at: t + L.swapIn + L.swap }, { opacity: 1, at: out }, { opacity: 0, at: end }], end);
});
change(q('paid'), { opacity: 0, transform: `translateY(${L.paidRise}px)` }, { opacity: 1, transform: 'none' }, start + L.paidAt, L.paid, E.settle);
const underline = card.closest('section')?.querySelector('.paid-mark');
if (underline) motion.push(underline.animate([{ transform: 'scaleX(0)' }, { transform: 'none' }], { duration: L.paidMark, easing: E.draw, fill: 'backwards' }));
};
const observer = new IntersectionObserver(entries => {
const entry = entries[entries.length - 1];
if (!entry.isIntersecting) { settle(); return; }
if (entry.intersectionRatio >= L.threshold && !motion.length && !reduced.matches && !seen()) { mark(); play(L.entrance); }
}, { threshold: [0, L.threshold] });
observer.observe(card);
['pointerdown', 'keydown'].forEach(type => card.addEventListener(type, settle));
reduced.addEventListener('change', settle);
document.addEventListener('visibilitychange', () => { if (document.hidden) settle(); });
addEventListener('pagehide', settle);
})();
