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
        header="Каталог косметики Skinetics"
        description="В каталоге представлены средства для ухода за лицом, волосами и кожей головы. Сравните назначение и состав продуктов Dr. Health, SkineticsLab и Neon Beard и перейдите на Wildberries или Ozon."
      />
    </Box>
  );
}
