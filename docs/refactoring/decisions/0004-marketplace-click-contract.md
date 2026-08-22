# 0004 — Marketplace click measurement contract

- **Status:** Accepted
- **Date:** 2026-08-22
- **Owners:** Dmitry, business owner
- **Affected phases:** 00–05

## Context

The current `go_wb` goal records generic Wildberries clicks without product, brand, placement, or page context. Ozon clicks are not tracked.

## Options considered

### Replace historical goals

Use only a new event, creating a discontinuity in existing reports.

### Add a canonical contextual event with compatibility goals

Use `marketplace_click` and required dimensions while retaining the historical Wildberries goal through platform adapters.

## Decision

Use the canonical `marketplace_click` semantic event with `product_id`, `brand_id`, `marketplace`, `placement`, and `page_path`; include `campaign` when available. Preserve `go_wb` for Wildberries compatibility and add platform-specific Ozon delivery during implementation.

## Consequences

- Event payloads can distinguish product and marketplace performance.
- Historical Wildberries reports remain interpretable.
- Phase 01 must test payloads and ensure no personal data is included.

## Evidence

- [Measurement plan](../shared/measurement-plan.md)
- [Analytics baseline](../phase-00-baseline/artifacts/analytics-baseline.md)
