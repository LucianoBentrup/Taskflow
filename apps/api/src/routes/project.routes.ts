import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  updateProject,
} from '@/controllers/project.controller';
import { requireAuth } from '@/middlewares/auth.middleware';

export const projectRouter = Router();

// Todas as rotas exigem autenticação. A checagem de "só edita/deleta
// seu próprio projeto" acontece no service (projectService), com base
// em req.user.id e ownerId do projeto.
projectRouter.get('/', requireAuth, listProjects);
projectRouter.get('/:id', requireAuth, getProject);
projectRouter.post('/', requireAuth, createProject);
projectRouter.patch('/:id', requireAuth, updateProject);
projectRouter.delete('/:id', requireAuth, deleteProject);
