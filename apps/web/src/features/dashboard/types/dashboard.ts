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
