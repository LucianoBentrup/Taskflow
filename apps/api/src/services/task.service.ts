import { AppError } from '@/errors/app-error';
import { taskRepository } from '@/repositories/task.repository';
import { projectRepository } from '@/repositories/project.repository';
import type {
  CreateTaskInput,
  ListTasksInput,
  PaginatedTasks,
  TaskDTO,
  UpdateTaskInput,
} from '@/dtos/task.dto';

// Service: toda a regra de negócio do CRUD de tarefas. Controllers apenas
// chamam estes métodos e devolvem a resposta HTTP.

function toTaskDTO(task: {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: Date | null;
  projectId: string;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}): TaskDTO {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status as 'TODO' | 'IN_PROGRESS' | 'DONE',
    priority: task.priority as 'LOW' | 'MEDIUM' | 'HIGH',
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
    projectId: task.projectId,
    categoryId: task.categoryId,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  };
}

// Regra de autorização: um usuário só pode acessar tarefas de projetos
// que ele próprio criou (ownerId === userId). Task não tem ownerId direto,
// então checamos se o projeto pai pertence ao usuário.
async function assertProjectOwnership(projectId: string, authenticatedUserId: string) {
  const project = await projectRepository.findById(projectId);
  if (!project) {
    throw new AppError('Projeto não encontrado', 404);
  }
  if (project.ownerId !== authenticatedUserId) {
    throw new AppError('Você não tem permissão para acessar as tarefas deste projeto', 403);
  }
}

export const taskService = {
  // Listagem paginada + filtros (status, priority, search por título).
  // Filtrada implicitamente pelo projectId, com checagem de autorização.
  async list(input: ListTasksInput): Promise<PaginatedTasks> {
    await assertProjectOwnership(input.projectId, input.userId);

    const { items, total } = await taskRepository.list({
      projectId: input.projectId,
      page: input.page,
      pageSize: input.pageSize,
      status: input.status,
      priority: input.priority,
      search: input.search,
    });

    return {
      data: items.map(toTaskDTO),
      meta: {
        total,
        page: input.page,
        pageSize: input.pageSize,
        totalPages: Math.ceil(total / input.pageSize) || 1,
      },
    };
  },

  async getById(id: string, authenticatedUserId: string): Promise<TaskDTO> {
    const task = await taskRepository.findById(id);
    if (!task) {
      throw new AppError('Tarefa não encontrada', 404);
    }

    await assertProjectOwnership(task.projectId, authenticatedUserId);
    return toTaskDTO(task);
  },

  async create(input: CreateTaskInput, userId: string): Promise<TaskDTO> {
    // Valida que o projeto existe e pertence ao usuário
    await assertProjectOwnership(input.projectId, userId);

    const task = await taskRepository.create({
      title: input.title,
      description: input.description,
      status: input.status || 'TODO',
      priority: input.priority || 'MEDIUM',
      dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
      projectId: input.projectId,
      categoryId: input.categoryId,
    });

    return toTaskDTO(task);
  },

  async update(
    taskId: string,
    authenticatedUserId: string,
    input: UpdateTaskInput,
  ): Promise<TaskDTO> {
    const task = await taskRepository.findById(taskId);
    if (!task) {
      throw new AppError('Tarefa não encontrada', 404);
    }

    await assertProjectOwnership(task.projectId, authenticatedUserId);

    const updatedTask = await taskRepository.update(taskId, {
      title: input.title,
      description: input.description,
      status: input.status,
      priority: input.priority,
      dueDate:
        input.dueDate !== undefined ? (input.dueDate ? new Date(input.dueDate) : null) : undefined,
      categoryId: input.categoryId,
    });

    return toTaskDTO(updatedTask);
  },

  async delete(taskId: string, authenticatedUserId: string): Promise<void> {
    const task = await taskRepository.findById(taskId);
    if (!task) {
      throw new AppError('Tarefa não encontrada', 404);
    }

    await assertProjectOwnership(task.projectId, authenticatedUserId);
    await taskRepository.delete(taskId);
  },
};
