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
        eyebrow="Ежедневный уход за лицом"
        heading="Кремы для лица с пептидами"
        description="Два крема с пептидами для ежедневного ухода за лицом: Ultra Lift от Neon Beard, 100 г, и ReneWal от SkineticsLab, 50 г. Оба можно использовать утром и/или вечером."
        categoryId="face-cream"
      />
    </Box>
  );
}
