# Phase 00 closure design

Date: 2026-08-22
Status: Approved
Owner: Dmitry, business owner

## Purpose

Close Phase 00 with enough verified product, brand, URL, claims, and measurement information to begin the catalog-foundation work without publishing unverified cream instructions or changing established serum URLs.

## Scope

The initial Skinetics catalog contains exactly five products:

1. three existing Dr. Health scalp and hair serums;
2. SkineticsLab ReneWal peptide face cream, 50 ml;
3. Neon Beard Ultra Lift peptide face cream, 100 ml.

Other products in the marketplace seller account are outside the initial website scope. The Phase 01 model must remain extensible so they can be considered later without restructuring the catalog.

## Brand architecture

- Skinetics is the permanent umbrella identity and catalog site. It is not a product brand.
- Customer-facing product brands are Dr. Health, SkineticsLab, and Neon Beard.
- Every product belongs to exactly one customer-facing brand.
- Use `SkineticsLab` in site text. Marketplace and packaging artwork may use uppercase styling.
- ReneWal is a product name under SkineticsLab, not a separate brand.
- ООО «Демидов Люкс СПА» remains the legal entity and manufacturer/company identity where applicable.

## Canonical product set

| Product | Brand | Volume | Wildberries | Ozon | Barcode | Initial marketplace availability |
|---|---|---:|---:|---:|---:|---|
| Dr. Health red-pepper hair and scalp serum | Dr. Health | 100 ml | `397061523` | — | `2043752266957` | Wildberries |
| Dr. Health GHK-Cu hair and scalp serum | Dr. Health | 100 ml | `397059149` | — | `2043752250338` | Wildberries |
| Dr. Health climbazole scalp serum | Dr. Health | 100 ml | `236310045` | — | `4630247421137` | Wildberries |
| Крем для лица с пептидами ReneWal | SkineticsLab | 50 ml | `771142529` | `5223519199` | `4630247421458` | Wildberries and Ozon |
| Крем для лица с пептидами Ultra Lift | Neon Beard | 100 ml | `768970852` | `5223635791` | `4630247421502` | Wildberries and Ozon |

Product identity, composition, volume, marketplace information, and available packaging imagery were checked against the current Wildberries cards on 2026-08-22. Packaging and manufacturer material take precedence when a marketplace brand label conflicts with the physical product.

## URL and rendering policy

- Preserve `/`, `/catalog`, `/serum`, `/about`, `/contacts`, and the three established serum product URLs.
- Preserve `/ingredients` as `noindex, follow` until it contains useful reviewed content.
- Do not rename the underscore-based serum product URLs during the catalog-model migration.
- Add stable, human-readable cream URLs only in Phase 02.
- Maintain server-rendered product content, metadata, canonical URLs, sitemap membership, and static product generation.

The local application renders the current safer serum copy and expected metadata. The public deployment still exposes older, higher-risk product claims. Treat this as deployment drift, not as the source of truth for future copy.

## Claims policy and ownership

- Dmitry approves ordinary product and brand copy.
- Medical, regulatory, quantified, clinical, guaranteed-effect, and other uncertain claims require external professional or legal review before publication.
- Product pages describe cosmetics and care. They must not present products as treatments or promise guaranteed outcomes.
- Existing high-risk ingredient and legacy product claims are classified for removal, qualification, or escalation in the Phase 00 claims audit.
- Marketplace wording is an evidence source, not copy to reproduce verbatim.

## Measurement baseline

Skinetics has no meaningful site-traffic or conversion history yet. Record that absence as the baseline instead of manufacturing SEO or conversion benchmarks.

The current application sends generic `form` and `go_wb` goals to Yandex Metrica and Mail.ru. Google Analytics is installed, but product-, placement-, and marketplace-level outbound context is not present.

The Wildberries seller funnel for 2026-05-25 through 2026-08-22 confirms marketplace demand for the five products. The two creams together account for about 72% of seller-account revenue share over that period. Commit only sanitized product-level findings; do not commit raw exports, customer data, or confidential marketplace reports.

Private exports, if later created, belong outside Git in:

`~/Documents/vaults/personal/Business/Skinetics`

## Phase boundaries

### Phase 01 — Catalog foundation

- Introduce explicit brands and product categories.
- Model optional marketplace links by marketplace.
- Keep the current three serum IDs and URLs unchanged.
- Render and validate the existing three products from the new model before adding creams.
- Add outbound event context for product, brand, marketplace, placement, page path, and campaign.

### Phase 02 — Cream launch

- Add the two approved cream identities and both marketplace destinations.
- Add verified images, composition, metadata, application, precautions, and internal links.
- Do not publish either cream until authoritative application and precaution wording has been supplied and approved.

### Phase 04 — Visual identity

Official logos and brand guidelines are not currently available. Early catalog work may use consistent typographic brand labels. Do not invent permanent logos or brand rules from marketplace artwork. Resolve the portfolio visual system in Phase 04 unless official assets arrive sooner.

## Accepted Phase 00 exception

Cream application and precaution wording is pending from the product owner. This does not affect the Phase 01 data interfaces or migration of the three existing serum products, so it may be carried as a named Phase 02 publication blocker.

Phase 00 may close and Phase 01 may become Ready only if all of the following are true:

- the missing wording remains visible in status, validation, and Phase 02 inputs;
- no cream is published before the wording is supplied and approved;
- the product model does not embed invented fallback instructions;
- future evidence updates the product source of truth before implementation copy is finalized.

## Validation

Phase 00 documentation must agree on brand spelling, product ownership, product IDs, volumes, barcodes, marketplace mappings, date ranges, source precedence, and the deferred cream-content blocker. Phase 01 is ready when that consistency check passes; code implementation is intentionally outside Phase 00.
