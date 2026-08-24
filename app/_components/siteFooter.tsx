import { Suspense } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import DoctorForm from "./form";
import Wordmark from "./wordmark";

const catalogLinks = [
  { title: "Все средства", to: "/catalog" },
  { title: "Сыворотки", to: "/serum" },
  { title: "Кремы", to: "/cream" },
];

const skineticsLinks = [
  { title: "О нас", to: "/about" },
  { title: "Контакты", to: "/contacts" },
];

function FooterLinkGroup({
  heading,
  links,
}: Readonly<{
  heading: string;
  links: readonly { title: string; to: string }[];
}>) {
  return (
    <Box>
      <Typography component="h2" variant="subtitle2" sx={{ mb: 3 }}>
        {heading}
      </Typography>
      <Stack spacing={2}>
        {links.map(({ title, to }) => (
          <Link
            component={NextLink}
            href={to}
            key={to}
            color="text.primary"
            underline="hover"
            sx={{ alignSelf: "flex-start", minHeight: 44, py: 2 }}
          >
            {title}
          </Link>
        ))}
      </Stack>
    </Box>
  );
}

export default function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 12, md: 18 } }}>
        <Grid container spacing={{ xs: 10, md: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography component="h2" variant="h3" sx={{ mb: 3 }}>
              Записаться к трихологу
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 6, maxWidth: 560 }}>
              Оставьте контакты, чтобы обсудить консультацию по уходу за волосами и кожей головы.
            </Typography>
            <Suspense>
              <DoctorForm />
            </Suspense>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={7}>
              <Box>
                <Link
                  component={NextLink}
                  href="/"
                  aria-label="Skinetics, главная"
                  underline="none"
                >
                  <Wordmark />
                </Link>
                <Typography color="text.secondary" sx={{ mt: 4, maxWidth: 500 }}>
                  Skinetics помогает выбрать средство, а покупка и доставка оформляются на Wildberries или Ozon.
                </Typography>
              </Box>
              <Grid container spacing={6}>
                <Grid size={{ xs: 6 }}>
                  <FooterLinkGroup heading="Каталог" links={catalogLinks} />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <FooterLinkGroup heading="Skinetics" links={skineticsLinks} />
                </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary">
                ООО «Демидов Люкс СПА»
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
