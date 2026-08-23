# Content map and page requirements

- **Reviewed:** 2026-08-23
- **Scope:** Phase 04 template contracts and Phase 05 evidence-gated content classes

## Page-class contract

| Page class | User purpose | Audience/intent | Required sections | Evidence/approval | Primary conversion | Success metric | Indexation treatment | Earliest phase |
|---|---|---|---|---|---|---|---|---|
| Home | Browse, understand, and choose across the portfolio | Visitors entering directly or from broad discovery | Skinetics multi-brand role; categories; all five products; cosmetic-care selection context; marketplace explanation; verified trust; trichologist lead path | Accepted portfolio/product truth and approved ordinary copy | Product visit; secondary trichologist form | Home-to-product CTR, later-session marketplace clicks, valid form completion | Preserve indexable self-canonical | Phase 04 review |
| Catalog/listing | Compare products by stable product type | Category and commercial investigation | Distinct H1 and introduction; product brand, name, quantity, purpose; useful selection guidance; product links; available marketplace context | Product source of truth and approved category copy | Product visit | Listing-to-product CTR and marketplace-click rate by listing placement | Preserve current listings; filters do not become indexable URLs | Phase 04 review |
| Product | Understand one cosmetic and decide whether to continue | Product-specific commercial intent | Canonical breadcrumb; brand; H1; image/quantity/actions; purpose; suitable use where available; actives; features; application; precautions; composition; reviewed FAQ; contextual links | Packaging, manufacturer documents, current marketplace card, and owner approval; sensitive claims escalated | Contextual `marketplace_click` | Rate by product, marketplace, placement, page, and acquisition source | Preserve one indexable `/catalog/[slug]` canonical | Existing; Phase 04 review |
| Brand hub/brand | Understand the Skinetics portfolio or one customer-facing brand | Portfolio and brand investigation | Portfolio relationship; verified brand scope; products/categories; approved text/assets; useful selection context; evidence | Reviewed portfolio/brand copy; official assets only when approved; single-product brands must add unique value | Brand-to-product visit | Product CTR and onward marketplace clicks | Route remains absent until complete publication gate passes | Phase 04 or later |
| Concern | Understand a non-diagnostic cosmetic-care context and select a suitable product | Concern-led informational/commercial intent | Plain-language context; selection factors; professional-advice caveat when needed; reviewed ingredients; suitable products; expert links | Search/query or documented business/customer signal plus reviewed claims-sensitive copy | Suitable-product visit | Product CTR, later-session marketplace clicks, and organic engagement after baseline | Candidate absent; not an approved indexable page | Phase 05 |
| Ingredient | Understand a verified cosmetic role and find related products | Ingredient-led informational/commercial intent | Definition; INCI/aliases; verified product presence; evidence limits; authoritative sources; care contexts; product links | Appropriate primary/authoritative sources and required claim review | Related-product visit | Product CTR and qualified organic landing traffic after indexing | Candidate absent; not an approved indexable page | Phase 05 |
| Expert article | Answer one validated selection or application question | Focused informational intent | One accepted brief; actual author/reviewer; dates; sources; distinction among evidence, instructions, and editorial interpretation; next-step links | Verified instructions, accepted sources, and external review where required | Next-step product, concern, or ingredient visit | Contextual-link CTR and later-session marketplace clicks | Candidate absent until accepted brief and full gate pass | Phase 05 |
| About | Understand the portfolio, company, and verifiable trust context | Brand/company trust intent | Skinetics portfolio role; Dr. Health, SkineticsLab, Neon Beard; ООО «Демидов Люкс СПА» role; verified memberships/catalog entries; evidenced development/manufacturing facts; legal details | Accepted brand architecture, legal details, and evidence for trust statements | Catalog or brand visit | Onward product visits | Preserve indexable self-canonical | Phase 04 review |
| Contacts | Reach the company or send feedback | Contact/support intent | Russian phone numbers; `info@skinetics.ru`; validated feedback form; supporting catalog/about links | Current contact details and existing Zod/API contract | Valid feedback submission | Successful form event | Preserve indexable self-canonical | Phase 04 review |

## Content priorities

### Priority 1 — commercial cream journey

The `commercial cream journey` covers `/cream`, `/catalog/ultra-lift`, and `/catalog/renewal`. The two creams represent 71.9% of the reviewed Wildberries seller-account revenue share, supporting business priority for selection clarity, trust, application, precautions, and marketplace actions. This marketplace-business signal is not traffic, conversion, or revenue attributed to Skinetics.

Candidate `daily-face-care`, `peptides`, `copper-tripeptide-ghk-cu`, and all other concern/ingredient pages remain gated and are not approved indexable pages.

### Priority 2 — scalp-serum selection and application cluster

The first expert-content cluster consists of three briefs:

1. choosing among the three scalp serums by cosmetic-care context;
2. applying a leave-in scalp serum using approved instructions;
3. product-specific FAQ improvements derived from verified labeling and approved copy.

The cluster may clarify verified instructions but must not promise hair growth, prevention of hair loss, treatment of dandruff or seborrhea, unapproved course length, suitability for minors, or product combinations without authoritative review.

## Authorship and evidence record

Every indexable non-product content page records:

- content owner;
- actual author or `Редакция Skinetics`;
- reviewer and review scope when applicable;
- first-publication date;
- latest material-update date;
- source list and review date;
- next review trigger.

Dmitry approves ordinary product, portfolio, and brand copy. Medical, regulatory, clinical, quantified, guaranteed-effect, safety-sensitive, minor-use, diagnosed-condition, or treatment-adjacent statements require external professional or legal review. Expert titles, credentials, endorsements, studies, certifications, and ingredient concentrations are not used unless real and verifiable.

Content has a 12 months maximum review interval and is reviewed earlier when packaging, manufacturer documents, marketplace availability, product formula, regulation, or a cited source changes. Marketplace prices, ratings, review counts, delivery details, and stock are not durable authored content.

## Indexation and publication gate

A new page may be indexable only when all nine conditions pass:

1. It has one explicit user purpose, audience, and primary intent.
2. Demand is supported by search/query evidence or a documented business and customer-question signal.
3. It is materially distinct from existing category, product, and adjacent taxonomy pages.
4. Its factual and claims-sensitive copy has the required evidence and approval.
5. It contains a unique Russian title, description, H1, useful server-rendered content, and self-referencing canonical.
6. It has at least one crawlable inbound link from an indexable page and useful contextual onward links.
7. It has a named conversion action and success metric.
8. It is included in the sitemap and navigation/internal-link plan appropriate to its page class.
9. Its author, reviewer when applicable, source dates, and update date are recorded.

A page that fails any condition remains absent. A temporary review route uses `noindex, follow`, has no sitemap entry, and stays out of primary navigation. A thin page is not canonicalized to a merely similar page as a substitute for deciding whether it deserves publication.

## Phase 04 implementation boundary

Phase 04 may redesign current templates and implement approved reusable templates, header, mobile navigation, footer, breadcrumbs, and contextual-link treatments. It does not publish gated concern, ingredient, brand, or expert routes merely because a template exists. Server-rendered content, accessibility, canonical hierarchy, structured breadcrumbs, performance, analytics, and the marketplace-exit model remain required.
