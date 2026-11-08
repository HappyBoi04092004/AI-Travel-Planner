'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';

interface User {
  id: number;
  email: string;
  username: string;
  role?: string;
  is_verified?: boolean;
  profile_picture?: string;
  has_password?: boolean;
  trip_count: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  googleAuth: (googleToken: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = user?.role === 'admin';

  const setAuthState = (access_token: string, userData: User) => {
    localStorage.setItem('auth_token', access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(access_token);
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  };

  // Load token and user from localStorage on mount & setup 401 interceptor
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsed);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

        // Verify session validity with backend
        axios.get(API_ENDPOINTS.profile, {
          headers: { Authorization: `Bearer ${storedToken}` }
        }).then(res => {
          if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user));
          }
        }).catch(err => {
          if (err.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
            delete axios.defaults.headers.common['Authorization'];
          }
        });
      } catch {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    }

    // Intercept 401 to handle session expiry gracefully
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && !error.config?.url?.includes('/login')) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
          delete axios.defaults.headers.common['Authorization'];
        }
        return Promise.reject(error);
      }
    );

    setIsLoading(false);

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(API_ENDPOINTS.login, {
        email,
        password
      });

      const { access_token, user: userData } = response.data;
      setAuthState(access_token, userData);
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const signup = async (email: string, username: string, password: string) => {
    try {
      const response = await axios.post(API_ENDPOINTS.signup, {
        email,
        username,
        password
      });

      const { access_token, user: userData } = response.data;
      setAuthState(access_token, userData);
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.response?.data?.error || 'Signup failed');
    }
  };

  const googleAuth = async (googleToken: string) => {
    try {
      const response = await axios.post(API_ENDPOINTS.googleAuth, {
        token: googleToken
      });

      const { access_token, user: userData } = response.data;
      setAuthState(access_token, userData);
    } catch (error: any) {
      console.error('Google auth error:', error);
      throw new Error(error.response?.data?.error || 'Google authentication failed');
    }
  };

  const logout = () => {
    // Clear localStorage and sessionStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('tripData');

    // Clear state
    setToken(null);
    setUser(null);

    // Remove axios default header
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, login, signup, googleAuth, logout, updateUser, isLoading }}>
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
