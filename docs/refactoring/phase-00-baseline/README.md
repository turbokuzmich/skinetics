# Phase 00 — Baseline and product truth

- **State:** Complete
- **Owner:** Dmitry, business owner
- **Started:** 2026-08-22
- **Completed:** 2026-08-22

## Objective

Establish reliable product, brand, URL, claims, SEO, analytics, and marketplace baselines before implementation begins.

## Why this phase exists

The current code and public marketplace data contain conflicting brand identifiers, limited tracking, and legacy product claims. Later phases depend on resolving those issues without losing existing search value.

## Prerequisites

- [x] Approved high-level roadmap
- [x] Refactoring workspace initialized
- [x] Owner assigned
- [x] Analytics and marketplace availability reviewed; the no-traffic site baseline and sanitized marketplace baseline are recorded

## In scope

- current URL and indexation inventory;
- product and brand source-of-truth review;
- baseline search and site analytics;
- current marketplace-pair verification;
- claims audit and content-risk classification;
- measurement contract for later phases.

## Out of scope

- changes to application code;
- new product publication;
- final information architecture or visual design;
- paid campaign execution.

## Deliverables

- completed shared product and brand references;
- enriched URL inventory with search evidence;
- baseline metrics report;
- claims-audit report;
- accepted decisions for conflicts that block later work;
- reviewed Phase 01 prerequisites.

## Exit criteria

- [x] Canonical public brand is confirmed for every current and priority product.
- [x] Product names, volumes, barcodes, marketplace IDs, images, and marketplace INCI are indexed; missing cream application and precautions are an accepted Phase 02 publication blocker.
- [x] Existing indexable URLs have preserve, redirect, retain-as-information, or remove decisions.
- [x] Search, analytics, and marketplace baselines are recorded with their date ranges and limitations.
- [x] Unsupported or high-risk claims are inventoried and prioritized.
- [x] The marketplace click event contract is approved.

The accepted exception for cream application and precaution wording is recorded in [decision 0003](../decisions/0003-defer-cream-safety-copy.md). No cream may be published until that wording is supplied and approved.

## Related records

- [Roadmap](../ROADMAP.md#phase-00--baseline-and-product-truth)
- [Product source of truth](../shared/product-source-of-truth.md)
- [Brand architecture](../shared/brand-architecture.md)
- [Measurement plan](../shared/measurement-plan.md)
- [Claims policy](../shared/claims-policy.md)
