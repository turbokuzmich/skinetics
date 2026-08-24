import { type Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { brandAccents, skinColors } from "@/app/designTokens";
import Metrika from "../_components/metrika";
import SectionHeading from "../_components/sectionHeading";

export const metadata: Metadata = {
  title: "О Skinetics, брендах и компании | Skinetics",
  description:
    "Skinetics объединяет косметику Dr. Health, SkineticsLab и Neon Beard. Информация об ООО «Демидов Люкс СПА», участии в московских программах и реквизитах.",
  alternates: {
    canonical: "/about",
  },
};

const productBrands = [
  {
    name: "Dr. Health",
    accent: brandAccents["dr-health"],
    description: "Косметика для ухода за волосами и кожей головы.",
  },
  {
    name: "SkineticsLab",
    accent: brandAccents.skineticslab,
    description: "Косметика для ухода за кожей лица.",
  },
  {
    name: "Neon Beard",
    accent: brandAccents["neon-beard"],
    description: "Косметика для ухода за кожей лица.",
  },
] as const;

const trustFacts = [
  "ООО «Демидов Люкс СПА» является членом Московского инновационного кластера.",
  "Компания представлена в каталоге Московского экспортёра.",
  "Компания участвует в программе «Сделано в Москве».",
] as const;

const legalDetails = [
  ["Р/с", "40702810570010248314"],
  ["К/с", "30101810645250000092"],
  ["БИК", "044525092"],
  ["ИНН", "7751525117"],
  ["КПП", "775001001"],
  ["ОКПО", "42943661"],
  ["ОГРН", "5147746230297"],
] as const;

export default function About() {
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
            eyebrow="Мультибрендовый каталог"
            heading="Skinetics и наши бренды"
            description="Skinetics помогает разобраться в назначении, составе и применении косметики для лица, волос и кожи головы."
          />
          <Typography
            color="text.secondary"
            sx={{ lineHeight: 1.75, maxWidth: 760, mt: 6 }}
          >
            Skinetics — это каталог, а не продуктовый бренд. Средства в каталоге
            выпускаются под тремя самостоятельными брендами: Dr. Health,
            SkineticsLab и Neon Beard.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ mt: 7 }}
          >
            <Button component={Link} href="/catalog" variant="contained">
              Смотреть каталог
            </Button>
            <Button component={Link} href="/contacts" variant="outlined">
              Связаться с нами
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container
        component="section"
        maxWidth="lg"
        sx={{ py: { xs: 12, md: 18 } }}
      >
        <Typography component="h2" variant="h2">
          Три продуктовых бренда
        </Typography>
        <Grid container spacing={4} sx={{ mt: { xs: 7, md: 9 } }}>
          {productBrands.map((brand) => (
            <Grid key={brand.name} size={{ xs: 12, md: 4 }}>
              <Box
                component="article"
                sx={{
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  borderTop: `4px solid ${brand.accent}`,
                  height: "100%",
                  p: { xs: 6, md: 7 },
                }}
              >
                <Typography component="h3" variant="h3">
                  {brand.name}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ lineHeight: 1.7, mt: 4 }}
                >
                  {brand.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Typography
          color="text.secondary"
          sx={{ lineHeight: 1.75, maxWidth: 800, mt: 8 }}
        >
          ООО «Демидов Люкс СПА» — компания, которая управляет сайтом и указана
          в юридических сведениях. Название компании не заменяет названия
          продуктовых брендов.
        </Typography>
      </Container>

      <Box
        component="section"
        sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 12, md: 18 } }}>
          <Typography
            component="p"
            variant="overline"
            sx={{ color: skinColors.border, fontWeight: 500, mb: 3 }}
          >
            Подтверждённые сведения
          </Typography>
          <Typography component="h2" variant="h2">
            Проверенные факты
          </Typography>
          <Stack
            component="ul"
            sx={{
              listStyle: "none",
              m: 0,
              mt: 7,
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
                  fontSize: { xs: "1.125rem", md: "1.35rem" },
                  lineHeight: 1.5,
                  py: 5,
                }}
              >
                {fact}
              </Typography>
            ))}
          </Stack>
        </Container>
      </Box>

      <Container
        component="section"
        maxWidth="lg"
        sx={{ py: { xs: 12, md: 18 } }}
      >
        <Grid container spacing={{ xs: 8, md: 12 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography component="h2" variant="h2">
              Реквизиты
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7, mt: 5 }}>
              Юридическое лицо: ООО «Демидов Люкс СПА».
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <TableContainer
              sx={{
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Table
                size="small"
                aria-label="Реквизиты ООО «Демидов Люкс СПА»"
              >
                <TableBody>
                  {legalDetails.map(([label, value]) => (
                    <TableRow key={label}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: 500 }}
                      >
                        {label}
                      </TableCell>
                      <TableCell align="right" sx={{ overflowWrap: "anywhere" }}>
                        {value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
