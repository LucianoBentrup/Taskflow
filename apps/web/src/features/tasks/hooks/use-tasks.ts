'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  listTasksRequest,
  updateTaskRequest,
} from '@/features/tasks/api/task-requests';
import type {
  CreateTaskFormValues,
  UpdateTaskFormValues,
} from '@/features/tasks/schemas/task.schemas';

// Hooks TanStack Query do CRUD de tarefas — padrão idêntico ao usado
// em features/projects (Sprint 4).

const TASKS_QUERY_KEY = ['tasks'];

export function useTasks(
  projectId: string,
  page: number = 1,
  pageSize: number = 10,
  status?: string,
  priority?: string,
  search?: string,
) {
  const { user } = useAuth();

  return useQuery({
    queryKey: [...TASKS_QUERY_KEY, { projectId, page, pageSize, status, priority, search }],
    queryFn: () => listTasksRequest(projectId, page, pageSize, status, priority, search),
    enabled: !!user && !!projectId,
  });
}

export function useTask(taskId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: [...TASKS_QUERY_KEY, taskId],
    queryFn: () => getTaskRequest(taskId),
    enabled: !!user && !!taskId,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTaskFormValues & { projectId: string }) => createTaskRequest(input),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: [...TASKS_QUERY_KEY, { projectId: variables.projectId }],
      });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTaskFormValues }) =>
      updateTaskRequest(id, input),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: [...TASKS_QUERY_KEY, variables.id],
      });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTaskRequest(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY });
    },
  });
}
