import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface groomheaderProps {
    redirection: string;
    isActiveCreateLobbyButton: boolean;
    isActiveLogoutButton: Boolean;
    buttonInfo?: {
        text: string;
        onClick: () => void;
    }
  }
  

const groomheader: React.FC<groomheaderProps> = ({ redirection, isActiveCreateLobbyButton, isActiveLogoutButton, buttonInfo}) => {
    const navigate = useNavigate();

    const getCookieValue = (name: string): string | undefined => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        
        if (parts.length === 2) {
          const lastPart = parts.pop();
          if (lastPart) {
            return lastPart.split(';').shift();
          }
        }
      
        return undefined;
    };

    const onClickLogoutButton = async () => {
        try {
            const user_id = getCookieValue('user_id');
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id
                }),
            });

            if (response.ok) {
                const data = await response.json();
                document.cookie = `user_id=; path=/; max-age=0;`;
                console.log(data);
                navigate('/login');
            } else {
                console.error('로그아웃 실패');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div id='header-container' className='fixed top-0 left-0 right-0 flex flex-row justify-between items-center py-3 px-10 w-full h-14 bg-white border-b border-solid border-gray-200 scale-100 box-border'>
            <a id='title-container' className='flex flex-row justify-between items-center w-24 h-6' href={redirection}>
                <img id='goorm-image' src='/AuthPage/logo.svg' className='w-8 h-8 rounded-lg'/>
                <label id='goorm-label' className='flex font-sans font-bold text-lg leading-6 text-groom-blacktext cursor-pointer'>Goorm</label>
            </a>
            <div id='header-right-container' className='flex flex-row justify-center items-center'>
                {isActiveLogoutButton && <button
                    id='goorm-geader-logout-button'
                    type='button'
                    onClick={onClickLogoutButton}
                    className='flex flex-row justify-center items-center py-1 px-4 w-max h-max bg-groom-grey rounded-full
                    font-sans font-bold text-xs leading-6 tracking-wider text-groom-blacktext cursor-pointer'>
                        Logout
                    </button>
                }
                {isActiveCreateLobbyButton && <button
                    id='goorm-header-button'
                    type="button" 
                    onClick={buttonInfo?.onClick}
                    className='flex flex-row justify-center items-center py-1 px-4 w-max h-max mx-4 bg-emerald-500 rounded-3xl
                    font-sans font-bold text-xs leading-6 tracking-wider text-white cursor-pointer'
                >
                    {buttonInfo?.text}
                </button>}
                <div id='user-icon-container' className='flex justify-center items-center w-10 h-10 bg-groom-grey rounded-3xl'>
                    <img id='user-icon' src='/AuthPage/user-icon.svg' className='w-5 h-5'/>
                </div>
            </div>
        </div>
    );
}

export default groomheader