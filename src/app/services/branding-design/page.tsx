import DedicatedServicePage, {
  servicePageMetadata,
} from "@/sections/services/DedicatedServicePage";

const SLUG = "branding-design";

export const metadata = servicePageMetadata(SLUG);

export default function BrandingDesignPage() {
  return <DedicatedServicePage slug={SLUG} />;
}
