import type { Metadata } from "next";
import { ContactSection, FindUsSection, PageHeroSection } from "@/sections";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";
import contactData from "@/data/contact.json";
import site from "@/data/site.json";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Please feel free to contact FuduGo any time — we will get back to you as soon as possible. Reach our India and US offices, or send a message online.",
  path: "/contact",
  image: "/Image-32.jpg",
});

export default function ContactPage() {
  const phoneCard = contactData.findUs.cards.find((card) => card.type === "phone");
  const phones =
    phoneCard && "phones" in phoneCard && phoneCard.phones
      ? phoneCard.phones.map((p) => p.number)
      : [site.phone];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact ${SITE_NAME}`,
          url: `${SITE_URL}/contact`,
          description: contactData.description,
          mainEntity: {
            "@type": "Organization",
            name: SITE_NAME,
            email: site.email,
            telephone: phones,
            address: [
              {
                "@type": "PostalAddress",
                streetAddress:
                  "Beside Metro Hospital, Chhaoni Square, Koradi Road",
                addressLocality: "Nagpur",
                postalCode: "440013",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
              {
                "@type": "PostalAddress",
                streetAddress: "11451 Katy Freeway #105",
                addressLocality: "Houston",
                addressRegion: "TX",
                postalCode: "77079",
                addressCountry: "US",
              },
            ],
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "10:00",
              closes: "18:30",
            },
          },
        }}
      />
      <PageHeroSection
        content={{
          title: "Contact Us",
          image: "/Image-32.jpg",
          imageAlt: "Contact FuduGo",
          imagePosition: "center",
        }}
      />
      <FindUsSection />
      <ContactSection />
    </>
  );
}
