import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import NextLink from "next/link";
import { navigation } from "@/constants";
import Logo from "./logo";
import MobileNavigation from "./mobileNavigation";

export default function SiteHeader() {
  return (
    <AppBar
      component="header"
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          <Link
            component={NextLink}
            href="/"
            aria-label="Skinetics, главная"
            underline="none"
            sx={{
              alignItems: "center",
              display: "inline-flex",
              minHeight: 44,
              minWidth: 44,
              mr: { md: 8 },
              width: 150,
            }}
          >
            <Logo />
          </Link>
          <Box
            component="nav"
            aria-label="Основная навигация"
            sx={{
              alignItems: "stretch",
              display: { xs: "none", md: "flex" },
              gap: 1,
              ml: "auto",
            }}
          >
            {navigation.map(({ to, title }) => (
              <Link
                component={NextLink}
                href={to}
                key={to}
                underline="none"
                sx={{
                  alignItems: "center",
                  color: "text.primary",
                  display: "inline-flex",
                  minHeight: 44,
                  px: 3,
                }}
              >
                {title}
              </Link>
            ))}
          </Box>
          <MobileNavigation items={navigation} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
