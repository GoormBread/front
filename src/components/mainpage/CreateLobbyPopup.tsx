import React, { forwardRef, useImperativeHandle, useState } from "react";

interface CreateLobbyPopUpProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: () => void;
}

const CreateLobbyPopUp = forwardRef(({ className, onClick, onClose }: CreateLobbyPopUpProps, ref) => {
    const [game, setGame] = useState("");
    const [lobbyName, setLobbyName] = useState("");
    const [playerNum, setPlayerNum] = useState(1);
    const [hasPassword, setHasPassword] = useState(false);
    const [password, setPassword] = useState("");

    useImperativeHandle(ref, () => ({
        setDefault: () => {
            setGame("");
            setLobbyName("");
            setPlayerNum(1);
            setHasPassword(false);
            setPassword("");
        },
    }));

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const handleSendPassword = () => {
    setPassword("");
    handleCreateLobby();
    if (onClose) {
      onClose();
    }
  };

  const handleCreateLobby = async () => {if (!lobbyName) {
      alert(`다음 항목을 입력해주세요: 로비 이름`);
      return;
    }

    console.log(`로비생성 요청:', ${game}, ${lobbyName}, ${playerNum}, ${password}`);

    try {
      const response = await fetch('/lobby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          game,
          lobbyName,
          playerNum,
          password
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('로비 생성 실패');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`flex flex-col justify-center items-center ${className}`} onClick={handleClick}>
      <span className="font-sans font-bold text-3xl m-4 mb-10">Create Lobby</span>
      <select className="block relative w-96 mb-4 bg-white font-sans border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow focus:outline-none focus:shadow-outline" value={game} onChange={(e) => setGame(e.target.value)}>
        <option>메탈슬러그3</option>
        <option>슈퍼마리오</option>
        <option>젤다의 전설</option>
      </select>
      <input className="block w-96 h-10 p-4 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:outline-none focus:shadow-outline" placeholder="Lobby Name" value={lobbyName} onChange={(e) => setLobbyName(e.target.value)}></input>
      <div className="flex flex-row items-center justify-start w-96 mb-3">
        <div className="flex flex-row items-center mr-5">
            <input id="1Player" type="radio" name="playerNumGroup" value="1" defaultChecked={true} onChange={(e) => setPlayerNum(e.target.valueAsNumber)}
                className="w-4 h-4 mr-2"
            ></input>
            <label htmlFor="1Player" className="font-sans text-base">1 Player</label>
        </div>
        <div className="flex flex-row items-center mr-5">
            <input id="2Player" type="radio" name="playerNumGroup" value="2" onChange={(e) => setPlayerNum(e.target.valueAsNumber)}
                className="w-4 h-4 mr-2"
            ></input>
            <label htmlFor="2Player" className="font-sans text-base">2 Players</label>
        </div>
      </div>
      <div className="flex flex-row items-center justify-start w-96 mb-3">
            <input id="hasPassword" type="checkbox" checked={hasPassword} onChange={(e) => setHasPassword(e.target.checked) }
                className="w-4 h-4 mr-2"
            ></input>
            <label htmlFor="hasPassword" className="font-sans text-base">Password</label>
        </div>
        <input type="password" className={`block w-96 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:outline-none focus:shadow-outline  ${hasPassword ? "duration-300 ease-in-out visible scale-y-100 translate-y-0 h-6 p-4" : "duration-300 ease-in-out scale-y-0 -translate-y-1/2 invisible h-0 p-0"}`} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <button className="w-1/3 text-center mb-4 px-4 py-2 rounded-md font-sans font-bold text-lg bg-green-500 text-white hover:bg-green-600" onClick={handleSendPassword}>Create</button>
    </div>
  );
});

export interface CreateLobbyPopupRef {
    setDefault: () => void;
}

export default CreateLobbyPopUp;