# Plan: share-ready by Monday 26 October 2026, 11:00 (GMT-3)

Written Sunday 25 October 2026 from the owner's list, then widened the same day to cover copy, motion, scrolling and the small stuff. All times are GMT-3.

- **Starting an item:** in a new chat, say "Read `docs/plan.md` and do item N."
- **Finishing an item:** tick its box when the owner accepts it.
- **Base commit:** `9ddb25b` on `main`. Nothing is pushed.
- **Scope (owner, 25 Oct):** all changes go to `/2/` and the inner pages it links to (D2, D3). Ignore `/`, `/1/`, `/3/` and `/4/` for now: don't edit or review them.
- **Phones and tablets last (owner, 25 Oct):** build and review at desktop widths only until item 25 (D9).

## Overview

The work runs in two lanes after item 1, so the homepage and the pages move at the same time. The owner reviews both lanes. Estimates include each item's section review (see "Section review" below).

**First, alone**
- [x] 1. Site chrome: header, phone menu, announcement bar, and `/2/`'s look on every inner page, plus the size-measuring script (1.25 h). **Closed by the owner on 25 Oct without being built:** inner pages still show v1's chrome, and `scripts/inspect-sizes.mjs` doesn't exist.

**Lane A: the homepage on `/2/`** (one chat at a time, in order)
- [x] 2. "The answer is nobody's call." closer: new UI (1 h)
- [ ] 3. "What can Augur Lituus power?": polish (1 h)
- [ ] 4. "Know what happened? Get paid to report it.": new UI (1.75 h)
- [ ] 5. "The road to Augur Lituus.": polish (1 h)
- [ ] 6. "Learn more about Augur.": polish, plus links on to the FAQ, blog and community (45 min)
- [ ] 7. "Talk to the Augur team." footer: new UI, plus a test of a big "AUGUR" visual (1.25 h)
- [ ] 24. Hero: test a different look for "decentralized" (45 min). It's numbered last so the other numbers don't shift.

**Lane B: pages** (in parallel with lane A)
- [ ] 8. Products (1 h)
- [ ] 9. About (1.5 h)
- [ ] 10. REP (1.5 h)
- [ ] 11. Talk to us (`/contact/`) (45 min)
- [ ] 26. More alive visuals: find the dead spots, test images, build the owner's picks (2 h). Numbered last so the other numbers don't shift.

**Polish passes** (after both lanes, across the whole site)
- [ ] 12. Copy pass (45 min)
- [ ] 13. Motion pass (45 min)
- [ ] 14. Scrolling, navigation and states (45 min)

**Last on Sunday: phones and tablets** (D9)
- [ ] 25. Mobile pass: every page below 1024 px (2 h)

**Monday morning**
- [ ] 15. Suggestions review against every Augus and Ryan note, old ones included, and the talk track (45 min)
- [ ] 16. QA before sharing, including meta, performance and real phones (1.75 h)
- [ ] 17. Share with the team (30 min)

**Stretch** (lane B continues here whenever it's ahead)
- [ ] 18. Augur Lituus page, new (1.5 h)
- [ ] 19. Learn, plus the guide reading page (1.5 h)
- [ ] 20. Blog, blog post and category pages (1.5 h)
- [ ] 21. FAQ (45 min)
- [ ] 22. Brand assets (45 min)
- [ ] 23. 404 (15 min)

### Schedule

| When | Lane A | Lane B |
| --- | --- | --- |
| Sun 11:30–12:45 | 1 (alone) | |
| Sun 12:45–18:30 | 2, 3, 4, 5, 6, 7, then 24 | 8, 9, 10, 11, 26, then stretch 18 |
| Sun 18:30–21:00 | 12, 13, 14 | Stretch 19, 20 |
| Sun 21:00–23:00 | 25 (mobile pass) | Stretch 21, 22, 23 |
| Mon 07:45–08:30 | 15 (starts 15 min earlier for the wider review) | |
| Mon 08:30–10:15 | 16 | |
| Mon 10:15–11:00 | 17, plus last fixes from 16 | |

- **Fit:** lane A (2–7 and 24) now adds up to about 7.5 h, more than its 12:45–18:30 slot, and item 25 takes what was the Sunday-night buffer. There's no slack left, so if lane A runs late, 12–14 and 25 slide toward Monday morning. Item 26 uses lane B's spare hour and pushes stretch 18 back by about another hour.
- **Cutting:** if the day slips, cut stretch items from the bottom up. Then shrink item 25, following its own fallback order. Never cut 12–16: a consistent, checked site beats more redesigned pages.

### What can run in parallel

- Item 1 goes first and alone. It sets up the chrome that every later item renders.
- **Lane A is sequential:** items 2–7 all touch `src/data/homepage-v2.ts`, `src/styles/home-v2-only.css` or the chrome. Item 24 belongs to lane A too, since it edits `Hero.astro` and `home-v2-only.css`.
- **Lane B items don't touch homepage files**, so they can run beside lane A, and beside each other in separate chats if the owner can review that fast.
  - Item 18 waits for 8.
  - Items 19 and 20 share one reading layout, so do them in one chat, or 19 first.
  - Item 26 runs in lane B after 11 and builds inner-page visuals itself. Its homepage visuals wait until lane A is done with that section, because lane A's chats are the only ones writing the homepage files.
- **Polish passes (12–14)** start only when both lanes are done, because they edit across all pages.
- **Item 25** starts after 12–14 and edits every page's phone layout. A stretch item that finishes after it gets its phone check in item 16.

## Decisions for these two days (owner)

- **D1. Homepage work stays on `/2/`.** `/`, `/1/`, `/3/` and `/4/` stay byte-identical. Gate markup with `ownerVersion(variant)` from `src/data/homepage-review.ts`. Put styles in `src/styles/home-v2-only.css`, which only `/2/` loads, via `src/components/home/review-inline.ts`. Copy goes in `src/data/homepage-v2.ts`. To prove the scope, build before and after and diff the two `dist` folders.
- **D2. Inner pages are redesigned in place.** There are no review copies of About, Products and the rest: every homepage version links to the same inner pages. The old versions stay in git.
- **D3. Inner pages get `/2/`'s chrome.** That means the Augur square-cut icons, the 128 px header logo, Menu/Close, the hide-on-scroll header and the new footer. Otherwise the header changes when someone clicks from `/2/` to About (consistency, Jakob's law). `/`, `/1/`, `/3/` and `/4/` keep the baseline chrome. Item 1 builds this.
- **D4. Suggestions are folded into each section as it's worked.** Each item names the notes that touch it. Every note counts, the old 18–19 Oct ones as well as the 21 Oct review (owner, 25 Oct); the appendix holds them all. Each section review checks its notes (step 6). Item 15 then reviews the whole of `/2/` against all of them and turns the result into a talk track for the meeting. Today's map:
  - `/2/`: Ryan's notes as Augus marked them, plus the owner's own suggestions.
  - `/3/`: Ryan's notes alone, literal.
  - `/4/`: Augus's marks alone, literal.
- **D5. The blog keeps its six stand-in posts for tomorrow.** They are flagged `needsReview`. Migrating the real archive is a launch item.
- **D6. The Augur Lituus page, if built, lives at `/products/augur-lituus/`.** The header's "Explore Augur Lituus" card then points to it.
- **D7. The version switch stays for the share.** It sits on `/` and `/1/`–`/4/`, so the team can compare the versions.
- **D8. Nothing is deployed or pushed without the owner's word.** Item 17 is where that call gets made.
- **D9. Phones and tablets come last (owner, 25 Oct).** Until item 25, build and review at desktop sizes only: 1440, 1280 and 1024 wide, plus 1440 × 900 and 1366 × 768.
  - Skip everything below 1024 px: 768, 390, 360 and 320 wide, landscape phones, phone screenshots and the phone rows of the size and spacing standards.
  - When an item asks for phone work (a phone layout, a check at 390 or 360), it moves to item 25. D9 wins over the item's own text.
  - Don't fix phone layouts along the way, and don't delete the phone CSS that's already there, even where it looks off.

## Rules every chat follows

**Setup**
- **Repo:** `C:\Users\edu45\OneDrive\Documentos\augur-web-lab` (git, `main`). Edit there, and commit there when the owner asks.
- **Build mirror:** `C:\Users\edu45\Documents\augur-web-lab`. It isn't a git repo, and it exists because OneDrive breaks Bun builds. After editing, copy each changed file into the mirror with `cp`. The robocopy mirror sync is blocked in auto mode.
- **Dev server:** "augur-dev" (`.claude/launch.json` in the mirror) serves http://localhost:4321 from the mirror. If another chat holds 4321, build in the mirror and use "augur-build-preview" on :4330.
- **Check scripts in the build:** Astro's Content-Security-Policy is only emitted in built pages (`BaseLayout.astro` adds script hashes). A new or changed inline script can work on the dev server and be silently blocked in the build. Check every script change in the build preview (:4330) too.
- **Commits:** identity `-c user.name=melo -c user.email=246712447+melodrd@users.noreply.github.com`, with no co-author or "Generated with" lines. Never push unless asked. Record why a change was made in its commit message: there is no decisions log any more, so don't create one.

**Copy** (see `AGENTS.md` for the full rules)
- **Naming:** always "Augur Lituus" in full.
- **Audience:** write for traders and beginners first. Lines for builders carry a cue ("For builders", "Building on it?"). Never "your app" or "your call".
- **REP:** holding REP is never a duty to report or challenge. "Get paid" must not read as an investment pitch.
- **No promises:** "designed to", never guarantees. No invented partners, dates, metrics, addresses or readiness.
- **Sources:** mechanism facts come from the January 2026 Augur Lituus whitepaper (record sources in `docs/sources.md`). Keep proposed design, work in progress and deployed history distinct.
- **House style:** no em dashes, no rule-of-three lists, and avoid "X, not Y" constructions. Use curly apostrophes and quotes (’ “ ”).
- **Links:** ↗ only on off-site links, and every external URL lives in `src/data/links.ts`.

**UI and motion**
- **Brand and layout:** Navy, Paper text, Green actions with Navy labels. Square corners, no shadows, the 500 / 80 / 668 heading row at 1440, 1248 content width.
- **Motion:** transform and opacity only, with timings and easings from `src/motion/timelines.ts`, no ad-hoc values. Authored scenes play once per tab session (`src/motion/seen.ts`) and never replay on a reload or a back visit. They pause off-screen and in a hidden tab. No-JavaScript, reduced motion and print show the final frame. Never hide content behind animation.
- **Scrolling:** native scroll only, with no snap, settle or glide scripts.
- **Controls:** native details and disclosure buttons, one tabs controller, no ARIA menus. Forms have labels, autocomplete and associated errors.
- **Never hand-edit** `vendor/augur/**`, `scripts/design-system.ts`, `src/components/ui/*`, `src/lib/utils.ts`, `src/styles/augur.css` or `src/styles/augur-typography.css`.

### Size and spacing standards

Measure these; don't eyeball them. Every section review (step 4) and items 14, 16 and 25 check against this table. The rows about phones, and the phone viewports, wait for item 25 (D9). Where Augur's own rules are stricter, they win. If a file that can't be edited falls short (`augur.css`, `augur-typography.css`), record the gap in the commit message instead of overriding it.

| Check | Passes when | Source |
| --- | --- | --- |
| Tap targets | Every control is at least 24 × 24 px, or spaced so a 24 px circle centred on it touches no other target. | WCAG 2.2, 2.5.8 Target Size (Minimum), AA |
| Main actions on phones | At least 44 × 44 px. | WCAG 2.2, 2.5.5 Target Size (Enhanced); Apple Human Interface Guidelines (44 pt); Material Design 3 asks for 48 dp |
| Space between tap targets | At least 8 px between neighbouring targets on phones. | Material Design 3 (8 dp) |
| Gap values | Every gap sits on the 4 px scale of the Size variables (4, 8, 12, 16, 24, 32 in `augur.css`) or the section space (96, 72, 64, 32 in `home-v2.css`). No stray values like 18 or 30. | Augur Size & motion variables; Figma `28:7` |
| Grouping | Space inside a group is clearly smaller than space between groups, so things that belong together look together. | Law of proximity (lawsofux.com) |
| Line length | Body text runs 45 to 75 characters a line, about 66 at best, and never more than 80. | Robert Bringhurst, *The Elements of Typographic Style*; WCAG 1.4.8 (AAA) |
| Body text on phones | At least 16 px. Form fields at least 16 px too, or iOS Safari zooms in when they get focus. | Apple Human Interface Guidelines (17 pt body); iOS Safari behaviour |
| Line height | Body text at least 1.5. | WCAG 1.4.8 (AAA) |
| Text spacing | Nothing clips or overlaps with line height 1.5×, paragraph spacing 2×, letter spacing 0.12× and word spacing 0.16× the font size. | WCAG 1.4.12, AA |
| Reflow | At 320 px wide (1280 at 400% zoom), no horizontal scroll and nothing lost. | WCAG 1.4.10, AA |
| Text zoom | Text at 200% loses nothing. | WCAG 1.4.4, AA |
| Focus and the header | A focused element is never fully hidden under the header, the announcement bar or the version pill. | WCAG 2.2, 2.4.11 Focus Not Obscured (Minimum), AA |
| Contrast | Text 4.5:1. Large text and UI parts (borders, icons, the focus ring) 3:1. | WCAG 1.4.3 and 1.4.11, AA |
| First screen on phones | The hero's headline and main action show without scrolling at 390 × 844 and 360 × 640. | NN/g, "The Fold Manifesto: Why the Page Fold Still Matters" |
| Full-height blocks | They use `svh` or `dvh`, never a bare `100vh`, so the phone browser's bars don't cut them off. | CSS Values and Units Level 4; web.dev, "The large, small, and dynamic viewport units" |
| Sticky header | It stays slim and hides on scroll down. Check how much of a landscape phone (844 × 390) the announcement bar and header cover, and that they never sit over what the reader is on. | NN/g, "Sticky Headers: 5 Ways to Make Them Better" |
| Thumb reach | Main phone actions sit within easy reach of a thumb, not only in a top corner. | Fitts's law (lawsofux.com); Steven Hoober, "How Do Users Really Hold Mobile Devices?" (UXmatters, 2013) |

- **Viewports:** widths 1440, 1280, 1024, 768, 390, 360 and 320 (reflow). Heights: 1440 × 900 (the first-viewport rule), 1366 × 768 (a common laptop), 390 × 844, 360 × 640 and 844 × 390 (a phone in landscape). The section reviews and items 14 and 16 use this one list.
- **How to measure:** item 1 writes `scripts/inspect-sizes.mjs`, using headless Edge over CDP (the way section screenshots are taken) if Playwright won't launch. At every viewport it lists controls under 24 px or 44 px, neighbours closer than 8 px, text lines over 75 characters, gaps off the scale, and anything wider than the viewport. Every later item runs it and keeps the output with its review. Item 1 was closed on 25 Oct without it, so the script doesn't exist yet.

### Section review (every item runs this before calling it done)

1. **Copy:**
   - Read every string out loud. Is it true, sourced and plain for a beginner?
   - Does it match the house rules above?
   - Does it say the same fact the same way as other pages? Repeated facts come from one data file, never retyped.
   - Is draft copy still flagged?
2. **Motion:**
   - List everything that moves in the section.
   - For each one: does it play once or loop by rule? Does it skip replay on F5 and back? Does it pause off-screen? Does it settle under reduced motion?
   - Is it transform/opacity only, with no layout shift? Does it ever hide content?
   - New ongoing motion gets measured (main-thread ms per second).
3. **States:**
   - Hover, focus-visible, active, disabled and current for every control, with the same focus ring everywhere.
   - The pointer cursor only on controls.
   - Tap targets and the space between them pass the size and spacing standards.
4. **Size, spacing and layout:**
   - Run `scripts/inspect-sizes.mjs` at the desktop viewports (D9) and fix what it lists, or say why it stays.
   - No horizontal overflow at 1440, 1280 or 1024. Narrower widths wait for item 25.
   - Gaps sit on the scale, and gaps inside a group are smaller than gaps between groups.
   - Body text stays within 45 to 75 characters a line.
   - Short laptop screens (1366 × 768): nothing important is cut off by the viewport or covered by the header.
   - No empty blocks or ragged card feet.
   - No scroll jump when something opens, closes or switches.
   - Anchors land in view.
5. **Access:**
   - Heading order and landmarks.
   - Keyboard path, including no traps.
   - Contrast.
   - Forced colours, with borders where shapes rely on fills.
   - No-JavaScript shows everything.
6. **Suggestions:**
   - Check the section against every note in the appendix that touches it: Ryan's and Augus's 21 Oct notes, and the older 18–19 Oct ones too.
   - For each one, say whether it's applied, declined (with the reason) or still open. An open one joins the questions for Augus.
   - Check that later work hasn't quietly undone an older note, for example the page growing long again or the use-case examples losing their "this opens" cue.
   - Where a newer note replaces an older one (Augus's "Trustless" over his 18 Oct "keep trust out"), the newer one wins. Say so.
7. **Proof:**
   - `bun run check` passes.
   - The owner has seen it at 1440. The 390 view waits for item 25.
   - No console errors.
   - For homepage items, the dist diff shows only the expected pages changed.

## Items

### 1. Site chrome: header, phone menu, announcement bar, and `/2/`'s look on inner pages

- **Where:**
  - Header: `src/components/layout/SiteHeader.astro` and `src/components/home/header-v2.js`.
  - Announcement bar: `AnnouncementBar.astro` and `announcement-state.js`.
  - Icons: `src/components/primitives/Icon.astro`.
  - Version gates: `src/data/homepage-review.ts` (`ownerVersion`, `variantAt`).
  - Navigation: `src/data/navigation.ts`.
- **Now:**
  - Only `/2/` has the owner's chrome: square-cut icons, the 128 px header logo (a recorded brand exception), "Menu"/"Close" buttons, a header that hides on scroll down, and the Products lead card as one link.
  - Every inner page renders v1's chrome, because `variantAt()` returns v1 for any path that isn't a homepage version.
  - The announcement reads: "Augur is back. Restarted in 2025, forked in August 2026, building Augur Lituus now. Catch up →".
- **Goal:**
  - Add one helper, for example `ownerChrome(pathname)`, that is true on `/2/` and on every non-homepage path. `Icon`, `SiteHeader` and `SiteFooter` read it.
  - Then polish the header panels, the phone menu and the announcement bar.
  - Write `scripts/inspect-sizes.mjs` (see "Size and spacing standards") and run it on the chrome first: the header, the phone menu and the announcement bar at every standard viewport, landscape included.
- **Constraints:**
  - `/` must stay byte-identical, so the new chrome's CSS can't go into component `<style>` blocks, which reach `/`. Load it the way `review-inline.ts` loads the `/2/` sheet, from a sheet that only `/2/` and inner pages include. Scripts loaded this way need their CSP hashes; check them in the build.
  - Header panels stay native `details`, with no ARIA menu.
  - The phone menu dialog traps and returns focus.
- **Motion:**
  - The header hides with transform only. It doesn't hide at the top of the page, while focus is inside it, while a panel or the phone menu is open, or under reduced motion (it stays put there).
  - Panel and phone-menu open and close: either instant, or a short opacity/transform fade from `timelines.ts`.
  - Dismissing the announcement must not jump the page. Check how the header and hero move up when the bar goes.
- **Copy:**
  - Nav labels and the product taglines come from `products.ts`, one source.
  - The announcement is a three-part list (house rule) and needs a retirement date (launch checklist), so tighten it to one claim plus "Catch up →".
  - "Talk to us" is the same label in header, footer and pages.
- **Open, don't decide alone:** the menu says "Stratoblast" while the code and strategy say "Statoblast" (launch checklist).

### 2. "The answer is nobody's call." closer: new UI

- **Where:** the close of the Why Augur section (`#why-augur`) on `/2/`. Markup in `src/components/home/Tenets.astro` (the closer branch gated on `ownerVersion`), copy in `src/data/homepage-v2.ts` (the `why` closer, near line 58), styles in `src/styles/home-v2-only.css`.
- **Now:** this was rebuilt on 23 Oct.
  - The statement is an `h3` on its own row over a 1 px hairline, followed by two reader cells as a list.
  - **For traders:** "Seen a market settle the wrong way? / Here, anyone can challenge a wrong answer."
  - **For builders:** "A wrong answer can cost a platform its users. / Leave resolution to Augur Lituus."
  - One surface, no tint and no hover ring; it sits under the three isometric cards.
- **Goal:** make the closer land as the section's conclusion, the line people remember (serial position effect), not another row of cells. Try a stronger typographic moment, with the statement larger and the two readers clearly answering it. Leave the three cards above it alone.
- **Keep:**
  - The statement's words.
  - `h3` + list semantics, and no hover affordance on things that aren't controls.
  - A CanvasText border in forced colours.
  - Equal line counts in the two cells at every width, so neither has an empty foot.
- **Motion:**
  - The three diagrams above it loop all the time (owner rule), so the closer adds no motion of its own, or at most a once-per-session fade.
  - Check that the loops above pause when the section is off-screen.
- **Copy:**
  - The two readers are parallel: setup in Pewter, payoff in Paper, both opening on "A wrong answer" / "Seen a market…".
  - The traders' payoff says "can", because a challenge window closes (whitepaper §2.1, §4.1).
  - No "X, not Y".
- **Suggestions:**
  - Ryan 7: tell traders plainly that markets do misresolve.
  - Ryan 8 and Augus 1: builders get less liability first, less work second.

### 3. "What can Augur Lituus power?": polish

- **Where:** `src/components/home/Applications.astro`, `CaseGraphic.astro`, `src/data/applications.ts` and the `applications` part of `homepage-v2.ts`. Tabs run on `src/motion/tabs.ts`; case pictures use `src/motion/case-graphics.ts` and their timings come from `src/motion/timelines.ts`.
- **Now:**
  - Lead: "Any protocol or app that needs to know what happened in the world."
  - Three tabs (Prediction markets, Insurance & payments, DAOs & governance). Each has an example question card, an animated case picture and the outcome, plus a "Decided in the open, not by…" line.
  - Then the builder block, "Good for users. Easier for projects.", with three points (Stay out of the middle / No team to hire / Win user trust) and "Want Augur Lituus in a platform you use? Or one you're building? Talk to us".
- **Goal:** polish, not a rebuild.
  - Clearer tab and panel hierarchy.
  - A case picture that reads at a glance.
  - No height jump when switching tabs.
  - A tighter builder block.
  - A phone layout that doesn't feel like a long stack.
- **Note:** a 24 Oct attempt, "use cases as a Folder" (the tabs drawn as folder tabs), was never committed. Its script survives only in the build mirror, at `C:\Users\edu45\Documents\augur-web-lab\src\components\home\applications-folder-v2.js`. Read it before reinventing the idea; then reuse it or delete it.
- **Motion:**
  - Each case picture plays once per tab session, starting about 360 ms after a switch, and settles on a switch, interaction, resize, print or reduced motion.
  - If panels change height, animate with FLIP or a same-document View Transition, with an instant fallback.
  - Tabs fade words with opacity only.
- **Copy:**
  - "Decided in the open, not by the market's own team." repeats an "X, not Y" three times, once per tab. Rewrite or justify it.
  - Example questions are illustrative and must read as examples.
  - Keep "&" or "and" consistent across tab names.
  - "Talk to us" is the same label everywhere.
- **Keep:** one tabs controller (arrows, Home/End) and the panels' labels.
- **Suggestions:**
  - Ryan 9 and 10, and Ryan 11 with Augus 1, are already in v2.
  - Augus's 18 Oct note: push the business case. Resolution is handled outside the team, and Augur takes the heat in disputes, with only a very light hint of liability and never a promise of protection.

### 4. "Know what happened? Get paid to report it.": new UI

- **Where:** `src/components/home/HowItWorks.astro`, `how-it-works-v2.js`, `src/data/walkthrough.ts` (the worked example, flagged `needsReview`) and the `how` part of `homepage-v2.ts`. The REP rows use `src/components/art/RepFlow.astro` and `src/motion/rep-choreography.ts`. The 19 Oct brief is `docs/how-it-works-prompt.md`.
- **Now:**
  - The heading, then "Stake REP on what you saw. A wrong call costs your bond."
  - A "Walk through an example" disclosure (Ryan 12: detail behind a click) opens four steps: A question opens / Report what happened / Challenge a wrong answer / Get paid when it's final.
  - It also shows a reward meter, bond maths (+17% on a report, +40% on a challenge, 80% of the losing bond to whoever was right, the rest burned) and a sample question card (room-temperature superconductivity).
- **Goal:** within five seconds a trader sees what they do, what they risk and what they can earn. The curious open the worked example. Numbers stay the whitepaper's example, labelled as an example.
- **Keep:**
  - Holding REP never implies a duty ("Taking part is optional").
  - No returns promised, and no investment tone.
  - The disclosure stays a native button.
  - The example stays draft.
  - One source for the numbers (`walkthrough.ts`), shared with the REP page (item 10).
- **Motion:**
  - This is the busiest section. List every moving part (reward meter, bond bars, REP rows, step changes) and confirm each one's rule: the REP rows follow the 12 s choreography; everything else plays once and settles.
  - Opening the example must not jump the page. Keep the button in place and animate contents with opacity/transform, or switch instantly.
- **Copy:**
  - Check the maths against the example: 2.5 on a 15 REP bond is 16.7%, so "+17%". 12 on a 30 REP bond is 40%. 80% of the losing bond goes to whoever was right, and the rest is burned.
  - "Get paid" and "earn" stay tied to doing the work, never to holding.
  - Step titles are parallel verbs.
- **Suggestions:**
  - Ryan 12: less detail on the main scroll.
  - Ryan 13 and Augus 2: say what REP can do, and that it isn't passive. v2's wording: unmigrated REP loses its value; the token is never taken.
  - Augus's 18 Oct note: make this the consumer case for taking part.

### 5. "The road to Augur Lituus.": polish

- **Where:** `src/components/home/Roadmap.astro` and `src/data/roadmap.ts`.
- **Now:**
  - "The research is published and the build is underway."
  - A timeline with a legend (Completed / In progress / Up next): 2025 Augur reboots, January 2026 Whitepaper, August 2026 Moon Fork, Now Implementation (with a slow CSS pulse), 2027 Testing & audits, 2027 Launch.
  - Each stop opens a detail panel with text, links, blog posts and the paper.
- **Goal:**
  - The current stop is obvious at a glance.
  - Detail panels are consistent with each other.
  - The phone layout reads as a path, not a list.
- **Motion:**
  - The Now pulse is the section's only loop, slow and in CSS, and it stops under reduced motion.
  - Switching stops must not jump the page.
- **Copy:**
  - Dates use one format (e.g. "29 January 2026").
  - Stop names match their panel headings ("Augur reboots" vs "Augur starts again.").
  - 2027 items say only what the sources say.
  - Blog links point to real posts.
- **Suggestions:** Ryan 14 says the roadmap is fine. Augus's "Coming soon?" needs a source before it can be used.

### 6. "Learn more about Augur.": polish, plus links on to the FAQ, blog and community

- **Where:** `src/components/home/LearnMore.astro`, `src/data/faq.ts` (the homepage questions) and `homepage-v2.ts`. Community links come from `navigation.community` in `src/data/navigation.ts` (Discord, Telegram, X, GitHub, with their logos); the URLs live in `links.ts`.
- **Now:** "Short answers, each with a link to go deeper." Three or four questions as exclusive disclosures, then "View all questions" and "Read the blog" (Ryan 15 replaced "From the blog" with a plain link).
- **Goal:**
  - A light polish so the questions read as the doorway to going deeper.
  - **New (owner, 25 Oct):** something that sends people on to the FAQ, the blog and the community. The shape isn't decided yet: try a couple, pick one, and show the owner. Starting points:
    - Three destination blocks under the questions (FAQ, Blog, Community), each with one plain line on what's there and one link.
    - Or keep the questions as they are and grow the two links into a small "Keep going" group that adds Discord and the other community links.
  - The Learn guides (item 19) can join if they fit, but the owner named FAQ, blog and community.
- **Watch:**
  - The footer's Community column sits right below this section (item 7). Community links here must not read as the same block twice in a row: either they look clearly different, or the footer drops its copy on `/2/`. Settle it together with item 7.
  - One source: reuse `navigation.community` and its logos, never retype the links.
  - Equal block feet at every width, with no empty blocks.
- **Motion:** disclosures open instantly, or fade contents with opacity. No height animation. The new links get hover and focus only.
- **Copy:**
  - Answers come from `faq.ts` and match the FAQ page word for word.
  - The ↗ appears only on off-site links (Moon Fork report, whitepaper, Discord and the other community links). FAQ and blog are internal: no arrow, or their approved →.
  - "View all questions", "Read the blog" and any community label match the CTA wording used elsewhere (the footer, `/contact/`'s Discord card).

### 7. "Talk to the Augur team." footer: new UI

- **Where:** `src/components/layout/SiteFooter.astro`, `src/data/site.ts` (newsletter settings), `navigation.ts` and `links.ts`.
- **Now:**
  - Contact block: "Talk to the Augur team." / "Ask about the protocol or share feedback. Building on it? Tell us what your project needs." / Talk to us + contact@augur.net.
  - Newsletter block: "Follow Augur's progress".
  - The funding line (Lituus Foundation ↗) and four link columns (Augur, Products, Resources, Community).
- **Goal:** every page ends with one clear next step. Contact, newsletter and links are grouped so they can't be confused, and it works down to 360. It shows on `/2/` and inner pages (D3).
- **Keep:** the newsletter stays a local-only prototype: it validates in the browser, never sends data and never claims a subscription.
- **Check against item 6:** if "Learn more about Augur." now carries community links, the footer's Community column must not repeat them as an identical block right below.
- **Visual (owner, 25 Oct): test a big "AUGUR" sign-off** under the link columns. Build a few options, show the owner each at 1440 × 900, and keep one or none. Switch between them with a constant in `SiteFooter.astro`; the page itself never shows a chooser.
  - **The official logo, large:** the horizontal logo from `public/brand/kit/horizontal/`, set wide across the 1248 content width. Keep it whole, with its clearspace. Cropping it at the page edge or tinting it changes the logo, which the brand rules don't allow.
  - **Just the letters:** "AUGUR" without the glyph. No official wordmark-only file exists, so this means either cutting the letters out of the horizontal SVG (splitting the lockup) or setting the word in Sora (which can read as a second, made-up logo). Check both against the Brand Foundation PDF and ask the owner before showing them.
  - **An image:** a still or a short looping video on Navy behind or beside the logo, for example made with the Higgsfield connector. Record its source, prompt and model in a provenance file in `docs/`, like `hero-video-provenance.json`.
  - **Animation:** the logo rises or fades into place when the footer scrolls into view. Or its letters assemble and land on the exact artwork: `docs/source-material.md` already calls logo assembly motion an unapproved experiment that must end on the supplied artwork, so it stays flagged.
- **Visual rules:**
  - "Talk to us" stays the footer's one clear next step. The visual sits below everything as a sign-off and never competes with it.
  - It's decorative: `aria-hidden` and no link, since the header logo already links home.
  - Official geometry, colours, clearspace and minimum width. No glow (only Peer mesh has one).
  - The footer is on every page, so an image or video lazy-loads, never touches LCP and counts against `check:budgets`.
  - No dead space: a big visual mustn't leave the page ending in a tall empty block.
  - Phones: item 25 checks it (D9).
  - It isn't in the Figma choreography. If it stays, add it to the "update figma" pending list in `docs/figma-workflow.md`.
- **Motion:**
  - Hover and focus on the links and fields. Validation messages appear without moving the layout.
  - The visual plays once per tab session (`seen.ts`), only once it's in view, and never replays on F5 or back. Reduced motion, print and no-JavaScript show the final frame. Transform and opacity only, with timings in `timelines.ts`.
  - A looping video pauses off-screen and in a hidden tab, shows its poster frame under reduced motion, and gets measured.
- **Copy:**
  - The prototype's messages must not suggest anyone was subscribed.
  - Column labels match the header.
  - `bun run check:copy` already flags footer copy against Figma. That's expected until the next "update figma".

### 8. Products (`/products/`)

- **Where:** `src/pages/products.astro`, `src/data/products.ts` and `navigation.ts`.
- **Now:**
  - Intro listing Augur Lituus, Zoltar and Augur Stratoblast.
  - "How they fit together": a diagram from "Any app" through Augur Lituus, Statoblast Trading, Augur Stratoblast and Zoltar, with REP securing all of them.
  - One section per product.
- **Goal:**
  - In one screen a beginner learns what each product does and which one matters to them, with Augur Lituus leading.
  - Each product's status is plain (proposed design, in progress or deployed), with no invented readiness.
- **Motion:** the diagram may draw once (SVG stroke draw, once per session), or stay static.
- **Copy:**
  - Taglines come from `products.ts`, the same ones the header uses.
  - Product names are spelled the same way everywhere.
- **Scroll:** header links land on `/products/#zoltar` and the other anchors. Check they land fully in view (item 14 has the details).
- **Open, don't decide alone:**
  - The Stratoblast/Statoblast spelling.
  - Whether Dark Florist builds Augur Stratoblast on Zoltar: no primary source says so yet (launch checklist).

### 9. About (`/about/`)

- **Where:** `src/pages/about.astro`, `src/data/history.ts` and `src/data/heritage.ts` / `heritage-fields.ts` (with the `HeritageField` art).
- **Now:** rebuilt 19 Oct; the copy isn't approved yet. It has:
  - An "About Augur" intro.
  - The position "No company or committee should hold the final word on what happened.", quoting whitepaper §1.
  - "The story so far" (history), "Who does what" and "How the work is done".
- **Goal:** a newcomer's story of the project: what Augur is, why it exists, who's behind it (Lituus Foundation) and where it's going. Every history fact keeps its source.
- **Motion:** check the heritage art against the motion rules. History stays static and readable.
- **Copy:**
  - The intro calls Augur Lituus "one of the next versions of Augur's oracle", while the homepage says "the next generation of Augur's oracle". Pick one with the owner, then use it everywhere.
  - No invented people, partners or roles.
- **Keep:** the About copy approval stays open on the launch checklist.

### 10. REP (`/rep/`)

- **Where:** `src/pages/rep.astro`, `src/data/rep.ts` and `src/components/rep/` (`TokenCard`, `BondLadder`, `Participation`, `ForkStory`, `VersionRail`).
- **Now:**
  - Hero "REP makes lying expensive." and a token card: REPv2_Yes_1, its contract address, a copy button, Etherscan, "checked 19 October 2026".
  - Then "Lying gets more expensive every round", "Taking part is optional", "If a fork happens", "Which REP do you hold?" and "Questions about REP".
- **Goal:** for traders and holders: what REP is, why it matters, what you can do with it if you want to, what a fork asks of holders, and which REP is current.
- **Keep:**
  - The contract address exactly as verified (confirming it with maintainers is a launch item).
  - No price or investment talk.
  - Holding REP never implies a duty.
  - Bond numbers come from `walkthrough.ts`, matching item 4.
- **Motion:** the bond ladder, fork story and version rail each play once and settle, unless one already follows a choreography.
- **States:** the copy button announces "Copied" politely and works by keyboard. The long address must not overflow at 360.

### 11. Talk to us (`/contact/`)

- **Where:** `src/pages/contact.astro` and `links.ts`.
- **Now:**
  - "Let's talk!", a Discord card, "Find us elsewhere" (Telegram, GitHub, X, email), and "Send us a message".
  - The form takes name, email, company, website and message. It posts to `mailto:contact@augur.net`, which opens the reader's email app; there's no backend.
- **Goal:** route people fast. Community questions go to Discord, builders to the message form, anything else to email.
- **Copy:**
  - "Send message" suggests delivery, but the form only composes an email. Relabel it (for example "Write the email") and say what happens next.
  - "Let's talk!" is the only exclamation on the site; check the tone.
- **Keep:** labels, autocomplete, associated errors and the polite error summary. This page doesn't need the footer's contact block repeated.

### 12. Copy pass, across the whole site

Every page and the homepage on `/2/`; `/`, `/1/`, `/3/` and `/4/` stay untouched.

- **Apostrophes and quotes:** pages mix straight and curly marks today (for example "can't" beside "Augur’s" on `/2/`). Make them all curly. Check that the copy checks and Figma matching still work with that.
- **Headings:** homepage headings end in a full stop or question mark; inner-page headings don't. Pick one rule and apply it.
- **One description:** "the next generation of Augur's oracle" vs "one of the next versions" (item 9).
- **One name per action:** "Talk to us", "Read the whitepaper ↗", "Read guide →" and so on.
- **One term per idea:** use `src/data/glossary.ts` (report, challenge, bond, appeal period, fork, universe, Invalid).
- **Format:** dates (e.g. "29 January 2026") and numbers with units ("15 REP").
- **Search** for em dashes, "your app", "your call", "not only", ", not " and rule-of-three lists.
- **Facts:**
  - Every fact and number traces to the whitepaper or `docs/sources.md`.
  - Unapproved copy keeps its `needsReview` flag.
  - Illustrative examples are labelled as examples.
- **Run** `bun run check:copy` and keep its output: it's the list "update figma" will need later.

### 13. Motion pass, across the whole site

- **Inventory:** list every scene, loop and transition on `/2/` and each inner page, in a short table: what moves, what triggers it, how long it lasts, whether it plays once or loops, how it settles.
- **Check each one** against the motion rules:
  - Plays once per tab session, with no replay on F5 or back.
  - Pauses off-screen and in a hidden tab.
  - Final frame under reduced motion, print and no-JavaScript.
  - Transform/opacity only (SVG animates `transform`, not `translate`/`scale`).
  - Timings from `timelines.ts`.
  - No layout shift, and nothing hidden behind motion.
- **Measure ongoing motion:**
  - The live floor hero on `/2/` (canvas): idle CPU and frame time on a laptop on battery.
  - The tenet loops, the REP rows and the Now pulse.
- **Feedback:** hover and press feedback has the same speed on every control.
- **For the talk track (item 15):** loops over 5 s with no pause control are a known WCAG 2.2.2 Level A launch blocker. They're listed so the owner can mention them, not fixed before Monday.

### 14. Scrolling, navigation and states, across the whole site

- **Anchors:**
  - `base.css` sets `scroll-padding-top: 24px`, and the header hides on scroll down but returns on any scroll up. So an upward anchor jump (the "On this page" links, or `/products/#…` targets) can land under the returning 96 px header. Test it and fix it.
  - Test hash links arriving from another page after fonts load.
- **Scroll behaviour:**
  - Smooth scroll falls back to instant under reduced motion; it already does in `base.css`, so confirm it.
  - Back and forward restore the scroll position.
  - Opening a disclosure, switching a tab or dismissing the announcement never makes the page jump (scroll anchoring).
- **Edges:**
  - Overscroll shows Navy, not white.
  - Scrollbars are dark.
  - A focused element is never fully under the header, the announcement bar or the version pill (WCAG 2.4.11).
  - The phone and tablet edges (360, 320, landscape, the version pill on phones) moved to item 25 (D9).
- **Length:** measure the homepage height at 1440 against v1 (Augus found it too long). If it's longer, find what to cut. The 390 measurement is in item 25.
- **States:**
  - Hover, focus-visible, active, disabled and current (`aria-current`) on links, buttons, cards, tabs, disclosures and fields, with one focus ring everywhere.
  - The pointer cursor only on controls.
  - Tap targets and the space between them pass the size and spacing standards.
  - The skip link works and lands on main.
- **Sizes across the site:** run `scripts/inspect-sizes.mjs` on every page at the desktop viewports (D9). Gaps that drifted off the scale between pages get fixed here, since each section was only checked on its own.
- **Zoom:** 200% text zoom (WCAG 1.4.4) and text spacing (WCAG 1.4.12). The 400% reflow check is in item 25, because it lays the page out at 320 px.

### 15. Suggestions review against every note, and the talk track

- **Review:** walk `/2/` and the inner pages it links to in the browser, section by section, against every note in the appendix:
  - Ryan's 17 notes with Augus's marks, and Augus's notes 1–3 (21 Oct)
  - Augus's 18 Oct section notes, with their user and project readings
  - his other 18–19 Oct asks
  - the questions still open for Augus
  - the owner's own `/2/` suggestions

  Check what the page shows, not only the code.
- **For each note, record one of four:** applied (where), declined (why), still open (the question to ask), or undone since (fix it, or say why it stays).
- **Scope:** `/2/` and its inner pages only. `/3/` and `/4/` aren't reviewed.
- **Talk track:** turn the review into one short table per section with three columns: what changed, which note asked for it, and why. Add the questions still open for Augus as one list, so the meeting can settle them, and the known launch blockers. The owner uses it in the meeting.

### 16. QA before sharing

- **Build checks:** run `bun run check`, `bun run build`, `check:links`, `check:copy`, `check:budgets` and `check:launch`, plus Playwright if it launches. If it doesn't, use headless Edge screenshots.
  - `check:copy` will report Figma drift; that's expected.
  - `check:launch` lists known blockers; that's expected.
- **Check in the build preview (:4330)**, so the CSP applies.
- **Viewports:** every width and height in the size and spacing standards. No overflow and no empty blocks, and `scripts/inspect-sizes.mjs` comes back clean, or each item it still lists has a reason.
- **Behaviour:** keyboard and focus, no JavaScript, reduced motion, forced colours, console errors and fonts.
- **Meta and sharing:**
  - Every page has its own title and description, and a canonical URL.
  - All pages share one `public/og.png`. Check how a link looks when pasted into Discord, Slack, X and WhatsApp, since that's how the site gets shared. Consider a `/2/` card.
  - The favicon is the REP token icon (`/brand/kit/rep-token/`); confirm that's the intended site icon.
  - Indexing stays off.
- **Performance:**
  - Lighthouse at phone size on `/2/`, `/rep/` and `/products/`, against Google's "good" thresholds (web.dev, Core Web Vitals): LCP 2.5 s or less, CLS 0.1 or less, INP 200 ms or less. A plain Lighthouse load reports TBT instead of INP, so measure INP with a timespan run that clicks through the page.
  - JavaScript per page against the budgets.
  - Font loading without a visible jump.
- **Real devices:** the owner opens `/2/` and two inner pages on their own phone (iOS Safari or Android Chrome) and in Firefox if installed. WebKit can't be tested from this machine.
- **Scope:** `/`, `/1/`, `/3/` and `/4/` are byte-identical to the `9ddb25b` build.
- **Report:** say exactly which checks ran.

### 17. Share with the team

Pick one with the owner:

- **(a) A Vercel preview deploy.** `vercel.json` exists, and indexing stays off unless `PUBLIC_SITE_INDEXABLE=true`. This needs the owner's go-ahead and Vercel access.
- **(b) Present from this machine.** Use http://localhost:4321, or `astro preview` on :4330.
- **(c) Send a zip of `dist`.**

Recommended: (a), for a team reviewing on their own time. Send the link with the talk track from item 15. Push to GitHub only if the owner asks.

### 18. Augur Lituus page (`/products/augur-lituus/`): new, stretch

- **Goal:** a flagship page covering what it is, how a question gets answered (ask, report, challenge, fork as the last resort), why it's hard to corrupt, what it means for traders and for builders, the roadmap status and the whitepaper.
- **Reuse data:** reuse `walkthrough.ts`, `roadmap.ts` and `products.ts`; don't copy strings.
- **Then:**
  - Point "Explore Augur Lituus" in `navigation.ts` and the Products page's Lituus section to it.
  - Add it to the `fixed` list in `src/pages/sitemap.xml.ts`.
  - Run `bun run check:links`.
- **Keep:** no invented SDKs, APIs, integration steps or dates. "Proposed design" stays distinct from what's shipped.
- **Motion:** reuse existing scenes rather than adding new loops. Any new loop gets measured.

### 19. Learn, plus the guide reading page: stretch

- **Where:** `src/pages/learn/index.astro`, `src/pages/learn/[slug].astro`, `src/content/learn/*.md` (8 guides), `src/components/content/GuideWalkthrough.astro`, `Glossary.astro` and `src/data/glossary.ts`.
- **Now:**
  - The Learn page: "New to oracles? Start here.", four guides in order, "More guides" and "Key terms".
  - Each guide page: a back link, "Guide 1 of 4", in-page contents, sections, "Terms in this guide" and the next guide.
- **Goal:** a guided path for beginners and a comfortable reading layout, with a 60–75 character measure and clear "On this page" and next-guide links. Build the reading layout once and share it with blog posts (item 20).
- **Copy:** terms match `glossary.ts`. Guide numbering and "next" links follow the intended order.

### 20. Blog, blog post and category pages: stretch

- **Where:** `src/pages/blog/[...page].astro`, `src/pages/blog/[slug].astro`, `src/pages/blog/category/[category]/[...page].astro`, `src/components/pages/BlogArchive.astro`, `src/components/content/BlogCard.astro`, `BlogCover.astro`, `blog.ts` and `src/content/blog/*.md`.
- **Now:**
  - The archive has category links (All posts, Project updates, Research and design, For builders) and cards with type and date.
  - A post page has "On this page", share (X ↗, copy link), "Join the discussion" and "Keep reading".
- **Goal:** a new archive and reading UI that holds up with real content: long titles, posts without covers, a category with one post or with twenty. The six posts stay stand-ins for tomorrow (D5).
- **Copy:** the byline "By the Augur team" and the provisional reading times are open launch items, so don't present them as final. "Copy link" announces success politely.

### 21. FAQ (`/faq/`): stretch

- **Where:** `src/pages/faq.astro`, `src/data/faq.ts` and `src/components/content/FaqItem.astro`.
- **Now:** "Frequently asked questions" in four groups (Getting started, How it works, REP, Building with Augur), as disclosures.
- **Goal:** fast scanning, with group navigation and a deep link per question so a question can be shared. A linked question opens on arrival. Keep native `details`.
- **Copy:** answers are word for word the ones on the homepage (one source in `faq.ts`).

### 22. Brand assets (`/brand/`): stretch

- **Where:** `src/pages/brand.astro`, `src/data/brand.ts` and the brand files in `public/brand/`.
- **Now:** "Download all assets" (ZIP), Logo (three compositions, four variants each, with minimum sizes), Space and size, Color, Typography, Using the logo, Need something else?
- **Goal:** bring it into the new look.
- **Keep:** official geometry, colours, clearspace and minimum sizes exactly as given. The Brand Foundation PDF is the authority.
- **Also:**
  - `/brand/` is missing from the sitemap's `fixed` list (`src/pages/sitemap.xml.ts`); add it.
  - Download links state the format and size.

### 23. 404: stretch

- **Where:** `src/pages/404.astro`.
- **Now:** "Page not found." with links to the main pages.
- **Goal:** the new chrome, short helpful copy and the same links. Check that `vercel.json` serves it for unknown paths.

### 24. Hero: test a different look for "decentralized"

- **Where:** `src/components/home/Hero.astro` (the `.hero-emphasis` span and its CSS) and `heroTimeline.v2` in `src/motion/timelines.ts`. `/2/` only (D1): gate with `ownerVersion`, and put styles in `home-v2-only.css`.
- **Now:**
  - "The frontier of decentralized truth." is set in Sora 600.
  - "decentralized" has an underline that sweeps in left to right and retracts, on every load, a reload included. That's the owner's exception of 6 Oct.
  - A second line answers hover on fine pointers.
  - The code calls the underline temporary (owner, 6 Oct). It has no glow.
- **Goal (owner, 25 Oct):** find out whether another look makes the word land harder than the underline. Build two or three options and show the owner each at 1440 × 900 and 390 × 844. Keep the winner, which may still be the underline, and delete the rest. Switch between options with a constant in `Hero.astro`, the way the floor and the video switch; the page itself never shows a chooser.
- **Options to try** (all inside the brand):
  - **Another weight or face:** the word in Sora 400 against the 600 headline, or in Schibsted Grotesk. Only Sora 400 and 600 and Schibsted Grotesk 400 load today. An italic or another weight adds a font file, so count it against the budgets and make sure it loads before first paint.
  - **Colour:** the word in Green. Green marks actions on this site, so check that it doesn't read as a link (consistency and standards, NN/g heuristic 4).
  - **A square-cut Green block** behind the word, with Navy letters, drawn in with `scaleX` the way the underline is. It has the same risk, because it looks like the action fill.
  - **Letters that start apart and close up** as the word settles, moved with `transform` on each letter. Animating `letter-spacing` is a layout change and isn't allowed.
- **Keep:**
  - The headline's words. The hero copy is approved (Ryan 1).
  - One `h1` that a screen reader reads as one sentence. If the letters are split into spans, hide them from assistive tech and keep the whole word readable.
  - No layout shift. The word's box never changes size, during the motion or after it, so the headline never rewraps.
  - The word must not compete with the live floor on `/2/` (from 1024 px) or with the hero's lens and ripple.
  - Contrast of at least 3:1 for large text against Navy and over the floor.
  - Forced colours show it as CanvasText.
- **Motion:**
  - The every-load exception covers the underline sweep. If the new look moves, ask the owner whether it keeps that exception; otherwise it follows the normal rules (no replay on F5 or back).
  - Reduced motion, print and no-JavaScript show the final look.
  - Transform and opacity only, with timings in `timelines.ts`. Measure it if it moves for good.
- **Test:**
  - Screenshots side by side at 1440 × 900 and 390 × 844, both the first frame and the settled one.
  - A five-second test: show the hero to someone fresh for five seconds and ask what the site is about.
  - "decentralized" is a long word. Check that it never overflows or breaks badly at 1024, 768, 390, 360 or 320.
- **Figma:** the hero choreography lives at `382:848`. If the look changes, add it to the "update figma" pending list in `docs/figma-workflow.md` (website first).

### 25. Mobile pass: every page below 1024 px

- **When:** after the polish passes (12–14) and before Monday's QA (16). Everything D9 set aside lands here.
- **Viewports:** 768, 390, 360 and 320 wide, plus 390 × 844, 360 × 640 and 844 × 390 (a phone in landscape).
- **Standards:** the phone rows of the size and spacing standards:
  - main actions at 44 px, with 8 px between targets
  - 16 px body text and form fields
  - the hero's first screen
  - `svh` or `dvh` for full-height blocks
  - the sticky header in landscape
  - thumb reach
  - reflow at 320 px, which is also the 400% zoom check (WCAG 1.4.10)
- **Measure:** run `scripts/inspect-sizes.mjs` at these viewports on `/2/` and every inner page, if the script exists by then.
- **Collected from the other items** (check each one):
  - Chrome: the phone menu dialog traps and returns focus, and the header hides properly on phones.
  - Item 3: the use-case tabs don't feel like a long stack on phones.
  - Item 5: the roadmap reads as a path on phones.
  - Item 7: the footer works down to 360, and its "AUGUR" visual keeps the logo's minimum width without overflowing.
  - Item 10: the REP contract address doesn't overflow at 360.
  - Item 14:
    - no horizontal scroll at 360 or 320, including the roadmap, the REP address, long words and the products diagram
    - on short and landscape screens, the header, the announcement bar and the version pill together still leave room to read
    - the version pill never covers content or footer links (`version-switch.css` already pads the bottom)
    - the homepage height at 390 against v1
  - Item 24: "decentralized" never overflows or breaks badly from 768 down to 320, and the owner sees it at 390 × 844.
  - Every section: the owner sees it at 390.
- **Rule:** phone fixes never change the desktop. Check 1440 after each fix, or compare the desktop screenshots before and after.
- **If time runs out:** do `/2/` first, then `/rep/` and `/products/`, the pages item 16 runs Lighthouse on at phone size. The share (item 17) names any page that wasn't checked on phones.

### 26. More alive visuals: images and texture

- **Why (owner, 25 Oct):** the site needs more alive visuals, maybe images. The worry is older: the owner's backlog already said the site "feels dead and too solid" and needs a direction for life and texture, not just more motion (`git show 801261c^:docs/backlog.md`).
- **Now:** the drawn scenes are the Why Augur isometric cards, the use-case pictures, the REP rows, the About heritage art and the blog covers. The only images are the hero's, in `public/images/hero/` (the live floor's stills, and the generated loop the floor replaced). Most other sections are type on flat Navy.
- **Step 1, find (30 min):** go through `/2/` and its inner pages at 1440 and list the dead spots: sections that are only text on flat Navy, big empty fields, cards that read like forms. For each, say what a visual would add: explaining an idea, giving the place texture, or answering a hover. Pick the few places where it helps most. Images everywhere become noise, and pretty only helps while the page stays clear (aesthetic-usability effect, lawsofux.com).
- **Step 2, test (45 min):** make two options for each place and show the owner at 1440 × 900. Ways in:
  - **Generated stills or short loops** with the Higgsfield "higgs" connector. What worked for the hero on 22 Oct:
    - a 3D key frame from Nano Banana Pro at 4K, its colours fixed in the sandbox
    - the same frame used as first and last, so the loop closes on itself
    - near-Navy pixels flattened to exact Navy, then AV1 in 10 bits

    Flat vector key frames were rejected. Price every job first with `get_cost: true`.
  - **Texture in the site's own language:** square-cut tiles, the lituus mark, isometric blocks, Green on Navy.
  - **Small interactions on what's already there:** a picture that answers the pointer, the way the hero's lens does.
- **Step 3, build (45 min):** the owner's picks. Inner pages directly; homepage visuals once lane A has finished with that section.
- **Keep:**
  - Brand: Navy, Paper and Green, square corners, no shadows, and no glow (only Peer mesh has one). Logos only as supplied.
  - Nothing invented: no people, partner logos, app screens or products that could pass as real. A picture of a proposed design must not look shipped.
  - Images never carry text people need. Decorative ones get empty alt text and `aria-hidden`; ones that mean something get real alt text.
  - Weight: AVIF or WebP at the sizes shown, with `width` and `height` set so nothing shifts. Lazy-loaded below the first screen, never touching LCP, and within `check:budgets`. Video is AV1 with an H.264 fallback, muted, with a poster.
  - Provenance: record each image's source, prompt and model in a provenance file in `docs/`, like `hero-video-provenance.json`.
- **Motion:**
  - Prefer stills, once-per-session reveals and pointer answers over loops. Every new loop over 5 s without a pause control adds to the WCAG 2.2.2 launch blocker (item 13), so each one needs the owner's yes.
  - Loops pause off-screen and in a hidden tab. Reduced motion, print and no-JavaScript show the poster. Measure each one.
  - Transform and opacity only, with timings in `timelines.ts`.
  - None of this is in the Figma choreography. Anything kept goes on the "update figma" pending list in `docs/figma-workflow.md`.
- **Phones:** item 25 checks them (D9).
- **Talk track:** item 15 lists what was added and why.

## Not before Monday 11:00

These are listed so nobody starts them by accident:

- "update figma", the pending list in `docs/figma-workflow.md`, plus the drift list from item 12.
- The pause control for looping motion. This is WCAG 2.2.2, Level A, and a launch blocker on `docs/launch-checklist.md`; the owner removed the `/2/` control on 22 Oct.
- Migrating the 16 real blog posts.
- A newsletter provider and consent wording.
- A privacy notice, needed once the newsletter or the contact form collect data for real.
- Confirming contact@augur.net and the REP contract with maintainers.
- About copy approval.
- The announcement's retirement date.
- Turning indexing on.

## Appendix: the review notes

Every note from Ryan and Augus so far, old and new. The 21 Oct ones are quoted from the review setup, which is now in git history only (`git show 801261c:docs/decisions.md`, section "Homepage v1 and v2 for review"). The older ones and the open questions come from the same log's 18–21 Oct entries (`git show 9ddb25b^:docs/decisions.md`). Before 18 Oct the history holds no notes from either of them: the earlier "Ryan" mentions are the whitepaper's author, Ryan Garner.

**Ryan's notes, as Augus marked them** (dash = do, X = don't, 1–3 = Augus rewrote it):

1. Hero headline and art are fine (no mark).
2. The hero's cost-of-lying line is too weak; stress the attack cost (do).
3. "Whoever controls the oracle decides who gets paid." (do)
4. A better word than "parties" in the answer band (do).
5. "Anyone can ask. Anyone can answer." (do)
6. "?" tooltips on the tenets (X).
7. Tell traders plainly that markets do misresolve (do).
8. For integrators: less liability first, less work second (do; Augus note 1).
9. The use-case lead in one sentence: "Any protocol or app that needs to know what happened in the world." (do)
10. The DAO example checks an upgrade against the DAO's mission or constitution (do).
11. Remove "Good for users. Easier on the project." (X; Augus note 1: keep it, rewritten).
12. How it works has too much detail for the main scroll; put it behind a click (do).
13. "Holding REP?" should say what REP can do and that it isn't passive (do; Augus note 2).
14. Roadmap is fine (no mark).
15. Drop "From the blog" for a plain blog link; keep the FAQ (do).
16. Split the phone page into about three intents (X).
17. Make the differentiators explicit: highest attack cost, no multisigs, no governance (do; Augus note 3).

Augus's worry: v2 may become too technical.

**Augus's notes, verbatim:**

1. Good for users. Easier for projects. / "Want Augur in a platform you use? Or one you're building? Talk to us ->" / "Win user trust. Give users independent outcomes they can verify and challenge themselves." / "No team to hire. Pay per question instead of running resolution in-house." / "Stay out of the middle. When outcomes get contentious, Augur's dispute process makes the call - not you."
2. "Holding REP? Utility: Use REP to earn from participating in the oracle. Non-Passivity: Check actively for forks or risk losing the token."
3. Use the first section (the three cards): Permissionless: "Any app can ask. Anyone can answer." / "Report, challenge, or build on Augur. No approvals, no gatekeepers." Trustless: "No governance. No multisigs. No admin keys." / "No company, committee, or even Augur's creators can override an outcome." Robust: "Harder to game. Costlier to manipulate." / "Designed with one of the highest economic barriers to attack among decentralized oracles."

**Augus's section notes of 18 October** (direction, not approved copy). Each section gets one reading for users and one for projects, as the owner recorded them that day:

- **Why Augur:** answer "why do I want the project I trade on to use this oracle?" Projects backed by Augur protect funds with economics rather than trust.
  - User: "safer for me to use product X; I want products backstopped by this design."
  - Project: "users trust us to resolve things today; we don't want that responsibility."
- **What could you build?:** the business case. Once users want a project to use Augur, why does the project want it too? Resolution is handled outside the team (no hiring for it), Augur takes the blame in disputes instead of the project, with only a very light hint of legal liability.
  - User: "can be used for many products."
  - Project: "outsourcing resolution is cheaper and less risky, and adds value for users: win-win."
- **How it works:** the consumer case for taking part and holding REP: "how do I take part, how do I get rewarded". Maybe merge it with "What can you do with REP?" (merged on 19 Oct).
  - User: "I can take part and get paid?"
  - Project: "design looks serious; having their own UI makes it easier to integrate; credible."
- **The road to Augur Lituus:** "Coming soon?"
- **Before using any of these words:** "protect funds" and "backstopped" can't become promises, "get paid" and buying REP can't read as an investment pitch, and "Coming soon" and "their own UI" need a source.

**Augus's other asks, 18–19 October:**

- **The homepage is too long.** On 19 Oct the blog and the FAQ became one "Learn more about Augur." section, 783 px shorter at 1440. Item 14 measures the length again.
- **Make it clear the use-case examples open** (18 Oct). The old "+" cue was too weak.
- **Avoid broad wording** such as "The app…" (18 Oct). The fallback note now names "An insurance app".
- **Keep "trust" out of Why Augur** (18 Oct). His own 21 Oct notes reverse this ("Trustless", "Win user trust."), and `/2/` follows the newer note.
- **The "Why Augur" name and the answer band** "With Augur, users don't rely on parties to control answers." came from his notes (18 Oct).
- **How it works and REP as one "take part" section** (owner and Augus, 19 Oct; brief in `docs/how-it-works-prompt.md`).
- **Copy proposals sent to him** on 18 Oct sit in the homepage handoff Claude Doc, under "05 copy proposals for Augus". The owner approved them.

**Questions still open for Augus** (21 Oct, about `/2/`):

1. Is the whitepaper's own modelled estimate fine on the homepage as "Designed to cost attackers more than almost any other oracle." (Robust card)?
2. Is "No admin keys" true for Lituus-CS? It stays out until it's sourced.
3. Does "No governance" hold for the protocol as a whole, or only for deciding answers?
4. Keep his "Trustless" over the 18 Oct "Bribery-resistant"? "Win user trust." also reverses his own 18 Oct "no trust".
5. The hero keeps "the next generation" (the handoff rule said "one of the next versions").
6. Is the DAO constitution check a fair oracle use case, and should "mission" stay in its summary?
7. Is a second "Augur Lituus" in the use-case section (the builder's ask) fine?
8. Does "Disputes settle in the open. The project never picks a side." carry Ryan's liability point strongly enough?
9. Is "Users can check and challenge independent outcomes." plain enough, given that a challenge takes a bond within an appeal period?
10. Print the fork's "two weeks" (the whitepaper's summary; its specification says "weeks")?
11. Is "Stake it to report or challenge answers" plain enough for beginners?
12. The payout figures now live only in the worked example. Fine?
13. The `/faq/` lead in Learn more, all questions starting closed, and "Read the blog" as a text link: is that what Ryan meant?

**Reviewer wording `/2/` set aside** (kept word for word only on `/3/` and `/4/`; reasons in `docs/sources.md`): Ryan's "check in at least once a month" (the paper gives no cadence, and a monthly check could miss a two-week window), "Many traders have already seen markets misresolve" (unsourced), and Augus's "No admin keys." (not in the paper) and "risk losing the token" (REP left behind loses its value; nothing takes it).

**The owner's own `/2/` suggestions** (listed in `src/data/homepage-review.ts`):

- Augur square-cut icons.
- The 128 px header logo.
- The Products lead card as one link.
- The hide-on-scroll header.
- Isometric Why Augur cards.
- The live floor hero (from 1024 px).
- The closer as a heading over two readers.
