# Phase 04 redesign design

Date: 2026-08-23

Status: Approved for implementation planning

Owner: Dmitry, business owner

## Purpose

Create a distinctive, accessible, responsive Skinetics design system around the Phase 03 customer journey. The redesign must help Russian-speaking visitors understand the multi-brand catalog, compare suitable cosmetics, and continue to Wildberries or Ozon without implying that Skinetics provides checkout, payment, delivery, diagnosis, or treatment.

Skinetics remains the neutral umbrella catalog. Dr. Health, SkineticsLab, and Neon Beard remain the three customer-facing product brands. ООО «Демидов Люкс СПА» appears in company, legal, manufacturer, and evidenced trust contexts and is not presented as a consumer brand.

The redesign covers the existing homepage, catalog and category listings, product pages, about page, contacts page, shared navigation, footer, breadcrumbs, marketplace actions, and both forms. It also defines composition contracts for future brand, concern, ingredient, and expert-content templates without publishing gated routes.

## Accepted inputs and constraints

- Phase 03's evidence-gated site architecture, preserved URL map, navigation rules, internal-linking requirements, and page-class contracts are authoritative.
- All five accepted products and their claims-sensitive content remain governed by the product source of truth and claims policy.
- Product type remains the primary catalog taxonomy. Brand, concern, ingredient, and expert content remain secondary, evidence-gated discovery relationships.
- Existing routes, canonicals, sitemap behavior, breadcrumb hierarchy, product metadata, and analytics contracts must not change unintentionally.
- Skinetics is a discovery and acquisition site. Product pages remain the primary commercial destinations before marketplace exit.
- The official Skinetics logo is owner-approved and used in the site shell. Complete sub-brand logo packages and broader identity guidelines are not yet available, so product-brand text labels and provisional accents remain accepted.
- Initial trust content is limited to accepted company details, Moscow Innovation Cluster membership, Moscow Exporter catalog entry, «Сделано в Москве» participation, and approved product information.
- Files under `public/video/` remain in the repository. Phase 04 removes the homepage carousel and runtime video requests, not the video assets.
- The three serum presentation images will be refreshed from the final gallery slide of each current Wildberries product card after identity and packaging verification. Downloaded source files remain intact; delivery optimization must not overwrite or degrade them.
- Phase 02 deployment and the later Phase 04 production release remain separately authorized work.

## Experience principles

The accepted first-five-seconds impression is confident and well-guided: modern, evidence-conscious cosmetic care with warm expert guidance. The interface must not feel like a hospital, a fashion campaign, a generic marketplace, or a direct-checkout store.

The chosen visual direction is `Навигационная редакционность`:

1. reveal the page purpose and next action quickly;
2. use editorial hierarchy to make long Russian content easy to scan;
3. combine warm neutral surfaces with precise, restrained structure;
4. show product-brand differences as accents inside one Skinetics system;
5. prioritize useful product understanding before marketplace exit;
6. show trust through verifiable facts and documents, not generic claims;
7. keep decorative media subordinate to content, accessibility, and performance.

## Approaches considered

### Navigational editorial system — chosen

Warm neutral surfaces, an editorial heading face, a readable sans-serif body face, clear rectangular sections, restrained brand accents, and prominent journey cues. This balances distinctiveness, trust, and selection clarity without turning the site clinical or luxurious.

### Modern laboratory system — rejected

A cooler palette, strict modular grid, and technical treatment would support ingredient content but would make the umbrella catalog feel more clinical than the accepted experience.

### Warm product-object system — rejected

Softer shapes, natural colors, and tactile presentation would feel approachable but would weaken the hierarchy and make the three-brand catalog less systematic.

## Visual system

### Typography

- Use `Literata` for display headings and selected editorial emphasis.
- Use `Manrope` for body copy, navigation, controls, labels, tables, forms, and metadata.
- Both families support Cyrillic and load through `next/font/google`, avoiding runtime requests to Google.
- Use only the required weights: 400 and 500 for both families.
- Use a responsive `clamp()` display scale and stable rem-based body/control sizes.
- Reserve uppercase and tracking for short metadata; do not uppercase long headings or copy.

### Portfolio palette

The initial light interface uses these semantic roles:

| Role | Initial value | Use |
|---|---|---|
| Canvas | `#F5F1E8` | Warm page background |
| Surface | `#FBF8F0` | Cards, navigation, and raised content |
| Ink | `#17221E` | Primary text and high-emphasis actions |
| Muted ink | `#46534D` | Supporting copy and metadata |
| Border | `#D8D0C2` | Dividers and card boundaries |
| Clay | `#A5563B` | Editorial emphasis and selected highlights |
| Botanical | `#657A68` | Portfolio trust and supportive accents |
| Brand blue | `#004AAD` | Official logo accent and restrained link/navigation hover states |
| Focus | `#004AAD` | Keyboard focus indicator on light surfaces |

The official blue complements rather than replaces the warm editorial palette: clay remains the emphasis color, while blue is reserved for the logo and interaction feedback. Token roles are stable. Exact non-logo values may move during contrast validation without changing the approved direction. Phase 04 does not add dark mode.

### Product-brand accents

Layout, typography, spacing, interaction patterns, and hierarchy remain Skinetics-owned. Brand accents appear only in compact labels, thin borders, small illustration fields, and related-product cues:

- Dr. Health: provisional botanical green;
- SkineticsLab: provisional mineral blue;
- Neon Beard: provisional wine/clay.

Color never carries brand identity alone; every use includes the brand's text name. Official guidelines supersede provisional treatment after review without restructuring templates.

Wildberries and Ozon retain recognizable colors only on outbound marketplace actions. Marketplace colors do not become portfolio or product-brand colors.

### Geometry, spacing, and motion

- Use a 4 px base spacing unit and a restrained derived scale.
- Prefer rectangular sections, modest radii, thin borders, and minimal functional elevation.
- Maintain at least 44 by 44 CSS pixels for interactive targets.
- Motion is short and functional. `prefers-reduced-motion` removes smooth scrolling, autoplay, and nonessential transitions.
- The homepage has no autoplay video, carousel, or content hidden behind slides.

## Component architecture

Keep Material UI and Next.js App Router. Replace the inherited landing-page theme with a focused Skinetics theme rather than adding a CSS framework or component library.

Use small components with stable responsibilities:

- `SiteHeader`: server-visible identity and navigation, with one client-owned accessible mobile-menu boundary;
- `SiteFooter`: grouped published links, marketplace explanation, legal/company context, and trichologist lead section;
- `PageShell`: one `main` landmark, header clearance, width, and responsive padding;
- `SectionHeading`: eyebrow, semantic heading, supporting copy, and contextual action;
- `ProductCard`: image, text brand label, name, quantity, cosmetic summary, product action, and optional secondary marketplace actions;
- `MarketplaceActions`: ordered destinations and analytics context with redesigned presentation but unchanged event payload;
- `ProductHero`: canonical identity, source image, quantity, and primary marketplace actions;
- `TrustEvidence`: verified fact, source/context label, and optional approved visual asset;
- `ProductBreadcrumbs`: visible category hierarchy and matching `BreadcrumbList` JSON-LD;
- form field and status components: visible label, help, validation, pending, server-error, and success treatment;
- `ContextualLinks`: server-rendered links to published canonical destinations only.

Most components remain server components. Client boundaries are limited to the mobile menu, forms, analytics-enhanced marketplace links, and interactions that cannot use native HTML.

No public route, sitemap entry, canonical, or primary-navigation link is created for an unapproved brand, concern, ingredient, or expert destination. Phase 04 documents future composition contracts but does not create unused public route implementations.

## Page designs

### Homepage

Replace the video-first carousel with a lightweight server-rendered introduction containing:

1. Skinetics' multi-brand catalog role;
2. the browse, understand, and choose journey;
3. a primary catalog/product-discovery action;
4. both product categories and all five product cards;
5. a clear statement that purchase happens on Wildberries or Ozon;
6. currently verified portfolio trust facts;
7. the trichologist request path with non-diagnostic wording.

Primary conversion: product-page visit. Secondary conversion: valid trichologist-form submission. An immediate marketplace exit is not the dominant homepage action.

### Catalog and category listings

Listings expose one distinct H1 and introduction, category navigation, concise selection guidance, and cards organized by product type. Cards show brand, name, quantity, cosmetic purpose, product-page action, and available marketplaces.

The product-page action is visually primary. Marketplace actions are secondary exits and preserve `catalog-card` placement analytics. Filters do not create indexable URLs.

### Product pages

Desktop uses a two-column opening section; mobile uses one document flow. The semantic order is:

1. canonical breadcrumb;
2. brand label and H1;
3. product image, quantity, and primary marketplace actions;
4. purpose and suitable use when approved;
5. active components and features;
6. application and precautions;
7. full composition and reviewed FAQ;
8. category and other published contextual links.

The opening marketplace actions remain the primary conversion. Phase 04 does not add a sticky mobile purchase bar; that behavior is deferred to a measured Phase 05 experiment.

Product pages show no first-party price, stock, delivery, rating, review count, or guaranteed result.

### About

`/about` explains Skinetics' portfolio role, distinguishes the three brands, identifies ООО «Демидов Люкс СПА» correctly, shows only verified trust facts, presents legal details accessibly, and links onward to catalog and contacts. Official badges or documentary images remain absent until supplied and approved.

### Contacts and forms

`/contacts` retains the accepted Russian phone contacts, `info@skinetics.ru`, and feedback form. Both forms use persistent visible labels instead of placeholder-only identification.

Form behavior is explicit:

- client validation associates each message with its field;
- submission disables only the submit action and communicates pending state;
- an HTTP or network failure keeps entered values and shows an actionable form-level error;
- success replaces the form with an announced confirmation;
- analytics fires only after a successful response;
- errors never expose mail configuration, stack traces, or submitted personal data.

### Future gated templates

Brand, concern, ingredient, and expert templates reuse the Phase 04 primitives and the Phase 03 section requirements. Their contracts define hierarchy, evidence, contextual links, conversion, authorship/review metadata where required, and product relationships. A route remains absent until the Phase 03 nine-condition publication gate passes.

## Navigation and footer

The launch header uses the accepted order: `Каталог`, `Сыворотки`, `Кремы`, `О нас`, `Контакты`. Desktop and mobile expose the same labels and destinations.

The mobile menu is keyboard operable, has an accessible name, traps focus while open, closes with Escape, restores focus to its trigger, and prevents background interaction.

The footer groups only published destinations by purpose. It does not copy the header flatly and never exposes gated or `noindex` destinations. The trichologist form remains a separate lead section with realistic, non-diagnostic copy.

## Product image workflow

Replace the presentation image for each serum using the final gallery slide from its accepted Wildberries card: red pepper, copper tripeptide GHK-Cu, and climbazole/piroctone olamine.

For each source:

1. record marketplace URL and retrieval date;
2. verify product identity, packaging, and visible quantity against the source of truth;
3. preserve the downloaded source without destructive recompression;
4. update card and product-page references together;
5. deliver responsive optimized variants through `next/image` or an equivalent non-destructive pipeline;
6. retain accurate Russian alternative text based on product identity;
7. validate contain/crop behavior at every agreed responsive width.

The cream images remain the presentation reference for consistent grounding and shadow. Files in `public/video/` remain unchanged and unused by the redesigned homepage.

## Accessibility target

Target WCAG 2.2 Level AA. Validate:

- `header`, `nav`, one `main`, and `footer` landmarks;
- logical H1–H3 order;
- keyboard access and visible focus;
- text, control, focus, and state contrast;
- persistent form labels and announced errors;
- correct informative and decorative image alternatives;
- 44 by 44 CSS pixel targets where practical;
- no hover-only behavior;
- reduced motion and mobile-menu focus management;
- no horizontal overflow at 390, 768, 1280, or 1440 px.

## Performance and SEO budgets

- Mobile Lighthouse performance score: at least 90 on the agreed local production-build run.
- Mobile Lighthouse accessibility score: at least 90, supplemented by manual checks.
- The homepage requests no file under `public/video/`.
- Product media uses responsive dimensions and avoids serving original multi-megabyte PNGs when a smaller rendition satisfies rendered size.
- Fonts use `next/font` with only accepted families, subsets, and weights.
- Layout reserves media dimensions to prevent image-driven layout shifts.
- SEO-critical headings, copy, navigation, product links, breadcrumbs, and contextual links remain in server-rendered HTML.
- Client hydration is limited to the named interaction boundaries.

Record the command, route, viewport, and environment for performance runs so later evidence remains comparable.

## Analytics and external links

The `marketplace_click` contract remains unchanged, including product, brand, marketplace, placement, page path, and campaign context. Existing Yandex compatibility goals remain. Analytics failure never prevents marketplace navigation.

Form goals fire only after the API returns success. Marketplace URLs retain campaign propagation, use `noopener noreferrer`, and open only the accepted destination.

## Implementation and rollout

Implementation proceeds in five reviewable stages:

1. tokens, typography, image handling, page shell, landmarks, navigation, footer, breadcrumbs, form states, and shared primitives;
2. `/cream`, `/catalog/ultra-lift`, and `/catalog/renewal`;
3. homepage, `/catalog`, `/serum`, and the three serum pages with refreshed imagery;
4. `/about`, `/contacts`, both forms, and future-template composition contracts;
5. full regression validation, before/after evidence, release notes, and rollback preparation.

Implementation is incremental, but production publication is one coordinated release. No partial template deploys automatically. Phase 4 ends with a validated local release candidate and production deployment requires explicit authorization.

Rollback is one application release rollback. This design adds no database migration, URL migration, or content-data backfill.

## Validation

Automated and mechanical validation includes:

- `npm run lint` and `npm run build`;
- route status and rendered-HTML checks for every existing indexable route;
- canonical, sitemap, robots, metadata, breadcrumb HTML, and JSON-LD checks;
- marketplace destination and analytics payload checks;
- valid and invalid client/API form behavior;
- proof that the homepage requests no video resource;
- product-image identity and alternative-text comparison.

Manual validation includes:

- 390, 768, 1280, and 1440 px layouts;
- keyboard-only navigation and mobile-menu focus behavior;
- focus, contrast, reduced motion, and heading/landmark review;
- long names, missing optional fields, and one- or two-marketplace products;
- form pending, validation, server failure, retry, and success states;
- mobile Lighthouse performance and accessibility runs;
- before/after captures for home, listing, product, about, contacts, and forms.

## Future asset intake

The non-blocking asset backlog is maintained in [future-asset-backlog.md](./artifacts/future-asset-backlog.md). New material is reviewed for identity, accuracy, rights, recency, claims implications, accessibility, and performance before use.

Official assets may enrich the accepted design, but their absence does not block the text-first Phase 04 release candidate.
