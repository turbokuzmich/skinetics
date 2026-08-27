import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { skinColors } from "@/app/designTokens";

const trustFacts = [
  "ООО «Демидов Люкс СПА» является членом Московского инновационного кластера.",
  "Компания представлена в каталоге Московского экспортёра.",
  "Компания участвует в программе «Сделано в Москве».",
] as const;

export default function TrustEvidence() {
  return (
    <Box
      component="section"
      sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 12, md: 18 } }}>
        <Grid container spacing={{ xs: 8, md: 12 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography
              component="p"
              variant="overline"
              sx={{ color: skinColors.border, fontWeight: 500, mb: 3 }}
            >
              О компании
            </Typography>
            <Typography component="h2" variant="h2">
              Участие в московских программах
            </Typography>
            <Typography
              sx={{ color: skinColors.border, lineHeight: 1.7, mt: 5 }}
            >
              Сайтом Skinetics управляет ООО «Демидов Люкс СПА». Здесь
              представлены средства Dr. Health, SkineticsLab и Neon Beard.
            </Typography>
            <Button
              component={Link}
              href="/about"
              variant="outlined"
              sx={{
                borderColor: skinColors.border,
                color: "primary.contrastText",
                mt: 7,
                "&:hover": {
                  borderColor: skinColors.surface,
                  bgcolor: "rgba(251, 248, 240, 0.08)",
                },
              }}
            >
              Подробнее о компании
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack
              component="ul"
              sx={{
                listStyle: "none",
                m: 0,
                p: 0,
                "& > li + li": {
                  borderTop: `1px solid ${skinColors.mutedInk}`,
                },
              }}
            >
              {trustFacts.map((fact) => (
                <Typography
                  component="li"
                  key={fact}
                  sx={{
                    fontFamily: "var(--font-literata), Georgia, serif",
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                    lineHeight: 1.45,
                    py: { xs: 5, md: 6 },
                  }}
                >
                  {fact}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
