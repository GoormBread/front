import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetUserStore } from "../../hooks/useUserStoreHooks";
import Signup from './Signup';

const Signin  = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const { setUserStore } = useSetUserStore();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      };
    
      const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      };
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!email || !password) {
            alert('이메일과 비밀번호를 모두 입력해주세요.');
            return;
          }
    

        // const formData = new FormData();
        // formData.append('userId', email);
        // formData.append('password', password);

        // 로그인 요청 부분
        try {
            const response = await fetch('http://paran2024.iptime.org/backend/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId :email,
              password: password 
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            const { userId, nickname} = data;
            setUserStore(userId, nickname);
            navigate('/');
            console.log(data);
          } else if (response.status == 401) {
             // password incorrect
            alert("비밀번호를 잘못 입력하였습니다.");
          } else if (response.status == 404) {
            // id is unexist
            alert("아이디가 존재하지 않습니다.");
          } else {
            console.error('로그인 실패');
            alert("로그인에 실패하였습니다. " + response.status);
          }
        } catch (error) {
          console.error(error);
          alert("로그인 요청 중 오류가 발생했습니다. " + error)
        }
      };
    
      const handleSignupClick = () => {
        setShowSignupPopup(true);
      };

    return (
      <div>
        <div id="login-container" className="flex flex-col items-center justify-start w-full h-full mt-16">
          <img id="login-header-image" src="/AuthPage/testLoginImage.svg" className="max-w-4xl max-h-56"/>
          <form id="login-form" className="flex flex-col items-center w-max h-max mt-10" onSubmit={handleSubmit}>
            <div id="login-field" className="flex flex-col items-start py-3 px-4 w-max h-max">
              <label id="login-field-label" className="pb-2 w-96 h-8 font-sans font-medium text-base leading-6 text-stone-900">Email address</label>
              <input id="login-field-input--email" className="p-4 w-96 h-14 bg-white border border-solid border-groom-brown rounded-xl
              placeholder:text-base placeholder:leading-6 placeholder:font-sans placeholder:font-medium placeholder:tracking-wider placeholder:text-groom-browntext placeholder:text-opacity-40"
                type="text"
                value={email}
                placeholder='ID'
                onChange={handleEmailChange}
              />
            </div>
            <div id="login-field" className="flex flex-col items-start py-3 px-4 w-max h-max">
              <label id="login-field-label" className="pb-2 w-96 h-8 font-sans font-medium text-base leading-6 text-stone-900">Password</label>
              <input id="login-field-input--password" className="p-4 w-96 h-14 bg-white border border-solid border-stone-300 rounded-xl
              placeholder:text-base placeholder:leading-6 placeholder:font-sans placeholder:font-medium placeholder:tracking-wider placeholder:text-groom-browntext placeholder:text-opacity-40"
              type="password"
              value={password}
              placeholder='Password'
              onChange={handlePasswordChange}
              />
            </div>
            <div id="login-spacer1" className="m-4"></div>
            <button id="login-button-singin" type="submit" className="flex flex-row justify-center items-center py-5 w-96 h-12 bg-emerald-500 rounded-3xl
              font-sans font-bold text-base leading-6 tracking-wider text-white cursor-pointer">
              Log In
            </button>
          </form>
          <div id="login-spacer2" className="m-2"></div>
          <button id="login-button-signup" type="button" onClick={handleSignupClick} className="flex flex-row justify-center items-center py-5 w-96 h-12 bg-groom-grey rounded-3xl
              font-sans font-bold text-base leading-6 tracking-wider text-groom-blacktext cursor-pointer">
            Sign Up
          </button>
        </div>
        
        {showSignupPopup && (<Signup popupRef={popupRef} showSignupPopup={showSignupPopup} setShowSignupPopup={setShowSignupPopup}/>)}
        
      </div>
    );
}

export default Signin;