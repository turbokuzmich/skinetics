import type {
  Brand,
  BrandId,
  Marketplace,
  MarketplaceId,
  Product,
  ProductCategory,
  ProductCategoryId,
} from "@/types";

type CatalogData = {
  brands: Record<BrandId, Brand>;
  productCategories: Record<ProductCategoryId, ProductCategory>;
  marketplaces: Record<MarketplaceId, Marketplace>;
  products: readonly Product[];
};

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isAllowedHostname(hostname: string, allowed: readonly string[]) {
  return allowed.some(
    (allowedHostname) =>
      hostname === allowedHostname || hostname.endsWith(`.${allowedHostname}`)
  );
}

function fail(product: Product, message: string): never {
  throw new Error(`Invalid catalog product "${product.id}": ${message}`);
}

export function assertCatalogIntegrity({
  brands,
  productCategories,
  marketplaces,
  products,
}: CatalogData) {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const product of products) {
    if (ids.has(product.id)) {
      fail(product, "duplicate product id");
    }
    ids.add(product.id);

    if (slugs.has(product.slug)) {
      fail(product, `duplicate product slug "${product.slug}"`);
    }
    slugs.add(product.slug);

    if (!brands[product.brandId]) {
      fail(product, `unknown brand "${product.brandId}"`);
    }
    if (!productCategories[product.categoryId]) {
      fail(product, `unknown category "${product.categoryId}"`);
    }

    const links = Object.entries(product.marketplaceLinks) as [
      MarketplaceId,
      string,
    ][];

    for (const [marketplaceId, value] of links) {
      const marketplace = marketplaces[marketplaceId];
      if (!marketplace) {
        fail(product, `unknown marketplace "${marketplaceId}"`);
      }

      let url: URL;
      try {
        url = new URL(value);
      } catch {
        fail(product, `malformed ${marketplaceId} URL`);
      }

      if (
        url.protocol !== "https:" ||
        !isAllowedHostname(url.hostname, marketplace.allowedHostnames)
      ) {
        fail(product, `unapproved ${marketplaceId} URL "${value}"`);
      }
    }

    if (product.status === "draft") {
      continue;
    }

    const requiredText = [
      product.id,
      product.slug,
      product.title,
      product.summary,
      product.image,
      product.imageAlt,
      product.composition,
      product.volume,
      product.content.overview,
      product.content.activeComponents,
      product.content.featureSection.heading,
      product.content.application.heading,
      product.content.application.instructions,
      product.content.precautions,
      product.metadata.title,
      product.metadata.description,
    ];

    if (!requiredText.every(hasText)) {
      fail(product, "published product has missing required content");
    }
    if (
      product.content.featureSection.items.length === 0 ||
      !product.content.featureSection.items.every(hasText)
    ) {
      fail(product, "published product has an incomplete feature list");
    }
    if (links.length === 0) {
      fail(product, "published product has no marketplace destination");
    }
  }
}
