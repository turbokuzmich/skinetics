import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowDownwardRounded from "@mui/icons-material/ArrowDownwardRounded";
import Link from "next/link";
import { brandAccents } from "@/app/designTokens";
import { brands, marketplaces, products } from "@/constants";
import type { MarketplaceId } from "@/types";
import HomeHeroCarousel, { type HomeHeroSlide } from "./homeHeroCarousel";

const heroProducts = ["red_pepper", "renewal", "ultra_lift"].map(
  (id) => products.find((product) => product.id === id)!,
);

const heroImages: Record<string, string> = {
  red_pepper: "/items/hero/red_pepper.webp",
  renewal: "/items/hero/renewal.webp",
  ultra_lift: "/items/hero/ultra_lift.webp",
};

const marketplaceLogos: Record<MarketplaceId, string> = {
  wildberries: "/marketplaces/wildberries.svg",
  ozon: "/marketplaces/ozon-square.svg",
};

const marketplaceOrder: readonly MarketplaceId[] = ["wildberries", "ozon"];

const heroSlides: readonly HomeHeroSlide[] = heroProducts.map((product) => ({
  id: product.id,
  brandId: product.brandId,
  brandName: brands[product.brandId].name,
  brandColor: brandAccents[product.brandId],
  href: `/catalog/${product.slug}`,
  image: heroImages[product.id],
  imageAlt: product.imageAlt,
  marketplaces: marketplaceOrder.flatMap((marketplaceId) => {
    const link = product.marketplaceLinks[marketplaceId];

    return link
      ? [
          {
            id: marketplaceId,
            label: marketplaces[marketplaceId].buttonLabel,
            link,
            logoSrc: marketplaceLogos[marketplaceId],
          },
        ]
      : [];
  }),
  title: product.title,
}));

export default function HomeHero() {
  return (
    <Box
      component="section"
      className="hero-surface"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 10, md: 14 },
          position: "relative",
        }}
      >
        <Grid container spacing={{ xs: 10, md: 12 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              color="secondary.main"
              component="p"
              variant="overline"
              sx={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                mb: 4,
              }}
            >
              Каталог косметики Dr. Health, SkineticsLab и Neon Beard
            </Typography>
            <Typography
              component="h1"
              variant="h1"
              sx={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                letterSpacing: "-0.045em",
                lineHeight: 1.06,
                maxWidth: 720,
                textWrap: "balance",
              }}
            >
              Косметика для лица, волос и кожи головы
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: { xs: "1.0625rem", md: "1.125rem" },
                lineHeight: 1.65,
                maxWidth: 620,
                mt: 5,
              }}
            >
              Несмываемые сыворотки для кожи головы и кремы для лица. Сравните
              назначение, состав и способ применения.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{ alignItems: { xs: "flex-start", sm: "center" }, mt: 6 }}
            >
              <Button component={Link} href="/catalog" variant="contained">
                Смотреть каталог
              </Button>
              <Button
                component={Link}
                href="#catalog"
                variant="text"
                startIcon={<ArrowDownwardRounded aria-hidden="true" />}
                sx={{ color: "text.primary", px: 1.5 }}
              >
                Выбрать уход
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <HomeHeroCarousel slides={heroSlides} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
