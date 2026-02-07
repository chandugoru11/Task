
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockApi } from '../services/mockApi';
import { AuthSession } from '../types';

interface LoginPageProps {
  onLoginSuccess: (session: AuthSession) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const session = await mockApi.login(username, password);
      onLoginSuccess(session);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fadeIn relative">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '3s' }}></div>

      <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white relative z-10">
        <div className="text-center mb-10">
          <div className="bg-indigo-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-200 transform -rotate-6">
            <i className="fas fa-lock text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Access Control</h1>
          <p className="text-slate-500 text-sm mt-2">Secure entry required to continue</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-4 rounded-2xl mb-8 flex items-start border border-red-100 animate-shake">
            <i className="fas fa-fingerprint mt-0.5 mr-3 shrink-0"></i>
            <span className="font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1" htmlFor="username">
              Identity Token
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                <i className="fas fa-at text-sm"></i>
              </span>
              <input
                id="username"
                type="text"
                required
                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1" htmlFor="password">
              Secret Passkey
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                <i className="fas fa-key text-sm"></i>
              </span>
              <input
                id="password"
                type="password"
                required
                className="w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-100 flex items-center justify-center space-x-2 transform active:scale-[0.98] ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <span>Authenticate</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm">
            Unauthorized?{' '}
            <Link to="/register" className="text-indigo-600 font-bold hover:text-indigo-700 px-1 underline decoration-2 underline-offset-4">
              Apply for Access
            </Link>
          </p>
          <div className="mt-6 p-4 bg-slate-50 rounded-2xl text-[10px] text-slate-400 font-medium leading-relaxed uppercase tracking-tight">
            <i className="fas fa-shield-alt mr-2"></i>
            This is a protected system. All interactions are monitored and recorded.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
