import { type Metadata } from "next";
import Catalog from "./_components/catalog";
import CategoryNavigation from "./_components/categoryNavigation";
import HomeHero from "./_components/homeHero";
import Metrika from "./_components/metrika";
import TrustEvidence from "./_components/trustEvidence";

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
      <HomeHero />
      <CategoryNavigation />
      <Catalog
        eyebrow="Все пять средств"
        heading="Выберите средство"
        headingComponent="h2"
        description="Сравните продукты трёх брендов и откройте страницу средства, чтобы изучить состав и применение."
        showMarketplaceActions={false}
      />
      <TrustEvidence />
    </>
  );
}
