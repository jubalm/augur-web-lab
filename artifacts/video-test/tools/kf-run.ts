// @ts-nocheck
// A local capture tool for artifacts/video-test, not site code, so the site type check skips it.
// bun kf-run.ts <port> <config.json> <out.png> [preview]
const [port, configPath, out] = process.argv.slice(2);
const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
const ws = new WebSocket(targets.find((t: any) => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const waiting = new Map<number, (v: any) => void>();
ws.addEventListener('message', e => { const m = JSON.parse(String(e.data)); if (m.id && waiting.has(m.id)) { waiting.get(m.id)!(m); waiting.delete(m.id); } });
const send = (method: string, params: any = {}) => new Promise<any>(r => { const n = ++id; waiting.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
const evaluate = async (expression: string) => { const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) console.error(JSON.stringify(r.result.exceptionDetails).slice(0, 600)); return r.result?.result?.value; };
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 810, deviceScaleFactor: 4 / 3, mobile: false });
await send('Emulation.setScriptExecutionDisabled', { value: true });
await send('Page.navigate', { url: 'http://127.0.0.1:4321/2/' });
await new Promise(r => setTimeout(r, 5000));
const config = await Bun.file(configPath).text();
const script = (await Bun.file(`${import.meta.dir}/keyframe.js`).text()).replace('__CONFIG__', config);
console.log(await evaluate(script));
await new Promise(r => setTimeout(r, 300));
const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1440, height: 810, scale: 1 } });
await Bun.write(out, Buffer.from(shot.result.data, 'base64'));
const b = new Uint8Array(await Bun.file(out).arrayBuffer()), v = new DataView(b.buffer);
console.log('png', v.getUint32(16), 'x', v.getUint32(20));
ws.close(); process.exit(0);
