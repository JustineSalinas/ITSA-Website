export const siteConfig = {
  name: "ITSA",
  shortName: "ITSA",
  fullName: "Information Technology Student Association",
  school: "University of San Agustin",
  description:
    "The official student organization of Information Technology students at the University of San Agustin — building community, skills, and opportunities in tech.",
  url: "https://itsa-usa.org",
  contactEmail: "itsa@usa.edu.ph",
  location: "General Luna St., Iloilo City, Philippines",
  // Only list channels ITSA actually maintains — empty entries are hidden.
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61592045333438",
    instagram: "",
    twitter: "",
    github: "",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/projects", label: "Projects" },
  { href: "/officers", label: "Officers" },
  // The Join page carries both the membership form and the direct-contact
  // card, so "Contact" is the honest label for what a visitor finds there.
  { href: "/join", label: "Contact" },
] as const;

