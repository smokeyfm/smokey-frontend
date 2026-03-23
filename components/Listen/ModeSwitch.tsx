import { Tv, Disc3, Mic } from "lucide-react";
import { TransportButton } from "@components/SmokeyBox/TransportButton";
import { LEDIndicator } from "@components/SmokeyBox/LEDIndicator";
import { usePlayer } from "@components/SmokeyBox";
import { DEFAULT_VIDEOS } from "@components/SmokeyBox/constants";
import { useSoundCloudPlaylist } from "../../hooks/useSoundCloudPlaylist";
import type { ContentMode } from "@components/SmokeyBox/types";

const MODES: {
  mode: ContentMode;
  label: string;
  Icon: typeof Tv;
}[] = [
  { mode: "music-videos", label: "Videos", Icon: Tv },
  { mode: "albums", label: "Albums", Icon: Disc3 },
  { mode: "spoken-word", label: "Spoken", Icon: Mic }
];

interface ModeSwitchProps {
  albumTracks: ReturnType<typeof useSoundCloudPlaylist>["tracks"];
  spokenWordTracks: ReturnType<typeof useSoundCloudPlaylist>["tracks"];
}

export function ModeSwitch({ albumTracks, spokenWordTracks }: ModeSwitchProps) {
  const { state, dispatch } = usePlayer();
  const { contentMode } = state;

  const handleModeChange = (mode: ContentMode) => {
    if (mode === contentMode) return;

    dispatch({
      type: "SET_CONTENT_MODE",
      payload: {
        contentMode: mode,
        ...(mode === "music-videos"
          ? { videoPlaylist: DEFAULT_VIDEOS }
          : mode === "albums"
            ? { playlist: albumTracks }
            : { playlist: spokenWordTracks })
      }
    });
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {MODES.map(({ mode, label, Icon }) => (
        <div key={mode} className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            <LEDIndicator color="green" active={contentMode === mode} />
            <TransportButton
              onClick={() => handleModeChange(mode)}
              size="sm"
              active={contentMode === mode}
            >
              <Icon className="w-3.5 h-3.5" />
            </TransportButton>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-gray-500 font-mono">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
