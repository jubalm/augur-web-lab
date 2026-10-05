# Pinned Augur foundation bridge

The registry snapshots under `vendor/augur/registry` remain pinned to `fb354701afe182613f58c61b1c7dca21818cff86`; `vendor/augur/provenance.json` contains source and integrity values. The generated UI files, utilities, foundation CSS and typography CSS are immutable consumer outputs. Do not hand-edit them.

`scripts/design-system.ts` verifies snapshots, reproduces the existing Button/Card/Input and utility files byte-for-byte, and serializes the registry theme to plain CSS. Generated outputs are committed so normal builds need neither Figma nor the upstream network. Run `bun run design-system:check` to verify drift; generation is only for a deliberate reviewed upstream change.

The website uses the existing foundation primitives and typography. `src/styles/tokens.css` maps the canonical Figma Navy roles onto those primitives without changing the shared foundation. The local composition owns its square controls, 48 px geometry, content widths, section layout and motion. See `DESIGN.md`. Registry React dependencies are retained only for server rendering; no `client:*` hydration is permitted.

Official horizontal reversed logo assets are unchanged, at least 150 px wide. Sora 400/600 and Schibsted Grotesk 400 use pinned self-hosted Fontsource Latin woff2 with swap; preload only the hero headline weight. Phosphor Bold icons are 20 px, with provenance recorded separately.

A future upstream update must use a verified full commit, review the consumer contract, replace all corresponding registry artifacts and hashes together, regenerate and verify, then run website build and visual/accessibility checks. Local website rules never become an unreviewed fork of shared foundations.
