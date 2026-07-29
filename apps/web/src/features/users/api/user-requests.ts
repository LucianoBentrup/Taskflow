import type { UserProfile } from '@taskflow/types';
import { api } from '@/services/api';
import type { UpdateProfileFormValues } from '@/features/users/schemas/user.schemas';

// Requests do CRUD de usuários. Espelha os endpoints de
// apps/api/src/routes/user.routes.ts.

export function getUserRequest(id: string) {
  return api.get<{ user: UserProfile }>(`/users/${id}`).then((res) => res.data.user);
}

export function updateUserRequest(id: string, input: UpdateProfileFormValues) {
  return api.patch<{ user: UserProfile }>(`/users/${id}`, input).then((res) => res.data.user);
}

export function changePasswordRequest(
  id: string,
  input: { currentPassword: string; newPassword: string },
) {
  return api.patch(`/users/${id}/password`, input);
}
