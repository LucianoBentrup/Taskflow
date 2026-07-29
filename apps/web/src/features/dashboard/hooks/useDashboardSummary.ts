'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { DashboardSummary } from '@/features/dashboard/types/dashboard';

export function useDashboardSummary() {
  return useQuery<DashboardSummary>({
    queryKey: ['dashboard', 'summary'],
    queryFn: async () => {
      const { data } = await api.get<DashboardSummary>('/dashboard/summary');
      return data;
    },
  });
}
