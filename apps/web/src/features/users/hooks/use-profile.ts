'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import {
  changePasswordRequest,
  getUserRequest,
  updateUserRequest,
} from '@/features/users/api/user-requests';
import type {
  ChangePasswordFormValues,
  UpdateProfileFormValues,
} from '@/features/users/schemas/user.schemas';

// Hooks TanStack Query do CRUD de usuários — padrão a ser replicado nos
// hooks de Projetos (Sprint 4) e Tarefas (Sprint 5).

const PROFILE_QUERY_KEY = ['profile'];

export function useProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => getUserRequest(user!.id),
    enabled: !!user,
  });
}

export function useUpdateProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateProfileFormValues) => updateUserRequest(user!.id, input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
}

export function useChangePassword() {
  const { user } = useAuth();

  return useMutation({
    mutationFn: (input: ChangePasswordFormValues) =>
      changePasswordRequest(user!.id, {
        currentPassword: input.currentPassword,
        newPassword: input.newPassword,
      }),
  });
}
