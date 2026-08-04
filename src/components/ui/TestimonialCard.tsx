import Image from "next/image";
import type { TestimonialProfile, TestimonialQuote } from "@/types";
import { cn } from "@/lib/utils";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className={cn("h-3.5 w-3.5", className)}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  const common = "h-3.5 w-3.5 fill-white";

  switch (label) {
    case "Instagram":
      return (
        <svg viewBox="0 0 448 512" className={common} aria-hidden>
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg viewBox="0 0 512 512" className={common} aria-hidden>
          <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
        </svg>
      );
    case "X":
      return (
        <svg viewBox="0 0 512 512" className={common} aria-hidden>
          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 576 512" className={common} aria-hidden>
          <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
        </svg>
      );
    default:
      return null;
  }
}

export function StarRating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-0.5 text-accent-soft", className)}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: rating }).map((_, index) => (
        <StarIcon key={index} />
      ))}
    </div>
  );
}

type ProfileCardProps = {
  profile: TestimonialProfile;
  className?: string;
};

export function TestimonialProfileCard({
  profile,
  className,
}: ProfileCardProps) {
  return (
    <article
      className={cn(
        "flex items-center gap-3 rounded-2xl surface-card p-3.5 sm:gap-4 sm:p-4",
        className,
      )}
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-16">
        <Image
          src={profile.avatar}
          alt={profile.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-sans text-sm font-semibold text-foreground sm:text-[15px]">
          {profile.name}
        </h3>
        <p className="truncate font-sans text-xs text-muted sm:text-sm">
          {profile.role}
        </p>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-1.5">
        {profile.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-alt text-white transition-colors duration-200 hover:bg-accent-soft sm:h-9 sm:w-9"
          >
            <SocialIcon label={social.label} />
          </a>
        ))}
      </div>
    </article>
  );
}

type QuoteCardProps = {
  quote: TestimonialQuote;
  className?: string;
};

export function TestimonialQuoteCard({ quote, className }: QuoteCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl surface-card p-5 sm:p-6 lg:p-7",
        className,
      )}
    >
      <div className="mb-8 flex items-start justify-between gap-4 sm:mb-10">
        <StarRating rating={quote.rating} />
        <p className="text-right font-sans text-xs text-muted sm:text-sm">
          {quote.company}
        </p>
      </div>

      <p className="mt-auto font-sans text-[15px] leading-relaxed text-foreground sm:text-base lg:text-[17px] lg:leading-[1.65]">
        {quote.text}
      </p>
    </article>
  );
}

/** @deprecated Prefer TestimonialProfileCard / TestimonialQuoteCard */
export default function TestimonialCard({
  item,
}: {
  item: { quote: string; rating: number; author: { name: string; role: string; avatar: string } };
}) {
  return (
    <TestimonialQuoteCard
      quote={{
        company: item.author.role,
        rating: item.rating,
        text: item.quote,
      }}
    />
  );
}
