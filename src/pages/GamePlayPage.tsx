import React from "react";
import GameDisplay from "../components/gameplaypage/GameDisplay";
import GameBackground from "../components/gameplaypage/GameBackground";
import GamePad from "../components/gameplaypage/GamePad";
import GameKeyTable from "../components/gameplaypage/GameKeyTable";
import Button from "../components/gameplaypage/Button";
import GamePadButton from "../components/gameplaypage/GamePadButton";

export default function GamePlayPage() {
  return (
    <GameBackground className="flex justify-center items-center min-h-screen bg-groom-brown">
        <div className="flex w-full max-w-screen-2xl">
            <img src="/GameplayPage/groomicon.svg" className="absolute ml-4 mt-4"/>
            <GamePad className="flex flex-col justify-center items-center flex-grow bg-[#E5E0C7] border border-black rounded-lg shadow-lg p-4">
                <GameDisplay className="flex-grow w-[1024px] h-[768px] bg-[#363836] rounded-lg shadow-md"></GameDisplay>
                <GamePadButton className="flex flex-row justify-center items-center w-[1100px] rounded-lg shadow-lg p-2 bg-[#C7C3A9] mt-4"></GamePadButton>
            </GamePad>
            <div className="ml-8 w-1/6 flex flex-col">
                <div className="flex justify-between mt-8 mb-8">
                    <Button type="report" className="w-28 text-center" />
                    <Button type="exit" className="w-28 text-center" />
                </div>
                <div className="flex-grow overflow-auto">
                    <GameKeyTable className="h-2/3 bg-white rounded-lg shadow-md text-center"></GameKeyTable>
                </div>
            </div>
        </div>
    </GameBackground>
  );
}