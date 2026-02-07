
import React from 'react';
import { User } from '../types';

interface HomePageProps {
  user: User;
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const recentActivities = [
    { id: 1, type: 'login', message: 'Successful Auth via Desktop Client', time: '2 hours ago', icon: 'fa-shield-check', color: 'bg-emerald-50 text-emerald-600' },
    { id: 2, type: 'security', message: 'RSA Keys rotated successfully', time: '5 hours ago', icon: 'fa-sync', color: 'bg-indigo-50 text-indigo-600' },
    { id: 3, type: 'profile', message: 'Biometric profile sync completed', time: '1 day ago', icon: 'fa-fingerprint', color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Dynamic Welcome Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-[2.5rem] p-8 lg:p-12 text-white shadow-2xl shadow-indigo-100">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span>System Online</span>
              </div>
              <p className="text-indigo-100 font-medium mb-1">{currentDate}</p>
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
                Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 to-white">{user.username}</span>
              </h1>
              <p className="text-indigo-100/80 text-lg max-w-lg mb-8 leading-relaxed">
                Your secure workspace is ready. You have exactly <span className="text-white font-bold">14 pending audit tasks</span> for this week.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <button className="bg-white text-indigo-900 px-8 py-3.5 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Launch Workspace
              </button>
              <button className="bg-indigo-600/50 backdrop-blur-md text-white border border-indigo-400/30 px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-600/70 transition-all">
                System Logs
              </button>
            </div>
          </div>
          {/* Abstract SVG Background */}
          <svg className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="90" cy="10" r="30" fill="white" />
            <circle cx="10" cy="90" r="20" fill="white" />
          </svg>
        </div>

        {/* Security Health Ring */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg className="w-full h-full -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
              <circle 
                cx="80" 
                cy="80" 
                r="70" 
                stroke="currentColor" 
                strokeWidth="12" 
                fill="transparent" 
                strokeDasharray="440" 
                strokeDashoffset="44" 
                strokeLinecap="round" 
                className="text-indigo-600" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-800 tracking-tighter">92%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure</span>
            </div>
          </div>
          <h3 className="font-bold text-slate-800 text-lg">Trust Score</h3>
          <p className="text-sm text-slate-500 mt-2 px-4 leading-relaxed">Your account currently meets all high-security criteria.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Metrics Grid */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Role', val: user.role, icon: 'fa-user-tag', bg: 'bg-blue-50', color: 'text-blue-600' },
              { label: 'Session', val: 'Active', icon: 'fa-clock', bg: 'bg-emerald-50', color: 'text-emerald-600' },
              { label: 'Alerts', val: '0 New', icon: 'fa-bell-slash', bg: 'bg-rose-50', color: 'text-rose-600' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 text-sm`}>
                  <i className={`fas ${stat.icon}`}></i>
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-slate-800">{stat.val}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Connected Services</h3>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold uppercase">4 Live</span>
            </div>
            <div className="p-8 space-y-6">
              {['Vault Storage', 'Identity Bridge', 'Analytics Engine'].map((service, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                      <i className="fas fa-microchip text-slate-400 group-hover:text-indigo-600"></i>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{service}</p>
                      <p className="text-xs text-slate-400">Stable connection • Latency 12ms</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Timeline Activity */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="font-bold text-slate-800 text-lg mb-8 flex items-center">
              <i className="fas fa-history mr-3 text-indigo-500"></i>
              Audit Timeline
            </h3>
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 flex-1">
              {recentActivities.map((act) => (
                <div key={act.id} className="relative flex items-start space-x-6">
                  <div className={`w-10 h-10 rounded-full ${act.color} flex items-center justify-center shrink-0 border-4 border-white shadow-sm z-10`}>
                    <i className={`fas ${act.icon} text-xs`}></i>
                  </div>
                  <div className="min-w-0 pt-1">
                    <p className="text-sm font-bold text-slate-800 leading-tight mb-1">{act.message}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 rounded-2xl bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
              Full Archive Access
            </button>
          </div>
          {/* Subtle decoration */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full opacity-50 blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
