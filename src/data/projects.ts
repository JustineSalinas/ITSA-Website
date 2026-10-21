import "server-only";

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
  /** True while the competition is still running and awardName (e.g. "Top 10 Finalist") isn't the final result yet. */
  awardPending?: boolean;
  tags: string[];
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  /** Card thumbnail crop anchor. Defaults to "top" (flattering for people photos). */
  imagePosition?: "top" | "center";
  /** "contain" shows the whole image instead of cropping it to fill the box -- for wide graphics/screenshots where cropping would cut off or over-emphasize part of the composition. Defaults to "cover". */
  imageFit?: "cover" | "contain";
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
    id: "marine-ai",
    slug: "marine-ai",
    title: "Marine-AI",
    description:
      "A retrofittable IoT sensor gateway and AI bridge display for maritime vessels. Three parallel AI modules converge on a single captain display showing live waypoint routes, optimal throttle settings, and predictive maintenance alerts. 1st Runner-Up at the National AI Hackathon 2026.",
    author: "Team Solmate",
    role: "AI/ML Engineer",
    teamName: "SOLMATE",
    awardName: "1st Runner-Up",
    awardHost: "National AI Hackathon 2026",
    awardDate: "Aug 3–5, 2026",
    tags: ["National Hackathon", "Award", "AI", "IoT", "Maritime"],
    techStack: ["XGBoost", "Gradient-boosted forecasting", "PCA anomaly detection"],
    liveUrl: "https://e-ferry.vercel.app/",
    imageUrl: "/images/projects/marine-ai.webp",
    content:
      "Marine-AI is Team SOLMATE's advisory system for ship captains: a retrofittable IoT sensor gateway paired with an AI bridge display. Built by teaming up with SOLMATE, a startup backed by CPUGAD TBI, with 3 Mechanical Engineering members from Central Philippine University. 1st Runner-Up at the National AI Hackathon 2026, competing against 24 teams in the Open Professional Category.",
    features: [
      { title: "Speed & throttle optimizer", description: "An XGBoost hydrodynamic model recommends the optimal throttle setting in real time." },
      { title: "Geodesic route planner", description: "Gradient-boosted sea-state, wind, wave, and current forecasting plots the live waypoint route." },
      { title: "Predictive maintenance", description: "A PCA linear autoencoder and robust z-score anomaly detector flags developing faults before they fail." },
      { title: "One captain display", description: "All three modules converge on a single bridge display -- the captain stays in full command." },
    ],
    impact: [
      "1st Runner-Up, National AI Hackathon 2026, Open Professional Category -- 24 teams nationwide.",
    ],
    sections: [],
  },
  {
    id: "e-ferry",
    slug: "e-ferry",
    title: "E-Ferry",
    description:
      "Clean & smart maritime solutions: electric ferry retrofits plus a green fintech platform unlocking institutional ESG capital for vessel electrification. 1st Runner-Up at the National Ready, Spark, Charge Hackathon 2026.",
    author: "Team Solmate",
    role: "Full Stack Developer",
    teamName: "SOLMATE",
    awardName: "1st Runner-Up",
    awardHost: "Ready, Spark, Charge Hackathon 2026",
    awardDate: "May 21–23, 2026",
    tags: ["National Hackathon", "Award", "Fintech", "IoT", "Maritime"],
    liveUrl: "https://e-ferry.vercel.app/",
    imageUrl: "/images/projects/e-ferry.webp",
    content:
      "Solmate unifies modular electric ferry retrofits with institutional green finance. Built by teaming up with SOLMATE, a startup backed by CPUGAD TBI, with 3 Mechanical Engineering members from Central Philippine University. 1st Runner-Up at the National Ready, Spark, Charge Hackathon 2026, National Clean Energy Track, competing against 17 teams nationwide.",
    features: [
      { title: "E-Ferry retrofit", description: "Converts diesel passenger boats to electric with no hull reconstruction needed, using liquid-cooled LFP battery packs and digital throttle control." },
      { title: "Green Fintech Platform", description: "Unlocking institutional ESG capital for maritime vessel electrification. Converts tamper-proof IoT telemetry into bankable loan structures, tokenized green bonds, and automated carbon credit monetization." },
      { title: "Pay-As-You-Save", description: "A $0-upfront financing option, alongside battery leasing and green bond issuance." },
    ],
    impact: [
      "1st Runner-Up, National Ready, Spark, Charge Hackathon 2026, National Clean Energy Track -- 17 teams nationwide.",
    ],
    sections: [],
  },
  {
    id: "gilayon",
    slug: "gilayon",
    title: "Gilayon",
    description:
      "HMO-clinic digitalization of records: verified check-in, a priority queue, patient registry, e-signed prescriptions and medical certificates, and offline mode. Top 10 at HackIloilo Philippine Startup.",
    author: "Team KasCoders",
    tags: ["Web App", "Healthcare", "Hackathon", "Award"],
    awardName: "Top 10 Finalist",
    awardHost: "HackIloilo Philippine Startup",
    awardDate: "Oct 16–18, 2026",
    awardPending: true,
    content:
      "Gilayon is Team KasCoders' entry to Hack Iloilo 2026: a working records system for an HMO clinic. It covers the HMO-Clinic flow from the concept document -- verified check-in through to the daily report -- including digitizing the clinic's existing paper archive.",
    features: [
      { title: "Verified check-in & priority queue", description: "Confirms a patient's identity at arrival and routes them into a priority queue." },
      { title: "Patient registry", description: "A central record per patient that the rest of the system is built around." },
      { title: "Append-only consultations", description: "Consultation notes are added, never overwritten, preserving a true history." },
      { title: "E-signed prescriptions & medical certificates", description: "Prescriptions and medical certificates are issued with an electronic signature." },
      { title: "Void and reissue", description: "Incorrect documents can be voided and reissued without losing the record of what happened." },
      { title: "Daily report & audit trail", description: "A daily report plus an audit trail of changes across the system." },
      { title: "Paper archive digitization", description: "Old paper folders are photographed and read by local OCR, with a person checking each one before it's saved." },
      { title: "Offline mode", description: "The clinic workflow keeps working without a live connection." },
    ],
    impact: [
      "Top 10 at HackIloilo Philippine Startup.",
    ],
    sections: [],
  },
  {
    id: "klyxen-technology",
    slug: "klyxen-technology",
    title: "Klyxen Technology",
    description:
      "Student hardware venture behind Horizon's offline LoRa mesh emergency communication systems. 3rd Place at the Philippine Startup Challenge XI (PSC XI) Regional Pitching Competition.",
    author: "John Kyle R. Amarante",
    role: "Founder",
    teamName: "Klyxen Technology",
    teamSize: 3,
    teamMembers: [
      { name: "John Kyle R. Amarante", role: "Team Member" },
      { name: "James Andrew Falloriña", role: "Team Member" },
      { name: "Mauricio Nathaniel F. Ordinado", role: "Team Member" },
    ],
    tags: ["Regional Pitching Competition", "Hardware", "IoT", "Startup", "Award"],
    awardName: "3rd Place",
    awardHost: "Philippine Startup Challenge XI (PSC XI) Regional Pitching Competition",
    imageUrl: "/images/projects/klyxen.webp",
    imageFit: "contain",
    content:
      "Klyxen Technology is the student hardware venture behind Horizon, an offline LoRa mesh emergency communication ecosystem for disaster-prone communities in the Philippines. Composed of Information Technology students John Kyle R. Amarante, James Andrew Falloriña, and Mauricio Nathaniel F. Ordinado, the team secured 3rd Place in the Philippine Startup Challenge XI (PSC XI) Regional Pitching Competition, held at Seda Hotel, Iloilo City. They were guided by mentors John Mark Balingcong and Rovilyn Osalla.",
    impact: [
      "3rd Place, Philippine Startup Challenge XI (PSC XI) Regional Pitching Competition.",
    ],
    sections: [],
  },
];

// Real, sourced from each project's own live site or README -- no invented
// content. These are the seed/offline-fallback projects now; the live list
// is edited through the /admin CMS (Firestore). Listed newest first.
export async function getProjects(): Promise<ProjectItem[]> {
  const { isAdminConfigured } = await import("@/lib/firebase/admin");
  if (!isAdminConfigured) return projects;
  try {
    const { listProjectDocs } = await import("@/lib/admin/content");
    const items = await listProjectDocs();
    return items.length ? items : projects;
  } catch (error) {
    console.error("[data] Firestore projects fetch failed:", error);
    return projects;
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
}
