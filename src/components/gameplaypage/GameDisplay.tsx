import React, { useEffect, useRef } from "react";
import { loadPlayer } from "rtsp-relay/browser";

interface GameDisplayProps {
  className?: string;
  onPlayClick: () => void;
  isPlaying: boolean;
}

export default function GameDisplay({ className, onPlayClick, isPlaying }: GameDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isPlaying && canvasRef.current) {
      loadPlayer({
        url: "ws://localhost:2000/api/stream",
        canvas: canvasRef.current,
      });
    }
  }, [isPlaying]);

  return (
    <div className={`${className}`}>
      <canvas ref={canvasRef} className="w-full h-full rounded-lg"></canvas>
    </div>
  );
}