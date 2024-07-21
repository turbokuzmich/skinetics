"use client";

import Divider from "@mui/material/Divider";
import Highlights from "./components/highlights";
import Testimonials from "./components/testimonials";
import Faq from "./components/faq";
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
