"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import page from "@/data/portfolio-page.json";
import { Container, ProjectCard } from "@/components/ui";
import { CtaSection } from "@/sections";
import PageHeroSection from "@/sections/PageHeroSection";
import { getAllProjects } from "@/lib/works";
import { useGsapContext } from "@/lib/use-gsap-context";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const projects = getAllProjects();
  const left = projects.filter((_, index) => index % 2 === 0);
  const right = projects.filter((_, index) => index % 2 === 1);

  useGsapContext(
    rootRef,
    (scope) => {
      const heading = scope.querySelectorAll("[data-portfolio='heading']");
      const cards = scope.querySelectorAll("[data-portfolio='card']");

      gsap.fromTo(
        heading,
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: "auto",
          immediateRender: false,
          clearProps: "transform",
        },
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 48, autoAlpha: 0, scale: 0.98 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.85,
            delay: (index % 2) * 0.06,
            ease: "power3.out",
            overwrite: "auto",
            immediateRender: false,
            clearProps: "transform",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          },
        );
      });
    },
    [],
  );

  return (
    <>
      <PageHeroSection content={page.hero} />

      <div ref={rootRef}>
        <section className="bg-header pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
          <Container className="px-5 sm:px-8 lg:px-10">
            <div className="mb-12 flex flex-col gap-6 sm:mb-16 lg:mb-20 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
              <div
                data-portfolio="heading"
                className="flex flex-wrap items-baseline gap-x-3 gap-y-2 sm:gap-x-4"
              >
                <h2 className="font-sans text-[clamp(40px,7vw,72px)] font-bold leading-none tracking-tight text-foreground">
                  {page.title}
                </h2>
                <span className="font-sans text-sm font-normal text-accent-soft sm:text-[15px]">
                  {page.eyebrow}
                </span>
              </div>

              <p
                data-portfolio="heading"
                className="max-w-md font-sans text-sm leading-relaxed text-muted lg:max-w-xs lg:pt-3 xl:max-w-sm"
              >
                {page.description}
              </p>
            </div>

            {projects.length === 0 ? (
              <p className="font-sans text-base text-muted">
                Projects will appear here soon.
              </p>
            ) : (
              <div className="grid gap-2 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  {left.map((project) => (
                    <div key={project.id} data-portfolio="card">
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {right.map((project) => (
                    <div key={project.id} data-portfolio="card">
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>

        <CtaSection />
      </div>
    </>
  );
}
