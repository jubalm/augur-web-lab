import { close, pulses, type Key, type Track } from './choreography';
import { pulseTiming } from './tenet-choreography';

/** The “Your REP” zone's loop in the How it works query card (19 Oct 2026), one
 * source for the website and the Figma keyframes. It keeps the old REP rows'
 * language (owner, 6 Oct 2026: option B, “fine arrow, bond glides”), but only the
 * active step's zone runs, from rest, on one 12 s cycle that opens and closes on
 * the static artwork:
 * - flow (Report, Challenge): twice a cycle a copy of the stake fades in, glides
 *   along the arrow onto the bond that comes back and fades unseen as it covers an
 *   identical square; the Green winnings pop as it lands.
 * - receipt (Get paid): what you receive pops group by group, twice a cycle.
 * - meter (A question opens): the reward fill fades, restarts at 0 and rises back to
 *   its resting sixth of the fee over most of the cycle (scaleX only).
 * Glide values are fractions of the stake-to-bond distance, which the page measures. */
export const repCycle = 12000;
export const repTiming = {
  sends: [600, 6600], fadeIn: 200, travel: 1200, fadeOut: 300, peak: .9, popAfter: 40, popStagger: 80,
  receipt: { starts: [600, 6600], stagger: 160 },
  meter: { rest: 1 / 6, fadeAt: 1400, fade: 300, restart: 200, rise: 9000 },
} as const;

const pop = (at: number): Key[] => [{ t: at, v: 1 }, { t: at + pulseTiming.pop[0], v: pulseTiming.scale, e: 'reveal' }, { t: at + pulseTiming.pop[1], v: 1, e: 'crossfade' }];
const pops = (id: string, starts: readonly number[]): Track => ({ id, prop: 'scale', keys: close([{ t: 0, v: 1 }, ...starts.flatMap(pop)], repCycle) });

/** Tracks for one zone; ids match the `data-motion` attributes in RepFlow.astro.
 * `gains` counts the zone's popping groups. */
export function repZoneTracks(kind: 'meter' | 'flow' | 'receipt', gains: number): Track[] {
  const t = repTiming;
  if (kind === 'meter') {
    const m = t.meter, gone = m.fadeAt + m.fade, back = gone + m.restart;
    return [
      { id: 'zone-meter', prop: 'scale', keys: close([{ t: 0, v: [m.rest, 1] }, { t: gone, v: [m.rest, 1] }, { t: gone + 1, v: [0, 1], e: 'hold' }, { t: back, v: [0, 1] }, { t: back + m.rise, v: [m.rest, 1], e: 'linear' }], repCycle) },
      { id: 'zone-meter-fade', prop: 'opacity', keys: close([{ t: 0, v: 1 }, { t: m.fadeAt, v: 1 }, { t: gone, v: 0, e: 'crossfade' }, { t: gone + 1, v: 1, e: 'hold' }], repCycle) },
    ];
  }
  if (kind === 'receipt') return Array.from({ length: gains }, (_, k) => pops(`zone-pop-${k}`, t.receipt.starts.map(at => at + k * t.receipt.stagger)));
  const lands = t.sends.map(at => at + t.travel);
  // The copy jumps back to the stake while hidden, then slides onto the returned bond.
  const glide: Track = { id: 'zone-glide', prop: 'translate', keys: close([{ t: 0, v: [0, 0] }, ...t.sends.flatMap((at): Key[] => [{ t: at, v: [0, 0] }, { t: at + t.travel, v: [1, 1], e: 'draw' }, { t: at + t.travel + t.fadeOut + 1, v: [0, 0], e: 'hold' }])], repCycle) };
  const ghost: Track = { id: 'zone-ghost', prop: 'opacity', keys: pulses(t.sends.map(start => ({ start, rise: t.fadeIn, hold: t.travel - t.fadeIn, fall: t.fadeOut, peak: t.peak })), repCycle) };
  return [glide, ghost, ...Array.from({ length: gains }, (_, k) => pops(`zone-pop-${k}`, lands.map(at => at + t.popAfter + k * t.popStagger)))];
}
