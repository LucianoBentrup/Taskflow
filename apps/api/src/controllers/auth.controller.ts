import type { CookieOptions, Request, Response } from 'express';
import { env } from '@/config/env';
import { authService } from '@/services/auth.service';
import { loginSchema, registerSchema } from '@/validators/auth.validator';

const REFRESH_TOKEN_COOKIE = 'refreshToken';

const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.isProduction,
  sameSite: 'lax',
  path: '/auth',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function setRefreshCookie(res: Response, refreshToken: string) {
  res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, refreshCookieOptions);
}

function clearRefreshCookie(res: Response) {
  res.clearCookie(REFRESH_TOKEN_COOKIE, { ...refreshCookieOptions, maxAge: undefined });
}

export async function register(req: Request, res: Response) {
  const input = registerSchema.parse(req.body);
  const { accessToken, refreshToken, user } = await authService.register(input);

  setRefreshCookie(res, refreshToken);
  res.status(201).json({ accessToken, user });
}

export async function login(req: Request, res: Response) {
  const input = loginSchema.parse(req.body);
  const { accessToken, refreshToken, user } = await authService.login(input);

  setRefreshCookie(res, refreshToken);
  res.status(200).json({ accessToken, user });
}

export async function refresh(req: Request, res: Response) {
  const currentRefreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE] as string | undefined;
  const { accessToken, refreshToken } = await authService.refresh(currentRefreshToken);

  setRefreshCookie(res, refreshToken);
  res.status(200).json({ accessToken });
}

export function logout(_req: Request, res: Response) {
  clearRefreshCookie(res);
  res.status(204).send();
}

export async function me(req: Request, res: Response) {
  const user = await authService.getAuthenticatedUser(req.user!.id);
  res.status(200).json({ user });
}
