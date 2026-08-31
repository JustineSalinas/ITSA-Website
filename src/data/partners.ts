/**
 * Partners and sponsors shown in the homepage carousel.
 *
 * PLACEHOLDER DATA. Every entry below is invented, and the logos in
 * public/images/partners/ are generic grey stand-ins — not real company marks.
 * Replace both the names and the files before this is presented as real: a
 * fabricated sponsor list is worse than an empty one, because a visitor who
 * recognises the deception stops trusting everything else on the page.
 *
 * To add a real partner: drop the logo in public/images/partners/ (SVG or a
 * compressed PNG/WebP, roughly 220x72) and add an entry here.
 */
export type Partner = {
  name: string;
  logo: string;
  /** Optional link to the partner's site. Omitted entries render unlinked. */
  href?: string;
};

export const partners: Partner[] = [
  { name: "Northwind Tech", logo: "/images/partners/northwind-tech.svg" },
  { name: "Cebu Cloud", logo: "/images/partners/cebu-cloud.svg" },
  { name: "Iloilo Devs", logo: "/images/partners/iloilo-devs.svg" },
  { name: "Panay Systems", logo: "/images/partners/panay-systems.svg" },
  { name: "Agustin Labs", logo: "/images/partners/agustin-labs.svg" },
  { name: "ByteHub PH", logo: "/images/partners/bytehub-ph.svg" },
];

/** True while the list is still stand-in content, so the UI can say so. */
export const partnersArePlaceholders = true;
