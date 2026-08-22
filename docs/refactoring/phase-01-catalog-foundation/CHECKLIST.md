# Phase 01 checklist

## Design

- [ ] Define stable identifiers for brands, categories, products, and marketplaces.
- [ ] Define optional marketplace-link behavior and display order.
- [ ] Define the product content fields needed by current and cream pages.
- [ ] Define analytics event payload and compatibility with historical goals.
- [ ] Review the short design before implementation.

## Implementation

- [ ] Add brand and category types/data.
- [ ] Replace required Wildberries-only link typing with optional marketplace links.
- [ ] Generalize the marketplace button component.
- [ ] Add product- and placement-aware analytics.
- [ ] Migrate the three existing products.
- [ ] Keep existing static parameters, canonicals, and URLs stable.
- [ ] Document how to add a new product safely.

## Validation

- [ ] Run lint.
- [ ] Run production build.
- [ ] Verify the three existing product pages.
- [ ] Verify catalog cards with one and multiple marketplace destinations.
- [ ] Verify outbound URLs and analytics payloads.
- [ ] Verify forms and unrelated routes remain functional.

## Phase close

- [ ] Complete findings and validation records.
- [ ] Update root status and log.
- [ ] Confirm Phase 02 is ready.
