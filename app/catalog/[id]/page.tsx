import type { Product } from "@/types";
import {
  getPublishedProductBySlug,
  getPublishedProducts,
} from "@/lib/catalog";
import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Metrika from "@/app/_components/metrika";
import MarketplaceActions from "@/app/_components/marketplaceActions";
import ProductDescription from "@/app/_components/productDescription";
import ProductBreadcrumbs from "@/app/_components/productBreadcrumbs";
import ProductFaq from "@/app/_components/productFaq";
import { brands } from "@/constants";
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

  const brand = brands[product.brandId];

  return (
    <>
      <Metrika />
      <Container sx={{ pt: 12, pb: { xs: 8, sm: 16 } }}>
        <ProductBreadcrumbs product={product} />
        <Stack
          gap={2}
          direction={{
            xs: "column",
            md: "row",
          }}
          useFlexGap
        >
          <Box
            flexShrink={0}
            flexGrow={0}
            role="img"
            aria-label={product.imageAlt}
            sx={{
              backgroundImage: `url(${product.image})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: {
                xs: 350,
                md: 500,
              },
              width: {
                xs: "auto",
                md: 500,
              },
            }}
          />
          <Box>
            <Typography variant="overline" component="div">
              {brand.name}
            </Typography>
            <Typography variant="h5" component="h1" paragraph>
              {product.title}
            </Typography>
            <Typography variant="subtitle2">
              {product.categoryId === "face-cream" ? "Масса" : "Объем"}
            </Typography>
            <Typography paragraph>{product.volume}</Typography>
            <Box marginBottom={2}>
              <MarketplaceActions
                product={product}
                placement="product-hero"
              />
            </Box>
            <ProductDescription content={product.content} />
            <Typography variant="h6" component="h2">
              Полный состав
            </Typography>
            <Typography paragraph>{product.composition}</Typography>
            <ProductFaq items={product.content.faq} />
          </Box>
        </Stack>
      </Container>
      <Divider />
    </>
  );
}
