import type { Metadata } from "next";
import LegalPageContent from "@/components/legal/LegalPageContent";
import JsonLd from "@/components/seo/JsonLd";
import content from "@/data/privacy-policy.json";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how FuduGo collects, uses, and protects personal data when you visit our website or contact us.",
  path: "/privacy-policy",
  image: "/Image-32.jpg",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `Privacy Policy — ${SITE_NAME}`,
          url: `${SITE_URL}/privacy-policy`,
          description:
            "How FuduGo collects, uses, and protects personal data.",
        }}
      />
      <LegalPageContent {...content} />
    </>
  );
}
