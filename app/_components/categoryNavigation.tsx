import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { skinColors } from "@/app/designTokens";
import SectionHeading from "./sectionHeading";

const categories = [
  {
    name: "Сыворотки для кожи головы",
    href: "/serum",
    description:
      "Несмываемые сыворотки для ухода при склонности к выпадению волос, перхоти и жирности кожи головы.",
  },
  {
    name: "Кремы для лица",
    href: "/cream",
    description:
      "Ежедневный уход за кожей лица с пептидами, увлажняющими и смягчающими компонентами.",
  },
] as const;

export default function CategoryNavigation() {
  return (
    <Container
      component="section"
      maxWidth="lg"
      sx={{ py: { xs: 12, md: 18 } }}
    >
      <SectionHeading
        eyebrow="Два направления ухода"
        heading="Начните с категории"
      />
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        sx={{ mt: { xs: 8, md: 10 } }}
      >
        {categories.map((category, index) => (
          <Grid key={category.href} size={{ xs: 12, md: 6 }}>
            <Box
              component="article"
              sx={{
                bgcolor: index === 0 ? "#E8EDE6" : skinColors.blueMist,
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
                minHeight: { md: 330 },
                overflow: "hidden",
                p: { xs: 6, md: 8 },
                position: "relative",
                transition: "transform 260ms ease, box-shadow 260ms ease",
                "&:hover": {
                  boxShadow: "0 18px 48px rgba(73, 56, 42, 0.1)",
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Stack spacing={4} sx={{ height: "100%", position: "relative", zIndex: 1 }}>
                <Typography component="h3" variant="h3">
                  {category.name}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {category.description}
                </Typography>
                  <Link
                  component={NextLink}
                  href={category.href}
                  color="text.primary"
                  underline="always"
                    sx={{
                    alignSelf: "flex-start",
                    fontWeight: 500,
                    minHeight: 44,
                    mt: "auto",
                      py: 2,
                      transition: "color 180ms ease, letter-spacing 180ms ease",
                      "&:hover": { letterSpacing: "0.02em" },
                    }}
                >
                  {category.name}
                </Link>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
