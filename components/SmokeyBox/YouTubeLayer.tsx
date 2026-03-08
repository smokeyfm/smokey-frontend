import dynamic from "next/dynamic";
import { useCallback } from "react";

import { usePlayer } from "./PlayerProvider";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false
});

interface YouTubeLayerProps {
  /** Whether the player wrapper is expanded (affects visibility). */
  isVisible: boolean;
}

/**
 * YouTube video layer for the SmokeyBox player.
 *
 * Renders a ReactPlayer (dynamically imported) for the current YouTube video.
 * Behavior adapts based on the current player mode:
 *   - simultaneous: muted, playing, looped
 *   - youtube-only: unmuted, volume from state
 *   - soundcloud-only: not rendered
 */
export function YouTubeLayer({ isVisible }: YouTubeLayerProps) {
  const { state, dispatch } = usePlayer();
  const { mode, isPlaying, currentVideo, volume } = state;

  const handleEnded = useCallback(() => {
    dispatch({ type: "NEXT_VIDEO" });
  }, [dispatch]);

  // In soundcloud-only mode, don't render the YouTube layer at all.
  if (mode === "soundcloud-only") return null;

  // If there's no video to play, render nothing.
  if (!currentVideo) return null;

  const isMuted = mode === "simultaneous";
  const playerVolume = isMuted ? 0 : volume;

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none h-0"
      }`}
    >
      <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden">
        <ReactPlayer
          url={currentVideo.url}
          playing={isPlaying}
          muted={isMuted}
          volume={playerVolume}
          loop={mode === "simultaneous"}
          width="100%"
          height="100%"
          onEnded={handleEnded}
          config={{
            playerVars: {
              modestbranding: 1,
              rel: 0
            }
          }}
        />
      </div>
    </div>
  );
}
