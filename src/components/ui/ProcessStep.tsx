import type { ProcessStep as ProcessStepType } from "@/types";

type ProcessStepProps = {
  step: ProcessStepType;
};

export default function ProcessStep({ step }: ProcessStepProps) {
  return (
    <article className="group flex h-full min-h-72 flex-col rounded-2xl surface-card p-5 transition-colors duration-300 hover:bg-surface-hover sm:min-h-80 sm:p-6 lg:p-7">
      <div
        data-process="part"
        className="mb-10 flex items-start justify-between gap-3 sm:mb-12 lg:mb-14"
      >
        <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-muted sm:text-xs">
          Step
        </span>
        <span className="font-sans text-sm font-medium text-accent-alt sm:text-[15px]">
          {step.step}
        </span>
      </div>

      <div className="mb-auto flex flex-1 flex-col justify-center">
        <h3
          data-process="part"
          className="font-sans text-[clamp(26px,2.8vw,34px)] font-bold leading-[1.06] tracking-tight text-foreground"
        >
          {step.title}
        </h3>
      </div>

      <p
        data-process="part"
        className="mt-3 font-sans text-sm leading-relaxed text-muted"
      >
        {step.description}
      </p>
    </article>
  );
}
