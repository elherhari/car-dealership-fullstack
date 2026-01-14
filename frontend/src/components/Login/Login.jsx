import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/djangoapp/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: userName,
          password: password
        }),
      });

      const data = await response.json();

      if (data.status === 'Authenticated') {
        // Sauvegarde dans sessionStorage
        sessionStorage.setItem('username', data.userName);
        setMessage('Login successful! Redirecting...');
        
        // Redirection vers la page d'accueil
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setMessage('Error: Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Error: Could not connect to server');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🚗 Login to Best Cars</h1>
        <p className="subtitle">Sign in to access all features</p>

        <form onSubmit={handleLogin}>
          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;