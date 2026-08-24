import Box from "@mui/material/Box";

export default function Wordmark() {
  return (
    <Box
      component="span"
      sx={{
        color: "text.primary",
        fontFamily: "var(--font-literata), Georgia, serif",
        fontSize: "1.625rem",
        fontWeight: 500,
        letterSpacing: "-0.035em",
        lineHeight: 1,
      }}
    >
      Skinetics
    </Box>
  );
}
