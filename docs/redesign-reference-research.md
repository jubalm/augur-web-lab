# Reference research — September 21, 2026

Five current websites were opened and their mechanism chapters visually inspected.
These are composition references, not assets or templates to copy.

| Source | Useful principles | What this proposal avoids |
| --- | --- | --- |
| [Chronicle](https://chroniclelabs.org/) | Confident left-aligned type, light/dark chapters, broad source-to-verification diagrams; current site emphasizes institutional verification | Signal lines crossing text, long prose, count-ups presenting intermediate numbers |
| [DIA](https://www.diadata.org/) | Concrete promise and specific source/processing/methodology/feed/verification stages | Repeated feature and partner grids, excessive ecosystem inventory |
| [Melee PMM](https://pmm.melee.markets/) | Specific action/consequence demonstrations of repricing and pool mechanics | Repeated zigzag structure, launch language that postpones the mechanism |
| [UMA](https://uma.xyz/) | Literal lifecycle names and a visual object continuous across stages | Excessive screen distance for similar content |
| [RedStone](https://www.redstone.finance/) | Typographic contrast, integration specificity and data presentation | Rotating broad claims, repetitive news/product/investor grids |

Synthesis: one question remains the protagonist; a reporting bond attaches to an
answer; challenge changes the selected branch; finality turns it into application
input. The narrative introduces economics only after the process is understood.
No reference branding, graphics, proprietary assets or copy were reused.

## Implementation research

- [MDN Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API): discrete stage changes without a continuous per-pixel scroll handler.
- [MDN animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline): current limited availability makes it unsuitable as the sole carrier of essential story states.
- [MDN pathLength](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/pathLength) and [stroke-dashoffset](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/stroke-dashoffset): normalized path tracing with numeric units.
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) and [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/): useful for tightly scrubbed multi-scene timelines; unnecessary for this discrete four-state story.
- [MDN Animation.cancel](https://developer.mozilla.org/en-US/docs/Web/API/Animation/cancel): cancelable finite animation, with cleanup and reduced-motion handling.

The final approach adds no packages, scroll smoothing or WebGL. Existing Astro,
SVG, native disclosures/radios and a scoped observer/controller cover the design.
