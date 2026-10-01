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
  { name: "Augustinian Developer Society", logo: "/images/partners/ads.png", width: 84, height: 70 },
  { name: "Holotech Society", logo: "/images/partners/holotech.png", width: 76, height: 70 },
];

export const partnersArePlaceholders = false;
