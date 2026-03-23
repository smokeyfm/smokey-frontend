import { useCallback, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronDown,
  Music,
  Tv,
  Radio,
  Disc3
} from "lucide-react";

import { usePlayer } from "./PlayerProvider";
import { TransportButton } from "./TransportButton";
import { Knob } from "./Knob";
import { VUMeter } from "./VUMeter";
import { LEDIndicator } from "./LEDIndicator";
import { YouTubeLayer } from "./YouTubeLayer";
import type { PlayerMode, Track } from "./types";

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

/** Format seconds as m:ss. */
function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** Mode button metadata. */
const MODES: { mode: PlayerMode; label: string; Icon: typeof Tv }[] = [
  { mode: "simultaneous", label: "Dual", Icon: Disc3 },
  { mode: "youtube-only", label: "Video", Icon: Tv },
  { mode: "soundcloud-only", label: "Audio", Icon: Radio }
];

/**
 * SmokeyBoxExpanded — full expanded panel (max-h-[400px]).
 *
 * Shows YouTube video, track info, full transport controls, VU meters,
 * playlist browser, and mode selector.
 */
export function SmokeyBoxExpanded() {
  const { state, dispatch, analyserNode } = usePlayer();
  const {
    isPlaying,
    currentTrack,
    currentVideo,
    mode,
    volume,
    progress,
    duration,
    playlist,
    trackIndex
  } = state;

  const progressBarRef = useRef<HTMLDivElement>(null);

  // -----------------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------------
  const handleTogglePlay = () => dispatch({ type: "TOGGLE_PLAY" });
  const handlePrev = () => dispatch({ type: "PREV_TRACK" });
  const handleNext = () => dispatch({ type: "NEXT_TRACK" });
  const handleCollapse = () => dispatch({ type: "TOGGLE_EXPANDED" });
  const handleVolumeChange = (v: number) =>
    dispatch({ type: "SET_VOLUME", payload: v });

  const handleModeChange = (m: PlayerMode) =>
    dispatch({ type: "SET_MODE", payload: m });

  const handleSelectTrack = (track: Track, index: number) => {
    dispatch({ type: "SET_TRACK", payload: { track, index } });
    dispatch({ type: "SET_PLAYING", payload: true });
  };

  /** Seek by clicking on the progress bar. */
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

  /** Seek knob change maps 0-1 to 0-duration. */
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

  const progressRatio = duration > 0 ? progress / duration : 0;

  return (
    <div className="max-h-[400px] overflow-hidden">
      {/* -- Top section: Video + Track Info -- */}
      <div className="flex gap-4 p-4">
        {/* YouTube video (left) */}
        <div className="w-1/2 min-w-0">
          <YouTubeLayer isVisible={mode !== "soundcloud-only"} />

          {/* When no video, show placeholder */}
          {(!currentVideo || mode === "soundcloud-only") && (
            <div className="aspect-video bg-black/40 rounded-md flex items-center justify-center">
              <Tv className="w-8 h-8 text-gray-600" />
            </div>
          )}
        </div>

        {/* Track info panel (right) */}
        <div
          className="w-1/2 min-w-0 rounded-lg p-4 flex flex-col gap-3"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)"
          }}
        >
          {/* Artwork + text */}
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-800 flex items-center justify-center">
              {currentTrack?.artworkUrl ? (
                <img
                  src={currentTrack.artworkUrl}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Music className="w-6 h-6 text-gray-500" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-100 truncate">
                {currentTrack?.title ?? "No track loaded"}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {currentTrack?.artist ?? "--"}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div
              ref={progressBarRef}
              onClick={handleProgressClick}
              className="relative h-2 bg-gray-700 rounded-full cursor-pointer overflow-hidden"
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
              <span className="text-[10px] font-mono text-gray-500">
                {formatTime(progress)}
              </span>
              <span className="text-[10px] font-mono text-gray-500">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* LEDs */}
          <div className="flex gap-3">
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
        </div>
      </div>

      {/* -- Controls row -- */}
      <div className="flex items-center justify-between px-4 pb-2">
        {/* Transport */}
        <div className="flex items-center gap-2">
          <TransportButton onClick={handlePrev} size="sm">
            <SkipBack className="w-4 h-4" />
          </TransportButton>

          <TransportButton
            onClick={handleTogglePlay}
            size="lg"
            active={isPlaying}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </TransportButton>

          <TransportButton onClick={handleNext} size="sm">
            <SkipForward className="w-4 h-4" />
          </TransportButton>
        </div>

        {/* Knobs */}
        <div className="flex items-center gap-4">
          <Knob
            value={volume}
            onChange={handleVolumeChange}
            size={40}
            label="volume"
          />
          <Knob
            value={progressRatio}
            onChange={handleSeekKnob}
            size={40}
            label="seek"
          />
        </div>

        {/* VU Meters */}
        <div className="flex items-center gap-2">
          <VUMeter
            analyserNode={analyserNode}
            width={60}
            height={28}
            barCount={10}
          />
          <VUMeter
            analyserNode={analyserNode}
            width={60}
            height={28}
            barCount={10}
          />
        </div>

        {/* Mode selector */}
        <div className="flex items-center gap-1">
          {MODES.map(({ mode: m, label, Icon }) => (
            <TransportButton
              key={m}
              onClick={() => handleModeChange(m)}
              size="sm"
              active={mode === m}
            >
              <Icon className="w-3.5 h-3.5" />
            </TransportButton>
          ))}
        </div>

        {/* Collapse */}
        <TransportButton onClick={handleCollapse} size="sm">
          <ChevronDown className="w-4 h-4" />
        </TransportButton>
      </div>

      {/* -- Playlist browser -- */}
      {playlist.length > 0 && (
        <div className="px-4 pb-3">
          <div
            className="max-h-[120px] overflow-y-auto rounded-md"
            style={{
              background: "rgba(0,0,0,0.3)",
              boxShadow: "inset 0 1px 4px rgba(0,0,0,0.5)"
            }}
          >
            {playlist.map((track, idx) => (
              <button
                key={track.id}
                onClick={() => handleSelectTrack(track, idx)}
                className={`w-full text-left px-3 py-1.5 flex items-center gap-2 text-xs transition-colors ${
                  idx === trackIndex
                    ? "bg-white/10 text-gray-100"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <span className="w-5 text-right font-mono text-[10px] text-gray-600 flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="truncate flex-1">{track.title}</span>
                <span className="text-[10px] font-mono text-gray-600 flex-shrink-0">
                  {formatTime(track.duration)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
