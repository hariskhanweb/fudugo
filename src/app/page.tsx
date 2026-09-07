import type { Metadata } from "next";
import {
  AboutSection,
  BlogSection,
  ClientsSection,
  CtaSection,
  HeroSection,
  ProcessSection,
  ServicesSection,
  StatsSection,
  TestimonialsSection,
  WorksSection,
} from "@/sections";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
  title: {
    absolute: DEFAULT_TITLE,
  },
};

const RIBBON_IMAGES = [
  "/components/Ai-01.webp",
  "/components/Ai-02.webp",
  "/components/Ai-03.webp",
  "/components/Ai-04.webp",
  "/components/Ai-05.webp",
  "/components/Ai-06.webp",
];

export default function HomePage() {
  return (
    <>
      {RIBBON_IMAGES.map((href) => (
        <link
          key={href}
          rel="preload"
          as="image"
          href={href}
          fetchPriority="high"
          type="image/webp"
        />
      ))}
      <HeroSection />
      <div className="relative z-10">
        <AboutSection />
        <ClientsSection />
        <WorksSection />
        <ServicesSection />
        <StatsSection />
        <ProcessSection />
        <TestimonialsSection />
        <CtaSection />
        <BlogSection />
      </div>
    </>
  );
}
