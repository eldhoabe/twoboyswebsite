# TwoBoys Hardware — landing page

Astro + TypeScript build of the hardware shop landing page.

## Structure

```
src/
  config/site.ts         Shop name, address, WhatsApp number, opening hours —
                        edit this file to rebrand or update contact details.
  content.config.ts      Content collection schema (zod) for src/content/products/.
  content/products/*.md  One markdown file per product category (Cement, Steel,
                        Roofing sheets, GI/GP pipes) — structured frontmatter
                        + free-form body copy, rendered by ProductCatalog.astro.
  data/stages.ts          The four-stage build story + brand list (content,
                        no markup) — add a stage or brand here.
  data/steelBrands.ts     Spec data for the interactive steel selector.
  data/trustPoints.ts     The three "why trust us" facts under the hero.
  components/             One component per section. Icons live in
                        components/icons/. LocalBusinessSchema.astro emits
                        JSON-LD; StoreMap.astro embeds Google Maps.
  scripts/               Typed client-side behaviour (scroll reveal,
                        steel selector), imported by the components
                        that use them rather than left as inline <script>.
  layouts/Layout.astro    Shared <head>, meta tags, JSON-LD schema, skip link.
  pages/index.astro      Composes the components into the page.
```

## Key features

- **Local SEO schema** — `LocalBusinessSchema.astro` renders schema.org
  `HardwareStore` JSON-LD (name, address, phone, opening hours, service
  area) in every page's `<head>`, generated entirely from `site.ts`.
  Validate with [Google's Rich Results Test](https://search.google.com/test/rich-results)
  once the site is live.
- **Google Maps embed** — `StoreMap.astro` embeds a lazy-loaded iframe
  built from the address in `site.ts`, no API key required. The "Get
  directions" button still links out to the real Google Maps listing.
- **Product catalog via Content Collections** — `ProductCatalog.astro`
  reads `src/content/products/*.md` through Astro's Content Layer API.
  The zod schema in `content.config.ts` means a malformed category
  file fails `astro build`/`astro check` instead of shipping broken
  data. Add a fifth category by dropping in a new markdown file with
  the same frontmatter shape.

## Commands

| Command          | Action                                      |
| ----------------- | -------------------------------------------- |
| `npm install`      | Install dependencies                          |
| `npm run dev`       | Start local dev server                        |
| `npm run build`     | Type-check + build static site to `dist/`     |
| `npm run preview`   | Preview the production build locally          |
| `npm run check`     | Run Astro's type checker on its own           |

## Before publishing

- [x] Real address and phone/WhatsApp number are wired into `src/config/site.ts`
- [x] Shop name confirmed — "Two Boys Shop"
- [x] Confirm exact opening/closing times — `Mo-Sa 08:00-17:30` (Mon–Sat, 8 am–5:30 pm)
- [ ] Swap the stock hero and steel photos in `src/components/Hero.astro` /
      `src/components/SteelSelector.astro` for real shop or project photos
- [ ] Verify the JSW / Tata Steel / Metcon TMT grade and placement copy in
      `src/data/steelBrands.ts` against the brands' actual technical
      data sheets — it's currently illustrative
- [ ] Set `site` in `astro.config.mjs` to the real production domain
      (also used as the `url` field in the JSON-LD schema)
- [ ] After deploying, validate the structured data with
      [Google's Rich Results Test](https://search.google.com/test/rich-results)
