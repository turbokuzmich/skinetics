import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ProductFaqItem } from "@/types";

export default function ProductFaq({
  items,
}: Readonly<{ items?: readonly ProductFaqItem[] }>) {
  if (!items?.length) {
    return null;
  }

  return (
    <Box
      component="section"
      aria-labelledby="product-faq-heading"
      sx={{ maxWidth: 800, mx: "auto", py: { xs: 8, md: 12 } }}
    >
      <Typography
        id="product-faq-heading"
        variant="h2"
        component="h2"
        sx={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", mb: 6 }}
      >
        Вопросы и ответы
      </Typography>
      <Box component="dl" sx={{ display: "grid", gap: 0, m: 0 }}>
        {items.map(({ question, answer }) => (
          <Box
            key={question}
            sx={{ borderTop: "1px solid", borderColor: "divider", py: 5 }}
          >
            <Typography component="dt" fontWeight={500} sx={{ mb: 2 }}>
              {question}
            </Typography>
            <Typography
              component="dd"
              color="text.secondary"
              sx={{ lineHeight: 1.7, m: 0 }}
            >
              {answer}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
