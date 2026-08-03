import data from "@/data/blog.json";
import { BlogCard, Container, SectionHeading } from "@/components/ui";

export default function BlogSection() {
  return (
    <section id={data.id} className="border-b border-white/10 py-24">
      <Container>
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          action={
            <a
              href={data.cta.href}
              className="text-xs font-semibold uppercase tracking-wider text-[#00d084] hover:underline"
            >
              {data.cta.label}
            </a>
          }
        />
        <div className="grid gap-8 md:grid-cols-3">
          {data.posts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
