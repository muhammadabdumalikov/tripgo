'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
  getAccessToken: () => string | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setIsAuthenticated(false);
        return;
      }

      // Verify token validity
      const isValid = await verifyToken(accessToken);
      
      if (!isValid) {
        // Try to refresh the token
        const newToken = await refreshAccessToken();
        setIsAuthenticated(!!newToken);
      } else {
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      // You can implement token verification logic here
      // For now, we'll just check if it exists
      return !!token;
    } catch {
      return false;
    }
  };

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        // Try to call logout API
        await api.post('/auth/admin/logout', null, false);
      }
    } catch {
      // Ignore API errors during logout
    } finally {
      // Always clear local storage and state
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
      router.push('/login');
    }
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token');
      }

      const { data } = await api.post<{ accessToken: string }>('/auth/admin/refresh', { refreshToken }, true);

      if (!data?.accessToken) {
        throw new Error('Token refresh failed');
      }

      localStorage.setItem('accessToken', data.accessToken);
      return data.accessToken;
    } catch {
      await logout();
      return null;
    }
  };

  const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshAccessToken,
        getAccessToken,
      }}
    >
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