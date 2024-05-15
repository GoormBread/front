import React from "react";

interface ButtonProps {
    className?: string;
    type: "report" | "exit";
  }
  
  export default function Button({ className, type }: ButtonProps) {
    return (
      <button
        className={`px-4 py-2 rounded-md font-semibold ${
          type === "report"
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-red-500 text-white hover:bg-red-600"
        } ${className}`}
      >
        {type === "report" ? "Report" : "Exit"}
      </button>
    );
  }