"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type PillarAccordionItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  items?: string[];
};

type PillarAccordionProps = {
  items: PillarAccordionItem[];
  /** Open item on mount. Pass `null` (default) for all collapsed. */
  defaultOpenId?: string | null;
  className?: string;
};

export function CornerArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="11"
      height="20"
      viewBox="0 0 11 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M-3.90187e-05 15.7711V5.82933e-05H1.49096V14.2801H6.53096C5.87996 13.5451 5.18696 12.4111 4.51496 10.9411H5.71196C7.18196 12.6421 8.73596 13.9231 10.332 14.7211V15.3301C8.73596 16.1281 7.18196 17.3881 5.71196 19.1101H4.51496C5.18696 17.6401 5.87996 16.5061 6.53096 15.7711H-3.90187e-05Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function PillarAccordion({
  items,
  defaultOpenId = null,
  className,
}: PillarAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="border-b border-white/15">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center gap-3.5 py-5 text-left sm:gap-4 sm:py-6"
              aria-expanded={isOpen}
            >
              <CornerArrow className="h-5 w-2.75 shrink-0 text-accent-alt" />
              <span
                className={cn(
                  "min-w-0 flex-1 font-sans text-[18px] transition-colors sm:text-[22px]",
                  isOpen ? "text-accent-alt" : "text-foreground",
                )}
              >
                {item.title}
              </span>
              <span
                className={cn(
                  "shrink-0 text-foreground transition-transform duration-300",
                  isOpen && "rotate-45",
                )}
                aria-hidden
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path d="M7.49609 0V15" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M15 7.495L0 7.49499"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </button>

            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-6 pb-6 pl-8 sm:pl-9">
                  {item.subtitle ? (
                    <p className="font-sans text-sm sm:text-lg font-semibold text-white">
                      {item.subtitle}
                    </p>
                  ) : null}
                  {item.description ? (
                    <p className="font-sans text-base leading-relaxed text-white">
                      {item.description}
                    </p>
                  ) : null}
                  {item.items && item.items.length > 0 ? (
                    <ul className="columns-1 gap-x-8 sm:columns-2">
                      {item.items.map((entry) => (
                        <li
                          key={entry}
                          className="mb-2 break-inside-avoid font-sans text-base text-foreground/80"
                        >
                          <span className="mr-2 text-accent-alt">–</span>
                          {entry}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
