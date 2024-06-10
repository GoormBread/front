import React, { useState, useEffect, forwardRef } from "react";
import { useParams } from "react-router-dom";
import { GameApi, Lobby } from '../../api';
import { Socket } from "socket.io-client";

interface GameDetailProps {
    socket: Socket;
}

export const GameDetail = forwardRef(({ socket }: GameDetailProps, ref) => {
    const [gameName, setGameName] = useState('MetalSlug');
    const [gameExplain, setGameExplain] = useState('메탈슬러그입니다. 재미있어요.');
    const [gameSumnail, setGameSumnail] = useState('/LobbyPage/MetalSlug.jpg');
    const lobby_id = useParams();
    const gameApi = new GameApi();
    const [lobbyData, setLobbyData] = useState<Lobby>();
    const [gameId, setGameId] = useState<String>("5be1b121-c22f-4bba-a802-d25abd0a12b5");

    socket.on('updateLobby', (lobby) => {
        setGameId(lobby.lobbyDescription);
    });

    useEffect(() => {
        const fetchGameList = async () => {
            try {
                const response = await gameApi.gameControllerGetGameInformtaionRaw({
                    gameId: gameId
                });
                const data = await response.raw.json();
                console.log("실행");
                console.log(response);
                setGameName(data.gameInfo.game_name);
                setGameExplain(data.gameInfo.game_info);
                const thumbnail_response = await gameApi.gameControllerGetGameThumbnailRaw({
                    gameId: gameId
                });
                setGameSumnail(URL.createObjectURL(await thumbnail_response.raw.blob()));

            } catch (error) {
                console.error('게임 정보를 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchGameList();
    }, [gameId]);

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
});