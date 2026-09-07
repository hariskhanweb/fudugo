import type { Metadata } from "next";
import { ContactSection, FindUsSection, PageHeroSection } from "@/sections";

export const metadata: Metadata = {
  title: "Contact Us - FuduGo",
  description:
    "Get in touch with FuduGo. Let’s bring your project to life with the right technology, creative thinking, and digital expertise.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeroSection
        content={{
          title: "Contact",
          image: "/Image-32.jpg",
          imageAlt: "Contact FuduGo",
          imagePosition: "center",
        }}
      />
      <ContactSection />
      <FindUsSection />
    </>
  );
}
