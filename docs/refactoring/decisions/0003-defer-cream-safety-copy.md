# 0003 — Defer missing cream safety copy to Phase 02

- **Status:** Accepted
- **Date:** 2026-08-22
- **Owners:** Dmitry, business owner
- **Affected phases:** 00–02

## Context

The marketplace cards provide cream identity, composition, volume, imagery, and general morning/evening use context, but not authoritative application and precaution wording. That wording has been requested and will arrive later.

## Options considered

### Block Phase 01

Keep Phase 00 open until all cream labeling is available, despite the missing copy not affecting the catalog data interfaces or migration of current serums.

### Carry a strict publication blocker

Close Phase 00 and allow Phase 01 modeling while preventing either cream from being published without the missing approved wording.

## Decision

Carry the missing application and precaution wording as a Phase 02 publication blocker. Phase 00 may close and Phase 01 may proceed. No fallback instructions may be invented.

## Consequences

- Phase 02 remains blocked from publication until the wording is supplied and approved.
- The blocker must remain visible in root status, Phase 02 inputs, and Phase 02 validation.
- Product records may model the fields but must not contain guessed content.

## Evidence

- [Phase 00 closure design](../phase-00-baseline/DESIGN.md#accepted-phase-00-exception)
- [Product source of truth](../shared/product-source-of-truth.md)
