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
