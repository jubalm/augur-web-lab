# Prompt: “How it works” × REP — one “take part” section

Paste everything below the line into a fresh session in `Documents\augur-web-lab`.

---

Rebuild the homepage “How it works” section (`src/components/home/HowItWorks.astro`) and merge the “What can you do with REP?” section (`src/components/home/Rep.astro`) into it. The result is one section that answers a trader's or beginner's question: **“How do I take part, and how do I get paid?”** Follow `AGENTS.md` throughout. Website first; do not touch Figma until the owner says “update figma”. Instead, add a pending entry to `docs/figma-workflow.md`.

## Why (owner + Augus, 19 Oct 2026)

- This section is the consumer pitch. A reader should think: “Wait, I can take part in this and get paid for it?”
- A project reading the same section should think: “This looks serious and credible.” The query card has to look like real product UI.
- Remove “Disagreement raises the stakes” (the bond-rounds chart and its 1–4 tabs).
- “What can you do with REP?” repeats steps 2–3 of the walkthrough (Report, Challenge, Risk). Fold its payoffs into the walkthrough and delete it as a separate section.

## Facts you may use (January 2026 Augur Lituus whitepaper only)

- §2, §4.4.2: anyone can pay a fee to ask a multiple-choice question. The fee is paid entirely in REP. Invalid is always added as an outcome (§4.0.1).
- §4.4.3: **Reporter Pay** goes to the first person to report the outcome that becomes final. It is a clock auction: it starts at 0 REP and rises over time, up to the whole fee. Anyone can add a tip.
- §2, §4.1: the first report's bond equals the query fee. Each challenge must back a different outcome with **double** the previous bond. If an appeal period passes with no new stake, the latest outcome is final.
- §4.3.1: winners receive **80%** of the bonds on other outcomes, in proportion to their stake. The other 20% is burned. Visible copy says “most”.
- §4.0.2, §4.5: if no one challenges, the reporter gets the bond back plus Reporter Pay. Any part of the fee not paid to the reporter is burned.
- §4.2: if a bond would pass the fork threshold, REP holders choose a fork. A fork is the last resort.
- §4.3: with no report within 3 days, the question resolves as Invalid (already in the FAQ, so don't repeat it here).

Do not use or invent:
- A shipped Augur Lituus app or UI. “Their own UI” has no source; the card is an illustrative example.
- APYs, yields, returns, price or “value goes up”.
- Burn-as-dividend wording (§4.5 says “dividend”; keep it off the homepage).
- Readiness, dates or partners.
- Any suggestion that holding REP requires reporting or challenging, or that holding alone earns rewards. The REP page states the opposite.

## Structure (1440; shared 500 / 80 / 668 grid, 1248 content width, Web band background stays)

1. **Heading row.** Title in the 500 column, lead in the 668 column. No kicker.
2. **Walkthrough.** Keep the existing tabs controller (`data-tabs data-walkthrough`, vertical tablist, arrows, Home/End, labelled panels) and the step-tab look: the selected step goes Green, earlier steps are crossed off with a check. Same 500 / 80 / 668 split. The four steps are now framed by **what you do and what you get**.
3. **The query card** (right) stays the anchor and gains one new zone at its foot: **“Your REP”**. This zone is where the old REP rows live now. It reuses the StakeFlow square vocabulary (one 32 px square per bond, two for a double bond, 80%-area square for “most of theirs”, a smaller fee-share square, an outlined “lost” square, a condition line with an arrow). One flow is shown per step, not three rows.
4. **Holder row** under the walkthrough, on the same grid, about 72 px below. It replaces the REP section's intro and button. It must not leave an empty column (see `no-dead-space`).
5. Delete the bond-rounds block, its styles and `src/data/bond-rounds.ts`. Remove `<Rep/>` from `src/pages/index.astro`, delete `Rep.astro`, and remove `initStakeFlow` if nothing else uses it. Remove `bondTimeline` and the `[data-bonds]` code in `home-interactions.ts` / `timelines.ts`. Retire `StakeFlow.astro` once its squares live in the card (extract a small `RepFlow` component if that keeps it clean). Keep `id="how-it-works"` on the section.

## Copy (draft — set `needsReview` / review flags until the owner approves it)

**Title (two lines, setup → payoff):**
Know what happened?
Get paid to report it.

**Lead:**
Every Augur Lituus answer comes from someone with REP at stake. Report the right outcome first to earn the reward, or challenge a wrong one to win most of its bond. Taking part is optional, and a wrong call costs your bond.

**Card header:** “Augur Lituus” + a quiet “Example” tag next to it, so this is clearly illustrative and not a shipped app. Keep the status chip, the progress ticks, the question (the superconductivity query), the cutoff, the Resolution criteria disclosure and the outcome chips.

**Steps** (tab title / tab description / “Your REP” zone):

1. **A question opens** — “Any app can ask a multiple-choice question and pay a fee in REP. Part of that fee rewards whoever reports the right answer, and the reward grows the longer the question waits.”
   Zone: “Reward offered” with a meter that rises from 0 toward the 15 REP fee, plus the caption “Starts at 0 REP and rises until someone reports.” (§4.4.3). Status: Awaiting report.
2. **Report what happened** — “Stake REP equal to the fee on the outcome you saw. If no one challenges it, your bond comes back with the reward.”
   Zone, labelled “If you report”: [Your bond · 15 REP] → *No challenge* → [Bond back · 15 REP] + [Reward]. Status: Open to challenge. The ledger shows “Reported Yes · bond locked · 15 REP”.
3. **Challenge a wrong answer** — “Think a report is wrong? Stake double its bond on the right outcome. Each challenge doubles the bond again and restarts the appeal period.”
   Zone, labelled “You challenge”: [Double bond · 30 REP] → *Your answer holds* → [Bond back · 30 REP] + [Most of theirs · 12 REP]. Underneath, one Pewter line: “If you're overturned, you lose the bond. Most of it goes to whoever was right.” (Risk, folded in). The ledger shows “You challenged with No · bond locked · 30 REP”, and the Yes report is struck through.
4. **Get paid when it's final** — “When an appeal period ends without a new challenge, the latest answer is final. Winners are paid, and apps act on the answer.”
   Zone, labelled “You receive”: 30 REP bond back · 12 REP from the losing bond · the reward (you were first to back No). Add a small Pewter line, “The other 3 REP is burned.” only if it fits without crowding. Status: Final answer. The ledger ends with “Appeal period ended · No is final”.

The numbers are illustrative and internally consistent: fee 15, bond 15, challenge 30, 80% × 15 = 12, 20% = 3. Keep them in `src/data/walkthrough.ts` as the one source. Drop `Activity` amounts that repeat the zone if the card gets crowded. The zone is the payoff and the ledger is the history.

**Holder row:**
- Left (500): **Holding REP?** (h3, 32/40)
- Right (668): “You never have to report or challenge. If a dispute ever climbs to a fork, holders choose the universe they believe reflects reality.” Then the Outline button **Learn about REP** (`/rep/`) and the text link **Read the whitepaper ↗** (from `links.ts`).

Update the FAQ `rep-actions` answer only if it now contradicts this section. Don't write the same sentence in both places.

## Look and feel (the “serious, legit” read for projects)

- The card reads as product UI: tabular numerals on every REP amount, REP amounts in tags, square status dots, consistent 24 px paddings, hairline `--web-outline` dividers between header / body / outcomes / activity / Your REP. No decoration beyond the system.
- The “Your REP” zone sits on `--web-quiet` with a 2 px Green left rule, like the criteria body, so it reads as *your* panel. Squares: Green for what you gain, Pewter (`--mark-past`) for bonds, outlined for lost.
- Square corners, no shadows, no glow. Navy / Paper / Green only, from the existing tokens. Card height stays steady across all four steps. Measure, then set one `min-height` per breakpoint so tabs never make the page jump.

## Motion (follow `docs/motion.md` and the AGENTS motion rules)

- Tab changes keep the current panel swap (FLIP / View Transition with an instant fallback).
- “Your REP” reuses the REP-row loop language from `rep-choreography.ts`: the bond glides along the condition line, lands, and the winnings pop. Only the **active** panel's zone runs, on the 12 s cycle that opens and closes on the static artwork. It runs while visible, pauses when hidden or off-screen, and restarts from rest when the tab changes. Transform/opacity and SVG stroke draws only.
- Step 1's meter is a `scaleX` on a bar (compositor-only), easing from 0 to about 1/6 and back inside the cycle. It is never a width animation.
- Reload / history visit: no entrance replay; loops start at rest. Reduced motion, no-JS and print show final states: step 1 is the first panel, the meter sits at its resting fill and the flows are complete.
- Update `docs/motion.md` and `choreography.ts` / `rep-choreography.ts` so the keys match. Note the Figma node that will need the same keys.

## Responsive

- 1024: keep two columns (existing 1 : 1.15). The zone's flow may wrap its “+” group below the arrow.
- ≤767: steps stack above the card. The zone's flow becomes a vertical stack (stake ↓ condition ↓ outcome). The holder row stacks title over text.
- Check 1440, 1280, 1024, 768, 390 and 360 with no horizontal overflow and no dead columns.

## Accessibility

- Each zone flow is `role="img"` with a full-sentence `aria-label`, e.g. “If you report: stake 15 REP; if no one challenges, you get 15 REP back plus the reward.”
- The meter is decorative next to its text caption (`aria-hidden`).
- Struck-through items keep their sr-only “replaced” text.
- Forced colours: the latest ledger node and the gain squares keep Highlight.
- Focus order goes tabs → panel → criteria → holder links.

## Tests, checks, docs

- `tests/site.spec.mjs`: remove the `[data-bonds]` and `.rep .stake-row` tests. Add tests for:
  - four tabs, one visible panel, and a steady card height across tabs;
  - each panel's zone label and the aria-label text;
  - the active zone animating only while visible, and nothing animating at rest after a reload / with reduced motion;
  - the heading text;
  - no `.rep` section on the page.
- Update `tests/copy-check.test.ts` and the homepage copy source with the new strings, flagged for review.
- Run `bun run check`, `bun run build`, link/copy/budget checks and the launch guard. Use headless Edge screenshots of the section at all six widths (see the `edge-cdp-screenshots` memory) and scan every tab state for empty blocks.
- Explain in the commit message: what was merged, what was removed, the whitepaper sections behind each claim, why “Example” is on the card, and what stays unclaimed (an own UI, burn value).
- Add the Figma pending item in `docs/figma-workflow.md` (replace `28:7` How it works + REP frames). Update the `launch-checklist.md` review flags.
- Report only the checks you actually ran. Don't commit.
