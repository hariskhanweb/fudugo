import data from "@/data/cta.json";
import { Button, Container } from "@/components/ui";

export default function CtaSection() {
  return (
    <section
      id={data.id}
      className="border-b border-white/10 bg-linear-to-b from-[#0d0d0e] via-[#121216] to-[#0d0d0e] py-24"
    >
      <Container className="space-y-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#00d084]">
          {data.eyebrow}
        </span>
        <h2 className="mx-auto max-w-3xl font-serif text-4xl font-bold leading-tight text-white sm:text-6xl">
          {data.title}
        </h2>
        <div>
          <Button
            href={data.cta.href}
            className="px-10 py-5 shadow-2xl shadow-[#00d084]/30 hover:-translate-y-1"
          >
            {data.cta.label}
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 pt-6 text-xs text-gray-400">
          {data.perks.map((perk) => (
            <span key={perk} className="flex items-center gap-2">
              ✓ {perk}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
