> Current scope: `/` contains the homepage header and hero with Products navigation, public-source hero actions, a light/dark control and interactive Signal Loom. Products lists Augur Lituus, Zoltar and Augur Stratoblast as unwired destinations. Talk to us opens `/contact/` with Discord, socials and a form that composes email to `contact@augur.net`; the visitor finishes sending in an email app. The inbox still needs domain-owner confirmation. `/lab` and `/lab/user-flow` hold the specimens and current planning briefs. See `docs/website-strategy.md` for decisions.

# Augur Web Lab

A small Astro workspace for exploring Augur’s website direction: Figma implementations, layouts, identity, and motion. This is experimental, and may evolve into augur.net after individual ideas are reviewed.

[Things to figure out later](docs/later.md) is our shared scratchpad for loose ideas, questions, and deferred work.

## Run

Use **Bun 1.3.14** (recorded in `packageManager`). Astro’s Node-compatible tools require Node 22.12+ if invoked outside Bun.

```sh
bun install
bun run dev
```

Open the Local URL printed by Astro (normally `http://127.0.0.1:4321`).

```sh
bun run check     # Registry integrity + Astro/TypeScript diagnostics
bun run build     # Static production site in dist/
bun run preview   # Serve the production build locally
```

The lockfile pins Astro 7.3.2 and TypeScript 6.0.3: Astro’s checker does not yet support TypeScript 7’s native compiler API. `bun install --frozen-lockfile` reproduces the dependency tree. Astro 7 may start its server in the background when it detects an agent; `bun run dev status`, `bun run dev logs`, and `bun run dev stop` manage it.

## Explore

| Route | Purpose |
| --- | --- |
| `/` | Homepage header, product navigation and interactive hero |
| `/contact/` | Contact form, Discord, socials and direct email |
| `/lab` | Identity, colors, typography, fixed controls and Signal Loom study |
| `/lab/user-flow` | Visitor journeys and briefs for current and proposed website content |
| `/lab/user-flow.md` | Portable Markdown of the same website blueprint |

The homepage has a compact header, static tonal background and a staged hero arrival. Products groups the three user-named offerings; product and resource destinations are placeholders. The hero links to the Augur Lituus overview and whitepaper. Contact requires Name, Email and Message, with optional Company / project and Website. Send message opens an email-app handoff and never confirms delivery.

The lab displays fixed control examples: square 48 px buttons, semibold labels, bold Phosphor icons, filled fields, and Crimson errors. Loading, validation, success, and remove/undo are local demonstrations. Both lab pages highlight their current section in the sidebar. The animation section contains the full interactive Signal Loom study. **Ctrl/Cmd+K** opens the lab chooser; **Escape** closes it.

Build approved website sections in `src/pages/index.astro` using `Website.astro`; Contact uses the same layout and header. Keep experiments in the lab with `Base.astro`. The former `/homepages` tree and its secondary pages remain deleted. Mobile design/QA is deferred.

## Shared foundations

The **Brand Foundation PDF is the brand authority**. [Augur Design System](https://github.com/melodrd/augur-design-system) supplies reusable Augur-wide implementations. The latest requested website experiment uses neutral typography and bright Augur Green action fills in both themes; this documented exception is isolated from the pinned brand foundations. Its package is private; this independent repository consumes a pinned snapshot of its **shadcn-compatible source registry**. A small offline adapter emits the registry’s plain CSS, and Button/Card/Input source remains byte-identical to the pinned registry. See [integration and update instructions](docs/design-system.md). React is used for those server-rendered specimens; no page is a React SPA and no React runtime is hydrated in the browser.

Reference documents remain outside the runtime. The supplied library is at `/home/goddard/augur/` on the original machine; **builds do not need that directory**. Four original brand SVGs and a pinned Phosphor icon subset are local assets; deleted page imagery is not restored. See [source inventory](docs/source-material.md) and [asset provenance](docs/asset-provenance.json).

For a Figma task: inspect the specified node with MCP, check the Augur foundations, implement a local lab route, and review responsive behavior before promotion. Figma is never a build dependency. Read [Figma workflow](docs/figma-workflow.md), [website strategy](docs/website-strategy.md), [motion](docs/motion.md), and [agent guidance](AGENTS.md).

This first version is local, static, and marked `noindex`. It has no publishing configuration, backend, authentication, or production migration behavior.
