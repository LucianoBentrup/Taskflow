import type { Request, Response } from 'express';
import { projectService } from '@/services/project.service';
import {
  createProjectSchema,
  listProjectsQuerySchema,
  projectIdParamSchema,
  updateProjectSchema,
} from '@/validators/project.validator';

// Controller: apenas parseia request (query/body/params) via Zod, chama o
// service e devolve a resposta HTTP. Nenhuma regra de negócio aqui.

export async function listProjects(req: Request, res: Response) {
  const query = listProjectsQuerySchema.parse(req.query);
  const result = await projectService.list({
    ...query,
    ownerId: req.user!.id,
  });
  res.status(200).json(result);
}

export async function getProject(req: Request, res: Response) {
  const { id } = projectIdParamSchema.parse(req.params);
  const project = await projectService.getById(id, req.user!.id);
  res.status(200).json({ project });
}

export async function createProject(req: Request, res: Response) {
  const input = createProjectSchema.parse(req.body);
  const project = await projectService.create(input, req.user!.id);
  res.status(201).json({ project });
}

export async function updateProject(req: Request, res: Response) {
  const { id } = projectIdParamSchema.parse(req.params);
  const input = updateProjectSchema.parse(req.body);
  const project = await projectService.update(id, req.user!.id, input);
  res.status(200).json({ project });
}

export async function deleteProject(req: Request, res: Response) {
  const { id } = projectIdParamSchema.parse(req.params);
  await projectService.delete(id, req.user!.id);
  res.status(204).send();
}
