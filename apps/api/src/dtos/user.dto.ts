import type { UserProfile } from '@taskflow/types';

// DTOs: formatos de entrada/saída do service. `UserDTO` nunca inclui
// `password` — é o único formato que sai da API para o cliente.

export type UserDTO = UserProfile;

export type UpdateUserInput = {
  name?: string;
  email?: string;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

export type PaginationMeta = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type PaginatedUsers = {
  data: UserDTO[];
  meta: PaginationMeta;
};

export type ListUsersInput = {
  page: number;
  pageSize: number;
  search?: string;
};
