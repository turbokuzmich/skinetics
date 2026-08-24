import { type Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import Metrika from "../_components/metrika";
import SectionHeading from "../_components/sectionHeading";
import FeedbackForm from "./_components/form";

export const metadata: Metadata = {
  title: "Контакты и обратная связь | Skinetics",
  description:
    "Телефоны и электронная почта Skinetics, форма обратной связи и ссылки на каталог косметики Dr. Health, SkineticsLab и Neon Beard.",
  alternates: {
    canonical: "/contacts",
  },
};

export default function Contacts() {
  return (
    <>
      <Metrika />
      <Box
        component="section"
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 12, md: 18 } }}>
          <SectionHeading
            component="h1"
            eyebrow="Связаться со Skinetics"
            heading="Контакты"
            description="Задайте вопрос о каталоге и продукции или оставьте сообщение через форму обратной связи."
          />
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 12, md: 18 } }}>
        <Grid container spacing={{ xs: 10, md: 12 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography component="h2" variant="h2">
              Связаться с нами
            </Typography>
            <Box component="address" sx={{ fontStyle: "normal", mt: 7 }}>
              <Stack
                component="ul"
                spacing={5}
                sx={{ listStyle: "none", m: 0, p: 0 }}
              >
                <Box component="li">
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ mb: 2 }}
                  >
                    Телефон
                  </Typography>
                  <Stack spacing={1}>
                    <Link
                      href="tel:+74956659015"
                      color="text.primary"
                      sx={{ alignSelf: "flex-start", minHeight: 44, py: 2 }}
                    >
                      +7 (495) 665 9015
                    </Link>
                    <Link
                      href="tel:+79263853751"
                      color="text.primary"
                      sx={{ alignSelf: "flex-start", minHeight: 44, py: 2 }}
                    >
                      +7 926 385 3751
                    </Link>
                  </Stack>
                </Box>
                <Box component="li">
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ mb: 2 }}
                  >
                    Электронная почта
                  </Typography>
                  <Link
                    href="mailto:info@skinetics.ru"
                    color="text.primary"
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                      minHeight: 44,
                    }}
                  >
                    info@skinetics.ru
                  </Link>
                </Box>
              </Stack>
            </Box>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7, mt: 8 }}>
              Skinetics объединяет косметику Dr. Health, SkineticsLab и Neon
              Beard. Покупка и доставка оформляются на Wildberries или Ozon.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row", md: "column" }}
              spacing={3}
              sx={{ alignItems: "flex-start", mt: 6 }}
            >
              <Button component={NextLink} href="/about" variant="outlined">
                О Skinetics
              </Button>
              <Button component={NextLink} href="/catalog" variant="text">
                Перейти в каталог
              </Button>
            </Stack>
          </Grid>

          <Grid
            component="section"
            aria-labelledby="feedback-heading"
            size={{ xs: 12, md: 7 }}
          >
            <Typography component="h2" id="feedback-heading" variant="h2">
              Обратная связь
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7, mt: 5 }}>
              Заполните форму, и мы ответим по указанным контактам.
            </Typography>
            <Paper
              elevation={0}
              sx={{ border: "1px solid", borderColor: "divider", mt: 7 }}
            >
              <FeedbackForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
