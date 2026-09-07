import type { Metadata } from "next";
import { CtaSection } from "@/sections";
import ServicesIndexSection from "@/sections/services/ServicesIndexSection";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Web solutions, mobile apps, business software, cloud infrastructure, branding, digital marketing, CRM, and AI automation from FuduGo.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${SITE_NAME} Services`,
          url: `${SITE_URL}/services`,
        }}
      />
      <ServicesIndexSection />
      <CtaSection />
    </>
  );
}
