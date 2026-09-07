import servicePages from "@/data/service-pages.json";
import type { ServicePageContent } from "@/types";

export const SERVICES = servicePages.services as ServicePageContent[];

export function getServiceBySlug(slug: string): ServicePageContent | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getRelatedServices(slug: string, limit = 3): ServicePageContent[] {
  return SERVICES.filter((service) => service.slug !== slug).slice(0, limit);
}
