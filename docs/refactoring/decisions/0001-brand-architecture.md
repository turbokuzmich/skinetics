# 0001 — Skinetics portfolio brand architecture

- **Status:** Accepted
- **Date:** 2026-08-22
- **Owners:** Dmitry, business owner
- **Affected phases:** 00–05

## Context

Skinetics was previously described primarily through Dr. Health, while priority marketplace products also use SkineticsLab and Neon Beard. ReneWal was initially mistaken for a separate brand.

## Options considered

### Single-brand Dr. Health site

Preserve the current presentation but prevent accurate inclusion of the two creams and future portfolio products.

### Multi-brand Skinetics umbrella

Use Skinetics as the discovery/catalog layer and assign every product to exactly one customer-facing brand.

## Decision

Skinetics is the permanent umbrella identity and catalog site. The customer-facing product brands are Dr. Health, SkineticsLab, and Neon Beard. ReneWal is a product name under SkineticsLab. Use `SkineticsLab` in site text.

## Consequences

- Product data requires an explicit single brand relationship.
- Skinetics must not be presented as a checkout store or as the legal entity.
- Early phases use text labels because official logos and brand guidelines are unavailable.
- The future design system must support distinct brand treatment within the Skinetics portfolio.

## Evidence

- [Phase 00 closure design](../phase-00-baseline/DESIGN.md)
- [Brand architecture](../shared/brand-architecture.md)
- Product-owner confirmation recorded on 2026-08-22
