# Phase 02 inputs

Status: Accepted and implemented locally; deployment pending

## Product 1 — Neon Beard Ultra Lift

- Internal ID: `ultra_lift`
- Public URL: `/catalog/ultra-lift`
- Packaging quantity: 100 г
- Wildberries ID: `768970852`
- Ozon ID: `5223635791`
- Barcode: `4630247421502`
- Canonical name: Крем для лица с пептидами Ultra Lift
- Brand: Neon Beard
- Local image: `/items/ultra_lift.webp`, sourced from reviewed Wildberries gallery image 11

## Product 2 — SkineticsLab ReneWal

- Internal ID: `renewal`
- Public URL: `/catalog/renewal`
- Packaging quantity: 50 г
- Wildberries ID: `771142529`
- Ozon ID: `5223519199`
- Barcode: `4630247421458`
- Canonical name: Крем для лица с пептидами ReneWal
- Brand: SkineticsLab
- Local image: `/items/renewal.webp`, sourced from reviewed Wildberries gallery image 12

ReneWal's selected photograph contains a small English phrase printed on the physical package. It is evidence of the current package, not approved authored site copy, and is excluded from alternative text, metadata, page copy, and structured data.

## Accepted content inputs

- the product owner approved the exact [application and precaution wording](./artifacts/proposed-application-and-precautions.md) separately for both creams on 2026-08-23;
- the approved design records conservative Russian summaries, purpose, suitable-use, active-component, feature, FAQ, application, precaution, and composition copy;
- the reviewed marketplace INCI is minimally normalized only where spelling, capitalization, punctuation, or delimiters are unambiguous;
- the shared claims policy excludes medical, injection-equivalence, guaranteed-effect, and absolute-safety claims;
- Wildberries is rendered before Ozon according to the global marketplace registry.

## Accepted technical inputs

- the Phase 01 typed catalog and integrity assertion;
- `/cream` as the public face-cream category path;
- `/catalog/ultra-lift` and `/catalog/renewal` as stable product URLs;
- neutral multi-brand homepage and `/catalog` copy, with `/serum` unchanged;
- server-rendered `BreadcrumbList` for all products and no product, offer, review, rating, or FAQ rich-result markup;
- the established product-, brand-, marketplace-, placement-, and page-aware analytics contract.

## Remaining gate

No product-evidence, wording, design, implementation, or local-validation blocker remains. Production deployment is the only open launch gate and requires explicit authorization. If a higher-precedence packaging or manufacturer source later conflicts with an accepted field, review and correct that field before deployment or continued use.
