import type { SteelBrandSpec } from '../data/steelBrands';

/**
 * Wires up the interactive steel-skeleton widget: clicking a brand
 * button highlights the matching structural members in the SVG and
 * swaps the spec copy. Reads its data from JSON embedded by the Astro
 * component (see SteelSelector.astro) rather than duplicating the
 * brand list in this script, so src/data/steelBrands.ts stays the
 * single source of truth.
 */
export function initSteelSelector(root: HTMLElement): void {
  const dataEl = root.querySelector<HTMLScriptElement>('[data-steel-specs]');
  const specPanel = root.querySelector<HTMLElement>('[data-spec-panel]');
  const buttons = root.querySelectorAll<HTMLButtonElement>('[data-brand-button]');

  if (!dataEl || !specPanel || buttons.length === 0) return;

  let specs: SteelBrandSpec[];
  try {
    specs = JSON.parse(dataEl.textContent ?? '[]') as SteelBrandSpec[];
  } catch {
    return;
  }

  const highlightable = root.querySelectorAll<SVGElement>('[id^="line-"], [id^="fill-"]');

  function applyBrand(brandId: string): void {
    const spec = specs.find((s) => s.id === brandId);
    if (!spec || !specPanel) return;

    highlightable.forEach((el) => el.classList.remove('hot'));
    spec.highlightIds.forEach((id) => {
      const el = root.querySelector<SVGElement>(`#${id}`);
      el?.classList.add('hot');
    });

    specPanel.innerHTML = `
      <div><strong>${spec.grade}</strong></div>
      <div style="margin-top:10px;">Used mainly in: <strong>${spec.usedIn}</strong></div>
      <div class="muted">Illustrative — confirm exact grade and placement with your structural engineer or site supervisor.</div>
    `;
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      const brandId = button.dataset.brandButton;
      if (brandId) applyBrand(brandId);
    });
  });

  const initial = specs[0]?.id;
  if (initial) applyBrand(initial);
}
