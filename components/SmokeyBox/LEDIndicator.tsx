interface LEDIndicatorProps {
  color: "green" | "amber" | "red";
  active: boolean;
  pulse?: boolean;
  label?: string;
}

const LED_COLORS = {
  green: { on: "#22c55e", glow: "rgba(34, 197, 94, 0.6)" },
  amber: { on: "#f59e0b", glow: "rgba(245, 158, 11, 0.6)" },
  red: { on: "#ef4444", glow: "rgba(239, 68, 68, 0.6)" }
} as const;

export function LEDIndicator({
  color,
  active,
  pulse,
  label
}: LEDIndicatorProps) {
  const colors = LED_COLORS[color];

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          pulse && active ? "animate-pulse" : ""
        }`}
        style={{
          backgroundColor: active ? colors.on : "#333",
          boxShadow: active
            ? `0 0 6px ${colors.glow}, 0 0 12px ${colors.glow}`
            : "inset 0 1px 2px rgba(0,0,0,0.5)"
        }}
      />
      {label && (
        <span className="text-[8px] uppercase tracking-wider text-gray-500 font-mono">
          {label}
        </span>
      )}
    </div>
  );
}
