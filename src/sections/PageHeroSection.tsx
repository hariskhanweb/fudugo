"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import defaultContent from "@/data/about-page.json";
import type { PageHeroContent } from "@/types";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type PageHeroSectionProps = {
  title?: string;
  category?: string;
  pageTitle?: string;
  image?: string;
  imageAlt?: string;
  content?: Partial<PageHeroContent>;
  className?: string;
  priorityImage?: boolean;
  /** CSS object-position — overrides content.imagePosition */
  imagePosition?: string;
};

export default function PageHeroSection({
  title,
  category,
  pageTitle,
  image,
  imageAlt,
  content,
  className,
  priorityImage = true,
  imagePosition,
}: PageHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const resolvedTitle = title ?? pageTitle ?? content?.title ?? defaultContent.hero.title;
  const data: PageHeroContent = {
    ...defaultContent.hero,
    ...content,
    title: resolvedTitle,
    ...(image ? { image } : {}),
    ...(imageAlt ? { imageAlt } : {}),
  };
  const objectPosition =
    imagePosition ?? content?.imagePosition ?? data.imagePosition ?? "center";

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const title = section.querySelector("[data-page-hero='title']");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      if (title) tl.from(title, { y: 32, opacity: 0, duration: 0.85 }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={cn("bg-background", className)}>
      <div className="relative min-h-[42vh] overflow-hidden sm:min-h-[48vh] lg:min-h-[52vh]">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          priority={priorityImage}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-center justify-center px-5">
          <h1
            data-page-hero="title"
            className="text-center font-sans text-[clamp(40px,7.5vw,100px)] font-bold leading-[1.05] tracking-tight text-white max-w-5xl"
          >
            {data.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
