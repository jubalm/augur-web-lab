/** A local reporting illustration. No wallet, network call, balance or token transaction. */
export function initQuestionHero(scene: HTMLElement) {
  const hero = scene.closest<HTMLElement>('[data-product-hero]');
  const action = scene.querySelector<HTMLButtonElement>('[data-back-answer]');
  const receipt = scene.querySelector<HTMLElement>('[data-report-receipt]');
  const receiptTitle = scene.querySelector<HTMLElement>('[data-receipt-title]');
  const resetButton = scene.querySelector<HTMLButtonElement>('[data-reset-report]');
  const response = scene.querySelector<HTMLElement>('[data-hero-response]');
  const state = scene.querySelector<HTMLElement>('[data-report-state]');
  const inputs = Array.from(scene.querySelectorAll<HTMLInputElement>('input[name="hero-outcome"]'));
  if (!hero || !action || !receipt || !receiptTitle || !resetButton || !response || !state) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(pointer: fine)');
  const lifecycle = new AbortController();
  const options = { signal: lifecycle.signal };
  const animations = new Set<Animation>();
  let frame = 0;
  let bounds: DOMRect | undefined;
  let x = 0, y = 0;
  let selected = '';
  const stopMotion = () => {
    animations.forEach(animation => animation.cancel());
    animations.clear();
  };
  const animate = (element: Element | null, frames: Keyframe[], timing: KeyframeAnimationOptions) => {
    if (!element || reduced.matches || document.hidden) return;
    const animation = element.animate(frames, timing);
    animations.add(animation);
    animation.onfinish = () => animations.delete(animation);
  };
  const resetPointer = () => {
    cancelAnimationFrame(frame); frame = 0;
    scene.style.removeProperty('--pointer-x'); scene.style.removeProperty('--pointer-y');
    delete scene.dataset.tracking;
  };
  const resetReport = () => {
    selected = '';
    inputs.forEach(input => { input.disabled = false; input.checked = false; });
    action.hidden = false;
    action.disabled = true;
    action.firstChild!.textContent = 'Choose an answer';
    receipt.hidden = true;
    state.textContent = 'Open';
    response.textContent = 'Choose an answer to back with an illustrative 15 REP bond.';
    delete scene.dataset.reported;
  };
  inputs.forEach(input => input.addEventListener('change', () => {
    selected = input.value;
    action.disabled = false;
    action.firstChild!.textContent = `Back ${selected} with 15 REP`;
    response.textContent = selected === 'Invalid'
      ? 'Choose Invalid when a question is malformed or cannot be resolved.'
      : `You chose ${selected}. Back your answer with REP to make a report.`;
  }, options));
  action.addEventListener('click', () => {
    if (!selected) return;
    action.hidden = true;
    receipt.hidden = false;
    receiptTitle.textContent = `${selected} · 15 REP behind it`;
    state.textContent = 'Reported';
    inputs.forEach(input => { input.disabled = true; });
    scene.dataset.reported = '';
    response.textContent = `Example ${selected} report backed with 15 REP. If a different answer wins, your bond can be lost.`;
    resetButton.focus({ preventScroll: true });
    animate(receipt, [{ opacity: .4, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 500, easing: 'cubic-bezier(.16,1,.3,1)' });
    scene.querySelectorAll('.rep-stack i').forEach((token, index) => animate(token,
      [{ transform: 'translateY(0)' }, { transform: 'translateY(-8px)', offset: .4 }, { transform: 'translateY(0)' }],
      { duration: 450, delay: index * 65, easing: 'cubic-bezier(.16,1,.3,1)' }));
  }, options);
  resetButton.addEventListener('click', () => {
    resetReport();
    inputs[0]?.focus({ preventScroll: true });
  }, options);
  resetReport();

  scene.addEventListener('pointerenter', () => { bounds = scene.getBoundingClientRect(); }, options);
  scene.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reduced.matches || !fine.matches || scene.contains(document.activeElement)) return;
    bounds ??= scene.getBoundingClientRect();
    x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
    y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0; scene.dataset.tracking = '';
      scene.style.setProperty('--pointer-x', x.toFixed(3)); scene.style.setProperty('--pointer-y', y.toFixed(3));
    });
  }, { ...options, passive: true });
  scene.addEventListener('pointerleave', resetPointer, options);
  scene.addEventListener('focusin', () => { resetPointer(); stopMotion(); }, options);
  scene.addEventListener('pointerdown', () => { resetPointer(); stopMotion(); }, options);
  const invalidatePointer = () => { bounds = undefined; resetPointer(); };
  window.addEventListener('resize', invalidatePointer, options);
  window.addEventListener('scroll', invalidatePointer, { ...options, passive: true });
  reduced.addEventListener('change', () => { if (reduced.matches) { resetPointer(); stopMotion(); } }, options);
  document.addEventListener('visibilitychange', () => { if (document.hidden) { resetPointer(); stopMotion(); } }, options);
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) { resetPointer(); stopMotion(); }
  }) : undefined;
  observer?.observe(scene);
  window.addEventListener('pagehide', event => {
    resetPointer(); stopMotion(); observer?.disconnect();
    if (!event.persisted) lifecycle.abort();
  }, options);
  window.addEventListener('pageshow', event => { if (event.persisted) observer?.observe(scene); }, options);
}
