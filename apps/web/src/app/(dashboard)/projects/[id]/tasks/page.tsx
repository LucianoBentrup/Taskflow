'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useProject } from '@/features/projects/hooks/use-projects';
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from '@/features/tasks/hooks/use-tasks';
import { CreateTaskForm } from '@/features/tasks/components/CreateTaskForm';
import { TasksList } from '@/features/tasks/components/TasksList';
import type { CreateTaskFormValues } from '@/features/tasks/schemas/task.schemas';

export default function ProjectTasksPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: undefined as string | undefined,
    priority: undefined as string | undefined,
    search: undefined as string | undefined,
  });

  // Queries
  const { data: project, isLoading: projectLoading } = useProject(projectId);
  const { data: tasksData, isLoading: tasksLoading } = useTasks(
    projectId,
    page,
    10,
    filters.status,
    filters.priority,
    filters.search,
  );

  // Mutations
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const handleCreateTask = async (values: CreateTaskFormValues) => {
    await createTaskMutation.mutateAsync({
      ...values,
      projectId,
    });
  };

  const handleStatusChange = async (taskId: string, status: string) => {
    await updateTaskMutation.mutateAsync({
      id: taskId,
      input: { status: status as 'TODO' | 'IN_PROGRESS' | 'DONE' },
    });
  };

  const handleDeleteTask = async (taskId: string) => {
    if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
      await deleteTaskMutation.mutateAsync(taskId);
    }
  };

  if (projectLoading) {
    return <div className="container mx-auto py-8">Carregando projeto...</div>;
  }

  if (!project) {
    return <div className="container mx-auto py-8 text-red-600">Projeto não encontrado</div>;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{project.name}</h1>
        {project.description && <p className="text-muted-foreground mt-2">{project.description}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Nova Tarefa</h2>
            <CreateTaskForm
              projectId={projectId}
              onSubmit={handleCreateTask}
              isLoading={createTaskMutation.isPending}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Tarefas</h2>
            <TasksList
              tasks={tasksData?.data || []}
              isLoading={tasksLoading}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTask}
              onFilterChange={(newFilters) => {
                setFilters({
                  status: newFilters.status,
                  priority: newFilters.priority,
                  search: newFilters.search,
                });
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
