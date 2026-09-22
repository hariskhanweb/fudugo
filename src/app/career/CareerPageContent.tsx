"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import content from "@/data/career-page.json";
import { Container, AccentMark } from "@/components/ui";
import { CtaSection } from "@/sections";
import PageHeroSection from "@/sections/PageHeroSection";
import { useGsapContext } from "@/lib/use-gsap-context";
import { submitNotify } from "@/lib/submit-notify";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Job = (typeof content.openings.jobs)[number];

function PerkIcon({ id }: { id: string }) {
  switch (id) {
    case "flexible-hours":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "company-activities":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "coworkers":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "transparency":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "salaries":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case "growth":
      return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    default:
      return null;
  }
}

export default function CareerPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [selectedJobId, setSelectedJobId] = useState<string>(
    content.openings.jobs[0]?.id ?? "",
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: content.openings.jobs[0]?.title ?? content.apply.openApplicationLabel,
    message: "",
  });
  const [resumeName, setResumeName] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const selectedJob = useMemo(
    () =>
      content.openings.jobs.find((job) => job.id === selectedJobId) ??
      content.openings.jobs[0],
    [selectedJobId],
  );

  useGsapContext(
    rootRef,
    (scope) => {
      const blocks = scope.querySelectorAll("[data-career='reveal']");
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
    },
    [],
  );

  const selectJob = (job: Job) => {
    setSelectedJobId(job.id);
    setFormData((prev) => ({ ...prev, role: job.title }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.role) return;

    setIsSubmitting(true);
    setError("");
    const result = await submitNotify({
      type: "career",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      message: formData.message,
      resume: resumeFile,
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
      role: content.apply.openApplicationLabel,
      message: "",
    });
    setResumeName("");
    setResumeFile(null);
  };

  return (
    <>
      <PageHeroSection content={content.hero} />

      <div ref={rootRef}>
        {/* Intro */}
        <section className="relative overflow-hidden border-b border-border/60 bg-header py-16 sm:py-20 lg:py-28">
          <div
            className="pointer-events-none absolute top-1/2 -left-40 h-96 w-96 -translate-y-1/2 rounded-full bg-accent-alt/10 blur-[130px]"
            aria-hidden
          />
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-end">
              <div data-career="reveal" className="lg:col-span-5">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                  {content.intro.eyebrow}
                </p>
                <h2 className="mt-3 font-sans text-[clamp(32px,5vw,52px)] font-bold leading-[1.08] tracking-tight text-foreground">
                  {content.intro.title}
                </h2>
              </div>
              <div data-career="reveal" className="space-y-5 lg:col-span-7">
                <p className="border-l-2 border-accent-alt/70 pl-5 font-sans text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                  {content.intro.lead}
                </p>
                <p className="font-sans text-base leading-relaxed text-muted sm:text-[17px] sm:leading-[1.8]">
                  {content.intro.body}
                </p>
                <Link
                  href={content.intro.ctaHref}
                  className="inline-flex cursor-pointer items-center gap-2 font-sans text-sm font-semibold text-accent-alt outline-hidden transition-colors hover:text-accent-soft focus-visible:ring-2 focus-visible:ring-accent-alt/70"
                >
                  {content.intro.ctaLabel}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Testimonial + life */}
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <article
                data-career="reveal"
                className="rounded-3xl border border-border/70 bg-surface/50 p-7 sm:p-9 lg:col-span-5"
              >
                <p className="font-sans text-xs font-semibold tracking-[0.18em] text-accent-alt uppercase">
                  {content.testimonial.eyebrow}
                </p>
                <blockquote className="mt-5 font-sans text-lg leading-relaxed text-foreground sm:text-xl">
                  “{content.testimonial.quote}”
                </blockquote>
                <p className="mt-6 font-sans text-sm font-semibold text-muted">
                  — {content.testimonial.author}
                </p>
              </article>

              <article
                data-career="reveal"
                className="overflow-hidden rounded-3xl border border-border/70 bg-header lg:col-span-7"
              >
                <div className="grid h-full sm:grid-cols-2">
                  <div className="relative min-h-52 sm:min-h-full">
                    <Image
                      src={content.life.image}
                      alt={content.life.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-7 sm:p-8">
                    <p className="font-sans text-xs font-semibold tracking-[0.18em] text-accent-alt uppercase">
                      {content.life.eyebrow}
                    </p>
                    <h3 className="mt-3 font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {content.life.title}
                    </h3>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                      {content.life.body}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </Container>
        </section>

        {/* Openings */}
        <section
          id="openings"
          className="relative scroll-mt-28 overflow-hidden border-y border-border/60 bg-header py-16 sm:py-20 lg:py-28"
        >
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div data-career="reveal" className="mb-10 max-w-2xl sm:mb-12">
              <AccentMark className="mb-4 origin-left" />
              <p className="font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                {content.openings.eyebrow}
              </p>
              <h2 className="mt-3 font-sans text-[clamp(30px,4.5vw,48px)] font-bold leading-tight tracking-tight text-foreground">
                {content.openings.title}
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-muted">
                {content.openings.description}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
              <div data-career="reveal" className="flex flex-col gap-3 lg:col-span-5">
                {content.openings.jobs.map((job) => {
                  const active = job.id === selectedJob?.id;
                  return (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => selectJob(job)}
                      className={cn(
                        "cursor-pointer rounded-2xl border p-5 text-left transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-accent-alt/70",
                        active
                          ? "border-accent-alt/50 bg-surface"
                          : "border-border/70 bg-surface/30 hover:border-border hover:bg-surface/60",
                      )}
                    >
                      <h3 className="font-sans text-lg font-bold text-foreground">
                        {job.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-border/70 px-2.5 py-1 font-sans text-[11px] text-muted">
                          {job.location}
                        </span>
                        <span className="rounded-full border border-border/70 px-2.5 py-1 font-sans text-[11px] text-muted">
                          {job.experience}
                        </span>
                        <span className="rounded-full border border-border/70 px-2.5 py-1 font-sans text-[11px] text-muted">
                          {job.mode}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedJob ? (
                <div
                  data-career="reveal"
                  className="rounded-3xl border border-border/70 bg-surface/40 p-6 sm:p-8 lg:col-span-7"
                >
                  <p className="font-sans text-xs font-semibold tracking-[0.16em] text-accent-alt uppercase">
                    Role details
                  </p>
                  <h3 className="mt-2 font-sans text-2xl font-bold text-foreground sm:text-3xl">
                    {selectedJob.title}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                    {selectedJob.summary}
                  </p>

                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-foreground">
                        Responsibilities
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {selectedJob.responsibilities.map((item) => (
                          <li
                            key={item}
                            className="border-l-2 border-accent-alt/40 pl-3 font-sans text-sm text-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-foreground">
                        Requirements
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {selectedJob.requirements.map((item) => (
                          <li
                            key={item}
                            className="border-l-2 border-accent-alt/40 pl-3 font-sans text-sm text-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    href="#apply"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        role: selectedJob.title,
                      }))
                    }
                    className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-accent-alt/40 bg-accent-alt/10 px-5 py-3 font-sans text-sm font-semibold text-accent-alt outline-hidden transition-colors hover:bg-accent-alt/20 focus-visible:ring-2 focus-visible:ring-accent-alt/70"
                  >
                    Apply for this role
                    <span aria-hidden>→</span>
                  </a>
                </div>
              ) : (
                <p className="font-sans text-sm text-muted lg:col-span-7">
                  {content.openings.emptyLabel}
                </p>
              )}
            </div>
          </Container>
        </section>

        {/* Perks */}
        <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28">
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div data-career="reveal" className="mb-10 max-w-2xl sm:mb-12">
              <AccentMark className="mb-4 origin-left" />
              <p className="font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                {content.perks.eyebrow}
              </p>
              <h2 className="mt-3 font-sans text-[clamp(30px,4.5vw,48px)] font-bold leading-tight tracking-tight text-foreground">
                {content.perks.title}
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-muted">
                {content.perks.description}
              </p>
            </div>

            <div
              data-career="reveal"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {content.perks.items.map((perk) => (
                <article
                  key={perk.id}
                  className="rounded-2xl border border-border/70 bg-surface/40 p-6 transition-colors hover:border-accent-alt/35"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 bg-panel text-accent-alt">
                    <PerkIcon id={perk.id} />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-foreground">
                    {perk.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-muted">
                    {perk.description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* Apply form */}
        <section
          id="apply"
          className="relative scroll-mt-28 overflow-hidden border-t border-border/60 bg-header py-16 sm:py-20 lg:py-28"
        >
          <Container className="relative px-5 sm:px-8 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div data-career="reveal" className="lg:col-span-5">
                <AccentMark className="mb-4 origin-left" />
                <p className="font-sans text-sm font-semibold tracking-wider text-accent-alt uppercase">
                  {content.apply.eyebrow}
                </p>
                <h2 className="mt-3 font-sans text-[clamp(30px,4.5vw,48px)] font-bold leading-tight tracking-tight text-foreground">
                  {content.apply.title}
                </h2>
                <p className="mt-4 font-sans text-base leading-relaxed text-muted">
                  {content.apply.description}
                </p>
                <p className="mt-4 font-mono text-xs text-muted">
                  {content.apply.emailHint}
                </p>
              </div>

              <div
                data-career="reveal"
                className="rounded-3xl border border-border/70 bg-surface/40 p-6 sm:p-8 lg:col-span-7"
              >
                {submitted ? (
                  <p className="font-sans text-base font-medium text-foreground">
                    {content.apply.fields.success}
                  </p>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error ? (
                      <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 font-sans text-sm text-red-400">
                        {error}
                      </p>
                    ) : null}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block font-sans text-xs font-semibold tracking-wide text-muted uppercase">
                          {content.apply.fields.name}
                        </span>
                        <input
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-border/70 bg-panel px-4 py-3 font-sans text-sm text-foreground outline-hidden transition-colors focus:border-accent-alt/50 focus-visible:ring-2 focus-visible:ring-accent-alt/60"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block font-sans text-xs font-semibold tracking-wide text-muted uppercase">
                          {content.apply.fields.email}
                        </span>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-border/70 bg-panel px-4 py-3 font-sans text-sm text-foreground outline-hidden transition-colors focus:border-accent-alt/50 focus-visible:ring-2 focus-visible:ring-accent-alt/60"
                        />
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block font-sans text-xs font-semibold tracking-wide text-muted uppercase">
                          {content.apply.fields.phone}
                        </span>
                        <input
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-border/70 bg-panel px-4 py-3 font-sans text-sm text-foreground outline-hidden transition-colors focus:border-accent-alt/50 focus-visible:ring-2 focus-visible:ring-accent-alt/60"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block font-sans text-xs font-semibold tracking-wide text-muted uppercase">
                          {content.apply.fields.role}
                        </span>
                        <select
                          required
                          value={formData.role}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }))
                          }
                          className="w-full cursor-pointer rounded-xl border border-border/70 bg-panel px-4 py-3 font-sans text-sm text-foreground outline-hidden transition-colors focus:border-accent-alt/50 focus-visible:ring-2 focus-visible:ring-accent-alt/60"
                        >
                          <option value={content.apply.openApplicationLabel}>
                            {content.apply.openApplicationLabel}
                          </option>
                          {content.openings.jobs.map((job) => (
                            <option key={job.id} value={job.title}>
                              {job.title}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-1.5 block font-sans text-xs font-semibold tracking-wide text-muted uppercase">
                        {content.apply.fields.message}
                      </span>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
                        className="w-full resize-y rounded-xl border border-border/70 bg-panel px-4 py-3 font-sans text-sm text-foreground outline-hidden transition-colors focus:border-accent-alt/50 focus-visible:ring-2 focus-visible:ring-accent-alt/60"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block font-sans text-xs font-semibold tracking-wide text-muted uppercase">
                        {content.apply.fields.resume}
                      </span>
                      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-border/80 bg-panel/70 px-4 py-4">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            setResumeFile(file);
                            setResumeName(file?.name ?? "");
                          }}
                          className="w-full cursor-pointer font-sans text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-accent-alt/15 file:px-3 file:py-2 file:font-sans file:text-sm file:font-semibold file:text-accent-alt"
                        />
                        {resumeName ? (
                          <p className="font-mono text-xs text-muted">
                            Selected: {resumeName}
                          </p>
                        ) : null}
                      </div>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-accent-alt/40 bg-accent-alt px-6 py-3 font-sans text-sm font-semibold text-white outline-hidden transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent-alt/70 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting
                        ? content.apply.fields.submitting
                        : content.apply.fields.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </Container>
        </section>
      </div>

      <CtaSection
        content={{
          title: "Ready to grow with FuduGo?",
          cta: { label: "View open roles", href: "#openings" },
        }}
      />
    </>
  );
}
