import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type SectionHeadingProps = Readonly<{
  eyebrow?: string;
  heading: string;
  description?: string;
  component?: "h1" | "h2";
  align?: "left" | "center";
}>;

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  component = "h2",
  align = "left",
}: SectionHeadingProps) {
  return (
    <Box
      sx={{
        maxWidth: align === "center" ? 720 : 760,
        mx: align === "center" ? "auto" : 0,
        position: "relative",
        textAlign: align,
      }}
    >
      {eyebrow ? (
        <Typography
          color="secondary.main"
          component="p"
          variant="overline"
          sx={{ display: "block", fontWeight: 500, mb: 2 }}
        >
          {eyebrow}
        </Typography>
      ) : null}
      <Typography
        component={component}
        variant={component === "h1" ? "h1" : "h2"}
        sx={{ textWrap: "balance" }}
      >
        {heading}
      </Typography>
      {description ? (
        <Typography
          color="text.secondary"
          sx={{
            fontSize: { xs: "1rem", md: "1.125rem" },
            lineHeight: 1.7,
            mt: 4,
          }}
        >
          {description}
        </Typography>
      ) : null}
    </Box>
  );
}
