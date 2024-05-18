
  
import React, { useRef, useState } from 'react';
import "./PopupAnim.css"

interface SignupProps {
    popupRef: React.RefObject<HTMLDivElement | null>;
    showSignupPopup: boolean;
    setShowSignupPopup: React.Dispatch<React.SetStateAction<boolean>>;
}
  
const Signup: React.FC<SignupProps> = ({ popupRef, showSignupPopup, setShowSignupPopup }) => {
      
  const [signupData, setSignupData] = useState({
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setShowSignupPopup(false);
    }
  };
  
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordMatch(signupData.password === signupData.confirmPassword);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


  const { nickname, email, password, confirmPassword } = signupData;

  if (!nickname || !email || !password || !confirmPassword) {
    const missingFields = [];
    if (!nickname) missingFields.push('닉네임');
    if (!email) missingFields.push('이메일');
    if (!password) missingFields.push('비밀번호');
    if (!confirmPassword) missingFields.push('비밀번호 확인');

    alert(`다음 항목을 입력해주세요: ${missingFields.join(', ')}`);
    return;
  }

    if (signupData.password !== signupData.confirmPassword) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
    }

    console.log('회원가입 요청:', signupData);

    // 회원가입 요청 부분
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setShowSignupPopup(false);
      } else {
        console.error('회원가입 실패');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div id="signup-popup-container" className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50" onClick={handleOutsideClick}>
          <div id="signup-popup-content" className={showSignupPopup ? 
              'relative flex flex-col items-center p-5 w-128 bg-white rounded-xl shadow-lg popup-up' : ''
            } ref={popupRef as React.RefObject<HTMLDivElement>}>
              <h2 className='font-sans font-bold text-xl'>회원가입</h2>
              <form id='signup-form' className='flex flex-col items-center w-min h-min' onSubmit={handleSignupSubmit}>
                <div id="signup-field" className='flex flex-col items-center px-3 py-4 w-96 h-28'>
                    <label id="signup-field-label" className='pb-2 w-96 h-8 font-sans font-medium text-base leading-6 text-stone-900'>Nickname</label>
                      <input id="signup-field-input" className='box-border flex flex-row justify-center items-center p-4 w-96 h-14 bg-white border border-solid border-groom-brown rounded-xl
                      placeholder:text-base placeholder:leading-6 placeholder:font-sans placeholder:font-medium placeholder:tracking-wider placeholder:text-groom-browntext placeholder:text-opacity-40'
                      type="text"
                      name="nickname"
                      value={signupData.nickname}
                      placeholder='Nickname'
                      onChange={handleSignupChange}
                      />
                </div>
                <div id="signup-field" className='flex flex-col items-center px-3 py-4 w-96 h-28'>
                    <label id="signup-field-label" className='pb-2 w-96 h-8 font-sans font-medium text-base leading-6 text-stone-900'>Email</label>
                      <input id="signup-field-input" className='className=box-border flex flex-row justify-center items-center p-4 w-96 h-14 bg-white border border-solid border-groom-brown rounded-xl
                      placeholder:text-base placeholder:leading-6 placeholder:font-sans placeholder:font-medium placeholder:tracking-wider placeholder:text-groom-browntext placeholder:text-opacity-40'
                      type="email"
                      name="email"
                      value={signupData.email}
                      placeholder='Email address'
                      onChange={handleSignupChange}
                      />
                </div>
                <div id="signup-field" className='flex flex-col items-center px-3 py-4 w-96 h-28'>
                    <label id="signup-field-label" className='pb-2 w-96 h-8 font-sans font-medium text-base leading-6 text-stone-900'>Password</label>
                      <input id="signup-field-input" className='className=box-border flex flex-row justify-center items-center p-4 w-96 h-14 bg-white border border-solid border-groom-brown rounded-xl
                      placeholder:text-base placeholder:leading-6 placeholder:font-sans placeholder:font-medium placeholder:tracking-wider placeholder:text-groom-browntext placeholder:text-opacity-40'
                      type="password"
                      name="password"
                      value={signupData.password}
                      placeholder='Password'
                      onChange={handleSignupChange}
                      />
                </div>
                <div id="signup-field" className='flex flex-col items-center px-3 py-4 w-96 h-28'>
                    <label id="signup-field-label" className='pb-2 w-96 h-8 font-sans font-medium text-base leading-6 text-stone-900A'>Password Confirm</label>
                      <input id="signup-field-input" className='className=box-border flex flex-row justify-center items-center p-4 w-96 h-14 bg-white border border-solid border-groom-brown rounded-xl
                      placeholder:text-base placeholder:leading-6 placeholder:font-sans placeholder:font-medium placeholder:tracking-wider placeholder:text-groom-browntext placeholder:text-opacity-40'
                        type="password"
                        name="confirmPassword"
                        value={signupData.confirmPassword}
                        placeholder='Confirm Password'
                        onChange={handleSignupChange}
                      />
                </div>
              <button type="submit" id="signup-button---signup_popup" className='flex flex-row justify-center items-center py-5 w-96 h-12 mt-8 mb-8 bg-emerald-500 rounded-3xl font-sans font-bold text-base leading-6 tracking-wider text-white cursor-pointer'>Sign Up</button>
            </form>
        </div>
    </div>
  );
}

export default Signup;