'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useCreateProject } from '@/features/projects/hooks/use-projects';
import {
  createProjectFormSchema,
  type CreateProjectFormValues,
} from '@/features/projects/schemas/project.schemas';

export function CreateProjectForm() {
  const createProject = useCreateProject();
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectFormSchema),
  });

  async function onSubmit(values: CreateProjectFormValues) {
    setFormError(null);
    setSuccessMessage(null);
    try {
      await createProject.mutateAsync(values);
      reset();
      setSuccessMessage('Projeto criado com sucesso');
    } catch {
      setFormError('Não foi possível criar o projeto.');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Nome *
        </label>
        <input
          id="name"
          type="text"
          className="rounded-md border px-3 py-2 text-sm"
          {...register('name')}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Descrição
        </label>
        <textarea
          id="description"
          className="rounded-md border px-3 py-2 text-sm"
          rows={3}
          {...register('description')}
        />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </div>

      {formError && <p className="text-sm text-red-600">{formError}</p>}
      {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isSubmitting ? 'Criando...' : 'Criar Projeto'}
      </button>
    </form>
  );
}
