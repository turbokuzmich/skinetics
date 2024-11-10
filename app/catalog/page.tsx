import { RedirectType, redirect } from "next/navigation";
import { items } from "@/constants";
import Catalog from "../_components/catalog";
import Box from "@mui/material/Box";
import Metrika from "../_components/metrika";

export default function CatalogPage() {
  return (
    <Box paddingTop={8}>
      <Metrika />
      <Catalog />
    </Box>
  );
}
