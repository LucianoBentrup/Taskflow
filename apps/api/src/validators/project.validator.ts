import { z } from 'zod';

// Validators: apenas formato/shape dos dados de entrada (Zod). Regras de
// negócio (ex.: projeto já existe, autor inválido) ficam no service.

export const listProjectsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().trim().min(1).optional(),
});

export const projectIdParamSchema = z.object({
  id: z.string().min(1, 'Id inválido'),
});

export const createProjectSchema = z.object({
  name: z.string().trim().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
  description: z.string().trim().max(500).optional(),
});

export const updateProjectSchema = z
  .object({
    name: z.string().trim().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100).optional(),
    description: z.string().trim().max(500).optional(),
  })
  .refine((data) => data.name !== undefined || data.description !== undefined, {
    message: 'Informe ao menos um campo para atualizar',
  });

export type ListProjectsQuery = z.infer<typeof listProjectsQuerySchema>;
export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
