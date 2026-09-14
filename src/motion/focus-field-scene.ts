import { BufferAttribute, BufferGeometry, Color, LineSegments, NormalBlending, PerspectiveCamera, Plane, Points, Raycaster, Scene, ShaderMaterial, SRGBColorSpace, Vector2, Vector3, WebGLRenderer } from 'three';
import { createFocusCamera } from './focus-field-camera';
import { CYCLE_SECONDS, FOCUS_START, FOCUS_END, FOCUS_SPREAD, THREAD_COUNT, THREAD_SAMPLES, threadIdentity } from './focus-field-geometry';
import { createWeaveMemory, MEMORY_COLUMNS, MEMORY_ROWS } from './focus-field-memory';

const vertex = /* glsl */`
  attribute vec3 aThread;
  attribute vec4 aIdentity;
  uniform float uTime;
  uniform float uCycle;
  uniform float uStatic;
  uniform float uMaxAlignment;
  uniform float uInteractionStrength;
  uniform float uPoints;
  uniform float uPixelRatio;
  uniform vec3 uTouch;
  uniform float uHover;
  uniform vec3 uPulseOrigins[3];
  uniform float uPulseAges[3];
  uniform float uPulseWeights[3];
  uniform vec2 uMemory[${MEMORY_COLUMNS * MEMORY_ROWS}];
  varying float vAlpha;
  varying float vAlignment;
  varying float vAccent;
  const float TAU = 6.28318530718;
  float noise(float x) {
    float i = floor(x), f = fract(x);
    f = f * f * (3. - 2. * f);
    return mix(fract(sin(i * 127.1) * 43758.5453), fract(sin((i + 1.) * 127.1) * 43758.5453), f);
  }
  void main() {
    float u = position.x;
    if (uPoints > .5) u = fract(u + uTime * (.028 + aThread.z * .01));
    float band = aThread.x;
    float lane = aThread.y;
    float seed = aIdentity.x;
    float resistance = aIdentity.y;
    float variation = noise(uTime / uCycle + seed * 31.);
    // Convergence belongs to the path, so the result never periodically unravels.
    float maturity = smoothstep(.05, .84, u);
    float focal = smoothstep(${FOCUS_START}, ${FOCUS_END}, u);
    float spread = mix(1., ${FOCUS_SPREAD}, focal);
    float alignment = maturity * (1. - resistance) * uMaxAlignment;
    float pulse = 0.;
    float pulseLift = 0.;
    vec2 resultNoise = vec2(0.);
    vec2 resultDrift = vec2(0.);
    for (int i = 0; i < 3; i++) {
      if (uPulseWeights[i] <= 0.) continue;
      float age = uPulseAges[i];
      float distance = abs((u - .5) * 6.8 - uPulseOrigins[i].x);
      float scope = .65 + 2.8 * fract(abs(uPulseOrigins[i].x * .173 + uPulseOrigins[i].y * .317) + .38);
      float affinity = exp(-pow((band * .7 - uPulseOrigins[i].y) * .65, 2.));
      float speed = .55 + aIdentity.w * .2;
      float impulse = exp(-pow((distance - age * speed) / .9, 2.)) * exp(-age * .4);
      impulse *= exp(-distance / scope) * (.3 + .7 * affinity);
      impulse *= smoothstep(0., .75, age) * uPulseWeights[i];
      pulse += impulse;
      pulseLift += impulse * .045 * sin(band * 1.4 + uPulseOrigins[i].y);
      // New information gently shifts the result as well as its individual paths.
      float arrivalAge = age - max(0., float(${(FOCUS_END - .5) * 6.8}) - uPulseOrigins[i].x) * .15;
      float arrival = smoothstep(0., .8, arrivalAge) * exp(-max(0., arrivalAge) * .22) * uPulseWeights[i];
      float offset = seed * TAU + uPulseOrigins[i].x * .7 + uPulseOrigins[i].y * 1.3;
      resultNoise += arrival * vec2(
        sin(u * TAU * (1.1 + seed * .6) + offset + age * .7),
        cos(u * TAU * (1.3 + seed * .4) + offset - age * .55)
      );
      resultDrift += arrival * vec2(
        sin(uPulseOrigins[i].y * 1.4 + uPulseOrigins[i].x * .4 + .8),
        .55 * cos(uPulseOrigins[i].x * .7 - uPulseOrigins[i].y * .4)
      );
    }
    pulse = min(pulse, 1.);
    // New information gently redirects nearby strands instead of sending a sharp wave.
    alignment *= 1. - pulse * .08;
    float phase = band * 1.8 + .22 * sin(uTime * .055 + band * .4) + (variation - .5) * (.06 + resistance * .3);
    float looseY = .9 * sin(u * TAU * 1.1 + phase) + band * .8 + lane * .22;
    looseY += .15 * sin(u * TAU * 2.1 + band * 3. + uTime * .055);
    float looseZ = .65 * cos(u * TAU * .74 + phase) + band * .38 + lane * .16;
    float sharedY = .92 * sin(u * TAU * .92 - .75 + sin(uTime * .055) * .1);
    sharedY += .18 * sin(u * TAU * 1.85 + .5) + (band * .24 + lane * .13) * spread;
    float sharedZ = .38 * cos(u * TAU * .72);
    sharedZ += (band * .4 + lane * .12 + .13 * sin(u * TAU * 1.5 + band * 3.)) * spread;
    // Independent adjustments travel downstream and settle as the paths gather.
    // Residual motion is smaller at the focus; resistant strands retain more doubt.
    float settlingPhase = TAU * (1.25 * u - uTime * (.085 + seed * .025)) + seed * TAU;
    float uncertainty = .16 * pow(1. - maturity, 1.4) + .012 + .035 * resistance;
    vec2 settling = uncertainty * vec2(sin(settlingPhase), .55 * cos(settlingPhase + seed * 2.));
    // Some thoughts take a rounded detour before rejoining; a few remain tentative.
    float reconsideration = aIdentity.z * (.55 + .45 * sin(uTime * (.27 + seed * .09) + seed * TAU) * (1. - uStatic));
    float branch = smoothstep(.25, .58, u) * (1. - smoothstep(.7, .94, u));
    vec2 detour = branch * reconsideration * vec2(.24 * sin(seed * TAU), .3 * cos(seed * TAU));
    float column = u * float(${MEMORY_COLUMNS - 1});
    int lower = int(floor(column));
    int row = int(floor((band + 1.) * 3. + .5));
    int start = row * ${MEMORY_COLUMNS};
    vec2 trace = mix(uMemory[start + lower], uMemory[start + min(lower + 1, ${MEMORY_COLUMNS - 1})], smoothstep(0., 1., fract(column)));
    trace *= (.7 + seed * .6) * (1. - uStatic);
    vec3 p = vec3((u - .5) * 6.8, mix(looseY, sharedY, alignment), mix(looseZ, sharedZ, alignment));
    p.yz += trace + detour + settling * (1. - uStatic);
    vec2 resultOffset = clamp(resultNoise, vec2(-1.), vec2(1.)) * .18
      + clamp(resultDrift, vec2(-1.), vec2(1.)) * .10;
    p.yz += resultOffset * focal * uInteractionStrength * (1. - uStatic);
    // Contact follows the visible plane, including side and upside-down views.
    vec2 touchOffset = (viewMatrix * vec4(p - uTouch, 0.)).xy;
    float influence = exp(-dot(touchOffset, touchOffset) * 2.8) * uHover;
    vec2 away = normalize(touchOffset + vec2(.001));
    vec3 viewRight = vec3(viewMatrix[0].x, viewMatrix[1].x, viewMatrix[2].x);
    vec3 viewUp = vec3(viewMatrix[0].y, viewMatrix[1].y, viewMatrix[2].y);
    vec3 viewOut = vec3(viewMatrix[0].z, viewMatrix[1].z, viewMatrix[2].z);
    float hoverScale = 1. - .7 * focal;
    p += ((viewRight * away.x + viewUp * away.y) * .18 + viewOut * .3)
      * influence * uInteractionStrength * hoverScale;
    // Nearby strands respond individually, with a smaller flutter at the focus.
    float contactPhase = seed * TAU + u * 4. + uTime * .65;
    float contactDoubt = (.018 + .035 * aIdentity.z) * (1. - .5 * focal)
      * influence * uInteractionStrength;
    p += (viewUp * sin(contactPhase) + viewOut * .55 * cos(contactPhase)) * contactDoubt;
    p.y += pulseLift * uInteractionStrength;
    p.z += pulse * .045 * cos(band * 3.) * uInteractionStrength;
    float edge = smoothstep(0., .085, u) * (1. - smoothstep(.915, 1., u));
    // Green follows the gathered paths; hovering gently brings selected strands forward.
    float agreement = smoothstep(.4, .85, alignment);
    float accentLane = 1. - step(.001, aThread.z)
      + 1. - step(.025, abs(aThread.z - .348))
      + 1. - step(.025, abs(aThread.z - .696));
    vAccent = accentLane;
    vAlignment = (.3 * accentLane + agreement * (.1 + .72 * accentLane)) * (1. - .3 * pulse);
    vAlignment += accentLane * influence * .1;
    float lead = step(.94, aThread.z);
    vAlpha = edge * mix(.15 + lead * .21 + accentLane * .28, .55, uPoints);
    vAlpha *= .75 + .25 * smoothstep(-1.2, 1.2, p.z);
    vAlpha += edge * (influence * .08 + pulse * .04 + vAlignment * .12);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.);
    gl_PointSize = (1.6 + aThread.z * .8 + influence * .6 + pulse * .6) * uPixelRatio;
  }
`;
const fragment = /* glsl */`
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uDark;
  uniform float uPoints;
  varying float vAlpha;
  varying float vAlignment;
  varying float vAccent;
  void main() {
    float mask = 1.;
    if (uPoints > .5) {
      mask = 1. - smoothstep(.12, .5, length(gl_PointCoord - .5));
      if (mask < .02) discard;
    }
    float accent = clamp(vAlignment * mix(1., 1.35, uDark), 0., 1.);
    vec3 color = mix(uColor, uAccent, accent);
    gl_FragColor = vec4(color, vAlpha * mask * mix(1.1, 1.2 + vAccent * .25, uDark));
    #include <colorspace_fragment>
  }
`;

interface FocusSceneOptions {
  backgroundElement?: HTMLElement;
  maxAlignment?: number;
  interactionStrength?: number;
}

export function createFocusScene(canvas: HTMLCanvasElement, stage: HTMLElement, options: FocusSceneOptions = {}) {
  let renderer: WebGLRenderer;
  try { renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' }); }
  catch (error) { console.warn('Signal Loom WebGL initialization failed:', error); return null; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0, 0);
  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, .1, 40);
  camera.position.set(.25, .65, 8.8);
  const cameraMotion = createFocusCamera(camera);
  const memory = createWeaveMemory();
  const uniforms = {
    uTime: { value: 0 }, uCycle: { value: CYCLE_SECONDS }, uStatic: { value: 0 },
    uMaxAlignment: { value: options.maxAlignment ?? 1 },
    uInteractionStrength: { value: options.interactionStrength ?? 1 },
    uPixelRatio: { value: renderer.getPixelRatio() },
    uColor: { value: new Color() }, uAccent: { value: new Color() }, uDark: { value: 0 },
    uTouch: { value: new Vector3() }, uHover: { value: 0 },
    uMemory: { value: memory.values },
    uPulseOrigins: { value: [new Vector3(), new Vector3(), new Vector3()] }, uPulseAges: { value: [100, 100, 100] },
    uPulseWeights: { value: [0, 0, 0] },
  };
  function geometry(points: boolean) {
    // Adjacent segments share endpoints, including their expensive shader result.
    const count = THREAD_COUNT * (points ? 3 : THREAD_SAMPLES + 1);
    const positions = new Float32Array(count * 3), attributes = new Float32Array(count * 3), identities = new Float32Array(count * 4);
    const indices = points ? null : new Uint16Array(THREAD_COUNT * THREAD_SAMPLES * 2);
    let index = 0;
    let segment = 0;
    // Draw the twenty-one accent strands last so neutral strands cannot wash them out.
    const order = Array.from({ length: THREAD_COUNT }, (_, thread) => thread)
      .sort((a, b) => Number(a % 8 === 0) - Number(b % 8 === 0));
    for (const thread of order) {
      const band = Math.floor(thread / 24) / 3 - 1;
      const lane = (thread % 24) / 23 - .5;
      const seed = (thread % 24) / 23;
      const identity = threadIdentity(thread);
      const add = (u: number) => {
        positions[index * 3] = u;
        attributes.set([band, lane, seed], index * 3);
        identities.set(identity, index * 4); index++;
      };
      if (points) { for (let i = 0; i < 3; i++) add((i / 3 + thread * .6180339887) % 1); }
      else {
        const start = index;
        for (let sample = 0; sample <= THREAD_SAMPLES; sample++) add(sample / THREAD_SAMPLES);
        for (let sample = 0; sample < THREAD_SAMPLES; sample++) {
          indices![segment++] = start + sample;
          indices![segment++] = start + sample + 1;
        }
      }
    }
    const result = new BufferGeometry();
    result.setAttribute('position', new BufferAttribute(positions, 3));
    result.setAttribute('aThread', new BufferAttribute(attributes, 3));
    result.setAttribute('aIdentity', new BufferAttribute(identities, 4));
    if (indices) result.setIndex(new BufferAttribute(indices, 1));
    return result;
  }
  const lineGeometry = geometry(false), pointGeometry = geometry(true);
  const lineMaterial = new ShaderMaterial({ uniforms: { ...uniforms, uPoints: { value: 0 } }, vertexShader: vertex, fragmentShader: fragment, transparent: true, depthWrite: false, depthTest: false, blending: NormalBlending });
  const pointMaterial = new ShaderMaterial({ uniforms: { ...uniforms, uPoints: { value: 1 } }, vertexShader: vertex, fragmentShader: fragment, transparent: true, depthWrite: false, depthTest: false, blending: NormalBlending });
  const lines = new LineSegments(lineGeometry, lineMaterial), points = new Points(pointGeometry, pointMaterial);
  lines.frustumCulled = points.frustumCulled = false; scene.add(lines, points);
  const ray = new Raycaster(), pointer = new Vector2(), surface = new Plane(new Vector3(0, 0, 1), 0), hit = new Vector3();
  const viewNormal = new Vector3(), viewOrigin = new Vector3();
  let inside = false, dragging = false, time = 0, pulseIndex = 0, failed = false;
  const pulseTimes = [-100, -100, -100];
  const pendingPulses: ({ origin: Vector3; started: number } | null)[] = [null, null, null];
  const nextPulseOrigin = new Vector3();
  const replacementSeconds = .4;
  let lastTraceAt = -100;
  const lastTracePoint = new Vector3(100, 100, 100);
  renderer.debug.onShaderError = (gl, program, vertexShader, fragmentShader) => {
    failed = true;
    console.error('Signal Loom shader failed:', gl.getProgramInfoLog(program), gl.getShaderInfoLog(vertexShader), gl.getShaderInfoLog(fragmentShader));
  };
  function theme() {
    const style = getComputedStyle(stage);
    uniforms.uColor.value.setStyle(style.color);
    uniforms.uAccent.value.copy(uniforms.uColor.value);
    const probe = stage.querySelector<HTMLElement>('[data-accent-probe]');
    if (probe) uniforms.uAccent.value.setStyle(getComputedStyle(probe).color);
    const backgroundStyle = options.backgroundElement ? getComputedStyle(options.backgroundElement) : style;
    const background = new Color().setStyle(backgroundStyle.backgroundColor);
    uniforms.uDark.value = background.r + background.g + background.b < .5 ? 1 : 0;
  }
  function resize() {
    const { width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false); camera.aspect = width / height;
    cameraMotion.resize(9.3 / (2 * Math.tan(35 * Math.PI / 360) * camera.aspect));
    camera.updateProjectionMatrix();
  }
  function setPointer(x: number, y: number, active: boolean) { pointer.set(x, y); inside = active; }
  function hitPointer() {
    camera.getWorldDirection(viewNormal);
    surface.setFromNormalAndCoplanarPoint(viewNormal, viewOrigin);
    ray.setFromCamera(pointer, camera);
    return ray.ray.intersectPlane(surface, hit) !== null
      && Number.isFinite(hit.x) && Number.isFinite(hit.y) && Number.isFinite(hit.z);
  }
  function startPulse(index: number, origin: Vector3, started: number) {
    uniforms.uPulseOrigins.value[index].copy(origin);
    pulseTimes[index] = started;
    uniforms.uPulseAges.value[index] = time - started;
    uniforms.uPulseWeights.value[index] = 1;
    pendingPulses[index] = null;
  }
  function clearPulses() {
    pulseIndex = 0;
    pulseTimes.fill(time - 100);
    uniforms.uPulseAges.value.fill(100);
    uniforms.uPulseWeights.value.fill(0);
    pendingPulses.fill(null);
  }
  function disturb(atPointer = false) {
    if (atPointer && inside && hitPointer()) nextPulseOrigin.copy(hit);
    else if (!atPointer && uniforms.uHover.value > .05) nextPulseOrigin.copy(uniforms.uTouch.value);
    else nextPulseOrigin.set(0, 0, 0);
    memory.add(nextPulseOrigin.x, nextPulseOrigin.y, .55);
    const pending = pendingPulses[pulseIndex];
    if (pending) pending.origin.copy(nextPulseOrigin);
    else if (uniforms.uPulseWeights.value[pulseIndex] === 0) startPulse(pulseIndex, nextPulseOrigin, time);
    else pendingPulses[pulseIndex] = { origin: nextPulseOrigin.clone(), started: time };
    pulseIndex = (pulseIndex + 1) % 3;
  }
  function draw(delta: number, active: boolean) {
    if (active) { time += delta; cameraMotion.step(delta); uniforms.uStatic.value = 0; }
    uniforms.uTime.value = time;
    for (let i = 0; i < 3; i++) {
      const pending = pendingPulses[i];
      if (pending) {
        // Fade the outgoing contribution to zero before the next soft attack.
        // Further clicks replace only the pending origin, never the fade's start.
        const progress = Math.min(1, (time - pending.started) / replacementSeconds);
        uniforms.uPulseWeights.value[i] = 1 - progress * progress * (3 - 2 * progress);
        if (progress >= 1) startPulse(i, pending.origin, pending.started + replacementSeconds);
      } else if (time - pulseTimes[i] >= 60) {
        // The remaining tail is subpixel; retire its shader work completely.
        uniforms.uPulseWeights.value[i] = 0;
      }
      uniforms.uPulseAges.value[i] = time - pulseTimes[i];
    }
    const onSurface = !dragging && inside && hitPointer();
    if (onSurface) uniforms.uTouch.value.lerp(hit, 1 - Math.exp(-delta * 16));
    if (active) {
      if (onSurface && Math.abs(hit.x) < 3.4 && Math.abs(hit.y) < 1.8 && time - lastTraceAt > .8 && hit.distanceTo(lastTracePoint) > .28) {
        memory.add(hit.x, hit.y, .1); lastTracePoint.copy(hit); lastTraceAt = time;
      }
      memory.step(delta);
    }
    // Fast contact, slower recovery; the weave keeps its continuity on release.
    const target = onSurface && active ? 1 : 0;
    uniforms.uHover.value += (target - uniforms.uHover.value) * (1 - Math.exp(-delta * (target ? 9 : 3.5)));
    renderer.render(scene, camera);
  }
  function staticView() {
    uniforms.uHover.value = 0;
    clearPulses();
    cameraMotion.stop(); uniforms.uStatic.value = 1; renderer.render(scene, camera);
  }
  function dispose() { cameraMotion.stop(); lineGeometry.dispose(); pointGeometry.dispose(); lineMaterial.dispose(); pointMaterial.dispose(); renderer.dispose(); }
  theme(); resize(); draw(0, false);
  if (failed) { dispose(); return null; }
  return {
    draw, staticView, resize, theme, setPointer, disturb, dispose,
    turn: cameraMotion.turn,
    setDragging(value: boolean) { dragging = value; cameraMotion.setDragging(value); },
    stopCamera: cameraMotion.stop,
    clearTrace(clearTransient = false) {
      memory.clear();
      if (clearTransient) {
        inside = false; uniforms.uHover.value = 0;
        clearPulses();
      }
      renderer.render(scene, camera);
    },
    get hasMemory() { return memory.energy > .001; },
    get phase() { return 'Decisions evolve with new information'; },
  };
}
