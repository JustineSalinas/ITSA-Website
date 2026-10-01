import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/data/site";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { PageLoader } from "@/components/loader/page-loader";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.fullName}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: `${siteConfig.name} Executive Directorate`, url: siteConfig.url }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  keywords: [
    "ITSA",
    "Information Technology Student Association",
    "University of San Agustin",
    "USA Iloilo",
    "ITSA USA",
    "Information Technology",
    "Computer Science",
    "Tech Student Organization",
    "Software Engineering",
    "Iloilo Tech Community",
    "Student Developers",
    "Hackathons Philippines",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    // Browsers fetch these directly, never through next/image, so they need
    // to already be the right size -- unlike the on-page <Logo> component,
    // which already renders efficiently through next/image regardless of
    // the source file's size.
    icon: [{ url: "/favicon-32.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.fullName}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: `${siteConfig.name} — ${siteConfig.school}`,
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.fullName} at ${siteConfig.school}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.fullName}`,
    description: siteConfig.description,
    images: ["/og-image.png"],
    creator: "@itsa_usa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: siteConfig.school,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.location,
    addressCountry: "PH",
  },
  email: siteConfig.contactEmail,
  sameAs: [
    siteConfig.socials.facebook,
    siteConfig.socials.github,
    siteConfig.socials.instagram,
    siteConfig.socials.twitter,
  ].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden">
        <PageLoader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
