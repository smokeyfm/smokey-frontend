# Smokey FM v2 — Design Document

**Date:** 2026-03-07
**Approach:** Direct reskin of dna-frontend (Next.js 13 + Tailwind + Spree)
**Branch:** `smokey-v2` on smokey-frontend origin
**Goal:** Full eCommerce + AV player launch, flip off coming soon mode at smokey.fm

---

## 1. Foundation

Copy dna-frontend codebase wholesale into new `smokey-v2` branch on smokey-frontend origin.

**Rebrand:**

- Site title → "SmokeyFM"
- Site URL → https://smokey.fm
- Logos, favicons, OG images → Smokey FM assets
- Social links → smokey.fm (IG), _smokeyfm_ (Twitter), smokeyrecords.co (FB), @smokeyrecords (YT)
- Spree API → https://admin-staging.smokey.fm

**Remove:**

- Kontent AI CMS integration
- Wholesale/B2B product views

**Keep:**

- Full eCommerce: cart, multi-step checkout, Stripe payments, accounts, favorites, order history, address management, coupon system
- Live streaming: Mux-powered HLS, StreamViewer with chat + in-stream checkout
- Auth: login, signup, password reset, session management
- Mailchimp newsletter integration
- Google Analytics

---

## 2. SmokeyBox — Dual-Mode AV Player

### Modes

**Simultaneous (default):**

- Muted YouTube video plays visuals (music videos, live footage, visuals) in a loop
- SoundCloud playlist provides audio independently in a loop
- Both cycle independently, creating an ever-evolving audiovisual mashup
- Minimal overlay: current track name, artist, play/pause, volume knob, next/prev

**Single-source:**

- Full YouTube with audio (unmutes video, pauses SoundCloud)
- Or SoundCloud-only with album art / waveform visualization
- Toggle back to simultaneous anytime

### Skeuomorphic UI

- **Body:** dark brushed metal / matte black surface with subtle depth (CSS box-shadow + gradients)
- **Knobs:** rotatable volume and seek knobs with `conic-gradient` + drag interaction, tactile grooves via repeating radial gradients
- **Indicators:** LED-style dots — green glow (playing), amber (mode), red pulse (live stream)
- **Glass:** frosted glass panel (`backdrop-filter: blur`) over track info / now-playing area
- **Transport controls:** embossed play/pause/skip buttons with pressed states (inset shadows on click)
- **VU meter:** animated level meter responding to audio via Web Audio API `AnalyserNode` for real frequency data

### Layout

- Docked to bottom of viewport, persistent across all page navigation
- **Collapsed:** slim bar with track info + basic controls + volume knob
- **Expanded:** full panel with YouTube video visible, VU meters, playlist browser
- Lives in `_app.tsx` layout via `PlayerProvider` context

### Tech

- `react-player` for YouTube (muted, loop, playlist mode)
- `react-audio-player` + `soundcloud.ts` for SoundCloud audio
- Web Audio API `AnalyserNode` for VU meter frequency data
- `PlayerProvider` React context for state: current track, mode, volume, play state, playlist queue

---

## 3. CityMorph — Living Theme System

### Concept

The site background is a photorealistic layered cityscape that slowly, continuously morphs between atmospheric conditions. The entire site lives on top of this breathing city.

### Conditions

| Condition      | Palette                                          | Mood                 |
| -------------- | ------------------------------------------------ | -------------------- |
| Dawn           | soft pinks/oranges, cool shadows                 | Quiet, fresh         |
| Midday         | bright, high contrast, clear sky                 | Energetic            |
| Golden Hour    | warm amber, long shadows, lens flare             | Warm, nostalgic      |
| Overcast       | muted grays, flat light                          | Moody, introspective |
| Rain           | wet reflections, dark clouds, rain streaks       | Atmospheric          |
| Neon Night     | deep blues/blacks, neon glow, puddle reflections | Electric, urban      |
| Misty Twilight | purple haze, diffused lights, silhouettes        | Dreamy               |
| Stormy         | dramatic clouds, subtle lightning                | Intense              |

### Layers

1. **Sky layer** — gradient + cloud image, shifts color per condition
2. **Skyline layer** — building silhouettes, adjusts brightness/contrast
3. **Street layer** — ground level, adds reflections in wet conditions
4. **Atmospheric overlay** — fog, rain, particles, lens effects
5. **Content** — site UI on top with adaptive transparency

### Behavior

- Random condition on page load
- Smooth crossfade to next condition every 60-90 seconds
- Transitions take ~10 seconds (slow, not jarring)
- UI elements adapt contrast/glow to current condition (more text-shadow glow at night, subdued in daylight)

### Performance

- Pure CSS transforms/filters on layered images — GPU accelerated
- `mix-blend-mode`, `filter` (brightness, hue-rotate, saturate), gradient overlays
- Canvas overlay only for rain/particles — lightweight
- No Three.js required
- Lazy load condition-specific overlays

---

## 4. Pages & Navigation

### Header

Slim semi-transparent bar over CityMorph backdrop. Adapts opacity/blur to current theme condition.

**Nav items:** Music | Shop | Live | About | Account | Cart (badge) | Favorites (heart) | Search

### Routes

| Page           | Route                           | Description                                                                                                                                                                                                                                     |
| -------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage       | `/`                             | CityMorph backdrop, floating logo, featured releases + merch, live stream banner, SmokeyBox always present                                                                                                                                      |
| Music          | `/music`                        | Dedicated music experience — browse releases, albums, singles. Listen (queue in SmokeyBox) or Buy (vinyl/CD/digital). SoundCloud playlist integration, featured artists, new releases carousel. Filter by format, genre, new releases, featured |
| Shop           | `/browse`                       | Merch & swag — tees, hoodies, hats, accessories. Frosted glass product cards, category filters                                                                                                                                                  |
| Product Detail | `/[productSlug]`                | Full variant/image/favorites from dna-frontend. Music products get embedded player preview + "Listen" button                                                                                                                                    |
| Live           | `/tv/[streamId]`                | Full StreamViewer with chat + in-stream checkout. CityMorph holds at "neon night" condition during streams                                                                                                                                      |
| Cart           | `/cart`                         | From dna-frontend, restyled with frosted glass + skeuomorphic buttons                                                                                                                                                                           |
| Checkout       | `/checkout`                     | Multi-step wizard with Stripe, restyled                                                                                                                                                                                                         |
| Thank You      | `/thank-you`                    | Order confirmation                                                                                                                                                                                                                              |
| Account        | `/account`                      | Dashboard with quick links                                                                                                                                                                                                                      |
| Orders         | `/account/orders`               | Order history with pagination                                                                                                                                                                                                                   |
| Order Detail   | `/account/orders/[orderNumber]` | Individual order                                                                                                                                                                                                                                |
| Favorites      | `/account/favorites`            | Saved items / wishlist                                                                                                                                                                                                                          |
| Login          | `/login`                        | Auth                                                                                                                                                                                                                                            |
| Signup         | `/signup`                       | Registration                                                                                                                                                                                                                                    |
| Reset Password | `/reset-password`               | Password recovery                                                                                                                                                                                                                               |
| About          | `/about`                        | Company info                                                                                                                                                                                                                                    |
| Terms          | `/terms`                        | Terms of service                                                                                                                                                                                                                                |
| Privacy        | `/privacy`                      | Privacy policy                                                                                                                                                                                                                                  |

### Music Page Specifics

- Grid/list of releases with album art, title, artist, format indicators (vinyl/CD/digital)
- Click album art → queue in SmokeyBox for instant listen
- Buy button → add to cart / link to product detail for variant selection
- Pulls music-tagged products from Spree + SoundCloud playlists for streaming

---

## 5. Deployment

1. Deploy `smokey-v2` branch to `smokey-frontend-staging` on Heroku
2. Verify Spree API connection to `smokey-admin-staging`
3. Test full checkout flow with Stripe test keys
4. Set `NEXT_PUBLIC_IS_MAINT_MODE=false`
5. smokey.fm goes live

---

## Tech Stack (Final)

| Layer      | Technology                                           |
| ---------- | ---------------------------------------------------- |
| Framework  | Next.js 13.1.1                                       |
| UI         | React 18.2.0, TypeScript                             |
| Styling    | Tailwind CSS 3.4 + Emotion (where needed)            |
| Components | shadcn/ui, Radix UI, Lucide icons                    |
| State      | React Query 3.6, Recoil, React Context               |
| eCommerce  | Spree Storefront API v2 SDK (custom local build)     |
| Payments   | Stripe (@stripe/stripe-js + @stripe/react-stripe-js) |
| Video      | react-player, Video.js, Mux HLS                      |
| Audio      | react-audio-player, soundcloud.ts, Web Audio API     |
| Animations | Framer Motion, React Spring                          |
| Forms      | Formik + Yup                                         |
| Search     | Fuse.js                                              |
| Email      | Mailchimp Marketing API                              |
| Analytics  | Google Analytics 4                                   |
| Deployment | Heroku                                               |
