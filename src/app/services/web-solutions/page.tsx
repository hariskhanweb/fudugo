"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "@/data/web-solutions-page.json";
import { Container, AccentMark } from "@/components/ui";
import { CtaSection, PageHeroSection } from "@/sections";
import { useGsapContext } from "@/lib/use-gsap-context";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function OfferIcon({ type }: { type: string }) {
  switch (type) {
    case "code":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "cart":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );
    case "shield":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "palette":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      );
    default:
      return null;
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
              className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
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
                  isOpen ? "rotate-45 bg-accent-alt text-white border-accent-alt" : "",
                )}
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <p className="font-sans text-sm leading-relaxed text-muted sm:text-[15px] sm:leading-relaxed">
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

export default function WebSolutionsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { hero, introSection, whatWeOffer, aiDevelopment, techStack, faqs } = content;

  useGsapContext(
    rootRef,
    (scope) => {
      // Hero elements animation
      const heroParts = scope.querySelectorAll("[data-web-hero='part']");
      if (heroParts.length) {
        gsap.fromTo(
          heroParts,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
          },
        );
      }

      // Scroll reveals for sections
      const blocks = scope.querySelectorAll("[data-web='reveal']");
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
    [],
  );

  return (
    <>
      {/* Top Header Banner matching About & Contact pages */}
      <PageHeroSection
        content={{
          title: "Web Design & Development",
          image: hero.image,
          imageAlt: hero.imageAlt,
          imagePosition: "center",
        }}
      />

      <div ref={rootRef}>
        {/* 1. HERO CONTENT SECTION */}
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
          {/* Subtle Grid Background Pattern */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
            aria-hidden
          />

          {/* Ambient Glows */}
          <div
            className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-accent-alt/15 blur-[130px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-accent/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
              {/* Left Column: Heading & Copy */}
              <div className="lg:col-span-7">
                <div data-web-hero="part">
                  <AccentMark className="mb-5 origin-left" />
                </div>

                {/* Small Label */}
                <p
                  data-web-hero="part"
                  className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt sm:text-[15px]"
                >
                  {hero.eyebrow}
                </p>

                {/* Main H1 */}
                <h1
                  data-web-hero="part"
                  className="font-sans text-[clamp(38px,6.5vw,76px)] font-bold leading-[1.04] tracking-tight text-foreground"
                >
                  {hero.title}
                </h1>

                {/* Supporting Text */}
                <p
                  data-web-hero="part"
                  className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed"
                >
                  {hero.description}
                </p>

                {/* CTA Buttons */}
                <div
                  data-web-hero="part"
                  className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10"
                >
                  <Link
                    href={hero.ctaHref}
                    className="inline-flex items-center gap-2 rounded-xl border border-accent-alt bg-accent-alt px-7 py-3.5 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all duration-300 hover:bg-accent-soft hover:shadow-accent-alt/40"
                  >
                    <span>{hero.ctaLabel}</span>
                    <span>→</span>
                  </Link>
                  <a
                    href={hero.secondaryCtaHref}
                    className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/60 px-6 py-3.5 font-sans text-sm font-medium text-foreground backdrop-blur-xs transition-colors hover:border-accent-alt/40 hover:bg-surface-hover"
                  >
                    {hero.secondaryCtaLabel}
                  </a>
                </div>
              </div>

              {/* Right Column: Floating Side Showcase Graphic */}
              <div data-web-hero="part" className="relative lg:col-span-5">
                <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-surface/60 p-4 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-accent-alt/40 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
                  <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-panel">
                    <Image
                      src="/web-service.webp"
                      alt="Web Design Showcase"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Floating Micro-Badge */}
                  <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between rounded-xl border border-white/15 bg-black/65 px-4 py-3 backdrop-blur-md">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </span>
                      <span className="font-sans text-xs font-semibold text-white">
                        AI-Enabled Engineering
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-accent-alt">
                      99+ Speed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 2. INTRODUCTION SECTION */}
        <section
          id="capabilities"
          className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-t border-b border-border/60"
        >
          {/* Subtle Ambient Glow */}
          <div
            className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16 items-center">
              {/* Left Column: Eyebrow + Subheading */}
              <div data-web="reveal" className="space-y-4 lg:col-span-5">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                  {introSection.eyebrow}
                </p>
                <h2 className="font-sans text-[clamp(34px,5vw,52px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {introSection.title}
                </h2>
              </div>

              {/* Middle/Right Column: Narrative without What we build */}
              <div data-web="reveal" className="space-y-6 lg:col-span-7">
                {/* Lead Paragraph with Accent Left Border */}
                <div className="border-l-2 border-accent-alt/70 pl-6 sm:pl-7">
                  <p className="font-sans text-lg font-medium leading-relaxed text-foreground sm:text-xl sm:leading-relaxed">
                    {introSection.lead}
                  </p>
                </div>

                {/* Supporting Paragraphs */}
                <div className="space-y-4 pt-2 font-sans text-base leading-relaxed text-muted sm:text-[17px] sm:leading-[1.8]">
                  {introSection.paragraphs.map((p, index) => (
                    <p key={index}>{p}</p>
                  ))}
                </div>

                {/* CTA Link */}
                <div className="pt-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent-alt transition-colors hover:text-accent-soft sm:text-base"
                  >
                    <span>Discuss your web project</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 3. WHAT WE OFFER SECTION (With Card Image Banners) */}
        <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32">
          {/* Ambient Lighting */}
          <div
            className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            {/* Header */}
            <div data-web="reveal" className="mb-14 max-w-3xl sm:mb-16 lg:mb-20">
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                {whatWeOffer.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {whatWeOffer.title}
              </h2>
            </div>

            {/* 4 Cards Grid with Visual Image Headers */}
            <div
              data-web="reveal"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
            >
              {whatWeOffer.items.map((item) => (
                <div
                  key={item.number}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-surface/60 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-400 hover:-translate-y-1.5 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    {/* Top Image Banner */}
                    <div className="relative aspect-16/9 w-full overflow-hidden bg-panel">
                      <Image
                        src={item.image ?? "/Image-17.jpg"}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/40 to-transparent" />

                      {/* Number Badge floating over image */}
                      <span className="absolute top-3.5 right-4 font-mono text-xs font-bold tracking-wider text-white/80 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        ({item.number})
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 sm:p-7 pt-2">
                      {/* Icon */}
                      <div className="-mt-8 mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-panel text-accent-alt shadow-md transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-alt group-hover:text-white">
                        <OfferIcon type={item.icon} />
                      </div>

                      {/* Title */}
                      <h3 className="mb-2.5 font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-xl leading-snug">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans text-xs leading-relaxed text-muted sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom link */}
                  <div className="p-6 sm:p-7 pt-0 mt-auto">
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

        {/* 4. AI DEVELOPMENT SECTION */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-t border-b border-border/60">
          {/* Subtle Grid Background Pattern */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40"
            aria-hidden
          />

          {/* Ambient Lighting */}
          <div
            className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-accent/8 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            {/* Header */}
            <div data-web="reveal" className="mb-14 max-w-3xl sm:mb-16 lg:mb-20">
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                {aiDevelopment.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(34px,5.5vw,58px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {aiDevelopment.title}
              </h2>

              <div className="mt-6 rounded-2xl border border-border/70 bg-surface/40 p-5 sm:p-6 backdrop-blur-xs">
                <p className="font-sans text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {aiDevelopment.lead}
                </p>
              </div>
            </div>

            {/* Bento Grid */}
            <div data-web="reveal" className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-3">
              {/* Top 3 Cards */}
              {aiDevelopment.features.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-surface/60 p-7 sm:p-8 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent-alt/40 hover:bg-surface hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-panel text-accent-alt shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-accent-alt group-hover:text-white">
                        {feature.id === "clean-code" && (
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z" />
                          </svg>
                        )}
                        {feature.id === "fast-development" && (
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                        )}
                        {feature.id === "security" && (
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                        )}
                      </div>
                      <span className="rounded-full bg-accent-alt/10 px-3 py-1 font-sans text-xs font-semibold text-accent-alt">
                        {feature.tag}
                      </span>
                    </div>

                    <h3 className="mb-3 font-sans text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-[22px] leading-snug">
                      {feature.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Bottom Feature Card: Smarter E-Commerce Experiences (Clean & Attractive with Image) */}
              {aiDevelopment.features[3] && (
                <div className="lg:col-span-3 overflow-hidden rounded-3xl border border-border/80 bg-surface/60 p-7 sm:p-10 shadow-(--card-shadow) backdrop-blur-xs transition-all duration-300 hover:border-accent-alt/40">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                    {/* Left Column: Exact Content */}
                    <div className="space-y-5 lg:col-span-7">
                      <div className="flex items-center gap-3">
                        <span className="inline-block rounded-full bg-accent-alt/10 px-3.5 py-1 font-sans text-xs font-semibold text-accent-alt">
                          {aiDevelopment.features[3].tag}
                        </span>
                      </div>

                      <h3 className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-[2rem] leading-tight">
                        {aiDevelopment.features[3].title}
                      </h3>

                      <p className="font-sans text-base leading-relaxed text-muted sm:text-[17px] sm:leading-[1.75]">
                        {aiDevelopment.features[3].description}
                      </p>

                      <div className="border-l-2 border-accent-alt/70 pl-5 pt-1">
                        <p className="font-sans text-sm font-semibold leading-relaxed text-foreground sm:text-base">
                          {aiDevelopment.features[3].result}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: High-Quality E-Commerce & AI Image */}
                    <div className="relative lg:col-span-5">
                      <div className="group/img relative aspect-4/3 overflow-hidden rounded-2xl border border-border/80 bg-panel shadow-xl">
                        <Image
                          src="/Image-18.jpg"
                          alt="Smarter E-Commerce Experiences"
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Floating subtle badge */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/15 bg-black/60 px-4 py-2.5 backdrop-blur-md">
                          <span className="font-sans text-xs font-semibold text-white">
                            AI-Powered Search & Discovery
                          </span>
                          <span className="font-mono text-xs font-bold text-accent-alt">
                            Intent-Driven
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* 5. TECHNOLOGY SECTION (ServiceProcess Timeline Layout with Industries Section Background) */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-t border-b border-border/60">
          {/* Subtle Grid Background Pattern from About Page Industries Section */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-accent-alt/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-accent/8 blur-3xl"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
              {/* Left Sticky Header */}
              <header
                data-web="reveal"
                className="lg:sticky lg:top-28 lg:self-start space-y-4"
              >
                <div>
                  <AccentMark className="mb-4 origin-left" />
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-alt">
                    {techStack.eyebrow}
                  </p>
                  <h2 className="font-sans text-[clamp(2rem,calc(2.5vw+1rem),3.25rem)] font-bold leading-tight tracking-tight text-foreground">
                    {techStack.title}
                  </h2>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-muted sm:text-base">
                    {techStack.description}
                  </p>
                  <p className="pt-3 font-sans text-xs font-semibold uppercase tracking-wider text-accent-alt">
                    {String(techStack.categories.length).padStart(2, "0")} Technology Categories
                  </p>
                </div>
              </header>

              {/* Right Vertical Timeline Process List */}
              <ol className="relative">
                <span
                  className="pointer-events-none absolute top-3 bottom-3 left-2.75 w-px bg-border/70 sm:left-3.75"
                  aria-hidden
                />

                {techStack.categories.map((cat, index) => (
                  <li
                    key={cat.id}
                    data-web="reveal"
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

                      {/* Tech Skills Pills */}
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

        {/* 6. FREQUENTLY ASKED QUESTIONS SECTION */}
        <section className="relative overflow-hidden bg-header py-20 sm:py-24 lg:py-32 border-t border-border/60">
          <div
            className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent-alt/8 blur-[130px]"
            aria-hidden
          />

          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
              {/* Left Column: Heading & Eyebrow */}
              <div data-web="reveal" className="space-y-4 lg:col-span-5">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold uppercase tracking-wider text-accent-alt">
                  {faqs.eyebrow}
                </p>
                <h2 className="font-sans text-[clamp(34px,5.2vw,56px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {faqs.title}
                </h2>
                <p className="mt-3 font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {faqs.description}
                </p>
              </div>

              {/* Right Column: Interactive FAQ Accordion */}
              <div data-web="reveal" className="lg:col-span-7">
                <FaqAccordion items={faqs.items} />
              </div>
            </div>
          </Container>
        </section>
      </div>

      {/* Final CTA Section */}
      <CtaSection
        content={{
          title: "Let's Build a Website That Helps Your Business Grow.",
          cta: {
            label: "Get a Free Quote",
            href: "/contact",
          },
        }}
      />
    </>
  );
}
