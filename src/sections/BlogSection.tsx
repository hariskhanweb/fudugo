"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "@/data/blog.json";
import { BlogCard, Container } from "@/components/ui";
import { getRecentBlogPosts } from "@/lib/blog";

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const posts = getRecentBlogPosts(3);
  const featured = posts[0];
  const secondary = posts.slice(1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector("[data-blog='eyebrow']");
      const title = section.querySelector("[data-blog='title']");
      const divider = section.querySelector("[data-blog='divider']");
      const cta = section.querySelector("[data-blog='cta']");
      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-blog='card']"),
      );
      const featuredMedia = section.querySelector<HTMLElement>(
        "[data-blog='featured-media']",
      );
      const featuredCard = section.querySelector<HTMLElement>(
        "[data-blog='featured']",
      );

      const headerTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      if (eyebrow) {
        headerTl.from(eyebrow, { y: 18, opacity: 0, duration: 0.55 }, 0);
      }
      if (title) {
        headerTl.from(title, { y: 40, opacity: 0, duration: 0.85 }, 0.08);
      }
      if (divider) {
        headerTl.from(divider, { scaleX: 0, opacity: 0, duration: 0.7 }, 0.18);
      }
      if (cta) {
        headerTl.from(cta, { y: 16, opacity: 0, duration: 0.55 }, 0.28);
      }

      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 48,
          opacity: 0,
          duration: 0.85,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      if (featuredMedia && featuredCard) {
        const xTo = gsap.quickTo(featuredMedia, "x", {
          duration: 0.9,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(featuredMedia, "y", {
          duration: 0.9,
          ease: "power3.out",
        });

        const onMove = (event: MouseEvent) => {
          const rect = featuredCard.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          xTo(x * -18);
          yTo(y * -18);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        featuredCard.addEventListener("mousemove", onMove);
        featuredCard.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          featuredCard.removeEventListener("mousemove", onMove);
          featuredCard.removeEventListener("mouseleave", onLeave);
        });
      }
    }, section);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={data.id}
      className="overflow-x-clip bg-background py-20 sm:py-24 lg:py-28"
    >
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-14 lg:flex-row lg:items-end lg:gap-8">
          <div className="min-w-0 max-w-3xl shrink-0 space-y-3">
            <p
              data-blog="eyebrow"
              className="font-sans text-sm font-normal text-accent-soft sm:text-[15px]"
            >
              {data.eyebrow}
            </p>
            <h2
              data-blog="title"
              className="font-sans text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight text-foreground"
            >
              {data.title}
            </h2>
          </div>

          <div className="flex min-w-0 flex-1 items-center gap-5 pb-1 lg:gap-6">
            <div
              data-blog="divider"
              className="hidden h-px flex-1 origin-left bg-foreground/10 sm:block"
            />
            <Link
              data-blog="cta"
              href={data.cta.href}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-border bg-transparent px-5 py-3 font-sans text-sm font-medium text-foreground transition-colors duration-300 hover:border-border-hover hover:bg-foreground/5 sm:px-6"
            >
              {data.cta.label}
            </Link>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4 lg:gap-5">
          <div data-blog="featured" className="min-h-full lg:col-span-2">
            <BlogCard post={{ ...featured, featured: true }} className="h-full" />
          </div>

          {secondary.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
