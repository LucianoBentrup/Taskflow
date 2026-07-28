import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { AppError } from '@/errors/app-error';
import type { AccessTokenPayload, RefreshTokenPayload } from '@/dtos/auth.dto';

function requireSecret(secret: string | undefined, name: string): string {
  if (!secret) {
    throw new Error(`${name} não está configurado no .env`);
  }
  return secret;
}

export const tokenService = {
  signAccessToken(userId: string): string {
    const secret = requireSecret(env.jwtSecret, 'JWT_SECRET');
    const payload: AccessTokenPayload = { sub: userId };
    return jwt.sign(payload, secret, {
      expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'],
    });
  },

  signRefreshToken(userId: string): string {
    const secret = requireSecret(env.jwtRefreshSecret, 'JWT_REFRESH_SECRET');
    const payload: RefreshTokenPayload = { sub: userId };
    return jwt.sign(payload, secret, {
      expiresIn: env.jwtRefreshExpiresIn as jwt.SignOptions['expiresIn'],
    });
  },

  verifyAccessToken(token: string): AccessTokenPayload {
    const secret = requireSecret(env.jwtSecret, 'JWT_SECRET');
    try {
      return jwt.verify(token, secret) as AccessTokenPayload;
    } catch {
      throw new AppError('Access token inválido ou expirado', 401);
    }
  },

  verifyRefreshToken(token: string): RefreshTokenPayload {
    const secret = requireSecret(env.jwtRefreshSecret, 'JWT_REFRESH_SECRET');
    try {
      return jwt.verify(token, secret) as RefreshTokenPayload;
    } catch {
      throw new AppError('Refresh token inválido ou expirado', 401);
    }
  },
};
