import React, { useEffect, useRef, useState } from "react";
import { loadPlayer } from "rtsp-relay/browser";

interface GameDisplayProps {
  className?: string;
}

export default function GameDisplay({ className }: GameDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const delay = 0;

    const timer = setTimeout(() => {
      setShowCanvas(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (showCanvas && canvasRef.current) {
      loadPlayer({
        url: "ws://localhost:2000/api/stream",
        canvas: canvasRef.current,
      });
    }
  }, [showCanvas]);

  return (
    <div className={`${className}`}>
      {showCanvas && (
        <canvas ref={canvasRef} className="w-full h-full rounded-lg"></canvas>
      )}
    </div>
  );
}