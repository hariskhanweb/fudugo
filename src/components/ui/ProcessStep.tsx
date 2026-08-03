import type { ProcessStep as ProcessStepType } from "@/types";
import GlassCard from "@/components/ui/GlassCard";

type ProcessStepProps = {
  step: ProcessStepType;
};

export default function ProcessStep({ step }: ProcessStepProps) {
  return (
    <GlassCard className="space-y-4 p-8">
      <span className="font-mono text-xs uppercase tracking-wider text-[#00d084]">
        Step {step.step}
      </span>
      <h3 className="text-xl font-bold text-white">{step.title}</h3>
      <p className="text-xs leading-relaxed text-gray-400">{step.description}</p>
    </GlassCard>
  );
}
