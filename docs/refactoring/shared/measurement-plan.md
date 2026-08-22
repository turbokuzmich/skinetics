# Measurement plan

Last reviewed: 2026-08-22

Status: Accepted for Phase 01

## Primary outcome

Qualified outbound marketplace clicks from Skinetics, segmented by product, marketplace, placement, landing page, and acquisition source.

## Current state

- Yandex Metrica and Mail.ru goals exist for forms and Wildberries clicks.
- The current `go_wb` goal does not distinguish product, page placement, or campaign context.
- Ozon-specific outbound measurement is not implemented.
- Google Analytics is installed, but its current event coverage and data quality require verification.
- Skinetics has no meaningful historical site traffic or conversion data as of 2026-08-22.
- A sanitized 90-day Wildberries marketplace baseline exists for the five priority products; Ozon history is too recent for comparison.

## Event contract

The canonical semantic event is `marketplace_click`. It carries the required dimensions below and contains no personal data.

Analytics adapters must preserve historical interpretability:

- continue sending the existing `go_wb` goal for Wildberries clicks;
- add an Ozon-specific goal when Ozon buttons are implemented;
- send the canonical event and dimensions to platforms that support event parameters;
- document any platform-specific goal name beside the canonical event.

## Required event dimensions

| Dimension | Example |
|---|---|
| `product_id` | `climbazole` |
| `brand_id` | `dr-health` |
| `marketplace` | `wildberries` or `ozon` |
| `placement` | `catalog-card`, `product-hero`, `sticky-mobile` |
| `page_path` | `/catalog/climbazole` |
| `campaign` | normalized UTM campaign when available |

All dimensions except `campaign` are required for a rendered marketplace action. `campaign` is optional when no UTM campaign is present.

## Baseline metrics

Phase 00 must record:

- organic impressions, clicks, CTR, and average position by query and URL;
- sessions and engaged visits by source and landing page;
- form submissions by form and page;
- current outbound marketplace clicks;
- product-level marketplace sales or orders where platform reporting permits safe attribution;
- data gaps and known tracking defects.

## Guardrails

- Do not include personal data in analytics event payloads.
- Do not claim marketplace sales attribution unless the platform evidence supports it.
- Keep historical event names documented when replacing them so reports remain interpretable.

## Baseline limitations

- No historical SEO or site-conversion benchmark is available; future measurement starts from launch.
- Existing goal invocation is present in code, but dashboard receipt cannot be empirically established from a no-traffic period.
- Marketplace demand must not be represented as traffic attributed to Skinetics.
