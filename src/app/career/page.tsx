import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";
import CareerPageContent from "./CareerPageContent";

export const metadata: Metadata = pageMetadata({
  title: "Career",
  description:
    "Join FuduGo — explore open roles in design, web, and mobile. Build with a team that values craft, growth, and creative freedom.",
  path: "/career",
  image: "/Image-32.jpg",
});

export default function CareerPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `Careers at ${SITE_NAME}`,
          url: `${SITE_URL}/career`,
          description:
            "Career opportunities at FuduGo across design, web development, and mobile.",
        }}
      />
      <CareerPageContent />
    </>
  );
}
