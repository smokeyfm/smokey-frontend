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
      {/* ===== Sky Layer (current) ===== */}
      <div
        className="fixed inset-0 z-0 transition-none"
        style={{
          background: currentCondition.skyGradient,
          opacity: isTransitioning ? 1 - transitionProgress : 1
        }}
        aria-hidden="true"
      />

      {/* ===== Sky Layer (next — fades in during transition) ===== */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-0"
          style={{
            background: nextCondition.skyGradient,
            opacity: transitionProgress
          }}
          aria-hidden="true"
        />
      )}

      {/* ===== Skyline Layer (current) ===== */}
      <div
        className="fixed inset-0 z-[1] bg-bottom bg-repeat-x"
        style={{
          backgroundImage: "url(/img/skyline.png)",
          backgroundSize: "auto 60%",
          filter: currentCondition.skylineFilter,
          opacity: isTransitioning ? 1 - transitionProgress : 1
        }}
        aria-hidden="true"
      />

      {/* ===== Skyline Layer (next — crossfade) ===== */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-[1] bg-bottom bg-repeat-x"
          style={{
            backgroundImage: "url(/img/skyline.png)",
            backgroundSize: "auto 60%",
            filter: nextCondition.skylineFilter,
            opacity: transitionProgress
          }}
          aria-hidden="true"
        />
      )}

      {/* ===== Fog Overlay ===== */}
      {showFog && (
        <div
          className="fixed inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(200,200,220,0.3) 0%, transparent 70%)",
            opacity: fogOpacity
          }}
          aria-hidden="true"
        />
      )}

      {/* ===== Rain Overlay ===== */}
      <RainOverlay active={showRain} opacity={rainOpacity} />

      {/* ===== Color Overlay (current) ===== */}
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

      {/* ===== Color Overlay (next — crossfade) ===== */}
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

      {/* ===== Content ===== */}
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
