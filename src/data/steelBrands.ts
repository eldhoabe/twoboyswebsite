export interface SteelBrandSpec {
  id: 'jsw' | 'tata' | 'metcon';
  label: string;
  grade: string;
  usedIn: string;
  /** Element ids in SteelSelector's skeleton SVG this brand highlights. */
  highlightIds: string[];
}

/**
 * Illustrative placement data for the interactive steel skeleton.
 * NOTE: grades and "used in" text are illustrative, not verified spec
 * sheets — flagged in the UI too. Replace with confirmed figures
 * from JSW / Tata Steel / Metcon technical documentation before
 * publishing.
 */
export const steelBrandSpecs: SteelBrandSpec[] = [
  {
    id: 'jsw',
    label: 'JSW Steel',
    grade: 'JSW Neosteel — Fe 550D',
    usedIn:
      'columns and roof beam — higher-ductility grade suited for the vertical load path.',
    highlightIds: ['line-col-l', 'line-col-r', 'line-col-m', 'line-beam', 'line-slab', 'fill-slab'],
  },
  {
    id: 'tata',
    label: 'Tata Steel',
    grade: 'Tata Tiscon — Fe 500D',
    usedIn:
      'foundation and slab tie beams — where corrosion resistance over decades matters most.',
    highlightIds: ['line-foundation', 'fill-foundation', 'line-tie1', 'line-tie2'],
  },
  {
    id: 'metcon',
    label: 'Metcon TMT',
    grade: 'Metcon TMT — Fe 500',
    usedIn:
      'lintels and secondary framing — the most commonly requested grade for mid-budget residential builds.',
    highlightIds: ['line-col-m', 'line-tie1', 'line-beam'],
  },
];
