import React from "react";

interface GameBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function GameBackground({ children, className }: GameBackgroundProps) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}