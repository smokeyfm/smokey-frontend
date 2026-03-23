import { useState, useCallback, useEffect, useRef } from "react";

import { usePlayer } from "./PlayerProvider";
import { SmokeyBoxCollapsed } from "./SmokeyBoxCollapsed";
import { SmokeyBoxExpanded } from "./SmokeyBoxExpanded";
import { SoundCloudLayer } from "./SoundCloudLayer";
import { useSoundCloudPlaylist } from "../../hooks/useSoundCloudPlaylist";
import { DEFAULT_VIDEOS } from "./constants";

/**
 * SmokeyBox — main dual-mode AV player.
 *
 * Fixed to the bottom of the viewport. Contains the YouTube and SoundCloud
 * layers plus a collapsed/expanded chrome. Manages the AnalyserNode ref that
 * the VU meters consume.
 */
export function SmokeyBox() {
  const { state, dispatch, setAnalyserNode } = usePlayer();
  const { isExpanded, currentTrack, currentVideo } = state;

  // Don't render the player bar until the user has interacted (play/expand).
  const [activated, setActivated] = useState(false);
  useEffect(() => {
    if (state.isPlaying || state.isExpanded) setActivated(true);
  }, [state.isPlaying, state.isExpanded]);

  // --- SoundCloud playlist integration ---
  const { tracks, isLoading } = useSoundCloudPlaylist();
  const hasDispatchedTracks = useRef(false);

  useEffect(() => {
    if (!isLoading && tracks.length > 0 && !hasDispatchedTracks.current) {
      dispatch({ type: "SET_PLAYLIST", payload: tracks });
      hasDispatchedTracks.current = true;
    }
  }, [tracks, isLoading, dispatch]);

  // --- Default video playlist ---
  const hasDispatchedVideos = useRef(false);

  useEffect(() => {
    if (!hasDispatchedVideos.current) {
      dispatch({ type: "SET_VIDEO_PLAYLIST", payload: DEFAULT_VIDEOS });
      hasDispatchedVideos.current = true;
    }
  }, [dispatch]);

  const handleAnalyserReady = useCallback((analyser: AnalyserNode) => {
    setAnalyserNode(analyser);
  }, []);

  // Don't render until user has interacted AND there is something to play.
  if (!activated || (!currentTrack && !currentVideo)) return null;

  return (
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
          <SmokeyBoxExpanded />
        ) : (
          <SmokeyBoxCollapsed />
        )}
      </div>

      {/* Audio layers (always mounted to preserve AudioContext) */}
      <SoundCloudLayer onAnalyserReady={handleAnalyserReady} />
    </div>
  );
}
