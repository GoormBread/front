import React, { useState, useEffect } from "react";
import KeySettingBtn from "./KeySettingBtn";
import { PatchUserPadInformationDto, UserApi } from "../../api";

interface KeySettingProps {
    showKeySetting: boolean;
    setShowKeySetting: React.Dispatch<React.SetStateAction<boolean>>;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onClose?: () => void;
}

export default function KeySetting({ showKeySetting, setShowKeySetting, onClick, onClose }: KeySettingProps) {
    const [userPad, setUserPad] = useState<PatchUserPadInformationDto>({
        userGameCommand: {
            A: 'z',
            B: 'x',
            Select: 's',
            Start: 'Enter',
            UP: 'ArrowUp',
            DOWN: 'ArrowDown',
            LEFT: 'ArrowLeft',
            RIGHT: 'ArrowRight'
        }
    });

    const user_id = "123"; //유저id(나중에 수정)

    const userApi = new UserApi();
    
    useEffect(() => {
        const fetchUserPad = async () => {
            try {
                const response = await userApi.userControllerGetUserPadInformationRaw({
                    userId: user_id // 실제 사용자 ID로 대체해야 합니다.
                });
                const data = await response.raw.json();
                setUserPad({
                    userGameCommand: data
                });
                console.log("실행");
                console.log(data);
            } catch (error) {
                console.error('사용자 패드 정보를 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchUserPad();
    }, []);

    const patchKeySetting = async () => {
        try {
            const response = await userApi.userControllerPatchUserPadInformationRaw({
                userId: user_id,
                patchUserPadInformationDto: userPad
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('사용자 패드 정보를 업데이트하는 중 오류가 발생했습니다:', error);
        }
    };

    const handleKeySettingChange = (name: string, value: string) => {
        if (Object.values(userPad.userGameCommand).includes(value)) {
            // 변경하려는 값이 이미 다른 키에 할당되어 있는 경우
            const duplicateKey = Object.keys(userPad.userGameCommand).find(
                (key) => `userPad.userGameCommand.${key}` === value
            );
            if (duplicateKey) {
                setUserPad({
                    userGameCommand: {
                        ...userPad.userGameCommand,
                        [name]: value,
                        [duplicateKey]: `userPad.userGameCommand${name}`,
                    }
                });
            }
        } else {
            setUserPad({
                userGameCommand: {
                    ...userPad.userGameCommand,
                    [name]: value,
                }
            });
        }
        patchKeySetting();
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
                    {userPad.userGameCommand.A}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="B" name="B" handleKeySettingChange={handleKeySettingChange}>
                    {userPad.userGameCommand.B}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="Select" name="Select" handleKeySettingChange={handleKeySettingChange}>
                    {userPad.userGameCommand.Select}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="Start" name="Start" handleKeySettingChange={handleKeySettingChange}>
                    {userPad.userGameCommand.Start}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="Up" name="UP" handleKeySettingChange={handleKeySettingChange}>
                    {userPad.userGameCommand.UP}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="Down" name="DOWN" handleKeySettingChange={handleKeySettingChange}>
                    {userPad.userGameCommand.DOWN}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="Left" name="LEFT" handleKeySettingChange={handleKeySettingChange}>
                    {userPad.userGameCommand.LEFT}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <KeySettingBtn padBtn="Right" name="RIGHT" handleKeySettingChange={handleKeySettingChange}>
                    {userPad.userGameCommand.RIGHT}
                </KeySettingBtn>
                <div className="w-[90%] h-[1px] bg-black"></div>
                <button id="ok_btn" onClick={onClose} className="mt-10 mb-10 w-[170px] h-[70px] bg-[#9EA6B8] rounded-[12px] flex justify-center items-center px-4">
                    <div className="flex items-center font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-center text-white">
                        OK
                    </div>
                </button>
            </div>
        </div>
    );
}