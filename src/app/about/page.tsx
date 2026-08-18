import type { Metadata } from "next";
import {
    AboutSection,
  AwardsSection,
  ClientsSection,
  CtaSection,
  IndustriesSection,
  PageHeroSection,
  SolutionsSection,
} from "@/sections";

export const metadata: Metadata = {
  title: "About - FuduGo Motion Graphics & 3D Animation Studio",
  description:
    "Learn about FuduGo — awards, industries we serve, and motion solutions built for brands worldwide.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeroSection
        content={{
          image: "/Image-32.jpg",
          imagePosition: "bottom center",
        }}
      />
      <AboutSection />
      <ClientsSection />
      <AwardsSection />
      <IndustriesSection />
      <SolutionsSection />
      <CtaSection />
    </>
  );
}
