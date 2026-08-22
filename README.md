# Marsa Estates — Property Listings & Search

A property rental & sale listings site, built as a portfolio piece to demonstrate multi-field filtering, client-side favorites with plain Redux Toolkit, and a distinct visual identity that doesn't depend on stock photography.

**[Live demo →](#)** _(add your Vercel/Netlify link here after deploying)_

## What it does

- **Listings** — search by name/neighborhood, filter by purpose (sale/rent), property type, neighborhood, and sort by price or recency — all combined server-side style through query params
- **List / Map toggle** — switch between a card grid and a live Leaflet map, with every filtered listing pinned by its actual neighborhood coordinates and a branded price marker instead of a generic pin
- **Listing detail** — full description, amenities, a location map for that single property, and a sticky pricing card
- **Mortgage calculator** — on any for-sale listing, drag down payment, loan term, and interest rate sliders to see the estimated monthly payment recalculate live, using a standard amortization formula
- **Favorites** — heart any listing to save it; favorites persist across the whole session via Redux state and get their own page

## Why these choices

- **A real interactive map, not a placeholder** — `react-leaflet` + OpenStreetMap tiles (free, no API key required) power both the full listings map and the single-property map on the detail page. Markers are custom-styled price tags rather than Leaflet's default pin, so the map matches the site's design language.
- **RTK Query + plain Redux Toolkit, used for what each is good at** — listings and filtering go through `createApi` (server-shaped data, cached by filter combination), while favorites — a piece of pure client state with no server counterpart — use a `createSlice` reducer instead.
- **The mortgage calculator does real math**, not a canned number — it runs the actual amortization formula on every slider change, memoized so it stays smooth, because a client evaluating this project will drag every slider to check.
- **No stock photography** — every listing card uses a gradient plus a hand-drawn architectural line-mark (`BuildingMark` in `ListingCard.jsx`) instead of a placeholder photo.
- **A simulated network layer** (`src/services/api.js`) includes an occasional simulated failure so the empty and error states are real, exercised paths.
- **Editorial typography** (Instrument Serif + Inter) to give the listings a magazine feel rather than a generic SaaS dashboard look.

## Stack

- React 19 + Vite
- Tailwind CSS
- Redux Toolkit (RTK Query + a plain slice for favorites)
- React Router
- Leaflet + React Leaflet (OpenStreetMap tiles)
- Framer Motion
- Lucide icons

## Running locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project structure

```
src/
  app/store.js               Redux store
  app/favoritesSlice.js      Plain Redux Toolkit slice for saved listings
  services/api.js            RTK Query endpoints + simulated network layer
  data/mockDb.js              Generated listings with real neighborhood coordinates
  components/ui/             Reusable primitives (Button, Card, Select, Input...)
  components/layout/         Navbar, Footer
  components/listings/       ListingCard, FilterBar, ListingsMap, MortgageCalculator
  pages/                     Listings, ListingDetail, Favorites
```
