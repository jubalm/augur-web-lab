# Prompt: review the copy, UX and UI of “Know what happened? Get paid to report it.” (`/2/`)

Paste everything below the line into a fresh Claude Code session in this project, or say: “Read `docs/how-it-works-full-review-prompt.md` and do it.”

---

## Your job

Review the homepage section `#how-it-works` on `/2/`, “Know what happened? Get paid to report it.”: every word, every interaction and every pixel. Return a ranked list of fixes, with a concrete proposal for each.

- **Review only:** don't edit files, commit or push. The owner picks the fixes, and another session applies them.
- **Time:** about 90 minutes. If you expect more, say so up front.
- **Rules:** `AGENTS.md`, plus the copy rules and size and spacing standards in `docs/plan.md`.

## Setup

| What | Where |
| --- | --- |
| Repo (read only) | `C:\Users\edu45\Documents\augur-web-lab` |
| Build and preview | the same folder. Build with `bun --bun astro build --outDir <your scratchpad>/dist` and serve that folder with a small `Bun.serve`. Don't touch the repo's own `dist`, which other sessions preview. |
| Screenshots | headless Edge over CDP (the project memory has the recipe). Playwright doesn't run on this machine. |
| Live (may be behind the repo) | https://augur-web-lab.vercel.app/2/#how-it-works |

The working tree has uncommitted changes to this section. Review the working tree, not the live page.

## What's there now

1. **Heading row:** the title (fixed copy) in the 500 column and the lead in the 668 column.
2. **Steps:** four tabs, each a numbered square and a name (Ask, Report, Challenge, Get paid). They use the shared tabs controller (`src/motion/tabs.ts`).
   - The shown step is Navy, runs into the stage below, and has a Green number.
   - The other steps are outlined.
   - Hover lifts a step, and resting on it for 120 ms shows it.
3. **Stage:** one Navy panel per step, all four sharing one grid cell. Each panel has an isometric scene, a two-line claim (Pewter setup, Paper payoff), a body line and an “In the example” figure.
4. **“Walk through an example”** opens the example card:
   - a head with the Example tag, “Augur Lituus” and “✓ Final answer”
   - the question and its cutoff
   - “What happened”: four numbered rows joined by a hairline, with your move marked in Green
   - “Paid out”: you +12 REP in Green, the reporter −15 REP, 3 REP burned
   - a foot that says where the figures come from
5. **Holding REP?:** the title and “Learn about REP”, with two points beside them.
6. **Motion** (`how-path-v2.js`, `howPathTimeline` in `src/motion/timelines.ts`):
   - Once per tab session: the first scene acts and the “paid” underline draws.
   - The stage crossfades when you pick a step, and each scene acts on its first pick.
   - Reduced motion, reload, no JavaScript and print all show the final state.

**Files:**
- `src/components/home/HowItWorks.astro` (the `path` branch)
- `src/data/homepage-v2.ts` (`howItWorks.path`, `holder`)
- `src/styles/home-v2-only.css` (How it works block)
- `src/components/home/how-path-v2.js`
- `src/data/how-scenes.ts`

**Measured at 1440:** the closed section is 1027 px and 113 words; opening the example adds about 600 px.

## What the owner wants

- **Professional and calm.** Fewer marks, more whitespace. Grids of squares, meters, extra tonal zones and written cues like “Next: …” read as noise; the owner has rejected all of them.
- **Clear to a beginner in five seconds:**
  1. What can I do?
  2. What do I get if I'm right?
  3. What do I lose if I'm wrong?
  4. Do I have to do anything if I only hold REP?
- **Obviously interactive:** a visitor sees right away that the other steps open, without being told in words.
- **Credible to a builder:** exact figures, aligned columns, careful spacing.

## Review in five passes

### 1. Copy

Check every string against Ryan's and Augus's notes in the appendix of `docs/plan.md`:
- Ryan 12, 13, 16 and 17
- Augus 2 and 3, his 18 October “take part and get paid” note, and his worry that it's too technical
- open questions 10–12

Then check it against the copy rules:
- traders and beginners first
- “you” for the reader's moves
- every gain stated with its condition and risk
- no investment talk, no duty to report, no guarantees, no readiness or dates
- “Augur Lituus” in full
- plain words on the main scroll; whitepaper terms only inside the example, once each

Flag repetition between the tabs, the stage and the example. Every claim needs a whitepaper section; use `docs/sources.md`.

### 2. UX

- **Laws and heuristics to apply** (NN/g and lawsofux.com):
  - Jakob's law: do the tabs read as tabs?
  - Hick's law: one control
  - progressive disclosure
  - peak–end: does the story end on getting paid?
  - Von Restorff: Green only for your moves and your payout
  - proximity: risk next to gain
  - goal gradient
- **Interaction:**
  - Is switching on hover helpful, or does it surprise people?
  - Does the example add what the stage lacks, or repeat it?
  - Is the order of information right?
- **The cold read:** give a fresh subagent only a screenshot of the closed section at 1440 and ask the four questions. Then give it the open example and ask: “What did ‘you’ get, and why?”

### 3. UI and visual design

Look at every screenshot at 100%, and zoom into the small parts. Check:
- the type scale and hierarchy
- alignment to the 500/668 heading grid
- spacing on the 4 px scale (4 8 12 16 20 24 32 48 64)
- consistent edges and padding
- tabular figures
- contrast (WCAG AA for text)
- the size and placement of the scene
- the look of selected, unselected, hover, focus and active states
- the example card's columns and hairlines
- Holding REP's balance
- dead space, orphan words and ragged edges

Compare it with the other `/2/` sections (Why Augur, the use cases) so the page reads as one system.

### 4. Responsive

Shoot 1440 × 900, 1366 × 768 (landing from the hero's “See how it works”), 1280, 1024, 768, 390 and 360.
- No horizontal overflow.
- The stage keeps one height across steps.
- The tabs stay readable and tappable (at least 44 px).

### 5. Access and motion

- **Keyboard:** arrows, Home and End on the tabs; Tab into the panel and on to the button.
- **Focus:** visible everywhere.
- **Screen reader:** tab names and labelled panels.
- **States:** forced colours, reduced motion, no JavaScript, print.
- **Motion:** transform and opacity only; never replays on reload; settles on input. Is any of it noise?

## Report, in this order

1. **The top 10 fixes, ranked by impact.** For each:
   - what's wrong and where, with the screenshot and width
   - the principle, rule or note behind it
   - the exact fix: copy text, CSS values or markup
   - the effort: S, M or L
2. **Copy table:** element | current | verdict | proposed | why. End it with a ready-to-paste `path` and `holder` block in the shape `homepage-v2.ts` uses, and the closed word count before and after.
3. **Cold-read answers,** before and after your copy.
4. **Ryan and Augus notes,** each marked applied, declined (with the reason) or open.
5. **What already works,** in a few lines, so it isn't lost.
6. **Questions for Augus,** only real ones, one line each.

Keep it short and concrete. Report only checks you actually ran, and name any you couldn't run.
