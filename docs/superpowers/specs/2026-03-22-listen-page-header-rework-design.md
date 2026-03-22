# Listen Page, Header Rework & Global Trigger — Design Spec

**Date:** 2026-03-22
**Branch:** smokey-v2
**Status:** Approved

## Overview

This spec covers five interconnected changes to the Smokey FM frontend:

1. A dedicated `/listen` page with full-screen listening experience
2. A content mode switcher (Music Videos / Albums / Spoken Word)
3. Scaled-up retro playback controls for the listening page
4. Header rework — JamesFajardo font and mobile alignment fixes
5. A global trigger to reach the listening page (nav link + floating button)

The core principle: the `/listen` page is a **view** into the existing PlayerProvider state — not a second player. One source of truth, two surfaces (SmokeyBox bar + ListenPage).

---

## 1. Dedicated `/listen` Page

### Route & File Structure

- **Route:** `pages/listen.tsx` — thin page wrapper that renders `ListenPage`
- **Component:** `components/Listen/ListenPage.tsx` — main layout
- **Sub-components:**
  - `components/Listen/ListenHeader.tsx` — minimal top bar
  - `components/Listen/ListenControls.tsx` — scaled-up retro controls
  - `components/Listen/ModeSwitch.tsx` — content mode toggle

### Layout — Desktop

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back                                  Smokey FM wordmark │
│                                          (JamesFajardo)     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────┐  ┌──────────────────────────────┐ │
│  │                      │  │  Track Title (JamesFajardo)  │ │
│  │   Video / Album Art  │  │  Artist                      │ │
│  │   (large, ~50vw)     │  │                              │ │
│  │                      │  │  ═══════════════ Progress ══ │ │
│  │                      │  │  1:23              3:45      │ │
│  └──────────────────────┘  │                              │ │
│                            │  [VU]  [VU]  [LED] [LED]     │ │
│                            └──────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────────┐
│  │  ⏮  ▶  ⏭      🎛 vol    🎛 seek    [Mode Switcher]     │
│  └──────────────────────────────────────────────────────────┘
│                                                             │
│  ┌──────────────────────────────────────────────────────────┐
│  │  Playlist / Content Browser (scrollable)                │
│  └──────────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

### Layout — Mobile

Stacks vertically:

1. ListenHeader (back arrow + wordmark)
2. Video embed or album art (full width, aspect-video)
3. Track info (title, artist, progress bar)
4. LEDs + VU meters row
5. Transport controls row (play, skip, knobs)
6. Mode switcher row
7. Playlist browser (scrollable, remaining viewport height)

Full viewport: `min-h-screen` with `bg-transparent` so CityMorph shows through.

### ListenHeader

Minimal top bar — not the site Header:

- **Left:** Back arrow icon, calls `router.back()`
- **Right:** "Smokey FM" wordmark in `font-display` (JamesFajardo), links to `/`
- Styling: `py-4 px-6`, `text-white/70`, no background (transparent over CityMorph)

### Media Display Area

- **Music Videos mode:** The `/listen` page renders its own `<YouTubeLayer isVisible={true} />` instance directly in the media display area. This works because `YouTubeLayer` is a stateless React component that reads from `usePlayer()` context — it can be rendered anywhere within `PlayerProvider`. The SmokeyBox instance does NOT render YouTubeLayer when on `/listen` (see SmokeyBox Behavior below). Aspect-video, rounded, with the metallic inset shadow treatment.
- **Albums / Spoken Word mode:** Large album art from `currentTrack.artworkUrl`. Displayed at ~50vw on desktop, full-width on mobile. Rounded corners, shadow glow that adapts to the CityMorph condition's `textGlow` (same pattern as the Hero component).

### Empty State

When a user navigates directly to `/listen` (bookmark, direct URL) with nothing loaded:
- The page auto-loads the default Albums playlist on mount (same `useSoundCloudPlaylist()` call that SmokeyBox uses)
- While loading, the media area shows a placeholder: album art silhouette with a subtle pulse animation
- Track info shows "Loading..." in muted text
- Controls are visible but disabled (transport buttons don't respond until a track is loaded)
- The playlist browser renders as soon as tracks are available

### SmokeyBox Behavior

**Architectural note:** Currently `YouTubeLayer` is rendered inside `SmokeyBoxExpanded`, NOT at the SmokeyBox root. `SoundCloudLayer` IS at the root. This means SmokeyBox cannot simply return `null` — that would unmount SoundCloudLayer and destroy the AudioContext.

When `router.pathname === "/listen"`:

- SmokeyBox stays mounted but **hides its visual chrome**: the collapsed/expanded UI wrapper gets `className="hidden"` (or `h-0 overflow-hidden opacity-0 pointer-events-none`)
- `SoundCloudLayer` remains mounted at SmokeyBox root — preserves AudioContext and analyser node
- `SmokeyBoxExpanded` and `SmokeyBoxCollapsed` do not render (chrome is hidden), so SmokeyBox's `YouTubeLayer` instance is also not rendered — no duplicate iframe
- The `/listen` page renders its own `YouTubeLayer` instance in the media display area (Music Videos mode only)
- The `/listen` page reads from the same `usePlayer()` context and dispatches the same actions

When navigating away from `/listen`:

- SmokeyBox chrome reappears (collapsed or expanded based on `isExpanded` state)
- SmokeyBoxExpanded's `YouTubeLayer` instance takes over video rendering again
- The `/listen` page's `YouTubeLayer` unmounts (normal React lifecycle)
- Audio playback continues uninterrupted (SoundCloudLayer was never unmounted)

---

## 2. Content Mode Switcher

### New State

Add to `PlayerState` in `types.ts`:

```typescript
type ContentMode = "music-videos" | "albums" | "spoken-word";
```

Add to `PlayerState`:

```typescript
contentMode: ContentMode; // default: "albums"
```

**Initial state alignment:** When adding `contentMode: "albums"` to `initialState`, also change `initialState.mode` from `"simultaneous"` to `"soundcloud-only"` so the two fields are consistent from first render.

Add action to `PlayerAction`:

```typescript
| { type: "SET_CONTENT_MODE"; payload: ContentMode }
```

### Mode Behavior Matrix

| Content Mode | Icon    | Content Source               | Player Mode Set To | Main Display  |
| ------------ | ------- | ---------------------------- | ------------------ | ------------- |
| Music Videos | `Tv`    | YouTube video playlist       | `youtube-only`     | YouTube embed |
| Albums       | `Disc3` | SoundCloud audio playlist    | `soundcloud-only`  | Album art     |
| Spoken Word  | `Mic`   | Separate SoundCloud playlist | `soundcloud-only`  | Album art     |

### Reducer Logic for SET_CONTENT_MODE

The reducer is a pure function — it cannot dispatch other actions. `SET_CONTENT_MODE` performs a single compound state update. The action payload includes the playlist data needed for the switch:

```typescript
| { type: "SET_CONTENT_MODE"; payload: {
    contentMode: ContentMode;
    playlist?: Track[];        // for albums / spoken-word
    videoPlaylist?: YouTubeVideo[]; // for music-videos
  }}
```

The reducer case:
1. Sets `contentMode` to the new value
2. Sets `mode` to the corresponding `PlayerMode` (see matrix above)
3. Sets `playlist` / `videoPlaylist` from the payload data
4. Sets `currentTrack` / `currentVideo` to the first item in the new list
5. Resets `trackIndex` / `videoIndex` to 0, `progress` to 0
6. Preserves `volume` and `isPlaying`

The component that triggers the mode switch (ModeSwitch or SmokeyBoxCollapsed) is responsible for passing the playlist data in the action payload. It gets this data from hooks (see Playlist Sources below).

### Playlist Sources

- **Music Videos:** `DEFAULT_VIDEOS` array (currently in SmokeyBox.tsx, move to a shared constant) — can be expanded later with more YouTube URLs
- **Albums:** `useSoundCloudPlaylist()` hook (existing, loads from the default SoundCloud playlist URL)
- **Spoken Word:** `useSoundCloudPlaylist(playlistUrl)` — the hook is refactored to accept an optional playlist URL. When provided, it fetches that specific playlist via the SoundCloud `/resolve` endpoint instead of the default user playlists endpoint. The spoken word playlist URL is configured via `NEXT_PUBLIC_SPOKEN_WORD_PLAYLIST_URL`

### ModeSwitch Component

Visual: three `TransportButton` components in a row, each with:

- Icon above (Tv / Disc3 / Mic from lucide-react)
- Label below in `font-mono text-[9px] uppercase tracking-widest text-gray-500`
- Active state uses the pressed-in TransportButton `active` prop
- An LEDIndicator beside each button glows when active

### SmokeyBox Collapsed Bar

The existing mode cycle button on SmokeyBoxCollapsed now cycles through the three `ContentMode` values instead of the old `PlayerMode` cycle. The icon updates to match the active content mode.

---

## 3. Scaled-Up Retro Controls

### Size Variants

| Component              | Collapsed Bar | Expanded Panel | `/listen` Page             |
| ---------------------- | ------------- | -------------- | -------------------------- |
| TransportButton (play) | `md` (40px)   | `lg` (48px)    | `xl` (64px) — **new size** |
| TransportButton (skip) | `sm` (32px)   | `sm` (32px)    | `md` (40px)                |
| Knob                   | 32px          | 40px           | 64px                       |
| VUMeter                | —             | 60×28, 10 bars | 120×48, 16 bars            |
| LEDIndicator           | small         | small          | small (no change)          |

### Component Changes

**TransportButton.tsx:**
Add `xl` to `SIZES`:

```typescript
const SIZES = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16" // new
} as const;
```

Update the `size` prop type to include `"xl"`.

**Knob.tsx, VUMeter.tsx, LEDIndicator.tsx:** No code changes — they already accept size/dimension props.

### Controls Layout on `/listen` — Desktop

```
[VU 120×48]   ⏮(md)  ▶(xl)  ⏭(md)   🎛vol(64)  🎛seek(64)   [VU 120×48]
                    [💿 Videos]  [💿 Albums]  [🎙 Spoken Word]
```

VU meters flank the transport controls. Large play button center. Knobs right of transport. Mode switcher below.

### Controls Layout on `/listen` — Mobile

Shrinks toward expanded-panel sizes to fit (Knob 48px, VU 80×32, play button `lg`). Stacks into rows:

1. Transport row: skip, play, skip
2. Knobs + VU row
3. Mode switcher row

---

## 4. Header Rework

### Font Change

All navigation text switches from `font-title` (IBM Plex Mono Bold) to `font-display` (JamesFajardo):

- "LOGIN" / "SIGN UP" links
- User email in account dropdown trigger
- All dropdown menu items
- The new "Listen" nav link
- Burger menu items

### "Listen" Nav Link

Added to the header right side, before auth links / account dropdown:

```tsx
<Link href="/listen" className="font-display text-lg ...">
  Listen
</Link>
```

When `pathname === "/listen"`, styled as muted/disabled (same pattern as other active routes).

### Mobile Alignment Fixes

| Issue                    | Current                 | Fix                                                                            |
| ------------------------ | ----------------------- | ------------------------------------------------------------------------------ |
| Logo container too wide  | `w-[355px] px-7 py-4`   | `w-auto max-w-[200px] sm:max-w-[355px] px-3 py-2 sm:px-7 sm:py-4`              |
| Cart badge overlaps edge | `-mt-2.5 mr-0.5`        | `-mt-2.5 mr-2 sm:mr-0.5`                                                       |
| Right side cramped       | `absolute right-2.5`    | `right-3 sm:right-2.5`, add `gap-2`                                            |
| Vertical padding uneven  | `py-2.5 pb-3 sm:py-3`   | `py-2 sm:py-3`                                                                 |
| Logo height too tall     | `height: "65px"` always | `height: "45px"` mobile, `height: "65px"` desktop (conditional via `isMobile`) |

### Burger Menu

- "Listen" added as the first item
- All menu items use `font-display` (JamesFajardo)

---

## 5. Global Listening Trigger — Floating Button

### Component

`components/shared/ListenFAB.tsx` — a floating action button rendered in `_app.tsx`.

### Behavior

- **Visible:** On all pages except `/listen`
- **Click:** `router.push("/listen")`
- **Playing indicator:** When `isPlaying` is true, a small pulsing LED dot appears on the button (reuses `LEDIndicator` or a simple CSS pulse)

### Styling

- `position: fixed`, `bottom-20` (always — clears the SmokeyBox bar height whether or not it's currently activated), `right-6`, `z-40`
- Circular, `w-14 h-14`
- Same skeuomorphic gradient/shadow as `TransportButton` but at `xl` scale
- `Headphones` icon from lucide-react, `w-6 h-6`, `text-gray-300`

### Rendering

In `pages/_app.tsx`, alongside `<SmokeyBox />`:

```tsx
<ListenFAB />
<SmokeyBox />
```

`ListenFAB` checks `router.pathname !== "/listen"` internally and returns `null` when on the listen page.

---

## 6. Playlist Browser on `/listen`

The playlist browser is the scrollable list at the bottom of the listen page. It reuses the same visual pattern as the existing playlist in `SmokeyBoxExpanded` but at a larger scale.

### Layout

- Container: `rounded-lg`, inset shadow (`inset 0 1px 4px rgba(0,0,0,0.5)`), `bg-black/30`
- Max height: `max-h-[300px]` on desktop, `max-h-[200px]` on mobile, `overflow-y-auto`
- Each row: track number (mono, muted), title (truncated), duration (mono, muted)
- Active track: `bg-white/10 text-gray-100`, inactive: `text-gray-400 hover:bg-white/5`
- Click dispatches `SET_TRACK` (albums/spoken word) or `SET_VIDEO` (music videos)

### Content Modes

- **Albums / Spoken Word:** Shows `playlist` array — track number, title, artist, duration
- **Music Videos:** Shows `videoPlaylist` array — video number, title (no duration available from YouTube data model)

### Empty State

If the playlist for the current mode is empty or loading, show a single muted-text row: "Loading tracks..." or "No tracks available".

---

## Data Flow

```
PlayerProvider (global, in _app.tsx)
    │
    ├── SmokeyBox (always mounted — chrome hidden on /listen, layers persist)
    │     ├── SoundCloudLayer (always mounted, preserves AudioContext + AnalyserNode)
    │     └── Collapsed/Expanded chrome (hidden when pathname === "/listen")
    │           └── YouTubeLayer (inside Expanded — only renders when NOT on /listen)
    │
    ├── ListenPage (reads same usePlayer() state, dispatches same actions)
    │     ├── ListenHeader (back nav + wordmark)
    │     ├── Media display area
    │     │     ├── YouTubeLayer (own instance, Music Videos mode only)
    │     │     └── Album art (Albums / Spoken Word mode)
    │     ├── ListenControls (scaled-up TransportButton, Knob, VUMeter)
    │     ├── ModeSwitch (dispatches SET_CONTENT_MODE with playlist data)
    │     └── Playlist browser (dispatches SET_TRACK / SET_VIDEO)
    │
    └── ListenFAB (reads isPlaying for LED indicator, navigates to /listen)
```

---

## New & Modified Files Summary

### New Files

| File                                   | Purpose                        |
| -------------------------------------- | ------------------------------ |
| `pages/listen.tsx`                     | Page route, renders ListenPage |
| `components/Listen/ListenPage.tsx`     | Main listening page layout     |
| `components/Listen/ListenHeader.tsx`   | Minimal back + wordmark bar    |
| `components/Listen/ListenControls.tsx` | Scaled-up retro controls       |
| `components/Listen/ModeSwitch.tsx`     | Content mode toggle UI         |
| `components/shared/ListenFAB.tsx`      | Floating headphones button     |

### Modified Files

| File                                          | Change                                                                       |
| --------------------------------------------- | ---------------------------------------------------------------------------- |
| `components/SmokeyBox/types.ts`               | Add `ContentMode` type, `contentMode` to `PlayerState`                       |
| `components/SmokeyBox/PlayerProvider.tsx`     | Add `contentMode` to initial state, `SET_CONTENT_MODE` action + reducer case |
| `components/SmokeyBox/TransportButton.tsx`    | Add `xl` size variant                                                        |
| `components/SmokeyBox/SmokeyBox.tsx`          | Hide chrome (not unmount) when `pathname === "/listen"`, keep SoundCloudLayer mounted |
| `components/SmokeyBox/SmokeyBoxCollapsed.tsx` | Mode cycle uses `ContentMode` instead of `PlayerMode`                        |
| `components/Header/Header.tsx`                | JamesFajardo font, "Listen" link, mobile spacing fixes                       |
| `pages/_app.tsx`                              | Render `ListenFAB`                                                           |
| `components/MainMenu/MainMenu.tsx`            | JamesFajardo font, "Listen" as first item                                    |
| `hooks/useSoundCloudPlaylist.ts`              | Accept optional playlist URL parameter for spoken word                       |

### Unchanged

- CityMorph backdrop system
- SoundCloudLayer internals
- YouTubeLayer internals (component code unchanged — just rendered in an additional location)
- Homepage Hero
- Footer
- All other pages
- Knob, VUMeter, LEDIndicator component code
