import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { productCategories } from "@/constants";
import type { Product } from "@/types";

export default function ContextualLinks({
  product,
}: Readonly<{ product: Pick<Product, "categoryId"> }>) {
  const category = productCategories[product.categoryId];

  return (
    <Box
      component="nav"
      aria-label="Навигация по каталогу"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        mt: { xs: 10, md: 14 },
        pt: 6,
      }}
    >
      <Link
        component={NextLink}
        href={category.path}
        color="text.primary"
        sx={{ alignItems: "center", display: "inline-flex", minHeight: 44 }}
      >
        Вернуться: {category.name}
      </Link>
    </Box>
  );
}
