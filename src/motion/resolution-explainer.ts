/** Optional example controls. The complete reading path is present in static HTML. */
export function initResolutionExplainer(root: HTMLElement) {
  if (root.dataset.resolutionInitialized) return;
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-resolution-step]')];
  const scenes = [...root.querySelectorAll<HTMLElement>('[data-resolution-scene]')];
  const steps = [...root.querySelectorAll<HTMLElement>('[data-step-item]')];
  const segments = [...root.querySelectorAll<HTMLElement>('[data-query-progress]')];
  const status = root.querySelector<HTMLElement>('[data-query-status]');
  const counter = root.querySelector<HTMLElement>('[data-step-count]');
  const previous = root.querySelector<HTMLButtonElement>('[data-resolution-previous]');
  const next = root.querySelector<HTMLButtonElement>('[data-resolution-next]');
  const toggle = root.querySelector<HTMLButtonElement>('[data-challenge-toggle]');
  const toggleLabel = root.querySelector<HTMLElement>('[data-challenge-label]');
  const pathLabel = root.querySelector<HTMLElement>('[data-path-label]');
  if (buttons.length !== 4 || scenes.length !== 4 || steps.length !== 4 || segments.length !== 4 || !status || !counter || !previous || !next || !toggle || !toggleLabel || !pathLabel) return;
  root.dataset.resolutionInitialized = 'true';

  const lifecycle = new AbortController();
  const options = { signal: lifecycle.signal };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set<Animation>();
  let current = 0;
  let challenge = false;
  let pageHidden = false;
  let sceneAnimation: Animation | undefined;
  const original = scenes.map(scene => ({
    label: scene.querySelector('[data-scene-label]')!.textContent,
    answer: scene.querySelector('[data-scene-answer]')!.textContent,
    note: scene.querySelector('[data-scene-note]')!.textContent,
    amount: scene.querySelector('[data-scene-amount]')!.textContent,
    cost: scene.querySelector('[data-scene-cost]')!.textContent,
  }));
  const disputed = [original[0],
    { label: 'Reported answer', answer: 'Yes', note: 'A reporter cites an initial result, but the required independent replication is missing.', amount: '15', cost: 'Reporting bond' },
    { label: 'Challenged answer', answer: 'No', note: 'A challenger points to the missing replication. A new appeal period opens.', amount: '30', cost: 'Challenge bond' },
    { label: 'Final outcome', answer: 'No', note: 'No further challenge arrives. The new appeal period ends and No becomes final.', amount: '30', cost: 'Bond returned' },
  ];
  const cancelAnimations = () => {
    animations.forEach(animation => animation.cancel());
    animations.clear();
    sceneAnimation = undefined;
  };
  const animate = (element: HTMLElement, distance = 6) => {
    if (reduced.matches || document.hidden || pageHidden || typeof element.animate !== 'function') return;
    const animation = element.animate([
      { opacity: .7, transform: `translateY(${distance}px)` },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 240, easing: 'ease-out' });
    animations.add(animation);
    animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
    return animation;
  };
  const render = (index: number, announce = false) => {
    if (index < 0 || index > 3) return;
    sceneAnimation?.cancel();
    const changed = current !== index;
    current = index;
    const content = challenge ? disputed : original;
    scenes.forEach((scene, i) => {
      const active = i === current;
      scene.dataset.active = String(active);
      scene.inert = !active;
      scene.setAttribute('aria-hidden', String(!active));
      for (const [key, value] of Object.entries(content[i])) {
        scene.querySelector(`[data-scene-${key}]`)!.textContent = value;
      }
      buttons[i].setAttribute('aria-pressed', String(active));
      steps[i].dataset.state = i < current ? 'complete' : active ? 'current' : 'upcoming';
      segments[i].toggleAttribute('data-complete', i <= current);
    });
    root.dataset.currentStep = String(current);
    root.dataset.examplePath = challenge ? 'challenge' : 'ordinary';
    status.setAttribute('aria-live', announce ? 'polite' : 'off');
    status.textContent = ['Open', 'Reported', challenge ? 'New appeal period' : 'Appeal period', 'Final'][current];
    counter.textContent = `0${current + 1} / 04`;
    previous.disabled = current === 0;
    next.textContent = current === 3 ? 'Start again' : 'Next step';
    if (changed && announce) sceneAnimation = animate(scenes[current]);
  };
  buttons.forEach((button, index) => {
    button.hidden = false;
    button.addEventListener('click', () => render(index, true), options);
  });
  previous.addEventListener('click', () => {
    render(current - 1, true);
    if (current === 0) next.focus({ preventScroll: true });
  }, options);
  next.addEventListener('click', () => render(current === 3 ? 0 : current + 1, true), options);
  toggle.addEventListener('click', () => {
    challenge = !challenge;
    toggle.setAttribute('aria-pressed', String(challenge));
    toggleLabel.textContent = challenge ? 'Return to simple example' : 'See a challenge';
    pathLabel.textContent = challenge ? 'With a challenge' : 'Without a challenge';
    // Start at the report so its missing evidence gives the challenge a reason.
    render(challenge ? 1 : 0, true);
  }, options);
  root.querySelectorAll<HTMLElement>('[data-step-controls], [data-example-options]').forEach(element => { element.hidden = false; });
  root.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const detail = (event.target as HTMLElement).closest<HTMLDetailsElement>('details[open]');
    if (!detail) return;
    event.preventDefault();
    detail.open = false;
    detail.querySelector('summary')?.focus({ preventScroll: true });
  }, options);

  // Section entrances use the shared CSS scroll motion (src/styles/motion.css).
  reduced.addEventListener('change', cancelAnimations, options);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimations();
  }, options);
  window.addEventListener('pagehide', event => {
    pageHidden = true;
    cancelAnimations();
    if (!event.persisted) lifecycle.abort();
  }, options);
  window.addEventListener('pageshow', () => { pageHidden = false; }, options);
  root.dataset.enhanced = 'true';
  render(0);
}
