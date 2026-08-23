# Phase 01 catalog foundation design

Date: 2026-08-23
Status: Implemented and validated
Owner: Dmitry, business owner

## Purpose

Replace the current single-brand, Wildberries-only product assumptions with a typed catalog model that supports the accepted Skinetics portfolio, one primary product category, zero or more marketplace destinations, reusable product content, and contextual outbound measurement. Migrate only the three published Dr. Health serums and preserve their current public behavior.

## Scope

Phase 01 includes:

- stable brand, category, product, and marketplace identifiers;
- typed brand, category, marketplace, and product records;
- one primary category per product;
- structured reusable product content;
- draft and published product states;
- optional Wildberries and Ozon links in a fixed global order;
- generic marketplace actions and URL preparation;
- product-, brand-, marketplace-, placement-, page-, and campaign-aware outbound analytics;
- migration and regression validation of the three existing serums;
- instructions for adding and safely publishing a future product.

Phase 01 does not publish either cream, change navigation or established URLs, redesign catalog pages, introduce brand artwork, or broaden the catalog beyond the accepted five-product program scope. Authoritative cream application and precaution wording remains a Phase 02 publication blocker.

## Chosen approach

Use a structured, typed catalog domain built around the existing root `types.ts` and `constants.ts`, with shared selection and validation behavior in `lib/`. Product presentation consumes generic data instead of selecting a route-specific React description component.

Two alternatives were rejected:

1. Extending the current `Item` type in place while retaining route-specific descriptions would be quicker, but would preserve the page/data coupling that Phase 01 is intended to remove.
2. Parsing all compile-time records through Zod would add runtime-schema complexity without a current external data boundary. TypeScript plus focused catalog-integrity checks provides the required protection for the initial catalog.

## Domain model

### Stable identifiers

The catalog defines stable string identifiers for:

- brands: `dr-health`, `skineticslab`, and `neon-beard`;
- categories: `serum` and `face-cream`;
- marketplaces: `wildberries` and `ozon`;
- product states: `draft` and `published`;
- marketplace-action placements used in Phase 01: `catalog-card` and `product-hero`.

`sticky-mobile` remains a permitted future placement for the approved measurement contract, but Phase 01 does not introduce that interface.

Each product has exactly one customer-facing brand and one primary category. Concerns, ingredients, usage contexts, and future content hubs are separate relationships and must not be encoded as additional product categories.

### Product identity and routing

Each product record separates:

- `id`, the permanent internal identity used in analytics and data relationships;
- `slug`, the public path segment used under `/catalog/`.

For the three current serums, `id` and `slug` retain the existing underscore-based values:

- `red_pepper`;
- `copper_tripeptide`;
- `climbazole`.

This separation allows a future reviewed URL migration without changing product identity. Phase 01 does not use that capability to rename any route.

### Product fields

A complete product record contains:

- `id`, `slug`, and publication status;
- brand and primary-category references;
- title and short summary;
- image path and required accessible alternative text;
- volume;
- verified full composition or INCI;
- metadata title and description;
- structured content;
- optional marketplace links keyed by marketplace.

Structured product content requires:

- overview or cosmetic purpose;
- active-component description;
- a titled list describing benefits, care format, or suitable use;
- application heading and instructions;
- precautions.

The structure preserves the accepted meaning and Russian copy of the current serum pages while allowing one generic renderer to present future products. It does not invent or generalize missing cream instructions.

### Publication rules

Draft records may contain no marketplace destinations and must render safely if passed to reusable presentation helpers. They are excluded from all public catalog selectors.

A published product must contain every required field and at least one valid marketplace destination. Only published products feed:

- homepage and catalog listings;
- `/serum` filtering;
- product static parameters;
- metadata and canonical generation;
- navigation entries derived from product data;
- sitemap entries.

Phase 01 catalog data contains only the three current published serums. It defines SkineticsLab, Neon Beard, `face-cream`, and Ozon so the interfaces are ready for Phase 02, but it does not add draft or published cream product records.

## Data ownership and helpers

`types.ts` owns the catalog domain types. `constants.ts` remains the authoritative cross-page data source for brands, categories, marketplaces, products, ingredients, and navigation data, consistent with the repository conventions.

Shared catalog helpers in `lib/` provide narrow operations:

- return all published products;
- return published products for one category;
- resolve a published product by slug;
- order a product's available destinations according to the marketplace registry;
- validate catalog integrity and publication invariants.

Pages and components consume these helpers rather than repeating filters or indexing raw maps. Presentation code does not own product identity, availability, routing, or analytics semantics.

## Marketplace action design

The current Wildberries-specific button becomes a generic marketplace action boundary:

1. `MarketplaceActions` receives the product identity, brand identity, marketplace-link map, and typed placement.
2. It reads the global marketplace registry, whose fixed display order is Wildberries followed by Ozon.
3. It removes destinations for which the product has no URL.
4. It renders one marketplace-specific action for each remaining destination.

A missing destination produces no disabled button and no availability claim. A product with zero destinations produces no actions and no rendering error. Existing Wildberries styling and wording remain substantially unchanged; Ozon receives its own label and narrowly scoped button styling. Broader visual work remains in Phase 04.

External destinations open in a new tab and retain safe `rel` attributes. Analytics availability never blocks or delays navigation.

## URL preparation

Marketplace URL preparation is separate from analytics delivery.

- The Wildberries adapter preserves the current outbound UTM convention and existing product URLs.
- The Ozon adapter initially preserves its verified product URL without inventing an unapproved outbound campaign convention.
- Invalid base URLs fail catalog validation rather than failing in a browser click handler.

Only the inbound `utm_campaign` value may contribute campaign context to analytics. It is normalized, length-limited, and discarded when malformed or suggestive of personal data. No other search parameter, form value, or user-entered field enters the outbound event.

## Analytics contract

The canonical application event is `marketplace_click` with:

- `product_id`;
- `brand_id`;
- `marketplace`;
- `placement`;
- `page_path`;
- optional `campaign`.

`page_path` comes from the current Next.js pathname. `campaign` is omitted when no acceptable `utm_campaign` exists. The event contains no personal data.

Adapters translate this semantic event for each analytics platform:

- Google Analytics receives `marketplace_click` with the canonical dimensions.
- Yandex Metrica receives one JavaScript-event goal per click: `go_wb` for Wildberries or `go_ozon` for Ozon, with the canonical dimensions supplied as goal parameters.
- Mail.ru receives the corresponding compatibility goal while retaining the current Wildberries behavior.

Yandex Metrica must not receive both `marketplace_click` and `go_wb` or `go_ozon` as separate goals for one click, because that would double-count the same conversion. `marketplace_click` remains the cross-platform semantic name even when a platform adapter uses a compatibility goal identifier.

The existing `go_wb` goal remains unchanged. Dmitry confirmed on 2026-08-23 that the `go_ozon` JavaScript-event goal has been added to Yandex Metrica counter `98874723`.

## Page migration

The homepage, `/catalog`, and `/serum` consume published catalog selectors. The serum listing filters by the `serum` category and continues to show the same three records.

The dynamic product route:

- resolves products by public slug;
- returns the existing not-found behavior for an unknown or unpublished slug;
- generates static parameters from published products only;
- derives metadata and canonical URLs from the resolved product record;
- renders the structured content through one generic renderer;
- supplies `product-hero` to marketplace actions.

Catalog cards supply `catalog-card` to marketplace actions. The three page-specific description components become unnecessary after their accepted copy is migrated into the structured records and may be removed as part of implementation.

Sitemap paths, internal links, metadata, canonical URLs, images, volumes, compositions, and Wildberries destinations for the three current products remain unchanged.

## Integrity and failure handling

TypeScript rejects structurally incomplete records and unknown typed identifiers during compilation. A catalog-integrity assertion runs while the catalog module is evaluated during the production build and fails with a product-specific error for:

- duplicate product IDs or slugs;
- references to unknown brands, categories, or marketplaces;
- missing required content on a published product;
- a published product with no marketplace destination;
- a malformed or non-HTTPS marketplace URL;
- a marketplace URL whose hostname is not approved for that marketplace.

At runtime:

- an unknown product slug returns a 404;
- a missing marketplace link is omitted;
- absent analytics globals are ignored;
- analytics failures do not cancel the outbound action;
- unsafe or unexpected campaign input is omitted rather than repaired into a payload.

## Validation

Automated validation includes:

- `npm run lint`;
- `npm run build`;
- catalog-integrity checks exercised by the production build.

Product regression compares all three existing product pages for:

- public URL and canonical URL;
- metadata;
- title, summary, and long-form copy;
- image and volume;
- composition;
- Wildberries destination.

Manual route regression covers:

- `/`;
- `/catalog`;
- `/serum`;
- all three product URLs;
- `/about` and `/contacts`;
- the trichologist and contact forms, using validation-only inputs and no real customer data.

Marketplace validation covers zero, one, and two destinations. Because the production Phase 01 dataset contains only one-destination products, zero- and two-destination layouts may be exercised with temporary local development fixtures. Those fixtures must be removed before the final diff and production build.

Analytics validation uses locally stubbed `ym`, `gtag`, and `_tmr` functions so test clicks do not pollute production counters. It confirms:

- one analytics dispatch per platform adapter and click;
- `go_wb` for Wildberries;
- `go_ozon` for Ozon;
- the complete required contextual payload;
- campaign omission and normalization behavior;
- safe navigation when an analytics global is missing.

## Documentation

Phase 01 adds concise instructions for creating a product record, choosing stable identifiers, supplying required content, adding verified marketplace URLs, keeping a record in draft, validating it, and changing it to published. The instructions must repeat that packaging and manufacturer evidence take precedence and that missing application or precaution wording blocks publication.

## Exit conditions

Phase 01 is complete when:

- the three existing serums render from the new model;
- their URLs, canonicals, metadata, copy, sitemap membership, and outbound destinations remain correct;
- the model safely represents Wildberries, Ozon, both, or neither;
- outbound events contain the approved product and marketplace context while retaining compatibility goals;
- catalog integrity, lint, and production build validation pass;
- manual regressions and product-creation documentation are recorded;
- no cream page or unrelated redesign is introduced.

## Related records

- [Phase 01 README](./README.md)
- [Phase 01 inputs](./INPUTS.md)
- [Phase 01 checklist](./CHECKLIST.md)
- [Product source of truth](../shared/product-source-of-truth.md)
- [Measurement plan](../shared/measurement-plan.md)
- [Marketplace click decision](../decisions/0004-marketplace-click-contract.md)
- [URL preservation decision](../decisions/0005-url-preservation-policy.md)
