# Serum image source record

Recorded for the Phase 04 redesign on 2026-08-24. The filename follows the
approved Phase 04 implementation plan; the retrieval date below is the actual
date on which the marketplace galleries were reviewed and the source bytes
were saved.

## Verification method

- Opened each accepted Wildberries product URL in the browser.
- Navigated visibly to the final gallery slide and confirmed its position
  against the complete set of numbered gallery images.
- Compared the article, product identity, Dr. Health bottle, and the adjacent
  `100 мл` marketplace quantity with the accepted product source of truth.
- Confirmed that each final slide contains one complete bottle with an intact
  label and grounding shadow, without a separate promotional or marketplace
  overlay.
- Downloaded the resolved `big` WebP source directly, without conversion,
  resizing, or recompression. The files below preserve the delivered bytes.
- Opened every downloaded file at original detail and confirmed that the
  bottle, pump, label, and shadow are complete and uncropped.

## Sources

### Red pepper and niacinamide serum spray

- Site product ID: `red_pepper`
- Accepted identity: Dr. Health serum spray with red pepper and niacinamide,
  100 мл
- Wildberries article: `397061523`
- Product page: <https://www.wildberries.ru/catalog/397061523/detail.aspx>
- Final gallery position: `13 of 13`
- Resolved source: <https://basket-23.wbbasket.ru/vol3970/part397061/397061523/images/big/13.webp>
- Retrieval date: `2026-08-24`
- Local file: `public/items/red_pepper-wildberries.webp`
- Media: WebP, `900 × 1200`, `20,368` bytes
- SHA-256: `77893c2ab655f29b8d612dbe700d776876249c7e5a59c06a7e07bc5092e46488`
- Visible verification: Dr. Health `HAIR GROWTH ACTIVATOR` bottle with red
  pepper and `5% B3/B5/HA` label; the product page shows article `397061523`
  and quantity `100 мл`; bottle and soft base shadow are complete; no separate
  promotional overlay is composited into the final slide.

### Copper tripeptide GHK-Cu serum

- Site product ID: `copper_tripeptide`
- Accepted identity: Dr. Health serum with copper tripeptide GHK-Cu, 100 мл
- Wildberries article: `397059149`
- Product page: <https://www.wildberries.ru/catalog/397059149/detail.aspx>
- Final gallery position: `9 of 9`
- Resolved source: <https://mow-basket-cdn-31.geobasket.ru/vol3970/part397059/397059149/images/big/9.webp>
- Retrieval date: `2026-08-24`
- Local file: `public/items/copper_tripeptide-wildberries.webp`
- Media: WebP, `900 × 1200`, `18,614` bytes
- SHA-256: `23ad56a32463569fd08302160ac32725037403927fa43c532eaf2c852f6b8113`
- Visible verification: Dr. Health `HAIR GROWTH BOOSTER` bottle with `2% GHK-Cu`
  label; the product page shows article `397059149` and quantity `100 мл`;
  bottle and soft base shadow are complete; no separate promotional overlay is
  composited into the final slide.

### Climbazole and piroctone olamine scalp serum

- Site product ID: `climbazole`
- Accepted identity: Dr. Health scalp serum with climbazole and piroctone
  olamine, 100 мл
- Wildberries article: `236310045`
- Product page: <https://www.wildberries.ru/catalog/236310045/detail.aspx>
- Final gallery position: `14 of 14`
- Resolved source: <https://mow-basket-cdn-47.geobasket.ru/vol2363/part236310/236310045/images/big/14.webp>
- Retrieval date: `2026-08-24`
- Local file: `public/items/climbazole-wildberries.webp`
- Media: WebP, `900 × 1200`, `20,628` bytes
- SHA-256: `dc8e88afb499196dc59dc8587a5c930f286647078bd5005c50951ab84742ae1b`
- Visible verification: Dr. Health `DERMAL CONTROL` bottle with `3%`,
  `Climbazole`, and `Piroctone Olamine` label; the product page shows article
  `236310045` and quantity `100 мл`; bottle and soft base shadow are complete;
  no separate promotional overlay is composited into the final slide.

## Preservation checks

The existing PNG presentation files remain in the immutable originals archive
and are not referenced by the refreshed product records:

| File | SHA-256 before and after refresh |
|---|---|
| `public/items/originals/red_pepper.png` | `c7ac53000f4ebbc51860c5b3e999a4a2ac321d60453ff5d46daa36502df99963` |
| `public/items/originals/copper_tripeptide.png` | `35294a2aea58e82b0904d44bf77ed58d6205a1d4fa6d8de856de40c7a986650f` |
| `public/items/originals/climbazole.png` | `f9c47bee10988dbdcf9a4bb0a743f930759b153a781baff43e528727d38a8e39` |

All files under `public/video/` remain unchanged. Product cards and product
heroes consume the same `Product.image` field, so each path update applies to
both surfaces while retaining the existing Russian alternative text.
