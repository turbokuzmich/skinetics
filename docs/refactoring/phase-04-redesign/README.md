# Phase 04 — Redesign

- **State:** Deployed; production receipt verification pending
- **Owner:** Dmitry, business owner
- **Started:** 2026-08-23
- **Validated:** 2026-08-24
- **Deployed:** 2026-08-24

## Objective

Implement a distinctive, accessible, responsive design system and page templates that support the approved multi-brand customer journey without weakening content, performance, or SEO.

## Prerequisites

- [x] Phase 03 complete
- [x] Page hierarchy and template requirements approved
- [x] Portfolio visual relationship and text-label fallback approved
- [x] Initial verified content and trust scope agreed
- [x] Performance and accessibility budgets agreed

Official logos, brand guidelines, documentary assets, and photography remain a non-blocking [future asset backlog](./artifacts/future-asset-backlog.md).

## In scope

- design principles, tokens, typography, color, spacing, imagery, and component states;
- responsive header, footer, navigation, breadcrumbs, cards, forms, and marketplace actions;
- homepage, listing, product, brand, editorial, about, and contact templates;
- accessibility, performance, and rendered-content preservation;
- incremental rollout and regression validation.

## Out of scope

- changing product facts or claims without product review;
- direct marketplace API price synchronization;
- a new checkout system;
- large-scale growth campaign execution.

## Deliverables

- approved design direction and system;
- implemented reusable components and page templates;
- responsive behavior specification;
- accessibility, visual-regression, performance, and SEO-rendering evidence;
- migration and release notes.

## Exit criteria

- [x] Key current-route templates implement the approved content hierarchy and conversion paths.
- [x] Dr. Health, SkineticsLab, and Neon Beard are distinguishable within a coherent Skinetics system.
- [x] Keyboard, focus, contrast, semantics, and responsive behavior pass review.
- [x] SEO-critical content is present in server-rendered output.
- [x] No established URL or analytics contract is unintentionally broken.
- [x] Tests, lint, build, route, form, analytics, marketplace-link, and Lighthouse checks pass.

Production deployment was completed on 2026-08-24. Public route, SEO, optimized-image, empty-form-validation, and marketplace-destination smoke checks passed; controlled mail delivery and analytics-dashboard receipt remain open.

## Related records

- [Roadmap](../ROADMAP.md#phase-04--redesign)
- [Brand architecture](../shared/brand-architecture.md)
- Phase 03 architecture artifacts
- [Approved Phase 04 design](./DESIGN.md)
- [Phase 04 implementation plan](../../superpowers/plans/2026-08-23-skinetics-phase-04-redesign.md)
- [Future asset backlog](./artifacts/future-asset-backlog.md)
- [Validation record](./VALIDATION.md)
- [Release and rollback notes](./artifacts/release-and-rollback-notes.md)
