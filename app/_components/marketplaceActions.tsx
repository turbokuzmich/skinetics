import Stack from "@mui/material/Stack";
import { marketplaces } from "@/constants";
import { getAvailableMarketplaces } from "@/lib/catalog";
import type { MarketplacePlacement, Product } from "@/types";
import MarketplaceActionButton from "./marketplaceActionButton";

type Props = Readonly<{
  product: Pick<Product, "id" | "brandId" | "marketplaceLinks">;
  placement: MarketplacePlacement;
  compact?: boolean;
}>;

export default function MarketplaceActions({
  product,
  placement,
  compact = false,
}: Props) {
  const availableMarketplaces = getAvailableMarketplaces(product);

  if (availableMarketplaces.length === 0) {
    return null;
  }

  return (
    <Stack direction="row" gap={1} useFlexGap flexWrap="wrap">
      {availableMarketplaces.map(({ marketplaceId, url }) => {
        const marketplace = marketplaces[marketplaceId];

        return (
          <MarketplaceActionButton
            key={marketplaceId}
            productId={product.id}
            brandId={product.brandId}
            marketplaceId={marketplaceId}
            placement={placement}
            link={url}
            label={
              compact
                ? marketplace.compactButtonLabel
                : marketplace.buttonLabel
            }
          />
        );
      })}
    </Stack>
  );
}
