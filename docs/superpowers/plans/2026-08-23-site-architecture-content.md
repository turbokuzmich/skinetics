# Phase 03 Site Architecture and Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce, validate, approve, and close the Phase 03 information-architecture and content-system artifacts without changing application routes, UI code, or production state.

**Architecture:** Keep product type as the stable catalog backbone and document brand, concern, ingredient, and expert-content paths as evidence-gated secondary discovery relationships. Split the operational record into focused artifacts for research, inventory and journeys, URLs, navigation and links, content requirements, migration, and validation; all artifacts argue from the approved Phase 03 design and the accepted shared source-of-truth records.

**Tech Stack:** Markdown operational records, Git, repository-relative links, `rg`, shell validation, existing Next.js 14 route and metadata implementation as read-only evidence

**Spec:** `docs/refactoring/phase-03-site-architecture/DESIGN.md`

## Global Constraints

- Read `AGENTS.md` and the complete spec before beginning each task.
- Skinetics remains the umbrella catalog and acquisition site. Dr. Health, SkineticsLab, and Neon Beard are the customer-facing product brands.
- ООО «Демидов Люкс СПА» appears in legal, manufacturer, and company details and is not presented as a consumer brand.
- Phase 03 produces approved architecture and content specifications. It does not add application routes, publish new hubs or articles, change indexability, redesign templates, or deploy Phase 02.
- Preserve every established public route. No Phase 03 proposal changes a current canonical URL.
- Product type is the primary organization of `/catalog`; concern, ingredient, and brand are secondary relationships and must not become additional primary categories.
- Planned routes remain absent until they pass the publication gate. `/ingredients` remains `noindex, follow`, outside the sitemap and primary navigation.
- Marketplace questions and reviews are voice-of-customer evidence only and must not become proof of efficacy, safety, compatibility, concentration, or a medical claim.
- Do not publish treatment, prevention, cure, guaranteed-effect, absolute-safety, unsupported minor-use, or invented expert claims.
- Do not commit customer names, personal data, raw private analytics exports, or confidential marketplace reports.
- Use ISO dates (`YYYY-MM-DD`) and repository-relative links in refactoring records.
- Preserve unrelated worktree changes. Never stage `.dockerignore`, `.agents/`, `docs/seo-start/`, `export.sh`, or `skills-lock.json`.
- Do not deploy, modify the Ubuntu VM, or create a production release artifact without a separate explicit user request.

---

### Task 1: Activate Phase 03 and record sanitized research evidence

**Files:**
- Modify: `docs/refactoring/phase-03-site-architecture/README.md`
- Modify: `docs/refactoring/phase-03-site-architecture/INPUTS.md`
- Modify: `docs/refactoring/phase-03-site-architecture/artifacts/README.md`
- Create: `docs/refactoring/phase-03-site-architecture/artifacts/marketplace-question-themes.md`
- Modify: `docs/refactoring/STATUS.md`

**Interfaces:**
- Consumes: `docs/refactoring/phase-03-site-architecture/DESIGN.md`, `docs/refactoring/phase-00-baseline/artifacts/analytics-baseline.md`, `docs/refactoring/phase-00-baseline/artifacts/marketplace-baseline.md`, `docs/refactoring/shared/claims-policy.md`.
- Produces: An active Phase 03 status and a sanitized evidence record with exact scope, source URLs, review date, themes, and limitations for Tasks 2 and 5.

- [ ] **Step 1: Verify the phase is not yet active and the research artifact is absent**

Run:

```bash
rg -n 'State:.*Not started|Phase 03 — Site architecture and content.*Not started' docs/refactoring/phase-03-site-architecture/README.md docs/refactoring/STATUS.md
test -f docs/refactoring/phase-03-site-architecture/artifacts/marketplace-question-themes.md
```

Expected: `rg` finds the existing not-started states; `test -f` exits with status 1 because the artifact does not exist.

- [ ] **Step 2: Activate the phase without pretending Phase 02 is deployed**

Update the Phase 03 README header to these exact operational values:

```markdown
- **State:** In progress
- **Owner:** Dmitry, business owner
- **Started:** 2026-08-23
- **Completed:** —
```

Replace the single Phase 02 prerequisite with two explicit facts:

```markdown
- [x] Phase 02 local implementation validated
- [ ] Phase 02 production deployment and monitoring complete — tracked separately and does not block architecture documentation
```

Mark the accepted portfolio role, brand architecture, and URL/search baseline prerequisites complete. Keep the marketplace-question prerequisite incomplete until Step 3 creates the evidence artifact.

Update `docs/refactoring/STATUS.md` so the current position reads:

```markdown
- **Active phase:** Phase 03 — Site architecture and content
- **Phase state:** In progress
- **Current focus:** record evidence and produce the approved architecture artifacts
- **Next action:** complete the sanitized marketplace-question themes and current-content inventory
```

Keep Phase 02 as `Implementation validated; deployment pending` in the dashboard. Change only the Phase 03 row to `In progress` and state that approved documentation work proceeds while production monitoring remains unavailable.

- [ ] **Step 3: Create the sanitized marketplace-question themes artifact**

Create `marketplace-question-themes.md` with:

```markdown
# Marketplace question and review themes

- **Reviewed:** 2026-08-23
- **Scope:** public Wildberries product and question pages for one priority cream and the marketplace group containing the copper-tripeptide serum
- **Handling:** sanitized themes only; no customer names, personal data, raw export, or customer quotation is retained

## Sources

- Ultra Lift product `768970852`: `https://www.wildberries.ru/catalog/768970852/detail.aspx`
- Ultra Lift questions: `https://www.wildberries.ru/catalog/768970852/questions?imtId=792889446&size=1124541098`
- Copper-tripeptide serum product `397059149`: `https://www.wildberries.ru/catalog/397059149/detail.aspx`
- Associated questions: `https://www.wildberries.ru/catalog/397059149/questions?imtId=459370604&size=573954279`

## Cream themes

- suitability by age and skin type;
- whether the product is gender-specific;
- whether it can be used around the eyes;
- day, night, and routine placement;
- ingredient presence and concentration questions;
- expected cosmetic result and realistic time to assess personal experience;
- texture, absorption, scent, comfort, and concern about oiliness.

## Scalp-serum themes

- how often to apply and whether a break between courses is required;
- whether to apply to dry or damp scalp and whether to rinse;
- where to apply the product and how much to use;
- whether different serum formulas can be alternated or combined;
- warmth, stinging, irritation, and when to stop use;
- age suitability and use by minors;
- ingredient presence, concentration, and INCI interpretation;
- how to choose between the red-pepper, copper-tripeptide, and dandruff-prone-scalp formulas;
- packaging instructions, shelf life after opening, and expected bottle duration.

## Content consequences

- Use verified product instructions to improve product FAQ and application clarity.
- Prioritize scalp-serum selection and application briefs for the first expert-content cluster.
- Treat cream usage questions as inputs to the Phase 04 product and category templates.
- Escalate minor-use, concentration, compatibility, diagnosed-condition, safety, and treatment-adjacent answers for authoritative review.

## Limitations

- Marketplace grouping can mix questions from related products, so the themes do not establish exact per-product frequency.
- Customer questions and seller responses identify information needs but do not verify product facts or claims.
- No numerical keyword volume, Skinetics organic-query history, or complete seller export is available.
- Marketplace demand is not traffic or revenue attributed to Skinetics.
```

Mark the marketplace-question prerequisite complete in the Phase 03 README. Expand `INPUTS.md` with the reviewed sources, no-traffic/no-query limitation, available owner approval, unavailable official brand assets, and external-review requirement. Do not claim that keyword-volume, expert-capacity, or production-monitoring inputs exist.

- [ ] **Step 4: Link and validate the evidence artifact**

Add the artifact link and one-sentence role to `artifacts/README.md`.

Run:

```bash
test -f docs/refactoring/phase-03-site-architecture/artifacts/marketplace-question-themes.md
rg -n 'no customer names|No numerical keyword volume|Customer questions and seller responses' docs/refactoring/phase-03-site-architecture/artifacts/marketplace-question-themes.md
rg -n 'State:.*In progress|Active phase:.*Phase 03' docs/refactoring/phase-03-site-architecture/README.md docs/refactoring/STATUS.md
git diff --check
```

Expected: all commands pass; the artifact contains the privacy, demand, and source-authority limitations; Phase 02 still says deployment pending.

- [ ] **Step 5: Commit the research activation**

```bash
git add docs/refactoring/STATUS.md docs/refactoring/phase-03-site-architecture/README.md docs/refactoring/phase-03-site-architecture/INPUTS.md docs/refactoring/phase-03-site-architecture/artifacts/README.md docs/refactoring/phase-03-site-architecture/artifacts/marketplace-question-themes.md
git commit -m "P03: record architecture research"
```

---

### Task 2: Inventory current content and map user journeys

**Files:**
- Create: `docs/refactoring/phase-03-site-architecture/artifacts/content-inventory-and-journeys.md`
- Modify: `docs/refactoring/phase-03-site-architecture/artifacts/README.md`

**Interfaces:**
- Consumes: The five-product scope, current routes in `app/`, `constants.ts`, shared URL inventory, marketplace themes from Task 1, and the three homepage tasks from the spec.
- Produces: One row per current route plus journey, gap, conversion, demand, and priority fields used by the URL map, internal-link plan, and page-requirement artifact.

- [ ] **Step 1: Verify the inventory artifact is absent and enumerate the implemented routes**

Run:

```bash
test -f docs/refactoring/phase-03-site-architecture/artifacts/content-inventory-and-journeys.md
find app -name page.tsx -print | sort
```

Expected: `test -f` exits with status 1. The route listing includes home, about, catalog, dynamic catalog product, cream, serum, contacts, and ingredients pages; the dynamic route represents all five published products.

- [ ] **Step 2: Create the current-content inventory**

Create a table with these exact twelve canonical rows:

```text
/
/catalog
/serum
/cream
/catalog/red_pepper
/catalog/copper_tripeptide
/catalog/climbazole
/catalog/ultra-lift
/catalog/renewal
/about
/contacts
/ingredients
```

Give every row these columns:

```text
Route | State | Indexation | Primary user purpose | Existing content | Evidence/gap | Primary action | Phase 03 treatment
```

Record these non-negotiable treatments:

- the first eleven routes are preserved, with `/cream` and the two cream products labeled locally validated and deployment pending;
- `/ingredients` remains a thin placeholder, `noindex, follow`, excluded from sitemap and navigation;
- product pages remain the commercial destination before marketplace exit;
- `/about` requires portfolio/company/trust strengthening in Phase 04;
- `/contacts` keeps contact details and feedback conversion;
- no current route is redirected or removed.

- [ ] **Step 3: Add the planned-content inventory and readiness status**

Add planned page classes for:

```text
/brands and /brands/[brand]
/concerns and /concerns/[concern]
/ingredients/[ingredient]
/expert and /expert/[article]
```

For each class record `Approved template, route absent` and its publication gate. Explicitly record that:

- `/brands` may be Phase 04-ready only after reviewed portfolio copy exists;
- individual brand pages need unique verified content, including single-product SkineticsLab and Neon Beard pages;
- concern, ingredient, and expert pages are Phase 05 candidates, not approved indexable pages;
- ingredient candidates cannot use the dormant `constants.ts` descriptions as publication copy.

- [ ] **Step 4: Map the four discovery journeys and priorities**

Add these journeys with an entry page, intermediate pages, product destination, marketplace exit, and unresolved evidence:

```text
Product type: home → catalog/category → product → marketplace
Concern: search/home → concern or category → product → marketplace
Ingredient: search/product → ingredient → suitable product → marketplace
Brand: home/about/brands → brand → product → marketplace
```

Record the homepage priorities exactly as browse, understand, and choose. Record Priority 1 as the commercial cream journey and Priority 2 as the scalp-serum selection/application expert cluster. State that numerical organic demand remains unavailable.

- [ ] **Step 5: Validate and link the inventory**

Add the artifact to `artifacts/README.md`, then run:

```bash
test -f docs/refactoring/phase-03-site-architecture/artifacts/content-inventory-and-journeys.md
for route in '/catalog/red_pepper' '/catalog/copper_tripeptide' '/catalog/climbazole' '/catalog/ultra-lift' '/catalog/renewal' '/ingredients'; do rg -q "$route" docs/refactoring/phase-03-site-architecture/artifacts/content-inventory-and-journeys.md || exit 1; done
rg -n 'Product type:|Concern:|Ingredient:|Brand:' docs/refactoring/phase-03-site-architecture/artifacts/content-inventory-and-journeys.md
rg -n 'commercial cream journey|scalp-serum selection' docs/refactoring/phase-03-site-architecture/artifacts/content-inventory-and-journeys.md
git diff --check
```

Expected: all current product paths, all four journeys, and both evidence-led priorities are present; all commands pass.

- [ ] **Step 6: Commit the inventory**

```bash
git add docs/refactoring/phase-03-site-architecture/artifacts/README.md docs/refactoring/phase-03-site-architecture/artifacts/content-inventory-and-journeys.md
git commit -m "P03: inventory content journeys"
```

---

### Task 3: Produce the site tree and URL map

**Files:**
- Create: `docs/refactoring/phase-03-site-architecture/artifacts/site-tree-and-url-map.md`
- Modify: `docs/refactoring/phase-03-site-architecture/artifacts/README.md`
- Modify: `docs/refactoring/shared/url-inventory.md`

**Interfaces:**
- Consumes: The approved hierarchy and URL conventions in the spec and the current-content inventory from Task 2.
- Produces: The canonical hierarchy, namespace rules, candidate publication states, and an updated shared inventory consumed by navigation and migration work.

- [ ] **Step 1: Verify the URL artifact is absent and the shared inventory lacks the cream routes**

Run:

```bash
test -f docs/refactoring/phase-03-site-architecture/artifacts/site-tree-and-url-map.md
rg -n '^\| `/cream`|^\| `/catalog/ultra-lift`|^\| `/catalog/renewal`' docs/refactoring/shared/url-inventory.md
```

Expected: `test -f` exits with status 1 and `rg` finds no matching shared-inventory rows.

- [ ] **Step 2: Create the approved site tree and namespace specification**

Copy the canonical tree from the spec, including all existing routes and these planned namespace roots:

```text
/brands
/concerns
/ingredients
/expert
```

For each route or pattern include:

```text
Path | Page class | Current/planned state | Intended purpose | Indexation decision | Parent | Required inbound link | Earliest phase
```

Record the candidate child slugs exactly as:

```text
/brands/dr-health
/brands/skineticslab
/brands/neon-beard
/concerns/hair-loss-care
/concerns/dandruff-prone-scalp
/concerns/daily-face-care
/ingredients/copper-tripeptide-ghk-cu
/ingredients/niacinamide
/ingredients/climbazole
/ingredients/piroctone-olamine
/ingredients/peptides
/expert/choosing-scalp-serum
/expert/how-to-apply-scalp-serum
/expert/how-to-use-peptide-face-cream
```

Label every candidate child `absent; evidence gate required`, not indexable or published.

- [ ] **Step 3: Add URL, canonical, sitemap, and draft-route rules**

Document these exact rules:

- English namespace roots, lowercase ASCII slugs, and hyphens for new paths;
- current underscore product routes remain unchanged;
- products retain one canonical under `/catalog/[slug]` regardless of discovery path;
- no brand, concern, ingredient, or article creates an alternate product URL;
- absent candidates return 404 until ready;
- a temporary review route uses `noindex, follow`, no sitemap entry, and no primary-navigation link;
- only indexable self-canonical URLs enter the sitemap;
- filter, search, pagination, and campaign parameters do not become indexable paths.

- [ ] **Step 4: Update the shared URL inventory for the local release candidate**

Set `Last reviewed` to `2026-08-23`. Add rows for:

```markdown
| `/cream` | Locally rendered with one H1; production deployment pending | Self-canonical; indexable after deployment | Navigation-facing face-cream listing | Preserve |
| `/catalog/ultra-lift` | Locally rendered with one H1; production deployment pending | Self-canonical; indexable after deployment | Neon Beard Ultra Lift cream | Preserve exact URL |
| `/catalog/renewal` | Locally rendered with one H1; production deployment pending | Self-canonical; indexable after deployment | SkineticsLab ReneWal cream | Preserve exact URL |
```

Update the introductory scope and sitemap note so they distinguish the locally validated five-product release candidate from the older public deployment. Do not rewrite or delete any accepted existing action.

- [ ] **Step 5: Validate the URL map and shared inventory**

Add the artifact link to `artifacts/README.md`, then run:

```bash
test -f docs/refactoring/phase-03-site-architecture/artifacts/site-tree-and-url-map.md
for path in '/brands/dr-health' '/concerns/hair-loss-care' '/ingredients/copper-tripeptide-ghk-cu' '/expert/choosing-scalp-serum'; do rg -q "$path" docs/refactoring/phase-03-site-architecture/artifacts/site-tree-and-url-map.md || exit 1; done
for path in '/cream' '/catalog/ultra-lift' '/catalog/renewal'; do rg -q "\`$path\`" docs/refactoring/shared/url-inventory.md || exit 1; done
rg -n 'absent; evidence gate required|one canonical under `/catalog/\[slug\]`|no sitemap entry' docs/refactoring/phase-03-site-architecture/artifacts/site-tree-and-url-map.md
git diff --check
```

Expected: all commands pass and no current route is assigned a changed URL.

- [ ] **Step 6: Commit the URL architecture**

```bash
git add docs/refactoring/shared/url-inventory.md docs/refactoring/phase-03-site-architecture/artifacts/README.md docs/refactoring/phase-03-site-architecture/artifacts/site-tree-and-url-map.md
git commit -m "P03: define site URL map"
```

---

### Task 4: Specify navigation, breadcrumbs, internal links, and click depth

**Files:**
- Create: `docs/refactoring/phase-03-site-architecture/artifacts/navigation-and-internal-linking.md`
- Modify: `docs/refactoring/phase-03-site-architecture/artifacts/README.md`

**Interfaces:**
- Consumes: The page hierarchy from Task 3 and the journeys from Task 2.
- Produces: Exact header/mobile/footer rules, canonical breadcrumb patterns, source-to-destination link requirements, orphan checks, and click-depth targets used by Phase 04.

- [ ] **Step 1: Verify the navigation artifact is absent**

Run:

```bash
test -f docs/refactoring/phase-03-site-architecture/artifacts/navigation-and-internal-linking.md
```

Expected: exit status 1.

- [ ] **Step 2: Document the launch header and conditional future entries**

Create the artifact with the exact initial header order:

```text
Каталог → /catalog
Сыворотки → /serum
Кремы → /cream
О нас → /about
Контакты → /contacts
```

State that desktop and mobile expose the same destinations and labels. Limit primary choices to seven. Permit `Бренды`, `По задачам`, `Ингредиенты`, or `Экспертные материалы` only after the root is useful, indexable, and has at least one complete child. Forbid empty, disabled, placeholder, or `noindex` destinations in primary navigation.

- [ ] **Step 3: Specify footer groups and breadcrumb patterns**

Use the exact footer groups `Каталог`, `Подбор и знания`, `Skinetics`, and `Информация`. Include only published destinations.

Record these canonical breadcrumbs:

```text
Product: Главная / [категория] / [продукт]
Brand: Главная / Бренды / [бренд]
Concern: Главная / По задачам / [задача ухода]
Ingredient: Главная / Ингредиенты / [ингредиент]
Expert: Главная / Экспертные материалы / [материал]
```

State that product breadcrumbs are category-based and never depend on the referrer. Require matching visible HTML and `BreadcrumbList` JSON-LD.

- [ ] **Step 4: Add the internal-link adjacency matrix**

Include source rows for home, catalog, category, product, brand, concern, ingredient, expert, about, and contacts. Copy the required destinations from the spec. Require every indexable page to have at least one crawlable inbound link from an indexable page and one useful onward path in server-rendered HTML.

Explicitly forbid sitemap-only discovery, JavaScript-only discovery, marketplace-only discovery, and duplicate product URLs.

- [ ] **Step 5: Prove the click-depth target on the proposed hierarchy**

Add this table:

```text
Catalog/category: 1 click from home
Product: no more than 2 clicks from home
Published taxonomy root: 1 click while in navigation
Brand/concern/ingredient/article child: no more than 2 clicks
Product from a published discovery child: no more than 3 clicks from home
```

Give one concrete route chain for each discovery journey and mark the depth of every node.

- [ ] **Step 6: Validate and link the navigation artifact**

Add the artifact to `artifacts/README.md`, then run:

```bash
test -f docs/refactoring/phase-03-site-architecture/artifacts/navigation-and-internal-linking.md
rg -n 'Каталог.*`/catalog`|Сыворотки.*`/serum`|Кремы.*`/cream`|no more than seven' docs/refactoring/phase-03-site-architecture/artifacts/navigation-and-internal-linking.md
rg -n 'Главная / Бренды|Главная / По задачам|Главная / Ингредиенты|Главная / Экспертные материалы' docs/refactoring/phase-03-site-architecture/artifacts/navigation-and-internal-linking.md
rg -n 'no more than 2 clicks|no more than 3 clicks|crawlable inbound link' docs/refactoring/phase-03-site-architecture/artifacts/navigation-and-internal-linking.md
git diff --check
```

Expected: all commands pass; all page classes have inbound and onward link rules.

- [ ] **Step 7: Commit the navigation specification**

```bash
git add docs/refactoring/phase-03-site-architecture/artifacts/README.md docs/refactoring/phase-03-site-architecture/artifacts/navigation-and-internal-linking.md
git commit -m "P03: specify navigation links"
```

---

### Task 5: Define the content map and Phase 04 page requirements

**Files:**
- Create: `docs/refactoring/phase-03-site-architecture/artifacts/content-map-and-page-requirements.md`
- Modify: `docs/refactoring/phase-03-site-architecture/artifacts/README.md`
- Modify: `docs/refactoring/phase-04-redesign/INPUTS.md`

**Interfaces:**
- Consumes: The evidence themes from Task 1, journey priorities from Task 2, hierarchy from Task 3, navigation rules from Task 4, claims policy, and measurement plan.
- Produces: A page-class contract for Phase 04 and Phase 05 covering purpose, audience, required sections, evidence, indexation, conversion, metric, authorship, and review.

- [ ] **Step 1: Verify the page-requirement artifact is absent**

Run:

```bash
test -f docs/refactoring/phase-03-site-architecture/artifacts/content-map-and-page-requirements.md
```

Expected: exit status 1.

- [ ] **Step 2: Create the page-class contract**

Create one row for every class:

```text
Home
Catalog/listing
Product
Brand hub/brand
Concern
Ingredient
Expert article
About
Contacts
```

Use these columns:

```text
Page class | User purpose | Audience/intent | Required sections | Evidence/approval | Primary conversion | Success metric | Indexation treatment | Earliest phase
```

Populate the rows from the approved spec. Preserve these exact conversion contracts:

- home → product visit; secondary trichologist form;
- listing → product visit;
- product → contextual `marketplace_click`;
- brand → brand-to-product visit;
- concern → suitable-product visit;
- ingredient → related-product visit;
- expert → next-step product, concern, or ingredient visit;
- about → catalog or brand visit;
- contacts → valid feedback submission.

- [ ] **Step 3: Record content priorities and briefs**

Add Priority 1 `commercial cream journey` with the 71.9% marketplace-business signal and explicit non-attribution caveat.

Add Priority 2 `scalp-serum selection and application cluster` with these three briefs:

```text
choosing among the three scalp serums by cosmetic-care context
applying a leave-in scalp serum using approved instructions
product-specific FAQ improvements derived from verified labeling and approved copy
```

Record that `daily-face-care`, `peptides`, `copper-tripeptide-ghk-cu`, and all other concern/ingredient candidates remain gated and are not approved indexable pages.

- [ ] **Step 4: Add authorship, review, update, and publication gates**

Require every indexable non-product content page to record:

```text
content owner
actual author or Редакция Skinetics
reviewer and review scope when applicable
first-publication date
latest material-update date
source list and review date
next review trigger
```

Copy all nine indexation-gate conditions from the spec. Add the 12-month maximum review interval and earlier triggers for packaging, manufacturer documents, marketplace availability, formula, regulation, or source changes.

State that Dmitry approves ordinary product, portfolio, and brand copy, while medical, regulatory, clinical, quantified, guaranteed-effect, safety-sensitive, minor-use, diagnosed-condition, or treatment-adjacent statements require external professional or legal review.

- [ ] **Step 5: Turn the artifact into an explicit Phase 04 input**

Update `docs/refactoring/phase-04-redesign/INPUTS.md` to link:

```text
../phase-03-site-architecture/DESIGN.md
../phase-03-site-architecture/artifacts/site-tree-and-url-map.md
../phase-03-site-architecture/artifacts/navigation-and-internal-linking.md
../phase-03-site-architecture/artifacts/content-map-and-page-requirements.md
```

State that Phase 04 implements templates and navigation only for approved destinations and does not publish gated concern, ingredient, brand, or expert routes merely because templates exist.

- [ ] **Step 6: Validate and link the content requirements**

Add the artifact to the Phase 03 artifacts README, then run:

```bash
test -f docs/refactoring/phase-03-site-architecture/artifacts/content-map-and-page-requirements.md
for class in 'Home' 'Catalog/listing' 'Product' 'Brand hub/brand' 'Concern' 'Ingredient' 'Expert article' 'About' 'Contacts'; do rg -q "$class" docs/refactoring/phase-03-site-architecture/artifacts/content-map-and-page-requirements.md || exit 1; done
rg -n 'marketplace_click|commercial cream journey|scalp-serum selection|Редакция Skinetics|12 months' docs/refactoring/phase-03-site-architecture/artifacts/content-map-and-page-requirements.md
rg -n 'site-tree-and-url-map|navigation-and-internal-linking|content-map-and-page-requirements' docs/refactoring/phase-04-redesign/INPUTS.md
git diff --check
```

Expected: all page classes, conversions, priorities, evidence owners, and Phase 04 links are present; all commands pass.

- [ ] **Step 7: Commit the page requirements**

```bash
git add docs/refactoring/phase-04-redesign/INPUTS.md docs/refactoring/phase-03-site-architecture/artifacts/README.md docs/refactoring/phase-03-site-architecture/artifacts/content-map-and-page-requirements.md
git commit -m "P03: define page requirements"
```

---

### Task 6: Record the architecture decision and migration matrix

**Files:**
- Create: `docs/refactoring/phase-03-site-architecture/artifacts/redirect-matrix.md`
- Create: `docs/refactoring/decisions/0006-evidence-gated-site-architecture.md`
- Modify: `docs/refactoring/phase-03-site-architecture/artifacts/README.md`

**Interfaces:**
- Consumes: Every current route treatment from Tasks 2 and 3, the chosen approach in the spec, and decision record 0005.
- Produces: A durable cross-phase architecture decision and one explicit preserve/redirect outcome per current canonical URL.

- [ ] **Step 1: Verify the decision and redirect matrix are absent**

Run:

```bash
test -f docs/refactoring/phase-03-site-architecture/artifacts/redirect-matrix.md
test -f docs/refactoring/decisions/0006-evidence-gated-site-architecture.md
```

Expected: both commands exit with status 1.

- [ ] **Step 2: Create the redirect matrix**

Create one row for each current route listed in Task 2 with these columns:

```text
Current URL | Current/local state | Decision | Target | Status code | Canonical action | Sitemap action | Internal-link action | Evidence
```

Set every decision to `Preserve`, every target to `—`, every status code to `200`, every canonical action to retain the self-canonical, and every internal-link action to retain direct links. Keep `/ingredients` out of the sitemap and `noindex, follow`. Mark `/cream`, `/catalog/ultra-lift`, and `/catalog/renewal` as locally validated and deployment pending.

Add future migration rules: one final 301 target, no chains or loops, no blanket catalog redirects, no unrelated targets, and explicit canonical/sitemap/breadcrumb/internal-link review.

- [ ] **Step 3: Create decision 0006**

Use this title and status:

```markdown
# 0006 — Use an evidence-gated dual taxonomy

- **Status:** Accepted
- **Date:** 2026-08-23
- **Owners:** Dmitry, business owner
- **Affected phases:** 03–05
```

Record:

- context: the catalog must support discovery by type, concern, ingredient, and brand without thin or duplicate pages;
- options: category-only, evidence-gated dual taxonomy, immediate full hub publication;
- decision: product type remains primary; brand, concern, ingredient, and expert content are secondary relationships; candidates remain absent until the publication gate passes;
- consequences: preserve all current routes, no alternate product URLs, conditional navigation, `/ingredients` remains `noindex`, Phase 04 builds approved templates, Phase 05 validates and publishes content clusters;
- evidence: link the Phase 03 design, marketplace themes, content inventory, URL map, and decision 0005.

- [ ] **Step 4: Validate and link the migration records**

Add the redirect matrix to `artifacts/README.md`, then run:

```bash
test -f docs/refactoring/phase-03-site-architecture/artifacts/redirect-matrix.md
test -f docs/refactoring/decisions/0006-evidence-gated-site-architecture.md
for path in '/catalog/red_pepper' '/catalog/copper_tripeptide' '/catalog/climbazole' '/catalog/ultra-lift' '/catalog/renewal'; do rg -q "$path" docs/refactoring/phase-03-site-architecture/artifacts/redirect-matrix.md || exit 1; done
rg -n 'Use an evidence-gated dual taxonomy|Status:.*Accepted|product type remains primary' docs/refactoring/decisions/0006-evidence-gated-site-architecture.md
rg -n 'no chains|no blanket|no unrelated' docs/refactoring/phase-03-site-architecture/artifacts/redirect-matrix.md
git diff --check
```

Expected: all current routes have a preserve row, the decision is accepted, and no redirect target is proposed.

- [ ] **Step 5: Commit the decision and migration matrix**

```bash
git add docs/refactoring/decisions/0006-evidence-gated-site-architecture.md docs/refactoring/phase-03-site-architecture/artifacts/README.md docs/refactoring/phase-03-site-architecture/artifacts/redirect-matrix.md
git commit -m "P03: accept site architecture"
```

---

### Task 7: Validate the phase and move it to owner review

**Files:**
- Modify: `docs/refactoring/phase-03-site-architecture/FINDINGS.md`
- Modify: `docs/refactoring/phase-03-site-architecture/CHECKLIST.md`
- Modify: `docs/refactoring/phase-03-site-architecture/VALIDATION.md`
- Modify: `docs/refactoring/phase-03-site-architecture/README.md`
- Modify: `docs/refactoring/STATUS.md`

**Interfaces:**
- Consumes: All Phase 03 artifacts and decision 0006.
- Produces: Evidence-backed findings, checked research/architecture/content/migration work, completed mechanical validation, and an `In validation` phase awaiting explicit owner acceptance.

- [ ] **Step 1: Populate findings from the completed artifacts**

Replace the placeholder findings with these sections:

```text
Audience and journey findings
Architecture findings
Content priorities
Migration findings
Requirements for Phase 04
Evidence limitations
```

Record the accepted conclusions without adding new scope:

- browse, understand, and choose are the homepage tasks;
- product type is primary and the evidence-gated dual taxonomy is secondary;
- the commercial cream journey is Priority 1;
- scalp-serum selection and application is the first expert-content cluster;
- no new concern or ingredient page is approved indexable;
- every current URL is preserved and no redirect is required;
- public marketplace questions support themes, not claims or exact frequency;
- Phase 02 production monitoring and numerical organic demand remain unavailable.

- [ ] **Step 2: Check completed Phase 03 work but leave owner approval open**

Mark every research, architecture, content-system, and migration-validation checklist item complete except:

```markdown
- [ ] Obtain approval before Phase 04.
- [ ] Update root status and log.
```

The root status/log item remains open because closure belongs to Task 8 after approval.

- [ ] **Step 3: Run the complete architecture validation**

Verify artifact existence:

```bash
for file in marketplace-question-themes.md content-inventory-and-journeys.md site-tree-and-url-map.md navigation-and-internal-linking.md content-map-and-page-requirements.md redirect-matrix.md; do test -f "docs/refactoring/phase-03-site-architecture/artifacts/$file" || exit 1; done
```

Verify every current URL appears in the redirect matrix:

```bash
for path in '/' '/catalog' '/serum' '/cream' '/catalog/red_pepper' '/catalog/copper_tripeptide' '/catalog/climbazole' '/catalog/ultra-lift' '/catalog/renewal' '/about' '/contacts' '/ingredients'; do rg -Fq "\`$path\`" docs/refactoring/phase-03-site-architecture/artifacts/redirect-matrix.md || exit 1; done
```

Verify page classes, click-depth, navigation, and indexation rules:

```bash
rg -n 'Home|Catalog/listing|Product|Brand hub/brand|Concern|Ingredient|Expert article|About|Contacts' docs/refactoring/phase-03-site-architecture/artifacts/content-map-and-page-requirements.md
rg -n 'no more than seven|no more than 2 clicks|no more than 3 clicks' docs/refactoring/phase-03-site-architecture/artifacts/navigation-and-internal-linking.md
rg -n 'noindex, follow|absent; evidence gate required|self-canonical' docs/refactoring/phase-03-site-architecture/artifacts/site-tree-and-url-map.md docs/refactoring/phase-03-site-architecture/artifacts/redirect-matrix.md
```

Verify documentation quality:

```bash
rg -n '^Status: Not started$|^Status: Pending$' docs/refactoring/phase-03-site-architecture docs/refactoring/decisions/0006-evidence-gated-site-architecture.md && exit 1 || true
git diff --check
```

Expected: artifact, URL, page-class, depth, navigation, and indexation commands pass; the placeholder scan returns no matches; `git diff --check` passes.

- [ ] **Step 4: Record validation as pending owner acceptance**

Check every mechanical architecture, SEO migration, and content validation item in `VALIDATION.md`. Set:

```markdown
Status: In validation

- **Reviewed by:** Codex mechanical/documentation review
- **Review date:** 2026-08-23
- **Result:** Pending owner acceptance
- **Notes:** Architecture, migration, click-depth, orphan, page-purpose, and content-policy checks pass; final owner acceptance remains open.
```

Set the Phase 03 README state and root status to `In validation`. Set the next action to owner review of the six artifacts and decision 0006. Do not mark the phase complete.

- [ ] **Step 5: Commit the validated handoff**

```bash
git add docs/refactoring/STATUS.md docs/refactoring/phase-03-site-architecture/README.md docs/refactoring/phase-03-site-architecture/FINDINGS.md docs/refactoring/phase-03-site-architecture/CHECKLIST.md docs/refactoring/phase-03-site-architecture/VALIDATION.md
git commit -m "P03: validate site architecture"
```

---

### Task 8: Obtain owner acceptance and close Phase 03

**Files:**
- Modify: `docs/refactoring/phase-03-site-architecture/README.md`
- Modify: `docs/refactoring/phase-03-site-architecture/CHECKLIST.md`
- Modify: `docs/refactoring/phase-03-site-architecture/VALIDATION.md`
- Modify: `docs/refactoring/STATUS.md`
- Modify: `docs/refactoring/LOG.md`

**Interfaces:**
- Consumes: The `In validation` record from Task 7 and explicit owner acceptance of the completed artifacts.
- Produces: A complete Phase 03 lifecycle record and a Phase 04-ready handoff while retaining Phase 02 deployment as separately pending work.

- [ ] **Step 1: Present the completed artifact set and stop for approval**

Ask the owner to review these exact records:

```text
docs/refactoring/phase-03-site-architecture/DESIGN.md
docs/refactoring/phase-03-site-architecture/artifacts/marketplace-question-themes.md
docs/refactoring/phase-03-site-architecture/artifacts/content-inventory-and-journeys.md
docs/refactoring/phase-03-site-architecture/artifacts/site-tree-and-url-map.md
docs/refactoring/phase-03-site-architecture/artifacts/navigation-and-internal-linking.md
docs/refactoring/phase-03-site-architecture/artifacts/content-map-and-page-requirements.md
docs/refactoring/phase-03-site-architecture/artifacts/redirect-matrix.md
docs/refactoring/decisions/0006-evidence-gated-site-architecture.md
```

Ask: `Do you accept these Phase 03 artifacts and authorize closing the phase?`

Expected: stop execution until the owner explicitly approves or requests corrections. Corrections return to the relevant prior task and repeat Task 7 validation.

- [ ] **Step 2: Record owner acceptance**

After explicit approval, set the Phase 03 README header to:

```markdown
- **State:** Complete
- **Owner:** Dmitry, business owner
- **Started:** 2026-08-23
- **Completed:** 2026-08-23
```

Check the final two checklist items. Update `VALIDATION.md` to:

```markdown
Status: Complete

- **Reviewed by:** Dmitry, business owner
- **Review date:** 2026-08-23
- **Result:** Passed
- **Notes:** Approved evidence-gated dual taxonomy, preserved URL map, navigation and internal-link specification, content priorities, page-template requirements, publication gates, and no-redirect migration matrix.
```

- [ ] **Step 3: Update the program status without hiding Phase 02 deployment work**

Update the Phase 03 dashboard row to `Complete`. Set the current focus to the next explicitly authorized work, and list both facts:

- Phase 03 architecture is complete and Phase 04 is ready for design work;
- Phase 02 production deployment and its monitoring window remain pending separate authorization.

Do not claim that Phase 04 implementation or Phase 02 deployment has started.

- [ ] **Step 4: Add one meaningful Phase 03 log entry**

Add a 2026-08-23 entry with:

```text
Phase: 03 — Site architecture and content
Summary: accepted the evidence-gated dual taxonomy, preserved all current URLs, and completed the navigation, internal-linking, content, indexation, migration, and Phase 04 template requirements.
Evidence: link the six artifacts, decision 0006, findings, and validation.
Decisions/blockers: no current redirect; concern/ingredient/expert pages remain gated; Phase 02 deployment and numerical organic demand remain pending/unavailable.
Next: begin Phase 04 design only when explicitly authorized, or complete the separately authorized Phase 02 deployment path.
```

- [ ] **Step 5: Run the final documentation consistency check**

```bash
rg -n 'State:.*Complete|Completed:.*2026-08-23' docs/refactoring/phase-03-site-architecture/README.md
rg -n 'Phase 03 — Site architecture and content.*Complete' docs/refactoring/STATUS.md
rg -n 'Reviewed by:.*Dmitry|Result:.*Passed' docs/refactoring/phase-03-site-architecture/VALIDATION.md
rg -n 'Phase:.*03|evidence-gated dual taxonomy' docs/refactoring/LOG.md
rg -n '^Status: In validation$|Result:.*Pending owner acceptance' docs/refactoring/phase-03-site-architecture && exit 1 || true
git diff --check
```

Expected: completion, owner review, and log checks pass; no closure placeholders remain; whitespace validation passes.

- [ ] **Step 6: Commit Phase 03 closure**

```bash
git add docs/refactoring/STATUS.md docs/refactoring/LOG.md docs/refactoring/phase-03-site-architecture/README.md docs/refactoring/phase-03-site-architecture/CHECKLIST.md docs/refactoring/phase-03-site-architecture/VALIDATION.md
git commit -m "P03: complete site architecture"
```
