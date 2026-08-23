# Phase 01 findings

Status: Complete

## Existing constraints

- The current marketplace enum supports only Wildberries.
- Every product currently requires exactly one marketplace link.
- Product categories currently include only `oil` and `serum`.
- Product descriptions are selected through a page-level component map.
- The generic Wildberries goal does not identify product or placement.

## Implementation findings

- Product identity and public routing are now separate `id` and `slug` fields. The three established underscore-based routes remain unchanged.
- `types.ts` defines the accepted brands, categories, marketplaces, publication states, placements, product content, and click-event payload. `constants.ts` contains the corresponding registries and the three published product records.
- Published selectors in `lib/catalog.ts` now feed listings, category filtering, product resolution, static parameters, navigation, and sitemap output.
- Catalog integrity is asserted during module evaluation and therefore during production builds. It rejects duplicate identity, unknown relationships, incomplete published content, missing published destinations, and unsafe marketplace URLs.
- The old route-specific description components were migrated without changing their accepted Russian copy. One generic renderer now consumes structured product content.
- Marketplace actions accept zero, one, or multiple optional destinations and follow the fixed registry order. Missing destinations render no disabled state or availability claim.
- Wildberries keeps its existing default outbound UTM convention. Ozon URLs remain unchanged. Only a normalized, ASCII-safe, length-limited `utm_campaign` enters analytics context.
- Google Analytics receives `marketplace_click`; Yandex Metrica receives one `go_wb` or `go_ozon` goal with contextual parameters; Mail.ru retains the corresponding compatibility goal. Failures in any adapter do not interrupt navigation.
- The documented lint command previously opened an interactive setup because ESLint was absent. Phase 01 added a project-matched Next.js ESLint configuration and dependencies. Lint now completes with five existing warnings outside the Phase 01 code.

## Follow-up work for Phase 02

- Add the two creams only after authoritative application and precaution wording is approved.
- Use both verified marketplace destinations per cream; global ordering and analytics require no component changes.
- Decide and review the two public cream slugs before publishing them.
- Configure any required analytics custom dimensions in the platform interfaces; Phase 01 sends the approved parameters but cannot create reporting definitions in code.
