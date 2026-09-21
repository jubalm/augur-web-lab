# Creative brief: a distinctive hero animation for Augur.net

Act as a senior creative director, motion designer, and generative artist who understands prediction markets and decentralized oracles. Help me discover an exceptional animation concept for the first viewport of Augur.net.

This is concept development and art direction. Do not write code yet. Think carefully, explore materially different visual mechanisms, and critique your ideas before presenting them. A persuasive explanation is not enough: the actual image and motion must be compelling.

## 1. The project and its intellectual territory

Augur is associated with decentralized prediction markets and oracle infrastructure. The larger ambition is to help people make sense of uncertain real-world events by bringing dispersed knowledge into markets, making expectations observable, and establishing outcomes that applications can use.

The word “augur” means to predict or be a sign of a future event, traditionally through interpreting omens. Ancient augurs observed signs; a lituus was their curved ceremonial staff. This gives us a conceptual connection to observation, interpretation, and uncertainty. It does not require literal birds, Roman imagery, a staff, mystical effects, or fortune-telling aesthetics.

Imagine the broader vision as a continuously updating landscape of probabilities about the world: politics, science, economics, technology, sports, and other clearly defined events. A probability dashboard is one expression of that vision. The homepage artwork should capture the underlying idea, without needing to become a literal dashboard.

People possess different observations, expertise, models, beliefs, and incentives. Some knowledge is local or private. New evidence can change expectations. Trading can bring this dispersed information into prices that communicate market-implied probabilities.

For a simplified binary contract paying one unit if an event occurs and zero otherwise, a price of 0.63 is commonly interpreted as approximately a 63% market-implied probability, subject to the contract and market assumptions. It is not a direct measurement of an objectively known probability. Liquidity, fees, risk preferences, information quality, and market frictions matter. We are exploring the aspiration of more informative, better-calibrated expectations, not claiming markets always know the truth.

Uncertainty does not have to disappear. New information can increase uncertainty or reveal that the original question was poorly framed. Do not make every visual story end in perfect certainty or unanimous agreement.

For background on the relationship between market prices and event likelihood, see the [Augur v2 introduction](https://www.augur.net/whitepapers/augur-v2/abstract-and-introduction/). This is historical protocol material; do not transfer its detailed mechanics to newer products.

## 2. Augur Lituus: establishing an outcome

Augur Lituus is a proposed decentralized oracle and resolution layer for prediction markets and other applications. The website context for this brief treats it as infrastructure in development; do not imply that it is already deployed, audited, or proven in production.

Its central question is: “Who determines what actually happened?” A market can express expectations before an event, but it needs an outcome afterward so settlement rules can operate. Disagreement, ambiguous questions, conflicting reports, and incentives to manipulate outcomes make this nontrivial.

At a high level, the proposed design involves submitting questions, proposing outcomes, economic commitments, challenges, and escalation where needed. Persistent disagreement can lead to separate continuations. The aim is to support honest resolution through economic incentives and open participation, rather than the discretionary judgment of a central operator. These are design intentions with assumptions, not guarantees.

Keep three things distinct: an event in the world; a report or interpretation of that event; and an outcome accepted through a protocol's resolution process. The animation must not imply that an oracle creates reality or predicts the future by magic.

Use the [published Augur Lituus overview](https://www.augur.net/blog/the-augur-lituus-whitepaper/) and its linked whitepaper if you need more detail. Verify any mechanism-specific claims before using them.

## 3. Zoltar and branching

Zoltar is described as a forkable oracle base layer. In this website's product framing, it provides a shared foundation for oracles. Prediction-market applications can sit above such infrastructure. Keep Augur, Augur Lituus, Zoltar, and the applications that consume oracle outcomes conceptually distinct; do not casually present them as interchangeable names or invent their integration details.

See the [AugurProject Zoltar repository](https://github.com/AugurProject/zoltar) for primary context and current documentation.

Branching is an important creative territory for this brief: a shared origin or history, a divergence, and distinct continuations that inherit what came before. Persistent disagreement does not necessarily have to be flattened into artificial consensus.

Useful ideas include lineage, inheritance, commitments, plural interpretations, shared foundations, and continuity through divergence. If you use a fork metaphor, preserve its logic. Do not automatically merge diverged branches back together, erase alternatives as if they never existed, or label one green branch as “truth” without justification. Forking may be an exceptional backstop in a protocol; an abstract branching artwork is not a literal claim that every question continuously forks.

Also distinguish a tree of hypothetical future possibilities from a protocol fork over competing reported outcomes. They are related creative material, but not the same mechanism.

## 4. What the hero must accomplish

The artwork lives in the FIRST VIEWPORT of the public Augur.net website, beside a large headline and a small amount of supporting copy.

Current headline: “The frontier of decentralized truth.”

Current supporting copy: “Permissionless resolution. No central authority.” Then: “Augur is decentralized oracle infrastructure for establishing truth onchain. Anyone can submit a question, propose an answer, or challenge an outcome.” The user’s September 14 copy decision leaves development status to the planned roadmap and keeps the hero general across applications.

Its job is to make someone feel that Augur concerns information, uncertainty, collective intelligence, real-world outcomes, or branching, while being immediately beautiful. The visitor should enjoy it at a glance. Watching longer can reveal a meaningful behavior. Understanding a lesson must not be the price of appreciating it.

The sections below the hero will explain the products and mechanisms. Preserve their narrative role. Do not put the full resolution process, product architecture, a trading terminal, or an educational diagram into the opening artwork.

Aim for meaningful abstraction: structured enough to feel intentional, abstract enough to avoid an explanation-heavy first impression. One strong visual idea is better than an animation trying to communicate every concept in this brief simultaneously.

## 5. The aesthetic and brand direction

The standard is an exceptionally well-art-directed public website, with a recognizable visual identity. I want professional, clear, beautiful motion with compositional discipline.

- Strong hierarchy, generous negative space, and a satisfying silhouette or spatial arrangement.
- Enough visual presence to hold the right side of the hero, without overwhelming the headline.
- Controlled use of Augur Green: #2AE7A8. The current website direction uses bright green in both themes, with neutral typography.
- Augur Navy: #0E0E21. Augur Paper: #F5F5F8. Use the existing semantic theme roles during implementation; these values describe the brand, not permission to create a new token system.
- Sora and Schibsted Grotesk are the existing typefaces. The artwork ideally needs no visible text.
- Both light and dark themes must look intentional. Do not rely on bloom over black to make an ordinary shape appear impressive.
- The logo's geometry and fills are protected. Do not turn it into arbitrary particles or distort it to manufacture a concept.

Avoid generic AI-company visuals, arbitrary particle clouds, indiscriminate neon, decorative network spaghetti, dashboard clutter, stock blockchain imagery, and complexity presented as sophistication. These are cautionary examples, not a request for sterile minimalism. The work should have character.

## 6. Autonomous motion is essential

The animation must already be meaningfully dynamic when the visitor arrives. It must continue developing without clicks, pointer movement, scrolling, or instructions.

Do not propose a static arrangement that only becomes interesting on hover. Do not propose a short entrance that finishes and then sits still as the entire experience.

There can be changes of pace and quieter moments, but the artwork must sustain a composed, living behavior. Explain what it does after five seconds, thirty seconds, and two minutes. Avoid conspicuous resets, wholesale clearing, or repeatedly undoing the meaning of the previous action.

Optional interaction should add a satisfying response or another way to perceive the structure. It should not be required to activate, sustain, or understand the concept. Keep the response bounded and preserve the overall composition. The user should not feel they are playing a game, completing a task, or deciding which outcome is true.

Accessibility exceptions are intentional: reduced motion should show a strong static composition, and hidden/offscreen rendering should pause. Continuous visual activity does not justify constant background work.

## 7. What we tried and what failed

An existing animation called Signal Loom uses many fine lines with some green accents, moving and gradually converging into a focal pattern. Its original thesis was that different observations, experiences, and beliefs interact and approach a clearer shared understanding. I like aspects of its beauty and motion. The execution mostly reads as waves; individual contributions and aggregation are not apparent.

We explored more literal narratives such as a photo finish, observation scenes, disputed answer cards, and a resolution layer feeding several markets. These can communicate meaning, but they risk excessive explanation and cognitive load in the hero. They also consume material better suited to lower homepage sections.

Implemented and rejected experiments:

1. Independent paths with moving points and trailing lines converging on a green destination. It looked like missiles and spermatozoids. The visual association defeated the intended meaning.
2. Overlapping translucent planes carrying partial patterns, aligning into a combined field. It did not achieve the desired result. Do not return the same stacked-plane concept under a new name.
3. A growing rectilinear “Forking Labyrinth” with branching corridors and green sections. It was also rejected. Mazes and branching sounded promising verbally, but that implementation was not compelling enough.

Do not assume the latest rejected concept is still my chosen direction. Branching remains relevant; a maze is no longer prescribed. Explore beyond curves, trails, stacks, and grid mazes. If you revisit any territory, explain the substantial visual difference and why the previous failure would not recur.

The key lesson: a concept can sound intelligent in prose and look ordinary, confusing, or unintentionally biological when rendered. Evaluate the image and motion honestly.

## 8. Creative freedom and practical limits

Explore physical, mathematical, optical, spatial, economic, and perceptual ideas. Choose the mechanism that best supports the experience; do not force every idea to include particles, branches, probabilities, and resolution together.

The eventual site is a small static Astro project using Bun. Existing primitives and fonts come from Augur's design system. SVG, Canvas, CSS, and the existing Three.js dependency are available. No new backend or live market feed is needed. No large animation framework should be required for a trivial effect. Suggest technical feasibility briefly; do not let implementation convenience choose the art direction.

The current exercise is desktop-first. Mobile design and QA are explicitly deferred. Still avoid ideas fundamentally dependent on a giant cinematic viewport. The concept must work at an ordinary desktop hero's scale.

Distinguish an illustrative visual from measured data, a forecast, a real dispute, or a production-ready product. No invented performance, security, market, or readiness claims.

## 9. Your requested output

First, state your creative diagnosis in a short paragraph: what the opening artwork should communicate, and what our earlier attempts misunderstood visually.

Then propose EIGHT genuinely distinct concepts. Distinguish them by visual mechanism and motion behavior, not merely names or colors. For each provide:

1. A concise name and one-sentence premise.
2. A concrete description of the first frame: forms, material, scale, placement, density, and use of green.
3. The exact autonomous behavior: what changes, what remains stable, how time is perceptible, and how the animation continues without an obvious reset.
4. Its specific connection to Augur, with a clear distinction between metaphor and protocol mechanics.
5. What a visitor could plausibly perceive without reading your explanation.
6. Optional interaction, and why the base animation remains complete without it.
7. The most likely unintended association or design failure. Be candid.
8. A short feasibility note and the main performance or accessibility consideration.

Choose the THREE strongest and develop each into a miniature art-direction brief: a verbal storyboard at arrival, five seconds, thirty seconds, and two minutes; visual hierarchy; motion rhythm; light/dark treatment; and how it sits beside the actual headline. Identify what must be prototyped to determine whether it works.

Finally, recommend ONE concept and explain why it beats the alternatives on immediate visual appeal, meaningfulness, low cognitive load, autonomous motion, and distinctiveness for Augur. Prefer justified judgment over false precision in scoring.

Do not flatter the brief or oversell weak concepts. Do not call ordinary decorative motion “truth emerging” unless its observable behavior supports that interpretation. If a scientifically faithful explanation produces a dull image, say so and improve the design. Give me creative ideas worth investing in before anyone writes more code.
