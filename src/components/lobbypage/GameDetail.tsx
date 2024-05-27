import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

export default function GameDetail() {
    const [gameName, setGameName] = useState('MetalSlug');
    const [gameExplain, setGameExplain] = useState('메탈슬러그입니다. 재미있어요.');
    const [gameSumnail, setGameSumnail] = useState('/LobbyPage/MetalSlug.jpg');
    const lobby_id = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/all-lobby/id=${lobby_id}`); // API 요청
            if (response.ok) {
              const data = await response.json();
              setGameName(data.game_name);
              setGameExplain(data.game_info);
              setGameSumnail(`/LobbyPage/${data.game_name}.jpg`);
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
        <div id="game_data_container" className="mt-5 w-[90%] h-[50%] bg-[#FFFFE1] border border-black flex flex-row justify-center items-center rounded-[12px] p-4 gap-2 flex-grow">
            <div className="w-[1307px] h-[100%] rounded-[12px] flex flex-row items-center">
                <img id="game_sumnail" src={gameSumnail} className="w-[653.5px] h-[96%] bg-[#000000] rounded-[12px]"></img>
                <div id="game_info" className="w-[653.5px] h-[437px] flex flex-col justify-center items-center p-[40px_100px] gap-1 flex-grow">
                    <div id="game_name" className={"w-[453.5px] h-[23px] font-['Spline_Sans'] font-bold text-[30px] leading-[22px] tracking-[-0.27px] text-black flex-grow"}>
                        {gameName}
                    </div>
                    <div id="game_explain" className="mt-10 w-[453.5px] h-[330px] font-['Spline_Sans'] text-[20px] leading-[24px] text-[#999999] flex-grow">
                        {gameExplain}
                    </div>
                </div>
            </div>
        </div>
    );
}