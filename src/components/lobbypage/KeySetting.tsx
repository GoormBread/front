import React, { useState } from "react";
import KeySettingBtn from "./KeySettingBtn";

interface KeySettingProps {
    showKeySetting: boolean;
    setShowKeySetting: React.Dispatch<React.SetStateAction<boolean>>;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onClose?: () => void;
}

export default function KeySetting({showKeySetting, setShowKeySetting, onClick, onClose }: KeySettingProps) {
    interface KeySettingData {
        [key: string]: string;
        A: string;
        B: string;
        select: string;
        start: string;
        up: string;
        down: string;
        left: string;
        right: string;
    }

    const [keySettingData, setKeySettingData] = useState<KeySettingData>({
        A: 'KeyZ',
        B: 'KeyX',
        select: 'Space',
        start: 'Enter',
        up: 'KeyW',
        down: 'KeyS',
        left: 'KeyA',
        right: 'KeyD'
    });

    const handleKeySettingChange = (name: string, value: string) => {
        if (Object.values(keySettingData).includes(value)) {
            // 변경하려는 값이 이미 다른 키에 할당되어 있는 경우
            const duplicateKey = Object.keys(keySettingData).find(
                (key) => keySettingData[key] === value
            );
            if (duplicateKey) {
                setKeySettingData({
                    ...keySettingData,
                    [name]: value,
                    [duplicateKey]: keySettingData[name],
                });
            }
        } else {
            setKeySettingData({
                ...keySettingData,
                [name]: value,
            });
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (onClick) {
          onClick(e);
        }
      };

    return (
        <div className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${showKeySetting ? "visible" : "duration-300 ease-in-out invisible"}`} onClick={onClose}>
            <div className={`relative flex flex-col items-center border border-black w-[400px] bg-white rounded-xl transition duration-300 ease-in-out ${showKeySetting ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`} onClick={(e) => e.stopPropagation()}>
                <KeySettingBtn padBtn="A" name="A" handleKeySettingChange={handleKeySettingChange}>
                    {keySettingData.A}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="B" name="B" handleKeySettingChange={handleKeySettingChange}>
                    {keySettingData.B}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="Select" name="select" handleKeySettingChange={handleKeySettingChange}>
                    {keySettingData.select}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="Start" name="start" handleKeySettingChange={handleKeySettingChange}>
                    {keySettingData.start}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="Up" name="up" handleKeySettingChange={handleKeySettingChange}>
                    {keySettingData.up}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="Down" name="down" handleKeySettingChange={handleKeySettingChange}>
                    {keySettingData.down}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="Left" name="left" handleKeySettingChange={handleKeySettingChange}>
                    {keySettingData.left}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="Right" name="right" handleKeySettingChange={handleKeySettingChange}>
                    {keySettingData.right}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <button id="ok_btn" onClick={onClose} className="mt-10 w-[170px] h-[70px] bg-[#9EA6B8] rounded-[12px] flex justify-center items-center px-4">
                    <div className="flex items-center font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-center text-white">
                        OK
                    </div>
                </button>
            </div>
        </div>
    );
}