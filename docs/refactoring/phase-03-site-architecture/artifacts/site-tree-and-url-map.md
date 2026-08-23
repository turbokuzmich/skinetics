# Site tree and URL map

- **Reviewed:** 2026-08-23
- **Decision scope:** architecture specification only; candidate routes remain absent until their publication gates pass

## Canonical site tree

```text
/
├── catalog/                              existing, indexable
│   ├── red_pepper                        existing, preserve exact URL
│   ├── copper_tripeptide                 existing, preserve exact URL
│   ├── climbazole                        existing, preserve exact URL
│   ├── ultra-lift                        locally implemented, preserve
│   └── renewal                           locally implemented, preserve
├── serum                                 existing category, indexable
├── cream                                 locally implemented category, indexable
├── brands/                               planned portfolio hub
│   ├── dr-health                         planned brand page
│   ├── skineticslab                      planned brand page
│   └── neon-beard                        planned brand page
├── concerns/                             planned concern hub
│   ├── hair-loss-care                    candidate, evidence gate required
│   ├── dandruff-prone-scalp              candidate, evidence gate required
│   └── daily-face-care                   candidate, evidence gate required
├── ingredients/                          existing placeholder remains noindex
│   ├── copper-tripeptide-ghk-cu          candidate, evidence gate required
│   ├── niacinamide                       candidate, evidence gate required
│   ├── climbazole                        candidate, evidence gate required
│   ├── piroctone-olamine                 candidate, evidence gate required
│   └── peptides                          candidate, evidence gate required
├── expert/                               planned expert-content hub
│   ├── choosing-scalp-serum              candidate brief
│   ├── how-to-apply-scalp-serum          candidate brief
│   └── how-to-use-peptide-face-cream     candidate brief
├── about                                 existing, preserve and strengthen
└── contacts                              existing, preserve
```

## Current and planned URL map

| Path | Page class | Current/planned state | Intended purpose | Indexation decision | Parent | Required inbound link | Earliest phase |
|---|---|---|---|---|---|---|---|
| `/` | Home | Existing; five-product local release candidate | Portfolio discovery and task-led product selection | Indexable, self-canonical | — | Direct entry | Existing; Phase 04 template review |
| `/catalog` | Catalog listing | Existing | Browse all products by stable product type | Indexable, self-canonical | `/` | Home header/content | Existing |
| `/serum` | Category listing | Existing | Browse scalp serums | Indexable, self-canonical | `/` | Home and catalog | Existing |
| `/cream` | Category listing | Locally validated; deployment pending | Browse face creams | Self-canonical; indexable after deployment | `/` | Home and catalog | Phase 02 deployment |
| `/catalog/red_pepper` | Product | Existing | Red-pepper and niacinamide scalp-serum decision | Indexable, self-canonical | `/serum` | Catalog and serum listing | Existing |
| `/catalog/copper_tripeptide` | Product | Existing | Copper-tripeptide GHK-Cu scalp-serum decision | Indexable, self-canonical | `/serum` | Catalog and serum listing | Existing |
| `/catalog/climbazole` | Product | Existing | Dandruff- and seborrhea-prone scalp-care serum decision | Indexable, self-canonical | `/serum` | Catalog and serum listing | Existing |
| `/catalog/ultra-lift` | Product | Locally validated; deployment pending | Neon Beard Ultra Lift face-cream decision | Self-canonical; indexable after deployment | `/cream` | Catalog and cream listing | Phase 02 deployment |
| `/catalog/renewal` | Product | Locally validated; deployment pending | SkineticsLab ReneWal face-cream decision | Self-canonical; indexable after deployment | `/cream` | Catalog and cream listing | Phase 02 deployment |
| `/about` | About | Existing | Portfolio, company, trust, and legal context | Indexable, self-canonical | `/` | Header/footer and home trust content | Existing; strengthen in Phase 04 |
| `/contacts` | Contacts | Existing | Contact details and feedback | Indexable, self-canonical | `/` | Header/footer and about | Existing |
| `/ingredients` | Ingredient hub placeholder | Existing thin placeholder | Future ingredient discovery | `noindex, follow`; outside sitemap and navigation | `/` | None while unfinished | Phase 05 after gate |
| `/brands` | Brand hub | Approved page class, route absent | Explain the Skinetics portfolio and expose published brand pages | Absent; evidence gate required | `/` | Home, about, and navigation after publication | Phase 04 |
| `/brands/dr-health` | Brand | Approved template, route absent | Verified Dr. Health identity and products | Absent; evidence gate required | `/brands` | Brand hub, about, and products | Phase 04 or later |
| `/brands/skineticslab` | Brand | Approved template, route absent | Verified SkineticsLab identity and products | Absent; evidence gate required | `/brands` | Brand hub, about, and product | Phase 04 or later |
| `/brands/neon-beard` | Brand | Approved template, route absent | Verified Neon Beard identity and products | Absent; evidence gate required | `/brands` | Brand hub, about, and product | Phase 04 or later |
| `/concerns` | Concern hub | Approved page class, route absent | Non-diagnostic cosmetic-care discovery | Absent; evidence gate required | `/` | Home/navigation after publication | Phase 05 |
| `/concerns/hair-loss-care` | Concern | Candidate, route absent | Scalp and hair-shedding cosmetic-care selection | Absent; evidence gate required | `/concerns` | Concern hub, serum category, and relevant articles | Phase 05 |
| `/concerns/dandruff-prone-scalp` | Concern | Candidate, route absent | Cosmetic care for dandruff- and seborrhea-prone scalp | Absent; evidence gate required | `/concerns` | Concern hub, serum category, and relevant articles | Phase 05 |
| `/concerns/daily-face-care` | Concern | Candidate, route absent | Daily facial-care selection | Absent; evidence gate required | `/concerns` | Concern hub, cream category, and relevant articles | Phase 05 |
| `/ingredients/copper-tripeptide-ghk-cu` | Ingredient | Candidate, route absent | Verified cosmetic role and matching products | Absent; evidence gate required | `/ingredients` | Ingredient hub, products, and reviewed content | Phase 05 |
| `/ingredients/niacinamide` | Ingredient | Candidate, route absent | Verified cosmetic role and matching products | Absent; evidence gate required | `/ingredients` | Ingredient hub, products, and reviewed content | Phase 05 |
| `/ingredients/climbazole` | Ingredient | Candidate, route absent | Verified cosmetic role and matching products | Absent; evidence gate required | `/ingredients` | Ingredient hub, products, and reviewed content | Phase 05 |
| `/ingredients/piroctone-olamine` | Ingredient | Candidate, route absent | Verified cosmetic role and matching products | Absent; evidence gate required | `/ingredients` | Ingredient hub, products, and reviewed content | Phase 05 |
| `/ingredients/peptides` | Ingredient | Candidate, route absent | Verified cosmetic role and matching products | Absent; evidence gate required | `/ingredients` | Ingredient hub, products, and reviewed content | Phase 05 |
| `/expert` | Expert hub | Approved page class, route absent | Organize validated selection and application content | Absent; evidence gate required | `/` | Home/navigation after publication | Phase 05 |
| `/expert/choosing-scalp-serum` | Expert article | Candidate brief, route absent | Help choose among the three scalp serums by cosmetic-care context | Absent; evidence gate required | `/expert` | Expert hub, serum category, and products | Phase 05 |
| `/expert/how-to-apply-scalp-serum` | Expert article | Candidate brief, route absent | Explain approved leave-in scalp-serum application | Absent; evidence gate required | `/expert` | Expert hub, serum category, and products | Phase 05 |
| `/expert/how-to-use-peptide-face-cream` | Expert article | Candidate brief, route absent | Explain verified peptide face-cream use | Absent; evidence gate required | `/expert` | Expert hub, cream category, and products | Phase 05 |

Candidate child state is uniformly **absent; evidence gate required**. A candidate slug records the intended namespace and does not approve publication, indexation, or navigation.

## URL and canonical rules

- Use English namespace roots, lowercase ASCII slugs, and hyphens for new paths.
- Keep the established underscore product routes `/catalog/red_pepper` and `/catalog/copper_tripeptide` unchanged.
- Products retain one canonical under `/catalog/[slug]` regardless of whether discovery begins with a brand, concern, ingredient, category, or article.
- Brand, concern, ingredient, and article paths never create an alternate product URL.
- One primary intent has one canonical path; slugs remain independent of campaigns and dates.
- Filter, search, pagination, and campaign parameters do not become indexable paths.

## Publication, sitemap, and temporary-review rules

- Absent candidate routes return 404 until their content and publication gate are complete.
- If a temporary review route is required, it uses `noindex, follow`, has no sitemap entry, and has no primary-navigation link.
- Only indexable self-canonical URLs enter the sitemap.
- Unfinished roots and child pages remain outside the sitemap and primary navigation.
- `/ingredients` retains `noindex, follow`, no sitemap entry, and no primary-navigation link until reviewed content passes the gate.

## Preservation and migration rules

- Every established current route is preserved; Phase 03 proposes no URL change or redirect.
- Any future route change requires an explicit final server-side 301 target plus canonical, sitemap, breadcrumb, and internal-link review.
- Redirect chains, loops, blanket catalog redirects, and unrelated targets are prohibited.
