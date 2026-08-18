import data from "@/data/blog.json";
import type { BlogPost } from "@/types";

const posts = (data.posts as BlogPost[]).map((post) => ({
  ...post,
  href: `/blog/${post.slug}`,
}));

export function getAllBlogPosts() {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getRecentBlogPosts(limit = 3) {
  return getAllBlogPosts().slice(0, limit);
}

export function getBlogPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getBlogStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}
