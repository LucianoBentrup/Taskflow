import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

// Repository: única camada que fala com o Prisma/banco. Nenhuma regra de
// negócio deve morar aqui — apenas queries e montagem de filtros/paginação.
// Este arquivo é o "padrão de referência" para os repositories de
// Projetos (Sprint 4) e Tarefas (Sprint 5).

type ListUsersParams = {
  page: number;
  pageSize: number;
  search?: string;
};

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  create(data: { name: string; email: string; password: string }) {
    return prisma.user.create({ data });
  },

  // Paginação via limit/offset (page/pageSize), traduzida para skip/take do
  // Prisma. Busca (search) aplica OR contains case-insensitive em
  // nome/email. Retorna itens + total para o controller montar o `meta`.
  async list({ page, pageSize, search }: ListUsersParams) {
    const where: Prisma.UserWhereInput | undefined = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : undefined;

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.user.count({ where }),
    ]);

    return { items, total };
  },

  update(id: string, data: { name?: string; email?: string }) {
    return prisma.user.update({ where: { id }, data });
  },

  updatePassword(id: string, password: string) {
    return prisma.user.update({ where: { id }, data: { password } });
  },

  delete(id: string) {
    return prisma.user.delete({ where: { id } });
  },
};
