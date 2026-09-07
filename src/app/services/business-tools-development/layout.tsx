import ServiceRouteChrome from "@/sections/services/ServiceRouteChrome";
import { servicePageMetadata } from "@/lib/seo";

export const metadata = servicePageMetadata("business-tools-development");

export default function BusinessToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServiceRouteChrome slug="business-tools-development">
      {children}
    </ServiceRouteChrome>
  );
}
