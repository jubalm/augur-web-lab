// Compose the 16:9 hero keyframe from the real /2/ flock: a 1440 × 810 stage (the hero plus the
// 23 px a 16:9 cover crop adds above and below at 1440 × 900), the page's heritage field, and three
// copies of the flock as depth layers around one pole. CONFIG is replaced by the runner.
(() => {
  const C = __CONFIG__;
  const W = 1440, H = 810, TOP = 113; // stage top in page px: hero top 136 minus the 23 px crop
  const main = document.querySelector('main.home-v2'), source = document.querySelector('.flock');
  const stage = document.createElement('div');
  stage.id = 'kf-stage';
  stage.style.cssText = `position:fixed;left:0;top:0;width:${W}px;height:${H}px;background:#0e0e21;overflow:hidden;z-index:2147483647`;
  // Heritage field on the page grid (page-field.ts, fieldTimeline).
  const hash = (c, r, salt) => { let h = Math.imul(c + 1, 73856093) ^ Math.imul(r + 1, 19349663) ^ Math.imul(salt, 83492791); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  const ns = 'http://www.w3.org/2000/svg', field = document.createElementNS(ns, 'svg');
  field.setAttribute('viewBox', `0 0 ${W} ${H}`);
  field.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  let fieldCount = 0;
  // Square field (C.field): Augur squares on the page's 40 px grid across the whole frame, denser and
  // brighter towards the right, cleared around the answer square. Without C.field, the faint heritage field.
  const F = C.field;
  if (F) {
    const smooth = v => { const t = Math.min(1, Math.max(0, v)); return t * t * (3 - 2 * t); };
    const lattice = (i, j, salt) => hash(i + 1000, j + 1000, salt);
    const noise = (x, y, cell, salt) => { const gx = x / cell, gy = y / cell, i = Math.floor(gx), j = Math.floor(gy), fx = smooth(gx - i), fy = smooth(gy - j);
      const a = lattice(i, j, salt), b = lattice(i + 1, j, salt), c2 = lattice(i, j + 1, salt), d = lattice(i + 1, j + 1, salt);
      return (a * (1 - fx) + b * fx) * (1 - fy) + (c2 * (1 - fx) + d * fx) * fy; };
    const pick = (list, v) => { let a = 0; for (const [value, share] of list) { a += share; if (v < a) return value; } return list.at(-1)[0]; };
    for (let c = 0; F.offset + c * F.pitch < W; c++) for (let r = 0; F.offset + r * F.pitch < TOP + H; r++) {
      const x = F.offset + c * F.pitch, y = F.offset + r * F.pitch - TOP; if (y < -6) continue;
      const t = smooth((x - F.ramp[0]) / (F.ramp[1] - F.ramp[0]));
      if (Math.hypot(x - C.pole[0], y - C.pole[1]) < F.clear) continue;
      const n = F.noise ? Math.min(1, .65 * noise(x, y + TOP, F.noise[0], 41) + .35 * noise(x, y + TOP, F.noise[1], 42)) : .5, patch = F.noise ? smooth((n - F.noise[2]) / (F.noise[3] - F.noise[2])) : 1;
      if (hash(c, r, 31) >= (F.density[0] + (F.density[1] - F.density[0]) * t) * patch) continue;
      const kind = pick(F.kinds, hash(c, r, 32)), size = pick(F.sizes, hash(c, r, 33)), [lo, hi] = F.alpha[kind];
      const alpha = (lo + (hi - lo) * hash(c, r, 34)) * (F.leftAlpha + (1 - F.leftAlpha) * t) * (F.noise ? .55 + .45 * patch : 1);
      const rect = document.createElementNS(ns, 'rect');
      Object.entries({ x: x - size / 2, y: y - size / 2, width: size, height: size, fill: F.colours[kind], 'fill-opacity': alpha.toFixed(3) }).forEach(([k, v]) => rect.setAttribute(k, v));
      field.append(rect); fieldCount++;
    }
  } else
  for (let c = 0; 20 + c * 40 < W; c++) for (let r = 0; 20 + r * 40 < TOP + H; r++) {
    const y = 20 + r * 40 - TOP; if (y < -2) continue;
    if (hash(c, r, 1) >= .22) continue;
    const green = hash(c, r, 2) < .18, step = Math.floor(hash(c, r, 3) * 4), [lo, hi] = green ? [.12, .26] : [.05, .12];
    const rect = document.createElementNS(ns, 'rect');
    Object.entries({ x: 20 + c * 40 - 1.5, y: y - 1.5, width: 3, height: 3, fill: green ? '#2ae7a8' : '#f5f5f8', 'fill-opacity': (lo + (hi - lo) * step / 3).toFixed(3) }).forEach(([k, v]) => rect.setAttribute(k, v));
    field.append(rect); fieldCount++;
  }
  // Dust (C.dust): free-floating squares off the grid across the whole frame, in soft patches, denser
  // towards the right and cleared around the answer square. Bigger squares are rarer and brighter (nearer).
  const D = C.dust;
  if (D) {
    const smooth = v => { const t = Math.min(1, Math.max(0, v)); return t * t * (3 - 2 * t); };
    const lattice = (i, j, salt) => hash(i + 1000, j + 1000, salt);
    const noise = (x, y, cell, salt) => { const gx = x / cell, gy = y / cell, i = Math.floor(gx), j = Math.floor(gy), fx = smooth(gx - i), fy = smooth(gy - j);
      return (lattice(i, j, salt) * (1 - fx) + lattice(i + 1, j, salt) * fx) * (1 - fy) + (lattice(i, j + 1, salt) * (1 - fx) + lattice(i + 1, j + 1, salt) * fx) * fy; };
    const pick = (list, v) => { let a = 0; for (const [value, share] of list) { a += share; if (v < a) return value; } return list.at(-1)[0]; };
    for (let c = 0; c * D.cell < W; c++) for (let r = 0; r * D.cell < H; r++) {
      const x = (c + hash(c, r, 51)) * D.cell, y = (r + hash(c, r, 52)) * D.cell;
      const t = smooth((x - D.ramp[0]) / (D.ramp[1] - D.ramp[0]));
      if (Math.hypot(x - C.pole[0], y - C.pole[1]) < D.clear) continue;
      const n = .65 * noise(x, y, D.noise[0], 53) + .35 * noise(x, y, D.noise[1], 54), patch = smooth((n - D.noise[2]) / (D.noise[3] - D.noise[2]));
      if (hash(c, r, 55) >= (D.density[0] + (D.density[1] - D.density[0]) * t) * (D.floor + (1 - D.floor) * patch)) continue;
      const size = pick(D.sizes, hash(c, r, 56)), green = hash(c, r, 57) < D.green, mist = !green && hash(c, r, 58) < D.mist;
      const near = (size - D.sizes[0][0]) / (D.sizes.at(-1)[0] - D.sizes[0][0]);
      const alpha = (D.alpha[0] + (D.alpha[1] - D.alpha[0]) * (.6 * near + .4 * hash(c, r, 59))) * (D.leftAlpha + (1 - D.leftAlpha) * t);
      const rect = document.createElementNS(ns, 'rect');
      Object.entries({ x: (x - size / 2).toFixed(1), y: (y - size / 2).toFixed(1), width: size, height: size, fill: green ? '#2ae7a8' : mist ? '#a1a1b8' : '#f5f5f8', 'fill-opacity': alpha.toFixed(3) }).forEach(([k, v]) => rect.setAttribute(k, v));
      field.append(rect); fieldCount++;
    }
  }
  stage.append(field);
  // Flock layers. Each is a clone of .flock sized so 1 artwork unit = scale px, its pole on C.pole.
  const layers = [];
  for (const L of C.layers) {
    const flock = source.cloneNode(true);
    const s = L.scale, width = 572 * s;
    flock.style.cssText = `position:absolute;left:${C.pole[0] - 290 * s}px;top:${C.pole[1] - 236 * s}px;width:${width}px;transform:rotate(${L.rotate}deg);opacity:${L.opacity};` + (L.tones ? Object.entries(L.tones).map(([k, v]) => `${k}:${v}`).join(';') : '');
    if (!L.centre) flock.querySelector('.flock-centre')?.remove();
    const clusters = [...flock.querySelectorAll('.flock-c')];
    clusters.forEach((el, i) => { if (L.every > 1 && (i + L.offset) % L.every) el.remove(); });
    stage.append(flock);
    layers.push({ flock, cull: L.cull });
  }
  main.append(stage);
  // Cull clusters whose centre lands left of the text-safe line or outside the frame.
  let culled = 0, kept = 0;
  for (const { flock, cull } of layers) for (const el of flock.querySelectorAll('.flock-c')) {
    const b = el.querySelector('svg').getBoundingClientRect(), x = b.x + b.width / 2, y = b.y + b.height / 2;
    if ((cull && x < C.safeX) || x < -40 || x > W + 40 || y > H + 40) { el.remove(); culled++; } else kept++;
  }
  return JSON.stringify({ fieldCount, kept, culled });
})()
