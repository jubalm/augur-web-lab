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
    "title": "01 · Arrive and orient",
    "route": "/",
    "status": "Built",
    "question": "What is Augur, is it relevant to me, and where can I begin?",
    "purpose": "Give the reader a product category, an honest development stage, and two useful choices before asking for technical attention.",
    "contains": [
      "Headline: “The frontier of decentralized truth.” It establishes the theme; the support sentence must do the concrete explaining.",
      "Support: “Permissionless resolution for real-world outcomes.” Followed by “Augur Lituus is decentralized infrastructure in development for prediction markets and other applications.”",
      "Primary action: Explore the protocol → the published Augur Lituus overview. Secondary action: Read the whitepaper → the public PDF on GitHub.",
      "Header: Products / Developers / Resources / Community, plus Talk to us at /contact/. Products opens Augur Lituus / Zoltar / Augur Stratoblast. Resources opens Blog / FAQ / Learn / REP; these destinations and Developers remain placeholders. Community links to Discord / Telegram / X / GitHub with a trailing external arrow on each link. The logo, Talk to us and light/dark switch work.",
      "The desktop header is 96 px tall with a 150 px logo and 16 px navigation. The theme control sits immediately before Talk to us.",
      "The hero retains its staged text and action arrival. The artwork area is empty after removal of the rejected animation; reduced motion shows the text immediately."
    ],
    "next": "Use the built overview and paper links, Community or Talk to us. Planned destinations include the combined Products page, About, Learn, Blog, FAQ and REP.",
    "reason": "One proposition and two actions give different levels of prior knowledge a starting point. These are intended paths, not observed CEO or CTO behavior.",
    "gap": "The header remains the existing experiment, with unwired product and resource destinations. The product links are planned to reach three sections on one Products page. Lower homepage sections are not built.",
    "test": "At the reviewed desktop heights, can a first-time reader find the support sentence and primary action, describe the product, and say that it is in development?",
    "source": "src/pages/index.astro; src/components/site/HomepageHeader.astro; docs/website-strategy.md (first viewport, September 13, 2026)"
  },
  {
    "id": "home-why",
    "title": "02 · Make the problem concrete",
    "route": "/#why",
    "status": "Proposed",
    "question": "Why does an application need a resolution process?",
    "purpose": "Connect an abstract oracle category to an understandable dependency: settlement rules still need an answer about the world.",
    "contains": [
      "A prediction market needs an external outcome before it can settle.",
      "The tension: what happens when participants disagree about the answer?",
      "One scientific milestone question about independently demonstrated room-temperature superconductivity at ambient pressure.",
      "The distinction between a breakthrough claim and an independently reproduced result."
    ],
    "next": "Follow the question → #protocol.",
    "reason": "The example provides something concrete to carry into the process. Each later step should advance the same question instead of introducing another metaphor.",
    "gap": "The example is still an incomplete question: precise criteria and a deadline are not supplied here. It must remain illustrative, not a submission-ready query.",
    "test": "Can a reader explain why a contract needs an outside answer and why disagreement matters without repeating the headline?",
    "source": "docs/website-strategy.md (previous composition)"
  },
  {
    "id": "home-protocol",
    "title": "03 · Follow the mechanism",
    "route": "/#protocol",
    "status": "Proposed",
    "question": "How could Augur Lituus take a question to an outcome?",
    "purpose": "Provide a short mental model before the reader confronts detailed rules, fees, assumptions, and exceptional paths.",
    "contains": [
      "Proposed sequence: Question → Report → Challenge, if needed → Outcome.",
      "Each step could pair a short explanation with an illustrative document. The display explicitly says Proposed design and not a live resolution.",
      "The final step states that applications use the result under their own settlement rules.",
      "If progressive controls are added, preserve readable explanations without JavaScript and support keyboard navigation."
    ],
    "next": "Read the design and assumptions → whitepaper; continue to Application fit.",
    "reason": "Progressive disclosure can reduce the amount being compared at once. Its value is comprehension of the sequence, not completion of an animation.",
    "gap": "There is no local process section or #protocol anchor. The hero currently links to the public Augur Lituus overview. Any future mechanism illustration should explain the proposed sequence; detailed delays, invalid outcomes and fork paths remain in the paper.",
    "test": "Can readers recount the sequence, recognize that challenges are conditional, and distinguish a final outcome from application settlement?",
    "source": "docs/website-strategy.md (previous composition and current first-viewport destination)"
  },
  {
    "id": "home-applications",
    "title": "04 · Recognize application fit",
    "route": "/#applications",
    "status": "Proposed",
    "question": "Does this relate to the problem my team is solving?",
    "purpose": "Translate the mechanism into three possible application needs and invite a technical fit assessment.",
    "contains": [
      "Prediction markets: resolve an event question so an application can settle.",
      "Event-dependent payments: use an external outcome as a payment condition.",
      "Custom oracle designs: share REP through Zoltar while defining local resolution rules.",
      "A qualification identifies these as possibilities under investigation requiring technical review."
    ],
    "next": "Give each application a relevant source or evaluation next step; the previous cards all opened the same paper.",
    "reason": "A CEO or product lead may use these examples to recognize relevance; a CTO or builder may then investigate feasibility. This is a planning hypothesis.",
    "gap": "The three cards do not yet offer distinct next steps. There is no maintained integration guide or fit checklist for question clarity, timing, costs, invalid outcomes and fork handling.",
    "test": "Can a reader choose a relevant example and identify at least one unanswered operating requirement before committing engineering work?",
    "source": "docs/source-material.md; docs/website-strategy.md (retired website and proposed content)"
  },
  {
    "id": "home-research",
    "title": "05 · Inspect the evidence",
    "route": "/#research",
    "status": "Proposed",
    "question": "What can I inspect beyond the website explanation?",
    "purpose": "Make the difference between a published design and implementation evidence visible and actionable.",
    "contains": [
      "Keep the direct Augur Lituus paper link alongside its explanation.",
      "Put additional papers and technical sources in their relevant Products sections, identifying edition, version and development status.",
      "Research code can link to an exact revision with its limitations; a source link is not a supported integration tutorial."
    ],
    "next": "Read the relevant source or Products section, then check the current R&D context.",
    "reason": "Inspectable sources are a concrete credibility basis when reviewed adoption figures and customer proof are unavailable.",
    "gap": "Only the hero’s direct whitepaper action is built. A source link does not establish operational readiness, documentation, integration support or a production launch.",
    "test": "Can a technical reader distinguish the paper’s proposed design from any linked implementation evidence and open the exact source without searching?",
    "source": "User correction, September 13, 2026; docs/website-strategy.md: one Products page; Learn, REP and FAQ remain in scope; remove redundant briefs."
  },
  {
    "id": "home-roadmap",
    "title": "06 · Establish the current stage",
    "route": "/#roadmap",
    "status": "Proposed",
    "question": "What is complete, what is being built, and what remains open?",
    "purpose": "Give evaluation a time and version context without converting open work into a release promise.",
    "contains": [
      "A short R&D status summary with a review date and a route to the maintained context in About.",
      "Separate completed research, implementation work and open questions only after source review.",
      "The user estimates launch in roughly six months as of September 13, 2026. Treat this as uncertain planning context, not a public date or countdown.",
      "Development updates and quarterly reports belong in Blog; no standalone Updates or Roadmap page is required."
    ],
    "next": "Read current context in About or a dated update / quarterly report in Blog.",
    "reason": "A decision maker needs the difference between interest and readiness; a returning contributor needs an identifiable work item.",
    "gap": "The earlier roadmap used a September 12 source snapshot. It is not a current status feed. Review facts before implementation; do not infer milestones, audits or launch readiness from the estimate.",
    "test": "Can readers identify the review date, distinguish completed work from ongoing research and recognize that the launch estimate is provisional?",
    "source": "User direction, September 13, 2026: R&D, roughly six months to launch; docs are not available; consolidate History, Whitepapers and Updates. docs/website-strategy.md"
  },
  {
    "id": "home-journal",
    "title": "07 · Offer dated context",
    "route": "/#journal",
    "status": "Proposed",
    "question": "What has Augur published or changed recently?",
    "purpose": "Offer a small doorway into research, development, and protocol history after the maintained explanation.",
    "contains": [
      "A small selection of real Blog articles, development updates or quarterly reports.",
      "Original publication date and author, with a reporting period for quarterly reports.",
      "One link to the full Blog archive; no competing Updates feed."
    ],
    "next": "Open a relevant article or browse /blog/.",
    "reason": "Dated writing gives returning readers context and gives new readers a route to depth. Publication recency must not stand in for implementation status.",
    "gap": "Neither the homepage journal nor the local Blog is built. Use real reviewed writing; do not fabricate fresh posts or promise a quarterly schedule.",
    "test": "Can readers tell a current maintained status from a dated article, and does at least one selected article answer a useful follow-up question?",
    "source": "User direction, September 13, 2026: R&D, roughly six months to launch; docs are not available; consolidate History, Whitepapers and Updates. docs/website-strategy.md"
  },
  {
    "id": "home-learn-faq",
    "title": "08 · Answer early questions",
    "route": "/ → short answers (planned section)",
    "status": "Proposed",
    "question": "Where do I learn the basics or get a short answer?",
    "purpose": "Offer a clear route into Learn for foundational understanding and FAQ for a specific answer.",
    "contains": [
      "A short invitation to the dedicated Learn page and its starting guide.",
      "A few reviewed FAQ answers with a link to the full FAQ page.",
      "Relevant links to Products or REP when an answer needs that context."
    ],
    "next": "Open Learn for a guided explanation, FAQ for a direct answer or Contact for an unresolved question.",
    "reason": "A knowledgeable developer may still be new to oracles. Help should depend on the question being asked, not a job title.",
    "gap": "The homepage section and the dedicated Learn and FAQ pages are planned but not built. All are in scope during R&D.",
    "test": "After reviewed content exists, can a reader find and understand one answer without needing the full paper?",
    "source": "User correction, September 13, 2026; docs/website-strategy.md: one Products page; Learn, REP and FAQ remain in scope; remove redundant briefs."
  },
  {
    "id": "home-contact",
    "title": "09 · Make room for a conversation",
    "route": "/#contact",
    "status": "Proposed",
    "question": "How do I discuss a product, requirement or unresolved question?",
    "purpose": "Offer a closing invitation that leads to the same Contact page available from the header.",
    "contains": [
      "A proposed invitation to discuss Augur products or a project, linked to the built /contact/ page.",
      "The Contact page offers Discord, Telegram, GitHub, X and contact@augur.net.",
      "Its form requires Name, Email and Message, with optional Company / project and Website. Send message composes email for the visitor to finish in an email app."
    ],
    "next": "Talk to us already opens /contact/ from the header. A future closing section would offer the same route.",
    "reason": "Readers can ask a question on arrival or after reviewing the work. A closing invitation should reuse the existing contact route and channel choices.",
    "gap": "The homepage closing section is not built. The Contact page is built, but inbox provisioning or confirmation remains with the domain owner; website-native delivery needs an endpoint.",
    "test": "Can readers reach Contact, choose a suitable channel and recover from invalid form fields without mistaking email composition for delivery?",
    "source": "src/pages/contact.astro; src/components/site/HomepageHeader.astro; docs/website-strategy.md"
  },
  {
    "id": "home-footer",
    "title": "10 · Provide a dependable directory",
    "route": "/#footer",
    "status": "Proposed",
    "question": "Where can I go if my next step is different from the main story?",
    "purpose": "Expose persistent recovery and resource paths after the narrative, including less common but important destinations.",
    "contains": [
      "Home, About, Products, Learn, Blog, FAQ, REP and Contact once those destinations are built.",
      "Product links reach the Augur Lituus, Zoltar and Augur Stratoblast sections on one Products page.",
      "Direct community and relevant paper / source links."
    ],
    "next": "Choose the source, community, version-specific reference or page relevant to the unresolved question.",
    "reason": "A compact directory helps readers recover without advertising content the R&D project does not have.",
    "gap": "No footer is built. Use the actual planned pages and product sections when wiring it.",
    "test": "Can a reader find Contact, the current paper, REP version context and the source repository from a deep reading page?",
    "source": "User correction, September 13, 2026; docs/website-strategy.md: one Products page; Learn, REP and FAQ remain in scope; remove redundant briefs."
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
    "gap": "About is planned and not built. Current development facts and historical copy need review before implementation.",
    "test": "Can a new reader explain Augur’s direction, identify that it is in R&D and find the source behind one product description?",
    "source": "User correction, September 13, 2026; docs/website-strategy.md: one Products page; Learn, REP and FAQ remain in scope; remove redundant briefs."
  },
  {
    "id": "page-home",
    "title": "Home",
    "route": "/",
    "status": "Built",
    "question": "What is Augur and why should I investigate it?",
    "purpose": "Connect the proposition, problem, mechanism, application fit and evidence into one readable introduction, with exits at each useful depth.",
    "contains": [
      "First header and hero experiment with the original proposed headline and support.",
      "Products / Developers / Resources / Community reflects the current navigation. Products opens Augur Lituus / Zoltar / Augur Stratoblast; Resources opens Blog / FAQ / Learn / REP. Product, Developers and resource links remain placeholders. Community opens working external links to Discord / Telegram / X / GitHub. The logo, theme switch, Talk to us and two public-source hero actions work.",
      "The hero pairs its headline, supporting copy and actions with Signal Loom. On arrival or refresh, a brief green underline draws beneath ‘decentralized’ and fades; reduced motion keeps the composition static."
    ],
    "next": "The built hero opens the published overview and paper; Community and Talk to us work. Planned destinations include About, Products, Learn, Blog, FAQ and REP.",
    "reason": "The homepage should make the next choice easier. It does not need to contain every rule or force every visitor through the complete story.",
    "gap": "Only the header and hero are built on /. Contact is built; the other planned website pages and lower homepage sections still need implementation. The current header destinations remain placeholders.",
    "test": "Can a first-time evaluator explain the category and stage, while a returning reader reaches a known destination without scrolling the full page?",
    "source": "src/pages/index.astro; src/components/site/HomepageHeader.astro; docs/website-strategy.md (first viewport, September 13, 2026)"
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
    "source": "User correction, September 13, 2026; docs/website-strategy.md: one Products page; Learn, REP and FAQ remain in scope; remove redundant briefs. Product role descriptions: existing HomepageHeader.astro and docs/source-material.md."
  },
  {
    "id": "page-community",
    "title": "Community",
    "route": "Header dropdown on / and /contact/",
    "status": "Built",
    "question": "Where can I join the conversation or follow Augur?",
    "purpose": "Make community destinations directly reachable from the main navigation.",
    "contains": [
      "Discord, Telegram, X and GitHub in that order, each with its existing service icon and a trailing external arrow.",
      "Shared destination URLs with the Contact page, sourced from the public augur.net footer.",
      "Native disclosure with pointer, keyboard and Escape behavior; only one header dropdown opens at a time."
    ],
    "next": "Choose a community destination, or use Talk to us to compose an email.",
    "reason": "Community is a set of direct external destinations. It does not need a local landing page.",
    "gap": "This is a navigation change; community participation and destination availability have not been measured.",
    "test": "Can a visitor find Discord directly, recognize an external link, and open and dismiss the menu with a keyboard?",
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
      "Required Name, Email and Message; optional Company / project and Website; a Send message action with an email-app handoff.",
      "A prominent Ask on Discord invitation, Telegram / GitHub / X icons, and only contact@augur.net. No topic selector or preview panel."
    ],
    "next": "Ask on Discord, choose a social destination, email contact@augur.net, or compose a message and finish sending in an email app.",
    "reason": "Contact should be reachable on arrival as well as after reading. Clear labels help visitors choose a channel for their question or level of involvement.",
    "gap": "The contact@augur.net inbox needs provisioning or confirmation by the domain owner. The form hands off to an email app; website-native delivery needs an endpoint. No stored inquiries or response-time promise exists.",
    "test": "Can a visitor see the contact options without scrolling at standard desktop sizes, choose Discord, recover from invalid fields and continue with all supplied context in an email app?",
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
