import React, { useEffect, useState } from 'react';
import GameDetail from '../components/lobbypage/GameDetail';
import PlayerFeature from '../components/lobbypage/PlayerFeature';
import GroomHeader from "../components/@common/groomheader"
import { GameApi } from '../api';

export default function LobbyPage() {
    const [test2, setTest] = useState<any>();
    const gameApi = new GameApi();
    
    useEffect(() => {
        const fetchGameList = async () => {
            try {
                const response = await gameApi.gameControllerGetAllGameListRaw({
                
                });
                setTest(await response.raw.json());
                console.log("실행");
                console.log(response);
                
            } catch (error) {
                console.error('게임 목록을 가져오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchGameList();
    }, []);
    console.log(test2);
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white">
            <GroomHeader redirection="/" isActiveCreateLobbyButton={ false } isActiveLogoutButton={false}/>
            <div className="mt-14 w-[1440px] h-[850px] flex flex-col bg-groom-brown items-center rounded-[12px]">
                <GameDetail />
                <PlayerFeature />
            </div>
        </div>
    );
};