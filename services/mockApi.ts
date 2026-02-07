
import { User, UserRole, AuthSession } from '../types';

const STORAGE_KEY = 'auth_master_db';
const SESSION_KEY = 'auth_master_session';

// Initialize default admin if DB is empty
const initializeDb = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const defaultUsers: User[] = [
      {
        id: '1',
        username: 'admin',
        password: 'admin123', // In a real app, this would be hashed
        role: UserRole.ADMIN,
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
  }
};

initializeDb();

const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const mockApi = {
  // Authentication
  register: async (username: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        if (users.find(u => u.username === username)) {
          return reject({ message: 'Username already exists' });
        }
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          username,
          password,
          role: UserRole.USER,
          isActive: true,
          createdAt: new Date().toISOString()
        };
        saveUsers([...users, newUser]);
        resolve(newUser);
      }, 500);
    });
  },

  login: async (username: string, password: string): Promise<AuthSession> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        
        if (!user) {
          return reject({ message: 'Invalid username or password' });
        }
        if (!user.isActive) {
          return reject({ message: 'Your account is inactive. Please contact an admin.' });
        }

        const session: AuthSession = {
          user: { ...user },
          token: `mock-token-${user.id}-${Date.now()}`
        };
        delete session.user.password;
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        resolve(session);
      }, 500);
    });
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getSession: (): AuthSession | null => {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Admin Actions
  getAllUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getUsers().map(u => {
            const { password, ...rest } = u;
            return rest as User;
        });
        resolve(users);
      }, 400);
    });
  },

  deleteUser: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const session = mockApi.getSession();
        if (session?.user.id === id) {
          return reject({ message: "You can't delete yourself" });
        }
        saveUsers(users.filter(u => u.id !== id));
        resolve();
      }, 300);
    });
  },

  toggleUserStatus: async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = getUsers();
        const updated = users.map(u => 
          u.id === id ? { ...u, isActive: !u.isActive } : u
        );
        saveUsers(updated);
        resolve();
      }, 300);
    });
  }
};
