'use client';

import { useState } from 'react';
import { useDashboardSummary } from '@/features/dashboard/hooks/useDashboardSummary';
import { DashboardSummaryCards } from '@/features/dashboard/components/DashboardSummary';
import { TasksStatusChart } from '@/features/dashboard/components/TasksStatusChart';
import { DashboardFilter } from '@/features/dashboard/components/DashboardFilter';
import { DashboardSkeleton } from '@/components/ui/skeletons/DashboardSkeleton';

export default function HomePage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const { data, isLoading, isError } = useDashboardSummary(selectedProjectId);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-900">Erro ao carregar dashboard</h2>
        <p className="mt-2 text-sm text-red-700">
          Não foi possível carregar os dados. Tente recarregar a página.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardFilter
        selectedProjectId={selectedProjectId}
        onProjectChange={setSelectedProjectId}
      />

      <DashboardSummaryCards data={data} />

      <TasksStatusChart tasksByStatus={data.tasksByStatus} />
    </div>
  );
}
