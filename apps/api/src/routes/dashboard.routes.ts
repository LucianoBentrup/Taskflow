import { Router } from 'express';
import { getSummary } from '@/controllers/dashboard.controller';
import { requireAuth } from '@/middlewares/auth.middleware';

export const dashboardRouter = Router();

// Protegida por auth: os KPIs são sempre calculados com base no usuário
// autenticado (req.user.id).
dashboardRouter.get('/summary', requireAuth, getSummary);
