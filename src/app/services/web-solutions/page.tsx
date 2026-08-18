"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import content from "@/data/web-solutions-page.json";
import { Container, PillarAccordion } from "@/components/ui";
import {
  CtaSection,
  ServiceCtaBanner,
  ServiceHelpPicker,
  ServiceProcess,
  ServiceSpotlight,
} from "@/sections";
import RelatedServices from "@/sections/services/RelatedServices";
import { getRelatedServices } from "@/lib/service-pages";
import { useGsapContext } from "@/lib/use-gsap-context";

export default function WebSolutionsPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const related = getRelatedServices("web-solutions");

  useGsapContext(
    rootRef,
    (scope) => {
      const blocks = scope.querySelectorAll("[data-web='reveal']");
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: block,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    },
    [],
  );

  return (
    <>
      <div ref={rootRef}>
        <section className="bg-background pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-28">
          <Container className="px-5 sm:px-8 lg:px-10">
            <div data-web="reveal" className="mx-auto max-w-4xl text-center">
              <h1 className="font-sans text-[clamp(42px,9vw,88px)] font-bold leading-[0.98] tracking-tight text-foreground">
                {content.title}
              </h1>
              <ul className="mt-7 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-2.5">
                {content.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-surface px-3.5 py-1.5 font-sans text-xs text-foreground/75 sm:px-4 sm:text-sm"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-web="reveal"
              className="mt-16 grid items-start gap-12 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20 xl:gap-28"
            >
              <div className="space-y-6 lg:pt-1">
                <p className="font-sans text-base font-medium leading-relaxed text-foreground sm:text-base">
                  {content.lead}
                </p>
                {content.intro.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="font-sans text-base leading-[1.75] text-foreground/85 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <PillarAccordion items={content.pillars} />
            </div>
          </Container>
        </section>

        <ServiceSpotlight
          content={{
            title: content.spotlight.eyebrow,
            description: content.spotlight.description,
            image: content.spotlight.image,
            imageAlt: content.spotlight.imageAlt,
          }}
        />

        <ServiceCtaBanner content={content.inlineCta} />

        <ServiceProcess content={content.process} />

        <ServiceHelpPicker content={content.help} />

        <section className="bg-background py-12 sm:py-16 lg:py-20">
          <Container className="px-5 sm:px-8 lg:px-10">
            <h2
              data-web="reveal"
              className="mb-10 font-sans text-[clamp(28px,4vw,40px)] font-bold text-foreground"
            >
              {content.projects.title}
            </h2>
            <div
              data-web="reveal"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-8"
            >
              {content.projects.items.map((project) => (
                <a key={project.title} href={project.href} className="group block">
                  <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-2xl first:aspect-video lg:first:aspect-4/3">
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 50vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="font-sans text-lg font-bold text-foreground sm:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-sans text-sm text-muted">
                    {project.category}
                  </p>
                  <p className="mt-2 line-clamp-3 font-sans text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                </a>
              ))}
            </div>
          </Container>
        </section>
      </div>

      <RelatedServices services={related} />
      <CtaSection />
    </>
  );
}
