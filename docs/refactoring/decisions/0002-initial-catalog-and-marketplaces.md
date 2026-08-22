# 0002 — Initial catalog and marketplace scope

- **Status:** Accepted
- **Date:** 2026-08-22
- **Owners:** Dmitry, business owner
- **Affected phases:** 00–03

## Context

The seller account contains more products than the website should launch with. The current site publishes three Dr. Health serums, while the two creams are the next priorities.

## Options considered

### Import all marketplace products

Broader coverage, but insufficient verified content and unnecessary Phase 01 scope.

### Launch a verified five-product catalog

Keep the three current serums and add only the two priority creams after the catalog model is ready.

## Decision

The initial website catalog contains exactly five products: three Dr. Health serums, one SkineticsLab ReneWal cream, and one Neon Beard Ultra Lift cream. The serums are Wildberries-only. Both creams have Wildberries and Ozon destinations.

## Consequences

- Phase 01 migrates only the existing three products.
- Phase 02 adds only the two creams.
- The data model remains extensible, but other seller-account products receive no website pages in the initial program.

## Evidence

- [Product source of truth](../shared/product-source-of-truth.md)
- [Marketplace baseline](../phase-00-baseline/artifacts/marketplace-baseline.md)
