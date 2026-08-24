"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type MetrikaFn = (id: number, method: string, url?: string) => void;

type TMR = {
  pageView?(params: { id: number; url: string }): void;
  push(params: { id: number; type: "pageView"; url: string }): void;
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
    if ("_tmr" in window) {
      const tmr = window._tmr as TMR;
      const pageView = {
        id: 3589962,
        url: `https://skinetics.ru${pathname}`,
      };
      if (tmr.pageView) {
        tmr.pageView(pageView);
      } else if (tmr.push) {
        tmr.push({ ...pageView, type: "pageView" });
      }
    }
  }, [pathname]);

  return null;
}
