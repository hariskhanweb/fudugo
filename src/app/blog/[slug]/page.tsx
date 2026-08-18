import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard, Container } from "@/components/ui";
import { CtaSection } from "@/sections";
import { getAllBlogPosts, getBlogPostBySlug, getBlogStaticParams } from "@/lib/blog";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post - FuduGo" };
  }

  return {
    title: `${post.title} - FuduGo`,
    description: post.excerpt ?? post.title,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const related = getAllBlogPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <article className="bg-background pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <Container className="px-5 sm:px-8 lg:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-sans text-sm text-muted transition-colors hover:text-accent-alt"
          >
            <span aria-hidden>←</span>
            Back to blog
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-accent px-3 py-1 font-sans text-[11px] font-medium text-accent-soft">
                {post.category}
              </span>
              <time className="font-sans text-sm text-muted">{post.date}</time>
            </div>

            <h1 className="mt-5 font-sans text-[clamp(40px,7vw,78px)] font-bold leading-[0.98] tracking-tight text-foreground">
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="mt-6 max-w-3xl font-sans text-lg leading-relaxed text-muted sm:text-xl">
                {post.excerpt}
              </p>
            ) : null}
          </div>

          <div className="relative mt-12 overflow-hidden rounded-3xl border border-border/50 bg-surface/30 lg:mt-14">
            <div className="relative aspect-[16/9]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.28fr)_minmax(0,0.72fr)] lg:gap-16">
            <div className="lg:pt-1">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-alt">
                Article
              </p>
              <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-muted">
                Notes from the FuduGo team on product direction, digital
                execution, and what helps ideas turn into measurable growth.
              </p>
            </div>

            <div className="space-y-10">
              {post.content?.intro ? (
                <p className="font-sans text-base leading-[1.8] text-foreground/90 sm:text-lg">
                  {post.content.intro}
                </p>
              ) : null}

              {post.content?.sections.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="font-sans text-[clamp(24px,3vw,34px)] font-bold leading-tight text-foreground">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
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
      </article>

      {related.length ? (
        <section className="border-t border-border/60 bg-background py-16 sm:py-20">
          <Container className="px-5 sm:px-8 lg:px-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="font-sans text-sm text-accent-soft">(More reading)</p>
                <h2 className="mt-2 font-sans text-2xl font-bold text-foreground sm:text-3xl">
                  Related posts
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden font-sans text-sm font-medium text-accent-alt transition-opacity hover:opacity-80 sm:inline"
              >
                View all
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
              {related.map((item, index) => (
                <BlogCard
                  key={item.slug}
                  post={{ ...item, featured: index === 0 }}
                  className={index === 0 ? "lg:col-span-2" : ""}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaSection />
    </>
  );
}
