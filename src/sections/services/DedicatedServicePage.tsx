import { notFound } from "next/navigation";
import { CtaSection } from "@/sections";
import JsonLd from "@/components/seo/JsonLd";
import ServiceHero from "@/sections/services/ServiceHero";
import ServiceLayoutSwitcher from "@/sections/services/ServiceLayoutSwitcher";
import RelatedServices from "@/sections/services/RelatedServices";
import { getRelatedServices, getServiceBySlug } from "@/lib/service-pages";
import { serviceJsonLd, servicePageMetadata } from "@/lib/seo";

export { servicePageMetadata };

export default function DedicatedServicePage({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.slug);

  return (
    <>
      <JsonLd data={serviceJsonLd(service.slug)} />
      <ServiceHero key={service.slug} service={service} />
      <ServiceLayoutSwitcher key={`${service.slug}-layout`} service={service} />
      <RelatedServices services={related} />
      <CtaSection />
    </>
  );
}
