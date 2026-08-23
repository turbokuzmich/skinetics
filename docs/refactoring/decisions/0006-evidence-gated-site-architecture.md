# 0006 — Use an evidence-gated dual taxonomy

- **Status:** Accepted
- **Date:** 2026-08-23
- **Owners:** Dmitry, business owner
- **Affected phases:** 03–05

## Context

The Skinetics catalog must support discovery by product type, concern, ingredient, and customer-facing brand without creating thin pages, duplicate primary intent, alternate product URLs, or unsupported cosmetic claims. Numerical organic demand and meaningful historical Skinetics traffic are not available.

## Options considered

### Category-only architecture

Keep only the complete catalog, serum and cream categories, and products. This is safe but gives repeated customer selection, ingredient, brand, and application questions no durable content home.

### Evidence-gated dual taxonomy

Keep product type as the stable catalog backbone while defining brand, concern, ingredient, and expert content as secondary discovery relationships. Publish a candidate only after its purpose, demand, evidence, content, links, conversion, ownership, and indexation requirements pass.

### Immediate full hub publication

Publish every planned namespace and candidate child immediately. This creates thin and overlapping pages before demand, unique content, expert review, and production capacity are established.

## Decision

Use the evidence-gated dual taxonomy. Product type remains primary; brand, concern, ingredient, and expert content are secondary relationships. Candidate paths remain absent until the publication gate passes.

## Consequences

- Preserve all current routes and retain one canonical product URL under `/catalog/[slug]`.
- Do not create alternate product paths under brand, concern, ingredient, or expert namespaces.
- Add a taxonomy destination to navigation only after its root is useful, indexable, and has at least one complete child.
- Keep `/ingredients` `noindex, follow`, outside the sitemap, and outside primary navigation until reviewed content passes the gate.
- Phase 04 builds and redesigns approved templates and navigation without automatically publishing gated routes.
- Phase 05 validates and publishes evidence-backed concern, ingredient, and expert-content clusters.
- Single-product SkineticsLab and Neon Beard brand pages remain absent until they have unique verified value beyond their product pages.

## Evidence

- [Phase 03 design](../phase-03-site-architecture/DESIGN.md)
- [Marketplace question and review themes](../phase-03-site-architecture/artifacts/marketplace-question-themes.md)
- [Content inventory and journeys](../phase-03-site-architecture/artifacts/content-inventory-and-journeys.md)
- [Site tree and URL map](../phase-03-site-architecture/artifacts/site-tree-and-url-map.md)
- [Decision 0005 — Preserve established public URLs](./0005-url-preservation-policy.md)
