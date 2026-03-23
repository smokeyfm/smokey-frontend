import { useEffect, useRef } from "react";
import { Music } from "lucide-react";
import { usePlayer } from "@components/SmokeyBox";
import { useCityMorph } from "@components/CityMorph/CityMorphContext";
import { conditions } from "@components/CityMorph/conditions";
import { YouTubeLayer } from "@components/SmokeyBox/YouTubeLayer";
import { useSoundCloudPlaylist } from "../../hooks/useSoundCloudPlaylist";
import { ListenHeader } from "./ListenHeader";
import { ListenControls } from "./ListenControls";
import { ModeSwitch } from "./ModeSwitch";
import { PlaylistBrowser } from "./PlaylistBrowser";

const SPOKEN_WORD_URL = process.env.NEXT_PUBLIC_SPOKEN_WORD_PLAYLIST_URL || "";

export function ListenPage() {
  const { state, dispatch, analyserNode } = usePlayer();
  const { contentMode, currentTrack, currentVideo } = state;

  const { tracks: albumTracks, isLoading: albumsLoading } =
    useSoundCloudPlaylist();
  const { tracks: spokenWordTracks } = useSoundCloudPlaylist(
    SPOKEN_WORD_URL || ""
  );

  // Auto-load albums playlist if nothing is loaded on mount
  const hasAutoLoaded = useRef(false);
  useEffect(() => {
    if (
      !hasAutoLoaded.current &&
      !albumsLoading &&
      albumTracks.length > 0 &&
      !currentTrack &&
      !currentVideo
    ) {
      dispatch({ type: "SET_PLAYLIST", payload: albumTracks });
      hasAutoLoaded.current = true;
    }
  }, [albumTracks, albumsLoading, currentTrack, currentVideo, dispatch]);

  // CityMorph condition for album art glow
  const { conditionOverride } = useCityMorph();
  const currentCondition = conditionOverride
    ? conditions.find((c) => c.name === conditionOverride) || conditions[0]
    : null;
  const glowColor =
    currentCondition?.textGlow || "0 0 40px rgba(235,139,139,0.3)";

  const isVideoMode = contentMode === "music-videos";

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <ListenHeader />

      <div className="flex-1 flex flex-col px-4 sm:px-8 pb-8 gap-6 max-w-6xl mx-auto w-full">
        {/* Media display + Track info */}
        <div className="flex flex-col sm:flex-row gap-6 flex-1 min-h-0">
          {/* Media display */}
          <div className="sm:w-1/2 flex items-center justify-center">
            {isVideoMode ? (
              <div
                className="w-full rounded-lg overflow-hidden"
                style={{
                  boxShadow:
                    "inset 0 2px 4px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.4)"
                }}
              >
                <YouTubeLayer isVisible={true} />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                {currentTrack?.artworkUrl ? (
                  <img
                    src={currentTrack.artworkUrl}
                    alt={currentTrack.title}
                    className="w-full max-w-[400px] sm:max-w-[50vw] rounded-lg shadow-2xl transition-shadow duration-[10s]"
                    style={{
                      boxShadow:
                        glowColor !== "none"
                          ? glowColor
                          : "0 0 40px rgba(235,139,139,0.3)"
                    }}
                  />
                ) : (
                  <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-lg bg-gray-800/50 flex items-center justify-center animate-pulse">
                    <Music className="w-16 h-16 text-gray-600" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Track info panel */}
          <div
            className="sm:w-1/2 rounded-lg p-6 flex flex-col gap-4"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)"
            }}
          >
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-white truncate">
                {currentTrack?.title ?? currentVideo?.title ?? "Loading..."}
              </h2>
              <p className="mt-1 text-base text-white/60 truncate">
                {currentTrack?.artist ?? "--"}
              </p>
            </div>

            <ListenControls analyserNode={analyserNode} />
          </div>
        </div>

        {/* Mode switcher */}
        <ModeSwitch
          albumTracks={albumTracks}
          spokenWordTracks={spokenWordTracks}
        />

        {/* Playlist browser */}
        <PlaylistBrowser />
      </div>
    </div>
  );
}
