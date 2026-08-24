import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { productCategories } from "@/constants";
import type { Product } from "@/types";

const siteUrl = "https://skinetics.ru";

export default function ProductBreadcrumbs({
  product,
}: Readonly<{ product: Pick<Product, "categoryId" | "slug" | "title"> }>) {
  const category = productCategories[product.categoryId];
  const productPath = `/catalog/${product.slug}`;
  const items = [
    { name: "Главная", path: "/" },
    { name: category.name, path: category.path },
    { name: product.title, path: productPath },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: new URL(path, siteUrl).toString(),
    })),
  };

  return (
    <>
      <Breadcrumbs
        aria-label="Хлебные крошки"
        sx={{
          color: "text.secondary",
          fontSize: "0.875rem",
          overflowWrap: "anywhere",
          pt: { xs: 6, md: 8 },
        }}
      >
        <Link
          component={NextLink}
          href="/"
          color="inherit"
          sx={{ alignItems: "center", display: "inline-flex", minHeight: 44 }}
        >
          Главная
        </Link>
        <Link
          component={NextLink}
          href={category.path}
          color="inherit"
          sx={{ alignItems: "center", display: "inline-flex", minHeight: 44 }}
        >
          {category.name}
        </Link>
        <Typography color="text.primary" aria-current="page">
          {product.title}
        </Typography>
      </Breadcrumbs>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
