import React from "react";

interface PlayerStateProps {
    name?: string;
    ready: boolean;
}

export default function PlayerState({ name, ready}: PlayerStateProps) {
    return (
        <div className="w-[350px] h-[350px] bg-[#FCF7F7] flex flex-col items-center border border-black p-[0px_20px] flex-grow rounded-xl">
            <div className="flex justify-center items-center w-full h-[50%] font-['Spline_Sans'] font-semibold text-[30px] leading-[24px] text-[#1C0D0D]">
                {name}
            </div>
            <div className="w-full h-[1px] bg-black"></div>
            {ready && (<div className="flex justify-center items-center w-full h-[50%] font-['Spline_Sans'] border text-[60px] leading-[24px] text-[#FF0000] ">
                Ready
            </div>)}
        </div>
    );
}