import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import {
  getPublishedProducts,
  getPublishedProductsByCategory,
} from "@/lib/catalog";
import type { ProductCategoryId } from "@/types";
import ProductCard from "./productCard";
import SectionHeading from "./sectionHeading";

type CatalogProps = Readonly<{
  heading: string;
  description?: string;
  categoryId?: ProductCategoryId;
  headingComponent?: "h1" | "h2";
  eyebrow?: string;
  showMarketplaceActions?: boolean;
}>;

export default function Catalog({
  heading,
  description,
  categoryId,
  headingComponent = "h1",
  eyebrow,
  showMarketplaceActions = true,
}: CatalogProps) {
  const products = categoryId
    ? getPublishedProductsByCategory(categoryId)
    : getPublishedProducts();

  return (
    <Container
      component="section"
      id="catalog"
      maxWidth="lg"
      sx={{ py: { xs: 12, md: 20 } }}
    >
      <SectionHeading
        component={headingComponent}
        description={description}
        eyebrow={eyebrow}
        heading={heading}
      />
      <Grid container spacing={{ xs: 6, md: 8 }} sx={{ mt: { xs: 8, md: 12 } }}>
        {products.map((product, index) => (
          <Grid
            key={product.id}
            size={{
              xs: 12,
              sm: 6,
              md: categoryId === "face-cream" ? 6 : 4,
            }}
            sx={{ display: "flex" }}
          >
            <ProductCard
              headingComponent={headingComponent === "h1" ? "h2" : "h3"}
              priority={index === 0}
              product={product}
              showMarketplaceActions={showMarketplaceActions}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
