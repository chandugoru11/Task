
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User, UserRole } from '../types';
import { mockApi } from '../services/mockApi';

interface AdminPageProps {
  currentUser: User;
}

const AdminPage: React.FC<AdminPageProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await mockApi.getAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this user? This action cannot be undone.')) return;
    try {
      await mockApi.deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await mockApi.toggleUserStatus(id);
      setUsers(prev => prev.map(u => 
        u.id === id ? { ...u, isActive: !u.isActive } : u
      ));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const stats = useMemo(() => ({
    total: users.length,
    active: users.filter(u => u.isActive).length,
    admins: users.filter(u => u.role === UserRole.ADMIN).length
  }), [users]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Directory</h1>
          <p className="text-slate-500">Global user database and access control panel.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={fetchUsers}
            className="flex items-center space-x-2 px-4 py-2 text-indigo-600 bg-white border border-indigo-100 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm"
          >
            <i className="fas fa-sync-alt"></i>
            <span className="font-bold text-sm">Refresh List</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
            <i className="fas fa-plus"></i>
            <span className="font-bold text-sm">Add New User</span>
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Accounts', value: stats.total, icon: 'fa-users', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Active Sessions', value: stats.active, icon: 'fa-user-check', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Privileged Users', value: stats.admins, icon: 'fa-user-shield', color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center text-xl`}>
              <i className={`fas ${item.icon}`}></i>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{item.label}</p>
              <p className="text-2xl font-bold text-slate-800">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="Search by username or user ID..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
              <i className="fas fa-filter text-sm"></i>
            </button>
            <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
              <i className="fas fa-download text-sm"></i>
            </button>
          </div>
        </div>

        {error && (
          <div className="m-6 bg-red-50 text-red-600 p-4 rounded-2xl flex items-center border border-red-100 animate-shake">
            <i className="fas fa-exclamation-triangle mr-3"></i>
            <span className="font-medium">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Decrypting user directory...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identity</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Privileges</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Status</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registered Date</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                          user.role === UserRole.ADMIN ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600'
                        }`}>
                          <i className={`fas ${user.role === UserRole.ADMIN ? 'fa-crown text-xs' : 'fa-user text-xs'}`}></i>
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate">{user.username}</p>
                          <p className="text-[10px] text-slate-400 font-mono tracking-tighter">UID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        user.role === UserRole.ADMIN ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-2 ${user.isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`}></span>
                        <span className={`text-sm font-semibold ${user.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {user.isActive ? 'Active' : 'Locked'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm text-slate-600 font-medium">
                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleToggleStatus(user.id)}
                          className={`p-2.5 rounded-xl transition-all ${
                            user.isActive 
                              ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' 
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          }`}
                          title={user.isActive ? 'Deactivate' : 'Activate'}
                        >
                          <i className={`fas ${user.isActive ? 'fa-lock' : 'fa-lock-open'}`}></i>
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          disabled={user.id === currentUser.id}
                          className={`p-2.5 rounded-xl transition-all ${
                            user.id === currentUser.id 
                              ? 'bg-slate-50 text-slate-200 cursor-not-allowed' 
                              : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}
                          title="Erase"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredUsers.length === 0 && !loading && (
              <div className="text-center py-24 flex flex-col items-center justify-center space-y-4">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                  <i className="fas fa-search text-slate-200 text-3xl"></i>
                </div>
                <div className="max-w-xs mx-auto">
                  <h4 className="font-bold text-slate-800">No users found</h4>
                  <p className="text-slate-400 text-sm mt-1">We couldn't find any accounts matching "{searchTerm}"</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-6 text-indigo-600 font-bold text-sm hover:underline"
                  >
                    Clear Search Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
