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
              component={NextLink}
              href={category.href}
              aria-label={category.name}
              sx={{
                bgcolor: index === 0 ? "#E8EDE6" : skinColors.blueMist,
                border: "1px solid",
                borderColor: "divider",
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
