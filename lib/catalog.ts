import { marketplaces, products } from "@/constants";
import type {
  MarketplaceId,
  Product,
  ProductCategoryId,
} from "@/types";

export function getPublishedProducts(): Product[] {
  return products.filter((product) => product.status === "published");
}

export function getPublishedProductsByCategory(
  categoryId: ProductCategoryId
): Product[] {
  return getPublishedProducts().filter(
    (product) => product.categoryId === categoryId
  );
}

export function getPublishedProductBySlug(slug: string): Product | undefined {
  return getPublishedProducts().find((product) => product.slug === slug);
}

export type AvailableMarketplace = {
  marketplaceId: MarketplaceId;
  url: string;
};

export function getAvailableMarketplaces(
  product: Pick<Product, "marketplaceLinks">
): AvailableMarketplace[] {
  return (Object.entries(product.marketplaceLinks) as [MarketplaceId, string][])
    .filter(([marketplaceId]) => Boolean(marketplaces[marketplaceId]))
    .sort(
      ([left], [right]) =>
        marketplaces[left].order - marketplaces[right].order
    )
    .map(([marketplaceId, url]) => ({ marketplaceId, url }));
}
