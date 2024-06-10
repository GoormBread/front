import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { motion } from 'framer-motion';
import { Socket } from 'socket.io-client';
import LobbyComponent from './LobbyComponent';

interface LobbyListProp {
  socket: Socket;
  onClickLobby: (lobbyName: string, hasPassword: boolean) => void;
  fetchLobbies: () => void;
}

const LobbyList: React.FC<LobbyListProp> = forwardRef(({socket, onClickLobby, fetchLobbies}: LobbyListProp, ref) => {
  const [lobbies, setLobbies] = useState([]);

  socket.on('allLobbies', (lobbies) => {
    setLobbies(lobbies)
    console.log("lobby", lobbies);
  });

  useEffect(() => {
    socket.emit("getAllLobby")
    fetchLobbies();
  }, []);

  useImperativeHandle(ref, () => ({
    setDefault: () => {
      socket.emit("getAllLobby")
      fetchLobbies();
    },
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const handleRefreshClick = () => {
    fetchLobbies();
  };

  return (
    <div className='w-full h-full'>
      <div className='flex flex-col items-start w-[1200px] mx-auto mt-20'>
        <div className='font-sans font-semibold text-4xl text-groom-blacktext mb-10'>Lobby List</div>
        <motion.div 
          className=" w-full grid grid-cols-4 gap-6"
          variants={containerVariants} 
          initial="hidden"
          animate="visible"
        >
          {lobbies.map((lobby, index) => (
            <LobbyComponent key={index} lobby={lobby} onClick={onClickLobby} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
});

export default LobbyList;