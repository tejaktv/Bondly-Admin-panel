import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';

interface AuthContextType {
  admin: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockAdmin: AdminUser = {
  id: '1',
  userId: 'admin-1',
  role: 'super_admin',
  email: 'admin@bondly.com',
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString()
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('bondly_admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === 'admin@bondly.com' && password === 'admin123') {
      const updatedAdmin = { ...mockAdmin, lastLogin: new Date().toISOString() };
      setAdmin(updatedAdmin);
      localStorage.setItem('bondly_admin', JSON.stringify(updatedAdmin));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('bondly_admin');
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
