"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, AccentMark } from "@/components/ui";
import { CtaSection } from "@/sections";
import ServiceHero from "@/sections/services/ServiceHero";
import { getServiceBySlug } from "@/lib/service-pages";
import { useGsapContext } from "@/lib/use-gsap-context";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export type ServiceStandardContent = {
  introSection: {
    eyebrow: string;
    title: string;
    lead: string;
    paragraphs: string[];
    ctaLabel: string;
    ctaHref: string;
  };
  whatWeOffer: {
    eyebrow: string;
    title: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
      icon: string;
      image: string;
    }>;
  };
  aiDevelopment: {
    eyebrow: string;
    title: string;
    lead: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
      tag: string;
      result?: string;
      image?: string;
      imageBadge?: string;
      imageMeta?: string;
    }>;
  };
  techStack: {
    eyebrow: string;
    title: string;
    description: string;
    categories: Array<{
      step: string;
      id: string;
      name: string;
      description: string;
      skills: string[];
    }>;
  };
  faqs: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ id: string; question: string; answer: string }>;
  };
  cta: {
    title: string;
    label: string;
    href: string;
  };
};

function OfferIcon({ type }: { type: string }) {
  switch (type) {
    case "cloud":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "migrate":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="17 1 21 5 17 9" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <polyline points="7 23 3 19 7 15" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      );
    case "layers":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case "pipeline":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "identity":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c1.5-4 6-6 8-6s6.5 2 8 6" />
        </svg>
      );
    case "social":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case "video":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="6" width="14" height="12" rx="2" />
          <polygon points="22 8 16 12 22 16 22 8" />
        </svg>
      );
    case "print":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      );
    default:
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

function FeatureIcon({ id }: { id: string }) {
  switch (id) {
    case "deployment-setup":
    case "concept-exploration":
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "security-flagging":
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "maintainable-pipelines":
    case "asset-production":
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "ai-daily":
    case "human-led":
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
        </svg>
      );
    default:
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

function FaqAccordion({
  items,
}: {
  items: Array<{ id: string; question: string; answer: string }>;
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3.5">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-2xl border transition-all duration-300",
              isOpen
                ? "border-accent-alt/50 bg-surface shadow-md"
                : "border-border/80 bg-surface/50 hover:border-border hover:bg-surface/80",
            )}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left outline-hidden sm:p-6 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-alt/70"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "font-sans text-base font-bold transition-colors sm:text-lg",
                  isOpen ? "text-accent-soft" : "text-foreground",
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/80 bg-panel text-accent-alt transition-transform duration-300",
                  isOpen ? "rotate-45 border-accent-alt bg-accent-alt text-white" : "",
                )}
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 0V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M14 7L0 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border/40 px-5 pt-4 pb-6 sm:px-6">
                  <p className="font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ServiceStandardPage({
  slug,
  content,
}: {
  slug: string;
  content: ServiceStandardContent;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { introSection, whatWeOffer, aiDevelopment, techStack, faqs, cta } =
    content;
  const service = getServiceBySlug(slug);
  const topFeatures = aiDevelopment.features.slice(0, 3);
  const wideFeature = aiDevelopment.features[3];

  useGsapContext(
    rootRef,
    (scope) => {
      const blocks = scope.querySelectorAll("[data-service='reveal']");
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: block,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    [slug],
  );

  return (
    <>
      {service ? <ServiceHero service={service} /> : null}

      <div ref={rootRef}>
        <section
          id="capabilities"
          className="relative overflow-hidden border-t border-b border-border/60 bg-header py-20 sm:py-24 lg:py-32"
        >
          <div
            className="pointer-events-none absolute top-1/2 -left-40 h-96 w-96 -translate-y-1/2 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
              <div data-service="reveal" className="space-y-4 lg:col-span-5">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                  {introSection.eyebrow}
                </p>
                <h2 className="font-sans text-[clamp(34px,5vw,52px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {introSection.title}
                </h2>
              </div>
              <div data-service="reveal" className="space-y-6 lg:col-span-7">
                <div className="border-l-2 border-accent-alt/70 pl-6 sm:pl-7">
                  <p className="font-sans text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                    {introSection.lead}
                  </p>
                </div>
                <div className="space-y-4 pt-2 font-sans text-base leading-relaxed text-muted sm:text-[17px] sm:leading-[1.8]">
                  {introSection.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="pt-3">
                  <Link
                    href={introSection.ctaHref}
                    className="inline-flex cursor-pointer items-center gap-2 font-sans text-sm font-semibold text-accent-alt outline-hidden transition-colors hover:text-accent-soft focus-visible:ring-2 focus-visible:ring-accent-alt/70 sm:text-base"
                  >
                    <span>{introSection.ctaLabel}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32">
          <div
            className="pointer-events-none absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div
              data-service="reveal"
              className="mb-14 max-w-3xl sm:mb-16 lg:mb-20"
            >
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                {whatWeOffer.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {whatWeOffer.title}
              </h2>
            </div>
            <div
              data-service="reveal"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
            >
              {whatWeOffer.items.map((item) => (
                <div
                  key={item.number}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/60 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-400 hover:-translate-y-1.5 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden bg-panel">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent" />
                      <span className="absolute top-3.5 right-4 rounded-md bg-black/60 px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-white/80 backdrop-blur-xs">
                        ({item.number})
                      </span>
                    </div>
                    <div className="p-6 pt-2 sm:p-7">
                      <div className="-mt-8 mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-panel text-accent-alt shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-alt group-hover:text-white">
                        <OfferIcon type={item.icon} />
                      </div>
                      <h3 className="mb-2.5 font-sans text-lg leading-snug font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs leading-relaxed text-muted sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto p-6 pt-0 sm:p-7">
                    <div className="border-t border-border/50 pt-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-accent-alt transition-colors hover:text-accent-soft sm:text-sm"
                      >
                        <span>Get started</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden border-t border-b border-border/60 bg-header py-20 sm:py-24 lg:py-32">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-size-[1.5rem_1.5rem] opacity-40"
            aria-hidden
          />
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div
              data-service="reveal"
              className="mb-14 max-w-3xl sm:mb-16 lg:mb-20"
            >
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                {aiDevelopment.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,58px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {aiDevelopment.title}
              </h2>
              <div className="mt-6 rounded-2xl border border-border/70 bg-surface/40 p-5 backdrop-blur-xs sm:p-6">
                <p className="font-sans text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {aiDevelopment.lead}
                </p>
              </div>
            </div>

            <div
              data-service="reveal"
              className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-3"
            >
              {topFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-surface/60 p-7 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] sm:p-8"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-panel text-accent-alt shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-alt group-hover:text-white">
                        <FeatureIcon id={feature.id} />
                      </div>
                      <span className="rounded-full bg-accent-alt/10 px-3 py-1 font-sans text-xs font-semibold text-accent-alt">
                        {feature.tag}
                      </span>
                    </div>
                    <h3 className="mb-3 font-sans text-xl leading-snug font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-[22px]">
                      {feature.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}

              {wideFeature ? (
                <div className="overflow-hidden rounded-3xl border border-border/80 bg-surface/60 p-7 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-300 hover:border-accent-alt/40 sm:p-10 lg:col-span-3">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                    <div className="space-y-5 lg:col-span-7">
                      <span className="inline-block rounded-full bg-accent-alt/10 px-3.5 py-1 font-sans text-xs font-semibold text-accent-alt">
                        {wideFeature.tag}
                      </span>
                      <h3 className="font-sans text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl lg:text-[2rem]">
                        {wideFeature.title}
                      </h3>
                      <p className="font-sans text-base leading-relaxed text-muted sm:text-[17px] sm:leading-[1.75]">
                        {wideFeature.description}
                      </p>
                      {wideFeature.result ? (
                        <div className="border-l-2 border-accent-alt/70 pt-1 pl-5">
                          <p className="font-sans text-sm leading-relaxed font-semibold text-foreground sm:text-base">
                            {wideFeature.result}
                          </p>
                        </div>
                      ) : null}
                    </div>
                    <div className="relative lg:col-span-5">
                      <div className="group/img relative aspect-4/3 overflow-hidden rounded-2xl border border-border/80 bg-panel shadow-xl">
                        <Image
                          src={wideFeature.image ?? service?.heroImage ?? "/Image-4.jpg"}
                          alt={wideFeature.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 backdrop-blur-md">
                          <span className="font-sans text-xs font-semibold text-white">
                            {wideFeature.imageBadge ?? wideFeature.tag}
                          </span>
                          <span className="font-mono text-xs font-bold text-accent-alt">
                            {wideFeature.imageMeta ?? "AI-Assisted"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden border-t border-b border-border/60 bg-header py-20 sm:py-24 lg:py-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden
          />
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
              <header
                data-service="reveal"
                className="space-y-4 lg:sticky lg:top-28 lg:self-start"
              >
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-xs font-semibold tracking-[0.18em] text-accent-alt uppercase">
                  {techStack.eyebrow}
                </p>
                <h2 className="font-sans text-[clamp(2rem,calc(2.5vw+1rem),3.25rem)] font-bold leading-tight tracking-tight text-foreground">
                  {techStack.title}
                </h2>
                <p className="mt-4 font-sans text-sm leading-relaxed text-muted sm:text-base">
                  {techStack.description}
                </p>
                <p className="pt-3 font-sans text-xs font-semibold tracking-wider text-accent-alt uppercase">
                  {String(techStack.categories.length).padStart(2, "0")}{" "}
                  Technology Categories
                </p>
              </header>

              <ol className="relative">
                <span
                  className="pointer-events-none absolute top-3 bottom-3 left-2.75 w-px bg-border/70 sm:left-3.75"
                  aria-hidden
                />
                {techStack.categories.map((cat, index) => (
                  <li
                    key={cat.id}
                    data-service="reveal"
                    className={cn(
                      "relative flex gap-5 pb-12 sm:gap-7 sm:pb-14",
                      index === techStack.categories.length - 1 && "pb-0 sm:pb-0",
                    )}
                  >
                    <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center sm:mt-0.5 sm:h-8 sm:w-8">
                      <span className="absolute inset-0 rounded-full border border-accent-alt/35 bg-background" />
                      <span className="relative h-2 w-2 rounded-full bg-accent-alt sm:h-2.5 sm:w-2.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="font-sans text-sm font-semibold tabular-nums text-accent-alt">
                          {cat.step}
                        </span>
                        <h3 className="font-sans text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-[1.75rem]">
                          {cat.name}
                        </h3>
                      </div>
                      <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                        {cat.description}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-2 sm:gap-2.5">
                        {cat.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-xl border border-border/80 bg-surface/70 px-3.5 py-1.5 font-sans text-xs font-semibold text-foreground/85 shadow-2xs backdrop-blur-xs transition-colors hover:border-accent-alt/40 hover:bg-accent-alt/10 hover:text-accent-soft sm:text-sm"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden border-t border-border/60 bg-header py-20 sm:py-24 lg:py-32">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
              <div data-service="reveal" className="space-y-4 lg:col-span-5">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                  {faqs.eyebrow}
                </p>
                <h2 className="font-sans text-[clamp(34px,5.2vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {faqs.title}
                </h2>
                <p className="mt-3 font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {faqs.description}
                </p>
              </div>
              <div data-service="reveal" className="lg:col-span-7">
                <FaqAccordion items={faqs.items} />
              </div>
            </div>
          </Container>
        </section>
      </div>

      <CtaSection
        content={{
          title: cta.title,
          cta: { label: cta.label, href: cta.href },
        }}
      />
    </>
  );
}
