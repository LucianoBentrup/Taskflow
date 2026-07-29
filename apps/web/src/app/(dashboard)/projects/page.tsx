'use client';

import { CreateProjectForm } from '@/features/projects/components/CreateProjectForm';
import { ProjectsList } from '@/features/projects/components/ProjectsList';

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meus Projetos</h1>
        <p className="text-sm text-muted-foreground">Crie e gerencie seus projetos</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-background p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Novo Projeto</h2>
          <CreateProjectForm />
        </div>

        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Projetos</h2>
          <ProjectsList />
        </div>
      </div>
    </div>
  );
}
