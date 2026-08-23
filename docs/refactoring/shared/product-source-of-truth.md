# Product source of truth

Last reviewed: 2026-08-23

This file tracks accepted identity and source confidence. Product copy and compositions follow the source precedence below. Phase 02 is implemented and validated locally; production deployment remains pending.

## Implemented catalog products

| Site ID | Canonical site name | Site brand | Product type | Packaging quantity | Wildberries ID | Ozon ID | Barcode | Local state |
|---|---|---|---|---|---|---|---|---|
| `red_pepper` | Сыворотка от выпадения и для роста волос | Dr. Health | Scalp/hair serum spray | 100 мл | `397061523` | — | `2043752266957` | Published record; current local copy reviewed |
| `copper_tripeptide` | Сыворотка от выпадения и для роста волос | Dr. Health | Scalp/hair serum | 100 мл | `397059149` | — | `2043752250338` | Published record; current local copy reviewed |
| `climbazole` | Средство от перхоти и себореи с климбазолом | Dr. Health | Scalp serum | 100 мл | `236310045` | — | `4630247421137` | Published record; current local copy reviewed |
| `ultra_lift` | Крем для лица с пептидами Ultra Lift | Neon Beard | Face cream | 100 г | `768970852` | `5223635791` | `4630247421502` | Implemented and locally validated; deployment pending |
| `renewal` | Крем для лица с пептидами ReneWal | SkineticsLab | Face cream | 50 г | `771142529` | `5223519199` | `4630247421458` | Implemented and locally validated; deployment pending |

## Marketplace availability

- The three Dr. Health serums have Wildberries destinations only in the initial catalog.
- Both creams have separate Wildberries and Ozon destinations, rendered in that order.
- The initial catalog contains exactly these five records. Other seller-account products remain out of scope until a later catalog decision.
- Marketplace popularity, price, availability, ratings, reviews, and delivery details are time-sensitive and are not permanent product facts.

## Cream evidence status

- Wildberries and Ozon product identities and pairings were rechecked on 2026-08-23.
- The owner-selected current gallery photographs show Ultra Lift as `e100g` and ReneWal as `e50g`. The product owner confirmed that 100 г and 50 г supersede the earlier marketplace volume fields of 100 ml and 50 ml for site copy.
- Local images use Wildberries gallery image 11 for Ultra Lift and image 12 for ReneWal. Both are 900 × 1200 WebP files without a separate promotional overlay.
- ReneWal's selected package photograph includes the small printed phrase `Concentrated anti-wrinkle cream with a Botox effect`. It is documentary package artwork only and is not repeated in authored copy, alternative text, metadata, or structured data.
- The product owner approved the recorded application and precaution wording separately for both creams on 2026-08-23.
- The canonical site compositions minimally normalize unambiguous marketplace spelling, capitalization, punctuation, and delimiters. The ambiguous ReneWal fragment `Olea Prunus Amygdalus Dulcis` remains unchanged.
- The complete local Phase 02 release candidate passed validation on 2026-08-23. This does not claim that the creams are deployed on Skinetics production.

## Source precedence

When sources disagree, use this order and record the conflict:

1. approved current packaging and labeling;
2. manufacturer product documents and declarations;
3. written product-owner confirmation;
4. current marketplace card or seller record;
5. legacy site copy.

A later higher-precedence conflict must be reviewed and must supersede the affected site field before deployment or continued use.
