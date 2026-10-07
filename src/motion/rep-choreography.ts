import { close, pulses, type Key, type Track } from './choreography';
import { pulseTiming } from './tenet-choreography';

/** The REP rows' ambient loop (owner, 6 Oct 2026: “more alive”; option B of three
 * sketches, “fine arrow, bond glides”), one source for the website and the Figma
 * keyframes. Every 6 s a row sends its bond: a copy of the stake glides along the
 * arrow and lands on the returned bond, and the winnings pop as it lands. For Risk
 * the copy fades as it reaches the lost bond, whose dashed outline flashes. Rows go
 * 2 s apart, so one row is always moving. Every track opens and closes on the static
 * artwork: the copy and the flash hidden, the winnings at rest. */
export const repCycle = 12000;
export const repTiming = {
  first: 60, every: 6000, stagger: 2000, lead: 1800,
  fadeIn: 200, travel: 1200, fadeOut: 300, lostFade: 400, peak: .9, popAfter: 40,
  flash: { before: 150, rise: 120, fall: 480, peak: .9 },
} as const;

/** What a row gets back: how many winnings squares, or a lost bond. */
export interface RepRow { gains: number; lost: boolean }

/** Tracks for row `index`; ids match the `data-motion` attributes in StakeFlow.astro. */
export function repRowTracks(index: number, row: RepRow): Track[] {
  const t = repTiming, id = (part: string) => `rep-${index}-${part}`;
  const sends = [0, 1].map(k => t.first + index * t.stagger + k * t.every), lands = sends.map(at => at + t.travel);
  // The glide carries the copy: it jumps back to the stake while the copy is hidden,
  // then slides home (its static place, over the outcome) along the arrow.
  const glide: Track = { id: id('glide'), prop: 'translate', delay: t.lead, keys: close([{ t: 0, v: [0, 0] }, ...sends.flatMap((at): Key[] => [{ t: at, v: [-100, 0], e: 'hold' }, { t: at + t.travel, v: [0, 0], e: 'draw' }])], repCycle) };
  const ghost: Track = { id: id('ghost'), prop: 'opacity', delay: t.lead, keys: pulses(sends.map(start => row.lost
    ? { start, rise: t.fadeIn, hold: t.travel - t.fadeIn - t.lostFade, fall: t.lostFade, peak: t.peak }
    : { start, rise: t.fadeIn, hold: t.travel - t.fadeIn, fall: t.fadeOut, peak: t.peak }), repCycle) };
  // Winnings pop as the copy lands, in the tenets' pulse (owner's choice, 6 Oct 2026).
  const pop = (at: number): Key[] => [{ t: at, v: 1 }, { t: at + pulseTiming.pop[0], v: pulseTiming.scale, e: 'reveal' }, { t: at + pulseTiming.pop[1], v: 1, e: 'crossfade' }];
  const gains = Array.from({ length: row.gains }, (_, k): Track => ({ id: id(`gain-${k}`), prop: 'scale', delay: t.lead, keys: close([{ t: 0, v: 1 }, ...lands.flatMap(at => pop(at + t.popAfter))], repCycle) }));
  const flash: Track[] = row.lost ? [{ id: id('flash'), prop: 'opacity', delay: t.lead, keys: pulses(lands.map(at => ({ start: at - t.flash.before, rise: t.flash.rise, hold: 0, fall: t.flash.fall, peak: t.flash.peak })), repCycle) }] : [];
  return [glide, ghost, ...gains, ...flash];
}
