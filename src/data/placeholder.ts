import type { EventItem } from "@/lib/types";

// NOTE: Placeholder events shown until real data exists in Firestore.
// Officers use the real org chart in `@/data/officers`, not placeholders.

const now = new Date();
function daysFromNow(days: number): string {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  d.setHours(13, 0, 0, 0);
  return d.toISOString();
}

export const placeholderEvents: EventItem[] = [
  {
    id: "phe-1",
    title: "Tech Summit 2026",
    slug: "tech-summit-2026",
    description:
      "Our flagship annual summit bringing together industry speakers, alumni, and students for a full day of talks on AI, web development, and career growth. Includes networking sessions and a hackathon showcase.",
    eventDate: daysFromNow(21),
    location: "USA Arts & Sciences Auditorium",
    imageUrl: "",
  },
  {
    id: "phe-2",
    title: "Intro to Web Development Workshop",
    slug: "intro-web-dev-workshop",
    description:
      "A hands-on beginner-friendly workshop covering HTML, CSS, and JavaScript. Bring your laptop and build your first web page with guidance from our Technical Committee.",
    eventDate: daysFromNow(7),
    location: "IT Laboratory 2",
    imageUrl: "",
  },
  {
    id: "phe-3",
    title: "Capture The Flag: Cybersecurity Night",
    slug: "ctf-cybersecurity-night",
    description:
      "Test your hacking skills in a friendly, beginner-to-advanced CTF competition. Teams of up to four. Prizes for the top three teams. No experience required — just curiosity.",
    eventDate: daysFromNow(35),
    location: "Online / Discord",
    imageUrl: "",
  },
  {
    id: "phe-4",
    title: "General Assembly & Orientation",
    slug: "general-assembly-orientation",
    description:
      "Kickoff assembly for the school year. Meet the officers, learn about upcoming programs, and find out how to get involved with ITSA.",
    eventDate: daysFromNow(-14),
    location: "USA Gymnasium",
    imageUrl: "",
  },
  {
    id: "phe-5",
    title: "Alumni Homecoming: Careers in Tech",
    slug: "alumni-homecoming-careers-tech",
    description:
      "IT alumni return to share their journeys across software, data, and product roles. A candid panel and Q&A about breaking into the industry.",
    eventDate: daysFromNow(-40),
    location: "USA Function Hall",
    imageUrl: "",
  },
];
