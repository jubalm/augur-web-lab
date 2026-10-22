/** Isometric scenes for the three Why Augur cards on /2/ (owner, 22 Oct 2026: "Let's go with isometric for
 * all three"; compared against the flat and one-network options first). Static geometry for IsoScene.astro,
 * drawn in the 336 × 168 view the v1 diagrams use. Each scene's server-rendered frame is its resting state,
 * so no JavaScript, reduced motion and print show it; tenets-iso-v2.js plays the 12 s loop on top of it
 * with transform and opacity only, and every loop opens and closes on this frame. Permissionless is drawn
 * by two-roads.ts instead (Two roads in cubes, owner, 22 Oct 2026).
 * - veto (Trustless): an answer travels along a track to settle. Governance, a multisig and the creators
 *   hover over it, drop onto it as it passes and go straight through it; it settles untouched.
 * - double (Robust): each challenge doubles what the other side must put up. The false answer's tower
 *   would need 16 blocks, so it runs off the top, sways and falls; the true one stands at 8. The doubling
 *   is the whitepaper's challenge rule (§4.1); no amounts or money words are shown.
 * Colours are the brand's Mist, Paper and Green and the Navy surfaces; a block's darker faces are the same
 * colour mixed toward the card's Dark 2, so every face stays opaque and blocks occlude cleanly. */

const COS = Math.cos(Math.PI / 6), SIN = .5;
export type Point = readonly [number, number];
/** World x runs right-down, y runs left-down and z runs up. */
export const isoPoint = (origin: Point, x: number, y: number, z: number): Point => [origin[0] + (x - y) * COS, origin[1] + (x + y) * SIN - z];
const points = (list: Point[]) => list.map(([x, y]) => `${+x.toFixed(2)},${+y.toFixed(2)}`).join(' ');

const card = '#1d1d30', navy = '#0e0e21', mist = '#71728a', paper = '#f5f5f8', green = '#2ae7a8';
const mix = (from: string, to: string, amount: number) => {
  const channel = (hex: string, i: number) => parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16);
  return '#' + [0, 1, 2].map(i => Math.round(channel(from, i) * amount + channel(to, i) * (1 - amount)).toString(16).padStart(2, '0')).join('');
};
export type Material = { top: string; left: string; right: string; edge?: string };
const tone = (color: string, left: number, right: number): Material => ({ top: color, left: mix(color, card, left), right: mix(color, card, right) });
export const materials = {
  mist: tone(mist, .72, .5),
  green: tone(green, .7, .48),
  paper: tone(paper, .8, .6),
  /** Apps and would-be authorities: quiet slabs, a step above the floor. */
  slab: { top: mix(mist, card, .46), left: mix(mist, card, .3), right: mix(mist, card, .2) },
  /** A false answer: dark blocks outlined in Paper. */
  hollow: { top: mix(paper, card, .08), left: mix(paper, card, .04), right: card, edge: paper },
} satisfies Record<string, Material>;
export const floorColors = { plate: mix(navy, card, .55), grid: mix(mist, card, .16), lane: mix(mist, card, .12), shadow: navy };

type Box = { x: number; y: number; z: number; w: number; d: number; h: number };
/** One drawable: a block (three faces), a floor quad or a label. `id` ties it to a track in
 * tenets-iso-v2.js; `opacity` is its resting value (0 for things that only appear in the loop); `move` is
 * the world offset its track travels, read by the driver. */
export type Item =
  | ({ type: 'block'; id?: string; material: Material; opacity?: number; move?: readonly [number, number, number] } & Box)
  | { type: 'quad'; id?: string; x: number; y: number; w: number; d: number; fill: string; opacity?: number }
  | { type: 'grid'; x: number; y: number; w: number; d: number; step: number }
  | { type: 'label'; id?: string; at: Point; text: string; anchor?: 'start' | 'middle' | 'end'; tone?: 'muted' | 'green' | 'count' | 'count-green'; opacity?: number }
  | { type: 'group'; id: string; items: Item[] };
export type Scene = { origin: Point; items: Item[] };

/** Screen polygons for a block's visible faces: the y + d side (left), the x + w side (right), the top. */
export function blockFaces(origin: Point, { x, y, z, w, d, h }: Box) {
  const P = (a: number, b: number, c: number) => isoPoint(origin, a, b, c);
  return {
    left: points([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)]),
    right: points([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)]),
    top: points([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)]),
  };
}
export const quadPoints = (origin: Point, x: number, y: number, w: number, d: number) => points([isoPoint(origin, x, y, 0), isoPoint(origin, x + w, y, 0), isoPoint(origin, x + w, y + d, 0), isoPoint(origin, x, y + d, 0)]);
export function gridLines(origin: Point, x: number, y: number, w: number, d: number, step: number) {
  const lines: [Point, Point][] = [];
  for (let a = x + step; a < x + w; a += step) lines.push([isoPoint(origin, a, y, 0), isoPoint(origin, a, y + d, 0)]);
  for (let b = y + step; b < y + d; b += step) lines.push([isoPoint(origin, x, b, 0), isoPoint(origin, x + w, b, 0)]);
  return lines;
}

/* Trustless ----------------------------------------------------------------- */
const vetoOrigin: Point = [146, 30];
const authorities = [['Governance', 26], ['Multisig', 64], ['Creators', 102]] as const;
const veto: Scene = { origin: vetoOrigin, items: [
  { type: 'quad', x: -28, y: 22, w: 206, d: 56, fill: floorColors.plate },
  { type: 'grid', x: -28, y: 22, w: 206, d: 56, step: 16 },
  { type: 'quad', x: -4, y: 41, w: 156, d: 16, fill: floorColors.lane },
  ...authorities.map(([, x], i): Item => ({ type: 'quad', id: `veto-shadow-${i}`, x, y: 38, w: 22, d: 22, fill: floorColors.shadow, opacity: .35 })),
  { type: 'block', x: -20, y: 42, z: 0, w: 14, d: 14, h: 14, material: materials.mist },
  { type: 'block', id: 'veto-token', x: 0, y: 44.5, z: 0, w: 9, d: 9, h: 9, material: materials.paper, opacity: 0, move: [139, 0, 0] },
  { type: 'block', x: 151, y: 40, z: 0, w: 18, d: 18, h: 18, material: materials.mist },
  { type: 'block', id: 'veto-settled', x: 151, y: 40, z: 0, w: 18, d: 18, h: 18, material: materials.green },
  ...authorities.flatMap(([text, x], i): Item[] => {
    const corner = isoPoint(vetoOrigin, x + 22, 38, 56);
    return [
      { type: 'block', id: `veto-slab-${i}`, x, y: 38, z: 50, w: 22, d: 22, h: 6, material: { ...materials.slab, edge: mix(paper, card, .5) }, opacity: .6, move: [0, 0, -44] },
      { type: 'label', id: `veto-label-${i}`, at: [corner[0] + 9, corner[1] + 4], text, opacity: .7 },
    ];
  }),
] };

/* Robust -------------------------------------------------------------------- */
const doubleOrigin: Point = [168, 90];
const level = 11;
const lieBase = isoPoint(doubleOrigin, 8, 52, 0), trueBase = isoPoint(doubleOrigin, 52, 8, 0);
const lieBlocks = Array.from({ length: 16 }, (_, i): Item => ({ type: 'block', id: `double-lie-${i}`, x: 0, y: 36, z: i * level, w: 16, d: 16, h: level, material: materials.hollow, opacity: i < 4 ? .3 : 0 }));
const double: Scene = { origin: doubleOrigin, items: [
  { type: 'quad', x: -12, y: -12, w: 76, d: 76, fill: floorColors.plate },
  { type: 'grid', x: -12, y: -12, w: 76, d: 76, step: 16 },
  // The false answer's tower: its first four blocks stay, faded, once it falls; the rest only appear in the loop.
  // The top twelve topple together, as one piece.
  { type: 'group', id: 'double-lie', items: [...lieBlocks.slice(0, 4), { type: 'group', id: 'double-lie-top', items: lieBlocks.slice(4) }] },
  ...Array.from({ length: 8 }, (_, i): Item => ({ type: 'block', id: `double-true-${i}`, x: 36, y: 0, z: i * level, w: 16, d: 16, h: level, material: materials.green })),
  { type: 'label', at: [lieBase[0] - 6, lieBase[1] + 20], text: 'False', anchor: 'middle' },
  { type: 'label', at: [trueBase[0] + 6, trueBase[1] + 20], text: 'True', anchor: 'middle', tone: 'green' },
  ...([['1', 0], ['4', .45], ['16', 0]] as const).map(([text, opacity]): Item => ({ type: 'label', id: `double-lie-count-${text}`, at: [lieBase[0] - 30, lieBase[1] - 14], text, anchor: 'end', tone: 'count', opacity })),
  ...([['2', 0], ['8', 1]] as const).map(([text, opacity]): Item => ({ type: 'label', id: `double-true-count-${text}`, at: [trueBase[0] + 30, trueBase[1] - 14], text, tone: 'count-green', opacity })),
] };

export const isoScenes = { veto, double } as const;
export type IsoKind = keyof typeof isoScenes;
