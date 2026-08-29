"use client";

import { createTheme } from "@mui/material/styles";
import { skinColors, skinRadii } from "./designTokens";

const focusVisible = {
  outline: `3px solid ${skinColors.focus}`,
  outlineOffset: "2px",
};

const theme = createTheme({
  spacing: 4,
  shape: {
    borderRadius: skinRadii.medium,
  },
  typography: {
    fontFamily: "var(--font-manrope), Arial, sans-serif",
    body1: {
      lineHeight: 1.65,
    },
    body2: {
      lineHeight: 1.55,
    },
    h1: {
      fontFamily: "var(--font-literata), Georgia, serif",
      fontSize: "clamp(2.75rem, 6.4vw, 5.25rem)",
      fontWeight: 400,
      letterSpacing: "-0.055em",
      lineHeight: 1.01,
    },
    h2: {
      fontFamily: "var(--font-literata), Georgia, serif",
      fontSize: "clamp(2.25rem, 4.5vw, 3.7rem)",
      fontWeight: 400,
      letterSpacing: "-0.045em",
      lineHeight: 1.06,
    },
    h3: {
      fontFamily: "var(--font-literata), Georgia, serif",
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      fontWeight: 400,
      lineHeight: 1.2,
    },
    button: {
      fontWeight: 500,
      letterSpacing: "0.015em",
      textTransform: "none",
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: skinColors.ink,
      contrastText: skinColors.surface,
    },
    secondary: {
      main: skinColors.clay,
    },
    background: {
      default: skinColors.canvas,
      paper: skinColors.surface,
    },
    text: {
      primary: skinColors.ink,
      secondary: skinColors.mutedInk,
    },
    divider: skinColors.border,
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-focusVisible": focusVisible,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: skinRadii.small,
          transition: "background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease, transform 220ms ease",
          minHeight: 44,
          paddingInline: 20,
          "&:active": {
            transform: "translateY(1px) scale(0.985)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: `1px solid ${skinColors.border}`,
          borderRadius: skinRadii.medium,
          boxShadow: "none",
          transition: "border-color 240ms ease, box-shadow 240ms ease, transform 240ms ease",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textUnderlineOffset: "0.18em",
          "&:hover": {
            color: skinColors.brandBlue,
          },
          "&:focus-visible": focusVisible,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            borderRadius: skinRadii.small,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: skinColors.surface,
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
