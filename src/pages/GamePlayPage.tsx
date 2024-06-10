import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import GameDisplay from "../components/gameplaypage/GameDisplay";
import GameBackground from "../components/gameplaypage/GameBackground";
import GamePad from "../components/gameplaypage/GamePad";
import GameKeyTable from "../components/gameplaypage/GameKeyTable";
import Button from "../components/gameplaypage/Button";
import GamePadButton from "../components/gameplaypage/GamePadButton";
import { PatchUserPadInformationDto, UserApi } from "../api";
import { Socket, io } from "socket.io-client";
import { useUserId } from "../hooks/useUserStoreHooks";

interface GamePlayPageProps {
  socket: Socket;
}

export default function GamePlayPage({socket}: GamePlayPageProps) {
  const [keyboardSocket, setKeyboardSocket] = useState<WebSocket | null>(null);
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [keys, setKeys] = useState({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    Z: false,
    X: false,
    RightShift: false,
    Enter: false
  });

  const [userPad, setUserPad] = useState<PatchUserPadInformationDto>({
    user_game_command: {
      A: 'z',
      B: 'x',
      SELECT: 's',
      START: 'Enter',
      UP: 'ArrowUp',
      DOWN: 'ArrowDown',
      LEFT: 'ArrowLeft',
      RIGHT: 'ArrowRight'
    }
  });

  const { lobbyID } = useParams()
  const { userId } = useUserId();

  const userApi = new UserApi();

  useEffect(() => {
    const fetchUserPad = async () => {
      try {
        const response = await userApi.userControllerGetUserPadInformationRaw({
          userId: userId
        });
        const data = await response.raw.json();
        setUserPad(data.userCommand);
        console.log("패드정보: ", data.userCommand);
      } catch (error) {
        console.error('사용자 패드 정보를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchUserPad();
  }, []);

  useEffect(() => {
    console.log("update");
    socket.emit('toggleReady', { lobbyId: lobbyID, playerId: userId }); // updatalobby용
}, []);

  socket.on('error', (message) => {
    console.log('Error: ' + message);
  });
  socket.on('startGame', (route) => {
    console.log('startGame: ' + route);
  });

  // 실제 Argument를 받아와서 처리
  var websocketUrl = "";
  socket.on('updateLobby', (lobby) => {
    console.log("업데이트 로비", lobby);
    Object.keys(lobby.players).map((playerKey, index) => {
      console.log("playerkey: ", playerKey, userId === playerKey);
      if(userId === playerKey)
        websocketUrl = `ws://paran2024.iptime.org/play-goormbread/${lobbyID}/keyboard/${index}p`;
  });

    console.log("websocketurl:", websocketUrl)
  });

  // if(userId == '1p')
  // {
  //   websocketUrl = 'ws://paran2024.iptime.org:1201/keyboard/1p';
  // }
  // else if(userId == '2p')
  // {
  //   websocketUrl = 'ws://paran2024.iptime.org:1014/keyboard/2p';
  // }

  useEffect(() => {
    if (isPlaying) {
      const newSocket = new WebSocket(websocketUrl); //ws://paran2024.iptime.org:32002/keyboard/2
      newSocket.onopen = () => {
        console.log('WebSocket 연결이 열렸습니다.');
        setKeyboardSocket(newSocket);
      };
      newSocket.onclose = () => {
        console.log('WebSocket 연결이 닫혔습니다.');
        setKeyboardSocket(null);
      };
      newSocket.onerror = (error) => {
        console.error('WebSocket 오류:', error);
      };
    }

    return () => {
      if (keyboardSocket) {
        keyboardSocket.close();
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPlaying) {
        onKeyDownHandler(event);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (isPlaying) {
        onKeyUpHandler(event);
      }
    };

    if (isPlaying) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying]);

  const onKeyDownHandler = (event: KeyboardEvent) => {
    setKeys(prevKeys => {
      const newKeys = { ...prevKeys };
      if (event.key === userPad.user_game_command.UP) {
        newKeys.ArrowUp = true;
      }
      if (event.key === userPad.user_game_command.DOWN) {
        newKeys.ArrowDown = true;
      }
      if (event.key === userPad.user_game_command.LEFT) {
        newKeys.ArrowLeft = true;
      }
      if (event.key === userPad.user_game_command.RIGHT) {
        newKeys.ArrowRight = true;
      }
      if (event.key === userPad.user_game_command.START) {
        newKeys.Enter = true;
      }
      if (event.key === userPad.user_game_command.B) {
        newKeys.X = true;
      }
      if (event.key === userPad.user_game_command.A) {
        newKeys.Z = true;
      }
      if (event.key === userPad.user_game_command.SELECT) {
        newKeys.RightShift = true;
      }
      console.log(event.code);
      return newKeys;
    });
  };

  const onKeyUpHandler = (event: KeyboardEvent) => {
    setKeys(prevKeys => {
      const newKeys = { ...prevKeys };
      if (event.key === userPad.user_game_command.UP) {
        newKeys.ArrowUp = false;
      }
      if (event.key === userPad.user_game_command.DOWN) {
        newKeys.ArrowDown = false;
      }
      if (event.key === userPad.user_game_command.LEFT) {
        newKeys.ArrowLeft = false;
      }
      if (event.key === userPad.user_game_command.RIGHT) {
        newKeys.ArrowRight = false;
      }
      if (event.key === userPad.user_game_command.START) {
        newKeys.Enter = false;
      }
      if (event.key === userPad.user_game_command.B) {
        newKeys.X = false;
      }
      if (event.key === userPad.user_game_command.A) {
        newKeys.Z = false;
      }
      if (event.key === userPad.user_game_command.SELECT) {
        newKeys.RightShift = false;
      }
      return newKeys;
    });
  };

  useEffect(() => {
    if (keyboardSocket && keyboardSocket.readyState === WebSocket.OPEN) {
      console.log(keys);
      const message = JSON.stringify(keys);
      keyboardSocket.send(message);
    }
  }, [keyboardSocket, keys]);

  const handleExitClick = () => {
    setIsPlaying(false); // isPlaying을 false로 설정
    socket.emit('leaveLobby', { lobbyId: lobbyID, playerId: userId });
    navigate('/');
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <GameBackground className="flex justify-center items-center min-h-screen bg-groom-brown">
      <div className="flex w-full max-w-screen-2xl">
        <img src="/GameplayPage/groomicon.svg" className="absolute ml-4 mt-4" />
        <GamePad className="flex flex-col justify-center items-center flex-grow bg-[#E5E0C7] border border-black rounded-lg shadow-lg p-4">
          <GameDisplay className="flex-grow w-[1024px] h-[768px] bg-[#363836] rounded-lg shadow-md" onPlayClick={handlePlayClick} isPlaying={isPlaying}></GameDisplay>
          <GamePadButton className="flex flex-row justify-center items-center w-[1100px] rounded-lg shadow-lg p-2 bg-[#C7C3A9] mt-4" isKeyPress={keys}></GamePadButton>
        </GamePad>
        <div className="ml-8 w-1/6 flex flex-col">
          <div className="flex justify-between mt-8 mb-8">
            <Button type="start" className="w-28 text-center" onClick={handlePlayClick} />
            <Button type="exit" className="w-28 text-center" onClick={handleExitClick} />
          </div>
          <div className="flex-grow overflow-auto">
            <GameKeyTable className="h-2/3 bg-white rounded-lg shadow-md text-center" socket={socket}></GameKeyTable>
          </div>
        </div>
      </div>
    </GameBackground>
  );
}