# Navigation and internal linking

- **Reviewed:** 2026-08-23
- **Implementation target:** Phase 04 templates and navigation; only published destinations may be exposed

## Header and mobile navigation

The initial Phase 04 header order is:

1. `Каталог` → `/catalog`
2. `Сыворотки` → `/serum`
3. `Кремы` → `/cream`
4. `О нас` → `/about`
5. `Контакты` → `/contacts`

Desktop and mobile navigation expose the same destinations and labels. The header contains no more than seven primary choices. A catalog dropdown may group `Все средства`, `Сыворотки`, and `Кремы`, but each destination remains directly reachable and keyboard accessible.

`Бренды`, `По задачам`, `Ингредиенты`, or `Экспертные материалы` may enter primary navigation only after the corresponding root is useful, indexable, and has at least one complete child. Empty, disabled, placeholder, absent, or `noindex` destinations are forbidden in primary navigation.

## Footer

The footer groups published destinations by purpose:

- **Каталог:** all products, serums, and creams;
- **Подбор и знания:** published concern, ingredient, and expert roots only;
- **Skinetics:** published portfolio/brand hub, about, and contacts;
- **Информация:** legal company details and applicable policies.

The footer does not expose unfinished destinations. Footer placement alone is insufficient as the only inbound path to an indexable page.

## Canonical breadcrumbs

```text
Product: Главная / [категория] / [продукт]
Brand: Главная / Бренды / [бренд]
Concern: Главная / По задачам / [задача ухода]
Ingredient: Главная / Ингредиенты / [ингредиент]
Expert: Главная / Экспертные материалы / [материал]
```

Product breadcrumbs are category-based and never depend on the referrer. The visible HTML breadcrumb and `BreadcrumbList` JSON-LD must contain the same canonical item sequence. A discovery page links to the product's one `/catalog/[slug]` URL; it does not create a referrer-specific product hierarchy.

## Internal-link adjacency matrix

Every indexable page must have at least one crawlable inbound link from another indexable page and one useful onward path in server-rendered HTML. Anchors use descriptive Russian text.

| Source page | Required inbound source | Required destinations and onward path |
|---|---|---|
| Home | Direct entry; brand and campaign links may supplement it | `/catalog`, `/serum`, `/cream`, featured products, and every published discovery hub |
| Catalog | Home header/content | Both category listings and every published product |
| Category | Home and catalog | Its products plus relevant published concern, ingredient, and expert pages |
| Product | Catalog and primary category | Primary category; customer-facing brand page when published; relevant reviewed concern, ingredient, and expert pages; contextual marketplace actions |
| Brand | Brand hub, about, and relevant product pages | Its published products, their categories, and relevant published expert content |
| Concern | Concern hub, relevant category, or expert article | Suitable products, relevant ingredients, selection/application content, and a non-diagnostic caveat where needed |
| Ingredient | Ingredient hub, verified product, or expert article | Products containing the verified ingredient, relevant care contexts, evidence sources, and related expert content |
| Expert | Expert hub, relevant category, concern, ingredient, or product | Parent hub, related concern/ingredient pages, and products needed for the next user step |
| About | Header/footer and home trust content | Portfolio/brand hub when published, contacts, and catalog |
| Contacts | Header/footer and about | About and catalog after feedback completion or in supporting navigation |

The following discovery failures are forbidden:

- sitemap-only discovery;
- JavaScript-only discovery;
- marketplace-only discovery;
- footer-only discovery for an indexable page;
- alternate or duplicate product URLs under brand, concern, ingredient, or expert namespaces.

## Click-depth targets

| Destination class | Maximum depth from home |
|---|---:|
| Catalog/category | 1 click from home |
| Product | no more than 2 clicks from home |
| Published taxonomy root | 1 click while in navigation |
| Brand/concern/ingredient/article child | no more than 2 clicks |
| Product from a published discovery child | no more than 3 clicks from home |

## Route-chain proof

| Journey | Canonical route chain with node depth |
|---|---|
| Product type | `/` (0) → `/serum` (1) → `/catalog/copper_tripeptide` (2) → Wildberries (external) |
| Concern | `/` (0) → `/concerns` (1, after publication) → `/concerns/hair-loss-care` (2) → `/catalog/red_pepper` (3) → Wildberries (external) |
| Ingredient | `/` (0) → `/ingredients` (1, after publication) → `/ingredients/copper-tripeptide-ghk-cu` (2) → `/catalog/copper_tripeptide` (3) → Wildberries (external) |
| Brand | `/` (0) → `/brands` (1, after publication) → `/brands/neon-beard` (2) → `/catalog/ultra-lift` (3) → Ozon or Wildberries (external) |
| Expert | `/` (0) → `/expert` (1, after publication) → `/expert/choosing-scalp-serum` (2) → `/catalog/climbazole` (3) → Wildberries (external) |

The existing home-to-category-to-product paths already satisfy the two-click product target in the local release candidate. Candidate discovery chains are conditional: roots and children enter navigation and internal linking only after publication.

## Orphan and implementation checks

- An indexable page without the required inbound source or onward path is not ready for publication.
- Internal links point directly to self-canonical URLs without redirect hops.
- Navigation, contextual links, visible breadcrumbs, JSON-LD breadcrumbs, canonicals, and sitemap membership use the same hierarchy.
- Server-rendered links remain usable without client-side interaction.
