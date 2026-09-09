import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { loginAdmin } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { Lock } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [shake, setShake] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await loginAdmin(username, password);
      const token = response.data?.access_token;
      if (token) {
        login(token);
        navigate('/admin/dashboard');
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password');
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4">
      <div 
        className={`w-full max-w-md bg-dark-surface-2 border border-dark-border rounded-xl p-8 shadow-xl ${shake ? 'animate-shake' : ''}`}
      >
        <div className="flex justify-center mb-6">
          <div className="bg-dark-surface p-3 rounded-full border border-dark-border text-accent">
            <Lock size={28} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-text-1 mb-8">Admin Login</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-text-2 text-sm font-medium mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-dark-surface-2 border border-dark-border rounded-lg px-4 py-3 text-text-1 placeholder-text-2/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-text-2 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-surface-2 border border-dark-border rounded-lg px-4 py-3 text-text-1 placeholder-text-2/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-lg transition-colors mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
