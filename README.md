# SK COLLECTION — Black & Gold Luxury Fashion Website

A fully functional premium men's fashion e-commerce site built with
React + TypeScript + Vite + Tailwind CSS, following the Black + Gold
luxury design system.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## What's implemented

- Sticky header with search, wishlist, cart, and WhatsApp icons; mobile
  slide-in menu
- Cinematic hero with staged fade-up/zoom animations
- Trust bar, shop-by-style categories, featured products, about,
  reviews, and store location sections
- Full shop page with category + status filters and sorting
- Product details page with image gallery, color/size/quantity
  selectors, and validation
- Cart drawer + full cart page, both backed by `localStorage` so the
  cart and wishlist survive a refresh
- Checkout flow: delivery details form (with validation) → order
  review → **Confirm & Order via WhatsApp**, which opens WhatsApp
  with a pre-filled, URL-encoded order message to
  **+91 86081 09013**
- Wishlist page
- Floating WhatsApp button with a subtle pulse
- Toast notifications (e.g. "Added to cart")
- Basic SEO: meta tags, Open Graph/Twitter tags, canonical URL,
  `robots.txt`, `sitemap.xml`

## Before you launch — replace these placeholders

1. **Product photography.** `src/data/products.ts` currently uses
   `picsum.photos` placeholder images (3 per product) so the site is
   fully browsable out of the box. Swap each `images` array for real
   product photos.
2. **Category images.** `src/components/CategorySection.tsx` has a
   `CATEGORY_IMAGES` map — replace with real category photography.
3. **Hero and About images.** `src/components/Hero.tsx` and
   `src/components/AboutSection.tsx` use placeholder photos too.
4. **Google Reviews.** `src/data/reviews.ts` is a placeholder — the
   brief requires only real reviews, so pull the actual text/names
   from the SK COLLECTION Google Business listing and replace the
   `sampleReviews` array before launch. Don't ship invented reviews.
5. **Domain.** `index.html`, `public/robots.txt`, and
   `public/sitemap.xml` use `skcollection.example.com` — swap in the
   real domain once you have one.
6. **WhatsApp number.** Already set to `+91 86081 09013` in
   `src/utils/whatsapp.ts` (`STORE_WHATSAPP_NUMBER`) — update there if
   it ever changes.

## Notes

- No payment gateway is included, per the brief — checkout ends with
  a WhatsApp handoff and "payment arranged directly with the store."
- Cart and wishlist persist via `localStorage` (client-side only,
  per-browser).
- Product data lives in one file (`src/data/products.ts`) — add more
  products there; nothing is hard-coded in the UI components.
- This project wasn't run through `npm install`/`npm run build` in
  the environment that generated it (no network access there), so do
  a quick `npm run build` locally after installing to confirm
  everything compiles cleanly — the code has been manually checked
  for import/export and structural consistency.
