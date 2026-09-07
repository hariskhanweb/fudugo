import DedicatedServicePage, {
  servicePageMetadata,
} from "@/sections/services/DedicatedServicePage";

const SLUG = "business-software";

export const metadata = servicePageMetadata(SLUG);

export default function BusinessSoftwarePage() {
  return <DedicatedServicePage slug={SLUG} />;
}
