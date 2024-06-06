import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { GameApi } from "../../api";

interface GameKeyTableProps {
  className?: string;
}

export default function GameKeyTable({ className }: GameKeyTableProps) {
  interface KeyInfoData {
    [key: string]: string;
    A: string;
    B: string;
    Select: string;
    Start: string;
    UP: string;
    DOWN: string;
    LEFT: string;
    RIGHT: string;
  }
  const [keyInfoData, setKeyInfoData] = useState<KeyInfoData>({
    A: '공격',
    B : '점프',
    Select: '일시정지',
    Start: '시작',
    UP: '위 바라보기',
    DOWN: '수그리기',
    LEFT: '왼쪽으로 이동',
    RIGHT: '오른쪽으로 이동'
  });
  const lobby_id = useParams();
  const gameApi = new GameApi();
  const game_id = "5be1b121-c22f-4bba-a802-d25abd0a12b5"

  useEffect(() => {
    const fetchGameList = async () => {
        try {
            const response = await gameApi.gameControllerGetGameCommandRaw({
              gameId: game_id
            });
            const data = await response.raw.json();
            console.log(response);
            setKeyInfoData(data.gameCommand.game_command);
            
        } catch (error) {
            console.error('게임 정보를 가져오는 중 오류가 발생했습니다:', error);
        }
    };

    fetchGameList();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response_lobby = await fetch(`/all-lobby/id=${lobby_id}`); // API 요청
        if (response_lobby.ok) {
          const lobby_data = await response_lobby.json();
          const response_game_id = await fetch(`/all-game/id=${lobby_data.game_id}/pad`); // API 요청
          if (response_game_id.ok) {
            const data = await response_game_id.json();
            setKeyInfoData({
              A: data.A,
              B: data.B,
              Select: data.Select,
              Start: data.Start,
              UP: data.Up,
              DOWN: data.Down,
              LEFT: data.Left,
              RIGHT: data.Right
            })
          } else {
            console.error('게임 키 정보 데이터 가져오기 실패');
          }
        } else {
          console.error('데이터 가져오기 실패');
        }

      } catch (error) {
        console.error('네트워크 에러:', error);
      }
    };

    fetchData(); // 컴포넌트가 마운트될 때 fetchData 호출
}, []);

  return (
    <div className={`${className}`}>
      <table className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden font-serif font-bold">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 font-semibold">버튼</th>
            <th className="py-2 px-4 font-semibold">기능</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="py-2 px-4">A</td>
            <td className="py-2 px-4">{keyInfoData.A}</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">B</td>
            <td className="py-2 px-4">{keyInfoData.B}</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">Select</td>
            <td className="py-2 px-4">{keyInfoData.Select}</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">Start</td>
            <td className="py-2 px-4">{keyInfoData.Start}</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">Up</td>
            <td className="py-2 px-4">{keyInfoData.UP}</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">Down</td>
            <td className="py-2 px-4">{keyInfoData.DOWN}</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">Left</td>
            <td className="py-2 px-4">{keyInfoData.LEFT}</td>
          </tr>
          <tr className="border-t">
            <td className="py-2 px-4">Right</td>
            <td className="py-2 px-4">{keyInfoData.RIGHT}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}