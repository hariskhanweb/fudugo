import data from "@/data/testimonials.json";
import { Container, SectionHeading, TestimonialCard } from "@/components/ui";

export default function TestimonialsSection() {
  return (
    <section className="border-b border-white/10 py-24">
      <Container>
        <SectionHeading eyebrow={data.eyebrow} title={data.title} />
        <div className="grid gap-8 lg:grid-cols-3">
          {data.items.map((item) => (
            <TestimonialCard key={item.author.name} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
