---
version: alpha
name: Augur Web Lab — Website Direction
description: >-
  Consumer-side record of what the Augur website actually renders: the pinned
  @augur/design-system foundations reused verbatim under upstream's own role
  names, plus the approved website-direction overrides. The Brand Foundation
  PDF and the upstream DESIGN.md remain authoritative for brand decisions.
colors:
  primary: "#0e0e21"
  neutral: "#f5f5f8"
  surface-raised: "#ffffff"
  surface-muted: "#ececf2"
  border-light: "#e0e0e7"
  outline: "#cbcbd1"
  secondary: "#4a4b61"
  accent: "#2ae7a8"
  accent-hover: "#27d19b"
  accent-active: "#24bc8d"
  accent-deep: "#095e42"
  error: "#cf294e"
  error-hover: "#bc264a"
  surface-dark-1: "#161629"
  surface-dark-2: "#1d1d30"
  surface-dark-3: "#242438"
  outline-dark: "#383848"
  border-dark: "#71728a"
  secondary-dark: "#a1a1b8"
typography:
  display:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: 600
    lineHeight: 44px
    letterSpacing: -0.01em
  heading-1:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: 600
    lineHeight: 34px
    letterSpacing: -0.005em
  heading-2:
    fontFamily: Sora
    fontSize: 20px
    fontWeight: 600
    lineHeight: 26px
  editorial-title:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: 400
    lineHeight: 48px
    letterSpacing: -0.01em
  editorial-section:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: 400
    lineHeight: 34px
    letterSpacing: -0.005em
  editorial-label:
    fontFamily: Schibsted Grotesk
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0.12em
  lead:
    fontFamily: Schibsted Grotesk
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: Schibsted Grotesk
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-small:
    fontFamily: Schibsted Grotesk
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  metadata:
    fontFamily: Schibsted Grotesk
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
  ui:
    fontFamily: Sora
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  control:
    fontFamily: Sora
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
  button-label:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: 600
    lineHeight: 24px
rounded:
  none: 0px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  section: 64px
  gutter: 32px
  frame: 1200px
  header: 96px
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
  page-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body}"
  card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: "{spacing.xl}"
  card-dark:
    backgroundColor: "{colors.surface-dark-1}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.none}"
    padding: "{spacing.xl}"
  popover-dark:
    backgroundColor: "{colors.surface-dark-2}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    typography: "{typography.button-label}"
    rounded: "{rounded.none}"
    height: 48px
    padding: "{spacing.xl}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.primary}"
  button-primary-active:
    backgroundColor: "{colors.accent-active}"
    textColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.primary}"
    typography: "{typography.button-label}"
    rounded: "{rounded.none}"
    height: 48px
    padding: "{spacing.xl}"
  button-outline:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.button-label}"
    rounded: "{rounded.none}"
    height: 48px
    padding: "{spacing.xl}"
  button-destructive:
    backgroundColor: "{colors.error}"
    textColor: "{colors.surface-raised}"
    typography: "{typography.button-label}"
    rounded: "{rounded.none}"
    height: 48px
  button-destructive-hover:
    backgroundColor: "{colors.error-hover}"
    textColor: "{colors.surface-raised}"
  input:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    height: 48px
    padding: "{spacing.md}"
  input-dark:
    backgroundColor: "{colors.surface-dark-1}"
    textColor: "{colors.neutral}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    height: 48px
  field-error-indicator:
    backgroundColor: "{colors.error}"
    height: 2px
  metadata-light:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.metadata}"
  metadata-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.secondary-dark}"
    typography: "{typography.metadata}"
  mark-light:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.accent-deep}"
  divider:
    backgroundColor: "{colors.border-light}"
    height: 1px
  divider-dark:
    backgroundColor: "{colors.surface-dark-3}"
    height: 1px
  rule-outline:
    backgroundColor: "{colors.outline}"
    height: 1px
  rule-outline-dark:
    backgroundColor: "{colors.outline-dark}"
    height: 1px
  field-border-dark:
    backgroundColor: "{colors.border-dark}"
    height: 1px
---

# Augur Web Lab — Website Direction

## Overview

Augur Lituus is a decentralized resolution protocol: it answers questions about
what happened, and the answers carry money. The site's job is to make that
mechanism legible to people who are deciding whether to trust it, so the
register is **instrument panel, not brochure**. Nothing here is decorative for
its own sake, and nothing claims more certainty than the project has.

This file is a **consumer-side record**, not a design system of its own. The
foundations come from `@augur/design-system`, pinned by SHA-256 at commit
`fb35470` under `vendor/augur/registry/` and regenerated into
`src/styles/augur.css` by `bun run design-system:generate`. Those values are not
owned here and must never be hand-edited. The Brand Foundation PDF (v1.0,
7 September 2026) outranks both. What this file adds is the **website
direction**: the user-approved overrides in `src/styles/website-options.css` and
the composition conventions in `src/styles/site.css`, which exist nowhere else
in a form an agent can read.

Two commitments shape everything downstream. **Corners are square**, with no
exceptions anywhere in the system. And **surfaces are separated by hairlines and
space, never by shadow** — there is no shadow token in this system at all. The
result is closer to a technical document than to a product page. What it gives
up is warmth and approachability: nothing here softens itself to be liked. A
visitor who wants reassurance will not find it in the shapes, only in the
specificity of the claims.

The palette carries a third commitment that is easy to get wrong, so it is
stated early: **Augur Green is a fill, never an ink.** See Colors.

## Colors

Names in prose are the Brand Foundation's own: **Navy**, **Augur Green**,
**Deep**, **Paper**. Token names follow upstream's systematic names so this file
does not fork the vocabulary.

- **Navy (`primary`, #0e0e21):** the ink, and the dark-theme page. A near-black
  carrying a trace of blue rather than a true black, so large dark fields read
  as a material instead of a hole. 17.49:1 on Paper.
- **Paper (`neutral`, #f5f5f8):** the light-theme page. Off-white with the same
  blue-violet cast as the ink, so the two themes are the same material inverted
  rather than two unrelated palettes. Pure white is reserved for raised cards.
- **Augur Green (`accent`, #2ae7a8):** the one signal. The Brand Foundation
  prescribes "Green on Navy and Deep on Paper," and the numbers explain why:
  Green against Navy is 11.87:1, while Green against Paper is **1.47:1** —
  effectively invisible. Green is therefore a *fill* that carries a Navy label,
  or a decoration on a dark field. It is never text, never a hairline, and never
  a meaning-carrying mark on Paper.
- **Deep (`accent-deep`, #095e42):** the light-theme substitute wherever a green
  element has to carry meaning rather than decorate. 7.17:1 on Paper, matching
  the ratio the Brand Foundation prints on p.20. This is the single narrow
  exception to the website's bright-green-only direction, approved 19 September.
- **Secondary (`secondary`, #4a4b61 / `secondary-dark`, #a1a1b8):** supporting
  text. Both are the neutral ramp at reduced contrast, not a separate grey.

Every neutral in the ramp is tinted toward the Navy hue — `#f5f5f8`, `#ececf2`,
`#e0e0e7`, `#161629`, `#242438`. None is an `R=G=B` grey. That tint is what
keeps the light theme from reading as generic off-white.

**Error (`error`, #cf294e)** is Crimson, selected by the user for the website
layer. It is the one color in the system that is not derived from the brand
family, and it is deliberately narrow in scope: the error *message text* carries
the meaning, and Crimson reinforces it as a 2px bottom indicator. At 4.73:1 on
Paper it clears AA for normal text with little margin, so it is not used for
small or light-weight copy. See Do's and Don'ts.

The two themes are not a light palette and a dark palette. They are one set of
roles resolved against two grounds, which is why `--primary` is Green in both:
the website direction drops upstream's light-mode Deep substitution for *action
fills*, because a Green fill with a Navy label is 11.87:1 on either ground.

## Typography

**Sora** carries the voice; **Schibsted Grotesk** carries the prose. Two
grotesques is normally a non-pairing, and the split works here only because the
job division is strict rather than tonal: Sora appears on headings, control
labels and interface text; Schibsted Grotesk on everything meant to be *read* —
body, lead, small body, metadata, labels. Sora's wider apertures and taller
x-height hold up at 40px; Schibsted Grotesk is quieter at 16px and does not
compete. Only two weights exist in the system, 400 and 600, and only Sora uses
both. There is no 500 and no 700.

- **Display / heading-1 / heading-2** are the interface voice: Sora 600 with
  negative tracking that increases with size (-0.01em at 40px, -0.005em at 28px,
  none at 20px), because Sora's default spacing was drawn for text sizes.
- **Editorial title / editorial section** are the same sizes set at **400**.
  Long-form headings use weight to step *down*, letting size alone create order.
  This is what keeps a page of prose from shouting.
- **Editorial label** is the only uppercase role: 12px with +0.12em tracking.
  Tracking is never reduced to make a label fit; the label wraps instead.
- **Lead (18px/1.6)** introduces a section or supports the hero. **Body
  (16px/24px)** is the default. **Body-small (15px/1.6)** is for cards and
  steps. Line height rises as size falls, and the reading measure is capped at
  **65ch**.
- **Button-label (Sora 600, 16px)** is set once for every 48px control. Buttons
  do not carry per-instance label sizes.

Sora 400/600 and Schibsted Grotesk 400 are the only faces loaded, from pinned
Fontsource packages with `font-display: swap`. No Sora Light dependency exists,
which is why the editorial roles reuse the 400 face rather than going lighter.

## Layout

The content column is `min(1200px, 100% - 64px)`: 1200px maximum with 32px side
gutters, narrowing to 16px gutters below 700px. The header is deliberately
**wider** than the content it sits above, at `min(1472px, 100% - 112px)`, so the
navigation frames the page rather than aligning to it.

Sections are separated by `64px` of vertical padding and a **1px hairline**
(`divider`), dropping to 48px below 700px. The rule is doing the work a card
border would do in a more conventional system: content sits directly on the
page, and the line states where one idea ends.

Spacing is the upstream 4px-based scale (4 / 8 / 12 / 16 / 24 / 32) with two
composition values on top, `section: 64px` and `gutter: 32px`. Panel padding is
24px, stepping to 16px below 600px.

**The hero owns the first viewport.** Its `min-height` is
`max(610px, 100svh - 96px)`, tied to the viewport minus the header — 125px where
the header wraps to two rows below 940px wide. No part of the next section may
appear above the fold. A half-visible heading still mid-reveal reads as a
layout mistake, not as a scroll cue, so "peek" affordances and content-sized
heroes are both out.

Mobile design and QA are deferred at the user's request. The breakpoints above
are real and should be respected, but mobile is not a review surface right now.

### Resolution Machine lab proposal — September 20, 2026

Updated September 21: `/lab/homepage-redesign/` is a product homepage within the
established brand. A Navy masthead and hero pair the frontier headline and one
concise oracle definition with a local reporting example. The visitor selects an answer and backs
an illustrative report with 15 REP; its receipt remains open to challenge and can
be reset. The caption explicitly says no wallet or tokens are used. A concise
three-column principles band leads to a Navy four-stage mechanism, selectable
application outputs, a quarterly roadmap, actual-thumbnail blog and five-question
FAQ. The Navy contact/footer directory uses the supplied reversed logo locally.
The proposal has no theme control. It supersedes the research-led walkthrough and
separate bond explorer on this route.

The local frame is `min(1440px, 100% - 112px)`, narrowing to 40px and then 20px
side gutters. Existing type roles receive composition sizes: 50–78px desktop hero,
40px-and-up compact hero and 32–52px section headings. Sora remains the heading
and control voice; Schibsted carries prose. Hairlines, square geometry and space
organize the surface without shadows. Green-on-Navy headline and diagram emphasis
is scoped to this proposal; it does not change the general ink rules above. Green
fills retain Navy labels, and meaningful light-ground marks retain Deep. These
local sizes and treatments add no shared foundation tokens.

The mechanism pairs Navy explanatory copy with a Paper query view under “Builders
ask. REP holders resolve.” Four role-labeled stages follow query definition and
REP fees, reporting, an optional challenge, and application use of the final result.
The reporter chooses Yes / No / Invalid; a separate native checkbox reveals a
challenge and new appeal period. With no challenge, the selected report becomes
final when the appeal period closes. The challenged path shows the new answer as
tentative until its appeal period closes without another completed challenge.
Builder and reporter roles remain open activities. This structure replaces the
reporting-only explanation and automatic challenge path.

The restored hero texture recalls the original Augur incomplete grid: 146 seeded
3px Paper/Green squares occupy the outer Navy field, leaving a quiet center and
replacing the larger connected nodes. Its 1.2-second entrance and event-driven
180px cursor proximity response have no idle loop. It remains static without
JavaScript; reduced motion disables the response, forced colors hides the field,
and focus, resize, scrolling or leaving view clears the pointer effect. The user
restored the definition “Augur is decentralized oracle infrastructure for
establishing truth onchain.” with “Open to anyone. Controlled by no one.”; retain it.

Motion is finite and event-driven: hero underline and heritage-square entrance,
bounded mouse response, reporting feedback, selected diagram changes, region
entrances, roadmap completion checks/current marker/tracks and blog-image reveals. Fine-pointer
hover opens navigation menus on one surface that moves and resizes between them;
a brief grace period permits crossing gaps. Keyboard and touch retain explicit
controls, and native details remain the no-script fallback.
IntersectionObserver triggers region entrances once; the default content is fully
visible before enhancement. Reduced motion removes travel, and running effects
cancel on preference changes or page hiding. The mechanism alone becomes sticky
and advances on scroll when the viewport is at least 900px wide, the complete panel
fits its height and reduced motion is off. Manual step selection aligns the scroll
position with that step. Smaller or shorter viewports use manual controls, as
does reduced motion. A brief focus guard keeps browser focus scrolling from
changing the selected scene; deliberate scrolling releases it, and the section
opts out of scroll anchoring. Wheel and touch scrolling are not intercepted; there is no
scroll lock or idle loop. Native radios power the mechanism's stage and Yes / No /
Invalid choices; a native checkbox controls the optional challenge. CSS carries
these choices through the later views without JavaScript. Native
radios also power applications; native details power menus and the one-open FAQ.
Without JavaScript, the hero remains an unreported illustration and the native
controls remain available. Back/reset is an enhanced local demonstration.

The roadmap groups calendar-quarter milestones as Completed / Building now /
Up next, separate from the mission archive's fiscal article labels. Completed
items are muted, checked and struck through, with native disclosures for details
and sources. Desktop places this quieter history left of a prominent Navy Q3 2026
current-work panel; dashed future tracks sit below that panel. Checkmarks, the
current line/marker and future tracks receive finite entry motion with reduced-
motion and lifecycle cleanup. Future dates remain unannounced. The completed
fork belongs to Augur v2; Augur Lituus remains in development.
The blog preserves sourced artwork in
full; `docs/redesign-blog-provenance.json` records originals and proportional
responsive variants. Neither historical milestones nor imagery imply deployment.

Desktop splits hero, mechanism copy/query and application compositions; tablet reorganizes navigation
and blog rows. Mobile uses a 2×2 manual mechanism selector, stacked roadmap groups
with a vertical future track, stacked
application outputs and full-width article artwork. Mobile design and QA are
resumed for this proposal only. The current homepage's layout, theme and motion
rules remain specific to `/`; pinned foundations, the existing token frontmatter
and other site surfaces are unchanged. Verification is recorded separately in
`docs/verification.md`.

## Elevation & Depth

**There is no elevation.** No shadow token exists, and none should be added.
Depth is carried by three things, in this order of preference:

1. **Space.** Most apparent depth problems are grouping problems, and grouping
   is solved by the spacing scale.
2. **Hairlines**, of which there are three and they are not interchangeable.
   `divider` is the quiet rule that *divides* — between sections and inside
   panels (#e0e0e7 light, #242438 dark). `field-border-dark` is the component
   border that *contains* a card or input (#e0e0e7 light, #71728a dark); in
   light mode it coincides with the quiet rule, in dark it is deliberately much
   brighter so a card edge survives against Navy. `rule-outline` *encloses*
   containers and outline buttons (#cbcbd1 light, #383848 dark) and is generated
   as 18% foreground mixed into the background, so it re-derives per theme.
3. **Tonal steps.** Light: Paper page → white card. Dark: Navy page →
   `surface-dark-1` card → `surface-dark-2` popover. Three steps, each about one
   perceptual notch apart, which is all the hierarchy a flat system needs.

Pressed controls use an `inset` box-shadow only — a 2px inner top edge, and a
3px inner bottom edge on hover for filled variants. These read as the surface
deforming, not as the element lifting, and they are the only shadows permitted.

### Motion

Motion exists to confirm an action, to reveal structure on entry, and in exactly
one sanctioned continuous case. Everything else is static.

- **State changes** on controls run 180ms `ease-out`; fields run 160ms. Geometry
  stays stationary — hover changes color, border and inset edge only, never
  position or scale.
- **Scroll reveals** are CSS-only, driven by `animation-timeline: view()` and
  applied by attribute (`data-reveal`, `data-reveal-children`). An element
  settles over 120–240px of scrolling; staggered children start 48px apart.
  Because progress follows scroll position rather than a one-shot observer,
  anchors, find-in-page and restored scroll always show the correct state.
- **The hero arrival** is a finite 1.5s staged sequence that settles immediately
  on focus, pointerdown, key input or page hide.
- **Signal Loom** is the one continuous animation on the site, explicitly
  authorized by the user as an exception to the no-idle-loop rule. It suspends
  when offscreen, hidden or paused.

**What does not animate:** layout. Only transform and opacity are animated, so
copy edits can never cause a shift. Nothing animates on elements taller than the
viewport, on the final rows of a page, or on text the visitor is trying to read.
Browsers without scroll-driven animations, reduced-motion users and print all
get the static, fully visible page — there is no JavaScript fallback, by design.

## Shapes

**Zero radius, everywhere, with no scale.** `rounded.none` is 0px and it is the
only value: buttons, inputs, cards, popovers, panels and the theme toggle all
share it. This is the system's loudest commitment and its clearest sacrifice.
Introducing a 4px "just slightly soft" radius anywhere would not read as a
refinement, it would read as a mistake, because nothing else on the page would
agree with it.

Controls are **48px square-shouldered** across the website layer — buttons,
fields and the theme toggle share the height, and utility controls sit at 44px
to hold the minimum touch target. Icons are 20px, bold outlined, optically
centered against a 16px Sora label.

The small square is the system's one recurring graphic device: 3px for texture
(the hero field) and 5px for nodes at line crossings and card marks. Neutral
squares are muted grey; accent squares are Green. It is a texture, not an icon
language, and it carries no meaning on its own.

## Components

Every control in the website layer is composed from the same shared roles rather
than per-component values, which is why `button-label` and the 48px height are
defined once. The registry's Button, Card and Input are used unmodified; the
website layer restyles them from the outside through custom properties and never
by editing `src/components/ui/`.

- **Buttons.** `button-primary` is a Green fill with a Navy label in both
  themes, at 11.87:1. Hover and active darken the fill toward Navy (9.68:1 and
  7.84:1) and add an inset bottom edge; the label never moves. `button-outline`
  carries a `rule-outline` border and fills with a 6% foreground tint on hover,
  deepening to 10% when pressed. `button-secondary` sits on the muted surface.
  Ghost buttons reveal a 2px underline that wipes in from the left.
  `button-destructive` is the only Crimson fill.
- **Inputs** are filled, not outlined: muted surface, transparent border, and a
  bottom indicator instead of a perimeter ring. Focus lifts the surface 5% and
  draws a 1px inset bottom edge; keyboard focus strengthens it to 2px. Invalid
  fields keep the visible message text as the primary signal and add the
  2px Crimson `field-error-indicator`. Forced-colors mode restores a real
  outline.
- **Focus** is a 2px outline at 2px offset from the theme's `--ring`, painted by
  one shared `:focus-visible` rule rather than per-component CSS. Website
  controls offset it to 3px so it clears the square shoulder.
- **Cards** are a 1px border on a raised surface with 24px padding. They are for
  genuinely discrete, comparable objects. A list of features is a list, not a
  row of cards.
- **Disabled** controls drop to the muted surface with muted-foreground text and
  stay fully opaque; the label remains readable and present in the DOM.

### Links and navigation arrows

Internal navigation carries **no arrow**, including links to sections, the
homepage and the lab. The `↗` glyph is reserved for destinations outside the
website, and the destination decides — not the button variant, and not whether a
new tab opens. Direct actions (Save, Copy, Remove, toggles, previews) never take
a navigation arrow. Decorative arrows are hidden from assistive technology and
icon-only links keep accessible labels. The homepage hero actions are an
approved exception: verb labels, both arrows omitted.

## Do's and Don'ts

- **Do** treat Augur Green as a fill that carries a Navy label. **Don't** set
  Green as text, as a hairline, or as a meaning-carrying mark on Paper — it is
  1.47:1 there, below even the 3:1 required of non-text indicators.
- **Do** switch to Deep (#095e42) for any green element in light mode that
  carries meaning rather than decoration: status markers, selected-tab
  underlines, progress fills. **Don't** switch decorative green — hero texture
  squares and the loom strands stay bright in both themes.
- **Do** keep the accent under ~5% of the surface with exactly one job per view:
  the primary action, or live state. **Don't** add a second accent hue; if
  something needs emphasis, use weight, size or space.
- **Do** let the visible message text carry an error. **Don't** use Crimson as
  the sole signal, and don't set it in small or light-weight type on Paper —
  4.73:1 leaves no margin.
- **Do** use `rounded.none` on everything. **Don't** introduce a second radius
  anywhere, for any element class.
- **Do** separate surfaces with hairlines, tonal steps and space. **Don't** add
  a drop shadow, a glow, a glassmorphic blur or a decorative background
  gradient; the only permitted shadows are the inset pressed and hover edges.
- **Do** keep the hero at `100svh` minus the header. **Don't** shorten it so the
  next section peeks above the fold as a scroll cue.
- **Do** reach for the semantic roles — `--background`, `--foreground`,
  `--primary`, `--muted-foreground`, `--border-quiet`, `--web-outline`.
  **Don't** paint from a raw `--augur-color-*` token in website code; the
  semantic role is what makes a component survive a theme switch.
- **Do** animate transform and opacity only, with the shared `data-reveal`
  vocabulary. **Don't** add a per-section bespoke animation, a fade on text
  being read, or an idle loop outside Signal Loom.
- **Do** regenerate foundations with `bun run design-system:generate` and verify
  with `bun run design-system:check`. **Don't** hand-edit `src/styles/augur.css`,
  `src/styles/augur-typography.css`, `src/components/ui/` or the vendored
  registry snapshots — drift there fails `bun run check`.
- **Do** cap reading measure at 65ch and set body flush left. **Don't** center
  body copy past a single sentence.
