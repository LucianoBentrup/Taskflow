'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { AuthUser } from '@taskflow/types';
import { setAccessToken } from '@/lib/auth-token-store';
import {
  loginRequest,
  logoutRequest,
  meRequest,
  refreshRequest,
  registerRequest,
} from '@/features/auth/api/auth-requests';
import type { LoginFormValues, RegisterFormValues } from '@/features/auth/schemas/auth.schemas';

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (input: LoginFormValues) => Promise<void>;
  register: (input: RegisterFormValues) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const { accessToken } = await refreshRequest();
        setAccessToken(accessToken);
        const { user: currentUser } = await meRequest();
        setUser(currentUser);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    void restoreSession();
  }, []);

  async function login(input: LoginFormValues) {
    const { accessToken, user: loggedUser } = await loginRequest(input);
    setAccessToken(accessToken);
    setUser(loggedUser);
  }

  async function register(input: RegisterFormValues) {
    const { accessToken, user: createdUser } = await registerRequest(input);
    setAccessToken(accessToken);
    setUser(createdUser);
  }

  async function logout() {
    await logoutRequest();
    setAccessToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: user !== null, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
}
