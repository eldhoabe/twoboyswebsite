/**
 * Single source of truth for shop-identity values referenced across
 * components. Change these here rather than hunting through markup —
 * this is the one file a non-developer edit request should touch.
 */
export const siteConfig = {
  name: 'Hardware Shop',
  shortName: 'Two Boys',
  tagline: 'Cement and steel Pathanamthitta has trusted for 40 years.',
  description:
    'Hardware shop in Pathanamthitta — UltraTech and Ramco cement, Tata Steel and JSW TMT bars, roofing sheets and GI pipes. Home and site delivery.',
  yearsTrading: 40,
  location: 'Pathanamthitta, Kerala',
  serviceArea: ['Pathanamthitta', 'Konni', 'Chittar'],
  address: 'Pathanamthitta-Melevettipuram Rd, Vettipuram, Pathanamthitta, Kerala 689645',
  // Structured form of the same address, for the LocalBusiness JSON-LD
  // schema (schema.org/PostalAddress wants these as separate fields,
  // not one free-text line). Keep in sync with `address` above.
  addressParts: {
    streetAddress: 'Pathanamthitta-Melevettipuram Rd, Vettipuram',
    addressLocality: 'Pathanamthitta',
    addressRegion: 'Kerala',
    postalCode: '689645',
    addressCountry: 'IN',
  },
  hours: 'Monday – Saturday, 8 am – 5:30 pm',
  openingHours: ['Mo-Sa 08:00-17:30'],
  mapsUrl: 'https://share.google/wgIWQqmhF0iI8oUCA',
  // Same number, two formats: whatsappNumber feeds wa.me links (digits
  // only, country code first, no spaces or +); phoneDisplay is what's
  // shown to a human and used in the tel: link.
  whatsappNumber: '919846663890',
  phoneDisplay: '+91 98466 63890',
} as const;

/**
 * Google Maps "embed without an API key" URL. Google serves a
 * lightweight embeddable map for any text query via /maps?...&output=embed —
 * no billing account or API key needed, unlike the full Maps
 * Embed/JS API. Good enough for a "here's where we are" iframe; swap
 * for the real Maps Embed API if you later want custom styling.
 */
export function mapsEmbedUrl(): string {
  const query = encodeURIComponent(`${siteConfig.name}, ${siteConfig.address}`);
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

/**
 * Builds a wa.me deep link, optionally pre-filling a message.
 * Centralising this avoids hand-built wa.me URLs drifting out of sync
 * if the number or message format ever changes.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** tel: link built from the same number used for display. */
export function phoneLink(): string {
  return `tel:+${siteConfig.whatsappNumber}`;
}
