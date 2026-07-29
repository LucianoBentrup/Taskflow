import { z } from 'zod';

// Schemas espelhando os validators do backend
// (apps/api/src/validators/task.validator.ts).

export const createTaskFormSchema = z.object({
  title: z.string().trim().min(2, 'Título deve ter no mínimo 2 caracteres').max(200),
  description: z.string().trim().max(2000).optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  dueDate: z.string().datetime().optional(),
  categoryId: z.string().min(1).optional().nullable(),
});

export const updateTaskFormSchema = z.object({
  title: z.string().trim().min(2, 'Título deve ter no mínimo 2 caracteres').max(200).optional(),
  description: z.string().trim().max(2000).optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  dueDate: z.string().datetime().optional().nullable(),
  categoryId: z.string().min(1).optional().nullable(),
});

export const listTasksQuerySchema = z.object({
  projectId: z.string().min(1),
  page: z.number().int().min(1).optional().default(1),
  pageSize: z.number().int().min(1).max(50).optional().default(10),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  search: z.string().optional(),
});

export type CreateTaskFormValues = z.infer<typeof createTaskFormSchema>;
export type UpdateTaskFormValues = z.infer<typeof updateTaskFormSchema>;
export type ListTasksQueryValues = z.infer<typeof listTasksQuerySchema>;
