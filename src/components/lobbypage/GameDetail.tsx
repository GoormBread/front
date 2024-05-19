import React from "react";

export default function GameDetail() {
    return (
        <div id="game_data_container" className="w-[1440px] h-[529px] bg-[#FFFBE1] border border-black flex flex-row justify-center items-center rounded-[12px] p-4 gap-2 flex-grow">
            <div className="w-[1307px] h-[497px] rounded-[12px] flex flex-row items-start p-[30px_0px]">
                <div id="game_sumnail" className="w-[653.5px] h-[437px] bg-red-200 rounded-[12px]"></div>
                <div id="game_info" className="w-[653.5px] h-[437px] flex flex-col justify-center items-center p-[40px_100px] gap-1 flex-grow">
                    <div id="game_name" className={"w-[453.5px] h-[23px] font-['Spline_Sans'] font-bold text-[30px] leading-[22px] tracking-[-0.27px] text-black flex-grow"}>
                        Galactic War
                    </div>
                    <div id="game_explain" className="w-[453.5px] h-[330px] font-['Spline_Sans'] text-[20px] leading-[24px] text-[#999999] flex-grow">
                        Battle through a galaxy of enemy invaders in this classic arcade shooter
                    </div>
                </div>
            </div>
        </div>
    );
}