# Motorsport Connector — Early Interest Landing Page

A standalone "Launching soon" pre-register landing page for **Motorsport
Connector**, the workforce platform for motorsport. Its one job is lead
capture: visitors register their interest via an email + role form while the
full platform is being built.

This repository is intentionally separate from the main Motorsport Connector
product/prototype — it exists only to host and deploy the temporary landing
page.

## Features

- Dual-audience toggle (**Employer** / **Contractor · Employee**) that
  re-themes the whole page and swaps copy, feature cards, pricing and FAQ.
- Register-interest form wired to [Web3Forms](https://web3forms.com), with a
  `localStorage` backup and a success state.
- Manual product-screenshot carousel, pricing, FAQ and a rolling promo banner.
- Responsive and respects `prefers-reduced-motion`.

## Stack

- Vite 5 · React 18 · Tailwind 3 · lucide-react

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Deploy to Vercel

1. Push this repository to GitHub (already done if you are reading this here).
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, click
   **Add New → Project**.
3. Select this repository. Vercel auto-detects Vite — leave all defaults
   (Build `npm run build`, Output `dist`).
4. Click **Deploy** and wait ~60 seconds for a `.vercel.app` URL.

## Registrations

Form submissions are sent via Web3Forms using the access key in
`src/EarlyInterestLanding.jsx`. Swap that key to route registrations to a
different inbox/provider.

## Contact

motorsportconnector@gmail.com · [@motorsportconnector](https://www.instagram.com/motorsportconnector)
