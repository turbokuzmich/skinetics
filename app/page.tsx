import Divider from "@mui/material/Divider";
import Highlights from "./_components/advantages";
import Testimonials from "./_components/reports";
import Faq from "./_components/frequentlyAskedQuestions";
import Advantages from "./_components/advantages";
import Catalog from "./_components/catalog";
import Carousel from "./_components/carousel";

export default function LandingPage() {
  return (
    <>
      <Carousel />
      <Catalog />
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
