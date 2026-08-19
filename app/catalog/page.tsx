import Catalog from "../_components/catalog";
import Box from "@mui/material/Box";
import Metrika from "../_components/metrika";
import { type Metadata } from "next";

export const metadata: Metadata = {
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
