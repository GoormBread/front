import React from "react";

interface GamePadButtonProps {
  className?: string;
}

export default function GamePadButton({ className }: GamePadButtonProps) {
  return (
    <div className={`${className}`}>
      <div className="">
        <img src="/GameplayPage/up.svg"></img>
        <img src="/GameplayPage/left.svg"></img>
        <img src="/GameplayPage/right.svg"></img>
        <img src="/GameplayPage/down.svg"></img>
      </div>
      <div className="flex justify-center items-center p-4">
        <text className="absolute">Hello</text>
        <img src="/GameplayPage/box.svg"></img>
      </div>
      <div className="flex justify-center items-center p-4">
        <text className="absolute">Hello</text>
        <img src="/GameplayPage/box.svg"></img>
      </div>
    </div>
  );
}