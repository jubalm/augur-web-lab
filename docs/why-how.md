# Design review changes — September 19, 2026

The user asked for a launch-readiness design review of the hero and this section. They then approved every design and UX change and one copy change: card 3's closing line now reads “Built for the day someone tries to buy the answer.” All other copy is unchanged.

- **Heading:** the section now uses the shared `HomeSection` heading, like every other homepage section (1.4 : 1 split, 112 px above, 56 px to the cards). In that narrower column the heading breaks as “Built for / high-stakes questions”, following the other sections' explicit breaks. The intro uses the shared 18 px lead. Aligning the intro to the third card column was the alternative; matching the other sections won.
- **Cards:** the animation stages are gone, so each card is a mark, a title and its description (229 px tall, down from 360). The animation briefs stay in the component source. Descriptions are 15 px, like the walkthrough steps. The strip's lines use the shared container outline (`--web-outline`) instead of a 4:1 line; the 5 px squares stay.
- **Marks:** redrawn at 32 px in the strip's vocabulary (1 px lines, 5 px squares, one green element each, muted gray): a ballot with one chosen option, a squared question mark with a green dot, and a fork whose green branch keeps its value while the hollow one is spent. In light mode the green is Deep.
- **Walkthrough:** its heading is a 36 px subsection heading, its step text uses the shared 15 px style, its example card uses the same outline as the strip, and its buttons use the shared 16 px label. The component's root for the example script is now an inner wrapper; behavior is unchanged.

This supersedes the heading layout, stages and marks described below. See [website strategy](website-strategy.md) for the hero changes and [verification](verification.md) for the checks.

# High-stakes cards after the DIA reference — September 19, 2026

The user asked to settle the copy before the layout, then shared DIA’s “Built for Vault Infrastructure” block (diadata.org): three cards, each a claim-style title and a short technical description, a concrete list, a one-line summary and a closing line. They approved the Augur Lituus equivalent below. The first trial copied DIA’s folder-tab frame, and the user asked for a box format of our own.

- **Heading:** “Built for high-stakes questions”. It replaces “Who decides what happened?” and “No one does. That’s the point.”
- **Lead:** “When money rides on an answer, someone will try to fake it. Augur Lituus, the next generation of Augur’s oracle, is designed to hold up anyway.” It keeps the first-mention naming rule.
- **Resolve any question:** “Elections, sports results, flight delays, scientific claims. One oracle for any multiple-choice question, including ones no data feed can answer.” §2 says the oracle answers any multiple-choice question; the kinds are illustrative, not integrations.
- **Question every answer:** “No committee, multisig or veto. Anyone can challenge any answer, and a challenge that holds wins almost all of the losing bonds. Secured by incentives, not authority.” §2 (no centralized backstops or vetoes; secured by economic incentives), §2.1 (almost all losing bonds go to winners) and the abstract (not decided by multisigs or governance).
- **Bribery-resistant by design:** “Escalating bonds, a last-resort fork, supply restoration. Forcing a false answer is designed to cost more than the oracle’s entire market cap. Built for the day someone tries to buy one.” The whitepaper’s title (“A Bribery-Resistant Group-Strategyproof Oracle”), §2.1 and §2.2. “Designed to” stays because the figure rests on the paper’s assumptions.
- The fact lines are gone; as in the reference, the specifics sit in each description. Descriptions use the secondary typeface (Schibsted Grotesk) at 14px. DIA’s monospace was not adopted, because the brand has no monospace face.
- **Frame:** the three cards join into one outlined strip, with a 5px square on each of the eight line crossings, after the hero’s squares. The list’s background shows through its 1px padding and gaps as the lines, so the strip reveals as one piece (`data-reveal` on the list, not per card). Each cell holds a 24px mark, the inset animation stage (at least 132px), the title and the description. Subgrid rows keep them level across the cells.
- **Marks:** first-pass inline glyphs in the component, decorative and hidden from assistive technology: a ballot with one chosen option, a pixel question mark with a green dot, and a fork whose green branch keeps its value while the dashed one is spent. They are not additions to the shared icon set.

This supersedes the compact reason cards below. The walkthrough is unchanged.

# Compact reason cards — September 19, 2026

The user found the top of the section too big and shared a reference: three bordered cards, each with a small icon, a title and a short technical description. They asked for something smaller that shows more, more clearly structured, and kept “No one does. That’s the point.”

- The heading now reads “Who decides what happened?” with “No one does. That’s the point.” as a muted second line, at the 50px size the other sections use (it was 64px). The heading column widened to 1.7fr so each sentence stays on one line at 1280 and 1440; the context paragraph sits beside it, aligned to the bottom.
- The three reasons are compact cards: a borderless 112px animation stage (`AnimationPlaceholder` `inset`, which keeps the brief in source but hides it), a 24px title, one sentence and a key-fact line under a thin rule with a green square. Facts: “No approval needed · Fees and bonds apply” (strategy p.7), “Each challenge doubles the bond” (§2.1: a dispute posts twice the previous bond) and “A fork is the last line of defense” (§2.1: an algorithmic fork is the backstop).
- Open to anyone’s qualification moved to its fact line. Challenges pay now reads “Think an answer is wrong? Challenge it. If your answer holds, you win almost all of the loser’s bond.” Attacks don’t pay is unchanged.
- The walkthrough starts 96px below the cards (was 128px). At 1440 × 900 the intro and cards take about 565px, against about 680px for the columns.

This revisits the September 18 rejection of bordered overview cards, at the user’s request and with their reference. The cards are smaller and carry the animation stage.

# Why + how copy: an answer, then three reasons — September 19, 2026

The user felt the section’s copy needed work and approved this rewrite after discussing it. The problems: the principles and steps repeated the hero (“Permissionless resolution. No central authority.”, “Anyone can…”) four times. “Permissionless” and “Decentralized” are claims every crypto project makes. The heading’s question went unanswered. “Allow challenges” was an awkward step name, and “appeal period” went unexplained.

- **Lead:** “No one does. That’s the point.” This answers the heading. The whitepaper abstract says that, when participants act rationally, truth is not decided by token holders, governance, multisigs or anyone else.
- **Context:** “Applications need answers about the real world, and when money rides on an answer, someone will try to fake it. Augur Lituus, the next generation of Augur’s oracle, is designed so anyone can answer, anyone can challenge, and lying costs more than it pays.” “Is designed so” keeps the development stage clear; §2 says an attacker always takes a loss within the protocol.
- **Open to anyone:** “Any application can ask a question. Anyone can report or challenge an answer. No approval needed; fees and bonds apply.” The strategy’s qualification (p.7) stays.
- **Challenges pay:** “Spot a wrong answer and you can profit by challenging it. Almost all of the loser’s bond goes to the winner.” (§2, §2.1)
- **Attacks don’t pay:** “Forcing a false answer is designed to cost more than the oracle’s entire market cap.” (§2.2; sentence unchanged)
- **Steps:** Report now reads “A reporter proposes an answer and locks REP, the protocol’s token, as a bond.” Step 03 is renamed Challenge: “A challenger can post a different answer with a larger bond.” It says “can” because the ordinary path has no challenge. Finalize reads “An answer becomes final if no one challenges it during its appeal period,” which explains the term the card uses.

The heading, walkthrough heading, example question and card behavior are unchanged. The walkthrough script tracks steps by index, so the rename needs no script change. This supersedes the principle titles and wording in the entry below.

# Principles replace Ask / Resolve / Act — September 19, 2026

The user asked whether Ask / Resolve / Act repeated the walkthrough below. It did: Ask was step 01, Resolve covered steps 02–04, and Act was the final scene. Possible applications now shows each application’s question and action, so the columns had no job left. At the user’s suggestion they now state what distinguishes Augur Lituus. The three are the emphases of the Website Strategy orientation brief (p.7): permissionless access, economic security and open work.

- **Permissionless:** “No approval needed. Any application can ask, and anyone can report or challenge an answer. Fees and bonds apply.” Strategy p.7 keeps the fees-and-bonds qualification; whitepaper §2 says anyone may pay a fee to activate the oracle.
- **Decentralized:** “No committee or multisig picks the answer. Anyone can profit by challenging a wrong one.” The abstract says truth is not decided by governance or multisigs, and §2 says anyone can profitably dispute a wrong outcome. §2.1 adds that almost all of the losers’ bonds go to winners. “Token vote” is deliberately absent, because a fork finalizes to the universe with the most migrated tokens (§2.2). “No central authority” was the working title, but it wrapped to two lines and misaligned the sentences.
- **Attack-resistant:** “Forcing a false answer is designed to cost more than the oracle’s entire market cap.” §2.2 gives an effective attack cost above 100% of market cap through the fork and supply restoration. The whitepaper’s title calls the oracle bribery-resistant. The figure depends on the paper’s stated assumptions, hence “designed to”. No comparison with other oracles is claimed.

A first version had **Open source** third. The user noted that open source is expected in crypto rather than a differentiator, so attack resistance replaced it; Current stage still says the work is open source.

Each column keeps a 3:2 animation placeholder (`AnimationPlaceholder.astro`) with a new brief. The line illustrations described in the entries below were already gone from the component. The walkthrough, intro and scroll reveals are unchanged. See [website strategy](website-strategy.md).

# Shared scroll motion — September 19, 2026

The scripted reading reveal (`data-reading-reveal`, IntersectionObserver, 240ms opacity/translation) is replaced by the shared CSS scroll motion in `src/styles/motion.css`. The introduction, Ask / Resolve / Act columns, walkthrough heading and its two columns now use `data-reveal` / `data-reveal-children`. Technical notes and question criteria animate open and closed. Example controls, Escape handling and lifecycle cleanup are unchanged. See [motion notes](motion.md).

# Visual polish below the first viewport — September 18, 2026

The user asked for a visual review of everything after the hero. These changes affect presentation only. Copy, walkthrough behavior and sources are unchanged.

- Each illustration's viewBox is cropped to its artwork, so its left edge meets the title and all three sit on one baseline. The paths and 1:1 scale are unchanged. Previously the drawings sat 10–22px inside the text edge at different heights.
- “One question. A path to an answer.” was smaller than the Ask / Resolve / Act titles (36px against 42px at 1440px wide). It is now 50px. “A resolution example” moved from the far right into a kicker above the heading. The overview and walkthrough are now 128px apart, so the walkthrough reads as the “how” half of the section.
- The section uses `text-wrap: pretty`, and the column measure is 34ch instead of 31ch. Act and step 03 no longer end on a single word. All three column sentences are two lines at 1280, 1440 and 1920px.
- The introduction has 16px more space before the illustrations.

Verification: light captures at 1280 × 720, 1440 × 900 and 1920 × 1080, plus dark at 1440 × 900, had no horizontal overflow. Illustration left edges and bottoms matched to the pixel. Keyboard Enter/Space still advanced the example to Final and Start again. A disclosure opened with Enter, and Escape closed it and returned focus to its summary. The example card stayed at 515px across all seven ordinary and challenge states. The browser logged no console errors. Check passed across 44 files with zero diagnostics, and all 10 pinned files verified. Build passed. A trial that aligned the walkthrough to the introduction's two-column grid was rejected: it wrapped the example question to three lines. Mobile remains deferred.

# Illustrated application overview — September 18, 2026

The user rejected the boxes and approved an icon/title/text composition based on their UMA screenshot. The application overview now has three open columns: Ask, Resolve and Act. Each contains one original line illustration, a short title and the approved single sentence. Card fills, enclosing borders, numbering and arrows between columns are removed. Larger titles and whitespace establish the hierarchy.

The inline SVG illustrations depict a question document, reports leading to a resolved outcome, and an application receiving that outcome. They are original website-specific vector compositions, not copied UMA assets or new shared icons. Neutral strokes and semantic surface fills adapt to both themes; the illustrations are static, decorative to assistive technology and require no script. Their accompanying copy states the meaning. The four-step walkthrough, source link and removed economic-defense section retain their previous behavior. This supersedes the boxed composition below.

Verification: desktop screenshots at 1280 × 720 were reviewed in light and dark. All three columns have transparent backgrounds and no enclosing borders; each inline illustration is hidden from assistive technology while its heading and explanatory sentence remain accessible. Fonts loaded, no horizontal overflow or browser errors were recorded, and keyboard Next/Previous still restores the first step with visible focus. The economic-defense section remains absent. Check passes across 44 files with zero diagnostics and all 10 pinned files verified; build passes with the existing large-chunk warning. `git diff --check`, the source/config portability scan and source PDF hash checks pass. No dependencies, motion or client behavior were added. Static SVG/HTML fallback was source-reviewed; the earlier script-blocked walkthrough check was not repeated for this presentation-only edit. Mobile remains deferred.

# Application context boxes — September 18, 2026

The user requested three boxes for application → Augur → application, each with a short explanation, and removal of “What makes dishonesty costly?” for now. The boxes now explain the submitted question and criteria, reports and challenges, and how an application uses the final outcome. Their ordered-list semantics, thin borders and connecting arrows keep the sequence readable without interaction or added animation. The copy restates the already sourced generalized-oracle role and resolution mechanism.

The economic-defense heading, all three diagrams, disclosures and section-specific styles are removed from the rendered homepage. Their research and earlier composition remain in the history below. The existing whitepaper citation is retained beneath the resolution walkthrough. The question example and its ordinary/challenged paths remain unchanged. This supersedes the three-part composition described below; audience-section recommendations have not yet been implemented.

Verification: desktop light/dark review at 1280 × 720 confirmed three equal-height boxes (167.33 px), readable connecting arrows and no horizontal overflow. The removed section is absent from the DOM. Keyboard advancement still updates the example; Tab reaches the relocated source link with visible focus. Fonts loaded and browser error logs were empty. Check and build pass; the existing large-chunk warning remains. The boxes are static HTML/CSS and add no motion or JavaScript; mobile and OS motion testing remain deferred. Source PDF hashes are unchanged, all 10 pinned outputs verify, and the source/config portability scan and `git diff --check` pass.

# A concise shared story for beginners and builders — September 18, 2026

The user approved a three-part explanation after reviewing the Generalized Augur article and both supplied research PDFs: the need for reliable outside answers, ordinary resolution with an optional challenge, and economic defense through bonds, forks and supply restoration. This supersedes the interaction and presentation histories below.

All four short process descriptions stay visible. The question card is optional to explore with direct steps, Previous, Next and restart. The ordinary path reports No because the example assumes qualifying independent replication is missing; no challenge arrives and the appeal period ends. “See a challenge” switches to a report of Yes that overlooks that requirement, followed by a 30 REP challenge to No, a new appeal period and then finality. Both paths are illustrative, not scientific results, live queries or elapsed protocol time. The returned-bond amount is distinct from additional rewards explained in the technical notes.

The separate principle row and long REP explanation are replaced by a short application → oracle → application sequence and three static economic-defense diagrams. Example bond bars preserve the 15:30:60 ratio; the fork threshold is not assigned an invented number. Native disclosures provide criteria, timing, fees, Invalid outcomes, bond rules, fork behavior and supply-restoration details. The proposed-design status and key economic dependencies stay visible. A new source citation opens the published whitepaper; the existing header/hero/external placeholders remain unchanged.

Scroll pinning, automatic scene progression and timed chart playback are removed. All primary content is readable immediately. JavaScript only adds optional example controls and finite 240 ms opacity/translation entrances; reduced-motion changes and page visibility cancel active animations. Native disclosures and the static reading path remain available without JavaScript.

## Source decision and mapping

- The user explicitly selected the **January 2026 Augur Lituus whitepaper** as the main reference. The supplied `main-1.pdf` is supporting research, not an adopted replacement specification. No comparative attack-cost percentages or guarantees are introduced.
- The May 13, 2025 [Generalized Augur article](https://www.augur.net/blog/generalized-augur/) supports the direction of making the oracle available beyond its own prediction markets. Its earlier PBFM terminology and proposed cross-chain architecture are not presented as current MBUFSR mechanics or supported integrations.
- January §§2, 4.0.1, 4.1, 4.3 and 4.5 support the question/report/appeal/finality path, REP definition, Invalid and example fees. §§4.3.1 and 4.4 support losing-bond redistribution, reporter pay and fee burning. The illustrated missing-replication scenario follows the already sourced Website Strategy criteria below.
- §§4.2.2–4.2.4 and 4.3.4 support migration, supply restoration, auctions and use subsidies. §§4.6, 6–7 and Appendix 2 provide the qualifications concerning external incentives, market conditions and demand for honest answers. The original oracle follows the migration winner; code does not independently establish ground truth.
- Where the appendix diagram abbreviates or differs from the numbered specification (for example its “total bond” label), the numbered specification controls this explanation. No fixed production timing, fees, returns, deployment or chain availability is promised.

## Verification — September 18

`bun run check` passed across 44 files with zero diagnostics and all 10 pinned registry outputs verified. `bun run build` passed; the existing large-chunk warning remains. Build and the localhost servers required the normal sandbox escalation for subprocess/socket restrictions.

Desktop review at 1280 × 720 covered light and dark themes, both example paths, direct steps, Previous, Next and restart. The example card remained 507.42 px high through every ordinary and challenge state with its criteria closed. The challenge path showed Yes with 15 REP, then No with a 30 REP challenge, then No after a further unchallenged appeal period. Keyboard checks confirmed visible focus, native disclosure opening, Escape dismissal/focus retention, and focus transfer to Next when Previous becomes disabled. Expanded criteria and restoration details stayed in document flow without clipping. Fonts loaded, no horizontal overflow was present and application error logs were empty.

The built page was also served temporarily with `Content-Security-Policy: script-src 'none'`. Browser inspection confirmed all four process explanations and the static diagrams remained readable, optional controls stayed hidden and a native disclosure opened with the keyboard. The temporary server was stopped after verification. Reduced-motion gating and cancellation were source-reviewed; browser/OS motion emulation was not available, so a live preference-switch pass is not claimed. Mobile remains deferred.

`git diff --check` passed. The production source/config scan found no machine-specific filesystem references. SHA-256 checks confirmed that both supplied research PDFs and the Brand Foundation PDF were unchanged. No pinned foundations, dependencies or secondary routes were added; nothing was committed or published. The development preview runs at `http://127.0.0.1:4322/`.

# Stable resolution walkthrough and automatic REP sequence — September 15, 2026

This refinement supersedes the interaction and presentation histories below. The resolution heading and both columns now share one sticky composition at 24px from the viewport top. Native scrolling uses an 840px hold with 220px step intervals; wheel interception is removed. Previous, Next, direct step buttons and Skip walkthrough provide alternatives to scrolling through every step. Overlapping grid cells reserve the space needed by every scene and explanation. Completed steps keep checkmarks without striking through their titles. Short windows retain manual controls.

The card emphasizes query status, the question, evidence cutoff, selected outcome and the REP amount beside its action. Resolution criteria open inside a contained overlay, preserving the card’s dimensions; close, Escape and outside-click dismissal are available. Without JavaScript the native disclosure expands in normal document flow. Status progresses through Open, Reporting and Appeal open. Submitting a different challenge shows Disputed; a separate Finish appeal period action demonstrates the unchallenged period ending before Closed. Controls remain a local walkthrough, with no live query, token transfer or elapsed-time claim.

The REP chart automatically grows four bars in sequence when at least 35% enters view. The finite sequence lasts about 4.6 seconds, retains earlier bars and offers Pause/Resume and Replay. It pauses offscreen or in hidden tabs. Introductory headings and principles receive a small, one-time entrance; scrolling back never conceals already-read content. Reduced motion and disabled JavaScript retain static content. The FAQ-style safeguards and “Behind the explanation” source block are removed; concise fork mechanics and economic assumptions stay beside the REP explanation.

## Updated copy provenance

- The superconductivity criteria follow the current Website Strategy PDF, p.12, and its matching `projects/augur-website-strategy/output/pdf/augur-strategy/sections/05-example.tex` under the optional reference root. Evidence must be public strictly before 2027-09-08 00:00 UTC; measurements require at least 293.15 K (20°C), 90–110 kPa absolute pressure, zero electrical resistance within disclosed uncertainty and the Meissner effect. The original experiment and separate-institution replication require no shared authors, independent samples, and published methods, measurements and uncertainty. Papers or public preprints qualify; announcements or levitation videos alone do not. All requirements yield Yes; missing replication or other unmet requirements yield No. These are proposed example criteria, not a scientific result.
- The [January 2026 Augur Lituus whitepaper](https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf), §4.5, supplies the **15 REP** query fee/reporting bond and **30 REP** first appeal. **60 REP** and **120 REP** follow §4.1’s doubling rule. The visible note identifies the whitepaper example; these are not live protocol fees. Invalid and finality semantics follow §§4.0.1, 4.1 and 4.3. Status labels are explanatory UI wording, not claimed contract enum names.
- Source originals were read only. The Lituus PDF retains SHA-256 `2b0370ecdc25ea318098b3412238a79f4b3fd39d02b74d2b3f4db4fccae6f070`; the current Website Strategy PDF is `88f1c65ee83a6aee026861ec038ae5c6d5c11d8e9bac79388d1e79fd8d9db08d`.

# Separate page movement and step changes — September 15, 2026

The user rejected simultaneous page movement and scene advancement, plus the sensitivity of the 480px sequence. Resolution now has separate arrival, pinned interaction and departure phases. The page brings the complete composition to a central pin without changing steps. A deliberate vertical wheel gesture advances one step, with a 100px normalized threshold, a 220ms quiet interval between gestures, and momentum absorbed after a transition. Direction changes begin a reverse gesture. At either endpoint, a fresh outward gesture releases ordinary page scrolling. Zoom gestures, horizontal scrolling and noncancelable events pass through. No body overflow lock or idle timer is used.

Native keyboard/scrollbar navigation remains available through longer 560–900px step intervals (85% of the viewport height within those bounds). Direct step and report/challenge controls still work; short windows retain manual controls. Motion starts only after arrival at the pin. The earlier center-entry progress and continuous progress fill are superseded.

The REP chart is now a round explorer: the first bar enters once, then Next round grows exactly one new bar while earlier bonds remain visible. Each bar is a native selectable button with its ratio, round name, pressed state and associated explanation. Selecting another round cancels any existing bar animation. Page scrolling does not change the selected round. Start again resets the chart. The 1:2:4:8 ratios remain; no absolute REP amount or fork threshold is invented. The fork explanation is a native disclosure to keep the graph and controls compact. Without JavaScript, all bars remain visible and the explanatory fork disclosure works. Reduced motion shows all bars and skips growth effects while retaining selection.

Validation: isolated tests of the actual initializer cover separate arrival/departure, fixed panel geometry, large and small gestures, momentum suppression, reverse gestures, end releases, wheel units, zoom/horizontal pass-through, native navigation, direct controls, outcomes/focus, one active bar animation, reduced motion, short-window fallback, cancellation and page lifecycle. Browser visual QA remains pending: the in-app tab still reports the previously blocked error URL; no alternative surface was used.

# Reading-center motion and reporting card — September 15, 2026

The user requested earlier scroll progression, a more refined protocol card, removal of the chapter label and selected explanatory copy, and visible motion in the introduction and REP section. The visible “02 · Why + how” line and section divider are removed. This supersedes the interaction details below.

The first step starts progressing when its heading approaches the viewport reading center. The complete composition pins centrally once it fits. The total progression is 480px; the pinned distance subtracts the earlier entry movement so no extra dead space is introduced. Completed headings retain strikethrough/checkmarks. Manual selections align to the same progression. Layout/font changes remeasure the largest scene; short windows and enlarged content fall back to manual controls.

The card now separates its workspace toolbar, scroll progress, question/status, expandable criteria, outcome selection and action row. Native Yes/No/Invalid choices remain; the same outcome cannot challenge itself. Compact square buttons reuse the existing upstream button classes and website control treatment. REP bond requirements sit next to actions. The user-requested bond warning and visible “Interactive preview”/step caption are removed; the figure remains accessibly identified as a local demonstration, and surrounding content identifies the proposed protocol. No wallet, transaction, invented balances or real scientific result is connected. Finality still assumes a further appeal period passes without another challenge.

Headline lines and the three principles become fully visible as they reach the reading area. The REP chart grows its four relative bars with scroll position and reverses on upward scrolling. Motion uses transforms/opacity with one coalesced scroll frame; there are no timers, idle loops, new dependencies or React hydration. Reduced motion shows full text/bars and discrete progress, and no-JavaScript content remains static and readable. Visibility and page lifecycle handlers cancel pending work.

Validation: check/build and isolated actual-initializer tests cover the earlier center trigger, shared distance, forward/reverse/jump scrolling, report/challenge outcome selection, same-outcome exclusion, focus transfer, reversible reading/chart motion, reduced motion, short-window fallback, batching and cleanup. Browser visual verification remains pending because the current in-app tab is still on the previously blocked error page; a user reopen was requested. No visual pass is claimed.

# Compact reporting preview — September 15, 2026

The user rejected the large spaces between steps and requested completion styling and a more realistic question interface. Both columns now pin as one compact unit for a shared 420px scroll distance. The four step titles stay together, completed titles receive a fine strikethrough and checkmark, and the current explanation expands in place. This supersedes the tall per-step scrolling below. The sticky top is 32px; the homepage header is not fixed.

The existing superconductivity question is retained. The prominent “A hypothetical example” and “Imagine…” prose are removed. Its replacement is a product-style panel with status, criteria, native Yes/No/Invalid choices, REP bond requirements, Report an outcome, Submit report, Submit challenge and Explore again controls. Reporting is the protocol term; it is not presented as a governance vote. All controls change only the local preview: no wallet connection, network write, real report or token transfer. A small “Interactive preview” caption and the surrounding proposed-protocol context distinguish this composition from a deployed application. The displayed query still requires a complete specification before any real submission.

Changing the report disables that same outcome in the challenge picker. Final outcome follows the selected challenge, assuming its appeal period passes without another challenge; the UI's compressed progression is not elapsed protocol time. Keyboard focus transfers into newly opened controls and out of any scene hidden by scrolling. Timed autoplay has been removed. Short viewports retain click controls. Reduced motion removes transitions; the no-JavaScript page retains all four explanations and a static question panel.

Check and build pass; the existing bundle warning remains. An isolated test of the actual initializer passes forward/reverse progression, completion states, outcome selection and same-outcome exclusion, report/challenge actions, focus transfer, frame batching, reduced motion, small-window fallback, bond replay and cleanup/restoration. Static output checks confirm four local-only buttons, six native radio controls, unique IDs and the removed copy. Desktop visual and browser interaction QA is still pending: the in-app tab remains on the error URL blocked by browser policy. The user was asked asynchronously to reopen the preview; no workaround or alternate browser surface was used.

# Why + how — September 15 scroll refinement

The resolution walkthrough now follows ordinary desktop page scrolling. When the complete diagram fits below the header (at least 1000px wide), it stays sticky beside four spaced explanations. The explanation nearest the diagram's center selects 01–04 in either direction. There is no scroll locking, wheel interception or timed advancement in this mode. Clicking a step aligns its text with the diagram. Short windows, larger text and narrower layouts retain the compact manual/timed walkthrough.

All scene heights are measured together so changing steps does not resize the diagram. Resize, font loading and restored scroll positions resynchronize the selection. Reduced motion retains scroll selection without transition effects; scroll changes do not trigger live-region announcements. Pending frames and effects stop when hidden or offscreen, and listeners/observers are cleaned up on exit. Without JavaScript, the compact static content remains.

Validation: check passes (44 files, no diagnostics), build passes (existing large-chunk warning), and an isolated test of the actual initializer covers forward/reverse scrolling, large jumps, manual alignment, frame batching, short-window fallback, reduced-motion changes, hidden/offscreen stopping and back/forward-cache restoration. The prior manual/timer and bond-animation contracts also pass. **Desktop visual, dark-theme and browser interaction review remain unverified:** the in-app browser still reports the same error-page URL blocked in the first iteration. No alternate browser surface was used. Mobile remains deferred.

# First iteration, September 14, 2026

Requested directly for the homepage after the completed Introduction. Implemented as a local Astro section at `/#protocol`, without a new page or shared foundation changes. This is a website draft for review, not an approval or deployment of the protocol.

## Composition and behavior

- “Who decides what happened?” introduces the oracle problem. Three short principles give concrete meaning to permissionless, decentralized and trustless.
- Four manual steps and a finite, user-started walkthrough show question → report → challenge → final outcome. All four explanatory paragraphs stay visible. The existing superconductivity example is retained as an expressly hypothetical claim lacking qualifying independent reproduction by a specified deadline. It is not a scientific finding, a live query or a complete query specification.
- REP has a dedicated explanation: query fees, reporter pay, bond losses and redistribution, burning, and the dependence of security on continued demand and participation.
- A second illustration animates relative bonds (1×, 2×, 4×, 8×), once on entry or on replay. No token amounts or fork threshold are invented. The fork explanation covers branches, migration and supply restoration through auctions.
- Native disclosures add invalid outcomes, economic assumptions, and application responsibilities. No return, safety, attack-cost percentage or audited-deployment guarantee is made.
- Motion uses the browser's Web Animations API and a cancellable timer. It stops offscreen, in a hidden document, on reduced-motion changes and on page exit. No new library or React hydration. Reduced motion retains manual selection and removes autoplay/replay controls. Without JavaScript, four explanations, a static question diagram, static bond chart and native disclosures remain available.
- Sora/Schibsted, neutral typography, semantic colors, fine rules, square controls and restrained green continue the existing website. Responsive stacking prevents a fixed desktop canvas, but mobile design and QA remain deferred.
- Existing structure-review destinations remain inert. The paper edition and section references are printed in the section; “Explore the full mechanism” is a placeholder for deeper reading. No deleted secondary route is restored, and the completed hero is unchanged.

## Sources and distinctions

The current Brand Foundation PDF, version 1.0 / September 7, 2026, controls identity and graphic language. Reviewed p.25 visually and typography text from pp.22–23. Existing user-directed website exceptions (neutral type and bright green accents) remain in force; no generated tokens or registry material were edited.

Primary mechanism source: [Augur Lituus whitepaper](https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf), **A Bribery-Resistant Group-Strategyproof Oracle**, Ryan Garner and Philip Monastirsky, January 2026. Local reading copy: `whitepapers/augur-lituus-whitepaper.pdf` under the optional reference root. Process summary on p.4 was visually reviewed; relevant sections were read in full. Public repository location and the [January 29 release explanation](https://www.augur.net/blog/the-augur-lituus-whitepaper/) were checked on September 14.

| Explanation | Paper support |
| --- | --- |
| Open query creation, REP's role | §2 and §4.0.1 |
| Initial bond, doubling, appeal periods, fork threshold | §4.1 and §4.2.1 |
| One-way migration, inaction, customer/value assumptions | §2.2 and §4.2.2 |
| Supply restoration, auction, total-migration winner | §§4.2.3–4.2.4 |
| No-appeal finality and invalid outcomes | §4.3 |
| Losing bonds, redistribution and burning without a fork | §4.3.1 |
| Query fee, reporter pay, remaining fee burned | §§4.4.2–4.4.4 |

The paper uses REP for the proposed revenue-correlated asset. This section is not migration guidance for historical REP deployments. Final outcome denotes the result selected by the protocol's rules; it does not imply that code can independently recognize ground truth. In particular, the original oracle follows the fork with the most total migration. Expectations of honest-fork value and use are assumptions, stated in the disclosure and REP explanation.

Source SHA-256 values before and after the task:

- Lituus paper: `2b0370ecdc25ea318098b3412238a79f4b3fd39d02b74d2b3f4db4fccae6f070`
- Brand Foundation: `5b6eeacad3d8b81a276c57602573a02d30877c40969453e945ba83b79eecf016`

## Verification

- `bun run check`: 44 files, zero errors/warnings/hints; pinned registry check passed.
- `bun run build`: passes. Existing large hero chunk warning remains. The sandbox initially blocked esbuild process communication; the authorized build succeeded outside it.
- An isolated fixture ran the actual exported motion initializer with mock browser primitives: all four selections, finite replay completion, stop, rapid selection, offscreen stop, single chart entry, chart replay, reduced-motion changes during playback, hidden-document stop and event cleanup passed. This is a logic contract test, not a browser interaction test.
- Development-page DOM inspection confirmed the section, all four steps, accessible control names, disclosures, example qualification and source edition. At 1280×720, fonts were loaded and the initial DOM measurement found no horizontal overflow.
- **Desktop visual and interaction QA is incomplete.** The in-app browser initially timed out on screenshot/click/scroll calls, then a failed preview connection left it on a browser error URL that its security policy blocked. Further browser work stopped after that explicit block. No successful post-change screenshot, dark-theme review, keyboard-focus check or native reduced-motion/JavaScript-disabled browser pass is claimed. Static and isolated checks do not replace these reviews.
- No source originals, dependencies, pinned foundations, logos or production asset paths were changed. No commit, push or publication.
