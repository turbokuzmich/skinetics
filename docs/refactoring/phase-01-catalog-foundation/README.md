# Phase 01 — Catalog foundation

- **State:** Complete
- **Owner:** Dmitry, business owner
- **Started:** 2026-08-23
- **Completed:** 2026-08-23

## Objective

Create a scalable product model that supports multiple brands, product categories, and optional marketplace destinations while preserving current behavior and URLs.

## Prerequisites

- [x] Phase 00 complete
- [x] Canonical brand and product identifiers approved
- [x] Marketplace analytics event contract approved
- [x] Existing URL preservation rules approved

## In scope

- brand and category data structures;
- optional Wildberries and Ozon links;
- reusable marketplace action components;
- product-aware outbound analytics;
- reusable product content structure;
- migration of the three current products without URL changes.

## Out of scope

- publishing the two cream pages;
- final brand/category navigation;
- full visual redesign;
- large-scale content migration.

## Deliverables

- accepted product, brand, category, and marketplace types;
- migrated current product records;
- reusable marketplace button/action UI;
- marketplace click events with approved dimensions;
- technical documentation for adding products.

## Exit criteria

- [x] All three existing product pages render from the new model.
- [x] Existing product URLs and metadata remain valid.
- [x] A product can have Wildberries, Ozon, both, or neither without type or rendering errors.
- [x] Outbound events identify product, brand, marketplace, placement, and page.
- [x] Lint and production build pass.
- [x] A manual regression covers homepage, catalog, serum listing, product pages, and forms.

## Related records

- [Roadmap](../ROADMAP.md#phase-01--catalog-foundation)
- [Product source of truth](../shared/product-source-of-truth.md)
- [Measurement plan](../shared/measurement-plan.md)
- [Adding a catalog product](./artifacts/adding-a-product.md)
- [Validation](./VALIDATION.md)
