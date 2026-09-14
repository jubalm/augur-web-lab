# Website icon proposal

Reviewed September 12, 2026, against primary documentation.

| Family | Relevant capability | Assessment for this website |
| --- | --- | --- |
| [Phosphor](https://github.com/phosphor-icons/core) | SVG assets grouped by authored weight; MIT license. | Current proposal. Light, Regular and Bold outlines plus Filled let us judge actual shapes at the same size. More useful for the unresolved weight/fill decision than changing CSS stroke width. |
| [Carbon](https://carbondesignsystem.com/elements/icons/code/) | Explicit 16, 20, 24 and 32 px sizes. | Strong alternative if the next composition calls for a stricter technical character. That visual fit is a design judgment, not a brand rule. |
| [Radix](https://www.radix-ui.com/icons) | A compact 15×15 set, MIT licensed. | Good for dense utility controls; less suited to the requested range of editorial icon weights. |

Use neutral icons after labels. The current default is Phosphor Regular outlined; Filled is a genuine alternate glyph, not a dark tile behind an outline. Weight controls affect outlines; Filled has its own drawing. Icons remain decorative and controls carry accessible text labels. No font/CDN or client icon library is loaded. Exact asset URLs, revision and checksums are in `icon-provenance.json`.

September 13 contact refinement adds Discord, Telegram, GitHub and X logos in Bold from the same pinned revision. These decorative service identifiers precede their headings or social labels; external arrows remain after link labels. This follows the current Bold selection without changing existing assets or adding an icon package.
