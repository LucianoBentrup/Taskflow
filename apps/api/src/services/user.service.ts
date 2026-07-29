import bcrypt from 'bcrypt';
import { env } from '@/config/env';
import { AppError } from '@/errors/app-error';
import { userRepository } from '@/repositories/user.repository';
import type {
  ChangePasswordInput,
  ListUsersInput,
  PaginatedUsers,
  UpdateUserInput,
  UserDTO,
} from '@/dtos/user.dto';

// Service: toda a regra de negócio do CRUD de usuários. Controllers apenas
// chamam estes métodos e devolvem a resposta HTTP.

function toUserDTO(user: {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}): UserDTO {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

// Regra de autorização compartilhada pelos endpoints de update/password/delete:
// um usuário só pode alterar/remover o próprio registro.
function assertIsSelf(targetUserId: string, authenticatedUserId: string) {
  if (targetUserId !== authenticatedUserId) {
    throw new AppError('Você não tem permissão para alterar este usuário', 403);
  }
}

export const userService = {
  // Listagem paginada + busca por nome/email. `page`/`pageSize` já vêm
  // validados/normalizados pelo validator (listUsersQuerySchema).
  async list(input: ListUsersInput): Promise<PaginatedUsers> {
    const { items, total } = await userRepository.list(input);

    return {
      data: items.map(toUserDTO),
      meta: {
        total,
        page: input.page,
        pageSize: input.pageSize,
        totalPages: Math.ceil(total / input.pageSize) || 1,
      },
    };
  },

  async getById(id: string): Promise<UserDTO> {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }
    return toUserDTO(user);
  },

  async update(
    targetUserId: string,
    authenticatedUserId: string,
    input: UpdateUserInput,
  ): Promise<UserDTO> {
    assertIsSelf(targetUserId, authenticatedUserId);

    const currentUser = await userRepository.findById(targetUserId);
    if (!currentUser) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (input.email && input.email !== currentUser.email) {
      const existingUser = await userRepository.findByEmail(input.email);
      if (existingUser) {
        throw new AppError('Este email já está em uso', 409);
      }
    }

    const updatedUser = await userRepository.update(targetUserId, input);
    return toUserDTO(updatedUser);
  },

  async changePassword(
    targetUserId: string,
    authenticatedUserId: string,
    input: ChangePasswordInput,
  ): Promise<void> {
    assertIsSelf(targetUserId, authenticatedUserId);

    const currentUser = await userRepository.findById(targetUserId);
    if (!currentUser) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const passwordMatches = await bcrypt.compare(input.currentPassword, currentUser.password);
    if (!passwordMatches) {
      throw new AppError('Senha atual incorreta', 401);
    }

    const passwordHash = await bcrypt.hash(input.newPassword, env.bcryptSalt);
    await userRepository.updatePassword(targetUserId, passwordHash);
  },

  async delete(targetUserId: string, authenticatedUserId: string): Promise<void> {
    assertIsSelf(targetUserId, authenticatedUserId);

    const currentUser = await userRepository.findById(targetUserId);
    if (!currentUser) {
      throw new AppError('Usuário não encontrado', 404);
    }

    await userRepository.delete(targetUserId);
  },
};
