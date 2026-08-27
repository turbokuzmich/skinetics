import Catalog from "../_components/catalog";
import Box from "@mui/material/Box";
import Metrika from "../_components/metrika";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог косметики для лица, волос и кожи головы | Skinetics",
  description:
    "Сыворотки Dr. Health и кремы для лица SkineticsLab и Neon Beard: назначение, состав, применение и переход к покупке на Wildberries или Ozon.",
  alternates: {
    canonical: "/catalog",
  },
};

export default function CatalogPage() {
  return (
    <Box paddingTop={8}>
      <Metrika />
      <Catalog
        eyebrow="Все средства"
        heading="Каталог косметики Skinetics"
        description="Сыворотки Dr. Health для волос и кожи головы и кремы для лица SkineticsLab и Neon Beard. Все средства можно купить на Wildberries, а кремы — также на Ozon."
      />
    </Box>
  );
}
