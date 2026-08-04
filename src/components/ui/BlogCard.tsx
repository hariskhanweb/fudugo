import Image from "next/image";
import type { BlogPost } from "@/types";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: BlogPost;
  className?: string;
};

function CategoryPill({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-accent px-3 py-1 font-sans text-[11px] font-medium text-accent-soft">
      {label}
    </span>
  );
}

export default function BlogCard({ post, className }: BlogCardProps) {
  if (post.featured) {
    return (
      <a
        href={post.href}
        data-blog="card"
        className={cn(
          "group relative flex min-h-115 flex-col overflow-hidden rounded-2xl bg-surface sm:min-h-120",
          className,
        )}
      >
        <div
          data-blog="featured-media"
          className="absolute inset-[-8%] will-change-transform"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/45 to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
          <div className="flex justify-end">
            <CategoryPill label={post.category} />
          </div>

          <div className="max-w-md space-y-2">
            <time className="block font-sans text-xs text-white/70 sm:text-sm">
              {post.date}
            </time>
            <h3 className="font-sans text-xl font-bold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-accent-soft sm:text-2xl">
              {post.title}
            </h3>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={post.href}
      data-blog="card"
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl surface-card p-1.5 transition-colors duration-300 hover:bg-surface-hover",
        className,
      )}
    >
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        </div>
        <div className="absolute right-3 top-3">
          <CategoryPill label={post.category} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-4 pt-1 sm:px-4 sm:pb-5">
        <time className="mb-2 block font-sans text-xs text-muted">
          {post.date}
        </time>
        <h3 className="mb-3 font-sans text-[15px] font-bold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent-soft sm:text-base">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="mt-auto font-sans text-sm leading-relaxed text-muted">
            {post.excerpt}
          </p>
        ) : null}
      </div>
    </a>
  );
}
