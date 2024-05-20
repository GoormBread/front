import React from "react";

interface ButtonProps {
  className?: string;
  type: "report" | "exit";
  onClick?: () => void;
}

export default function Button({ className, type, onClick }: ButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-md font-serif font-bold text-lg ${
        type === "report" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-red-500 text-white hover:bg-red-600"
      } ${className}`}
      onClick={handleClick}
    >
      {type === "report" ? "Report" : "Exit"}
    </button>
  );
} 