# URL inventory

Last reviewed: 2026-08-22

This inventory combines the repository and the locally rendered application reviewed on 2026-08-22. There is no meaningful search-performance or backlink history to justify URL changes.

| URL | Rendered state | Canonical/indexability | Current purpose | Final Phase 00 action |
|---|---|---|---|---|
| `/` | Rendered with one H1 | Canonical `https://skinetics.ru`; indexable | Homepage and product overview | Preserve |
| `/catalog` | Rendered with one H1 | Self-canonical; indexable | General catalog | Preserve |
| `/serum` | Rendered with one H1 | Self-canonical; indexable | Navigation-facing serum listing | Preserve |
| `/catalog/red_pepper` | Rendered with one H1 | Self-canonical; indexable | Dr. Health red pepper serum | Preserve exact URL |
| `/catalog/copper_tripeptide` | Rendered with one H1 | Self-canonical; indexable | Dr. Health copper tripeptide serum | Preserve exact URL |
| `/catalog/climbazole` | Rendered with one H1 | Self-canonical; indexable | Dr. Health climbazole serum | Preserve exact URL |
| `/about` | Rendered with one H1 | Self-canonical; indexable | Brand/company and legal details | Preserve and strengthen |
| `/contacts` | Rendered with one H1 | Self-canonical; indexable | Contact details and feedback form | Preserve |
| `/ingredients` | Rendered placeholder; no H1 | `noindex, follow`; no canonical | Unfinished ingredient route | Keep `noindex, follow` until useful reviewed content exists |

The repository sitemap includes the five indexable static routes and all three current product URLs. `public/robots.txt` allows crawling and points to the sitemap. The public deployment exposes older product copy than the local application; this is deployment drift and does not change the URL decisions.

## Rules

- Do not remove or rename an established URL without performance evidence and an explicit migration decision.
- Every changed URL requires a redirect target, canonical review, sitemap update, and internal-link update.
- New product slugs should be human-readable, stable, lowercase, and use hyphens unless preserving an existing identifier.

These rules were accepted in [decision 0005](../decisions/0005-url-preservation-policy.md).
