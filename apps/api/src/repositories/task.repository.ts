import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

// Repository: única camada que fala com o Prisma/banco. Nenhuma regra de
// negócio deve morar aqui — apenas queries e montagem de filtros/paginação.

type ListTasksParams = {
  projectId: string;
  page: number;
  pageSize: number;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  search?: string;
};

export const taskRepository = {
  findById(id: string) {
    return prisma.task.findUnique({
      where: { id },
      include: { project: true },
    });
  },

  create(data: {
    title: string;
    description?: string;
    status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
    dueDate?: Date;
    projectId: string;
    categoryId?: string | null;
  }) {
    return prisma.task.create({ data });
  },

  // Paginação via limit/offset (page/pageSize), traduzida para skip/take do
  // Prisma. Filtra implicitamente por projectId. Filtros opcionais: status,
  // priority. Busca (search) aplica contains case-insensitive no título.
  // Retorna itens + total para o controller montar o `meta`.
  async list({ projectId, page, pageSize, status, priority, search }: ListTasksParams) {
    const where: Prisma.TaskWhereInput = {
      projectId,
      ...(status ? { status } : {}),
      ...(priority ? { priority } : {}),
      ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.task.count({ where }),
    ]);

    return { items, total };
  },

  update(
    id: string,
    data: {
      title?: string;
      description?: string;
      status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
      priority?: 'LOW' | 'MEDIUM' | 'HIGH';
      dueDate?: Date | null;
      categoryId?: string | null;
    },
  ) {
    return prisma.task.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.task.delete({ where: { id } });
  },
};
