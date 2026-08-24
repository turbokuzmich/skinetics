import Box from "@mui/material/Box";
import Image from "next/image";
import type { Product } from "@/types";

type Props = Readonly<{
  product: Pick<Product, "image" | "imageAlt" | "title">;
  priority?: boolean;
  sizes?: string;
}>;

export default function ProductMedia({
  product,
  priority = false,
  sizes,
}: Props) {
  return (
    <Box
      sx={{
        aspectRatio: "3 / 4",
        bgcolor: "background.default",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Image
        alt={product.imageAlt}
        fill
        priority={priority}
        sizes={
          sizes ??
          "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
        }
        src={product.image}
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
}
