"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Metrika() {
  const pathname = usePathname();

  useEffect(() => {
    console.log("metrika", pathname);
    // ts-ignore
    ym(98874723, "hit", `https://skinetics.ru${pathname}`);
  }, []);

  return null;
}
