import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ShoppingCart } from "lucide-react";
import { usePlayer } from "@components/SmokeyBox";
import { useCityMorph } from "@components/CityMorph/CityMorphContext";
import { conditions } from "@components/CityMorph/conditions";

const Hero: React.FC = () => {
  const { dispatch } = usePlayer();
  const { conditionOverride } = useCityMorph();

  // Get current condition's text glow for the album art shadow
  const currentCondition = conditionOverride
    ? conditions.find((c) => c.name === conditionOverride) || conditions[0]
    : null;
  const glowColor = currentCondition?.textGlow || "0 0 40px rgba(235,139,139,0.3)";

  const handleListen = () => {
    dispatch({ type: "TOGGLE_PLAY" });
    dispatch({ type: "TOGGLE_EXPANDED" });
  };

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-4">
      {/* Album art */}
      <div className="animate-fade-in">
        <Image
          src="/images/SkyChase-Watermark.jpg"
          alt="Sky Chase — Watermark"
          width={400}
          height={400}
          className="rounded-lg shadow-2xl transition-shadow duration-[10s]"
          style={{
            boxShadow: glowColor !== "none" ? glowColor : "0 0 40px rgba(235,139,139,0.3)",
          }}
          priority
        />
      </div>

      {/* Album info */}
      <div className="mt-6 animate-fade-up text-center">
        <h1 className="font-display text-3xl tracking-wide text-white sm:text-4xl">
          Sky Chase
        </h1>
        <p className="mt-1 font-body text-lg text-white/60">Watermark</p>
      </div>

      {/* CTAs */}
      <div className="mt-6 flex animate-fade-up gap-4">
        <button
          onClick={handleListen}
          className="btn-skeuo-primary flex items-center gap-2 px-6 py-3 font-title text-sm font-semibold cursor-pointer"
        >
          <Play className="h-4 w-4" />
          Listen Now
        </button>
        <Link
          href="/sky-chase-watermark"
          className="btn-skeuo flex items-center gap-2 px-6 py-3 font-title text-sm font-semibold no-underline"
        >
          <ShoppingCart className="h-4 w-4" />
          Buy
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 animate-fade-in opacity-40">
        <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white/60 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
