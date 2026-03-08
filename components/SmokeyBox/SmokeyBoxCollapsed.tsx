import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronUp,
  Music,
  Tv,
  Radio
} from "lucide-react";

import { usePlayer } from "./PlayerProvider";
import { TransportButton } from "./TransportButton";
import { Knob } from "./Knob";
import { LEDIndicator } from "./LEDIndicator";
import type { PlayerMode } from "./types";

/** Icon displayed for each player mode. */
const MODE_ICONS: Record<PlayerMode, typeof Music> = {
  simultaneous: Tv,
  "youtube-only": Tv,
  "soundcloud-only": Radio
};

/** Cycle order for mode toggling. */
const MODE_CYCLE: PlayerMode[] = [
  "simultaneous",
  "youtube-only",
  "soundcloud-only"
];

/**
 * SmokeyBoxCollapsed — slim bottom bar (h-16).
 *
 * Shows a compact transport strip with artwork, track info, play controls,
 * volume knob, mode toggle, and an expand button.
 */
export function SmokeyBoxCollapsed() {
  const { state, dispatch } = usePlayer();
  const { isPlaying, currentTrack, mode, volume } = state;

  const ModeIcon = MODE_ICONS[mode];

  const handleTogglePlay = () => dispatch({ type: "TOGGLE_PLAY" });
  const handlePrev = () => dispatch({ type: "PREV_TRACK" });
  const handleNext = () => dispatch({ type: "NEXT_TRACK" });
  const handleExpand = () => dispatch({ type: "TOGGLE_EXPANDED" });
  const handleVolumeChange = (v: number) =>
    dispatch({ type: "SET_VOLUME", payload: v });

  const handleModeToggle = () => {
    const currentIndex = MODE_CYCLE.indexOf(mode);
    const nextMode = MODE_CYCLE[(currentIndex + 1) % MODE_CYCLE.length];
    dispatch({ type: "SET_MODE", payload: nextMode });
  };

  return (
    <div className="h-16 flex items-center px-3 gap-3">
      {/* -- Left: Artwork + Track Info -- */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {/* Artwork thumbnail */}
        <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-gray-800 flex items-center justify-center">
          {currentTrack?.artworkUrl ? (
            <img
              src={currentTrack.artworkUrl}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Music className="w-5 h-5 text-gray-500" />
          )}
        </div>

        {/* Track text */}
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-200 truncate">
            {currentTrack?.title ?? "No track loaded"}
          </p>
          <p className="text-[10px] text-gray-500 truncate">
            {currentTrack?.artist ?? "--"}
          </p>
        </div>
      </div>

      {/* -- Center: Transport Buttons -- */}
      <div className="flex items-center gap-1">
        <TransportButton onClick={handlePrev} size="sm">
          <SkipBack className="w-3.5 h-3.5" />
        </TransportButton>

        <TransportButton onClick={handleTogglePlay} active={isPlaying}>
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </TransportButton>

        <TransportButton onClick={handleNext} size="sm">
          <SkipForward className="w-3.5 h-3.5" />
        </TransportButton>
      </div>

      {/* -- Right: Volume, Mode, LEDs, Expand -- */}
      <div className="flex items-center gap-2">
        {/* LED indicators */}
        <div className="flex flex-col gap-1">
          <LEDIndicator color="green" active={isPlaying} pulse />
          <LEDIndicator color="amber" active={mode !== "simultaneous"} />
        </div>

        {/* Volume knob */}
        <Knob
          value={volume}
          onChange={handleVolumeChange}
          size={32}
          label="vol"
        />

        {/* Mode toggle */}
        <TransportButton onClick={handleModeToggle} size="sm">
          <ModeIcon className="w-3.5 h-3.5" />
        </TransportButton>

        {/* Expand */}
        <TransportButton onClick={handleExpand} size="sm">
          <ChevronUp className="w-3.5 h-3.5" />
        </TransportButton>
      </div>
    </div>
  );
}
