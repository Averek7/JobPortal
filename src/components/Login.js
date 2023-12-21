// src/components/Login.js
import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Import the CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in');
      navigate('/');
    } catch (error) {
      toast.error('Invalid email or password. Please try again.');
      console.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log('Google login successful');
      navigate('/');
    } catch (error) {
      toast.error('Google login failed. Please try again.');
      console.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Job Portal</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Login</button>
        <button className="google-login-button" onClick={handleGoogleLogin}>
          Login with Google
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
