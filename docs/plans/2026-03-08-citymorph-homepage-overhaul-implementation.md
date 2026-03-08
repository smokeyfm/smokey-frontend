# CityMorph & Homepage Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rework CityMorph to use real city photography (bg_image.jpg, stars.png) with blur/overlay/glitch effects, and redesign the homepage with SkyChase album hero, live streams, featured merch, and newsletter.

**Architecture:** Modify the existing CityMorph component to add new background layers (stars with rotation, city photo with blur + per-condition filters, static.gif glitch overlay) while preserving the condition cycling system. Rewrite the homepage Hero and StaticHome to feature the SkyChase Watermark album with listen/buy CTAs, conditional live streams from Spree, featured merch products, and newsletter signup.

**Tech Stack:** Next.js 13.1.1, React 18.2.0, TypeScript, Tailwind CSS 3.4, Spree Storefront API v2, existing CityMorph context/provider system, existing SmokeyBox player integration.

---

## Task 1: Add cityPhotoFilter and staticOpacity to CityCondition

**Files:**
- Modify: `components/CityMorph/conditions.ts`

**Step 1: Update the CityCondition interface**

Add two new fields to the interface:

```typescript
export interface CityCondition {
  name: string;
  skyGradient: string;
  skylineFilter: string;
  streetFilter: string;
  overlayColor: string;
  overlayOpacity: number;
  textGlow: string;
  hasRain: boolean;
  hasFog: boolean;
  cityPhotoFilter: string;
  staticOpacity: number;
}
```

**Step 2: Add cityPhotoFilter and staticOpacity to each condition**

Add the following values to each condition object in the `conditions` array:

| Condition      | cityPhotoFilter                                                | staticOpacity |
|----------------|----------------------------------------------------------------|---------------|
| dawn           | `brightness(0.4) saturate(0.8) hue-rotate(-20deg) blur(10px)` | 0.03          |
| midday         | `brightness(0.7) saturate(1.2) blur(10px)`                    | 0.03          |
| golden-hour    | `brightness(0.5) saturate(1.3) hue-rotate(-30deg) sepia(0.3) blur(10px)` | 0.04 |
| overcast       | `brightness(0.3) saturate(0.4) blur(10px)`                    | 0.04          |
| rain           | `brightness(0.2) saturate(0.6) contrast(1.2) blur(10px)`      | 0.05          |
| neon-night     | `brightness(0.3) saturate(1.6) contrast(1.4) blur(10px)`      | 0.04          |
| misty-twilight | `brightness(0.25) saturate(0.7) hue-rotate(20deg) blur(10px)` | 0.04          |
| stormy         | `brightness(0.15) saturate(0.3) contrast(1.3) blur(10px)`     | 0.06          |

For example, the `dawn` condition becomes:

```typescript
{
  name: "dawn",
  skyGradient: "linear-gradient(180deg, #1a0a2e 0%, #e8918d 40%, #f4c27f 70%, #fef0d5 100%)",
  skylineFilter: "brightness(0.3) contrast(1.2) sepia(0.3)",
  streetFilter: "brightness(0.4) saturate(0.8)",
  overlayColor: "rgba(235, 139, 139, 0.08)",
  overlayOpacity: 0.15,
  textGlow: "0 0 20px rgba(244, 194, 127, 0.3)",
  hasRain: false,
  hasFog: true,
  cityPhotoFilter: "brightness(0.4) saturate(0.8) hue-rotate(-20deg) blur(10px)",
  staticOpacity: 0.03
}
```

Apply the same pattern for all 8 conditions using the table above.

**Step 3: Verify build**

Run: `yarn build`
Expected: Build succeeds with no TypeScript errors.

**Step 4: Commit**

```bash
git add components/CityMorph/conditions.ts
git commit -m "feat: add cityPhotoFilter and staticOpacity to CityMorph conditions"
```

---

## Task 2: Rework CityMorph layer stack

**Files:**
- Modify: `components/CityMorph/CityMorph.tsx`

**Context:** The current CityMorph has: sky gradient → skyline silhouette → fog → rain → color overlay → content. We're inserting three new layers: rotating stars (z-0), blurred city photo (z-[1]), and static/glitch texture (z-[4]). The existing skyline layer moves to z-[2], gradient overlay to z-[3], rain/fog stay at z-[5]/z-[6].

**Step 1: Add stars layer**

Insert as the first layer inside the outer `<div>`, before the sky gradient layers:

```tsx
{/* ===== Stars Layer — slowly rotating starfield ===== */}
<div
  className="fixed inset-0 z-0 overflow-hidden"
  aria-hidden="true"
>
  <div
    className="absolute inset-[-50%] h-[200%] w-[200%]"
    style={{
      backgroundImage: "url(/img/stars.png)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      animation: "spin 120s linear infinite",
    }}
  />
</div>
```

**Step 2: Add city photo layer**

Insert after the stars layer, before the skyline layers. This uses `bg_image.jpg` with per-condition filters from `cityPhotoFilter`:

```tsx
{/* ===== City Photo Layer (current) — real NYC with blur + filters ===== */}
<div
  className="fixed inset-0 z-[1]"
  style={{
    backgroundImage: "url(/img/bg_image.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: currentCondition.cityPhotoFilter,
    opacity: isTransitioning ? 1 - transitionProgress : 1,
  }}
  aria-hidden="true"
/>

{/* ===== City Photo Layer (next — crossfade) ===== */}
{isTransitioning && (
  <div
    className="fixed inset-0 z-[1]"
    style={{
      backgroundImage: "url(/img/bg_image.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: nextCondition.cityPhotoFilter,
      opacity: transitionProgress,
    }}
    aria-hidden="true"
  />
)}
```

**Step 3: Move skyline to z-[2]**

Update the existing skyline layers from `z-[1]` to `z-[2]`. The skyline PNG sits ON TOP of the blurred city photo for depth.

**Step 4: Move gradient overlay to z-[3]**

The existing color overlay divs already use `z-[3]` — no change needed.

**Step 5: Add static/glitch layer**

Insert after the gradient overlay, before rain/fog:

```tsx
{/* ===== Static/Glitch Overlay ===== */}
<div
  className="fixed inset-0 z-[4] pointer-events-none"
  style={{
    backgroundImage: "url(/img/static.gif)",
    backgroundSize: "cover",
    mixBlendMode: "screen",
    opacity: isTransitioning
      ? (1 - transitionProgress) * currentCondition.staticOpacity +
        transitionProgress * nextCondition.staticOpacity
      : currentCondition.staticOpacity,
  }}
  aria-hidden="true"
/>
```

**Step 6: Update rain/fog z-indices**

- Fog overlay: change from `z-[2]` to `z-[5]`
- RainOverlay: ensure it renders at `z-[6]` (check `RainOverlay.tsx` for its positioning — the canvas uses `z-[2]` currently, update to `z-[6]`)

**Step 7: Add spin keyframe to globals.css**

Check if `@keyframes spin` already exists in Tailwind (it does — Tailwind's `animate-spin` uses it). If so, no change needed since we reference it directly in the style prop. If not, add to `styles/globals.css`:

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**Step 8: Verify build**

Run: `yarn build`
Expected: Build succeeds. No TypeScript errors.

**Step 9: Start dev server and visually verify**

Run: `yarn dev`
Verify:
- Stars visible rotating slowly behind everything
- City photo (NYC skyline lit up) visible with blur through conditions
- Skyline silhouette still visible as darker foreground layer
- Static/glitch texture barely visible (very subtle screen blend)
- Condition cycling still works with crossfades
- Rain/fog still render on top of everything

**Step 10: Commit**

```bash
git add components/CityMorph/CityMorph.tsx components/CityMorph/RainOverlay.tsx styles/globals.css
git commit -m "feat: rework CityMorph with stars, city photo, and static/glitch layers"
```

---

## Task 3: Rewrite Hero as SkyChase Album Showcase

**Files:**
- Modify: `components/Home/Hero/Hero.tsx`

**Context:** The hero currently shows just the Smokey FM logo and tagline. Replace it with the SkyChase Watermark album art, album title, and listen/buy CTAs. The hero should use the `useCityMorph` context to adapt the album art glow to the current condition.

**Step 1: Rewrite Hero component**

Replace the contents of `Hero.tsx` with:

```tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ShoppingCart } from "lucide-react";
import { usePlayer } from "@components/SmokeyBox";
import { useCityMorph } from "@components/CityMorph/CityMorphContext";
import { conditions } from "@components/CityMorph/conditions";

const Hero: React.FC = () => {
  const { dispatch } = usePlayer();
  const { conditionOverride } = useCityMorph();

  // Get current condition's text glow for the album art shadow
  const currentCondition = conditionOverride
    ? conditions.find((c) => c.name === conditionOverride) || conditions[0]
    : null;
  const glowColor = currentCondition?.textGlow || "0 0 40px rgba(235,139,139,0.3)";

  const handleListen = () => {
    // Queue SkyChase album in SmokeyBox — dispatches play
    dispatch({ type: "TOGGLE_PLAY" });
    dispatch({ type: "TOGGLE_EXPANDED" });
  };

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-4">
      {/* Small logo */}
      <div className="mb-6 animate-fade-in">
        <Image
          src="/logo.png"
          alt="Smokey FM"
          width={80}
          height={80}
          className="opacity-70"
        />
      </div>

      {/* Album art */}
      <div className="animate-fade-in">
        <Image
          src="/images/SkyChase-Watermark.jpg"
          alt="Sky Chase — Watermark"
          width={400}
          height={400}
          className="rounded-lg shadow-2xl transition-shadow duration-[10s]"
          style={{
            boxShadow: glowColor !== "none" ? glowColor : "0 0 40px rgba(235,139,139,0.3)",
          }}
          priority
        />
      </div>

      {/* Album info */}
      <div className="mt-6 animate-fade-up text-center">
        <h1 className="font-display text-3xl tracking-wide text-white sm:text-4xl">
          Sky Chase
        </h1>
        <p className="mt-1 font-body text-lg text-white/60">Watermark</p>
      </div>

      {/* CTAs */}
      <div className="mt-6 flex animate-fade-up gap-4">
        <button
          onClick={handleListen}
          className="btn-skeuo-primary flex items-center gap-2 px-6 py-3 font-title text-sm font-semibold cursor-pointer"
        >
          <Play className="h-4 w-4" />
          Listen Now
        </button>
        <Link
          href="/sky-chase-watermark"
          className="btn-skeuo flex items-center gap-2 px-6 py-3 font-title text-sm font-semibold no-underline"
        >
          <ShoppingCart className="h-4 w-4" />
          Buy
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 animate-fade-in opacity-40">
        <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/60 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
```

Note: The "Buy" link goes to `/sky-chase-watermark` — this is the expected Spree product slug. If the product doesn't exist in Spree yet, the link still works (it'll show product not found). The slug can be updated later when the product is created in Spree admin.

**Step 2: Verify build**

Run: `yarn build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add components/Home/Hero/Hero.tsx
git commit -m "feat: rewrite Hero as SkyChase Watermark album showcase"
```

---

## Task 4: Redesign StaticHome layout

**Files:**
- Modify: `components/Home/StaticHome.tsx`

**Context:** Replace the current homepage sections (Now Playing, Featured Music, Merch, Live Streams, Newsletter) with the new layout: SkyChase Hero → Live Streams (conditional) → Featured Merch → Newsletter. Remove the "Now Playing" card and "Featured Music" section.

**Step 1: Rewrite StaticHome**

Replace the contents with:

```tsx
import React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import Link from "next/link";
import { Radio, ArrowRight } from "lucide-react";
import { Layout } from "../Layout";
import { NotifyForm } from "../NotifyForm";
import { SocialLinks } from "../SocialLinks";
import { StreamList } from "../StreamList";
import { BlurFade } from "@components/ui";
import {
  fetchStreams,
  fetchProducts,
  useProducts,
  useStreams
} from "../../hooks/index";
import Hero from "./Hero";
import Products from "./Products";
import { Loading } from "../Loading";

export const StaticHome = (props: any) => {
  const {
    error: productsError,
    data: productsData,
    isLoading: productsAreLoading
  }: any = useProducts(1);

  const {
    error: streamsError,
    data: streamsData,
    isLoading: streamsAreLoading
  }: any = useStreams(1);

  if (productsAreLoading || streamsAreLoading) return <Loading />;
  if (productsError || streamsError) return <Loading />;

  const streams = streamsData?.response_data || [];

  return (
    <Layout>
      {/* 1. SkyChase Album Hero */}
      <Hero />

      <div className="section-container space-y-12 pb-20 pt-4 sm:space-y-16">
        {/* 2. Live Streams — only rendered if streams exist */}
        {streams.length > 0 && (
          <BlurFade delay={0.1} inView>
            <section className="glass-card overflow-hidden p-5 sm:p-8">
              <div className="mb-6 flex items-baseline justify-between">
                <h2 className="font-display text-title-lg text-foreground sm:text-title-xl">
                  Live Streams
                </h2>
                <Link
                  href={`/tv/${streams[0]?.playback_ids?.[0] || ""}`}
                  className="flex items-center gap-1 text-sm text-brand no-underline transition-colors hover:underline"
                >
                  Watch Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Featured stream banner */}
              <Link
                href={`/tv/${streams[0]?.playback_ids?.[0] || ""}`}
                className="group relative flex items-center gap-4 rounded-xl border border-brand/20 bg-brand/5 p-5 no-underline transition-all hover:border-brand/30 hover:bg-brand/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/20">
                  <Radio className="h-6 w-6 text-brand" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-title text-sm font-semibold text-foreground">
                    {streams[0]?.title || "Live Stream"}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-muted-foreground">
                    {streams[0]?.description || "Tune in now"}
                  </p>
                </div>
                <span className="flex-shrink-0 rounded-full bg-brand px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white">
                  Live
                </span>
              </Link>

              {streams.length > 1 && (
                <div className="mt-4">
                  <StreamList data={streams} title="" />
                </div>
              )}
            </section>
          </BlurFade>
        )}

        {/* 3. Featured Merch */}
        {productsData && (
          <BlurFade delay={0.15} inView>
            <section className="glass-card p-5 sm:p-8">
              <Products
                products={productsData}
                title="Merch & Swag"
                limit={6}
                href="/browse"
                ctaLabel="Shop All"
              />
            </section>
          </BlurFade>
        )}

        {/* 4. Newsletter + Social */}
        <BlurFade delay={0.2} inView>
          <section className="glass-card py-8">
            <div className="text-center">
              <h2 className="font-display text-title-lg text-foreground sm:text-title-xl">
                Stay in the Loop
              </h2>
              <p className="mt-2 font-body text-sm text-muted-foreground">
                Get notified about new releases, merch drops, and live streams.
              </p>
            </div>
            <NotifyForm />
            <div className="mt-6 flex justify-center">
              <SocialLinks />
            </div>
          </section>
        </BlurFade>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["streams", 1], () => fetchStreams(1));
  await queryClient.prefetchQuery(["products", 1], () => fetchProducts(1));
  return { props: { dehydratedState: dehydrate(queryClient) } };
}
```

Key changes:
- Removed `usePlayer` import and "Now Playing" card
- Removed "Featured Music" section (SkyChase hero replaces it)
- Live Streams section is now first below hero (conditionally rendered)
- Added `SocialLinks` below newsletter
- Kept `getServerSideProps` for SSR data prefetching

**Step 2: Verify build**

Run: `yarn build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add components/Home/StaticHome.tsx
git commit -m "feat: redesign homepage with SkyChase hero, live streams, merch, newsletter"
```

---

## Task 5: Build verification and deploy

**Files:**
- No new files

**Step 1: Full build**

Run: `yarn build`
Expected: Build succeeds with all pages compiled.

**Step 2: Dev server verification**

Run: `yarn dev`
Verify:
- Homepage shows SkyChase album art as hero with listen/buy CTAs
- Stars rotating slowly in deep background
- City photo (NYC) visible and blurred behind content
- Skyline silhouette layered on top of city photo
- Static/glitch texture barely visible (screen blend)
- Condition cycling works — watch for ~75 seconds to see a transition
- Live streams section appears if Spree returns streams (may be empty)
- Featured merch grid shows products from Spree
- Newsletter section with GoHighLevel form works
- SmokeyBox player bar still present at bottom
- Navigation to /music, /browse, /cart all works

**Step 3: Push to origin and deploy to Heroku**

```bash
git push origin smokey-v2
git push heroku smokey-v2:main
```

**Step 4: Verify staging**

Open: https://smokey-frontend-staging.herokuapp.com/
Verify same as Step 2 on the live staging environment.

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Add cityPhotoFilter + staticOpacity to conditions | `conditions.ts` |
| 2 | Rework CityMorph layer stack (stars, city photo, static) | `CityMorph.tsx`, `RainOverlay.tsx`, `globals.css` |
| 3 | Rewrite Hero as SkyChase album showcase | `Hero.tsx` |
| 4 | Redesign StaticHome layout | `StaticHome.tsx` |
| 5 | Build verification and deploy | — |
