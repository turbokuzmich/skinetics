# Phase 03 site architecture and content design

Date: 2026-08-23

Status: Approved for implementation planning

Owner: Dmitry, business owner

## Purpose

Define an evidence-gated information architecture for Skinetics that lets Russian-speaking visitors discover cosmetics by product type, concern, ingredient, or customer-facing brand and then continue to a suitable product and marketplace. Preserve the current public URLs and search footprint while giving Phase 04 explicit page-template and navigation requirements.

Skinetics remains the umbrella catalog and acquisition site. Dr. Health, SkineticsLab, and Neon Beard are the customer-facing product brands. ООО «Демидов Люкс СПА» appears in legal, manufacturer, and company details and is not presented as a consumer brand.

Phase 03 produces approved architecture and content specifications. It does not add application routes, publish new hubs or articles, change indexability, redesign templates, or deploy Phase 02. Phase 04 implements approved templates and navigation; Phase 05 publishes and measures evidence-backed content clusters.

## Evidence and limitations

The design uses these accepted inputs:

- the five-product source of truth and three-brand portfolio decision;
- the current URL inventory and URL-preservation decision;
- the cosmetic claims policy and marketplace-click measurement contract;
- the Phase 02 locally validated five-product catalog;
- the 2026-05-25 through 2026-08-22 sanitized Wildberries funnel;
- public Skinetics search-result visibility and public Wildberries questions reviewed on 2026-08-23.

There is no meaningful historical Skinetics traffic, Yandex Webmaster export, Google Search Console export, backlink history, or numerical keyword-volume study. Absence of data is not evidence of demand. New indexable concern, ingredient, brand, or expert pages therefore require a separate publication gate rather than being approved merely because a URL appears in this design.

The two creams account for 71.9% of the reviewed five-product Wildberries revenue share, which validates business priority but is not traffic attributed to Skinetics. The current public Ultra Lift card exposes seven questions around age, eye-area use, day/night use, suitability, composition, and expected results. The current Wildberries question surface associated with the copper-tripeptide serum exposes repeated questions about course length, frequency, wet or dry scalp, rinsing, combining formulas, irritation, age, composition, and choosing between products. The question surface includes products grouped by the marketplace and therefore supports themes, not exact per-product frequency claims.

Marketplace questions and reviews are voice-of-customer evidence only. They must not become proof of efficacy, safety, compatibility, concentration, or a medical claim. Seller responses and customer statements must be checked against packaging, manufacturer documents, owner-approved copy, and the claims policy before authored site content uses them.

## Scope

Phase 03 includes:

- current and proposed page hierarchy;
- URL conventions and a preserve-or-migrate decision for every current route;
- desktop, mobile, footer, breadcrumb, and contextual navigation rules;
- brand, category, concern, ingredient, and expert-content relationships;
- current-content inventory and prioritized content map;
- page-template requirements for Phase 04;
- authorship, evidence, review, and update-date requirements;
- indexation, canonical, sitemap, and internal-linking rules;
- conversion action and success metric for every page class;
- orphan-page, click-depth, duplicate-intent, and migration validation.

Phase 03 excludes:

- application-code or route changes;
- final visual design;
- mass article production or programmatic SEO;
- unreviewed ingredient or medical copy;
- marketplace prices, delivery, stock, ratings, or review values;
- direct checkout or order management;
- production deployment and post-launch monitoring of Phase 02.

## Approaches considered

### Evidence-gated dual taxonomy — chosen

Keep product type as the stable catalog backbone and add brand, concern, ingredient, and expert-content relationships as distinct discovery paths. Define all page classes now, but publish and index an individual page only after its user purpose, demand, reviewed content, internal links, and conversion path pass the publication gate.

This supports future growth without turning every product attribute into a thin landing page.

### Category-only architecture — rejected

Keep only `/catalog`, `/serum`, `/cream`, and products. This is safe and simple but does not provide durable homes for repeated customer questions, ingredient education, brand identity, or concern-led discovery.

### Immediate full hub publication — rejected

Publish every brand, concern, ingredient, and expert route at once. This would create duplicate intent and thin pages before search demand, reviewed ingredient copy, brand evidence, and content capacity exist.

## Chosen information architecture

### Stable catalog backbone

Product type is the primary organization of `/catalog` because it is objective, stable, and already represented in the product model. Concern, ingredient, and brand are secondary relationships and must not be encoded as additional primary categories.

The homepage prioritizes three visitor tasks:

1. browse the complete catalog or a product type;
2. understand which concern or ingredient is relevant without offering diagnosis;
3. compare a suitable product and continue to Wildberries or Ozon.

### Page hierarchy

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

The tree specifies namespaces and candidate slugs, not publication approval. Planned routes should return 404 because they do not exist until their content is ready. If an unfinished route must be exposed for review, it must use `noindex, follow`, have no sitemap entry, and have no primary-navigation link. `/ingredients` is the only existing placeholder and retains its accepted `noindex, follow` treatment.

### Launch and publication states

| Page class | Phase 03 treatment | Earliest implementation |
|---|---|---|
| Existing home, catalog, category, product, about, and contact pages | Preserve; specify Phase 04 requirements | Phase 04 |
| `/brands` portfolio hub | Approved page class; index only with reviewed portfolio copy and links to all three brands/products | Phase 04 |
| Individual brand pages | Approved template; each page needs unique brand evidence and content before indexing | Phase 04 or later |
| `/concerns` and concern pages | Approved namespace and template; candidates are not yet approved for indexing | Phase 05 |
| `/ingredients` and ingredient pages | Existing root stays `noindex`; candidates require rewritten, sourced, reviewed copy | Phase 05 |
| `/expert` and articles | Approved namespace and template; publish only from an accepted brief | Phase 05 |

Dr. Health has three products, but product count alone does not make its brand page indexable. SkineticsLab and Neon Beard each have one current product and are especially vulnerable to thin duplication. Every individual brand page needs verified brand-specific identity, product scope, useful selection context, and a distinct purpose beyond repeating its product card.

## URL conventions and migration policy

Preserve every established public route. No Phase 03 proposal changes a current canonical URL, so the Phase 03 redirect matrix contains no new redirects.

New routes follow these rules:

- use the existing English namespace convention: `/brands`, `/concerns`, `/ingredients`, and `/expert`;
- use lowercase ASCII path segments separated by hyphens;
- keep slugs stable, descriptive, and independent of temporary campaigns or dates;
- use one canonical URL for one primary intent;
- do not index filter parameters, search parameters, pagination variants, or alternate taxonomy paths;
- keep product identity and canonical product URLs under `/catalog/[slug]` even when users arrive from a brand, concern, ingredient, or article;
- never create a second product URL under a brand or concern namespace;
- require an explicit redirect, canonical, sitemap, breadcrumb, and internal-link review before changing any accepted route.

Candidate paths use qualified cosmetic-care wording. `hair-loss-care` and `dandruff-prone-scalp` describe care contexts and must not be presented as diagnosis, treatment, prevention, or cure pages.

## Navigation design

### Header and mobile navigation

The Phase 04 launch header contains no more than seven primary choices. Until new hubs pass their publication gates, it contains:

1. `Каталог` → `/catalog`;
2. `Сыворотки` → `/serum`;
3. `Кремы` → `/cream`;
4. `О нас` → `/about`;
5. `Контакты` → `/contacts`.

`По задачам`, `Ингредиенты`, `Бренды`, or `Экспертные материалы` may enter the header only when the destination root is useful, indexable, and contains at least one complete child path. A catalog dropdown may group `Все средства`, `Сыворотки`, and `Кремы`, but the same destinations remain directly reachable and keyboard accessible. Desktop and mobile menus expose the same information architecture and labels.

Do not display empty, disabled, placeholder, or `noindex` sections in primary navigation.

### Footer

The footer groups links by purpose rather than copying the header:

- `Каталог`: all products, serums, creams;
- `Подбор и знания`: published concern, ingredient, and expert roots only;
- `Skinetics`: portfolio/brands, about, contacts;
- `Информация`: legal company details and applicable policies.

The site-wide trichologist form remains a separate lead-generation element. Its surrounding copy must not imply diagnosis, emergency care, or a guaranteed appointment outcome.

### Breadcrumbs

Breadcrumbs mirror the canonical page hierarchy and use the same item sequence in visible HTML and `BreadcrumbList` JSON-LD:

- product: `Главная / [категория] / [продукт]`;
- brand: `Главная / Бренды / [бренд]`;
- concern: `Главная / По задачам / [задача ухода]`;
- ingredient: `Главная / Ингредиенты / [ингредиент]`;
- expert article: `Главная / Экспертные материалы / [материал]`.

A product breadcrumb remains category-based even when the visitor came from a concern, ingredient, brand, or expert page. Referrer-dependent breadcrumbs would create inconsistent hierarchy and structured data.

## Internal-linking system

Every indexable page must have at least one crawlable inbound link from another indexable page and one useful onward path. Links use descriptive Russian anchor text and are present in server-rendered HTML.

| Source page | Required destinations |
|---|---|
| Home | Catalog, both category listings, featured products, and any published discovery hub |
| Catalog | Both category listings and every published product |
| Category | Its products; relevant published concern, ingredient, and expert pages |
| Product | Primary category, customer-facing brand page when published, relevant reviewed concern/ingredient/article pages, marketplace actions |
| Brand | Its published products, their categories, and relevant published expert content |
| Concern | Suitable products, relevant ingredients, application/selection content, and a non-diagnostic caveat where needed |
| Ingredient | Products containing the verified ingredient, relevant care contexts, evidence sources, and related expert content |
| Expert article | Its parent hub, related concern/ingredient pages, and the products needed for the next user step |
| About | Portfolio/brand hub, contacts, and catalog |
| Contacts | About and catalog after feedback completion or within supporting navigation |

An indexable page must not depend exclusively on a sitemap, JavaScript interaction, footer-only sitewide link, or marketplace link for discovery.

### Click-depth target

From the homepage:

- catalog and category listings are one click away;
- every product is at most two clicks away through `/catalog`, `/serum`, or `/cream`;
- a published taxonomy root is one click away while present in navigation;
- its child brand, concern, ingredient, or article page is at most two clicks away;
- every product linked from those pages remains at most three clicks away.

## Content priorities

### Priority 1 — commercial cream journey

The cream category and two product pages receive the first Phase 04 template and conversion review because the creams represent 71.9% of the reviewed Wildberries revenue share. Improve selection clarity, trust, application, precautions, and marketplace actions without introducing unsupported efficacy claims.

The candidate `daily-face-care`, `peptides`, and `copper-tripeptide-ghk-cu` pages are not automatically approved for indexing. They require search-intent validation, sourced and reviewed content, and evidence that they add value beyond `/cream` and the two product pages.

### Priority 2 — scalp-serum selection and application cluster

The first Phase 05 expert-content cluster is the selection and correct-use journey for scalp serums. Public marketplace questions show deeper repeated information needs than the currently observed cream questions, while the existing copper-tripeptide product URL has a known public search footprint.

The cluster begins with briefs for:

1. choosing among the three scalp serums by cosmetic-care context;
2. applying a leave-in scalp serum: where, when, whether to rinse, and how to follow the approved product instructions;
3. product-specific FAQ improvements derived only from verified labeling and approved copy.

This cluster must not promise hair growth, prevent hair loss, treat seborrhea or dandruff, prescribe course length beyond approved instructions, define use for minors, or recommend combining products without authoritative review.

### Deferred candidates

Individual concern and ingredient hubs remain deferred until keyword/intent evidence and safe source material exist. The dormant ingredient dataset in `constants.ts` is not an acceptable publication source because the Phase 00 claims audit identified medical, mechanistic, absolute, and unsupported statements.

## Page-template requirements for Phase 04

### Home

- identify Skinetics as the multi-brand catalog, not a product brand or checkout store;
- present the three priority tasks: browse, understand, choose;
- expose both product categories and all five products;
- explain that checkout occurs on Wildberries or Ozon;
- provide portfolio trust context and the trichologist lead path;
- avoid duplicating full catalog or product copy.

Primary conversion: product-page visit. Secondary conversion: trichologist-form submission. Success metrics: home-to-product click-through rate, marketplace clicks later in the session, and validated form completion.

### Catalog and category listings

- organize primarily by product type;
- show product brand, name, packaging quantity, cosmetic purpose, and available marketplace actions;
- add concise selection guidance and contextual links only when corresponding pages are published;
- do not make concern filters indexable URLs;
- maintain one distinct H1, description, canonical, and intent per listing.

Primary conversion: product-page visit. Success metrics: listing-to-product click-through rate and marketplace-click rate segmented by listing placement.

### Product

- retain the Phase 02 structured order: breadcrumb, brand, H1, image/quantity/actions, purpose, suitable use where available, active components, features, application, precautions, composition, and reviewed FAQ;
- link to the primary category and any published brand, concern, ingredient, and expert pages;
- keep the product page as the primary commercial destination before marketplace exit;
- show no first-party price, stock, rating, review, or guaranteed result.

Primary conversion: contextual Wildberries or Ozon click. Success metric: `marketplace_click` rate by product, marketplace, placement, page, and acquisition source.

### Brand hub and brand page

- explain the Skinetics portfolio relationship and distinguish the consumer brand from Skinetics and ООО «Демидов Люкс СПА»;
- use official brand assets only when approved; text labels remain acceptable;
- include verified brand-specific scope, products, categories, and supporting evidence;
- avoid duplicating product descriptions or inventing a brand story.

Primary conversion: brand-to-product visit. Success metrics: product click-through rate and onward marketplace clicks.

### Concern

- state the non-diagnostic cosmetic-care context in plain language;
- explain selection factors and when persistent or pronounced symptoms warrant professional advice;
- connect the concern to reviewed ingredients, suitable products, and expert content;
- avoid disease-treatment, prevention, cure, or guaranteed-outcome wording.

Primary conversion: suitable-product visit. Success metrics: product click-through rate, marketplace clicks later in the session, and organic landing engagement after a baseline exists.

### Ingredient

- define the ingredient and its verified cosmetic role;
- distinguish INCI naming, aliases, and product-specific presence where verified;
- state evidence limits and avoid inferring concentration or formula performance;
- cite reviewed primary or authoritative sources;
- connect to products and care contexts without presenting the ingredient as treatment.

Primary conversion: related-product visit. Success metrics: product click-through rate and qualified organic landing traffic after indexing.

### Expert article

- answer one validated question or intent;
- name a real author and reviewer without inventing credentials;
- show publication and material-update dates;
- identify sources and distinguish evidence, manufacturer instructions, and editorial interpretation;
- end with useful related pages and product choices rather than a generic sales block.

Primary conversion: next-step product, concern, or ingredient visit. Success metrics: contextual link click-through rate and marketplace clicks later in the session.

### About and contacts

`/about` must explain the Skinetics portfolio role, the three consumer brands, the role of ООО «Демидов Люкс СПА», verified trust memberships or catalog entries, product-development or manufacturing facts that have evidence, and legal details. `/contacts` keeps Russian phone numbers, `info@skinetics.ru`, and the validated feedback form.

Primary conversions: catalog/brand visit from `/about` and valid feedback-form submission from `/contacts`. Success metrics: onward product visits and successful form events.

## Authorship, evidence, and review policy

Every indexable non-product content page records:

- content owner;
- actual author or the neutral `Редакция Skinetics` label;
- reviewer and review scope when a qualified reviewer participated;
- first-publication date;
- latest material-update date;
- source list and date reviewed;
- next review trigger.

Do not use an expert title, medical credential, endorsement, study, or certification unless it belongs to a real named participant and can be verified.

Dmitry approves ordinary product, portfolio, and brand copy. Medical, regulatory, clinical, quantified, guaranteed-effect, safety-sensitive, minor-use, diagnosed-condition, or treatment-adjacent statements require external professional or legal review. Ingredient claims require a source appropriate to the claim and must comply with the shared claims policy.

Content is reviewed at least every 12 months and sooner when packaging, manufacturer documents, marketplace availability, a product formula, regulation, or a cited source changes. Marketplace prices, ratings, review counts, delivery details, and stock are not authored as durable content.

## Indexation and publication gate

A new page may be indexable only when every condition below passes:

1. It has one explicit user purpose, audience, and primary intent.
2. Demand is supported by search/query evidence or a documented business and customer-question signal.
3. It is materially distinct from existing category, product, and adjacent taxonomy pages.
4. Its factual and claims-sensitive copy has the required evidence and approval.
5. It contains a unique Russian title, description, H1, useful server-rendered content, and self-referencing canonical.
6. It has at least one crawlable inbound link from an indexable page and useful contextual onward links.
7. It has a named conversion action and success metric.
8. It is included in the sitemap and navigation/internal-link plan appropriate to its page class.
9. Its author, reviewer when applicable, source dates, and update date are recorded.

A page that fails any condition remains absent. If a review route must exist temporarily, use `noindex, follow`, omit it from the sitemap, and keep it out of primary navigation. Do not canonicalize a thin page to a merely similar page as a substitute for a publication decision.

## Canonical, sitemap, and redirect rules

- Every indexable page has exactly one self-referencing canonical.
- Only indexable canonical URLs enter the sitemap.
- Visible and JSON-LD breadcrumbs use the canonical hierarchy.
- Internal links point directly to the canonical URL without redirect hops.
- Unfinished pages and URL-parameter variants remain outside the sitemap.
- A changed route receives one final server-side 301 target; no chains, loops, blanket redirects, or redirects to an unrelated catalog root.
- A removed product without a true replacement is reviewed using search, link, and business evidence before choosing to retain, redirect, or return an appropriate removal status.

## Current URL treatment

| Current route | Phase 03 action | Redirect | Canonical/indexation consequence |
|---|---|---|---|
| `/` | Preserve | None | Keep indexable self-canonical |
| `/catalog` | Preserve as complete catalog | None | Keep indexable self-canonical |
| `/serum` | Preserve as navigation-facing serum category | None | Keep indexable self-canonical |
| `/cream` | Preserve locally implemented cream category | None | Keep indexable self-canonical after authorized deployment |
| `/catalog/red_pepper` | Preserve exact underscore URL | None | Keep indexable self-canonical |
| `/catalog/copper_tripeptide` | Preserve exact underscore URL | None | Keep indexable self-canonical |
| `/catalog/climbazole` | Preserve exact URL | None | Keep indexable self-canonical |
| `/catalog/ultra-lift` | Preserve locally implemented slug | None | Keep indexable self-canonical after authorized deployment |
| `/catalog/renewal` | Preserve locally implemented slug | None | Keep indexable self-canonical after authorized deployment |
| `/about` | Preserve and strengthen | None | Keep indexable self-canonical |
| `/contacts` | Preserve | None | Keep indexable self-canonical |
| `/ingredients` | Preserve placeholder | None | Keep `noindex, follow`; exclude from sitemap and primary navigation |

## Failure handling and risks

- Missing search volume or historical traffic blocks claims of search demand but does not block architecture documentation.
- Phase 02 deployment remains separately authorized work. Phase 03 planning may proceed, but production observations must distinguish the old public site from the local release candidate.
- Public marketplace brand labels or claims that conflict with accepted product evidence do not silently overwrite the source of truth.
- Customer questions identify information needs; they do not authorize answers copied from seller responses.
- Single-product brand pages remain absent or non-indexable until they offer unique verified value.
- Ingredient pages remain blocked by the dormant high-risk copy until rewritten and reviewed.
- A new taxonomy page that overlaps a category or product intent is merged into the stronger page or kept absent rather than indexed as a duplicate.
- Missing official brand artwork does not block text-based architecture or templates.

## Validation

Phase 03 documentation validation must confirm:

- every current URL has one explicit preserve or migration action;
- every proposed changed URL has one final redirect target; Phase 03 proposes none;
- every proposed indexable page class has a user purpose, conversion, metric, content requirements, and publication gate;
- all five products are reachable from the homepage within two clicks and from any published discovery page within three;
- every published page has at least one inbound internal-link source and an onward path;
- header navigation has no more than seven primary choices and does not expose unfinished sections;
- breadcrumb hierarchy is canonical and independent of referrer path;
- brand, category, concern, ingredient, and expert pages do not create alternate product URLs or duplicate primary intent;
- `/ingredients` remains `noindex, follow` until reviewed content passes the gate;
- the current sitemap, canonicals, and internal links require no Phase 03 migration;
- Phase 04 has requirements for home, listing, product, brand, concern, ingredient, expert, about, contact, header, mobile menu, footer, and breadcrumbs.

Implementation validation in Phase 04 must additionally cover server-rendered content, responsive navigation, keyboard and focus behavior, semantic headings, canonical and sitemap output, structured breadcrumbs, internal links, analytics, accessibility, and performance.

## Exit conditions

Phase 03 is complete when:

- the architecture artifacts derived from this design are accepted;
- the content inventory and marketplace-question themes are recorded without personal data;
- the URL map, navigation specification, internal-link plan, content priorities, page requirements, indexation gates, and redirect matrix agree;
- every current route has explicit treatment and no uncontrolled URL change is proposed;
- orphan and click-depth checks pass on the proposed indexable structure;
- the first commercial and expert-content priorities are recorded with evidence limitations;
- Phase 04 receives approved requirements for every page template;
- the Phase 03 checklist, findings, validation, root status, and program log are updated;
- owner approval is recorded before Phase 04 implementation begins.

## Related records

- [Phase 03 README](./README.md)
- [Phase 03 inputs](./INPUTS.md)
- [Phase 03 checklist](./CHECKLIST.md)
- [Phase 03 findings](./FINDINGS.md)
- [Phase 03 validation](./VALIDATION.md)
- [Brand architecture](../shared/brand-architecture.md)
- [Claims policy](../shared/claims-policy.md)
- [Measurement plan](../shared/measurement-plan.md)
- [Product source of truth](../shared/product-source-of-truth.md)
- [URL inventory](../shared/url-inventory.md)
- [URL-preservation decision](../decisions/0005-url-preservation-policy.md)
