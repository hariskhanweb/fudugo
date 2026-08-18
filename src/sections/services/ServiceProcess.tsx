import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

export type ServiceProcessStep = {
  step: string;
  title: string;
  description: string;
  items: string[];
};

export type ServiceProcessContent = {
  eyebrow: string;
  title: string;
  steps: ServiceProcessStep[];
};

type ServiceProcessProps = {
  content: ServiceProcessContent;
  className?: string;
  revealAttr?: string;
};

export default function ServiceProcess({
  content,
  className,
  revealAttr = "reveal",
}: ServiceProcessProps) {
  const { eyebrow, title, steps } = content;

  return (
    <section
      className={cn("bg-background py-12 sm:py-16 lg:py-20", className)}
    >
      <Container className="px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
          <header
            data-web={revealAttr}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-alt">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-sans text-[clamp(1.75rem,calc(2.2vw+1rem),2.75rem)] font-bold leading-tight tracking-tight text-foreground">
              {title}
            </h2>
            <p className="mt-5 font-sans text-sm text-muted">
              {String(steps.length).padStart(2, "0")} steps
            </p>
          </header>

          <ol className="relative">
            <span
              className="pointer-events-none absolute top-3 bottom-3 left-2.75 w-px bg-border/70 sm:left-3.75"
              aria-hidden
            />

            {steps.map((step, index) => (
              <li
                key={step.step}
                data-web={revealAttr}
                className={cn(
                  "relative flex gap-5 pb-12 sm:gap-7 sm:pb-14",
                  index === steps.length - 1 && "pb-0 sm:pb-0",
                )}
              >
                <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center sm:mt-0.5 sm:h-8 sm:w-8">
                  <span className="absolute inset-0 rounded-full border border-accent-alt/35 bg-background" />
                  <span className="relative h-2 w-2 rounded-full bg-accent-alt sm:h-2.5 sm:w-2.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-sans text-sm font-semibold tabular-nums text-accent-alt">
                      {step.step}
                    </span>
                    <h3 className="font-sans text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-[1.75rem]">
                      {step.title}
                    </h3>
                  </div>

                  <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-muted sm:text-[15px]">
                    {step.description}
                  </p>

                  {step.items.length > 0 ? (
                    <ul className="mt-6 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {step.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 font-sans text-sm text-foreground/85"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-alt"
                            aria-hidden
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
