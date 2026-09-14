// Website-specific design hypotheses. The current preview is evidence of behavior,
// not evidence that a visitor will take a particular path.
export const blueprintDate = '2026-09-13';
export const websiteScope = "Home, About, Products, Learn, Blog, FAQ, REP and Contact. Products combines Augur Lituus, Zoltar and Augur Stratoblast in three sections on one page. Home and Contact are built; the other pages are planned.";
export const blueprintPremise = 'Every element should help someone understand, decide, act, or feel something intentional. Name that job, then test whether the element does it.';

export const journeys = [
  {
    "id": "decision",
    "label": "CEO / product",
    "title": "Is this relevant to what we are building?",
    "entry": "A founder, product lead, or CEO opens the homepage from a recommendation. They need a plain-language category, a possible application, and an honest account of readiness.",
    "steps": [
      {
        "label": "Orient",
        "title": "Homepage",
        "detail": "What it is + in R&D",
        "target": "home-hero"
      },
      {
        "label": "Find relevance",
        "title": "Products",
        "detail": "Three products, one explanation",
        "target": "page-products"
      },
      {
        "label": "Check context",
        "title": "About",
        "detail": "Direction and current work",
        "target": "page-about"
      },
      {
        "label": "Continue",
        "title": "Contact",
        "detail": "Discuss a possible fit",
        "target": "page-contact"
      }
    ],
    "branches": [
      {
        "condition": "Need the problem first?",
        "label": "Read Why",
        "target": "home-why"
      },
      {
        "condition": "Looking for a specific product?",
        "label": "Products → choose a section",
        "target": "page-products"
      }
    ],
    "choice": "Home introduces Augur; Products explains Augur Lituus, Zoltar and Augur Stratoblast in three sections on one page. About gives project direction and history; Contact supports a specific conversation.",
    "friction": "Only Home and Contact are built. Products and About are planned; the R&D stage and approximate launch estimate do not establish product availability.",
    "success": "They can explain the product category, name a plausible fit, and distinguish proposed design from available implementation. A qualified “not for us yet” is useful too.",
    "test": "Ask a product decision-maker to assess fit and readiness without guidance. Record which words they use, where they hesitate, and what evidence they seek before contacting anyone."
  },
  {
    "id": "technical",
    "label": "CTO / builder",
    "title": "Can I evaluate how this would work?",
    "entry": "A CTO or engineer may arrive on the homepage, a technical article, or a shared repository link. They need mechanism, assumptions, source code, and version context.",
    "steps": [
      {
        "label": "Understand scope",
        "title": "Products",
        "detail": "Choose Lituus, Zoltar or Stratoblast",
        "target": "page-products"
      },
      {
        "label": "Inspect design",
        "title": "Paper + code",
        "detail": "Sources beside the explanation",
        "target": "home-research"
      },
      {
        "label": "Check limits",
        "title": "Current R&D",
        "detail": "Known work and open questions",
        "target": "home-roadmap"
      },
      {
        "label": "Discuss",
        "title": "Contact",
        "detail": "Ask a specific technical question",
        "target": "page-contact"
      }
    ],
    "branches": [
      {
        "condition": "Need foundational context?",
        "label": "Learn",
        "target": "page-learn"
      },
      {
        "condition": "Have a specific question?",
        "label": "FAQ",
        "target": "page-faq"
      }
    ],
    "choice": "The shared Products page owns the technical overview and direct source links. A separate Developers overview would duplicate it. Learn and FAQ offer supporting explanations.",
    "friction": "The Products page is planned. There are no developer docs or supported integration instructions. Developers is the only possible later page and would need a distinct role beyond the product explanations.",
    "success": "They find the design evidence, recognize the R&D stage and can name the unknowns that prevent an integration decision.",
    "test": "Give an engineer an evaluation question: “What assumptions would our application inherit?” Watch whether the site gets them to the right source without implying production readiness."
  },
  {
    "id": "learning",
    "label": "New reader",
    "title": "What does resolution mean, and why do we need it?",
    "entry": "A curious reader starts at the homepage or follows an educational link. They need a concrete example before terminology, then a manageable next reading step.",
    "steps": [
      {
        "label": "Recognize the problem",
        "title": "Homepage",
        "detail": "A plain introduction",
        "target": "home-why"
      },
      {
        "label": "Build understanding",
        "title": "Learn",
        "detail": "Guides and worked examples",
        "target": "page-learn"
      },
      {
        "label": "Resolve a question",
        "title": "FAQ",
        "detail": "Direct answers and sources",
        "target": "page-faq"
      },
      {
        "label": "Connect the concepts",
        "title": "Products",
        "detail": "How the three products fit together",
        "target": "page-products"
      }
    ],
    "branches": [
      {
        "condition": "Need project context?",
        "label": "About",
        "target": "page-about"
      },
      {
        "condition": "Have a REP question?",
        "label": "REP",
        "target": "page-rep"
      }
    ],
    "choice": "Learn provides a structured explanation, FAQ answers a specific question and Products connects the concepts to the three products. Each is a planned destination during R&D.",
    "friction": "Learn, FAQ and Products remain to be implemented, with reviewed content. They are included in the website plan rather than postponed until launch.",
    "success": "They distinguish a prediction from an outcome, can explain why disagreement needs a process, and know where the detailed rules live.",
    "test": "Can a new reader choose a Learn guide, explain its example and find the relevant FAQ or product section?"
  },
  {
    "id": "rep-holder",
    "label": "REP holder",
    "title": "Which rules and which version am I reading about?",
    "entry": "A REP holder may follow a historical article, shared paper or old bookmark. They need protocol/version context and a distinction between historical events and proposed rules.",
    "steps": [
      {
        "label": "Get current context",
        "title": "REP",
        "detail": "Role, version and responsibilities",
        "target": "page-rep"
      },
      {
        "label": "Understand the design",
        "title": "Products",
        "detail": "Relevant product section and paper",
        "target": "page-products"
      },
      {
        "label": "Read the history",
        "title": "Blog",
        "detail": "Dated articles and original sources",
        "target": "page-blog"
      },
      {
        "label": "Resolve uncertainty",
        "title": "FAQ",
        "detail": "Direct answers and deeper references",
        "target": "page-faq"
      }
    ],
    "branches": [
      {
        "condition": "Need the project history?",
        "label": "About",
        "target": "page-about"
      },
      {
        "condition": "Need to discuss a specific case?",
        "label": "Contact",
        "target": "page-contact"
      }
    ],
    "choice": "REP has its own page for role, responsibilities and version context. Products holds product-specific explanations and sources; Blog preserves dated historical accounts.",
    "friction": "The REP page and its supporting content need implementation and source review. Historical writing must preserve its date and distinguish earlier instructions from current proposals.",
    "success": "They can identify the version and distinguish REP responsibilities, historical events, and proposed Lituus rules without inferring an investment promise.",
    "test": "Give a reader a historical article and ask which statements describe the current proposal. Review where version labels or source links fail to answer that question."
  },
  {
    "id": "returning",
    "label": "OG Member",
    "title": "What changed since I last checked?",
    "entry": "An OG member returns to Augur, opens Blog or follows a shared update. They need dates, a concrete change, and a link to the underlying work.",
    "steps": [
      {
        "label": "Find recent writing",
        "title": "Blog",
        "detail": "Articles, updates and quarterly reports",
        "target": "page-blog"
      },
      {
        "label": "Inspect the work",
        "title": "Products",
        "detail": "Relevant product and its sources",
        "target": "page-products"
      },
      {
        "label": "Check project context",
        "title": "About",
        "detail": "Current direction and history",
        "target": "page-about"
      },
      {
        "label": "Continue",
        "title": "Community",
        "detail": "Follow or discuss the work",
        "target": "page-community"
      }
    ],
    "branches": [
      {
        "condition": "Want a quarterly overview?",
        "label": "Read the Blog",
        "target": "page-blog"
      },
      {
        "condition": "Want the current work status?",
        "label": "Check R&D status",
        "target": "home-roadmap"
      }
    ],
    "choice": "Blog owns development updates and quarterly reports. About holds the current project context; Community provides direct discussion links. There is no separate Updates page.",
    "friction": "The Blog archive and reports are not implemented. No subscription, notification system or fixed quarterly publishing commitment exists.",
    "success": "They can name a concrete dated change and open evidence for it. Recent publishing alone should not be interpreted as recent implementation progress.",
    "test": "Can a returning member find the latest report through Blog, identify the period it covers and open the underlying evidence?"
  },
  {
    "id": "ai-assistant",
    "label": "AI assistant",
    "title": "What can I answer, and which sources support it?",
    "entry": "An AI assistant follows a shared page or retrieves material for someone asking about Augur. An LLM is the language model; an agent is a system that can use a model and tools to carry out a task. Here, the journey concerns reading and citing the website.",
    "steps": [
      {
        "label": "Read the question",
        "title": "Blog / shared article",
        "detail": "Recover date and version",
        "target": "page-blog"
      },
      {
        "label": "Find evidence",
        "title": "Products + sources",
        "detail": "The relevant section and paper edition",
        "target": "page-products"
      },
      {
        "label": "Check context",
        "title": "REP + versions",
        "detail": "Historical and proposed rules",
        "target": "page-rep"
      },
      {
        "label": "Answer with care",
        "title": "Cite the source",
        "detail": "Preserve caveats and unknowns",
        "target": "website-reading"
      }
    ],
    "branches": [
      {
        "condition": "Need foundational context?",
        "label": "Learn",
        "target": "page-learn"
      },
      {
        "condition": "Need implementation evidence?",
        "label": "Sources beside the explanation",
        "target": "home-research"
      }
    ],
    "choice": "Group machine-assisted reading into one journey. Model names and agent architectures do not need separate website paths; the task is to find the right material and preserve its meaning.",
    "friction": "Only Home and Contact are built. About, Products, Learn, Blog, FAQ and REP are planned. Missing evidence must remain unknown; the rough launch estimate is not a public release date.",
    "success": "The answer cites the relevant source, identifies the protocol version, and preserves the difference between proposed, implemented, historical and unknown.",
    "test": "Give a person and an assistant the same Augur question and sources. Compare accuracy, citations and caveats. This is a proposed reading test, not a claim of an agent integration."
  }
];

export const websiteReading = {
  title: 'Readable by people and AI assistants',
  points: [
    'Keep the product name, development status, version, and source links in readable HTML. An assistant should recover the same meaning and caveats as a person, without needing to play an animation or operate a control.',
    'Reading the website does not imply protocol execution or an agent integration. Keep the preview’s noindex policy; public discovery remains a separate launch decision.',
    'To test a finished page, give a person and an assistant the same question. Compare their answers with the cited source, including what is proposed, implemented, historical, or unknown.',
  ],
};

export const futureChange = {
  title: 'For every future change',
  sequence: 'Question → reason → change → observation → decision',
  method: 'Choose one visitor question. Write the expected improvement and removal condition before editing. Compare the result with a real task. Record what you observed, what remains uncertain, and whether to keep, revise, or remove the change.',
  measure: 'A longer visit, more scrolling, or more clicks alone does not show better understanding. No tracking has been added.',
};
