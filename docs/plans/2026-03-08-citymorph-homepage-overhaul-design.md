# CityMorph & Homepage Overhaul — Design Document

**Date:** 2026-03-08
**Branch:** `smokey-v2` on smokey-frontend origin
**Goal:** Rework CityMorph to use real city photography with blur/overlay effects and redesign the homepage with SkyChase album hero, live streams, featured merch, and newsletter.

---

## 1. CityMorph Layer Rework

### Problem

The current CityMorph uses CSS gradients over a single dark skyline silhouette (`skyline.png`). The real NYC night photo (`bg_image.jpg`) and starfield (`stars.png`) aren't used, resulting in flat gradient backgrounds rather than the intended photorealistic blurred cityscape effect.

### New Layer Stack

| Layer | Z | Asset | Sizing | Effect | Animation |
|-------|---|-------|--------|--------|-----------|
| Stars | 0 | `/img/stars.png` | `scale(2.5)`, cover viewport | Dark starfield base | `rotate(360deg)` over 120s, infinite, linear |
| City Photo | 1 | `/img/bg_image.jpg` | `background-size: cover`, centered | `blur(10px)` base, per-condition `hue-rotate`/`brightness`/`saturate` | 10s crossfade with condition transitions |
| Skyline Silhouette | 2 | `/img/skyline.png` | Bottom-anchored, 60% height, repeat-x | Per-condition `brightness`/`contrast` filters | 10s crossfade (same as current) |
| Gradient Overlay | 3 | CSS gradient | Full viewport | Condition-specific color wash | Crossfade with condition transitions |
| Static/Glitch | 4 | `/img/static.gif` | Cover viewport | `opacity: 0.04`, `mix-blend-mode: screen` | Subtle opacity pulse (0.03–0.06) per condition |
| Rain/Fog | 5 | Canvas + radial gradient | Full viewport | Existing rain/fog system | Unchanged |
| Content | 10 | — | — | Site UI on top | — |

### Condition-Specific Filters for City Photo (`bg_image.jpg`)

| Condition | Filter | Notes |
|-----------|--------|-------|
| Dawn | `brightness(0.4) saturate(0.8) hue-rotate(-20deg)` | Warm muted |
| Midday | `brightness(0.7) saturate(1.2)` | Bright, clear |
| Golden Hour | `brightness(0.5) saturate(1.3) hue-rotate(-30deg) sepia(0.3)` | Amber glow |
| Overcast | `brightness(0.3) saturate(0.4)` | Desaturated gray |
| Rain | `brightness(0.2) saturate(0.6) contrast(1.2)` | Dark wet look |
| Neon Night | `brightness(0.3) saturate(1.6) contrast(1.4)` | Punchy neon colors |
| Misty Twilight | `brightness(0.25) saturate(0.7) hue-rotate(20deg)` | Purple haze |
| Stormy | `brightness(0.15) saturate(0.3) contrast(1.3)` | Near-black dramatic |

### Static/Glitch Overlay

- `static.gif` rendered as a full-viewport background layer
- `mix-blend-mode: screen` so only the bright glitch pixels show through
- Base opacity `0.04` — barely visible, adds texture
- Opacity varies slightly per condition (stormy: 0.06 for more visual noise, midday: 0.03 for cleaner look)

### Performance

- All layers use CSS `transform`, `filter`, `opacity` — GPU-accelerated
- Stars rotation is a single CSS `@keyframes` animation
- No additional JS animation loops for background layers
- `static.gif` is small (452KB) and handled natively by browser
- Existing `will-change` and `transition` patterns preserved

---

## 2. Homepage Redesign

### Layout (top to bottom, all over CityMorph backdrop)

#### Section 1: SkyChase Hero

Full viewport height, centered content.

- Smokey FM logo (small, above album art)
- `SkyChase-Watermark.jpg` album art — 400px desktop, 280px mobile
- Subtle `box-shadow` glow that adapts to current CityMorph condition color
- Album title "Sky Chase" + artist "Watermark" in JamesFajardo display font
- Two CTAs:
  - "Listen Now" — queues album in SmokeyBox player
  - "Buy" — links to product detail page on Spree (by slug)
- Scroll indicator at bottom (subtle gradient line)

#### Section 2: Live Streams

Glass card section. **Conditionally rendered — hidden if no streams exist.**

- Data from `useStreams` hook (Spree `/api/v1/live_stream` endpoint)
- Per stream: glass card with title, description, "Watch Live" button
- Pulsing red LED indicator for active streams
- Links to `/tv/[streamId]`

#### Section 3: Featured Merch

Glass card section.

- "Merch & Swag" heading
- Product grid from `useProducts` — 4-6 items
- Each card: product image, name, price, "Add to Cart" or "View" CTA
- "Shop All" link to `/browse`
- Uses existing `ProductCard` component with glass styling

#### Section 4: Newsletter

Glass card section.

- "Stay in the Loop" heading
- `NotifyForm` component (GoHighLevel integration, already built)
- Social links row below (existing `SocialLinks` component)

### Removed from Current Homepage

- "Now Playing" card — redundant, SmokeyBox bar is always visible at bottom
- "Featured Music" section — SkyChase hero replaces this purpose
- Generic hero with just logo + tagline — replaced by album-focused hero

---

## 3. Assets

### Existing (already in repo at `/public/img/`)

- `bg_image.jpg` — Full-color NYC night skyline photo (45KB)
- `stars.png` — Deep space starfield (275KB)
- `skyline.png` — Dark city silhouette (1.8MB)
- `skyline2.png` — Alternate silhouette (1.6MB)
- `static.gif` — Purple/pink TV glitch texture (452KB)

### Restored from main branch

- `public/images/SkyChase-Watermark.jpg` — Album art (277KB)

---

## 4. Files to Modify

| File | Change |
|------|--------|
| `components/CityMorph/CityMorph.tsx` | Rework layer stack: add stars, bg_image, static layers |
| `components/CityMorph/conditions.ts` | Add `cityPhotoFilter` and `staticOpacity` per condition |
| `components/Home/StaticHome.tsx` | Replace with SkyChase hero + live streams + merch + newsletter |
| `components/Home/Hero/Hero.tsx` | Rewrite as SkyChase album hero |

---

## Tech Stack (unchanged)

- Next.js 13.1.1 (Pages Router)
- Tailwind CSS 3.4
- React 18.2.0, TypeScript
- Existing CityMorph context/provider system
- Existing SmokeyBox player integration
- Spree Storefront API v2 for products and streams
