import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '@/errors/app-error';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Dados inválidos',
      issues: err.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
}
