import type { MarketplaceId } from "@/types";

type UtmTag =
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_term"
  | "utm_content";

// NOTE: need to add ozon defaults also
const wildberriesDefaults: Partial<Record<UtmTag, string>> = {
  utm_campaign: "73308-id-site",
  utm_medium: "free",
  utm_source: "site",
};

const attributionValuePattern = /^[a-z0-9][a-z0-9_-]*$/i;

function normalizeAttributionValue(
  value: string | null,
  maximumLength: number,
): string | undefined {
  const normalized = value?.trim();

  if (
    !normalized ||
    normalized.length > maximumLength ||
    !attributionValuePattern.test(normalized)
  ) {
    return undefined;
  }

  return normalized.toLowerCase();
}

export function getCampaignContext(search: string): string | undefined {
  return normalizeAttributionValue(
    new URLSearchParams(search).get("utm_campaign"),
    80,
  );
}

export function prepareMarketplaceUrl(
  marketplaceId: MarketplaceId,
  baseUrl: string,
  search: string,
): string {
  const url = new URL(baseUrl);

  if (marketplaceId !== "wildberries") {
    return url.toString();
  }

  for (const [key, value] of Object.entries(wildberriesDefaults)) {
    url.searchParams.set(key, value);
  }

  const incoming = new URLSearchParams(search);
  const source = normalizeAttributionValue(incoming.get("utm_source"), 80);
  const medium = normalizeAttributionValue(incoming.get("utm_medium"), 80);
  const campaign = getCampaignContext(search);

  if (!source || !medium || !campaign) {
    return url.toString();
  }

  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", `73308-id-site-${campaign}`);

  for (const optionalTag of ["utm_term", "utm_content"] as const) {
    const value = normalizeAttributionValue(incoming.get(optionalTag), 100);
    if (value) {
      url.searchParams.set(optionalTag, value);
    }
  }

  return url.toString();
}
