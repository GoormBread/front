import React, { useEffect, useRef, useState } from "react";
import { loadPlayer } from "rtsp-relay/browser";

interface GameDisplayProps {
  className?: string;
  onPlayClick: () => void;
  isPlaying: boolean;
}

export default function GameDisplay({ className, onPlayClick, isPlaying }: GameDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDelayedPlaying, setIsDelayedPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const delay = setTimeout(() => {
        setIsDelayedPlaying(true);
      }, 100);

      return () => clearTimeout(delay);
    } else {
      setIsDelayedPlaying(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isDelayedPlaying && canvasRef.current) {
      loadPlayer({
        url: "ws://paran2024.iptime.org:32000/api/stream",
        canvas: canvasRef.current,
      });
    }
  }, [isDelayedPlaying]);

  return (
    <div className={`flex justify-center items-center ${className}`}>
      {isDelayedPlaying && (
        <canvas ref={canvasRef} className="w-[768px] h-[768px] rounded-lg"></canvas>
      )}
    </div>
  );
}