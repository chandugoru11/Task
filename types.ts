
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  username: string;
  password?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
}
