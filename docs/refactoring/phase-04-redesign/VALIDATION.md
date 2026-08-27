# Phase 04 validation

Status: Deployed; production receipt verification pending

Validation date: 2026-08-24

Environment: macOS, Node.js 24.7.0, Next.js 14.2.35, Lighthouse 13.4.1, Headless Chrome 151

Reviewed by: Codex local implementation validation

Recorded Phase 04 release head: `ea92ab1` (including post-validation commits `034cc8e` and `ea92ab1`).

## Automated checks

- [x] `npm test` — 13 files and 52 tests passed.
- [x] `npm run lint` — passed with the pre-existing `app/_components/reports.tsx` `<img>` warning only.
- [x] `npm run build` — passed; 21 static pages were generated and all five product routes remained SSG routes.
- [x] `git diff --check` — passed.
- [x] `npm run validate:phase04` against the production server — 12 current routes passed and `/brands`, `/concerns`, and `/expert` returned 404.

## Rendered routes and SEO

The rendered validator checked `/`, `/catalog`, `/serum`, `/cream`, all five `/catalog/[id]` routes, `/about`, `/contacts`, and `/ingredients`. Each returned 200 with exactly one `h1`, one `main`, one `header`, and one `footer`.

- [x] The homepage contains all five canonical product links and no video or carousel reference.
- [x] Product pages retain their category breadcrumb, accepted marketplace link, and `BreadcrumbList` JSON-LD.
- [x] `/ingredients` remains `noindex, follow`, has an H1, is absent from the sitemap and navigation, and is not presented as a published discovery hub.
- [x] `/brands`, `/concerns`, and `/expert` remain unpublished 404 routes.
- [x] Existing URLs, canonicals, metadata, sitemap membership, and route set were preserved.

## Responsive and accessibility review

The local production build was reviewed at 390×844, 768×1024, 1280×900, and 1440×900 for the homepage, catalog listing, a serum product, a cream product, About, Contacts, the doctor form, and the feedback form. The 24 measured rows are recorded in [responsive-matrix.md](./artifacts/responsive-matrix.md); the doctor form is embedded in every row and the feedback form is embedded in each Contacts row.

The still-live pre-redesign homepage was captured at 390 and 1440 px. All 24 final local route cases plus dedicated doctor/feedback form views at every width were captured and linked from the [browser capture index](./artifacts/captures/README.md). No production mutation was performed.

- [x] All 24 route/viewport combinations had zero horizontal overflow and one H1/main/header/footer.
- [x] All 24 final route captures, eight dedicated form captures, and two production baseline captures are retained as Phase 04 artifacts.
- [x] Interactive controls measured at least 44×44 px, including the header/footer wordmarks and short footer links.
- [x] Mobile navigation has a named dialog, focus trap, Escape close, close/link actions, and trigger focus restoration; focused tests pass.
- [x] Keyboard order, visible focus treatment, heading order, landmarks, labels, image alternatives, and long product names remained usable.
- [x] Design-token contrast tests meet the accepted AA target; Lighthouse accessibility scored 100 on mobile and desktop.
- [x] The global reduced-motion rule disables non-essential transitions and scrolling behavior when requested.

## Forms and analytics

Focused tests use local stubs and prove:

- [x] Invalid input produces field-linked errors without a request.
- [x] API failure preserves values, announces an alert, and emits no form goal.
- [x] API success announces status and emits one form goal; an analytics exception does not turn delivery into a failure or duplicate the request.
- [x] Both APIs return generic errors, reject malformed JSON, and send user values only as plain text.
- [x] Marketplace actions preserve product, brand, marketplace, placement, page path, and campaign data for catalog cards and product heroes.
- [x] One-marketplace serum and two-marketplace cream actions remain usable; navigation survives analytics exceptions.
- [x] Analytics queues exist before interaction; external GA, Yandex Metrica, and Mail.ru scripts load on the first pointer/keyboard interaction or a five-second fallback, whichever comes first.
- [x] Queue-state tests prove one route-owned Mail.ru pageview, interaction-triggered loader creation, and duplicate-loader prevention.
- [x] In the local production browser, the first mobile menu interaction created the `google-analytics`, `yandex-metrica`, and `tmr-code` script elements before the fallback.

## Performance and media

- [x] Mobile Lighthouse: performance 94, accessibility 100, LCP 3.16 s, CLS 0, TBT 4 ms.
- [x] Desktop Lighthouse: performance 100, accessibility 100, LCP 0.74 s, CLS 0, TBT 0 ms.
- [x] The four files under `public/video/` still exist and have no Phase 04 diff from `6a80ecc`.
- [x] The three accepted serum sources are 900×1200 WebP files with source URLs and SHA-256 hashes recorded in the provenance artifact.
- [x] The homepage and rendered runtime contain no video/carousel request or reference.

Detailed numbers are recorded in [performance-summary.md](./artifacts/performance-summary.md). Responsive measurements are recorded in [responsive-matrix.md](./artifacts/responsive-matrix.md). Release boundaries are recorded in [release-and-rollback-notes.md](./artifacts/release-and-rollback-notes.md).

## Exit approval

- **Result:** PASS — local implementation is a validated release candidate.
- **Deployment:** Release head `ea92ab1` was deployed on 2026-08-24.
- **Open follow-up:** Controlled successful form submissions, mail delivery, analytics-dashboard receipt, and server-log review remain to be confirmed. Official identity and documentary assets remain a non-blocking future backlog.

## Production smoke check — 2026-08-24

- [x] `/`, `/catalog`, `/serum`, `/cream`, all five product pages, `/about`, `/contacts`, `/ingredients`, and `/sitemap.xml` returned HTTP 200.
- [x] `/brands`, `/concerns`, and `/expert` returned HTTP 404.
- [x] Current pages retained one H1/main, expected titles and canonicals, and product pages retained `BreadcrumbList` JSON-LD.
- [x] `/ingredients` retained `noindex, follow` and remained absent from the sitemap; the sitemap included the intended static and five product URLs.
- [x] Representative serum and cream `/_next/image` responses rendered successfully with non-zero intrinsic dimensions.
- [x] Empty feedback and doctor submissions remained on `/contacts` and exposed field-linked invalid states without a success state.
- [x] A Wildberries-only serum exposed the expected Wildberries destination; a two-marketplace cream exposed the expected Wildberries and Ozon destinations with safe new-tab attributes.
- [x] GA, Yandex Metrica, and Mail.ru production script elements appeared after the deferred-load fallback.
- [ ] Submit both forms with controlled test details and confirm delivery, success state, and one goal each.
- [ ] Confirm production `marketplace_click` receipt and required dimensions in the analytics dashboards.
- [ ] Review server logs for image, mail, route, and analytics errors after the initial live period.
