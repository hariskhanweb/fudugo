import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Automation Solutions - FuduGo",
  description:
    "We engineer custom autonomous AI agents, enterprise workflow automations, conversational voice systems, and predictive intelligence models that eliminate operational friction and scale your business.",
};

export default function AiAutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
