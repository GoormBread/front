import React, { useState, useEffect } from "react";

interface GamePadButtonProps {
  className?: string;
}

export default function GamePadButton({ className }: GamePadButtonProps) {
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "enter", "z", "x", "shift"].includes(key)) {
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
          <img src="/GameplayPage/up_w.svg" className={`${activeButton === "arrowup" ? "filter brightness-[0.85]" : ""}`} />
        </div>
        <div className="flex justify-center">
          <img src="/GameplayPage/left_w.svg" className={`${activeButton === "arrowleft" ? "filter brightness-[0.85]" : ""}`} />
          <img src="/GameplayPage/right_w.svg" className={`ml-1 ${activeButton === "arrowright" ? "filter brightness-[0.85]" : ""}`} />
        </div>
        <div className="flex justify-center -mt-7">
          <img src="/GameplayPage/down_w.svg" className={`${activeButton === "arrowdown" ? "filter brightness-[0.85]" : ""}`} />
        </div>
      </div>
      <div className="flex justify-center items-center ml-40">
        <span className="absolute font-serif font-bold text-lg z-10">SELECT</span>
        <img src="/GameplayPage/box_w.svg" className={`${activeButton === "shift" ? "filter brightness-[0.85]" : ""}`} />
      </div>
      <div className="flex justify-center items-center ml-4">
        <span className="absolute font-serif font-bold text-lg z-10">START</span>
        <img src="/GameplayPage/box_w.svg" className={`${activeButton === "enter" ? "filter brightness-[0.85]" : ""}`} />
      </div>
      <div className="flex justify-center items-center ml-10">
        <span className="absolute font-serif font-bold text-2xl z-10">A</span>
        <img src="/GameplayPage/circle_w.svg" className={`${activeButton === "z" ? "filter brightness-[0.85]" : ""}`} />
      </div>
      <div className="flex justify-center items-center ml-4">
        <span className="absolute font-serif font-bold text-2xl z-10">B</span>  
        <img src="/GameplayPage/circle_w.svg" className={`${activeButton === "x" ? "filter brightness-[0.85]" : ""}`} />
      </div>
    </div>
  );
}