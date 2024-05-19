import React, { useState, useEffect } from "react";

interface GamePadButtonProps {
  className?: string;
}

export default function GamePadButton({ className }: GamePadButtonProps) {
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "a", "b", "control", "shift"].includes(key)) {
        setActiveButton(key);
      }
    };

    const handleKeyUp = () => {
      setActiveButton("");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className={`${className}`}>
      <div className="flex flex-col items-center">
        <div className="flex justify-center -mb-7">
          <img src="/GameplayPage/up_w.svg" className={`${activeButton === "arrowup" ? "filter brightness-90" : ""}`} />
        </div>
        <div className="flex justify-center">
          <img src="/GameplayPage/left_w.svg" className={`${activeButton === "arrowleft" ? "filter brightness-90" : ""}`} />
          <img src="/GameplayPage/right_w.svg" className={`ml-1 ${activeButton === "arrowright" ? "filter brightness-90" : ""}`} />
        </div>
        <div className="flex justify-center -mt-7">
          <img src="/GameplayPage/down_w.svg" className={`${activeButton === "arrowdown" ? "filter brightness-90" : ""}`} />
        </div>
      </div>
      <div className="flex justify-center items-center ml-40">
        <text className="absolute font-serif font-bold text-lg z-10">SELECT</text>
        <img src="/GameplayPage/box_w.svg" className={`${activeButton === "control" ? "filter brightness-90" : ""}`} />
      </div>
      <div className="flex justify-center items-center ml-4">
        <text className="absolute font-serif font-bold text-lg z-10">START</text>
        <img src="/GameplayPage/box_w.svg" className={`${activeButton === "shift" ? "filter brightness-90" : ""}`} />
      </div>
      <div className="flex justify-center items-center ml-10">
        <text className="absolute font-serif font-bold text-2xl z-10">A</text>
        <img src="/GameplayPage/circle_w.svg" className={`${activeButton === "a" ? "filter brightness-90" : ""}`} />
      </div>
      <div className="flex justify-center items-center ml-4">
        <text className="absolute font-serif font-bold text-2xl z-10">B</text>
        <img src="/GameplayPage/circle_w.svg" className={`${activeButton === "b" ? "filter brightness-90" : ""}`} />
      </div>
    </div>
  );
}