import { useState, useEffect, useRef, useCallback } from "react";

import { conditions, CityCondition } from "./conditions";
import { useCityMorph } from "./CityMorphContext";

const CYCLE_INTERVAL_MS = 75_000; // 75 seconds between condition changes
const TRANSITION_DURATION_MS = 10_000; // 10-second crossfade

function getRandomIndex(excludeIndex?: number): number {
  const count = conditions.length;
  if (excludeIndex === undefined) {
    return Math.floor(Math.random() * count);
  }
  // Pick a random index that differs from the excluded one
  let idx = Math.floor(Math.random() * (count - 1));
  if (idx >= excludeIndex) idx += 1;
  return idx;
}

export interface ThemeCycleResult {
  currentCondition: CityCondition;
  nextCondition: CityCondition;
  transitionProgress: number;
}

export function useThemeCycle(): ThemeCycleResult {
  const { conditionOverride } = useCityMorph();

  const [initialIndex] = useState<number>(() => getRandomIndex());
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [nextIndex, setNextIndex] = useState<number>(() =>
    getRandomIndex(initialIndex)
  );
  const [transitionProgress, setTransitionProgress] = useState(0);

  const transitionStartRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTransitioningRef = useRef(false);

  // Handle override: find the matching condition index
  const overrideIndex =
    conditionOverride !== null
      ? conditions.findIndex((c) => c.name === conditionOverride)
      : -1;

  const startTransition = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    transitionStartRef.current = performance.now();

    const animate = (now: number) => {
      if (transitionStartRef.current === null) return;

      const elapsed = now - transitionStartRef.current;
      const rawProgress = Math.min(elapsed / TRANSITION_DURATION_MS, 1);
      // ease-in-out cubic
      const eased =
        rawProgress < 0.5
          ? 4 * rawProgress * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

      setTransitionProgress(eased);

      if (rawProgress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Transition complete: promote next to current
        isTransitioningRef.current = false;
        transitionStartRef.current = null;
        setCurrentIndex(() => {
          setNextIndex(getRandomIndex(nextIndex));
          return nextIndex;
        });
        setTransitionProgress(0);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [nextIndex]);

  // Cycling interval — only when no override is active
  useEffect(() => {
    if (conditionOverride !== null) return;

    intervalRef.current = setInterval(() => {
      startTransition();
    }, CYCLE_INTERVAL_MS);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [conditionOverride, startTransition]);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // When override is set, snap to that condition immediately
  useEffect(() => {
    if (overrideIndex >= 0) {
      // Cancel any in-progress transition
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      isTransitioningRef.current = false;
      transitionStartRef.current = null;
      setTransitionProgress(0);
      setCurrentIndex(overrideIndex);
      setNextIndex(overrideIndex);
    }
  }, [overrideIndex]);

  // Determine effective conditions
  const effectiveCurrent =
    overrideIndex >= 0 ? conditions[overrideIndex] : conditions[currentIndex];
  const effectiveNext =
    overrideIndex >= 0 ? conditions[overrideIndex] : conditions[nextIndex];

  return {
    currentCondition: effectiveCurrent,
    nextCondition: effectiveNext,
    transitionProgress: overrideIndex >= 0 ? 0 : transitionProgress
  };
}
