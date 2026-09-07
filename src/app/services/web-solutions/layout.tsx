import ServiceRouteChrome from "@/sections/services/ServiceRouteChrome";
import { servicePageMetadata } from "@/lib/seo";

export const metadata = servicePageMetadata("web-solutions");

export default function WebSolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServiceRouteChrome slug="web-solutions">{children}</ServiceRouteChrome>;
}
