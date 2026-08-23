"use client";

import Button from "@mui/material/Button";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { reachMarketplaceClick } from "@/lib/metrika";
import {
  getCampaignContext,
  prepareMarketplaceUrl,
} from "@/lib/marketplaceUrl";
import type {
  BrandId,
  MarketplaceId,
  MarketplacePlacement,
  Product,
} from "@/types";

type Props = Readonly<{
  productId: Product["id"];
  brandId: BrandId;
  marketplaceId: MarketplaceId;
  placement: MarketplacePlacement;
  link: string;
  label: string;
}>;

const marketplaceStyles: Record<MarketplaceId, object> = {
  wildberries: {
    backgroundImage:
      "linear-gradient(0.819turn,rgba(99,16,127,1) 0%,rgba(176,18,159,1) 100%)",
  },
  ozon: {
    backgroundColor: "#005bff",
  },
};

export default function MarketplaceActionButton({
  productId,
  brandId,
  marketplaceId,
  placement,
  link,
  label,
}: Props) {
  const pagePath = usePathname();
  const [url, setUrl] = useState(() =>
    prepareMarketplaceUrl(marketplaceId, link, "")
  );

  useEffect(() => {
    setUrl(prepareMarketplaceUrl(marketplaceId, link, window.location.search));
  }, [link, marketplaceId]);

  const onClick = useCallback(() => {
    const campaign = getCampaignContext(window.location.search);

    reachMarketplaceClick({
      product_id: productId,
      brand_id: brandId,
      marketplace: marketplaceId,
      placement,
      page_path: pagePath,
      ...(campaign ? { campaign } : {}),
    });
  }, [brandId, marketplaceId, pagePath, placement, productId]);

  return (
    <Button
      onClick={onClick}
      size="large"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        color: "white",
        textTransform: "uppercase",
        paddingInline: 3,
        ...marketplaceStyles[marketplaceId],
        "&:hover": {
          filter: "brightness(0.92)",
        },
        "&:active": {
          filter: "brightness(0.85)",
        },
      }}
    >
      {label}
    </Button>
  );
}
