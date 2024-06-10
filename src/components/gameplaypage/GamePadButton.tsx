import React, { useState, useEffect } from "react";

interface GamePadButtonProps {
  className?: string;
  isKeyPress: {
    ArrowUp: boolean,
    ArrowDown: boolean,
    ArrowLeft: boolean,
    ArrowRight: boolean,
    Z: boolean,
    X: boolean,
    RightShift: boolean,
    Enter: boolean
  }
}

export default function GamePadButton({ className, isKeyPress }: GamePadButtonProps) {

  return (
    <div className={`${className}`}>
      <div className="flex flex-col items-center">
        <div className="flex justify-center -mb-7">
          <img
            src="/GameplayPage/up_w.svg"
            className={`${isKeyPress.ArrowUp ? "filter brightness-[0.85]" : ""}`}
            alt="Up"
          />
        </div>
        <div className="flex justify-center">
          <img
            src="/GameplayPage/left_w.svg"
            className={`${isKeyPress.ArrowLeft ? "filter brightness-[0.85]" : ""}`}
            alt="Left"
          />
          <img
            src="/GameplayPage/right_w.svg"
            className={`ml-1 ${isKeyPress.ArrowRight ? "filter brightness-[0.85]" : ""}`}
            alt="Right"
          />
        </div>
        <div className="flex justify-center -mt-7">
          <img
            src="/GameplayPage/down_w.svg"
            className={`${isKeyPress.ArrowDown ? "filter brightness-[0.85]" : ""}`}
            alt="Down"
          />
        </div>
      </div>
      <div className="flex justify-center items-center ml-40">
        <span className="absolute font-serif font-bold text-lg z-10">SELECT</span>
        <img
          src="/GameplayPage/box_w.svg"
          className={`${isKeyPress.RightShift ? "filter brightness-[0.85]" : ""}`}
          alt="Select"
        />
      </div>
      <div className="flex justify-center items-center ml-4">
        <span className="absolute font-serif font-bold text-lg z-10">START</span>
        <img
          src="/GameplayPage/box_w.svg"
          className={`${isKeyPress.Enter ? "filter brightness-[0.85]" : ""}`}
          alt="Start"
        />
      </div>
      <div className="flex justify-center items-center ml-10">
        <span className="absolute font-serif font-bold text-2xl z-10">A</span>
        <img
          src="/GameplayPage/circle_w.svg"
          className={`${isKeyPress.Z ? "filter brightness-[0.85]" : ""}`}
          alt="A"
        />
      </div>
      <div className="flex justify-center items-center ml-4">
        <span className="absolute font-serif font-bold text-2xl z-10">B</span>
        <img
          src="/GameplayPage/circle_w.svg"
          className={`${isKeyPress.X ? "filter brightness-[0.85]" : ""}`}
          alt="B"
        />
      </div>
    </div>
  );
}