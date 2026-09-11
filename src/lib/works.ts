import data from "@/data/works.json";
import type { Project } from "@/types";

const projects = (data.projects as Project[]).map((project) => ({
  ...project,
  href: `/work/${project.slug}`,
}));

export function getAllProjects() {
  return [...projects];
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(slug: string, limit = 2) {
  return projects.filter((project) => project.slug !== slug).slice(0, limit);
}

export function getWorkStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function getProjectCover(project: Project) {
  if (project.media.type === "image") return project.media.src;
  if (project.media.type === "video") {
    return (
      project.media.poster ??
      `https://img.youtube.com/vi/${project.media.videoId}/maxresdefault.jpg`
    );
  }
  return project.media.poster ?? project.gallery?.[0]?.src ?? "/Image-32.jpg";
}
