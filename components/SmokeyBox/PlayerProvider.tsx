import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode
} from "react";

import type {
  ContentMode,
  PlayerMode,
  PlayerState,
  Track,
  YouTubeVideo
} from "./types";
import { CONTENT_MODE_TO_PLAYER_MODE } from "./constants";

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type PlayerAction =
  | { type: "SET_MODE"; payload: PlayerMode }
  | { type: "TOGGLE_PLAY" }
  | { type: "SET_PLAYING"; payload: boolean }
  | { type: "TOGGLE_EXPANDED" }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_TRACK"; payload: { track: Track; index: number } }
  | { type: "SET_VIDEO"; payload: { video: YouTubeVideo; index: number } }
  | { type: "SET_PLAYLIST"; payload: Track[] }
  | { type: "SET_VIDEO_PLAYLIST"; payload: YouTubeVideo[] }
  | { type: "NEXT_TRACK" }
  | { type: "PREV_TRACK" }
  | { type: "NEXT_VIDEO" }
  | { type: "SET_PROGRESS"; payload: { progress: number; duration: number } }
  | { type: "QUEUE_TRACK"; payload: Track }
  | {
      type: "SET_CONTENT_MODE";
      payload: {
        contentMode: ContentMode;
        playlist?: Track[];
        videoPlaylist?: YouTubeVideo[];
      };
    };

// ---------------------------------------------------------------------------
// Initial State
// ---------------------------------------------------------------------------

const initialState: PlayerState = {
  mode: "soundcloud-only",
  contentMode: "albums",
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Clamp a number between a min and max value. */
function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.payload };

    case "TOGGLE_PLAY":
      return { ...state, isPlaying: !state.isPlaying };

    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload };

    case "TOGGLE_EXPANDED":
      return { ...state, isExpanded: !state.isExpanded };

    case "SET_VOLUME":
      return { ...state, volume: clamp(action.payload, 0, 1) };

    case "SET_TRACK":
      return {
        ...state,
        currentTrack: action.payload.track,
        trackIndex: action.payload.index,
        progress: 0,
        duration: action.payload.track.duration
      };

    case "SET_VIDEO":
      return {
        ...state,
        currentVideo: action.payload.video,
        videoIndex: action.payload.index
      };

    case "SET_PLAYLIST": {
      const tracks = action.payload;
      if (tracks.length === 0) {
        return {
          ...state,
          playlist: [],
          currentTrack: null,
          trackIndex: 0,
          progress: 0,
          duration: 0
        };
      }
      return {
        ...state,
        playlist: tracks,
        currentTrack: tracks[0],
        trackIndex: 0,
        progress: 0,
        duration: tracks[0].duration
      };
    }

    case "SET_VIDEO_PLAYLIST": {
      const videos = action.payload;
      if (videos.length === 0) {
        return {
          ...state,
          videoPlaylist: [],
          currentVideo: null,
          videoIndex: 0
        };
      }
      return {
        ...state,
        videoPlaylist: videos,
        currentVideo: videos[0],
        videoIndex: 0
      };
    }

    case "NEXT_TRACK": {
      const { playlist, trackIndex } = state;
      if (playlist.length === 0) return state;
      const nextIndex = (trackIndex + 1) % playlist.length;
      return {
        ...state,
        trackIndex: nextIndex,
        currentTrack: playlist[nextIndex],
        progress: 0,
        duration: playlist[nextIndex].duration
      };
    }

    case "PREV_TRACK": {
      const { playlist, trackIndex } = state;
      if (playlist.length === 0) return state;
      const prevIndex = (trackIndex - 1 + playlist.length) % playlist.length;
      return {
        ...state,
        trackIndex: prevIndex,
        currentTrack: playlist[prevIndex],
        progress: 0,
        duration: playlist[prevIndex].duration
      };
    }

    case "NEXT_VIDEO": {
      const { videoPlaylist, videoIndex } = state;
      if (videoPlaylist.length === 0) return state;
      const nextVidIndex = (videoIndex + 1) % videoPlaylist.length;
      return {
        ...state,
        videoIndex: nextVidIndex,
        currentVideo: videoPlaylist[nextVidIndex]
      };
    }

    case "SET_PROGRESS":
      return {
        ...state,
        progress: action.payload.progress,
        duration: action.payload.duration
      };

    case "QUEUE_TRACK": {
      const updatedPlaylist = [...state.playlist, action.payload];
      // If the playlist was empty, also set the new track as current.
      if (state.playlist.length === 0) {
        return {
          ...state,
          playlist: updatedPlaylist,
          currentTrack: action.payload,
          trackIndex: 0,
          progress: 0,
          duration: action.payload.duration
        };
      }
      return { ...state, playlist: updatedPlaylist };
    }

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

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface PlayerContextValue {
  state: PlayerState;
  dispatch: Dispatch<PlayerAction>;
  analyserNode: AnalyserNode | null;
  setAnalyserNode: (node: AnalyserNode | null) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface PlayerProviderProps {
  children: ReactNode;
}

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

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access the SmokeyBox player state and dispatch.
 *
 * Must be used within a `<PlayerProvider>`.
 */
export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (ctx === null) {
    throw new Error("usePlayer must be used within a <PlayerProvider>");
  }
  return ctx;
}
