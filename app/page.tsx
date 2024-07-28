"use client";

import Divider from "@mui/material/Divider";
import Highlights from "./components/advantages";
import Testimonials from "./components/reports";
import Faq from "./components/frequentlyAskedQuestions";
import Catalog from "./components/catalog";
import Carousel from "./components/carousel";

export default function LandingPage() {
  return (
    <>
      <Carousel />
      <Catalog />
      {/* <Divider />
      <Testimonials />
      <Divider />
      <Highlights />
      <Divider />
      <Faq /> */}
    </>
  );
}
