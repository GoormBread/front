import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import GameDisplay from "../components/gameplaypage/GameDisplay";
import GameBackground from "../components/gameplaypage/GameBackground";
import GamePad from "../components/gameplaypage/GamePad";
import GameKeyTable from "../components/gameplaypage/GameKeyTable";
import Button from "../components/gameplaypage/Button";
import GamePadButton from "../components/gameplaypage/GamePadButton";

export default function GamePlayPage() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  // 실제 Argument를 받아와서 처리
  // var websocketUrl = "";
  // var user = "";
  // if(user == '1p')
  // {
  //   websocketUrl = 'ws://paran2024.iptime.org:1201/keyboard/1p';
  // }
  // else if(user == '2p')
  // {
  //   websocketUrl = 'ws://paran2024.iptime.org:1014/keyboard/2p';
  // }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
  
    if (isPlaying) {
      timeoutId = setTimeout(() => {
        const newSocket = new WebSocket('ws://paran2024.iptime.org/play-goormbread/test/websocket1');
        newSocket.onopen = () => {
          console.log('WebSocket 연결이 열렸습니다.');
          setSocket(newSocket);
        };
        newSocket.onclose = () => {
          
          console.log('WebSocket 연결이 닫혔습니다.');
          setSocket(null);
        };
        newSocket.onerror = (error) => {
          console.error('WebSocket 오류:', error);
        };
      }, 3000);
    }
  
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (socket) {
        socket.close();
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
  }, [isPlaying, pressedKeys]);
  
  const onKeyDownHandler = (event: KeyboardEvent) => {
    var key = '';
    if(event.key === 'ArrowUp')
    {
      key = 'UP';
    }
    if(event.key === 'ArrowDown')
    {
      key = 'DOWN';
    }
    if(event.key === 'ArrowLeft')
    {
      key = 'LEFT';
    }
    if(event.key === 'ArrowRight')
    {
      key = 'RIGHT';
    }
    if(event.key === 'Enter')
    {
      key = 'Enter';
    } 
    if(event.key === 'x')
    {
      key = 'X';
    }
    if(event.key === 'z')
    {
      key = 'Z';
    }
    if(event.key === 'Shift')
    {
        key = 'RightShift';
    }
    if (!pressedKeys.includes(key)) {
      setPressedKeys((prevKeys) => [...prevKeys, key]);
    }
  };
  
  const onKeyUpHandler = (event: KeyboardEvent) => {
    var key = '';
    if(event.key === 'ArrowUp')
      {
        key = 'UP';
      }
      if(event.key === 'ArrowDown')
      {
        key = 'DOWN';
      }
      if(event.key === 'ArrowLeft')
      {
        key = 'LEFT';
      }
      if(event.key === 'ArrowRight')
      {
        key = 'RIGHT';
      }
      if(event.key === 'Enter')
      {
        key = 'Enter';
      } 
      if(event.key === 'x')
      {
        key = 'X';
      }
      if(event.key === 'z')
      {
        key = 'Z';
      }
      if(event.key === 'Shift')
      {
        key = 'RightShift';
      }
    setPressedKeys((prevKeys) => prevKeys.filter((k) => k !== key));
  };

  useEffect(() => {
    console.log(pressedKeys);
  }, [pressedKeys]);
  
  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify(pressedKeys);
      socket.send(message);
    }
  }, [socket, pressedKeys]);

  const handleExitClick = () => {
    setIsPlaying(false); // isPlaying을 false로 설정
    navigate('/');
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <GameBackground className="flex justify-center items-center min-h-screen bg-groom-brown">
      <div className="flex w-full max-w-screen-2xl">
        <img src="/GameplayPage/groomicon.svg" className="absolute ml-4 mt-4"/>
        <GamePad className="flex flex-col justify-center items-center flex-grow bg-[#E5E0C7] border border-black rounded-lg shadow-lg p-4">
          <GameDisplay className="flex-grow w-[1024px] h-[768px] bg-[#363836] rounded-lg shadow-md" onPlayClick={handlePlayClick} isPlaying={isPlaying}></GameDisplay>
          <GamePadButton className="flex flex-row justify-center items-center w-[1100px] rounded-lg shadow-lg p-2 bg-[#C7C3A9] mt-4"></GamePadButton>
        </GamePad>
        <div className="ml-8 w-1/6 flex flex-col">
          <div className="flex justify-between mt-8 mb-8">
            <Button type="start" className="w-28 text-center" onClick={handlePlayClick} />
            <Button type="exit" className="w-28 text-center" onClick={handleExitClick} />
          </div>
          <div className="flex-grow overflow-auto">
            <GameKeyTable className="h-2/3 bg-white rounded-lg shadow-md text-center"></GameKeyTable>
          </div>
        </div>
      </div>
    </GameBackground>
  );
}