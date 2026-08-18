import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Solutions - FuduGo",
  description:
    "Elegant web design, creative content, and performance — marketing sites, platforms, and CMS-driven experiences from FuduGo.",
};

export default function WebSolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
