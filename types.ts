import { type Metadata } from "next";

export type BrandId = "dr-health" | "skineticslab" | "neon-beard";

export type ProductCategoryId = "serum" | "face-cream";

export type MarketplaceId = "wildberries" | "ozon";

export type ProductStatus = "draft" | "published";

export type MarketplacePlacement =
  | "catalog-card"
  | "home-hero"
  | "product-hero"
  | "sticky-mobile";

export type Brand = {
  id: BrandId;
  name: string;
};

export type ProductCategory = {
  id: ProductCategoryId;
  name: string;
  path: string;
};

export type Marketplace = {
  id: MarketplaceId;
  name: string;
  buttonLabel: string;
  compactButtonLabel: string;
  order: number;
  allowedHostnames: readonly string[];
};

export type ProductFaqItem = {
  question: string;
  answer: string;
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

export type MarketplaceClickEvent = {
  product_id: Product["id"];
  brand_id: BrandId;
  marketplace: MarketplaceId;
  placement: MarketplacePlacement;
  page_path: string;
  campaign?: string;
};

export enum IngredientName {
  copperTripeptide = "copper_tripeptide",
  piroctoneAlamine = "piroctone_alamine",
  climbazole = "climbazole",
  msm = "msm",
  vitaminB5 = "vitamin_b5",
  niacinamide = "niacinamide",
  blackPepper = "black_pepper",
  plantain = "plantain",
  calendula = "calendula",
  celandine = "celandine",
  melissa = "melissa",
  chamomile = "chamomile",
  hyaluronicAcid = "hyaluronic_acid",
  allantoine = "allantoine",
  sitosterol = "sitosterol",
  brocccoli = "brocccoli",
  nettle = "nettle",
}

export type TextTooltip = {
  content: string;
  tooltip: string;
  aliases?: string | string[];
};

export type IngredientDescriptionItem = string | TextTooltip;

export type IngredientDescriptionLine = string | IngredientDescriptionItem[];

export type Ingredient = {
  name: string;
  aliases?: string | string[];
  description: IngredientDescriptionLine | IngredientDescriptionLine[];
};

export type NaviItem = {
  to: string;
  title: string;
  subitems?: NaviItem[];
};
