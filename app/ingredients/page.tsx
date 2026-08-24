import type { Metadata } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function Ingredients() {
  return (
    <Container sx={{ py: { xs: 6, md: 8 } }}>
      <Typography component="h1" variant="h1">
        Ингредиенты
      </Typography>
    </Container>
  );
}
