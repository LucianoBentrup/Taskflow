'use client';

import { useState } from 'react';
import type { TaskDTO } from '@taskflow/types';

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
      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos os status</option>
          <option value="TODO">A Fazer</option>
          <option value="IN_PROGRESS">Em Andamento</option>
          <option value="DONE">Concluído</option>
        </select>
        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas as prioridades</option>
          <option value="LOW">Baixa</option>
          <option value="MEDIUM">Média</option>
          <option value="HIGH">Alta</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Título</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Prioridade</th>
              <th className="px-4 py-3 text-left font-medium">Data de Vencimento</th>
              <th className="px-4 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center">
                  Carregando...
                </td>
              </tr>
            ) : tasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Nenhuma tarefa encontrada
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 max-w-xs truncate font-medium">{task.title}</td>
                  <td className="px-4 py-3">
                    <select
                      value={task.status}
                      onChange={(e) => onStatusChange?.(task.id, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-xs"
                    >
                      <option value="TODO">A Fazer</option>
                      <option value="IN_PROGRESS">Em Andamento</option>
                      <option value="DONE">Concluído</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority] || 'bg-gray-100'}`}
                    >
                      {priorityLabels[task.priority]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString('pt-BR') : '-'}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => onEdit?.(task)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete?.(task.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
