# Repository Guidelines

## Business and Brand Context

Skinetics.ru is the Russian-language umbrella catalog and product site for cosmetics operated by the Russian legal entity ООО «Демидов Люкс СПА». Keep the entities distinct in copy and code: **Skinetics** is the umbrella/site identity and is not a product brand; **Dr. Health**, **SkineticsLab**, and **Neon Beard** are the three customer-facing product brands; and **ООО «Демидов Люкс СПА»** is the company named in the legal details. Every catalog product belongs to exactly one customer-facing brand. The company presents itself as a member of the Moscow Innovation Cluster, an entry in the Moscow Exporter catalog, and a participant in the «Сделано в Москве» city-brand program.

The initial refactoring scope contains five cosmetics. The current public site exposes three 100 ml leave-in Dr. Health serums:

- a hair-loss and hair-growth care serum spray with red pepper and niacinamide;
- a hair-loss and hair-growth care serum with copper tripeptide GHK-Cu;
- a scalp serum for dandruff- and seborrhea-prone skin with climbazole and piroctone olamine.

The locally validated catalog release candidate also includes two face creams: **SkineticsLab ReneWal**, 50 g, and **Neon Beard Ultra Lift**, 100 g. Production deployment remains pending. ReneWal is a product name, not a brand. Treat the accepted records in `docs/refactoring/shared/product-source-of-truth.md` as the refactoring source of truth.

Treat the products as cosmetics and scalp, hair, or facial-care products, not medicines. Product copy should describe cosmetic use, ingredients, application, precautions, and realistic expectations. Do not introduce unsupported medical, therapeutic, absolute-safety, or guaranteed-effect claims. When claims, declarations, or labeling matter, the manufacturer documents, packaging, and current marketplace card are the authority.

## Site Role, Market, and Customer Journey

The site is not a direct-checkout online store. It is an expert multi-brand product catalog and acquisition site for Russian-speaking customers: it explains products and active ingredients, helps visitors choose a suitable cosmetic, and sends purchase-ready users to an available product page on **Wildberries** or **Ozon**. Do not imply that checkout, payment, delivery, or order management happens on Skinetics unless that business model is explicitly changed.

The primary conversion path is:

```text
search or direct visit -> Skinetics product/catalog content -> marketplace action -> Wildberries or Ozon
```

The main content relationship is `customer concern -> active ingredient -> product brand and product -> available marketplace`. Current concerns include hair shedding/growth care, dandruff/seborrhea-prone scalp care, and facial care; featured actives include red pepper, niacinamide, copper tripeptide GHK-Cu, climbazole, piroctone olamine, and peptides.

Skinetics also supports lead generation. A site-wide form collects requests for a trichologist appointment, and the contacts page collects general feedback. The corresponding API routes validate submissions with Zod and send them to `info@skinetics.ru` through the configured mail transport. Yandex Metrica and Mail.ru goals track form submissions and Wildberries outbound clicks; Google Analytics is also installed.

## Current Content and Route Model

- `/` presents neutral Skinetics multi-brand positioning, all five product cards, company advantages, marketplace calls to action, and the trichologist form.
- `/serum` is the navigation-facing serum listing; `/cream` is the navigation-facing face-cream listing; `/catalog` exposes the broader catalog listing.
- `/catalog/red_pepper`, `/catalog/copper_tripeptide`, `/catalog/climbazole`, `/catalog/ultra-lift`, and `/catalog/renewal` are the implemented product pages. Each page contains a product image, quantity, marketplace links, purpose and application text, precautions, and full composition. The cream pages also include suitable-use and FAQ content.
- `/about` explains the brand/site role, links to the Dr. Health Wildberries brand page, and publishes the legal details of ООО «Демидов Люкс СПА».
- `/contacts` publishes Russian phone contacts and `info@skinetics.ru`, and contains the feedback form.
- `/ingredients` is currently a placeholder excluded from indexing and is not linked from the main navigation.

`constants.ts` is the source of truth for the currently implemented product IDs, names, compositions, volumes, product metadata, images, Wildberries URLs, ingredient data, and navigation entries. Long-form product copy lives beside the dynamic product route in `app/catalog/[id]/_descriptions/`. During the refactor, keep those implementation sources aligned with the accepted records in `docs/refactoring/shared/` and the decisions in `docs/refactoring/decisions/`.

## Current SEO Implementation

SEO is implemented through Next.js metadata and indexable page copy rather than through a separate SEO layer. The root layout sets `https://skinetics.ru` as `metadataBase`; the home, catalog, serum, cream, about, and contacts routes define their own Russian `title`, `description`, and canonical URL. Product titles and descriptions live with each item in `constants.ts` and are returned by `generateMetadata()` for `/catalog/[id]`.

Indexable pages render a descriptive `h1` and supporting Russian text. Product pages add structured sections for purpose, active components, use, precautions, and full composition; cream pages also render semantic FAQ content. Product pages emit category-aware `BreadcrumbList` JSON-LD but no `Product`, `Offer`, review, rating, or `FAQPage` markup. `app/sitemap.ts` lists the main static routes and every published product URL, while the unfinished `/ingredients` route sets `noindex, follow`. Existing product URL IDs are part of the site's accumulated search footprint; review `docs/skinetics-seo-context.md` before changing SEO copy, indexability, canonical URLs, sitemap membership, or route paths.

## Project Structure & Module Organization

This is a Next.js 14 App Router site for the Skinetics multi-brand catalog. Routes and page layouts live in `app/`: page-specific components may sit beside their route (for example, `app/contacts/_components/`), while reusable UI belongs in `app/_components/`. API handlers are in `app/api/<name>/route.ts`. Put shared validation schemas and form DTOs in `lib/dto/`, analytics helpers in `lib/`, and cross-page constants/types in `constants.ts` and `types.ts`. Static images, SEO files, and web-manifest assets belong in `public/`. See `docs/skinetics-seo-context.md` before making SEO-content changes.

## Build, Test, and Development Commands

- `npm install` installs the locked dependencies from `package-lock.json`.
- `npm run dev` runs the development server at `http://localhost:3000`.
- `npm run lint` runs Next.js linting; use it before submitting changes.
- `npm run build` creates the production build and catches type, route, and rendering failures.
- `npm run start` serves a completed production build locally.
- `./build.sh` creates `skinetics-release.tar.gz`, the production artifact for the Ubuntu VM. It requires Docker Desktop and uses Buildx to install and build dependencies inside a `linux/amd64`, Node 24 container. Do not deploy a `.next` directory built directly on macOS.

## Production Build and Deployment

`next.config.mjs` uses standalone output. `Dockerfile.build` produces the minimal runtime artifact, and `.dockerignore` must continue to exclude Mac `node_modules`, `.next`, generated release files, and `.env*` files from the build context. The build script clears only the local `release/` directory and prior `skinetics-release.tar.gz`, verifies `server.js`, `.next`, `node_modules`, and `public`, then creates the archive.

The Ubuntu VM runs Node.js 24 on `linux/amd64`; keep the Docker base image on the same Node major version. Upload and extract only `skinetics-release.tar.gz`, then launch the standalone server with `node server.js` behind the reverse proxy. Supply `EMAIL_USER`, `EMAIL_PASS`, and `EMAIL_SENDER` on the VM at runtime—never bake secrets into the Docker image or release archive.

## Coding Style & Naming Conventions

Write TypeScript with `strict` compiler settings. Follow the surrounding code: two-space indentation, semicolons, double-quoted imports/strings, and trailing commas only where the existing formatter produces them. Use PascalCase for React components and their default-export file names where established (for example, `DoctorForm` in `form.tsx`); use camelCase for functions, variables, schemas, and DTO fields. Prefer the `@/` import alias for shared modules. Mark browser-interactive components with `"use client"`; keep server-only code and credentials inside route handlers.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. At minimum, run `npm run lint` and `npm run build`, then manually exercise affected routes and form/API flows. For validation changes, cover both accepted and rejected input; keep Zod schemas in `lib/dto/` aligned with their client forms and API handlers. Add focused tests alongside new test infrastructure rather than committing unverified behavior.

## Commit & Pull Request Guidelines

Recent history uses short, imperative subjects such as `security patch`, `Update requisites`, and `seo fixes`; keep the subject concise and scoped to one change. In pull requests, describe the user-facing effect, list validation performed, link the relevant issue when available, and include screenshots for visual changes. Call out SEO, analytics, sitemap, and environment-variable changes explicitly. Never commit `.env*.local`, production credentials, or mail settings; the feedback APIs require `EMAIL_USER`, `EMAIL_PASS`, and `EMAIL_SENDER` at runtime.
