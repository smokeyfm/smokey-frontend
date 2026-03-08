import { useEffect, useRef } from "react";

interface VUMeterProps {
  analyserNode: AnalyserNode | null;
  width?: number;
  height?: number;
  barCount?: number;
}

export function VUMeter({
  analyserNode,
  width = 80,
  height = 32,
  barCount = 12
}: VUMeterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!analyserNode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = (width - (barCount - 1) * 2) / barCount;

    const draw = () => {
      analyserNode.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < barCount; i++) {
        // Sample from spread of frequency data
        const dataIndex = Math.floor((i / barCount) * bufferLength);
        const barHeight = (dataArray[dataIndex] / 255) * height;
        const x = i * (barWidth + 2);
        const y = height - barHeight;

        // Color gradient: green -> yellow -> red
        const ratio = i / barCount;
        let color: string;
        if (ratio < 0.6) color = "#22c55e";
        else if (ratio < 0.8) color = "#eab308";
        else color = "#ef4444";

        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Dim unfilled portion
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.fillRect(x, 0, barWidth, y);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [analyserNode, width, height, barCount]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-sm"
      style={{
        background: "rgba(0,0,0,0.4)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)"
      }}
    />
  );
}
