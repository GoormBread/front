import React, { useState, useEffect } from "react";

interface GamePadButtonProps {
  className?: string;
}

export default function GamePadButton({ className }: GamePadButtonProps) {
  const [activeButton, setActiveButton] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "z", "x", "Shift"].includes(key)) {
        setActiveButton((prevActiveButton) => [...prevActiveButton, key]);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key;
      setActiveButton((prevActiveButton) => prevActiveButton.filter((button) => button !== key));
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
          <img
            src="/GameplayPage/up_w.svg"
            className={`${activeButton.includes("ArrowUp") ? "filter brightness-[0.85]" : ""}`}
            alt="Up"
          />
        </div>
        <div className="flex justify-center">
          <img
            src="/GameplayPage/left_w.svg"
            className={`${activeButton.includes("ArrowLeft") ? "filter brightness-[0.85]" : ""}`}
            alt="Left"
          />
          <img
            src="/GameplayPage/right_w.svg"
            className={`ml-1 ${activeButton.includes("ArrowRight") ? "filter brightness-[0.85]" : ""}`}
            alt="Right"
          />
        </div>
        <div className="flex justify-center -mt-7">
          <img
            src="/GameplayPage/down_w.svg"
            className={`${activeButton.includes("ArrowDown") ? "filter brightness-[0.85]" : ""}`}
            alt="Down"
          />
        </div>
      </div>
      <div className="flex justify-center items-center ml-40">
        <span className="absolute font-serif font-bold text-lg z-10">SELECT</span>
        <img
          src="/GameplayPage/box_w.svg"
          className={`${activeButton.includes("Shift") ? "filter brightness-[0.85]" : ""}`}
          alt="Select"
        />
      </div>
      <div className="flex justify-center items-center ml-4">
        <span className="absolute font-serif font-bold text-lg z-10">START</span>
        <img
          src="/GameplayPage/box_w.svg"
          className={`${activeButton.includes("Enter") ? "filter brightness-[0.85]" : ""}`}
          alt="Start"
        />
      </div>
      <div className="flex justify-center items-center ml-10">
        <span className="absolute font-serif font-bold text-2xl z-10">A</span>
        <img
          src="/GameplayPage/circle_w.svg"
          className={`${activeButton.includes("z") ? "filter brightness-[0.85]" : ""}`}
          alt="A"
        />
      </div>
      <div className="flex justify-center items-center ml-4">
        <span className="absolute font-serif font-bold text-2xl z-10">B</span>
        <img
          src="/GameplayPage/circle_w.svg"
          className={`${activeButton.includes("x") ? "filter brightness-[0.85]" : ""}`}
          alt="B"
        />
      </div>
    </div>
  );
}