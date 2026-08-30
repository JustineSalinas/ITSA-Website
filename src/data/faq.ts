import { siteConfig } from "@/data/site";

/**
 * Shared question-and-answer content.
 *
 * Both the Join page FAQ and the "Ask ITSA" panel read from here, so an answer
 * is written once and can never disagree with itself in two places.
 *
 * An entry with an empty `a` is treated as unanswered and is hidden everywhere
 * until someone fills it in. That is deliberate: a wrong answer about fees or
 * eligibility costs more trust than no answer at all.
 */
export type FaqEntry = {
  id: string;
  /** Short label for the Ask ITSA panel button. */
  label: string;
  /** Full question, as shown on the Join page. */
  q: string;
  /** Answer. Empty string means "not answered yet" — the entry stays hidden. */
  a: string;
  /** Optional next step offered alongside the answer. */
  cta?: { label: string; href: string };
  /** `join` entries also appear in the Join page FAQ list. */
  showOnJoinPage?: boolean;
};

export const faqs: FaqEntry[] = [
  {
    id: "who-can-join",
    label: "Can I join?",
    q: "Who can join ITSA?",
    a: `All Information Technology students enrolled at ${siteConfig.school} are eligible and warmly invited to join.`,
    cta: { label: "Register now", href: "/join" },
    showOnJoinPage: true,
  },
  {
    id: "beginner",
    label: "I'm a beginner — is that OK?",
    q: "What if I'm a complete beginner in programming?",
    a: "Zero experience required! Our workshops start from absolute fundamentals up to advanced production topics.",
    cta: { label: "Register now", href: "/join" },
    showOnJoinPage: true,
  },
  {
    id: "after-signup",
    label: "What happens after I sign up?",
    q: "How do I get involved after signing up?",
    a: "Once you submit your application, you will be invited to our official Discord server and upcoming onboarding orientation.",
    showOnJoinPage: true,
  },
  {
    id: "what-we-do",
    label: "What does ITSA actually do?",
    q: "What does ITSA actually do?",
    a: "Hands-on workshops and labs, hackathons and competition squads, peer and alumni mentorship, plus real leadership and project opportunities.",
    cta: { label: "See our events", href: "/events" },
    showOnJoinPage: true,
  },
  {
    id: "projects",
    label: "Can I show my own project?",
    q: "Can I showcase my own project on the site?",
    a: "Yes. The Projects page features work built by IT students. Send us a message and tell us what you have built.",
    cta: { label: "Browse projects", href: "/projects" },
  },
  {
    id: "contact",
    label: "How do I reach an officer?",
    q: "How do I contact an ITSA officer?",
    a: `Email us at ${siteConfig.contactEmail}, or send a message through the form on the Join page and we will reply to you directly.`,
    cta: { label: "Send a message", href: "/join" },
  },
  {
    id: "partnership",
    label: "We'd like to sponsor ITSA",
    q: "How can our company partner with or sponsor ITSA?",
    a: "We welcome partners for events, workshops, and competitions. Use the contact form and choose “Partnership / sponsorship” so it reaches the right officer.",
    cta: { label: "Get in touch", href: "/join" },
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
    showOnJoinPage: true,
  },
];

/** Entries with a written answer. Unanswered ones never reach the page. */
export const answeredFaqs = faqs.filter((f) => f.a.trim().length > 0);

/** The subset shown in the Join page FAQ block. */
export const joinPageFaqs = answeredFaqs.filter((f) => f.showOnJoinPage);
