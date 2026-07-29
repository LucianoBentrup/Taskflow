import { Router } from 'express';
import {
  changePassword,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from '@/controllers/user.controller';
import { requireAuth } from '@/middlewares/auth.middleware';

export const userRouter = Router();

// Todas as rotas exigem autenticação. A checagem de "só edita/deleta a si
// mesmo" acontece no service (userService), com base em req.user.id.
userRouter.get('/', requireAuth, listUsers);
userRouter.get('/:id', requireAuth, getUser);
userRouter.patch('/:id', requireAuth, updateUser);
userRouter.patch('/:id/password', requireAuth, changePassword);
userRouter.delete('/:id', requireAuth, deleteUser);
