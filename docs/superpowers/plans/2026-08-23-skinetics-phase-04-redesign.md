# Skinetics Phase 04 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement and locally validate the approved navigational-editorial Skinetics redesign across every existing public template while preserving URLs, server-rendered content, analytics, marketplace behavior, and all files under `public/video/`.

**Architecture:** Keep Next.js App Router and Material UI, but replace the inherited landing-page theme with a small semantic token system and focused server-first components. Limit client boundaries to mobile navigation, forms, and analytics-enhanced marketplace actions; use the same product, listing, and shell components across all five products and current routes. Document future gated template composition without publishing brand, concern, ingredient, or expert routes.

**Tech Stack:** Next.js 14.2, React 18, strict TypeScript 5, Material UI 6, `next/font`, `next/image`, Vitest, Testing Library, jsdom, Lighthouse, existing Zod schemas and analytics adapters

**Spec:** `docs/refactoring/phase-04-redesign/DESIGN.md`

## Global Constraints

- Read `AGENTS.md` and the complete spec before beginning every task.
- Skinetics is the umbrella catalog and acquisition site. Dr. Health, SkineticsLab, and Neon Beard are product brands; ООО «Демидов Люкс СПА» is the legal/company identity.
- Keep checkout, payment, delivery, and order management on Wildberries or Ozon.
- Preserve `/`, `/catalog`, `/serum`, `/cream`, `/about`, `/contacts`, all five `/catalog/[slug]` URLs, their canonicals, and sitemap membership.
- Keep `/ingredients` `noindex, follow`, absent from primary navigation and sitemap. Do not create or expose brand, concern, ingredient-child, or expert routes.
- Do not alter accepted product facts, compositions, application, precautions, FAQ, claims-sensitive wording, marketplace URLs, or marketplace order except for the three approved serum image paths.
- Do not introduce treatment, prevention, cure, guaranteed-effect, absolute-safety, price, stock, rating, review-count, or delivery claims.
- Preserve the complete `marketplace_click` payload and existing Yandex compatibility goals. Analytics failure must never prevent marketplace navigation.
- Form analytics fires only after a successful API response. Failed submissions retain values and show a generic actionable error.
- Use Literata for display headings and Manrope for body/interface text, with Cyrillic and Latin subsets and only weights 400 and 500.
- Target WCAG 2.2 AA, 44 by 44 CSS pixel interactive targets, reduced motion, and responsive layouts at 390, 768, 1280, and 1440 px.
- Mobile Lighthouse performance and accessibility targets are at least 90 on the recorded local production-build run.
- Remove homepage video requests and carousel code, but do not delete, rename, recompress, or modify any file under `public/video/`.
- Refresh all three serum presentation images from the verified last gallery slide on the exact current Wildberries product cards. Preserve the downloaded source bytes and the three existing PNG files.
- Keep Node.js 24 and `linux/amd64` production compatibility. Do not change Docker or deployment architecture.
- Preserve unrelated worktree changes. Never stage `.dockerignore`, `.agents/`, `docs/seo-start/`, `export.sh`, or `skills-lock.json`.
- Do not build a release archive, deploy, modify the Ubuntu VM, or start the Phase 02 monitoring window without separate authorization.

---

### Task 1: Add the test harness and design-system foundation

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `app/designTokens.ts`
- Create: `app/designTokens.test.ts`
- Create: `app/fonts.ts`
- Modify: `app/theme.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Delete: `app/getLPTheme.tsx`

**Interfaces:**
- Consumes: The exact typography, palette, spacing, focus, radius, and motion decisions in the spec.
- Produces: `skinColors`, `brandAccents`, `skinRadii`, and `skinSpacing`; CSS font variables `--font-manrope` and `--font-literata`; a focused MUI theme; `npm test` and `npm run test:watch`.

- [ ] **Step 1: Install and configure the focused test toolchain**

Run:

```bash
npm install --save-dev vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event lighthouse
```

Add these scripts to `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

Create `vitest.config.ts`:

```ts
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

Create `vitest.setup.ts` with DOM cleanup, stable media-query behavior, and framework mocks:

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, vi } from "vitest";

afterEach(() => cleanup());

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("next/image", () => ({
  default: ({ alt, fill: _fill, priority: _priority, ...props }: Record<string, unknown>) =>
    React.createElement("img", { alt, ...props }),
}));
```

- [ ] **Step 2: Write the failing token contract**

Create `app/designTokens.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { brandAccents, skinColors, skinRadii, skinSpacing } from "./designTokens";

describe("Phase 04 design tokens", () => {
  it("exposes the approved navigational-editorial palette", () => {
    expect(skinColors).toEqual({
      canvas: "#F5F1E8",
      surface: "#FBF8F0",
      ink: "#17221E",
      mutedInk: "#46534D",
      border: "#D8D0C2",
      clay: "#A5563B",
      botanical: "#657A68",
      focus: "#005FCC",
    });
  });

  it("keeps all brand accents text-backed and centrally named", () => {
    expect(brandAccents).toEqual({
      "dr-health": "#657A68",
      skineticslab: "#315C70",
      "neon-beard": "#8C3F51",
    });
  });

  it("uses the approved 4px spacing base and modest radii", () => {
    expect(skinSpacing(4)).toBe("16px");
    expect(skinRadii).toEqual({ small: 4, medium: 8, large: 16 });
  });
});
```

- [ ] **Step 3: Run the focused test and verify it fails**

Run:

```bash
npm test -- app/designTokens.test.ts
```

Expected: FAIL because `app/designTokens.ts` does not exist.

- [ ] **Step 4: Implement tokens and Cyrillic font exports**

Create `app/designTokens.ts` with the exact objects asserted above and:

```ts
export const skinSpacing = (units: number) => `${units * 4}px`;
```

Create `app/fonts.ts`:

```ts
import { Literata, Manrope } from "next/font/google";

export const manrope = Manrope({
  display: "swap",
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  weight: ["400", "500"],
});

export const literata = Literata({
  display: "swap",
  subsets: ["cyrillic", "latin"],
  variable: "--font-literata",
  weight: ["400", "500"],
});
```

- [ ] **Step 5: Replace the inherited theme with the focused Skinetics theme**

Rewrite `app/theme.ts` so `createTheme()` consumes `skinColors` and defines:

```ts
typography: {
  fontFamily: "var(--font-manrope), Arial, sans-serif",
  h1: { fontFamily: "var(--font-literata), Georgia, serif", fontWeight: 400 },
  h2: { fontFamily: "var(--font-literata), Georgia, serif", fontWeight: 400 },
  h3: { fontFamily: "var(--font-literata), Georgia, serif", fontWeight: 400 },
  button: { fontWeight: 500, textTransform: "none" },
},
palette: {
  mode: "light",
  primary: { main: skinColors.ink, contrastText: skinColors.surface },
  secondary: { main: skinColors.clay },
  background: { default: skinColors.canvas, paper: skinColors.surface },
  text: { primary: skinColors.ink, secondary: skinColors.mutedInk },
  divider: skinColors.border,
},
```

Add focused overrides for `MuiButton`, `MuiCard`, `MuiLink`, `MuiTextField`, `MuiDrawer`, and `MuiButtonBase`. Every `MuiButtonBase` focus-visible state uses `3px solid ${skinColors.focus}` with a 2 px offset, every large button has a minimum height of 44 px, and cards use thin borders without decorative shadows. Delete `app/getLPTheme.tsx` after no import references remain.

- [ ] **Step 6: Apply fonts and global accessibility behavior**

Import `literata` and `manrope` in `app/layout.tsx` and set:

```tsx
<body className={`${manrope.variable} ${literata.variable}`}>
```

Update `app/globals.css` with:

```css
html {
  scroll-behavior: smooth;
}

body {
  -webkit-tap-highlight-color: transparent;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 7: Run the foundation checks**

Run:

```bash
npm test -- app/designTokens.test.ts
npm run lint
npm run build
```

Expected: all three commands PASS; the production build lists the same routes as before.

- [ ] **Step 8: Commit the foundation**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.ts app/designTokens.ts app/designTokens.test.ts app/fonts.ts app/theme.ts app/globals.css app/layout.tsx app/getLPTheme.tsx
git commit -m "P04: establish design system"
```

---

### Task 2: Build the accessible site shell and navigation

**Files:**
- Create: `app/_components/wordmark.tsx`
- Create: `app/_components/siteHeader.tsx`
- Create: `app/_components/mobileNavigation.tsx`
- Create: `app/_components/siteFooter.tsx`
- Create: `app/_components/siteShell.test.tsx`
- Modify: `app/layout.tsx`
- Modify: `constants.ts`
- Delete: `app/_components/appBar.tsx`
- Delete: `app/_components/foot.tsx`
- Delete: `app/_components/logo.tsx`

**Interfaces:**
- Consumes: `navigation: NaviItem[]`, `DoctorForm`, accepted Phase 03 link order and publication gates.
- Produces: `Wordmark`, `SiteHeader`, `MobileNavigation`, `SiteFooter`; exactly one global `main`; keyboard-accessible mobile navigation with MUI focus trapping and restoration.

- [ ] **Step 1: Write failing shell tests**

Create `app/_components/siteShell.test.tsx`:

```tsx
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SiteFooter from "./siteFooter";
import SiteHeader from "./siteHeader";

const expectedLinks = ["Каталог", "Сыворотки", "Кремы", "О нас", "Контакты"];

describe("site shell", () => {
  it("renders the accepted desktop navigation in order", () => {
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Основная навигация" });
    expect(within(nav).getAllByRole("link").map((link) => link.textContent)).toEqual(expectedLinks);
    expect(within(nav).queryByText(/Бренды|Ингредиенты|По задачам|Экспертные/)).not.toBeInTheDocument();
  });

  it("opens and closes the same navigation from the mobile menu", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: "Открыть меню" }));
    expect(screen.getByRole("navigation", { name: "Мобильная навигация" })).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Мобильная навигация" })).not.toBeVisible();
  });

  it("groups only published destinations in the footer", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "Все средства" })).toHaveAttribute("href", "/catalog");
    expect(within(footer).queryByText(/Ингредиенты|Экспертные материалы/)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests and verify the new boundaries are absent**

```bash
npm test -- app/_components/siteShell.test.tsx
```

Expected: FAIL because `siteHeader.tsx` and `siteFooter.tsx` do not exist.

- [ ] **Step 3: Correct the public navigation registry**

Replace `navigation` in `constants.ts` with exactly:

```ts
export const navigation: NaviItem[] = [
  { to: "/catalog", title: "Каталог" },
  { to: "/serum", title: "Сыворотки" },
  { to: "/cream", title: "Кремы" },
  { to: "/about", title: "О нас" },
  { to: "/contacts", title: "Контакты" },
];
```

- [ ] **Step 4: Implement the text-first identity and desktop header**

`Wordmark` renders the text `Skinetics` in a non-heading span using the Literata variable and does not include `Lab`. `SiteHeader` renders:

```tsx
<AppBar component="header" position="sticky" color="transparent" elevation={0}>
  <Container maxWidth="lg">
    <Toolbar disableGutters>
      <Link component={NextLink} href="/" aria-label="Skinetics, главная">
        <Wordmark />
      </Link>
      <Box component="nav" aria-label="Основная навигация">
        {navigation.map(({ to, title }) => (
          <Link component={NextLink} href={to} key={to}>{title}</Link>
        ))}
      </Box>
      <MobileNavigation items={navigation} />
    </Toolbar>
  </Container>
</AppBar>
```

Desktop navigation is hidden below `md`; the mobile trigger is hidden at and above `md`. The header uses an opaque surface and thin bottom border, not blur or glass styling.

- [ ] **Step 5: Implement the client-only mobile navigation**

`MobileNavigation` accepts:

```ts
type Props = Readonly<{ items: readonly NaviItem[] }>;
```

Use a 44 px `IconButton` named `Открыть меню`, MUI `Drawer`, a visible `Меню` heading, a `Закрыть меню` button, and:

```tsx
<Box component="nav" aria-label="Мобильная навигация">
  {items.map(({ to, title }) => (
    <Link component={NextLink} href={to} onClick={() => setOpen(false)} key={to}>
      {title}
    </Link>
  ))}
</Box>
```

Rely on MUI Drawer for focus trap, Escape close, background blocking, and trigger-focus restoration; do not implement a second focus manager.

- [ ] **Step 6: Implement the grouped footer**

`SiteFooter` renders `component="footer"` and these published groups:

```ts
const catalogLinks = [
  { title: "Все средства", to: "/catalog" },
  { title: "Сыворотки", to: "/serum" },
  { title: "Кремы", to: "/cream" },
];

const skineticsLinks = [
  { title: "О нас", to: "/about" },
  { title: "Контакты", to: "/contacts" },
];
```

Add a short note: `Skinetics помогает выбрать средство, а покупка и доставка оформляются на Wildberries или Ozon.` Keep `DoctorForm` in a separate section headed `Записаться к трихологу` and retain its `Suspense` boundary.

- [ ] **Step 7: Install the shell in the root layout**

In `app/layout.tsx`:

```tsx
<a className="skip-link" href="#main-content">Перейти к содержанию</a>
<SiteHeader />
<main id="main-content">{children}</main>
<SiteFooter />
```

Set the root fallback title to `Skinetics`, remove the generic Stack/Box/Divider shell, and add skip-link styles to `globals.css` that reveal it on focus.

- [ ] **Step 8: Run shell tests and production checks**

```bash
npm test -- app/_components/siteShell.test.tsx
npm run lint
npm run build
```

Expected: PASS. The build exposes no new route and `/ingredients` remains absent from sitemap/navigation.

- [ ] **Step 9: Commit the shell**

```bash
git add constants.ts app/layout.tsx app/globals.css app/_components/wordmark.tsx app/_components/siteHeader.tsx app/_components/mobileNavigation.tsx app/_components/siteFooter.tsx app/_components/siteShell.test.tsx app/_components/appBar.tsx app/_components/foot.tsx app/_components/logo.tsx
git commit -m "P04: redesign site shell"
```

---

### Task 3: Build reusable product media, cards, and listings

**Files:**
- Create: `app/_components/productMedia.tsx`
- Create: `app/_components/sectionHeading.tsx`
- Create: `app/_components/productCard.tsx`
- Create: `app/_components/productCard.test.tsx`
- Modify: `app/_components/catalog.tsx`
- Modify: `app/_components/marketplaceActions.tsx`
- Modify: `app/_components/marketplaceActionButton.tsx`
- Modify: `app/catalog/page.tsx`
- Modify: `app/serum/page.tsx`
- Modify: `app/cream/page.tsx`

**Interfaces:**
- Consumes: `Product`, `BrandId`, `getAvailableMarketplaces()`, existing marketplace analytics props.
- Produces: `ProductMedia({ product, priority?, sizes? })`, `SectionHeading({ eyebrow?, heading, description?, component?, align? })`, `ProductCard({ product, showMarketplaceActions? })`, and `Catalog({ heading, description, categoryId?, headingComponent?, eyebrow? })`.

- [ ] **Step 1: Write failing product-card tests**

Create `app/_components/productCard.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { products } from "@/constants";
import ProductCard from "./productCard";
import SectionHeading from "./sectionHeading";

const serum = products.find(({ id }) => id === "red_pepper")!;
const cream = products.find(({ id }) => id === "ultra_lift")!;

describe("ProductCard", () => {
  it("shows brand, quantity, purpose, image alternative, and canonical detail link", () => {
    render(<ProductCard product={serum} />);
    expect(screen.getByText("Dr. Health")).toBeVisible();
    expect(screen.getByText("100 мл")).toBeVisible();
    expect(screen.getByText(serum.summary)).toBeVisible();
    expect(screen.getByRole("img", { name: serum.imageAlt })).toBeVisible();
    expect(screen.getByRole("link", { name: `Подробнее: ${serum.title}` })).toHaveAttribute("href", "/catalog/red_pepper");
  });

  it("renders both cream marketplaces in accepted order", () => {
    render(<ProductCard product={cream} showMarketplaceActions />);
    expect(screen.getAllByRole("link", { name: /Купить/ }).map((link) => link.textContent)).toEqual([
      "Купить на WB",
      "Купить на Ozon",
    ]);
  });
});

describe("SectionHeading", () => {
  it("preserves the requested semantic heading level", () => {
    render(
      <SectionHeading
        component="h2"
        description="Краткое описание раздела"
        eyebrow="Категория"
        heading="Выберите средство"
      />,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Выберите средство" })).toBeVisible();
    expect(screen.getByText("Краткое описание раздела")).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
npm test -- app/_components/productCard.test.tsx
```

Expected: FAIL because `productCard.tsx` and `sectionHeading.tsx` do not exist.

- [ ] **Step 3: Implement responsive product media**

`ProductMedia` uses `next/image` with the existing `product.image` and `product.imageAlt`:

```tsx
type Props = Readonly<{
  product: Pick<Product, "image" | "imageAlt" | "title">;
  priority?: boolean;
  sizes?: string;
}>;

<Box sx={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden" }}>
  <Image
    alt={product.imageAlt}
    fill
    priority={priority}
    sizes={sizes ?? "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"}
    src={product.image}
    style={{ objectFit: "contain" }}
  />
</Box>
```

No CSS background image or `role="img"` replacement is used.

- [ ] **Step 4: Implement `SectionHeading`**

Use this exact public API:

```ts
type SectionHeadingProps = Readonly<{
  eyebrow?: string;
  heading: string;
  description?: string;
  component?: "h1" | "h2";
  align?: "left" | "center";
}>;
```

Default `component` to `h2` and `align` to `left`. Render the eyebrow only when supplied, render `heading` using the requested semantic element, constrain the description measure, and use centered alignment only for short promotional sections that explicitly request it.

- [ ] **Step 5: Implement `ProductCard`**

Use a real `article`, text-backed accent border from `brandAccents[product.brandId]`, and this content order:

```tsx
<Card component="article">
  <ProductMedia product={product} />
  <CardContent>
    <Typography>{brands[product.brandId].name}</Typography>
    <Typography>{product.volume}</Typography>
    <Typography component="h3">{product.title}</Typography>
    <Typography>{product.summary}</Typography>
    <Button component={Link} href={`/catalog/${product.slug}`} aria-label={`Подробнее: ${product.title}`}>
      Подробнее
    </Button>
    {showMarketplaceActions ? (
      <MarketplaceActions product={product} placement="catalog-card" compact />
    ) : null}
  </CardContent>
</Card>
```

The canonical product action is visually primary; marketplace actions are compact and secondary.

- [ ] **Step 6: Rewrite the generic listing renderer**

Use this exact public API:

```ts
type CatalogProps = Readonly<{
  heading: string;
  description: string;
  categoryId?: ProductCategoryId;
  headingComponent?: "h1" | "h2";
  eyebrow?: string;
  showMarketplaceActions?: boolean;
}>;
```

Default `headingComponent` to `h1` and `showMarketplaceActions` to `true`. Render a semantic section, the shared `SectionHeading`, and a responsive grid of `ProductCard` components. Do not center long Russian listing copy on desktop.

- [ ] **Step 7: Update the three listing routes with exact approved hierarchy**

Use:

```tsx
// /catalog
<Catalog
  eyebrow="Все средства"
  heading="Каталог косметики Skinetics"
  description="Сравните средства Dr. Health, SkineticsLab и Neon Beard по назначению, составу и способу применения. Покупка и доставка оформляются на Wildberries или Ozon."
/>

// /serum
<Catalog
  eyebrow="Уход за волосами и кожей головы"
  heading="Сыворотки для волос Dr. Health"
  description="Три несмываемые сыворотки для разных задач косметического ухода. Изучите состав и способ применения перед переходом на Wildberries."
  categoryId="serum"
/>

// /cream
<Catalog
  eyebrow="Ежедневный уход за лицом"
  heading="Кремы для лица с пептидами"
  description="Кремы Neon Beard и SkineticsLab для ежедневного ухода за кожей лица. Сравните состав, формат применения и доступные маркетплейсы."
  categoryId="face-cream"
/>
```

- [ ] **Step 8: Restyle marketplace actions without changing behavior**

Keep every existing prop and event payload. Replace uppercase marketplace text with normal casing, keep `rel="noopener noreferrer"`, preserve Wildberries/Ozon colors, and give buttons a 44 px minimum height. Do not add `sticky-mobile` usage or alter `prepareMarketplaceUrl()`.

- [ ] **Step 9: Run card, analytics, lint, and build checks**

```bash
npm test -- app/_components/productCard.test.tsx
npm run lint
npm run build
```

Expected: PASS; `/catalog`, `/serum`, and `/cream` remain statically rendered with one H1 each.

- [ ] **Step 10: Commit cards and listings**

```bash
git add app/_components/productMedia.tsx app/_components/sectionHeading.tsx app/_components/productCard.tsx app/_components/productCard.test.tsx app/_components/catalog.tsx app/_components/marketplaceActions.tsx app/_components/marketplaceActionButton.tsx app/catalog/page.tsx app/serum/page.tsx app/cream/page.tsx
git commit -m "P04: redesign catalog listings"
```

---

### Task 4: Redesign the shared product-detail template

**Files:**
- Create: `app/_components/productHero.tsx`
- Create: `app/_components/productHero.test.tsx`
- Create: `app/_components/contextualLinks.tsx`
- Modify: `app/catalog/[id]/page.tsx`
- Modify: `app/_components/productBreadcrumbs.tsx`
- Modify: `app/_components/productDescription.tsx`
- Modify: `app/_components/productFaq.tsx`

**Interfaces:**
- Consumes: `Product`, `ProductContent`, `productCategories`, `MarketplaceActions`.
- Produces: `getQuantityLabel(categoryId): "Масса" | "Объем"`, `ProductHero({ product })`, and `ContextualLinks({ product })`.

- [ ] **Step 1: Write the failing product-hero contract**

Create `app/_components/productHero.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { products } from "@/constants";
import ProductHero, { getQuantityLabel } from "./productHero";

describe("ProductHero", () => {
  it("uses category-aware quantity labels", () => {
    expect(getQuantityLabel("serum")).toBe("Объем");
    expect(getQuantityLabel("face-cream")).toBe("Масса");
  });

  it("renders canonical product identity and marketplace actions", () => {
    const product = products.find(({ id }) => id === "renewal")!;
    render(<ProductHero product={product} />);
    expect(screen.getByRole("heading", { level: 1, name: product.title })).toBeVisible();
    expect(screen.getByText("SkineticsLab")).toBeVisible();
    expect(screen.getByText("50 г")).toBeVisible();
    expect(screen.getByRole("img", { name: product.imageAlt })).toBeVisible();
    expect(screen.getAllByRole("link", { name: /Купить/ })).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
npm test -- app/_components/productHero.test.tsx
```

Expected: FAIL because `productHero.tsx` does not exist.

- [ ] **Step 3: Implement the responsive hero**

Export:

```ts
export function getQuantityLabel(categoryId: ProductCategoryId) {
  return categoryId === "face-cream" ? "Масса" : "Объем";
}
```

`ProductHero` uses a two-column grid at `md`, one column below it, `ProductMedia` with `priority`, a text brand label plus its provisional accent, one H1, quantity label/value, and `MarketplaceActions` with placement `product-hero`.

- [ ] **Step 4: Recompose the product route in the approved semantic order**

Keep `generateMetadata`, `generateStaticParams`, `dynamicParams = false`, and all canonical behavior unchanged. Render:

```tsx
<Container>
  <ProductBreadcrumbs product={product} />
  <ProductHero product={product} />
  <ProductDescription content={product.content} />
  <Box component="section" aria-labelledby="composition-heading">
    <Typography id="composition-heading" component="h2">Полный состав</Typography>
    <Typography>{product.composition}</Typography>
  </Box>
  <ProductFaq items={product.content.faq} />
  <ContextualLinks product={product} />
</Container>
```

Do not introduce a sticky marketplace bar.

- [ ] **Step 5: Make long product content scannable without changing copy**

Keep every existing string and conditional exactly. Wrap suitable use, actives, features, application, and precautions in semantic sections with unique IDs. Keep the feature items as one real `ul` of `li` elements. Keep FAQ as one `section` containing `dl`, `dt`, and `dd` elements; do not add `FAQPage` JSON-LD.

- [ ] **Step 6: Preserve canonical breadcrumbs and add onward category context**

Keep the same three breadcrumb items and JSON-LD URLs. `ContextualLinks` renders:

```tsx
<Link component={NextLink} href={productCategories[product.categoryId].path}>
  Вернуться: {productCategories[product.categoryId].name}
</Link>
```

Do not render brand, concern, ingredient, or expert links while those destinations are absent.

- [ ] **Step 7: Validate the shared template, then review creams first**

```bash
npm test -- app/_components/productHero.test.tsx app/_components/productCard.test.tsx
npm run lint
npm run build
```

Start the built site and inspect `/cream`, `/catalog/ultra-lift`, and `/catalog/renewal` at 390 and 1280 px before reviewing the three serum pages. Confirm one H1, correct quantities, both marketplace buttons, content order, focus visibility, and no horizontal overflow.

- [ ] **Step 8: Commit the product template**

```bash
git add 'app/catalog/[id]/page.tsx' app/_components/productHero.tsx app/_components/productHero.test.tsx app/_components/contextualLinks.tsx app/_components/productBreadcrumbs.tsx app/_components/productDescription.tsx app/_components/productFaq.tsx
git commit -m "P04: redesign product details"
```

---

### Task 5: Replace the homepage carousel with the catalog journey

**Files:**
- Create: `app/_components/homeHero.tsx`
- Create: `app/_components/categoryNavigation.tsx`
- Create: `app/_components/trustEvidence.tsx`
- Create: `app/page.test.tsx`
- Modify: `app/page.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`
- Delete: `app/_components/carousel.tsx`
- Delete: `app/_components/advantages.tsx`
- Preserve unchanged: `public/video/1.mp4`
- Preserve unchanged: `public/video/2.mp4`
- Preserve unchanged: `public/video/3.mp4`
- Preserve unchanged: `public/video/4.mp4`

**Interfaces:**
- Consumes: `Catalog` with `headingComponent="h2"`, product categories, accepted verified trust facts.
- Produces: server-rendered `HomeHero`, `CategoryNavigation`, and `TrustEvidence`; homepage with one H1 and no video request path.

- [ ] **Step 1: Write the failing homepage contract**

Create `app/page.test.tsx` and mock `./_components/metrika` to return `null`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LandingPage from "./page";

vi.mock("./_components/metrika", () => ({ default: () => null }));

describe("homepage", () => {
  it("presents the multi-brand catalog journey without video", () => {
    const { container } = render(<LandingPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText(/покупка и доставка оформляются на Wildberries или Ozon/i)).toBeVisible();
    expect(screen.getByRole("link", { name: "Смотреть каталог" })).toHaveAttribute("href", "/catalog");
    expect(screen.getByRole("link", { name: "Сыворотки" })).toHaveAttribute("href", "/serum");
    expect(screen.getByRole("link", { name: "Кремы" })).toHaveAttribute("href", "/cream");
    expect(container.querySelector("video")).not.toBeInTheDocument();
    expect(container.innerHTML).not.toContain("/video/");
  });
});
```

- [ ] **Step 2: Run the homepage test and verify it fails**

```bash
npm test -- app/page.test.tsx
```

Expected: FAIL because the current page renders the carousel and lacks the accepted hero and category links.

- [ ] **Step 3: Implement the server-rendered hero**

Use this exact content hierarchy:

```tsx
<Typography component="p">Каталог косметики Dr. Health, SkineticsLab и Neon Beard</Typography>
<Typography component="h1">Косметика для лица, волос и кожи головы</Typography>
<Typography>
  Skinetics помогает сравнить назначение, состав и способ применения средств. Покупка и доставка оформляются на Wildberries или Ozon.
</Typography>
<Button component={Link} href="/catalog">Смотреть каталог</Button>
```

Add a restrained CSS still-life field using existing product images through `ProductMedia` or `next/image`; do not add remote decorative photography, sliders, autoplay, or client state.

- [ ] **Step 4: Implement category navigation and verified trust evidence**

`CategoryNavigation` exposes `/serum` and `/cream` as server-rendered links with short cosmetic-care descriptions. `TrustEvidence` contains exactly these three currently accepted facts:

```ts
const trustFacts = [
  "ООО «Демидов Люкс СПА» является членом Московского инновационного кластера.",
  "Компания представлена в каталоге Московского экспортёра.",
  "Компания участвует в программе «Сделано в Москве».",
];
```

Link the trust section to `/about`; do not retain the six unsupported generic advantage statements from the current component.

- [ ] **Step 5: Recompose the homepage**

Render in this order:

```tsx
<Metrika />
<HomeHero />
<CategoryNavigation />
<Catalog
  eyebrow="Все пять средств"
  heading="Выберите средство"
  headingComponent="h2"
  description="Сравните продукты трёх брендов и откройте страницу средства, чтобы изучить состав и применение."
  showMarketplaceActions={false}
/>
<TrustEvidence />
```

The site-wide footer supplies the trichologist path.

- [ ] **Step 6: Remove carousel dependencies while retaining every video file**

Run:

```bash
npm uninstall color lodash react-player react-responsive-carousel @types/color @types/lodash
test -f public/video/1.mp4
test -f public/video/2.mp4
test -f public/video/3.mp4
test -f public/video/4.mp4
git diff -- public/video
```

Expected: every `test -f` passes and `git diff -- public/video` prints nothing. Delete only `app/_components/carousel.tsx`; do not remove the video directory or its files.

- [ ] **Step 7: Run homepage and production checks**

```bash
npm test -- app/page.test.tsx
npm run lint
npm run build
if rg -n 'carousel|react-player|react-responsive-carousel|/video/' app package.json; then exit 1; fi
```

Expected: tests, lint, and build PASS. The negative search exits successfully because no homepage/runtime carousel dependency or video path remains.

- [ ] **Step 8: Commit the homepage**

```bash
git add app/page.tsx app/page.test.tsx app/_components/homeHero.tsx app/_components/categoryNavigation.tsx app/_components/trustEvidence.tsx app/_components/carousel.tsx app/_components/advantages.tsx package.json package-lock.json
git commit -m "P04: redesign homepage journey"
```

---

### Task 6: Acquire and install the verified serum presentation images

**Files:**
- Create: `public/items/red_pepper-wildberries.webp`
- Create: `public/items/copper_tripeptide-wildberries.webp`
- Create: `public/items/climbazole-wildberries.webp`
- Create: `docs/refactoring/phase-04-redesign/artifacts/serum-image-sources-2026-08-23.md`
- Create: `app/serumImageAssets.test.ts`
- Modify: `constants.ts`
- Preserve unchanged: `public/items/originals/red_pepper.png`
- Preserve unchanged: `public/items/originals/copper_tripeptide.png`
- Preserve unchanged: `public/items/originals/climbazole.png`

**Interfaces:**
- Consumes: Exact accepted Wildberries product pages and the product source of truth.
- Produces: Three verified source-preserving WebP assets and matching `Product.image` paths used by cards and product pages.

- [ ] **Step 1: Write the failing asset contract**

Create `app/serumImageAssets.test.ts`:

```ts
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { products } from "@/constants";

const expected = {
  red_pepper: "/items/red_pepper-wildberries.webp",
  copper_tripeptide: "/items/copper_tripeptide-wildberries.webp",
  climbazole: "/items/climbazole-wildberries.webp",
};

describe("serum presentation assets", () => {
  it.each(Object.entries(expected))("uses a present verified asset for %s", (id, image) => {
    expect(products.find((product) => product.id === id)?.image).toBe(image);
    expect(fs.existsSync(path.join(process.cwd(), "public", image))).toBe(true);
  });
});
```

- [ ] **Step 2: Run the asset test and verify it fails**

```bash
npm test -- app/serumImageAssets.test.ts
```

Expected: FAIL because the product records still reference PNG files and the new WebP files are absent.

- [ ] **Step 3: Review the exact current Wildberries galleries**

Use the browser to open these exact sources:

```text
red_pepper: https://www.wildberries.ru/catalog/397061523/detail.aspx
copper_tripeptide: https://www.wildberries.ru/catalog/397059149/detail.aspx
climbazole: https://www.wildberries.ru/catalog/236310045/detail.aspx
```

For each card, navigate visibly to the final gallery slide and verify the product name, Dr. Health identity, 100 мл packaging, and absence of a separate promotional overlay. Stop and ask for owner review if a final slide shows mismatched or obsolete packaging.

- [ ] **Step 4: Save the final-slide source bytes and record provenance**

Download the resolved final-slide WebP from each gallery without conversion into the exact filenames above. Run:

```bash
file public/items/red_pepper-wildberries.webp public/items/copper_tripeptide-wildberries.webp public/items/climbazole-wildberries.webp
shasum -a 256 public/items/red_pepper-wildberries.webp public/items/copper_tripeptide-wildberries.webp public/items/climbazole-wildberries.webp
```

Expected: `file` identifies all three as WebP. Record, for each product, the product page URL, resolved image URL, gallery position, retrieval date `2026-08-23`, visible packaging/quantity check, local filename, dimensions, byte size, and SHA-256 in `serum-image-sources-2026-08-23.md`.

- [ ] **Step 5: Visually inspect the three downloaded files**

Open each at original detail with the workspace image viewer. Confirm the bottle is complete, shadow is present, text is not cropped, and no other product or marketplace promotion is composited into the image. Confirm the three existing PNG files still exist and remain byte-unchanged in git.

- [ ] **Step 6: Update only the three serum image paths**

Set:

```ts
image: "/items/red_pepper-wildberries.webp";
image: "/items/copper_tripeptide-wildberries.webp";
image: "/items/climbazole-wildberries.webp";
```

Keep every `imageAlt` unchanged unless the visible package identity conflicts with it; any conflict requires owner review rather than an inferred rewrite.

- [ ] **Step 7: Run asset and responsive checks**

```bash
npm test -- app/serumImageAssets.test.ts app/_components/productCard.test.tsx app/_components/productHero.test.tsx
npm run build
git diff -- public/items/originals/red_pepper.png public/items/originals/copper_tripeptide.png public/items/originals/climbazole.png public/video
```

Expected: tests and build PASS; the final `git diff` prints nothing. Inspect `/serum` and all three serum product pages at 390 and 1280 px for consistent grounding, contain behavior, alt text, and no layout shift.

- [ ] **Step 8: Commit serum imagery and provenance**

```bash
git add constants.ts app/serumImageAssets.test.ts public/items/red_pepper-wildberries.webp public/items/copper_tripeptide-wildberries.webp public/items/climbazole-wildberries.webp docs/refactoring/phase-04-redesign/artifacts/serum-image-sources-2026-08-23.md
git commit -m "P04: refresh serum imagery"
```

---

### Task 7: Redesign about, contacts, and resilient form states

**Files:**
- Create: `lib/submitJson.ts`
- Create: `lib/submitJson.test.ts`
- Create: `app/_components/forms.test.tsx`
- Modify: `app/_components/form.tsx`
- Modify: `app/contacts/_components/form.tsx`
- Modify: `app/api/doctor/route.ts`
- Modify: `app/api/feedback/route.ts`
- Modify: `app/about/page.tsx`
- Modify: `app/contacts/page.tsx`

**Interfaces:**
- Consumes: Existing Zod schemas, `reachGoalForm()`, accepted legal/contact details, verified trust facts.
- Produces: `submitJson<T>(endpoint, values, request?)`; labeled forms with pending/error/success states; multi-brand about and contacts templates; generic JSON API failure responses.

- [ ] **Step 1: Write failing request-helper tests**

Create `lib/submitJson.test.ts`:

```ts
import { describe, expect, it, vi } from "vitest";
import { submitJson } from "./submitJson";

describe("submitJson", () => {
  it("resolves only for an ok response", async () => {
    const request = vi.fn().mockResolvedValue({ ok: true });
    await expect(submitJson("/api/doctor", { name: "Анна" }, request)).resolves.toBeUndefined();
  });

  it("throws a stable client-safe error for HTTP and network failure", async () => {
    const httpFailure = vi.fn().mockResolvedValue({ ok: false });
    const networkFailure = vi.fn().mockRejectedValue(new Error("smtp detail"));
    await expect(submitJson("/api/doctor", {}, httpFailure)).rejects.toThrow("FORM_SUBMISSION_FAILED");
    await expect(submitJson("/api/doctor", {}, networkFailure)).rejects.toThrow("FORM_SUBMISSION_FAILED");
  });
});
```

- [ ] **Step 2: Run the helper test and verify it fails**

```bash
npm test -- lib/submitJson.test.ts
```

Expected: FAIL because `submitJson.ts` does not exist.

- [ ] **Step 3: Implement the shared request helper**

Create:

```ts
type Request = (input: RequestInfo | URL, init?: RequestInit) => Promise<Pick<Response, "ok">>;

export async function submitJson<T>(endpoint: string, values: T, request: Request = fetch) {
  try {
    const response = await request(endpoint, {
      body: JSON.stringify(values),
      headers: { "content-type": "application/json" },
      method: "PUT",
    });
    if (!response.ok) throw new Error("FORM_SUBMISSION_FAILED");
  } catch {
    throw new Error("FORM_SUBMISSION_FAILED");
  }
}
```

- [ ] **Step 4: Write failing UI form-state tests**

In `forms.test.tsx`, mock `submitJson` and `reachGoalForm`, then assert:

```tsx
expect(screen.getByRole("textbox", { name: "Ваше имя" })).toBeVisible();
expect(screen.getByRole("textbox", { name: "Номер телефона" })).toBeVisible();
```

For a rejected submission, enter valid values, submit, and assert the entered name remains, `Не удалось отправить форму. Попробуйте ещё раз.` is announced with `role="alert"`, and `reachGoalForm` was not called. For a resolved submission, assert `reachGoalForm` is called once and the success message uses `role="status"`.

- [ ] **Step 5: Implement visible labels and explicit form states**

In both forms, use MUI `TextField label` values rather than placeholder-only identity. Doctor labels are `Ваше имя` and `Номер телефона`; feedback labels are `Ваше имя`, `Электронная почта`, `Номер телефона`, and `Сообщение`.

Replace direct `fetch` with `submitJson`. Add `submissionError` state, clear it before retry, call `reachGoalForm()` only after resolution, and render:

```tsx
{submissionError ? (
  <Alert severity="error" role="alert">
    Не удалось отправить форму. Попробуйте ещё раз.
  </Alert>
) : null}
```

Success uses `<Alert severity="success" role="status">Мы свяжемся с вами в ближайшее время.</Alert>`. Disabled submit labels are `Отправляем…`; other fields remain readable.

- [ ] **Step 6: Return generic API failures**

Wrap each `sendMail()` call in `try/catch`. On failure, log only a constant route-specific message without request data or credentials and return:

```ts
return NextResponse.json({ success: false }, { status: 502 });
```

Keep Zod failures at 400 and successful responses at 200. Do not change mail recipients, subjects, sender environment variables, or transport configuration.

- [ ] **Step 7: Rewrite `/about` with exact portfolio hierarchy**

Update metadata to:

```ts
title: "О Skinetics, брендах и компании | Skinetics",
description: "Skinetics объединяет косметику Dr. Health, SkineticsLab и Neon Beard. Информация об ООО «Демидов Люкс СПА», участии в московских программах и реквизитах.",
```

Render sections headed `Skinetics и наши бренды`, `Проверенные факты`, and `Реквизиты`. Name all three product brands, explain that Skinetics is the catalog rather than a product brand, identify ООО «Демидов Люкс СПА» as the company, include only the three accepted trust facts from Task 5, preserve every current legal-detail value, and add links to `/catalog` and `/contacts`. Remove the single Dr. Health Wildberries brand-page button as the dominant about-page conversion.

- [ ] **Step 8: Rewrite `/contacts` without changing contact facts**

Update metadata to:

```ts
title: "Контакты и обратная связь | Skinetics",
description: "Телефоны и электронная почта Skinetics, форма обратной связи и ссылки на каталог косметики Dr. Health, SkineticsLab и Neon Beard.",
```

Keep `+7 (495) 665 9015`, `+7 926 385 3751`, and `info@skinetics.ru`. Use a real address-style contact list, labeled feedback section, and supporting links to `/about` and `/catalog`.

- [ ] **Step 9: Run form and page checks**

```bash
npm test -- lib/submitJson.test.ts app/_components/forms.test.tsx
npm run lint
npm run build
```

Expected: PASS. Manually exercise invalid input, rejected API, retry, and success with a local mail stub; verify goals fire only on success and personal values remain after failure.

- [ ] **Step 10: Commit trust, contacts, and forms**

```bash
git add lib/submitJson.ts lib/submitJson.test.ts app/_components/forms.test.tsx app/_components/form.tsx app/contacts/_components/form.tsx app/api/doctor/route.ts app/api/feedback/route.ts app/about/page.tsx app/contacts/page.tsx
git commit -m "P04: redesign trust and forms"
```

---

### Task 8: Record future-template contracts without publishing gated routes

**Files:**
- Create: `docs/refactoring/phase-04-redesign/artifacts/template-composition-contracts.md`
- Modify: `docs/refactoring/phase-04-redesign/artifacts/README.md`
- Modify: `docs/refactoring/phase-04-redesign/CHECKLIST.md`

**Interfaces:**
- Consumes: Phase 03 page-class contract and Phase 04 component architecture.
- Produces: Exact brand, concern, ingredient, and expert-template composition rules for Phase 05; no application route or navigation output.

- [ ] **Step 1: Verify all gated routes remain absent**

```bash
test ! -e app/brands
test ! -e app/concerns
test ! -e app/expert
test ! -e 'app/ingredients/[id]'
```

Expected: all checks pass.

- [ ] **Step 2: Create the composition contract**

Create one section per template with these exact ordered blocks:

```text
Brand: canonical breadcrumb → Skinetics relationship → brand H1/scope → verified evidence → products/categories → reviewed expert links → product conversion
Concern: canonical breadcrumb → non-diagnostic H1/context → selection factors → professional-advice caveat → reviewed ingredients → suitable products → expert links
Ingredient: canonical breadcrumb → H1/INCI/aliases → verified cosmetic role → evidence limits/sources → verified product presence → care contexts → product conversion
Expert: canonical breadcrumb → one-intent H1 → actual author/reviewer/dates → answer body → sources and interpretation labels → related taxonomy links → product next step
```

For every class, name the shared components consumed, required server-rendered content, primary conversion, analytics placement, authorship/evidence requirements, and Phase 03 nine-condition publication gate. State explicitly that the document creates no route, canonical, sitemap item, or navigation link.

- [ ] **Step 3: Link the artifact and record only design-level template work complete**

Add the artifact to `artifacts/README.md`. Under `Page templates` in `CHECKLIST.md`, add this distinct checked item:

```markdown
- [x] Future brand, concern, ingredient, and expert composition contracts documented without publishing routes.
```

Leave the existing `Brand hub`, `Concern and ingredient hub`, and `Expert article` implementation checkboxes incomplete. Do not mark Phase 04 validation or rollout complete.

- [ ] **Step 4: Validate the absence and documentation**

```bash
rg -n 'Brand:|Concern:|Ingredient:|Expert:' docs/refactoring/phase-04-redesign/artifacts/template-composition-contracts.md
rg -n 'creates no route|nine-condition publication gate' docs/refactoring/phase-04-redesign/artifacts/template-composition-contracts.md
if rg -n 'to: "/(brands|concerns|expert|ingredients)"|href="/(brands|concerns|expert|ingredients)"|url: ".*/(brands|concerns|expert|ingredients)"' constants.ts app/sitemap.ts app/_components/siteHeader.tsx app/_components/siteFooter.tsx; then exit 1; fi
git diff --check
```

Expected: the artifact contains all four contracts; the negative search exits successfully because public code contains no gated navigation or sitemap entry.

- [ ] **Step 5: Commit the contracts**

```bash
git add docs/refactoring/phase-04-redesign/artifacts/README.md docs/refactoring/phase-04-redesign/artifacts/template-composition-contracts.md docs/refactoring/phase-04-redesign/CHECKLIST.md
git commit -m "P04: define future templates"
```

---

### Task 9: Run complete regression validation and prepare the coordinated release

**Files:**
- Create: `scripts/validatePhase04.mjs`
- Modify: `package.json`
- Modify: `docs/refactoring/phase-04-redesign/VALIDATION.md`
- Modify: `docs/refactoring/phase-04-redesign/FINDINGS.md`
- Modify: `docs/refactoring/phase-04-redesign/CHECKLIST.md`
- Create: `docs/refactoring/phase-04-redesign/artifacts/performance-summary.md`
- Create: `docs/refactoring/phase-04-redesign/artifacts/release-and-rollback-notes.md`
- Modify: `docs/refactoring/STATUS.md`
- Modify: `docs/refactoring/LOG.md`

**Interfaces:**
- Consumes: The complete implementation, current route set, metadata, forms, analytics contract, image provenance, and quality budgets.
- Produces: Repeatable rendered-HTML validation, responsive/accessibility/performance evidence, local release and rollback notes, and `Implementation validated; deployment pending` status.

- [ ] **Step 1: Create the rendered-site validator**

Create `scripts/validatePhase04.mjs` using `node:assert/strict`. Fetch these exact routes from `process.env.SKINETICS_BASE_URL ?? "http://127.0.0.1:3000"`:

```js
const routes = [
  "/",
  "/catalog",
  "/serum",
  "/cream",
  "/catalog/red_pepper",
  "/catalog/copper_tripeptide",
  "/catalog/climbazole",
  "/catalog/ultra-lift",
  "/catalog/renewal",
  "/about",
  "/contacts",
  "/ingredients",
];
```

For every route assert status 200, exactly one `<h1`, one `<main`, a `<header`, and a `<footer`. Assert the homepage contains all five canonical product links and no `<video`, `/video/`, or `carousel`. Assert each product page contains its canonical category breadcrumb and marketplace link. Assert `/ingredients` contains a robots noindex marker and is absent from fetched sitemap XML. Assert `/brands`, `/concerns`, and `/expert` return 404.

Add:

```json
"validate:phase04": "node scripts/validatePhase04.mjs"
```

- [ ] **Step 2: Run the complete automated suite**

```bash
npm test
npm run lint
npm run build
```

Expected: all tests, lint, and production build PASS.

- [ ] **Step 3: Run the production server and rendered-site validator**

In one terminal:

```bash
npm run start
```

In another:

```bash
npm run validate:phase04
```

Expected: PASS for every current route, 404 for gated roots, no homepage video reference, and no indexation regression.

- [ ] **Step 4: Validate forms and analytics with local stubs**

Exercise both forms with invalid and valid data. Stub both mail success and mail failure. Capture evidence that:

```text
invalid input → no request, field-linked message
API failure → values retained, role=alert, no form goal
API success → role=status, one form goal
marketplace click → correct product_id, brand_id, marketplace, placement, page_path, campaign; navigation continues if analytics throws
```

Test a one-marketplace serum and a two-marketplace cream from both a card and product hero.

- [ ] **Step 5: Complete responsive and accessibility review**

Use the local production build and capture home, one listing, one serum, one cream, about, contacts, doctor form, and feedback form at 390, 768, 1280, and 1440 px. Verify keyboard order, focus visibility, menu Escape/focus restoration, contrast, 44 px targets, reduced motion, heading order, landmarks, labels, image alternatives, long product names, and no horizontal overflow.

- [ ] **Step 6: Measure the agreed Lighthouse budgets**

Run:

```bash
npx lighthouse http://127.0.0.1:3000/ --only-categories=performance,accessibility --preset=desktop --output=json --output-path=/tmp/skinetics-home-desktop.json --chrome-flags="--headless --no-sandbox"
npx lighthouse http://127.0.0.1:3000/ --only-categories=performance,accessibility --form-factor=mobile --screenEmulation.mobile=true --screenEmulation.width=390 --screenEmulation.height=844 --screenEmulation.deviceScaleFactor=1 --output=json --output-path=/tmp/skinetics-home-mobile.json --chrome-flags="--headless --no-sandbox"
```

Record commands, date, environment, performance/accessibility scores, LCP, CLS, and transferred resource summary in `performance-summary.md`. The mobile performance and accessibility scores must each be at least 90. Do not commit raw browser profiles or private analytics data.

- [ ] **Step 7: Verify media retention and source integrity**

```bash
test -f public/video/1.mp4
test -f public/video/2.mp4
test -f public/video/3.mp4
test -f public/video/4.mp4
git diff 6a80ecc -- public/video
file public/items/*-wildberries.webp
rg -n '/video/|<video|carousel' .next/server/app/page.html .next/server/app/index.html app 2>/dev/null
```

Expected: all videos exist and have no phase diff; all serum sources are WebP; no rendered homepage/runtime source references video or carousel.

- [ ] **Step 8: Write release and rollback notes**

Record the coordinated release contents, required environment variables, artifact build command `./build.sh`, route smoke test, form/mail smoke test, marketplace analytics smoke test, and rollback procedure. State that production deployment is not executed by this plan and requires explicit authorization. Rollback restores the previous application artifact; there is no database, URL, or content backfill.

- [ ] **Step 9: Close local validation records**

Update `VALIDATION.md` with commands, results, routes, viewports, accessibility evidence, analytics/form evidence, and reviewer/date fields. Update `FINDINGS.md`, `CHECKLIST.md`, `STATUS.md`, and `LOG.md` so Phase 04 reads `Implementation validated; deployment pending`, not `Complete`, until production publication is separately authorized.

- [ ] **Step 10: Run final repository checks**

```bash
git diff --check
git status --short
npm test
npm run lint
npm run build
```

Expected: all commands pass. Only Phase 04 implementation/evidence files are staged for the final commit; unrelated worktree files remain unstaged.

- [ ] **Step 11: Commit the validated local release candidate**

```bash
git add package.json scripts/validatePhase04.mjs docs/refactoring/STATUS.md docs/refactoring/LOG.md docs/refactoring/phase-04-redesign/CHECKLIST.md docs/refactoring/phase-04-redesign/FINDINGS.md docs/refactoring/phase-04-redesign/VALIDATION.md docs/refactoring/phase-04-redesign/artifacts/performance-summary.md docs/refactoring/phase-04-redesign/artifacts/release-and-rollback-notes.md
git commit -m "P04: validate redesign"
```
