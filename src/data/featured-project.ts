export interface FeaturedProject {
  month: string;
  title: string;
  tagline: string;
  description: string;
  /** Owning org or class, shown under the title. */
  org?: string;
  techStack?: string[];
  screenshotUrl: string;
  liveUrl?: string;
  githubUrl?: string;
}

// Rotation is manual for now: an officer swaps this entry once a month after
// the project has been approved. Only list projects whose details are real --
// leave `githubUrl` out while a repo is private (the button hides itself).
export const currentFeaturedProject: FeaturedProject | null = {
  month: "October 2026",
  title: "PharmaTrack",
  tagline: "QR attendance, done right.",
  description:
    "Students scan a personal QR code and are logged in under a second. Facilitators watch who is present, late, or absent live, then export per-event and per-student reports in one click.",
  org: "University of San Agustin, Pharmacy Department",
  techStack: ["Next.js"],
  screenshotUrl: "/images/projects/pharmatrack.png",
  liveUrl: "https://lsgph-pharmatrack.com/",
};
