import ServiceRouteChrome from "@/sections/services/ServiceRouteChrome";
import { servicePageMetadata } from "@/lib/seo";

export const metadata = servicePageMetadata("cloud-infrastructure");

export default function CloudInfrastructureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServiceRouteChrome slug="cloud-infrastructure">
      {children}
    </ServiceRouteChrome>
  );
}
