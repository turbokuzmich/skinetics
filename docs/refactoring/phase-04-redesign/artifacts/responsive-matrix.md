# Phase 04 responsive matrix

Reviewed: 2026-08-24 against the local production build

Method: rendered DOM and bounding-box inspection in the in-app browser. Every row checked viewport width against document scroll width, exactly one H1/main/header/footer, and every visible `a`, `button`, `input`, `textarea`, and `select` against the 44×44 px target contract.

The homepage and every footer include the doctor form. `/contacts` also includes the feedback form, so those form states and labels were inspected within the listed route rows. Focus-trap, Escape, close-link, and trigger-restoration behavior is additionally protected by the five focused shell tests.

| Viewport | Route/template | Horizontal overflow | H1/main/header/footer | Targets below 44×44 | Embedded form coverage |
|---|---|---:|---|---:|---|
| 390×844 | `/` homepage | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 390×844 | `/catalog` listing | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 390×844 | `/catalog/red_pepper` serum | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 390×844 | `/catalog/renewal` cream | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 390×844 | `/about` trust page | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 390×844 | `/contacts` contact page | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor + feedback |
| 768×1024 | `/` homepage | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 768×1024 | `/catalog` listing | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 768×1024 | `/catalog/red_pepper` serum | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 768×1024 | `/catalog/renewal` cream | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 768×1024 | `/about` trust page | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 768×1024 | `/contacts` contact page | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor + feedback |
| 1280×900 | `/` homepage | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 1280×900 | `/catalog` listing | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 1280×900 | `/catalog/red_pepper` serum | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 1280×900 | `/catalog/renewal` cream | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 1280×900 | `/about` trust page | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 1280×900 | `/contacts` contact page | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor + feedback |
| 1440×900 | `/` homepage | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 1440×900 | `/catalog` listing | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 1440×900 | `/catalog/red_pepper` serum | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 1440×900 | `/catalog/renewal` cream | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 1440×900 | `/about` trust page | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor form |
| 1440×900 | `/contacts` contact page | 0 px | 1 / 1 / 1 / 1 | 0 | Doctor + feedback |

Additional inspection confirmed ordered headings, accessible labels and alternatives, wrapping long product names, visible focus styling, and no sticky purchase action. Lighthouse separately confirmed automated accessibility 100 on the mobile and desktop homepage profiles.
