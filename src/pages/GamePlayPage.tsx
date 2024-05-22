import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import GameDisplay from "../components/gameplaypage/GameDisplay";
import GameBackground from "../components/gameplaypage/GameBackground";
import GamePad from "../components/gameplaypage/GamePad";
import GameKeyTable from "../components/gameplaypage/GameKeyTable";
import Button from "../components/gameplaypage/Button";
import GamePadButton from "../components/gameplaypage/GamePadButton";
import ReportPopUp from "../components/gameplaypage/ReportPopUp";

export default function GamePlayPage() {
    const navigate = useNavigate();
    // const [isReportPopUpOpen, setIsReportPopUpOpen] = useState(false);

    const handleExitClick = () => {
      navigate('/');
    };
  
    // const handleReportClick = () => {
    //   setIsReportPopUpOpen(true);
    // };
      
    // const handlePopUpClose = () => {
    //   setIsReportPopUpOpen(false);  
    // };

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
      setIsPlaying(true);
    };

  return (
    <GameBackground className="flex justify-center items-center min-h-screen bg-groom-brown">
        <div className="flex w-full max-w-screen-2xl">
            <img src="/GameplayPage/groomicon.svg" className="absolute ml-4 mt-4"/>
            <GamePad className="flex flex-col justify-center items-center flex-grow bg-[#E5E0C7] border border-black rounded-lg shadow-lg p-4">
                <GameDisplay className="flex-grow w-[1024px] h-[768px] bg-[#363836] rounded-lg shadow-md" onPlayClick={handlePlayClick} isPlaying={isPlaying}></GameDisplay>
                <GamePadButton className="flex flex-row justify-center items-center w-[1100px] rounded-lg shadow-lg p-2 bg-[#C7C3A9] mt-4"></GamePadButton>
            </GamePad>
            <div className="ml-8 w-1/6 flex flex-col">
                <div className="flex justify-between mt-8 mb-8">
                    <Button type="start" className="w-28 text-center" onClick={handlePlayClick} />
                    <Button type="exit" className="w-28 text-center" onClick={handleExitClick} />
                </div>
                <div className="flex-grow overflow-auto">
                    <GameKeyTable className="h-2/3 bg-white rounded-lg shadow-md text-center"></GameKeyTable>
                </div>
            </div>
        </div>
        {/* <div className={`fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-20 ${isReportPopUpOpen ? "visible" : "duration-300 ease-in-out invisible"}`} onClick={handlePopUpClose}>
            <ReportPopUp className={`bg-groom-brown w-1/4 h-1/2 rounded-lg transform transition duration-300 ease-in-out ${isReportPopUpOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`} 
                onClick={(e) => e.stopPropagation()} 
                onClose={() => setIsReportPopUpOpen(false)} />
        </div> */}
    </GameBackground>
  );
}