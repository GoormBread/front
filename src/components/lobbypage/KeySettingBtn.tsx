import React, { useState, useRef, useEffect } from 'react';

interface KeySettingBtnProps {
    children: React.ReactNode;
    padBtn: string
    name: string;
    handleKeySettingChange: (name: string, value: string) => void;
}

function KeySettingBtn({ children, padBtn, name, handleKeySettingChange}: KeySettingBtnProps) {
    const [isListening, setIsListening] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (isListening) {
                const key = event.code === ' ' ? 'Space' : event.code;
                handleKeySettingChange(name, key)
                setIsListening(false);
            }
        };


        const handleBlur = () => {
            setIsListening(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        buttonRef.current?.addEventListener('blur', handleBlur);


        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            buttonRef.current?.removeEventListener('blur', handleBlur);
        };
    }, [isListening]);

    const handleButtonClick = () => {
        setIsListening(true);
    };

    return (
        <div className="w-[80%] h-[80px] flex flex-row items-center p-[0px_20px] rounded-xl flex-grow">
            <label className="flex items-center w-[60%] font-['Spline_Sans'] font-semibold text-[30px] leading-[24px] text-[#1C0D0D]">
                {padBtn}
            </label>
            <button ref={buttonRef} onClick={handleButtonClick} className="flex items-center justify-center w-[40%] h-[80px] font-['Spline_Sans'] bg-red text-[30px] leading-[24px] text-center">
                {children}
            </button>
        </div>
    );
}

export default KeySettingBtn;