import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ProjectCard } from "@/components/ui";
import {
  WorkHeroMotion,
  WorkMetaMotion,
  WorkStorySection,
} from "@/components/work/WorkDetailMotion";
import WorkScreenshotGallery from "@/components/work/WorkScreenshotGallery";
import { CtaSection } from "@/sections";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, pageMetadata, SITE_NAME } from "@/lib/seo";
import { youtubeEmbedUrl } from "@/lib/utils";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectCover,
  getRelatedProjects,
  getWorkStaticParams,
} from "@/lib/works";
import type { Project, ProjectStoryBlock } from "@/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWorkStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return pageMetadata({
      title: "Project not found",
      description: "This project could not be found.",
      path: `/portfolio/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: project.title,
    description: project.summary ?? project.title,
    path: `/portfolio/${project.slug}`,
    image: getProjectCover(project),
  });
}

function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary ?? project.title,
    dateCreated: project.year,
    image: absoluteUrl(getProjectCover(project)),
    url: absoluteUrl(`/portfolio/${project.slug}`),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

function hostLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 12 12 4M6 4h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const { media, title } = project;

  if (media.type === "video") {
    return (
      <iframe
        src={youtubeEmbedUrl(media.videoId, {
          autoplay: false,
          mute: false,
          controls: true,
        })}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        allow="encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }

  if (media.type === "file") {
    return (
      <video
        src={media.src}
        poster={media.poster}
        controls
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt ?? title}
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  );
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const related = getRelatedProjects(project.slug, 2);
  const allCount = getAllProjects().length;
  const cover = getProjectCover(project);
  const story = [
    project.pain
      ? { key: "pain" as const, index: "01", label: "Pain", block: project.pain }
      : null,
    project.solution
      ? {
          key: "solution" as const,
          index: "02",
          label: "Solution",
          block: project.solution,
        }
      : null,
    project.promise
      ? {
          key: "promise" as const,
          index: "03",
          label: "Promise",
          block: project.promise,
        }
      : null,
  ].filter(Boolean) as Array<{
    key: "pain" | "solution" | "promise";
    index: string;
    label: string;
    block: ProjectStoryBlock;
  }>;

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />

      <section className="relative isolate overflow-hidden bg-black pt-24 sm:pt-28 lg:pt-32">
        <div className="absolute inset-0">
          <Image
            src={cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/70 to-background" />
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "4rem 4rem",
              maskImage:
                "radial-gradient(ellipse 70% 55% at 50% 30%, #000 40%, transparent 100%)",
            }}
            aria-hidden
          />
        </div>

        <Container className="relative px-5 pb-14 sm:px-8 sm:pb-16 lg:px-10 lg:pb-20">
          <WorkHeroMotion>
            <div
              data-hero-anim
              className="flex flex-wrap items-center justify-between gap-4"
            >
              <Link
                href="/portfolio"
                className="inline-flex cursor-pointer items-center gap-2 font-sans text-sm text-white/65 transition-colors outline-hidden hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span aria-hidden>←</span>
                Back to portfolio
              </Link>

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-sans text-sm font-semibold text-white backdrop-blur-xs transition-colors outline-hidden hover:border-white/35 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  Visit live site
                  <ExternalArrow className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>

            <div data-hero-anim className="mt-10 max-w-4xl lg:mt-14">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {project.category || project.badge?.label ? (
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-alt">
                    {project.category ?? project.badge?.label}
                  </span>
                ) : null}
                <span className="text-white/30" aria-hidden>
                  /
                </span>
                <span className="font-sans text-sm text-white/60">
                  {project.year}
                </span>
                {project.client ? (
                  <>
                    <span className="text-white/30" aria-hidden>
                      /
                    </span>
                    <span className="font-sans text-sm text-white/60">
                      {project.client}
                    </span>
                  </>
                ) : null}
              </div>

              <h1 className="mt-5 font-sans text-[clamp(40px,8vw,84px)] font-bold leading-[0.94] tracking-tight text-white">
                {project.title}
              </h1>

              {project.summary ? (
                <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
                  {project.summary}
                </p>
              ) : null}
            </div>

            <div
              data-hero-anim
              className="relative mt-12 aspect-video overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/50 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] sm:mt-14 lg:rounded-4xl"
            >
              <ProjectMedia project={project} />
            </div>
          </WorkHeroMotion>
        </Container>
      </section>

      <WorkMetaMotion>
        <Container className="px-5 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {project.client ? (
              <div data-meta="cell">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Client
                </p>
                <p className="mt-2 font-sans text-base font-semibold text-foreground">
                  {project.client}
                </p>
              </div>
            ) : null}
            {project.industry ? (
              <div data-meta="cell">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Industry
                </p>
                <p className="mt-2 font-sans text-base font-semibold text-foreground">
                  {project.industry}
                </p>
              </div>
            ) : null}
            {project.role ? (
              <div data-meta="cell" className="sm:col-span-2 lg:col-span-1">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Role
                </p>
                <p className="mt-2 font-sans text-base font-semibold text-foreground">
                  {project.role}
                </p>
              </div>
            ) : null}
            <div data-meta="cell">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Year
              </p>
              <p className="mt-2 font-sans text-base font-semibold text-foreground">
                {project.year}
              </p>
            </div>
            {project.liveUrl ? (
              <div data-meta="cell">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Live website
                </p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex cursor-pointer items-center gap-1.5 font-sans text-base font-semibold text-accent-alt transition-colors outline-hidden hover:text-accent-soft focus-visible:ring-2 focus-visible:ring-accent-alt/70"
                >
                  {hostLabel(project.liveUrl)}
                  <ExternalArrow className="h-3.5 w-3.5" />
                </a>
              </div>
            ) : null}
          </div>

          {project.services?.length ? (
            <div
              data-meta="cell"
              className="mt-8 flex flex-wrap gap-2 border-t border-border/60 pt-6"
            >
              {project.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-border/70 bg-surface/40 px-3.5 py-1.5 font-sans text-xs font-medium text-foreground/85"
                >
                  {service}
                </span>
              ))}
            </div>
          ) : null}
        </Container>
      </WorkMetaMotion>

      <WorkStorySection items={story} />

      {project.screenshots?.length ? (
        <WorkScreenshotGallery
          screenshots={project.screenshots}
          liveUrl={project.liveUrl}
        />
      ) : null}

      {(project.content?.intro ||
        project.content?.sections?.length ||
        project.outcomes?.length) && (
        <section className="bg-background py-16 sm:py-20 lg:py-24">
          <Container className="px-5 sm:px-8 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-16">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-alt">
                  Case notes
                </p>
                {project.outcomes?.length ? (
                  <ul className="mt-6 flex flex-col gap-4">
                    {project.outcomes.map((outcome, index) => (
                      <li
                        key={outcome}
                        className="border-l-2 border-accent-alt/50 pl-4"
                      >
                        <span className="font-mono text-[11px] text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-1 font-sans text-sm leading-relaxed text-foreground sm:text-[15px]">
                          {outcome}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </aside>

              <div className="flex flex-col gap-10">
                {project.content?.intro ? (
                  <p className="font-sans text-lg leading-[1.75] text-foreground/90 sm:text-xl">
                    {project.content.intro}
                  </p>
                ) : null}

                {project.content?.sections.map((section) => (
                  <section key={section.heading} className="flex flex-col gap-4">
                    <h2 className="font-sans text-[clamp(24px,3vw,34px)] font-bold leading-tight text-foreground">
                      {section.heading}
                    </h2>
                    <div className="flex flex-col gap-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="font-sans text-sm leading-[1.85] text-muted sm:text-[15px]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {related.length ? (
        <section className="border-t border-border/60 bg-header py-16 sm:py-20">
          <Container className="px-5 sm:px-8 lg:px-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="font-sans text-sm text-accent-soft">(More work)</p>
                <h2 className="mt-2 font-sans text-2xl font-bold text-foreground sm:text-3xl">
                  Related projects
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="hidden cursor-pointer font-sans text-sm font-medium text-accent-alt transition-opacity outline-hidden hover:opacity-80 focus-visible:ring-2 focus-visible:ring-accent-alt/70 sm:inline"
              >
                View all {allCount}
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaSection />
    </>
  );
}
