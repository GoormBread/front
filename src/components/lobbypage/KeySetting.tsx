import React from "react";

interface KeySettingProps {
    showKeySetting: boolean;
    setShowKeySetting: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function KeySetting({ showKeySetting, setShowKeySetting}: KeySettingProps) {
    const HideKeySettingBtn = () => {
        setShowKeySetting(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="relative flex flex-col items-center w-128 p-5 bg-white rounded-xl">
                <div className="w-[300px] h-[100px] bg-[#FCF7F7] flex flex-row items-center border border-black p-[0px_20px] rounded-xl flex-grow">
                    <label className="flex items-center w-[200px] font-['Spline_Sans'] font-semibold text-[30px] leading-[24px] text-[#1C0D0D]">
                        A
                    </label>
                    <input className="flex items-center w-[100px] h-[60px] font-['Spline_Sans'] border border-black text-[30px] leading-[24px] text-center">
                    </input>
                </div>
                <div className="w-[300px] h-[100px] bg-[#FCF7F7] flex flex-row items-center border border-black p-[0px_20px] rounded-xl flex-grow">
                    <label className="flex items-center w-[200px] font-['Spline_Sans'] font-semibold text-[30px] leading-[24px] text-[#1C0D0D]">
                        B
                    </label>
                    <input className="flex items-center w-[100px] h-[60px] font-['Spline_Sans'] border border-black text-[30px] leading-[24px] text-center">
                    </input>
                </div>
                <div className="w-[300px] h-[100px] bg-[#FCF7F7] flex flex-row items-center border border-black p-[0px_20px] rounded-xl flex-grow">
                    <label className="flex items-center w-[200px] font-['Spline_Sans'] font-semibold text-[30px] leading-[24px] text-[#1C0D0D]">
                        Select
                    </label>
                    <input className="flex items-center w-[100px] h-[60px] font-['Spline_Sans'] border border-black text-[30px] leading-[24px] text-center">
                    </input>
                </div>
                <div className="w-[300px] h-[100px] bg-[#FCF7F7] flex flex-row items-center border border-black p-[0px_20px] rounded-xl flex-grow">
                    <label className="flex items-center w-[200px] font-['Spline_Sans'] font-semibold text-[30px] leading-[24px] text-[#1C0D0D]">
                        Start
                    </label>
                    <input className="flex items-center w-[100px] h-[60px] font-['Spline_Sans'] border border-black text-[30px] leading-[24px] text-center">
                    </input>
                </div>
                <div className="w-[300px] h-[100px] bg-[#FCF7F7] flex flex-row items-center border border-black p-[0px_20px] rounded-xl flex-grow">
                    <label className="flex items-center w-[200px] font-['Spline_Sans'] font-semibold text-[30px] leading-[24px] text-[#1C0D0D]">
                        Up
                    </label>
                    <input className="flex items-center w-[100px] h-[60px] font-['Spline_Sans'] border border-black text-[30px] leading-[24px] text-center">
                    </input>
                </div>
                <div className="w-[300px] h-[100px] bg-[#FCF7F7] flex flex-row items-center border border-black p-[0px_20px] rounded-xl flex-grow">
                    <label className="flex items-center w-[200px] font-['Spline_Sans'] font-semibold text-[30px] leading-[24px] text-[#1C0D0D]">
                        Down
                    </label>
                    <input className="flex items-center w-[100px] h-[60px] font-['Spline_Sans'] border border-black text-[30px] leading-[24px] text-center">
                    </input>
                </div>
                <div className="w-[300px] h-[100px] bg-[#FCF7F7] flex flex-row items-center border border-black p-[0px_20px] rounded-xl flex-grow">
                    <label className="flex items-center w-[200px] font-['Spline_Sans'] font-semibold text-[30px] leading-[24px] text-[#1C0D0D]">
                        Left
                    </label>
                    <input className="flex items-center w-[100px] h-[60px] font-['Spline_Sans'] border border-black text-[30px] leading-[24px] text-center">
                    </input>
                </div>
                <div className="w-[300px] h-[100px] bg-[#FCF7F7] flex flex-row items-center border border-black p-[0px_20px] rounded-xl flex-grow">
                    <label className="flex items-center w-[200px] font-['Spline_Sans'] font-semibold text-[30px] leading-[24px] text-[#1C0D0D]">
                        Right
                    </label>
                    <input className="flex items-center w-[100px] h-[60px] font-['Spline_Sans'] border border-black text-[30px] leading-[24px] text-center">
                    </input>
                </div>
                <button id="exit_btn" onClick={HideKeySettingBtn} className="w-[170px] h-[70px] bg-[#9EA6B8] rounded-[12px] flex justify-center items-center px-4">
                    <div className="flex items-center font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-center text-white">
                        OK
                    </div>
                </button>
            </div>
        </div>
    );
}