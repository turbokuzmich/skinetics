# Phase 02 cream launch design

Date: 2026-08-23

Status: Approved in design review; written record awaiting confirmation

Owner: Dmitry, business owner

## Purpose

Publish two verified face creams in the Skinetics multi-brand catalog, give each product accurate Russian content and separate Wildberries and Ozon purchase paths, and make the products discoverable through the homepage, catalog, a dedicated cream listing, metadata, internal links, breadcrumbs, and the sitemap.

Phase 02 publishes exactly:

1. Neon Beard — «Крем для лица с пептидами Ultra Lift», 100 мл;
2. SkineticsLab — «Крем для лица с пептидами ReneWal», 50 мл.

Skinetics remains the umbrella catalog and acquisition site. It does not provide checkout, payment, delivery, order management, marketplace prices, stock, ratings, or reviews.

## Scope

Phase 02 includes:

- the two complete published cream records;
- verified product images stored locally;
- approved Russian product content and minimally normalized marketplace composition strings;
- Wildberries and Ozon actions in the established global order;
- homepage and full-catalog inclusion;
- a new `/cream` category listing;
- product metadata, canonicals, internal links, sitemap membership, and server-rendered breadcrumbs;
- barcode support and catalog-integrity checks;
- product- and marketplace-aware analytics validation;
- rendered HTML, responsive, indexability, and launch validation.

Phase 02 does not include:

- a complete brand hub or broader information-architecture redesign;
- new facial-care content clusters;
- permanent brand artwork or a portfolio visual redesign;
- marketplace price or availability synchronization;
- `Product`, `Offer`, `Review`, `AggregateRating`, or `FAQPage` structured data;
- changes to established serum URLs or the `/serum` listing behavior.

## Evidence and source precedence

Product identity, marketplace pairings, barcodes, volumes, primary images, and marketplace compositions come from the accepted Phase 00 evidence and the live marketplace review dated 2026-08-23. Dmitry separately approved the exact application and precaution wording for both products on 2026-08-23.

The composition strings below apply only unambiguous spelling, capitalization, and delimiter corrections to the reviewed Wildberries data. The design review accepted them as the owner-approved canonical site composition until a higher-precedence source conflicts.

When sources disagree, use this order:

1. approved current packaging and labeling;
2. manufacturer product documents and declarations;
3. written product-owner confirmation;
4. current marketplace card or seller record;
5. legacy site copy.

A later packaging or manufacturer conflict must be reviewed and must supersede the affected site value before publication or continued use.

## Chosen architecture

Extend the Phase 01 typed catalog and generic product route. Do not introduce cream-specific page branches or a second product data source.

Two alternatives were rejected:

1. Making every new content field mandatory for all published products would force unrelated serum-content work into Phase 02.
2. Rendering the creams through special-case routes or components would bypass the accepted shared catalog model and duplicate routing, marketplace, metadata, and validation behavior.

### Domain model changes

Add required `barcode: string` to `Product`. Add the following verified values to all five records:

| Product ID | Barcode |
|---|---|
| `red_pepper` | `2043752266957` |
| `copper_tripeptide` | `2043752250338` |
| `climbazole` | `4630247421137` |
| `ultra_lift` | `4630247421502` |
| `renewal` | `4630247421458` |

Add a public listing path to each `ProductCategory`:

- `serum` uses `/serum`;
- `face-cream` uses `/cream`.

Extend `ProductContent` with:

- optional suitable-use text;
- an optional precaution heading, defaulting to the existing serum heading when absent;
- optional structured FAQ entries containing a non-empty question and answer.

Published face creams must contain suitable-use text and at least one complete FAQ entry. Existing serum records remain valid without those additions and retain their current public copy.

### Catalog records

| Field | Ultra Lift | ReneWal |
|---|---|---|
| Internal ID | `ultra_lift` | `renewal` |
| Public slug | `ultra-lift` | `renewal` |
| Status | `published`; deployment is gated by launch validation | `published`; deployment is gated by launch validation |
| Brand | `neon-beard` / Neon Beard | `skineticslab` / SkineticsLab |
| Category | `face-cream` | `face-cream` |
| Barcode | `4630247421502` | `4630247421458` |
| Volume | `100 мл` | `50 мл` |
| Local image | `/items/ultra_lift.webp` | `/items/renewal.webp` |
| Wildberries | `https://www.wildberries.ru/catalog/768970852/detail.aspx` | `https://www.wildberries.ru/catalog/771142529/detail.aspx` |
| Ozon | `https://www.ozon.ru/product/5223635791/` | `https://www.ozon.ru/product/5223519199/` |

The local images come from the reviewed Wildberries primary-image sources:

- Ultra Lift: `https://mow-basket-cdn-54.geobasket.ru/vol7689/part768970/768970852/images/big/1.webp`;
- ReneWal: `https://mow-basket-cdn-31.geobasket.ru/vol7711/part771142/771142529/images/big/1.webp`.

Before publication, visually confirm that each local file shows the correct current product and brand, has no excluded claim text, and renders cleanly at desktop and mobile sizes.

## Product content

All copy describes cosmetic care. It does not claim treatment, injection equivalence, guaranteed wrinkle removal, structural skin change, or a guaranteed time to result.

### Neon Beard Ultra Lift

**Title and H1**

> Крем для лица с пептидами Ultra Lift

**Brand label**

> Neon Beard

**Image alternative text**

> Крем для лица с пептидами Neon Beard Ultra Lift, 100 мл

**Summary**

> Крем Neon Beard с пептидами, гиалуроновой кислотой и растительными маслами для ежедневного ухода за кожей лица.

**Purpose**

> Крем Neon Beard Ultra Lift предназначен для ежедневного ухода за кожей лица. Формула помогает поддерживать ощущение увлажнённости, смягчает кожу и способствует более ухоженному внешнему виду.

**Suitable use**

> Подходит для всех типов кожи, а также для утреннего и вечернего ухода. Крем является косметическим средством и не предполагает инъекционного или лечебного действия.

**Active components**

> В составе указаны ацетил гексапептид-8, трипептид меди-1 GHK-Cu и дипептид диаминобутироил бензиламид диацетат. Пептидные компоненты дополнены гиалуроновой кислотой, гидроксиэтилмочевиной, аллантоином, а также маслами ши, какао и жожоба для комплексного косметического ухода.

**Feature section — «Формат ухода»**

- Подходит для регулярного ухода за кожей лица утром и/или вечером.
- Сочетает пептидные, увлажняющие и смягчающие компоненты.
- Помогает поддерживать мягкость, комфорт и ухоженный вид кожи.

**Application — «Способ применения»**

> Нанесите небольшое количество крема на предварительно очищенную сухую кожу лица, избегая области вокруг глаз. Равномерно распределите лёгкими массажными движениями до полного впитывания. Используйте утром и/или вечером.

**Precautions — «Меры предосторожности»**

> Только для наружного применения. Возможна индивидуальная непереносимость компонентов. Избегайте попадания средства в глаза; при попадании тщательно промойте их водой. При появлении раздражения прекратите применение.

**Composition**

> Aqua; Cetearyl Olivate; Sorbitan Olivate; SpecPed SC-AH8® (Acetyl Hexapeptide-8, GHK-Cu (Copper Tripeptide-1)); Hydroxypropyl Cyclodextrin; Syn-Ake® (Dipeptide Diaminobutyroyl Benzylamide Diacetate); Glyceryl Stearate; Shea Butter; Theobroma Cacao Seed Butter; Butyrospermum Parkii; Simmondsia Chinensis (Jojoba) Seed Oil; Ethylhexyl Stearate; Cetyl Stearyl Alcohol; Ceteareth-20; Phenoxyethanol; Ethylhexylglycerin; Hyaluronic Acid; Hydroxyethyl Urea; Semisqualane; Rosa Centifolia Flower Extract CO2; Octyldodecanol; Allantoin; EDTA; Fragrance.

This normalization corrects `Copper Trepeptide-1`, `Shea Batter`, and `Simmonsa Chinensis`, and normalizes punctuation and capitalization. It does not add or remove an ingredient.

**FAQ**

1. **Для какого типа кожи подходит крем?** По данным актуальной карточки товара, крем подходит для всех типов кожи. При индивидуальной реакции на компоненты применение следует прекратить.
2. **Когда использовать Ultra Lift?** Крем можно использовать утром и/или вечером после очищения кожи.
3. **Можно ли наносить крем вокруг глаз?** Нет. Одобренная инструкция предусматривает нанесение на лицо с исключением области вокруг глаз.
4. **Какого результата ожидать?** Крем предназначен для регулярного косметического ухода и помогает поддерживать мягкость, увлажнённость и ухоженный вид кожи. Он не является лечебным средством и не воспроизводит действие инъекционных процедур.

### SkineticsLab ReneWal

**Title and H1**

> Крем для лица с пептидами ReneWal

**Brand label**

> SkineticsLab

**Image alternative text**

> Крем для лица с пептидами SkineticsLab ReneWal, 50 мл

**Summary**

> Крем SkineticsLab с пептидами, производным витамина C и увлажняющими компонентами для ежедневного ухода за кожей лица.

**Purpose**

> Крем SkineticsLab ReneWal предназначен для ежедневного ухода за кожей лица. Формула помогает поддерживать ощущение увлажнённости и комфорта, смягчает кожу и способствует более ухоженному внешнему виду.

**Suitable use**

> Подходит для всех типов кожи, а также для утреннего и вечернего ухода. Крем является косметическим средством и не предназначен для лечения или гарантированной коррекции возрастных изменений.

**Active components**

> В составе указаны ацетил гексапептид-8, трипептид меди-1 GHK-Cu и дипептид диаминобутироил бензиламид диацетат. Формулу дополняют производное витамина C, гиалуронат натрия, пантенол, аллантоин, а также масла жожоба и кокоса.

**Feature section — «Формат ухода»**

- Подходит для регулярного ухода за кожей лица утром и/или вечером.
- Сочетает пептиды с увлажняющими и смягчающими компонентами.
- Помогает поддерживать мягкость, комфорт и ухоженный вид кожи.

**Application — «Способ применения»**

> Нанесите небольшое количество крема на предварительно очищенную сухую кожу лица, избегая области вокруг глаз. Равномерно распределите лёгкими массажными движениями до полного впитывания. Используйте утром и/или вечером.

**Precautions — «Меры предосторожности»**

> Только для наружного применения. Возможна индивидуальная непереносимость компонентов. Избегайте попадания средства в глаза; при попадании тщательно промойте их водой. При появлении раздражения прекратите применение.

**Composition**

> Acetyl Hexapeptide-8; Jojoba Seed Oil; Cocos Nucifera (Coconut) Oil; 3-O-Ethyl Ascorbic Acid; GHK-Cu (Water, Butylene Glycol, Glycerin, Copper Tripeptide-1); Dipeptide Diaminobutyroyl Benzylamide Diacetate; Glyceryl Stearate; Olea Prunus Amygdalus Dulcis; Hydroxyethyl Urea; PPG-26-Buteth-26; Sodium Hyaluronate; PEG-40 Hydrogenated Castor Oil; 1,2-Hexanediol; Caprylyl Glycol; Glycine Soja Oil; Glycerin; Ethylhexyl Stearate; Panthenol; Cetyl Stearyl Alcohol; Ceteareth-20; Phenoxyethanol; Ethylhexylglycerin; Semisqualane; Octyldodecanol; Ageratum Conyzoides Leaf Extract; Xanthan Gum; Allantoin; Disodium EDTA; Fragrance; Syn-Ake®.

This normalization corrects `1,2-Hexandiol`, `Copper tripeptide-1`, `Ceteareth 20`, and `sun ake`, and separates ingredients joined by missing delimiters. The ambiguous marketplace fragment `Olea Prunus Amygdalus Dulcis` remains unchanged rather than being guessed.

**FAQ**

1. **Для какого типа кожи подходит ReneWal?** По данным актуальной карточки товара, крем подходит для всех типов кожи. При индивидуальной реакции на компоненты применение следует прекратить.
2. **Когда использовать крем?** ReneWal можно использовать утром и/или вечером после очищения кожи.
3. **ReneWal — это бренд?** Нет. ReneWal — название крема, а его потребительский бренд — SkineticsLab.
4. **Какого результата ожидать?** Крем предназначен для регулярного косметического ухода и помогает поддерживать мягкость, увлажнённость и ухоженный вид кожи. Результат зависит от индивидуальных особенностей и регулярности ухода.

## Listings and navigation

### Homepage

The homepage lists all five published products. Keep the current carousel unchanged.

**H1**

> Косметика для лица, волос и кожи головы

**Introduction**

> Skinetics объединяет средства Dr. Health, SkineticsLab и Neon Beard. Изучите назначение, состав и способ применения, затем выберите доступный маркетплейс.

### Full catalog

`/catalog` lists the same five published products.

**H1**

> Каталог косметики Skinetics

**Introduction**

> В каталоге представлены средства для ухода за лицом, волосами и кожей головы. Сравните назначение и состав продуктов Dr. Health, SkineticsLab и Neon Beard и перейдите на Wildberries или Ozon.

### Serum listing

`/serum` remains the navigation-facing Dr. Health serum listing. It continues to contain the same three products with its existing metadata, heading, filtering, content, and order.

### Cream listing

Add `/cream` as the navigation-facing face-cream listing. It contains only Ultra Lift and ReneWal, selected through the shared `face-cream` category.

**H1**

> Кремы для лица с пептидами

**Introduction**

> Кремы Neon Beard и SkineticsLab для ежедневного ухода за кожей лица. Сравните состав, формат применения и доступные маркетплейсы.

### Navigation and cards

Add `Каталог` linking to `/catalog` and `Кремы` linking to `/cream` to both desktop and mobile navigation. Preserve `Сыворотки` linking to `/serum`.

Homepage, catalog, and category cards link to the corresponding product page. Each card displays the resolved customer-facing brand and volume separately from the product title and summary. Marketplace actions remain Wildberries first and Ozon second according to the global marketplace registry.

## Metadata and indexability

### Listing metadata

| Route | Title | Description |
|---|---|---|
| `/` | `Косметика для лица, волос и кожи головы \| Skinetics` | `Каталог косметики Dr. Health, SkineticsLab и Neon Beard для ухода за лицом, волосами и кожей головы. Составы, применение и ссылки на маркетплейсы.` |
| `/catalog` | `Каталог косметики для лица, волос и кожи головы \| Skinetics` | `Сыворотки Dr. Health и кремы для лица SkineticsLab и Neon Beard: назначение, состав, применение и переход к покупке на Wildberries или Ozon.` |
| `/cream` | `Кремы для лица с пептидами \| Skinetics` | `Кремы для лица Neon Beard Ultra Lift и SkineticsLab ReneWal: пептиды, состав, применение и ссылки на Wildberries и Ozon.` |

Keep `/serum` metadata unchanged. Every listing keeps its self-referencing canonical.

### Product metadata

| Route | Title | Description |
|---|---|---|
| `/catalog/ultra-lift` | `Крем для лица с пептидами Ultra Lift \| Neon Beard` | `Крем Neon Beard Ultra Lift, 100 мл: пептиды, гиалуроновая кислота и растительные масла. Состав, применение и ссылки на Wildberries и Ozon.` |
| `/catalog/renewal` | `Крем для лица с пептидами ReneWal \| SkineticsLab` | `Крем SkineticsLab ReneWal, 50 мл: пептиды, производное витамина C и увлажняющие компоненты. Состав, применение и ссылки на Wildberries и Ozon.` |

Each product has exactly one H1, its exact self-referencing canonical, rendered copy, and static generation through the published-product selector. Add `/cream` and both product URLs to the sitemap without removing any established route. Keep `/ingredients` excluded from the sitemap and `noindex, follow`.

Change the root document language from `en` to `ru`.

## Breadcrumbs and structured data

Every published product page renders one visible category-aware breadcrumb trail and a matching `BreadcrumbList` JSON-LD script from the same server-side data:

- serum pages: `Главная / Сыворотки / [название продукта]` using `/`, `/serum`, and the product canonical;
- cream pages: `Главная / Кремы для лица / [название продукта]` using `/`, `/cream`, and the product canonical.

Use absolute `https://skinetics.ru` URLs in JSON-LD. Safely escape HTML-significant characters in the serialized payload. The component is server-rendered, so visible breadcrumbs and JSON-LD are present in generated HTML without client hydration.

Do not emit `Product` rich-result markup in Phase 02. Skinetics has no accurate first-party `offers`, `review`, or `aggregateRating` data, and marketplace price or availability must not be copied into permanent structured data. Do not emit FAQ rich-result markup.

## Product-page rendering

The generic product page resolves and displays the customer-facing brand before the product H1. It renders, in order:

1. visible breadcrumb;
2. brand label and product H1;
3. image, volume, and ordered marketplace actions;
4. purpose;
5. suitable-use section when present;
6. active components;
7. feature list;
8. application;
9. product-specific precaution heading and text;
10. full composition;
11. FAQ when present.

The cream FAQ is semantic, server-rendered content and does not depend on the existing unused client-side FAQ component.

## Marketplace actions and analytics

Both cream records contain verified Wildberries and Ozon URLs. The existing marketplace registry determines action order and labels:

1. Wildberries;
2. Ozon.

Cards use `catalog-card`; product heroes use `product-hero`. Every click sends the established semantic payload:

- `product_id`;
- `brand_id`;
- `marketplace`;
- `placement`;
- `page_path`;
- normalized `campaign` when available.

Yandex Metrica receives `go_wb` or `go_ozon`, Google Analytics receives `marketplace_click`, and Mail.ru receives its compatibility goal. Analytics absence or failure must not delay or cancel navigation. External destinations continue opening in a new tab with safe `rel` attributes.

## Integrity and failure handling

The catalog-integrity assertion fails the production build with a product-specific message for all existing Phase 01 conditions and these additions:

- a missing or malformed barcode;
- duplicate barcodes;
- missing suitable-use copy on a published face cream;
- an empty or incomplete FAQ on a published face cream;
- a malformed optional FAQ entry on any product.

Barcode format is exactly 13 decimal digits. Barcode values remain strings so leading zeroes cannot be lost.

At runtime:

- an unknown or unpublished slug returns 404;
- a missing marketplace link is omitted rather than rendered as unavailable;
- analytics failures are ignored after safe local handling;
- all product images use local public assets rather than marketplace CDN URLs;
- no volatile marketplace commercial data is stored or rendered.

## Validation

### Automated and build checks

- run `git diff --check`;
- run `npm run lint` and introduce no new warning;
- run `npm run build` and confirm type checking, integrity checks, and static generation pass;
- confirm the build adds `/cream`, `/catalog/ultra-lift`, and `/catalog/renewal` without removing an established route.

### Routes, rendered HTML, and SEO

Verify HTTP 200 for:

- `/`;
- `/catalog`;
- `/serum`;
- `/cream`;
- all five product URLs;
- `/about`;
- `/contacts`;
- `/sitemap.xml`.

Verify an unknown product slug returns 404. Compare live and generated HTML for unique titles, descriptions, H1s, self-referencing canonicals, `lang="ru"`, complete cream copy, image alternatives, indexability, and server-rendered breadcrumbs.

Confirm listing counts:

- homepage: five;
- `/catalog`: five;
- `/serum`: three;
- `/cream`: two.

Confirm the sitemap contains `/cream` and both cream product URLs, preserves the established static and serum-product URLs, and excludes `/ingredients`.

For all five product pages, verify the three-level `BreadcrumbList` has the correct category path and canonical product URL. Confirm no `Product`, `Offer`, price, availability, rating, review, or FAQ markup is present.

### Product and marketplace accuracy

For each cream, verify:

- canonical name, brand, volume, and barcode;
- exact approved copy and canonical composition;
- correct local image and alternative text;
- image text contains no excluded medical, guaranteed, or injection-equivalence claim;
- Wildberries and Ozon URLs open the intended matching product;
- Wildberries renders before Ozon;
- actions open in a new tab with safe `rel` attributes.

Do not record live prices, stock, ratings, review counts, or delivery details during validation.

### Responsive and analytics validation

Check homepage, catalog, cream listing, and both cream pages at desktop width and 390 px mobile width. Confirm no horizontal overflow, readable content, correct image containment, visible marketplace labels, and usable actions.

Use local stub implementations of `ym`, `gtag`, and `_tmr` so validation does not pollute production analytics. Confirm for both products and both marketplaces:

- one dispatch per analytics adapter and click;
- `go_wb` for Wildberries and `go_ozon` for Ozon;
- correct product, brand, marketplace, placement, and page path;
- campaign inclusion only when acceptable;
- successful navigation when an analytics global is absent or throws.

Smoke-check the unchanged serum routes, `/about`, `/contacts`, and both forms with validation-only input and no real customer data.

## Documentation and launch monitoring

After implementation, update the Phase 02 checklist, findings, validation record, README, root status, product source of truth, and append-only refactoring log. Record the deployment date and monitor indexability plus marketplace-click delivery for 14 days after deployment.

Phase 02 is complete only when both creams are published with verified evidence, all validation passes, documentation records the result, and no unrelated worktree changes are included.

## Related records

- [Phase 02 handoff](./HANDOFF.md)
- [Phase 02 inputs](./INPUTS.md)
- [Phase 02 checklist](./CHECKLIST.md)
- [Phase 02 findings](./FINDINGS.md)
- [Cream application and precautions](./artifacts/proposed-application-and-precautions.md)
- [Live marketplace review](./artifacts/live-marketplace-review-2026-08-23.md)
- [Product source of truth](../shared/product-source-of-truth.md)
- [Claims policy](../shared/claims-policy.md)
- [Phase 01 catalog design](../phase-01-catalog-foundation/DESIGN.md)
