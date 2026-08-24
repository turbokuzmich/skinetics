# Phase 04 release and rollback notes

Status: Local release candidate validated; production deployment not executed

## Coordinated release contents

- shared tokens, fonts, theme, focus and reduced-motion behavior;
- semantic site shell with desktop/mobile navigation and grouped footer;
- redesigned homepage, catalog/category listings, and five product pages;
- verified 900×1200 serum WebP presentation images with provenance;
- updated About, Contacts, doctor form, feedback form, and defensive mail APIs;
- preserved route, metadata, canonical, sitemap, breadcrumb, and marketplace-event contracts;
- documented but unpublished future brand, concern, ingredient, and expert templates;
- repeatable rendered-site validation via `npm run validate:phase04`.

All four files under `public/video/` remain in the release source. The homepage does not request or reference them.

## Required production environment

Supply these only at runtime on the Ubuntu VM:

```text
EMAIL_USER
EMAIL_PASS
EMAIL_SENDER
```

Do not place credentials in the archive or repository. Production uses Node.js 24 on `linux/amd64`; `sharp` is a production dependency required by the standalone image optimizer.

## Authorized release procedure

Production publication requires a separate explicit owner authorization. After authorization:

1. Run `./build.sh` with Docker Desktop available. This creates the Linux/amd64 `skinetics-release.tar.gz`; do not deploy a macOS `.next` directory.
2. Inspect the archive for `server.js`, `.next`, `node_modules`, `public`, and the absence of `.env*` or local credentials.
3. Upload and extract only the release archive on the VM, preserving the previous application artifact for rollback.
4. Start `node server.js` with the three mail environment variables and the existing reverse-proxy configuration.
5. Smoke-test `/`, `/catalog`, `/serum`, `/cream`, all five product pages, `/about`, `/contacts`, `/ingredients`, and `/sitemap.xml`.
6. Confirm `/ingredients` is `noindex, follow` and `/brands`, `/concerns`, and `/expert` are 404.
7. Submit both forms once using controlled test details and confirm delivery, success state, and one form goal each.
8. Test one Wildberries-only serum plus one Wildberries/Ozon cream from a catalog card and product hero. Confirm destination, UTM/campaign behavior, and `marketplace_click` fields.
9. Confirm optimized `/_next/image` responses succeed in the standalone runtime and watch logs for image, mail, route, or analytics errors.

`./build.sh`, upload, extraction, process restart, and production smoke tests were not executed during local Phase 04 validation.

## Rollback

If route, rendering, mail, image, or analytics smoke tests fail:

1. Stop the new Node process.
2. Restore the previously retained application artifact and its unchanged runtime environment.
3. Start its `server.js` and repeat the homepage, product, form, and marketplace smoke tests.
4. Retain the failed artifact and sanitized logs for diagnosis; do not reuse it until corrected and rebuilt.

Rollback changes only the application artifact. Phase 04 adds no database migration, public URL migration, redirect requirement, or content backfill.
