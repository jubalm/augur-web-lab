import { homeSections, flowPages } from './user-flow-pages';

// Website-specific design hypotheses. The current preview is evidence of behavior,
// not evidence that a visitor will take a particular path.
export const blueprintDate = '2026-09-14';
export const websiteScope = "Home, About, Products, Learn, Blog, FAQ, REP and Contact. Products combines Augur Lituus, Zoltar and Augur Stratoblast in three sections on one page. Home and Contact are built; the other pages are planned.";
export const blueprintPremise = 'Every element should help someone understand, decide, act, or feel something intentional. Name that job, then test whether the element does it.';

// Map stops use the titles of existing website briefs. Community is a header
// dropdown, so it is not a page or section destination.
const journeyBriefs = new Map(
  [...homeSections, ...flowPages.filter(brief => brief.id !== 'page-community')]
    .map(brief => [brief.id, brief]),
);

function journeyDestination(target: string) {
  const brief = journeyBriefs.get(target);
  if (!brief) throw new Error(`Journey destination has no page or section brief: ${target}`);
  return { target, title: brief.title.replace(/^\d{2} · /, '') };
}

export const homepageJourney = {
  ...journeyDestination('page-home'),
  detail: 'Six main sections, from the first viewport to selected reading and a compact FAQ, followed by a footer with an invitation to talk.',
};

export const homepageSequence = 'Six main sections and a compact footer, all built for structure review. Related questions share an explanation, with sources and deeper reading nearby. A short FAQ follows Blog to resolve remaining doubts. Size sections around their content and remove repetition to keep scrolling purposeful.';

export const journeyMethod = {
  premise: 'Give each homepage section a clear purpose. Related questions can share one explanation, and the same answer can help several audiences. Each visitor chooses the depth they need.',
};

const journeyPlans = [
  {
    id: 'returning',
    label: 'OG Member',
    title: 'What changed since I last checked?',
    entry: 'A returning community member wants current direction, dated changes and the underlying work. They can skip introductory explanations they already know.',
    questions: [
      {
        question: 'Where does Augur stand now?',
        answer: 'Summarize current work and open questions with a review date.',
        target: 'home-roadmap',
        continuation: { condition: 'For project direction and history', target: 'page-about' },
      },
      {
        question: 'What changed, and when?',
        answer: 'Surface a real dated update or report with links to its evidence.',
        target: 'home-journal',
        continuation: { condition: 'To read the complete update', target: 'page-blog' },
      },
      {
        question: 'Where can I reconnect?',
        answer: 'Make discussion channels easy to find after catching up.',
        target: 'home-footer',
        continuation: { condition: 'To choose a conversation channel', target: 'page-contact' },
      },
    ],
    success: 'They can name a concrete dated change, inspect its evidence and find a way to reconnect. Recent publishing alone does not establish implementation progress.',
    test: 'Ask a returning member what changed since their last visit. Observe where they start, which evidence they use and whether they can stop once their question is answered.',
  },
  {
    id: 'decision',
    label: 'CEO / decision-maker',
    title: 'Is this relevant to what we are building?',
    entry: 'A CEO, founder or product lead needs a clear application, an honest account of readiness and a way to discuss a possible fit.',
    questions: [
      {
        question: 'Could this address our problem?',
        answer: 'Connect the mechanism to possible application needs, with their limits.',
        target: 'home-applications',
        continuation: { condition: 'To evaluate a relevant product', target: 'page-products' },
      },
      {
        question: 'How far along is the work?',
        answer: 'Separate completed work, ongoing research and open questions.',
        target: 'home-roadmap',
        continuation: { condition: 'For maintained project context', target: 'page-about' },
      },
      {
        question: 'How do we discuss our requirements?',
        answer: 'Offer a clear invitation to discuss a product or project.',
        target: 'home-footer',
        continuation: { condition: 'When ready for a conversation', target: 'page-contact' },
      },
    ],
    success: 'They can name a plausible fit and distinguish proposed design from available implementation. Deciding that it is too early for their needs is useful too.',
    test: 'Ask a decision-maker to assess fit and readiness. Observe what evidence they need before a conversation; do not prescribe the pages they must visit.',
  },
  {
    id: 'technical',
    label: 'CTO / builder',
    title: 'Can I evaluate how this would work?',
    entry: 'A CTO or engineer needs mechanism, assumptions, inspectable sources and version context. Product explanations should put the relevant evidence together.',
    questions: [
      {
        question: 'How does the proposed mechanism work?',
        answer: 'Explain the question-to-outcome sequence and conditional challenges.',
        target: 'home-protocol',
        continuation: { condition: 'For product-specific design and assumptions', target: 'page-products' },
      },
      {
        question: 'What evidence can I inspect?',
        answer: 'Place the relevant paper beside the mechanism, preserving edition and qualifications; status claims carry their own evidence.',
        target: 'home-protocol',
        continuation: { condition: 'For the relevant paper and source references', target: 'page-products' },
      },
      {
        question: 'What is still unresolved for our use case?',
        answer: 'State known limitations and the current R&D stage before evaluation.',
        target: 'home-roadmap',
        continuation: { condition: 'If the sources leave a technical question open', target: 'page-contact' },
      },
    ],
    success: 'They find the relevant design evidence and can name the unknowns preventing an integration decision. A paper or repository alone does not establish supported integration.',
    test: 'Ask an engineer which assumptions their application would inherit. Observe whether the explanation leads directly to the right source and makes missing evidence clear.',
  },
  {
    id: 'learning',
    label: 'Newcomer',
    title: 'What is this, and why does it matter?',
    entry: 'Someone new to Augur needs a concrete example before terminology. Newcomer describes familiarity with Augur, regardless of their technical background.',
    questions: [
      {
        question: 'Why does an application need an outside answer?',
        answer: 'Connect one concrete example to resolution and disagreement, with a nearby invitation to Learn.',
        target: 'home-protocol',
        continuation: { condition: 'For a worked example and the basics', target: 'page-learn' },
      },
      {
        question: 'How does a question become an outcome?',
        answer: 'Carry the same example through the proposed mechanism.',
        target: 'home-protocol',
        continuation: { condition: 'To connect the explanation to a product', target: 'page-products' },
      },
      {
        question: 'Where can I resolve a term or specific doubt?',
        answer: 'Keep essential terms within the explanation; offer a short homepage FAQ answer for a remaining doubt.',
        target: 'home-faq',
        continuation: { condition: 'Only when a specific question remains', target: 'page-faq' },
      },
    ],
    success: 'They can explain why an application needs an outcome and how disagreement is handled at a high level. They can stop there or choose a deeper explanation.',
    test: 'Ask a newcomer to explain the example in their own words. Record the first unclear term and whether the nearby explanation resolves it without a compulsory FAQ visit.',
  },
  {
    id: 'rep-holder',
    label: 'REP holder',
    title: 'Which rules and which version am I reading about?',
    entry: 'A REP holder needs version context and clear separation of historical events, current responsibilities and proposed rules. Their specific question should have a direct route.',
    questions: [
      {
        question: 'Which design and version does this describe?',
        answer: 'Identify the relevant paper edition and preserve its qualifications.',
        target: 'home-protocol',
        continuation: { condition: 'For REP role and version context', target: 'page-rep' },
      },
      {
        question: 'What is current, and what is still proposed?',
        answer: 'Separate current project status from ongoing work and proposals.',
        target: 'home-roadmap',
        continuation: { condition: 'For version-specific responsibilities and sources', target: 'page-rep' },
      },
      {
        question: 'Where can I inspect the historical context?',
        answer: 'Label dated writing clearly so earlier events do not read as current instructions.',
        target: 'home-journal',
        continuation: { condition: 'When a dated historical account is relevant', target: 'page-blog' },
      },
    ],
    success: 'They can identify the version and distinguish historical events from proposed rules, using the supporting source rather than inferring a new participation instruction.',
    test: 'Give a holder a historical article and ask which version it describes. Observe whether they can find the relevant REP explanation without taking a tour of unrelated pages.',
  },
];

export const journeys = journeyPlans.map(journey => ({
  ...journey,
  questions: journey.questions.map(question => ({
    ...question,
    ...journeyDestination(question.target),
    continuation: { ...question.continuation, ...journeyDestination(question.continuation.target) },
  })),
}));

// These groups contain the complete homepage sequence, not a tour of website pages.
export const siteMap = [
  { title: 'Orient', question: 'First viewport', targets: ['home-hero'] },
  { title: 'Understand', question: 'Why, how and possible uses', targets: ['home-protocol', 'home-applications'] },
  { title: 'Evaluate', question: 'Current stage and evidence', targets: ['home-roadmap'] },
  { title: 'Continue', question: 'Reading, answers and conversation', targets: ['home-journal', 'home-faq', 'home-footer'] },
].map(({ targets, ...stage }) => ({
  ...stage,
  links: targets.map(target => ({
    ...journeyDestination(target),
    number: journeyBriefs.get(target)!.title.slice(0, 2),
  })),
}));

export const websiteReading = {
  title: 'Make the website clear to agents and LLMs',
  intro: 'A shared requirement across all five journeys: an assistant should recover the same meaning, sources and qualifications as a person.',
  points: [
    'Keep product explanations, development status, dates, versions and direct source links in readable HTML, accessible without animation or interaction.',
    'Plan a maintained /llms.txt guide and clean Markdown versions of reviewed explanations and documentation as they become available. Keep them aligned with the visible pages; this is proposed work, not an existing documentation service.',
    'Test the same question with a person and an assistant. Check their sources and whether they distinguish proposed, implemented, historical and unknown information.',
  ],
};

export const futureChange = {
  title: 'For every future change',
  sequence: 'Question → reason → change → observation → decision',
  method: 'Choose one visitor question. Write the expected improvement and removal condition before editing. Compare the result with a real task. Record what you observed, what remains uncertain, and whether to keep, revise, or remove the change.',
};
