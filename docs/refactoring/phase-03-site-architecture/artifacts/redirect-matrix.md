# Redirect matrix

- **Reviewed:** 2026-08-23
- **Outcome:** every current canonical URL is preserved; Phase 03 requires no redirect

| Current URL | Current/local state | Decision | Target | Status code | Canonical action | Sitemap action | Internal-link action | Evidence |
|---|---|---|---|---:|---|---|---|---|
| `/` | Existing; five-product local release candidate | Preserve | — | 200 | Retain self-canonical | Retain | Retain direct links | Current route inventory and approved design |
| `/catalog` | Existing; five-product local release candidate | Preserve | — | 200 | Retain self-canonical | Retain | Retain direct links | Current route inventory and approved design |
| `/serum` | Existing | Preserve | — | 200 | Retain self-canonical | Retain | Retain direct links | Existing search footprint and decision 0005 |
| `/cream` | Locally validated; deployment pending | Preserve | — | 200 | Retain self-canonical after deployment | Retain in local release-candidate sitemap | Retain direct links | Phase 02 validation and site tree |
| `/catalog/red_pepper` | Existing | Preserve | — | 200 | Retain self-canonical | Retain | Retain direct links | Established underscore URL and decision 0005 |
| `/catalog/copper_tripeptide` | Existing with known public search footprint | Preserve | — | 200 | Retain self-canonical | Retain | Retain direct links | URL inventory and decision 0005 |
| `/catalog/climbazole` | Existing | Preserve | — | 200 | Retain self-canonical | Retain | Retain direct links | URL inventory and decision 0005 |
| `/catalog/ultra-lift` | Locally validated; deployment pending | Preserve | — | 200 | Retain self-canonical after deployment | Retain in local release-candidate sitemap | Retain direct links | Phase 02 validation and site tree |
| `/catalog/renewal` | Locally validated; deployment pending | Preserve | — | 200 | Retain self-canonical after deployment | Retain in local release-candidate sitemap | Retain direct links | Phase 02 validation and site tree |
| `/about` | Existing | Preserve | — | 200 | Retain self-canonical | Retain | Retain direct links | Current route inventory; strengthen content only |
| `/contacts` | Existing | Preserve | — | 200 | Retain self-canonical | Retain | Retain direct links | Current route inventory |
| `/ingredients` | Existing thin placeholder | Preserve | — | 200 | Retain current `noindex, follow`; do not add canonical until publication decision | Keep out | Keep out of primary navigation; no indexable inbound requirement while unfinished | Decision 0005 and publication gate |

## Future migration rules

- A changed route receives one final server-side 301 target.
- Use no chains and no loops.
- Use no blanket catalog redirects and no unrelated targets.
- Do not redirect a removed product to a category or homepage merely to avoid a removal response.
- Review the destination canonical, source and destination sitemap state, visible and JSON-LD breadcrumbs, and every internal link before release.
- Update internal links to the final canonical target so crawlers and visitors do not traverse a redirect hop.
- Record search, backlink, product, and business evidence for any future `Preserve`, `Redirect`, or removal decision.
