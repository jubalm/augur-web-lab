// The /2/ hero's background loop (owner, 22 Oct 2026; motion-rule exception in docs/decisions.md; how it
// was made in artifacts/video-test/README.md). The markup is only the loop's poster, the first frame, which
// loads from 1024 px; below that the coded flock shows instead. Without JavaScript, with reduced motion and
// with Save-Data the poster is all there is. Otherwise, once the page has loaded, a <video> goes over the
// poster with the same poster, 10-bit AV1 first (it keeps the dark Navy free of blocks) and H.264 for
// browsers without it, so the swap is invisible. Like the other loops it plays while the hero is on
// screen and the tab is visible, pauses otherwise
// and resumes where it was. Print and forced colours hide it and show the flock (home-v2-only.css).
(() => {
const box = document.querySelector('[data-hero-video]');
const hero = box && box.closest('[data-home-hero]');
if (!hero || !('IntersectionObserver' in window)) return;
// Screens that draw the video layer with more than about 1150 device pixels of height (2x laptops, 1440p
// monitors) get the 2560 x 1440 loop; others the 1920 x 1080 one, which would look soft there.
const sharp = devicePixelRatio * box.getBoundingClientRect().height > 1150;
const sources = sharp
? [['/images/hero/augur-hero-loop-1440.av1.mp4', 'video/mp4; codecs="av01.0.12M.10"'], ['/images/hero/augur-hero-loop-1440.h264.mp4', 'video/mp4; codecs="avc1.640032"']]
: [['/images/hero/augur-hero-loop.av1.mp4', 'video/mp4; codecs="av01.0.08M.10"'], ['/images/hero/augur-hero-loop.h264.mp4', 'video/mp4; codecs="avc1.640032"']];
const wide = matchMedia('(min-width:1024px)');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const saveData = !!(navigator.connection && navigator.connection.saveData);
let video = null, visible = false, printing = false;

const allowed = () => wide.matches && !reduced.matches && !saveData && !printing;
const running = () => allowed() && visible && !document.hidden;
const load = () => {
video = document.createElement('video');
const still = box.querySelector('img');
video.muted = true; video.loop = true; video.playsInline = true; video.preload = 'auto'; video.poster = still ? still.currentSrc : '';
video.disablePictureInPicture = true;
['muted', 'playsinline', 'disableremoteplayback'].forEach(name => video.setAttribute(name, ''));
video.width = 1920; video.height = 1080;
sources.forEach(([src, type]) => {
const source = document.createElement('source');
source.src = src; source.type = type;
video.append(source);
});
box.append(video);
};
const sync = () => {
if (!allowed()) { if (video) video.pause(); return; }
if (!video) { if (document.readyState !== 'complete') return; load(); }
if (!running()) { video.pause(); return; }
const playing = video.play();
if (playing) playing.catch(() => {});
};

const observer = new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); sync(); });
observer.observe(hero);
addEventListener('load', sync);
document.addEventListener('visibilitychange', sync);
wide.addEventListener('change', sync);
reduced.addEventListener('change', sync);
addEventListener('beforeprint', () => { printing = true; sync(); });
addEventListener('afterprint', () => { printing = false; sync(); });
addEventListener('pageshow', event => { if (event.persisted) sync(); });
})();
