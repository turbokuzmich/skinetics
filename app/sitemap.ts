import type { MetadataRoute } from "next";
import { getPublishedProducts } from "@/lib/catalog";

const siteUrl = "https://skinetics.ru";

const indexableStaticPaths = ["/", "/catalog", "/serum", "/about", "/contacts"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...indexableStaticPaths.map((path) => ({
      url: new URL(path, siteUrl).toString(),
    })),
    ...getPublishedProducts().map(({ slug }) => ({
      url: new URL(`/catalog/${slug}`, siteUrl).toString(),
    })),
  ];
}
