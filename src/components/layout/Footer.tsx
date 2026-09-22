"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import footer from "@/data/footer.json";
import { submitNotify } from "@/lib/submit-notify";

function ChevronCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 512 512"
      aria-hidden
      fill="currentColor"
    >
      <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z" />
    </svg>
  );
}

export default function Footer() {
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [newsletterError, setNewsletterError] = useState("");

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const email = emailInput?.value?.trim() ?? "";
    if (!email) return;

    setNewsletterStatus("loading");
    setNewsletterError("");
    const result = await submitNotify({
      type: "newsletter",
      email,
    });

    if (!result.ok) {
      setNewsletterStatus("error");
      setNewsletterError(result.error);
      return;
    }

    setNewsletterStatus("success");
    form.reset();
  };

  return (
    <footer className="border-t border-border bg-header text-foreground">
      <div className="mx-auto max-w-360 px-5 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24">
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12 xl:gap-x-14">
          {/* Brand + contact */}
          <div className="flex flex-col gap-7 lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src={site.logo}
                alt={site.name}
                className="h-8 w-auto object-contain sm:h-9"
                width={160}
                height={45}
              />
            </Link>

            <p className="max-w-sm font-sans text-[15px] font-medium leading-relaxed text-foreground sm:text-base">
              {footer.tagline}
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h5 className="font-sans text-[15px] font-semibold text-foreground">
                  India Office
                </h5>
                <p className="max-w-xs font-sans text-sm leading-relaxed text-muted">
                  {site.address}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="font-sans text-[15px] font-semibold text-foreground">
                  US Office
                </h5>
                <p className="max-w-xs font-sans text-sm leading-relaxed text-muted">
                  {site.usAddress}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="font-sans text-[15px] font-semibold text-foreground">
                  {footer.contactLabel}
                </h5>
                <a
                  href={site.phoneHref}
                  className="font-sans text-sm text-muted transition-colors hover:text-foreground"
                >
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="font-sans text-sm text-muted transition-colors hover:text-foreground"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            <h4 className="font-sans text-base font-semibold text-foreground sm:text-lg">
              {footer.quickLinksTitle}
            </h4>
            <ul className="flex flex-col gap-3.5">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2.5 font-sans text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <span
                      className="inline-flex shrink-0 text-accent-alt transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      <ChevronCircleIcon className="h-4 w-4" />
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / social / awards */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="flex flex-col gap-5">
              <h5 className="max-w-sm font-sans text-[15px] font-semibold leading-snug text-foreground sm:text-base">
                {footer.newsletter.title}
              </h5>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4"
              >
                <label className="sr-only" htmlFor="footer-email">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  placeholder={footer.newsletter.placeholder}
                  required
                  className="min-w-0 grow border-0 border-b border-border bg-transparent px-0 py-2.5 font-sans text-sm text-foreground outline-hidden transition-colors placeholder:text-muted focus:border-accent-alt"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="shrink-0 cursor-pointer rounded-lg border border-border bg-transparent px-5 py-2.5 font-sans text-sm font-medium text-foreground transition-colors outline-hidden hover:border-border-hover hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-accent-alt/70 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {newsletterStatus === "loading"
                    ? "Sending..."
                    : footer.newsletter.button}
                </button>
              </form>
              {newsletterStatus === "success" ? (
                <p className="font-sans text-sm text-emerald-400">
                  Thanks — you’re subscribed.
                </p>
              ) : null}
              {newsletterStatus === "error" ? (
                <p className="font-sans text-sm text-red-400">{newsletterError}</p>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <h5 className="shrink-0 font-sans text-[15px] font-semibold text-foreground">
                {footer.socialTitle}
              </h5>
              <ul className="flex flex-wrap gap-2.5" role="list">
                {footer.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-accent-alt text-white transition-colors duration-200 outline-hidden hover:scale-105 hover:bg-accent-soft focus-visible:ring-2 focus-visible:ring-accent-alt/70"
                    >
                      <svg
                        className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4"
                        viewBox={social.viewBox}
                        aria-hidden
                      >
                        <path d={social.path} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 border-t border-border pt-7">
              <h5 className="font-sans text-[15px] font-semibold text-foreground">
                {footer.awardsTitle}
              </h5>
              <div className="flex flex-wrap gap-2.5">
                {footer.awards.map((award) => (
                  <a
                    key={award}
                    href="#"
                    className="inline-flex min-h-10 items-center rounded-full border border-border bg-transparent px-3.5 py-2.5 font-sans text-xs font-medium text-muted transition-colors outline-hidden hover:border-border-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent-alt/70"
                  >
                    {award}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-7 font-sans text-sm text-muted sm:flex-row sm:items-center">
          <p className="leading-relaxed">
            {footer.copyright.prefix}{" "}
            <Link
              href="/"
              className="font-medium text-accent-alt transition-opacity hover:opacity-80"
            >
              {footer.copyright.brand}
            </Link>
            {footer.copyright.suffix}
          </p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            {footer.legal.map((item, index) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-x-3"
              >
                {index > 0 ? (
                  <span className="text-foreground/25" aria-hidden>
                    |
                  </span>
                ) : null}
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
