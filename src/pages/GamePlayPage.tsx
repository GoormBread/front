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
            <GamePad className="flex flex-col justify-center items-center flex-grow bg-white rounded-lg shadow-lg p-4">
                <GameDisplay className="flex-grow w-[1024px] h-[768px] bg-gray-100 rounded-lg shadow-lg"></GameDisplay>
                <GamePadButton className="flex flex-row justify-center items-center w-full rounded-lg p-4 bg-gray-200 mt-4"></GamePadButton>
            </GamePad>
            <div className="ml-8 w-1/6 flex flex-col">
                <div className="flex justify-between mb-8">
                    <Button type="report" className="w-28 text-center" />
                    <Button type="exit" className="w-28 text-center" />
                </div>
                <div className="flex-grow overflow-auto">
                    <GameKeyTable className="h-full bg-white rounded-lg shadow-lg text-center"></GameKeyTable>
                </div>
            </div>
        </div>
    </GameBackground>
  );
}