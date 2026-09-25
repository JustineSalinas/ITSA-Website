import type { NewsItem } from "@/lib/types";

// Real event recaps (category "Event" -> displayed as "Event recap", matching
// the Sanity news schema's category option). No stock imagery or invented
// authorship here -- add photos and bylines when the real assets exist.
export const newsData: NewsItem[] = [
  {
    id: "news-1",
    slug: "digital-bayan-2-0-ai-for-all",
    title: "Digital Bayan 2.0: AI for All",
    excerpt:
      "ITSA joined SACEO, DEVCON Iloilo, Holotech Society USA, and the Institute of Computer Science to bring AI literacy to 90 high school students in Jaro.",
    date: "2026-08-28",
    category: "Event",
    tags: ["DigitalBayan", "CommunityOutreach", "AILiteracy", "EventRecap"],
    content: `A community digital literacy initiative focused on making artificial intelligence more accessible to the next generation. Digital Bayan 2.0 introduced students to AI Media Literacy, responsible AI usage, prompt engineering, and vibe coding through practical and engaging learning activities.

Held Friday, August 28, 2026 at Tiu Cho Teg – Ana Ros Foundation Integrated School in Lanit, Jaro, for 90 high school students.

The initiative was made possible through a collaborative partnership among SACEO, DEVCON Iloilo, Holotech Society USA, Institute of Computer Science – USA, and Information Technology Student Association – USA, working together to promote digital literacy and responsible technology use in the community.`,
  },
  {
    id: "news-2",
    slug: "techconnect-what-a-ride",
    title: "TechConnect: What a Ride!",
    excerpt:
      "ITSA partnered with the Augustinian Developers Society for TechConnect, contributing pubmats and promotional materials to a student tech showcase and trivia night.",
    date: "2026-07-18",
    category: "Event",
    tags: ["TechConnect", "ADS", "OrganizationalPartner", "EventRecap"],
    content: `TechConnect is a community-building event by the Augustinian Developers Society (ADS) designed to welcome students into the university's technology community. The event brought together students interested in technology, programming, and innovation through organizational introductions, student-led showcases, and interactive activities.

Held Saturday, July 18, 2026 at the Conference Room, 2nd Floor, CPMT Building.

The event featured an ADS Organization Pitch, a Tech Showcase highlighting websites, games, and software solutions created by students, and Interactive Games featuring programming trivia and logic challenges.

ITSA participated as an Organizational Partner, supporting the event and contributing to its promotional efforts through the creation of event pubmats and digital promotional materials.`,
  },
  {
    id: "news-3",
    slug: "frosh-week-2026-itsa-booth",
    title: "Frosh Week 2026: ITSA Booth",
    excerpt:
      "ITSA welcomed incoming students at its Frosh Week booth with project demos and technology showcases addressing real-world needs.",
    date: "2026-07-01",
    category: "Event",
    tags: ["FroshWeek", "Recruitment", "StudentProjects", "EventRecap"],
    content: `The Information Technology Student Association (ITSA) took part in Frosh Week 2026, welcoming students into the IT community through an engaging and interactive booth experience.

Held at the University of San Agustin, for students and freshmen.

Throughout the event, students had the opportunity to discover ITSA, explore student-led projects, experience technology demonstrations, and connect with fellow IT students. The booth showcased practical technology solutions that demonstrate how Information Technology can address real-world needs in areas such as disaster preparedness and academic management.`,
  },
];

