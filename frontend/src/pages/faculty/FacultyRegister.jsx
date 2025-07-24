import React, { useState } from 'react';
import axios from 'axios';

const FacultyRegister = () => {
  const [form, setForm] = useState({
    userId: '',
    name: '',
    email: '',
    password: '',
    role: 'faculty'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const validate = () => {
    if (!form.userId || !form.name || !form.email || !form.password || !form.role) {
      setError('All fields are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Invalid email format.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/register', form);
      setSuccess(res.data.message || 'Registration successful!');
      setForm({ userId: '', name: '', email: '', password: '', role: 'faculty' });
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
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
        }}>Faculty Registration</h2>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6 }}>ID</label>
            <input
              type="text"
              name="userId"
              value={form.userId}
              onChange={handleChange}
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
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6 }}>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
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
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6 }}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
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
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6 }}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
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
            <label style={{ display: 'block', color: '#374151', fontWeight: 600, marginBottom: 6 }}>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                border: 'none',
                borderBottom: '2px solid #6366f1',
                outline: 'none',
                padding: '10px 8px',
                background: 'transparent',
                fontSize: 16,
                color: form.role ? '#111827' : '#9ca3af',
                transition: 'border-color 0.2s',
              }}
            >
              <option value="">Select a role</option>
              <option value="faculty">Faculty</option>
              <option value="coordinator">Coordinator</option>
              <option value="hod">HOD</option>
            </select>
          </div>
          {error && (
            <div style={{ color: 'red', marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ color: 'green', marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>
              {success}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacultyRegister; 