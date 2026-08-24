import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { brandAccents } from "@/app/designTokens";
import { brands, products } from "@/constants";

const heroProducts = ["red_pepper", "renewal", "ultra_lift"].map(
  (id) => products.find((product) => product.id === id)!,
);

export default function HomeHero() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 12, md: 20 } }}>
        <Grid container spacing={{ xs: 10, md: 12 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              color="secondary.main"
              component="p"
              variant="overline"
              sx={{ display: "block", fontWeight: 500, mb: 3 }}
            >
              Каталог косметики Dr. Health, SkineticsLab и Neon Beard
            </Typography>
            <Typography component="h1" variant="h1" sx={{ maxWidth: 720 }}>
              Косметика для лица, волос и кожи головы
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: { xs: "1.0625rem", md: "1.2rem" },
                lineHeight: 1.7,
                maxWidth: 620,
                mt: 6,
              }}
            >
              Skinetics помогает сравнить назначение, состав и способ
              применения средств. Покупка и доставка оформляются на
              Wildberries или Ozon.
            </Typography>
            <Button
              component={Link}
              href="/catalog"
              variant="contained"
              sx={{ mt: 7 }}
            >
              Смотреть каталог
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="figure"
              aria-label="Средства трёх брендов каталога Skinetics"
              sx={{
                border: "1px solid",
                borderColor: "divider",
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                m: 0,
                minHeight: { xs: 340, sm: 460 },
                overflow: "hidden",
              }}
            >
              {heroProducts.map((product, index) => (
                <Stack
                  key={product.id}
                  sx={{
                    borderLeft: index === 0 ? 0 : "1px solid",
                    borderColor: "divider",
                    minWidth: 0,
                    pt: index === 1 ? { xs: 7, sm: 11 } : { xs: 4, sm: 6 },
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: brandAccents[product.brandId],
                      fontSize: { xs: "0.7rem", sm: "0.8rem" },
                      fontWeight: 500,
                      minHeight: 32,
                      px: { xs: 2, sm: 4 },
                    }}
                  >
                    {brands[product.brandId].name}
                  </Typography>
                  <Box
                    sx={{
                      flexGrow: 1,
                      minHeight: 0,
                      position: "relative",
                    }}
                  >
                    <Image
                      alt=""
                      fill
                      priority={index === 1}
                      sizes="(max-width: 900px) 30vw, 190px"
                      src={product.image}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                  <Box
                    aria-hidden="true"
                    sx={{
                      bgcolor: brandAccents[product.brandId],
                      height: 3,
                    }}
                  />
                </Stack>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
