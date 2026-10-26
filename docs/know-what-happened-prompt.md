# Prompt: redesign “Know what happened? Get paid to report it.” (`/2/`)

Paste everything below the line into a fresh Claude Code session in this project, or say: “Read `docs/know-what-happened-prompt.md` and do it.”

---

Redesign the homepage section `#how-it-works`, “Know what happened? Get paid to report it.”, on `/2/` only. This is item 4 of `docs/plan.md`.
- Follow the plan's **Rules every chat follows**, **Size and spacing standards** and **Section review**, and `AGENTS.md`.
- Where this brief and the item's older goal differ, this brief wins.

**Setup**
- **Repo:** `C:\Users\edu45\OneDrive\Documentos\augur-web-lab`. Edit there.
- **Build and preview:** the mirror, `C:\Users\edu45\Documents\augur-web-lab`.
- **Before:** https://augur-web-lab.vercel.app/2/#how-it-works is what's deployed now. Look at it at 1440 before you start.
- **Time:** about 2 hours, including the review. If you expect more, say so up front.

**How to work**
- Decide and build.
- When a note conflicts with UX sense, say so in one line, name the principle, and go with the better option.
- Don't commit or push.

## 1. The job

A trader who has never heard of REP reads this section for five seconds and thinks: “Wait, I can take part in this and get paid?” Everything beyond that sits behind one click.

## 2. Readers

| Reader | Arrives asking | Leaves knowing |
| --- | --- | --- |
| Trader or beginner (first) | “Who answers these questions? Could it be me?” | What they can do, what they get if they’re right, what they lose if they’re wrong, and that holding REP asks nothing of them day to day |
| Builder or project (second) | “Is this serious?” | The rules are exact, and the example looks like real product UI. Credibility comes from craft, not from more words |

**The five-second test** (pass or fail): looking only at the closed section, a cold reader can answer all four:
- What can I do?
- What do I get if I’m right?
- What do I lose if I’m wrong?
- Do I have to do anything if I only hold REP?

## 3. What's wrong now

Measured on the deployed `/2/` at 1440, 25 October 2026.

- **Too long.** It's the tallest section on the page: 1268 px of 6955. It has 255 words, 167 of them in one card. Ryan 12 asked for less.
- **The reader only watches.** The copy narrates in the third person (“The first report stakes a bond…”). The heading gives the reader a job, but the card makes them a spectator.
- **The story undercuts the headline.** In the example the reporter is wrong. So the first big figure under “Paid out” is “Reporter · YES −15 REP”: a section that says “Get paid to report it” ends on a reporter losing their stake (peak–end rule).
- **Nothing leads.** There are four equal columns of muted text and a thin track. A status chip repeats the stop names.
- **It opens technical.** The first thing in the card is a two-line physics question with a UTC cutoff, the technical feel Augus worried about.
- **Hidden text.** While the scene plays, the stops it hasn't reached sit at 35% opacity, too faint to read.
- **Holding REP is all negatives.** “Holding REP?” is three of them: “Nothing / No rewards / Only in a fork”. It says what REP can't do. The v2 copy written for Ryan 13 (`homeV2.holder.points`) isn't shown anywhere.
- **The fork is buried.** It's the one thing a holder must act on, and it sits in a 14 px footnote under the card.

**Keep**
- The heading and its Green “paid” underline.
- The four stops, from asking to the final answer. The owner said on 25 October: “show the whole process from asking to getting a final answer and the middle stuff”.
- The whitepaper's example numbers, from `walkthrough.ts`.
- The “Example” label.

## 4. Notes to answer

In your report, mark each note applied, declined (with the reason) or open.
- **Ryan 12 (do):** there's too much detail for the main scroll. Show it only to people who ask for it.
- **Ryan 13 and Augus 2 (do):** Holding REP should say what REP is for (stake it to report or challenge, and earn) and that holding it isn't passive (forks).
  - Decline Ryan's “check in at least once a month”. The whitepaper gives no cadence, and checking monthly could miss a two-week window.
  - Reword Augus's “risk losing the token”. REP left behind loses its value; nothing takes it away.
  - Never write “tokenomics”: Ryan doesn't like the word.
- **Augus, 18 October:** this is the consumer case: “how do I take part, how do I get rewarded”.
  - Projects should come away thinking it's serious and credible. That comes from how exact the example is.
  - “Their own UI” has no source, so the card stays an example.
- **The owner, 25 October:** the whole process stays on the main scroll, middle steps included.
- **Ryan 17 and Augus 3:** show why lying gets expensive: each challenge doubles the stake. Don't repeat the ranking claim. The Robust card already says it once.
- **Augus's worry that it's too technical:** whitepaper terms appear only inside the example.
- **Ryan 16 (don't):** no split by reader. It stays one section.

## 5. Direction

The idea is **one path, with you on it.**
- The closed section says the rule in words, on one line.
- The example shows one question with real numbers.
- Start here. Change it only for a reason you can name.

**The closed section, top to bottom:**
1. **The heading row.** The title goes in the 500 column; a short lead goes in the 668 column.
2. **The path,** across the full 1248 px.
   - Four stops sit on one line: Ask, Report, Challenge and Get paid.
   - Between the stops, short Pewter labels name the waits: “Reward grows”, “Time to challenge”, “Time to challenge”. These are the middle steps the owner asked for.
   - Report and Challenge are the reader's moves, so they carry the weight. Give them more width than the other two stops, about 3 to 2.
   - Ask and Get paid are what happens around those moves.
3. **One native disclosure button,** right under the path: “Walk through an example”.
4. **The example card.** It's closed by default and opens below the button, so the button never moves.
5. **The Holding REP row,** last.

**Visual rules:**
- **The path has no card around it:** whitespace groups it.
  - The example is the only card. Make it a Navy card in the same family as the product cards in “What can Augur Lituus power?” on `/2/`: a header, a title, its data, then a footer with the result. A card then always means one real case.
- **Only these marks are Green:**
  - the “paid” underline
  - a hollow Green square for each move you can make: Report, Challenge (two squares, showing the doubled stake) and the fork point in Holding REP
  - a solid Green square at Get paid, plus the payout figure in the example
  - Everything else is Paper, Pewter or a hairline.
- **Text at each stop:** a verb as the title, in Paper. Under it, one line: the setup in Pewter, the payoff in Paper (the pattern the Why Augur closer uses).
  - At most two lines at 1440 and 1280, and three at 1024.
  - If a line runs longer, cut words. Never shrink the type below 16 px.
- **No step numbers:** the line already shows the order. **No hover on stops:** they aren't controls.
- **Figures:** tabular numerals, with a no-break space before “REP”.
- **Size budget at 1440:**
  - Closed: no more than 800 px tall (now 1268) and 150 words counted from the section's `innerText` (now 255, counted the same way).
  - Opening the example adds no more than 560 px.
  - Measure both and report them.
- **The owner's taste,** from five rounds on item 3: grids of squares, extra tonal zones, meters and stacks of chips read as noise. Fewer marks and more whitespace won every time.
- **Layout:**
  - no dead space in any state
  - no ragged feet
  - gaps on the 4 px scale

## 6. Research first (20 minutes, then decide)

Study how others explain staking, disputes and payouts to newcomers, and how good sites put detail behind a click. Bring back five to eight bullets, each something to copy or to avoid, in your report. Don't write a new doc.
- **Reality.eth:** the closest mechanism to this one. Each new answer must at least double the bond, and the last answer stands once a timeout passes. How does it make doubling feel simple?
- **UMA's Optimistic Oracle,** as Polymarket uses it: propose, a challenge period, a dispute, then settle. How does it keep the quiet path apart from the dispute?
- **Kleros, on becoming a juror:** how does it sell taking part and earning without talking about yield, and where does it put the risk?
- **ethereum.org's staking page:** the REP page already follows it. It orders the options by commitment and puts the risk beside the reward.
- **NN/g's “Progressive disclosure” and the GOV.UK Design System's “Details” component:** what earns a place on the main scroll, and what only some readers need.
- **lawsofux.com,** for decisions rather than decoration:
  - Peak–end rule: the story ends with the reader getting paid.
  - Von Restorff effect: Green marks only the reader's moves and the payout.
  - Hick's law: one control and one link.
  - Chunking: four stops, one idea each.
  - Goal-gradient effect: the path visibly heads to “Get paid”.
  - Law of proximity: every gain sits next to its risk.
  - Tesler's law: the bond maths has to live somewhere, so it lives in the example.
  - Aesthetic–usability effect: aligned figures and exact spacing are what make a project trust it.

## 7. Copy

This is a draft. Flag it for review, and improve on it if you can.

**Rules, on top of AGENTS.md and the plan's copy rules:**
- **Person:** the moves speak to “you” (“Stake REP on what happened”). The system is described in the third person.
- **Plain words on the main scroll:** stake, challenge, final, reward.
  - “Bond”, “appeal period”, “Reporter Pay”, “universe” and “fork threshold” may appear only inside the example: once each, with a plain explanation.
  - Use one noun for what a person puts up, across the whole section. The REP page and the FAQ say “bond”, so the example links the two words once.
- **Conditions:** every gain carries its condition in the same sentence (“If your answer holds…”), with the risk next to it.
- **No investment talk:**
  - “Get paid” and “earn” go with reporting and challenging, never with holding.
  - None of these on the main scroll: percentages, APY, yield, returns, profit, price or value.
  - In the example, REP amounts carry the story. Add a percentage for the question only if the cold read shows people can't tell what “+12 REP” means, and then only next to the loss.
- **No buying pitch:** never tell people to buy REP, or where to get it.

**Draft copy:**
- **Title (keep):** Know what happened? / Get paid to report it.
- **Lead:** “Every Augur Lituus answer has REP staked behind it. Be right and you’re paid. Be wrong and you lose your stake.”
  - The REP page's hero has the same clause. Keep it in one place in the code.
  - Fallback: the current lead, “Stake REP on what you saw. A wrong call costs your bond.”
- **The path:**
  - **Ask:** “Anyone can ask. A fee in REP funds the reward.”
  - **Report:** “Stake REP on what happened. If your answer holds, you get your stake back plus the reward.”
  - **Challenge:** “Think it’s wrong? Stake double on the right answer. If it holds, you win most of theirs.”
  - **Get paid:** “The answer is final, and whoever backed it is paid.”
- **The button:** “Walk through an example” / “Hide the example”.
- **The example card.** The numbers come from `walkthrough.ts`, and “you” are the challenger who turns out to be right.
  - **Header:** “Augur Lituus”, the “Example” tag, and the status “Final answer”.
  - **Question:** the superconductivity question and its cutoff (`query`). Behind the click, its length is fine. Don't reuse the questions from the use cases.
  - **Rows, in order:**
    1. The question is asked, with a 15 REP fee. The reward starts at 0 REP and rises toward the fee until someone reports.
    2. Someone reports YES and stakes 15 REP.
    3. You challenge with NO and stake 30 REP. That's double their stake, and the time to challenge starts again.
    4. NO is final.
  - **Paid out, with you first:**
    - You: +12 REP, in Green, with your 30 REP back and the reward.
    - The reporter: −15 REP.
    - Burned: 3 REP.
  - **Foot:** “Figures follow the whitepaper’s own example, a 15 REP fee.” Then the REP page's sentence, “These are the proposed rules: Augur Lituus is in development.”, imported from `rep.ts` rather than retyped.
- **Holding REP?** (an h3), with “Learn about REP” (`/rep/`), the section's only link. Two points:
  - **Put it to work, if you want.** Stake it to report or challenge, and earn when your answer holds.
  - **Watch for forks.** If one starts, Augur Lituus is designed to give you two weeks to move your REP. REP left behind loses its value.

With the section closed, this draft comes to about 148 words, so it fits the 150-word budget with almost nothing to spare. Any new line has to replace an old one.

**Facts you may use.** They come from the January 2026 Augur Lituus whitepaper. Open the PDF before you add anything else, and record new sources in `docs/sources.md`.
- **Asking:** anyone pays a fee in REP to ask a multiple-choice question. “Invalid” is always one of the outcomes (§2, §4.0.1, §4.4.2).
- **The reward (Reporter Pay):** it goes to the first person to report the outcome that becomes final. It starts at 0 REP and rises over time, up to the whole fee. Anyone can add a tip (§4.4.3).
  - Don't print the challenger's reward amount unless §4.4.3 says how it's set when the first report is overturned.
- **Stakes:** the first report's stake equals the fee. Each challenge backs a different outcome with double the previous stake, which restarts the appeal period. When a period ends with no new stake, the latest answer is final (§2, §4.1).
- **Payouts:**
  - Winners get 80% of the losing stakes, shared in proportion. The other 20% is burned. Visible copy says “most” (§4.3.1).
  - If no one challenges, the reporter gets the stake back plus the reward. Any part of the fee that isn't paid out is burned (§4.0.2, §4.5).
- **Forks:** a stake that would pass the fork threshold starts a fork.
  - The proposed design gives a two-week, one-way window to move REP (§2.2, §4.2).
  - The paper says REP that isn't moved “is effectively destroyed”. Write “loses its value” (§4.2.2).
- **Holding:** holding REP alone earns nothing (§4.4.4).
- **Off limits:**
  - a shipped app or UI
  - readiness or dates
  - any length of time other than the fork's two weeks
  - burning described as a dividend, or as adding value
  - any duty to report or challenge

## 8. Motion

**The closed path plays once per tab session.** It starts when 60% of it is in view:
1. The line draws from left to right (scaleX, with the draw easing). Each square pops as the line reaches it.
2. At Challenge, the second square slides out of the first: the stake doubling.
3. At Get paid, the solid Green square lands, and the heading's “paid” underline draws on the same beat.

**Rules for that motion:**
- At most 2.4 s in all.
- Animate the marks, never the words: the text is fully readable from the first frame.
- It settles on any pointer or key input in the section. It also settles when the page is hidden, when it leaves the screen, and under reduced motion.
- It never replays on a reload or a back visit: follow `seen.ts` and read the navigation type.
- Without JavaScript, with reduced motion and in print, it shows the final frame.
- Animate only transform and opacity. Timings go in `src/motion/timelines.ts` as one new entry, using the easings in `docs/motion.md`.

**Opening the example:**
- The content below moves down instantly, or with a same-document View Transition if that stays smooth. Never animate the height.
- The card's rows rise 8 px and fade in, 110 ms apart, and the payout figure lands last. At most 900 ms in all, and instant under reduced motion.
- The chevron rotates. Closing is instant, and focus stays on the button.

**Retiring the old scene:**
- Remove `how-life-v2.js` and `howLifeTimeline` if nothing else uses them.
- Keep the page-field `ResizeObserver` that file carries. The field layer can grow but never shrink on its own, and opening or closing the example changes the page height.

## 9. Interaction, access and states

- **The control:** a native button with `aria-expanded` and `aria-controls`. Without JavaScript, the button is hidden and the example is shown.
- **The path:** an ordered list. The track and squares are `aria-hidden`. No meaning depends on Green alone, because the words say “you”.
- **The hero's “See how it works” button** lands on the section with the whole path in the first screen at 1366 × 768. It doesn't open the example.
- **The button's states:** hover, focus-visible and active match the site's outline button. The pointer cursor appears only on controls.
- **Forced colours:** the card gets a border, and the move squares use the Highlight colour.
- **Tab order:** the button, then the example when it's open, then “Learn about REP”.

## 10. Scope

- **Change `/2/` only:**
  - Markup: replace the `life` branch in `HowItWorks.astro`. It sits behind `ownerVersion(variant)`.
  - Copy: `howItWorks` and `holder` in `src/data/homepage-v2.ts`.
  - Styles: replace the `.life` and `.hold` rules in `src/styles/home-v2-only.css`.
  - Script: inline, through `review-inline.ts`. Test it in the build preview (:4330), because the Content-Security-Policy hashes only exist in the build.
- **Don't change:**
  - the strings in `walkthrough.ts` and `rep.ts`, which `/` and `/rep/` use
  - v1's walkthrough
  - `how-it-works-v2.js`, which v3 and v4 use
  - `RepFlow`
- **Keep** `id="how-it-works"` and `#how-heading`.
- **Desktop first:** 1440, 1280 and 1024 wide, plus 1440 × 900 and 1366 × 768.
  - Below 1024, stack the path vertically on a rail at the left, with no overflow.
  - Polishing phones waits for item 25.
- **Figma:** add one pending entry to `docs/figma-workflow.md`. Don't touch Figma itself.

## 11. Done means

- **A cold read.** Give a fresh subagent only the screenshot of the closed section at 1440, with no code and no brief, and ask it the four questions in section 2.
  - It passes if it gets all four right, including that holding is optional.
  - Then show it the open screenshot and ask: “What did ‘you’ get, and why?”
- **Numbers, before and after:** the closed height, the word count, the number of Green marks and the open height.
- **Screenshots** of the closed and open states at 1440, 1280 and 1024, plus one at 1366 × 768.
- **Checks:**
  - The plan's section review passes.
  - `bun run check` passes, with no console errors.
  - A diff of the two `dist` builds shows that only `dist/2/index.html` changed.
- **Honesty:** report only the checks you actually ran, and name the ones you couldn't run. Playwright doesn't start on this machine.
- **Report in this order:**
  1. the screenshots and numbers
  2. the notes, each marked applied, declined or open
  3. the research bullets
  4. open questions for Augus, only if they're real

## 12. Don't

- Add a second card, tabs, a meter, a chart, bond bars or a grid of squares to the closed state.
- Put a number on the main scroll that needs a footnote.
- Make holding REP sound like income, or a fork sound like something that takes your REP away.
- Dim, blur or delay text to stage the motion.
- Add a second link or a second call to action.
- Bring back the walkthrough tabs, the old card's columns of paragraphs, or a decisions log.
