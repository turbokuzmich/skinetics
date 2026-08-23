import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import MarketplaceActions from "./marketplaceActions";
import {
  getPublishedProducts,
  getPublishedProductsByCategory,
} from "@/lib/catalog";
import { brands } from "@/constants";
import type { ProductCategoryId } from "@/types";

export default function Catalog({
  header = "Косметика для лица, волос и кожи головы",
  description = "Skinetics объединяет средства Dr. Health, SkineticsLab и Neon Beard. Изучите назначение, состав и способ применения, затем выберите доступный маркетплейс.",
  omitDescription,
  categoryId,
}: Readonly<{
  header?: string;
  description?: string;
  omitDescription?: boolean;
  categoryId?: ProductCategoryId;
}>) {
  const products = categoryId
    ? getPublishedProductsByCategory(categoryId)
    : getPublishedProducts();

  return (
    <Container
      id="catalog"
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h1" variant="h4" color="text.primary">
          {header}
        </Typography>
        {omitDescription ? null : (
          <Typography
            component="p"
            variant="h6"
            color="text.secondary"
            paddingTop={2}
            fontWeight={400}
            lineHeight="2rem"
          >
            {description}
          </Typography>
        )}
        {/* <Typography variant="body1" color="text.secondary">
          See what our customers love about our products. Discover how we excel
          in efficiency, durability, and satisfaction. Join us for quality,
          innovation, and reliable support.
        </Typography> */}
      </Box>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: categoryId === "face-cream" ? 6 : 4,
            }}
            key={product.id}
            sx={{ display: "flex" }}
          >
            <Card
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                image={product.image}
                role="img"
                aria-label={product.imageAlt}
                sx={{
                  height: 250,
                  backgroundSize: "contain",
                  flexShrink: 0,
                  flexGrow: 0,
                }}
              />
              <CardHeader
                title={product.title}
                subheader={`${brands[product.brandId].name} · ${product.volume}`}
                titleTypographyProps={{
                  variant: "h6",
                  lineHeight: "1.7rem",
                  gutterBottom: true,
                }}
                sx={{ alignItems: "flex-start" }}
              />
              <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                <Typography color="text.secondary">
                  {product.summary}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  p: 2,
                  flexShrink: 0,
                  flexGrow: 0,
                  alignItems: "stretch",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Button
                  component={Link}
                  href={`/catalog/${product.slug}`}
                  aria-label={`Подробнее о ${product.title}`}
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ alignSelf: "flex-start" }}
                >
                  Подробнее
                </Button>
                <MarketplaceActions
                  product={product}
                  placement="catalog-card"
                  compact
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
