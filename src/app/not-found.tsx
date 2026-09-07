import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Page not found",
    description: "This page does not exist. Return to FuduGo to explore our work and services.",
    path: "/404",
    noIndex: true,
  }),
};

export default function NotFound() {
  return (
    <section className="bg-background px-5 py-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-xl">
        <p className="font-sans text-sm font-semibold text-accent-alt">404</p>
        <h1 className="mt-3 font-sans text-[clamp(36px,6vw,56px)] font-bold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-4 font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
          The page you are looking for has moved or never existed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex cursor-pointer font-sans text-sm font-semibold text-accent-alt outline-hidden hover:text-accent-soft focus-visible:ring-2 focus-visible:ring-accent-alt/70"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
