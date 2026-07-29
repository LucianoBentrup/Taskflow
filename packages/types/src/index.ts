// Tipos compartilhados entre apps/web e apps/api.
// Serão adicionados conforme as entidades forem criadas (Sprint 1+).

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

// Formato de usuário exposto pela API (nunca inclui `password`).
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

// Paginação
export type PaginationMeta = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// Projeto
export type ProjectDTO = {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedProjects = {
  data: ProjectDTO[];
  meta: PaginationMeta;
};

// Tarefa
export type TaskDTO = {
  id: string;
  title: string;
  description: string | null;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string | null;
  projectId: string;
  categoryId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PaginatedTasks = {
  data: TaskDTO[];
  meta: PaginationMeta;
};
