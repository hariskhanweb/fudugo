import ServiceRouteChrome from "@/sections/services/ServiceRouteChrome";
import { servicePageMetadata } from "@/lib/seo";

export const metadata = servicePageMetadata("digital-marketing");

export default function DigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServiceRouteChrome slug="digital-marketing">{children}</ServiceRouteChrome>
  );
}
