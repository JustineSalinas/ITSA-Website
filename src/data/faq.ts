import { siteConfig } from "@/data/site";

/**
 * Shared question-and-answer content.
 *
 * Both the homepage FAQ explorer and the "Ask ITSA" panel read from here, so
 * an answer is written once and can never disagree with itself in two places.
 *
 * An entry with an empty `a` is treated as unanswered and is hidden everywhere
 * until someone fills it in. That is deliberate: a wrong answer about fees or
 * eligibility costs more trust than no answer at all.
 */
/** Groups related questions in the homepage FAQ explorer. */
export type FaqCategory = "Getting Started" | "Community & Contact";

export type FaqEntry = {
  id: string;
  /** Short label for the Ask ITSA panel button. */
  label: string;
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
    label: "Can I join?",
    q: "Who can join ITSA?",
    a: `All Information Technology students enrolled at ${siteConfig.school} are eligible and warmly invited to join — no application or sign-up process, just come through our Discord community.`,
    cta: { label: "Join us", href: "/join" },
    category: "Getting Started",
  },
  {
    id: "beginner",
    label: "I'm a beginner — is that OK?",
    q: "What if I'm a complete beginner in programming?",
    a: "Zero experience required! Our workshops start from absolute fundamentals up to advanced production topics.",
    cta: { label: "Join us", href: "/join" },
    category: "Getting Started",
  },
  {
    id: "what-we-do",
    label: "What does ITSA actually do?",
    q: "What does ITSA actually do?",
    a: "Hands-on workshops and labs, hackathons and competition squads, peer and alumni mentorship, plus real leadership and project opportunities.",
    cta: { label: "See our events", href: "/events" },
    category: "Getting Started",
  },
  {
    id: "projects",
    label: "Can I show my own project?",
    q: "Can I showcase my own project on the site?",
    a: `Yes. The Projects page features work built by IT students. Email us at ${siteConfig.contactEmail} and tell us what you have built.`,
    cta: { label: "Browse projects", href: "/projects" },
    category: "Community & Contact",
  },
  {
    id: "contact",
    label: "How do I reach an officer?",
    q: "How do I contact an ITSA officer?",
    a: `Email us at ${siteConfig.contactEmail}, or ask in our Discord community — an officer will see it.`,
    cta: { label: "Join our community", href: "/join" },
    category: "Community & Contact",
  },
  {
    id: "partnership",
    label: "We'd like to sponsor ITSA",
    q: "How can our company partner with or sponsor ITSA?",
    a: `We welcome partners for events, workshops, and competitions. Email us at ${siteConfig.contactEmail} and mention it's a partnership or sponsorship inquiry so it reaches the right officer.`,
    cta: { label: "Email us", href: `mailto:${siteConfig.contactEmail}` },
    category: "Community & Contact",
  },
  {
    // TODO(ITSA officers): confirm the real answer and fill in `a` below.
    // Until then this stays hidden — see the note in the type above.
    // This is very likely the most common unasked question from prospective
    // members, so it is worth answering explicitly somewhere on the site.
    id: "fee",
    label: "Is there a membership fee?",
    q: "Is there a membership fee?",
    a: "",
    cta: { label: "Ask us", href: "/join" },
    category: "Getting Started",
  },
];

/** Entries with a written answer. Unanswered ones never reach the page. */
export const answeredFaqs = faqs.filter((f) => f.a.trim().length > 0);
