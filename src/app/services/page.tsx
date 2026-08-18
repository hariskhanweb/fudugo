import type { Metadata } from "next";
import { CtaSection } from "@/sections";
import ServicesIndexSection from "@/sections/services/ServicesIndexSection";

export const metadata: Metadata = {
  title: "Services - FuduGo",
  description:
    "Web solutions, mobile apps, business software, cloud infrastructure, branding, and digital marketing from FuduGo.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesIndexSection />
      <CtaSection />
    </>
  );
}
