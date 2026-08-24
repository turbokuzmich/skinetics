# Phase 04 validation

Status: Implementation validated; deployment pending

Validation date: 2026-08-24

Environment: macOS, Node.js 24.7.0, Next.js 14.2.35, Lighthouse 13.4.1, Headless Chrome 151

Reviewed by: Codex local implementation validation

## Automated checks

- [x] `npm test` — 11 files and 45 tests passed.
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

The local production build was reviewed at 390×844, 768×1024, 1280×900, and 1440×900 for the homepage, catalog listing, a serum product, a cream product, About, Contacts, the doctor form, and the feedback form.

- [x] All 24 route/viewport combinations had zero horizontal overflow and one H1/main/header/footer.
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
- [x] Analytics queues exist before interaction, while external GA, Yandex Metrica, and Mail.ru scripts load after the initial render.

## Performance and media

- [x] Mobile Lighthouse: performance 92, accessibility 100, LCP 3.33 s, CLS 0, TBT 12 ms.
- [x] Desktop Lighthouse: performance 100, accessibility 100, LCP 0.74 s, CLS 0, TBT 0 ms.
- [x] The four files under `public/video/` still exist and have no Phase 04 diff from `6a80ecc`.
- [x] The three accepted serum sources are 900×1200 WebP files with source URLs and SHA-256 hashes recorded in the provenance artifact.
- [x] The homepage and rendered runtime contain no video/carousel request or reference.

Detailed numbers are recorded in [performance-summary.md](./artifacts/performance-summary.md). Release boundaries are recorded in [release-and-rollback-notes.md](./artifacts/release-and-rollback-notes.md).

## Exit approval

- **Result:** PASS — local implementation is a validated release candidate.
- **Deployment:** Not executed. Building the Linux artifact and publishing it require separate explicit authorization.
- **Open blockers:** None for local Phase 04 validation. Official identity and documentary assets remain a non-blocking future backlog.
