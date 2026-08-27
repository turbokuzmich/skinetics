# Customer-facing copy refresh

Date: 2026-08-26
Status: Implemented and validated locally; not deployed

## Approved scope

The owner approved the recommendations from the customer-perspective copy review, excluding changes that require additional confirmation. This is an editorial follow-up during Phase 02 monitoring, not the start of Phase 05.

- Replace catalog-navigation instructions on the homepage and listings with concrete descriptions of the available care products.
- Preserve H1s and canonical product names; show the existing product summary beneath each product-page title to distinguish the two similarly named serums.
- Differentiate cream summaries using their already recorded ingredients; shorten cream introductions and active-component explanations without adding stronger benefit claims.
- Remove internal approval/source-process wording from cream FAQs and replace the ReneWal brand-identity question with the already verified eye-area restriction.
- Remove redundant cosmetic disclaimers from the cream suitable-use paragraph. Preserve application instructions, precautions, and the existing expectations answers, including Ultra Lift's injection clarification.
- Replace internal brand-architecture and evidence-policy language on the homepage and About page with a direct company introduction and factual program participation heading.
- Clarify that the consultation form sends a request, not a confirmed appointment; do not add a callback deadline, price, format, or specialist claim.
- Improve Contacts prompts, mark the optional phone field explicitly, clarify feedback validation and failure messages, and preserve submission/analytics behavior.

## Unchanged contracts

URLs, page metadata, H1s, canonicals, sitemap, robots rules, breadcrumbs, navigation destinations, product identities, quantities, images, compositions, marketplace links, application instructions, precautions, analytics event contracts, and API validation rules remain unchanged. Only the wording of the existing feedback message-length error changed; its ten-character minimum is preserved.

All three serum data records are entirely unchanged. Rendering their existing summary in the product hero does not resolve the red-pepper ingredient naming discrepancy below.

## Deferred pending confirmation

1. **Serum application details (review item 8):** exact frequency, dose, course length, and clarification of the copper serum's scalp versus hair-length use. No instructions or existing course wording changed.
2. **Red-pepper ingredient identity:** reconcile `никотиновая кислота` in the summary/overview/metadata/image alternative with `ниацинамид` in the composition against current packaging. No ingredient substitution was made.
3. **Product suitability and differentiation:** texture, skin-type preference, relative strength/gentleness, men's-only positioning, and ingredient-role claims not already supported by accepted records.
4. **Consultation details:** specialist identity, format, location, price, callback process, and response deadlines.
5. **Company evidence:** development/manufacturing story, quality checks, and authoritative public evidence links. Existing participation statements are preserved without being presented as product-efficacy evidence.
6. **Product renaming and SEO expansion:** no title/metadata changes or new comparison/concern/ingredient pages.

## Validation

- `npm test`: 60 tests passed across 13 files. Added coverage for all five product summaries, feedback minimum-length rejection/acceptance without a phone, and feedback failure guidance. Existing form retry, pending, success, analytics-failure, marketplace-event, navigation, and trust-page checks pass with updated labels.
- `npm run lint`: passed with the existing `@next/next/no-img-element` warning in untouched `app/_components/reports.tsx`.
- `npm run build`: passed, 21 pages generated. Run from an isolated temporary source copy with the installed dependencies linked in, leaving the owner's development server and `.next` untouched. The initial sandbox attempt could not fetch Google Fonts; the authorized network-enabled retry succeeded. This macOS validation build is not a deployment artifact.
- `npm run validate:phase04`: passed against the existing local server for 12 current routes and 3 gated routes, including breadcrumbs, analytics bootstrap, sitemap, and indexability checks.
- Compared current product records to `HEAD`: all five identities, metadata, marketplaces, images, quantities, compositions, application instructions, and precautions unchanged; all three serum records entirely unchanged.
- Browser: inspected homepage at the default desktop viewport (1148px), and homepage, ReneWal hero, cream listing, About, and Contacts/forms at 390px. Checked copy, wrapping, product summary position, and horizontal overflow. Empty-form validation was exercised without sending mail; success/failure paths were checked with mocked transport in the test suite.
- `git diff --check`: passed.

## Release and monitoring

No production deployment, phase closure, or tracking change occurred. The recorded 2026-08-24 through 2026-09-07 operational monitoring window remains unchanged. On a separately authorized production release, record the actual copy deployment date and affected pages and distinguish pre-/post-update observations. Do not attribute conversion changes to the copy without sufficient evidence.

Existing staged refactoring records and unrelated untracked files were preserved. The refactoring log includes a separate local-only entry for this update.
