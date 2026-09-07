import type { Metadata } from "next";
import site from "@/data/site.json";
import hero from "@/data/hero.json";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { SERVICES, getServiceBySlug } from "@/lib/service-pages";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fudugo.com"
).replace(/\/$/, "");

export const DEFAULT_OG_IMAGE = "/Image-32.jpg";

export const SITE_NAME = site.brand ?? "FuduGo";

export const DEFAULT_TITLE =
  "FuduGo | AI-First Digital Solutions That Grow Businesses";

export const DEFAULT_DESCRIPTION = hero.description;

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image || DEFAULT_OG_IMAGE);
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function servicePageMetadata(slug: string): Metadata {
  const service = getServiceBySlug(slug);
  const title = service?.shortTitle || service?.title || "Service";
  const description =
    service?.description ??
    `${title} from FuduGo — web, apps, AI, and digital growth.`;

  return pageMetadata({
    title,
    description,
    path: `/services/${slug}`,
    image: service?.heroImage,
  });
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(site.logo),
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
    },
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function serviceJsonLd(slug: string) {
  const service = getServiceBySlug(slug);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    image: absoluteUrl(service.heroImage),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "Worldwide",
    serviceType: service.shortTitle || service.title,
  };
}

export function blogPostingJsonLd(slug: string) {
  const post = getBlogPostBySlug(slug);
  if (!post) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? post.title,
    image: absoluteUrl(post.image),
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(site.logo),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function sitemapEntries() {
  const staticPaths = [
    "/",
    "/about",
    "/contact",
    "/blog",
    "/services",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.8,
    })),
    ...SERVICES.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllBlogPosts().map((post) => {
      const parsed = new Date(post.date);
      return {
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: Number.isNaN(parsed.getTime()) ? new Date() : parsed,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      };
    }),
  ];
}
