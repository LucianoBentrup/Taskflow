import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

// Repository: única camada que fala com o Prisma/banco. Nenhuma regra de
// negócio deve morar aqui — apenas queries e montagem de filtros/paginação.

type ListProjectsParams = {
  page: number;
  pageSize: number;
  search?: string;
  ownerId: string;
};

export const projectRepository = {
  findById(id: string) {
    return prisma.project.findUnique({ where: { id } });
  },

  create(data: { name: string; description?: string; ownerId: string }) {
    return prisma.project.create({ data });
  },

  // Paginação via limit/offset (page/pageSize), traduzida para skip/take do
  // Prisma. Filtra implicitamente por ownerId do usuário autenticado.
  // Busca (search) aplica OR contains case-insensitive em nome/descrição.
  // Retorna itens + total para o controller montar o `meta`.
  async list({ page, pageSize, search, ownerId }: ListProjectsParams) {
    const where: Prisma.ProjectWhereInput = {
      ownerId,
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.project.count({ where }),
    ]);

    return { items, total };
  },

  update(id: string, data: { name?: string; description?: string }) {
    return prisma.project.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.project.delete({ where: { id } });
  },
};
