import Catalog from "../_components/catalog";
import Box from "@mui/material/Box";
import Metrika from "../_components/metrika";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Сыворотки для волос и кожи головы Dr. Health | Каталог",
  description:
    "Сыворотки Dr. Health для ухода за волосами и кожей головы. Узнайте состав и способ применения, затем перейдите к покупке на Wildberries.",
  alternates: {
    canonical: "/serum",
  },
};

export default function SerumPage() {
  return (
    <Box paddingTop={8}>
      <Metrika />
      <Catalog
        eyebrow="Уход за волосами и кожей головы"
        heading="Сыворотки для волос Dr. Health"
        description="Несмываемые сыворотки для ухода при склонности к выпадению волос, перхоти и жирности кожи головы. Наносятся на кожу головы и не требуют смывания."
        categoryId="serum"
      />
    </Box>
  );
}
