import type { Metadata } from "next";
import { ContactSection, FindUsSection, PageHeroSection } from "@/sections";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";
import site from "@/data/site.json";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact FuduGo to start a web, app, AI, or digital growth project. Talk with our team about technology, creative direction, and delivery.",
  path: "/contact",
  image: "/Image-32.jpg",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${SITE_NAME}`,
          url: `${SITE_URL}/contact`,
          mainEntity: {
            "@type": "Organization",
            name: SITE_NAME,
            email: site.email,
            telephone: site.phone,
          },
        }}
      />
      <PageHeroSection
        content={{
          title: "Contact",
          image: "/Image-32.jpg",
          imageAlt: "Contact FuduGo",
          imagePosition: "center",
        }}
      />
      <ContactSection />
      <FindUsSection />
    </>
  );
}
