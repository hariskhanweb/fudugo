import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";
import PortfolioPageContent from "./PortfolioPageContent";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Explore FuduGo’s portfolio — digital products, platforms, and experiences built for businesses across industries.",
  path: "/portfolio",
  image: "/Image-32.jpg",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Portfolio — ${SITE_NAME}`,
          url: `${SITE_URL}/portfolio`,
          description:
            "Selected work from FuduGo across product, web, and digital experiences.",
        }}
      />
      <PortfolioPageContent />
    </>
  );
}
