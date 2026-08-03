import data from "@/data/process.json";
import { Container, ProcessStep, SectionHeading } from "@/components/ui";

export default function ProcessSection() {
  return (
    <section id={data.id} className="border-b border-white/10 py-24">
      <Container>
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <SectionHeading
            eyebrow={data.eyebrow}
            title={data.title}
            className="mb-0"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.icon}
            alt=""
            className="h-16 w-16 object-contain opacity-80"
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {data.steps.map((step) => (
            <ProcessStep key={step.step} step={step} />
          ))}
        </div>
      </Container>
    </section>
  );
}
