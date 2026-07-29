'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import {
  createProjectRequest,
  deleteProjectRequest,
  getProjectRequest,
  listProjectsRequest,
  updateProjectRequest,
} from '@/features/projects/api/project-requests';
import type {
  CreateProjectFormValues,
  UpdateProjectFormValues,
} from '@/features/projects/schemas/project.schemas';

// Hooks TanStack Query do CRUD de projetos — padrão idêntico ao usado
// em features/users (Sprint 3).

const PROJECTS_QUERY_KEY = ['projects'];

export function useProjects(page: number = 1, pageSize: number = 10, search?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, { page, pageSize, search }],
    queryFn: () => listProjectsRequest(page, pageSize, search),
    enabled: !!user,
  });
}

export function useProject(projectId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, projectId],
    queryFn: () => getProjectRequest(projectId),
    enabled: !!user && !!projectId,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateProjectFormValues) => createProjectRequest(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateProjectFormValues }) =>
      updateProjectRequest(id, input),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: [...PROJECTS_QUERY_KEY, variables.id],
      });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProjectRequest(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}
