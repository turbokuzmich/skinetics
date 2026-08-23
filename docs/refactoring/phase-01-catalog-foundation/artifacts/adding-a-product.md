# Adding a catalog product

Last reviewed: 2026-08-23

Use this sequence for every product. Packaging and manufacturer evidence take precedence over owner confirmation, marketplace copy, and legacy site copy. Never publish a record with unverified application or precaution wording.

## 1. Verify the product evidence

Record the product in `docs/refactoring/shared/product-source-of-truth.md` and resolve its customer-facing brand, name, volume, composition or INCI, application, precautions, image, and marketplace pairings. Review all cosmetic claims against `docs/refactoring/shared/claims-policy.md`.

If any required wording is missing, keep the product out of the public catalog. A draft may have no marketplace links, but `status: "published"` is prohibited until every required field and at least one verified marketplace destination is present.

## 2. Choose stable identifiers

- Add a brand, category, or marketplace identifier to the matching union in `types.ts` only when the accepted vocabularies do not already contain it.
- Use a permanent internal `id` for analytics and data relationships.
- Choose the public `slug` separately. Check the URL inventory and redirect policy before changing any established slug.
- Assign exactly one `brandId` and one primary `categoryId`.

## 3. Add the record

Add the product to `products` in `constants.ts` with:

- identity, status, brand, and category;
- title, summary, image path, and descriptive image alternative;
- volume and verified composition or INCI;
- overview, active components, feature list, application, and precautions;
- unique metadata title and description;
- verified `wildberries` and/or `ozon` URLs in `marketplaceLinks`.

Do not add empty, guessed, or placeholder URLs. Marketplace order is global—Wildberries followed by Ozon—and must not be encoded in the product record.

## 4. Validate before publication

Keep `status: "draft"` while gathering or reviewing content. Draft products are excluded from listings, static parameters, metadata, navigation, and sitemap output.

Before changing the status to `published`:

1. compare all fields with the accepted evidence;
2. run `npm run lint`;
3. run `npm run build` and confirm the integrity assertion passes;
4. verify the product page, listing card, canonical, sitemap entry, and marketplace destinations;
5. verify `marketplace_click` carries product, brand, marketplace, placement, page path, and an acceptable campaign when present;
6. record the validation in the active phase.

The build intentionally fails for duplicate IDs or slugs, unknown relationships, incomplete published content, missing published destinations, non-HTTPS URLs, or marketplace hostnames outside the approved registry.
