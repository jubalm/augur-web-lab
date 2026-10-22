/** The /2/ Permissionless card: Two roads in cubes (owner, 22 Oct 2026: chosen over flat-square and figure
 * versions on the Tenet Motion Options board, then "lgtm" for v2).
 * - At the back, a gated road: a line of cubes waits at a booth and a barrier. Once a loop the barrier lifts
 *   in its own upright plane, the front cube drives off, the rest step up and a new cube joins the back.
 * - In front, the Augur Lituus road, paved in the brand's deep accent green (--augur-color-accent-deep): cubes
 *   glide past at a steady pace, and each turns Green as
 *   it crosses a finish line of Paper and Navy squares, with a Green pulse on the ground.
 * The Augur glyph, painted small where the open road begins, says whose road it is; there are no words.
 * TwoRoads.astro draws the resting frame
 * built here, so no JavaScript, reduced motion and print show it; the loop's keyframes are built here too, at
 * build time, and tenets-iso-v2.js plays them on the `data-iso` ids, on the same 12 s cycle as the other cards.
 * The keyframes are exact: steady speeds, no cube ever trades places with another (each is drawn at its true
 * depth), instant swaps only where the frames just before and after are identical, and the loop's end matches
 * its start shape for shape. Transform and opacity only. */

type Attrs = Record<string, string | number | undefined>;
export interface SvgNode { tag: string; attrs: Attrs; children?: SvgNode[] }
export interface Keyframe { offset: number; transform?: string; opacity?: number; easing?: string }
type Point = [number, number];
type Box = { x: number; y: number; z: number; w: number; d: number; h: number };
type Material = { top: string; left: string; right: string; rim?: string };
type State = { x: number; y: number; r: number; s: number; o: number };
type Key = [number, Partial<State>, string?];

const CYCLE = 12000, COS = Math.cos(Math.PI / 6);
const E = { reveal: 'cubic-bezier(.22,.61,.36,1)', cross: 'cubic-bezier(.45,0,.55,1)', lin: 'linear', in: 'cubic-bezier(.7,0,.84,0)' };
const card = '#1d1d30', navy = '#0e0e21', mist = '#71728a', paper = '#f5f5f8', green = '#2ae7a8', deep = '#095e42';
const mix = (a: string, b: string, t: number) => '#' + [0, 1, 2].map(i => Math.round(parseInt(a.slice(1 + i * 2, 3 + i * 2), 16) * t + parseInt(b.slice(1 + i * 2, 3 + i * 2), 16) * (1 - t)).toString(16).padStart(2, '0')).join('');
const r2 = (v: number) => Math.round(v * 100) / 100;
const O: Point = [168, 84];
const P = (x: number, y: number, z = 0): Point => [O[0] + (x - y) * COS, O[1] + (x + y) * .5 - z];
const pts = (list: Point[]) => list.map(([x, y]) => `${r2(x)},${r2(y)}`).join(' ');
// Faces lit from the top left, with a thin rim along the top's front edges.
const tone = (c: string, l: number, r: number): Material => ({ top: c, left: mix(c, card, l), right: mix(c, card, r), rim: mix(paper, c, .38) });
const mat = (t: number, l: number, r: number): Material => ({ top: mix(mist, card, t), left: mix(mist, card, l), right: mix(mist, card, r), rim: mix(paper, mix(mist, card, t), .3) });
const M = { mist: tone(mist, .72, .5), green: tone(green, .7, .48), device: mat(.52, .36, .24), slab: mat(.4, .27, .17), base: { top: mix(navy, card, .55), left: mix(navy, card, .3), right: navy, rim: mix(mist, card, .3) } };
const lane = mix(mist, card, .1), screen = mix(navy, card, .7), mark = mix(paper, card, .18);

const node = (tag: string, attrs: Attrs = {}, children?: SvgNode[]): SvgNode => ({ tag, attrs, children });
function block({ x, y, z, w, d, h }: Box, m: Material, attrs: Attrs = {}): SvgNode {
  const face = (list: Point[], fill: string) => node('polygon', { points: pts(list), fill, stroke: fill });
  const kids = [
    face([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)], m.left),
    face([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)], m.right),
    face([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)], m.top),
  ];
  if (m.rim) {
    kids.push(node('polyline', { points: pts([P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y, z + h)]), fill: 'none', stroke: m.rim, 'stroke-width': .7, 'stroke-linecap': 'round' }));
    if (h > 2.5) { const [a, b] = [P(x + w, y + d, z), P(x + w, y + d, z + h)]; kids.push(node('line', { x1: r2(a[0]), y1: r2(a[1]), x2: r2(b[0]), y2: r2(b[1]), stroke: m.rim, 'stroke-width': .5, 'stroke-opacity': .45 })); }
  }
  return node('g', { 'stroke-width': .6, 'stroke-linejoin': 'round', ...attrs }, kids);
}
const quad = (x: number, y: number, w: number, d: number, attrs: Attrs) => node('polygon', { points: pts([P(x, y), P(x + w, y), P(x + w, y + d), P(x, y + d)]), ...attrs });
// A drawing plane on a block face: local u runs right and v runs down (left face: +x and −z; right face: −y and −z).
const AX = { left: [COS, .5, 0, 1], right: [COS, -.5, 0, 1] } as const;
const plane = (side: keyof typeof AX, x: number, y: number, z: number, children: SvgNode[]) => { const [a, b, c, d] = AX[side], [e, f] = P(x, y, z); return node('g', { transform: `matrix(${[a, b, c, d, e, f].map(v => r2(v * 100) / 100).join(' ')})` }, children); };
const rect = (x: number, y: number, w: number, h: number, fill: string) => node('rect', { x, y, width: w, height: h, fill });

/* The loop's keyframes, one track per `data-iso` id. A key is [ms, { x, y (px), r (deg), s, o }, easing into
   this key]; values carry forward and the loop closes on its first frame. Keys at the same moment make an
   instant change. Only what changes is animated, and only the transform parts a track uses are written. */
const tracks: [string, Keyframe[]][] = [];
function animate(target: SvgNode, id: string, keys: Key[], init: Partial<State> = {}) {
  keys.forEach(([t], i) => { if (i && t < keys[i - 1][0]) throw new Error(`two-roads: keys out of order in ${id}`); });
  const first: State = { x: 0, y: 0, r: 0, s: 1, o: 1, ...init };
  if (first.r || first.s !== 1) throw new Error(`two-roads: ${id} must rest unturned and unscaled`);
  const states: [number, State, string][] = [[0, first, E.lin]];
  let cur = first;
  for (const [t, v, e] of keys) { cur = { ...cur, ...v }; states.push([Math.min(Math.max(t, 0), CYCLE), cur, e ?? E.reveal]); }
  if (states[states.length - 1][0] < CYCLE) states.push([CYCLE, first, E.lin]);
  const moves = states.some(([, v]) => v.x || v.y), turns = states.some(([, v]) => v.r), scales = states.some(([, v]) => v.s !== 1);
  const T = (v: State) => [moves && `translate(${r2(v.x)}px,${r2(v.y)}px)`, turns && `rotate(${r2(v.r)}deg)`, scales && `scale(${r2(v.s)})`].filter(Boolean).join(' ') || 'none';
  const same = (a: State, b: State) => a.x === b.x && a.y === b.y && a.r === b.r && a.s === b.s && a.o === b.o;
  const out: Keyframe[] = states.map(([t, v], i) => {
    const next = states[i + 1];
    return { offset: Math.round(t / CYCLE * 1e5) / 1e5, transform: T(v), opacity: Math.round(v.o * 1000) / 1000, easing: next && next[2] !== E.lin && !same(v, next[1]) ? next[2] : undefined };
  });
  if (out.every(f => f.transform === out[0].transform)) out.forEach(f => { delete f.transform; });
  if (out.every(f => f.opacity === out[0].opacity)) out.forEach(f => { delete f.opacity; });
  out.forEach(f => { if (f.easing === undefined) delete f.easing; });
  target.attrs['data-iso'] = id;
  if (first.o !== 1) target.attrs.opacity = first.o;
  if (first.x || first.y) target.attrs.transform = `translate(${r2(first.x)} ${r2(first.y)})`;
  if (out[0].transform !== undefined || out[0].opacity !== undefined) tracks.push([id, out]);
}
// A track that repeats every cycle from T0 (possibly negative): stops are [ms after T0, values], linear between
// stops and wrapping across the end of the cycle exactly; the last stop returns to the first state.
function loop(target: SvgNode, id: string, T0: number, stops: [number, Partial<State>][]) {
  const props = Object.keys(stops[0][1]) as (keyof State)[];
  const at = (t: number): Partial<State> => {
    const u = ((t - T0) % CYCLE + CYCLE) % CYCLE;
    for (let i = 0; i < stops.length; i++) {
      const [a, va] = stops[i], [b, vb]: [number, Partial<State>] = i + 1 < stops.length ? stops[i + 1] : [CYCLE, stops[0][1]];
      if (u >= a && u <= b) { const f = b > a ? (u - a) / (b - a) : 0, v: Partial<State> = {}; props.forEach(p => { v[p] = va[p]! + (vb[p]! - va[p]!) * f; }); return v; }
    }
    return { ...stops[0][1] };
  };
  const times = [0, CYCLE, ...stops.map(([s]) => ((T0 + s) % CYCLE + CYCLE) % CYCLE)].sort((a, b) => a - b).filter((t, i, all) => i === 0 || t - all[i - 1] > .5);
  animate(target, id, times.slice(1).map(t => [t, at(t), E.lin]), at(0));
}

/* The scene ------------------------------------------------------------------ */
const x0 = 8, x1 = 132, L = x1 - x0, FIN = 98, Y = 51, S = 10, C = 22 / 8;
const D = (a: number, b: number, y = 5) => { const p = P(a, y), q = P(b, y); return { x: q[0] - p[0], y: q[1] - p[1] }; };
const world: SvgNode[] = [];
// The floor, the gated road with grey marks, and the Augur Lituus road in deep accent green with Green marks.
world.push(block({ x: x0, y: -22, z: -4, w: L, d: 94, h: 4 }, M.base));
world.push(quad(x0, -6, L, 22, { fill: lane }));
for (let x = x0 + 6; x < x1 - 6; x += 16) world.push(quad(x, 4.4, 7, 1.2, { fill: mark }));
world.push(quad(x0, 40, L, 22, { fill: deep }));
for (let x = x0 + 22; x < x1 - 6; x += 16) if (x + 7 < FIN - C - 2 || x > FIN + C + 2) world.push(quad(x, 50.4, 7, 1.2, { fill: green }));
// The finish line: two rows of squares, Paper and Navy, across the Augur Lituus road.
for (let r = 0; r < 2; r++) for (let k = 0; k < 8; k++) world.push(quad(FIN - C + r * C, 40 + k * C, C, C, { fill: (r + k) % 2 ? paper : navy }));
// The Augur glyph, painted small where the Augur Lituus road begins, in place of its first Green mark (owner,
// 22 Oct 2026: "the glyph gotta be extremely small make an exception like add in the street"; an exception to
// the brand's 50 px minimum, recorded in decisions.md). TwoRoads.astro nests the supplied reversed master's
// paths unchanged; this lays them flat on the road turned to face the viewer, as a decal on an isometric floor
// shows: upright, its width times √1.5 and its height times √0.5. Cubes drive over it.
{
  const s = 14 / 121, [cx, cy] = P(20, Y), wide = Math.SQRT2 * COS * s, flat = Math.SQRT1_2 * s;
  world.push(node('g', { class: 'roads-glyph', transform: `matrix(${[wide, 0, 0, flat, cx - 54 * wide, cy - 60.5 * flat].map(v => Math.round(v * 1e5) / 1e5).join(' ')})` }));
}
// The gatekeeper's booth (seen through its window) and the barrier's post.
{
  const b = { x: 88, y: -20, z: 0, w: 13, d: 10, h: 15 }, ww = b.w - 5, cx = 2.5 + ww / 2;
  world.push(block(b, M.device), plane('left', b.x, b.y + b.d, b.z + b.h, [rect(2.5, 3, ww, 7, screen), node('path', { d: `M${r2(cx - 3.4)} 10a3.4 2.6 0 0 1 6.8 0Z`, fill: mix(mist, card, .8) }), node('circle', { cx: r2(cx), cy: 5.4, r: 1.9, fill: mist })]), block({ x: b.x - 1.5, y: b.y - 1.5, z: b.z + b.h, w: b.w + 3, d: b.d + 3, h: 1.6 }, M.slab));
  world.push(block({ x: 80, y: -12, z: 0, w: 3, d: 3, h: 11 }, M.device));
}
// A cube with its square shadow, standing on (x, y).
const cube = (x: number, y: number, m: Material = M.mist) => node('g', {}, [quad(x - 3.5, y - 3.5, 10, 10, { fill: navy, opacity: .45 }), block({ x: x - S / 2, y: y - S / 2, z: 0, w: S, d: S, h: S }, m)]);
// The line, drawn back to front. When the barrier lifts, the front cube drives off, the others step up and a
// new cube joins at the back; at 11.5 s, with the line standing still, each cube returns to its starting
// place in the same instant, so the loop ends on its first frame and no cube is ever drawn at a wrong depth.
const spots = [66, 54, 42, 30], t = 4300, SWAP = 11500;
const fresh = cube(spots[3], 5), [c3, c2, c1, c0] = [3, 2, 1, 0].map(i => cube(spots[i], 5));
world.push(fresh, c3, c2, c1, c0);
[c1, c2, c3].forEach((g, i) => { const d = D(spots[i + 1], spots[i]), a = t + 600 + i * 150; animate(g, `roads-wait-${i + 1}`, [[a, { x: 0, y: 0 }], [a + 800, { x: d.x, y: d.y }, E.cross], [SWAP, { x: d.x, y: d.y }], [SWAP, { x: 0, y: 0 }]]); });
const back = D(spots[3], x0 + 2), te = 7600;
animate(fresh, 'roads-join', [[te, { o: 0, x: back.x, y: back.y }], [te + 250, { o: 1 }], [te + 1300, { x: 0, y: 0 }, E.cross], [SWAP, { o: 1, x: 0, y: 0 }], [SWAP, { o: 0, x: back.x, y: back.y }]], { o: 0, x: back.x, y: back.y });
// The front cube pulls away, passes under the lifted barrier and drives off. Just past the barrier it hands over
// to a twin drawn in front of the barrier, in the same instant and place.
const v = 32, p70 = D(66, 70), p86 = D(66, 86), p116 = D(66, 116.6), p126 = D(66, 126), th = t + 450 + 16 * v, tz = th + 40 * v;
animate(c0, 'roads-front', [[t, { x: 0, y: 0 }], [t + 450, { x: p70.x, y: p70.y }, E.in], [th, { x: p86.x, y: p86.y }, E.lin], [th, { o: 0 }], [SWAP, { o: 0 }], [SWAP, { o: 1, x: 0, y: 0 }]]);
// The barrier: a striped arm on the post, lifting in its own upright plane.
const arm = node('g', {}, [rect(0, -1.1, 26, 2.2, paper), ...[3, 11, 19].map(u => rect(u, -1.1, 4, 2.2, mist))]);
world.push(plane('right', 81.5, 17, 9.5, [arm]));
animate(arm, 'roads-arm', [[3600, { r: 0 }], [4450, { r: 80 }, E.cross], [5800, { r: 80 }], [6650, { r: 0 }, E.cross]]);
const c0b = cube(spots[0], 5);
world.push(c0b);
animate(c0b, 'roads-away', [[th, { o: 0, x: p86.x, y: p86.y }], [th, { o: 1 }], [tz - 300, { x: p116.x, y: p116.y }, E.lin], [tz, { o: 0, x: p126.x, y: p126.y }, E.lin]], { o: 0, x: p86.x, y: p86.y });
// The Augur Lituus road: five cubes glide past at a steady pace and turn Green at the finish line, each with a
// pulse on the ground. Their phases leave the resting frame with one cube on its way and one Green past the line.
const n = 5, xs = [12, 128], dur = (xs[1] - xs[0]) * 42, cross = (FIN - xs[0]) / (xs[1] - xs[0]) * dur, end = D(xs[0], xs[1], Y);
const rings = Array.from({ length: n }, () => quad(FIN - 6, Y - 6, 12, 12, { fill: 'none', stroke: green, 'stroke-width': 1.2 }));
world.push(...rings);
for (let k = 0; k < n; k++) {
  const T0 = k * CYCLE / n - 4400, at = (f: number) => ({ x: end.x * f, y: end.y * f });
  const lit = block({ x: xs[0] - S / 2, y: Y - S / 2, z: 0, w: S, d: S, h: S }, M.green);
  const g = node('g', {}, [quad(xs[0] - 3.5, Y - 3.5, 10, 10, { fill: navy, opacity: .45 }), block({ x: xs[0] - S / 2, y: Y - S / 2, z: 0, w: S, d: S, h: S }, M.mist), lit]);
  world.push(g);
  loop(g, `roads-car-${k}`, T0, [[0, { ...at(0), o: 0 }], [300, { ...at(300 / dur), o: 1 }], [dur - 300, { ...at(1 - 300 / dur), o: 1 }], [dur, { ...at(1), o: 0 }], [dur + 1, { ...at(0), o: 0 }]]);
  loop(lit, `roads-green-${k}`, T0, [[0, { o: 0 }], [cross - 30, { o: 0 }], [cross + 220, { o: 1 }], [dur, { o: 1 }], [dur + 1, { o: 0 }]]);
  loop(rings[k], `roads-pulse-${k}`, T0, [[0, { o: 0, s: 1 }], [cross, { o: 0, s: 1 }], [cross + 80, { o: .85, s: 1.1 }], [cross + 700, { o: 0, s: 2.2 }], [cross + 701, { o: 0, s: 1 }]]);
}

// Fit the resting frame to the 336 × 168 view: the box of everything visible at rest, less an 8 px margin.
const bounds = (() => {
  let ax = Infinity, ay = Infinity, bx = -Infinity, by = -Infinity;
  const take = ([x, y]: Point) => { ax = Math.min(ax, x); ay = Math.min(ay, y); bx = Math.max(bx, x); by = Math.max(by, y); };
  const walk = (list: SvgNode[], m: number[] | null) => list.forEach(nd => {
    if (nd.attrs.opacity === 0) return;
    const tf = typeof nd.attrs.transform === 'string' && nd.attrs.transform.startsWith('matrix') ? nd.attrs.transform.slice(7, -1).split(' ').map(Number) : m;
    const put = (x: number, y: number) => take(tf ? [tf[0] * x + tf[2] * y + tf[4], tf[1] * x + tf[3] * y + tf[5]] : [x, y]);
    if (typeof nd.attrs.points === 'string') nd.attrs.points.split(' ').forEach(p => { const [x, y] = p.split(',').map(Number); put(x, y); });
    if (nd.tag === 'rect') { const [x, y, w, h] = [nd.attrs.x, nd.attrs.y, nd.attrs.width, nd.attrs.height].map(Number); put(x, y); put(x + w, y); put(x, y + h); put(x + w, y + h); }
    if (nd.children) walk(nd.children, tf);
  });
  walk(world, null);
  return { ax, ay, bx, by };
})();
const k = Math.round(Math.min(1.75, (336 - 16) / (bounds.bx - bounds.ax), (168 - 16) / (bounds.by - bounds.ay)) * 1e5) / 1e5;
const tx = (336 - (bounds.bx - bounds.ax) * k) / 2 - bounds.ax * k, ty = (168 - (bounds.by - bounds.ay) * k) / 2 - bounds.ay * k;

export const twoRoads = { world, transform: `matrix(${k} 0 0 ${k} ${r2(tx)} ${r2(ty)})`, tracks };
