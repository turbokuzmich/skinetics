"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type MetrikaFn = (id: number, method: string, url?: string) => void;

type TMR = {
  pageView(params: { id: number; url: string }): void;
};

export default function Metrika() {
  const pathname = usePathname();

  useEffect(() => {
    if ("ym" in window) {
      (window.ym as MetrikaFn)(
        98874723,
        "hit",
        `https://skinetics.ru${pathname}`
      );
    }
    if ("_tmr" in window && window._tmr.pageView) {
      (window._tmr as TMR).pageView({
        id: 3589962,
        url: `https://skinetics.ru${pathname}`,
      });
    }
  }, [pathname]);

  return null;
}
