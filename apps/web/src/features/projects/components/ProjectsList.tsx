'use client';

import { useState } from 'react';
import type { ProjectDTO } from '@taskflow/types';
import {
  useProjects,
  useDeleteProject,
  useUpdateProject,
} from '@/features/projects/hooks/use-projects';

export function ProjectsList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const { data, isLoading, isError } = useProjects(page, 10, search || undefined);
  const deleteProject = useDeleteProject();
  const updateProject = useUpdateProject();

  function handleEdit(project: ProjectDTO) {
    setEditingId(project.id);
    setEditName(project.name);
    setEditDescription(project.description || '');
  }

  async function handleSave(projectId: string) {
    try {
      await updateProject.mutateAsync({
        id: projectId,
        input: { name: editName, description: editDescription || undefined },
      });
      setEditingId(null);
    } catch {
      console.error('Erro ao atualizar projeto');
    }
  }

  async function handleDelete(projectId: string) {
    if (!confirm('Tem certeza que deseja deletar este projeto?')) return;
    try {
      await deleteProject.mutateAsync(projectId);
    } catch {
      console.error('Erro ao deletar projeto');
    }
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Carregando projetos...</p>;
  }

  if (isError) {
    return <p className="text-sm text-red-600">Não foi possível carregar os projetos.</p>;
  }

  const { data: projects = [], meta } = data || {};

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Buscar projetos..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 rounded-md border px-3 py-2 text-sm"
        />
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum projeto encontrado.</p>
      ) : (
        <div className="space-y-2">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col gap-2 rounded-md border p-4">
              {editingId === project.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm font-medium"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSave(project.id)}
                      className="rounded-md bg-green-600 px-3 py-1 text-sm text-white"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-md bg-gray-400 px-3 py-1 text-sm text-white"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    {project.description && (
                      <p className="text-sm text-gray-600">{project.description}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="rounded-md bg-red-600 px-3 py-1 text-sm text-white"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <div className="flex gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="flex items-center px-3 text-sm">
            Página {meta.page} de {meta.totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(meta.totalPages, page + 1))}
            disabled={page === meta.totalPages}
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
