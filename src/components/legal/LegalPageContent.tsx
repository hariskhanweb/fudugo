import Link from "next/link";
import { Container } from "@/components/ui";
import { PageHeroSection } from "@/sections";

type LegalSubsection = {
  heading: string;
  paragraphs: string[];
};

type LegalSection = {
  heading: string;
  paragraphs: string[];
  subsections?: LegalSubsection[];
};

type LegalPageContentProps = {
  hero: {
    title: string;
    image: string;
    imageAlt: string;
    imagePosition?: string;
  };
  updated: string;
  intro: string;
  sections: LegalSection[];
};

function linkify(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+|\/privacy-policy|\/terms|\/contact)/g);
  return parts.map((part, index) => {
    if (part.startsWith("http://") || part.startsWith("https://")) {
      return (
        <a
          key={`${part}-${index}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-alt underline-offset-2 transition-colors hover:text-accent-soft hover:underline"
        >
          {part}
        </a>
      );
    }
    if (part.startsWith("/")) {
      return (
        <Link
          key={`${part}-${index}`}
          href={part}
          className="text-accent-alt underline-offset-2 transition-colors hover:text-accent-soft hover:underline"
        >
          {part}
        </Link>
      );
    }
    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

export default function LegalPageContent({
  hero,
  updated,
  intro,
  sections,
}: LegalPageContentProps) {
  return (
    <>
      <PageHeroSection content={hero} />

      <section className="bg-background pb-20 pt-14 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
        <Container className="px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="font-sans text-sm text-muted">Last updated: {updated}</p>
            <p className="mt-6 font-sans text-base leading-relaxed text-foreground/90 sm:text-lg sm:leading-relaxed">
              {linkify(intro)}
            </p>

            <div className="mt-12 space-y-10 sm:mt-14 sm:space-y-12">
              {sections.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="font-sans text-[clamp(22px,3vw,30px)] font-bold tracking-tight text-foreground">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="font-sans text-sm leading-[1.85] text-muted sm:text-[15px]"
                    >
                      {linkify(paragraph)}
                    </p>
                  ))}
                  {section.subsections?.map((sub) => (
                    <div key={sub.heading} className="space-y-3 pt-2">
                      <h3 className="font-sans text-lg font-semibold text-foreground sm:text-xl">
                        {sub.heading}
                      </h3>
                      {sub.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 40)}
                          className="font-sans text-sm leading-[1.85] text-muted sm:text-[15px]"
                        >
                          {linkify(paragraph)}
                        </p>
                      ))}
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
