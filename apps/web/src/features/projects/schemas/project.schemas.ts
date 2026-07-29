import { z } from 'zod';

// Schemas espelhando os validators do backend
// (apps/api/src/validators/project.validator.ts).

export const createProjectFormSchema = z.object({
  name: z.string().trim().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
  description: z.string().trim().max(500).optional(),
});

export const updateProjectFormSchema = z.object({
  name: z.string().trim().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100).optional(),
  description: z.string().trim().max(500).optional(),
});

export const listProjectsQuerySchema = z.object({
  page: z.number().int().min(1).optional().default(1),
  pageSize: z.number().int().min(1).max(50).optional().default(10),
  search: z.string().optional(),
});

export type CreateProjectFormValues = z.infer<typeof createProjectFormSchema>;
export type UpdateProjectFormValues = z.infer<typeof updateProjectFormSchema>;
export type ListProjectsQueryValues = z.infer<typeof listProjectsQuerySchema>;
