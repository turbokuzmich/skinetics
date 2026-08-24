import { Literata, Manrope } from "next/font/google";

export const manrope = Manrope({
  display: "swap",
  subsets: ["cyrillic", "latin"],
  variable: "--font-manrope",
  weight: ["400", "500"],
});

export const literata = Literata({
  display: "swap",
  subsets: ["cyrillic", "latin"],
  variable: "--font-literata",
  weight: ["400", "500"],
});
