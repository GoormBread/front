import React from "react";

interface PlayerStateProps {
    name?: string;
}

export default function PlayerState({ name}: PlayerStateProps) {
    return (
        <div className="w-[996px] h-[120px] bg-[#FCF7F7] flex flex-row items-center border border-black p-[0px_20px] flex-grow">
            <div className="flex items-center w-[740px] font-['Spline_Sans'] font-semibold text-[30px] leading-[24px] text-[#1C0D0D]">
                {name}
            </div>
            <div className="flex items-center w-[214px] font-['Spline_Sans'] text-[50px] leading-[24px] text-center text-[#FF0000] ">
                Ready
            </div>
        </div>
    );
}