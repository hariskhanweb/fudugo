import type { NextConfig } from "next";

const WEB_SOLUTIONS = "/services/web-solutions";
const MOBILE_APPS = "/services/mobile-apps";
const BRANDING_DESIGN = "/services/branding-design";
const DIGITAL_MARKETING = "/services/digital-marketing";

/** Direct 301s for slash and non-slash forms (no redirect chains). */
function permanentPathRedirects(
  mappings: ReadonlyArray<{ source: string; destination: string }>,
) {
  return mappings.flatMap(({ source, destination }) => [
    {
      source,
      destination,
      statusCode: 301 as const,
    },
    {
      source: `${source}/`,
      destination,
      statusCode: 301 as const,
    },
  ]);
}

const webSolutionsLegacyPaths = [
  "/magento-development",
  "/web-and-cms-development",
  "/php-web-development",
  "/cakephp-web-development",
  "/wordpress-web-development",
  "/joomla-web-development",
  "/ubercart-development",
  "/prestashop-development",
  "/cs-cart-development",
  "/virtuemart-development",
  "/bigcommerce-development",
  "/yii-framework-development",
  "/e-commerce-services",
  "/open-source-customization",
  "/website-designing",
] as const;

const webSolutionsRedirects = permanentPathRedirects(
  webSolutionsLegacyPaths.map((source) => ({
    source,
    destination: WEB_SOLUTIONS,
  })),
);

const serviceLegacyRedirects = permanentPathRedirects([
  { source: "/logo-designing", destination: BRANDING_DESIGN },
  { source: "/android-application-development", destination: MOBILE_APPS },
  { source: "/iphone-app-development-company", destination: MOBILE_APPS },
  { source: "/ipad-application-development", destination: MOBILE_APPS },
  { source: "/phonegap-development", destination: MOBILE_APPS },
  { source: "/custom-application-development", destination: MOBILE_APPS },
  { source: "/hire-a-cross-platform-developer", destination: MOBILE_APPS },
  { source: "/hire-an-iphone-app-developer", destination: MOBILE_APPS },
  { source: "/hire-dedicated-developers", destination: WEB_SOLUTIONS },
  { source: "/hire-a-magento-developer", destination: WEB_SOLUTIONS },
  { source: "/hire-an-android-app-developer", destination: MOBILE_APPS },
  { source: "/hire-a-drupal-app-developer", destination: MOBILE_APPS },
  { source: "/hire-a-joomla-developer", destination: WEB_SOLUTIONS },
  { source: "/hire-a-unity-3d-developer", destination: WEB_SOLUTIONS },
  { source: "/hire-an-ipad-app-developer", destination: MOBILE_APPS },
  { source: "/hire-a-php-developer", destination: WEB_SOLUTIONS },
  { source: "/hire-a-wordpress-developer", destination: WEB_SOLUTIONS },
  { source: "/digital-marketing-services", destination: DIGITAL_MARKETING },
  { source: "/corporate-identity", destination: BRANDING_DESIGN },
  { source: "/detailed-business-audit", destination: DIGITAL_MARKETING },
  { source: "/seo-for-local-businesses", destination: DIGITAL_MARKETING },
  { source: "/organic-seo", destination: DIGITAL_MARKETING },
  { source: "/content-marketing", destination: DIGITAL_MARKETING },
  { source: "/off-page-seo", destination: DIGITAL_MARKETING },
  { source: "/email-marketing", destination: DIGITAL_MARKETING },
  { source: "/search-engine-marketing-ppc", destination: DIGITAL_MARKETING },
  { source: "/social-media-marketing", destination: DIGITAL_MARKETING },
  { source: "/opening/junior-web-developer", destination: WEB_SOLUTIONS },
]);

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Let explicit redirects handle trailing-slash legacy URLs in one hop.
  // General trailing-slash stripping is restored in src/proxy.ts.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: "/jobs",
        destination: "/career",
        permanent: true,
      },
      {
        source: "/jobs/:path*",
        destination: "/career",
        permanent: true,
      },
      {
        source: "/work/:slug",
        destination: "/portfolio/:slug",
        statusCode: 301,
      },
      {
        source: "/work/:slug/",
        destination: "/portfolio/:slug",
        statusCode: 301,
      },
      ...webSolutionsRedirects,
      ...serviceLegacyRedirects,
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pawzia.foxcreation.online",
        pathname: "/motex/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;
