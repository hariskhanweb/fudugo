import Link from "next/link";
import type { ServicePageContent } from "@/types";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

type RelatedServicesProps = {
  services: ServicePageContent[];
  className?: string;
};

export default function RelatedServices({
  services,
  className,
}: RelatedServicesProps) {
  if (!services.length) return null;

  return (
    <section className={cn("border-t border-border/60 bg-background py-14 sm:py-16", className)}>
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-sans text-sm text-accent-soft">(More services)</p>
            <h2 className="mt-2 font-sans text-2xl font-bold text-foreground sm:text-3xl">
              Explore related work
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden font-sans text-sm font-medium text-accent-alt transition-opacity hover:opacity-80 sm:inline"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-2xl border border-border/50 bg-surface/30 p-5 transition-[border-color,background-color] duration-300 hover:border-accent-alt/30 hover:bg-surface/50 sm:p-6"
            >
              <p className="font-sans text-xs text-accent-alt">{service.eyebrow}</p>
              <h3 className="mt-3 font-sans text-lg font-bold text-foreground transition-colors group-hover:text-accent-soft">
                {service.title}
              </h3>
              <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-muted">
                {service.tagline}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
