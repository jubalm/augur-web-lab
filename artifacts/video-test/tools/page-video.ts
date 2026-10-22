// @ts-nocheck
// A local capture tool for artifacts/video-test, not site code, so the site type check skips it.
// The encoded loop behind the real /2/ hero copy, as the site would place it: object-fit cover,
// object-position 74% 50%, the coded flock hidden. Frames at chosen times, at full strength and faded.
// bun page-video.ts <port> <videoUrl> <outPrefix> <opacity> <t1,t2,...>
const [port, videoUrl, out, opacity = '1', timesArg = '1.5,5,8.5'] = process.argv.slice(2);
const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
const ws = new WebSocket(targets.find((t: any) => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const waiting = new Map<number, (v: any) => void>();
ws.addEventListener('message', e => { const m = JSON.parse(String(e.data)); if (m.id && waiting.has(m.id)) { waiting.get(m.id)!(m); waiting.delete(m.id); } });
const send = (method: string, params: any = {}) => new Promise<any>(r => { const n = ++id; waiting.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
const evaluate = async (expression: string) => { const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) console.error(JSON.stringify(r.result.exceptionDetails).slice(0, 600)); return r.result?.result?.value; };
await send('Page.enable');
await send('Emulation.setScriptExecutionDisabled', { value: false });
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: 'http://127.0.0.1:4321/2/' });
await new Promise(r => setTimeout(r, 6000));
console.log(await evaluate(`(async () => {
  const hero = document.querySelector('.home-hero'), inner = hero.querySelector('.hero-inner');
  hero.style.position = 'relative'; inner.style.position = 'relative'; inner.style.zIndex = '1';
  hero.querySelectorAll('.flock').forEach(e => e.style.visibility = 'hidden');
  const v = document.createElement('video'); v.id = 'hv'; v.muted = true; v.playsInline = true; v.preload = 'auto'; v.src = ${JSON.stringify(videoUrl)};
  v.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:74% 50%;z-index:0;pointer-events:none;opacity:${opacity}';
  hero.prepend(v);
  await new Promise((ok, no) => { v.onloadeddata = ok; v.onerror = () => no(new Error('video error ' + (v.error && v.error.code))); });
  return JSON.stringify({ w: v.videoWidth, h: v.videoHeight, d: v.duration });
})()`));
for (const t of timesArg.split(',').map(Number)) {
  await evaluate(`new Promise(ok => { const v = document.getElementById('hv'); v.onseeked = () => ok(1); v.currentTime = ${t}; })`);
  await new Promise(r => setTimeout(r, 400));
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 86 });
  await Bun.write(`${out}-${opacity}-${t}.jpg`, Buffer.from(shot.result.data, 'base64'));
}
console.log('saved', out);
ws.close(); process.exit(0);
