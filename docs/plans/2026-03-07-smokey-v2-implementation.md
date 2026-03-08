# Smokey FM v2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reskin dna-frontend as Smokey FM with full eCommerce, a dual-mode AV player (SmokeyBox), a living cityscape theme system (CityMorph), and a dedicated Music page.

**Architecture:** Copy dna-frontend (Next.js 13 + Tailwind + Spree) wholesale into smokey-frontend as new branch `smokey-v2`. Remove DNA-specific features (Kontent CMS, wholesale). Add three major features: SmokeyBox player, CityMorph theme, Music page. Deploy to Heroku.

**Tech Stack:** Next.js 13.1.1, React 18, Tailwind CSS 3.4, Spree Storefront API v2 SDK, Stripe, react-player, react-audio-player, soundcloud.ts, Web Audio API, Framer Motion, CSS filters/blend-modes

---

## Task 1: Git Setup — Create smokey-v2 Branch from dna-frontend

**Files:**
- Source: `/Users/smokey/Internal/DNA/code/dna-frontend/` (entire codebase)
- Target: smokey-frontend repo, new orphan branch `smokey-v2`

**Step 1: Create orphan branch in smokey-frontend**

```bash
cd /Users/smokey/Internal/SmokeyFM/code/smokey-frontend
git checkout --orphan smokey-v2
git rm -rf .
```

**Step 2: Copy dna-frontend codebase**

```bash
rsync -av --exclude='.git' --exclude='node_modules' --exclude='.next' --exclude='.env.development' /Users/smokey/Internal/DNA/code/dna-frontend/ /Users/smokey/Internal/SmokeyFM/code/smokey-frontend/
```

**Step 3: Preserve smokey-frontend docs**

```bash
mkdir -p docs/plans
cp /Users/smokey/Internal/SmokeyFM/code/smokey-frontend/docs/plans/2026-03-07-smokey-v2-design.md docs/plans/ 2>/dev/null || true
```

**Step 4: Initial commit**

```bash
git add -A
git commit -m "feat: initialize smokey-v2 from dna-frontend codebase"
```

**Step 5: Push branch**

```bash
git push origin smokey-v2
```

---

## Task 2: Preserve Smokey Assets — Copy Branding from Original

**Files:**
- Source: `/Users/smokey/Internal/SmokeyFM/code/smokey-frontend/` (main branch assets)
- Copy to: `public/` in smokey-v2

**Step 1: Copy Smokey logo and brand assets**

Copy from the original smokey-frontend main branch:

```bash
cd /Users/smokey/Internal/SmokeyFM/code/smokey-frontend
# Extract assets from main branch
git show main:public/logo.png > public/logo.png
git show main:public/logo-tagline.svg > public/logo-tagline.svg
git show main:public/favicon.ico > public/favicon.ico
git show main:public/img/open-graph-smokey-fm.jpg > public/img/open-graph-smokey-fm.jpg
```

**Step 2: Copy atmospheric/cityscape assets for CityMorph**

```bash
mkdir -p public/img
git show main:public/img/skyline.png > public/img/skyline.png
git show main:public/img/cockpit.png > public/img/cockpit.png
git show main:public/img/stars.png > public/img/stars.png
git show main:public/img/static.gif > public/img/static.gif
git show main:public/img/bg_image.jpg > public/img/bg_image.jpg
```

**Step 3: Copy audio player control icons**

```bash
for icon in play.png pause.png play-arrow.png previous.png right-arrow.png mute.png volume-off.png forward-button.png rewind-button.png; do
  git show main:public/img/$icon > public/img/$icon
done
```

**Step 4: Copy Smokey custom font**

```bash
mkdir -p public/fonts
git show main:public/fonts/JamesFajardo.ttf > public/fonts/JamesFajardo.ttf
git show main:public/fonts/JamesFajardo.svg > public/fonts/JamesFajardo.svg
git show main:public/fonts/JamesFajardo.eot > public/fonts/JamesFajardo.eot
git show main:public/fonts/JamesFajardo.woff > public/fonts/JamesFajardo.woff
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: preserve smokey branding assets, fonts, and atmospheric images"
```

---

## Task 3: Environment Configuration — Rebrand for Smokey FM

**Files:**
- Modify: `.env.example`
- Create: `.env.development` (from .env.example, populated with Smokey values)

**Step 1: Create .env.development with Smokey FM values**

Create `.env.development` with these key overrides (keep dna-frontend structure, change values):

```env
# Branding
NEXT_PUBLIC_SITE_TITLE=SmokeyFM
NEXT_PUBLIC_SHORT_TITLE=SmokeyFM
NEXT_PUBLIC_SITE_SUBTITLE="All original video radio"
NEXT_PUBLIC_PAGE_TITLE=SmokeyFM
NEXT_PUBLIC_PAGE_DESC="All original video radio - music, merch, and live streams"
NEXT_PUBLIC_SITE_URL=https://smokey.fm
NEXT_PUBLIC_APP_URL=https://smokey.fm
NEXT_PUBLIC_LOGO_PATH=logo.png
NEXT_PUBLIC_OG_IMG_PATH=img/open-graph-smokey-fm.jpg
NEXT_PUBLIC_ENTITY_NAME="Smokey Records LLC"

# Contact
NEXT_PUBLIC_COMPANY_EMAIL=info@smokey.fm
NEXT_PUBLIC_COMPANY_PHONE=+1-917-300-8103
NEXT_PUBLIC_COMPANY_LEGAL_URL=https://smokey.fm/legal

# Social Media
NEXT_PUBLIC_FACEBOOK_SLUG=smokeyrecords.co
NEXT_PUBLIC_INSTAGRAM_SLUG=smokey.fm
NEXT_PUBLIC_TWITTER_SLUG=_smokeyfm_
NEXT_PUBLIC_YOUTUBE_SLUG=@smokeyrecords

# Spree Admin (Smokey's admin)
NEXT_PUBLIC_SPREE_API_URL=https://admin-staging.smokey.fm

# SoundCloud
NEXT_PUBLIC_SC_CLIENT_ID=465bfa9fa3bf3c824164deb07cb2761b
NEXT_PUBLIC_SC_CLIENT_SECRET=b52f9368843598c89c015da786887854

# GoHighLevel (Mailer)
NEXT_PUBLIC_GOHIGHLEVEL_LOCATION_ID=5gq0svnCrzaNRrxWDch3
NEXT_PUBLIC_GOHIGHLEVEL_FORM_ID=fpji7ikRTcmH2QWFgUQa
NEXT_PUBLIC_MAILER=gohighlevel

# Analytics
NEXT_PUBLIC_GA_TRACKING_CODE=G-SD5WKFEEKX
NEXT_PUBLIC_TRACKING=true
NEXT_PUBLIC_TRACKING_GA_ON=true

# Maintenance Mode (ON until ready to launch)
NEXT_PUBLIC_IS_MAINT_MODE=true
NEXT_PUBLIC_COMING_SOON_COPY="Something new is coming. Stay tuned."

# Dark Mode
NEXT_PUBLIC_DARK_MODE=true
```

**Step 2: Update .env.example to match**

Mirror the same keys with placeholder values.

**Step 3: Commit**

```bash
git add .env.example
git commit -m "feat: configure environment for Smokey FM branding"
```

Note: `.env.development` should be in `.gitignore` — do NOT commit it.

---

## Task 4: Cleanup — Remove Kontent CMS Integration

**Files:**
- Modify: `package.json` — remove @kontent-ai/* dependencies
- Modify: `pages/_app.tsx` — remove Kontent imports/usage if any
- Modify: `pages/home.tsx` — remove DynamicHome/Kontent-driven content
- Delete: any `/models/` directory (Kontent generated models)
- Modify: `.env.example` — remove KONTENT_* variables

**Step 1: Remove Kontent packages from package.json**

Remove these dependencies:
- `@kontent-ai/delivery-sdk`
- `@kontent-ai/model-generator`
- `@kontent-ai/react-components`

**Step 2: Search for all Kontent imports and remove**

```bash
grep -r "kontent" --include="*.tsx" --include="*.ts" -l
```

Remove imports and usages from each file found.

**Step 3: Simplify home.tsx to use StaticHome only**

Remove `DynamicHome` component reference, use `StaticHome` as default.

**Step 4: Remove Kontent env vars from .env.example**

Remove all `NEXT_PUBLIC_KONTENT_*` variables.

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove Kontent CMS integration (not used by Smokey)"
```

---

## Task 5: Cleanup — Remove Wholesale Features

**Files:**
- Delete: `components/ProductDetails/WholesaleProductDetails.tsx`
- Modify: `components/ProductDetails/ProductDetails.tsx` — remove wholesale dispatch, use RetailProductDetails directly
- Modify: `pages/_app.tsx` — remove wholesale state management
- Modify: `components/SignupWizard/POLQuestions/` — remove if wholesale-specific

**Step 1: Simplify ProductDetails.tsx**

Make it render `RetailProductDetails` directly without wholesale branching.

**Step 2: Remove wholesale state from _app.tsx**

Remove `isWholesale` useState and any wholesale-related props passed to components.

**Step 3: Delete wholesale files**

```bash
rm components/ProductDetails/WholesaleProductDetails.tsx
rm -rf components/SignupWizard/POLQuestions/
```

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove wholesale/B2B features (not needed for Smokey)"
```

---

## Task 6: Tailwind Theme — Smokey FM Brand Colors & Typography

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `styles/globals.css`
- Modify: `styles/fonts.css` — add JamesFajardo font

**Step 1: Update tailwind.config.ts brand colors**

Update the `extend.colors` section:

```typescript
brand: {
  primary: '#EB8B8B',      // Smokey salmon pink
  secondary: '#E6CDC0',    // Warm beige
  light: '#F9F2EA',        // Cream
  bright: '#ff7777',       // Bright coral
  dark: '#af1e1e',         // Deep red
},
```

**Step 2: Add JamesFajardo to font families**

In `tailwind.config.ts` fontFamily:

```typescript
fontFamily: {
  display: ['JamesFajardo', 'IBM Plex Mono', 'monospace'],
  body: ['Anybody', 'IBM Plex Sans', 'sans-serif'],
  mono: ['IBM Plex Mono', 'monospace'],
},
```

**Step 3: Add @font-face for JamesFajardo in fonts.css**

```css
@font-face {
  font-family: 'JamesFajardo';
  src: url('/fonts/JamesFajardo.eot');
  src: url('/fonts/JamesFajardo.eot?#iefix') format('embedded-opentype'),
       url('/fonts/JamesFajardo.woff') format('woff'),
       url('/fonts/JamesFajardo.ttf') format('truetype'),
       url('/fonts/JamesFajardo.svg#JamesFajardo') format('svg');
  font-weight: normal;
  font-style: normal;
}
```

**Step 4: Update CSS variables in globals.css**

Update the `:root` and `.dark` theme variables to use Smokey brand colors.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: apply Smokey FM brand colors, typography, and fonts"
```

---

## Task 7: CityMorph — Theme Layer System

**Files:**
- Create: `components/CityMorph/CityMorph.tsx`
- Create: `components/CityMorph/conditions.ts`
- Create: `components/CityMorph/useThemeCycle.ts`
- Create: `components/CityMorph/RainOverlay.tsx`
- Modify: `pages/_app.tsx` — wrap layout with CityMorph background

**Step 1: Define theme conditions**

Create `components/CityMorph/conditions.ts`:

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
}

export const conditions: CityCondition[] = [
  {
    name: 'dawn',
    skyGradient: 'linear-gradient(180deg, #1a0a2e 0%, #e8918d 40%, #f4c27f 70%, #fef0d5 100%)',
    skylineFilter: 'brightness(0.3) contrast(1.2) sepia(0.3)',
    streetFilter: 'brightness(0.4) saturate(0.8)',
    overlayColor: 'rgba(235, 139, 139, 0.08)',
    overlayOpacity: 0.15,
    textGlow: '0 0 20px rgba(244, 194, 127, 0.3)',
    hasRain: false,
    hasFog: true,
  },
  {
    name: 'midday',
    skyGradient: 'linear-gradient(180deg, #1e90ff 0%, #87ceeb 50%, #e0f0ff 100%)',
    skylineFilter: 'brightness(0.9) contrast(1.3)',
    streetFilter: 'brightness(0.8) saturate(1.1)',
    overlayColor: 'rgba(255, 255, 255, 0.05)',
    overlayOpacity: 0.05,
    textGlow: 'none',
    hasRain: false,
    hasFog: false,
  },
  {
    name: 'golden-hour',
    skyGradient: 'linear-gradient(180deg, #1a0a3e 0%, #d4594e 30%, #e8a84c 60%, #f5d89a 100%)',
    skylineFilter: 'brightness(0.5) contrast(1.1) sepia(0.5) hue-rotate(-10deg)',
    streetFilter: 'brightness(0.5) saturate(1.3) sepia(0.3)',
    overlayColor: 'rgba(232, 168, 76, 0.1)',
    overlayOpacity: 0.12,
    textGlow: '0 0 15px rgba(232, 168, 76, 0.4)',
    hasRain: false,
    hasFog: false,
  },
  {
    name: 'overcast',
    skyGradient: 'linear-gradient(180deg, #4a4a5a 0%, #6b6b7b 40%, #8a8a9a 100%)',
    skylineFilter: 'brightness(0.4) contrast(0.9) saturate(0.5)',
    streetFilter: 'brightness(0.35) saturate(0.4)',
    overlayColor: 'rgba(100, 100, 120, 0.12)',
    overlayOpacity: 0.2,
    textGlow: 'none',
    hasRain: false,
    hasFog: true,
  },
  {
    name: 'rain',
    skyGradient: 'linear-gradient(180deg, #1a1a2e 0%, #2d2d44 40%, #3a3a55 100%)',
    skylineFilter: 'brightness(0.3) contrast(1.1) saturate(0.6)',
    streetFilter: 'brightness(0.35) saturate(0.7) contrast(1.2)',
    overlayColor: 'rgba(30, 30, 60, 0.15)',
    overlayOpacity: 0.25,
    textGlow: '0 0 10px rgba(100, 149, 237, 0.3)',
    hasRain: true,
    hasFog: false,
  },
  {
    name: 'neon-night',
    skyGradient: 'linear-gradient(180deg, #000011 0%, #0a0a2e 40%, #1a1a3e 100%)',
    skylineFilter: 'brightness(0.15) contrast(1.4) saturate(1.5)',
    streetFilter: 'brightness(0.2) saturate(1.8) contrast(1.3)',
    overlayColor: 'rgba(235, 139, 139, 0.06)',
    overlayOpacity: 0.1,
    textGlow: '0 0 20px rgba(235, 139, 139, 0.5), 0 0 40px rgba(235, 139, 139, 0.2)',
    hasRain: false,
    hasFog: false,
  },
  {
    name: 'misty-twilight',
    skyGradient: 'linear-gradient(180deg, #1a0a3e 0%, #4a2a6e 40%, #7a5a9e 70%, #aa8ace 100%)',
    skylineFilter: 'brightness(0.25) contrast(0.9) saturate(0.7) hue-rotate(20deg)',
    streetFilter: 'brightness(0.3) saturate(0.5)',
    overlayColor: 'rgba(122, 90, 158, 0.1)',
    overlayOpacity: 0.3,
    textGlow: '0 0 15px rgba(170, 138, 206, 0.4)',
    hasRain: false,
    hasFog: true,
  },
  {
    name: 'stormy',
    skyGradient: 'linear-gradient(180deg, #0a0a15 0%, #1a1a30 30%, #2a2a45 100%)',
    skylineFilter: 'brightness(0.2) contrast(1.3) saturate(0.4)',
    streetFilter: 'brightness(0.25) saturate(0.5) contrast(1.1)',
    overlayColor: 'rgba(20, 20, 40, 0.2)',
    overlayOpacity: 0.3,
    textGlow: '0 0 5px rgba(200, 200, 255, 0.3)',
    hasRain: true,
    hasFog: false,
  },
];
```

**Step 2: Create theme cycle hook**

Create `components/CityMorph/useThemeCycle.ts`:

```typescript
import { useState, useEffect, useCallback, useRef } from 'react';
import { conditions, CityCondition } from './conditions';

const CYCLE_INTERVAL = 75000; // 75 seconds between shifts
const TRANSITION_DURATION = 10000; // 10 second crossfade

export function useThemeCycle() {
  const [currentCondition, setCurrentCondition] = useState<CityCondition>(() => {
    const randomIndex = Math.floor(Math.random() * conditions.length);
    return conditions[randomIndex];
  });
  const [nextCondition, setNextCondition] = useState<CityCondition | null>(null);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const animFrameRef = useRef<number>();

  const pickNextCondition = useCallback(() => {
    const available = conditions.filter(c => c.name !== currentCondition.name);
    const next = available[Math.floor(Math.random() * available.length)];
    return next;
  }, [currentCondition]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const next = pickNextCondition();
      setNextCondition(next);
      setTransitionProgress(0);

      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / TRANSITION_DURATION, 1);
        // Ease in-out
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        setTransitionProgress(eased);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          setCurrentCondition(next);
          setNextCondition(null);
          setTransitionProgress(0);
        }
      };
      animFrameRef.current = requestAnimationFrame(animate);
    }, CYCLE_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [pickNextCondition]);

  return { currentCondition, nextCondition, transitionProgress };
}
```

**Step 3: Create rain overlay component**

Create `components/CityMorph/RainOverlay.tsx`:

```tsx
import { useEffect, useRef } from 'react';

interface RainOverlayProps {
  active: boolean;
  opacity: number;
}

export function RainOverlay({ active, opacity }: RainOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drops: { x: number; y: number; speed: number; length: number }[] = [];
    for (let i = 0; i < 200; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 8 + Math.random() * 12,
        length: 10 + Math.random() * 20,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = `rgba(174, 194, 224, ${opacity * 0.4})`;
      ctx.lineWidth = 1;

      for (const drop of drops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + 1, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, opacity]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity }}
    />
  );
}
```

**Step 4: Create main CityMorph component**

Create `components/CityMorph/CityMorph.tsx`:

```tsx
import { useMemo } from 'react';
import { useThemeCycle } from './useThemeCycle';
import { RainOverlay } from './RainOverlay';
import { CityCondition } from './conditions';

function interpolateStyle(
  current: CityCondition,
  next: CityCondition | null,
  progress: number
) {
  if (!next || progress === 0) return current;
  // For non-interpolatable properties, switch at 50%
  return progress > 0.5 ? next : current;
}

export function CityMorph({ children }: { children: React.ReactNode }) {
  const { currentCondition, nextCondition, transitionProgress } = useThemeCycle();

  const activeCondition = interpolateStyle(
    currentCondition,
    nextCondition,
    transitionProgress
  );

  const showRain = activeCondition.hasRain;
  const showFog = activeCondition.hasFog;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Sky layer */}
      <div
        className="fixed inset-0 z-0 transition-all duration-[10s] ease-in-out"
        style={{ background: currentCondition.skyGradient }}
      />
      {nextCondition && (
        <div
          className="fixed inset-0 z-0"
          style={{
            background: nextCondition.skyGradient,
            opacity: transitionProgress,
          }}
        />
      )}

      {/* Skyline layer */}
      <div
        className="fixed inset-0 z-[1] bg-bottom bg-cover bg-no-repeat transition-all duration-[10s]"
        style={{
          backgroundImage: "url('/img/skyline.png')",
          filter: activeCondition.skylineFilter,
        }}
      />

      {/* Fog overlay */}
      {showFog && (
        <div
          className="fixed inset-0 z-[2] pointer-events-none transition-opacity duration-[10s]"
          style={{
            background: 'radial-gradient(ellipse at 50% 80%, rgba(200,200,220,0.3) 0%, transparent 70%)',
            opacity: activeCondition.overlayOpacity,
          }}
        />
      )}

      {/* Rain overlay */}
      <RainOverlay active={showRain} opacity={activeCondition.overlayOpacity} />

      {/* Color overlay */}
      <div
        className="fixed inset-0 z-[3] pointer-events-none transition-all duration-[10s]"
        style={{
          backgroundColor: activeCondition.overlayColor,
          opacity: activeCondition.overlayOpacity,
        }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ textShadow: activeCondition.textGlow }}>
        {children}
      </div>
    </div>
  );
}

export { useThemeCycle } from './useThemeCycle';
export type { CityCondition } from './conditions';
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add CityMorph living cityscape theme system with 8 atmospheric conditions"
```

---

## Task 8: Integrate CityMorph into App Layout

**Files:**
- Modify: `pages/_app.tsx` — wrap layout with CityMorph
- Modify: `components/Layout/Layout.tsx` — make background transparent
- Modify: `components/Header/Header.tsx` — make semi-transparent

**Step 1: Import and wrap with CityMorph in _app.tsx**

Add CityMorph as the outermost wrapper around the Layout:

```tsx
import { CityMorph } from '@components/CityMorph/CityMorph';

// In the render, wrap the main content:
<CityMorph>
  <Layout>
    {/* existing content */}
  </Layout>
</CityMorph>
```

**Step 2: Make Layout background transparent**

In `components/Layout/Layout.tsx`, remove or override any `bg-white` or `bg-background` classes. Set `bg-transparent` on the main wrapper.

**Step 3: Make Header semi-transparent**

In `components/Header/Header.tsx`, add backdrop blur and transparency:

```tsx
className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10"
```

**Step 4: Verify CityMorph renders behind all content**

Run: `yarn dev`
Expected: cityscape background visible behind all pages, header is semi-transparent.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: integrate CityMorph into app layout with transparent header"
```

---

## Task 9: SmokeyBox Player — Core State & Provider

**Files:**
- Create: `components/SmokeyBox/PlayerProvider.tsx`
- Create: `components/SmokeyBox/types.ts`
- Modify: `pages/_app.tsx` — add PlayerProvider

**Step 1: Define player types**

Create `components/SmokeyBox/types.ts`:

```typescript
export type PlayerMode = 'simultaneous' | 'youtube-only' | 'soundcloud-only';

export interface Track {
  id: string;
  title: string;
  artist: string;
  streamUrl: string;
  artworkUrl?: string;
  duration: number;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
}

export interface PlayerState {
  mode: PlayerMode;
  isPlaying: boolean;
  isExpanded: boolean;
  volume: number;
  currentTrack: Track | null;
  currentVideo: YouTubeVideo | null;
  playlist: Track[];
  videoPlaylist: YouTubeVideo[];
  trackIndex: number;
  videoIndex: number;
  progress: number;
  duration: number;
}
```

**Step 2: Create PlayerProvider**

Create `components/SmokeyBox/PlayerProvider.tsx`:

```tsx
import { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { PlayerState, PlayerMode, Track, YouTubeVideo } from './types';

type PlayerAction =
  | { type: 'SET_MODE'; mode: PlayerMode }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_PLAYING'; isPlaying: boolean }
  | { type: 'TOGGLE_EXPANDED' }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'SET_TRACK'; track: Track; index: number }
  | { type: 'SET_VIDEO'; video: YouTubeVideo; index: number }
  | { type: 'SET_PLAYLIST'; playlist: Track[] }
  | { type: 'SET_VIDEO_PLAYLIST'; playlist: YouTubeVideo[] }
  | { type: 'NEXT_TRACK' }
  | { type: 'PREV_TRACK' }
  | { type: 'NEXT_VIDEO' }
  | { type: 'SET_PROGRESS'; progress: number; duration: number }
  | { type: 'QUEUE_TRACK'; track: Track };

const initialState: PlayerState = {
  mode: 'simultaneous',
  isPlaying: false,
  isExpanded: false,
  volume: 0.7,
  currentTrack: null,
  currentVideo: null,
  playlist: [],
  videoPlaylist: [],
  trackIndex: 0,
  videoIndex: 0,
  progress: 0,
  duration: 0,
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.mode };
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.isPlaying };
    case 'TOGGLE_EXPANDED':
      return { ...state, isExpanded: !state.isExpanded };
    case 'SET_VOLUME':
      return { ...state, volume: action.volume };
    case 'SET_TRACK':
      return { ...state, currentTrack: action.track, trackIndex: action.index };
    case 'SET_VIDEO':
      return { ...state, currentVideo: action.video, videoIndex: action.index };
    case 'SET_PLAYLIST':
      return { ...state, playlist: action.playlist, currentTrack: action.playlist[0] || null, trackIndex: 0 };
    case 'SET_VIDEO_PLAYLIST':
      return { ...state, videoPlaylist: action.playlist, currentVideo: action.playlist[0] || null, videoIndex: 0 };
    case 'NEXT_TRACK': {
      const nextIndex = (state.trackIndex + 1) % state.playlist.length;
      return { ...state, trackIndex: nextIndex, currentTrack: state.playlist[nextIndex] };
    }
    case 'PREV_TRACK': {
      const prevIndex = state.trackIndex === 0 ? state.playlist.length - 1 : state.trackIndex - 1;
      return { ...state, trackIndex: prevIndex, currentTrack: state.playlist[prevIndex] };
    }
    case 'NEXT_VIDEO': {
      const nextVidIndex = (state.videoIndex + 1) % state.videoPlaylist.length;
      return { ...state, videoIndex: nextVidIndex, currentVideo: state.videoPlaylist[nextVidIndex] };
    }
    case 'SET_PROGRESS':
      return { ...state, progress: action.progress, duration: action.duration };
    case 'QUEUE_TRACK':
      return { ...state, playlist: [...state.playlist, action.track] };
    default:
      return state;
  }
}

const PlayerContext = createContext<{
  state: PlayerState;
  dispatch: React.Dispatch<PlayerAction>;
} | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within PlayerProvider');
  return context;
}
```

**Step 3: Add PlayerProvider to _app.tsx**

Wrap the app content with `<PlayerProvider>` inside the existing providers.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add SmokeyBox PlayerProvider with dual-mode state management"
```

---

## Task 10: SmokeyBox Player — Skeuomorphic UI Components

**Files:**
- Create: `components/SmokeyBox/Knob.tsx`
- Create: `components/SmokeyBox/VUMeter.tsx`
- Create: `components/SmokeyBox/LEDIndicator.tsx`
- Create: `components/SmokeyBox/TransportButton.tsx`

**Step 1: Create rotary knob component**

Create `components/SmokeyBox/Knob.tsx`:

A draggable knob with conic-gradient, grooves, and rotation based on value (0-1).
Uses pointer events for drag interaction. Renders with repeating-radial-gradient for tactile grooves.

**Step 2: Create VU meter component**

Create `components/SmokeyBox/VUMeter.tsx`:

Connects to Web Audio API AnalyserNode. Renders frequency bars with gradient fill (green→yellow→red). Animates via requestAnimationFrame.

**Step 3: Create LED indicator**

Create `components/SmokeyBox/LEDIndicator.tsx`:

Simple colored dot with box-shadow glow. Supports: green (playing), amber (mode), red (live, with pulse animation).

**Step 4: Create transport button**

Create `components/SmokeyBox/TransportButton.tsx`:

Embossed button with inset shadow on :active. Icons for play/pause/skip via Lucide React.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add skeuomorphic SmokeyBox UI components (knob, VU meter, LED, transport)"
```

---

## Task 11: SmokeyBox Player — Main Player Component

**Files:**
- Create: `components/SmokeyBox/SmokeyBox.tsx`
- Create: `components/SmokeyBox/SmokeyBoxCollapsed.tsx`
- Create: `components/SmokeyBox/SmokeyBoxExpanded.tsx`
- Create: `components/SmokeyBox/YouTubeLayer.tsx`
- Create: `components/SmokeyBox/SoundCloudLayer.tsx`
- Create: `components/SmokeyBox/index.tsx`

**Step 1: Create YouTube layer**

`YouTubeLayer.tsx`: Wraps `react-player` with YouTube URL, muted in simultaneous mode, unmuted in youtube-only mode. Loops. Calls `NEXT_VIDEO` on end.

**Step 2: Create SoundCloud layer**

`SoundCloudLayer.tsx`: Wraps `react-audio-player` with SoundCloud stream URL. Connects to Web Audio API AnalyserNode for VU meter data. Calls `NEXT_TRACK` on end. Passes analyser ref up.

**Step 3: Create collapsed view**

`SmokeyBoxCollapsed.tsx`: Slim bottom bar (h-16). Shows: track artwork (tiny), track title + artist, play/pause TransportButton, Knob for volume, mode toggle, expand button.

**Step 4: Create expanded view**

`SmokeyBoxExpanded.tsx`: Full panel (h-96). Shows: YouTube video (left/center), track info with frosted glass (backdrop-blur), full transport controls, VU meters, playlist browser, Knob for volume and seek, mode selector, collapse button.

**Step 5: Create main SmokeyBox wrapper**

`SmokeyBox.tsx`: Fixed to bottom of viewport. Renders collapsed or expanded based on `isExpanded` state. Background: dark brushed metal gradient. Contains both YouTube and SoundCloud layers (YouTube hidden when collapsed unless in youtube-only mode).

**Step 6: Create index export**

`index.tsx`: Re-exports SmokeyBox component.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add SmokeyBox dual-mode AV player with collapsed/expanded views"
```

---

## Task 12: SmokeyBox — SoundCloud Playlist Integration

**Files:**
- Create: `hooks/useSoundCloudPlaylist/index.ts`
- Create: `config/soundcloud.ts` (if not already present from dna-frontend)
- Modify: `components/SmokeyBox/SmokeyBox.tsx` — load playlist on mount

**Step 1: Create SoundCloud playlist hook**

Create `hooks/useSoundCloudPlaylist/index.ts`:

Uses the SoundCloud API client (client_id from env) to fetch playlists for user 6319082 (Smokey). Maps SoundCloud tracks to the `Track` type. Returns loading state and track list.

**Step 2: Create SoundCloud config**

Create `config/soundcloud.ts`:

```typescript
export const SC_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_SC_CLIENT_ID || '',
  userId: '6319082',
  apiBase: 'https://api.soundcloud.com',
};
```

**Step 3: Connect to PlayerProvider on mount**

In SmokeyBox, on mount, call `useSoundCloudPlaylist()` and dispatch `SET_PLAYLIST` with the tracks.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: integrate SoundCloud playlist fetching into SmokeyBox"
```

---

## Task 13: SmokeyBox — Mount in App Layout

**Files:**
- Modify: `pages/_app.tsx` — render SmokeyBox
- Modify: `components/Layout/Layout.tsx` — add bottom padding for player bar

**Step 1: Add SmokeyBox to _app.tsx**

Inside the PlayerProvider, after Layout, render `<SmokeyBox />` so it's always present:

```tsx
<PlayerProvider>
  <CityMorph>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </CityMorph>
  <SmokeyBox />
</PlayerProvider>
```

**Step 2: Add bottom padding to Layout**

In `components/Layout/Layout.tsx`, add `pb-20` (or equivalent) to the main content wrapper so content isn't hidden behind the collapsed player bar.

**Step 3: Test player persists across navigation**

Run: `yarn dev`
Navigate between pages — player bar should stay visible and audio should continue.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: mount SmokeyBox in app layout with persistent playback"
```

---

## Task 14: Music Page

**Files:**
- Create: `pages/music.tsx`
- Create: `components/Music/Music.tsx`
- Create: `components/Music/ReleaseCard.tsx`
- Create: `components/Music/ReleaseGrid.tsx`
- Modify: `components/MainMenu/DesktopMenu.tsx` — add Music nav item
- Modify: `components/MainMenu/MobileMenu.tsx` — add Music nav item

**Step 1: Create ReleaseCard component**

`components/Music/ReleaseCard.tsx`:

Frosted glass card showing album art, title, artist, format badges (vinyl/CD/digital). Click album art → dispatches `QUEUE_TRACK` to SmokeyBox. "Buy" button → links to product detail page. Uses `usePlayer()` context for queue action.

**Step 2: Create ReleaseGrid component**

`components/Music/ReleaseGrid.tsx`:

Grid layout of ReleaseCards. Filter bar: format (All, Vinyl, CD, Digital), sort (Newest, Featured). Uses `useProducts()` hook filtered by music category/tag from Spree. Also pulls SoundCloud playlists for streaming links.

**Step 3: Create Music page component**

`components/Music/Music.tsx`:

Page layout with:
- Hero: "Music" heading with featured release spotlight
- New Releases carousel (Embla Carousel)
- Full ReleaseGrid below
- "Now Playing" indicator linking to SmokeyBox

**Step 4: Create page route**

`pages/music.tsx`:

```tsx
import Music from '@components/Music/Music';
import { GetServerSideProps } from 'next';
import { spreeClient } from '@config/spree';

export default function MusicPage({ products }) {
  return <Music products={products} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch music-tagged products from Spree
  const res = await spreeClient.products.list({
    filter: { taxons: 'music' },
    include: 'images,variants,default_variant',
    per_page: 50,
  });
  return { props: { products: res.isSuccess() ? res.success().data : [] } };
};
```

**Step 5: Add Music to navigation menus**

In `DesktopMenu.tsx` and `MobileMenu.tsx`, add "Music" link pointing to `/music` between existing nav items.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add dedicated Music page with release cards and SoundCloud integration"
```

---

## Task 15: Frosted Glass & Skeuomorphic Styling Pass

**Files:**
- Modify: `tailwind.config.ts` — add utility classes
- Modify: `styles/globals.css` — add reusable component styles
- Modify: `components/ProductCard/ProductCard.tsx` — frosted glass treatment
- Modify: `components/Cart/Cart.tsx` — skeuomorphic buttons
- Modify: `components/Checkout/Checkout.tsx` — skeuomorphic buttons

**Step 1: Add Tailwind utility classes for frosted glass**

In `tailwind.config.ts` or `globals.css`:

```css
.glass-card {
  @apply bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg;
}

.glass-card-light {
  @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-xl;
}

.btn-skeuo {
  @apply px-6 py-3 rounded-lg font-mono uppercase tracking-wider text-sm
    bg-gradient-to-b from-gray-700 to-gray-900
    border border-gray-600
    shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_6px_rgba(0,0,0,0.3)]
    active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]
    active:translate-y-px
    transition-all duration-100;
}
```

**Step 2: Apply glass-card to ProductCard**

Wrap ProductCard's outer div with `glass-card` class, remove existing solid background.

**Step 3: Apply btn-skeuo to Cart and Checkout buttons**

Replace generic button styles with `btn-skeuo` on primary action buttons.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add frosted glass and skeuomorphic styling utilities"
```

---

## Task 16: Homepage Redesign for Smokey FM

**Files:**
- Modify: `components/Home/StaticHome.tsx` — redesign for Smokey FM
- Modify: `components/Home/Hero/Hero.tsx` — minimal floating logo over cityscape
- Modify: `components/Home/Products/Products.tsx` — featured releases + merch
- Delete: `components/Home/DynamicHome.tsx` (Kontent-driven, already removed)

**Step 1: Redesign Hero**

Minimal: Smokey FM logo centered, floating over CityMorph backdrop. Tagline: "All original video radio". No heavy imagery — let the cityscape breathe.

**Step 2: Redesign StaticHome**

Sections:
1. Hero (logo + tagline)
2. "Now Playing" SmokeyBox teaser (if audio playing, show current track)
3. Featured Music Releases (carousel, links to /music)
4. Featured Merch (product grid, links to /browse)
5. Live Stream banner (if active)
6. Newsletter signup (NotifyForm)

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: redesign homepage for Smokey FM with cityscape hero and featured sections"
```

---

## Task 17: Header & Navigation Update

**Files:**
- Modify: `components/Header/Header.tsx` — Smokey FM logo, transparent styling
- Modify: `components/MainMenu/DesktopMenu.tsx` — nav items: Music, Shop, Live, About
- Modify: `components/MainMenu/MobileMenu.tsx` — same nav items
- Modify: `components/Footer/Footer.tsx` — Smokey FM branding and links

**Step 1: Update Header**

- Logo: Smokey FM logo (from `/public/logo.png`)
- Background: `bg-black/30 backdrop-blur-md`
- Nav items: Music, Shop, Live, About
- Right side: search, favorites heart, cart badge, account

**Step 2: Update Footer**

- Smokey Records LLC branding
- Social links (Smokey accounts)
- Contact: info@smokey.fm

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: update header and footer for Smokey FM branding"
```

---

## Task 18: Live Stream — Neon Night Lock

**Files:**
- Modify: `pages/tv/[streamId].tsx` — override CityMorph to neon-night
- Create: `components/CityMorph/CityMorphContext.tsx` — expose condition override

**Step 1: Add condition override to CityMorph**

Create a context that allows child components to lock the theme to a specific condition. When on the stream page, lock to 'neon-night'.

**Step 2: Apply override in stream page**

In `pages/tv/[streamId].tsx`, use the CityMorph context to set condition to 'neon-night' on mount, restore on unmount.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: lock CityMorph to neon-night during live streams"
```

---

## Task 19: Install Dependencies & Build Verification

**Files:**
- Modify: `package.json` — verify all needed deps are present

**Step 1: Install dependencies**

```bash
yarn install
```

**Step 2: Verify build**

```bash
yarn build
```

Fix any TypeScript errors, missing imports, or build failures.

**Step 3: Test dev server**

```bash
yarn dev
```

Verify:
- CityMorph background renders and cycles
- SmokeyBox player bar appears at bottom
- Navigation works (Music, Shop, Live, About)
- Product pages load from Spree
- Cart/checkout flow works

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build errors and dependency issues"
```

---

## Task 20: Heroku Deployment

**Files:**
- Verify: `Procfile` exists with `web: npm start`
- Verify: `package.json` has correct `start` and `build` scripts
- Set Heroku config vars

**Step 1: Set Heroku environment variables**

```bash
heroku config:set -a smokey-frontend-staging \
  NEXT_PUBLIC_SITE_TITLE=SmokeyFM \
  NEXT_PUBLIC_SITE_URL=https://smokey.fm \
  NEXT_PUBLIC_SPREE_API_URL=https://admin-staging.smokey.fm \
  NEXT_PUBLIC_IS_MAINT_MODE=false \
  NEXT_PUBLIC_SC_CLIENT_ID=465bfa9fa3bf3c824164deb07cb2761b \
  NEXT_PUBLIC_DARK_MODE=true \
  # ... (all other env vars from .env.development)
```

**Step 2: Deploy to Heroku**

```bash
git push heroku smokey-v2:main
```

Or via Heroku CLI:

```bash
heroku git:remote -a smokey-frontend-staging
git push heroku smokey-v2:main
```

**Step 3: Verify deployment**

Open `https://smokey-frontend-staging.herokuapp.com` and verify:
- Coming soon mode is OFF
- CityMorph background visible
- SmokeyBox player functional
- Products load from Spree
- Navigation works

**Step 4: Flip coming soon mode off**

```bash
heroku config:set NEXT_PUBLIC_IS_MAINT_MODE=false -a smokey-frontend-staging
```

---

## Task Summary

| # | Task | Description |
|---|------|-------------|
| 1 | Git Setup | Create smokey-v2 branch from dna-frontend |
| 2 | Preserve Assets | Copy Smokey logos, fonts, atmospheric images |
| 3 | Environment Config | Rebrand env vars for Smokey FM |
| 4 | Remove Kontent CMS | Delete Kontent AI integration |
| 5 | Remove Wholesale | Delete B2B/wholesale features |
| 6 | Tailwind Theme | Apply Smokey brand colors and typography |
| 7 | CityMorph System | Build living cityscape theme with 8 conditions |
| 8 | CityMorph Integration | Mount in app layout, transparent header |
| 9 | SmokeyBox State | PlayerProvider with dual-mode state management |
| 10 | SmokeyBox UI | Skeuomorphic knob, VU meter, LED, transport buttons |
| 11 | SmokeyBox Player | Main player with collapsed/expanded views |
| 12 | SoundCloud Integration | Playlist fetching and track streaming |
| 13 | SmokeyBox Mount | Persistent player in app layout |
| 14 | Music Page | Dedicated music browsing with release cards |
| 15 | Styling Pass | Frosted glass and skeuomorphic utilities |
| 16 | Homepage Redesign | Smokey FM homepage with featured sections |
| 17 | Header & Footer | Navigation and branding updates |
| 18 | Stream Neon Lock | Lock CityMorph to neon-night during streams |
| 19 | Build Verification | Install deps, fix errors, test dev server |
| 20 | Heroku Deployment | Deploy and flip off coming soon mode |
