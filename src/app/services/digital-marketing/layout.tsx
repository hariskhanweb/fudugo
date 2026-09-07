import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing - FuduGo",
  description:
    "We help businesses strengthen their digital presence through SEO, content, social media, paid advertising, and data-driven strategies designed to reach the right audience and generate meaningful business results.",
};

export default function DigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
