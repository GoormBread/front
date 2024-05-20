import React, { useState } from "react";

interface ReportPopUpProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: () => void;
}

export default function ReportPopUp({ className, onClick, onClose }: ReportPopUpProps) {
  const [selectedReason, setSelectedReason] = useState("고의적인 방해");
  const [description, setDescription] = useState("");

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleSendReport = () => {
    alert(`선택한 신고 사유: ${selectedReason}\n신고 내용: ${description}`);
    setSelectedReason("고의적인 방해");
    setDescription("");
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`flex flex-col justify-center items-center ${className}`} onClick={handleClick}>
      <span className="font-serif font-bold text-3xl m-4">Report</span>
      <div className="block relative w-2/3 mb-4"> 
        <select className="block appearance-none w-full bg-white font-serif border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow focus:outline-none focus:shadow-outline" value={selectedReason} onChange={(e) => setSelectedReason(e.target.value)}>
          <option>고의적인 방해</option>
          <option>게임 불참</option>
          <option>불건전한 플레이어 이름</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-1000">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <input className="block w-2/3 h-2/3 p-4 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:outline-none focus:shadow-outline" placeholder="신고사유" value={description} onChange={(e) => setDescription(e.target.value)}></input>
      <button className="w-1/3 text-center mb-4 px-4 py-2 rounded-md font-serif font-bold text-lg bg-green-500 text-white hover:bg-green-600" onClick={handleSendReport}>Send Report</button>
    </div>
  );
}