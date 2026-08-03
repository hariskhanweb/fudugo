"use client";

import Image from "next/image";
import type { Project } from "@/types";
import { cn, youtubeEmbedUrl } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

function LinkIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function YouTubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
    </svg>
  );
}

function MetaBar({
  title,
  year,
  href = "#",
}: {
  title: string;
  year: string;
  href?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#1a1a1a] px-5 py-4 sm:px-6 sm:py-6">
      <a
        href={href}
        className="truncate font-sans text-[15px] font-medium text-white transition-colors hover:text-accent-alt sm:text-[18px]"
      >
        {title}
      </a>
      <span className="shrink-0 font-sans text-sm text-muted">{year}</span>
    </div>
  );
}

function MediaSurface({ project }: { project: Project }) {
  const { media, badge, href = "#", title } = project;
  const youtubeUrl =
    media.type === "video"
      ? `https://www.youtube.com/watch?v=${media.videoId}`
      : undefined;

  return (
    <div className="group/media relative aspect-4/3 overflow-hidden rounded-2xl bg-black sm:rounded-3xl">
      {media.type === "image" ? (
        <Image
          src={media.src}
          alt={media.alt ?? title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover/media:scale-105"
        />
      ) : null}

      {media.type === "video" ? (
        <iframe
          src={youtubeEmbedUrl(media.videoId)}
          title={title}
          className="pointer-events-none absolute inset-0 h-full w-full scale-105 border-0"
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      ) : null}

      {media.type === "file" ? (
        <video
          src={media.src}
          poster={media.poster}
          muted
          loop
          playsInline
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/20" />

      {badge ? (
        <div className="absolute left-3 top-3 z-10 flex max-w-[85%] items-center gap-2.5 rounded-xl bg-black/55 px-2.5 py-2 backdrop-blur-sm sm:left-4 sm:top-4">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-surface">
            {badge.avatar ? (
              <Image
                src={badge.avatar}
                alt={badge.author}
                fill
                sizes="36px"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-xs font-semibold text-white">
                {badge.author.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 pr-1">
            <p className="truncate text-xs font-semibold text-white sm:text-[13px]">
              {badge.number} {badge.label}
            </p>
            <p className="truncate text-[11px] text-white/60">{badge.author}</p>
          </div>
        </div>
      ) : null}

      <div className="absolute bottom-3 left-3 z-10 sm:bottom-4 sm:left-4">
        <a
          href={href}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white"
          aria-label={`Open ${title}`}
        >
          <LinkIcon className="h-5 w-5" />
        </a>
      </div>

      {youtubeUrl ? (
        <div className="absolute bottom-3 right-3 z-10 sm:bottom-4 sm:right-4">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white"
            aria-label={`Watch ${title} on YouTube`}
          >
            <YouTubeIcon className="h-5 w-5" />
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const meta = (
    <MetaBar title={project.title} year={project.year} href={project.href} />
  );

  return (
    <article className={cn("flex flex-col gap-3 sm:gap-4", className)}>
      {project.metaPosition === "top" ? meta : null}
      <MediaSurface project={project} />
      {project.metaPosition === "bottom" ? meta : null}
    </article>
  );
}
