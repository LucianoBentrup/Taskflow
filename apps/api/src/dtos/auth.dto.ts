import type { AuthUser } from '@taskflow/types';

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthResult = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type RefreshResult = {
  accessToken: string;
  refreshToken: string;
};

export type AccessTokenPayload = {
  sub: string;
};

export type RefreshTokenPayload = {
  sub: string;
};
