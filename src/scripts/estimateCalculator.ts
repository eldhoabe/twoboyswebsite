type Brand = 'normal' | 'apollo';

interface RowState {
  gauge: 16 | 18;
  qty: number;
}

const BRAND_KEY   = 'twoboys_brand';
const RATE_PREFIX = 'twoboys_rate_';
const BULK_KG     = 950;

export function initEstimateCalculator(root: HTMLElement): void {
  const rows          = Array.from(root.querySelectorAll<HTMLElement>('[data-row]'));
  const brandBtns     = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-brand]'));
  const rateInput     = root.querySelector<HTMLInputElement>('[data-rate-input]');
  const rateBrandEl   = root.querySelector<HTMLElement>('[data-rate-brand]');
  const totalsSection = root.querySelector<HTMLElement>('[data-totals-section]');
  const grandTotalEl  = root.querySelector<HTMLElement>('[data-grand-total]');
  const quickInfoEl   = root.querySelector<HTMLElement>('[data-quick-info]');
  const bulkNoticeEl  = root.querySelector<HTMLElement>('[data-bulk-notice]');
  const whatsappBtn   = root.querySelector<HTMLAnchorElement>('[data-whatsapp-btn]');
  const pdfBtn        = root.querySelector<HTMLButtonElement>('[data-pdf-btn]');
  const printSummary  = root.querySelector<HTMLElement>('[data-print-summary]');

  if (rows.length === 0 || !rateInput) return;

  const state = new Map<string, RowState>();
  rows.forEach((row) => {
    const id = row.dataset.sizeId;
    if (id) state.set(id, { gauge: 16, qty: 0 });
  });

  let brand: Brand = (sessionStorage.getItem(BRAND_KEY) as Brand) ?? 'normal';

  function rate(): number { return parseFloat(rateInput!.value) || 0; }

  function fmt(n: number): string {
    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function loadRateForBrand(): void {
    const saved = sessionStorage.getItem(RATE_PREFIX + brand);
    rateInput!.value = saved ?? '';
  }

  function syncBrandUi(): void {
    brandBtns.forEach((b) => b.classList.toggle('active', b.dataset.brand === brand));
    if (rateBrandEl) {
      rateBrandEl.textContent = brand === 'apollo' ? '(Apollo A)' : '(Normal)';
    }
  }

  function rowWeight(row: HTMLElement, gauge: 16 | 18): number {
    const btn = row.querySelector<HTMLButtonElement>(`[data-gauge="${gauge}"]`);
    return parseFloat(btn?.dataset.weight ?? '0') || 0;
  }

  function setQty(row: HTMLElement, next: number): void {
    const id = row.dataset.sizeId;
    if (!id) return;
    const s = state.get(id);
    if (!s) return;

    const clamped = Math.max(0, Math.floor(next));
    s.qty = clamped;

    const input = row.querySelector<HTMLInputElement>('[data-qty]');
    if (input && document.activeElement !== input) input.value = String(clamped);

    row.classList.toggle('has-qty', clamped > 0);
    recompute();
  }

  function setGauge(row: HTMLElement, gauge: 16 | 18): void {
    const id = row.dataset.sizeId;
    if (!id) return;
    const s = state.get(id);
    if (!s) return;

    s.gauge = gauge;
    row.querySelectorAll<HTMLButtonElement>('[data-gauge]').forEach((btn) => {
      btn.classList.toggle('active', parseInt(btn.dataset.gauge ?? '', 10) === gauge);
    });
    recompute();
  }

  function setBrand(next: Brand): void {
    brand = next;
    sessionStorage.setItem(BRAND_KEY, brand);
    syncBrandUi();
    loadRateForBrand();
    recompute();
  }

  function recompute(): void {
    const r = rate();
    let grand = 0;
    let totalKg = 0;
    let totalPieces = 0;
    let lineCount = 0;

    rows.forEach((row) => {
      const id = row.dataset.sizeId;
      if (!id) return;
      const s = state.get(id);
      if (!s || s.qty <= 0) return;
      lineCount += 1;
      totalPieces += s.qty;
      const w = rowWeight(row, s.gauge);
      totalKg += w * s.qty;
      grand   += w * r * s.qty;
    });

    const show = r > 0 && lineCount > 0;
    if (totalsSection) totalsSection.hidden = !show;
    if (show && grandTotalEl) grandTotalEl.textContent = fmt(grand);

    if (show && quickInfoEl) {
      const kg = totalKg.toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      const parts = [
        `${kg} kg`,
        `${totalPieces} piece${totalPieces !== 1 ? 's' : ''}`,
        `${lineCount} size${lineCount !== 1 ? 's' : ''}`,
      ];
      quickInfoEl.innerHTML = ''; // clear
      quickInfoEl.textContent = parts.join(' · ');
      if (brand === 'apollo') {
        const badge = document.createElement('span');
        badge.className = 'a-mark';
        badge.textContent = 'A';
        badge.title = 'Apollo';
        quickInfoEl.append(' · ', badge);
      }
    }

    if (bulkNoticeEl) bulkNoticeEl.hidden = !(show && totalKg > BULK_KG);

    if (show) syncWhatsApp(grand, totalKg, totalPieces);
  }

  function syncWhatsApp(grand: number, totalKg: number, totalPieces: number): void {
    if (!whatsappBtn) return;
    const r     = rate();
    const phone = whatsappBtn.dataset.phone ?? '';
    const brandTag = brand === 'apollo' ? 'Apollo (A)' : 'Normal';
    const lines: string[] = [
      `*Square Tube Estimate — Two Boys Shop*`,
      `Brand: ${brandTag}`,
      `Rate: ₹${r}/kg`,
      ``,
    ];

    let n = 0;
    rows.forEach((row) => {
      const id = row.dataset.sizeId;
      if (!id) return;
      const s = state.get(id);
      if (!s || s.qty <= 0) return;

      const label = row.dataset.sizeLabel ?? '';
      const mm    = row.dataset.sizeMm ?? '';
      const w     = rowWeight(row, s.gauge);
      n += 1;
      lines.push(
        `${n}. ${label} in (${mm}), ${s.gauge} Gauge`,
        `   ${w} kg/pc × ${s.qty} pc${s.qty !== 1 ? 's' : ''} = ${fmt(w * r * s.qty)}`,
      );
    });

    const kg = totalKg.toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    lines.push(
      ``,
      `*Total: ${fmt(grand)}*`,
      `${kg} kg · ${totalPieces} piece${totalPieces !== 1 ? 's' : ''}`,
    );

    if (totalKg > BULK_KG) {
      lines.push(`*Eligible for bulk discount* — please suggest a better rate.`);
    }

    lines.push(
      `_Estimate only — confirm final pricing with the shop._`,
      ``,
      `_Generated from our website calculator — twoboys.co.in/estimate_`,
    );
    whatsappBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  // Wire brand buttons
  brandBtns.forEach((btn) => {
    btn.addEventListener('click', () => setBrand(btn.dataset.brand as Brand));
  });

  // Wire rows
  rows.forEach((row) => {
    const id = row.dataset.sizeId;
    if (!id) return;

    row.querySelectorAll<HTMLButtonElement>('[data-gauge]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const g = parseInt(btn.dataset.gauge ?? '16', 10) as 16 | 18;
        setGauge(row, g);
      });
    });

    const qtyInput = row.querySelector<HTMLInputElement>('[data-qty]');
    row.querySelectorAll<HTMLButtonElement>('[data-step]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const s = state.get(id);
        if (!s) return;
        const delta = btn.dataset.step === 'plus' ? 1 : -1;
        setQty(row, s.qty + delta);
      });
    });

    if (qtyInput) {
      qtyInput.addEventListener('input', () => {
        const raw = qtyInput.value.replace(/[^0-9]/g, '');
        setQty(row, parseInt(raw, 10) || 0);
      });
      qtyInput.addEventListener('focus', () => qtyInput.select());
      qtyInput.addEventListener('blur', () => {
        const s = state.get(id);
        qtyInput.value = String(s?.qty ?? 0);
      });
    }
  });

  // Rate — saves per brand so switching brands preserves each rate
  rateInput.addEventListener('input', () => {
    sessionStorage.setItem(RATE_PREFIX + brand, rateInput!.value);
    recompute();
  });

  // PDF button — build print summary from current state, then invoke print
  pdfBtn?.addEventListener('click', () => {
    if (!printSummary) return;
    buildPrintSummary();
    window.print();
  });

  function buildPrintSummary(): void {
    if (!printSummary) return;
    const r = rate();
    const brandTag = brand === 'apollo' ? 'Apollo (A)' : 'Normal';
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });

    let grand = 0;
    let totalKg = 0;
    let totalPieces = 0;
    const itemRows: string[] = [];

    let n = 0;
    rows.forEach((row) => {
      const id = row.dataset.sizeId;
      if (!id) return;
      const s = state.get(id);
      if (!s || s.qty <= 0) return;
      n += 1;
      const label = row.dataset.sizeLabel ?? '';
      const mm    = row.dataset.sizeMm ?? '';
      const w     = rowWeight(row, s.gauge);
      const sub   = w * r * s.qty;
      grand += sub;
      totalKg += w * s.qty;
      totalPieces += s.qty;
      itemRows.push(`
        <tr>
          <td>${n}</td>
          <td>${label} in <br/><span style="font-size:10px;color:#666">${mm}</span></td>
          <td>${s.gauge}G</td>
          <td class="num">${w} kg</td>
          <td class="num">${s.qty}</td>
          <td class="num">${fmt(w * r)}</td>
          <td class="num">${fmt(sub)}</td>
        </tr>
      `);
    });

    const kg = totalKg.toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    const bulkHtml = totalKg > BULK_KG
      ? `<div class="p-bulk"><strong>Eligible for bulk discount</strong> — this order exceeds 950 kg. Please ask the shop for a better rate.</div>`
      : '';

    printSummary.innerHTML = `
      <div class="p-header">
        <p class="p-shop">Two Boys Shop</p>
        <p class="p-meta">
          Pathanamthitta-Melevettipuram Rd, Vettipuram, Pathanamthitta, Kerala 689645<br/>
          +91 98466 63890 &nbsp;·&nbsp; Monday – Saturday, 8 am – 5:30 pm
        </p>
      </div>

      <h2 class="p-title">Square Tube Estimate</h2>
      <p class="p-info">
        <strong>Date:</strong> ${today}<br/>
        <strong>Brand:</strong> ${brandTag}<br/>
        <strong>Rate:</strong> ₹${r}/kg<br/>
        <strong>Length:</strong> 20 ft / 6 m per piece
      </p>

      <table class="p-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Size</th>
            <th>Gauge</th>
            <th class="num">Weight/pc</th>
            <th class="num">Qty</th>
            <th class="num">Price/pc</th>
            <th class="num">Subtotal</th>
          </tr>
        </thead>
        <tbody>${itemRows.join('')}</tbody>
      </table>

      <div class="p-totals">
        <div style="display:flex;justify-content:space-between;">
          <span>Total weight</span><span>${kg} kg</span>
        </div>
        <div style="display:flex;justify-content:space-between;">
          <span>Total pieces</span><span>${totalPieces}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:8px;padding-top:8px;border-top:1px solid #ccc;">
          <span class="grand">Total estimate</span><span class="grand">${fmt(grand)}</span>
        </div>
      </div>

      ${bulkHtml}

      <p class="p-note">
        Estimate only — confirm final pricing with the shop.<br/>
        Generated from twoboys.co.in/estimate
      </p>
    `;
  }

  // Boot
  syncBrandUi();
  loadRateForBrand();
  recompute();
}
