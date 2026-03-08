import React, { useRef, useEffect, useCallback } from "react";

interface RainOverlayProps {
  active: boolean;
  opacity: number;
}

interface RainDrop {
  x: number;
  y: number;
  speed: number;
  length: number;
}

const DROP_COUNT = 200;

function createDrops(width: number, height: number): RainDrop[] {
  const drops: RainDrop[] = [];
  for (let i = 0; i < DROP_COUNT; i++) {
    drops.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 4 + Math.random() * 8,
      length: 10 + Math.random() * 20
    });
  }
  return drops;
}

export const RainOverlay: React.FC<RainOverlayProps> = ({
  active,
  opacity
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dropsRef = useRef<RainDrop[]>([]);
  const rafRef = useRef<number | null>(null);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dropsRef.current = createDrops(canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    if (!active) return;

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = `rgba(174, 194, 224, ${opacity * 0.6})`;
      ctx.lineWidth = 1;

      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + 0.5, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;

        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [active, opacity, resize]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
};
