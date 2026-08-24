import type { Product } from "@/types";
import {
  getPublishedProductBySlug,
  getPublishedProducts,
} from "@/lib/catalog";
import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Metrika from "@/app/_components/metrika";
import ProductDescription from "@/app/_components/productDescription";
import ProductBreadcrumbs from "@/app/_components/productBreadcrumbs";
import ProductFaq from "@/app/_components/productFaq";
import ProductHero from "@/app/_components/productHero";
import ContextualLinks from "@/app/_components/contextualLinks";
import { type Metadata } from "next";

type Props = Readonly<{
  params: { id: Product["slug"] };
}>;

export function generateMetadata({ params: { id } }: Props): Metadata {
  const product = getPublishedProductBySlug(id);

  if (!product) {
    return {};
  }

  return {
    ...product.metadata,
    alternates: {
      canonical: `/catalog/${product.slug}`,
    },
  };
}

export function generateStaticParams() {
  return getPublishedProducts().map(({ slug }) => ({ id: slug }));
}

export const dynamicParams = false;

export default function CatalogItem({ params: { id } }: Props) {
  const product = getPublishedProductBySlug(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Metrika />
      <Container maxWidth="lg" sx={{ pb: { xs: 12, md: 18 } }}>
        <ProductBreadcrumbs product={product} />
        <ProductHero product={product} />
        <ProductDescription content={product.content} />
        <Box
          component="section"
          aria-labelledby="composition-heading"
          sx={{ maxWidth: 800, mx: "auto", py: { xs: 8, md: 12 } }}
        >
          <Typography
            id="composition-heading"
            component="h2"
            variant="h2"
            sx={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", mb: 4 }}
          >
            Полный состав
          </Typography>
          <Typography sx={{ lineHeight: 1.75 }}>
            {product.composition}
          </Typography>
        </Box>
        <ProductFaq items={product.content.faq} />
        <ContextualLinks product={product} />
      </Container>
    </>
  );
}
