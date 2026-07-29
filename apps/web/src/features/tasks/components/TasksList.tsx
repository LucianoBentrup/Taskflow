'use client';

import { useState } from 'react';
import type { TaskDTO } from '@taskflow/types';
import { TasksListSkeleton } from '@/components/ui/skeletons/TasksListSkeleton';

interface TasksListProps {
  tasks: TaskDTO[];
  isLoading?: boolean;
  onStatusChange?: (taskId: string, status: string) => void;
  onEdit?: (task: TaskDTO) => void;
  onDelete?: (taskId: string) => void;
  onFilterChange?: (filters: { status?: string; priority?: string; search?: string }) => void;
}

export function TasksList({
  tasks,
  isLoading,
  onStatusChange,
  onEdit,
  onDelete,
  onFilterChange,
}: TasksListProps) {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const priorityColors: Record<string, string> = {
    LOW: 'bg-blue-100 text-blue-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-red-100 text-red-800',
  };

  const priorityLabels: Record<string, string> = {
    LOW: 'Baixa',
    MEDIUM: 'Média',
    HIGH: 'Alta',
  };

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:focus:ring-offset-gray-900"
        />
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:focus:ring-offset-gray-900"
        >
          <option value="">Todos os status</option>
          <option value="TODO">A Fazer</option>
          <option value="IN_PROGRESS">Em Andamento</option>
          <option value="DONE">Concluído</option>
        </select>
        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:focus:ring-offset-gray-900"
        >
          <option value="">Todas as prioridades</option>
          <option value="LOW">Baixa</option>
          <option value="MEDIUM">Média</option>
          <option value="HIGH">Alta</option>
        </select>
      </div>

      {isLoading ? (
        <TasksListSkeleton />
      ) : tasks.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Nenhuma tarefa encontrada</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto rounded-lg border border-border md:block">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-accent">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Título</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Prioridade</th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">Vencimento</th>
                  <th className="px-4 py-3 text-right font-medium text-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-border hover:bg-accent/50">
                    <td className="max-w-xs truncate px-4 py-3 font-medium text-foreground">
                      {task.title}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={task.status}
                        onChange={(e) => onStatusChange?.(task.id, e.target.value)}
                        className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground"
                      >
                        <option value="TODO">A Fazer</option>
                        <option value="IN_PROGRESS">Em Andamento</option>
                        <option value="DONE">Concluído</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${priorityColors[task.priority] || 'bg-muted text-muted-foreground'}`}
                      >
                        {priorityLabels[task.priority]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td className="space-x-2 px-4 py-3 text-right">
                      <button
                        onClick={() => onEdit?.(task)}
                        className="rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete?.(task.id)}
                        className="rounded px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="space-y-2 rounded-lg border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-foreground">{task.title}</h4>
                  <span
                    className={`shrink-0 rounded px-2 py-1 text-xs font-medium ${priorityColors[task.priority] || 'bg-muted text-muted-foreground'}`}
                  >
                    {priorityLabels[task.priority]}
                  </span>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-muted-foreground">
                    {task.dueDate && (
                      <p>Vencimento: {new Date(task.dueDate).toLocaleDateString('pt-BR')}</p>
                    )}
                  </div>
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange?.(task.id, e.target.value)}
                    className="rounded border border-border bg-background px-2 py-1 text-xs text-foreground"
                  >
                    <option value="TODO">A Fazer</option>
                    <option value="IN_PROGRESS">Em Andamento</option>
                    <option value="DONE">Concluído</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => onEdit?.(task)}
                    className="flex-1 rounded px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete?.(task.id)}
                    className="flex-1 rounded px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
