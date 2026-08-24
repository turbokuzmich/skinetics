import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ProductContent } from "@/types";

export default function ProductDescription({
  content,
}: Readonly<{ content: ProductContent }>) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 8, md: 10 },
        maxWidth: 800,
        mx: "auto",
        py: { xs: 8, md: 12 },
      }}
    >
      <Typography sx={{ fontSize: "1.125rem", lineHeight: 1.75 }}>
        {content.overview}
      </Typography>
      {content.suitableUse ? (
        <Box component="section" aria-labelledby="suitable-use-heading">
          <Typography
            id="suitable-use-heading"
            variant="h3"
            component="h2"
            sx={{ fontSize: "1.75rem", mb: 3 }}
          >
            Кому подходит
          </Typography>
          <Typography sx={{ lineHeight: 1.75 }}>
            {content.suitableUse}
          </Typography>
        </Box>
      ) : null}
      <Box component="section" aria-labelledby="active-components-heading">
        <Typography
          id="active-components-heading"
          variant="h3"
          component="h2"
          sx={{ fontSize: "1.75rem", mb: 3 }}
        >
          Активные компоненты
        </Typography>
        <Typography sx={{ lineHeight: 1.75 }}>
          {content.activeComponents}
        </Typography>
      </Box>
      <Box component="section" aria-labelledby="product-features-heading">
        <Typography
          id="product-features-heading"
          variant="h3"
          component="h2"
          sx={{ fontSize: "1.75rem", mb: 4 }}
        >
          {content.featureSection.heading}
        </Typography>
        <Box
          component="ul"
          sx={{
            display: "grid",
            gap: 3,
            m: 0,
            pl: 6,
            "& li::marker": { color: "secondary.main" },
          }}
        >
          {content.featureSection.items.map((item) => (
            <Typography component="li" key={item} sx={{ lineHeight: 1.7 }}>
              {item}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box component="section" aria-labelledby="application-heading">
        <Typography
          id="application-heading"
          variant="h3"
          component="h2"
          sx={{ fontSize: "1.75rem", mb: 3 }}
        >
          {content.application.heading}
        </Typography>
        <Typography sx={{ lineHeight: 1.75 }}>
          {content.application.instructions}
        </Typography>
      </Box>
      <Box component="section" aria-labelledby="precautions-heading">
        <Typography
          id="precautions-heading"
          variant="h3"
          component="h2"
          sx={{ fontSize: "1.75rem", mb: 3 }}
        >
          {content.precautionsHeading ?? "Важная информация"}
        </Typography>
        <Typography sx={{ lineHeight: 1.75 }}>{content.precautions}</Typography>
      </Box>
    </Box>
  );
}
