'use client';

import { FolderKanban, ListChecks, CheckCircle2 } from 'lucide-react';
import { KPICard } from './KPICard';
import type { DashboardSummary } from '@/features/dashboard/types/dashboard';

type DashboardSummaryProps = {
  data: DashboardSummary;
};

export function DashboardSummaryCards({ data }: DashboardSummaryProps) {
  const { projectsCount, tasksCount, tasksByStatus } = data;
  const donePercentage = tasksCount > 0 ? Math.round((tasksByStatus.DONE / tasksCount) * 100) : 0;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <KPICard
        title="Projetos"
        value={projectsCount}
        icon={<FolderKanban className="h-8 w-8" />}
        variant="default"
      />
      <KPICard
        title="Total de Tarefas"
        value={tasksCount}
        icon={<ListChecks className="h-8 w-8" />}
        variant="default"
      />
      <KPICard
        title="Concluídas"
        value={tasksByStatus.DONE}
        icon={<CheckCircle2 className="h-8 w-8" />}
        variant="success"
      />
      <KPICard title="Progresso" value={`${donePercentage}%`} variant="accent" />
    </div>
  );
}
