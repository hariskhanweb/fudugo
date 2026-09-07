"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contactData from "@/data/contact.json";
import { Container } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

function SocialIcon({ type }: { type: string }) {
  switch (type) {
    case "instagram":
      return (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
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
              
              <h1 className="font-sans text-[clamp(44px,6.5vw,76px)] font-bold leading-[1.05] tracking-tight text-foreground">
                Let’s Create
                <span className="block text-foreground">Something Great</span>
              </h1>

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
                  className="w-full border-b border-border/80 bg-transparent py-4 text-base text-foreground placeholder-muted/60 transition-colors duration-200 focus:border-accent-alt focus:outline-none sm:text-lg"
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
                  className="w-full border-b border-border/80 bg-transparent py-4 text-base text-foreground placeholder-muted/60 transition-colors duration-200 focus:border-accent-alt focus:outline-none sm:text-lg"
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
                  className="w-full resize-none border-b border-border/80 bg-transparent py-4 text-base text-foreground placeholder-muted/60 transition-colors duration-200 focus:border-accent-alt focus:outline-none sm:text-lg"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-panel px-9 py-4 font-sans text-sm font-semibold text-foreground shadow-(--card-shadow) transition-all duration-300 hover:border-accent-alt hover:bg-surface-hover hover:shadow-[0_0_24px_-4px_var(--accent-glow)] active:scale-95 disabled:opacity-60 sm:text-[15px]"
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

              {/* Social Media Row */}
              <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span className="font-sans text-base font-bold text-foreground sm:text-lg">
                  Social Media
                </span>

                <div className="flex items-center gap-3">
                  {contactData.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-alt text-white shadow-md shadow-accent-alt/20 transition-all duration-300 hover:-translate-y-1 hover:bg-accent-soft hover:shadow-lg hover:shadow-accent-alt/40 sm:h-12 sm:w-12"
                    >
                      <SocialIcon type={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
