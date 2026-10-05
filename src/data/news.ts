import type { NewsItem } from "@/lib/types";

// Real ITSA announcements, transcribed from the organization's official
// Facebook posts. Newest first; add new posts at the top. Sanity-published
// news (src/sanity/lib/news.ts) is merged in by getNews() in src/lib/data.ts.
export const localNews: NewsItem[] = [
  {
    id: "itsa-recognized",
    slug: "itsa-recognized",
    title: "ITSA Recognized",
    excerpt:
      "The Information Technology Student Association (ITSA) is officially recognized as a student organization of the University of San Agustin.",
    content: [
      "A milestone worth celebrating! The Information Technology Student Association (ITSA) is officially recognized as a student organization of the University of San Agustin.",
      "This recognition was made official during the RSO General Assembly & APPS Speakers on August 28, 2026, where ITSA proudly joined the community of recognized student organizations of the University.",
      "Here's to building, connecting, innovating, and growing together. The ITSA journey continues, and we're just getting started. ITSA bout time we made it official.",
    ].join("\n\n"),
    date: "2026-08-29",
    category: "Announcement",
    images: ["/images/news/itsa-recognized.webp"],
    imageUrl: "/images/news/itsa-recognized.webp",
    tags: ["ITSAUPDATES"],
  },
];
