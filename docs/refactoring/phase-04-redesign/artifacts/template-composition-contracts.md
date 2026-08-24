# Future template composition contracts

- **Recorded:** 2026-08-24
- **Scope:** design-level contracts for future brand, concern, ingredient, and expert-content pages
- **Authority:** Phase 03 page-class and publication-gate requirements plus the approved Phase 04 component architecture
- **Publication state:** documentation only; every named root and child remains gated

## Boundary

This artifact creates no route, canonical, sitemap item, or navigation link. It does not authorize a page, slug, redirect, structured-data object, or analytics event. Candidate routes remain absent and return `404` until the content owner records a complete page-specific publication decision.

The existing `/ingredients` placeholder is not an approved template implementation. It remains `noindex, follow`, outside the sitemap, and outside primary navigation. Dormant ingredient descriptions in `constants.ts` are inventory evidence only and are not publication copy.

All future pages keep Skinetics as the neutral umbrella catalog, keep Dr. Health, SkineticsLab, and Neon Beard as customer-facing product brands, and identify ООО «Демидов Люкс СПА» only in its verified company, legal, or manufacturer role. Copy treats the products as cosmetics and does not imply diagnosis, treatment, guaranteed results, or first-party checkout.

## Shared implementation rules

### Shell, rendering, and hierarchy

- `SiteHeader`, the layout-owned `PageShell` behavior, and `SiteFooter` frame only destinations that have already passed publication review. Desktop and mobile expose the same approved links.
- `SectionHeading` renders the page eyebrow, one descriptive Russian H1, and its concise scope. Each page has exactly one H1.
- A generalized breadcrumb component must render the canonical hierarchy both as visible HTML and matching `BreadcrumbList` JSON-LD. `ProductBreadcrumbs` establishes the parity requirement but its product-only API must be generalized before use by these templates.
- `TrustEvidence` may show only verified facts with a source or context label. It is not a container for generic trust claims.
- `ProductCard` renders only accepted published products and uses `showMarketplaceActions={false}` by default on discovery pages so the canonical product visit stays primary.
- `ContextualLinks` must be generalized from its current product-category API to accept a reviewed list of published, self-canonical destinations. It must never render an absent, placeholder, `noindex`, redirecting, or JavaScript-only destination.
- `MarketplaceActions` is not a required block in any future discovery template. If editorial review later approves a direct marketplace exit, it must keep the existing `marketplace_click` payload and use an accurately approved `MarketplacePlacement`; it must not be mislabeled as `catalog-card` or `product-hero` merely to reuse an enum value.
- Authorship, evidence, headings, explanatory copy, product relationships, and contextual links are server rendered. Client boundaries are limited to approved analytics enhancement and interaction that native HTML cannot provide.
- Every informative image has an accurate Russian alternative; decorative media is hidden from assistive technology. Official logos, badges, portraits, and documentary assets are used only after identity, rights, recency, and publication approval.

### Analytics and conversion measurement

Every template places its primary conversion in server-rendered HTML and names the success metric before publication. The conversion remains usable if analytics fails. Phase 04 does not invent an internal-navigation event: Phase 05 must approve the event name, payload, consent behavior, and reporting destination before instrumenting the named link placement.

The existing `marketplace_click` event remains a downstream product-page measurement with `product_id`, `brand_id`, `marketplace`, `placement`, `page_path`, and optional `campaign`. The current Yandex and Mail.ru compatibility goals remain unchanged. A future page may use later-session marketplace clicks as a supporting outcome, but must not report them as direct Skinetics sales or as proof that the discovery page caused marketplace revenue.

## Brand: composition contract

**Ordered blocks:** canonical breadcrumb → Skinetics relationship → brand H1/scope → verified evidence → products/categories → reviewed expert links → product conversion.

1. **Canonical breadcrumb.** Render `Главная / Бренды / [бренд]` in visible HTML and matching JSON-LD. A future `/brands` hub is the parent only after that hub independently passes its gate; a child cannot publish with a breadcrumb to an absent or `noindex` parent.
2. **Skinetics relationship.** State that Skinetics is the umbrella catalog and name the customer-facing brand. Explain ООО «Демидов Люкс СПА» only where its verified company or manufacturer relationship is relevant. Do not present Skinetics or the legal entity as another product brand.
3. **Brand H1 and scope.** Use one unique Russian H1 and a materially distinct summary of the brand's verified cosmetic scope. A one-product brand page must add useful evidence and selection context beyond restating its product card.
4. **Verified evidence.** Present approved identity, portfolio, product, and documentary facts with source context and review dates. Official brand assets remain optional and cannot substitute for useful copy.
5. **Products and categories.** Show only published products assigned to that brand and link each one directly to its single `/catalog/[slug]` canonical. Add published product-type category links where useful; do not create brand-specific product URLs.
6. **Reviewed expert links.** Render only relevant expert destinations that have independently passed their gates. Omit the block when none are published.
7. **Product conversion.** End with a descriptive product-page action, not a first-party checkout claim. The brand-to-product visit is primary; marketplace exit remains downstream on the product page.

**Shared components consumed:** `SectionHeading`, generalized canonical breadcrumbs, `TrustEvidence`, `ProductCard`, generalized `ContextualLinks`, and the layout-owned `SiteHeader`, `PageShell`, and `SiteFooter`. `MarketplaceActions` is not required.

**Required server-rendered content:** canonical breadcrumb; Skinetics-to-brand relationship; brand name and scope; evidence labels; product and category names and links; available reviewed expert links; primary product action; content owner, author, reviewer when applicable, source dates, publication/update dates, and review trigger.

**Primary conversion and metric:** visit a canonical product page; measure brand-to-product click-through rate. Later-session marketplace clicks are a supporting outcome.

**Analytics placement:** attach future approved internal-link measurement to the final product action and product-card title/action links. Do not fire `marketplace_click` for an internal product visit.

**Authorship and evidence:** Dmitry may approve ordinary verified portfolio and brand copy. Medical, regulatory, clinical, quantified, guaranteed-effect, safety-sensitive, minor-use, diagnosed-condition, or treatment-adjacent statements require external professional or legal review. Record the actual author or `Редакция Skinetics`, reviewer and scope when applicable, sources and review dates, first-publication date, latest material-update date, and next review trigger.

**Additional class gate:** a brand hub must explain the portfolio and connect all published brands to products. A brand child needs unique verified identity and selection value; SkineticsLab and Neon Beard must not publish as thin copies of their single product pages.

## Concern: composition contract

**Ordered blocks:** canonical breadcrumb → non-diagnostic H1/context → selection factors → professional-advice caveat → reviewed ingredients → suitable products → expert links.

1. **Canonical breadcrumb.** Render `Главная / По задачам / [задача ухода]` in visible HTML and matching JSON-LD. A future `/concerns` hub must independently pass its gate before a child can use it as a published parent.
2. **Non-diagnostic H1 and context.** Answer one concern-led cosmetic-care intent in plain Russian. Describe a care context, not a diagnosis, disease, prevention claim, treatment promise, or guaranteed result.
3. **Selection factors.** Explain practical, evidenced factors a visitor can use to compare product types or formulas. Separate accepted product facts from editorial selection guidance.
4. **Professional-advice caveat.** Include a context-appropriate caveat when symptoms, irritation, diagnosed conditions, minors, pregnancy, safety, or treatment questions may require a clinician or other qualified professional. The caveat does not legitimize unsupported claims elsewhere.
5. **Reviewed ingredients.** Link only to published ingredient pages and describe only sourced cosmetic roles. Omit unpublished ingredients rather than rendering dead or gated links.
6. **Suitable products.** Show only products whose suitability is supported by accepted product copy, packaging, manufacturer documents, or the current reviewed marketplace card. Link directly to each canonical product page.
7. **Expert links.** Offer published, reviewed selection or application material that advances the same intent. Omit the block when no expert destination is approved.

**Shared components consumed:** `SectionHeading`, generalized canonical breadcrumbs, `ProductCard`, generalized `ContextualLinks`, optional `TrustEvidence` for sourced context, and the layout-owned `SiteHeader`, `PageShell`, and `SiteFooter`. `MarketplaceActions` is not required.

**Required server-rendered content:** breadcrumb; one-intent H1 and non-diagnostic context; selection factors; any required professional-advice caveat; reviewed ingredient links; suitable product names and canonical links; reviewed expert links; source and authorship record.

**Primary conversion and metric:** visit a suitable canonical product page; measure concern-to-product click-through rate, later-session marketplace clicks, and organic engagement only after a baseline exists.

**Analytics placement:** attach future approved internal-link measurement to the suitable-product action. Supporting measurements may be placed on reviewed ingredient and expert links, but must remain distinguishable from the primary conversion. Do not fire `marketplace_click` for internal navigation.

**Authorship and evidence:** demand needs search/query evidence or a documented business and customer-question signal. Claims-sensitive context and suitability statements require reviewed sources and the approval level required by the claims policy. Record the complete authorship, reviewer, source-date, update-date, and review-trigger fields; treatment-adjacent or safety-sensitive content requires external professional or legal review.

**Additional class gate:** the page must be materially distinct from a category page and from adjacent concern pages. Marketplace questions may establish an information need but are not product-fact or efficacy evidence.

## Ingredient: composition contract

**Ordered blocks:** canonical breadcrumb → H1/INCI/aliases → verified cosmetic role → evidence limits/sources → verified product presence → care contexts → product conversion.

1. **Canonical breadcrumb.** Render `Главная / Ингредиенты / [ингредиент]` in visible HTML and matching JSON-LD. The current `/ingredients` placeholder cannot be a published parent until it becomes useful, self-canonical, indexable, and independently passes the gate.
2. **H1, INCI, and aliases.** Use one unique Russian H1 and show only verified INCI spelling and useful aliases. Do not silently normalize conflicts among packaging, manufacturer documents, and marketplace evidence; resolve them before publication.
3. **Verified cosmetic role.** Explain the ingredient's evidenced cosmetic role at an appropriate level of certainty. Do not infer treatment, mechanism, concentration, clinical effect, or suitability from an ingredient name alone.
4. **Evidence limits and sources.** Distinguish direct source statements, accepted product instructions, and editorial interpretation. Name authoritative sources, their review dates, limitations, and the next review trigger.
5. **Verified product presence.** Include a product only when current accepted evidence verifies that ingredient in the formula. Link to the one `/catalog/[slug]` canonical and identify the customer-facing product brand in text.
6. **Care contexts.** Link only to published, non-diagnostic concern pages and reviewed expert material. Explain that ingredient presence alone does not determine whether a product suits every visitor.
7. **Product conversion.** End with a descriptive action to a verified related product page. Marketplace choice and exit remain on the product page.

**Shared components consumed:** `SectionHeading`, generalized canonical breadcrumbs, `TrustEvidence` for sources/limits, `ProductCard`, generalized `ContextualLinks`, and the layout-owned `SiteHeader`, `PageShell`, and `SiteFooter`. `MarketplaceActions` is not required.

**Required server-rendered content:** breadcrumb; ingredient name, INCI, and aliases; verified cosmetic role; evidence/interpretation labels and source dates; verified product-presence statement and canonical product links; published care-context links; product action; complete authorship record.

**Primary conversion and metric:** visit a related canonical product page; measure ingredient-to-product click-through rate and qualified organic landing traffic after indexing. Later-session marketplace clicks are supporting context.

**Analytics placement:** attach future approved internal-link measurement to the final product action and product-card links. Supporting care-context link measurement must remain secondary. Do not fire `marketplace_click` for internal navigation.

**Authorship and evidence:** use appropriate primary or authoritative sources plus current product-specific evidence for formula presence. Record the actual author, reviewer and scope when applicable, all source/review dates, publication and update dates, and review trigger. Ingredient concentrations, clinical conclusions, safety claims, diagnosed-condition guidance, and treatment-adjacent interpretations require verified evidence and external review where required.

**Additional class gate:** dormant `constants.ts` descriptions cannot satisfy the copy requirement. The page must add a unique, sourced user answer rather than duplicating a product composition or another ingredient page.

## Expert: composition contract

**Ordered blocks:** canonical breadcrumb → one-intent H1 → actual author/reviewer/dates → answer body → sources and interpretation labels → related taxonomy links → product next step.

1. **Canonical breadcrumb.** Render `Главная / Экспертные материалы / [материал]` in visible HTML and matching JSON-LD. A future `/expert` hub must independently pass its gate before publication as the parent.
2. **One-intent H1.** Answer one validated selection or application question from an accepted brief. Do not combine unrelated intents merely to increase page length.
3. **Actual author, reviewer, and dates.** Display the real author or `Редакция Skinetics`, content owner, reviewer and review scope when applicable, first-publication date, latest material-update date, source review date, and next review trigger. Do not invent credentials, endorsements, or expert identity.
4. **Answer body.** Give the useful answer early, then support it with scan-friendly sections. Product instructions must match accepted packaging, manufacturer documents, and approved product copy. Distinguish general editorial guidance from product-specific instructions.
5. **Sources and interpretation labels.** Identify sources and mark what is direct evidence, accepted instruction, or editorial interpretation. Do not cite marketplace questions as proof of efficacy or product facts.
6. **Related taxonomy links.** Link only to independently published concern, ingredient, brand, or category pages. Omit absent destinations; never use JavaScript-only or placeholder links.
7. **Product next step.** Provide a useful canonical product action only when the article's answer and evidence support that relationship. Keep the choice non-diagnostic and do not imply that marketplace exit is clinical advice.

**Shared components consumed:** `SectionHeading`, generalized canonical breadcrumbs, `TrustEvidence` for source/interpretation records, `ProductCard` when a product is a justified next step, generalized `ContextualLinks`, and the layout-owned `SiteHeader`, `PageShell`, and `SiteFooter`. `MarketplaceActions` is not required.

**Required server-rendered content:** breadcrumb; one-intent H1; visible authorship/review/date record; complete answer body; source and interpretation labels; related published taxonomy links; justified product next step; update and review trigger.

**Primary conversion and metric:** visit the most useful next-step product, concern, or ingredient page; measure contextual-link click-through rate and later-session marketplace clicks. A product visit is preferred when commercial context is supported, but is not forced into an informational answer.

**Analytics placement:** attach future approved internal-link measurement to the final next-step action and distinguish product, concern, and ingredient destinations in its payload. Supporting related-taxonomy links are secondary. Do not fire `marketplace_click` for internal navigation.

**Authorship and evidence:** require an accepted brief, verified instructions, accepted sources, and external professional or legal review where the claims policy requires it. Real author/reviewer identity and review scope are mandatory; credentials, studies, certifications, concentrations, or endorsements appear only when verifiable.

**Additional class gate:** an expert page must answer a validated question and provide a useful onward path. The proposed scalp-serum cluster may clarify verified selection/application information but cannot promise hair growth, prevention of hair loss, treatment of dandruff or seborrhea, unapproved course length, suitability for minors, or product combinations without authoritative review.

## Phase 03 nine-condition publication gate

The same page-specific gate applies to every brand, concern, ingredient, and expert root or child. All nine conditions must be recorded as passed before an indexable route exists:

1. One explicit user purpose, audience, and primary intent.
2. Demand supported by search/query evidence or a documented business and customer-question signal.
3. Material distinction from existing category, product, and adjacent taxonomy pages.
4. Required evidence and approval for factual and claims-sensitive copy.
5. Unique Russian title, description, H1, useful server-rendered content, and self-referencing canonical.
6. At least one crawlable inbound link from an indexable page plus useful contextual onward links.
7. Named conversion action and success metric.
8. Sitemap and navigation/internal-link treatment appropriate to the page class.
9. Recorded author, reviewer when applicable, source dates, and update date.

Passing a template-level design review does not pass any page-specific condition. The root and each child are assessed separately. If any condition fails, the route remains absent. If a temporary review route is explicitly authorized, it uses `noindex, follow`, has no sitemap entry, and stays out of primary navigation; it is not canonicalized to a merely similar page.

## Phase 05 handoff record

Before implementation, Phase 05 must create one record per proposed root and child containing:

- target path and canonical hierarchy;
- page class, audience, intent, demand evidence, and distinctness analysis;
- accepted Russian metadata, H1, and final server-rendered copy;
- product/ingredient relationship evidence and claims approvals;
- named owner, actual author, reviewer/scope, sources and dates, update date, and review trigger;
- exact inbound, onward, header/footer/navigation, and sitemap plan;
- primary conversion, metric, analytics placement, and accepted analytics contract;
- accessibility, structured-breadcrumb, raw-HTML, canonical, sitemap, and route-status validation evidence;
- a nine-item sign-off showing every gate condition passed.

Only after that record is approved may implementation add a route, canonical, sitemap item, or navigation/internal link.
