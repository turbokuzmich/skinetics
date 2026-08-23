# 0007 — Use a navigational-editorial Skinetics design system

- **Status:** Accepted
- **Date:** 2026-08-23
- **Owners:** Dmitry, business owner
- **Affected phases:** 04–05

## Context

Skinetics needs a coherent portfolio identity that helps visitors understand and compare products across Dr. Health, SkineticsLab, and Neon Beard. The current interface presents a SkineticsLab wordmark at umbrella level, gives a large video carousel priority over the catalog journey, and lacks an approved portfolio-level visual system. Official logos and brand guidelines are not yet available.

## Options considered

### Navigational editorial system

Use warm neutral surfaces, editorial hierarchy, restrained geometry, and text-backed brand accents to emphasize guidance, trust, and product selection.

### Modern laboratory system

Use a cool technical palette and strict modular treatment. This supports ingredient content but makes the portfolio feel more clinical than intended.

### Warm product-object system

Use softer shapes and a more tactile presentation. This feels approachable but weakens information hierarchy and multi-brand consistency.

## Decision

Use the navigational-editorial system. Skinetics owns the layout, typography, interaction, and neutral palette; the three product brands receive restrained provisional accents paired with text names. Currently verified public facts form the initial trust layer. Official identity and evidence assets enter through a reviewed, non-blocking backlog.

Implement the redesign incrementally and publish it as one coordinated release. Retain every file under `public/video/` while removing homepage video delivery. Refresh the three serum presentation images from verified final Wildberries gallery slides and preserve downloaded source files.

## Consequences

- Phase 04 uses Literata headings, Manrope body/interface text, and the accepted warm neutral token system.
- Future Phase 05 pages reuse the same primitives and portfolio hierarchy.
- Official brand guidelines may replace provisional accents without restructuring page templates.
- The absence of logos, badges, photography, or specialist profiles does not block a text-first local release candidate.
- Marketplace colors remain limited to outbound marketplace actions.
- Production deployment remains separately authorized.

## Evidence

- [Phase 04 design](../phase-04-redesign/DESIGN.md)
- [Phase 04 findings](../phase-04-redesign/FINDINGS.md)
- [Future asset backlog](../phase-04-redesign/artifacts/future-asset-backlog.md)
- [Phase 03 page requirements](../phase-03-site-architecture/artifacts/content-map-and-page-requirements.md)
