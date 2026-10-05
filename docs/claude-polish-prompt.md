# Claude handoff: polish the Augur visual prototype and synchronize Figma

Please work directly in this repository and its existing Augur Figma file. Complete the design and implementation work, rather than stopping at recommendations. You have freedom to make thoughtful design decisions within the direction below.

## Goal and authorization

This website is an interactive visual prototype. The goal is a polished, professional website that matches Figma as closely as possible, with Figma also reflecting the improvements made to the website. Backend functionality and production launch are not the goal of this pass. Preserve visible design elements even when they have no working service behind them.

**I explicitly authorize you to edit the existing Figma file for this task.** This supersedes my earlier instruction that Figma was read-only, including older repository documentation. The requested continuous animations supersede the earlier play-once rule for those scenes. Restoring the newsletter field supersedes the previous follow-links-only fallback. Preserve unrelated content and designs; don't redesign the whole site, remove sections or simplify away controls merely because their backend is unavailable.

Repository: `/home/goddard/.codex/worktrees/8f8e/augur-web-lab`

Figma: https://www.figma.com/design/3RgHvLRqEZDsAmcBQ7tvVa

- Canonical homepage: `28:7`, on page `28:2`.
- Related detail frames: `214:1203`; site pages: `214:1204`; components: `214:1205`.
- Inspect the live file before editing; these IDs are starting points, not a substitute for checking its current state.

Read `AGENTS.md`, `DESIGN.md`, `docs/design-system.md`, `docs/motion.md`, and `docs/decisions.md` for context. This new brief takes precedence wherever it conflicts with the old brief. Keep Augur's brand, logo geometry, typography, Navy/Paper/Green palette and pinned upstream components intact. Use the existing static Astro/Bun stack and lightweight animation techniques.

## Requested improvements

1. **Loop the Permissionless, Decentralized and Trustless animations.** Start each when its section reaches a sensible viewport threshold, then repeat seamlessly for as long as it remains visible. Do not settle permanently after one cycle. Pause when off-screen or the tab is hidden, resume when visible, and respect reduced motion with a meaningful static state. Add precise Figma notes for the trigger, sequence, duration, easing and looping behavior, plus representative keyframes or prototype states.

2. **Make the answer statement real text and animate the ribbon.** “With Augur, no party controls the answer.” must be selectable, copyable HTML text on the website and editable text in Figma, not baked into an image or outlined paths. Preserve its visual composition. Design a purposeful ribbon animation that supports the statement without making it harder to read. Update the corresponding Figma artwork, states and motion notes.

3. **Enrich “What could you build?”** Review prediction markets, insurance payouts, DAOs and the other existing options. Improve their hierarchy, spacing, selection states and visual explanation. Use concise supporting details, a useful example or icons where they clarify what each application does. Make the section feel richer without crowding it or inventing product capabilities or claims. Choose and implement a coherent treatment in both code and Figma.

4. **Restore and preserve the newsletter email field and action.** Inspect the contact/newsletter area in Figma and restore its designed email field and button, even though subscriptions are not connected. Keep any other designed form fields. Controls may demonstrate focus, validation and interaction locally, but must not send data, claim delivery or claim a subscription succeeded. Do not replace the designed field with a list of links. The prototype should retain the intended visual experience.

5. **Add clear hover and focus feedback to closed FAQ questions and similar interactive rows.** Make unopened questions visibly respond to hover, with restrained, consistent highlighting and equivalent keyboard focus feedback. Keep open, hovered and focused states distinguishable. Reflect these states in Figma, with implementation notes.

6. **Improve separation in the blog section.** Evaluate subtle dividers, spacing and alignment to make individual posts easier to scan. Use understated separators where they help; preserve the overall composition and avoid unnecessary cards or heavy borders. Apply the chosen treatment in Figma too.

7. **Make buttons consistent.** Audit all website actions, especially “View all posts” and “Learn about REP.” Actions with the same role should use consistent typography, height, padding, border, icon treatment and hover/focus/pressed states. Preserve intentional primary, secondary and text-action hierarchy. Update the corresponding Figma components/instances without hand-editing pinned upstream code.

8. **Remove this exact visible sentence:** “Proposed rules for Augur Lituus, which is in development.” Remove it from the relevant website section and matching Figma frame. Do not replace it with another disclaimer in the same location or treat this removal as evidence that the product has launched. Preserve factual accuracy elsewhere.

9. **Replace the confusing square animation in “What can you do with REP?”** Develop a clearer visual explanation of the existing optional reporting/challenging actions and their stakes. The current unexplained square arithmetic is not working. Use readable relationships, meaningful labels and purposeful motion rather than abstract moving blocks. Preserve the underlying sourced mechanism and avoid implying that holding REP requires participation. Implement the improved scene and its Figma states/notes.

10. **Polish the query UI.** Inspect the existing question/query walkthrough and improve its hierarchy, labels, outcome choices, criteria disclosure, spacing and state transitions. Make it feel like a coherent professional interface while retaining its explanatory purpose and actual content. Keep the website and Figma aligned across its states.

11. **Make the hero squares dynamic.** Give the main square composition purposeful ongoing motion and the background squares subtle movement, with a clear highlight response on hover. Keep the headline and actions readable and stable. Avoid frantic motion or layout shifts; keep touch usable without hover and supply a reduced-motion state. Record the motion and hover behavior in Figma.

12. **Polish the navbar and dropdown transitions.** On pointer devices, hovering an item should open its dropdown. Moving directly to another item should switch the displayed panel immediately, without a close/reopen flash or a collapsed gap. Keep the menu open as the pointer moves into its panel; close it predictably after leaving the navigation area. Preserve click/tap, keyboard navigation, visible focus and Escape behavior. Refine spacing, alignment and active states. Show the relevant Figma dropdown states and document the switching behavior.

13. **Use icons where they clarify meaning.** Keep a consistent icon family, size, weight and alignment. Do not add an icon to every label or replace clear labels with unexplained symbols.

## Working approach and quality bar

- Inspect the actual rendered website and corresponding Figma frames before choosing solutions. Preserve the existing section order and content except for the requested changes and useful, factually supported refinements.
- Exercise independent design judgment. Research credible UI/UX references on the web when uncertain, then apply the reasoning to Augur's own visual language. Do not stop to ask me about routine design decisions.
- Work in small, reversible steps. For each area, update the website and matching Figma design together. Use real editable Figma elements and appropriate components/variants. Add clear notes adjacent to the relevant frames without changing website-layout dimensions just to fit documentation.
- Represent interactive states and animation keyframes in Figma. Where Figma cannot faithfully execute a browser animation, document the exact intended behavior and show representative states; do not claim prototype parity that was not achieved.
- Aim for near 1:1 visual parity at matching desktop dimensions, then keep responsive layouts coherent. Compare screenshots, spacing, typography, colors, icons, button states and component dimensions. A visually accurate placeholder is preferable to deleting a designed control.
- Keep motion smooth and resource-conscious. Test loops, rapid hover switching, off-screen pause/resume, reduced motion and keyboard operation. Keep content readable with JavaScript disabled.
- Update repository guidance and copy/state tests where this brief intentionally changes the old contract. Preserve original source evidence and explicitly record new authorized deviations; don't silently rewrite history or disable checks to get green results.

## Verification and handoff

The starting rebuild contains 25 content routes plus a 404. Its last recorded verification passed a fresh frozen Bun install, type checks, build, 42 browser tests and 1,949 checked link destinations. These are baseline results, not proof that your edits pass. Existing startup long-task, real BFCache coverage and editorial/launch gates are documented in `docs/decisions.md`; this task is visual prototype polish, not permission to publish or to invent missing launch approvals.

Run `bun run check`, `bun run build`, relevant link/copy/budget checks and the browser tests after your changes. Review the affected pages and interactions in a real browser at desktop and responsive widths. Preserve the pinned design-system integrity checks. Explain any remaining failures accurately.

Finish with a concise summary of what changed, the Figma frames/components updated, before/after screenshots or comparison evidence, checks actually run and any remaining limitations. Do not push, publish or deploy. If Figma access is unavailable, continue the website work and prepare precise changes/notes for Figma, but explicitly report that synchronization remains unfinished.
