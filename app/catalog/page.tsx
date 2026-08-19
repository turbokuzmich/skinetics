import Catalog from "../_components/catalog";
import Box from "@mui/material/Box";
import Metrika from "../_components/metrika";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог косметики для кожи головы и волос | Dr. Health",
  description:
    "Каталог косметики Dr. Health для ухода за кожей головы и волосами: сыворотки с красным перцем, трипептидом меди, климбазолом и пироктон оламином.",
  alternates: {
    canonical: "/catalog",
  },
};

export default function CatalogPage() {
  return (
    <Box paddingTop={8}>
      <Metrika />
      <Catalog />
    </Box>
  );
}
