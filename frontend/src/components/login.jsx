import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./login.css";

function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      console.log('Login response:', res.data);
      const { token, user } = res.data;
      if (!res.data || !res.data.token || !res.data.user) {
  alert('Login failed: Invalid response from server');
  return;
}
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Login successful, navigating to dashboard...');
      navigate('/dashboard');
    } catch (err) {
        console.error('login error:', err.response?.data || err.message);
      alert('Login failed: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };


  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: 10 }}
      />
      <button onClick={handleLogin} style={{ width: '100%', marginBottom: 10 }}>
        Login
      </button>

      <hr />

      <p>Don't have an account?</p>
      <button onClick={goToRegister} style={{ width: '100%' }}>
        Register
      </button>
    </div>
  );
}

export default Login;
