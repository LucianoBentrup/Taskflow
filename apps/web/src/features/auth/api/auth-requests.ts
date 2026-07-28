import type { AuthUser } from '@taskflow/types';
import { api } from '@/services/api';
import type { LoginFormValues, RegisterFormValues } from '@/features/auth/schemas/auth.schemas';

type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

export function registerRequest(input: RegisterFormValues) {
  return api.post<AuthResponse>('/auth/register', input).then((res) => res.data);
}

export function loginRequest(input: LoginFormValues) {
  return api.post<AuthResponse>('/auth/login', input).then((res) => res.data);
}

export function refreshRequest() {
  return api.post<{ accessToken: string }>('/auth/refresh').then((res) => res.data);
}

export function logoutRequest() {
  return api.post('/auth/logout');
}

export function meRequest() {
  return api.get<{ user: AuthUser }>('/auth/me').then((res) => res.data);
}
