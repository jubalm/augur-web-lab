# Design implementation and Figma sync

Working file: [Augur.net](https://www.figma.com/design/3RgHvLRqEZDsAmcBQ7tvVa/Augur.net?node-id=28-2), key `3RgHvLRqEZDsAmcBQ7tvVa`. The canonical desktop homepage is `28:7`; homepage copy wins over older Section-details variants. The node map and complete note extraction are in `sources.md` and `figma-notes.json`.

Read design context and screenshots for every target, then variables and recursive motion context for animated frames. Until 5 October 2026 the file was read-only. The owner's polish brief (`docs/claude-polish-prompt.md`) now authorizes edits, using Augur variables, text styles and components, with states, keyframes and notes on Section details. The website changes first and Figma follows on request (see Pending Figma sync below). After changing homepage copy in Figma, re-extract visible TEXT nodes of `28:7` into `src/data/homepage-copy-source.json` and run `bun run check:copy`. Ignore the unrelated leftover variable collections and styles. The tool inventory currently exposes no comment-thread reader, so this rebuild cannot claim comment review.

Extract reusable state data and coordinates into typed source files once. Build semantic Astro components with local layout styles, foundation roles and existing primitives. Do not retain generated framework snippets or a runtime Figma dependency. Compare rendered screenshots at 1440 with the canonical node, inspect interaction variants and seek keyframes. Record deviations and source conflicts in `decisions.md`; report exact evidence and unperformed checks honestly.

Responsive compositions below 1440 are authorized adaptations: flexible margins, stacked heading rows and cards, a native mobile navigation dialog, and stacked tab controls. Preserve copy, relationships, order and Navy identity rather than absolute pixel positions.

## Pending Figma sync

Since 6 October 2026 the owner works website-first: Figma waits until the owner says “update figma”. Meanwhile, add each website change's Figma counterpart here (component or variant, Homepage `28:7` instance, Section details keys or state frame, note text). On “update figma”, sync the whole list in one pass, generating keys from the website's choreography rather than retyping them, record the result in `decisions.md` and clear the synced items.

Nothing is pending: the list was synced on 7 October 2026, and the Brand assets page was built in Figma alongside the website on 13 October 2026 at the owner's request (see `decisions.md`).
