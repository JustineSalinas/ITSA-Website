export interface FeaturedPortfolio {
  month: string;
  studentName: string;
  section: string;
  role: string;
  avatarUrl?: string;
  screenshotUrl: string;
  liveUrl: string;
  githubUrl?: string;
  description: string;
  techStack: string[];
  submissionUrl?: string;
}

export const currentFeaturedPortfolio: FeaturedPortfolio | null = {
  month: "October 2026",
  studentName: "Alex Developer",
  section: "BSIT 3C",
  role: "Front-End Developer & UI/UX Designer",
  screenshotUrl: "/images/itsa-community.webp", // Mock screenshot
  liveUrl: "https://alex.dev",
  githubUrl: "https://github.com/alexdev",
  description: "Alex consistently goes above and out in our dev-collab channels, helping freshmen debug their code and sharing incredible open-source projects.",
  techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
  submissionUrl: "#",
};
