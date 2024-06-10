import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GameApi, Lobby } from '../../api';

interface LobbyComponentProps {
  lobby: Lobby;
  onClick: (lobbyName: string, hasPassword:boolean) => void;
  index: number;
}

const LobbyComponent: React.FC<LobbyComponentProps> = ({ lobby, onClick, index }) => {
  const gameApi = new GameApi();
  const [Sumnail, setGameSumnail] = useState('/LobbyPage/MetalSlug.jpg');

  useEffect(() => {
    const fetchSumnail = async () => {
        try {
            const thumbnail_response = await gameApi.gameControllerGetGameThumbnailRaw({
              gameId: lobby.lobbyDescription
            });
            setGameSumnail(URL.createObjectURL(await thumbnail_response.raw.blob()));
            
        } catch (error) {
            console.error('게임 썸네일를 가져오는 중 오류가 발생했습니다:', error);
        }
    };

    fetchSumnail();
}, []);

  const handleClick = () => {
    console.log("thislobby", lobby.lobbyId);
    onClick(lobby.lobbyId, lobby.password !== '');
  };
  

  return (
    <motion.div 
      className="relative bg-groom-grey p-4 h-96 rounded-lg rounded-br-[50px] hover:brightness-95 active:brightness-75" 
      onClick={handleClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className='relative p-10 h-36 '>
        <img src={Sumnail} alt={lobby.lobbyName} className="absolute top-0 left-0 w-full h-full p-4 object-cover mb-2 bg-gray-400 rounded-lg" />
        {lobby.password !== '' &&  <div className='flex items-center justify-center absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'>
          <img src='/MainPage/lock.svg' className='fill-white w-16 h-16'/>
        </div>}
      </div>
      <h3 className="pt-3 text-xl font-sans font-bold text-groom-blacktext">{lobby.lobbyName}</h3>
      {/* <p className="text-gray-600">{lobby.gameType}</p> */}
      <div id='player-1' className='flex items-center justify-center absolute bottom-20 right-20 w-9 h-9 rounded-full bg-red-500'>
        {/* <img id='user-icon' src='/AuthPage/user-icon.svg' className='w-5 h-5'/> */}
      </div>
      <div id='player-2' className='flex items-center justify-center absolute bottom-24 right-8 w-9 h-9 rounded-full bg-gray-500'>
        {/* <img id='user-icon' src='/AuthPage/user-icon.svg' className='w-5 h-5'/> */}
      </div>
      <img src="/MainPage/PlusKey.svg" className='absolute left-6 bottom-16 h-20 w-20' />
      <div className='absolute right-2 bottom-12 rotate-[60deg] w-8 h-1 bg-gray-500'></div>
      <div className='absolute right-5 bottom-10 rotate-[60deg] w-8 h-1 bg-gray-500'></div>
      <div className='absolute right-8 bottom-8 rotate-[60deg] w-8 h-1 bg-gray-500'></div>
    </motion.div>
  );
};

export default LobbyComponent;