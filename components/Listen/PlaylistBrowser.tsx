import { usePlayer } from "@components/SmokeyBox";
import type { Track } from "@components/SmokeyBox/types";

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlaylistBrowser() {
  const { state, dispatch } = usePlayer();
  const { contentMode, playlist, videoPlaylist, trackIndex, videoIndex } =
    state;

  const isVideoMode = contentMode === "music-videos";
  const items = isVideoMode ? videoPlaylist : playlist;
  const activeIndex = isVideoMode ? videoIndex : trackIndex;

  const handleSelect = (index: number) => {
    if (isVideoMode) {
      dispatch({
        type: "SET_VIDEO",
        payload: { video: videoPlaylist[index], index }
      });
    } else {
      dispatch({
        type: "SET_TRACK",
        payload: { track: playlist[index], index }
      });
    }
    dispatch({ type: "SET_PLAYING", payload: true });
  };

  if (items.length === 0) {
    return (
      <div
        className="rounded-lg px-4 py-6 text-center text-sm text-gray-500"
        style={{
          background: "rgba(0,0,0,0.3)",
          boxShadow: "inset 0 1px 4px rgba(0,0,0,0.5)"
        }}
      >
        Loading tracks...
      </div>
    );
  }

  return (
    <div
      className="max-h-[200px] sm:max-h-[300px] overflow-y-auto rounded-lg"
      style={{
        background: "rgba(0,0,0,0.3)",
        boxShadow: "inset 0 1px 4px rgba(0,0,0,0.5)"
      }}
    >
      {items.map((item, idx) => {
        const isTrack = "duration" in item;
        return (
          <button
            key={item.id}
            onClick={() => handleSelect(idx)}
            className={`w-full text-left px-4 py-2 flex items-center gap-3 text-sm transition-colors border-none bg-transparent cursor-pointer outline-none ${
              idx === activeIndex
                ? "bg-white/10 text-gray-100"
                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
            }`}
          >
            <span className="w-6 text-right font-mono text-xs text-gray-600 flex-shrink-0">
              {idx + 1}
            </span>
            <span className="truncate flex-1">{item.title}</span>
            {isTrack && (
              <span className="text-xs font-mono text-gray-600 flex-shrink-0">
                {formatTime((item as Track).duration)}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
