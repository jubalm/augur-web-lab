export const MEMORY_COLUMNS = 16;
export const MEMORY_ROWS = 7;

const OFFSET_LIMIT = .2;
const RESPONSE_RATE = 1 / 2;
const DECAY_RATE = 1 / 65;
const TAU = Math.PI * 2;
const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

/** A small spatial memory: interleaved Y/Z offsets, row first, from left to right. */
export function createWeaveMemory() {
  const values = new Float32Array(MEMORY_ROWS * MEMORY_COLUMNS * 2);
  const targets = new Float64Array(values.length);

  function add(x: number, y: number, strength: number) {
    if (![x, y, strength].every(Number.isFinite) || strength === 0) return;
    const sourceX = clamp(x, 3.4);
    const sourceU = (sourceX + 3.4) / 6.8;
    const amount = clamp(strength, 1);
    const centerY = .92 * Math.sin(sourceU * TAU * .92 - .75)
      + .18 * Math.sin(sourceU * TAU * 1.85 + .5);

    for (let row = 0; row < MEMORY_ROWS; row++) {
      const band = row / ((MEMORY_ROWS - 1) / 2) - 1;
      const separation = centerY + band * .45 - y;
      const affinity = Math.exp(-.5 * (separation / .62) ** 2);
      // Mostly move away from contact, with a quiet difference between streams.
      const directionY = clamp(Math.tanh(separation * 2.4)
        + .23 * Math.sin(sourceU * 5 + row * 1.7), 1);
      const directionZ = Math.sin(sourceU * 5 + row * 1.9 + .7);

      for (let column = 0; column < MEMORY_COLUMNS; column++) {
        const localX = column / (MEMORY_COLUMNS - 1) * 6.8 - 3.4;
        const distance = localX - sourceX;
        const local = Math.exp(-.5 * (distance / .8) ** 2);
        const downstream = distance > 0
          ? .4 * (1 - Math.exp(-distance / .55)) * Math.exp(-distance / 1.6)
          : 0;
        const influence = (local + downstream) * affinity * amount;
        const index = (row * MEMORY_COLUMNS + column) * 2;
        targets[index] = clamp(targets[index] + directionY * influence * .14, OFFSET_LIMIT);
        targets[index + 1] = clamp(targets[index + 1] + directionZ * influence * .1, OFFSET_LIMIT);
      }
    }
  }

  function step(deltaSeconds: number) {
    if (!Number.isFinite(deltaSeconds) || deltaSeconds <= 0) return;
    const response = Math.exp(-RESPONSE_RATE * deltaSeconds);
    const decay = Math.exp(-DECAY_RATE * deltaSeconds);
    // Exact integration keeps both recovery and decay consistent across frame rates.
    const follow = RESPONSE_RATE / (RESPONSE_RATE - DECAY_RATE) * (decay - response);
    for (let i = 0; i < values.length; i++) {
      values[i] = clamp(values[i] * response + targets[i] * follow, OFFSET_LIMIT);
      targets[i] *= decay;
    }
  }

  function clear() { values.fill(0); targets.fill(0); }

  return {
    values, add, step, clear,
    get energy() {
      let peak = 0;
      for (let i = 0; i < values.length; i++) {
        peak = Math.max(peak, Math.abs(values[i]), Math.abs(targets[i]));
      }
      return Math.min(1, peak / OFFSET_LIMIT);
    },
  };
}
