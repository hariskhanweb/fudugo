import Image from "next/image";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

export type ServiceSpotlightContent = {
  /** Primary heading shown beside the image */
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type ServiceSpotlightProps = {
  content: ServiceSpotlightContent;
  /** Place image on the right (default: left) */
  imageOnRight?: boolean;
  className?: string;
  /** Pass-through for scroll-reveal hooks on service pages */
  revealAttr?: string;
};

export default function ServiceSpotlight({
  content,
  imageOnRight = false,
  className,
  revealAttr = "reveal",
}: ServiceSpotlightProps) {
  const {
    title,
    description,
    image,
    imageAlt = "",
    ctaLabel,
    ctaHref,
  } = content;

  return (
    <section
      className={cn("bg-background py-12 sm:py-16 lg:py-20", className)}
    >
      <Container className="px-5 sm:px-8 lg:px-10">
        <div
          data-web={revealAttr}
          className={cn(
            "grid items-center gap-8 lg:grid-cols-[40%_auto] lg:gap-16",
            imageOnRight && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div className="relative aspect-3/4 overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="lg:py-8">
            <h2 className="font-sans text-[clamp(1.875rem,calc(3.90625vw+1.09375rem),5rem)] font-bold leading-tight text-foreground">
              {title}
            </h2>
            <p className="mt-6 font-sans text-sm leading-relaxed text-foreground/85 sm:text-xl">
              {description}
            </p>
            {ctaLabel && ctaHref ? (
              <a
                href={ctaHref}
                className="mt-8 inline-flex items-center gap-2 rounded-lg border border-accent-alt/40 bg-accent-alt/10 px-5 py-2.5 font-sans text-sm font-semibold text-accent-alt transition-colors hover:bg-accent-alt/20"
              >
                {ctaLabel}
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
