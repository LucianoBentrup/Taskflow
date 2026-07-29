import type { PaginatedTasks, TaskDTO } from '@taskflow/types';
import { api } from '@/services/api';
import type {
  CreateTaskFormValues,
  UpdateTaskFormValues,
} from '@/features/tasks/schemas/task.schemas';

// Requests do CRUD de tarefas. Espelha os endpoints de
// apps/api/src/routes/task.routes.ts.

export function listTasksRequest(
  projectId: string,
  page: number,
  pageSize: number,
  status?: string,
  priority?: string,
  search?: string,
) {
  return api
    .get<PaginatedTasks>('/tasks', {
      params: { projectId, page, pageSize, status, priority, search },
    })
    .then((res) => res.data);
}

export function getTaskRequest(id: string) {
  return api.get<{ task: TaskDTO }>(`/tasks/${id}`).then((res) => res.data.task);
}

export function createTaskRequest(input: CreateTaskFormValues & { projectId: string }) {
  return api.post<{ task: TaskDTO }>('/tasks', input).then((res) => res.data.task);
}

export function updateTaskRequest(id: string, input: UpdateTaskFormValues) {
  return api.patch<{ task: TaskDTO }>(`/tasks/${id}`, input).then((res) => res.data.task);
}

export function deleteTaskRequest(id: string) {
  return api.delete(`/tasks/${id}`);
}
