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
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    github: "https://github.com/",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/officers", label: "Officers" },
  { href: "/events", label: "Events" },
  { href: "/join", label: "Join" },
] as const;
