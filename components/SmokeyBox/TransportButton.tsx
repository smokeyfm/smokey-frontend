import type { ReactNode } from "react";

interface TransportButtonProps {
  onClick: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  active?: boolean;
}

const SIZES = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12"
} as const;

export function TransportButton({
  onClick,
  children,
  size = "md",
  active
}: TransportButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${SIZES[size]}
        flex items-center justify-center rounded-full
        transition-all duration-100 select-none
        text-gray-300 hover:text-white
      `}
      style={{
        background: active
          ? "linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)"
          : "linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%)",
        boxShadow: active
          ? "inset 0 2px 4px rgba(0,0,0,0.6), inset 0 -1px 1px rgba(255,255,255,0.05)"
          : "0 2px 4px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}
    >
      {children}
    </button>
  );
}
