import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { brandAccents } from "@/app/designTokens";
import { brands } from "@/constants";
import type { Product } from "@/types";
import MarketplaceActions from "./marketplaceActions";
import ProductMedia from "./productMedia";

type Props = Readonly<{
  product: Product;
  showMarketplaceActions?: boolean;
  headingComponent?: "h2" | "h3";
  priority?: boolean;
}>;

export default function ProductCard({
  product,
  showMarketplaceActions = false,
  headingComponent = "h3",
  priority = false,
}: Props) {
  return (
    <Card
      component="article"
      className="catalog-card"
      sx={{
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderTop: `3px solid ${brandAccents[product.brandId]}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        width: "100%",
        transition: "border-color 240ms ease, box-shadow 240ms ease, transform 240ms ease",
      }}
    >
      <ProductMedia product={product} priority={priority} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: 4,
          p: { xs: 5, md: 6 },
          "&:last-child": { pb: { xs: 5, md: 6 } },
        }}
      >
        <Stack direction="row" justifyContent="space-between" gap={3}>
          <Typography
            color={brandAccents[product.brandId]}
            sx={{ fontWeight: 500 }}
          >
            {brands[product.brandId].name}
          </Typography>
          <Typography color="text.secondary">{product.volume}</Typography>
        </Stack>
        <Typography
          component={headingComponent}
          variant="h3"
          sx={{ fontSize: "1.55rem" }}
        >
          {product.title}
        </Typography>
        <Typography color="text.secondary" sx={{ lineHeight: 1.65 }}>
          {product.summary}
        </Typography>
        <Stack spacing={3} sx={{ alignItems: "flex-start", mt: "auto", pt: 2 }}>
          <Button
            component={Link}
            href={`/catalog/${product.slug}`}
            aria-label={`Подробнее: ${product.title}`}
            variant="contained"
          >
            Подробнее
          </Button>
          {showMarketplaceActions ? (
            <MarketplaceActions
              product={product}
              placement="catalog-card"
              compact
            />
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
