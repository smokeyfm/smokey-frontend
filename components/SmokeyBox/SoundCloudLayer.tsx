import { useRef, useEffect, useCallback } from "react";

import { usePlayer } from "./PlayerProvider";

interface SoundCloudLayerProps {
  /** Callback fired when the AnalyserNode is ready for the VU meter. */
  onAnalyserReady: (analyser: AnalyserNode) => void;
}

/**
 * SoundCloud audio layer for the SmokeyBox player.
 *
 * Uses a raw `<audio>` element for direct Web Audio API access.
 * Creates an AudioContext and AnalyserNode on first play (browser policy
 * requires user interaction before creating an AudioContext).
 */
export function SoundCloudLayer({ onAnalyserReady }: SoundCloudLayerProps) {
  const { state, dispatch } = usePlayer();
  const { mode, isPlaying, currentTrack, volume } = state;

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const isAudioSetUp = useRef(false);

  // -----------------------------------------------------------------------
  // Set up the Web Audio API graph once (on first play interaction).
  // -----------------------------------------------------------------------
  const setupAudioContext = useCallback(() => {
    if (isAudioSetUp.current || !audioRef.current) return;

    try {
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
      isAudioSetUp.current = true;

      onAnalyserReady(analyser);
    } catch {
      // AudioContext may fail if the element has already been connected.
      // Silently ignore — the player will still function without the VU meter.
    }
  }, [onAnalyserReady]);

  // -----------------------------------------------------------------------
  // Play / pause control.
  // -----------------------------------------------------------------------
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // In youtube-only mode, pause the audio layer.
    if (mode === "youtube-only") {
      audio.pause();
      return;
    }

    if (isPlaying) {
      // Set up AudioContext on first play (satisfies browser autoplay policy).
      setupAudioContext();

      // Resume the AudioContext if it was suspended.
      if (audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume();
      }

      audio.play().catch(() => {
        // Autoplay prevented — user hasn't interacted yet.
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, mode, setupAudioContext]);

  // -----------------------------------------------------------------------
  // Volume control.
  // -----------------------------------------------------------------------
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = mode === "youtube-only" ? 0 : volume;
    }
  }, [volume, mode]);

  // -----------------------------------------------------------------------
  // Track change — reset to beginning of new track.
  // -----------------------------------------------------------------------
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.load();

    if (isPlaying && mode !== "youtube-only") {
      audio.play().catch(() => {
        // Autoplay may be blocked.
      });
    }
    // We intentionally omit `isPlaying` from deps — we only want to reload
    // when the track itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.id, mode]);

  // -----------------------------------------------------------------------
  // Event handlers.
  // -----------------------------------------------------------------------
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    dispatch({
      type: "SET_PROGRESS",
      payload: {
        progress: audio.currentTime,
        duration: audio.duration || 0
      }
    });
  }, [dispatch]);

  const handleEnded = useCallback(() => {
    dispatch({ type: "NEXT_TRACK" });
  }, [dispatch]);

  // -----------------------------------------------------------------------
  // Cleanup AudioContext on unmount.
  // -----------------------------------------------------------------------
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // In youtube-only mode we still render the element (to preserve AudioContext)
  // but it will be paused.
  if (!currentTrack) return null;

  return (
    <audio
      ref={audioRef}
      src={currentTrack.streamUrl}
      preload="auto"
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
      className="hidden"
    />
  );
}
