/** How it works on /2/ (owner, 25 Oct 2026, item 4: "put this on the website", after round 5 of the item 4 board):
 * four cards in the Why Augur cards' family, each with one scene of a question's life, drawn with iso-kit.ts.
 * - One stage in all four: a Navy floor; at the back, the question's terminal (a booth with two lines on its
 *   screen and a cap, as in the Permissionless card) and the fee tray; in front, two answers as pads, set apart.
 * - Their stake is a Mist block; yours are Green; the answer that wins turns the deep accent green with a Green
 *   ring, as the Augur Lituus road does in Two roads. A dashed Mist ring round the latest stake is the time to
 *   challenge. No words in the drawings: the cards carry them.
 * - Blocks on an answer stand in one row that is level on screen, 13 units apart, so no block hides another.
 * - Each scene is drawn at its resting frame (no JavaScript, reduced motion and print show it). The parts the
 *   play moves carry `data-how-part`; how-cards-v2.js animates them with transform and opacity only.
 * One camera for all four: the kit's fit over the four drawings together. */
import { M, block, quad, node, plane, rect, fit, mix, shift, card, navy, mist, paper, green, deep, screen, mark, type Material, type SvgNode } from './iso-kit';

export type HowKind = 'ask' | 'report' | 'challenge' | 'paid';
const won: Material = { top: deep, left: mix(deep, card, .62), right: mix(deep, card, .42), rim: mix(paper, green, .45) };
const S = 12, PAD_H = 3;
type Spot = readonly [number, number];
const pads = { yes: { x: 6, y: 30, w: 40, d: 40 }, no: { x: 58, y: 30, w: 40, d: 40 } };
const at = { theirs: [26, 50] as Spot, mine: [[65, 63], [78, 50]] as Spot[], won: [91, 37] as Spot, fee: [78, 15] as Spot };
const part = (name: string, extra: Record<string, number> = {}) => ({ 'data-how-part': name, ...extra });
// A block with its square shadow, standing on (cx, cy) at height z.
const cube = ([cx, cy]: Spot, z: number, m: Material, s = S, attrs = {}) => node('g', attrs, [quad(cx - s / 2 + 1.5, cy - s / 2 + 1.5, s, s, { fill: navy, opacity: .45 }, z), block({ x: cx - s / 2, y: cy - s / 2, z, w: s, d: s, h: s }, m)]);
const ring = (p: typeof pads.yes, solid: boolean, attrs = {}) => quad(p.x - 3, p.y - 3, p.w + 6, p.d + 6, solid ? { fill: 'none', stroke: green, 'stroke-width': 1.2, ...attrs } : { fill: 'none', stroke: mist, 'stroke-width': .9, 'stroke-dasharray': '3 2.4', ...attrs });

function stage(kind: HowKind): SvgNode[] {
  const world: SvgNode[] = [block({ x: 0, y: 0, z: -4, w: 104, d: 74, h: 4 }, M.base)];
  // The terminal, kept low so the camera can come closer (the 2:1 view is bound by the scene's height).
  const t = { x: 14, y: 5, z: 0, w: 26, d: 7, h: 16 };
  world.push(block(t, M.device), plane('left', t.x, t.y + t.d, t.z + t.h, [rect(2.5, 2.5, t.w - 5, 10, screen), rect(5.5, 5.5, 13, 1.6, mark), rect(5.5, 8.8, 8, 1.6, mark)]), block({ x: t.x - 1.5, y: t.y - 1.5, z: t.z + t.h, w: t.w + 3, d: t.d + 3, h: 1.6 }, M.slab));
  // The fee tray, holding the fee until it pays out (empty on Get paid).
  world.push(block({ x: 66, y: 6, z: 0, w: 24, d: 18, h: 4 }, M.slab), quad(68.5, 8.5, 19, 13, { fill: screen }, 4));
  if (kind !== 'paid') world.push(cube(at.fee, 4, M.mist, 10, part('fee')));
  // The time rings on the floor, round whichever answer was staked last; on Get paid, solid Green, with a twin
  // that pulses once (at rest it is invisible).
  if (kind === 'report') world.push(ring(pads.yes, false, part('ring')));
  if (kind === 'challenge') world.push(ring(pads.no, false, part('ring')));
  if (kind === 'paid') world.push(ring(pads.no, true, part('ring')), ring(pads.no, true, part('pulse', { opacity: 0 })));
  world.push(block({ ...pads.yes, z: 0, h: PAD_H }, M.slab), block({ ...pads.no, z: 0, h: PAD_H }, M.slab));
  if (kind === 'paid') world.push(block({ ...pads.no, z: 0, h: PAD_H }, won, part('won')));
  // The stakes, back to front: theirs on the first answer, yours on the other; on Get paid theirs has come over
  // to you (a Mist twin, invisible at rest, carries it across before it turns Green).
  if (kind === 'report' || kind === 'challenge') world.push(cube(at.theirs, PAD_H, M.mist, S, part('theirs')));
  if (kind === 'challenge' || kind === 'paid') world.push(cube(at.mine[0], PAD_H, M.green, S, part('a')), cube(at.mine[1], PAD_H, M.green, S, part('b')));
  if (kind === 'paid') world.push(cube(at.won, PAD_H, M.mist, S, part('was', { opacity: 0 })), cube(at.won, PAD_H, M.green, S, part('taken')));
  return world;
}

const worlds = { ask: stage('ask'), report: stage('report'), challenge: stage('challenge'), paid: stage('paid') } satisfies Record<HowKind, SvgNode[]>;
export const howScenes = { worlds, transform: fit(Object.values(worlds).flat()) };
// The screen offsets the play needs, in the drawing's own units (inside the fitted group): where Challenge's second
// block starts (on the first), and where their block starts its hop on Get paid (on the first answer).
const move = (from: Spot, to: Spot) => shift(from[0] - to[0], from[1] - to[1]);
export const howSceneMoves = { double: move(at.mine[0], at.mine[1]), hop: move(at.theirs, at.won) };
