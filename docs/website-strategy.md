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
