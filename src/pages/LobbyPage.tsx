import React from 'react';
import GameDetail from '../components/lobbypage/GameDetail';
import PlayerFeature from '../components/lobbypage/PlayerFeature';
import GroomHeader from "../components/@common/groomheader"

export default function LobbyPage() {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white">
            <GroomHeader redirection="/login" isActiveCreateLobbyButton={ false } isActiveLogoutButton={false}/>
            <div className="flex flex-col bg-groom-brown items-center rounded-[12px] gap-12">
                <GameDetail />
                <PlayerFeature />
            </div>
        </div>
    );
};