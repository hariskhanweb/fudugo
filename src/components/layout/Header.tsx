"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import navigation from "@/data/navigation.json";

type DropdownKey = keyof typeof navigation.dropdowns;

function CaretIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 512" aria-hidden fill="currentColor">
      <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
    </svg>
  );
}

function EnvelopeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" aria-hidden fill="currentColor">
      <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z" />
    </svg>
  );
}

function QuoteIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" aria-hidden fill="currentColor">
      <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z" />
    </svg>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<DropdownKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownKeys = Object.keys(navigation.dropdowns) as DropdownKey[];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setMobileAccordion(null);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-360 items-center justify-between gap-6 px-5 font-sans sm:px-8 lg:px-12 py-6">
        <Link href="/" className="relative z-10 shrink-0" onClick={closeMobile}>
          <Image
            src={site.logo}
            alt={site.name}
            className={`w-auto object-contain transition-[height] duration-500 ease-in-out ${
              scrolled
                ? "h-[2.1rem] sm:h-[2.8rem] md:h-14"
                : "h-12 sm:h-16 md:h-20"
            }`}
            width={180}
            height={50}
            priority
          />
        </Link>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex xl:gap-10"
        >
          {navigation.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[15px] font-semibold text-foreground transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}

          {dropdownKeys.map((key) => {
            const menu = navigation.dropdowns[key];
            const isOpen = openDropdown === key;
            const wide = key === "services";
            return (
              <div
                key={key}
                className="relative py-3"
                onMouseEnter={() => setOpenDropdown(key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-[15px] font-semibold text-foreground transition-opacity hover:opacity-70"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  {menu.label}
                  <CaretIcon
                    className={`h-3 w-3 text-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-1 transition-all duration-200 ${
                    wide ? "w-56" : "w-48"
                  } ${
                    isOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="rounded-lg border border-border bg-panel py-2 shadow-(--dropdown-shadow)">
                    {menu.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex xl:gap-6">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2.5 text-sm font-normal text-muted transition-colors hover:text-foreground"
          >
            <EnvelopeIcon className="h-4 w-4 shrink-0 text-muted" />
            <span className="hidden xl:inline">{site.email}</span>
          </a>
          <a
            href={navigation.cta.href}
            className="inline-flex items-center gap-2.5 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-hover hover:bg-surface-hover"
          >
            {navigation.cta.label}
            <QuoteIcon className="h-3.5 w-3.5 text-foreground" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="relative z-10 -mr-1 inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-foreground/5 lg:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 1000 1000">
            {mobileMenuOpen ? (
              <path d="M742 167L500 408 258 167C246 154 233 150 217 150 196 150 179 158 167 167 154 179 150 196 150 212 150 229 154 242 171 254L408 500 167 742C138 771 138 800 167 829 196 858 225 858 254 829L496 587 738 829C750 842 767 846 783 846 800 846 817 842 829 829 842 817 846 804 846 783 846 767 842 750 829 737L588 500 833 258C863 229 863 200 833 171 804 137 775 137 742 167Z" />
            ) : (
              <path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z" />
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-border bg-header transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          mobileMenuOpen
            ? "max-h-[min(100dvh,720px)] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="flex max-h-[min(calc(100dvh-88px),680px)] flex-col gap-1 overflow-y-auto px-5 py-4 font-sans"
        >
          {navigation.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              className="rounded-lg px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-foreground/5"
            >
              {link.label}
            </Link>
          ))}

          {dropdownKeys.map((key) => {
            const menu = navigation.dropdowns[key];
            const isOpen = mobileAccordion === key;
            return (
              <div key={key} className="rounded-lg">
                <button
                  type="button"
                  onClick={() =>
                    setMobileAccordion((prev) => (prev === key ? null : key))
                  }
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-semibold text-foreground transition-colors hover:bg-foreground/5"
                  aria-expanded={isOpen}
                >
                  {menu.label}
                  <CaretIcon
                    className={`h-3.5 w-3.5 text-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mb-1 ml-2 space-y-0.5 border-l border-border py-1 pl-3">
                      {menu.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={closeMobile}
                          className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mt-3 space-y-3 border-t border-border pt-4">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2.5 rounded-lg px-3 py-3 text-sm font-normal text-muted transition-colors hover:text-foreground"
            >
              <EnvelopeIcon className="h-4 w-4 text-muted" />
              {site.email}
            </a>
            <a
              href={navigation.cta.href}
              onClick={closeMobile}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-surface px-5 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-border-hover hover:bg-surface-hover"
            >
              {navigation.cta.label}
              <QuoteIcon className="h-3.5 w-3.5 text-foreground" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
