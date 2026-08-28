import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import NextLink from "next/link";
import { navigation } from "@/constants";
import Logo from "./logo";
import MobileNavigation from "./mobileNavigation";
import SiteNavLink from "./siteNavLink";

export default function SiteHeader() {
  return (
    <AppBar
      component="header"
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        bgcolor: "rgba(243, 238, 229, 0.78)",
        borderBottom: "1px solid rgba(217, 209, 197, 0.72)",
        backdropFilter: "blur(18px)",
        color: "text.primary",
        zIndex: 20,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 78 } }}>
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
              gap: 0.5,
              ml: "auto",
            }}
          >
            {navigation.map(({ to, title }) => (
              <SiteNavLink href={to} key={to}>
                {title}
              </SiteNavLink>
            ))}
          </Box>
          <MobileNavigation items={navigation} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
