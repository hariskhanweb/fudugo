import type { BlogPost } from "@/types";
import GlassCard from "@/components/ui/GlassCard";

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <GlassCard className="group">
      <a href={post.href} className="block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="space-y-3 p-6">
          <span className="font-mono text-xs text-[#00d084]">
            {post.category} • {post.date}
          </span>
          <h3 className="text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#00d084]">
            {post.title}
          </h3>
        </div>
      </a>
    </GlassCard>
  );
}
