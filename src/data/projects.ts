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
    id: "gilayon",
    slug: "gilayon",
    title: "Gilayon",
    description:
      "HMO-clinic digitalization of records: verified check-in, a priority queue, patient registry, e-signed prescriptions and medical certificates, and offline mode. Top 10 at HackIloilo Philippine Startup.",
    author: "Team KasCoders",
    tags: ["Web App", "Healthcare", "Hackathon", "Award"],
    awardName: "Top 10 Finalist",
    awardHost: "HackIloilo Philippine Startup",
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
];

// Real, sourced from each project's own live site or README -- no invented
// content. Listed newest first; add new projects at the top.
export async function getProjects(): Promise<ProjectItem[]> {
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
  return projects.find((p) => p.slug === slug);
}
