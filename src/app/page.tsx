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

export default function HomePage() {
  return (
    <>
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
