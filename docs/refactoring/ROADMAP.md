# Skinetics upgrade roadmap

Last reviewed: 2026-08-23

## Program objective

Turn Skinetics into a useful Russian-language, multi-brand cosmetics catalog that helps visitors understand products and choose an appropriate item before continuing to Wildberries or Ozon. Skinetics remains a discovery and acquisition site; checkout, payment, delivery, and order management remain on the marketplaces.

## Program sequence

```text
product truth and measurement
  -> catalog foundation
  -> cream launch
  -> site and content architecture
  -> visual redesign
  -> measured growth program
```

Marketing discovery begins in Phase 00 and shapes every later phase. Large-scale campaign execution starts only after product-level marketplace attribution is working.

## Phase 00 — Baseline and product truth

**Objective:** establish reliable inputs before changing URLs, product content, tracking, or design.

Primary work:

- inventory current URLs, indexability, metadata, and conversion paths;
- export and summarize Yandex Metrica, Yandex Webmaster, and Google Search Console data;
- establish the authoritative brand and product mapping;
- audit current cosmetic, medical, safety, and guaranteed-effect claims;
- define baseline metrics and phase-level success criteria.

**Exit:** the product source of truth, URL inventory, claims policy, measurement plan, and baseline findings have been reviewed; blocking brand assignments are resolved.

## Phase 01 — Catalog foundation

**Objective:** replace single-brand, Wildberries-only assumptions with a scalable product model.

Primary work:

- introduce explicit brand and product-category data;
- support optional links to multiple marketplaces;
- introduce marketplace-aware buttons and analytics events;
- separate reusable product data from page-specific presentation;
- preserve existing product URLs and static generation behavior.

**Exit:** existing three products render correctly from the new model, existing URLs are unchanged, marketplace events contain product and marketplace context, and production build validation passes.

## Phase 02 — Cream launch

**Objective:** publish the two priority creams with accurate brand, product, and marketplace information.

Primary work:

- add the Neon Beard Ultra Lift cream, 100 г;
- add the SkineticsLab ReneWal cream, 50 г, using compliant cosmetic wording;
- provide separate Wildberries and Ozon purchase actions;
- add verified images, packaging quantity, INCI, application, precautions, metadata, and internal links;
- update sitemap and structured data where appropriate.

**Exit:** both product pages are accurate, indexable, linked from the catalog, tracked by product and marketplace, and validated on mobile and desktop.

**Current state:** Implementation validated; deployment pending. The local release candidate meets the pre-deployment validation requirements; production publication and the post-launch monitoring window remain separately authorized work before the phase can exit.

## Phase 03 — Site architecture and content

**Objective:** make the catalog useful across brands, product types, concerns, and ingredients without discarding existing search value.

Primary work:

- define Skinetics as the portfolio/catalog layer and clarify the roles of Dr. Health, SkineticsLab, and Neon Beard;
- design brand, category, concern, ingredient, and expert-content hubs;
- finalize navigation, breadcrumbs, URL conventions, and internal linking;
- use search and marketplace-question data to prioritize content;
- create redirect plans before changing any established URL.

**Exit:** an approved information architecture and content map exists, every proposed indexable page has a validated purpose, and redirects are specified for every changed URL.

## Phase 04 — Redesign

**Objective:** create a distinctive, accessible visual and interaction system around the approved customer journey and content architecture.

Primary work:

- establish a Skinetics portfolio design system with clear sub-brand treatment;
- redesign homepage, listing, product, brand, content, about, contact, and form templates;
- improve mobile discovery and marketplace calls to action;
- strengthen trust, manufacturer, documentation, and realistic-expectation sections;
- protect server-rendered content, accessibility, and performance.

**Exit:** approved templates are implemented, key routes pass responsive and accessibility checks, performance is within agreed budgets, and SEO-critical content remains present in rendered HTML.

## Phase 05 — Growth program

**Objective:** build a repeatable acquisition and optimization system that increases qualified marketplace traffic.

Primary work:

- publish concern, ingredient, comparison, and application content based on measured demand;
- test product selection tools and packaging QR journeys without medical diagnosis;
- run creator, expert, Yandex search, retargeting, and marketplace-specific experiments;
- measure traffic source -> content -> product -> marketplace clicks;
- prioritize future work from results rather than content volume.

**Exit:** the first 90-day program has named owners, baselines, experiment results, and a reviewed backlog for the next cycle.

## Program-level success measures

- accurate product and brand data across all published pages;
- organic non-brand impressions and clicks;
- product-page-to-marketplace click-through rate;
- outbound clicks segmented by product, marketplace, placement, and traffic source;
- externally attributable marketplace sales where platform tooling permits;
- completion rate and downstream marketplace clicks from selection tools;
- zero uncontrolled URL removals or unsupported medical claims.

## Explicit non-goals

- direct checkout or order management on Skinetics;
- automatic display of marketplace prices without a reliable update source;
- mass creation of generic SEO pages;
- copying marketplace descriptions as the site's main value proposition;
- redesigning URLs solely for visual or naming consistency.
