import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";
import SeoPageContent from "./SeoPageContent";

export const metadata: Metadata = pageMetadata({
  title: "SEO",
  description:
    "A tailored digital marketing service to upscale your website’s traffic and sales — organic SEO, local SEO, content, PPC, and social media from FuduGo.",
  path: "/seo",
  image: "/marketing-seo.jpg",
});

export default function SeoPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `SEO & Digital Marketing — ${SITE_NAME}`,
          url: `${SITE_URL}/seo`,
          description:
            "Tailored SEO and digital marketing services to grow website traffic and sales.",
          provider: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          areaServed: ["IN", "US"],
          serviceType: [
            "Organic SEO",
            "Local SEO",
            "Content Marketing",
            "PPC",
            "Social Media Marketing",
          ],
        }}
      />
      <SeoPageContent />
    </>
  );
}
