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
              Несмываемые сыворотки для ухода за кожей головы и кремы для
              лица с пептидами. Узнайте, для чего подходит каждое средство
              и как его применять.
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
              sx={{ m: 0, position: "relative" }}
            >
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
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
              <Stack
                component="figcaption"
                direction="row"
                spacing={{ xs: 2, sm: 3 }}
                sx={{
                  alignItems: "baseline",
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderTop: 0,
                  borderColor: "divider",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  px: { xs: 3, sm: 4 },
                  py: { xs: 2.5, sm: 3 },
                }}
              >
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    lineHeight: 1.2,
                    textTransform: "uppercase",
                  }}
                >
                  Доступно на
                </Typography>
                <Stack direction="row" spacing={{ xs: 2.5, sm: 3 }}>
                  <Typography
                    component="span"
                    sx={{
                      color: "#CB11AB",
                      fontFamily: "Arial, sans-serif",
                      fontSize: { xs: "1.125rem", sm: "1.3rem" },
                      fontWeight: 800,
                      letterSpacing: "-0.045em",
                      lineHeight: 1.1,
                    }}
                  >
                    Wildberries
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      color: "#005BFF",
                      fontFamily: "Arial, sans-serif",
                      fontSize: { xs: "1.125rem", sm: "1.3rem" },
                      fontWeight: 900,
                      letterSpacing: "-0.055em",
                      lineHeight: 1.1,
                    }}
                  >
                    OZON
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
