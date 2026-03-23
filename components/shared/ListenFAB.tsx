import { useRouter } from "next/router";
import { Headphones } from "lucide-react";
import { usePlayer } from "@components/SmokeyBox";

/**
 * Floating action button that navigates to the /listen page.
 * Hidden when already on /listen. Shows a pulsing dot when music is playing.
 */
export function ListenFAB() {
  const router = useRouter();
  const { state } = usePlayer();

  if (router.pathname === "/listen") return null;

  return (
    <button
      onClick={() => router.push("/listen")}
      className="fixed bottom-20 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-100 select-none cursor-pointer"
      style={{
        background: "linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}
      aria-label="Open listening experience"
    >
      <Headphones className="w-6 h-6 text-gray-300" />

      {/* Playing indicator */}
      {state.isPlaying && (
        <div
          className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full animate-pulse"
          style={{
            backgroundColor: "#22c55e",
            boxShadow: "0 0 6px rgba(34, 197, 94, 0.6)"
          }}
        />
      )}
    </button>
  );
}
