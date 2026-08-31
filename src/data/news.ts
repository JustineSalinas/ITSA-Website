import type { NewsItem } from "@/lib/types";

const now = new Date();
function daysAgo(days: number, hours = 0): string {
  const d = new Date(now);
  d.setDate(d.getDate() - days);
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

export const newsData: NewsItem[] = [
  {
    id: "news-1",
    slug: "itsa-annual-tech-summit-2026-keynotes-hackathon",
    title: "ITSA Annual Tech Summit 2026: Keynote Speakers & Hackathon Tracks Announced",
    excerpt:
      "Join us for USA's premier student technology gathering on Sunday, September 20, 2026, featuring industry keynotes, build tracks, and ₱50,000 in prizes.",
    date: daysAgo(1, 2),
    category: "Announcement",
    images: ["/images/news/summit-1.jpg", "/images/news/summit-2.jpg"],
    imageUrl: "/images/news/summit-1.jpg",
    author: {
      name: "Executive Directorate",
      role: "ITSA Secretariat",
    },
    tags: ["TechSummit", "Hackathon", "Keynote", "Innovation"],
    content: `We are thrilled to officially unveil the speaker roster, challenge tracks, and partner lineup for the ITSA Annual Tech Summit & Hackathon 2026, taking place on Sunday, September 20, 2026 (1:00 PM) at the University of San Agustin Arts & Sciences Auditorium.

The Tech Summit brings together over 300 IT students, faculty mentors, and software engineering alumni. This year’s theme, "Connected Intelligence: Engineering Scalable, Resilient Systems," tackles the shifting landscape of full-stack engineering, cloud architecture, and applied AI.

Keynotes include sessions on The Modern Cloud & Distributed Systems, Practical Cyber Threat Intelligence, and turning student prototypes into venture-backed solutions. The summit will culminate in a fast-paced 24-hour hackathon across Civic Tech, FinTech, and Developer Tooling tracks. Free registration passes are now open for all bona fide ITSA members.`,
  },
  {
    id: "news-2",
    slug: "intro-web-dev-workshop-registration-live",
    title: "Registration Live: Intro to Web Development Workshop (September 6, 2026)",
    excerpt:
      "Hands-on beginner-friendly technical workshop starts Sunday, September 6, 2026 at IT Laboratory 2. Master HTML, CSS, JavaScript, and modern web fundamentals.",
    date: daysAgo(4, 2),
    category: "Workshop",
    images: ["/images/news/workshop-1.jpg", "/images/news/workshop-2.jpg"],
    imageUrl: "/images/news/workshop-1.jpg",
    author: {
      name: "Technical Committee",
      role: "Director of Technical Education",
    },
    tags: ["Workshops", "WebDev", "HTML", "JavaScript"],
    content: `Registration is now officially open for our upcoming Intro to Web Development Workshop, scheduled for Sunday, September 6, 2026 (1:00 PM) at IT Laboratory 2.

This hands-on, beginner-friendly lab is led by senior student developers and covers foundational HTML5 semantics, responsive CSS styling, and interactive JavaScript. Attendees will build and deploy their very first web project during the session with live 1-on-1 peer assistance.

Bring your laptop with VS Code installed. Starter code and worksheets will be distributed prior to the lab via Discord. Reserve your seat early as lab stations are limited!`,
  },
  {
    id: "news-3",
    slug: "usa-team-places-top-3-regional-ctf-championship",
    title: "USA Agustinian Hackers Secure Top 3 Podium at Regional Collegiate CTF",
    excerpt:
      "Representing the University of San Agustin, ITSA's CyberSec squad demonstrated exceptional prowess ahead of our campus CTF Night on October 4, 2026.",
    date: daysAgo(7, 1),
    category: "Achievement",
    images: ["/images/news/ctf-1.jpg"],
    imageUrl: "/images/news/ctf-1.jpg",
    author: {
      name: "Public Relations Directorate",
      role: "VP of Communications",
    },
    tags: ["CTF", "CyberSecurity", "Podium", "StudentExcellence"],
    content: `Huge congratulations to our ITSA cybersecurity delegation for bagging a top-3 podium finish at the Visayas Regional Collegiate CTF Tournament!

Competing against 28 top universities across the region, our student team solved advanced reverse engineering challenges, web vulnerability labs, and real-time packet inspection flags over an intense 12-hour sprint.

This victory builds immense momentum for our upcoming campus-wide Capture The Flag: Cybersecurity Night, scheduled for Sunday, October 4, 2026 on Discord. Congratulations to our champions for raising the Golden & Blue banner high!`,
  },
  {
    id: "news-4",
    slug: "general-assembly-key-takeaways-term-roadmap",
    title: "General Assembly Highlights: Term Roadmap & Project Showcase",
    excerpt:
      "Review the key resolutions, term budget allocations, and open-source project roadmap from our General Assembly held on August 16, 2026.",
    date: daysAgo(13, 2),
    category: "Campus",
    images: ["/images/news/assembly-1.jpg", "/images/news/assembly-2.jpg"],
    imageUrl: "/images/news/assembly-1.jpg",
    author: {
      name: "Executive Directorate",
      role: "Secretary General",
    },
    tags: ["GeneralAssembly", "Roadmap", "OpenSource", "Academics"],
    content: `Thank you to the over 200 members who attended our General Assembly & Orientation held on Sunday, August 16, 2026 at the USA Gymnasium!

Key takeaways presented by the Executive Board include the launch of our open-source campus directory project on GitHub, a 60% budget allocation toward laboratory kits and hackathon prizes, and the kickoff of peer tutoring pods for Data Structures & Algorithms and Database Systems.

The complete slide deck and meeting minutes are accessible in the member resources portal.`,
  },
  {
    id: "news-5",
    slug: "call-for-directorate-committee-volunteers-2026",
    title: "Join the Student Board: Directorate Committees Open for Applications",
    excerpt:
      "Looking to gain real leadership, event management, and developer experience? Applications are open for ITSA junior committee leads through September 15, 2026.",
    date: daysAgo(18, 3),
    category: "Recruitment",
    images: ["/images/news/assembly-2.jpg"],
    imageUrl: "/images/news/assembly-2.jpg",
    author: {
      name: "Governance & Ethics Committee",
      role: "ITSA President",
    },
    tags: ["Leadership", "Volunteers", "Governance", "Community"],
    content: `ITSA is expanding our student organizing teams for Academic Year 2026! If you're passionate about software engineering, creative media, event logistics, or community outreach, this is your opportunity to build alongside motivated peers.

Open directorate roles include Technical Committee Associates, Creative & Brand Design Officers, Logistics & Events Coordinators, and Community Engagement Leads. Members gain hands-on project and governance experience, priority access to industry partner roundtables, and direct collaboration with senior mentors.

Applications close on September 15, 2026. Review of submissions occurs on a rolling basis.`,
  },
  {
    id: "news-6",
    slug: "q3-internship-pathway-industry-partnerships-announced",
    title: "ITSA Partners with Leading Tech Firms for Q3 Internship Fast-Track",
    excerpt:
      "Following our Alumni Homecoming on July 21, 2026, exclusive internship openings and technical interview pipelines have been established with partner companies.",
    date: daysAgo(25, 4),
    category: "Announcement",
    images: ["/images/news/career-1.jpg"],
    imageUrl: "/images/news/career-1.jpg",
    author: {
      name: "Industry Relations",
      role: "VP of External Affairs",
    },
    tags: ["Internships", "CareerTrack", "IndustryPartners", "Jobs"],
    content: `Following the successful Alumni Homecoming: Careers in Tech panel held on July 21, 2026 at the USA Function Hall, we are proud to announce new institutional partnerships with five forward-thinking software and cloud infrastructure companies across the region.

Through these partnerships, ITSA registered members will receive direct resume referrals to hiring engineering managers, mock technical interviews conducted by alumni currently working at top tech firms, and capstone sponsorships for standout senior research.

Stay tuned for our upcoming Tech Career Matching Day where partner recruiters will conduct on-site profile reviews and initial screenings at USA.`,
  },
];


