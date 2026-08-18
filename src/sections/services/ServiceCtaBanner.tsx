import { Container, PillButton } from "@/components/ui";
import { cn } from "@/lib/utils";

export type ServiceCtaBannerContent = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  eyebrow?: string;
};

type ServiceCtaBannerProps = {
  content: ServiceCtaBannerContent;
  className?: string;
  revealAttr?: string;
  /** Pill button size — defaults to `lg` */
  ctaSize?: "normal" | "lg" | "xl";
  /** Show trailing icon on the CTA — defaults to `true` */
  ctaIcon?: React.ReactNode | boolean;
};

export default function ServiceCtaBanner({
  content,
  className,
  revealAttr = "reveal",
  ctaSize = "lg",
  ctaIcon = true,
}: ServiceCtaBannerProps) {
  const { title, description, ctaLabel, ctaHref, eyebrow } = content;

  return (
    <section
      className={cn("bg-background pb-12 sm:pb-16 lg:pb-20", className)}
    >
      <Container className="px-5 sm:px-8 lg:px-10">
        <div
          data-web={revealAttr}
          className="relative overflow-hidden rounded-3xl border border-border/50 bg-surface/50 px-7 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent-alt/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
            aria-hidden
          />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              {eyebrow ? (
                <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-alt">
                  {eyebrow}
                </p>
              ) : null}
              <h2 className="font-sans text-[clamp(1.5rem,calc(2vw+1rem),2.5rem)] font-bold leading-tight tracking-tight text-foreground">
                {title}
              </h2>
              <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                {description}
              </p>
            </div>

            <PillButton
              href={ctaHref}
              icon={ctaIcon}
              size={ctaSize}
              className="self-start lg:self-end"
            >
              {ctaLabel}
            </PillButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
