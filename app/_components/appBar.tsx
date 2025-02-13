"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import A from "@mui/material/Link";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Logo from "./logo";
import { navigation } from "@/constants";

function AppAppBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    // const sectionElement = document.getElementById(sectionId);
    // const offset = 128;
    // if (sectionElement) {
    //   const targetScroll = sectionElement.offsetTop - offset;
    //   sectionElement.scrollIntoView({ behavior: "smooth" });
    //   window.scrollTo({
    //     top: targetScroll,
    //     behavior: "smooth",
    //   });
    //   setOpen(false);
    // }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                gap: 2,
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <A href="/" component={Link} sx={{ width: 150 }}>
                <Logo />
              </A>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {navigation.map((navi) => (
                  <A
                    key={navi.to}
                    variant="body2"
                    color="text.primary"
                    href={navi.to}
                    underline="always"
                    component={Link}
                    sx={{ py: "6px", px: "12px" }}
                  >
                    {navi.title}
                  </A>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  {navigation.map((navi) => (
                    <A
                      key={navi.to}
                      onClick={toggleDrawer(false)}
                      variant="body2"
                      color="text.primary"
                      href={navi.to}
                      underline="always"
                      component={Link}
                    >
                      {navi.title}
                    </A>
                  ))}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
