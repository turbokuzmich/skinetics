import A from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Metrika from "../_components/metrika";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { type Metadata } from "next";
import FeedbackForm from "./_components/form";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Контакты SkineticsLab",
};

export default function Contacts() {
  return (
    <Box paddingTop={16} paddingBottom={{ xs: 8, sm: 16 }}>
      <Metrika />
      <Container>
        <Grid container>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="h2"
              component="h1"
              paddingLeft={6}
              gutterBottom
            >
              Контакты
            </Typography>
            <Typography
              variant="h5"
              lineHeight="3rem"
              component="div"
              sx={{
                position: "relative",
                pl: 6,
              }}
              gutterBottom
            >
              <PhoneIcon
                fontSize="large"
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 8,
                }}
              />
              <A href="tel:+74956659015">+7 (495) 665 9015</A>
              <br />
              <A href="tel:+79263853751">+7 926 385 3751</A>
            </Typography>
            <Typography
              variant="h5"
              lineHeight="3rem"
              component="div"
              sx={{
                position: "relative",
                pl: 6,
              }}
            >
              <EmailIcon
                fontSize="large"
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 8,
                }}
              />
              <A href="mailto:info@skinetics.ru">info@skinetics.ru</A>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper elevation={0}>
              <FeedbackForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
