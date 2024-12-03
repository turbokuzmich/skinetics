import { RedirectType, redirect } from "next/navigation";
import { items } from "@/constants";
import Catalog from "../_components/catalog";
import Box from "@mui/material/Box";
import Metrika from "../_components/metrika";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Купить сыворотку для волос в Москве, средство для роста и укрепления волос",
  description:
    "Сыворотки Dr. Health для укрепления и ухода за волосами и кожей головы в Москве. Заказать средства для восстановления волос с доставкой. Консультация трихолога.",
};

export default function SerumPage() {
  return (
    <Box paddingTop={8}>
      <Metrika />
      <Catalog header="Сыворотки для волос Dr. Health" omitDescription />
    </Box>
  );
}
