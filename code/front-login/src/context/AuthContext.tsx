'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginData, RegisterData, AuthContextType } from '@/types';
import { apiService } from '@/services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));

        // Vérifier si le token est toujours valide
        try {
          const currentUser = await apiService.getCurrentUser();
          setUser(currentUser);
        } catch (err) {
          // Token invalide, nettoyer le localStorage
          clearAuth();
        }
      }
    } catch (err) {
      console.error('Erreur lors de l\'initialisation de l\'auth:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const login = async (credentials: LoginData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.login(credentials);

      setUser(response.user);
      setToken(response.token);

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de connexion';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.register(userData);

      setUser(response.user);
      setToken(response.token);

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de l\'inscription';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    setError(null);
  };

  return (
      <AuthContext.Provider value={{
        user,
        token,
        login,
        register,
        logout,
        isLoading,
        error
      }}>
        {children}
      </AuthContext.Provider>
  );
};
