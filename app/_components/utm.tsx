"use client";

import { useSearchParams } from "next/navigation";
import {
  createContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
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

type UTMS = {
  [marketPlace in Marketplace]: UTM;
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

const defaultUTM: UTMS = {
  [Marketplace.wildberries]: {
    [UTMTag.campaign]: `${campaignPrefix[Marketplace.wildberries]}-site`,
    [UTMTag.medium]: "free",
    [UTMTag.source]: "site",
  },
};

export const UTMContext = createContext<UTMS>(defaultUTM);

export default function UTMProvider({ children }: { children: ReactNode }) {
  const utmSet = useRef(false);

  const searchParams = useSearchParams();

  const [utm, setUtm] = useState<UTMS>(defaultUTM);

  useEffect(() => {
    if (!utmSet.current) {
      const searchParamsObject = Array.from(searchParams.entries()).reduce(
        (result, [key, value]) => ({ ...result, [key]: value }),
        {}
      );

      const utmResult = utmSchema.safeParse(searchParamsObject);

      if (utmResult.success) {
        setUtm({
          [Marketplace.wildberries]: {
            ...utmResult.data,
            [UTMTag.campaign]: `${campaignPrefix.wildberries}-site-${utmResult.data.utm_campaign}`,
          },
        });
      }

      utmSet.current = true;
    }
  }, [searchParams, utmSet, setUtm]);

  return <UTMContext.Provider value={utm}>{children}</UTMContext.Provider>;
}
