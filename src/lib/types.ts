export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
};

export type Officer = {
  id: string;
  name: string;
  position: string;
  bio: string;
  photoUrl: string;
  socials: SocialLinks;
  sortOrder: number;
};

/** A node in the officer hierarchy (organizational chart). */
export type OrgNode = {
  name: string;
  position: string;
  photoUrl?: string;
  children?: OrgNode[];
};

export type EventItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  /** ISO 8601 string */
  eventDate: string;
  location: string;
  imageUrl: string;
};

/** Status D5's review queue moves an application through. */
export type ApplicationStatus = "new" | "contacted" | "accepted";

export type Application = {
  id: string;
  name: string;
  email: string;
  studentId?: string | null;
  yearLevel?: string | null;
  interest: string;
  message: string;
  status: ApplicationStatus;
  /** ISO 8601 string */
  createdAt: string;
};

export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  /** ISO 8601 string */
  date: string;
  images?: string[];
  imageUrl?: string;
  category?: string;
  author?: {
    name: string;
    role: string;
  };
  tags?: string[];
};


