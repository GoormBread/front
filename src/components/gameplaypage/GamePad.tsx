import React from "react";

interface GamePadProps {
  children: React.ReactNode;
  className?: string;
}

export default function GamePad({ children, className }: GamePadProps) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}