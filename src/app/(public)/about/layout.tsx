import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Discover the mission, vision, and community behind the ${siteConfig.fullName} (${siteConfig.name}) at ${siteConfig.school}.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${siteConfig.name} — ${siteConfig.fullName}`,
    description: `Bridging the gap between classroom theory and production engineering at ${siteConfig.school}.`,
    url: "/about",
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${siteConfig.name} — ${siteConfig.fullName}`,
    description: `Discover the mission, vision, and milestones of the ${siteConfig.fullName} at ${siteConfig.school}.`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
