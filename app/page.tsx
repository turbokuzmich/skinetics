import Divider from "@mui/material/Divider";
import Highlights from "./_components/advantages";
import Testimonials from "./_components/reports";
import Faq from "./_components/frequentlyAskedQuestions";
import Advantages from "./_components/advantages";
import Catalog from "./_components/catalog";
import Carousel from "./_components/carousel";
import Metrika from "./_components/metrika";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Косметика для лица, волос и кожи головы | Skinetics",
  description:
    "Каталог косметики Dr. Health, SkineticsLab и Neon Beard для ухода за лицом, волосами и кожей головы. Составы, применение и ссылки на маркетплейсы.",
  alternates: {
    canonical: "/",
  },
};

export default function LandingPage() {
  return (
    <>
      <Metrika />
      <Carousel />
      <Catalog
        heading="Косметика для лица, волос и кожи головы"
        description="Skinetics объединяет средства Dr. Health, SkineticsLab и Neon Beard. Изучите назначение, состав и способ применения, затем выберите доступный маркетплейс."
      />
      <Advantages />
      {/* <Divider />
      <Testimonials />
      <Divider />
      <Highlights />
      <Divider />
      <Faq /> */}
    </>
  );
}
