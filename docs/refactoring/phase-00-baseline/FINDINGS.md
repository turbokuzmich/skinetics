# Phase 00 findings

Status: Complete

## Executive summary

Phase 00 resolved the product and brand conflicts needed for the catalog foundation. Skinetics is the umbrella catalog identity; Dr. Health, SkineticsLab, and Neon Beard are the three customer-facing product brands. The initial site scope is five products.

Skinetics has no meaningful historical site traffic, so Phase 01 must establish reliable product- and marketplace-aware measurement from launch. A sanitized 90-day Wildberries funnel confirms the two creams are the highest-priority marketplace products.

The current local application contains safer serum copy than the public deployment. High-risk legacy and ingredient claims have been inventoried. Cream application and precaution wording remains pending and is a strict Phase 02 publication blocker.

## Product and brand findings

- Skinetics is the permanent umbrella identity and is not a product brand.
- Every catalog product belongs to exactly one of Dr. Health, SkineticsLab, or Neon Beard.
- ReneWal is a product name under SkineticsLab.
- The canonical cream names are “Крем для лица с пептидами ReneWal, 50 мл” and “Крем для лица с пептидами Ultra Lift, 100 мл”.
- The three serums are Wildberries-only; both creams are available on Wildberries and Ozon.
- Official logos and brand guidelines are unavailable. Use text labels until Phase 04 or until approved assets arrive.
- Product evidence and remaining gaps are indexed in [product-evidence-index.md](./artifacts/product-evidence-index.md).

## SEO and URL findings

- The repository and local rendering expose a valid metadata, canonical, sitemap, and indexability foundation.
- There is no meaningful search history to justify changing or removing routes.
- Preserve all current indexable URLs, including `/serum` and the three underscore-based product URLs.
- Keep `/ingredients` as `noindex, follow` until its high-risk ingredient copy is reviewed and the page has a validated user purpose.
- The public deployment serves older product copy than the local application. Treat this as deployment drift.

## Analytics findings

- Yandex Metrica `98874723`, Mail.ru `3589962`, and GA4 `G-6JC9JR7TQ0` are installed.
- Current client helpers invoke generic `form` and `go_wb` goals.
- Skinetics has no meaningful site traffic or conversion history; this is the numerical baseline.
- The accepted canonical event is `marketplace_click` with product, brand, marketplace, placement, page, and optional campaign context.
- The two creams account for 71.9% of Wildberries seller-account revenue share over 2026-05-25 through 2026-08-22. This marketplace demand is not attributed to Skinetics.

## Claims findings

- Current local serum descriptions use safer cosmetic-care framing and can serve as the migration baseline.
- The public deployment contains medical, guaranteed, absolute-safety, and exaggerated efficacy claims that must not be carried forward.
- Dormant ingredient copy contains treatment, mechanistic, disease, detoxification, and unreferenced “proved” claims; it must be removed, qualified, or externally reviewed before publication.
- Dmitry approves ordinary product copy. Uncertain medical, regulatory, clinical, quantified, or guaranteed-effect claims require external professional or legal review.
- See [claims-audit.md](./artifacts/claims-audit.md).

## Recommendations for Phase 01

1. Implement explicit brand, category, and optional marketplace data without changing current URLs.
2. Migrate and validate the three existing products before adding creams.
3. Implement contextual marketplace-click analytics while preserving the historical `go_wb` goal.
4. Keep cream copy and routes out of Phase 01.
5. Do not invent cream application or precaution content; Phase 02 publication remains blocked until approved wording arrives.
