

import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', loginData);
      console.log(response.data); 
      onLogin();
    } catch (error) {
      console.error(error);
      setError('Invalid email or password');
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/signup', signupData);
      console.log(response.data); 
      setIsLogin(true); 
    } catch (error) {
      console.error(error);
      setError('Signup failed');
    }
  };

  return (
    <div>
      <button onClick={() => setIsLogin(true)}>Login</button>
      <button onClick={() => setIsLogin(false)}>Sign Up</button>
      {error && <p>{error}</p>}
      {isLogin ? (
        <div>
          <h2>Login</h2>
          <input type="email" placeholder="Email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
          <input type="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Sign Up</h2>
          <input type="email" placeholder="Email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
          <input type="password" placeholder="Password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
          <input type="password" placeholder="Confirm Password" value={signupData.confirmPassword} onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} />
          <button onClick={handleSignup}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
