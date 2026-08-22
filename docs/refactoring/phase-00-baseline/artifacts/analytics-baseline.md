# Site analytics baseline

- **Reviewed:** 2026-08-22
- **Time zone:** Europe/Moscow
- **Owner statement:** Skinetics has no meaningful site traffic yet.

## Installed measurement

| Platform | Identifier | Current implementation |
|---|---|---|
| Yandex Metrica | `98874723` | Global installation; generic `form` and `go_wb` goals invoked from client helpers |
| Mail.ru | `3589962` | Global installation; generic `form` and `go_wb` goals invoked from the same helper |
| Google Analytics 4 | `G-6JC9JR7TQ0` | Global installation; product-level marketplace event coverage not present |

## Baseline result

- No meaningful sessions, search traffic, landing-page conversions, form conversions, or outbound-click history is available for a numerical site baseline.
- Yandex Webmaster and Google Search Console exports are unavailable because there is no meaningful search history.
- Existing form and Wildberries goal invocation paths are present in the repository. Receipt in analytics dashboards cannot be empirically validated from a no-traffic period.
- The existing `go_wb` goal lacks product, brand, placement, marketplace, and page context.
- Ozon outbound tracking is not implemented.

## Phase 01 contract

Use the canonical `marketplace_click` semantic event with:

- `product_id`;
- `brand_id`;
- `marketplace`;
- `placement`;
- `page_path`;
- optional `campaign`.

Preserve `go_wb` delivery for historical compatibility. Do not include personal data.
