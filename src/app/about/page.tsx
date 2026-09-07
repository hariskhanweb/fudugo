import type { Metadata } from "next";
import {
  AboutSection,
  ClientsSection,
  CtaSection,
  IndustriesSection,
  PageHeroSection,
  SolutionsSection,
} from "@/sections";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Learn about FuduGo — the team behind AI-first websites, mobile apps, automation, and digital growth for brands worldwide.",
  path: "/about",
  image: "/Image-32.jpg",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${SITE_NAME}`,
          url: `${SITE_URL}/about`,
        }}
      />
      <PageHeroSection
        content={{
          image: "/Image-32.jpg",
          imageAlt: "FuduGo studio and team",
          imagePosition: "bottom center",
        }}
      />
      <AboutSection />
      <ClientsSection />
      <IndustriesSection />
      <SolutionsSection />
      <CtaSection />
    </>
  );
}
