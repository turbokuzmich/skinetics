"use client";

import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import type { NaviItem } from "@/types";

type Props = Readonly<{ items: readonly NaviItem[] }>;

const drawerId = "mobile-navigation-drawer";
const drawerTitleId = "mobile-navigation-title";

export default function MobileNavigation({ items }: Props) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(focusTimer);
  }, [open]);

  return (
    <Box sx={{ display: { xs: "block", md: "none" }, ml: "auto" }}>
      <IconButton
        aria-controls={drawerId}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Открыть меню"
        color="inherit"
        onClick={() => setOpen(true)}
        sx={{ height: 44, width: 44 }}
      >
        <MenuIcon aria-hidden="true" />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          "aria-labelledby": drawerTitleId,
          "aria-modal": true,
          id: drawerId,
          role: "dialog",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
            p: 4,
            width: { xs: "min(88vw, 360px)", sm: 360 },
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography component="h2" id={drawerTitleId} variant="h5">
              Меню
            </Typography>
            <IconButton
              aria-label="Закрыть меню"
              autoFocus
              color="inherit"
              ref={closeButtonRef}
              onClick={() => setOpen(false)}
              sx={{ height: 44, width: 44 }}
            >
              <CloseIcon aria-hidden="true" />
            </IconButton>
          </Stack>
          <Box
            component="nav"
            aria-label="Мобильная навигация"
            sx={{ mt: 6 }}
          >
            <Stack spacing={1}>
              {items.map(({ to, title }) => (
                <Link
                  component={NextLink}
                  href={to}
                  key={to}
                  onClick={() => setOpen(false)}
                  underline="none"
                  sx={{
                    alignItems: "center",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    color: "text.primary",
                    display: "flex",
                    minHeight: 52,
                    py: 2,
                  }}
                >
                  {title}
                </Link>
              ))}
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
