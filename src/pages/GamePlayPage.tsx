import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import GameDisplay from "../components/gameplaypage/GameDisplay";
import GameBackground from "../components/gameplaypage/GameBackground";
import GamePad from "../components/gameplaypage/GamePad";
import GameKeyTable from "../components/gameplaypage/GameKeyTable";
import Button from "../components/gameplaypage/Button";
import GamePadButton from "../components/gameplaypage/GamePadButton";
import ReportPopUp from "../components/gameplaypage/ReportPopUp";

export default function GamePlayPage() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const newSocket = new WebSocket('ws://paran2024.iptime.org:32001/websocket');
    newSocket.onopen = () => {
      console.log('WebSocket 연결이 열렸습니다.');
      setSocket(newSocket); // WebSocket 연결을 상태에 저장
    };
    newSocket.onclose = () => {
      console.log('WebSocket 연결이 닫혔습니다.');
      setSocket(null); // WebSocket 연결을 닫으면 상태에서 제거
    };
    newSocket.onerror = (error) => {
      console.error('WebSocket 오류:', error);
    };
    // 컴포넌트가 언마운트 될 때 WebSocket 연결을 닫음
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isPlaying) {
        onKeyDownHandler(event);
      }
    };

    const handleKeyUp = () => {
      if (isPlaying) {
        onKeyUpHandler();
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
    console.log("실행");
    console.log(event.key);
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (event.key === 'Enter') {
        socket.send('Enter');
      }
      if (event.key === 'ArrowRight') {
        socket.send('RIGHT');
      }
      if (event.key === 'ArrowLeft') {
        socket.send('LEFT');
      }
      if (event.key === 'ArrowUp') {
        socket.send('UP');
      }
      if (event.key === 'ArrowDown') {
        socket.send('DOWN');
      }
      if (event.key === 'x') {
        socket.send('X');
      }
      if (event.key === 'z') {
        socket.send('Z');
      }
      if (event.key === 'Shift') {
        socket.send('RightShift');
      }
    }
  };

  const onKeyUpHandler = () => {
    console.log("실행2");
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send('');
    }
  };

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