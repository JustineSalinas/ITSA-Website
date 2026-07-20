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
  { href: "/about", label: "About" },
  { href: "/officers", label: "Officers" },
  { href: "/events", label: "Events" },
  { href: "/join", label: "Join" },
] as const;
