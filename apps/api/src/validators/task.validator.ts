import { z } from 'zod';

// Validators: apenas formato/shape dos dados de entrada (Zod). Regras de
// negócio (ex.: projeto existe, tarefa existe) ficam no service.

export const listTasksQuerySchema = z.object({
  projectId: z.string().min(1, 'projectId é obrigatório'),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  search: z.string().trim().min(1).optional(),
});

export const taskIdParamSchema = z.object({
  id: z.string().min(1, 'Id inválido'),
});

export const createTaskSchema = z.object({
  title: z.string().trim().min(2, 'Título deve ter no mínimo 2 caracteres').max(200),
  description: z.string().trim().max(2000).optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).default('TODO'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  dueDate: z.string().datetime().optional(),
  projectId: z.string().min(1, 'projectId é obrigatório'),
  categoryId: z.string().min(1).optional().nullable(),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(2, 'Título deve ter no mínimo 2 caracteres').max(200).optional(),
    description: z.string().trim().max(2000).optional(),
    status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    dueDate: z.string().datetime().optional().nullable(),
    categoryId: z.string().min(1).optional().nullable(),
  })
  .refine(
    (data) =>
      data.title !== undefined ||
      data.description !== undefined ||
      data.status !== undefined ||
      data.priority !== undefined ||
      data.dueDate !== undefined ||
      data.categoryId !== undefined,
    {
      message: 'Informe ao menos um campo para atualizar',
    },
  );

export type ListTasksQuery = z.infer<typeof listTasksQuerySchema>;
export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
