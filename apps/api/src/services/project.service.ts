import { AppError } from '@/errors/app-error';
import { projectRepository } from '@/repositories/project.repository';
import type {
  CreateProjectInput,
  ListProjectsInput,
  PaginatedProjects,
  ProjectDTO,
  UpdateProjectInput,
} from '@/dtos/project.dto';

// Service: toda a regra de negócio do CRUD de projetos. Controllers apenas
// chamam estes métodos e devolvem a resposta HTTP.

function toProjectDTO(project: {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}): ProjectDTO {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    ownerId: project.ownerId,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}

// Regra de autorização: um usuário só pode editar/deletar seus próprios
// projetos (aqueles onde ele é o owner).
function assertIsOwner(projectOwnerId: string, authenticatedUserId: string) {
  if (projectOwnerId !== authenticatedUserId) {
    throw new AppError('Você não tem permissão para alterar este projeto', 403);
  }
}

export const projectService = {
  // Listagem paginada + busca por nome/descrição. Filtrada implicitamente
  // pelo ownerId do usuário autenticado.
  async list(input: ListProjectsInput): Promise<PaginatedProjects> {
    const { items, total } = await projectRepository.list(input);

    return {
      data: items.map(toProjectDTO),
      meta: {
        total,
        page: input.page,
        pageSize: input.pageSize,
        totalPages: Math.ceil(total / input.pageSize) || 1,
      },
    };
  },

  async getById(id: string, authenticatedUserId: string): Promise<ProjectDTO> {
    const project = await projectRepository.findById(id);
    if (!project) {
      throw new AppError('Projeto não encontrado', 404);
    }

    assertIsOwner(project.ownerId, authenticatedUserId);
    return toProjectDTO(project);
  },

  async create(input: CreateProjectInput, ownerId: string): Promise<ProjectDTO> {
    const project = await projectRepository.create({
      name: input.name,
      description: input.description,
      ownerId,
    });

    return toProjectDTO(project);
  },

  async update(
    projectId: string,
    authenticatedUserId: string,
    input: UpdateProjectInput,
  ): Promise<ProjectDTO> {
    const project = await projectRepository.findById(projectId);
    if (!project) {
      throw new AppError('Projeto não encontrado', 404);
    }

    assertIsOwner(project.ownerId, authenticatedUserId);

    const updatedProject = await projectRepository.update(projectId, input);
    return toProjectDTO(updatedProject);
  },

  async delete(projectId: string, authenticatedUserId: string): Promise<void> {
    const project = await projectRepository.findById(projectId);
    if (!project) {
      throw new AppError('Projeto não encontrado', 404);
    }

    assertIsOwner(project.ownerId, authenticatedUserId);
    await projectRepository.delete(projectId);
  },
};
