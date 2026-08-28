"use client";

import Button from "@mui/material/Button";
import Image from "next/image";
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
  logoSrc?: string;
  logoOnly?: boolean;
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
  logoSrc,
  logoOnly = false,
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
      aria-label={logoOnly ? label : undefined}
      title={logoOnly ? label : undefined}
      variant={logoOnly ? "text" : logoSrc ? "outlined" : "contained"}
      sx={{
        ...(logoSrc
          ? {
              backgroundColor: "background.paper",
              borderColor: "divider",
              color: "text.primary",
            }
          : {
              color: "white",
              ...marketplaceStyles[marketplaceId],
            }),
        gap: 2,
        minHeight: 44,
        paddingInline: 3,
        textTransform: "none",
        ...(logoOnly && {
          backgroundColor: "rgba(251, 248, 240, 0.78)",
          border: 0,
          boxShadow: "0 8px 18px rgba(23, 34, 30, 0.1)",
          minWidth: 48,
          paddingInline: 0,
        }),
        "&:hover": {
          ...(logoOnly
            ? {
                backgroundColor: "background.paper",
                boxShadow: "0 10px 22px rgba(23, 34, 30, 0.14)",
              }
            : logoSrc
            ? {
                backgroundColor: "action.hover",
                borderColor: "text.secondary",
              }
            : { filter: "brightness(0.92)" }),
        },
        "&:active": {
          ...(logoSrc
            ? { transform: "translateY(1px)" }
            : { filter: "brightness(0.85)" }),
        },
      }}
    >
      {logoSrc ? (
        <Image
          alt=""
          height={28}
          src={logoSrc}
          width={28}
        />
      ) : null}
      {logoOnly ? null : label}
    </Button>
  );
}
