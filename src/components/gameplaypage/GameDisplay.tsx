import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { loadPlayer } from "rtsp-relay/browser";

interface GameDisplayProps {
  className?: string;
  onPlayClick: () => void;
  isPlaying: boolean;
}

export default function GameDisplay({ className, onPlayClick, isPlaying }: GameDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {lobbyID} = useParams();

  useEffect(() => {
    if (isPlaying && canvasRef.current) {
      loadPlayer({
        //ws://paran2024.iptime.org/play-goormbread/로비아이디/api/stream
        url: `ws://paran2024.iptime.org/play-goormbread/${lobbyID}/api/stream`,
        canvas: canvasRef.current,
      });
    }
  }, [isPlaying]);

  return (
    <div className={`flex justify-center items-center ${className}`}>
      {isPlaying && (
        <canvas ref={canvasRef} className="w-[768px] h-[768px] rounded-lg"></canvas>
      )}
    </div>
  );
}