import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-roboto-slab",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MOTEX - Motion Graphics & 3D Animation Studio",
  description:
    "Award-winning motion graphics & 3D animation studio. We transform complex ideas into stunning visual stories that captivate audiences and drive results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${inter.variable} ${robotoSlab.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased selection:bg-accent selection:text-black">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
