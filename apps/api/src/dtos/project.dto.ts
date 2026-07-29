// DTOs: formatos de entrada/saída do service.

export type ProjectDTO = {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectInput = {
  name: string;
  description?: string;
};

export type UpdateProjectInput = {
  name?: string;
  description?: string;
};

export type PaginationMeta = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type PaginatedProjects = {
  data: ProjectDTO[];
  meta: PaginationMeta;
};

export type ListProjectsInput = {
  page: number;
  pageSize: number;
  search?: string;
  ownerId: string;
};
