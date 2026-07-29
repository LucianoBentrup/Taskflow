'use client';

import { useProjects } from '@/features/projects/hooks/use-projects';

type DashboardFilterProps = {
  selectedProjectId: string | null;
  onProjectChange: (projectId: string | null) => void;
};

export function DashboardFilter({ selectedProjectId, onProjectChange }: DashboardFilterProps) {
  const { data: projectsData, isLoading } = useProjects(1, 100);

  const projects = projectsData?.data || [];

  return (
    <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="flex items-center gap-2">
        <label htmlFor="project-filter" className="text-sm font-medium text-muted-foreground">
          Filtrar por projeto:
        </label>
        <select
          id="project-filter"
          value={selectedProjectId || ''}
          onChange={(e) => onProjectChange(e.target.value || null)}
          disabled={isLoading}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todos os projetos</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
