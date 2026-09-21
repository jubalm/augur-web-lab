/** Website-specific planning notes. Intent and review questions are hypotheses, not analytics. */
export interface FlowBrief {
  id: string;
  title: string;
  route: string;
  status: 'Built' | 'Placeholder' | 'Proposed' | 'Planned' | 'Within page' | 'Deferred';
  question: string;
  purpose: string;
  contains: string[];
  next: string;
  reason: string;
  gap: string;
  test: string;
  source: string;
}

export const homeSections: FlowBrief[] = [
  {
    "id": "home-hero",
    "title": "01 · Introduction",
    "route": "/",
    "status": "Built",
    "question": "What is Augur, is it relevant to me, and where can I begin?",
    "purpose": "Orient visitors in the first viewport: header and hero. Introduce Augur as decentralized oracle infrastructure for establishing truth onchain, explain open participation, and offer two useful choices. The plan has six main sections followed by a compact footer; development status belongs in Current stage.",
    "contains": [
      "Headline: “The frontier of decentralized truth.” It establishes the theme; the support sentence must do the concrete explaining.",
      "Support: “Permissionless resolution. No central authority.” Followed by “Augur is decentralized oracle infrastructure for establishing truth onchain. Anyone can submit a question, propose an answer, or challenge an outcome.”",
      "Primary action: Explore Augur Lituus, still an inert placeholder until its page exists. Secondary action: Read the whitepaper, which opens the published January 2026 paper in a new tab (the same link as the citation below the walkthrough). Both buttons use 16 px labels, like every 48 px button.",
      "Header: About / Products / Resources / Community, plus Talk to us at /contact/. About is a standalone placeholder for the planned page. Products opens Augur Lituus / Zoltar / Augur Stratoblast. Resources opens Blog / FAQ / Learn / REP / Whitepaper. Products and Resources show names only, with no descriptions. All resource and product destinations remain placeholders, including Whitepaper. Community displays Discord / Telegram / X / GitHub as inert placeholders, retaining the proposed external arrows. The logo, Talk to us and light/dark switch work.",
      "The desktop header is 96 px tall with a 150 px logo and 16 px navigation; below 940 px wide the menus move to a second row under the logo instead of overflowing. All dropdowns use a 240 px panel with 48 px rows, names only, no per-item descriptions or dividers, and centered icons/arrows. The theme control sits immediately before Talk to us.",
      "The hero fills the first screen below the header, so Why + how always starts below the fold. Both support lines use the shared 18 px lead (20 px above 1600 px wide). Staged text and action arrival pair with Signal Loom and a brief green underline beneath ‘decentralized’ that plays once; there is no hover underline, because the word is not a link. Signal Loom stays focusable, since Escape there pauses its motion, and is announced as “Animation: scattered strands gathering into one pattern”. Sparse 3 px heritage squares around the edges recall the old augur.net background, with independent scintillation and a soft cursor radius that brightens nearby squares. Motion pauses offscreen or in a hidden tab; disabled JavaScript leaves decoration static."
    ],
    "next": "Review the overview, paper and community action placements, or use Talk to us to open the local Contact page. Planned destinations include the combined Products page, About, Learn, Blog, FAQ and REP.",
    "reason": "One proposition and two actions give different levels of prior knowledge a starting point. These are intended paths, not observed CEO or CTO behavior.",
    "gap": "The header remains the existing experiment, with unwired About, product, resource and community destinations. Hero actions also remain on the page. The product links are planned to reach three sections on one Products page. All six homepage sections and the footer are built for structure review.",
    "test": "At the reviewed desktop heights, can a first-time reader find the support sentence and primary action, identify Augur as oracle infrastructure, and name a way to participate?",
    "source": "src/pages/index.astro; src/components/site/HomepageHeader.astro; docs/website-strategy.md (hero copy, September 14, 2026)"
  },
  {
    "id": "home-protocol",
    "title": "02 · Why + how",
    "route": "/#protocol",
    "status": "Built",
    "question": "Why is resolution needed, and how does REP support the proposed Augur Lituus process?",
    "purpose": "Give beginners a short visual explanation of why real-world answers matter, what distinguishes Augur Lituus and how an ordinary query resolves. Builders can inspect the question criteria, timing and fees beside the example.",
    "contains": [
      "“Built for high-stakes questions” replaces “Who decides what happened?”. The lead: when money rides on an answer, someone will try to fake it, and Augur Lituus, the next generation of Augur’s oracle, is designed to hold up anyway. The heading and lead use the shared HomeSection component, like every other homepage section. Three cells in one outlined strip, with a 5 px square on every line crossing, each give a title and a 15 px technical description: Resolve any question (elections, sports results, flight delays and scientific claims; any multiple-choice question, including ones no data feed can answer), Question every answer (no committee, multisig or veto; a challenge that holds wins almost all of the losing bonds; secured by incentives, not authority) and Bribery-resistant by design (escalating bonds, a last-resort fork and supply restoration; forcing a false answer is designed to cost more than the oracle’s entire market cap; built for the day someone tries to buy the answer). The copy pattern follows the user’s DIA reference; the frame is Augur’s own. The walkthrough heading below is a 36 px subsection heading.",
      "Ask, Report, Challenge and Finalize remain readable together; Finalize explains the appeal period. An optional question card first follows an unchallenged No report in an expressly illustrative scenario with no qualifying independent replication. See a challenge shows an initial Yes, the missing evidence, a 30 REP challenge to No, a new appeal period and then finality. Direct steps, Previous, Next and restart are local demonstrations. Scrolling never advances or locks the example.",
      "REP is defined in the resolution steps. The user removed the What makes dishonesty costly section for now, including its bond, fork and supply-restoration diagrams and details.",
      "Native disclosures retain the full question criteria, timing, dynamic fees and Invalid outcomes. The working January 2026 whitepaper citation now sits below the walkthrough.",
      "The user selected the January 2026 whitepaper as the main reference; main-1.pdf is supporting research only. The new source citation opens the published paper. Other existing hero, navigation and external-action placeholders remain unchanged. No new website route is introduced."
    ],
    "next": "Explore the optional challenge, expand a relevant technical note or inspect the January paper. Possible applications follows.",
    "reason": "One reading path supplies the essentials without requiring interaction. Optional detail lets builders inspect the mechanism without adding a wall of text for beginners.",
    "gap": "This is a local explanatory prototype, not an available oracle interface. The three card animations are briefed in source but not built, so the cards show no stage yet. Comprehension has not been tested with visitors; mobile remains deferred. Current verification is recorded in docs/why-how.md.",
    "test": "Can a beginner say what makes Augur Lituus different, then follow the ordinary path and optional challenge?",
    "source": "User-approved simplification, September 18, 2026; principles and copy rewrite requested September 19, 2026; high-stakes cards approved from the user’s DIA reference (diadata.org), September 19, 2026; Website Strategy PDF p.7 (permissionless, open work and economic security); src/components/site/WhyHow.astro; docs/why-how.md; January 2026 Augur Lituus whitepaper abstract, §§2, 4–7 and Appendix 2; Generalized Augur article, May 13, 2025 (direction only)."
  },
  {
    "id": "home-applications",
    "title": "03 · Possible applications",
    "route": "/#applications",
    "status": "Built",
    "question": "Does this relate to the problem my team is solving?",
    "purpose": "Offer three concise, illustrative Augur Lituus applications, one at a time, so a visitor can recognize a relevant use without reading every example.",
    "contains": [
      "Label “Possible applications”; heading “Different applications. A shared need for an answer.” The aside explains shared resolution infrastructure and states that the uses are illustrative, with no integrations established.",
      "Tabs show one example at a time: Prediction markets, Insurance and payments, DAOs and grants. The panel gives the example question and a one-line application action beside a wide animation placeholder aligned under the aside. Native radios drive the tabs without a script, and switching never moves the page.",
      "Prediction markets: “Was the milestone demonstrated by the deadline?” The application settles the market, applying the outcome to positions.",
      "Insurance and payments: “Was flight AB123 delayed by more than two hours?” The application determines a payout, applying the policy rules.",
      "DAOs and grants: “Was the agreed deliverable published by the deadline?” The application decides grant funding, applying the agreed release condition.",
      "The section covers Augur Lituus only. The user removed the Zoltar custom-oracle example and the Before you build checklist."
    ],
    "next": "Continue to Current stage. Augur Lituus is reachable from the header’s Products menu once its page is built.",
    "reason": "A CEO or product lead may use these examples to recognize relevance; a CTO or builder may then investigate feasibility. This is a planning hypothesis.",
    "gap": "The section has no link of its own since the user removed Explore Augur Lituus to save height. The three animations are unbuilt placeholders. Timing, costs, Invalid outcomes and integration requirements still need maintained documentation elsewhere.",
    "test": "Can a reader pick the example closest to their need and say what their application would ask and do with the answer?",
    "source": "Website Strategy PDF, September 2026, p.10 Figure F5 (examples, questions and application actions) and p.8 (use cases); The Augur Lituus Whitepaper post, January 29, 2026 (shared resolution rationale); src/components/site/Applications.astro."
  },
  {
    "id": "home-roadmap",
    "title": "04 · Current stage",
    "route": "/#roadmap",
    "status": "Built",
    "question": "What is complete, what is being built, and what remains open?",
    "purpose": "Give a brief, dated account of completed work, current development and what comes next, with evidence beside each item.",
    "contains": [
      "Label “Current stage”; heading “From research to implementation.” The aside says Augur Lituus has moved from research into development and the work is open source, followed by “Status reviewed September 19, 2026”.",
      "Completed: Augur Lituus whitepaper (January 29, 2026; Whitepaper ↗) and Moon Fork (August 3, 2026: Augur v2’s fork mechanism completed its first live run on Ethereum mainnet; Moon Fork report).",
      "In progress: Augur Lituus implementation (ChainSafe engineering, Lituus Foundation review; Lituus-CS ↗) and Augur Stratoblast (Dark Florist building prediction markets on Zoltar with Lituus Foundation funding; July 21 update).",
      "Next: testing, audits and documentation before applications can depend on Augur Lituus; REP-holder guidance will follow in a future post. “No date announced.” The user’s roughly six-month estimate stays internal and is not shown.",
      "A green-to-neutral line with filled, half-filled and open square markers distinguishes the three states. Evidence links are inert placeholders; intended URLs stay in the component source."
    ],
    "next": "Inspect an evidence link once destinations are enabled, or continue to From the blog. About will later hold maintained context.",
    "reason": "A decision maker needs the difference between interest and readiness; a returning contributor needs an identifiable work item.",
    "gap": "Status reflects public sources on September 19, 2026 and needs maintainer confirmation before release, especially Augur Stratoblast and the Next item. It is not a live status feed; update the review date whenever facts change. About, Blog and article routes are planned.",
    "test": "Can readers identify the review date, distinguish completed work from ongoing development and see that no launch date has been announced?",
    "source": "augur.net blog reviewed September 19, 2026: The Augur Lituus Whitepaper (January 29, 2026), Q1 2026: The Migration Window is Open (July 2, 2026), Augur Is Testing Its Past and Building Its Future (July 21, 2026) and The Augur Moon Fork Is Complete (August 5, 2026); public AugurProject/Lituus-CS repository; Website Strategy PDF F2 (Augur Stratoblast on Zoltar); src/components/site/CurrentStage.astro."
  },
  {
    "id": "home-journal",
    "title": "05 · From the blog",
    "route": "/#journal",
    "status": "Built",
    "question": "What is worth reading to explore Augur or catch up on its work?",
    "purpose": "Offer a compact selection of useful reading after the current-stage summary, giving newcomers a way to explore and returning members a way to catch up.",
    "contains": [
      "Heading “From the blog” with “View all posts” leading to the planned Blog archive.",
      "Augur Is Testing Its Past and Building Its Future — July 21, 2026 · Lituus Foundation. Why resolution is the weak point of prediction markets, and how the Moon Fork and Augur Lituus respond to it.",
      "The Augur Lituus Whitepaper — January 29, 2026 · Lituus Foundation. The announcement of Augur Lituus: a proposed resolution layer for other protocols, with a comparative analysis of oracle security.",
      "Selected for usefulness, not recency. Titles, dates and authors are original; descriptions are summaries. Article and archive links are inert placeholders for planned local pages.",
      "A specific Learn guide may later join the selected reading with a clear “Guide” label, once reviewed content exists."
    ],
    "next": "Read a selected article or browse Blog once those pages exist; a future featured guide would lead directly to Learn.",
    "reason": "A small editorial selection offers useful depth without turning the homepage into an archive. Current stage remains responsible for maintained development status.",
    "gap": "Local Blog and article routes are planned, so links are inert. The July 21 post includes historical migration instructions under a “Migration closed” notice; its article page must keep that notice.",
    "test": "Can readers find a useful next read, distinguish an article date from current development status and reach the full archive?",
    "source": "augur.net blog, reviewed September 19, 2026; src/components/site/FromTheBlog.astro."
  },
  {
    "id": "home-faq",
    "title": "06 · FAQ",
    "route": "/#faq",
    "status": "Built",
    "question": "Can I get a quick answer to a remaining question?",
    "purpose": "Resolve a few remaining doubts after Blog and before Footer / contact, with short expandable answers and a route to the full FAQ.",
    "contains": [
      "Heading “Common questions” with “View all FAQs” leading to the planned FAQ page.",
      "How does today’s Augur relate to its earlier prediction markets? Augur launched on Ethereum in 2018; Augur v2 still runs, and its fork mechanism completed its first live run in August 2026; Augur Lituus, the next generation of Augur’s oracle, is designed to resolve questions for other prediction markets and applications.",
      "What role does REP play? REP secures the oracle through bonds and fork migration; Augur Lituus is being built around REPv2_Yes_1.",
      "Can I build with Augur today? Not yet: ChainSafe is implementing Augur Lituus in the public Lituus-CS repository, and it still needs testing, audits and documentation. The answer ends with a working Talk to us link.",
      "Native expandable answers, closed by default, keyboard accessible and readable without JavaScript."
    ],
    "next": "Read a short answer, open the full FAQ once built or use the Talk to us invitation.",
    "reason": "A small FAQ gives readers a quick route to a specific answer without repeating the homepage introduction or requiring contact.",
    "gap": "Answers are drafted from public sources and need maintainer review. “Not yet” refers to building on Augur Lituus; live Augur v2 contracts are not presented as an integration path. The dedicated FAQ page is planned.",
    "test": "Can a reader locate a remaining question, expand its answer with a keyboard and find the full FAQ without rereading the main explanation?",
    "source": "July 21, 2026 post; Q1 2026 report (July 2, 2026); Moon Fork report (August 5, 2026); January 2026 Augur Lituus whitepaper; src/components/site/HomeFaq.astro."
  },
  {
    "id": "home-footer",
    "title": "07 · Footer / contact",
    "route": "/#footer",
    "status": "Built",
    "question": "How can I start a conversation or find another useful destination?",
    "purpose": "Close the homepage with a brief Talk to us invitation and a compact directory in one closing area.",
    "contains": [
      "Invitation: “Have a project in mind?” with one short line and a primary Talk to us button opening /contact/.",
      "Directory mirroring the header: Augur (About, Contact), Products (Augur Lituus, Zoltar, Augur Stratoblast), Resources (Blog, FAQ, Learn, REP, Whitepaper ↗) and Community (Discord, Telegram, X, GitHub ↗). Only Contact and the logo navigate; the rest are inert placeholders.",
      "Base row: the Augur logo returns home, beside “Augur’s work is funded and coordinated by the Lituus Foundation.”"
    ],
    "next": "Open Contact for a conversation or choose the relevant page, source or community destination once enabled.",
    "reason": "A shared closing area offers conversation and recovery paths without another large homepage section.",
    "gap": "Destinations other than Home and Contact remain placeholders. No legal policy, copyright notice or newsletter is added; those need review before release. The footer appears on the homepage only.",
    "test": "Can a reader find Contact, Learn, FAQ and REP context from the same compact closing area?",
    "source": "User-approved homepage consolidation, September 14, 2026; Website Strategy PDF p.5 (identify the operator in the footer); July 21, 2026 post (the Lituus Foundation funds and coordinates the work); src/components/site/SiteFooter.astro."
  }
];

export const flowPages: FlowBrief[] = [
  {
    "id": "page-about",
    "title": "About",
    "route": "/about/ (planned; not built)",
    "status": "Planned",
    "question": "What is Augur working toward, and where does it stand today?",
    "purpose": "Explain Augur’s purpose, current R&D direction and history, with a clear route to its products.",
    "contains": [
      "A plain introduction to Augur and the problem it is researching.",
      "Current work and open questions with a review date. The roughly six-month estimate is provisional planning context.",
      "A concise history section, linking longer historical accounts to Blog.",
      "A short introduction to the product family leading to the dedicated Products page."
    ],
    "next": "Explore Products, read a Blog article or Talk to us.",
    "reason": "About answers what Augur is now as well as where it came from. History alone would frame the project around its past.",
    "gap": "About is the first standalone item in the shared website navigation, replacing Developers. It remains a placeholder until the page is built. Current development facts and historical copy need review before implementation.",
    "test": "Can a new reader explain Augur’s direction, identify that it is in R&D and find the source behind one product description?",
    "source": "User correction, September 13, 2026; docs/website-strategy.md: one Products page; Learn, REP and FAQ remain in scope; remove redundant briefs."
  },
  {
    "id": "page-home",
    "title": "Homepage",
    "route": "/",
    "status": "Built",
    "question": "What is Augur and why should I investigate it?",
    "purpose": "Keep the homepage concise: Introduction → Why + how → Possible applications → Current stage → From the blog → FAQ, followed by Footer / contact. All six sections and the footer are built for structure review. Size each section around its content, remove repeated explanations and offer deeper reading where it is useful.",
    "contains": [
      "Scroll motion: section headings, columns, lists and footer content fade and rise into view in order; Current stage draws its timeline; page disclosures open smoothly. CSS-only and scroll-linked; static in unsupported browsers and with reduced motion.",
      "Why + how combines the problem and proposed mechanism, with nearby paper references and a small Learn invitation. Current stage keeps evidence beside status claims; From the blog offers two useful reads. A compact FAQ resolves remaining doubts through three or four short expandable answers. Essential explanations stay with their topics, and the footer includes Talk to us.",
      "The hero retains “The frontier of decentralized truth.” Its approved support introduces Augur as decentralized oracle infrastructure for establishing truth onchain, then explains the ability to submit questions, propose answers and challenge outcomes. Development status belongs in the planned roadmap.",
      "About / Products / Resources / Community reflects the current navigation. About is a standalone placeholder for the planned page. Products opens Augur Lituus / Zoltar / Augur Stratoblast; Resources opens Blog / FAQ / Learn / REP / Whitepaper. Products and Resources show names only, with no descriptions. All resource and product destinations remain placeholders, including the header’s Whitepaper item. Community displays Discord / Telegram / X / GitHub as inert placeholders. The logo, theme switch, internal Talk to us route and the hero’s Read the whitepaper action work; Explore Augur Lituus stays a placeholder.",
      "The hero pairs its headline, supporting copy and actions with Signal Loom and fills the first screen below the header, so the next section starts below the fold. On arrival or refresh, a brief green underline draws beneath ‘decentralized’ and fades; there is no hover state. Sparse heritage squares scintillate independently around the outer edges and brighten within a soft cursor radius, pausing offscreen or in a hidden tab. Reduced motion removes the draw/fade transitions and cursor illumination; disabled JavaScript leaves decoration static."
    ],
    "next": "Explore Augur Lituus, Resources and Community show inert destinations for structure review. Read the whitepaper opens the published paper; Talk to us opens the local Contact page. Planned destinations include About, Products, Learn, Blog, FAQ and REP.",
    "reason": "The homepage should make the next choice easier. It does not need to contain every rule or force every visitor through the complete story.",
    "gap": "All homepage sections and the footer are built on /. Contact is built; other website pages still need implementation. About, products, all resources and external actions remain placeholders, except the hero’s whitepaper action and the walkthrough citation.",
    "test": "Can a first-time evaluator explain the oracle’s purpose and open participation, while a returning reader reaches a known destination without scrolling the full page?",
    "source": "src/pages/index.astro; src/components/site/HomepageHeader.astro; docs/website-strategy.md (hero copy, September 14, 2026)"
  },
  {
    "id": "page-products",
    "title": "Products",
    "route": "/products/ (planned; three sections)",
    "status": "Planned",
    "question": "How do Augur Lituus, Zoltar and Augur Stratoblast fit together?",
    "purpose": "Explain the three products on one page, with a distinct section for each and a clear account of their relationship.",
    "contains": [
      "Augur Lituus — Resolution for real-world outcomes. Explain the proposed mechanism, its assumptions and application boundary, with direct overview and whitepaper links.",
      "Zoltar — Shared foundation for oracles. Explain its role and relationship to Augur Lituus using reviewed sources.",
      "Augur Stratoblast — Prediction markets on Zoltar. Explain the intended product and its relationship to the shared infrastructure using reviewed sources.",
      "A short introduction connects the three sections. Section links let visitors jump to the relevant product; each section keeps its development status, papers and technical references together."
    ],
    "next": "Jump to a product section, read its paper or source, use Learn or FAQ for an explanation, or Contact for a technical question.",
    "reason": "Products matches the existing navigation and describes the page directly. One page makes the relationships visible; a separate Developers overview would repeat its technical explanation.",
    "gap": "The header dropdown is built, but the combined Products page is planned. Its three menu destinations can eventually point to sections on this page. There are no developer docs or supported integration instructions; a future Developers destination needs a distinct purpose. Preserve the requested Augur Stratoblast spelling; the source spells it Augur Statoblast.",
    "test": "Can a visitor reach a named product directly, explain how it relates to the other two, and distinguish its proposed design from available implementation?",
    "source": "User correction, September 13, 2026; docs/website-strategy.md: one Products page; Learn, REP and FAQ remain in scope; remove redundant briefs. Product roles: docs/website-strategy.md (September 13 product descriptions) and docs/source-material.md; the current menu shows names only."
  },
  {
    "id": "page-community",
    "title": "Community",
    "route": "Header dropdown on / and /contact/",
    "status": "Built",
    "question": "Where can I join the conversation or follow Augur?",
    "purpose": "Show the proposed community destinations in the main navigation for structure review.",
    "contains": [
      "Discord, Telegram, X and GitHub in that order, each with its existing service icon and a trailing external arrow.",
      "Channel labels and icons are shared with Contact. URLs sourced from augur.net remain in repository notes, with no external hrefs in the review site.",
      "Native disclosure with pointer, keyboard and Escape behavior; only one header dropdown opens at a time."
    ],
    "next": "Review the community options or use Talk to us to inspect the local Contact page.",
    "reason": "Community groups proposed external destinations without a local landing page. The review menu keeps them as placeholders.",
    "gap": "All community links are inert during structure review; no joining or external navigation is implemented.",
    "test": "Can a reviewer find Discord, recognize the intended external destination and open and dismiss the menu while staying on the site?",
    "source": "User approval, September 13, 2026; src/components/site/HomepageHeader.astro; src/lib/community.ts; docs/website-strategy.md"
  },
  {
    "id": "page-learn",
    "title": "Learn",
    "route": "/learn/ (planned; not built)",
    "status": "Planned",
    "question": "Where should I start if I am new to this?",
    "purpose": "Give new readers a clear starting point and a structured path through Augur’s concepts.",
    "contains": [
      "Foundational explanations with a visible starting point and sensible reading order.",
      "Guides with worked examples, prerequisites and relevant sources.",
      "Links from each explanation to Products, REP or FAQ when the reader needs more detail."
    ],
    "next": "Read the relevant guide, continue through the learning sequence or inspect the related product and source.",
    "reason": "Learn organizes explanations by what a reader needs to understand; Blog organizes dated writing. Learn is part of the planned website during R&D.",
    "gap": "The Learn page is planned, not deferred. Guide content still needs sourcing, writing and review; no local Learn route has been rebuilt in this task.",
    "test": "Can a new reader choose a starting guide, understand its example and identify the next useful explanation?",
    "source": "User correction, September 13, 2026; docs/website-strategy.md: one Products page; Learn, REP and FAQ remain in scope; remove redundant briefs."
  },
  {
    "id": "page-blog",
    "title": "Blog",
    "route": "/blog/ (planned; not built)",
    "status": "Planned",
    "question": "What has been published, discussed or changed?",
    "purpose": "Keep Augur’s dated public writing in one archive: articles, research notes, development updates and quarterly reports.",
    "contains": [
      "One archive for sourced articles, research notes, development updates and quarterly reports.",
      "Article pages retain the original title, date, author, body and version context; reports also identify their reporting period.",
      "Reports distinguish completed work, ongoing research, open questions and changed plans, with links to evidence.",
      "Relevant next reading and a route back to the archive."
    ],
    "next": "Read an article or report, inspect its sources or follow the relevant Products, REP or About explanation.",
    "reason": "One archive prevents duplicate feeds and gives returning readers a single place to look. Report dates distinguish past plans from the current state.",
    "gap": "The local Blog and article routes remain deleted. Rebuild only with reviewed posts. Quarterly reports are an available format, not a promised publishing cadence or invented issue.",
    "test": "Can a returning reader find an update, a researcher find a paper discussion, and each distinguish the article date from current status?",
    "source": "User correction, September 13, 2026; docs/website-strategy.md: one Products page; Learn, REP and FAQ remain in scope; remove redundant briefs."
  },
  {
    "id": "page-faq",
    "title": "FAQ",
    "route": "/faq/ (planned; not built)",
    "status": "Planned",
    "question": "Where is the direct answer to my question?",
    "purpose": "Resolve a narrow uncertainty briefly, preserve necessary qualifications and route the reader to one relevant detailed explanation.",
    "contains": [
      "Reviewed questions grouped by reader need.",
      "Concise answers about the products, current R&D stage and common points of confusion.",
      "Direct links to Products, Learn, REP or Contact when an answer needs more detail."
    ],
    "next": "Read the relevant answer and follow its deeper explanation or source.",
    "reason": "FAQ provides a direct route for a specific question; readers should not need to complete a guide to find a short answer.",
    "gap": "FAQ remains a dedicated planned page. Questions and answers need review before implementation; it is not deferred until launch.",
    "test": "Can a reader find a specific answer quickly and reach the supporting explanation with one deeper link?",
    "source": "User correction, September 13, 2026; docs/website-strategy.md: one Products page; Learn, REP and FAQ remain in scope; remove redundant briefs."
  },
  {
    "id": "page-rep",
    "title": "REP",
    "route": "/rep/ (planned; not built)",
    "status": "Planned",
    "question": "What is REP, which version matters, and what responsibilities come with participation?",
    "purpose": "Give returning community members and holders a version-aware explanation of utility, reporting, fees and forks.",
    "contains": [
      "A source-reviewed explanation of REP’s role and holder responsibilities with explicit protocol/version context.",
      "Clear separation of historical events and proposed product rules.",
      "Links to the relevant paper edition, product section and dated historical Blog articles."
    ],
    "next": "Inspect the version-specific source, read the related product section or ask a question through Contact.",
    "reason": "REP holders have a distinct need for version and responsibility context. A dedicated REP page belongs in the website during R&D.",
    "gap": "REP remains a dedicated planned page. Current facts need review before implementation; this plan adds no token action or new participation instructions.",
    "test": "Can a reader distinguish the 2026 Augur v2 event from proposed Augur Lituus rules and find the version-specific source?",
    "source": "User correction, September 13, 2026; docs/website-strategy.md: one Products page; Learn, REP and FAQ remain in scope; remove redundant briefs."
  },
  {
    "id": "page-contact",
    "title": "Contact",
    "route": "/contact/",
    "status": "Built",
    "question": "How do I talk to someone about my specific need?",
    "purpose": "Let a reader move from general information to an appropriately routed conversation.",
    "contains": [
      "A top-right Talk to us action and a contact page welcoming questions about Augur products, designed to fit a standard desktop viewport.",
      "Required Name, Email and Message; optional Company / project and Website; Send message demonstrates local validation only.",
      "A prominent Ask on Discord invitation, Telegram / GitHub / X icons, and only contact@augur.net. No topic selector or preview panel."
    ],
    "next": "Review Ask on Discord, socials, the email address and message fields. All external actions are placeholders; valid form input remains on this page.",
    "reason": "Contact should be reachable on arrival as well as after reading. Clear labels help visitors choose a channel for their question or level of involvement.",
    "gap": "The form does not submit, store data or launch an email app. Social and direct-email links have no destinations during structure review. Inbox provisioning or confirmation remains a future release concern.",
    "test": "Can a reviewer see the contact options at standard desktop sizes, recover from invalid fields and confirm that valid submission and external placeholders keep them on the page?",
    "source": "User request, September 13, 2026; docs/source-material.md; docs/website-strategy.md; src/pages/contact.astro"
  },
  {
    "id": "page-404",
    "title": "404",
    "route": "Unmatched URL · 404",
    "status": "Built",
    "question": "This link no longer works; where should I go?",
    "purpose": "Explain the missing destination and offer useful recovery without pretending the requested content exists.",
    "contains": [
      "Current message: This experiment is not here.",
      "Links to Explore the lab and View homepage.",
      "The lab Base layout."
    ],
    "next": "Return to the lab or the homepage experiment.",
    "reason": "Old bookmarks and shared links are legitimate entry points. Recovery is part of the reader journey, even when the intended page is absent.",
    "gap": "The current 404 serves the lab. Website recovery should link to the relevant planned destinations once they are built.",
    "test": "Visit a genuinely missing URL, confirm a 404 response and clear recovery, and ensure the original requested URL is not silently replaced by a success page.",
    "source": "src/pages/404.astro; src/layouts/Base.astro; docs/source-material.md: Website Strategy migration direction"
  }
];
