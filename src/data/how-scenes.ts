/** How it works on /2/: the magnet (owner, 26 Oct 2026: "let's use the magnet", round 5 of the item 4 scenes
 * board). One machine for all four steps, drawn with iso-kit.ts.
 * - Two posts with a rail between them. A token on the rail carries the reward. A stake stands on its answer's post
 *   and charges the post's coil, and the token is pulled to the post with the bigger stake.
 * - Each post has a clock on its front. The post holding the token runs its clock. A challenge sends that hand back
 *   to twelve and starts the other post's clock. When a clock goes all the way round with no new stake, the answer
 *   is final: the token locks, and their stake flies over onto yours (owner: "going to right … above the right
 *   blocks"), dropping a shard on the way (the burned part) and landing smaller.
 * - Their stake is Mist and yours Green; the reward is Pewter until it is yours. No words in the drawing.
 * - The steps are one story. State 0 is before Ask and state k is after step k. Each step's scene is drawn at its
 *   state (no JavaScript, reduced motion and print show it). Its act is a set of keyframe tracks from the state
 *   before, built here and played by how-path-v2.js with transform and opacity only.
 * One camera for all four, the drawing about seven tenths of the stage wide, as on the board. */
import { M, E, P, block, quad, node, plane, pts, mix, shift, r2, card, navy, mist, paper, green, pewter, type Material, type SvgNode, type Keyframe, type Point } from './iso-kit';

export type HowKind = 'ask' | 'report' | 'challenge' | 'paid';
// A part's state: its screen offset, opacity, turn in degrees and scale, the last two about its origin.
type State = { x: number; y: number; o: number; r: number; s: number };
// A key: [ms into the act, values that carry forward, easing into this key].
type Key = [number, Partial<State>, string?];
type Act = { p: string; keys: Key[] }[];

const tone = (c: string, l: number, r: number): Material => ({ top: c, left: mix(c, card, l), right: mix(c, card, r), rim: mix(paper, c, .38) });
const pewterM = tone(pewter, .72, .5), paperM = tone(mix(paper, pewter, .6), .7, .5);
const snap = 'cubic-bezier(.6,0,.1,1)';
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const face = (list: Point[], fill: string) => node('polygon', { points: pts(list), fill, stroke: fill, 'stroke-width': .6, 'stroke-linejoin': 'round' });

const parts: Record<string, { origin: Point; init: Partial<State> }> = {};
const part = (name: string, opts: { o?: number; origin?: Point }, children: SvgNode[]) => {
  parts[name] = { origin: (opts.origin ?? [0, 0]).map(r2) as Point, init: opts.o === undefined ? {} : { o: opts.o } };
  return node('g', { 'data-how-part': name }, children);
};

// A post's coil: three bands on its right face. Its clock sits on the left face: a dark dial with twelve ticks, and a
// hand (Paper, with a Green twin for the end) that turns about the dial's centre.
const coil = (x0: number, color: string) => range(3).map(i => { const z = 11 + i * 2.6; return face([P(x0 + 12, 3, z), P(x0 + 12, 19, z), P(x0 + 12, 19, z + 1.2), P(x0 + 12, 3, z + 1.2)], color); });
const clock = (id: string, cu: number, cv: number, R: number): SvgNode[] => {
  const hand = (fill: string) => node('rect', { x: r2(cu - .32), y: r2(cv - R + 1.4), width: .64, height: r2(R - 1.4), fill });
  return [
    node('circle', { cx: cu, cy: cv, r: R, fill: mix(navy, card, .7), stroke: mix(mist, card, .8), 'stroke-width': .55 }),
    ...range(12).map(i => { const a = i * Math.PI / 6, rr = R - .95; return node('rect', { x: r2(cu + Math.sin(a) * rr - .3), y: r2(cv - Math.cos(a) * rr - .3), width: .6, height: .6, fill: mix(pewter, card, .8) }); }),
    part(id, { origin: [cu, cv] }, [hand(paper), part(id + 'G', { o: 0 }, [hand(green)])]),
    node('circle', { cx: cu, cy: cv, r: .75, fill: paper }),
  ];
};
const token = { x: 51, y: 7, z: 9, w: 6, d: 8, h: 4 };
const chip = (i: number, m: Material) => block({ x: 51.5, y: 8.5, z: 13 + i * 2.3, w: 5, d: 5, h: 1.8 }, m);
const stake = (x: number, z: number, m: Material) => block({ x, y: 5, z, w: 12, d: 12, h: 12 }, m);
const dim = mix(mist, card, .42);

// Back to front: the YES post, the rail with the token, the NO post and your stake, then theirs, drawn last so it can
// land on top of yours.
const world: SvgNode[] = [
  part('ring', { o: 0, origin: P(102, 11) }, [quad(93, 0, 18, 22, { fill: 'none', stroke: green, 'stroke-width': 1, 'stroke-linejoin': 'round' })]),
  block({ x: 0, y: 3, z: 0, w: 12, d: 16, h: 20 }, M.device), ...coil(0, dim), part('cY', { o: 0 }, coil(0, mix(paper, mist, .35))), plane('left', 0, 19, 20, clock('hY', 6, 9, 5.2)),
  block({ x: 12, y: 5, z: 6, w: 84, d: 12, h: 3 }, M.slab),
  part('pk', {}, [block(token, paperM), part('pkG', { o: 0 }, [block(token, M.green)]), ...range(3).map(i => part('r' + i, { o: 0 }, [chip(i, pewterM)])), part('rG', { o: 0 }, range(3).map(i => chip(i, M.green)))]),
  block({ x: 96, y: 3, z: 0, w: 12, d: 16, h: 20 }, M.device), ...coil(96, dim), part('cN', { o: 0 }, coil(96, green)), plane('left', 96, 19, 20, clock('hN', 6, 9, 5.2)),
  part('y1', { o: 0 }, [stake(96, 20, M.green)]), part('y2', { o: 0 }, [stake(96, 32.8, M.green)]),
  part('th', { o: 0, origin: P(6, 11, 26) }, [part('thM', {}, [stake(0, 20, M.mist)]), part('thG', { o: 0 }, [stake(0, 20, M.green)])]),
  part('sh', { o: 0 }, [block({ x: 9, y: 14, z: 29, w: 3, d: 3, h: 3 }, M.mist)]),
];

const at = (t: number, v: Partial<State> = {}, e?: string): Key => [t, v, e];
const drop = (t: number, H: number, dur = 460, bounce = 1.4): Key[] => [at(t, { y: -H, o: 0 }), at(t + 60, { o: 1 }, E.lin), at(t + dur, { y: 0 }, E.fall), ...(bounce ? [at(t + dur + 100, { y: -bounce }, E.out), at(t + dur + 210, { y: 0 }, E.in)] : [])];
const fade = (t: number, d: number, o: number, e = E.reveal): Key[] => [at(t), at(t + d, { o }, e)];
const pulse = (t: number, d = 800, s = 1.25): Key[] => [at(t, { o: 0, s: 1 }), at(t + 40, { o: .9 }, E.lin), at(t + d, { o: 0, s }, E.reveal)];
const off = (dx: number, dy: number, dz = 0) => { const { x, y } = shift(dx, dy, dz); return { x: r2(x), y: r2(y) }; };
// An arc from one screen offset to another, `h` high at its top; `more(f)` adds values along the way.
const sine = (u: number) => (1 - Math.cos(Math.PI * u)) / 2;
const hop = (t: number, d: number, from: [number, number], to: [number, number], h: number, n: number, more?: (f: number) => Partial<State>): Key[] =>
  [at(t, { x: from[0], y: from[1] }), ...range(n).map(i => { const u = (i + 1) / n, f = sine(u); return at(r2(t + d * u), { x: r2(from[0] + (to[0] - from[0]) * f), y: r2(from[1] + (to[1] - from[1]) * f - 4 * h * f * (1 - f)), ...(more ? more(f) : {}) }, E.lin); })];
// Where their stake lands: on top of yours, at .85 of its size (the burned part gone).
const onYours = off(96, 0, 24.7);

const acts: Act[] = [
  // Ask: the reward drops onto the token.
  range(3).map(i => ({ p: 'r' + i, keys: drop(200 + i * 420, 12, 340, .6) })),
  // Report: their stake lands on YES, its coil lights, the token snaps over and YES's clock runs most of the way.
  [{ p: 'th', keys: drop(150, 22) }, { p: 'cY', keys: fade(650, 300, 1) }, { p: 'pk', keys: [at(850), at(1500, off(-25, 0), snap)] }, { p: 'hY', keys: [at(1550), at(3150, { r: 240 }, E.lin)] }],
  // Challenge: your double lands on NO and outpulls it: YES's hand goes back to twelve, the token comes over, and
  // NO's clock starts.
  [{ p: 'y1', keys: drop(150, 22) }, { p: 'y2', keys: drop(600, 22) }, { p: 'cN', keys: fade(1100, 300, 1) }, { p: 'cY', keys: fade(1100, 300, 0) }, { p: 'hY', keys: [at(1100), at(1400, { r: 0 }, E.cross)] }, { p: 'pk', keys: [at(1300), at(2100, off(25, 0), snap)] }, { p: 'hN', keys: [at(2150), at(2550, { r: 60 }, E.lin)] }],
  // Get paid: NO's clock goes all the way round. The token and the reward turn Green, and their stake flies over onto
  // yours, dropping a shard.
  [{ p: 'hN', keys: [at(100), at(1600, { r: 360 }, E.lin)] }, { p: 'hNG', keys: fade(1650, 300, 1) },
   { p: 'ring', keys: pulse(1650) }, { p: 'pkG', keys: fade(1700, 400, 1) }, { p: 'rG', keys: fade(1700, 400, 1) },
   { p: 'sh', keys: [at(2150), at(2200, { o: 1 }, E.lin), at(2800, { x: -8, y: -14, o: 0 }, E.out)] },
   { p: 'th', keys: [...hop(2150, 1100, [0, 0], [onYours.x, onYours.y], 14, 16, f => ({ s: r2(1 - .15 * f) })), at(3370, { y: r2(onYours.y - 1.2) }, E.out), at(3490, { y: onYours.y }, E.in)] },
   { p: 'thM', keys: fade(2900, 300, 0) }, { p: 'thG', keys: fade(2900, 300, 1) }],
];

// The five states: each part's values after each act.
const states: Record<string, State>[] = [Object.fromEntries(Object.entries(parts).map(([n, { init }]) => [n, { x: 0, y: 0, o: 1, r: 0, s: 1, ...init }]))];
acts.forEach((act, i) => {
  const next = Object.fromEntries(Object.entries(states[i]).map(([n, st]) => [n, { ...st }]));
  act.forEach(({ p, keys }) => {
    if (!next[p]) throw new Error(`how-scenes: no part ${p}`);
    keys.forEach(([t, v], j) => { if (j && t < keys[j - 1][0]) throw new Error(`how-scenes: keys out of order in ${p}`); Object.assign(next[p], v); });
  });
  states.push(next);
});

// A state as an SVG transform attribute, and as CSS for the act's keyframes; both turn and scale about the origin.
const attr = ({ x, y, r, s }: State, [ox, oy]: Point) => [x || y ? `translate(${r2(x)} ${r2(y)})` : '', r || s !== 1 ? `translate(${ox} ${oy})${r ? ` rotate(${r2(r)})` : ''}${s !== 1 ? ` scale(${r2(s)})` : ''} translate(${-ox} ${-oy})` : ''].filter(Boolean).join(' ') || undefined;
const css = ({ x, y, r, s }: State, [ox, oy]: Point, use: { m: boolean; t: boolean }) => [use.m && `translate(${r2(x)}px,${r2(y)}px)`, use.t && `translate(${ox}px,${oy}px) rotate(${r2(r)}deg) scale(${r2(s)}) translate(${-ox}px,${-oy}px)`].filter(Boolean).join(' ') || 'none';

// A step's scene: the world with every part at that step's state.
const drawn = (k: number): SvgNode[] => {
  const walk = (list: SvgNode[]): SvgNode[] => list.map(nd => {
    const name = nd.attrs['data-how-part'] as string | undefined, children = nd.children && walk(nd.children);
    if (!name) return { ...nd, children };
    const st = states[k][name];
    return { ...nd, attrs: { ...nd.attrs, transform: attr(st, parts[name].origin), opacity: st.o === 1 ? undefined : st.o }, children };
  });
  return walk(world);
};
// A step's act, as [part, delay, duration, keyframes] from the state before it.
const tracks = (k: number) => acts[k - 1].map(({ p, keys }) => {
  const t0 = keys[0][0], t1 = keys[keys.length - 1][0], origin = parts[p].origin;
  let st = { ...states[k - 1][p] };
  const seq = keys.map(([t, v]) => { st = { ...st, ...v }; return [t, st] as const; });
  const use = { m: seq.some(([, v]) => v.x || v.y), t: seq.some(([, v]) => v.r || v.s !== 1) };
  const fades = seq.some(([, v]) => v.o !== seq[0][1].o);
  const frames: Keyframe[] = seq.map(([t, v], i) => {
    const f: Keyframe = { offset: r2((t - t0) / (t1 - t0) * 1e3) / 1e3, transform: css(v, origin, use) };
    if (fades) f.opacity = v.o;
    const next = keys[i + 1];
    if (next) f.easing = next[2] ?? E.reveal;
    return f;
  });
  return [p, t0, t1 - t0, frames] as const;
});

// The camera: everything at home, the drawing within seven tenths of the width and eight of the height.
function camera(list: SvgNode[]) {
  let ax = Infinity, ay = Infinity, bx = -Infinity, by = -Infinity;
  type Matrix = [number, number, number, number, number, number];
  const times = (m: Matrix, n: Matrix): Matrix => [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3], m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]];
  const walk = (nodes: SvgNode[], m: Matrix) => nodes.forEach(nd => {
    const tf = typeof nd.attrs.transform === 'string' && nd.attrs.transform.startsWith('matrix') ? times(m, nd.attrs.transform.slice(7, -1).trim().split(/[\s,]+/).map(Number) as Matrix) : m;
    const put = (x: number, y: number) => { const px = tf[0] * x + tf[2] * y + tf[4], py = tf[1] * x + tf[3] * y + tf[5]; ax = Math.min(ax, px); ay = Math.min(ay, py); bx = Math.max(bx, px); by = Math.max(by, py); };
    if (typeof nd.attrs.points === 'string') nd.attrs.points.split(' ').forEach(p => { const [x, y] = p.split(',').map(Number); put(x, y); });
    if (nd.children) walk(nd.children, tf);
  });
  walk(list, [1, 0, 0, 1, 0, 0]);
  const k = r2(Math.min(.7 * 336 / (bx - ax), .8 * 168 / (by - ay), 2.6) * 1e3) / 1e3;
  return `matrix(${k} 0 0 ${k} ${r2(168 - (ax + bx) / 2 * k)} ${r2(84 - (ay + by) / 2 * k)})`;
}

const kinds: HowKind[] = ['ask', 'report', 'challenge', 'paid'];
export const howScenes = { worlds: Object.fromEntries(kinds.map((kind, i) => [kind, drawn(i + 1)])) as Record<HowKind, SvgNode[]>, transform: camera(world) };
export const howActs = Object.fromEntries(kinds.map((kind, i) => [kind, tracks(i + 1)])) as Record<HowKind, ReturnType<typeof tracks>>;
