import React, { useEffect, useState } from 'react';
import GameDetail from '../components/lobbypage/GameDetail';
import PlayerFeature from '../components/lobbypage/PlayerFeature';
import GroomHeader from "../components/@common/groomheader"
export default function LobbyPage() {
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