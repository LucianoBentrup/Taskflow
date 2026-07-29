import { prisma } from '@/lib/prisma';
import type { DashboardSummary, ProjectWithTaskCount, TasksByStatus } from '@/dtos/dashboard.dto';

// Service: agregações de dados para o dashboard. Nenhuma regra de negócio
// de escrita aqui — apenas leitura/agregação via Prisma.
//
// Estratégia: `groupBy` e `_count` aninhado evitam N+1 queries. Em vez de
// buscar todos os projetos do usuário e depois contar tarefas uma a uma,
// usamos uma única query agregada por caso de uso.

export const dashboardService = {
  // Resumo do dashboard: total de projetos, total de tarefas e contagem
  // de tarefas por status — tudo filtrado pelos projetos do usuário.
  // Se projectId for fornecido, filtra apenas por esse projeto.
  async getSummary(userId: string, projectId?: string): Promise<DashboardSummary> {
    const projectFilter = projectId ? { ownerId: userId, id: projectId } : { ownerId: userId };
    const taskFilter = projectId
      ? { project: { ownerId: userId, id: projectId } }
      : { project: { ownerId: userId } };

    const [projectsCount, tasksGroupedByStatus] = await Promise.all([
      prisma.project.count({ where: projectFilter }),
      prisma.task.groupBy({
        by: ['status'],
        where: taskFilter,
        _count: { _all: true },
      }),
    ]);

    const tasksByStatus: TasksByStatus = {
      TODO: 0,
      IN_PROGRESS: 0,
      DONE: 0,
    };

    let tasksCount = 0;
    for (const group of tasksGroupedByStatus) {
      tasksByStatus[group.status] = group._count._all;
      tasksCount += group._count._all;
    }

    return { projectsCount, tasksCount, tasksByStatus };
  },

  // Projetos do usuário com a contagem de tarefas de cada um, em uma
  // única query (Prisma `_count` aninhado, sem N+1).
  async getProjectsWithTaskCounts(userId: string): Promise<ProjectWithTaskCount[]> {
    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { tasks: true } } },
    });

    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      ownerId: project.ownerId,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      tasksCount: project._count.tasks,
    }));
  },
};
