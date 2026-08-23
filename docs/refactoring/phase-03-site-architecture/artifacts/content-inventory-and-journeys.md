# Content inventory and user journeys

- **Reviewed:** 2026-08-23
- **Scope:** current local release candidate, established public paths, and approved-but-absent Phase 03 page classes
- **Evidence limitation:** numerical organic demand and meaningful historical Skinetics traffic remain unavailable

## Current content inventory

| Route | State | Indexation | Primary user purpose | Existing content | Evidence/gap | Primary action | Phase 03 treatment |
|---|---|---|---|---|---|---|---|
| `/` | Implemented; five-product local release candidate | Indexable, self-canonical | Browse, understand, and choose across the portfolio | Multi-brand metadata, product discovery, advantages, and trichologist form | Needs clearer portfolio role and task-led hierarchy | Visit a product; secondary trichologist form | Preserve; specify Phase 04 home requirements |
| `/catalog` | Implemented; five-product local release candidate | Indexable, self-canonical | Browse the complete catalog by product type | All five product cards, category context, and marketplace discovery | Needs stronger selection guidance | Visit a product | Preserve as the catalog backbone |
| `/serum` | Implemented | Indexable, self-canonical | Browse the three Dr. Health scalp serums | Serum-only listing | Limited comparison and application guidance | Visit a serum product | Preserve as navigation-facing serum category |
| `/cream` | Locally validated; deployment pending | Self-canonical; indexable after deployment | Compare the two face creams | Cream-only listing with brand, purpose, quantity, and marketplaces | Public monitoring unavailable | Visit a cream product | Preserve exact URL and prioritize Phase 04 review |
| `/catalog/red_pepper` | Implemented | Indexable, self-canonical | Understand the red-pepper and niacinamide scalp serum | Product image, 100 ml quantity, purpose, application, precautions, composition, and Wildberries action | FAQ clarity must rely on verified instructions | Continue to marketplace | Preserve exact underscore URL |
| `/catalog/copper_tripeptide` | Implemented | Indexable, self-canonical | Understand the copper-tripeptide GHK-Cu scalp serum | Product image, 100 ml quantity, purpose, application, precautions, composition, and Wildberries action | Public search footprint; repeated selection/application questions | Continue to marketplace | Preserve exact underscore URL |
| `/catalog/climbazole` | Implemented | Indexable, self-canonical | Understand the climbazole and piroctone-olamine scalp serum | Product image, 100 ml quantity, purpose, application, precautions, composition, and Wildberries action | Concern wording must remain cosmetic and non-diagnostic | Continue to marketplace | Preserve exact URL |
| `/catalog/ultra-lift` | Locally validated; deployment pending | Self-canonical; indexable after deployment | Understand Neon Beard Ultra Lift face cream | Product image, 100 g mass, marketplaces, purpose, suitable use, application, precautions, composition, and FAQ | Usage questions inform template; production monitoring unavailable | Continue to Wildberries or Ozon | Preserve exact URL |
| `/catalog/renewal` | Locally validated; deployment pending | Self-canonical; indexable after deployment | Understand SkineticsLab ReneWal face cream | Product image, 50 g mass, marketplaces, purpose, suitable use, application, precautions, composition, and FAQ | Single-product brand creates thin-page risk | Continue to Wildberries or Ozon | Preserve exact URL |
| `/about` | Implemented | Indexable, self-canonical | Understand the organization and verify legal details | Dr. Health summary, Wildberries brand link, care caveat, and ООО «Демидов Люкс СПА» details | Does not yet explain the Skinetics portfolio and all three brands | Visit catalog or a brand | Preserve; strengthen portfolio/company/trust content in Phase 04 |
| `/contacts` | Implemented | Indexable, self-canonical | Contact the company or submit feedback | Russian phone numbers, `info@skinetics.ru`, and feedback form | Metadata remains Dr. Health-led | Submit valid feedback | Preserve contact details and feedback conversion |
| `/ingredients` | Thin placeholder | `noindex, follow`; outside sitemap and navigation | No complete current user purpose | One placeholder label | Dormant ingredient copy is not publication-ready | None | Preserve placeholder; keep `noindex, follow` and hidden from navigation |

The first eleven routes are preserved. Product pages remain the commercial destination before any marketplace exit. No current route is redirected or removed.

## Planned content inventory and readiness

| Route class | Readiness | Intended purpose | Publication gate | Earliest phase |
|---|---|---|---|---|
| `/brands` | Approved page class, route absent | Explain the Skinetics portfolio and connect all three customer-facing brands to products | Reviewed portfolio copy, distinct purpose, complete product links, metadata, canonical, inbound links, conversion, and ownership | Phase 04 |
| `/brands/[brand]` | Approved template, route absent | Explain verified brand identity and guide visitors to that brand's products | Unique verified content for each brand; single-product SkineticsLab and Neon Beard pages must add value beyond repeating a product card | Phase 04 or later |
| `/concerns` and `/concerns/[concern]` | Approved template, route absent | Support non-diagnostic cosmetic-care discovery by concern | Search/query or documented business/customer-question signal, reviewed unique content, internal links, conversion, and complete indexation gate | Phase 05 candidate; not an approved indexable page |
| `/ingredients/[ingredient]` | Approved template, route absent | Explain a verified cosmetic ingredient role and connect suitable products | Rewritten and sourced copy, authoritative review where required, unique intent, and complete indexation gate | Phase 05 candidate; not an approved indexable page |
| `/expert` and `/expert/[article]` | Approved template, route absent | Answer one validated selection or application question | Accepted brief, real authorship/review, sourced copy, useful onward path, and complete indexation gate | Phase 05 candidate; not an approved indexable page |

The dormant ingredient descriptions in `constants.ts` are inventory evidence only and cannot be used as publication copy.

## Homepage tasks

1. **Browse:** reach the complete catalog, a product type, or a product.
2. **Understand:** learn the relevant cosmetic-care context or ingredient without diagnosis or unsupported claims.
3. **Choose:** compare a suitable product and continue to an available marketplace.

## Discovery journeys

| Journey | Entry page | Intermediate pages | Product destination | Marketplace exit | Unresolved evidence |
|---|---|---|---|---|---|
| Product type: home → catalog/category → product → marketplace | `/` | `/catalog`, `/serum`, or `/cream` | One canonical `/catalog/[slug]` page | Contextual Wildberries or Ozon action | Phase 02 production monitoring remains unavailable |
| Concern: search/home → concern or category → product → marketplace | Search landing or `/` | Published `/concerns/[concern]` or an existing category | Suitable canonical product page | Contextual Wildberries or Ozon action | No numerical concern-query demand; concern pages remain gated |
| Ingredient: search/product → ingredient → suitable product → marketplace | Search landing or a product page | Published `/ingredients/[ingredient]` | A product with verified ingredient presence | Contextual Wildberries or Ozon action | No numerical ingredient-query demand; sourced publication copy unavailable |
| Brand: home/about/brands → brand → product → marketplace | `/`, `/about`, or future `/brands` | Published `/brands/[brand]` | That brand's canonical product page | Contextual Wildberries or Ozon action | Unique brand evidence and official assets remain incomplete |

## Evidence-led priorities

### Priority 1 — commercial cream journey

Review `/cream`, `/catalog/ultra-lift`, and `/catalog/renewal` first in Phase 04 because the two creams account for 71.9% of the reviewed Wildberries revenue share. This is a marketplace business signal, not Skinetics-attributed traffic or revenue.

### Priority 2 — scalp-serum selection and application cluster

Prepare the first Phase 05 expert-content cluster around choosing among the three scalp serums, applying a leave-in scalp serum using approved instructions, and improving product-specific FAQs with verified labeling and approved copy. Marketplace questions validate information needs, not product facts or efficacy.

Numerical organic demand remains unavailable. Candidate concern, ingredient, brand, and expert pages stay absent until their publication gates pass.
