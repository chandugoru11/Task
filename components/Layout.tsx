
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (!user) return <div className="min-h-screen bg-slate-50">{children}</div>;

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ to, icon, label }: { to: string; icon: string; label: string }) => (
    <Link
      to={to}
      onClick={() => setSidebarOpen(false)}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
        isActive(to)
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
          : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'
      }`}
    >
      <i className={`fas ${icon} w-5 text-center`}></i>
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-md">
                <i className="fas fa-shield-halved text-white"></i>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">AuthMaster</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-2 py-4">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Main Navigation</p>
            <NavItem to="/" icon="fa-home" label="Dashboard" />
            {user.role === UserRole.ADMIN && (
              <>
                <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2">Administration</p>
                <NavItem to="/admin" icon="fa-user-shield" label="User Management" />
              </>
            )}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                <i className="fas fa-user-circle text-xl"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{user.username}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{user.role}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-500 transition-colors p-2"
              >
                <i className="fas fa-power-off"></i>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-500 hover:text-indigo-600 lg:hidden"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="ml-4 lg:ml-0 flex items-center text-sm text-slate-400">
              <span className="hover:text-slate-600 cursor-pointer">App</span>
              <i className="fas fa-chevron-right text-[10px] mx-2"></i>
              <span className="font-medium text-slate-800">
                {isActive('/') ? 'Dashboard' : 'User Management'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs"></i>
              <input 
                type="text" 
                placeholder="Quick search..."
                className="bg-slate-50 border-none rounded-lg py-1.5 pl-9 pr-4 text-xs focus:ring-2 focus:ring-indigo-100 outline-none w-48 transition-all"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-indigo-600 relative">
              <i className="fas fa-bell"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
