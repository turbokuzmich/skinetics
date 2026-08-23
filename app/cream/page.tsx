import Box from "@mui/material/Box";
import type { Metadata } from "next";
import Catalog from "../_components/catalog";
import Metrika from "../_components/metrika";

export const metadata: Metadata = {
  title: "Кремы для лица с пептидами | Skinetics",
  description:
    "Кремы для лица Neon Beard Ultra Lift и SkineticsLab ReneWal: пептиды, состав, применение и ссылки на Wildberries и Ozon.",
  alternates: {
    canonical: "/cream",
  },
};

export default function CreamPage() {
  return (
    <Box paddingTop={8}>
      <Metrika />
      <Catalog
        header="Кремы для лица с пептидами"
        description="Кремы Neon Beard и SkineticsLab для ежедневного ухода за кожей лица. Сравните состав, формат применения и доступные маркетплейсы."
        categoryId="face-cream"
      />
    </Box>
  );
}
