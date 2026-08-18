"use client";

import type { ServicePageContent } from "@/types";
import EditorialLayout from "./EditorialLayout";
import DeviceLayout from "./DeviceLayout";
import BentoLayout from "./BentoLayout";
import StackLayout from "./StackLayout";
import GalleryLayout from "./GalleryLayout";
import FunnelLayout from "./FunnelLayout";

export default function ServiceLayoutSwitcher({
  service,
}: {
  service: ServicePageContent;
}) {
  switch (service.layout) {
    case "device":
      return <DeviceLayout service={service} />;
    case "bento":
      return <BentoLayout service={service} />;
    case "stack":
      return <StackLayout service={service} />;
    case "gallery":
      return <GalleryLayout service={service} />;
    case "funnel":
      return <FunnelLayout service={service} />;
    case "editorial":
    case "web-solutions":
    default:
      return <EditorialLayout service={service} />;
  }
}
