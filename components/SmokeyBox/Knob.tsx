import { useRef, useCallback } from "react";

interface KnobProps {
  value: number; // 0-1
  onChange: (value: number) => void;
  size?: number; // px, default 48
  label?: string;
}

export function Knob({ value, onChange, size = 48, label }: KnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const rotation = value * 270 - 135; // -135 to +135 degrees

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      startY.current = e.clientY;
      startValue.current = value;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [value]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const delta = (startY.current - e.clientY) / 150;
      const newValue = Math.max(0, Math.min(1, startValue.current + delta));
      onChange(newValue);
    },
    [onChange]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        ref={knobRef}
        className="relative cursor-grab active:cursor-grabbing select-none"
        style={{ width: size, height: size }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Knob body with grooves */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #2a2a2a, #4a4a4a, #2a2a2a, #4a4a4a, #2a2a2a, #4a4a4a, #2a2a2a)",
            boxShadow: [
              "0 2px 8px rgba(0,0,0,0.6)",
              "inset 0 1px 1px rgba(255,255,255,0.1)",
              "inset 0 -1px 1px rgba(0,0,0,0.3)"
            ].join(", ")
          }}
        />
        {/* Groove rings */}
        <div
          className="absolute inset-[3px] rounded-full"
          style={{
            background:
              "repeating-radial-gradient(circle at center, transparent 0px, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 3px)"
          }}
        />
        {/* Indicator line */}
        <div
          className="absolute inset-0 flex justify-center"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div
            className="w-[2px] h-[35%] rounded-full"
            style={{ background: "#EB8B8B" }}
          />
        </div>
      </div>
      {label && (
        <span className="text-[9px] uppercase tracking-widest text-gray-500 font-mono">
          {label}
        </span>
      )}
    </div>
  );
}
