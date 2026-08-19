import type { MetadataRoute } from "next";
import { items } from "@/constants";

const siteUrl = "https://skinetics.ru";

const indexableStaticPaths = ["/", "/catalog", "/serum", "/about", "/contacts"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...indexableStaticPaths.map((path) => ({
      url: new URL(path, siteUrl).toString(),
    })),
    ...items.map(({ id }) => ({
      url: new URL(`/catalog/${id}`, siteUrl).toString(),
    })),
  ];
}
