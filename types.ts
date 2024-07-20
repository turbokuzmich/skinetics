export enum Marketplace {
  wildberries = "wildberries",
}

export type Item = {
  id: string;
  title: string;
  subheader: string;
  brief: string[];
  description: string[];
  image: string;
  usage: string;
  composition: string;
  effect: string;
  volume: string;
  country: string;
  warning?: string;
  links: Record<Marketplace, string>;
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
