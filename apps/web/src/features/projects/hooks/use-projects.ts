'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
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
      toast.success('Projeto criado com sucesso!');
      void queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
    onError: () => {
      toast.error('Erro ao criar projeto. Tente novamente.');
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateProjectFormValues }) =>
      updateProjectRequest(id, input),
    onSuccess: (_, variables) => {
      toast.success('Projeto atualizado com sucesso!');
      void queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      void queryClient.invalidateQueries({
        queryKey: [...PROJECTS_QUERY_KEY, variables.id],
      });
    },
    onError: () => {
      toast.error('Erro ao atualizar projeto. Tente novamente.');
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProjectRequest(id),
    onSuccess: () => {
      toast.success('Projeto deletado com sucesso!');
      void queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
    onError: () => {
      toast.error('Erro ao deletar projeto. Tente novamente.');
    },
  });
}
