import React, { useEffect, useState } from 'react';
import Lobby from './LobbyComponent';

const LobbyList = () => {
  const [lobbies, setLobbies] = useState([
    {
      name: 'Lobby 1',
      currentPlayers: 1,
      maxPlayers: 2,
      hasPassword: false,
      gameType: 'Battle Royale',
      thumbnail: '/AuthPage/testLoginImage.svg',
    },
    {
      name: 'Lobby 2',
      currentPlayers: 1,
      maxPlayers: 2,
      hasPassword: true,
      gameType: 'Capture the Flag',
      thumbnail: '/AuthPage/testLoginImage.svg',
    },
    {
      name: 'Lobby 3',
      currentPlayers: 1,
      maxPlayers: 2,
      hasPassword: false,
      gameType: 'Team Deathmatch',
      thumbnail: '/AuthPage/testLoginImage.svg',
    },
    {
      name: 'Lobby 4',
      currentPlayers: 1,
      maxPlayers: 2,
      hasPassword: false,
      gameType: 'Team Deathmatch',
      thumbnail: '/AuthPage/testLoginImage.svg',
    },
    {
      name: 'Lobby 1',
      currentPlayers: 1,
      maxPlayers: 2,
      hasPassword: false,
      gameType: 'Battle Royale',
      thumbnail: '/AuthPage/testLoginImage.svg',
    },
    {
      name: 'Lobby 2',
      currentPlayers: 1,
      maxPlayers: 2,
      hasPassword: true,
      gameType: 'Capture the Flag',
      thumbnail: '/AuthPage/testLoginImage.svg',
    },
    {
      name: 'Lobby 3',
      currentPlayers: 1,
      maxPlayers: 2,
      hasPassword: false,
      gameType: 'Team Deathmatch',
      thumbnail: '/AuthPage/testLoginImage.svg',
    },
    {
      name: 'Lobby 4',
      currentPlayers: 1,
      maxPlayers: 2,
      hasPassword: false,
      gameType: 'Team Deathmatch',
      thumbnail: '/AuthPage/testLoginImage.svg',
    },
    // 추가적인 임시 로비 데이터를 여기에 정의할 수 있습니다.
  ]);

  // API 호출 부분은 주석 처리합니다.
  // useEffect(() => {
  //   const fetchLobbies = async () => {
  //     try {
  //       const response = await fetch('API_URL');
  //       const data = await response.json();
  //       setLobbies(data);
  //     } catch (error) {
  //       console.error('Error fetching lobbies:', error);
  //     }
  //   };
  //
  //   fetchLobbies();
  // }, []);

  const handleLobbyClick = (lobbyName: string) => {
    console.log(`Clicked lobby: ${lobbyName}`);
    // 클릭된 로비에 대한 추가 동작 수행
  };

  return (
    <div className='w-full h-full'>
      <div className='flex flex-col items-start w-[1200px] mx-auto mt-20'>
        <div className='font-sans font-semibold text-4xl text-groom-blacktext mb-10'>Lobby List</div>
        <div className=" w-full grid grid-cols-4 gap-6">
          {lobbies.map((lobby) => (
            <Lobby key={lobby.name} lobby={lobby} onClick={handleLobbyClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LobbyList;