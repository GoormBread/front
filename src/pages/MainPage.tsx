//로그인을 했을 경우 로비 리스트 페이지를 보여주지만 그렇지 않을 경우 랜딩 페이지를 보여준다.

import React, { useEffect, useRef, useState } from "react";
import LobbyList from "../components/mainpage/LobbyList";
import GroomHeader from "../components/@common/groomheader"
import PasswordPopUp, { PasswordPopupRef } from '../components/mainpage/PasswordPopup';
import CreateLobbyPopUp, { CreateLobbyPopupRef } from '../components/mainpage/CreateLobbyPopup';
import { useNavigate } from 'react-router-dom'; 
import { useUserId } from "../hooks/useUserStoreHooks";
import { io } from "socket.io-client";
import { Lobby } from "../api";

const onClickCreateLobbyButton = async () => {
    try {
      const response = await fetch('API_URL');
      const data = await response.json();
    } catch (error) {
      console.error('Error fetching lobbies:', error);
    }
  };

export default function MainPage(){
    const navigate = useNavigate();
    const [isPasswordPopUpOpen, setIsPasswordPopUpOpen] = useState(false);
    const PasswordPopupRef = useRef<PasswordPopupRef>();
    const [isCreateLobbyPopUpOpen, setIsCreateLobbyPopUpOpen] = useState(false);
    const CreateLobbyPopupRef = useRef<CreateLobbyPopupRef>();
    const user_id = useUserId();

    const socket = io('ws://paran2024.iptime.org/backend', { transports: ['websocket'] });
    socket.on('redirect', (url) => {
        console.log(url);
        navigate(url);
      });
    socket.on('error', (message) => {
        console.log('Error: ' + message);
    });

    const handlePasswordPopupUp = () => {
        if (PasswordPopupRef.current) {
            PasswordPopupRef.current.setDefault();
        }
        setIsPasswordPopUpOpen(true);
      };
      
    const handlePasswordPopUpClose = () => {
        setIsPasswordPopUpOpen(false);
    };

    const handleCreateLobbyPopupClick = () => {
        if (CreateLobbyPopupRef.current) {
            CreateLobbyPopupRef.current.setDefault();
        }
        setIsCreateLobbyPopUpOpen(true);
      };
      
    const handleCreateLobbyPopUpClose = () => {
        setIsCreateLobbyPopUpOpen(false);
    };

    const handleClickLobby = (lobbyName: String, hasPassword: boolean) => {
        if (hasPassword) {
            handlePasswordPopupUp();
        }
        else {
            navigate(`/lobby/${lobbyName}`);
        }
    };

    const handleCreateLobby = (lobbyName: string, lobbyDescription: string, password: string) => {
        socket.emit('createLobby', { lobbyName, lobbyDescription, password });
    }

    const fetchLobbies = () => {
        socket.emit('getAllLobby');
    }

    return (
        <>
            <GroomHeader redirection="/" isActiveCreateLobbyButton={ true } isActiveLogoutButton={true} buttonInfo={{text:"Create Lobby", onClick: handleCreateLobbyPopupClick}}/>
            <LobbyList socket={socket} onClickLobby={handleClickLobby} fetchLobbies={fetchLobbies}/>
            <div className={`fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-20 ${isCreateLobbyPopUpOpen ? "visible" : "duration-300 ease-in-out invisible"}`} onClick={handleCreateLobbyPopUpClose}>
                <CreateLobbyPopUp ref={CreateLobbyPopupRef} className={`bg-groom-grey w-128 h-[450px] rounded-lg transform transition duration-300 ease-in-out ${isCreateLobbyPopUpOpen ? "translate-y-0 opacity-100" : "translate-y-1/2 opacity-0"}`} 
                    onClick={(e) => e.stopPropagation()} 
                    onClose={() => setIsCreateLobbyPopUpOpen(false)}
                    CreateLobby={handleCreateLobby}/>
            </div>
            <div className={`fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-20 ${isPasswordPopUpOpen ? "visible" : "duration-300 ease-in-out invisible"}`} onClick={handlePasswordPopUpClose}>
                <PasswordPopUp ref={PasswordPopupRef} className={`bg-groom-grey w-128 h-72 rounded-lg transform transition duration-300 ease-in-out ${isPasswordPopUpOpen ? "translate-y-0 opacity-100" : "translate-y-1/2 opacity-0"}`} 
                    onClick={(e) => e.stopPropagation()} 
                    onClose={() => setIsPasswordPopUpOpen(false)}/>
            </div>
        </>
    )
}