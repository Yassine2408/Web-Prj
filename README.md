# Atlas Web Studio - Marketing Website (Morocco)

Production-grade bilingual (FR/AR) marketing website for a Morocco-based web studio.

## Stack

- Next.js 16 (App Router) + TypeScript + React 19
- TailwindCSS v4 + shadcn-style UI components
- `react-hook-form` + `zod`
- Light animations with `framer-motion`
- CMS-ready with Sanity schemas (`cms/sanity/`)
- WhatsApp-first lead capture + email fallback (Resend)
- SEO foundations: metadata, OpenGraph, JSON-LD, `sitemap`, `robots`

## Run locally

1. Install dependencies:
   - `npm install`
2. Copy env file:
   - `cp .env.example .env.local`
3. Start dev server:
   - `npm run dev`
4. Open `http://localhost:3000`

## Required env vars

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_LOGO_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_PHONE_NUMBER`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `RESEND_API_KEY`
- `CONTACT_EMAIL_TO`
- `CONTACT_EMAIL_FROM`

## Content model (CMS)

Sanity schemas are in:

- `cms/sanity/schemaTypes/service.ts`
- `cms/sanity/schemaTypes/caseStudy.ts`
- `cms/sanity/schemaTypes/testimonial.ts`
- `cms/sanity/schemaTypes/faq.ts`
- `cms/sanity/schemaTypes/blogPost.ts`

Sample seed content:

- `cms/sanity/seed.example.ndjson`

Sanity setup quick steps:

1. Create Sanity project and dataset.
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
3. Keep fallback content working while CMS is not connected.
4. Import seed with:
   - `npx sanity dataset import cms/sanity/seed.example.ndjson production`

## Deployment (Cloudflare preferred)

Recommended path:

1. Push repo to GitHub.
2. Connect project to Cloudflare Pages.
3. Build command: `npm run build`
4. Output: `.next` (if using adapterless Pages static+SSR strategy in your pipeline) or use your Next.js Cloudflare Worker adapter workflow.
5. Add environment variables in Cloudflare dashboard.
6. Configure custom domain (`.ma`) in Cloudflare DNS.

Optional Vercel deployment also works out of the box.

## Zaraz analytics + consent

- Consent UI is implemented in `components/cookie-consent.tsx`
- Zaraz consent sync helper is in `components/zaraz-consent-sync.tsx`
- Configure GA4 / pixels from Cloudflare Zaraz dashboard
- Respect local consent state (`analytics-consent`) before sending analytics

## Morocco-specific notes included in site copy

- `.ma` ccTLD guidance via ANRT-accredited registrars
- Payment integrations: CMI (Maroc Telecommerce), NAPS, Payzone, COD
- WhatsApp-first ordering patterns
- Local SEO focus: Google Business Profile, Maps, citations, reviews
- Kénitra-first positioning with online service model

## Brand logo setup

1. Put your selected logo in `public/logo/atlas-logo.png`
2. Set `NEXT_PUBLIC_LOGO_URL=/logo/atlas-logo.png` in `.env.local`
3. Restart `npm run dev`

## Maintainer notes

- FR default routes are root (`/services`, `/pricing`, etc.)
- Arabic mirrors are under `/ar/*` with RTL layout
- Replace placeholder images in `public/images/` with real project visuals
- Current fallback content is transparent for a new studio (pilot projects, no official clients yet)
