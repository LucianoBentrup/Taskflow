import type { PaginatedProjects, ProjectDTO } from '@taskflow/types';
import { api } from '@/services/api';
import type {
  CreateProjectFormValues,
  UpdateProjectFormValues,
} from '@/features/projects/schemas/project.schemas';

// Requests do CRUD de projetos. Espelha os endpoints de
// apps/api/src/routes/project.routes.ts.

export function listProjectsRequest(page: number, pageSize: number, search?: string) {
  return api
    .get<PaginatedProjects>('/projects', { params: { page, pageSize, search } })
    .then((res) => res.data);
}

export function getProjectRequest(id: string) {
  return api.get<{ project: ProjectDTO }>(`/projects/${id}`).then((res) => res.data.project);
}

export function createProjectRequest(input: CreateProjectFormValues) {
  return api.post<{ project: ProjectDTO }>('/projects', input).then((res) => res.data.project);
}

export function updateProjectRequest(id: string, input: UpdateProjectFormValues) {
  return api
    .patch<{ project: ProjectDTO }>(`/projects/${id}`, input)
    .then((res) => res.data.project);
}

export function deleteProjectRequest(id: string) {
  return api.delete(`/projects/${id}`);
}
