import ServiceStandardPage from "@/sections/services/ServiceStandardPage";
import content from "@/data/cloud-infrastructure-page.json";

export default function CloudInfrastructurePage() {
  return (
    <ServiceStandardPage slug="cloud-infrastructure" content={content} />
  );
}
