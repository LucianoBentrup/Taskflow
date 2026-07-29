import type { Request, Response } from 'express';
import { dashboardService } from '@/services/dashboard.service';

// Controller: apenas chama o service e devolve a resposta HTTP. Nenhuma
// regra de negócio aqui.

export async function getSummary(req: Request, res: Response) {
  const { projectId } = req.query;
  const summary = await dashboardService.getSummary(
    req.user!.id,
    projectId ? String(projectId) : undefined,
  );
  res.status(200).json(summary);
}
