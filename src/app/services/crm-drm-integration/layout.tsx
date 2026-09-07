import ServiceRouteChrome from "@/sections/services/ServiceRouteChrome";
import { servicePageMetadata } from "@/lib/seo";

export const metadata = servicePageMetadata("crm-drm-integration");

export default function CrmDrmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServiceRouteChrome slug="crm-drm-integration">{children}</ServiceRouteChrome>
  );
}
