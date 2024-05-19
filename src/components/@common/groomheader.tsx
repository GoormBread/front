import React, { useRef, useState } from 'react';

const groomheader = () => {

    return (
        <div id='header-container' className='fixed top-0 left-0 right-0 flex flex-row justify-between items-center py-3 px-10 w-full h-14 bg-white border-b border-solid border-gray-200 scale-100 box-border'>
            <a id='title-container' className='flex flex-row justify-between items-center w-24 h-6' href="http://localhost:5173/login">
                <img id='goorm-image' src='/AuthPage/logo.svg' className='w-8 h-8 rounded-lg'/>
                <label id='goorm-label' className='flex font-sans font-bold text-lg leading-6 text-groom-blacktext cursor-pointer'>Goorm</label>
            </a>
            <div id='user-icon-container' className='flex justify-center items-center w-10 h-10 bg-groom-grey rounded-3xl'>
                <img id='user-icon' src='/AuthPage/user-icon.svg' className='w-5 h-5'/>
            </div>
        </div>
    );
}

export default groomheader