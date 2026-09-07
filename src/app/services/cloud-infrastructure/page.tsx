import DedicatedServicePage, {
  servicePageMetadata,
} from "@/sections/services/DedicatedServicePage";

const SLUG = "cloud-infrastructure";

export const metadata = servicePageMetadata(SLUG);

export default function CloudInfrastructurePage() {
  return <DedicatedServicePage slug={SLUG} />;
}
