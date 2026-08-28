export interface TrustPoint {
  title: string;
  description: string;
}

/**
 * Three short facts shown right after the hero — the "why trust us"
 * beat every reference site in this style leads with. Kept as data
 * so the wording can change without touching TrustStrip.astro.
 */
export const trustPoints: TrustPoint[] = [
  {
    title: '40 years in Pathanamthitta',
    description: 'A long-standing name trusted by contractors and homebuilders alike.',
  },
  {
    title: 'Home and site delivery',
    description: 'Delivery available based on terms and conditions — ask in store or on WhatsApp.',
  },
  {
    title: 'Pathanamthitta, Konni and Chittar',
    description: 'Serving customers across all three areas from one stock.',
  },
];
