import type { NextFunction, Request, Response } from 'express';
import { AppError } from '@/errors/app-error';
import { tokenService } from '@/services/token.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('Não autenticado', 401);
  }

  const token = authHeader.slice('Bearer '.length);
  const payload = tokenService.verifyAccessToken(token);

  req.user = { id: payload.sub };
  next();
}
