import type { NewsItem } from "@/lib/types";

// Real ITSA announcements, transcribed from the organization's official
// Facebook posts. Newest first; add new posts at the top.
export const localNews: NewsItem[] = [
  {
    id: "klyxen-technology-psc-xi-3rd-place",
    slug: "klyxen-technology-psc-xi-3rd-place",
    title: "Celebrating Innovation and Excellence!",
    excerpt:
      "Congratulations to Klyxen Technology for securing 3rd Place in the Philippine Startup Challenge XI (PSC XI) Regional Pitching Competition.",
    content: [
      "Congratulations to Klyxen Technology, composed of Information Technology students John Kyle R. Amarante, James Andrew Falloriña, and Mauricio Nathaniel F. Ordinado, for securing 3rd Place in the Philippine Startup Challenge XI (PSC XI) Regional Pitching Competition!",
      "With the guidance of their mentors, John Mark Balingcong and Rovilyn Osalla, the team demonstrated their creativity, dedication, and innovative thinking at the competition held at Seda Hotel, Iloilo City.",
      "Their achievement highlights the potential of Information Technology students to develop innovative ideas and contribute to the growing technology and startup community. ITSA-USA proudly celebrates their accomplishment and wishes them continued success in their future endeavors!",
    ].join("\n\n"),
    date: "2026-10-21",
    category: "Achievement",
    images: ["/images/news/klyxen-psc-xi.webp"],
    imageUrl: "/images/news/klyxen-psc-xi.webp",
    tags: ["ITSASPOTLIGHT"],
  },
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
  {
    id: "news-migrated-digital-bayan-2-0-ai-for-all",
    slug: "digital-bayan-2-0-ai-for-all",
    title: "Digital Bayan 2.0: AI for All",
    excerpt:
      "ITSA joined SACEO, DEVCON Iloilo, Holotech Society USA, and the Institute of Computer Science to bring AI literacy to 90 high school students in Jaro.",
    content: [
      "A community digital literacy initiative focused on making artificial intelligence more accessible to the next generation. Digital Bayan 2.0 introduced students to AI Media Literacy, responsible AI usage, prompt engineering, and vibe coding through practical and engaging learning activities.",
      "Held Friday, August 28, 2026 at Tiu Cho Teg – Ana Ros Foundation Integrated School in Lanit, Jaro, for 90 high school students.",
      "The initiative was made possible through a collaborative partnership among SACEO, DEVCON Iloilo, Holotech Society USA, Institute of Computer Science – USA, and Information Technology Student Association – USA, working together to promote digital literacy and responsible technology use in the community.",
    ].join("\n\n"),
    date: "2026-08-28",
    category: "Event",
  },
  {
    id: "news-migrated-techconnect-what-a-ride",
    slug: "techconnect-what-a-ride",
    title: "TechConnect: What a Ride!",
    excerpt:
      "ITSA partnered with the Augustinian Developers Society for TechConnect, contributing pubmats and promotional materials to a student tech showcase and trivia night.",
    content: [
      "TechConnect is a community-building event by the Augustinian Developers Society (ADS) designed to welcome students into the university's technology community. The event brought together students interested in technology, programming, and innovation through organizational introductions, student-led showcases, and interactive activities.",
      "Held Saturday, July 18, 2026 at the Conference Room, 2nd Floor, CPMT Building.",
      "The event featured an ADS Organization Pitch, a Tech Showcase highlighting websites, games, and software solutions created by students, and Interactive Games featuring programming trivia and logic challenges.",
      "ITSA participated as an Organizational Partner, supporting the event and contributing to its promotional efforts through the creation of event pubmats and digital promotional materials.",
    ].join("\n\n"),
    date: "2026-07-18",
    category: "Event",
  },
  {
    id: "news-migrated-frosh-week-2026-itsa-booth",
    slug: "frosh-week-2026-itsa-booth",
    title: "Frosh Week 2026: ITSA Booth",
    excerpt:
      "ITSA welcomed incoming students at its Frosh Week booth with project demos and technology showcases addressing real-world needs.",
    content: [
      "The Information Technology Student Association (ITSA) took part in Frosh Week 2026, welcoming students into the IT community through an engaging and interactive booth experience.",
      "Held at the University of San Agustin, for students and freshmen.",
      "Throughout the event, students had the opportunity to discover ITSA, explore student-led projects, experience technology demonstrations, and connect with fellow IT students. The booth showcased practical technology solutions that demonstrate how Information Technology can address real-world needs in areas such as disaster preparedness and academic management.",
    ].join("\n\n"),
    date: "2026-07-01",
    category: "Event",
  },
];
