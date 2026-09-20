/**
 * Partners and sponsors shown in the homepage carousel.
 */
export type Partner = {
  name: string;
  logo: string;
  width?: number;
  height?: number;
  /** Optional link to the partner's site. Omitted entries render unlinked. */
  href?: string;
};

export const partners: Partner[] = [
  { name: "Northwind Tech", logo: "/images/partners/northwind-tech.svg", width: 220, height: 60 },
  { name: "Cebu Cloud", logo: "/images/partners/cebu-cloud.svg", width: 200, height: 60 },
  { name: "Iloilo Devs", logo: "/images/partners/iloilo-devs.svg", width: 210, height: 60 },
  { name: "Panay Systems", logo: "/images/partners/panay-systems.svg", width: 220, height: 60 },
  { name: "Agustin Labs", logo: "/images/partners/agustin-labs.svg", width: 210, height: 60 },
  { name: "ByteHub PH", logo: "/images/partners/bytehub-ph.svg", width: 200, height: 60 },
  { name: "Apex Logic", logo: "/images/partners/apex-logic.svg", width: 200, height: 60 },
  { name: "Nexus Data", logo: "/images/partners/nexus-data.svg", width: 210, height: 60 },
];

export const partnersArePlaceholders = true;
