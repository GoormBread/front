// LoginPage.tsx
import React, { useRef, useState } from 'react';
import './Auth_Signin.css';
import './Auth_Signup.css';
import './header.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [signupData, setSignupData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [passwordMatch, setPasswordMatch] = useState(true);

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
    <div className="auth-container">

      <div className='header-container'>
        <a className='title-container' href="http://localhost:5173/">
          <div className='goorm-image'/>
          <label className='goorm-label'>Goorm</label>
        </a>
        <div className='user-icon-container'>
          <div className='user-icon'/>
        </div>
      </div>

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-header">
                <div className="login-header-image"></div>
            </div>
            <div className="login-field">
              <label className="login-field-label">Email address</label>
              <input className="login-field-input"
                type="email"
                id="email"
                value={email}
                placeholder='Email address'
                onChange={handleEmailChange}
              />
            </div>
            <div className="login-field">
            <label className="login-field-label">Password</label>
            <input className="login-field-input"
                type="password"
                id="password"
                value={password}
                placeholder='Password'
                onChange={handlePasswordChange}
            />
          </div>
          <div className="spacer"></div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="spacer"></div>
        <button type="button" className="signup-button" onClick={handleSignupClick}>
          Sign Up
        </button>
      </div>

      {showSignupPopup && (
          <div className="signup-popup-container" onClick={handleOutsideClick}>
              <div className={`signup-popup-content ${showSignupPopup ? '' : '.hide'}`} ref={popupRef}>
                  <h2>회원가입</h2>
                  <form className='signup-form' onSubmit={handleSignupSubmit}>
                    <div className="signup-field">
                        <label className="signup-field-label">Nickname</label>
                          <input className="signup-field-input"
                          type="text"
                          id="nickname"
                          name="nickname"
                          value={signupData.nickname}
                          placeholder='Nickname'
                          onChange={handleSignupChange}
                          />
                    </div>
                    <div className="signup-field">
                        <label className="signup-field-label">Email</label>
                          <input className="signup-field-input"
                          type="email"
                          id="email"
                          name="email"
                          value={signupData.email}
                          placeholder='Email address'
                          onChange={handleSignupChange}
                          />
                    </div>
                    <div className="signup-field">
                        <label className="signup-field-label">Password</label>
                          <input className="signup-field-input"
                          type="password"
                          id="signup-password"
                          name="password"
                          value={signupData.password}
                          placeholder='Password'
                          onChange={handleSignupChange}
                          />
                    </div>
                    <div className="signup-field">
                        <label className="signup-field-label">Password Confirm</label>
                          <input className="signup-field-input"
                            type="password"
                            id="confirm-password"
                            name="confirmPassword"
                            value={signupData.confirmPassword}
                            placeholder='Confirm Password'
                            onChange={handleSignupChange}
                          />
                    </div>
                  <button type="submit" className="signup-button---signup_popup">Sign Up</button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Auth;