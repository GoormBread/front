import React, { useRef, useState } from 'react';
import Signup from './Signup';

const Signin  = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignupPopup, setShowSignupPopup] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

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
    
        console.log('로그인 요청:', { email, password });
    
        // 로그인 요청 부분
        try {
          const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log(data);
          } else {
            console.error('로그인 실패');
          }
        } catch (error) {
          console.error(error);
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
              <input id="login-field-input--email" className="p-4 w-96 h-14 bg-white border border-solid border-stone-300 rounded-xl
              placeholder:text-base placeholder:leading-6 placeholder:font-sans placeholder:font-medium placeholder:tracking-wider placeholder:text-stone-300"
                type="email"
                value={email}
                placeholder='Email address'
                onChange={handleEmailChange}
              />
            </div>
            <div id="login-field" className="flex flex-col items-start py-3 px-4 w-max h-max">
              <label id="login-field-label" className="pb-2 w-96 h-8 font-sans font-medium text-base leading-6 text-stone-900">Password</label>
              <input id="login-field-input--password" className="p-4 w-96 h-14 bg-white border border-solid border-stone-300 rounded-xl
              placeholder:text-base placeholder:leading-6 placeholder:font-sans placeholder:font-medium placeholder:tracking-wider placeholder:text-stone-300"
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
          <button id="login-button-signup" type="button" onClick={handleSignupClick} className="flex flex-row justify-center items-center py-5 w-96 h-12 bg-zinc-100 rounded-3xl
              font-sans font-bold text-base leading-6 tracking-wider text-slate-500 cursor-pointer">
            Sign Up
          </button>
        </div>
        
        {showSignupPopup && (<Signup popupRef={popupRef} showSignupPopup={showSignupPopup} setShowSignupPopup={setShowSignupPopup}/>)}
        
      </div>
    );
}

export default Signin;