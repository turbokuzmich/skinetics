import Box from "@mui/material/Box";
import Image from "next/image";
import type { Product } from "@/types";

type Props = Readonly<{
  product: Pick<Product, "image" | "imageAlt" | "title">;
  priority?: boolean;
  sizes?: string;
  surface?: "warm" | "white";
}>;

export default function ProductMedia({
  product,
  priority = false,
  sizes,
  surface = "warm",
}: Props) {
  return (
    <Box
      sx={{
        aspectRatio: "1 / 1.08",
        bgcolor: surface === "white" ? "common.white" : "#F1ECE3",
        overflow: "hidden",
        position: "relative",
        ...(surface === "warm"
          ? {
              "&::before": {
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.86), rgba(241,236,227,0) 68%)",
                content: '""',
                inset: 0,
                position: "absolute",
              },
            }
          : {}),
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
