/**
 * SmokeyBox Player Types
 *
 * Type definitions for the dual-mode AV player that supports
 * simultaneous (muted YouTube + SoundCloud audio) and
 * single-source (YouTube-only or SoundCloud-only) playback.
 */

/** The three playback modes for the SmokeyBox player. */
export type PlayerMode = "simultaneous" | "youtube-only" | "soundcloud-only";

/** A SoundCloud (or other audio source) track. */
export interface Track {
  id: string;
  title: string;
  artist: string;
  streamUrl: string;
  artworkUrl?: string;
  /** Duration in seconds. */
  duration: number;
}

/** A YouTube video entry. */
export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
}

/** The full player state managed by the reducer. */
export interface PlayerState {
  mode: PlayerMode;
  isPlaying: boolean;
  isExpanded: boolean;
  /** Volume level from 0 to 1. */
  volume: number;
  currentTrack: Track | null;
  currentVideo: YouTubeVideo | null;
  playlist: Track[];
  videoPlaylist: YouTubeVideo[];
  trackIndex: number;
  videoIndex: number;
  /** Current playback progress in seconds. */
  progress: number;
  /** Total duration of the current media in seconds. */
  duration: number;
}
