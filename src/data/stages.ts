export interface Brand {
  name: string;
  category: string;
}

export type StageId = 'foundation' | 'steel' | 'pipes' | 'roof';

export interface Stage {
  id: StageId;
  index: string;
  title: string;
  description: string;
  brands: Brand[];
}

/**
 * The four-stage build story, in construction order. This list drives
 * both the story section and the "in stock" brand strip, so adding a
 * new material category means editing data, not markup in two places.
 */
export const stages: Stage[] = [
  {
    id: 'foundation',
    index: '01',
    title: 'Every wall needs solid ground',
    description:
      'Before a single brick goes up, the slab has to hold for fifty years of monsoons. We stock the cement local masons already trust.',
    brands: [
      { name: 'Ramco', category: 'Cement' },
      { name: 'UltraTech', category: 'Cement' },
    ],
  },
  {
    id: 'steel',
    index: '02',
    title: 'Steel gives a home its spine',
    description:
      'TMT bars for the frame, grills and gates — stocked in the sizes contractors actually order.',
    brands: [
      { name: 'Metcon TMT', category: 'Steel' },
      { name: 'Tata Steel', category: 'Steel' },
      { name: 'JSW Steel', category: 'Steel' },
    ],
  },
  {
    id: 'pipes',
    index: '03',
    title: 'Water has to move quietly, for decades',
    description:
      "GI and GP pipe runs that don't leak by year three, with fittings to match — so a repair doesn't mean re-plumbing the wall.",
    brands: [
      { name: 'IM Pipes', category: 'GI & GP Pipes' },
      { name: 'Apollo Pipes', category: 'GI & GP Pipes' },
    ],
  },
  {
    id: 'roof',
    index: '04',
    title: 'The last word before the rains come',
    description:
      'Light, corrosion-resistant roofing sheets built for Kerala weather — the difference between a roof you forget and one you patch every June.',
    brands: [{ name: 'Everlast Aluminium', category: 'Roofing' }],
  },
];
