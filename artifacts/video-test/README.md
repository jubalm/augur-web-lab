# Video test: a full-screen hero video (22 Oct 2026)

Research and plan for a Higgsfield hero: a looping video that fills the first screen of `/2/` behind the
hero copy, as many sites do. On 22 Oct 2026 the owner had the MiniMax loop (round 1) put on `/2/` only,
from 1024 px, then rejected it ("This hero sucks BAD") and asked for a text-only generation. Round 2's
Seedance 2.5 "voxel tide" replaced it the same day; the owner found it soft ("looks 420p") and generic,
and round 3's Gemini "resolution" loop replaced it in turn. The owner then asked for scattered grey
squares becoming one Green square, and round 4's "aggregation" loop is what `/2/` plays now. Current state:
`docs/decisions.md`, "Hero video, on /2/", and `docs/hero-video-provenance.json`.

## Round 4: aggregation, from a key frame (22 Oct 2026)

**What the owner asked.** "Aggregating scattered information into truth? like several points or scattered
squares becoming a single square … gray becoming green … no cuts. super high res. smooth. clean. matching
theme."

**The idea.** One Green square of 8 × 8 tiles is the answer. Its tiles come apart and fade to grey as they
spread, the separate reports, then glide back and turn Green as they lock in. The poster is the whole
square, so visitors without motion see the answer.

**Why a key frame this time.** A video model given the same image as first and last frame has to return
to it, so the loop closes with no cut and no crossfade over moving tiles. Round 1 failed with a key frame
because the frame was flat vector art; this one is a 3D render, which the models extend well.
- Nano Banana Pro drew the square at 4K (4 credits each, two drawn; the second, cleaner one used). It came
  out exactly 8 × 8 but purple-navy, pale green and too big.
- In the sandbox a two-point colour map moved its background to Navy (14, 14, 33) and its tiles to Green
  (42, 231, 168), and the square was scaled to 44% of the frame height, centred at 70% of the width, on a
  flat Navy 3840 × 2160 canvas.
- Seedream 4.5 (1 credit each) drew 5 × 5 squares, one too blue and one with "PFEMIUM #0E0E21" rendered
  into it.

**Three takes**, 4K, 10 s, 16:9. Sharpness and luma as in round 3; "first/last" is the mean difference
between the first and last frame before any processing.

| Take | Sharpness at 1920 | Left / right luma | First/last | Verdict |
| --- | --- | --- | --- | --- |
| Gemini Omni Flash 1.1, image to video, key frame first and last (90 credits) | 209 | 17.6 / 42.0 | 1.3 | **Picked.** The square loosens, its tiles tilt and fade to grey into a wide field, regather into a grey square and turn Green in a wave. Smooth, crisp, no cuts |
| Kling 3.0, same frames (60) | not measured | 14.0 / 32.5 | 0.4 | No: the tiles only loosen in place into a sparse grid; nothing scatters, so the many-into-one idea is lost |
| Gemini, text to video, steady stream of grey tiles into a Green square (90) | 165 | 20.5 / 58.7 | 20.7 | No: a 4 × 4 square, a busy grey field, and the loop would need a crossfade over moving tiles |

Higgsfield jobs, in table order: `a7186252-d0e9-4054-bb5f-568b0d1e038a`,
`8c5590f1-c42d-4320-bbd0-a190cdb4fcd1`, `650999f8-23b1-4ad5-b93e-e364e5dd5080`. Contact sheets, in the same
order: `review/round4-sheets.jpg`; the finished loop: `review/round4-master-sheet.jpg`. A scene-cut scan
of the stream take found no cut (largest frame-to-frame score 0.015).

**Finished** (`master.py` and `build.sh` in the sandbox; settings in `docs/hero-video-provenance.json`):
- one Python pass from the 4K take: BT.709 decode at 2560 × 1440, the darkest tone to Navy, green pixels
  to the brand Green weighted by how green they are (a plain colour map tinted the grey tiles green), and
  near-Navy pixels flattened to exact Navy;
- the first 0.5 s crossfaded into the last 0.5 s, both on the resting square: 228 frames, 9.5 s, seam 0.7;
- 10-bit AV1 and H.264 at 1440p (1.91 and 3.56 MB) and 1080p (1.30 and 2.34 MB), WebP posters of 13 and
  21 KB. Sharpness 200 at 1920 wide for the 1440p AV1 file.

**What went wrong on the way.**
- ffmpeg's `xfade` hung at the start of the crossfade twice, with a split-and-trim graph and with two
  inputs of the same file, both times at the same byte. The crossfade moved into the Python pass.
- The first encodes (8-bit AV1 at CRF 37) showed faint blocks in the Navy around the square's glow at 1440
  and 1024. The take's Navy carries mottling 1–3 levels deep; compression turned it into blocks. Flattening
  the Navy and encoding AV1 in 10 bits removed them: the background now has zero variance, and boosted
  seven times in contrast it shows no blocks. Flat Navy also cut the near-lossless master from 53 to 20 MB.
- An encoder sweep against the master: AV1 CRF 36 matched H.264 CRF 22 on SSIM (0.9961) at 1.79 MB against
  4.93 MB. H.264 CRF 24 (0.9956) cut it to 3.74 MB with no difference visible at 1:1.

**On the page** (`review/round4-page-*.jpg`):
- the scattered tiles reach left of the square, towards the copy. One Navy gradient over the layer's left
  27%, clearing by 45%, keeps the copy on plain Navy at 1024, 1280, 1440 and 1920 wide;
- on heroes taller than 56vw the layer now stops at that height and centres, so at 1024 × 768 and on
  portrait tablets the cover crop no longer zooms the square into the copy;
- the player picks 1440p by the video layer's height, not the hero's.

Round 4 spent 250 credits: stills 10, Gemini 180, Kling 60. About 97 credits remain.

## Round 3: sharp and about resolution (22 Oct 2026)

**What the owner asked.** "More high-res, this one looks 420p. It looks extremely generic … we're
handling resolution … we gotta have abstract stuff." Two fixes followed:
- **Sharper.** Only models that render at 2K or 4K, prompts that ask for crisp edges with no fog, haze,
  depth of field or motion blur, and a 1440p file for screens that need it.
- **About Augur.** Three concepts that picture what the oracle does, still abstract:
  - **resolution:** a restless cloud of cubes, many opinions, is swept by a mint scan line and locks into
    one square, the answer;
  - **fork:** a stream of cubes splits, the grey branch dissolves and the mint one flows on, the fork that
    leaves a lie behind;
  - **escalation:** two towers take turns doubling until the grey one crumbles, lying costing more than
    it pays.

**Sharpness is now a number.** `sharp.py` (in the Higgsfield sandbox) takes three frames per take,
scales them to 1920 and 2560 wide, the sizes the page shows on 1× and 2× screens, and reports the
variance of the Laplacian: higher is crisper. Round 2's voxel tide scores **49** at 1920 and 30 at 2560.

**Six takes**, all text to video, 16:9, no audio. Left and right luma and the seam are as in round 2.

| Take | Source | Sharpness at 1920 | Left / right luma | Seam | Verdict |
| --- | --- | --- | --- | --- | --- |
| Gemini Omni Flash 1.1, resolution (4K, 8 s, 72 credits) | 3840 × 2160 | 228 | 17.2 / 88.9 | 24.2 | **Picked.** The story reads at a glance: noise, a scan, a crisp answer square with a mint edge glow. Clean Navy behind the copy |
| Kling 3.0, resolution (4K, 10 s, 60) | 3840 × 2160 | 208 | 34.3 / 132.6 | 19.1 | No: a glaring white wall, a grey-blue background and a laser line across the headline |
| MiniMax H3, resolution (2K, 10 s, 20) | 2560 × 1440 | 220 | 41.3 / 68.5 | 57.6 | No: a blank white square that jumps around the frame, unloopable |
| Kling 3.0, fork (4K, 10 s, 60) | 3840 × 2160 | 267 | not measured | not measured | No: a heavy textured wall that fills two-thirds of the frame |
| MiniMax H3, fork (2K, 10 s, 20) | 2560 × 1440 | 79 | 7.3 / 78.8 | 24.3 | No: a chunky X of oversized cubes |
| MiniMax H3, escalation (2K, 10 s, 20) | 2560 × 1440 | 73 | 6.0 / 33.4 | 2.8 | Runner-up: clean and loopable, but small in the frame and close to a bar chart |

Higgsfield jobs, in table order: `88731eea-5f98-4a21-b46b-8eedc0b8a610`,
`7286e31c-1a10-4158-b851-cd2da9d6db3d`, `dd17f41c-3248-4cfd-a3ca-faa85213b291`,
`4f43c0c0-16a1-479c-a492-2be4b2ab60f6`, `519559b1-2ef1-481d-8edf-745d7abfd69a`,
`48486c95-c09f-4260-90e8-e59d7cb5c2ec`. Sharpness alone doesn't pick: Kling's fork is the crispest and
still the wrong picture.

**Finished** (`build.sh` in the sandbox; settings in `docs/hero-video-provenance.json`):
- a 2560 × 1440 master from the 4K source, with levels from the darkest tone (10, 15, 25) to Navy and
  white kept at white;
- a 1 s crossfade from the tail into the head, then the loop rotated by 4 s so it opens on the glowing
  square, which becomes the poster. The seam measures 0.7, invisible;
- AV1 and H.264 at 2560 × 1440 (1.29 and 2.84 MB) and 1920 × 1080 (0.89 and 1.78 MB), 7.0 s, plus WebP
  posters (22 and 34 KB). The 1440p AV1 file scores 206 at 1920 wide, four times round 2.

**Delivery.** `hero-video-v2.js` picks the 1440p loop when the hero is more than about 1150 device pixels
tall (2× laptops, 1440p monitors), else 1080p; the poster `<picture>` offers both widths. The layer is now
anchored right (`object-position: 90% 50%`) with a shorter left fade, since the cloud no longer needs the
round 2 haze gradient.

**On the page** (`review/round3-page-*.jpg`):
- at 1440 the cloud and the square sit from about 797 px to 1288 px, clear of the copy, which ends near
  716 px (`round3-page-1440-glow.jpg`, `round3-page-1440-cloud.jpg`); 1920 is as clear;
- at 1024 the cloud reaches the copy column's edge, so under 1200 px the Navy fade holds longer;
- without JavaScript only the resolved square shows (`round3-page-1440-nojs.jpg`).

Round 3 spent 252 credits: 72 Gemini, 120 Kling, 60 MiniMax. 347 credits remain. The escalation take and
round 2's unfinished consensus draft are the fallbacks.

## Round 2: text-only (22 Oct 2026)

**Why round 1 failed.** Feeding the model a flat vector keyframe made it copy pixel art, which video
models do worst. The result was a faithful but lifeless particle spiral. Without an input image the model
does what it does best (depth, light, physical motion), and the brand comes through the palette and the
square language (squares become cubes) instead.

**Four concepts as Seedance 2.5 drafts** (text to video, 480p draft, 10 s, high bitrate, no audio,
30 credits each), plus the two likeliest on Kling 3.0 pro at 1080p (17.5 credits each) as a cheap second
opinion. Left and right luma are mean brightness (0–255) over the frame's left 40% and right half; the
seam is the mean difference between first and last frame.

| Take | Left luma | Right luma | Loop seam | Verdict |
| --- | --- | --- | --- | --- |
| Seedance, voxel tide: a dark sea of cubes, mint clusters light up and fade | 13.8 | 42.9 | 7.7 | **Picked.** Moody, real depth, on brand, locked camera so it loops |
| Seedance, cube murmuration | 14.6 | 59.5 | 41.4 | No: cubes render as pebbles, big blurry blocks fly past the lens, unloopable |
| Seedance, consensus: glass cubes settle into one grid, a mint band sweeps it | 7.8 | 43.1 | 20.9 | Runner-up: the clearest story, but reads like a 3D interface and loops less cleanly |
| Seedance, signal wall: light lines converge on one tile | 14.2 | 38.2 | 7.0 | No: blotchy lighting, a white flare where the lines meet |
| Kling 3.0, voxel tide | 39.4 | 82.4 | 21.3 | No: grey-blue, over-lit, its mint cubes pile up and never fade |
| Kling 3.0, murmuration | 42.1 | 127.2 | 34.0 | No: a dense white vortex, too bright behind the copy |

Contact sheets: `review/round2-sheet-*.jpg`. The consensus draft can still be finished at 1080p within
seven days of 22 Oct (Higgsfield job `06e90756-222c-4302-871e-7b0e1aae6901`, 160 credits).

**Finished:** the voxel tide draft at 1080p (160 credits; finishing a draft costs as much as a fresh
1080p take). The prompt is in `docs/hero-video-provenance.json`. In the sandbox:
- levels lifted the darkest tone from (3, 4, 18) to (10, 10, 26), towards Navy, with white kept at white;
- a 0.8 s crossfade closes the loop;
- the loop was rotated to start at 4.8 s on the big lit cluster, so the poster (first paint, and all that
  no-JavaScript and reduced-motion visitors see) carries the mint accent; the seam then measures 2.2–2.6,
  about one frame while the cluster lights;
- AV1 0.76 MB, H.264 1.66 MB, WebP poster 55 KB, at 1920 × 1080, 9.25 s.

**On the page** (`round2-page-*.jpg`): the scene sits on the hero's right 70% (from 30% in), so the copy
keeps plain Navy. A Navy gradient fades its left edge, a lighter one from the top tames the horizon haze,
and opacity is 90%. At 1440 the big mint cluster at 4.8 s lights up clear of the body copy; at 1024 the
small one at 1.5 s sits beside it.

Round 2 spent 315 credits: drafts 120, Kling 35, final 160. 599 credits remain.

## Round 1 (superseded)

## Verdict

The advice of 22 October (`docs/decisions.md`, "Why not an AI image or video") still holds as the default:
the coded lituus flock is lighter, answers the pointer and stays inside the motion rules. If the owner
wants a cinematic first screen anyway, the version below is the one that makes sense. It answers the four
objections recorded then:

| Objection (22 Oct) | Answer in this plan |
| --- | --- |
| AI heroes all look alike | Stay in Augur's own language: flat squares on Navy, the lituus curl, no glow, no 3D, no lens effects |
| Photo-real fights the brand | Nothing photo-real; flat squares only |
| Megabytes on the first screen | The poster frame paints first; the video loads after the page, desktop only, with a size budget |
| An oracle opening on a synthetic picture | Abstract motion design, not footage of anything real |

It still needs the owner's exception to two rules (see "Rules to change").

## Generated (22 Oct 2026)

Made through the Higgsfield "higgs" connector, which generates, uploads, waits on jobs and runs a cloud
sandbox with ffmpeg. Account: Plus, 1,044 credits before, 914 after (130 spent). Higgsfield first offered
its "Blue Depth" preset instead of running the jobs; it was declined, since a preset replaces the look.

All three used `hero-keyframe-16x9.png` as start and end frame, 16:9, 10 s, no audio, and the prompt below.

| | MiniMax H3 | FLUX 3 Video | Seedance 2.5 |
| --- | --- | --- | --- |
| Setting, cost | 2K, 20 credits | 1080p, 80 credits | 480p draft, high bitrate, 30 credits |
| File as delivered | H.264, 2560 × 1440, 3.9 MB | H.264, 1920 × 1088, 6.7 MB | HEVC 10-bit, 854 × 480 |
| Background, decoded as a browser does (Navy is 14, 14, 33) | 9, 10, 27, steady | 5, 10, 32, drifting to 28 blue | 11, 12, 30, steady |
| Loop seam, first vs last frame (mean difference, 0–255) | 2.7 | 2.3 | 1.9 |
| Motion | strongest; clusters stay coherent along the spiral | calmest; crisp squares | lively; squares smear at 480p |
| Faults | slight motion blur on fast squares | greens turn teal; brightness breathes | draft resolution only |

Seedance 2.5 first failed with "Out of credits" although 944 credits remained, and Higgsfield switched its
mode to `omni_reference` because the frames were passed as media; it ran on a second try with the mode set.
Its HEVC output does not play in headless Edge, nor in Firefox or many Chrome setups, so any winner is
re-encoded.

**Pick: MiniMax H3.** It is sharp from its 2K source, holds Navy steadily (a fixed offset that one level
correction removes), loops cleanly and cost the least. FLUX is crisper up close, but its background drifts,
its greens shift and it puts more squares behind the copy.

Web encodes, made in the Higgsfield sandbox (BT.709 decode, per-channel levels that lift the background to
Navy while keeping white at white, a 0.6 s crossfade from the tail into the head, 1920 × 1080, no audio,
BT.709 tags, `+faststart`), and stored in the Higgsfield media library:

| File | Size | Background after | Seam after | Media id |
| --- | --- | --- | --- | --- |
| MiniMax, H.264 (CRF 23, `-tune animation`) | 1.94 MB | 15, 16, 31 | 1.7 | `55293568-3f09-4d77-a94f-a4c41f76503f` |
| MiniMax, AV1 (SVT-AV1 CRF 38) | 0.83 MB | 15, 16, 31 | 1.8 | `9b6ed22c-44c9-4d58-a1a6-964e523c619a` |
| MiniMax poster, WebP | 41 KB | | | `a5ef39f2-ad13-4ee1-86fc-f2db2bfc6d37` |
| FLUX, H.264 | 1.68 MB | 11–13, 15–16, 28–30 | 0.9 | `7c7845df-fb3a-4e69-9204-0d86d8ad4a5a` |
| FLUX, AV1 | 0.79 MB | 13, 15, 28–30 | 0.9 | `c0ea53ae-d870-42db-ad3f-4c2ee1e7a20e` |
| FLUX poster, WebP | 57 KB | | | `8d0dfe9d-d779-4757-9199-a15da49c691b` |

A seam of 1.7 is about one frame's ordinary motion, so the loop shows no jump. 8-bit video lands Navy only
within about two levels per channel.

Checked on the real `/2/` page at 1440 × 900, the video placed behind the copy with `object-fit: cover;
object-position: 74% 50%` and the coded flock hidden (`tools/page-video.ts`): `review/page-1440-minimax.jpg`,
`review/page-1440-minimax-60.jpg` (at 60% opacity, the calmest) and `review/page-1440-flux.jpg`. Contact
sheets of nine frames each are in `review/sheet-*.jpg`. No visible edge between video and page at 1440;
the wired-in version was then checked at every width (`docs/decisions.md`, “Hero video, on /2/”).

## What the research says

**Higgsfield**
- The Higgsfield connector reads the account only; videos are made on higgsfield.ai, where the Generate
  button shows the exact cost.
- Account, later on 22 Oct: Plus plan, 1,044 credits, no generations yet. Plus opens Seedance 2.5 and
  Seedance 2.0 in standard mode (up to 4K), which Starter lacked (Blotato, verified 19 Aug 2026; Novoads;
  the connector's model card for Seedance 2.0).
- Costs per Higgsfield's comparison of 20 Oct 2026: Kling 3.0 10 credits per 5 s at 720p, 25 per 10 s at
  1080p; Wan 3.0 35 per 10 s at 1080p; Veo 3.1 80 per 8 s at 1080p (Lite 16); Seedance 2.5 70 per 10 s at
  720p (72 per 8 s at 1080p in Higgsfield's credits guide); Cinema Studio 4.0 16 per second at 1080p.
  FLUX 3 Video: 5.5 credits per second at 720p and 9 at 1080p (Higgsfield's FLUX 3 page). Check the
  button: sources disagree and prices move.
- Seedance 2.5 vs Kling 4.0, early community tests (October 2026): Seedance 2.5 gives the more stable
  output, Kling 4.0 the stronger motion. In one test Seedance 2.5 hid a hard continuous move behind a cut
  inside the clip, and Kling 4.0 warped space. No one has published loop or motion-graphics tests.
- FLUX 3 Video: start and end frames, 5–20 s, style set by the prompt (animation looks included); in Black
  Forest Labs' own rating it ties Seedance 2.0 (52%). Early access.
- Plan on 3 to 5 generations per usable clip (Higgsfield).
- Loops: give the same image as start and end frame (Higgsfield's Kling start/end frames guide). Keep the
  camera and light still, and watch several repeats before approving (Magic Hour).
- One clear camera move reads better than stacked moves (Higgsfield). For a background loop, none.

**Hero video on the web**
- The poster or the headline should be the Largest Contentful Paint, not the video. For a `<video>`,
  Chrome counts the poster load or the first frame, whichever comes first (web.dev; Chromium LCP
  changelog, Aug 2023).
- `muted autoplay loop playsinline`, or iOS Safari refuses to autoplay. No audio track.
- Size targets in practice: poster under about 150 KB; video about 2 MB on phones and 4 MB on desktop at
  most, with `+faststart` and CRF 23–28 for H.264. These are practitioners' numbers, not a standard.
- WCAG 2.2.2 Pause, Stop, Hide (Level A): motion that starts by itself, lasts more than 5 seconds and sits
  beside other content needs a way to pause it. A looping hero video needs a pause button.
- Typical hero loops are 6 to 12 s of subtle motion.
- Video colours can shift against CSS colours between browsers (colour management), so hard edges
  between video and a CSS Navy can show. Fade the edges into Navy and check Chrome, Safari and Firefox.

## The concept: the flock at full scale

The `/2/` hero's idea, given the whole first screen: many independent reports, one answer no one controls.

- The whole hero is one flat Navy field with the site's faint square grid (the heritage field).
- A field of free-floating squares fills the whole frame (owner, 22 Oct 2026: the spiral alone was too
  thin, "not a background filler like squares"). Mixed sizes, bigger ones brighter as if nearer, sparse
  on the left and richer on the right. In motion it drifts slowly towards the spiral, as if every report
  is drawn to the answer. The owner may run the video at reduced opacity, so the field is a little
  stronger than the site's faint grid.
- The left half stays calm for the headline, as it is now (copy column x 96–716 at 1440).
- On the right, a murmuration of Augur squares streams down from the top edge and winds along the lituus
  spiral into the dashed Green answer square, at about 74% across and 50% down the hero, where it is today.
- What a video adds that the coded version can't under the motion rules: many more squares, three
  depth layers (far ones small, dim and slow; near ones larger, brighter and faster, all sharp), and
  murmuration waves that tighten and loosen the flock.
- Not doing: real birds, sky or any photo-real scene; glow, bloom, blur or light rays; a moving camera.

## Model and settings

Updated for the Plus plan (22 Oct 2026). A calm, locked loop needs stability more than dramatic
motion, and it needs the last frame to land on the first.

**Main: Seedance 2.5.**
- The most stable output in early tests.
- Pins a start and an end frame.
- Up to 30 s, with a "high" bitrate option that gives a cleaner source for our own compression.
- A 480p draft mode whose take can be finished at 1080p within seven days, so motion is judged cheaply
  and only the winning take is paid for at full size.
- Its known fault, cutting inside a clip, is what the prompt's "one continuous shot" line is for.

**Challenger: FLUX 3 Video.**
- Pins a start and an end frame, runs 5–20 s, and sets animation styles from the prompt.
- Offers 2K and 4K, which matter on 2× screens.
- 9 credits a second at 1080p.

**Cheap third opinion: Kling 3.0** at 720p, about 20 credits for 10 s.

All three take the same keyframe as **start and end frame** (the frame slots, not "references", which would
only inspire the look), 16:9, 10 s, sound off, and the same prompt.

| Round | Seedance 2.5 | FLUX 3 Video | Kling 3.0 |
| --- | --- | --- | --- |
| 1. Drafts: judge motion, calm and the loop | Draft (480p), bitrate high | 720p | std (720p) |
| Cost, roughly | check the button | 55 | 20 |
| 2. Final for the winner only | Finish the draft at 1080p | 2K if offered, else 1080p | pro (1080p) |
| Cost, roughly | about 90 | 90 at 1080p | 25 |

A draft at 480p or 720p shows motion, composition and the loop; it can't show whether 3 px squares stay
sharp, so sharpness is judged on the final. With 3 to 5 tries per usable clip (Higgsfield), the whole test
should stay around 300 of the 1,044 credits.

Resolution: on a 1440-wide screen at 2× pixel density, a 1080p video is stretched 1.5×, which softens the
smallest squares. If the 1080p final looks soft there, the next step is a 2K FLUX 3 take, or Seedance 2.0 in
standard mode at 4K, encoded at 2560 × 1440 for 2× screens if the file stays within budget.

Held back:
- **Kling 4.0**: stronger motion than a calm loop wants, spatial warping in early tests, and no published
  costs; its timeline of up to 10 keyframes is worth a try only if all three fail.
- **Wan 3.0**: first and last frame and a "thinking" mode for prompt adherence, about 35 credits per 10 s;
  the fallback after Kling 4.0.
- **Cinema Studio 4.0, Veo 3.1**: tuned for photo-real film; Veo 3.1's full model takes no end frame, so no
  clean loop.
- **Seedance 2.0 Fast**: 720p only.

## Keyframe

`hero-keyframe-16x9.png`, 1920 × 1080 (built 22 Oct 2026). It is the hero at 1440 × 810 CSS px rendered at
1.333×, so the video shows at the page's own scale at 1440: 764 px of hero plus the 23 px that a 16:9
cover crop trims above and below. Headless Edge composed it on `/2/` with JavaScript off, from the real
flock element, so squares, glyphs and colours are exact (`tools/`, settings in `keyframe-config.json`):

- the heritage field across the whole frame on the page's 40 px grid (3 px squares, 22% of cells, 18%
  Green, Paper 5–12% and Green 12–26% opacity); it meets the page grid exactly at 1440 only;
- the square field ("dust"): one square at most per 26 px cell, placed off the grid, in soft noise
  patches; up to 62% of cells on the right and 16% on the left (ramp x 380–1050); sizes 2–9 px, the
  bigger rarer and brighter (24–80% opacity, halved on the left); 10% Green, 35% Pewter, the rest
  Paper; cleared within 110 px of the answer square;
- one pole for all layers at (1040, 405) CSS px, about 72% across and 50% down;
- main flock: the `/2/` flock at 1.3×, with the dashed answer square; its tail runs up the right side
  and off the top edge;
- far flock: the flock at 0.75×, turned 40°, 55% opacity, recoloured to Mist and Pewter;
- no text; far clusters left of x 820 are removed.

The first version (22 Oct, superseded the same day) had no square field and a sparse near layer of
large clusters instead.

The same frame becomes the video's poster, so the swap from still to motion is invisible.

`hero-keyframe-preview-1440.png` shows it under the real `/2/` copy, cropped as `object-fit: cover;
object-position: 74% 50%` would crop it; `hero-keyframe-preview-1440-60.png` shows it at 60% opacity.
The first version was checked at every width below; the square field adds little near the copy, so the
limits hold:

| Viewport | Gap between copy and flock | Verdict |
| --- | --- | --- |
| 1920 × 1080 | about 125 px | clear |
| 1440 × 900 | about 95 px | clear |
| 1280 × 720 | about 85 px | clear |
| 1024 × 768 | about 45 px | clear, the tightest |
| 768 × 1024 | flock behind the body copy | no |
| 390 × 844 | flock behind the body copy | no |

## Prompt (all three models)

```text
Full-screen looping background video for the first screen of a website; a headline sits on top in HTML, so the left half stays quiet. 16:9, seamless 10-second loop, silent, one continuous shot with no cuts or transitions, locked-off camera with no zoom, pan or rotation.

The field: one flat, uniform deep navy background (#0E0E21) edge to edge, filled with a calm field of small flat squares of mixed sizes, mostly tiny, a few larger and brighter as if nearer, in near-white, soft lilac grey and a little mint green (#2AE7A8). It is sparse on the left and richer on the right. Every square drifts slowly and steadily towards the spiral on the right, as if gently drawn in; the larger, nearer ones move a little faster, giving soft parallax. A few twinkle, brightening and dimming slowly.

The spiral: on the right, the drift feeds one curling stream. Small clusters of crisp square tiles stream down from the top edge and wind clockwise into a single dashed mint green square right of centre, like a flock with no leader; each cluster turns to follow the curve, shrinks as it arrives and vanishes inside the dashed square, which breathes softly. A fainter, smaller spiral turns behind it. New squares keep arriving, so the field and the stream never empty.

Style: flat 2D motion design, minimal, calm and precise; every square stays sharp and square. No glow, bloom, lens flare, blur, depth of field, gradients, light rays, 3D objects, text or logos. The last frame matches the first exactly.
```

## Putting it on the page (`/2/` only, if it passes)

- A `<video>` behind the hero copy, `object-fit: cover`, `object-position: 74% 50%`,
  `muted loop playsinline`, with the keyframe as `poster` (AVIF or WebP, under 100 KB).
- A few lines of script set the source after the page's `load` event, so the headline, fonts and poster
  win the first paint. With JavaScript off the video never loads and the poster is the final state, as the
  site rules ask.
- Sources: AV1 with an H.264 MP4 fallback, `+faststart`, no audio track. 1920 × 1080 for wide screens and
  1280 × 720 up to 1280 px; budget about 3 MB and 1.5 MB. Many small moving squares are the hardest thing
  to compress, so the real size is the test's first number.
- A square pause button at the hero's bottom right, labelled "Pause background animation" (WCAG 2.2.2).
- Reduced motion, `Save-Data`, print and forced colours show the poster only.
- Pause when the hero leaves the screen or the tab is hidden, as every ongoing scene does now.
- Top and bottom edges fade into Navy through a static CSS mask, so no seam shows against the header or
  the answer band.
- Below 1024 px wide, keep the coded flock: at 768 × 1024 and 390 × 844 the cover crop puts the flock
  behind the body copy, poster included. A 9:16 render (all three models support it) would need its own composition
  with the flock below the copy, and only if the desktop video is adopted.
- What is lost: the coded hero's pointer lens and tap ripple. A ripple could stay as an HTML layer on top.

## Judging

Side by side with the coded flock at 1440, 1280 and 1024:

1. Colours hold: Navy, Paper, Mist, Pewter and Green, with no shift, banding or seams.
2. Squares stay square and sharp; nothing smears into dots or streaks.
3. The left half stays calm enough for the headline.
4. The stream flows into the answer square, and the loop has no visible seam over several repeats.
5. The faint field survives and stays still.
6. Encoded size against the budget above.

## Rules to change if adopted

- AGENTS.md "Motion and access": transform/opacity and SVG stroke draws only; looping scenes are one
  choreography shared with Figma. A video is neither, so it needs a recorded exception in
  `docs/decisions.md`. Figma would hold the keyframe, not the motion.
- `scripts/check-budgets.ts` covers CSS, JS and fonts only; add a media budget for the hero video.

## Earlier test (superseded)

`flock-start-frame-3x4.png` is the 3:4 frame of the hero art alone, from the first prompt of 22 Oct. The
full-screen plan above replaces it.

## Sources

- Higgsfield: [best AI video models, 20 Oct 2026](https://higgsfield.ai/blog/5-Best-AI-Video-Models-2026-Tested-Compared), [credits vs unlimited](https://higgsfield.ai/blog/credits-vs-unlimited-ai-video-generation), [Kling start and end frames](https://higgsfield.ai/blog/Kling-Start-End-Frames), [how to create on Higgsfield](https://higgsfield.ai/blog/AI-Video-Generator-How-to-Create-on-Higgsfield)
- Plans and access: [Blotato](https://www.blotato.com/blog/higgsfield-pricing), [Novoads](https://novoads.ai/en/blog/higgsfield-pricing)
- Models: [Higgsfield, FLUX 3 on Higgsfield](https://higgsfield.ai/blog/flux-3-higgsfield), [Black Forest Labs, FLUX 3 Video](https://bfl.ai/models/flux-3-video), [Pixverse, Kling 4.0 vs Seedance 2.5 (13 Oct 2026)](https://pixverse.ai/en/blog/kling-4-vs-seedance-2-5), [Atlas Cloud, Kling 4.0 Flash vs Seedance 2.5, keyframe test (10 Oct 2026)](https://www.atlascloud.ai/blog/tips/kling-4-flash-vs-seedance-2.5)
- Loops: [Magic Hour](https://magichour.ai/blog/how-to-make-seamless-ai-video-loops), [Segmind first and last frame models](https://www.segmind.com/models/all/first-and-last-frame-video-models)
- Web: [web.dev LCP](https://web.dev/articles/lcp), [Chromium LCP changelog, Aug 2023](https://chromium.googlesource.com/chromium/src/+/main/docs/speed/metrics_changelog/2023_08_lcp.md), [W3C Understanding 2.2.2](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide), [Mintec, video and LCP](https://mintec.co/blog/video-lcp-hero-performance-2026/), [Konadu, fast video hero](https://konadu.dev/video-hero-section-without-killing-lcp)
