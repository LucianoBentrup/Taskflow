import { z } from 'zod';

// Validators: apenas formato/shape dos dados de entrada (Zod). Regras de
// negócio (ex.: email já em uso, senha atual incorreta) ficam no service.

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().trim().min(1).optional(),
});

export const userIdParamSchema = z.object({
  id: z.string().min(1, 'Id inválido'),
});

export const updateUserSchema = z
  .object({
    name: z.string().trim().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100).optional(),
    email: z.string().trim().toLowerCase().email('Email inválido').optional(),
  })
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: 'Informe ao menos um campo para atualizar',
  });

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[a-z]/, 'Senha deve conter ao menos uma letra minúscula')
    .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula')
    .regex(/[0-9]/, 'Senha deve conter ao menos um número'),
});

export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
