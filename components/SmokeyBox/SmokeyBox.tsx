import { useState, useCallback } from "react";

import { usePlayer } from "./PlayerProvider";
import { SmokeyBoxCollapsed } from "./SmokeyBoxCollapsed";
import { SmokeyBoxExpanded } from "./SmokeyBoxExpanded";
import { SoundCloudLayer } from "./SoundCloudLayer";

/**
 * SmokeyBox — main dual-mode AV player.
 *
 * Fixed to the bottom of the viewport. Contains the YouTube and SoundCloud
 * layers plus a collapsed/expanded chrome. Manages the AnalyserNode ref that
 * the VU meters consume.
 */
export function SmokeyBox() {
  const { state } = usePlayer();
  const { isExpanded, currentTrack, currentVideo } = state;

  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  const handleAnalyserReady = useCallback((analyser: AnalyserNode) => {
    setAnalyserNode(analyser);
  }, []);

  // If there is nothing to play at all, don't render the player bar.
  if (!currentTrack && !currentVideo) return null;

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
          <SmokeyBoxExpanded analyserNode={analyserNode} />
        ) : (
          <SmokeyBoxCollapsed />
        )}
      </div>

      {/* Audio layers (always mounted to preserve AudioContext) */}
      <SoundCloudLayer onAnalyserReady={handleAnalyserReady} />
    </div>
  );
}
