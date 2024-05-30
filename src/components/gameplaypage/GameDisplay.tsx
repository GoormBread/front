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
        url: "ws://paran2024.iptime.org:32000/api/stream",
        canvas: canvasRef.current,
      });
    }
  }, [isPlaying]);

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <canvas ref={canvasRef} className="w-[768px] h-[768px] rounded-lg"></canvas>
    </div>
  );
}