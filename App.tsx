
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthSession, UserRole } from './types';
import { mockApi } from './services/mockApi';

// Layout and Pages
import Layout from './components/Layout';
import AuthGuard from './components/AuthGuard';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const savedSession = mockApi.getSession();
    if (savedSession) {
      setSession(savedSession);
    }
    setInitializing(false);
  }, []);

  const handleLoginSuccess = (newSession: AuthSession) => {
    setSession(newSession);
  };

  const handleLogout = () => {
    mockApi.logout();
    setSession(null);
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Layout user={session?.user || null} onLogout={handleLogout}>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={!session ? <LoginPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!session ? <RegisterPage /> : <Navigate to="/" />} 
          />

          {/* Protected User Routes */}
          <Route 
            path="/" 
            element={
              <AuthGuard user={session?.user || null}>
                {session ? <HomePage user={session.user} /> : <Navigate to="/login" />}
              </AuthGuard>
            } 
          />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <AuthGuard user={session?.user || null} requiredRole={UserRole.ADMIN}>
                {session ? <AdminPage currentUser={session.user} /> : <Navigate to="/login" />}
              </AuthGuard>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
