// DTOs: formatos de saída do dashboard service.

export type TasksByStatus = {
  TODO: number;
  IN_PROGRESS: number;
  DONE: number;
};

export type DashboardSummary = {
  projectsCount: number;
  tasksCount: number;
  tasksByStatus: TasksByStatus;
};

export type ProjectWithTaskCount = {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  tasksCount: number;
};
