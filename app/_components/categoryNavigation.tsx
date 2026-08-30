import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { skinColors, skinRadii } from "@/app/designTokens";
import SectionHeading from "./sectionHeading";

const categories = [
  {
    name: "Сыворотки для кожи головы",
    href: "/serum",
    backgroundImage: "/categories/scalp-serums.webp",
    description:
      "Несмываемые сыворотки для ухода при склонности к выпадению волос, перхоти и жирности кожи головы.",
  },
  {
    name: "Кремы для лица",
    href: "/cream",
    backgroundImage: "/categories/face-creams.webp",
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
              component={NextLink}
              href={category.href}
              aria-label={category.name}
              sx={{
                backgroundImage: {
                  xs: `linear-gradient(90deg, rgba(245, 241, 232, 0.78) 0%, rgba(245, 241, 232, 0.64) 86%, rgba(245, 241, 232, 0.12) 100%), url("${category.backgroundImage}")`,
                  md: `linear-gradient(90deg, rgba(245, 241, 232, 0.68) 0%, rgba(245, 241, 232, 0.5) 82%, rgba(245, 241, 232, 0.08) 100%), url("${category.backgroundImage}")`,
                },
                backgroundPosition: "right center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                bgcolor: index === 0 ? "#E8EDE6" : skinColors.blueMist,
                border: "none",
                borderRadius: `${skinRadii.medium}px`,
                color: "text.primary",
                display: "block",
                height: "100%",
                minHeight: { md: 330 },
                overflow: "hidden",
                p: { xs: 6, md: 8 },
                position: "relative",
                textDecoration: "none",
                transition: "box-shadow 260ms ease",
                "&:hover": {
                  boxShadow: "0 18px 48px rgba(73, 56, 42, 0.1)",
                },
                "&:focus-visible": {
                  outline: "3px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 3,
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
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
