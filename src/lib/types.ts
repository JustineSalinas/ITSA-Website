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
