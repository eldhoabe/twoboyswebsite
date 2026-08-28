export interface SquareTubeVariant {
  gauge: 16 | 18;
  thicknessMm: number;
  weightKg: number;
  code: string;
}

export interface SquareTubeSize {
  id: string;
  shape: 'square' | 'rect';
  label: string;    // inches, e.g. "1 × 1"
  labelMm: string;  // e.g. "25 × 25 mm"
  variants: SquareTubeVariant[];
}

export const squareTubeSizes: SquareTubeSize[] = [
  // Square
  { id: 'sq-15',   shape: 'square', label: '½ × ½',    labelMm: '15 × 15 mm',   variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 3.2,  code: '126' }, { gauge: 18, thicknessMm: 1.2, weightKg: 2.8,  code: '128' }] },
  { id: 'sq-20',   shape: 'square', label: '¾ × ¾',    labelMm: '20 × 20 mm',   variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 5.0,  code: '196' }, { gauge: 18, thicknessMm: 1.2, weightKg: 4.1,  code: '198' }] },
  { id: 'sq-25',   shape: 'square', label: '1 × 1',    labelMm: '25 × 25 mm',   variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 6.2,  code: '256' }, { gauge: 18, thicknessMm: 1.2, weightKg: 5.5,  code: '258' }] },
  { id: 'sq-32',   shape: 'square', label: '1¼ × 1¼',  labelMm: '32 × 32 mm',   variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 7.5,  code: '326' }, { gauge: 18, thicknessMm: 1.2, weightKg: 6.7,  code: '328' }] },
  { id: 'sq-40',   shape: 'square', label: '1½ × 1½',  labelMm: '40 × 40 mm',   variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 10.5, code: '386' }, { gauge: 18, thicknessMm: 1.2, weightKg: 9.3,  code: '388' }] },
  { id: 'sq-50',   shape: 'square', label: '2 × 2',    labelMm: '50 × 50 mm',   variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 13,   code: '506' }, { gauge: 18, thicknessMm: 1.2, weightKg: 11,   code: '508' }] },
  { id: 'sq-80',   shape: 'square', label: '3 × 3',    labelMm: '80 × 80 mm',   variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 26,   code: '804' }] },
  { id: 'sq-100',  shape: 'square', label: '4 × 4',    labelMm: '100 × 100 mm', variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 37,   code: '1004' }] },
  // Rectangular
  { id: 'r-40x20',  shape: 'rect', label: '1½ × ¾',   labelMm: '40 × 20 mm',   variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 7.5,  code: '426' }, { gauge: 18, thicknessMm: 1.2, weightKg: 6.5,  code: '428' }] },
  { id: 'r-50x25',  shape: 'rect', label: '2 × 1',    labelMm: '50 × 25 mm',   variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 9.5,  code: '526' }, { gauge: 18, thicknessMm: 1.2, weightKg: 8.5,  code: '528' }] },
  { id: 'r-60x40',  shape: 'rect', label: '2½ × 1½',  labelMm: '60 × 40 mm',   variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 13,   code: '646' }, { gauge: 18, thicknessMm: 1.2, weightKg: 11,   code: '648' }] },
  { id: 'r-75x25',  shape: 'rect', label: '3 × 1',    labelMm: '75 × 25 mm',   variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 13,   code: '726' }, { gauge: 18, thicknessMm: 1.2, weightKg: 11,   code: '728' }] },
  { id: 'r-80x40',  shape: 'rect', label: '3 × 1½',   labelMm: '80 × 40 mm',   variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 15.5, code: '846' }, { gauge: 18, thicknessMm: 1.2, weightKg: 13,   code: '848' }] },
  { id: 'r-100x25', shape: 'rect', label: '4 × 1',    labelMm: '100 × 25 mm',  variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 16.5, code: '926' }, { gauge: 18, thicknessMm: 1.2, weightKg: 15,   code: '928' }] },
  { id: 'r-100x50', shape: 'rect', label: '4 × 2',    labelMm: '100 × 50 mm',  variants: [{ gauge: 16, thicknessMm: 1.4, weightKg: 19.5, code: '156' }, { gauge: 18, thicknessMm: 1.2, weightKg: 16.5, code: '158' }] },
];
