'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskFormSchema } from '@/features/tasks/schemas/task.schemas';
import type { CreateTaskFormValues } from '@/features/tasks/schemas/task.schemas';

interface CreateTaskFormProps {
  projectId?: string;
  onSubmit: (values: CreateTaskFormValues) => Promise<void>;
  isLoading?: boolean;
}

export function CreateTaskForm({ onSubmit, isLoading }: CreateTaskFormProps) {
  const form = useForm<CreateTaskFormValues>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: undefined,
      categoryId: null,
    },
  });

  const handleSubmit = async (values: CreateTaskFormValues) => {
    await onSubmit(values);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      {/* Título */}
      <div>
        <label className="block text-sm font-medium mb-1">Título *</label>
        <input
          type="text"
          placeholder="Título da tarefa"
          {...form.register('title')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {form.formState.errors.title && (
          <p className="text-red-600 text-xs mt-1">{form.formState.errors.title.message}</p>
        )}
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          placeholder="Descrição da tarefa (opcional)"
          {...form.register('description')}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {form.formState.errors.description && (
          <p className="text-red-600 text-xs mt-1">{form.formState.errors.description.message}</p>
        )}
      </div>

      {/* Status e Prioridade */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            {...form.register('status')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="TODO">A Fazer</option>
            <option value="IN_PROGRESS">Em Andamento</option>
            <option value="DONE">Concluído</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Prioridade</label>
          <select
            {...form.register('priority')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="LOW">Baixa</option>
            <option value="MEDIUM">Média</option>
            <option value="HIGH">Alta</option>
          </select>
        </div>
      </div>

      {/* Data de Vencimento */}
      <div>
        <label className="block text-sm font-medium mb-1">Data de Vencimento</label>
        <input
          type="datetime-local"
          {...form.register('dueDate')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-gray-500 text-xs mt-1">Opcional</p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Criando...' : 'Criar Tarefa'}
      </button>
    </form>
  );
}
