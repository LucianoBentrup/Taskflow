'use client';

import { useState } from 'react';
import { useDashboardSummary } from '@/features/dashboard/hooks/useDashboardSummary';
import { DashboardSummaryCards } from '@/features/dashboard/components/DashboardSummary';
import { TasksStatusChart } from '@/features/dashboard/components/TasksStatusChart';
import { DashboardFilter } from '@/features/dashboard/components/DashboardFilter';

export default function HomePage() {
  const { data, isLoading, isError } = useDashboardSummary();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-lg bg-gray-200" />
          ))}
        </div>
        <div className="h-96 animate-pulse rounded-lg bg-gray-200" />
      </div>
    );
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
