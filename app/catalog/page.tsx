import { RedirectType, redirect } from "next/navigation";
import { items } from "@/constants";
import Catalog from "../components/catalog";
import Box from "@mui/material/Box";

export default function CatalogPage() {
  return (
    <Box paddingTop={8}>
      <Catalog />
    </Box>
  );
}
