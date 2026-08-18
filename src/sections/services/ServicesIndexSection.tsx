"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { SERVICES } from "@/lib/service-pages";
import { AccentMark, Container } from "@/components/ui";
import { useGsapContext } from "@/lib/use-gsap-context";

/** Hub page listing all six services with distinct cards */
export default function ServicesIndexSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapContext(sectionRef, (section) => {
    const cards = section.querySelectorAll("[data-services-index='card']");
    const grid = section.querySelector("[data-services-index='grid']");
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.06,
        ease: "power2.out",
        overwrite: "auto",
        scrollTrigger: {
          trigger: grid ?? section,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  return (
    <section ref={sectionRef} className="bg-background py-16 sm:py-20 lg:py-24">
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mb-12 max-w-2xl">
          <AccentMark className="mb-5" />
          <p className="font-sans text-sm text-accent-soft">(Our Services)</p>
          <h1 className="mt-3 font-sans text-[clamp(36px,6vw,56px)] font-bold leading-none tracking-tight text-foreground">
            Six ways we help brands ship better digital work.
          </h1>
          <p className="mt-4 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
            Each practice has its own process, deliverables, and design language — pick the one that matches your next goal.
          </p>
        </div>

        <div
          data-services-index="grid"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              data-services-index="card"
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-surface/25 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent-alt/30"
            >
              <div className="relative h-44 overflow-hidden sm:h-48">
                <Image
                  src={service.heroImage}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 font-sans text-[11px] font-semibold text-white backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <h2 className="font-sans text-xl font-bold text-foreground transition-colors group-hover:text-accent-soft">
                  {service.title}
                </h2>
                <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-muted">
                  {service.tagline}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-accent-alt">
                  Explore
                  <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 320 512" fill="currentColor" aria-hidden>
                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
