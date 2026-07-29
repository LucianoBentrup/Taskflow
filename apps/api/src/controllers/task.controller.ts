import type { Request, Response } from 'express';
import { taskService } from '@/services/task.service';
import {
  createTaskSchema,
  listTasksQuerySchema,
  taskIdParamSchema,
  updateTaskSchema,
} from '@/validators/task.validator';

// Controller: apenas parseia request (query/body/params) via Zod, chama o
// service e devolve a resposta HTTP. Nenhuma regra de negócio aqui.

export async function listTasks(req: Request, res: Response) {
  const query = listTasksQuerySchema.parse(req.query);
  const result = await taskService.list({
    ...query,
    userId: req.user!.id,
  });
  res.status(200).json(result);
}

export async function getTask(req: Request, res: Response) {
  const { id } = taskIdParamSchema.parse(req.params);
  const task = await taskService.getById(id, req.user!.id);
  res.status(200).json({ task });
}

export async function createTask(req: Request, res: Response) {
  const input = createTaskSchema.parse(req.body);
  const task = await taskService.create(input, req.user!.id);
  res.status(201).json({ task });
}

export async function updateTask(req: Request, res: Response) {
  const { id } = taskIdParamSchema.parse(req.params);
  const input = updateTaskSchema.parse(req.body);
  const task = await taskService.update(id, req.user!.id, input);
  res.status(200).json({ task });
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = taskIdParamSchema.parse(req.params);
  await taskService.delete(id, req.user!.id);
  res.status(204).send();
}
