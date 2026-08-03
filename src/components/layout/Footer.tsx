"use client";

import { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import footer from "@/data/footer.json";

function ChevronCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" aria-hidden fill="currentColor">
      <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z" />
    </svg>
  );
}

export default function Footer() {
  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="border-t border-border bg-panel text-foreground">
      <div className="mx-auto max-w-375 px-5 pb-12 pt-16 sm:px-8 sm:pt-20 lg:px-10">
        <div className="grid grid-cols-1 gap-12 pb-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="space-y-6 lg:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src={site.logo}
                alt={site.name}
                className="h-8 w-auto object-contain sm:h-9"
                width={160}
                height={45}
              />
            </Link>

            <p className="max-w-sm text-[15px] leading-relaxed text-foreground/90">
              {footer.tagline}
            </p>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <h5 className="text-sm font-semibold text-foreground">
                  {footer.officeLabel}
                </h5>
                <p className="max-w-xs text-sm leading-relaxed text-muted">
                  {site.address}
                </p>
              </div>
              <div className="space-y-1.5">
                <h5 className="text-sm font-semibold text-foreground">
                  {footer.contactLabel}
                </h5>
                <a
                  href={site.phoneHref}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {site.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-3">
            <h4 className="text-base font-semibold text-foreground">
              {footer.quickLinksTitle}
            </h4>
            <ul className="space-y-3.5">
              {footer.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <span
                      className="inline-flex shrink-0 text-accent-alt transition-transform group-hover:translate-x-0.5"
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

          <div className="space-y-8 lg:col-span-5">
            <div className="space-y-4">
              <h5 className="text-[15px] font-medium leading-snug text-foreground">
                {footer.newsletter.title}
              </h5>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
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
                  className="min-w-0 flex-1 rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-border-hover"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg border border-border bg-header px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-hover hover:bg-surface"
                >
                  {footer.newsletter.button}
                </button>
              </form>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-foreground">
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
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-alt text-foreground transition-transform hover:scale-105 hover:brightness-110"
                    >
                      <svg
                        className="h-4.5 w-4.5 fill-current"
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

            <div className="space-y-3">
              <h5 className="text-sm font-semibold text-foreground">
                {footer.awardsTitle}
              </h5>
              <div className="flex flex-wrap gap-2">
                {footer.awards.map((award) => (
                  <a
                    key={award}
                    href="#"
                    className="rounded-full border border-border bg-input px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-border-hover hover:text-foreground"
                  >
                    {award}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center">
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
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted"
          >
            {footer.legal.map((item, index) => (
              <span key={item.label} className="inline-flex items-center gap-x-3">
                {index > 0 ? (
                  <span className="text-muted/40" aria-hidden>
                    |
                  </span>
                ) : null}
                <a
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
