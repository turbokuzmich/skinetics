import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { brandAccents } from "@/app/designTokens";
import { brands } from "@/constants";
import type { Product, ProductCategoryId } from "@/types";
import MarketplaceActions from "./marketplaceActions";
import ProductMedia from "./productMedia";

export function getQuantityLabel(categoryId: ProductCategoryId) {
  return categoryId === "face-cream" ? "Масса" : "Объем";
}

export default function ProductHero({
  product,
}: Readonly<{ product: Product }>) {
  const brand = brands[product.brandId];
  const accent = brandAccents[product.brandId];

  return (
    <Box
      component="section"
      aria-labelledby="product-title"
      sx={{
        display: "grid",
        gap: { xs: 8, md: 12 },
        gridTemplateAreas: {
          xs: '"heading" "media" "actions"',
          md: '"media heading" "media actions"',
        },
        gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "5fr 7fr" },
        gridTemplateRows: { md: "auto 1fr" },
        py: { xs: 6, md: 10 },
      }}
    >
      <Stack
        spacing={{ xs: 5, md: 6 }}
        sx={{
          alignItems: "flex-start",
          alignSelf: "end",
          gridArea: "heading",
          minWidth: 0,
        }}
      >
        <Typography
          component="p"
          sx={{
            borderLeft: `3px solid ${accent}`,
            color: accent,
            fontSize: "0.875rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            lineHeight: 1.4,
            pl: 3,
            textTransform: "uppercase",
          }}
        >
          {brand.name}
        </Typography>
        <Typography
          component="h1"
          id="product-title"
          variant="h1"
          sx={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", maxWidth: "18ch" }}
        >
          {product.title}
        </Typography>
      </Stack>
      <Box
        sx={{
          alignSelf: "start",
          border: "1px solid",
          borderColor: "divider",
          borderTop: `4px solid ${accent}`,
          gridArea: "media",
          maxWidth: { xs: 520, md: "none" },
          width: "100%",
        }}
      >
        <ProductMedia
          product={product}
          priority
          sizes="(max-width: 899px) 100vw, 42vw"
        />
      </Box>
      <Stack
        spacing={{ xs: 5, md: 6 }}
        sx={{
          alignItems: "flex-start",
          alignSelf: "start",
          gridArea: "actions",
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            borderBlock: "1px solid",
            borderColor: "divider",
            display: "grid",
            gap: 1,
            minWidth: { xs: "100%", sm: 180 },
            py: 4,
          }}
        >
          <Typography
            component="span"
            color="text.secondary"
            sx={{ fontSize: "0.8125rem", fontWeight: 500 }}
          >
            {getQuantityLabel(product.categoryId)}
          </Typography>
          <Typography component="span" sx={{ fontSize: "1.125rem" }}>
            {product.volume}
          </Typography>
        </Box>
        <MarketplaceActions product={product} placement="product-hero" />
      </Stack>
    </Box>
  );
}
