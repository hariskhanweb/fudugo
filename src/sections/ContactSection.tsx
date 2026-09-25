"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contactData from "@/data/contact.json";
import { Container } from "@/components/ui";
import { submitContact } from "@/lib/submit-contact";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const leftCol = section.querySelector("[data-contact='left']");
      const rightCol = section.querySelector("[data-contact='right']");

      if (leftCol && rightCol) {
        gsap.from([leftCol, rightCol], {
          y: 36,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setError("");
    const result = await submitContact({
      type: "contact",
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28"
    >
      {/* Background glow effects */}
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-accent-alt/10 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-accent/8 blur-[120px]"
        aria-hidden
      />

      <Container className="relative px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          
          {/* Left Column: Title, Intro & Map */}
          <div data-contact="left" className="space-y-8 sm:space-y-10 lg:col-span-6 xl:col-span-6">
            <div className="space-y-4 sm:space-y-5">
              <p className="font-sans text-sm font-semibold tracking-wide text-accent-alt sm:text-[15px]">
                {contactData.eyebrow}
              </p>
              
              <h2 className="font-sans text-[clamp(44px,6.5vw,76px)] font-bold leading-[1.05] tracking-tight text-foreground">
                {contactData.titleLines?.[0] ?? "Contact"}
                <span className="block text-foreground">
                  {contactData.titleLines?.[1] ?? "Us"}
                </span>
              </h2>

              <p className="max-w-xl font-sans text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
                {contactData.description}
              </p>
            </div>

            {/* Google Map Card */}
            <div className="pt-2">
              <div className="group relative aspect-4/3 w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-surface/60 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-accent-alt/40 sm:aspect-16/10">
                
                {/* Floating "Open in Maps" Badge */}
                <a
                  href={contactData.map.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-black/75 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-accent-alt hover:bg-black/90 hover:scale-105"
                >
                  <span>Open in Maps</span>
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>

                {/* Map Iframe */}
                <iframe
                  title="Office Location Map"
                  src={contactData.map.embedUrl}
                  className="h-full w-full border-0 opacity-80 contrast-[1.05] grayscale transition-opacity duration-500 group-hover:opacity-95"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Ambient vignette overlay */}
                <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-transparent to-black/30" />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form & Info */}
          <div data-contact="right" className="space-y-12 lg:col-span-6 xl:col-span-6 lg:pt-4">
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-b border-border/80 bg-transparent py-4 text-base text-foreground placeholder-muted/60 transition-colors duration-200 outline-hidden focus:border-accent-alt sm:text-lg"
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-b border-border/80 bg-transparent py-4 text-base text-foreground placeholder-muted/60 transition-colors duration-200 outline-hidden focus:border-accent-alt sm:text-lg"
                />
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-none border-b border-border/80 bg-transparent py-4 text-base text-foreground placeholder-muted/60 transition-colors duration-200 outline-hidden focus:border-accent-alt sm:text-lg"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-panel px-9 py-4 font-sans text-sm font-semibold text-foreground shadow-(--card-shadow) transition-all duration-300 outline-hidden hover:border-accent-alt hover:bg-surface-hover hover:shadow-[0_0_24px_-4px_var(--accent-glow)] focus-visible:ring-2 focus-visible:ring-accent-alt/70 active:scale-95 disabled:opacity-60 sm:text-[15px]"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="h-4 w-4 animate-spin text-accent-alt" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </div>

              {submitted && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400">
                  Thank you! Your message has been sent successfully. We will get back to you soon.
                </div>
              )}
              {error ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
                  {error}
                </div>
              ) : null}
            </form>

            {/* Direct Contact Details Block */}
            <div className="space-y-6 pt-4 border-t border-border/60">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <a
                  href={contactData.phoneHref}
                  className="font-sans text-lg font-bold text-foreground transition-colors hover:text-accent-soft sm:text-xl"
                >
                  {contactData.phone}
                </a>
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-accent-alt sm:text-sm">
                  {contactData.phoneLabel}
                </span>
              </div>

              {/* Email */}
              <div className="flex flex-wrap items-baseline gap-3">
                <a
                  href={contactData.emailHref}
                  className="font-sans text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-accent-soft sm:text-3xl lg:text-4xl"
                >
                  {contactData.email}
                </a>
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-accent-alt sm:text-sm">
                  {contactData.emailLabel}
                </span>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
