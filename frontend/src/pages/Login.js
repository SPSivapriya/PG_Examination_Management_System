import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both Email and Password.');
      return;
    }
    try {
      const res = await axios.post('/api/users/coordinator/login', { email, password });
      if (res.data && res.data.success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password for coordinator.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password for coordinator.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%)',
      transition: 'all 0.5s',
    }}>
      <div style={{
        width: 400,
        background: 'white',
        borderRadius: 20,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'fade-in-up 0.5s',
      }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#1e3a8a',
          marginBottom: 32,
          letterSpacing: 1,
          textAlign: 'center',
          textShadow: '0 2px 8px rgba(60,60,120,0.08)'
        }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                border: 'none',
                borderBottom: '2px solid #6366f1',
                outline: 'none',
                padding: '10px 8px',
                background: 'transparent',
                fontSize: 16,
                transition: 'border-color 0.2s',
              }}
            />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                border: 'none',
                borderBottom: '2px solid #6366f1',
                outline: 'none',
                padding: '10px 8px',
                background: 'transparent',
                fontSize: 16,
                transition: 'border-color 0.2s',
              }}
            />
          </div>
          {error && (
            <div style={{ color: 'red', marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #6366f1 0%, #a78bfa 100%)',
              color: 'white',
              padding: '12px 0',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 18,
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              marginTop: 8,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Login
          </button>
        </form>
      </div>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <a href="/faculty/register" style={{ color: '#6366f1', textDecoration: 'underline', fontWeight: 500 }}>
          Register as Faculty
        </a>
      </div>
    </div>
  );
};

export default Login; 