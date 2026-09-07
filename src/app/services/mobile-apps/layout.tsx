import ServiceRouteChrome from "@/sections/services/ServiceRouteChrome";
import { servicePageMetadata } from "@/lib/seo";

export const metadata = servicePageMetadata("mobile-apps");

export default function MobileAppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServiceRouteChrome slug="mobile-apps">{children}</ServiceRouteChrome>;
}
