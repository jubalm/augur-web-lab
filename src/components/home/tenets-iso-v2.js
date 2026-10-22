// The isometric Why Augur scenes, /2/ only (owner, 22 Oct 2026; geometry and resting frames in
// src/data/tenets-iso.ts, drawn by IsoScene.astro; Permissionless's Two roads in src/data/two-roads.ts, drawn
// by TwoRoads.astro, which builds that scene's keyframes too: the build replaces __ROADS__ with them, as
// [data-iso id, keyframes] pairs). Same rules as the v1 loops (loop-scene.ts): every
// track is keyed on one 12 s cycle and opens and closes on the server-rendered frame, a scene runs while
// any part of it is on screen, pauses off-screen or in a hidden tab and resumes where it was, print shows
// the resting frame, and reduced motion never starts it. Transform and opacity only. A key is
// [ms, { o: opacity, m: share of the element's data-move, z: lift, s: scale, r: rotation }, easing];
// values carry forward. The three scenes share one clock so they stay in step.
(() => {
const svgs = [...document.querySelectorAll('svg[data-iso-scene]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if (!svgs.length || reduced.matches || !('IntersectionObserver' in window) || typeof svgs[0].animate !== 'function') return;
const CYCLE = 12000, COS = Math.cos(Math.PI / 6);
const ROADS = __ROADS__;
const E ={ reveal: 'cubic-bezier(.22,.61,.36,1)', cross: 'cubic-bezier(.45,0,.55,1)', lin: 'linear', fall: 'cubic-bezier(.55,0,1,.45)' };
let epoch = null;
const frames = (el, keys, init) => {
const [dx, dy, dz] = (el.getAttribute('data-move') || '0 0 0').split(' ').map(Number);
const at = v => {
const m = v.m, x = (dx - dy) * COS * m, y = (dx + dy) * .5 * m - dz * m - v.z;
return `translate(${x.toFixed(2)}px,${y.toFixed(2)}px) rotate(${v.r}deg) scale(${v.s})`;
};
let cur = { o: 1, m: 0, z: 0, s: 1, r: 0, ...init };
const first = { ...cur };
const out = [{ offset: 0, transform: at(first), opacity: first.o, easing: E.reveal }];
for (const [t, v, e] of keys) { cur = { ...cur, ...v }; out.push({ offset: Math.min(t, CYCLE) / CYCLE, transform: at(cur), opacity: cur.o, easing: e || E.reveal }); }
out.push({ offset: 1, transform: at(first), opacity: first.o });
// Only a property that changes is animated: a transform on an SVG element costs style, layout and paint
// every frame even when it holds still, so an opacity-only track never carries one.
const moves = out.some(f => f.transform !== out[0].transform), fades = out.some(f => f.opacity !== out[0].opacity);
if (!moves) out.forEach(f => { delete f.transform; });
if (!fades) out.forEach(f => { delete f.opacity; });
return moves || fades ? out : null;
};
const tracks = {
veto(add) {
// The answer runs 139 units in 6.3 s; each authority drops as it passes under (slab centres 37, 75, 113).
const start = 900, run = 6300, pass = x => start + (x - 4.5) / 139 * run;
add('veto-settled', [[300, { o: 1 }], [800, { o: 0 }], [7200, { o: 0, s: 1 }], [7350, { o: 1, s: 1.06 }], [7650, { s: 1 }]], { o: 1 });
add('veto-token', [[start - 100, { o: 0, m: 0 }], [start, { o: 1 }, E.lin], [start + run, { m: 1 }], [start + run + 100, { o: 0 }]], { o: 0 });
[37, 75, 113].forEach((x, i) => {
const t = pass(x);
add(`veto-slab-${i}`, [[300, { o: .6 }], [800, { o: 1 }], [t - 900, { o: 1, m: 0 }], [t - 150, { m: 1 }, E.cross], [t + 150, { o: .16 }], [t + 450, { o: .16, m: 1 }], [t + 1150, { o: .6, m: 0 }, E.cross]], { o: .6 });
add(`veto-shadow-${i}`, [[t - 900, { o: .35 }], [t - 150, { o: .8 }], [t + 450, { o: .8 }], [t + 1150, { o: .35 }]], { o: .35 });
add(`veto-label-${i}`, [[300, { o: .7 }], [800, { o: 1 }], [t + 600, { o: 1 }], [t + 1100, { o: .7 }]], { o: .7 });
});
},
double(add) {
// Each round the other side must double: false 1, true 2, false 4, true 8, false 16, which it can't hold.
const lieAt = i => i === 0 ? 1200 : i < 4 ? 3100 + (i - 1) * 140 : 5600 + (i - 4) * 100;
const trueAt = i => i < 2 ? 2100 + i * 140 : 4200 + (i - 2) * 120;
for (let i = 0; i < 16; i++) {
const t = lieAt(i);
if (i < 4) add(`double-lie-${i}`, [[300, { o: .3 }], [900, { o: 0 }], [t, { o: 0, z: 14 }], [t + 260, { o: 1, z: 0 }], [8200, { o: 1 }], [8700, { o: .3 }]], { o: .3 });
else add(`double-lie-${i}`, [[t, { o: 0, z: 14 }], [t + 260, { o: 1, z: 0 }], [8440, { o: 1 }], [8441, { o: 0 }]], { o: 0 });
}
add('double-lie', [[7000, { r: 0 }], [7250, { r: -2.5 }, E.cross], [7500, { r: 2.5 }, E.cross], [7700, { r: -1.2 }, E.cross], [7850, { r: 0 }]], {});
// It can't hold: the top twelve topple as one piece, falling away to the left as they fade.
add('double-lie-top', [[7850, { r: 0, z: 0, o: 1 }], [8450, { r: -26, z: -8, o: 0 }, E.fall], [8460, { r: 0, z: 0, o: 1 }]], {});
for (let i = 0; i < 8; i++) { const t = trueAt(i); add(`double-true-${i}`, [[300, { o: 1 }], [900, { o: 0 }], [t, { o: 0, z: 14 }], [t + 260, { o: 1, z: 0 }]], { o: 1 }); }
add('double-lie-count-1', [[1200, { o: 0 }], [1450, { o: 1 }], [3100, { o: 1 }], [3300, { o: 0 }]], { o: 0 });
add('double-lie-count-4', [[300, { o: .45 }], [900, { o: 0 }], [3100, { o: 0 }], [3350, { o: 1 }], [5600, { o: 1 }], [5800, { o: 0 }], [8200, { o: 0 }], [8600, { o: .45 }]], { o: .45 });
add('double-lie-count-16', [[5600, { o: 0 }], [5850, { o: 1 }], [8000, { o: 1 }], [8300, { o: 0 }]], { o: 0 });
add('double-true-count-2', [[2100, { o: 0 }], [2350, { o: 1 }], [4200, { o: 1 }], [4400, { o: 0 }]], { o: 0 });
add('double-true-count-8', [[300, { o: 1 }], [900, { o: 0 }], [4200, { o: 0 }], [4450, { o: 1 }]], { o: 1 });
},
};
svgs.forEach(svg => {
let animations = [], started = false, visible = false;
const build = () => {
const scene = svg.getAttribute('data-iso-scene');
const play = (el, keyframes) => { if (el && keyframes) animations.push(el.animate(keyframes, { duration: CYCLE, iterations: Infinity })); };
if (scene === 'roads') ROADS.forEach(([id, keyframes]) => play(svg.querySelector(`[data-iso="${id}"]`), keyframes));
else tracks[scene]((id, keys, init) => {
const el = svg.querySelector(`[data-iso="${id}"]`);
play(el, el && frames(el, keys, init));
});
if (epoch === null) epoch = document.timeline.currentTime;
animations.forEach(a => { a.startTime = epoch; });
};
const running = () => visible && !document.hidden;
const sync = () => {
if (!started) { if (!running()) return; started = true; try { build(); } catch { stop(); return; } return; }
animations.forEach(a => running() ? a.play() : a.pause());
};
const reset = () => { animations.forEach(a => a.cancel()); animations = []; started = false; };
const events = new AbortController();
const observer = new IntersectionObserver(entries => { visible = entries[entries.length - 1].isIntersecting; sync(); });
const stop = () => { reset(); observer.disconnect(); events.abort(); };
observer.observe(svg);
document.addEventListener('visibilitychange', sync, { signal: events.signal });
reduced.addEventListener('change', () => { if (reduced.matches) stop(); }, { signal: events.signal });
addEventListener('beforeprint', reset, { signal: events.signal });
addEventListener('afterprint', sync, { signal: events.signal });
addEventListener('pagehide', () => animations.forEach(a => a.pause()), { signal: events.signal });
addEventListener('pageshow', sync, { signal: events.signal });
});
})();
