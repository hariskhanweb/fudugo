import type { Testimonial } from "@/types";
import GlassCard from "@/components/ui/GlassCard";

type TestimonialCardProps = {
  item: Testimonial;
};

export default function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <GlassCard className="flex flex-col justify-between space-y-6 p-8" hover={false}>
      <div className="space-y-4">
        <div className="flex gap-1 text-[#00d084]" aria-label={`${item.rating} out of 5 stars`}>
          {"★".repeat(item.rating)}
        </div>
        <p className="text-sm italic leading-relaxed text-gray-300">
          “{item.quote}”
        </p>
      </div>
      <div className="flex items-center gap-4 border-t border-white/10 pt-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.author.avatar}
          alt={item.author.name}
          className="h-12 w-12 rounded-full border border-white/10 object-cover"
        />
        <div>
          <h4 className="text-sm font-bold text-white">{item.author.name}</h4>
          <p className="text-xs text-gray-400">{item.author.role}</p>
        </div>
      </div>
    </GlassCard>
  );
}
