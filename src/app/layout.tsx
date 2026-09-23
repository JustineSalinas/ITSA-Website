import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/data/site";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display",
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
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo.png" }],
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            {children}
          </SmoothScroll>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
