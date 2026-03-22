# Listen Page, Header Rework & Global Trigger — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dedicated `/listen` page with full-screen listening experience, content mode switcher, scaled-up retro controls, header font/mobile rework, and a global floating trigger button.

**Architecture:** The `/listen` page is a view into the existing PlayerProvider state — not a second player. SmokeyBox hides its chrome (not unmount) when on `/listen` to keep SoundCloudLayer's AudioContext alive. The listen page renders its own YouTubeLayer instance for video mode. A new `ContentMode` type drives both playlist selection and playback behavior.

**Tech Stack:** Next.js 13 Pages Router, React 18, TypeScript, Tailwind CSS, Recoil-free (useReducer + context), lucide-react icons, react-player/youtube, SoundCloud API

**Spec:** `docs/superpowers/specs/2026-03-22-listen-page-header-rework-design.md`

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `components/SmokeyBox/constants.ts` | Shared DEFAULT_VIDEOS array + content mode mappings |
| `components/Listen/ListenPage.tsx` | Main listen page layout — media display, info panel, controls, playlist |
| `components/Listen/ListenHeader.tsx` | Minimal top bar (back arrow + wordmark) |
| `components/Listen/ListenControls.tsx` | Scaled-up retro transport controls |
| `components/Listen/ModeSwitch.tsx` | Content mode toggle (Videos / Albums / Spoken Word) |
| `components/Listen/PlaylistBrowser.tsx` | Scrollable playlist/video list |
| `components/shared/ListenFAB.tsx` | Floating headphones button |
| `pages/listen.tsx` | Page route |

### Modified Files
| File | Change |
|------|--------|
| `components/SmokeyBox/types.ts` | Add `ContentMode`, update `PlayerState` |
| `components/SmokeyBox/PlayerProvider.tsx` | Add `contentMode` state, `SET_CONTENT_MODE` action |
| `components/SmokeyBox/TransportButton.tsx` | Add `xl` size |
| `components/SmokeyBox/SmokeyBox.tsx` | Hide chrome on `/listen`, keep layers mounted, use context analyser |
| `components/SmokeyBox/SmokeyBoxExpanded.tsx` | Get analyserNode from context instead of props |
| `components/SmokeyBox/SmokeyBoxCollapsed.tsx` | Cycle content modes instead of player modes |
| `components/SmokeyBox/index.tsx` | Re-export `ContentMode` type |
| `hooks/useSoundCloudPlaylist/index.ts` | Accept optional playlist URL |
| `hooks/queryKeys.ts` | Add `SOUNDCLOUD_SPOKEN_WORD` key |
| `components/Header/Header.tsx` | JamesFajardo font, "Listen" link, mobile fixes |
| `components/MainMenu/MobileMenu.tsx` | JamesFajardo font, "Listen" as first item |
| `pages/_app.tsx` | Render ListenFAB |

---

## Task 1: Extend Player Types and State

**Files:**
- Modify: `components/SmokeyBox/types.ts`
- Modify: `components/SmokeyBox/PlayerProvider.tsx`
- Modify: `components/SmokeyBox/index.tsx`
- Create: `components/SmokeyBox/constants.ts`

- [ ] **Step 1: Add ContentMode type and update PlayerState**

In `components/SmokeyBox/types.ts`, add after the `PlayerMode` type:

```typescript
/** The three content modes for the listening experience. */
export type ContentMode = "music-videos" | "albums" | "spoken-word";
```

Add `contentMode: ContentMode;` to `PlayerState` interface after the `mode` field:

```typescript
export interface PlayerState {
  mode: PlayerMode;
  contentMode: ContentMode;
  // ... rest unchanged
}
```

- [ ] **Step 2: Create shared constants file**

Create `components/SmokeyBox/constants.ts`:

```typescript
import type { YouTubeVideo, ContentMode, PlayerMode } from "./types";

/** Default YouTube video playlist for SmokeyBox. */
export const DEFAULT_VIDEOS: YouTubeVideo[] = [
  {
    id: "1",
    title: "Smokey FM Visual 1",
    url: "https://www.youtube.com/watch?v=hGq0l_m0U20"
  }
];

/** Maps content mode to the corresponding player mode. */
export const CONTENT_MODE_TO_PLAYER_MODE: Record<ContentMode, PlayerMode> = {
  "music-videos": "youtube-only",
  albums: "soundcloud-only",
  "spoken-word": "soundcloud-only"
};
```

- [ ] **Step 3: Update PlayerProvider with SET_CONTENT_MODE**

In `components/SmokeyBox/PlayerProvider.tsx`:

Add to the `PlayerAction` union:

```typescript
| {
    type: "SET_CONTENT_MODE";
    payload: {
      contentMode: ContentMode;
      playlist?: Track[];
      videoPlaylist?: YouTubeVideo[];
    };
  }
```

Import `CONTENT_MODE_TO_PLAYER_MODE` from `./constants`.

Change `initialState`:

```typescript
const initialState: PlayerState = {
  mode: "soundcloud-only",   // changed from "simultaneous"
  contentMode: "albums",     // new field
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
  duration: 0
};
```

Add reducer case before the `default`:

```typescript
case "SET_CONTENT_MODE": {
  const { contentMode, playlist, videoPlaylist } = action.payload;
  const newMode = CONTENT_MODE_TO_PLAYER_MODE[contentMode];

  const newPlaylist = playlist ?? state.playlist;
  const newVideoPlaylist = videoPlaylist ?? state.videoPlaylist;

  const firstTrack = newPlaylist.length > 0 ? newPlaylist[0] : null;
  const firstVideo = newVideoPlaylist.length > 0 ? newVideoPlaylist[0] : null;

  return {
    ...state,
    contentMode,
    mode: newMode,
    playlist: newPlaylist,
    videoPlaylist: newVideoPlaylist,
    currentTrack: contentMode !== "music-videos" ? firstTrack : state.currentTrack,
    currentVideo: contentMode === "music-videos" ? firstVideo : state.currentVideo,
    trackIndex: contentMode !== "music-videos" ? 0 : state.trackIndex,
    videoIndex: contentMode === "music-videos" ? 0 : state.videoIndex,
    progress: 0,
    duration: contentMode !== "music-videos" ? (firstTrack?.duration ?? 0) : 0
  };
}
```

- [ ] **Step 4: Add AnalyserNode to PlayerProvider context**

The AnalyserNode currently lives as local state in SmokeyBox. To share it with the `/listen` page's VU meters, lift it into the PlayerProvider context.

In `components/SmokeyBox/PlayerProvider.tsx`, update the context value interface:

```typescript
interface PlayerContextValue {
  state: PlayerState;
  dispatch: Dispatch<PlayerAction>;
  analyserNode: AnalyserNode | null;
  setAnalyserNode: (node: AnalyserNode | null) => void;
}
```

Update the `PlayerProvider` component to hold analyser state:

```typescript
export function PlayerProvider({ children }: PlayerProviderProps) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  const value = useMemo<PlayerContextValue>(
    () => ({ state, dispatch, analyserNode, setAnalyserNode }),
    [state, analyserNode]
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}
```

Add `useState` to the React imports at the top of the file.

Update the `usePlayer` hook return type (it already returns `PlayerContextValue`, so this is automatic).

- [ ] **Step 5: Update SmokeyBox index exports**

In `components/SmokeyBox/index.tsx`, add `ContentMode` to the type export:

```typescript
export { SmokeyBox } from "./SmokeyBox";
export { PlayerProvider, usePlayer } from "./PlayerProvider";
export type { Track, YouTubeVideo, PlayerMode, ContentMode } from "./types";
```

- [ ] **Step 6: Update SmokeyBox.tsx to use shared constants and context analyser**

In `components/SmokeyBox/SmokeyBox.tsx`, replace the inline `DEFAULT_VIDEOS` array with an import:

```typescript
import { DEFAULT_VIDEOS } from "./constants";
```

Remove the `const DEFAULT_VIDEOS` block (lines 11-17).

Also update SmokeyBox to use context analyser instead of local state. Replace the `useState` for `analyserNode` with the context version:

```typescript
const { setAnalyserNode } = usePlayer();
```

Remove `const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);`.

Update `handleAnalyserReady`:

```typescript
const handleAnalyserReady = useCallback((analyser: AnalyserNode) => {
  setAnalyserNode(analyser);
}, [setAnalyserNode]);
```

And in `SmokeyBoxExpanded`, get `analyserNode` from context instead of props:

In `SmokeyBoxExpanded.tsx`, remove the `analyserNode` prop from the interface and component signature. Instead:

```typescript
const { state, dispatch, analyserNode } = usePlayer();
```

Update `SmokeyBox.tsx` to stop passing `analyserNode` as a prop to `SmokeyBoxExpanded`:

```tsx
<SmokeyBoxExpanded />
```

- [ ] **Step 7: Verify build**

Run: `yarn build`
Expected: Build succeeds. The new `contentMode` field is in state, `SET_CONTENT_MODE` is a valid action, and the constants are shared.

- [ ] **Step 8: Commit**

```bash
git add components/SmokeyBox/types.ts components/SmokeyBox/PlayerProvider.tsx components/SmokeyBox/index.tsx components/SmokeyBox/constants.ts components/SmokeyBox/SmokeyBox.tsx components/SmokeyBox/SmokeyBoxExpanded.tsx
git commit -m "feat: add ContentMode, SET_CONTENT_MODE, shared constants, lift AnalyserNode to context"
```

---

## Task 2: Add xl Size to TransportButton

**Files:**
- Modify: `components/SmokeyBox/TransportButton.tsx`

- [ ] **Step 1: Add xl size variant**

In `components/SmokeyBox/TransportButton.tsx`, update the `SIZES` constant:

```typescript
const SIZES = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16"
} as const;
```

Update the `size` prop type in the interface:

```typescript
interface TransportButtonProps {
  onClick: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  active?: boolean;
}
```

- [ ] **Step 2: Verify build**

Run: `yarn build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/SmokeyBox/TransportButton.tsx
git commit -m "feat: add xl size variant to TransportButton"
```

---

## Task 3: Refactor useSoundCloudPlaylist for Optional URL

**Files:**
- Modify: `hooks/useSoundCloudPlaylist/index.ts`
- Modify: `hooks/queryKeys.ts`

- [ ] **Step 1: Add query key for spoken word**

In `hooks/queryKeys.ts`, add before the closing brace:

```typescript
SOUNDCLOUD_SPOKEN_WORD = "SOUNDCLOUD_SPOKEN_WORD"
```

- [ ] **Step 2: Refactor hook to accept optional playlist URL**

Replace the contents of `hooks/useSoundCloudPlaylist/index.ts`:

```typescript
import { useQuery } from "react-query";

import { SC_CONFIG } from "../../config/soundcloud";
import { QueryKeys } from "../queryKeys";
import type { Track } from "../../components/SmokeyBox/types";

/** Shape of a track object returned by the SoundCloud API. */
interface SCTrack {
  id: number;
  title: string;
  user: { username: string };
  stream_url: string;
  artwork_url: string | null;
  duration: number; // milliseconds
}

/** Shape of a playlist object returned by the SoundCloud API. */
interface SCPlaylist {
  tracks: SCTrack[];
}

/** Map raw SC tracks to SmokeyBox Track type. */
function mapTracks(scTracks: SCTrack[]): Track[] {
  return scTracks.map((t) => ({
    id: String(t.id),
    title: t.title,
    artist: t.user.username,
    streamUrl: `${t.stream_url}?client_id=${SC_CONFIG.clientId}`,
    artworkUrl: t.artwork_url ?? undefined,
    duration: Math.round(t.duration / 1000)
  }));
}

/**
 * Fetch all playlists for the configured SoundCloud user and flatten their
 * tracks into a single array mapped to the SmokeyBox `Track` type.
 */
const fetchUserTracks = async (): Promise<Track[]> => {
  const url = `${SC_CONFIG.apiBase}/users/${SC_CONFIG.userId}/playlists?client_id=${SC_CONFIG.clientId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`SoundCloud API error: ${response.status}`);
  }
  const playlists: SCPlaylist[] = await response.json();
  return playlists.flatMap((playlist) => mapTracks(playlist.tracks));
};

/**
 * Fetch a specific playlist by URL via the SoundCloud /resolve endpoint.
 */
const fetchPlaylistByUrl = async (playlistUrl: string): Promise<Track[]> => {
  const resolveUrl = `${SC_CONFIG.apiBase}/resolve?url=${encodeURIComponent(playlistUrl)}&client_id=${SC_CONFIG.clientId}`;
  const response = await fetch(resolveUrl);
  if (!response.ok) {
    throw new Error(`SoundCloud API error: ${response.status}`);
  }
  const playlist: SCPlaylist = await response.json();
  return mapTracks(playlist.tracks);
};

/**
 * Custom hook that fetches SoundCloud playlist tracks.
 *
 * When called with no arguments, fetches all playlists for the configured user.
 * When called with a playlist URL, fetches that specific playlist via /resolve.
 */
export const useSoundCloudPlaylist = (playlistUrl?: string) => {
  const queryKey = playlistUrl
    ? [QueryKeys.SOUNDCLOUD_SPOKEN_WORD, playlistUrl]
    : [QueryKeys.SOUNDCLOUD_TRACKS];

  const fetcher = playlistUrl
    ? () => fetchPlaylistByUrl(playlistUrl)
    : fetchUserTracks;

  const { data, isLoading, error } = useQuery<Track[], Error>(
    queryKey,
    fetcher,
    {
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      enabled: playlistUrl !== "" // don't fetch if empty string passed
    }
  );

  return {
    tracks: data ?? [],
    isLoading,
    error: error?.message ?? null
  };
};
```

- [ ] **Step 3: Verify build**

Run: `yarn build`
Expected: Build succeeds. Existing `useSoundCloudPlaylist()` calls (no args) still work identically.

- [ ] **Step 4: Commit**

```bash
git add hooks/useSoundCloudPlaylist/index.ts hooks/queryKeys.ts
git commit -m "feat: refactor useSoundCloudPlaylist to accept optional playlist URL"
```

---

## Task 4: SmokeyBox — Hide Chrome on /listen

**Files:**
- Modify: `components/SmokeyBox/SmokeyBox.tsx`
- Modify: `components/SmokeyBox/SmokeyBoxCollapsed.tsx`

- [ ] **Step 1: Hide SmokeyBox chrome when on /listen**

In `components/SmokeyBox/SmokeyBox.tsx`, add `useRouter` import:

```typescript
import { useRouter } from "next/router";
```

Inside the `SmokeyBox` function, add after the existing state declarations:

```typescript
const router = useRouter();
const isListenPage = router.pathname === "/listen";
```

Replace the return JSX. The key change: wrap the chrome (collapsed/expanded) in a conditional, but always render SoundCloudLayer:

```tsx
return (
  <>
    {/* Audio layer — always mounted to preserve AudioContext */}
    <SoundCloudLayer onAnalyserReady={handleAnalyserReady} />

    {/* Visual chrome — hidden on /listen page */}
    {!isListenPage && (
      <div
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-700"
        style={{
          background:
            "linear-gradient(180deg, #2c2c2e 0%, #1c1c1e 40%, #141414 100%)",
          boxShadow: "0 -2px 12px rgba(0,0,0,0.5)"
        }}
      >
        {/* Metallic top edge highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)"
          }}
        />

        {/* Smooth height transition wrapper */}
        <div
          className="transition-all duration-300 ease-in-out overflow-hidden"
          style={{
            maxHeight: isExpanded ? "480px" : "64px"
          }}
        >
          {isExpanded ? (
            <SmokeyBoxExpanded analyserNode={analyserNode} />
          ) : (
            <SmokeyBoxCollapsed />
          )}
        </div>
      </div>
    )}
  </>
);
```

Note: `SoundCloudLayer` moves outside the chrome wrapper div so it's always mounted regardless of route. The existing `if (!activated || (!currentTrack && !currentVideo)) return null;` guard now needs to only guard the chrome, not the SoundCloudLayer. Adjust the early return:

```typescript
// SoundCloudLayer is always rendered. Chrome only shows when activated + has content + not on /listen.
if (!activated || (!currentTrack && !currentVideo)) {
  return <SoundCloudLayer onAnalyserReady={handleAnalyserReady} />;
}
```

- [ ] **Step 2: Update SmokeyBoxCollapsed mode cycling**

In `components/SmokeyBox/SmokeyBoxCollapsed.tsx`:

Add imports:

```typescript
import { Tv, Disc3, Mic } from "lucide-react";
import type { ContentMode } from "./types";
```

Replace the `MODE_ICONS` and `MODE_CYCLE` constants:

```typescript
/** Icon displayed for each content mode. */
const CONTENT_MODE_ICONS: Record<ContentMode, typeof Tv> = {
  "music-videos": Tv,
  albums: Disc3,
  "spoken-word": Mic
};

/** Cycle order for content mode toggling. */
const CONTENT_MODE_CYCLE: ContentMode[] = [
  "music-videos",
  "albums",
  "spoken-word"
];
```

Update the component to read `contentMode` from state:

```typescript
const { isPlaying, currentTrack, mode, volume, contentMode } = state;

const ModeIcon = CONTENT_MODE_ICONS[contentMode];
```

Update `handleModeToggle` to cycle content modes. This is a simplified cycle that doesn't pass playlist data (the playlists stay as-is — full mode switching with playlist loading is handled by ModeSwitch on the /listen page):

```typescript
const handleModeToggle = () => {
  const currentIndex = CONTENT_MODE_CYCLE.indexOf(contentMode);
  const nextContentMode = CONTENT_MODE_CYCLE[(currentIndex + 1) % CONTENT_MODE_CYCLE.length];
  dispatch({
    type: "SET_CONTENT_MODE",
    payload: { contentMode: nextContentMode }
  });
};
```

Remove the old `MODE_ICONS`, `MODE_CYCLE`, unused `PlayerMode` import, and `Disc3` import if present.

- [ ] **Step 3: Verify build**

Run: `yarn build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/SmokeyBox/SmokeyBox.tsx components/SmokeyBox/SmokeyBoxCollapsed.tsx
git commit -m "feat: hide SmokeyBox chrome on /listen, cycle content modes in collapsed bar"
```

---

## Task 5: Header Rework — JamesFajardo Font + Mobile Fixes + Listen Link

**Files:**
- Modify: `components/Header/Header.tsx`

- [ ] **Step 1: Apply all Header changes**

In `components/Header/Header.tsx`:

**1. Fix vertical padding** (line 66):
Change `py-2.5 pb-3 sm:py-3` to `py-2 sm:py-3`

```tsx
<div className="relative flex flex-row items-center justify-center py-2 sm:py-3">
```

**2. Fix logo container width** (line 75):
Change `w-[355px]` and padding:

```tsx
<div className="flex w-auto max-w-[200px] sm:max-w-[355px] cursor-pointer items-center justify-center px-3 py-2 sm:px-7 sm:py-4">
```

**3. Responsive logo height** (line 91-92):
Change the fixed height to use `isMobile`:

```tsx
style={{ width: "auto", height: isMobile ? "45px" : "65px" }}
```

**4. Fix right side spacing** (line 101):
Change `right-2.5` to responsive and add gap:

```tsx
<div className="absolute right-3 sm:right-2.5 z-[2] flex w-auto flex-row items-center gap-2 justify-between sm:justify-end">
```

**5. Add "Listen" link before auth section** — insert after the SearchBar (line 102), before the user check:

```tsx
{!isMobile && (
  <Link
    href="/listen"
    className={cn(
      "mx-2.5 font-display text-lg no-underline transition-colors",
      pathname === "/listen"
        ? "pointer-events-none cursor-default text-muted-foreground"
        : "text-foreground hover:text-brand"
    )}
  >
    Listen
  </Link>
)}
```

**6. Switch all font-title to font-display** — apply `replace_all` for `font-title` to `font-display` in this file. This covers:
- Account dropdown trigger button (line 109)
- LOGIN link (line 209)
- SIGN UP link (line 219)
- Dropdown menu content (line 116)

**7. Fix cart badge margin** (line 232):
Change `mr-0.5` to responsive:

```tsx
<div className="-mt-2.5 mr-2 sm:mr-0.5 relative text-foreground sm:-mt-2.5">
```

- [ ] **Step 2: Verify build**

Run: `yarn build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/Header/Header.tsx
git commit -m "feat: header JamesFajardo font, Listen link, mobile alignment fixes"
```

---

## Task 6: MobileMenu — JamesFajardo Font + Listen Link

**Files:**
- Modify: `components/MainMenu/MobileMenu.tsx`

- [ ] **Step 1: Add Listen as first menu item and switch font**

In `components/MainMenu/MobileMenu.tsx`:

**1. Switch all `font-title` to `font-display`** throughout the file. This affects:
- Menu item buttons (line 80)
- "Music" button (line 127)
- "Login" button (line 141)
- "Sign Up" button (line 150)
- SheetTitle (line 117)
- Footer text (line 159)

**2. Add "Listen" button as the first item** in the scroll area content (after the opening `<div className="flex flex-col px-6 py-4">`), before the "Music" button:

```tsx
{/* Listen Link — first item */}
<button
  onClick={() => {
    setOpen(false);
    router.push("/listen");
  }}
  className={cn(
    "w-full cursor-pointer border-none bg-transparent py-2.5 text-left font-display text-lg text-foreground transition-colors hover:text-brand outline-none",
    router.pathname === "/listen" && "pointer-events-none text-muted-foreground"
  )}
>
  Listen
</button>
```

- [ ] **Step 2: Verify build**

Run: `yarn build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/MainMenu/MobileMenu.tsx
git commit -m "feat: MobileMenu JamesFajardo font, Listen as first item"
```

---

## Task 7: ListenFAB — Floating Action Button

**Files:**
- Create: `components/shared/ListenFAB.tsx`
- Modify: `pages/_app.tsx`

- [ ] **Step 1: Create ListenFAB component**

Create `components/shared/ListenFAB.tsx`:

```tsx
import { useRouter } from "next/router";
import { Headphones } from "lucide-react";
import { usePlayer } from "@components/SmokeyBox";

/**
 * Floating action button that navigates to the /listen page.
 * Hidden when already on /listen. Shows a pulsing dot when music is playing.
 */
export function ListenFAB() {
  const router = useRouter();
  const { state } = usePlayer();

  if (router.pathname === "/listen") return null;

  return (
    <button
      onClick={() => router.push("/listen")}
      className="fixed bottom-20 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-100 select-none cursor-pointer"
      style={{
        background: "linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}
      aria-label="Open listening experience"
    >
      <Headphones className="w-6 h-6 text-gray-300" />

      {/* Playing indicator */}
      {state.isPlaying && (
        <div
          className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full animate-pulse"
          style={{
            backgroundColor: "#22c55e",
            boxShadow: "0 0 6px rgba(34, 197, 94, 0.6)"
          }}
        />
      )}
    </button>
  );
}
```

- [ ] **Step 2: Add ListenFAB to _app.tsx**

In `pages/_app.tsx`, add the import:

```typescript
import { ListenFAB } from "@components/shared/ListenFAB";
```

In the main return JSX, add `<ListenFAB />` right before `<SmokeyBox />` (around line 100):

```tsx
<ListenFAB />
<SmokeyBox />
```

- [ ] **Step 3: Verify build**

Run: `yarn build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/shared/ListenFAB.tsx pages/_app.tsx
git commit -m "feat: add ListenFAB floating button to navigate to /listen"
```

---

## Task 8: Listen Page — Components and Route

**Files:**
- Create: `components/Listen/ListenHeader.tsx`
- Create: `components/Listen/ModeSwitch.tsx`
- Create: `components/Listen/PlaylistBrowser.tsx`
- Create: `components/Listen/ListenControls.tsx`
- Create: `components/Listen/ListenPage.tsx`
- Create: `pages/listen.tsx`

- [ ] **Step 1: Create ListenHeader**

Create `components/Listen/ListenHeader.tsx`:

```tsx
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

/**
 * Minimal top bar for the /listen page.
 * Back arrow on the left, "Smokey FM" wordmark on the right.
 */
export function ListenHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between py-4 px-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 border-none bg-transparent text-white/70 hover:text-white cursor-pointer transition-colors outline-none"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <Link
        href="/"
        className="font-display text-xl text-white/70 hover:text-white no-underline transition-colors"
      >
        Smokey FM
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Create ModeSwitch**

Create `components/Listen/ModeSwitch.tsx`:

```tsx
import { Tv, Disc3, Mic } from "lucide-react";
import { TransportButton } from "@components/SmokeyBox/TransportButton";
import { LEDIndicator } from "@components/SmokeyBox/LEDIndicator";
import { usePlayer } from "@components/SmokeyBox";
import { DEFAULT_VIDEOS } from "@components/SmokeyBox/constants";
import { useSoundCloudPlaylist } from "../../hooks/useSoundCloudPlaylist";
import type { ContentMode } from "@components/SmokeyBox/types";

const SPOKEN_WORD_URL = process.env.NEXT_PUBLIC_SPOKEN_WORD_PLAYLIST_URL || "";

const MODES: {
  mode: ContentMode;
  label: string;
  Icon: typeof Tv;
}[] = [
  { mode: "music-videos", label: "Videos", Icon: Tv },
  { mode: "albums", label: "Albums", Icon: Disc3 },
  { mode: "spoken-word", label: "Spoken", Icon: Mic }
];

interface ModeSwitchProps {
  albumTracks: ReturnType<typeof useSoundCloudPlaylist>["tracks"];
  spokenWordTracks: ReturnType<typeof useSoundCloudPlaylist>["tracks"];
}

/**
 * Content mode toggle — switches between Music Videos, Albums, and Spoken Word.
 * Dispatches SET_CONTENT_MODE with playlist data.
 */
export function ModeSwitch({ albumTracks, spokenWordTracks }: ModeSwitchProps) {
  const { state, dispatch } = usePlayer();
  const { contentMode } = state;

  const handleModeChange = (mode: ContentMode) => {
    if (mode === contentMode) return;

    dispatch({
      type: "SET_CONTENT_MODE",
      payload: {
        contentMode: mode,
        ...(mode === "music-videos"
          ? { videoPlaylist: DEFAULT_VIDEOS }
          : mode === "albums"
            ? { playlist: albumTracks }
            : { playlist: spokenWordTracks })
      }
    });
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {MODES.map(({ mode, label, Icon }) => (
        <div key={mode} className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            <LEDIndicator
              color="green"
              active={contentMode === mode}
            />
            <TransportButton
              onClick={() => handleModeChange(mode)}
              size="sm"
              active={contentMode === mode}
            >
              <Icon className="w-3.5 h-3.5" />
            </TransportButton>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-mono">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create PlaylistBrowser**

Create `components/Listen/PlaylistBrowser.tsx`:

```tsx
import { usePlayer } from "@components/SmokeyBox";
import type { Track, YouTubeVideo } from "@components/SmokeyBox/types";

/** Format seconds as m:ss. */
function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Scrollable playlist/video list for the /listen page.
 * Shows tracks for albums/spoken-word modes, videos for music-videos mode.
 */
export function PlaylistBrowser() {
  const { state, dispatch } = usePlayer();
  const { contentMode, playlist, videoPlaylist, trackIndex, videoIndex } = state;

  const isVideoMode = contentMode === "music-videos";
  const items = isVideoMode ? videoPlaylist : playlist;
  const activeIndex = isVideoMode ? videoIndex : trackIndex;

  const handleSelect = (index: number) => {
    if (isVideoMode) {
      dispatch({
        type: "SET_VIDEO",
        payload: { video: videoPlaylist[index], index }
      });
    } else {
      dispatch({
        type: "SET_TRACK",
        payload: { track: playlist[index], index }
      });
    }
    dispatch({ type: "SET_PLAYING", payload: true });
  };

  if (items.length === 0) {
    return (
      <div
        className="rounded-lg px-4 py-6 text-center text-sm text-gray-500"
        style={{
          background: "rgba(0,0,0,0.3)",
          boxShadow: "inset 0 1px 4px rgba(0,0,0,0.5)"
        }}
      >
        Loading tracks...
      </div>
    );
  }

  return (
    <div
      className="max-h-[200px] sm:max-h-[300px] overflow-y-auto rounded-lg"
      style={{
        background: "rgba(0,0,0,0.3)",
        boxShadow: "inset 0 1px 4px rgba(0,0,0,0.5)"
      }}
    >
      {items.map((item, idx) => {
        const isTrack = "duration" in item;
        return (
          <button
            key={item.id}
            onClick={() => handleSelect(idx)}
            className={`w-full text-left px-4 py-2 flex items-center gap-3 text-sm transition-colors border-none bg-transparent cursor-pointer outline-none ${
              idx === activeIndex
                ? "bg-white/10 text-gray-100"
                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
            }`}
          >
            <span className="w-6 text-right font-mono text-xs text-gray-600 flex-shrink-0">
              {idx + 1}
            </span>
            <span className="truncate flex-1">{item.title}</span>
            {isTrack && (
              <span className="text-xs font-mono text-gray-600 flex-shrink-0">
                {formatTime((item as Track).duration)}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Create ListenControls**

Create `components/Listen/ListenControls.tsx`:

```tsx
import { useCallback, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { usePlayer } from "@components/SmokeyBox";
import { TransportButton } from "@components/SmokeyBox/TransportButton";
import { Knob } from "@components/SmokeyBox/Knob";
import { VUMeter } from "@components/SmokeyBox/VUMeter";
import { LEDIndicator } from "@components/SmokeyBox/LEDIndicator";

interface ListenControlsProps {
  analyserNode: AnalyserNode | null;
}

/** Format seconds as m:ss. */
function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Scaled-up retro transport controls for the /listen page.
 * Uses xl-sized TransportButtons, larger Knobs and VU meters.
 */
export function ListenControls({ analyserNode }: ListenControlsProps) {
  const { state, dispatch } = usePlayer();
  const { isPlaying, volume, progress, duration, mode } = state;
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleTogglePlay = () => dispatch({ type: "TOGGLE_PLAY" });
  const handlePrev = () => dispatch({ type: "PREV_TRACK" });
  const handleNext = () => dispatch({ type: "NEXT_TRACK" });
  const handleVolumeChange = (v: number) =>
    dispatch({ type: "SET_VOLUME", payload: v });

  const handleSeekKnob = useCallback(
    (v: number) => {
      if (!duration) return;
      dispatch({
        type: "SET_PROGRESS",
        payload: { progress: v * duration, duration }
      });
    },
    [duration, dispatch]
  );

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = progressBarRef.current;
      if (!bar || !duration) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(
        0,
        Math.min(1, (e.clientX - rect.left) / rect.width)
      );
      dispatch({
        type: "SET_PROGRESS",
        payload: { progress: ratio * duration, duration }
      });
    },
    [duration, dispatch]
  );

  const progressRatio = duration > 0 ? progress / duration : 0;

  // Responsive sizes
  const knobSize = isMobile ? 48 : 64;
  const vuWidth = isMobile ? 80 : 120;
  const vuHeight = isMobile ? 32 : 48;
  const vuBars = isMobile ? 10 : 16;
  const playSize = isMobile ? "lg" as const : "xl" as const;
  const skipSize = isMobile ? "sm" as const : "md" as const;

  return (
    <div className="flex flex-col gap-4">
      {/* Progress bar */}
      <div>
        <div
          ref={progressBarRef}
          onClick={handleProgressClick}
          className="relative h-2.5 bg-gray-700 rounded-full cursor-pointer overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={duration}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${progressRatio * 100}%`,
              background: "linear-gradient(90deg, #EB8B8B, #e05555)"
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs font-mono text-gray-500">
            {formatTime(progress)}
          </span>
          <span className="text-xs font-mono text-gray-500">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* LEDs */}
      <div className="flex gap-3 justify-center">
        <LEDIndicator color="green" active={isPlaying} pulse label="play" />
        <LEDIndicator
          color="amber"
          active={mode === "youtube-only"}
          label="vid"
        />
        <LEDIndicator
          color="red"
          active={mode === "soundcloud-only"}
          label="aud"
        />
      </div>

      {/* Transport + Knobs + VU */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
        <VUMeter
          analyserNode={analyserNode}
          width={vuWidth}
          height={vuHeight}
          barCount={vuBars}
        />

        <div className="flex items-center gap-2">
          <TransportButton onClick={handlePrev} size={skipSize}>
            <SkipBack className={isMobile ? "w-3.5 h-3.5" : "w-5 h-5"} />
          </TransportButton>

          <TransportButton
            onClick={handleTogglePlay}
            size={playSize}
            active={isPlaying}
          >
            {isPlaying ? (
              <Pause className={isMobile ? "w-5 h-5" : "w-7 h-7"} />
            ) : (
              <Play className={isMobile ? "w-5 h-5 ml-0.5" : "w-7 h-7 ml-1"} />
            )}
          </TransportButton>

          <TransportButton onClick={handleNext} size={skipSize}>
            <SkipForward className={isMobile ? "w-3.5 h-3.5" : "w-5 h-5"} />
          </TransportButton>
        </div>

        <div className="flex items-center gap-4">
          <Knob
            value={volume}
            onChange={handleVolumeChange}
            size={knobSize}
            label="volume"
          />
          <Knob
            value={progressRatio}
            onChange={handleSeekKnob}
            size={knobSize}
            label="seek"
          />
        </div>

        <VUMeter
          analyserNode={analyserNode}
          width={vuWidth}
          height={vuHeight}
          barCount={vuBars}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create ListenPage**

Create `components/Listen/ListenPage.tsx`:

```tsx
import { useEffect, useRef } from "react";
import { Music } from "lucide-react";
import { usePlayer } from "@components/SmokeyBox";
import { useCityMorph } from "@components/CityMorph/CityMorphContext";
import { conditions } from "@components/CityMorph/conditions";
import { YouTubeLayer } from "@components/SmokeyBox/YouTubeLayer";
import { useSoundCloudPlaylist } from "../../hooks/useSoundCloudPlaylist";
import { ListenHeader } from "./ListenHeader";
import { ListenControls } from "./ListenControls";
import { ModeSwitch } from "./ModeSwitch";
import { PlaylistBrowser } from "./PlaylistBrowser";

const SPOKEN_WORD_URL = process.env.NEXT_PUBLIC_SPOKEN_WORD_PLAYLIST_URL || "";

/**
 * Main listening page — full-screen experience over CityMorph backdrop.
 * Reads from the global PlayerProvider state, dispatches the same actions.
 */
export function ListenPage() {
  const { state, dispatch } = usePlayer();
  const { contentMode, currentTrack, currentVideo } = state;

  // Fetch playlists for mode switching
  const { tracks: albumTracks, isLoading: albumsLoading } =
    useSoundCloudPlaylist();
  // Pass the spoken word URL (or empty string if not configured).
  // The hook's `enabled` option prevents fetching when URL is "".
  const { tracks: spokenWordTracks } = useSoundCloudPlaylist(
    SPOKEN_WORD_URL || ""
  );

  // Auto-load albums playlist if nothing is loaded on mount
  const hasAutoLoaded = useRef(false);
  useEffect(() => {
    if (
      !hasAutoLoaded.current &&
      !albumsLoading &&
      albumTracks.length > 0 &&
      !currentTrack &&
      !currentVideo
    ) {
      dispatch({ type: "SET_PLAYLIST", payload: albumTracks });
      hasAutoLoaded.current = true;
    }
  }, [albumTracks, albumsLoading, currentTrack, currentVideo, dispatch]);

  // AnalyserNode from context — shared with SmokeyBox via PlayerProvider.
  // SoundCloudLayer (always mounted in SmokeyBox) sets this on first play.
  const { analyserNode } = usePlayer();

  // CityMorph condition for album art glow
  const { conditionOverride } = useCityMorph();
  const currentCondition = conditionOverride
    ? conditions.find((c) => c.name === conditionOverride) || conditions[0]
    : null;
  const glowColor =
    currentCondition?.textGlow || "0 0 40px rgba(235,139,139,0.3)";

  const isVideoMode = contentMode === "music-videos";

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <ListenHeader />

      <div className="flex-1 flex flex-col px-4 sm:px-8 pb-8 gap-6 max-w-6xl mx-auto w-full">
        {/* Media display + Track info — side by side on desktop, stacked on mobile */}
        <div className="flex flex-col sm:flex-row gap-6 flex-1 min-h-0">
          {/* Media display */}
          <div className="sm:w-1/2 flex items-center justify-center">
            {isVideoMode ? (
              <div
                className="w-full rounded-lg overflow-hidden"
                style={{
                  boxShadow:
                    "inset 0 2px 4px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)"
                }}
              >
                <YouTubeLayer isVisible={true} />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {currentTrack?.artworkUrl ? (
                  <img
                    src={currentTrack.artworkUrl}
                    alt={currentTrack.title}
                    className="w-full max-w-[400px] sm:max-w-[50vw] rounded-lg shadow-2xl transition-shadow duration-[10s]"
                    style={{
                      boxShadow:
                        glowColor !== "none"
                          ? glowColor
                          : "0 0 40px rgba(235,139,139,0.3)"
                    }}
                  />
                ) : (
                  <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-lg bg-gray-800/50 flex items-center justify-center animate-pulse">
                    <Music className="w-16 h-16 text-gray-600" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Track info panel */}
          <div
            className="sm:w-1/2 rounded-lg p-6 flex flex-col gap-4"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)"
            }}
          >
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-white truncate">
                {currentTrack?.title ?? currentVideo?.title ?? "Loading..."}
              </h2>
              <p className="mt-1 text-base text-white/60 truncate">
                {currentTrack?.artist ?? "--"}
              </p>
            </div>

            <ListenControls analyserNode={analyserNode} />
          </div>
        </div>

        {/* Mode switcher */}
        <ModeSwitch
          albumTracks={albumTracks}
          spokenWordTracks={spokenWordTracks}
        />

        {/* Playlist browser */}
        <PlaylistBrowser />
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create page route**

Create `pages/listen.tsx`:

```tsx
import { ListenPage } from "@components/Listen/ListenPage";

export default function Listen() {
  return <ListenPage />;
}
```

- [ ] **Step 7: Verify build**

Run: `yarn build`
Expected: Build succeeds. Navigate to `/listen` in dev mode to verify the page renders.

- [ ] **Step 8: Commit**

```bash
git add components/Listen/ pages/listen.tsx
git commit -m "feat: add /listen page with full-screen listening experience"
```

---

## Task 9: Visual QA and Dev Verification

**Files:** None (verification only)

- [ ] **Step 1: Start dev server**

Run: `yarn dev`

- [ ] **Step 2: Verify Header changes**

Open `http://localhost:3000` in browser:
- Confirm JamesFajardo font on all nav text (LOGIN, SIGN UP, Listen link)
- Resize to mobile width — verify logo shrinks to 45px, spacing is clean, no overlap
- Confirm "Listen" link is visible on desktop, styled correctly

- [ ] **Step 3: Verify MobileMenu changes**

On mobile viewport:
- Open burger menu
- Confirm "Listen" is the first item in JamesFajardo font
- Tap "Listen" — should navigate to `/listen`

- [ ] **Step 4: Verify /listen page**

- Navigate to `/listen`
- Confirm CityMorph backdrop shows through
- Confirm SmokeyBox bottom bar is hidden
- Confirm back arrow navigates back
- Confirm album art displays for Albums mode
- Switch to Music Videos mode — confirm YouTube embed appears
- Switch modes — confirm playlist content updates
- Confirm transport controls (play, skip) work
- Confirm volume and seek knobs respond

- [ ] **Step 5: Verify ListenFAB**

- Navigate away from `/listen` to homepage
- Confirm floating headphones button appears bottom-right
- Click it — should navigate to `/listen`
- Confirm it's hidden on `/listen` page
- Start playback — confirm green pulse dot appears on FAB

- [ ] **Step 6: Verify SmokeyBox collapsed bar**

- Navigate to homepage
- Start playback
- Confirm mode cycle button on collapsed bar cycles through Videos/Albums/Spoken Word icons
- Confirm playback continues when navigating to/from `/listen`

- [ ] **Step 7: Final build check**

Run: `yarn build`
Expected: Production build succeeds with no errors.

- [ ] **Step 8: Commit any fixes**

If any visual QA fixes were needed:

```bash
git add -A
git commit -m "fix: visual QA fixes for listen page and header rework"
```
