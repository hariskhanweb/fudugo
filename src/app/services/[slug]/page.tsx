import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaSection } from "@/sections";
import ServiceHero from "@/sections/services/ServiceHero";
import ServiceLayoutSwitcher from "@/sections/services/ServiceLayoutSwitcher";
import RelatedServices from "@/sections/services/RelatedServices";
import {
  getDynamicServiceSlugs,
  getRelatedServices,
  getServiceBySlug,
} from "@/lib/service-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getDynamicServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service - FuduGo" };

  return {
    title: `${service.title} - FuduGo`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service.slug);

  return (
    <>
      <ServiceHero key={service.slug} service={service} />
      <ServiceLayoutSwitcher key={`${service.slug}-layout`} service={service} />
      <RelatedServices services={related} />
      <CtaSection />
    </>
  );
}
