// @ts-nocheck
// A local capture tool for artifacts/video-test, not site code, so the site type check skips it.
// Put a keyframe under the real /2/ hero copy as a cover-cropped background, as a <video> poster would sit.
// bun kf-preview.ts <port> <keyframe.png> <outDir> <w>x<h> ...
const [port, keyframe, outDir, ...sizes] = process.argv.slice(2);
const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
const ws = new WebSocket(targets.find((t: any) => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const waiting = new Map<number, (v: any) => void>();
ws.addEventListener('message', e => { const m = JSON.parse(String(e.data)); if (m.id && waiting.has(m.id)) { waiting.get(m.id)!(m); waiting.delete(m.id); } });
const send = (method: string, params: any = {}) => new Promise<any>(r => { const n = ++id; waiting.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
const evaluate = async (expression: string) => { const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) console.error(JSON.stringify(r.result.exceptionDetails).slice(0, 600)); return r.result?.result?.value; };
const dataUrl = 'data:image/png;base64,' + Buffer.from(await Bun.file(keyframe).arrayBuffer()).toString('base64');
await send('Page.enable');
await send('Emulation.setScriptExecutionDisabled', { value: true });
for (const size of sizes) {
  const [width, height] = size.split('x').map(Number);
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://127.0.0.1:4321/2/' });
  await new Promise(r => setTimeout(r, 4500));
  const info = await evaluate(`(async () => {
    const hero = document.querySelector('.home-hero'), inner = hero.querySelector('.hero-inner');
    hero.style.position = 'relative'; inner.style.position = 'relative'; inner.style.zIndex = '1';
    hero.querySelectorAll('.flock').forEach(e => e.style.visibility = 'hidden');
    const img = new Image(); img.src = ${JSON.stringify(dataUrl)};
    img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:74% 50%;z-index:0;pointer-events:none;opacity:${process.env.OPACITY ?? 1}';
    hero.prepend(img); await img.decode();
    const r = (s) => { const b = document.querySelector(s)?.getBoundingClientRect(); return b && [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
    return JSON.stringify({ hero: r('.home-hero'), copy: r('.hero-copy'), h1: r('#hero-title') });
  })()`);
  console.log(size, info);
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  await Bun.write(`${outDir}/preview-${size}-${process.env.OPACITY ?? 1}.png`, Buffer.from(shot.result.data, 'base64'));
}
ws.close(); process.exit(0);
