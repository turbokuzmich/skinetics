import A from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Contacts() {
  return (
    <Box paddingTop={16} paddingBottom={{ xs: 8, sm: 16 }}>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          variant="h5"
          lineHeight="3rem"
          sx={{
            position: "relative",
            pl: 6,
          }}
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
      </Container>
    </Box>
  );
}
