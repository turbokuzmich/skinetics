# Phase 00 inputs

Status reviewed: 2026-08-22

## Required product materials

- current front, back, and side packaging photographs for five priority products;
- approved product names, brands, volumes, barcodes, and SKUs;
- full INCI/composition;
- application instructions and precautions;
- manufacturer documents, declarations, certificates, and substantiation where claims rely on them;
- approved logos and brand rules;
- current Wildberries and Ozon product-card URLs.

Available evidence and remaining gaps are indexed in [product-evidence-index.md](./artifacts/product-evidence-index.md). Official logo files, brand guidelines, and authoritative cream application/precaution wording are not yet available.

## Required search data

- Yandex Webmaster export by URL and query for 12–16 months;
- Google Search Console export by URL and query for 12–16 months;
- indexation and sitemap reports;
- backlink data if available;
- any previous keyword research or SEO reports.

No meaningful search history or previous SEO report is available. The absence is recorded as the Phase 00 baseline.

Minimum query/URL export fields:

```text
URL
query
impressions
clicks
CTR
average position
date range
```

## Required analytics data

- Yandex Metrica traffic and goal reports;
- Mail.ru goal configuration or reports;
- Google Analytics acquisition, landing-page, and event reports;
- definitions of currently configured goals;
- known campaign naming and UTM conventions.

No meaningful site-traffic history is available. Installed IDs, current code paths, and measurement gaps are recorded in [analytics-baseline.md](./artifacts/analytics-baseline.md).

## Required marketplace data

- product-level orders or sales over an agreed comparable period;
- external-traffic or campaign reports where available;
- current product-card status and canonical brand assignment;
- evidence for the claim that the two creams are priority products.

The sanitized 90-day Wildberries funnel is recorded in [marketplace-baseline.md](./artifacts/marketplace-baseline.md). The two creams account for 71.9% of seller-account revenue share over the reviewed period. Ozon history is too recent for comparison.

## Data-handling note

Raw private exports should remain outside Git. Record a sanitized summary in `artifacts/` and note the private source location, owner, date range, and access restrictions here without including credentials or customer-level data.

- **Private source location:** `~/Documents/vaults/personal/Business/Skinetics`
- **Owner/access:** Dmitry, business owner
- **Current contents:** no raw exports as of 2026-08-22
- **Time zone:** Europe/Moscow
