import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { GameApi } from "../../api";

interface CreateLobbyPopUpProps {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: () => void;
  CreateLobby: (lobbyName: string, lobbyDescription: string, password: string) => void;
}

const CreateLobbyPopUp = forwardRef(({ className, onClick, onClose, CreateLobby }: CreateLobbyPopUpProps, ref) => {
  const [game, setGame] = useState("");
  const [lobbyName, setLobbyName] = useState("");
  const [playerNum, setPlayerNum] = useState(1);
  const [hasPassword, setHasPassword] = useState(false)
  const [password, setPassword] = useState("");
  const [gameList, setGameList] = useState([]);
  
  const gameApi = new GameApi();

  useEffect(() => {
    const fetchGameList = async () => {
        try {
            const response = await gameApi.gameControllerGetAllGameListRaw({
            });
            const data = await response.raw.json();
            setGameList(data.allGameInfo);
            setGame(data.allGameInfo[0].game_id); 
            console.log("실행");
            
        } catch (error) {
            console.error('게임 정보를 가져오는 중 오류가 발생했습니다:', error);
        }
    };

    fetchGameList();
}, []);

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

    console.log(`로비생성 요청:'${game}, ${lobbyName}, ${playerNum}, ${password}`);

    const lobby_Id = uuidv4();
    CreateLobby(lobbyName, game, password);
  };

  return (
    <div className={`flex flex-col justify-center items-center ${className}`} onClick={handleClick}>
      <span className="font-sans font-bold text-3xl m-4 mb-10">Create Lobby</span>
      <select className="block relative w-96 mb-4 bg-white font-sans border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow focus:outline-none focus:shadow-outline" value={game} onChange={(e) => setGame(e.target.value)}>
        {gameList.map((game) => (
          <option key={game.game_id} value={game.game_id}> {game.game_name}</option>
        ))}
      </select>
      <input className="block w-96 h-10 p-4 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:outline-none focus:shadow-outline" placeholder="Lobby Name" value={lobbyName} onChange={(e) => setLobbyName(e.target.value)}></input>
      <div className="flex flex-row items-center justify-start w-96 mb-3">
        {/* <div className="flex flex-row items-center mr-5">
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
        </div> */}
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
