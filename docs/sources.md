# Sources and provenance

Snapshot date: 5 October 2026. The owner brief is the first authority; canonical homepage frame `28:7` wins over older variants. Figma is read-only and is never needed to build the site. The Brand Foundation remains the identity authority; its local reference is documented in `source-material.md`, which is preserved unchanged.

## Source register

| Content | Source | Treatment |
| --- | --- | --- |
| Homepage copy, geometry and states | [Augur.net Figma](https://www.figma.com/design/3RgHvLRqEZDsAmcBQ7tvVa/Augur.net?node-id=28-7), last updated 2 October 2026 | Canonical approved copy; extracted typed data |
| Summary, build detail and launch notes | `figma-notes.json` | Complete read-only text extraction from Homepage, Section details and Site pages, with exact node IDs; no note cards found on Components |
| Colours, typography, component states | Figma Components `214:1205`; Augur Brand, Website/Navy, Size & motion collections only | Local website roles over immutable pinned primitives |
| Reporting, challenges, Invalid, fork universes | [January 2026 whitepaper](https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf) | Proposed mechanism, not deployed capability |
| Payout wording | Whitepaper §§4.0.2 and 4.3.1; Figma note `305:1618` | Returned bond + query fee share; 80% of losing bonds to winners, 20% burned; visible copy says “most” |
| Reboot and Foundation | [1 April 2025 roadmap](https://www.augur.net/blog/augur-reboot-2025/) | Historical origin, no new promises |
| Generalized oracle direction | [13 May 2025 article](https://www.augur.net/blog/generalized-augur/) | Proposed direction; conditional language retained |
| First completed fork | [5 August 2026 report](https://www.augur.net/blog/post-fork-announcements/) | Mainnet history; no migration instructions |
| Current REP token (REP page token card, FAQ) | [augur.net/rep](https://www.augur.net/rep/), the Lituus Foundation's REP contract reference (published 5 August, updated 13 August 2026), and the [Etherscan token page](https://etherscan.io/token/0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D), read 19 October 2026 | Listing name AUGUR, on-chain name Reputation, symbol REPv2_Yes_1, Ethereum mainnet (chain ID 1), 18 decimals, contract `0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D` (Etherscan: source verified, `ReputationToken`). REPv1 and REPv2 contracts are “now legacy”; no other address is published by these sources, so none is shown. Maintainers confirm before launch |
| Moon Fork timeline, migration closure and scam guidance (REP page, FAQ) | [augur.net FAQ](https://www.augur.net/faq/), read 19 October 2026 | Dispute from 8 April 2026 over whether Artemis II lifted off; escalation to early June; migration window to 3 August 2026, enforced by the fork contract and not reopenable; AUGUR on exchanges is REPv2_Yes_1; wallets may need the token added by address; “Augur and the Lituus Foundation will not DM you first”. Its “expected to be worthless” lines are left off the site (no value claims) |
| Augur Lituus fork rules (REP page) | Whitepaper §2.2 and §§4.2.1–4.2.4, 4.3.3 | Fork threshold a share of all REP (0.5–4% suggested), one universe per outcome, two-week one-way migration window, open queries restart reporting, most-migrated fork wins, original contracts forward to it. Proposed design; Lituus-CS forking is not implemented yet |
| REPv2 migration figures, implementation progress, tests and pull requests | [Q2 report, 1 October 2026](https://www.augur.net/blog/q2-2026-progress-report/) | About 40 → 300+ tests across 22 merged PRs; historic evidence, not this website's test count |
| Implementation source | [Lituus-CS](https://github.com/AugurProject/Lituus-CS) | Public development, no readiness claim |
| Quote about implementation and audits | [21 July 2026 article](https://www.augur.net/blog/augur-testing-past-building-future/) | Exact supplied quote retained |
| Zoltar and Augur Stratoblast | [Zoltar repository](https://github.com/AugurProject/zoltar) and [system overview](https://github.com/AugurProject/zoltar/blob/main/docs/explanation/zoltar.html) | Repository uses “Statoblast”; owner requires “Stratoblast” on website pending confirmation |
| Dark Florist and Foundation destinations | Official [Augur archive](https://www.augur.net/blog/) footer | Found and verified, not invented |
| About: 2015 crowdsale, 2018 mainnet, who funds, builds and reviews, “no company or committee should hold the final word” | [21 July 2026 article](https://www.augur.net/blog/augur-testing-past-building-future/), [Q2 report](https://www.augur.net/blog/q2-2026-progress-report/) (“stewardship of Augur”, July milestones, current focus) | Read 19 October 2026. The 21 July post is the newest of the posts that disagree on launch year; it dates the crowdsale, not a founding. It describes Dark Florist without naming Stratoblast or Zoltar |
| About: dispersed knowledge; no centralized backstops or vetoes | [Whitepaper](https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf) §1 and §2 | Paraphrased; the paper's Hayek quotation is not reused |
| About: share of migrated REP that chose Yes | [5 August 2026 report](https://www.augur.net/blog/post-fork-announcements/) and Q2 report | 99.97% under both reports' totals (see `decisions.md`, About page rebuilt) |
| Social and public source URLs | `src/data/links.ts`, `link-verification.json` | HTTP GET returned 200 for public destinations on snapshot date; reachability does not certify content or protocol status |
| Blog and guide stand-ins | Figma and owner brief only | Marked placeholder; unavailable editorial content blocks launch |

The Q2 report states 6,398,081.41 REPv2 migrated to Yes and 1,786.23 to No (6,399,867.64 total, about 58.2%), separately listing 6,545,760.43 total REPv2_Yes_1 supply. The August report instead describes supply totals as migration. Keep the approved canonical copy and resolve its attribution before launch.

The local reference named `zoltar-whitepaper.html` is a historical HTML paper. The live repository currently exposes a system overview and protocol documentation rather than that paper path. The registry points to the reachable overview; confirmation of the paper destination remains a blocker.

The Figma tool inventory exposes no comment-thread reader. Canvas notes were read; comment threads were not inspected. Original local reference files were read only.

## Figma node map

| Page or section | Node |
| --- | --- |
| Homepage / canonical desktop | `28:2` / `28:7` |
| Announcement / Header / Hero | `208:1205` / `30:28` / `31:51` |
| Hero art / background / arrival / glow | `283:3403` / `116:127` / `121:152` / `117:127` |
| Who decides / tenet motion | `239:474` / `250:717` |
| Applications / picker | `135:255` / `139:258` |
| How it works / walkthrough / bond rounds | `207:1590` / `146:470` / `147:435` |
| REP / square math | `304:645` / `305:548` |
| Roadmap / track | `162:485` / `162:454` |
| Blog / cover variants | `35:75` / `154:762` |
| FAQ / accordion / row | `36:86` / `166:943` / `166:557` |
| Footer / field / newsletter / directory | `37:91` / `167:846` / `174:836` / `167:955` |
| Header dropdowns | `43:114` |
| Section details / Site pages / Components | `214:1203` / `214:1204` / `214:1205` |
| About / Products / Learn / Learn guide | `218:45` / `219:81` / `220:119` / `261:1184` |
| REP / Blog / Blog article / FAQ / Contact | `221:151` / `222:181` / `257:952` / `223:281` / `28:8` |
| Motion / timeline root | `257:1654` / `257:1661` |
| Buttons / fields / links / status / outcome chips | `261:434` / `261:1851` / `261:1930` / `261:1937` / `261:1944` |
| Cross anywhere / Peer mesh / No authority | `261:2071` / `261:2123` / `261:2183` |
