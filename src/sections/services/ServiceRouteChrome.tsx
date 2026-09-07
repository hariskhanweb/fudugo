import JsonLd from "@/components/seo/JsonLd";
import { serviceJsonLd } from "@/lib/seo";

export default function ServiceRouteChrome({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={serviceJsonLd(slug)} />
      {children}
    </>
  );
}
