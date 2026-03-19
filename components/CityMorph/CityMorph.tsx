import React, { ReactNode } from "react";

import { RainOverlay } from "./RainOverlay";
import { useThemeCycle } from "./useThemeCycle";

interface CityMorphProps {
  children: ReactNode;
}

export const CityMorph: React.FC<CityMorphProps> = ({ children }) => {
  const { currentCondition, nextCondition, transitionProgress } =
    useThemeCycle();

  const isTransitioning = transitionProgress > 0 && transitionProgress < 1;

  // Determine rain state — active if either condition has rain during transition
  const showRain =
    currentCondition.hasRain || (isTransitioning && nextCondition.hasRain);
  const rainOpacity = currentCondition.hasRain
    ? isTransitioning
      ? 1 - transitionProgress
      : 1
    : isTransitioning && nextCondition.hasRain
    ? transitionProgress
    : 0;

  // Determine fog state
  const showFog =
    currentCondition.hasFog || (isTransitioning && nextCondition.hasFog);
  const fogOpacity = currentCondition.hasFog
    ? isTransitioning
      ? 1 - transitionProgress
      : 0.5
    : isTransitioning && nextCondition.hasFog
    ? transitionProgress * 0.5
    : 0;

  // Text glow — blend between current and next
  const textGlow = isTransitioning
    ? transitionProgress < 0.5
      ? currentCondition.textGlow
      : nextCondition.textGlow
    : currentCondition.textGlow;

  return (
    <div className="relative min-h-screen">
      {/* ===== Stars Layer — slowly rotating starfield (z-0) ===== */}
      <div
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-[-50%] h-[200%] w-[200%]"
          style={{
            backgroundImage: "url(/img/stars.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "spin 120s linear infinite"
          }}
        />
      </div>

      {/* ===== City Photo Layer — blurred NYC with angled gradual blur (z-[1]) ===== */}
      {/* Sharp base layer */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: "url(/img/bg_image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: currentCondition.cityPhotoFilter.replace(/blur\([^)]*\)/, ""),
          opacity: isTransitioning ? 1 - transitionProgress : 1
        }}
        aria-hidden="true"
      />
      {isTransitioning && (
        <div
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage: "url(/img/bg_image.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: nextCondition.cityPhotoFilter.replace(/blur\([^)]*\)/, ""),
            opacity: transitionProgress
          }}
          aria-hidden="true"
        />
      )}
      {/* Blurred layer masked with top-to-bottom gradient for angled blur effect */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: "url(/img/bg_image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: currentCondition.cityPhotoFilter,
          opacity: isTransitioning ? 1 - transitionProgress : 1,
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 75%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 75%)"
        }}
        aria-hidden="true"
      />
      {isTransitioning && (
        <div
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            backgroundImage: "url(/img/bg_image.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: nextCondition.cityPhotoFilter,
            opacity: transitionProgress,
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 75%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 75%)"
          }}
          aria-hidden="true"
        />
      )}

      {/* ===== Skyline Layer — single blurred silhouette (z-[2]) ===== */}
      <div
        className="fixed inset-0 z-[2] bg-bottom bg-repeat-x pointer-events-none"
        style={{
          backgroundImage: "url(/img/skyline.png)",
          backgroundSize: "auto 60%",
          filter: `${currentCondition.skylineFilter} blur(2px)`,
          opacity: 0.7
        }}
        aria-hidden="true"
      />

      {/* ===== Color Overlay (current) (z-[3]) ===== */}
      <div
        className="fixed inset-0 z-[3] pointer-events-none"
        style={{
          backgroundColor: currentCondition.overlayColor,
          opacity: isTransitioning
            ? (1 - transitionProgress) * currentCondition.overlayOpacity
            : currentCondition.overlayOpacity
        }}
        aria-hidden="true"
      />

      {/* ===== Color Overlay (next — crossfade) (z-[3]) ===== */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-[3] pointer-events-none"
          style={{
            backgroundColor: nextCondition.overlayColor,
            opacity: transitionProgress * nextCondition.overlayOpacity
          }}
          aria-hidden="true"
        />
      )}

      {/* ===== Static/Glitch Overlay (z-[4]) ===== */}
      <div
        className="fixed inset-0 z-[4] pointer-events-none"
        style={{
          backgroundImage: "url(/img/static.gif)",
          backgroundSize: "cover",
          mixBlendMode: "screen",
          opacity: isTransitioning
            ? (1 - transitionProgress) * currentCondition.staticOpacity +
              transitionProgress * nextCondition.staticOpacity
            : currentCondition.staticOpacity
        }}
        aria-hidden="true"
      />

      {/* ===== Fog Overlay (z-[5]) ===== */}
      {showFog && (
        <div
          className="fixed inset-0 z-[5] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(200,200,220,0.3) 0%, transparent 70%)",
            opacity: fogOpacity
          }}
          aria-hidden="true"
        />
      )}

      {/* ===== Rain Overlay (z-[6]) ===== */}
      <RainOverlay active={showRain} opacity={rainOpacity} />

      {/* ===== Content (z-10) ===== */}
      <div
        className="relative z-10"
        style={{
          textShadow: textGlow !== "none" ? textGlow : undefined
        }}
      >
        {children}
      </div>
    </div>
  );
};
