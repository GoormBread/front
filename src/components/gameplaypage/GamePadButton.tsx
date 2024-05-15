import React from "react";

interface GamePadButtonProps {
  className?: string;
}

export default function GamePad({ className }: GamePadButtonProps) {
  return (
    <div className={`${className}`}>
        <h1>Gamepad buttons will be placed here</h1>
    </div>
  );
}