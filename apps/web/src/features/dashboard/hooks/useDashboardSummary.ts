'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { DashboardSummary } from '@/features/dashboard/types/dashboard';

export function useDashboardSummary(projectId?: string | null) {
  return useQuery<DashboardSummary>({
    queryKey: ['dashboard', 'summary', projectId],
    queryFn: async () => {
      const params = projectId ? `?projectId=${projectId}` : '';
      const { data } = await api.get<DashboardSummary>(`/dashboard/summary${params}`);
      return data;
    },
  });
}
