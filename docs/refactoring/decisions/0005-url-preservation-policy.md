# 0005 — Preserve established public URLs

- **Status:** Accepted
- **Date:** 2026-08-22
- **Owners:** Dmitry, business owner
- **Affected phases:** 00–05

## Context

Skinetics has no meaningful search-performance history, but the existing URLs are public and changing them would add migration risk without evidence of benefit.

## Options considered

### Normalize all URLs now

Replace underscore product IDs and consolidate listing routes for naming consistency.

### Preserve established routes

Keep all current indexable URLs and add stable human-readable URLs only for new products.

## Decision

Preserve all current indexable routes, including `/serum` and the three underscore-based product URLs. Keep `/ingredients` as `noindex, follow`. Every future URL change requires a redirect and explicit migration review.

## Consequences

- Phase 01 must not alter current static params, canonicals, sitemap entries, or internal links.
- New cream URLs may use lowercase hyphenated slugs in Phase 02.
- Lack of historical traffic is not treated as permission to remove URLs.

## Evidence

- [URL inventory](../shared/url-inventory.md)
- [Phase 00 closure design](../phase-00-baseline/DESIGN.md)
