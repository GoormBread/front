import React, {useState} from "react";
import PlayerState from "./PlayerState";
import KeySetting from "./KeySetting";

export default function PlayerFeature() {
    const [showKeySetting, setShowKeySetting] = useState(false);
    const ShowKeySettingBtn = () => {
        setShowKeySetting(true);
    };
    return (
        <>
        <div className="w-[1440px] h-[362px] flex flex-row justify-center items-start p-[7px_30px] gap-7">
            <div id="player_state_container" className="w-[1040px] h-[348px] flex flex-col items-start p-[15px_22px] gap-[29px] flex-grow">
                <PlayerState name="Player1" />
                <PlayerState name="Player2" />
            </div>
            <div id="btn_contanier" className="w-[230px] h-[348px] flex flex-col items-end p-[29px_10px] gap-10">
                <button id="ready_btn" className="w-[200px] h-[70px] bg-[#B9DDC3] rounded-[12px] flex justify-center items-center px-4">
                    <div className="font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-center text-[#1A1A1A]">
                        Ready
                    </div>
                </button>
                <button id="key_setting_btn" onClick={ShowKeySettingBtn} className="w-[200px] h-[70px] bg-[#9EA6B8] rounded-[12px] flex justify-center items-center px-4">
                    <div className="flex items-center text-center font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-white">
                        Key Setting
                    </div>
                </button>
                <button id="exit_btn" className="w-[170px] h-[70px] bg-[#9EA6B8] rounded-[12px] flex justify-center items-center px-4" >
                    <div className="flex items-center font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-center text-white">
                        EXIT
                    </div>
                </button>
            </div>
        </div>
        {showKeySetting && (<KeySetting showKeySetting={showKeySetting} setShowKeySetting={setShowKeySetting} />)};
        </>
    );
}