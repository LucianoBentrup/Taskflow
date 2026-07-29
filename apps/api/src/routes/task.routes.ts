import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask,
} from '@/controllers/task.controller';
import { requireAuth } from '@/middlewares/auth.middleware';

export const taskRouter = Router();

// Todas as rotas exigem autenticação. A checagem de "só edita/deleta/lê
// tarefas de projetos que ele criou" acontece no service (taskService),
// com base em req.user.id e ownerId do projeto pai da tarefa.
taskRouter.get('/', requireAuth, listTasks);
taskRouter.get('/:id', requireAuth, getTask);
taskRouter.post('/', requireAuth, createTask);
taskRouter.patch('/:id', requireAuth, updateTask);
taskRouter.delete('/:id', requireAuth, deleteTask);
