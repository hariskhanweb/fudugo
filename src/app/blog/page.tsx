import type { Metadata } from "next";
import { BlogCard, Container } from "@/components/ui";
import { CtaSection } from "@/sections";
import data from "@/data/blog.json";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - FuduGo",
  description:
    "Insights on web, apps, product thinking, and digital growth from the FuduGo team.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <section className="bg-background pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <Container className="px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="font-sans text-sm text-accent-soft sm:text-[15px]">
              {data.eyebrow}
            </p>
            <h1 className="mt-4 font-sans text-[clamp(40px,7vw,80px)] font-bold leading-[0.96] tracking-tight text-foreground">
              {data.title}
            </h1>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
              Practical notes on product strategy, modern websites, mobile apps,
              and growth systems that help businesses move faster.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5">
            {featured ? (
              <div className="min-h-full lg:col-span-2">
                <BlogCard post={{ ...featured, featured: true }} className="h-full" />
              </div>
            ) : null}

            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
