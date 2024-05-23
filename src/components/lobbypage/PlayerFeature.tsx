import React, {useState} from "react";
import { useNavigate } from 'react-router-dom'; 
import PlayerState from "./PlayerState";
import KeySetting from "./KeySetting";

export default function PlayerFeature() {
    const navigate = useNavigate();
    const [showKeySetting, setShowKeySetting] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const ShowKeySettingBtn = () => {
        setShowKeySetting(true);
    };
    const handleReadyBtn = () => {
        setIsReady(!isReady);
    };
    const handleExitBtn = () => {
        navigate('/');
    }
    return (
        <>
        <div className="mb-[40px] w-[1440px] h-[362px] flex flex-row justify-center items-start gap-[150px]">
            <div id="player_state_container" className="relative flex flex-row items-center p-[15px_15px] gap-[100px] rounded-xl">
                <PlayerState name="Player1" ready={isReady} />
                <PlayerState name="Player2" ready={isReady}/>
            </div>
            <div id="btn_contanier" className="w-[230px] h-[348px] flex flex-col items-end p-[29px_10px] gap-10">
                <button id="ready_btn" onClick={handleReadyBtn} className="w-[200px] h-[70px] bg-[#B9DDC3] rounded-[12px] flex justify-center items-center px-4">
                    <div className="font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-center text-[#1A1A1A]">
                        Ready
                    </div>
                </button>
                <button id="key_setting_btn" onClick={ShowKeySettingBtn} className="w-[200px] h-[70px] bg-[#9EA6B8] rounded-[12px] flex justify-center items-center px-4">
                    <div className="flex items-center text-center font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-white">
                        Key Setting
                    </div>
                </button>
                <button id="exit_btn" onClick={handleExitBtn} className="w-[170px] h-[70px] bg-[#9EA6B8] rounded-[12px] flex justify-center items-center px-4">
                    <div className="flex items-center font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-center text-white">
                        EXIT
                    </div>
                </button>
            </div>
        </div>
        (<KeySetting showKeySetting={showKeySetting} setShowKeySetting={setShowKeySetting} onClick={(e) => e.stopPropagation()} onClose={() => setShowKeySetting(false)}  />)
        </>
    );
}