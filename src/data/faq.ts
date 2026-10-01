import { siteConfig } from "@/data/site";

/**
 * Shared question-and-answer content for the homepage FAQ explorer.
 *
 * An entry with an empty `a` is treated as unanswered and is hidden everywhere
 * until someone fills it in. That is deliberate: a wrong answer about fees or
 * eligibility costs more trust than no answer at all.
 */
/** Groups related questions in the homepage FAQ explorer. */
export type FaqCategory = "Getting Started" | "Community & Contact";

export type FaqEntry = {
  id: string;
  /** Full question. */
  q: string;
  /** Answer. Empty string means "not answered yet" — the entry stays hidden. */
  a: string;
  /** Optional next step offered alongside the answer. */
  cta?: { label: string; href: string };
  /** Which section this falls under in the homepage FAQ explorer. */
  category: FaqCategory;
};

export const faqs: FaqEntry[] = [
  {
    id: "who-can-join",
    q: "Who can join ITSA?",
    a: `All Information Technology students enrolled at ${siteConfig.school} are eligible and warmly invited to join: there is no complex sign-up process, just come through our Discord community.`,
    cta: { label: "Join the community", href: "/join" },
    category: "Getting Started",
  },
  {
    id: "fee",
    q: "Is there a membership fee?",
    a: `No mandatory membership fee is required to join our Discord community. All enrolled IT students can participate in our open discussions, study sessions, and public workshops freely. Specific merchandise or official kits may carry optional material costs, but community membership is open to all.`,
    cta: { label: "Join us", href: "/join" },
    category: "Getting Started",
  },
  {
    id: "beginner",
    q: "What if I'm a complete beginner in programming?",
    a: "Zero experience required! Our workshops and study groups start from absolute fundamentals and build up to production-ready frameworks and real projects.",
    cta: { label: "Start learning", href: "/join" },
    category: "Getting Started",
  },
  {
    id: "what-we-do",
    q: "What does ITSA actually do?",
    a: "We organize hands-on technical workshops, hackathon training squads, peer-to-peer code reviews, guest tech talks, and project collaboration opportunities throughout the academic year.",
    cta: { label: "See our events", href: "/events" },
    category: "Getting Started",
  },
  {
    id: "time-commitment",
    q: "How much time commitment is expected from members?",
    a: "As much or as little as your coursework allows. You can drop in for a single Saturday workshop, hang out in our Discord study lounges before midterms, or join a competition team. There are no mandatory attendance quotas for general members.",
    cta: { label: "Check events", href: "/events" },
    category: "Getting Started",
  },
  {
    id: "career-tracks",
    q: "Which tech tracks or specializations do you cover?",
    a: "We support 9 main IT pathways: Full-Stack Web, Mobile Applications, Data & AI, Cybersecurity, Cloud & DevOps, UI/UX Design, Systems Administration, Quality Assurance, and IT Project Management.",
    cta: { label: "Explore tracks", href: "/join" },
    category: "Getting Started",
  },
  {
    id: "projects",
    q: "Can I showcase my own project on the site?",
    a: `Yes! The Projects page highlights work built by IT students. Reach out via email at ${siteConfig.contactEmail} or share your GitHub repository in our Discord project showcase channel.`,
    cta: { label: "Browse projects", href: "/projects" },
    category: "Community & Contact",
  },
  {
    id: "contact",
    q: "How do I contact an ITSA officer?",
    a: `Email us at ${siteConfig.contactEmail}, or ping our officers directly in the official Discord community server for fast responses.`,
    cta: { label: "Join our community", href: "/join" },
    category: "Community & Contact",
  },
  {
    id: "officer-recruitment",
    q: "How can I become an ITSA officer or committee lead?",
    a: "Executive officers and departmental committee leads are selected each academic year through open nominations and interviews. Announcements are published on our News page and Discord before the start of each term.",
    cta: { label: "Meet the team", href: "/officers" },
    category: "Community & Contact",
  },
  {
    id: "hackathons",
    q: "Does ITSA organize or compete in hackathons?",
    a: "Yes! We field student squads for regional and national hackathons, CTFs, and programming competitions, while hosting bootcamps and team-matching sessions for beginners.",
    cta: { label: "Upcoming events", href: "/events" },
    category: "Community & Contact",
  },
  {
    id: "certificates",
    q: "Do attendees receive certificates for attending workshops?",
    a: "Yes, official certificates of participation or completion are issued for designated technical workshops, bootcamps, and seminar sessions to help enhance your professional resume.",
    cta: { label: "View workshops", href: "/events" },
    category: "Community & Contact",
  },
  {
    id: "non-it-students",
    q: "Can students from other majors or colleges join events?",
    a: "While ITSA primarily represents Information Technology majors, many of our public tech talks, open forums, and hackathon teams actively welcome cross-disciplinary collaborators from across the university.",
    cta: { label: "Read announcements", href: "/news" },
    category: "Community & Contact",
  },
  {
    id: "partnership",
    q: "How can our company partner with or sponsor ITSA?",
    a: `We warmly welcome industry partners for hackathon sponsorships, tech talks, internships, and student recruitment. Email us at ${siteConfig.contactEmail} with partnership details.`,
    cta: { label: "Email us", href: `mailto:${siteConfig.contactEmail}` },
    category: "Community & Contact",
  },
];

/** Entries with a written answer. Unanswered ones never reach the page. */
export const answeredFaqs = faqs.filter((f) => f.a.trim().length > 0);
