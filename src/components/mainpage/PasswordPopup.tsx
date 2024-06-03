import React, { forwardRef, useImperativeHandle, useState } from "react";

interface PasswordPopUpProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: () => void;
}

const PasswordPopUp = forwardRef(({ className, onClick, onClose }: PasswordPopUpProps, ref) => {
  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);

  useImperativeHandle(ref, () => ({
    setDefault: () => {
        setPassword("");
        setIsPasswordCorrect(true);
    },
  }));

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleSendPassword = () => {
    // 비밀번호 입력 API 호출 및 결과에 따른 처리 진행
    setPassword("");
    setIsPasswordCorrect(!isPasswordCorrect);
  };

  return (
    <div className={`flex flex-col justify-center items-center ${className}`} onClick={handleClick}>
      <span className="font-serif font-bold text-3xl m-4">Enter Password</span>
      <input className="block w-96 h-10 p-4 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:outline-none focus:shadow-outline" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button className="w-1/3 text-center mb-4 px-4 py-2 rounded-md font-serif font-bold text-lg bg-green-500 text-white hover:bg-green-600" onClick={handleSendPassword}>Enter</button>
      {!isPasswordCorrect && <span id="passwordIncorrect" className="absolute bottom-10 bg-cover font-sans text-red-600 text-xs">password incorrect!</span>}
    </div>
  );
});

export interface PasswordPopupRef {
    setDefault: () => void;
}

export default PasswordPopUp;