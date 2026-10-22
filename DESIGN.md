# Augur website design

The website follows Augur.net Figma, canonical homepage `28:7`, on a fixed Navy background. Identity primitives remain pinned and unchanged. Website roles, composition and responsive adaptations live in local styles.

## Colour and contrast

Navy #0E0E21; Paper #F5F5F8; Green #2AE7A8; Green hover #27D19B; Green pressed #24BC8D; Pewter #A1A1B8; Mist #71728A; Graphite #4A4B61; Dark 1 #161629; Dark 2 #1D1D30; Dark 3 #242438; Outline #383848; Crimson #CF294E. The full role mapping is `src/styles/tokens.css`: semantic background, text, border and mark roles map to pinned primitives. Green has one purpose within each view. Corners are square; depth uses tonal surfaces, hairlines and space. No shadows except the specified transient Peer-mesh highlight.

Ratios calculated from sRGB relative luminance on 5 October 2026:

| Foreground / background | Ratio | Use |
| --- | ---: | --- |
| Paper / Navy | 17.49:1 | Primary text |
| Pewter / Navy | 7.53:1 | Secondary text |
| Pewter / Dark 2 | 6.54:1 | Secondary text on bands/tiles |
| Navy / Green | 11.87:1 | Action and selected-state text |
| White / Crimson | 5.15:1 | Destructive action text |
| Mist / Navy | 4.06:1 | Marks and large text only |
| Mist / Dark 2 | 3.52:1 | Marks and UI boundaries |
| Mist / Dark 1 | 3.79:1 | Required control boundaries |
| Crimson / Navy | 3.70:1 | Error mark/border; insufficient for normal text |
| Crimson / Dark 1 | 3.46:1 | Error mark/border; insufficient for normal text |
| Outline / Navy | 1.66:1 | Decorative hairlines only; never sole required control boundary |

Accessible error prose uses Paper/Pewter with a Crimson marker; a colour change alone never communicates an error. Focus uses a 2 px Pewter ring with 3 px offset. Automated contrast and full forced-colors review are recorded separately in the verification evidence.

## Type, space and controls

Sora 400/600 supplies headings and interface; Schibsted Grotesk 400 supplies reading. Self-host Latin woff2, font-display swap, three files, preload only Sora 600. Desktop roles: Display 72/78 (-2%), Statement 36/44 (-1%), H1 40/48 (-1%), H2 32/40 (-0.5%), H3 24/32, H4 20/26, Label 16/24, UI 14/20, Lead 22/33, Body large 18/28, Body 16/24, Small 14/20, Meta 13/18. Existing typography classes establish roles; large headings scale fluidly below desktop.

At 1440, the content width is 1248 with 96 margins. Section headings split 500 / 80 / 668. Three tiles are 400 wide with 24 gaps. Small spaces use 4, 8, 12, 16, 24, 32; section space uses 64, 72, 96. Main controls are 48 high, utilities at least 44. Heritage marks are 3; list/status marks 7–8; roadmap stops 12 and Now 16; participant squares 20.

The hero owns the first viewport: announcement 40, header 96, hero minimum remaining 100svh. Shared headings stay left-aligned. No visible section numbers or decorative kickers. Responsive widths reduce margins, stack heading rows and card groups, use a native navigation dialog and stacked tab controls below 768.

## Component behaviour

Buttons retain stationary geometry through default, hover, pressed, focus, disabled and loading states. Roles are fixed: Primary (Green) is the one main action in a view; Outline is secondary navigation to a deeper page (header Talk to us, View all questions, Learn about REP, Subscribe), hover Dark 2 with a Mist border, pressed Dark 3; Text is an inline, usually off-site reference: on hover a 2 px line in the text colour draws in under the label from the left and retracts on leave, pressed Pewter. Every other underlined action (footer, FAQ answer, evidence, citation links) uses the same line (`.line-link`). All are 48 px, Sora 600 16/24, 12 px icon gap, no shadows. Interactive rows (FAQ questions, picker cards, roadmap stops, menu rows) lift one tonal step on hover and take a 2 px Pewter inset ring on keyboard focus; open or selected states keep their Green marker so they stay distinguishable (the open application card fills its icon tile Green; no one-sided bar, owner 6 October 2026). A list that continues on its own page ends on an Outline button under it (“View all questions”, “View all posts”), hugging its label so the label sits on the list's 24 px text inset. Done states recede rather than fade: completed walkthrough steps are struck through with a Green check in full-strength text (struck or faded, never both; owner, 19 October 2026), roadmap milestones turn Pewter with a check, and only the current one is Green. Repeated items take different shapes in different sections (the tenets are tiles; what REP puts at stake is a flow of squares in a panel under the How it works steps), so the page does not repeat one pattern. Fields have persistent labels and associated errors. Links distinguish external destinations with ↗. Status marks and outcome chips use text/shape as well as colour. Diagrams are build-time SVG with concise text equivalents. Shared tabs supply roving tabindex, arrows, Home/End and manual activation where required; FAQ uses named native details.

The official horizontal reversed logo is untouched with at least 150 px width. Brand exception (owner, 22 Oct 2026), on `/2/` only: the header and phone-menu logo is 128 × 43 px, 15% under that minimum, with the artwork unchanged (`home-v2-only.css`). The footer and every other page keep 150 px. Icons are Phosphor Bold only, added where they clarify meaning: 24 px in the REP action tiles, 20 px in controls and application tiles, 16 px beside 14–16 px menu text, 14 px in dense meta rows and Activity nodes; off-site actions use `arrow-up-right`. No glow except the Peer mesh highlight. Inventory and hashes: `docs/icon-provenance.json`. See `docs/motion.md` for animation timings, `docs/sources.md` for provenance and `docs/decisions.md` for measured evidence.
