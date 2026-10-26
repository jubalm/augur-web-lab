# Prompt: review the copy of “Know what happened? Get paid to report it.” (`/2/`)

Paste everything below the line into a fresh Claude Code session in this project, or say: “Read `docs/how-it-works-copy-review-prompt.md` and do it.”

---

Review every word in the homepage section `#how-it-works` on `/2/` against Ryan's and Augus's notes, then propose better copy. This is a review: don't edit any file, don't commit, don't push. The owner approves the copy first, and another session applies it.

**Setup**
- **Repo:** `C:\Users\edu45\OneDrive\Documentos\augur-web-lab` (read only).
- **Live:** https://augur-web-lab.vercel.app/2/#how-it-works shows the last pushed version. It may be behind the repo, so the repo wins.
- **Time:** about 45 minutes. If you expect more, say so up front.
- Follow `AGENTS.md` and the copy rules in `docs/plan.md`.

## 1. Read first

- **The copy:** `src/data/homepage-v2.ts`. `howItWorks.path` has the lead, the four steps, the button and the example. `holder` has Holding REP.
- **Shared sources:**
  - `stakedBehind` in `src/data/rep.ts`, which starts the lead
  - the example's question and figures in `src/data/walkthrough.ts`
  - the example's foot, `exampleFigures` and `proposedRules`, in `rep.ts`
  - Don't propose edits to these three. `/` and `/rep/` use them too.
- **How it renders:** `src/components/home/HowItWorks.astro`. It fills `{fee}`, `{bond}`, `{challenge}`, `{share}` and the answers from `walkthrough.ts`.
- **The notes:** `docs/plan.md`, "Appendix: the review notes", plus the reviewer wording `/2/` set aside.
- **Facts:** the January 2026 Augur Lituus whitepaper (see `docs/source-material.md`) and `docs/sources.md`. Every claim needs a section number.
- **An earlier brief for this section:** `docs/know-what-happened-prompt.md`. Its rules still apply. Its design has been replaced: the section is now four step tabs over one stage.

## 2. What to review, in reading order

1. The lead, under the fixed heading (the heading itself stays as it is).
2. The four steps, Ask, Report, Challenge and Get paid. For each:
   - the tab's name and its first line
   - the stage's claim, in two lines
   - the body line
   - the “In the example” figure and its label
3. The button: “Walk through an example” / “Hide the example”.
4. The example card:
   - the tag and the status
   - its labels
   - each row's event, note and amount
   - Paid out: each person, their note and their figure
   - the foot
5. Holding REP: the title, the two points (each a lead and a line) and “Learn about REP”.

## 3. The notes to answer

Mark each one applied, declined (say why) or open.

- **Ryan 12 (do):** too much detail for the main scroll; put the detail behind a click.
- **Ryan 13 and Augus 2 (do):** Holding REP says what REP is for and that holding it isn't passive.
  - Keep declining Ryan's “check in at least once a month”: the paper gives no cadence.
  - Keep Augus's “risk losing the token” reworded: REP left behind loses its value, and nothing takes it.
  - Never write “tokenomics”.
- **Ryan 17 and Augus 3:** show why lying is expensive: each challenge doubles the stake. Don't repeat the Robust card's ranking claim.
- **Ryan 16 (don't):** no split by reader. One section.
- **Augus, 18 October:** this is the consumer case, “how do I take part, how do I get rewarded”. A user should think “I can take part and get paid?”. A project should think the design looks serious and credible.
- **Augus's worry:** it may be too technical. Whitepaper terms (bond, appeal period, Reporter Pay, universe) belong only in the example, once each, with a plain explanation.
- **Open questions for Augus 10, 11 and 12:** the fork's “two weeks”, “Stake it to report or challenge” for beginners, and the payout figures living only in the example. Give your view on each.

## 4. Rules for every line

- Traders and beginners first. Never assume the reader owns an app or a project.
- **Person:** your moves speak to “you”; the system is in the third person. Keep “you” consistent: on the main scroll “you” report, and in the example “you” are the challenger. Say whether that switch confuses a cold reader.
- **Conditions:** every gain carries its condition, with the risk next to it.
- **No investment talk:**
  - “Get paid” and “earn” go with reporting and challenging, never with holding.
  - Nothing about buying REP.
  - On the main scroll: no percentages, APY, yield, returns, profit, price or value.
- **Nothing implied that isn't true:**
  - no duty to report or challenge
  - no guarantees
  - no shipped app or UI
  - no dates or readiness
- “Augur Lituus” always in full. Plain words: stake, challenge, final, reward.
- **One source per fact.** Figures come from `walkthrough.ts` and are never typed into the copy.
- **Fit:**
  - Each claim line fits one line at 1024: about 25 characters at 28 px.
  - Each body line is at most two lines at 1440.
  - No sentence fragments that need the tab to make sense.
- **Tone:** plain, the way a knowledgeable person talks. No em-dash asides, no “not X, but Y”, no clever wordplay.

## 5. Test it

- **Five-second test.** Give a fresh subagent only the closed section's text, in reading order, with no code and no brief. Ask:
  1. What can I do?
  2. What do I get if I'm right?
  3. What do I lose if I'm wrong?
  4. Do I have to do anything if I only hold REP?
  - Run it on the current copy and on yours, and report both sets of answers.
- **Example test.** Give a fresh subagent the example's text and ask: “What did ‘you’ get, and why?”

## 6. Report

1. **A table:** element | current | note or rule | verdict (keep, change) | proposed | why. The why names the note, rule or UX principle.
2. **The notes,** each marked applied, declined or open.
3. **The test answers,** before and after.
4. **A ready-to-paste block** of the proposed `path` and `holder` copy, in the shape `homepage-v2.ts` uses, with the word count of the closed section before and after.
5. **Questions for Augus,** only real ones, one line each.
