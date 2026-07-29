import type { Request, Response } from 'express';
import { userService } from '@/services/user.service';
import {
  changePasswordSchema,
  listUsersQuerySchema,
  updateUserSchema,
  userIdParamSchema,
} from '@/validators/user.validator';

// Controller: apenas parseia request (query/body/params) via Zod, chama o
// service e devolve a resposta HTTP. Nenhuma regra de negócio aqui.

export async function listUsers(req: Request, res: Response) {
  const query = listUsersQuerySchema.parse(req.query);
  const result = await userService.list(query);
  res.status(200).json(result);
}

export async function getUser(req: Request, res: Response) {
  const { id } = userIdParamSchema.parse(req.params);
  const user = await userService.getById(id);
  res.status(200).json({ user });
}

export async function updateUser(req: Request, res: Response) {
  const { id } = userIdParamSchema.parse(req.params);
  const input = updateUserSchema.parse(req.body);
  const user = await userService.update(id, req.user!.id, input);
  res.status(200).json({ user });
}

export async function changePassword(req: Request, res: Response) {
  const { id } = userIdParamSchema.parse(req.params);
  const input = changePasswordSchema.parse(req.body);
  await userService.changePassword(id, req.user!.id, input);
  res.status(204).send();
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = userIdParamSchema.parse(req.params);
  await userService.delete(id, req.user!.id);
  res.status(204).send();
}
