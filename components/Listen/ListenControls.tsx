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

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

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

  const knobSize = isMobile ? 48 : 64;
  const vuWidth = isMobile ? 80 : 120;
  const vuHeight = isMobile ? 32 : 48;
  const vuBars = isMobile ? 10 : 16;
  const playSize = isMobile ? ("lg" as const) : ("xl" as const);
  const skipSize = isMobile ? ("sm" as const) : ("md" as const);

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
              <Play
                className={isMobile ? "w-5 h-5 ml-0.5" : "w-7 h-7 ml-1"}
              />
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
