"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import type { ServicePageContent } from "@/types";
import { AccentMark, Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useGsapContext } from "@/lib/use-gsap-context";

type ServiceHeroProps = {
  service: ServicePageContent;
  className?: string;
};

export default function ServiceHero({ service, className }: ServiceHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(
    sectionRef,
    (section) => {
      const parts = section.querySelectorAll("[data-service-hero='part']");
      gsap.fromTo(
        parts,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    },
    [service.slug],
  );

  return (
    <section
      ref={sectionRef}
      className={cn("relative overflow-hidden bg-header", className)}
    >
      <div className="absolute inset-0">
        <Image
          src={service.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
          style={{ objectPosition: service.heroImagePosition ?? "center" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-header/70 via-header/85 to-background" />
      </div>

      <Container className="relative px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-36">
        <div className="max-w-3xl">
          <div data-service-hero="part">
            <AccentMark className="mb-5 origin-left" />
          </div>
          <p
            data-service-hero="part"
            className="mb-3 font-sans text-sm text-accent-soft"
          >
            {service.eyebrow}
          </p>
          <h1
            data-service-hero="part"
            className="font-sans text-[clamp(40px,8vw,72px)] font-bold leading-[0.98] tracking-tight text-foreground"
          >
            {service.title}
          </h1>
          <p
            data-service-hero="part"
            className="mt-4 font-sans text-lg font-medium text-accent-alt sm:text-xl"
          >
            {service.tagline}
          </p>
          <p
            data-service-hero="part"
            className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-muted sm:text-[15px]"
          >
            {service.description}
          </p>

          <div
            data-service-hero="part"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-accent-alt/40 bg-accent-alt/10 px-5 py-2.5 font-sans text-sm font-semibold text-accent-alt transition-colors hover:bg-accent-alt/20"
            >
              {service.ctaLabel}
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-3 py-2.5 font-sans text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              All services
            </Link>
          </div>
        </div>

        <div
          data-service-hero="part"
          className="mt-12 grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-3"
        >
          {service.highlights.map((item) => (
            <div key={item.label}>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                {item.label}
              </p>
              <p className="mt-2 font-sans text-xl font-bold text-foreground sm:text-2xl">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
