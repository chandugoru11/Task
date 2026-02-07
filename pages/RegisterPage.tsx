
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockApi } from '../services/mockApi';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await mockApi.register(username, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const Confetti = () => {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              borderRadius: Math.random() > 0.5 ? '50%' : '0'
            }}
          />
        ))}
      </div>
    );
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Confetti />
        <div className="bg-white p-12 rounded-[2rem] shadow-2xl w-full max-w-md text-center border border-slate-100 animate-successScale relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
          <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <i className="fas fa-check text-emerald-600 text-5xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">Welcome to the Club!</h1>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Your identity has been secured. We're preparing your personal gateway...
          </p>
          <div className="space-y-4">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full animate-[progress_2.5s_linear]"></div>
            </div>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Finalizing encryption</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fadeIn relative">
       {/* Background Decoration */}
       <div className="absolute top-1/4 -left-10 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
       <div className="absolute bottom-1/4 -right-10 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>

      <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-xl w-full max-w-md border border-white relative z-10">
        <div className="text-center mb-8">
          <div className="bg-slate-900 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-id-card text-white"></i>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
          <p className="text-slate-500 text-sm mt-1">Join AuthMaster and secure your identity</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl mb-6 flex items-start border border-red-100 animate-shake">
            <i className="fas fa-exclamation-circle mt-0.5 mr-3 shrink-0"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
              placeholder="e.g. cyber_ninja"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1" htmlFor="password">
              Security Phrase
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1" htmlFor="confirm-password">
              Verify Phrase
            </label>
            <input
              id="confirm-password"
              type="password"
              required
              className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-lg mt-4 active:scale-[0.98] ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Initializing...' : 'Finalize Registration'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm">
            Part of the system already?{' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
