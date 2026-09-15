import ServiceRouteChrome from "@/sections/services/ServiceRouteChrome";
import { servicePageMetadata } from "@/lib/seo";

export const metadata = servicePageMetadata("branding-design");

export default function BrandingDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServiceRouteChrome slug="branding-design">{children}</ServiceRouteChrome>
  );
}
