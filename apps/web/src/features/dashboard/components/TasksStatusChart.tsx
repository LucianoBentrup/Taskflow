'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { TasksByStatus } from '@/features/dashboard/types/dashboard';

const COLORS = {
  TODO: '#ef4444',
  IN_PROGRESS: '#f59e0b',
  DONE: '#10b981',
};

const STATUS_LABELS = {
  TODO: 'A Fazer',
  IN_PROGRESS: 'Em Andamento',
  DONE: 'Concluído',
};

type TasksStatusChartProps = {
  tasksByStatus: TasksByStatus;
};

export function TasksStatusChart({ tasksByStatus }: TasksStatusChartProps) {
  const data = [
    {
      name: STATUS_LABELS.TODO,
      value: tasksByStatus.TODO,
      status: 'TODO' as const,
    },
    {
      name: STATUS_LABELS.IN_PROGRESS,
      value: tasksByStatus.IN_PROGRESS,
      status: 'IN_PROGRESS' as const,
    },
    {
      name: STATUS_LABELS.DONE,
      value: tasksByStatus.DONE,
      status: 'DONE' as const,
    },
  ];

  const total = tasksByStatus.TODO + tasksByStatus.IN_PROGRESS + tasksByStatus.DONE;

  if (total === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
        <p className="text-sm text-muted-foreground">Nenhuma tarefa para exibir</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h3 className="mb-6 text-lg font-semibold">Distribuição de Tarefas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.status}`} fill={COLORS[entry.status]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value} tarefa${value !== 1 ? 's' : ''}`}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
