import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RoleSelect = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    if (role === 'coordinator') {
      localStorage.setItem('userRole', 'Coordinator');
      navigate('/login');
      setRole('');
    } else if (role === 'hod') {
      localStorage.setItem('userRole', 'HOD');
      navigate('/hod/login');
      setRole('');
    } else if (role === 'faculty') {
      localStorage.setItem('userRole', 'Faculty');
      navigate('/faculty/login');
      setRole('');
    }
  }, [role, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 transition-all duration-500">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 flex flex-col items-center animate-fade-in-up">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-8 tracking-tight text-center drop-shadow">Select Role</h1>
            <select
              className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 px-2 bg-transparent transition-all duration-200"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="">Select a role</option>
              <option value="coordinator">Coordinator</option>
              <option value="faculty">Faculty</option>
              <option value="hod">HOD</option>
            </select>
          </div>
      <Link
        to="/about"
        className="text-blue-700 font-semibold underline hover:text-purple-700 transition-all duration-200 text-base tracking-wide hover:scale-110 mt-8"
        style={{ textAlign: 'center' }}
        >
          About Us
      </Link>
    </div>
  );
};

export default RoleSelect;