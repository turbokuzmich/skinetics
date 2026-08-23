# Phase 02 Cream Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add and locally validate the Neon Beard Ultra Lift and SkineticsLab ReneWal cream pages, a `/cream` listing, multi-brand listing copy, category-aware breadcrumbs, and complete marketplace conversion paths.

**Architecture:** Extend the Phase 01 typed catalog and generic renderers rather than creating cream-specific routes or data stores. Product constants remain the source of truth; published selectors feed listings, product static generation, metadata, breadcrumbs, sitemap entries, and marketplace actions.

**Tech Stack:** Next.js 14 App Router, React 18, strict TypeScript 5, Material UI 6, Next.js metadata and static generation, existing analytics adapters

**Spec:** `docs/refactoring/phase-02-cream-launch/DESIGN.md`

## Global Constraints

- Read `AGENTS.md` and the complete spec before beginning each task.
- The initial public catalog contains exactly five products: three Dr. Health serums, Neon Beard Ultra Lift, and SkineticsLab ReneWal.
- Skinetics is the umbrella catalog, not a product brand or checkout store.
- Preserve `/serum` and all three existing underscore-based serum URLs, canonicals, metadata, copy, and product order.
- Add only `/cream`, `/catalog/ultra-lift`, and `/catalog/renewal`.
- Use the exact approved Russian cream copy and canonical compositions from the spec.
- Do not add treatment, injection-equivalence, guaranteed-effect, absolute-safety, price, stock, rating, review, or delivery claims.
- Marketplace action order is Wildberries first, then Ozon.
- Do not emit `Product`, `Offer`, `Review`, `AggregateRating`, or `FAQPage` structured data.
- Do not add dependencies or a new test framework.
- Keep production compatibility with Node.js 24 on `linux/amd64`.
- Preserve unrelated worktree changes. Never stage `.agents/`, `docs/seo-start/`, `export.sh`, or `skills-lock.json`.
- Do not deploy or update the Ubuntu VM without a separate explicit user request.

---

### Task 1: Extend the catalog domain and integrity rules

**Files:**
- Modify: `types.ts`
- Modify: `constants.ts`
- Modify: `lib/catalogIntegrity.ts`

**Interfaces:**
- Consumes: Existing `Product`, `ProductContent`, `ProductCategory`, and `assertCatalogIntegrity()` contracts.
- Produces: `ProductFaqItem`; `ProductCategory.path: string`; `Product.barcode: string`; optional `ProductContent.suitableUse`, `precautionsHeading`, and `faq`; build-time barcode and face-cream content validation.

- [ ] **Step 1: Add the new types and run the build as a failing type check**

Modify the domain types to include these exact fields:

```ts
export type ProductFaqItem = {
  question: string;
  answer: string;
};

export type ProductCategory = {
  id: ProductCategoryId;
  name: string;
  path: string;
};

export type ProductContent = {
  overview: string;
  suitableUse?: string;
  activeComponents: string;
  featureSection: {
    heading: string;
    items: readonly string[];
  };
  application: {
    heading: string;
    instructions: string;
  };
  precautionsHeading?: string;
  precautions: string;
  faq?: readonly ProductFaqItem[];
};

export type Product = {
  id: string;
  slug: string;
  status: ProductStatus;
  brandId: BrandId;
  categoryId: ProductCategoryId;
  barcode: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  composition: string;
  volume: string;
  content: ProductContent;
  marketplaceLinks: Partial<Record<MarketplaceId, string>>;
  metadata: Metadata;
};
```

Run:

```bash
npm run build
```

Expected: FAIL because the existing category and product records do not yet provide `path` and `barcode`.

- [ ] **Step 2: Add category paths and the three existing serum barcodes**

Update the category registry:

```ts
export const productCategories: Record<ProductCategoryId, ProductCategory> = {
  serum: {
    id: "serum",
    name: "Сыворотки",
    path: "/serum",
  },
  "face-cream": {
    id: "face-cream",
    name: "Кремы для лица",
    path: "/cream",
  },
};
```

Add these fields to the matching existing product records without changing any other serum value:

```ts
barcode: "2043752266957", // red_pepper
barcode: "2043752250338", // copper_tripeptide
barcode: "4630247421137", // climbazole
```

- [ ] **Step 3: Implement barcode and cream-content integrity checks**

Add one barcode set beside the existing ID and slug sets:

```ts
const barcodes = new Set<string>();
```

Inside the product loop, after slug validation, add:

```ts
if (!/^\d{13}$/.test(product.barcode)) {
  fail(product, `malformed barcode "${product.barcode}"`);
}
if (barcodes.has(product.barcode)) {
  fail(product, `duplicate barcode "${product.barcode}"`);
}
barcodes.add(product.barcode);
```

After the existing published-content and feature-list checks, validate optional FAQ data and require the new cream sections:

```ts
if (
  product.content.faq &&
  (product.content.faq.length === 0 ||
    !product.content.faq.every(
      ({ question, answer }) => hasText(question) && hasText(answer)
    ))
) {
  fail(product, "published product has an incomplete FAQ");
}

if (product.categoryId === "face-cream") {
  if (!hasText(product.content.suitableUse)) {
    fail(product, "published face cream has no suitable-use copy");
  }
  if (!product.content.faq || product.content.faq.length === 0) {
    fail(product, "published face cream has no FAQ");
  }
}
```

- [ ] **Step 4: Run the production build**

Run:

```bash
npm run build
```

Expected: PASS with the existing three products and no new warning.

- [ ] **Step 5: Mutation-check duplicate barcode rejection**

Temporarily change the `copper_tripeptide` barcode to `2043752266957`, run:

```bash
npm run build
```

Expected: FAIL with:

```text
Invalid catalog product "copper_tripeptide": duplicate barcode "2043752266957"
```

Restore `copper_tripeptide` to `2043752250338`, rerun `npm run build`, and expect PASS.

- [ ] **Step 6: Commit the domain change**

```bash
git add types.ts constants.ts lib/catalogIntegrity.ts
git commit -m "P02: extend catalog product data"
```

---

### Task 2: Add verified cream assets and product records

**Files:**
- Create: `public/items/ultra_lift.webp`
- Create: `public/items/renewal.webp`
- Modify: `constants.ts`

**Interfaces:**
- Consumes: The extended `Product` and `ProductContent` types from Task 1; existing `brands`, `marketplaces`, and catalog integrity assertion.
- Produces: Published `ultra_lift` and `renewal` products available to every published-product selector.

- [ ] **Step 1: Download the reviewed primary images**

Run:

```bash
curl --fail --location "https://mow-basket-cdn-54.geobasket.ru/vol7689/part768970/768970852/images/big/1.webp" --output public/items/ultra_lift.webp
curl --fail --location "https://mow-basket-cdn-31.geobasket.ru/vol7711/part771142/771142529/images/big/1.webp" --output public/items/renewal.webp
file public/items/ultra_lift.webp public/items/renewal.webp
```

Expected: both downloads succeed and `file` identifies both assets as WebP images.

- [ ] **Step 2: Visually inspect both assets**

Open both files with the workspace image viewer at original detail. Confirm:

- `ultra_lift.webp` shows Neon Beard Ultra Lift, 100 мл;
- `renewal.webp` shows SkineticsLab ReneWal, 50 мл;
- the visible packaging does not introduce `эффект ботокс`, injection equivalence, guaranteed wrinkle removal, treatment, or another excluded claim.

Stop and replace the source image with a reviewed current packaging image if any check fails.

- [ ] **Step 3: Add the exact Ultra Lift record**

Append this object after the three serum records:

```ts
{
  id: "ultra_lift",
  slug: "ultra-lift",
  status: "published",
  brandId: "neon-beard",
  categoryId: "face-cream",
  barcode: "4630247421502",
  title: "Крем для лица с пептидами Ultra Lift",
  summary:
    "Крем Neon Beard с пептидами, гиалуроновой кислотой и растительными маслами для ежедневного ухода за кожей лица.",
  image: "/items/ultra_lift.webp",
  imageAlt:
    "Крем для лица с пептидами Neon Beard Ultra Lift, 100 мл",
  composition:
    "Aqua; Cetearyl Olivate; Sorbitan Olivate; SpecPed SC-AH8® (Acetyl Hexapeptide-8, GHK-Cu (Copper Tripeptide-1)); Hydroxypropyl Cyclodextrin; Syn-Ake® (Dipeptide Diaminobutyroyl Benzylamide Diacetate); Glyceryl Stearate; Shea Butter; Theobroma Cacao Seed Butter; Butyrospermum Parkii; Simmondsia Chinensis (Jojoba) Seed Oil; Ethylhexyl Stearate; Cetyl Stearyl Alcohol; Ceteareth-20; Phenoxyethanol; Ethylhexylglycerin; Hyaluronic Acid; Hydroxyethyl Urea; Semisqualane; Rosa Centifolia Flower Extract CO2; Octyldodecanol; Allantoin; EDTA; Fragrance.",
  volume: "100 мл",
  content: {
    overview:
      "Крем Neon Beard Ultra Lift предназначен для ежедневного ухода за кожей лица. Формула помогает поддерживать ощущение увлажнённости, смягчает кожу и способствует более ухоженному внешнему виду.",
    suitableUse:
      "Подходит для всех типов кожи, а также для утреннего и вечернего ухода. Крем является косметическим средством и не предполагает инъекционного или лечебного действия.",
    activeComponents:
      "В составе указаны ацетил гексапептид-8, трипептид меди-1 GHK-Cu и дипептид диаминобутироил бензиламид диацетат. Пептидные компоненты дополнены гиалуроновой кислотой, гидроксиэтилмочевиной, аллантоином, а также маслами ши, какао и жожоба для комплексного косметического ухода.",
    featureSection: {
      heading: "Формат ухода",
      items: [
        "Подходит для регулярного ухода за кожей лица утром и/или вечером.",
        "Сочетает пептидные, увлажняющие и смягчающие компоненты.",
        "Помогает поддерживать мягкость, комфорт и ухоженный вид кожи.",
      ],
    },
    application: {
      heading: "Способ применения",
      instructions:
        "Нанесите небольшое количество крема на предварительно очищенную сухую кожу лица, избегая области вокруг глаз. Равномерно распределите лёгкими массажными движениями до полного впитывания. Используйте утром и/или вечером.",
    },
    precautionsHeading: "Меры предосторожности",
    precautions:
      "Только для наружного применения. Возможна индивидуальная непереносимость компонентов. Избегайте попадания средства в глаза; при попадании тщательно промойте их водой. При появлении раздражения прекратите применение.",
    faq: [
      {
        question: "Для какого типа кожи подходит крем?",
        answer:
          "По данным актуальной карточки товара, крем подходит для всех типов кожи. При индивидуальной реакции на компоненты применение следует прекратить.",
      },
      {
        question: "Когда использовать Ultra Lift?",
        answer:
          "Крем можно использовать утром и/или вечером после очищения кожи.",
      },
      {
        question: "Можно ли наносить крем вокруг глаз?",
        answer:
          "Нет. Одобренная инструкция предусматривает нанесение на лицо с исключением области вокруг глаз.",
      },
      {
        question: "Какого результата ожидать?",
        answer:
          "Крем предназначен для регулярного косметического ухода и помогает поддерживать мягкость, увлажнённость и ухоженный вид кожи. Он не является лечебным средством и не воспроизводит действие инъекционных процедур.",
      },
    ],
  },
  marketplaceLinks: {
    wildberries:
      "https://www.wildberries.ru/catalog/768970852/detail.aspx",
    ozon: "https://www.ozon.ru/product/5223635791/",
  },
  metadata: {
    title: "Крем для лица с пептидами Ultra Lift | Neon Beard",
    description:
      "Крем Neon Beard Ultra Lift, 100 мл: пептиды, гиалуроновая кислота и растительные масла. Состав, применение и ссылки на Wildberries и Ozon.",
  },
},
```

- [ ] **Step 4: Add the exact ReneWal record**

Append this object after Ultra Lift:

```ts
{
  id: "renewal",
  slug: "renewal",
  status: "published",
  brandId: "skineticslab",
  categoryId: "face-cream",
  barcode: "4630247421458",
  title: "Крем для лица с пептидами ReneWal",
  summary:
    "Крем SkineticsLab с пептидами, производным витамина C и увлажняющими компонентами для ежедневного ухода за кожей лица.",
  image: "/items/renewal.webp",
  imageAlt:
    "Крем для лица с пептидами SkineticsLab ReneWal, 50 мл",
  composition:
    "Acetyl Hexapeptide-8; Jojoba Seed Oil; Cocos Nucifera (Coconut) Oil; 3-O-Ethyl Ascorbic Acid; GHK-Cu (Water, Butylene Glycol, Glycerin, Copper Tripeptide-1); Dipeptide Diaminobutyroyl Benzylamide Diacetate; Glyceryl Stearate; Olea Prunus Amygdalus Dulcis; Hydroxyethyl Urea; PPG-26-Buteth-26; Sodium Hyaluronate; PEG-40 Hydrogenated Castor Oil; 1,2-Hexanediol; Caprylyl Glycol; Glycine Soja Oil; Glycerin; Ethylhexyl Stearate; Panthenol; Cetyl Stearyl Alcohol; Ceteareth-20; Phenoxyethanol; Ethylhexylglycerin; Semisqualane; Octyldodecanol; Ageratum Conyzoides Leaf Extract; Xanthan Gum; Allantoin; Disodium EDTA; Fragrance; Syn-Ake®.",
  volume: "50 мл",
  content: {
    overview:
      "Крем SkineticsLab ReneWal предназначен для ежедневного ухода за кожей лица. Формула помогает поддерживать ощущение увлажнённости и комфорта, смягчает кожу и способствует более ухоженному внешнему виду.",
    suitableUse:
      "Подходит для всех типов кожи, а также для утреннего и вечернего ухода. Крем является косметическим средством и не предназначен для лечения или гарантированной коррекции возрастных изменений.",
    activeComponents:
      "В составе указаны ацетил гексапептид-8, трипептид меди-1 GHK-Cu и дипептид диаминобутироил бензиламид диацетат. Формулу дополняют производное витамина C, гиалуронат натрия, пантенол, аллантоин, а также масла жожоба и кокоса.",
    featureSection: {
      heading: "Формат ухода",
      items: [
        "Подходит для регулярного ухода за кожей лица утром и/или вечером.",
        "Сочетает пептиды с увлажняющими и смягчающими компонентами.",
        "Помогает поддерживать мягкость, комфорт и ухоженный вид кожи.",
      ],
    },
    application: {
      heading: "Способ применения",
      instructions:
        "Нанесите небольшое количество крема на предварительно очищенную сухую кожу лица, избегая области вокруг глаз. Равномерно распределите лёгкими массажными движениями до полного впитывания. Используйте утром и/или вечером.",
    },
    precautionsHeading: "Меры предосторожности",
    precautions:
      "Только для наружного применения. Возможна индивидуальная непереносимость компонентов. Избегайте попадания средства в глаза; при попадании тщательно промойте их водой. При появлении раздражения прекратите применение.",
    faq: [
      {
        question: "Для какого типа кожи подходит ReneWal?",
        answer:
          "По данным актуальной карточки товара, крем подходит для всех типов кожи. При индивидуальной реакции на компоненты применение следует прекратить.",
      },
      {
        question: "Когда использовать крем?",
        answer:
          "ReneWal можно использовать утром и/или вечером после очищения кожи.",
      },
      {
        question: "ReneWal — это бренд?",
        answer:
          "Нет. ReneWal — название крема, а его потребительский бренд — SkineticsLab.",
      },
      {
        question: "Какого результата ожидать?",
        answer:
          "Крем предназначен для регулярного косметического ухода и помогает поддерживать мягкость, увлажнённость и ухоженный вид кожи. Результат зависит от индивидуальных особенностей и регулярности ухода.",
      },
    ],
  },
  marketplaceLinks: {
    wildberries:
      "https://www.wildberries.ru/catalog/771142529/detail.aspx",
    ozon: "https://www.ozon.ru/product/5223519199/",
  },
  metadata: {
    title: "Крем для лица с пептидами ReneWal | SkineticsLab",
    description:
      "Крем SkineticsLab ReneWal, 50 мл: пептиды, производное витамина C и увлажняющие компоненты. Состав, применение и ссылки на Wildberries и Ozon.",
  },
},
```

- [ ] **Step 5: Run catalog and production checks**

Run:

```bash
git diff --check -- constants.ts public/items/ultra_lift.webp public/items/renewal.webp
npm run build
```

Expected: PASS; static generation now includes both cream product slugs, and the integrity assertion accepts both marketplace destinations and content records.

- [ ] **Step 6: Commit the product records and assets**

```bash
git add constants.ts public/items/ultra_lift.webp public/items/renewal.webp
git commit -m "P02: add cream catalog products"
```

---

### Task 3: Render product breadcrumbs, brand context, and FAQs

**Files:**
- Create: `app/_components/productBreadcrumbs.tsx`
- Create: `app/_components/productFaq.tsx`
- Modify: `app/_components/productDescription.tsx`
- Modify: `app/catalog/[id]/page.tsx`

**Interfaces:**
- Consumes: `Product`, `ProductFaqItem`, `brands`, `productCategories`, and the existing product route.
- Produces: `ProductBreadcrumbs({ product })`, `ProductFaq({ items })`, visible category-aware navigation, escaped `BreadcrumbList` JSON-LD, brand labels, and optional cream content.

- [ ] **Step 1: Add product-route references before creating the components**

Add these imports and calls to `app/catalog/[id]/page.tsx`:

```tsx
import { brands } from "@/constants";
import ProductBreadcrumbs from "@/app/_components/productBreadcrumbs";
import ProductFaq from "@/app/_components/productFaq";
```

After resolving the product:

```tsx
const brand = brands[product.brandId];
```

Inside the container, render:

```tsx
<ProductBreadcrumbs product={product} />
```

Immediately before the H1:

```tsx
<Typography variant="overline" component="div">
  {brand.name}
</Typography>
```

After the full composition paragraph:

```tsx
<ProductFaq items={product.content.faq} />
```

Run:

```bash
npm run build
```

Expected: FAIL because `productBreadcrumbs.tsx` and `productFaq.tsx` do not exist.

- [ ] **Step 2: Create the server-rendered breadcrumb component**

Create `app/_components/productBreadcrumbs.tsx`:

```tsx
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { productCategories } from "@/constants";
import type { Product } from "@/types";

const siteUrl = "https://skinetics.ru";

export default function ProductBreadcrumbs({
  product,
}: Readonly<{ product: Pick<Product, "categoryId" | "slug" | "title"> }>) {
  const category = productCategories[product.categoryId];
  const productPath = `/catalog/${product.slug}`;
  const items = [
    { name: "Главная", path: "/" },
    { name: category.name, path: category.path },
    { name: product.title, path: productPath },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: new URL(path, siteUrl).toString(),
    })),
  };

  return (
    <>
      <Breadcrumbs aria-label="Хлебные крошки" sx={{ mb: 3 }}>
        <Link component={NextLink} href="/" color="inherit">
          Главная
        </Link>
        <Link component={NextLink} href={category.path} color="inherit">
          {category.name}
        </Link>
        <Typography color="text.primary" aria-current="page">
          {product.title}
        </Typography>
      </Breadcrumbs>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
```

- [ ] **Step 3: Create the semantic FAQ renderer**

Create `app/_components/productFaq.tsx`:

```tsx
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ProductFaqItem } from "@/types";

export default function ProductFaq({
  items,
}: Readonly<{ items?: readonly ProductFaqItem[] }>) {
  if (!items?.length) {
    return null;
  }

  return (
    <Box component="section" aria-labelledby="product-faq-heading">
      <Typography id="product-faq-heading" variant="h6" component="h2">
        Вопросы и ответы
      </Typography>
      <Box component="dl" sx={{ m: 0 }}>
        {items.map(({ question, answer }) => (
          <Box key={question} sx={{ mb: 2 }}>
            <Typography component="dt" fontWeight={600}>
              {question}
            </Typography>
            <Typography component="dd" sx={{ m: 0 }}>
              {answer}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
```

- [ ] **Step 4: Render suitable-use and product-specific precaution headings**

In `ProductDescription`, insert the optional suitable-use section after the overview:

```tsx
{content.suitableUse ? (
  <>
    <Typography variant="h6" component="h2">
      Кому подходит
    </Typography>
    <Typography paragraph>{content.suitableUse}</Typography>
  </>
) : null}
```

Replace the hard-coded precaution heading with:

```tsx
<Typography variant="h6" component="h2">
  {content.precautionsHeading ?? "Важная информация"}
</Typography>
```

Use `component="h2"` for the active-components, feature, and application headings while retaining their existing visible MUI variants.

- [ ] **Step 5: Keep composition before FAQ and complete the product route**

The product content order in `app/catalog/[id]/page.tsx` must be:

```tsx
<ProductDescription content={product.content} />
<Typography variant="h6" component="h2">
  Полный состав
</Typography>
<Typography paragraph>{product.composition}</Typography>
<ProductFaq items={product.content.faq} />
```

Keep the existing image, volume, marketplace placement, static params, metadata generation, canonical generation, `dynamicParams = false`, and not-found behavior.

- [ ] **Step 6: Build and inspect generated breadcrumb HTML**

Run:

```bash
npm run build
rg -n "BreadcrumbList|Главная|Кремы для лица|catalog/ultra-lift" .next/server/app/catalog/ultra-lift.html
rg -n "BreadcrumbList|Главная|Сыворотки|catalog/red_pepper" .next/server/app/catalog/red_pepper.html
```

Expected: PASS; each generated file contains visible breadcrumb text and one `BreadcrumbList` payload with the correct category path.

- [ ] **Step 7: Commit product rendering**

```bash
git add app/_components/productBreadcrumbs.tsx app/_components/productFaq.tsx app/_components/productDescription.tsx app/catalog/[id]/page.tsx
git commit -m "P02: render product content and breadcrumbs"
```

---

### Task 4: Add the cream listing and neutral multi-brand discovery surfaces

**Files:**
- Create: `app/cream/page.tsx`
- Modify: `app/_components/catalog.tsx`
- Modify: `app/page.tsx`
- Modify: `app/catalog/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/sitemap.ts`
- Modify: `constants.ts`

**Interfaces:**
- Consumes: `getPublishedProducts()`, `getPublishedProductsByCategory()`, `brands`, category path data, and generic marketplace actions.
- Produces: A two-product `/cream` listing; five-product homepage and catalog; neutral multi-brand copy; brand/volume card context; Russian document language; navigation and sitemap links.

- [ ] **Step 1: Add explicit catalog description support and card brand context**

Extend `Catalog` props:

```tsx
export default function Catalog({
  header = "Косметика для лица, волос и кожи головы",
  description = "Skinetics объединяет средства Dr. Health, SkineticsLab и Neon Beard. Изучите назначение, состав и способ применения, затем выберите доступный маркетплейс.",
  omitDescription,
  categoryId,
}: Readonly<{
  header?: string;
  description?: string;
  omitDescription?: boolean;
  categoryId?: ProductCategoryId;
}>) {
```

Import `brands` and replace the current hard-coded Dr. Health paragraph with:

```tsx
{omitDescription ? null : (
  <Typography
    variant="h6"
    color="text.secondary"
    paddingBottom={3}
    fontWeight={400}
    lineHeight="2rem"
  >
    {description}
  </Typography>
)}
```

Add `CardContent` and render brand, volume, and summary separately between `CardHeader` and `CardActions`:

```tsx
<CardHeader
  title={product.title}
  subheader={`${brands[product.brandId].name} · ${product.volume}`}
  titleTypographyProps={{
    variant: "h6",
    lineHeight: "1.7rem",
    gutterBottom: true,
  }}
  sx={{ alignItems: "flex-start" }}
/>
<CardContent sx={{ flexGrow: 1, pt: 0 }}>
  <Typography color="text.secondary">{product.summary}</Typography>
</CardContent>
```

Remove the old use of `summary` as `CardHeader.subheader`. Keep the current grid, image behavior, details link, marketplace actions, and responsive wrapping.

- [ ] **Step 2: Add the cream listing route**

Create `app/cream/page.tsx`:

```tsx
import Box from "@mui/material/Box";
import type { Metadata } from "next";
import Catalog from "../_components/catalog";
import Metrika from "../_components/metrika";

export const metadata: Metadata = {
  title: "Кремы для лица с пептидами | Skinetics",
  description:
    "Кремы для лица Neon Beard Ultra Lift и SkineticsLab ReneWal: пептиды, состав, применение и ссылки на Wildberries и Ozon.",
  alternates: {
    canonical: "/cream",
  },
};

export default function CreamPage() {
  return (
    <Box paddingTop={8}>
      <Metrika />
      <Catalog
        header="Кремы для лица с пептидами"
        description="Кремы Neon Beard и SkineticsLab для ежедневного ухода за кожей лица. Сравните состав, формат применения и доступные маркетплейсы."
        categoryId="face-cream"
      />
    </Box>
  );
}
```

- [ ] **Step 3: Apply exact homepage and catalog metadata and copy**

Replace homepage metadata with:

```ts
export const metadata: Metadata = {
  title: "Косметика для лица, волос и кожи головы | Skinetics",
  description:
    "Каталог косметики Dr. Health, SkineticsLab и Neon Beard для ухода за лицом, волосами и кожей головы. Составы, применение и ссылки на маркетплейсы.",
  alternates: {
    canonical: "/",
  },
};
```

Keep `<Catalog />` on the homepage so it uses the approved default heading and introduction.

Replace `/catalog` metadata with:

```ts
export const metadata: Metadata = {
  title: "Каталог косметики для лица, волос и кожи головы | Skinetics",
  description:
    "Сыворотки Dr. Health и кремы для лица SkineticsLab и Neon Beard: назначение, состав, применение и переход к покупке на Wildberries или Ozon.",
  alternates: {
    canonical: "/catalog",
  },
};
```

Render its catalog with:

```tsx
<Catalog
  header="Каталог косметики Skinetics"
  description="В каталоге представлены средства для ухода за лицом, волосами и кожей головы. Сравните назначение и состав продуктов Dr. Health, SkineticsLab и Neon Beard и перейдите на Wildberries или Ozon."
/>
```

Do not alter `/serum`.

- [ ] **Step 4: Add catalog and cream navigation entries**

Update `navigation` to this top-level order while retaining the existing serum subitems:

```ts
export const navigation: NaviItem[] = [
  {
    to: "/about",
    title: "О нас",
  },
  {
    to: "/catalog",
    title: "Каталог",
  },
  {
    to: "/serum",
    title: "Сыворотки",
    subitems: products
      .filter(
        (product) =>
          product.status === "published" && product.categoryId === "serum"
      )
      .map((product) => ({
        to: `/catalog/${product.slug}`,
        title: product.title,
      })),
  },
  {
    to: "/cream",
    title: "Кремы",
  },
  {
    to: "/contacts",
    title: "Контакты",
  },
];
```

- [ ] **Step 5: Update language and sitemap**

Change the root element:

```tsx
<html lang="ru">
```

Add `/cream` to the static sitemap paths:

```ts
const indexableStaticPaths = [
  "/",
  "/catalog",
  "/serum",
  "/cream",
  "/about",
  "/contacts",
];
```

- [ ] **Step 6: Run lint and build**

Run:

```bash
npm run lint
npm run build
```

Expected: PASS with no new warning. The build output contains `/cream`, `/catalog/ultra-lift`, and `/catalog/renewal`; all established routes remain.

- [ ] **Step 7: Commit listing and SEO changes**

```bash
git add app/_components/catalog.tsx app/cream/page.tsx app/page.tsx app/catalog/page.tsx app/layout.tsx app/sitemap.ts constants.ts
git commit -m "P02: add cream discovery pages"
```

---

### Task 5: Validate the complete local release candidate

**Files:**
- Modify only if a defect is found: files changed in Tasks 1–4
- Record evidence later in Task 6: `docs/refactoring/phase-02-cream-launch/VALIDATION.md`

**Interfaces:**
- Consumes: The production build and all public Phase 02 routes.
- Produces: Evidence that the local release candidate meets routing, HTML, SEO, responsive, marketplace, and analytics requirements without sending production data.

- [ ] **Step 1: Run final static checks**

Run:

```bash
git diff --check
npm run lint
npm run build
```

Expected: all commands pass. Only the five warnings already recorded for `carousel.tsx`, `form.tsx`, and `reports.tsx` may remain; Phase 02 files introduce no warning.

- [ ] **Step 2: Start the production server on an isolated port**

Run in a persistent terminal:

```bash
npm run start -- -p 3100
```

Expected: the server reports ready at `http://localhost:3100`.

- [ ] **Step 3: Verify route status**

Run:

```bash
curl --fail --silent --show-error http://localhost:3100/
curl --fail --silent --show-error http://localhost:3100/catalog
curl --fail --silent --show-error http://localhost:3100/serum
curl --fail --silent --show-error http://localhost:3100/cream
curl --fail --silent --show-error http://localhost:3100/catalog/red_pepper
curl --fail --silent --show-error http://localhost:3100/catalog/copper_tripeptide
curl --fail --silent --show-error http://localhost:3100/catalog/climbazole
curl --fail --silent --show-error http://localhost:3100/catalog/ultra-lift
curl --fail --silent --show-error http://localhost:3100/catalog/renewal
curl --fail --silent --show-error http://localhost:3100/about
curl --fail --silent --show-error http://localhost:3100/contacts
curl --fail --silent --show-error http://localhost:3100/sitemap.xml
curl --silent --output /dev/null --write-out "%{http_code}\n" http://localhost:3100/catalog/not-a-product
```

Expected: every `--fail` request succeeds and the final command prints `404`.

- [ ] **Step 4: Verify listing counts and internal links in rendered HTML**

Save rendered HTML outside the repository:

```bash
mkdir -p /tmp/skinetics-phase-02-validation
curl --silent --show-error http://localhost:3100/ --output /tmp/skinetics-phase-02-validation/home.html
curl --silent --show-error http://localhost:3100/catalog --output /tmp/skinetics-phase-02-validation/catalog.html
curl --silent --show-error http://localhost:3100/serum --output /tmp/skinetics-phase-02-validation/serum.html
curl --silent --show-error http://localhost:3100/cream --output /tmp/skinetics-phase-02-validation/cream.html
```

Count product detail links:

```bash
rg -o 'href="/catalog/[^"]+"' /tmp/skinetics-phase-02-validation/home.html
rg -o 'href="/catalog/[^"]+"' /tmp/skinetics-phase-02-validation/catalog.html
rg -o 'href="/catalog/[^"]+"' /tmp/skinetics-phase-02-validation/serum.html
rg -o 'href="/catalog/[^"]+"' /tmp/skinetics-phase-02-validation/cream.html
```

Expected unique product destinations: homepage 5, catalog 5, serum 3, cream 2. Confirm navigation contains `/catalog`, `/serum`, and `/cream`.

- [ ] **Step 5: Verify cream metadata, copy, canonicals, and breadcrumbs**

Save both product pages:

```bash
curl --silent --show-error http://localhost:3100/catalog/ultra-lift --output /tmp/skinetics-phase-02-validation/ultra-lift.html
curl --silent --show-error http://localhost:3100/catalog/renewal --output /tmp/skinetics-phase-02-validation/renewal.html
```

Inspect required content:

```bash
rg -n 'lang="ru"|canonical|Ultra Lift|Neon Beard|Способ применения|Меры предосторожности|Вопросы и ответы|BreadcrumbList|/cream' /tmp/skinetics-phase-02-validation/ultra-lift.html
rg -n 'lang="ru"|canonical|ReneWal|SkineticsLab|Способ применения|Меры предосторожности|Вопросы и ответы|BreadcrumbList|/cream' /tmp/skinetics-phase-02-validation/renewal.html
```

Expected: each page contains its exact metadata, H1, brand, approved content, self-canonical, visible cream breadcrumb, and one `BreadcrumbList`.

Confirm forbidden structured-data terms and commercial values are absent:

```bash
rg -n '"@type":"(Product|Offer|Review|AggregateRating|FAQPage)"|"price"|"availability"|"ratingValue"|"reviewCount"' /tmp/skinetics-phase-02-validation/ultra-lift.html /tmp/skinetics-phase-02-validation/renewal.html
```

Expected: no match.

- [ ] **Step 6: Verify the sitemap**

Run:

```bash
curl --silent --show-error http://localhost:3100/sitemap.xml --output /tmp/skinetics-phase-02-validation/sitemap.xml
rg -n 'https://skinetics.ru/(catalog/ultra-lift|catalog/renewal|cream|catalog/red_pepper|catalog/copper_tripeptide|catalog/climbazole)' /tmp/skinetics-phase-02-validation/sitemap.xml
rg -n 'https://skinetics.ru/ingredients' /tmp/skinetics-phase-02-validation/sitemap.xml
```

Expected: the first search finds every new and established product/category URL; the second finds no match.

- [ ] **Step 7: Verify marketplace destinations and order**

In both cream HTML files, confirm:

```bash
rg -n 'wildberries.ru/catalog/(768970852|771142529)|ozon.ru/product/(5223635791|5223519199)|noopener noreferrer' /tmp/skinetics-phase-02-validation/ultra-lift.html /tmp/skinetics-phase-02-validation/renewal.html
```

Expected: each page contains its matching Wildberries and Ozon IDs, Wildberries occurs before Ozon, and both links use safe new-tab attributes.

- [ ] **Step 8: Perform responsive browser checks**

Open these routes in the local browser at 1280 px and 390 px widths:

- `/`;
- `/catalog`;
- `/cream`;
- `/catalog/ultra-lift`;
- `/catalog/renewal`.

At each width, confirm no horizontal overflow; images are contained; headings, composition, and FAQ remain readable; brand and volume are visible; and both marketplace buttons remain visible and usable. Confirm `/serum` still shows only the three original products.

- [ ] **Step 9: Validate analytics with local stubs**

Before clicking marketplace actions, install these local browser stubs:

```js
window.__skineticsEvents = [];
window.gtag = (...args) => window.__skineticsEvents.push(["gtag", ...args]);
window.ym = (...args) => window.__skineticsEvents.push(["ym", ...args]);
window._tmr = {
  push: (payload) => window.__skineticsEvents.push(["_tmr", payload]),
};
```

Click Wildberries and Ozon from a cream card and a product hero. Inspect `window.__skineticsEvents`.

Expected:

- Google receives `marketplace_click`;
- Yandex receives exactly one `go_wb` or `go_ozon` goal per click;
- payloads contain `ultra_lift` or `renewal`, the correct brand, marketplace, `catalog-card` or `product-hero`, and current page path;
- no personal data is present.

Repeat one click with `window.gtag` removed and one with a throwing `window.ym`; the target link must still open.

- [ ] **Step 10: Smoke-check unchanged routes and forms**

Open `/about`, `/contacts`, and `/serum`. Submit the trichologist and feedback forms with empty validation-only input.

Expected: unchanged pages render, serum metadata and products remain intact, client validation appears, no request containing customer data is sent, and no console error is introduced.

- [ ] **Step 11: Correct defects and rerun the affected validation**

For every defect, make the smallest in-scope correction in the owning file, rerun `npm run lint` and `npm run build`, repeat the failed manual check, and amend the Task 4 commit:

```bash
git add types.ts constants.ts lib/catalogIntegrity.ts app/_components/productBreadcrumbs.tsx app/_components/productFaq.tsx app/_components/productDescription.tsx app/_components/catalog.tsx app/catalog/'[id]'/page.tsx app/cream/page.tsx app/page.tsx app/catalog/page.tsx app/layout.tsx app/sitemap.ts public/items/ultra_lift.webp public/items/renewal.webp
git commit --amend --no-edit
```

Do not stage unrelated paths. If a fix belongs to an earlier focused commit and amending would mix responsibilities, create a new concise Phase 02 fix commit instead.

---

### Task 6: Record implementation validation and deployment readiness

**Files:**
- Modify: `docs/refactoring/phase-02-cream-launch/README.md`
- Modify: `docs/refactoring/phase-02-cream-launch/INPUTS.md`
- Modify: `docs/refactoring/phase-02-cream-launch/CHECKLIST.md`
- Modify: `docs/refactoring/phase-02-cream-launch/FINDINGS.md`
- Modify: `docs/refactoring/phase-02-cream-launch/VALIDATION.md`
- Modify: `docs/refactoring/phase-02-cream-launch/DESIGN.md`
- Modify: `docs/refactoring/phase-02-cream-launch/artifacts/README.md`
- Modify: `docs/refactoring/shared/product-source-of-truth.md`
- Modify: `docs/refactoring/STATUS.md`
- Modify: `docs/refactoring/LOG.md`
- Include existing Phase 02 evidence: `docs/refactoring/phase-02-cream-launch/HANDOFF.md`
- Include existing Phase 02 evidence: `docs/refactoring/phase-02-cream-launch/artifacts/live-marketplace-review-2026-08-23.md`
- Include existing Phase 02 evidence: `docs/refactoring/phase-02-cream-launch/artifacts/proposed-application-and-precautions.md`

**Interfaces:**
- Consumes: Passing evidence from Task 5 and the approved design.
- Produces: A truthful repository record that implementation is locally validated and deployment plus the 14-day production-monitoring window remain separate pending work.

- [ ] **Step 1: Review every pre-existing Phase 02 documentation diff**

Run:

```bash
git diff -- docs/refactoring/LOG.md docs/refactoring/STATUS.md docs/refactoring/phase-02-cream-launch docs/refactoring/shared/product-source-of-truth.md
```

Confirm the changes belong to Phase 02 and preserve all accepted evidence. Do not stage or rewrite `.agents/`, `docs/seo-start/`, `export.sh`, or `skills-lock.json`.

- [ ] **Step 2: Update Phase 02 status without claiming deployment**

Set the Phase 02 README state to:

```text
Implementation validated; deployment pending
```

Keep the completion date unset until production deployment. Mark product-evidence, page-design, implementation, and local-validation checklist items complete. Leave deployment date and 14-day post-launch monitoring incomplete.

- [ ] **Step 3: Record exact local validation evidence**

Replace the pending validation status with:

```text
Status: Passed locally on 2026-08-23; deployment pending
```

Record:

- `git diff --check`, lint, and production build results;
- any retained pre-existing lint warnings;
- successful route and 404 checks;
- listing counts 5/5/3/2;
- metadata, canonical, sitemap, language, and indexability checks;
- five correct breadcrumbs and absence of deferred rich-result markup;
- responsive checks at 1280 px and 390 px;
- exact marketplace pairings and Wildberries-before-Ozon order;
- stubbed analytics results and navigation-safe failure behavior;
- unchanged serum, about, contacts, and form-validation smoke checks.

Use only results actually observed in Task 5. If any item failed, keep its checkbox open and record the failure instead of writing `Passed`.

- [ ] **Step 4: Update findings, source of truth, and root status**

Record both creams as implemented and locally validated in the product source of truth. In Phase 02 findings, document the accepted composition normalization, local image verification, conservative claims treatment, `/cream`, breadcrumbs, and local validation result.

Set root status to:

```text
- **Active phase:** Phase 02 — Cream launch
- **Phase state:** Implementation validated; deployment pending
- **Current focus:** deploy the validated Phase 02 release candidate when explicitly authorized
- **Next action:** build the Linux release artifact and deploy it through the approved VM process
```

Do not mark Phase 03 active and do not claim the products are live on Skinetics.

- [ ] **Step 5: Add the implementation-validation log entry**

Add this newest entry below the log introduction:

```markdown
## 2026-08-23 — Phase 02 cream launch implementation validated

- **Phase:** 02 — Cream launch
- **Status:** Implementation validated; deployment pending
- **Summary:** Added the Neon Beard Ultra Lift and SkineticsLab ReneWal cream records, local product imagery, the `/cream` listing, neutral five-product catalog copy, category-aware breadcrumbs, metadata, sitemap entries, and two-marketplace conversion paths.
- **Evidence:** `constants.ts`, product and listing routes, shared catalog components, `public/items/`, and `docs/refactoring/phase-02-cream-launch/VALIDATION.md`.
- **Decisions:** Preserve `/serum` and existing serum URLs; order Wildberries before Ozon; emit `BreadcrumbList` but defer product rich-result markup; keep production deployment separately authorized.
- **Blockers:** Local implementation is ready. Production deployment and the 14-day post-launch monitoring window remain pending.
- **Next:** Build the approved Linux release artifact and deploy only after explicit authorization.
```

- [ ] **Step 6: Run documentation consistency checks**

Run:

```bash
rg -n "Dr\\. Health-only|structured-data approach.*require|wording blocker|No application code" docs/refactoring/phase-02-cream-launch docs/refactoring/STATUS.md docs/refactoring/LOG.md
git diff --check
```

Expected: no stale statement says the structured-data decision, application wording, or application implementation is unresolved. Historical handoff language may remain only where clearly dated as historical evidence.

- [ ] **Step 7: Commit only Phase 02 documentation**

Stage the exact in-scope documentation:

```bash
git add docs/refactoring/LOG.md docs/refactoring/STATUS.md docs/refactoring/phase-02-cream-launch docs/refactoring/shared/product-source-of-truth.md
git commit -m "P02: record cream launch validation"
```

Run:

```bash
git status --short
```

Expected: no Phase 02 implementation or documentation change remains uncommitted. The unrelated pre-existing paths remain untouched and untracked or modified exactly as they were.

---

## Deployment boundary

This implementation plan ends with a locally validated release candidate. A later explicitly authorized deployment task must use `./build.sh` to create `skinetics-release.tar.gz` in the Node.js 24 `linux/amd64` build environment, upload only that archive, supply mail credentials at runtime, verify the live routes, record the actual launch date, and begin the 14-day monitoring window. Do not infer that authorization from execution of this plan.
