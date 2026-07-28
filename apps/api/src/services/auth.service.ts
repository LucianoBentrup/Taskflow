import bcrypt from 'bcrypt';
import { env } from '@/config/env';
import { AppError } from '@/errors/app-error';
import { userRepository } from '@/repositories/user.repository';
import { tokenService } from '@/services/token.service';
import type { AuthResult, LoginInput, RefreshResult, RegisterInput } from '@/dtos/auth.dto';
import type { AuthUser } from '@taskflow/types';

function toAuthUser(user: { id: string; name: string; email: string }): AuthUser {
  return { id: user.id, name: user.name, email: user.email };
}

export const authService = {
  async register(input: RegisterInput): Promise<AuthResult> {
    const existingUser = await userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new AppError('Este email já está em uso', 409);
    }

    const passwordHash = await bcrypt.hash(input.password, env.bcryptSalt);
    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      password: passwordHash,
    });

    const accessToken = tokenService.signAccessToken(user.id);
    const refreshToken = tokenService.signRefreshToken(user.id);

    return { accessToken, refreshToken, user: toAuthUser(user) };
  },

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      throw new AppError('Email ou senha inválidos', 401);
    }

    const passwordMatches = await bcrypt.compare(input.password, user.password);
    if (!passwordMatches) {
      throw new AppError('Email ou senha inválidos', 401);
    }

    const accessToken = tokenService.signAccessToken(user.id);
    const refreshToken = tokenService.signRefreshToken(user.id);

    return { accessToken, refreshToken, user: toAuthUser(user) };
  },

  async refresh(refreshToken: string | undefined): Promise<RefreshResult> {
    if (!refreshToken) {
      throw new AppError('Refresh token ausente', 401);
    }

    const payload = tokenService.verifyRefreshToken(refreshToken);
    const user = await userRepository.findById(payload.sub);
    if (!user) {
      throw new AppError('Usuário não encontrado', 401);
    }

    const accessToken = tokenService.signAccessToken(user.id);
    const newRefreshToken = tokenService.signRefreshToken(user.id);

    return { accessToken, refreshToken: newRefreshToken };
  },

  async getAuthenticatedUser(userId: string): Promise<AuthUser> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuário não encontrado', 401);
    }
    return toAuthUser(user);
  },
};
