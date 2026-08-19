"use client";

import { useEffect, useState } from "react";
import { Marketplace } from "@/types";
import { z } from "zod";

enum UTMTag {
  source = "utm_source",
  medium = "utm_medium",
  campaign = "utm_campaign",
  term = "utm_term",
  content = "utm_content",
}

type UTM = {
  [key in UTMTag]?: string;
};

const utmSchema = z.object({
  utm_source: z.string(),
  utm_medium: z.string(),
  utm_campaign: z.string(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
});

const campaignPrefix: Record<Marketplace, string> = {
  [Marketplace.wildberries]: "73308-id",
};

const defaultWildberriesUtm: UTM = {
  [UTMTag.campaign]: `${campaignPrefix[Marketplace.wildberries]}-site`,
  [UTMTag.medium]: "free",
  [UTMTag.source]: "site",
};

export function useWildberriesUtm() {
  const [utm, setUtm] = useState<UTM>(defaultWildberriesUtm);

  useEffect(() => {
    const searchParamsObject = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );
    const utmResult = utmSchema.safeParse(searchParamsObject);

    if (utmResult.success) {
      setUtm({
        ...utmResult.data,
        [UTMTag.campaign]: `${campaignPrefix.wildberries}-site-${utmResult.data.utm_campaign}`,
      });
    }
  }, []);

  return utm;
}
