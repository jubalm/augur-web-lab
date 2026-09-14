// An open weave: each family keeps its own path through the shared structure.
export const TAU = Math.PI * 2;
export const THREAD_COUNT = 168;
export const THREAD_SAMPLES = 240;
export const CYCLE_SECONDS = 22;
export const FOCUS_START = .5;
export const FOCUS_END = .86;
export const FOCUS_SPREAD = .14;

export function threadIdentity(thread: number): [number, number, number, number] {
  const hash = (salt: number) => ((Math.imul(thread + salt, 1664525) + 1013904223) >>> 0) / 4294967296;
  const seed = (hash(37) * 173.31) % 1;
  const unresolved = thread % 24 === 5 || thread % 24 === 19;
  const tentative = thread % 24 === 12;
  const resistance = unresolved ? .5 + seed * .22 : tentative ? .2 + seed * .12 : .025 + seed * .04;
  const reconsideration = thread % 12 === 0 || thread % 12 === 7 ? .7 + seed * .3 : .08 + seed * .12;
  return [seed, resistance, reconsideration, (hash(97) * 311.71) % 1];
}

export function threadPoint(u: number, thread: number): [number, number, number] {
  const band = Math.floor(thread / 24) / 3 - 1;
  const lane = (thread % 24) / 23 - .5;
  const [seed, resistance, reconsideration] = threadIdentity(thread);
  const progress = Math.max(0, Math.min(1, (u - .05) / .79));
  const separation = 1 - progress * progress * (3 - 2 * progress) * (1 - resistance);
  const focusProgress = Math.max(0, Math.min(1, (u - FOCUS_START) / (FOCUS_END - FOCUS_START)));
  const focal = focusProgress * focusProgress * (3 - 2 * focusProgress);
  const spread = 1 - (1 - FOCUS_SPREAD) * focal;
  const difference = (.55 * band + .28 * Math.sin(u * TAU * 1.1 + seed * TAU)) * separation;
  const smooth = (start: number, end: number) => {
    const t = Math.max(0, Math.min(1, (u - start) / (end - start)));
    return t * t * (3 - 2 * t);
  };
  const detour = smooth(.25, .58) * (1 - smooth(.7, .94)) * reconsideration * .55;
  return [
    (u - .5) * 6.8,
    .92 * Math.sin(u * TAU * .92 - .75) + .18 * Math.sin(u * TAU * 1.85 + .5) + (band * .24 + lane * .13) * spread + difference + detour * .24 * Math.sin(seed * TAU),
    .38 * Math.cos(u * TAU * .72) + (band * .4 + lane * .12 + .13 * Math.sin(u * TAU * 1.5 + band * 3)) * spread + detour * .3 * Math.cos(seed * TAU),
  ];
}

export function staticField() {
  return Array.from({ length: THREAD_COUNT }, (_, thread) => {
    const points = Array.from({ length: 161 }, (_, sample) => {
      const [x, y, z] = threadPoint(sample / 160, thread);
      return `${sample ? 'L' : 'M'}${(500 + x * 115).toFixed(2)},${(310 - y * 115 + z * 22).toFixed(2)}`;
    });
    return { path: points.join(' '), opacity: thread % 24 === 0 ? .55 : .2 };
  });
}
