import type { Metadata } from "next";
import LegalPageContent from "@/components/legal/LegalPageContent";
import JsonLd from "@/components/seo/JsonLd";
import content from "@/data/terms.json";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms",
  description:
    "Terms & Conditions for using the FuduGo website and related online services.",
  path: "/terms",
  image: "/Image-32.jpg",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `Terms — ${SITE_NAME}`,
          url: `${SITE_URL}/terms`,
          description: "Terms & Conditions for the FuduGo website.",
        }}
      />
      <LegalPageContent {...content} />
    </>
  );
}
