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
    <Box component="section" aria-labelledby="product-faq-heading">
      <Typography id="product-faq-heading" variant="h6" component="h2">
        Вопросы и ответы
      </Typography>
      <Box component="dl" sx={{ m: 0 }}>
        {items.map(({ question, answer }) => (
          <Box key={question} sx={{ mb: 2 }}>
            <Typography component="dt" fontWeight={600}>
              {question}
            </Typography>
            <Typography component="dd" sx={{ m: 0 }}>
              {answer}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
