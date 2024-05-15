import { Route, Routes } from "react-router-dom";
import GamePlayPage from "./pages/GamePlayPage";
import LobbyPage from "./pages/LobbyPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import UserInfoPage from "./pages/UserInfoPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/lobby/:lobbyId" element={<LobbyPage />}/>
        <Route path="/play-game/:lobbyID" element={<GamePlayPage />}/>
        <Route path="/user/:userId" element={<UserInfoPage />}/>
      </Routes>
    </>
  )
}


