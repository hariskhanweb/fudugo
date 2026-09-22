"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "@/data/seo-page.json";
import { Container, AccentMark } from "@/components/ui";
import { CtaSection } from "@/sections";
import PageHeroSection from "@/sections/PageHeroSection";
import { useGsapContext } from "@/lib/use-gsap-context";
import { submitNotify } from "@/lib/submit-notify";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function SeoPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: content.form.services[0] ?? "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useGsapContext(
    rootRef,
    (scope) => {
      const blocks = scope.querySelectorAll("[data-seo='reveal']");
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { y: 22, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            ease: "power2.out",
            overwrite: "auto",
            immediateRender: false,
            clearProps: "transform",
            scrollTrigger: {
              trigger: block,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      const timelineTrack = scope.querySelector("[data-seo-timeline='track']");
      const progressBar = scope.querySelector("[data-seo-timeline='progress']");
      if (timelineTrack && progressBar) {
        gsap.fromTo(
          progressBar,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineTrack,
              start: "top 72%",
              end: "bottom 78%",
              scrub: 0.4,
            },
          },
        );
      }
    },
    [],
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.service) return;

    setIsSubmitting(true);
    setError("");
    const result = await submitNotify({
      type: "seo",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: content.form.services[0] ?? "",
      message: "",
    });
  };

  return (
    <>
      <PageHeroSection content={content.hero} />

      <div ref={rootRef}>
        <section className="relative overflow-hidden border-b border-border/60 bg-header py-16 sm:py-20 lg:py-28">
          <div
            className="pointer-events-none absolute top-1/2 -left-40 h-96 w-96 -translate-y-1/2 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-end">
              <div data-seo="reveal" className="lg:col-span-5">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                  {content.intro.eyebrow}
                </p>
                <h2 className="mt-3 font-sans text-[clamp(32px,5vw,52px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {content.intro.title}
                </h2>
              </div>
              <div data-seo="reveal" className="space-y-6 lg:col-span-7">
                <p className="border-l-2 border-accent-alt/70 pl-5 font-sans text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                  {content.intro.lead}
                </p>
                <Link
                  href={content.intro.ctaHref}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-accent-alt bg-accent-alt px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all hover:bg-accent-soft hover:shadow-accent-alt/40 outline-hidden focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <span>{content.intro.ctaLabel}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div data-seo="reveal" className="mb-12 max-w-3xl sm:mb-14 lg:mb-16">
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                {content.services.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(32px,5vw,48px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {content.services.title}
              </h2>
            </div>

            <div
              data-seo="reveal"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            >
              {content.services.items.map((item, index) => (
                <div
                  key={item.id}
                  className="group flex h-full flex-col border-t border-border/80 pt-5 transition-colors hover:border-accent-alt/50"
                >
                  <span className="font-mono text-xs font-bold tracking-wider text-accent-alt">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-sans text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-accent-soft sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden border-y border-border/60 bg-header py-14 sm:py-16 lg:py-20">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <p
              data-seo="reveal"
              className="mb-8 font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase sm:mb-10"
            >
              {content.stats.eyebrow}
            </p>
            <div
              data-seo="reveal"
              className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10"
            >
              {content.stats.items.map((stat) => (
                <div key={stat.label}>
                  <p className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-sans text-sm text-muted sm:text-[15px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
              <div data-seo="reveal" className="lg:col-span-5">
                <div className="lg:sticky lg:top-28 space-y-4">
                  <AccentMark className="mb-4 origin-left" />
                  <p className="font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                    {content.process.eyebrow}
                  </p>
                  <h2 className="font-sans text-[clamp(32px,5vw,48px)] font-bold leading-[1.08] tracking-tight text-foreground">
                    {content.process.title}
                  </h2>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ol className="relative" data-seo-timeline="track">
                  <span
                    className="pointer-events-none absolute top-3 bottom-3 left-2.75 w-px bg-border/70 sm:left-3.75"
                    aria-hidden
                  />
                  <span
                    data-seo-timeline="progress"
                    className="pointer-events-none absolute top-3 bottom-3 left-2.75 w-0.5 origin-top bg-linear-to-b from-accent-alt via-accent-soft to-accent-alt shadow-[0_0_12px_var(--accent-alt)] sm:left-3.75"
                    style={{ transform: "scaleY(0)" }}
                    aria-hidden
                  />

                  {content.process.steps.map((step, index) => (
                    <li
                      key={step.step}
                      data-seo="reveal"
                      className={cn(
                        "relative flex gap-5 pb-8 sm:gap-7 sm:pb-10",
                        index === content.process.steps.length - 1 && "pb-0 sm:pb-0",
                      )}
                    >
                      <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center sm:mt-0.5 sm:h-8 sm:w-8">
                        <span className="absolute inset-0 rounded-full border border-accent-alt/40 bg-background" />
                        <span className="relative h-2 w-2 rounded-full bg-accent-alt shadow-[0_0_8px_var(--accent-alt)] sm:h-2.5 sm:w-2.5" />
                      </div>
                      <div className="min-w-0 flex-1 border-b border-border/60 pb-8 sm:pb-10">
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-xs font-bold text-accent-alt">
                            {step.step}
                          </span>
                          <h3 className="font-sans text-lg font-bold text-foreground sm:text-xl">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-2.5 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden border-y border-border/60 bg-header py-16 sm:py-20 lg:py-28">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div data-seo="reveal" className="mb-10 max-w-3xl sm:mb-12">
              <AccentMark className="mb-4 origin-left" />
              <p className="mb-3 font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                {content.niches.eyebrow}
              </p>
              <h2 className="font-sans text-[clamp(32px,5vw,48px)] font-bold leading-[1.08] tracking-tight text-foreground">
                {content.niches.title}
              </h2>
            </div>
            <div
              data-seo="reveal"
              className="flex flex-wrap gap-3 sm:gap-3.5"
            >
              {content.niches.items.map((niche) => (
                <span
                  key={niche}
                  className="inline-flex border border-border/80 bg-surface/60 px-4 py-2.5 font-sans text-sm font-medium text-foreground transition-colors hover:border-accent-alt/40 hover:text-accent-soft sm:text-[15px]"
                >
                  {niche}
                </span>
              ))}
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div data-seo="reveal" className="mx-auto max-w-3xl text-center">
              <AccentMark className="mx-auto mb-4 origin-center" />
              <p className="font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                {content.testimonial.eyebrow}
              </p>
              <blockquote className="mt-6 font-sans text-xl font-medium leading-relaxed text-foreground sm:text-2xl sm:leading-relaxed lg:text-[1.75rem]">
                “{content.testimonial.quote}”
              </blockquote>
              <footer className="mt-8">
                <p className="font-sans text-base font-semibold text-foreground">
                  {content.testimonial.author}
                </p>
                <p className="mt-1 font-sans text-sm text-muted">
                  {content.testimonial.role}
                </p>
              </footer>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden border-y border-border/60 bg-header py-16 sm:py-20 lg:py-24">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div
              data-seo="reveal"
              className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
            >
              <div className="max-w-2xl">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                  {content.featured.eyebrow}
                </p>
                <h2 className="mt-3 font-sans text-[clamp(28px,4vw,40px)] font-bold leading-[1.1] tracking-tight text-foreground">
                  {content.featured.title}
                </h2>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted sm:text-lg">
                  {content.featured.body}
                </p>
              </div>
              <a
                href={content.featured.ctaHref}
                className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-accent-alt bg-accent-alt px-6 py-3 font-sans text-sm font-semibold text-white shadow-lg shadow-accent-alt/25 transition-all hover:bg-accent-soft outline-hidden focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span>{content.featured.ctaLabel}</span>
                <span>→</span>
              </a>
            </div>
          </Container>
        </section>

        <section
          id={content.form.id}
          className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28"
        >
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div data-seo="reveal" className="lg:col-span-5">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                  {content.form.eyebrow}
                </p>
                <h2 className="mt-3 font-sans text-[clamp(28px,4vw,40px)] font-bold leading-[1.1] tracking-tight text-foreground">
                  {content.form.title}
                </h2>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted">
                  {content.form.description}
                </p>
              </div>

              <form
                data-seo="reveal"
                onSubmit={handleSubmit}
                className="space-y-6 lg:col-span-7"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border-b border-border/80 bg-transparent py-3.5 text-base text-foreground placeholder-muted/60 outline-hidden transition-colors focus:border-accent-alt"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border-b border-border/80 bg-transparent py-3.5 text-base text-foreground placeholder-muted/60 outline-hidden transition-colors focus:border-accent-alt"
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full border-b border-border/80 bg-transparent py-3.5 text-base text-foreground placeholder-muted/60 outline-hidden transition-colors focus:border-accent-alt"
                  />
                  <select
                    required
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full cursor-pointer border-b border-border/80 bg-transparent py-3.5 text-base text-foreground outline-hidden transition-colors focus:border-accent-alt"
                  >
                    {content.form.services.map((service) => (
                      <option key={service} value={service} className="bg-panel text-foreground">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  rows={4}
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full resize-none border-b border-border/80 bg-transparent py-3.5 text-base text-foreground placeholder-muted/60 outline-hidden transition-colors focus:border-accent-alt"
                />
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-panel px-8 py-3.5 font-sans text-sm font-semibold text-foreground transition-all hover:border-accent-alt hover:bg-surface-hover outline-hidden focus-visible:ring-2 focus-visible:ring-accent-alt/70 disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending..." : content.form.submitLabel}
                  </button>
                </div>
                {submitted ? (
                  <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400">
                    {content.form.successMessage}
                  </p>
                ) : null}
                {error ? (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                    {error}
                  </p>
                ) : null}
              </form>
            </div>
          </Container>
        </section>

        <CtaSection />
      </div>
    </>
  );
}
