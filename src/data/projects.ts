export interface ProjectSection {
  title?: string;
  content?: string;
  galleryCount?: number;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  role?: string;
  teamSize?: number;
  teamName?: string;
  teamMembers?: TeamMember[];
  awardName?: string;
  awardDate?: string;
  awardHost?: string;
  tags: string[];
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  /** "What it does": plain paragraphs separated by a blank line. */
  content: string;
  /** "Features": short title + one-line description each. */
  features?: ProjectFeature[];
  /** "Impact": documented outcomes only -- never invented usage numbers. */
  impact?: string[];
  sections: ProjectSection[];
}

const projects: ProjectItem[] = [
  {
    id: "repo-autopsy",
    slug: "repo-autopsy",
    title: "Repo Autopsy",
    description:
      "Analyses a public GitHub repository and produces an onboarding report: where to start, what's risky to change, and how well the docs match the code. Built for the IBM Bob 2.0 Global Online Hackathon.",
    author: "Justine Salinas",
    tags: ["Web App", "Developer Tools", "Hackathon"],
    techStack: ["Next.js", "TypeScript", "Vitest", "GitHub REST API"],
    githubUrl: "https://github.com/JustineSalinas/repo-autopsy",
    liveUrl: "https://repo-autopsy.vercel.app",
    imageUrl: "/images/projects/repo-autopsy.webp",
    content:
      "Paste a public GitHub URL and Repo Autopsy returns a scored, ranked onboarding report in seconds, with no clone required. It tells a new contributor where to start, what is risky to change, and how well the documentation matches the code.",
    features: [
      { title: "Drift detection", description: "Compares the README and .env.example against up to 40 source files to catch unused env vars, missing setup files and stale API route descriptions." },
      { title: "Blast-radius ranking", description: "Builds an import graph and counts how many modules each TODO, FIXME or open issue would affect if changed." },
      { title: "Trust score", description: "Turns the findings into a 0-100 score in one of three bands: Ready, Needs care or Risky onboarding." },
      { title: "Onboarding report", description: "A ranked starting path with collapsible risk groups, plus shareable report URLs and Markdown export." },
      { title: "Methodology page", description: "Explains every stage, the exact scoring formula and the known limitations in plain language." },
    ],
    impact: [
      "Gives a new contributor a safe first task on day one instead of guessing which files will break half the app.",
      "Surfaces stale documentation and hidden risk before anyone touches the code.",
      "Open about its limits: partial scan of 40 files, JavaScript and TypeScript only, heuristic checks.",
      "Backed by 48 unit tests covering scoring, risk classification and drift checks, and entered in the IBM Bob 2.0 Global Online Hackathon.",
    ],
    sections: [],
  },
  {
    id: "tuon",
    slug: "tuon",
    title: "Tuón",
    description:
      "Turns class notes into flashcards and practice quizzes, then schedules spaced-repetition reviews. Built for Philippine Senior High strands, college programs and board reviewers.",
    author: "Justine Salinas",
    tags: ["Web App", "AI", "Education"],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "Anthropic Claude", "PayMongo"],
    githubUrl: "https://github.com/JustineSalinas/Tuon",
    liveUrl: "https://tuon-two.vercel.app",
    imageUrl: "/images/projects/tuon.webp",
    content:
      "Tuón (Cebuano and Tagalog: to study; to give something your full attention) turns your class notes into flashcards and practice quizzes, then schedules reviews so the material actually stays. Paste a lecture handout, import a PDF or write your own notes, and you get a study set back in one step along with a spaced-repetition schedule.",
    features: [
      { title: "Notes to study sets", description: "One generation returns 8-15 flashcards and a 5-question quiz. Paste, type or import a PDF; write your own cards too." },
      { title: "Spaced repetition", description: "SM-2 scheduling with Again, Hard, Good and Easy ratings, typed recall, and timed tests drawn from your weakest cards." },
      { title: "Readiness and study plan", description: "Per-subject readiness measured against your exam date, retention stats, and a daily plan that says what to do first and why." },
      { title: "Focus and tracking", description: "Pomodoro timer tagged to a subject, study heatmap and streaks, calendar and timetable, and a knowledge graph of your subjects." },
      { title: "Study together", description: "Private study groups joined by invite code, and read-only set sharing by link that needs no account." },
      { title: "Tala and offline use", description: "A study companion owl that sees your study state but never your note text. English and Filipino, works offline and installs on your phone." },
    ],
    impact: [
      "Built for Filipino students: Senior High strands and college programs are built in, with a Manila-time study calendar.",
      "Board and licensure reviewers set an exam date and the schedule compresses to the time they actually have left.",
      "A genuinely usable free tier: notes, spaced repetition, tests and study groups are free, with 5 AI study sets a month. Plus is PHP 149 and Pro is PHP 299 a month.",
      "Pays through GCash, Maya or card, and lets you export your data to Anki, CSV or PDF, or delete your account for real.",
    ],
    sections: [],
  },
  {
    id: "horizon",
    slug: "horizon",
    title: "Horizon",
    description:
      "Offline LoRa mesh emergency communication ecosystem (handheld, solar relay and alarm system) for disaster-prone communities in the Philippines, built under Klyxen Technology.",
    author: "John Kyle R. Amarante",
    role: "Lead Developer",
    teamName: "Klyxen Technology",
    teamSize: 3,
    teamMembers: [
      { name: "John Kyle R. Amarante", role: "Lead Developer" },
      { name: "James Melliza", role: "Developer" },
      { name: "Antonio Edward Labios", role: "Developer" },
    ],
    tags: ["Hardware", "IoT", "Disaster Response"],
    techStack: ["ESP32", "LoRa", "ESP-NOW", "FreeRTOS", "HMAC-SHA256"],
    liveUrl: "https://horizontx.netlify.app",
    imageUrl: "/images/projects/horizon.webp",
    content:
      "Horizon is an offline LoRa mesh emergency communication ecosystem for disaster-prone communities in the Philippines. When internet and cell towers fail, its handheld communicators, solar relay and alarm system keep responders and residents connected, with no infrastructure needed.",
    features: [
      { title: "Handheld communicator", description: "Capacitive touch UI with chat, urgent and alarm modes, OTA updates and a 2000 mAh battery with charge protection." },
      { title: "TTL mesh routing", description: "Multi-hop relay across devices, with HMAC-SHA256 authenticated packets and anti-flood forwarding." },
      { title: "Solar relay", description: "A long-range bridge with permanent packet storage and LED status that extends coverage and never forgets a packet." },
      { title: "Alarm system", description: "Buzzer, vibration motor and TFT status display that trigger within seconds of an urgent or alarm broadcast." },
      { title: "Persistent alerts", description: "Urgent alerts survive a reboot and re-sync automatically, and a save mode conserves battery in the field." },
    ],
    impact: [
      "Field-tested: seven tests so far, reaching 593 m direct and 623 m through the mesh, with 88.3% combined system reliability and 50 of 51 alarm attempts delivered.",
      "Developed with local disaster offices: coordination and prototype evaluation with CDRRMO Iloilo City and MDRRMO Leon.",
      "Affordable by design, with estimated build costs of about PHP 2,570 for the handheld, PHP 1,899 for the alarm system and PHP 2,999 for the relay.",
      "Recognised by DOST engagement and a SACEO grant. Still a prototype: not for sale and under validation.",
    ],
    sections: [],
  },
  {
    id: "famly",
    slug: "famly",
    title: "Famly",
    description:
      "Collaborative dark-themed family financial tracker and planning board for tuition assessments, milestone savings goals, debt ledgers and future family project proposals.",
    author: "Justine Salinas",
    tags: ["Web App", "Mobile", "Finance"],
    techStack: ["React", "Vite", "Firebase", "Capacitor"],
    githubUrl: "https://github.com/JustineSalinas/famly-app",
    liveUrl: "https://famly-app.vercel.app",
    imageUrl: "/images/projects/famly.webp",
    content:
      "Famly is a shared financial dashboard for families to conquer multi-creditor debts, manage tuition backlogs and hit saving milestones. It brings tuition assessments, savings goals, debt ledgers and future family project proposals into one collaborative, dark-themed board.",
    features: [
      { title: "Debt ledger", description: "Active obligations with current or overdue status, total debt remaining and the amount due this month." },
      { title: "Tuition assessments", description: "Track assessments term by term in one place." },
      { title: "Savings milestones", description: "Set goals and follow progress toward them." },
      { title: "Project proposals", description: "Plan future family projects alongside the budget." },
      { title: "Shared and synced", description: "Family members work from the same data through Firebase, with sign-in and password reset." },
      { title: "Web and mobile", description: "Runs as a web app and is set up with Capacitor for Android and iOS builds." },
    ],
    impact: [
      "Gives a family one shared view of what they owe, what is overdue and what they are saving toward, instead of scattered records.",
      "Made for Filipino families juggling multiple creditors and tuition costs.",
      "Private by default: security rules limit each user to their own data.",
    ],
    sections: [],
  },
  {
    id: "pomodose",
    slug: "pomodose",
    title: "Pomodose",
    description:
      "Pharmacist-themed Pomodoro timer with goal tracking and an AI study companion named Dosey.",
    author: "Twice Navarro",
    tags: ["Web App", "AI", "Productivity"],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Convex", "Gemini"],
    githubUrl: "https://github.com/Tways-study/Pomodose",
    liveUrl: "https://pomodose-lime.vercel.app",
    imageUrl: "/images/projects/pomodose.webp",
    content:
      "Pomodose is a Pomodoro timer, daily goal tracker and AI study companion for pharmacy students, built as a gift for a pharmacist grinding through long solo study sessions. Work sessions are \"Doses\", breaks are \"Refills\" and \"Antidotes\", and a mascot named Dosey keeps you company.",
    features: [
      { title: "Vial timer", description: "A timestamp-driven timer shown as a liquid-filled flask or graduated cylinder that stays accurate in a background tab." },
      { title: "Daily goals", description: "A goal list saved to your account that rolls over at local midnight, with example goals for pharmacy students." },
      { title: "Dosey, the AI companion", description: "A Gemini-powered chat that knows your live timer and goals, with a mascot that reacts to your mood." },
      { title: "Break and burnout nudges", description: "Desktop notifications for skipped breaks, long unbroken stretches and late-hour sessions." },
      { title: "Accounts and progress", description: "Email and password sign-in, with completed sessions saved so your dose count survives a reload." },
    ],
    impact: [
      "Gives solo study sessions structure, on the idea that rest is part of the prescription, not a break from it.",
      "Nudges students toward breaks before they burn out.",
      "Student-first by design, with pharmacy-themed copy and example goals built in.",
      "Shipped with CI that runs lint, typecheck and tests on every push.",
    ],
    sections: [],
  },
];

// Real, sourced from each project's own live site or README -- no invented
// content. Listed newest first; add new projects at the top.
export async function getProjects(): Promise<ProjectItem[]> {
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  return projects.find((p) => p.slug === slug);
}
