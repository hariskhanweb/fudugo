import ServiceRouteChrome from "@/sections/services/ServiceRouteChrome";
import { servicePageMetadata } from "@/lib/seo";

export const metadata = servicePageMetadata("ai-automation");

export default function AiAutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ServiceRouteChrome slug="ai-automation">{children}</ServiceRouteChrome>;
}
