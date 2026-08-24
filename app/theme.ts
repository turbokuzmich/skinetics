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
    h1: {
      fontFamily: "var(--font-literata), Georgia, serif",
      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
      fontWeight: 400,
      lineHeight: 1.08,
    },
    h2: {
      fontFamily: "var(--font-literata), Georgia, serif",
      fontSize: "clamp(2rem, 4vw, 3.25rem)",
      fontWeight: 400,
      lineHeight: 1.12,
    },
    h3: {
      fontFamily: "var(--font-literata), Georgia, serif",
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      fontWeight: 400,
      lineHeight: 1.2,
    },
    button: {
      fontWeight: 500,
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
          minHeight: 44,
          paddingInline: 20,
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
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textUnderlineOffset: "0.18em",
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
