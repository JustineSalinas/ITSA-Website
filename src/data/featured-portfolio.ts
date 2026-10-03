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

// Rotation is manual, same as featured-project.ts: an officer swaps this
// entry once a month after a real student's portfolio has been picked. Leave
// it null rather than filling it with placeholder content -- a fabricated
// name, quote, and screenshot (even reusing a real ITSA photo out of
// context) would be shown to real visitors as if genuine.
export const currentFeaturedPortfolio: FeaturedPortfolio | null = null;
