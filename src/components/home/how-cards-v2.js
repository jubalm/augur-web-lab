// /2/ only (owner, 25 Oct 2026, item 4): How it works' four cards play once per tab session, and "Walk through an
// example" opens one question's numbers under them (HowItWorks.astro renders this right after the section, so it
// runs while the page parses). The markup is the rest state: without JavaScript, or if the CSP blocked this, every
// scene is drawn, the example stays open and the button stays hidden; reduced motion and print show the same.
// Timings and easings come from timelines.ts (howCardsTimeline, easing) and the scenes' moves from how-scenes.ts,
// written in at build time (review-inline.ts). Transform and opacity only.
(() => {
const T = __HOW_CARDS__, E = T.easing, L = T.timeline, MV = T.moves, html = document.documentElement;
// page-field.ts sizes its layer to the page's scrollHeight, which counts the layer itself, so the layer can
// grow but never shrink. Opening or closing the example changes the page's height, so when the content
// changes height the layer drops to it first.
new ResizeObserver(() => { const field = document.querySelector('[data-page-field]'); if (!field) return; field.style.height = '0'; field.style.height = html.scrollHeight + 'px'; }).observe(document.body);
const section = document.getElementById('how-it-works');
if (!section) return;
const cards = section.querySelector('[data-how-cards]'), toggle = section.querySelector('[data-how-more]'), example = document.getElementById('how-example');
const reduced = matchMedia('(prefers-reduced-motion: reduce)'), animates = typeof Element.prototype.animate === 'function';
// The example. Closed, it is hidden="until-found", so find in page can still open it (plainly hidden where
// that isn't supported); aria-expanded follows, and the button's words say what a press does next. Opening
// moves what follows down at once (no height animation) while the card's rows rise in, `stagger` apart, and
// the payout figure lands last. Closing is instant, and focus stays on the button.
if (toggle && example) {
let rows = [];
const still = () => { rows.forEach(a => a.cancel()); rows = []; };
const set = open => { example.hidden = !open && 'until-found'; toggle.setAttribute('aria-expanded', String(open)); };
const enter = () => {
if (reduced.matches || !animates) return;
example.querySelectorAll('[data-example-row]').forEach((row, i) => rows.push(row.animate([{ opacity: 0, transform: `translateY(${L.rise}px)` }, { opacity: 1, transform: 'none' }], { duration: L.row, delay: i * L.stagger, easing: E.settle, fill: 'backwards' })));
const figure = example.querySelector('[data-example-figure]');
if (figure) rows.push(figure.animate([{ opacity: 0, transform: `translateY(-${L.rise}px)` }, { opacity: 1, transform: 'none' }], { duration: L.figure, delay: L.figureAt, easing: E.settle, fill: 'backwards' }));
};
toggle.addEventListener('click', () => { const open = !!example.hidden; still(); set(open); if (open) enter(); });
example.addEventListener('beforematch', () => toggle.setAttribute('aria-expanded', 'true'));
set(false);
toggle.hidden = false;
}
// The cards, once per tab session, from `entrance` after `threshold` of them is in view. Seen follows seen.ts: a
// reload or a history visit shows them settled. A press or key in the section, a hidden page, print or the cards
// leaving the screen settles them. The words never move: only the line, the blocks, the rings and the pads.
if (!cards || !animates || !('IntersectionObserver' in window)) return;
const STORE = 'augur:motion-seen', nav = performance.getEntriesByType?.('navigation')[0];
const revisit = nav?.type === 'reload' || nav?.type === 'back_forward', key = `${location.pathname}:how-cards`;
const read = () => { try { return JSON.parse(sessionStorage.getItem(STORE) ?? '[]'); } catch { return []; } };
const mark = () => { try { const keys = read(); if (!keys.includes(key)) sessionStorage.setItem(STORE, JSON.stringify([...keys, key])); } catch { /* Storage blocked: it may play again. */ } };
if (revisit || read().includes(key) || reduced.matches) return;
const underline = section.querySelector('.paid-mark');
let motion = [], state = 'waiting';
// "paid" waits undrawn from the first paint until the last card lands, so it never shows, vanishes and draws again.
if (underline) { const wait = underline.animate([{ transform: 'scaleX(0)' }, { transform: 'none' }], { duration: L.underline }); wait.pause(); motion.push(wait); }
const settle = () => { motion.forEach(a => a.cancel()); motion = []; state = 'done'; };
const part = (scene, name) => cards.querySelector(`[data-how-scene="${scene}"] [data-how-part="${name}"]`);
const play = () => {
motion.forEach(a => a.cancel()); motion = []; state = 'playing';
const go = (el, frames, delay, duration, easing = E.settle) => { if (el) motion.push(el.animate(frames, { delay, duration, easing, fill: 'backwards' })); };
const drop = (el, at) => go(el, [{ transform: `translate(0px,-${L.drop}px)`, opacity: 0 }, { transform: `translate(0px,-${L.drop}px)`, opacity: 1, offset: .15, easing: E.settle }, { transform: 'none', opacity: 1 }], at, L.fall, 'linear');
const fade = (el, at, duration) => go(el, [{ opacity: 0 }, { opacity: 1 }], at, duration, E.reveal);
// The Green line draws through each card's divider and the gap after it, a card every `beat`; as it enters a
// card, that card's scene acts.
const lines = [...cards.querySelectorAll('[data-how-line]')], at = i => L.entrance + i * L.beat;
lines.forEach((line, i) => go(line, [{ transform: 'scaleX(0)' }, { transform: 'none' }], at(i), L.line, i === lines.length - 1 ? E.draw : 'linear'));
// Ask: the fee lands in the tray. Report: their stake lands on the first answer and its time to challenge appears.
drop(part('ask', 'fee'), at(0) + L.act);
drop(part('report', 'theirs'), at(1) + L.act);
fade(part('report', 'ring'), at(1) + L.ringAt, L.ring);
// Challenge: your stake lands on the other answer and a second block slides out of it: double.
const d = `translate(${MV.double.x}px,${MV.double.y}px)`;
drop(part('challenge', 'a'), at(2) + L.act);
go(part('challenge', 'b'), [{ transform: d, opacity: 0 }, { transform: d, opacity: 0, offset: .5 }, { transform: d, opacity: 1, offset: .52, easing: E.travel }, { transform: 'none', opacity: 1 }], at(2) + L.act, L.double, 'linear');
fade(part('challenge', 'ring'), at(2) + L.act + L.doubleRing, L.ring);
// Get paid: the answer turns final with a pulse, and their block hops over to you, turning Green as it lands.
const t = at(3) + L.act, h = MV.hop, from = `translate(${h.x}px,${h.y}px)`, top = `translate(${h.x / 2}px,${h.y / 2 - L.hopRise}px)`;
fade(part('paid', 'won'), t, L.won);
go(part('paid', 'pulse'), [{ transform: 'scale(1)', opacity: 0 }, { transform: 'scale(1.02)', opacity: .9, offset: .08 }, { transform: `scale(${L.pulseScale})`, opacity: 0 }], t + 80, L.pulse, E.reveal);
const hop = o => [{ transform: from, opacity: o[0], easing: 'cubic-bezier(.33,0,.67,.6)' }, { transform: top, opacity: o[1], offset: .45, easing: 'cubic-bezier(.33,.4,.6,1)' }, { transform: 'none', opacity: o[2], offset: .85 }, { transform: 'none', opacity: o[3] }];
go(part('paid', 'was'), hop([1, 1, 1, 0]), t + L.hopAt, L.hop, 'linear');
go(part('paid', 'taken'), hop([0, 0, 0, 1]), t + L.hopAt, L.hop, 'linear');
fade(part('paid', 'ring'), t + L.finalAt, L.ring);
go(underline, [{ transform: 'scaleX(0)' }, { transform: 'none' }], t + L.underlineAt, L.underline, E.draw);
motion.forEach(a => a.finished.then(() => { if (state === 'playing' && motion.every(m => m.playState === 'finished')) { motion = []; state = 'done'; } }, () => {}));
};
const observer = new IntersectionObserver(entries => {
const entry = entries[entries.length - 1];
if (state === 'done') return observer.disconnect();
if (!entry.isIntersecting) { if (state === 'playing') settle(); return; }
if (state === 'waiting' && entry.intersectionRatio >= L.threshold) { mark(); play(); }
}, { threshold: [0, L.threshold] });
observer.observe(cards);
// Input settles it and counts as seen, so a press before the cards are in view never replays them later.
['pointerdown', 'keydown'].forEach(type => section.addEventListener(type, () => { mark(); settle(); }));
reduced.addEventListener('change', settle);
addEventListener('beforeprint', settle);
document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'playing') settle(); });
addEventListener('pagehide', settle);
})();
