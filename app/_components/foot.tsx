import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import A from "@mui/material/Link";
import Logo from "./logo";
import { navigation } from "@/constants";
import DoctorForm from "./form";
import { Suspense } from "react";

export default function Footer() {
  return (
    <Container sx={{ flexShrink: 0, flexGrow: 0, py: { xs: 8, sm: 16 } }}>
      <Grid
        container
        alignItems={{
          md: "center",
        }}
        spacing={{ xs: 8, md: 2 }}
      >
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h5" gutterBottom>
            Записаться к трихологу
          </Typography>
          <Suspense>
            <DoctorForm />
          </Suspense>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack
            gap={2}
            alignItems={{ xs: "center", md: "flex-start" }}
            useFlexGap
          >
            <Box width={150}>
              <Logo />
            </Box>
            {navigation.map((navi) => (
              <A
                key={navi.to}
                variant="body1"
                color="text.primary"
                href={navi.to}
                underline="always"
                component={Link}
              >
                {navi.title}
              </A>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
