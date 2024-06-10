import React, {useState, useEffect, forwardRef, useImperativeHandle} from "react";
import { useNavigate, useParams } from 'react-router-dom'; 
import PlayerState from "./PlayerState";
import KeySetting from "./KeySetting";
import io, { Socket } from 'socket.io-client';
import { useUserId } from "../../hooks/useUserStoreHooks";
import { Lobby } from "../../api";

interface PlayerFeatureProps {
    socket: Socket;
  }

export const PlayerFeature = forwardRef(({socket}: PlayerFeatureProps, ref) => {
    const navigate = useNavigate();
    const [showKeySetting, setShowKeySetting] = useState(false);
    const [lobbyData, setLobbyData] = useState<Lobby>({
        lobbyId: "",
        lobbyName: "",
        lobbyDescription: "",
        password: "",
        playerNum: 0,
        players: {
            "player1": true
        },
        clients: {
            "client1": "player1"
        },
        lock: false
    });

    const { lobbyId } = useParams();
    const { userId } = useUserId();

    useEffect(() => {
        socket.emit("joinLobby", {lobbyId: lobbyId, playerId: userId, password: ''})
    }, []);

    socket.on('redirect', (url) => {
        navigate(url);
    });

    socket.on('updateLobby', (lobby) => {
        setLobbyData(lobby);
    });

    socket.on('startGame', (route) => {
        navigate(route);
    });

    socket.on('error', (message) => {
        console.log('Error: ' + message);
        socket.emit('leaveLobby', { lobbyId: lobbyId, playerId: userId });
        navigate('/');
    });

    const ShowKeySettingBtn = () => {
        setShowKeySetting(true);
    };
    const handleReadyBtn = () => {
        socket.emit('toggleReady', { lobbyId: lobbyId, playerId: userId });
    };
    const handleExitBtn = async ()=> {
        socket.emit('leaveLobby', { lobbyId: lobbyId, playerId: userId });
        navigate('/');
    }

    useImperativeHandle(ref, () => ({
        setDefault: () => {
            
        },
      }));

    return (
        <>
            <div className="mb-[20px] w-[1440px] h-[362px] flex flex-row justify-center items-start gap-[150px]">
                <div id="player_state_container" className="relative flex flex-row items-center p-[15px_15px] gap-[100px] rounded-xl">
                    {Object.keys(lobbyData.players).map((playerKey, index) => (
                        <PlayerState key={index} name={playerKey} ready={lobbyData.players[playerKey]}/>
                    ))}
                    {Object.keys(lobbyData.players).length === 1 && (
                        <PlayerState
                            key="empty"
                            name=""
                            ready={false}
                        />
                    )}
                </div>
                <div id="btn_contanier" className="w-[230px] h-[348px] flex flex-col items-end p-[29px_10px] gap-10">
                    <button id="ready_btn" onClick={handleReadyBtn} className="w-[200px] h-[70px] bg-[#B9DDC3] rounded-[12px] flex justify-center items-center px-4">
                        <div className="font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-center text-[#1A1A1A]">
                            Ready
                        </div>
                    </button>
                    <button id="key_setting_btn" onClick={ShowKeySettingBtn} className="w-[200px] h-[70px] bg-[#9EA6B8] rounded-[12px] flex justify-center items-center px-4">
                        <div className="flex items-center text-center font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-white">
                            Key Setting
                        </div>
                    </button>
                    <button id="exit_btn" onClick={handleExitBtn} className="w-[170px] h-[70px] bg-[#9EA6B8] rounded-[12px] flex justify-center items-center px-4">
                        <div className="flex items-center font-['Spline_Sans'] font-bold text-[30px] leading-[21px] text-center text-white">
                            EXIT
                        </div>
                    </button>
                </div>
            </div>
            <KeySetting showKeySetting={showKeySetting} setShowKeySetting={setShowKeySetting} onClick={(e) => e.stopPropagation()} onClose={() => setShowKeySetting(false)} />
        </>
    );
});