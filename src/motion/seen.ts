import { replayMotion } from './debug';

/** Entrance scenes play once per tab session (owner feedback, 5 Oct 2026:
 * pressing F5 must not replay every animation). A scene is recorded when it
 * starts; a reload, a history visit or a later visit in the same session shows
 * it settled. Scenes the reader has not reached yet still play. Storage can be
 * unavailable (private modes, blocked site data): the scenes then simply play. */
const STORE = 'augur:motion-seen';
const counters = new Map<string, number>();

const read = (): string[] => {
  try { return JSON.parse(sessionStorage.getItem(STORE) ?? '[]') as string[]; } catch { return []; }
};

/** A stable key for the next scene on this page, in document script order. */
export function sceneKey(name = 'scene') {
  const base = `${location.pathname}:${name}`;
  const count = counters.get(base) ?? 0;
  counters.set(base, count + 1);
  return `${base}:${count}`;
}

export function hasSeen(key: string) {
  return !replayMotion && read().includes(key);
}

export function markSeen(key: string) {
  try {
    const keys = read();
    if (!keys.includes(key)) sessionStorage.setItem(STORE, JSON.stringify([...keys, key]));
  } catch { /* Storage unavailable: the scene may play again next time. */ }
}
