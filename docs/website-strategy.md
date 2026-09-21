# Resolution Machine lab redesign — September 20, 2026

The user authorized completing the alternative homepage and delegated design decisions.
The full proposal is at `/lab/homepage-redesign/`; `/` and `/contact/` retain their
existing compositions. The lab and hidden chooser link to the proposal.

A finite hero diagram leads into the application/oracle relationship, an asymmetric
principles section, a dark interactive walkthrough, an optional bond-round explorer,
compact application routes and a vertical development timeline. Blog, FAQ, header and
footer reuse the sourced website components. The hero Explore action navigates to the
walkthrough on this proposal. Other intentional destination placeholders remain.

The proposal brings the brief's bond explanation into a native disclosure; it does not
restore the previously removed standalone economic-defense section on `/`. No new
runtime dependency, shared token fork, route promotion or publication was made.
[Current direction, source mapping and checks](homepage-redesign-brief.md).

# Design review: hero and Why + how — September 19, 2026

The user asked for a critical, launch-readiness review of the first viewport and the section below it, then approved every design and UX change. Of the copy suggestions, only card 3's closing line changed (“…tries to buy the answer.”); the hero headline, support lines and section copy are unchanged.

- **Hero:** it still fills the first screen below the header. The review's suggestion to shorten it so the next section's heading showed above the fold was tried and reverted at the user's request: the half-visible heading read as the second section leaking into the first viewport. Below 940 px wide the hero subtracts the two-row header (125 px) instead of 96 px. Every heritage square is now 3 px. Both support lines use the shared 18 px lead, 20 px above 1600 px wide. The hover underline on “decentralized” is removed (it read as a link); the arrival underline still plays once. This supersedes the September 14 headline hover entry below.
- **Hero actions:** Read the whitepaper opens the published January 2026 paper in a new tab (shared URL in `src/lib/links.ts`); Explore Augur Lituus stays a placeholder. Both labels are 16 px.
- **Accessibility:** the headline's lines are separated by spaces in the HTML. Signal Loom keeps its Tab stop, because Escape there pauses its motion, but is announced as “Animation: scattered strands gathering into one pattern” instead of an internal name.
- **Header:** below 940 px wide the menus move to a second row under the logo; the header no longer pushes the page sideways at tablet widths.
- **Shared roles:** one container outline, 16 px labels on every 48 px button, one 18 px lead, one 15 px small text size, a 3 / 5 px square scale and Deep for meaningful light-mode accents. They are recorded in [design system notes](design-system.md). The lead and button changes also reach the other homepage sections, Contact and the lab.

Section details are in [section notes](why-how.md).

# Built for high-stakes questions — September 19, 2026

The user chose to settle Why + how’s copy before its layout, then approved an Augur Lituus version of DIA’s “Built for Vault Infrastructure” block. The section now opens “Built for high-stakes questions”, replacing “Who decides what happened?”, and its cards read Resolve any question, Question every answer and Bribery-resistant by design. Each card has a claim-style title and a short technical description sourced to the January 2026 whitepaper; the fact lines are gone. The user rejected a first frame that copied DIA’s folder tabs. The cards now join into one outlined strip with a small square on every line crossing, taken from the hero’s squares. The walkthrough and the rest of the homepage are unchanged. Wording, sources and frame details are in [section notes](why-how.md).

# Animation placeholders and an application picker — September 19, 2026

The user pointed out that the homepage read as text only and asked for animation placeholders. `AnimationPlaceholder.astro` reserves the space for a planned animation: a dashed frame with a faint square grid, an “Animation placeholder” tag and a one-line brief of what the animation should show. Frames sit above the three Why + how columns (3:2) and in each application example (5:2). They are static, add no script or dependency, and are replaced whole by the finished animation. The adjacent copy carries the meaning, so the finished piece can be decorative. The briefs are working art direction, not approved copy. The hero’s Signal Loom, the walkthrough card and the Current stage timeline already provide visuals and are unchanged.

Possible applications then changed twice the same day. The user noted it repeated Why + how’s composition, a heading over three boxes in a row; stacked rows followed, which the user found bloated. The section now shows one example at a time. Tabs choose Prediction markets, Insurance and payments or DAOs and grants. The panel gives the example question and, on one line, the application’s action, beside a wide 5:2 animation frame lined up under the aside. To reduce height, the user removed the panel’s Explore Augur Lituus link and its field labels. Native radios drive the tabs, so they need no script and work with Tab and arrow keys. Panels share one grid cell, so switching never moves the page. Where anchor positioning is supported, the green underline slides between tabs.

At the user’s direction the section covers Augur Lituus only. The custom oracle designs example (Zoltar, Augur Stratoblast) is removed, and the three examples, questions and actions now follow Website Strategy Figure F5 (p.10), which carries this section’s heading. “Before you build” and its Talk to us line are removed at the user’s request. This supersedes the Possible applications description in the entry below.

The user then asked whether Ask / Resolve / Act repeated the walkthrough. It did, so at the user’s suggestion Why + how’s columns now answer “Who decides what happened?” with an answer and three reasons. The intro now opens “No one does. That’s the point.”, and the columns read Open to anyone, Challenges pay and Attacks don’t pay, so the section no longer repeats the hero’s “permissionless” and “no central authority”. Earlier same-day versions used Permissionless / Decentralized / Open source, then Attack-resistant; open source was dropped as expected in crypto. Sources are the strategy’s orientation emphases (p.7) and the whitepaper abstract, §2, §2.1 and §2.2. The user then found the top of the section too big and shared a card reference: the answer became the heading’s muted second line at the standard 50px, and the three reasons became compact cards with an inset animation stage, a title, one sentence and a sourced key fact. Wording and sources are recorded in [section notes](why-how.md).

# Established scroll motion — September 19, 2026

At the user’s request, motion is established before further copy and structure work: sections fade and rise into view in order, Current stage draws its timeline, and page disclosures open smoothly. It is CSS-only, driven by attributes and scroll position, and static without support or with reduced motion. The system and its vocabulary are recorded in [motion notes](motion.md). Tuning the motion itself is deferred.

# Remaining homepage sections — September 19, 2026

The user asked for the rest of the homepage. `/` now continues after Why + how with the approved plan: **Possible applications → Current stage → From the blog → FAQ → Footer / contact**. Each section is a static Astro component sharing one frame and heading pattern (`HomeSection.astro`); there is no new script, dependency or route. Headings are smaller than “Who decides what happened?” so Why + how stays the main explanation.

- **Possible applications** (`#applications`) uses the Website Strategy pp.8 and 10 use cases and example questions: prediction markets, event-dependent payments and custom oracle designs on Zoltar, labeled illustrative with no established integrations. A compact “Before you build” row gives the strategy’s three fit questions and a working Talk to us link.
- **Current stage** (`#roadmap`) separates Completed, In progress and Next with dates and evidence beside each item, reviewed against the live augur.net blog and the public Lituus-CS repository on September 19, 2026. It shows “No date announced”; the internal six-month estimate is not published. Augur Stratoblast’s role follows the internal strategy (F2) and needs maintainer confirmation.
- **From the blog** (`#journal`) features two useful posts with original titles, dates and author: July 21, 2026 and January 29, 2026. Descriptions are summaries.
- **FAQ** (`#faq`) answers the three planned questions from public sources in native closed-by-default disclosures. The relationship answer reuses “the next generation of Augur’s oracle”.
- **Footer** (`#footer`) holds the Talk to us invitation, a directory mirroring the header and the Lituus Foundation’s funding/coordination role. It is outside `<main>` through a new `footer` slot in `Website.astro`; Contact does not use it.

Structure-review rules still apply: product, resource, article, evidence and community links are inert placeholders (`TextLink.astro` renders an href only when a destination is built); intended URLs stay in component source. Only `/contact/` and the logo navigate. The lab briefs, homepage sequence and Markdown export describe the built sections. Mobile remains deferred.

# Augur and Augur Lituus naming — September 19, 2026

The user chose to position Augur Lituus as the next generation of Augur’s oracle. **Augur** names the project as a whole: brand, community, REP, history and oracle infrastructure in general. **Augur Lituus** names only the oracle protocol from the January 2026 whitepaper, which is in development; always use the full name, never “Lituus” alone. The first mention of Augur Lituus on a page says how it relates to Augur, using “the next generation of Augur’s oracle”. Why + how’s introduction now uses that phrase; the primary hero action reads “Explore Augur Lituus” instead of “Explore the protocol”; the default page description leads with Augur. Products and Resources still show names only, as previously decided. The successor framing is a user positioning decision; no migration path, v2 deprecation or timeline is implied.

# Open illustrated application overview — September 18, 2026

After rejecting the boxes, the user approved three open illustration/title/text columns inspired by the supplied UMA reference: Ask / Resolve / Act, with one sentence each. Original static line illustrations explain the application’s journey. Enclosing borders, backgrounds, numbering and arrows between columns are removed. The detailed walkthrough stays below, and economic defense remains removed. This supersedes the boxed overview below; see [section notes](why-how.md).

# Application boxes and a shorter Why + how — September 18, 2026

The user replaced the application → oracle → application strip with three connected boxes containing short contextual descriptions. “What makes dishonesty costly?” and its diagrams/details are removed for now. The four-step example remains; the January whitepaper citation moves beneath it. This supersedes the economic-defense portion of the preceding iteration. The proposed reporter/builder sections are still recommendations, not implemented additions. See [section notes](why-how.md).

# Concise Why + how story — September 18, 2026

The user approved the source-informed simplification for beginners with optional depth for experienced builders. The January 2026 whitepaper remains the main reference. “Who decides what happened?” now leads into application → oracle → application, four always-readable resolution steps, and one optional example with ordinary and challenged paths. The separate principle row and REP essay are replaced by three compact diagrams: capital at risk, competing branches and supply restoration. Technical notes sit beside their concepts, with a new working whitepaper citation. Existing hero/navigation placeholders remain unchanged. Scroll pinning and automatic progression are removed; the reading path is complete without interaction. See [section notes](why-how.md) for source mapping and verification. This supersedes the histories below and does not authorize any other route.

# Stable resolution composition and optional walkthrough — September 15, 2026

The resolution heading and both columns now pin together at 24px. Ordinary scrolling advances the four steps through an 840px hold; Previous, Next, direct step choices and Skip walkthrough give visitors control over the pace. The card and explanations reserve stable space, criteria open inside the card, and prominent status/outcome information distinguishes an open query, a submitted report, a dispute and a closed result. A submitted challenge has a separate appeal-period completion action. Completed step labels remain readable without strikethrough.

The existing strategy supplies precise superconductivity criteria and the fixed evidence cutoff. REP bonds now display 15, 30, 60 and 120 REP, explicitly based on the whitepaper’s worked example and doubling rule. The chart plays a finite sequence automatically on entry, with Pause/Resume and Replay. Introductory motion runs once and leaves read content visible. The FAQ-style material inside Why + how and the “Behind the explanation” block are removed; concise fork mechanics remain beside the chart. This supersedes the interaction and section-presentation histories below. [Section notes](why-how.md) record behavior and exact copy provenance.

# Deliberate steps and interactive bond rounds — September 15, 2026

The resolution composition now settles at a central pin before step changes. One deliberate wheel gesture advances one step, with trailing momentum absorbed; the page resumes on a fresh outward gesture at either endpoint. Longer native intervals preserve keyboard/scrollbar navigation. The REP chart introduces one bar and then uses Next round or selectable bars to explain each bond increase. The fork details are expandable. This supersedes continuous scroll-driven chart growth and the earlier pre-pin advancement. [Section notes](why-how.md) record behavior and verification.

# Reading-center progression and motion — September 15, 2026

The user removed the visible Why + how chapter label, 02 and divider. The walkthrough starts near the viewport reading center and then pins centrally. Its refined card uses expandable criteria, outcome controls and compact actions beside REP requirements; the selected warning and preview footer are removed. Headline/principle reveals and the REP bars now follow scroll position, with static reduced-motion/no-JavaScript presentation. This supersedes the interaction details below; the section's role in the homepage plan remains. [Section notes](why-how.md) record the local-only behavior and validation.

# Compact Why + how interaction — September 15, 2026

The user rejected the tall step spacing. A compact list and question panel now stay together through one short scroll sequence. Completed steps receive a fine strikethrough/checkmark; the current explanation opens in place. The question panel now offers native outcome choices and local report/challenge actions with REP bond requirements. Prominent hypothetical-example copy and timed playback are removed. The small Interactive preview caption identifies the demonstration; no wallet or transaction is connected. [Section notes](why-how.md) record behavior and verification. This supersedes the spaced-step design below.

# Why + how scroll progression — September 15, 2026

The user requested 01 → 02 → 03 → 04 progression while scrolling. The desktop diagram now stays beside the matching explanation and reverses when scrolling upward. Native page scrolling sets the pace, with no wheel interception. The layout uses sticky positioning only if the full diagram fits beneath the header; shorter windows retain manual controls. Reduced motion switches instantly. See [section notes](why-how.md) for validation and the continuing browser-review limitation.

# Why + how first iteration — September 14, 2026

The user requested implementation directly below the completed Introduction. `/#protocol` now explains the oracle problem, open participation and REP through a hypothetical four-step resolution walkthrough and a second animated bond-escalation illustration. Expandable details cover invalid queries, forks, assumptions and application responsibilities. Content follows the January 2026 Augur Lituus proposal; it makes no guarantee of correctness, safety or audited readiness. Existing destination placeholders and the hero remain unchanged. See [the section notes](why-how.md) for source mapping and verification, including the incomplete browser visual review.

# Concise homepage plan — September 14, 2026

The user approved six main sections: **Introduction → Why + how → Possible applications → Current stage → From the blog → FAQ**, followed by a compact **Footer / contact**. The latest refinement adds a short FAQ after Blog to the earlier five-section consolidation. This replaces the ten-section plan in the lab. Introduction and the first Why + how iteration are built on `/`; the following sections remain proposals.

Why + how carries one existing illustrative question through the problem and proposed Augur Lituus mechanism. Evidence belongs beside its explanation or status claim. A small Learn invitation closes Why + how; Learn and FAQ remain planned pages and navigation/footer destinations. Essential answers stay in context, while the compact homepage FAQ handles remaining doubts. Current stage stays brief and factual. From the blog features two selected, reviewed reads with titles, dates, short descriptions and “View all posts”; selection favors usefulness over recency. A reviewed Learn guide could later join that selection with a Guide label. The closing Talk to us invitation lives inside the footer.

The homepage FAQ starts with three proposed questions: how today’s Augur relates to its earlier prediction markets, REP’s role, and whether someone can build with Augur today. Answers still need sourcing and review. Keep three or four native expandable answers, closed by default, with two or three sentences each and “View all FAQs” leading to the planned FAQ page. Preserve keyboard and no-JavaScript access, and retain historical, version and development context.

Size sections around their content and remove repeated copy rather than assigning each a full viewport. The lab entry, homepage briefs, section map, audience destinations and Markdown export reflect this decision. Retired problem, evidence, Learn/FAQ and standalone contact brief IDs are removed. Planned pages, sourced product qualifications, external placeholders and the live homepage remain unchanged.

# Moving navbar dropdown — September 14, 2026

The requested hover refinement gives Products, Resources and Community one shared background and outline. Switching menus moves the box and resizes its height over 300 ms, with the new labels travelling inside it. Rapid reversals start from the box's current position. Initial hover retains the 100 ms intent delay; leaving a menu allows 180 ms to cross into its panel or another trigger before closing. Keyboard focus inside a menu keeps it available. Click/touch activation, Escape and outside-click dismissal remain; reduced motion switches immediately and cancels active motion. Native disclosures retain their own static panels without JavaScript. This is local to the shared Home/Contact header; content, destinations and shared foundations are unchanged.

# User Flow presentation refinement — September 14, 2026

The lab User Flow removes link underlines, repeated chapter labels and the user-specified explanatory notes and proposal link. Audience labels expand to CEO / decision-maker and CTO / builder. The homepage description is shorter, and all callouts use the AI readability note’s muted surface, left rule and padding. The latest refinement moves the hover highlight onto individual section links inside Orient, Understand, Evaluate and Continue. Each link gets a padded rectangular hover/focus surface. The larger stage boxes, map container, audience cards, question rows and callouts keep their backgrounds unchanged. Existing disclosure/control hover behavior and keyboard focus remain. The shared data keeps the Markdown export aligned with the content changes.

# Journey questions and the full homepage — September 14, 2026

The audience order is OG Member, CEO, CTO, Newcomer, REP holder. Newcomer names unfamiliarity with Augur without implying lack of technical skill. AI assistant is now a shared readability callout covering HTML, reviewed sources, versions/dates and proposed `/llms.txt` plus Markdown explanations/documentation.

Homepage is the entire sequence from Arrive and orient to Provide a dependable directory. Arrive and orient is the first viewport, containing the header and hero. The journey map shows that containment and the existing ten-section order. Each audience has a direct route and question / homepage answer / optional next destination rows. These are content-planning hypotheses; visitors can skip sections, stop after finding an answer or enter a deeper page directly. Essential answers belong with the topic, with FAQ supporting a specific remaining question. This supersedes the earlier shared `00 · Homepage` start and fixed four-step audience paths; it changes the lab planning document and export only.

# Simple navbar dropdowns — September 14, 2026

The user removed the descriptions under every navbar link. Products and Resources now show names only; Community retains its service icons and names. All three menus use the same compact 240 px square panel, 8 px panel inset and 48 px rows with 12 px internal padding. Removed the per-item dividing lines; a thin outer border, generous hit areas and the existing hover/focus surface identify the menu and each choice.

The same centered row layout aligns labels, service icons and trailing arrows. Whitepaper's arrow now centers beside its single-line label, with the same right inset as Community arrows. Product and Resources labels line up with their trigger. Existing disclosure timing, keyboard/Escape behavior and reduced-motion rules remain. All outgoing destinations remain inert placeholders; internal navigation still works. The lab briefs and export reflect the simpler presentation. No shared foundation, source content or navigation destination is changed.

# Structure review: placeholder external actions — September 14, 2026

The user clarified that this site is for review of website structure only. All external links and actions remain placeholders: the two hero actions, Whitepaper, Community, Contact socials, Discord and direct email have no outgoing hrefs. Their labels, icons and proposed visual states remain for review. Internal routes, menus and theme controls remain usable. Send message demonstrates local validation but neither submits data nor opens an email app; fields stay disabled without JavaScript so the form cannot fall through to a native submission. This supersedes earlier working-external-link and email-handoff decisions below.

Resources now contains Blog / FAQ / Learn / REP / Whitepaper. The user removed Brand assets after the initial addition. Whitepaper’s description identifies Augur Lituus. Its existing 20 px arrow is centered vertically beside the complete title-and-description block in a fixed right column. A block-level SVG removes inline baseline spacing; the icon geometry and standard item padding remain intact. The existing external-arrow treatment is retained as proposed destination design, without enabling navigation. No asset download or new resource route is added. Lab briefs and the Markdown export describe the review behavior.

Intended paper and social URLs remain in repository source notes for later implementation. Re-enabling outbound navigation or contact delivery requires a new user request. The shared website-only placeholder styling preserves button appearance while actual disabled/loading controls retain their existing treatment.

# About in navigation — September 14, 2026

The user approved replacing Developers with About and placing it first: About / Products / Resources / Community, with Talk to us retained on the right. The shared header applies to `/` and `/contact/`. About is a standalone item without a dropdown, retaining the existing disabled-placeholder treatment until `/about/` is built. Products, Resources and Community keep their existing dropdowns.

The planned About page introduces Augur's current purpose and direction before its history. Developers can return when there are useful docs or integration instructions with a distinct role beyond Products. The lab's first-viewport, Homepage and About briefs and their generated Markdown export reflect this decision. No new website route is implemented by this navigation change.

# Hero copy — September 14, 2026

The user selected “Permissionless resolution. No central authority.” followed by “Augur is decentralized oracle infrastructure for establishing truth onchain. Anyone can submit a question, propose an answer, or challenge an outcome.” The first viewport now explains participation directly, avoids “real-world” and does not lead with prediction markets. The user explicitly leaves development status to the planned roadmap, removing “in development” / “we’re building” from hero copy. This supersedes earlier instructions to identify the development stage in the introduction; the roadmap remains planned rather than implemented.

The latest user refinement makes Augur the subject and describes its broader oracle infrastructure before listing participation. This supersedes the earlier Lituus-specific introduction. It follows the user-reviewed Generalized Augur article (May 13, 2025), the Augur Lituus whitepaper announcement (January 29, 2026), and the supplied January 2026 whitepaper, especially §§2 and 4. Product-specific papers still govern fees, bonds, valid query parameters and security assumptions. No deployment, security milestone or common resolution mechanism across all products is inferred. The first-viewport and Home lab briefs, their generated Markdown export and the animation creative brief reflect the approved wording.

# Headline hover underline — September 14, 2026

The user approved a hover response on “decentralized”. After the existing entrance settles, its same Green underline draws left to right over 250 ms, remains visible while hovered and fades out over 180 ms on departure. The horizontal scale resets only after the fade, ready for the next hover. The word stays stationary and uses the normal arrow cursor, with no link, new focus stop or added script. Fine-pointer/hover media queries limit the treatment to suitable input; reduced motion shows and hides the line instantly. Without JavaScript, the existing entrance marker is absent and the decoration stays static. The first-viewport and Home lab briefs/export describe the change.

# Artwork cursor refinement — September 14, 2026

At the user's request, the shared Signal Loom keeps the normal arrow cursor during hover and dragging on both the homepage and lab. Removed its grab/grabbing cursor treatments; the square illumination and existing hover, click, drag and keyboard interactions remain available. Link and button cursor conventions are unchanged.

# Heritage square background trial — September 14, 2026

The user approved trying a subtle square background inspired by their screenshot of the old augur.net. The homepage hero now has an incomplete, deterministic grid of small squares concentrated around the outer edges, clearing the central reading and artwork area. Light mode uses Augur Green throughout; dark mode uses muted Paper and occasional Green. The pattern is generated as decorative SVG at build time, uses the current website colors, and does not intercept input.

The latest user refinement makes scintillation easier to see and adds cursor illumination. Squares now have independent 2.6–5.4-second opacity cycles, with roughly twice the earlier peak brightness and a dimmer trough. A soft 200 CSS-pixel radius reveals brighter copies of nearby squares as the cursor moves. The light has a gradual radial falloff, arrives over 120 ms and fades over 450 ms on departure. It illuminates only the existing grid; the central clear area and all input targets retain their layout. A single SVG mask follows pointer coordinates through the SVG's actual screen transform, keeping the radius consistent across desktop sizes. Pointer events request at most one update per frame; no pointer-following idle loop is added.

The latest light-mode refinement replaces the gray and darkened green specks with pure Augur Green, including their cursor highlights. Light squares pulse at 1.82–3.78 seconds, briefly grow to 1.35 times their size and fade fully away between appearances; the opacity multiplier remains 1.6. Dark mode retains its original colors, opacity and twinkle timing. Reduced motion and disabled JavaScript show static green squares in light mode.

The user has authorized the decorative animation loop for this experiment. The existing 1.6-second entrance and 0.5-second delay remain. CSS owns the twinkle, while the controller pauses it offscreen and in hidden tabs, clears the cursor light on pointer departure/cancellation, scrolling, resizing and reduced-motion changes, handles history restoration, and removes listeners on departure. Reduced motion and disabled JavaScript leave the squares static without cursor illumination; touch does not activate the pointer effect. Forced colors hides the decoration. This is an approved website-specific heritage experiment alongside Signal Loom, not a new shared identity rule. The supplied screenshot is the visual reference; no archived marketing copy or source image is shipped. The Home and first-viewport lab briefs and their generated export describe the trial. Footer reuse remains a proposal.

# Signal Loom restored — September 14, 2026

At the user's request, the homepage again uses the existing Signal Loom beside the copy, with its prior tonal background and soft artwork edge. The shared component and continuous interaction remain the same as the lab. The entrance adds a green underline beneath “decentralized”: it draws once, briefly holds, and fades on each fresh visit or refresh. Reduced motion skips the entrance and keeps the loom static. This supersedes the empty-artwork decision below; Common Aperture remains deleted. The lab Home brief and its generated export reflect this change.

# Common Aperture removed — September 13, 2026

The user rejected Common Aperture and requested its deletion. Its homepage artwork, lab study, component, geometry, renderer and controller are removed. The homepage retains its header, copy, actions and text arrival with an empty artwork area. Signal Loom remains available only in the lab; Animation 02 is a placeholder again. This supersedes earlier homepage animation notes below.

# Current planning decision — page consolidation, September 13, 2026

The user removed the extra Prelaunch scope chapter from the lab as noise. Keep the existing four chapters: Journeys, Homepage sequence, Pages & destinations, and Future changes. Do not add a scope dashboard or replacement section. The planned website pages are **Home, About, Products, Learn, Blog, FAQ, REP and Contact**. Home and Contact are built; the others still need implementation. Learn, REP and FAQ are included during R&D, not deferred or conditional on launch.

**Products** is one planned page with three sections in the existing order: Augur Lituus, Zoltar and Augur Stratoblast. The name matches the navigation. Its single lab brief replaces the old menu-only Products brief and three individual product briefs. Each content row names a product, gives its sourced role and identifies what its section should explain. The planned `/products/` page can support direct section links from the existing menu when implemented. Product-specific whitepapers and technical references belong alongside their explanations.

The user’s numbered removals refer to the previous list: 08 Developers, 10 Educational articles, 12 Blog article / quarterly report, 13 Updates & quarterly reports, and 16 Papers & sources. These entries are removed from the lab and export. Learn owns its guide content, Blog owns article pages, updates and quarterly reports, and Products owns product explanations and source links. All journeys and map links point to the surviving briefs; removed fragment IDs are not retained as hidden duplicate content.

Developers is the only possible later page. It currently duplicates the technical overview in Products and has no docs, manual or instructions to provide; it does not need a separate brief. A later Developers destination would need a distinct function. About explains the project’s purpose, current direction and history, with links to Products. REP owns version and holder context; FAQ owns concise answers; Learn owns structured explanations. Community remains direct external links.

Augur is in R&D, with launch estimated roughly six months away. The estimate remains provisional planning context rather than a public date. Historical accounts and reports retain dates; paper links retain edition/version context. These planning changes do not implement new website routes or alter the shared header. They supersede the earlier four-page recommendation and its deferrals. No publication, new product claim or shared-foundation change is included.

# Previous refinement — simple navbar transitions, September 13, 2026

The shared header on `/` and `/contact/` adds a 180 ms opacity fade and 6 px vertical slide when Products, Resources and Community open or close. Menu-item hover and keyboard-focus surfaces fade over the same duration, matching the existing chevron and underline timing. CSS `::details-content` retains closing content for the exit transition; browsers without that support retain instant native disclosure. Reduced motion removes all header transitions. Native named-details grouping, hover delays, click, focus and Escape handlers remain in place. No animation dependency or foundation change is added.

# Previous refinement — Resources order and product descriptions, September 13, 2026

Resources now contains Blog, FAQ, Learn and REP, in that order. Research and History are removed from the menu at the user’s request. Products retains its three names and adds the existing metadata treatment beneath each: “Resolution for real-world outcomes” for Augur Lituus; “Shared foundation for oracles” for Zoltar; “Prediction markets on Zoltar” for Augur Stratoblast. The shared header applies on `/` and `/contact/`; destinations remain placeholders. Lab notes and their Markdown export reflect the refinement.

Descriptions condense the approved hero copy and the supplied website strategy source (`projects/augur-website-strategy/output/pdf/augur-strategy/sections/01-strategy.tex`, F2 product hierarchy; `strategy/augur-competitive-strategy-review.md`, September 9 scope update). These describe product roles, not release readiness. The source spells the prediction-market product “Augur Statoblast”; retain the user’s requested “Augur Stratoblast” spelling in the menu. Source originals were read only.

# Current refinement — Community navigation, September 13, 2026

The user approved Products / Developers / Resources / Community as the main navigation on `/` and `/contact/`, with Talk to us retained. Blog and FAQ move inside Resources after Learn, REP, Research and History; these local destinations remain unwired placeholders. Community provides working external links to Discord, Telegram, X and GitHub, in that order, with existing Bold service icons and a trailing ↗ (`arrow-up-right`) on every link. This supersedes earlier top-level Blog / FAQ arrangements.

Community reuses the existing native named-details dropdown and its hover, click, keyboard and Escape behavior. The four URLs are shared with Contact in `src/lib/community.ts`, retaining the official destinations already sourced from augur.net. The related lab journeys, briefs and Markdown export reflect the new navigation. No secondary page is restored; mobile design and QA remain deferred.

# Current refinement — lab synchronization, September 13, 2026

The user asked for the lab to follow recent website changes. The lab entry, journey map, homepage/contact notes, product briefs and Markdown export now describe the current Products navigation, Talk to us action, email-app handoff and hero treatment. Products has a built-menu brief and three proposed product briefs, with no invented product URLs or capabilities. The existing Augur Lituus lab fragment `page-protocol` is retained for link compatibility.

Contact now welcomes questions about “our products”; its metadata describes Augur products instead of only Augur Lituus. Its fields, single inbox, socials and email composition behavior retain the approved scope. When future website changes alter navigation, page content or behavior, update the related lab journeys, briefs and export in the same change. Current scope is shared between the flow page and export through `websiteScope`; historical verification entries below remain historical evidence.

# Current refinement — Products navigation, September 13, 2026

The user replaced the umbrella “Protocol” navigation label with “Products”, naming Augur Lituus, Zoltar and Augur Stratoblast in that order. The shared header on `/` and `/contact/` exposes those names in a dropdown using the existing Resources presentation and disclosure behavior. Product destinations remain unwired placeholders; no product route, description or readiness claim is added. Native named details keep only one header dropdown open at a time, including without JavaScript. The hero’s “Explore the protocol” action still describes its specific Augur Lituus overview destination. This user decision supersedes the earlier Website Strategy p.6 header label.

# Previous refinement — compact header, September 13, 2026

The user requested a shorter header, smaller logo, larger navigation text, a better theme-control position and “Talk to us” in place of “Contact us.” The shared website header is now 96 px tall on desktop (previously 112 px), with the supplied logo at 150 px wide (previously 168 px). Brand Foundation pp.11–12 require that minimum width and one lowercase-a height of vertical clearspace; 96 px preserves both. Navigation, resource titles and the contact action use a local 16 px size while retaining the existing typography roles. The 44 px sun/moon control sits directly before the outlined Talk to us action with a 16 px gap, without a vertical divider. The homepage hero's viewport calculation follows the revised header height.

Protocol, Developers, Resources, Blog and FAQ retain the approved centered arrangement, with equal flexible side columns. This applies to `/` and `/contact/`; placeholder destinations, Resources behavior, contact routing and stored theme preferences are retained. It is a composition refinement, not a measured usability improvement. Mobile design and QA remain deferred.

# Current addition — contact page, September 13, 2026

The user approved the header contact action and a dedicated `/contact/` page, using the existing website header and `Website.astro`. The latest refinement removes the topic selector and the multiple-address section, uses a single `contact@augur.net` address, labels the action “Send message”, and fits the default desktop page within one viewport. Name and Email share a row; optional Company / project and Website share the next, followed by the full-width Message field. Name, Email and Message remain required. The page reuses the pinned Input and Button, existing typography and 48 px website control treatments. Four Bold social logos come from the same pinned Phosphor revision; no icon dependency was added. Social destination URLs remain the public augur.net footer links reviewed September 13.

Discord retains “A quick question? Start on Discord.” and an Ask on Discord action, emphasizing an easy ongoing conversation without a response-time guarantee. Telegram, GitHub and X form a compact row of labeled icons. A single “Prefer email?” line links to `contact@augur.net`. This user-selected address replaces the earlier technical, partnership and press aliases; the domain owner must provision or confirm the inbox before release. No email administration service is connected here.

The user removed the explanatory note beneath “Send message”. The handler validates required fields and optional HTTP(S) website URLs, encodes a general Augur inquiry subject and all supplied fields into a `mailto:` URI addressed to `contact@augur.net`, and preserves the text for copying if the email app does not open. It never claims successful delivery. Errors remain associated with each field and focus moves to the first invalid field. No preview UI, backend, request or draft storage was added. The static fieldset stays disabled until the handoff handler is installed; without JavaScript, direct email and community links remain available. Website-native sending still requires a delivery endpoint.

The desktop composition centers within the space below the 96 px header, using paired fields, a 128 px message area, shorter copy and compact spacing. It uses minimum viewport height and natural content flow; there is no fixed-height clipping or hidden overflow. Unusually short windows, enlarged text, validation feedback and a manually enlarged textarea may increase page height. Mobile design and QA remain deferred.

This request authorizes `/contact/` as a new website page and supersedes the earlier removal of the header CTA. The homepage hero, other placeholder navigation destinations, lab and deleted page trees retain their existing scope. The single homepage entry in `src/lib/content.ts` still points to `/`; Contact is not a separate homepage experiment. No publication or upstream foundation change is part of this request.

# Previous scope — first viewport, September 13, 2026

The user requested the first header and hero composition on `/`. It replaces the white section canvas with one local first-version experiment: the original headline “The frontier of decentralized truth.”, the proposed support sentence identifying Augur Lituus and its development stage, two actions, a light/dark switch, and Signal Loom concentrated beside the copy on a shared surface. No lower sections, section labels, or local secondary website routes are present. The lab and its full interactive study remain available. This is a composition decision, not a measured improvement in comprehension or navigation.

The supplied horizontal logo remains unchanged at 168 px wide, above the Brand Foundation minimum of 150 px. Neutral typography and bright Augur Green primary action fills follow the existing website-specific choices. The shared foundations remain pinned. The homepage uses `Website.astro`; lab pages use `Base.astro`. Mobile design and QA remain deferred.

The revised header follows Website Strategy PDF p.6: Protocol, Developers, Resources, Blog and FAQ. Resources contains Learn, REP, Research and History, in that order. These document labels take precedence over the retired implementation's Whitepapers and protocol history labels; p.18 also identifies Research as the successor to Whitepapers. The prior user removals of the header CTA and hero status badge remain in effect.

Header destinations are nonnavigating placeholders represented as links with `aria-disabled`; they now use a pointer cursor, while their destinations remain unwired. No destination pages are restored. The native Resources disclosure works with hover, click and keyboard. The logo still returns home and the theme switch works. The user deferred wiring these destinations, so the previous three-link external header is superseded.

The homepage represents the intended final website, not a gateway to the existing augur.net. The approved hero actions replace CTA1 and CTA2: “Explore the protocol” links to the published Augur Lituus overview at https://www.augur.net/blog/the-augur-lituus-whitepaper/; “Read the whitepaper” links to the public PDF at https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf. Both use native links with the existing primary/ghost styles. The whitepaper action uses a trailing ↗ (`arrow-up-right`) to signal its external GitHub destination, as reaffirmed by the user on September 13. Keep this external-link pattern when editing the action; the earlier instruction to omit its arrow is superseded. The headline period uses the semantic primary green. Internal navigation has no arrow; reserve ↗ (`arrow-up-right`) for actual external destinations, regardless of button variant. No secondary pages are restored.

The loom moves continuously from arrival, with steady spatial convergence toward a stable focal end. Independent 9–12-second waves travel downstream and diminish as the paths mature, retaining small residual uncertainty at the focus. Particles, slow drift and resistant strands remain. Maturity develops from path position .05 to .84, while shared band, lane and depth separation tapers to 14% between .5 and .86. The homepage uses maximum alignment .96. Hover bending remains 70% weaker at the focal end with a slight green highlight. Clicks keep the broad local response and spatial memory, while adding position-specific variation to individual strands and a small shared shift at the result. Arrival remains staggered by click position, with the existing .8-second attack and gradual decay. This is illustrative motion and does not compute decisions. The homepage pauses offscreen, when hidden, or for reduced motion. Escape pauses persistently and clears the trace; fresh pointer or supported keyboard input resumes. There is no visible playback toolbar. The user's explicit request for natural constant motion authorizes this visible loop as an exception to the earlier finite-motion/no-idle-loop preference.

Twenty-one of the 168 strands now carry green, using lanes 0, 8 and 16 in each family. They are drawn last, with selected alpha contribution .28, baseline accent .30 and the stronger dark-theme mix. Both SVG fallbacks use the focal taper and green strokes at .70 opacity. The desktop artwork retains its -8% right offset to expose the focal end. Copy and hero links remain independent of animation. These changes refine the existing metaphor and do not establish a measured improvement in comprehension. See `docs/motion.md` for the integration details; runtime and visual verification evidence belongs in `docs/verification.md`.

The artwork retains limited drag tilt with gentle follow-through and no automatic rotation. Four arrow keys offer the same bounded exploration. There is no additional hero toolbar. The current refinement concentrates on small, individual reactions to pointer movement and smoothly overlapping click disturbances. A few more strands remain tentative and some make small detours before rejoining the focal pattern, expressing the user’s idea of individual thoughts reconsidering possibilities. This is an illustrative metaphor, not live reasoning or a probability display. Shared endpoint geometry reduces storage and vertex work while retaining the same curves; see the motion and verification notes for exact scope and evidence.

## Retained design pass — More life in the first viewport

Implemented on `/` and retained at the user's request on September 13. A static radial tonal field lifts the background around the loom, using the existing foreground/background roles in both themes. The enlarged artwork starts at 27% of the desktop width and ends at -1%, with its focal end inside the frame. Its canvas and SVG fade at the edges; the copy remains clear and keyboard focus has a separate cue inside the visible artwork. This placement supersedes the earlier -8% offset above.

The supporting copy now opens with “Permissionless resolution for real-world outcomes.” The following sentence names Augur Lituus, its decentralized infrastructure, development stage and intended applications. This is an approved condensation of the existing introduction, not a new readiness claim. The green headline period remains intact; the CTA placeholders are now replaced by the approved actions above.

A subsequent requested introduction makes the entrance visible and ordered: headline lines reveal in quick succession, then supporting copy, stationary action links and the loom fade into place. After the user found the first version too fast, the sequence now completes in 1500ms with more separation between stages and softer easing. Headline/support finish by 900ms and buttons by 950ms. A small inline bootstrap enables it before the first content paint; the default without JavaScript or with reduced motion is the fully visible hero. Keyboard focus or a click immediately finishes the sequence, while pointer movement lets it continue. Buttons accept pointer input as their fade starts and retain their native navigation. The existing loom motion continues independently. This website-local treatment follows Brand Foundation pp.18–20 and 25; it adds no dependency, new palette or shared foundation rule. It has desktop visual review, not measured user-comprehension evidence. Mobile remains deferred.

All scope and implementation descriptions below are historical where they conflict with this first-viewport decision.

# Previous scope — canvas and lab only

The latest request removes the entire `/homepages` route tree, including Whitepapers, Blog and article pages, Learn and guide pages, FAQ and REP. `/` now directly serves the sole white section canvas. Their navigation/footer, page helpers, editorial CSS, runtime article data and unused images have been deleted. No secondary website page remains. Source originals and provenance notes are retained as research only.

The Icons specimen section is deleted; normal interface icons and their shared assets remain. Actions contains local Primary, Outline, Ghost, Try loading and Unavailable buttons. They never navigate. Try loading runs the existing finite two-second demonstration and returns to its original state. The ghost variant has no resting border.

The User flow briefs and export now describe deleted pages as proposals. The lab's canvas link and chooser point directly to `/`. Previous decisions below are historical where they conflict with this scope.

The lab overview uses section titles without secondary heading captions or introductory slogans. Its User flow section keeps a short description and a compact cyan “Explore” button beneath the description (40 px gap, 44 px high, 16 px horizontal padding); the Arrive / Understand / Evaluate / Continue map appears only on `/lab/user-flow`.

# Website direction — September 12, 2026

## Current homepage reset

The latest user request replaces the developed homepage with one white canvas containing only black section labels, two-digit numbering, whitespace, and 1 px black separators. Header, Hero, The question, The protocol, Applications, Research, Roadmap, Journal, Learn & FAQ, Contact, and Footer are empty spaces to build independently. No homepage navigation, buttons, imagery, form, theme control, or preview chooser remains. The canvas stays white in either system theme. `/` opens `/homepages/01`; Homepage 2 and 3 are deleted.

This is a website-local composition in `01.astro` using the scaffold mode of `Website.astro`. Shared foundations, source assets, the lab, and separate editorial/reference routes are retained. Mobile work remains deferred. The notes below describe the previous developed composition and retained secondary pages; they are not the current homepage.

## Current polish pass

Deleted the unused homepage Roadmap, SolidityPreview, JournalPreview, ContactForm components, their homepage animation module, and unused homepage copy exports. The sole homepage remains the white section canvas; shared navigation/footer code still serves the retained secondary routes. Homepage flow briefs are proposed content, with retired implementation references corrected.

The lab now groups six icon examples in a compact 3×2 outlined panel. Filled inputs use a slight surface change and bottom focus indicator, with no perimeter outline; invalid fields use the Crimson bottom indicator and an explicit message. Keyboard focus strengthens the bottom indicator; forced colors retains a visible outline. Loading uses a finite two-pass light sweep and green ring during the two-second example; reduced motion suppresses animation. The content and skeleton share a grid cell to keep the preview height stable.

The flow header orders Save, homepage arrow, then theme. Save downloads the generated Markdown brief. Embedded preview links and route boxes are removed. OG Member replaces Returning visitor, followed immediately by AI assistant; the journey distinguishes a language model from an agent system without implying a protocol integration. Map stages have 24px gaps, journey steps retain their connectors, and expanded briefs separate purpose, content and rationale with space. Programmatic focus highlights a brief summary instead of drawing an outline around the entire expanded brief.

## Lab header and navigation

The lab header uses the supplied Augur glyph at 45 px wide (50.4 px high), respecting the Brand Foundation PDF p.12 minimum. Its original light/dark variants and fills are unchanged. An 88 px header gives the mark breathing room; the homepage arrow and theme toggle share 44 px square outlines with an 8 px gap. Section links use native smooth scrolling, eased selection feedback, and a finite heading arrival animation. Reduced motion disables these effects. The homepage canvas remains static and control-free.

## Previous composition

The current review prioritizes real editorial content and navigation over additional homepage spectacle. Website Strategy pp.6, 9 and 15 guide the navigation, Blog, Learn, FAQ and closing contact area. The Brand Foundation remains authoritative except for the user's explicit website choices below.

## Website and navigation

Homepage 1 and its Blog, Learn, FAQ, REP and Whitepapers routes form one standalone website under `/homepages/01`. The 128px Augur header is static, with a larger 190px mark and 16px navigation. It contains Protocol, Developers, Resources, Blog and FAQ. The old header CTA and hero status badge were removed at the user's request. Accurate development context remains in the introduction and roadmap. The one-click theme icon floats independently at the top right. Ctrl/Cmd+K opens the hidden preview chooser; Homepage 2 and 3 remain blank white canvases.

Resources opens on pointer hover, with a short delay on leaving, and retains its native click and keyboard disclosure. Escape closes it and restores focus; outside clicks, navigation and tabbing out close it. Destinations are Learn, Whitepapers, protocol history and the dedicated REP page. Protocol and Developers still lead to homepage sections.

## Homepage and protocol content

The homepage roadmap separates Completed, In progress and Next. Completed research and the historical Augur v2 Moon Fork are distinct from Lituus implementation. Next links to open development items and makes no date or priority commitment. Status sources were reviewed on September 12, 2026.

The Solidity panel uses the actual `IQueryFeeController.sol` interface at Lituus-CS revision `fc7fd072a117231056868e7f88481fe8bfd924b3`. Only whitespace was reformatted. Its SPDX notice is retained, source is linked, and highlighting is generated at build time using Astro's existing Code component. Code text stays neutral. Copy controls use the Clipboard API; when the browser denies copying, they select the text and show the keyboard-copy shortcut.

REP is a dedicated explanatory page about utility, holder responsibilities, reporting, fees and version context. The proposed Lituus fee and fork rules are identified as such. The historical v2 migration window is closed. Only the verified REPv2_Yes_1 Ethereum contract is shown; no unverified version addresses or investment-return claims are added. Whitepapers has a current Lituus entry and historical v2 release.

The footer includes protocol resources, research, repositories, the Foundation, community links, and REP trading/explorer destinations verified against the public website. No unreviewed legal policy or sending backend is invented.

## Editorial content

Fifteen complete public blog posts and 27 original images come from the supplied website archive. Original titles, publication dates, authors and historical context are preserved. Internal article and reference links lead to the corresponding local destinations where available. Visible source-site/domain meta-copy and original-article chrome have been removed; provenance lives in `content-provenance.json`.

The homepage keeps three latest articles with 200px supporting thumbnails. The dedicated Blog has a latest-story feature and chronological archive with topic filters, search, counts and an empty state. Filtering is a small progressive enhancement; all articles remain available without JavaScript. Article reading pages retain contents navigation and original publication metadata. The source's malformed inline-code passage in the July 21 article remains preserved.

Learn has three guide-layout placeholders. FAQ has three categories and nine explicitly placeholder questions/answers, with five on the homepage. These placeholder answers are separate from the sourced REP explanation. Contact continues to use the pinned upstream Input and local validation. It previews a message without sending or storing it.

## Chosen appearance

Text is neutral Navy/Paper or neutral gray. Bright Augur Green fills primary actions with Navy labels in both themes. Deep is unused in the website layer. Original logo geometry and fills remain unchanged.

Crimson `#CF294E` is the selected website error/negative color. Error borders and negative fills use it; explanatory text stays neutral. The latest direction fixes buttons to square corners, 48 px height, and semibold labels. Icons follow labels with bold outlines. Fields are filled, with a quieter 1 px focus outline. The lab displays these choices; it no longer offers appearance settings or applies old saved preferences.

Phosphor replaces Lucide as the current icon proposal. Its authored Light, Regular and Bold outlines and genuine Filled glyphs are vendored from a pinned revision under MIT; only twenty needed symbols are included. The lab displays the selected Bold outline glyphs. The other vendored variants remain available as source assets. Carbon and Radix were also researched; see `icon-research.md`.

Ring is the chosen loading family. The two-second preview and static skeleton sit within Controls, icons & feedback, beside validation, success, and remove/undo examples; ring geometry and timing can be explored later. Dot/bar choices are removed. Native anchors scroll smoothly, with reduced-motion fallback. Existing finite hero/reveal and process-tab interactions remain; no new animation dependency or idle loop was added.

All website choices are scoped in `website-options.css` or local layouts. Pinned Augur registry outputs are unchanged. Mobile work is explicitly deferred.

## Follow-up: aligned feedback and persistent back navigation

Actions is now text-only; the six icon specimens live in their own Icons panel. Loading occupies a full-width demonstration row. Success and remove/undo share equal-width cards with aligned label, message, description and footer rows. The loading container retains its height through busy/ready changes.

Website-local configured buttons, header utilities and journey selectors share resting, hover, active, focus and disabled rules in website-options.css. Primary and selected controls remain green, destructive controls remain Crimson, and outline/utility controls use neutral surface steps. Labels retain their color pairing; controls no longer jump upward on hover. Busy/disabled controls use a neutral surface and ignore hover/active styling. Undo returns to the outline variant.

User flow has one persistent 44px Back to the lab arrow in the sticky header, before the glyph. Brief summaries have horizontal insets and wrapping; expanded content starts 24px below the summary. Disclosure arrival is opacity-only to avoid moving content over the heading.

## Compact header refinement

The lab header is now 72px high (previously 88px). The original 45px glyph sits alone on the left; the persistent Back, Save, homepage and theme controls form one group on the right. Save is icon-only with its accessible name, tooltip and Markdown download preserved. All header controls measure 44×44px with 8px gaps. The logo is not shrunk below its established minimum.
# Follow-up priorities — September 13, 2026

User-requested notes for future work:

- Give transitions dedicated attention, especially movement between pages and scrolling. Explore the treatment before deciding exact effects; respect reduced-motion preferences.
- Give the navbar extra design and interaction attention, including dropdowns, hover/focus states, navigation clarity and behavior while scrolling.

These are recorded priorities, not implemented changes. Mobile design and QA remain deferred.

# Application illustrations on both homepages — September 21, 2026

The user requested a redesign of both application sections. `/` and
`/lab/homepage-redesign/` now share a website-specific `ApplicationExamples.astro`
composition: compact native radio selectors and one stable-height panel pairing
the question and application action with a connected final-answer/output
illustration. These replace the current homepage's animation placeholders and
the lab proposal's oversized selectors and separate output fragments.

The three categories, questions and actions still follow Website Strategy
Figure F5. The illustrated final Yes answer is hypothetical; market settlement,
the flight-delay policy and grant funding each apply the application's own rules.
The visible note identifies these as illustrative applications with no
established integrations. Selection is immediate and the complete illustrations
remain static; both work without JavaScript.
No new route, dependency, shared foundation or source-material change is involved.

## Plain application copy and Figma update — September 21, 2026

The user requested simpler wording on both application sections and in the
[Two Directions Figma file](https://www.figma.com/design/AjR6tba4Nuj0FFwaSYTOrE/?node-id=2-2).
Both website headings now read “What could you build?” with “Augur Lituus answers
real-world questions. Your app decides what happens next.” The actions are
“Settle a market”, “Pay insurance claims” and “Release grant funding”. Flight and
grant questions use plain paraphrases of the same Figure F5 conditions; the
milestone question is retained. Repeated diagram captions were removed, and
“Example answer” explicitly identifies the hypothetical Yes response.

Figma application sections `13:44` (Direction A, page `2:2`) and `13:167`
(Direction B, page `2:3`) received the same introduction and simpler scenario
copy within their existing wireframe compositions. Direction A's incorrect
flight question under Prediction markets was corrected. The adjacent interaction
notes and section leader alignment were updated. These are editable copy updates
to the two existing wireframes, not a pixel-for-pixel capture of the website.
