import { Route, Routes } from "react-router-dom";
import GamePlayPage from "./pages/GamePlayPage";
import { LobbyPage } from "./pages/LobbyPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import UserInfoPage from "./pages/UserInfoPage";
import useUserStore from "./store/useUserStore";
import { io } from "socket.io-client";


export default function App() {
  useUserStore();
  const socket = io('ws://paran2024.iptime.org/backend', { transports: ['websocket'] });
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/lobby/:lobbyId" element={<LobbyPage socket={socket}/>}/>
        <Route path="/play-game/:lobbyID" element={<GamePlayPage socket={socket}/>}/>
        <Route path="/user/:userId" element={<UserInfoPage />}/>
      </Routes>
    </>
  )
}


